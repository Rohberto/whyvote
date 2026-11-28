# Current officeholders

Who holds each seat now, shown on My ballot ("Current officeholder") and as the officeholder badge
on that person's candidate card and Ziki profile.

Both lists come from the content team's candidate sheet ("2027 INEC Final List of Candidates updated
with photos & officeholders"):

- **Running again:** the "Officeholders Re-contesting" tab ("Yes" rows only; "Likely, confirm"
  rows wait until someone confirms them in `manual.json`). This list wins over the other two.
  Deputy governors and the Vice President, which the tab does not list, come from the CURRENT
  OFFICEHOLDER column, via `running.json` written by `scripts/candidates/extract.py`.
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
- `SKIPPED`: not-contesting rows that contradict the re-contesting list (someone else named for a seat
  whose holder is running again, or the same person placed in another seat). The re-contesting list is kept.
- `AMBIGUOUS` / `NO MATCH`: a re-contesting row that matches two candidates, or none.
- `CHECK`: rows the sheet itself marks "confirm" or "not checked". Shown, but worth a look.

The President and Lagos governor entries in `src/lib/ziki-notes.ts` override the generated text.
