"use client";

import { useRouter } from "next/navigation";
import { useId, useState, useSyncExternalStore, useTransition } from "react";

export type PickerState = { slug: string; name: string; lgas: { slug: string; name: string }[] };

export const BALLOT_STORAGE_KEY = "whyvote:ballot";

function subscribeStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function readStored() {
  try {
    return localStorage.getItem(BALLOT_STORAGE_KEY);
  } catch {
    return null;
  }
}

/** The place saved from My ballot, if it is still a real state and LGA. */
function validPlace(states: PickerState[], raw: string | null): { state: string; lga: string } | null {
  try {
    const value = JSON.parse(raw ?? "null");
    return value && states.some((s) => s.slug === value.state && s.lgas.some((l) => l.slug === value.lga)) ? value : null;
  } catch {
    return null;
  }
}

const selectClass = "min-h-13 px-3.5 border border-line rounded-md bg-white text-[16px] text-ink box-content disabled:opacity-60";
const labelClass = "text-[12px] font-semibold tracking-[1px] uppercase text-ink-soft";

/**
 * State and LGA selects. Picking an LGA opens `${basePath}/<state>/<lga>` (the ballot by default).
 * With no `lga`, it starts on "Choose your LGA" and fills in the place saved from My ballot.
 */
export function BallotPicker({
  states,
  state,
  lga,
  basePath = "/ballot",
}: {
  states: PickerState[];
  state: string;
  lga: string;
  basePath?: string;
}) {
  const router = useRouter();
  const stored = useSyncExternalStore(subscribeStorage, readStored, () => null);
  const saved = lga ? null : validPlace(states, stored);
  const [chosenState, setStateSlug] = useState<string | null>(null);
  const stateSlug = chosenState ?? saved?.state ?? state;
  const [pending, startTransition] = useTransition();
  const id = useId();
  const lgas = states.find((s) => s.slug === stateSlug)?.lgas ?? [];

  function go(s: string, l: string) {
    try {
      localStorage.setItem(BALLOT_STORAGE_KEY, JSON.stringify({ state: s, lga: l }));
    } catch {
      // Storage unavailable: the URL still carries the choice.
    }
    startTransition(() => router.push(`${basePath}/${s}/${l}`, { scroll: false }));
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
          {!stateSlug && <option value="">Choose your state</option>}
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
          value={stateSlug === state && lga ? lga : ""}
          disabled={pending}
          onChange={(e) => e.target.value && go(stateSlug, e.target.value)}
        >
          {(stateSlug !== state || !lga) && <option value="">Choose your LGA</option>}
          {lgas.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.name}
            </option>
          ))}
        </select>
      </div>
      {saved && (
        <button
          type="button"
          className="basis-full text-left text-[14px] font-semibold text-green underline cursor-pointer"
          onClick={() => go(saved.state, saved.lga)}
        >
          Use {states.find((s) => s.slug === saved.state)?.lgas.find((l) => l.slug === saved.lga)?.name}, the LGA saved from My ballot
        </button>
      )}
    </div>
  );
}
