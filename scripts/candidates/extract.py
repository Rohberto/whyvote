"""INEC 2027 final candidate list (xlsx) -> clean JSON for the site.

Usage (from the repo root):
  python3 scripts/candidates/extract.py "path/to/2027 INEC Final List of Candidates.xlsx"

Writes:
  src/data/                      site data (national.json, states/*.json, geo.json, slugs.json, search.json)
  .cache/candidates/photos.json  photo jobs for photos.py
  .cache/candidates/report.txt   data issues worth knowing about (misprinted ages, court orders, sheet notes)
Run photos.py after this, then this script again so records know which photos exist.
"""
import json, os, re, sys, collections, unicodedata
import openpyxl

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, '.cache/candidates/list.xlsx')
OUT = os.path.join(ROOT, '.cache/candidates')
S = OUT

wb = openpyxl.load_workbook(SRC)
report = []


def slugify(s):
    s = unicodedata.normalize('NFKD', str(s)).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


def clean(s):
    if s is None:
        return None
    s = re.sub(r'\s+', ' ', str(s).replace('*', '')).strip()
    s = re.sub(r"[\u2019']{2,}", "'", s)  # "O''BRIEN" -> "O'BRIEN"
    return s or None


def title(s):
    """INEC capitals -> Title Case, keeping hyphens/apostrophes/initials sensible."""
    if not s:
        return s
    def word(w):
        if re.fullmatch(r'[A-Z]\.?', w):
            return w.upper()
        return '-'.join("'".join(p[:1].upper() + p[1:].lower() for p in part.split("'")) for part in w.split('-'))
    return ' '.join(word(w) for w in s.split(' '))


STATE_NAMES = {
    'FCT': 'FCT', 'AKWA IBOM': 'Akwa Ibom', 'CROSS RIVER': 'Cross River',
}


def state_name(s):
    s = clean(s).upper()
    if s.startswith('FCT'):
        return 'FCT'
    return STATE_NAMES.get(s, title(s))


def constituency_name(s):
    s = clean(s)
    s = re.sub(r'\s*/\s*', '/', s)
    s = re.sub(r'\s*-\s*', '-', s)
    if s.isupper():
        s = title(s)
        s = re.sub(r'\b(Ii|Iii|Iv|Vi)\b', lambda m: m.group(1).upper(), s)
    return s


def lga_list(s):
    return [title(p.strip()) if p.strip().isupper() else p.strip()
            for p in re.split(r'[,;]|\band\b|&', str(s or '')) if p.strip()]


def to_int(v):
    try:
        return int(float(v))
    except (TypeError, ValueError):
        return None


def gender(v):
    v = (clean(v) or '').upper()
    return {'M': 'M', 'F': 'F', 'MALE': 'M', 'FEMALE': 'F'}.get(v)


def pwd(v):
    v = clean(v)
    return None if v in (None, 'None', 'NONE', 'NIL', 'N/A') else v


def quals(v):
    v = clean(v)
    return v


records = []

# Listed by court order in INEC's 16 Nov update, whose "COURT ORDER" remark was later replaced by a
# photo link in the sheet. Kept so the court-order tag does not silently disappear.
COURT_ORDER_KEPT = {'MOHAMMED IBRAHIM USMAN', 'ABDULMAJID ISA UMAR', 'ISMAEEL IDRIS SANI', 'OLUMUYIWA OWADARA'}


def add(**r):
    if r['office'] == 'reps' and r['inecName'] in COURT_ORDER_KEPT:
        r['courtOrder'] = True
    age = r.get('age')
    if age is not None and not (18 <= age <= 110):
        report.append(f"age {age} as printed: {r['inecName']} ({r['office']}, {r.get('state') or 'national'})")
        r['agePrinted'] = age
        r['age'] = None
    records.append(r)


def link_of(cell):
    return cell.hyperlink.target if cell.hyperlink and cell.hyperlink.target else None


def header_map(ws):
    """Column index by normalised header, so the sheet's column order can change between versions."""
    cols = {}
    for i, c in enumerate(next(ws.iter_rows(min_row=1, max_row=1))):
        if c.value:
            cols.setdefault(re.sub(r'[^a-z]+', ' ', str(c.value).lower()).strip(), i)
    return cols


def getter(ws):
    cols = header_map(ws)

    def get(row, *names, cell=False):
        for n in names:
            i = cols.get(n)
            if i is not None and i < len(row):
                return row[i] if cell else row[i].value
        return None
    return get


def photo_of(get, row):
    """The sheet's own photo link first (Remarks or Photo Link), then the ShineYourEye photo.
    Returns (url, label); the label is the linked file's name, used for the identity check."""
    for col in ('remarks', 'photo link', 'shineyoureye photo'):
        c = get(row, col, cell=True)
        if c is None or c.value in (None, ''):
            continue
        url = link_of(c) or (str(c.value).strip() if str(c.value).strip().startswith('http') else None)
        if url and 'wikipedia.org' not in url:
            return url, (None if str(c.value).startswith('http') else clean(c.value))
    return None, None


def holder_of(get, row):
    """CURRENT OFFICEHOLDER = "Yes" marks the sitting holder of the seat being contested.
    "Flagged" and "Likely, confirm" rows are left unmarked until someone confirms them."""
    v = (clean(get(row, 'current officeholder')) or '').lower()
    return v == 'yes', clean(get(row, 'officeholder note'))


# ---------------------------------------------------------------- presidential
ws = wb['Presidential']
get = getter(ws)
for row in ws.iter_rows(min_row=2):
    name = clean(get(row, 'name of candidate'))
    if not name:
        continue
    office = 'president' if str(get(row, 'position')).strip().lower().startswith('pres') else 'vice-president'
    url, label = photo_of(get, row)
    holder, holder_note = holder_of(get, row)
    remark = clean(get(row, 'remarks'))
    add(office=office, ticket=to_int(get(row, 'sn')), party=clean(get(row, 'party')), state=None,
        stateOfOrigin=clean(get(row, 'state of origin')), constituency=None, lgas=None, inecName=name,
        pwd=pwd(get(row, 'pwd')), age=to_int(get(row, 'age')), gender=gender(get(row, 'gender')),
        qualifications=quals(get(row, 'qualification s')), courtOrder=bool(remark and 'COURT' in remark.upper()),
        photoUrl=url, photoLabel=label, note=None, holder=holder, holderNote=holder_note)

# ---------------------------------------------------------------- legislatures
for sheet, office in (('Senate', 'senate'), ('House of Reps', 'reps'), ('SHoA', 'assembly')):
    ws = wb[sheet]
    get = getter(ws)
    lga_col = header_map(ws).get('lga', 3)  # the House of Reps LGA column has no header
    for row in ws.iter_rows(min_row=2):
        name, state = clean(get(row, 'name of candidate')), get(row, 'state')
        if not name or not state:
            continue
        remark = clean(get(row, 'remarks'))
        court = bool(remark and 'COURT' in remark.upper())
        url, label = photo_of(get, row)
        holder, holder_note = holder_of(get, row)
        add(office=office, ticket=None, party=clean(get(row, 'party')), state=state_name(state), stateOfOrigin=None,
            constituency=constituency_name(get(row, 'constituency')), lgas=lga_list(row[lga_col].value), inecName=name,
            pwd=pwd(get(row, 'pwd')), age=to_int(get(row, 'age')), gender=gender(get(row, 'gender')),
            qualifications=quals(get(row, 'qualification s')), courtOrder=court,
            photoUrl=url, photoLabel=label, note=None, holder=holder, holderNote=holder_note)

# ---------------------------------------------------------------- governorship
ws = wb['Gubernatorial']
get = getter(ws)
for row in ws.iter_rows(min_row=2):
    name, state = clean(get(row, 'name')), get(row, 'state')
    if not name or not state:
        continue
    office = 'governor' if str(get(row, 'position')).strip().lower().startswith('gov') else 'deputy-governor'
    remark = clean(get(row, 'remarks'))
    url, label = photo_of(get, row)
    holder, holder_note = holder_of(get, row)
    add(office=office, ticket=to_int(get(row, 'ticket sn')), party=clean(get(row, 'party')), state=state_name(state),
        stateOfOrigin=None, constituency=None, lgas=None, inecName=name, pwd=pwd(get(row, 'pwd')),
        age=to_int(get(row, 'age')), gender=gender(get(row, 'gender')), qualifications=quals(get(row, 'qualification s')),
        courtOrder=bool(remark and 'COURT' in remark.upper()), photoUrl=url, photoLabel=label,
        photoSource=clean(get(row, 'photo source')), note=clean(get(row, 'check note')), holder=holder, holderNote=holder_note)

# ---------------------------------------------------------------- ids, slugs, constituency ids
OFFICE_SHORT = {'president': 'president', 'vice-president': 'vp', 'senate': 'senate', 'reps': 'reps',
                'assembly': 'assembly', 'governor': 'governor', 'deputy-governor': 'deputy'}
# Common-usage names for well-known candidates. Everyone else keeps INEC's order, title-cased.
DISPLAY = {
    'TINUBU BOLA AHMED': 'Bola Tinubu',
    'ABUBAKAR ATIKU': 'Atiku Abubakar',
    'OBI PETER GREGORY': 'Peter Obi',
    'ONOR SANDY OJANG': 'Sandy Onor',
    'OKEREKE SUNDAY CHIBUZO': 'Chibuzo Okereke',
    'MAKINDE OLUSEYI ABIODUN': 'Seyi Makinde',
    'SOWORE OMOYELE': 'Omoyele Sowore',
    'SHETTIMA KASHIM': 'Kashim Shettima',
    'AMAECHI CHIBUIKE ROTIMI': 'Rotimi Amaechi',
    'MUSA MOHAMMED RABIU KWANKWASO': 'Rabiu Musa Kwankwaso',
    'GBADEBO RHODES VIVOUR': 'Gbadebo Rhodes-Vivour',
    'OTTI ALEX CHIOMA': 'Alex Otti',
    'HAMZAT KADRI OBAFEMI': 'Obafemi Hamzat',
    'DOHERTY OLUFUNSO ADESHINA': 'Funso Doherty',
    'DOHERTY ADEDEJI OLUGBEMIGA': 'Adedeji Doherty',
    'ODUNAIKE OLUWAPEMILERIN OLUROTIMI': 'Olurotimi Odunaike',
}
for r in records:
    r['displayName'] = DISPLAY.get(r['inecName']) if r['office'] in ('president', 'vice-president', 'governor', 'deputy-governor') and r['inecName'] in DISPLAY else title(r['inecName'])
    r['stateSlug'] = slugify(r['state']) if r['state'] else None
    if r['constituency']:
        r['constituencyId'] = f"{r['office']}:{r['stateSlug']}:{slugify(r['constituency'])}"
    else:
        r['constituencyId'] = f"{r['office']}:{r['stateSlug'] or 'national'}"

seen = collections.Counter()
for r in records:
    base = slugify(r['displayName'])
    seen[base] += 1
dups = {k for k, n in seen.items() if n > 1}
used = set()
for r in records:
    base = slugify(r['displayName'])
    slug = base
    if base in dups:
        slug = f"{base}-{slugify(r['party'])}-{OFFICE_SHORT[r['office']]}"
        if r['stateSlug']:
            slug += f"-{r['stateSlug']}"
    if slug in used:
        slug += '-' + slugify(r['constituency'] or 'x')
    i = 2
    while slug in used:
        slug = f'{slug}-{i}'; i += 1
    used.add(slug)
    r['slug'] = slug
    r['id'] = slug

# ---------------------------------------------------------------- checks
parties = collections.Counter(r['party'] for r in records)
for (office, cid), grp in collections.Counter((r['office'], r['constituencyId']) for r in records).items():
    pass
same_party = collections.Counter((r['constituencyId'], r['party'], r['office']) for r in records)
for (cid, p, o), n in same_party.items():
    if n > 1:
        report.append(f'party {p} appears {n} times in {cid}')
for r in records:
    if r['note']:
        report.append(f"sheet note: {r['displayName']} ({r['office']}, {r['state']}): {r['note']}")
    if r['courtOrder']:
        report.append(f"court order: {r['displayName']} ({r['office']}, {r['state']})")

photos = [{'id': r['id'], 'url': r['photoUrl'], 'label': r['photoLabel'], 'name': r['inecName']}
          for r in records if r['photoUrl']]

import os
os.makedirs(OUT, exist_ok=True)

# ---------------------------------------------------------------- site data (src/data)
SITE = os.path.join(ROOT, 'src/data')
import shutil
# Only replace what this script writes: polling units and officeholders live in src/data too.
shutil.rmtree(f'{SITE}/states', ignore_errors=True)
os.makedirs(f'{SITE}/states', exist_ok=True)
have_photo = set()
pr = f'{OUT}/photo-results.json'
if os.path.exists(pr):
    have_photo = {p['id'] for p in json.load(open(pr)) if p['status'] == 'ok'}
ORDER = {'president': 0, 'vice-president': 1, 'governor': 2, 'deputy-governor': 3, 'senate': 4, 'reps': 5, 'assembly': 6}


def slim(r):
    out = {'id': r['id'], 'name': r['displayName'], 'inecName': r['inecName'], 'party': r['party'],
           'office': r['office'], 'race': r['constituencyId']}
    for k in ('ticket', 'age', 'agePrinted', 'gender', 'qualifications', 'pwd', 'stateOfOrigin'):
        if r.get(k) is not None:
            out[k] = r[k]
    if r['courtOrder']:
        out['courtOrder'] = True
    if r['id'] in have_photo:
        out['photo'] = True
    return out


def sort_key(r):
    return (ORDER[r['office']], r['party'], r['displayName'])


national = sorted([r for r in records if r['state'] is None], key=sort_key)
json.dump([slim(r) for r in national], open(f'{SITE}/national.json', 'w'), ensure_ascii=False, separators=(',', ':'))

geo, slugs = [], {}
for r in national:
    slugs[r['id']] = 'national'
for state in sorted({r['state'] for r in records if r['state']}):
    rs = sorted([r for r in records if r['state'] == state], key=sort_key)
    sslug = slugify(state)
    races = {}
    lgas = collections.OrderedDict()
    for r in rs:
        slugs[r['id']] = sslug
        cid = r['constituencyId']
        if cid not in races:
            races[cid] = {'id': cid, 'office': r['office'], 'name': r['constituency']}
            if r['lgas']:
                races[cid]['lgas'] = r['lgas']
        if r['lgas']:
            for l in r['lgas']:
                e = lgas.setdefault(slugify(l), {'slug': slugify(l), 'name': l, 'senate': [], 'reps': [], 'assembly': []})
                if cid not in e[r['office']]:
                    e[r['office']].append(cid)
    json.dump({'state': state, 'slug': sslug, 'races': list(races.values()), 'candidates': [slim(r) for r in rs]},
              open(f'{SITE}/states/{sslug}.json', 'w'), ensure_ascii=False, separators=(',', ':'))
    geo.append({'slug': sslug, 'name': state, 'hasGovernorship': any(r['office'] == 'governor' for r in rs),
                'lgas': sorted(lgas.values(), key=lambda x: x['name'])})
json.dump(geo, open(f'{SITE}/geo.json', 'w'), ensure_ascii=False, separators=(',', ':'))
json.dump(slugs, open(f'{SITE}/slugs.json', 'w'), ensure_ascii=False, separators=(',', ':'))
# search index: [id, name, party, office, state]
json.dump([[r['id'], r['displayName'], r['party'], r['office'], r['state'] or '', r['constituency'] or ''] for r in sorted(records, key=sort_key)],
          open(f'{SITE}/search.json', 'w'), ensure_ascii=False, separators=(',', ':'))
json.dump(photos, open(f'{OUT}/photos.json', 'w'), ensure_ascii=False, indent=1)
# Sitting officeholders on the list for their own seat (CURRENT OFFICEHOLDER = Yes), for scripts/officeholders.
json.dump([{'race': r['constituencyId'], 'id': r['id'], 'name': r['displayName'], 'party': r['party'], 'office': r['office'],
            'note': r.get('holderNote')} for r in sorted(records, key=sort_key) if r.get('holder')],
          open(os.path.join(ROOT, 'scripts/officeholders/running.json'), 'w'), ensure_ascii=False, indent=1)
open(f'{OUT}/report.txt', 'w').write('\n'.join(report))

c = collections.Counter(r['office'] for r in records)
print('records', len(records), dict(c))
print('parties', len(parties), sorted(parties))
print('photo links', len(photos), collections.Counter(re.sub(r'https?://([^/]+).*', r'\1', p['url']) for p in photos))
print('report lines', len(report))
print('constituencies', {o: len({r['constituencyId'] for r in records if r['office'] == o}) for o in c})
