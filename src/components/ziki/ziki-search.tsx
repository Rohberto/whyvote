"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

type Result = { id: string; name: string; party: string; office: string; state: string; constituency: string };

const OFFICE: Record<string, string> = {
  president: "President",
  "vice-president": "Running mate",
  governor: "Governor",
  "deputy-governor": "Deputy Governor",
  senate: "Senate",
  reps: "House of Reps",
  assembly: "State Assembly",
};

/** Search every candidate by name, party, state or constituency. */
export function ZikiSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[] | null>(null);
  const statusId = useId();

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) return;
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      fetch(`/api/ziki/search?q=${encodeURIComponent(q)}`, { signal: ctrl.signal })
        .then((r) => (r.ok ? r.json() : []))
        .then(setResults)
        .catch(() => {});
    }, 200);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query]);

  const shown = query.trim().length >= 2 ? results : null;

  return (
    <div className="flex flex-col gap-2 max-w-[520px]">
      <label className="flex flex-col gap-2">
        <span className="text-[14px] font-semibold">Search the ziki</span>
        <span className="flex items-center gap-2.5 min-h-13 px-3.5 border border-line rounded-md bg-white box-content focus-within:border-ink">
          <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            className="flex-1 border-0 outline-none text-[16px] bg-transparent text-ink"
            type="search"
            placeholder="A name, party, state or constituency"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-describedby={statusId}
            autoComplete="off"
          />
        </span>
      </label>
      <p id={statusId} className="sr-only" aria-live="polite">
        {shown ? `${shown.length}${shown.length === 20 ? " or more" : ""} results` : ""}
      </p>
      {shown && (
        <div className="border border-line rounded-md bg-white overflow-hidden">
          {shown.length === 0 ? (
            <p className="py-3.5 px-4 text-[14px] text-ink-soft">No candidate matches “{query.trim()}”.</p>
          ) : (
            <ul>
              {shown.map((r) => (
                <li key={r.id} className="border-b border-line last:border-b-0">
                  <Link href={`/ziki/${r.id}`} className="flex flex-col gap-0.5 py-3 px-4 no-underline text-ink hover:bg-mist-light hover:text-ink">
                    <b className="text-[15px]">{r.name}</b>
                    <span className="text-[13px] text-ink-soft">
                      {r.party} · {OFFICE[r.office]}
                      {r.constituency ? `, ${r.constituency}` : ""}
                      {r.state ? ` · ${r.state}` : ""}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
