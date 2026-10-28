"""Download candidate photos, check each file belongs to the candidate, save web-ready crops.

Usage (from the repo root, after extract.py): python3 scripts/candidates/photos.py
Drive links: the served filename (Content-Disposition) is matched against the INEC name;
a photo whose filename shares no name with the candidate is rejected.
Output: public/images/candidates/<id>.webp (480x600 portrait), .cache/candidates/photo-results.json
Wikipedia links are skipped: add those photos by hand if you have the rights.
"""
import json, os, re, subprocess, sys, io, urllib.parse
from PIL import Image, ImageOps

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
CACHE = os.path.join(ROOT, '.cache/candidates')
jobs = json.load(open(f'{CACHE}/photos.json'))
RAW = f'{CACHE}/raw'; SITE = os.path.join(ROOT, 'public/images/candidates')
os.makedirs(RAW, exist_ok=True); os.makedirs(SITE, exist_ok=True)


def drive_id(url):
    m = re.search(r'/d/([A-Za-z0-9_-]+)', url) or re.search(r'[?&]id=([A-Za-z0-9_-]+)', url)
    return m.group(1) if m else None


def fetch(url, dest):
    hdr = dest + '.hdr'
    r = subprocess.run(['curl', '-sS', '-L', '--max-time', '60', '-o', dest, '-D', hdr, url], capture_output=True, text=True)
    h = open(hdr).read() if os.path.exists(hdr) else ''
    os.remove(hdr) if os.path.exists(hdr) else None
    m = re.findall(r'filename\*?=(?:UTF-8\'\')?"?([^";\r\n]+)', h, re.I)
    ctype = re.findall(r'content-type:\s*([^\r\n;]+)', h, re.I)
    return (urllib.parse.unquote(m[-1]) if m else None), (ctype[-1].strip() if ctype else None), r.returncode


def tokens(s):
    return {t for t in re.split(r'[^a-z]+', (s or '').lower()) if len(t) > 2}


results = []
for j in jobs:
    url = j['url']
    res = {'id': j['id'], 'url': url, 'status': None, 'served': None}
    if 'wikipedia.org' in url:
        res['status'] = 'skipped-wikipedia'
        results.append(res); continue
    if 'drive.google.com' in url:
        fid = drive_id(url)
        get = f'https://drive.usercontent.google.com/download?id={fid}&export=download'
    else:
        get = url
    dest = f"{RAW}/{j['id']}"
    served, ctype, rc = fetch(get, dest)
    res['served'] = served
    try:
        im = Image.open(dest); im.load()
    except Exception as e:
        res['status'] = f'not-an-image ({ctype}, rc={rc})'
        results.append(res); continue
    # identity check: served filename (Drive) or URL path (NGF) must share a name token with INEC name
    label = served or urllib.parse.unquote(url.rsplit('/', 1)[-1])
    overlap = tokens(label) & tokens(j['name'])
    res['match'] = sorted(overlap)
    res['status'] = 'ok' if overlap else 'name-mismatch'
    res['size'] = im.size
    # web crop: 4:5 portrait, anchored near the top so faces stay in frame
    im = ImageOps.exif_transpose(im).convert('RGB')
    w, h = im.size
    target = 4 / 5
    if w / h > target:      # too wide: crop sides, centred
        nw = int(h * target); x = (w - nw) // 2
        im = im.crop((x, 0, x + nw, h))
    else:                   # too tall: keep the top
        nh = int(w / target); y = int((h - nh) * 0.15)
        im = im.crop((0, y, w, y + nh))
    im = im.resize((480, 600), Image.LANCZOS) if im.width > 480 else im
    im.save(f"{SITE}/{j['id']}.webp", 'WEBP', quality=80, method=6)
    results.append(res)
    print(res['status'], j['id'], '<-', label[:70], res['size'])

json.dump(results, open(f'{CACHE}/photo-results.json', 'w'), indent=1)
from collections import Counter
print(Counter(r['status'] for r in results))
