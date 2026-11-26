"""Build per-LGA polling unit files from INEC's polling unit list (CSV).

    python3 scripts/polling-units/build.py path/to/inec_polling_units.csv 2026-11-02

The CSV has the columns state_code, state, lga_code, lga, ward_code, ward, pu_code,
polling_unit, delimitation, inec_pu_id. The date is when the list was published or received;
the site shows it as "as of".

Writes src/data/polling-units/<state>/<lga>.json and src/data/polling-units/index.json.
Names are kept exactly as INEC publishes them, with stray line breaks and double spaces removed.
"""
import collections, csv, difflib, json, os, re, shutil, sys

if len(sys.argv) != 3:
    sys.exit(__doc__)
SRC, AS_OF = sys.argv[1], sys.argv[2]
OUT = "src/data/polling-units"

# INEC spellings that differ from the site's LGA names (state, INEC name) -> site name.
ALIASES = {
    ("EKITI", "AIYEKIRE"): "Gbonyin",
    ("FCT", "MUNICIPAL"): "Abuja Municipal (AMAC)",
    ("FCT", "ABUJA MUNICIPAL"): "Abuja Municipal (AMAC)",
    ("OGUN", "EGBADO NORTH"): "Yewa North",
    ("OGUN", "EGBADO SOUTH"): "Yewa South",
    ("KEBBI", "WASAGU/DANKO"): "Danko/Wasagu",
    ("KEBBI", "AREWA"): "Arewa Dandi",
}


def key(s):
    return re.sub(r"[^a-z]", "", s.lower().replace("&", "and"))


def clean(s):
    return re.sub(r"\s+", " ", s).strip()


geo = json.load(open("src/data/geo.json"))
states = {key(s["name"]): s for s in geo}
states[key("FCT")] = states.get(key("FCT")) or next(s for s in geo if s["slug"] == "fct")


def site_lga(state_name, lga_name):
    st = states.get(key(state_name)) or states[difflib.get_close_matches(key(state_name), list(states), n=1, cutoff=0.6)[0]]
    names = {key(l["name"]): l for l in st["lgas"]}
    alias = ALIASES.get((state_name, lga_name))
    if alias:
        return st, names[key(alias)]
    if key(lga_name) in names:
        return st, names[key(lga_name)]
    match = difflib.get_close_matches(key(lga_name), list(names), n=1, cutoff=0.6)
    if not match:
        sys.exit(f"No site LGA for {state_name} / {lga_name}: add it to ALIASES")
    return st, names[match[0]]


# INEC's state/LGA codes are stable, so LGAs already mapped by an earlier build keep their mapping.
try:
    PREVIOUS = json.load(open(os.path.join(OUT, "index.json")))["lgas"]
except FileNotFoundError:
    PREVIOUS = {}
BY_SLUG = {(s["slug"], l["slug"]): (s, l) for s in geo for l in s["lgas"]}

lgas = collections.OrderedDict()
fixed = 0
for r in csv.DictReader(open(SRC, encoding="utf-8-sig")):
    pu, name = r["pu_code"].strip(), r["polling_unit"]
    # A few hundred rows carry the unit code inside the name ("003 - NDI OJI ABAM I ...").
    if not re.fullmatch(r"\d{3}", pu):
        m = re.match(r"\s*(\d{1,3})\s*-\s*(.*)", name, re.S)
        if not m:
            sys.exit(f"No unit code in row: {r}")
        pu, name = m.group(1).zfill(3), m.group(2)
        fixed += 1
    code = f"{r['state_code']}/{r['lga_code']}"
    if code not in lgas:
        known = PREVIOUS.get(code)
        st, lga = BY_SLUG[tuple(known.split("/"))] if known else site_lga(clean(r["state"]), clean(r["lga"]))
        lgas[code] = {"state": st["slug"], "lga": lga["slug"], "code": code, "wards": collections.OrderedDict()}
    wards = lgas[code]["wards"]
    w = wards.setdefault(r["ward_code"], {"c": r["ward_code"], "n": clean(r["ward"]), "u": []})
    w["u"].append([pu, clean(name), ""])

slugs = [(v["state"], v["lga"]) for v in lgas.values()]
dupes = [s for s, n in collections.Counter(slugs).items() if n > 1]
assert not dupes and len(slugs) == 774, f"every site LGA must map to exactly one INEC LGA: {dupes}"

shutil.rmtree(OUT, ignore_errors=True)
index, states_codes = {}, {}
units = wards_n = 0
for code, v in lgas.items():
    wards = sorted(v["wards"].values(), key=lambda w: w["c"])
    for w in wards:
        w["u"].sort(key=lambda u: u[0])
        seen = [u[0] for u in w["u"]]
        assert len(seen) == len(set(seen)), f"duplicate unit code in {code}/{w['c']}"
        units += len(w["u"])
    wards_n += len(wards)
    os.makedirs(os.path.join(OUT, v["state"]), exist_ok=True)
    with open(os.path.join(OUT, v["state"], v["lga"] + ".json"), "w") as f:
        json.dump({"code": code, "wards": wards}, f, separators=(",", ":"), ensure_ascii=False)
    index[code] = f"{v['state']}/{v['lga']}"
    states_codes[v["state"]] = code.split("/")[0]

counts = {"states": len(states_codes), "lgas": len(lgas), "wards": wards_n, "polling_units": units}
with open(os.path.join(OUT, "index.json"), "w") as f:
    json.dump({"source": "INEC", "scrapedAt": f"{AS_OF}T12:00:00.000Z", "counts": counts, "states": states_codes, "lgas": index},
              f, separators=(",", ":"))
print(counts, f"({fixed} unit codes recovered from names)")
