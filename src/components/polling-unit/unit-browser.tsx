"use client";

import Link from "next/link";
import { useDeferredValue, useId, useMemo, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import type { Ward } from "@/lib/polling-units";

const PAGE = 40;
const selectClass = "min-h-13 px-3.5 border border-line rounded-md bg-white text-[16px] text-ink box-content";
const labelClass = "text-[12px] font-semibold tracking-[1px] uppercase text-ink-soft";
function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Ward select, text filter and the list of units for one LGA. The chosen ward is kept in the URL hash (#ward-05). */
export function UnitBrowser({ lgaCode, wards }: { lgaCode: string; wards: Ward[] }) {
  const id = useId();
  const hash = useSyncExternalStore(subscribeHash, () => window.location.hash, () => "");
  const fromHash = /^#ward-(\d{2})$/.exec(hash)?.[1] ?? "";
  const ward = wards.some((w) => w.c === fromHash) ? fromHash : "";
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);
  const q = norm(useDeferredValue(query));

  function chooseWard(c: string) {
    setShown(PAGE);
    history.replaceState(null, "", c ? `#ward-${c}` : window.location.pathname);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  const rows = useMemo(() => {
    const words = q ? q.split(" ") : [];
    const out: { code: string; name: string; location: string; ward: string }[] = [];
    for (const w of wards) {
      if (ward && w.c !== ward) continue;
      const wardText = norm(w.n);
      for (const [u, name, location] of w.u) {
        const code = `${lgaCode}/${w.c}/${u}`;
        if (words.length) {
          const text = `${norm(name)} ${norm(location)} ${wardText} ${code.replaceAll("/", " ")}`;
          if (!words.every((word) => text.includes(word))) continue;
        }
        out.push({ code, name, location, ward: w.n });
      }
    }
    return out;
  }, [wards, ward, q, lgaCode]);

  const current = wards.find((w) => w.c === ward);
  return (
    <div className="flex flex-col gap-4.5">
      <div className="flex flex-wrap gap-3.5">
        <div className="flex flex-col gap-1.5 flex-[1_1_240px]">
          <label htmlFor={`${id}-ward`} className={labelClass}>
            Ward (registration area)
          </label>
          <select id={`${id}-ward`} className={selectClass} value={ward} onChange={(e) => chooseWard(e.target.value)}>
            <option value="">All {wards.length} wards</option>
            {wards.map((w) => (
              <option key={w.c} value={w.c}>
                {w.c} · {w.n}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 flex-[2_1_300px]">
          <label htmlFor={`${id}-q`} className={labelClass}>
            Filter units
          </label>
          <span className="flex items-center gap-2.5 min-h-13 px-3.5 border border-line rounded-md bg-white box-content">
            <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              id={`${id}-q`}
              className="flex-1 min-w-0 border-0 [outline:0] text-[16px] bg-transparent text-ink"
              type="search"
              placeholder="School, church, street or unit number"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShown(PAGE);
              }}
            />
          </span>
        </div>
      </div>
      <div className="flex justify-between items-baseline gap-2.5 flex-wrap">
        <b className="text-[16px]" aria-live="polite">
          {rows.length.toLocaleString("en-NG")} polling unit{rows.length === 1 ? "" : "s"}
          {current ? ` in ${current.n}` : ""}
          {q ? ` matching “${query.trim()}”` : ""}
        </b>
        <span className="text-[13px] text-ink-faint">Sorted by ward and unit number</span>
      </div>
      {rows.length > 0 ? (
        <div className="border border-line rounded-lg overflow-hidden">
          {rows.slice(0, shown).map((r) => (
            <Link
              key={r.code}
              className="flex gap-3.5 items-center py-3.5 px-4 border-b border-b-line last:border-b-0 no-underline text-ink bg-white hover:bg-mist-light hover:text-ink"
              href={`/get-ready/polling-unit/unit/${r.code.replaceAll("/", "-")}`}
            >
              <span className="font-mono text-[14px] font-bold text-green flex-none w-[104px] lg:w-[120px]">{r.code}</span>
              <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                <b className="text-[15px] wrap-anywhere">{r.name}</b>
                <span className="text-[13px] text-ink-soft wrap-anywhere">{[r.location, ward ? "" : r.ward].filter(Boolean).join(" · ")}</span>
              </span>
              <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          ))}
        </div>
      ) : (
        <p className="bg-mist rounded-md py-4 px-4 text-[15px] text-ink-soft">
          No units match. Try a shorter word, or choose “All wards”.
        </p>
      )}
      {rows.length > shown && (
        <div>
          <Button variant="soft" onClick={() => setShown((n) => n + PAGE * 2)}>
            Show more units ({(rows.length - shown).toLocaleString("en-NG")} left)
          </Button>
        </div>
      )}
    </div>
  );
}
