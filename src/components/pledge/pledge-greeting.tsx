"use client";

import { useSyncExternalStore } from "react";
import { PLEDGE_STORAGE_KEY, type StoredPledge } from "@/lib/pledge";

let cachedRaw: string | null = null;
let cached: StoredPledge | null = null;

function read(): StoredPledge | null {
  let raw: string | null = null;
  try {
    raw = sessionStorage.getItem(PLEDGE_STORAGE_KEY);
  } catch {
    return null;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cached = raw ? (JSON.parse(raw) as StoredPledge) : null;
    } catch {
      cached = null;
    }
  }
  return cached;
}

const subscribe = () => () => {};

function useStoredPledge() {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function PledgedHeading({ className }: { className?: string }) {
  const pledge = useStoredPledge();
  return <h1 className={className}>{pledge?.firstName ? `Pledged, ${pledge.firstName}.` : "Pledged."}</h1>;
}

export function PledgeReminderNote({ className }: { className?: string }) {
  const pledge = useStoredPledge();
  if (!pledge) {
    return (
      <p className={className}>
        Here is your ballot. Reminders will go to the contacts you gave us, before PVC collection closes and before
        each Saturday.
      </p>
    );
  }
  return (
    <p className={className}>
      Here is your ballot. Reminders will go to {pledge.email}
      {pledge.phone ? `, and by text to ${pledge.phone},` : ","} before PVC collection closes and before each Saturday.
    </p>
  );
}
