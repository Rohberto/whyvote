import { useCallback, useSyncExternalStore } from "react";

/** The six Get ready steps, in order. */
export const CHECKLIST_STEPS = [
  "Check that you are registered",
  "Find out where your PVC is waiting",
  "Collect the card yourself",
  "Confirm your polling unit",
  "Decide whether you need a transfer",
  "Put both dates in your phone now",
] as const;

const KEY = "whyvote:checklist";
const EMPTY: readonly boolean[] = CHECKLIST_STEPS.map(() => false);
const listeners = new Set<() => void>();

let cachedRaw: string | null | undefined;
let cachedValue: readonly boolean[] = EMPTY;

function read(): readonly boolean[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return cachedValue;
  }
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    cachedValue = Array.isArray(parsed) ? CHECKLIST_STEPS.map((_, i) => parsed[i] === true) : EMPTY;
  } catch {
    cachedValue = EMPTY;
  }
  return cachedValue;
}

function write(value: boolean[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode): keep the in-memory value for this visit.
    cachedRaw = JSON.stringify(value);
    cachedValue = value;
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Checklist progress, saved on this device only. */
export function useChecklist() {
  const done = useSyncExternalStore(subscribe, read, () => EMPTY);
  const toggle = useCallback(
    (index: number) => {
      const next = [...done];
      next[index] = !next[index];
      write(next);
    },
    [done],
  );
  const count = done.filter(Boolean).length;
  const nextStep = CHECKLIST_STEPS[done.indexOf(false)] ?? null;
  return { done, toggle, count, nextStep };
}
