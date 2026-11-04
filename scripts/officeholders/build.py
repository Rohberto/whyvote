"""Mark sitting legislators who are on INEC's 2027 list for the same seat.

    python3 scripts/officeholders/build.py

Reads senate.csv, reps.csv (and assembly.csv if present) in this folder: one row per seat,
with the person who holds it now. Each row is matched to a 2027 race in the same state by
seat name, then to a candidate in that race by name. Only matches are written to
src/data/officeholders.json, and every decision is listed in review.txt for a human check.
"""
import csv, difflib, json, os, re, unicodedata

HERE = os.path.dirname(__file__)
STOP = {"alhaji", "senator", "sen", "dr", "chief", "engr", "prof", "hon", "rep", "mrs", "barr", "mr", "otunba", "sir"}


def ascii_lower(s):
    return unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower().replace("'", "")


def name_tokens(s):
    return {t for t in re.split(r"[^a-z]+", ascii_lower(s)) if len(t) > 2 and t not in STOP}


def seat_key(s):
    """Order-free key: "Owan West/East" and "Owan East/Owan West" compare equal-ish."""
    s = ascii_lower(s).replace("&", "/").replace(" and ", "/").replace("federal capital territory", "fct")
    words = sorted(set(re.findall(r"[a-z]+", s)))
    return " ".join(words)


geo = {s["name"].lower(): s["slug"] for s in json.load(open("src/data/geo.json"))}
geo["fct"] = "fct"
out, review = {}, []

for office in ("senate", "reps", "assembly"):
    path = os.path.join(HERE, f"{office}.csv")
    if not os.path.exists(path):
        continue
    for row in csv.DictReader(open(path, encoding="utf-8")):
        slug = geo.get(row["state"].strip().lower())
        if not slug:
            review.append(f"NO STATE   {office} {row['state']} / {row['seat']}")
            continue
        data = json.load(open(f"src/data/states/{slug}.json"))
        races = [r for r in data["races"] if r["office"] == office]
        if not races:
            review.append(f"NO RACES   {office} {row['state']} / {row['seat']}")
            continue
        # Seat: best fuzzy match on the race name within the state.
        key = seat_key(row["seat"])
        scored = sorted(((difflib.SequenceMatcher(None, key, seat_key(r["name"] or "")).ratio(), r) for r in races), key=lambda x: -x[0])
        score, race = scored[0]
        if score < 0.6:
            review.append(f"NO SEAT    {office} {row['state']} / {row['seat']} (closest: {race['name']} {score:.2f})")
            continue
        holder = name_tokens(row["name"])
        cands = [c for c in data["candidates"] if c["race"] == race["id"]]
        best = max(cands, key=lambda c: len(holder & name_tokens(c["inecName"] + " " + c["name"])), default=None)
        overlap = len(holder & name_tokens(best["inecName"] + " " + best["name"])) if best else 0
        if overlap < 2:
            review.append(f"NOT ON 2027 LIST  {office} {race['name']}: {row['name']}")
            continue
        out[race["id"]] = {
            "name": best["name"],
            "since": {"senate": "Serving senator", "reps": "Serving member of the House of Representatives", "assembly": "Serving member of the State House of Assembly"}[office],
            "runningAgain": best["id"],
            "status": "Running again",
            "source": row.get("note", ""),
        }
        review.append(f"RUNNING    {office} {race['name']}: {row['name']} -> {best['inecName']} ({best['party']})")

json.dump(dict(sorted(out.items())), open("src/data/officeholders.json", "w"), indent=1, ensure_ascii=False)
open(os.path.join(HERE, "review.txt"), "w").write("\n".join(review) + "\n")
print(len(out), "officeholders running again;", sum(1 for r in review if not r.startswith("RUNNING")), "rows need no badge or a check")
