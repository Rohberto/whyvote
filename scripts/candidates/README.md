# Candidate data import

Builds the site's candidate data from INEC's final list of candidates for the 2027 general election
(the spreadsheet with tabs Presidential, Senate, House of Reps, Gubernatorial, SHoA).

```bash
pip install openpyxl pillow            # once
python3 scripts/candidates/extract.py "path/to/2027 INEC Final List of Candidates.xlsx"
python3 scripts/candidates/photos.py   # downloads and checks photos linked in the sheet
python3 scripts/candidates/extract.py "path/to/2027 INEC Final List of Candidates.xlsx"   # again, to record which photos exist
```

Outputs:

- `src/data/national.json`: presidential tickets
- `src/data/states/<state>.json`: governorship, Senate, House and State Assembly races and candidates per state
- `src/data/geo.json`: states, LGAs and the races each LGA votes in (drives My ballot)
- `src/data/slugs.json`, `src/data/search.json`: Ziki lookups and search
- `public/images/candidates/<id>.webp`: 480×600 photos
- `.cache/candidates/report.txt`: issues to review (misprinted ages, court orders, the sheet's check notes)

Notes:

- Names keep INEC's order, title-cased. Common-usage names for well-known candidates are set in `DISPLAY` in `extract.py`; a name change changes that candidate's URL.
- Photos are only kept when the downloaded file's name matches the candidate. Wikipedia-only photos are skipped.
- Ages INEC printed impossibly (e.g. 147) are shown as "Not given".
