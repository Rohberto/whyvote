"""Current officeholder for every race we have one for, running again or not.

    python3 scripts/officeholders/build.py "path/to/2027 INEC Final List ... officeholders.xlsx"

Sources, all from the content team's sheet:
- the "Officeholders Re-contesting" tab: sitting holders on the 2027 list for their own seat.
  Only "Yes" rows; "Likely, confirm" rows wait for manual.json. This list wins over the others.
- running.json, written by scripts/candidates/extract.py from the CURRENT OFFICEHOLDER column,
  for holders the tab does not list (deputy governors, the Vice President).
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
geo = {s["name"].lower(): s["slug"] for s in json.load(open("src/data/geo.json"))}
geo["fct"] = "fct"
wb = openpyxl.load_workbook(sys.argv[1])
candidates = []


def walk(x):
    if isinstance(x, dict):
        if "id" in x and "office" in x and "inecName" in x:
            candidates.append(x)
        for v in x.values():
            walk(v)
    elif isinstance(x, list):
        for v in x:
            walk(v)


walk(json.load(open("src/data/national.json")))
for f in sorted(os.listdir("src/data/states")):
    walk(json.load(open(f"src/data/states/{f}")))
norm = lambda s: re.sub(r"\s+", " ", str(s).replace("*", "")).strip().upper()
by_name = collections.defaultdict(list)
for c in candidates:
    by_name[(c["office"], norm(c["inecName"]), c["party"])].append(c)

running, seen = [], set()
ws = wb["Officeholders Re-contesting"]
for row in ws.iter_rows(values_only=True):
    office, state, seat, name, party, status, note = (list(row) + [None] * 7)[:7]
    office = OFFICE.get(office)
    if not office or not name or str(status).strip() != "Yes":
        if office and name:
            review.append(f"CHECK       {office} {state} / {seat}: {name} ({party}): {status}, not shown until confirmed")
        continue
    match = by_name.get((office, norm(name), str(party).strip()), [])
    # Same name and party in two states (two "Adamu Sani"s for NDC): keep the one in this state.
    if len(match) > 1 and state:
        st = geo.get(str(state).strip().lower())
        match = [c for c in match if c["race"].split(":")[1] == st] or match
    if len(match) > 1:
        review.append(f"AMBIGUOUS   {office} {state} / {seat}: {name} ({party}) matches {', '.join(c['id'] for c in match)}")
        continue
    if not match:
        review.append(f"NO MATCH    {office} {state} / {seat}: {name} ({party}) is not on the candidate data")
        continue
    c = match[0]
    running.append({"race": c["race"], "id": c["id"], "name": c["name"], "party": c["party"], "office": office, "note": note})
    seen.add(c["id"])
# Holders marked on the candidate tabs that the re-contesting tab does not list (deputies, Vice President).
tab_races = {r["race"] for r in running}
running += [r for r in json.load(open(os.path.join(HERE, "running.json"))) if r["id"] not in seen and r["race"] not in tab_races]

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
    # The re-contesting list wins: a not-contesting row that puts the same person in another seat,
    # or someone else in a seat whose holder is running again, is left out.
    if office == "assembly" and any(k.startswith("assembly:") and k != race_id and v.get("runningAgain") and same_person(v["name"], name) for k, v in out.items()):
        review.append(f"SKIPPED     {race_id}: {name} is on the re-contesting list for another seat")
        continue
    if race_id in out:
        if not same_person(out[race_id]["name"], name):
            review.append(f"SKIPPED     {race_id}: not-contesting tab names {name}, re-contesting list has {out[race_id]['name']} (kept)")
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
