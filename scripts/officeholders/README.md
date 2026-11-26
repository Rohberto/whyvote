# Current officeholders

Who holds each seat now, shown on My ballot ("Current officeholder") and as the officeholder badge
on that person's candidate card and Ziki profile.

Both lists come from the content team's candidate sheet ("2027 INEC Final List of Candidates updated
with photos & officeholders"):

- **Running again:** the CURRENT OFFICEHOLDER column on each candidate tab. Only "Yes" is used;
  "Flagged" and "Likely, confirm" rows stay unmarked until someone confirms them.
  `scripts/candidates/extract.py` writes these to `running.json`.
- **Not running:** the "Officeholders Not Contesting" tab.

## Update

From the repo root, after `scripts/candidates/extract.py`:

```
python3 scripts/officeholders/build.py "path/to/the sheet.xlsx"
```

It writes `src/data/officeholders.json` and `review.txt`. Read `review.txt` after each run:

- `NO SEAT`: a not-contesting row whose seat could not be matched to a 2027 race (State Assembly
  roster seats are often just the LGA name, so they need a close match). Not shown.
- `TWO HOLDERS`: two candidates in one race are marked "Yes". Neither is shown.
- `DROPPED`: State Assembly rows where the roster and the candidate sheet disagree about who holds
  a seat. Neither is shown. The State Assembly data was not independently verified.
- `CONFLICT`: a non-Assembly seat where the not-contesting tab names someone else. The holder running
  again is kept.
- `CHECK`: rows the sheet itself marks "confirm" or "not checked". Shown, but worth a look.

The President and Lagos governor entries in `src/lib/ziki-notes.ts` override the generated text.
