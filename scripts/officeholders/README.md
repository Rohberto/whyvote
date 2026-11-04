# Officeholders running again

Marks sitting legislators who are on INEC's 2027 list for the same seat. They get an
"Officeholder" tag on My ballot, the full candidate lists, their Ziki profile and the pledge email.

1. Edit the CSVs here: one row per seat, with the person who holds it **now**.
   - `senate.csv`: all Senate seats, from the 2023 roster with later court and appointment changes.
     Seats vacated since 2023 whose holder we have not confirmed are left out:
     Ebonyi South, Yobe East, Anambra South, Edo Central, Zamfara Central.
   - `reps.csv`: House of Representatives. **Only 18 states so far** (Abia to Imo, Lagos, Jigawa).
     Still needed: Kaduna, Kano, Katsina, Kebbi, Kogi, Kwara, Nasarawa, Niger, Ogun, Ondo, Osun,
     Oyo, Plateau, Rivers, Sokoto, Taraba, Yobe, Zamfara and the FCT.
   - `assembly.csv` (add it): State Houses of Assembly, same columns. Use `office` = `assembly`.
2. Run `python3 scripts/officeholders/build.py`.
3. Read `review.txt`: every row says whether it matched a 2027 candidate, was not on the list,
   or needs a fix (NO SEAT means the seat name did not match an INEC race name).

Columns: `office,state,seat,name,note`. `note` records the source.
