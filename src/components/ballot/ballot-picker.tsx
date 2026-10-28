"use client";

import { useRouter } from "next/navigation";
import { useId, useState, useTransition } from "react";

export type PickerState = { slug: string; name: string; lgas: { slug: string; name: string }[] };

export const BALLOT_STORAGE_KEY = "whyvote:ballot";

const selectClass = "min-h-13 px-3.5 border border-line rounded-md bg-white text-[16px] text-ink box-content disabled:opacity-60";
const labelClass = "text-[12px] font-semibold tracking-[1px] uppercase text-ink-soft";

/** State and LGA selects. Picking an LGA opens that LGA's ballot page. */
export function BallotPicker({ states, state, lga }: { states: PickerState[]; state: string; lga: string }) {
  const router = useRouter();
  const [stateSlug, setStateSlug] = useState(state);
  const [pending, startTransition] = useTransition();
  const id = useId();
  const lgas = states.find((s) => s.slug === stateSlug)?.lgas ?? [];

  function go(s: string, l: string) {
    try {
      localStorage.setItem(BALLOT_STORAGE_KEY, JSON.stringify({ state: s, lga: l }));
    } catch {
      // Storage unavailable: the URL still carries the choice.
    }
    startTransition(() => router.push(`/ballot/${s}/${l}`, { scroll: false }));
  }

  return (
    <div className="flex flex-wrap gap-3.5" aria-busy={pending}>
      <div className="flex flex-col gap-1.5 flex-[1_1_240px]">
        <label htmlFor={`${id}-state`} className={labelClass}>
          State
        </label>
        <select
          id={`${id}-state`}
          className={selectClass}
          value={stateSlug}
          onChange={(e) => {
            const next = e.target.value;
            setStateSlug(next);
            const only = states.find((s) => s.slug === next)?.lgas;
            if (only?.length === 1) go(next, only[0].slug);
          }}
        >
          {states.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name === "FCT" ? "Abuja (FCT)" : s.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5 flex-[1_1_240px]">
        <label htmlFor={`${id}-lga`} className={labelClass}>
          Local government area
        </label>
        <select
          id={`${id}-lga`}
          className={selectClass}
          value={stateSlug === state ? lga : ""}
          disabled={pending}
          onChange={(e) => e.target.value && go(stateSlug, e.target.value)}
        >
          {stateSlug !== state && <option value="">Choose your LGA</option>}
          {lgas.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
