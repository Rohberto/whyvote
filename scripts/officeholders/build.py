"""Current officeholder for every race we have one for, running again or not.

    python3 scripts/officeholders/build.py "path/to/2027 INEC Final List ... officeholders.xlsx"

Two sources, both from the content team's sheet:
- running.json, written by scripts/candidates/extract.py from the CURRENT OFFICEHOLDER column
  ("Yes" only; "Flagged" and "Likely, confirm" rows are left out until confirmed).
- the "Officeholders Not Contesting" tab: sitting holders who are not on the 2027 list for their seat.

Writes src/data/officeholders.json, keyed by race id, and review.txt listing every row that
could not be placed or needs a human check. Run it after extract.py.
"""
import collections, difflib, json, os, re, sys, unicodedata

import openpyxl

HERE = os.path.dirname(__file__)
if len(sys.argv) != 2:
    sys.exit(__doc__)

ROLE = {
    "president": "Serving President",
    "vice-president": "Serving Vice President",
    "governor": "Serving governor",
    "deputy-governor": "Serving deputy governor",
    "senate": "Serving senator",
    "reps": "Serving member of the House of Representatives",
    "assembly": "Serving member of the State House of Assembly",
}
OFFICE = {"Governor": "governor", "Senate": "senate", "House of Reps": "reps", "State House of Assembly": "assembly", "President": "president"}


def ascii_lower(s):
    return unicodedata.normalize("NFKD", str(s)).encode("ascii", "ignore").decode().lower().replace("'", "")


# Seat names on the not-contesting tab that INEC spells differently (state slug, sheet seat) -> race id.
SEAT_ALIASES = {
    ("delta", "Aniocha/Oshimili"): "reps:delta:aniocha-north-aniocha-south-oshimili-north-south",
    ("rivers", "Emohua/Ikwerre"): "reps:rivers:ikwerre-umohua",
}


def seat_key(s):
    """Order-free key: "Owan West/East" and "Owan East/Owan West" compare equal-ish."""
    s = ascii_lower(s).replace("&", "/").replace(" and ", "/").replace("(lga)", "").replace("federal capital territory", "fct")
    return " ".join(sorted(set(re.findall(r"[a-z0-9]+", s))))


STOP = {"alhaji", "senator", "sen", "dr", "chief", "engr", "prof", "hon", "rep", "mrs", "barr", "mr", "otunba", "sir"}


def tokens(name):
    return {t for t in re.split(r"[^a-z]+", ascii_lower(name)) if len(t) > 2 and t not in STOP}


def same_person(a, b):
    return len(tokens(a) & tokens(b)) >= 2


out, review = {}, []

# ---------------------------------------------------------------- running again
running = json.load(open(os.path.join(HERE, "running.json")))
by_race = collections.defaultdict(list)
for r in running:
    by_race[r["race"]].append(r)
for race, holders in by_race.items():
    if len(holders) > 1:
        review.append(f"TWO HOLDERS {race}: " + ", ".join(f"{h['name']} ({h['party']})" for h in holders) + " (none marked)")
        continue
    h = holders[0]
    out[race] = {"name": h["name"], "party": h["party"], "since": ROLE[h["office"]], "runningAgain": h["id"],
                 "status": "Running again", "source": h["note"] or ""}

# ---------------------------------------------------------------- not contesting
geo = {s["name"].lower(): s["slug"] for s in json.load(open("src/data/geo.json"))}
geo["fct"] = "fct"
wb = openpyxl.load_workbook(sys.argv[1])
ws = wb["Officeholders Not Contesting"]
placed = 0
for row in ws.iter_rows(min_row=4, values_only=True):
    office, state, seat, name, status, elsewhere, note = (list(row) + [None] * 7)[:7]
    office = OFFICE.get(office)
    if not office or not name:
        continue
    if office == "president":
        race_id = "president:national"
    else:
        slug = geo.get(str(state).strip().lower())
        if not slug:
            review.append(f"NO STATE    {office} {state} / {seat}: {name}")
            continue
        if office == "governor":
            race_id = f"governor:{slug}"
        elif (slug, str(seat).strip()) in SEAT_ALIASES:
            race_id = SEAT_ALIASES[(slug, str(seat).strip())]
        else:
            races = [r for r in json.load(open(f"src/data/states/{slug}.json"))["races"] if r["office"] == office]
            scored = sorted(((difflib.SequenceMatcher(None, seat_key(seat or ""), seat_key(r["name"] or "")).ratio(), r) for r in races),
                            key=lambda x: -x[0])
            # Assembly roster seats are often just the LGA ("Obingwa" for "Obingwa East"), so they need a close match.
            if not scored or scored[0][0] < (0.9 if office == "assembly" else 0.75):
                review.append(f"NO SEAT     {office} {state} / {seat}: {name} (closest: {scored[0][1]['name'] if scored else '-'})")
                continue
            race_id = scored[0][1]["id"]
    # The State Assembly roster is not independently verified: when it places someone in one seat
    # while the candidate sheet marks them as the holder of another, trust neither.
    if office == "assembly":
        elsewhere_mark = [k for k, v in out.items() if k.startswith("assembly:") and v.get("runningAgain") and k != race_id and same_person(v["name"], name)]
        if elsewhere_mark:
            for k in elsewhere_mark:
                review.append(f"DROPPED     {k}: {out[k]['name']} is marked as holder here, but the roster puts {name} in {race_id}")
                del out[k]
            review.append(f"DROPPED     {race_id}: {name} (roster seat contradicts the candidate sheet)")
            continue
    if race_id in out:
        if same_person(out[race_id]["name"], name):
            continue  # the holder running again, listed twice under different spellings
        if office == "assembly":
            review.append(f"DROPPED     {race_id}: roster says {name}, candidate sheet marks {out[race_id]['name']} (neither shown)")
            del out[race_id]
        else:
            review.append(f"CONFLICT    {race_id}: {name} is listed as not contesting, but {out[race_id]['name']} is marked as the holder running again (kept)")
        continue
    status = str(status or "")
    if "contesting another office" in status.lower() and elsewhere and "possibl" not in status.lower():
        text = f"Not running for this seat. On the 2027 list for {elsewhere}"
    elif status.lower().startswith("term-limited"):
        text = "Term-limited, so not on this ballot"
    else:
        text = "Not found on INEC’s 2027 list for this seat"
    if "confirm" in status.lower() or "not checked" in status.lower():
        review.append(f"CHECK       {race_id}: {name}: {status} {elsewhere or ''}".rstrip())
    out[race_id] = {"name": name, "since": ROLE[office], "status": text, "source": note or ""}
    placed += 1

# Hand-confirmed entries, each with its source (manual.json).
for race_id, entry in json.load(open(os.path.join(HERE, "manual.json"))).items():
    if not race_id.startswith("_"):
        out[race_id] = entry

json.dump(dict(sorted(out.items())), open("src/data/officeholders.json", "w"), indent=1, ensure_ascii=False)
open(os.path.join(HERE, "review.txt"), "w").write("\n".join(review) + "\n")
print(f"{len(out)} races with an officeholder ({len(out) - placed} running again, {placed} not running); {len(review)} rows to check in review.txt")
