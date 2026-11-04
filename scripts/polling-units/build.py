"""Build per-LGA polling unit files from saidiadegoke/nigeria-inec-geo.

    git clone --depth 1 https://github.com/saidiadegoke/nigeria-inec-geo .cache/inec-geo
    python3 scripts/polling-units/build.py .cache/inec-geo/data

Writes src/data/polling-units/<state>/<lga>.json and src/data/polling-units/index.json.
Names and locations are kept exactly as INEC publishes them.
"""
import csv, json, os, re, shutil, sys, difflib, collections

SRC = sys.argv[1] if len(sys.argv) > 1 else ".cache/inec-geo/data"
OUT = "src/data/polling-units"

# INEC spellings that differ from the site's LGA names (state, INEC name) -> site name.
ALIASES = {
    ("EKITI", "AIYEKIRE"): "Gbonyin",
    ("FCT", "MUNICIPAL"): "Abuja Municipal (AMAC)",
    ("OGUN", "EGBADO NORTH"): "Yewa North",
    ("OGUN", "EGBADO SOUTH"): "Yewa South",
    ("KEBBI", "WASAGU/DANKO"): "Danko/Wasagu",
    ("KEBBI", "AREWA"): "Arewa Dandi",
}

def key(s):
    return re.sub(r"[^a-z]", "", s.lower().replace("&", "and"))

geo = json.load(open("src/data/geo.json"))
states = {key(s["name"]): s for s in geo}
manifest = json.load(open(os.path.join(SRC, "manifest.json")))

def site_lga(state_name, lga_name):
    st = states[key(state_name)]
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

lgas = collections.OrderedDict()
for r in csv.DictReader(open(os.path.join(SRC, "polling-units.csv"), encoding="utf-8")):
    code = f"{r['state_code']}/{r['lga_code']}"
    if code not in lgas:
        st, lga = site_lga(r["state_name"], r["lga_name"])
        lgas[code] = {"state": st["slug"], "lga": lga["slug"], "code": code, "wards": collections.OrderedDict()}
    wards = lgas[code]["wards"]
    w = wards.setdefault(r["ward_code"], {"c": r["ward_code"], "n": r["ward_name"].strip(), "u": []})
    name, loc = r["pu_name"].strip(), r["pu_location"].strip()
    w["u"].append([r["pu_code"], name, "" if loc == name else loc])

slugs = [(v["state"], v["lga"]) for v in lgas.values()]
assert len(set(slugs)) == len(slugs) == 774, "every site LGA must map to exactly one INEC LGA"

shutil.rmtree(OUT, ignore_errors=True)
index, states_codes = {}, {}
for code, v in lgas.items():
    wards = sorted(v["wards"].values(), key=lambda w: w["c"])
    for w in wards:
        w["u"].sort(key=lambda u: u[0])
    os.makedirs(os.path.join(OUT, v["state"]), exist_ok=True)
    with open(os.path.join(OUT, v["state"], v["lga"] + ".json"), "w") as f:
        json.dump({"code": code, "wards": wards}, f, separators=(",", ":"), ensure_ascii=False)
    index[code] = f"{v['state']}/{v['lga']}"
    states_codes[v["state"]] = code.split("/")[0]

with open(os.path.join(OUT, "index.json"), "w") as f:
    json.dump({"source": manifest["source"], "scrapedAt": manifest["scraped_at"], "counts": manifest["counts"],
               "states": states_codes, "lgas": index}, f, separators=(",", ":"))
print(len(lgas), "LGAs,", sum(len(w["u"]) for v in lgas.values() for w in v["wards"].values()), "units")
