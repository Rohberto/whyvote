"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { PLEDGED_KEY } from "@/lib/pledge";

/**
 * Invites visitors to pledge once they have spent 3 minutes on the site in one visit
 * (time on every page counts, only while the tab is visible). Shown once; if closed,
 * not again for 7 days. Never shown to someone who has pledged, or on the pledge pages.
 */

const DELAY_MS = 3 * 60 * 1000;
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;
const VISIT_KEY = "whyvote:visit-ms"; // sessionStorage: time spent in this visit
const SEEN_KEY = "whyvote:pledge-popup"; // localStorage: when it was last closed
const TICK_MS = 5000;

const ELECTION_DAYS = [
  { date: "Sat 16 Jan 2027", offices: "President, Senate, House of Reps" },
  { date: "Sat 6 Feb 2027", offices: "Governor, State Assembly" },
];

const read = (store: () => Storage, key: string) => {
  try {
    return store().getItem(key);
  } catch {
    return null;
  }
};
const write = (store: () => Storage, key: string, value: string) => {
  try {
    store().setItem(key, value);
  } catch {
    // Storage unavailable (private mode): the pop-up may show again, which is harmless.
  }
};

function allowed(pathname: string) {
  if (pathname.startsWith("/pledge")) return false;
  if (read(() => localStorage, PLEDGED_KEY)) return false;
  const last = Number(read(() => localStorage, SEEN_KEY) ?? 0);
  return !last || Date.now() - last > SNOOZE_MS;
}

export function PledgePopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const primary = useRef<HTMLAnchorElement>(null);
  const returnFocus = useRef<Element | null>(null);

  // Count time across pages; open once the visit reaches 3 minutes.
  useEffect(() => {
    if (open || !allowed(pathname)) return;
    const id = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      const spent = Number(read(() => sessionStorage, VISIT_KEY) ?? 0) + TICK_MS;
      write(() => sessionStorage, VISIT_KEY, String(spent));
      if (spent >= DELAY_MS && allowed(window.location.pathname)) {
        returnFocus.current = document.activeElement;
        setOpen(true);
        fetch("/api/pledge-count")
          .then((r) => (r.ok ? r.json() : null))
          .then((d: { count: number | null } | null) => setCount(d?.count ?? null))
          .catch(() => {});
        write(() => localStorage, SEEN_KEY, String(Date.now()));
        track("pledge_popup_shown", { page: window.location.pathname });
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [pathname, open]);

  const close = useCallback((method: string) => {
    setOpen(false);
    write(() => localStorage, SEEN_KEY, String(Date.now()));
    track("pledge_popup_closed", { method });
    if (returnFocus.current instanceof HTMLElement) returnFocus.current.focus();
  }, []);

  // Escape closes; keep focus inside while open.
  useEffect(() => {
    if (!open) return;
    primary.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close("escape");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open || pathname.startsWith("/pledge")) return null;
  return (
    <div className="fixed inset-0 z-50 bg-ink/62 sm:flex sm:items-center sm:justify-center sm:p-5" onClick={() => close("outside")}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pledge-popup-title"
        className="absolute left-0 right-0 bottom-0 max-h-[85vh] overflow-y-auto bg-white rounded-t-[20px] shadow-[0_-8px_30px_rgba(0,0,0,0.25)] sm:relative sm:max-w-[600px] sm:w-full sm:max-h-[calc(100vh-40px)] sm:rounded-2xl sm:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <span aria-hidden="true" className="absolute top-2 left-1/2 -translate-x-1/2 w-11 h-[5px] rounded-[3px] bg-ink/25 sm:hidden" />
        <button
          type="button"
          aria-label="Close"
          onClick={() => close("x")}
          className="absolute top-3.5 right-3.5 w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/85 text-ink hover:bg-white cursor-pointer"
        >
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="bg-mint-pale pt-5.5 px-5 pb-4.5 flex flex-col gap-3.5 sm:pt-7 sm:px-8 sm:pb-5.5">
          <div className="flex gap-4 items-center pr-10">
            <span aria-hidden="true" className="relative flex-none w-16 h-20 sm:w-21 sm:h-26">
              <span className="fp-ink" style={{ background: "var(--color-brand)" }} />
            </span>
            <div className="flex flex-col gap-1.5 min-w-0">
              <p className="text-[12px] font-bold tracking-[1.2px] uppercase text-green">You’ve been reading up</p>
              <h2 id="pledge-popup-title" className="font-display text-[32px] leading-[0.92] text-ink sm:text-[42px]">
                Now make it count. Pledge to vote.
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {ELECTION_DAYS.map((d) => (
              <div key={d.date} className="flex-[1_1_160px] bg-white rounded-lg py-2.5 px-3">
                <b className="block text-[14px] text-ink">{d.date}</b>
                <span className="text-[12px] text-ink-soft">{d.offices}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4.5 px-5 pb-[max(22px,env(safe-area-inset-bottom))] flex flex-col gap-4 sm:pt-5.5 sm:px-8 sm:pb-7">
          <p className="text-[16px] leading-[1.6] text-ink-soft">
            Pledge to vote on both Saturdays. We’ll send your ballot, a reminder to collect your PVC, and a nudge before each election.
          </p>
          {count !== null && (
            <div className="flex gap-3.5 items-center bg-mist-light border border-line rounded-[10px] py-3 px-4">
              <span aria-hidden="true" className="inline-flex flex-none">
                {["bg-brand", "bg-sun", "bg-mint", "bg-ink"].map((c, i) => (
                  <span key={c} className={`w-7.5 h-7.5 rounded-full border-2 border-white ${c} ${i ? "-ml-2.5" : ""}`} />
                ))}
              </span>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="font-display text-[40px] leading-[0.9] text-brand sm:text-[48px]">{count.toLocaleString("en-NG")}</span>
                <span className="text-[14px] font-semibold text-ink">Nigerians have pledged so far</span>
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-3 items-center">
            <Link
              ref={primary}
              href="/pledge?ref=popup"
              className="flex-[1_1_100%] inline-flex items-center justify-center min-h-13 px-8 rounded-sm bg-sun text-ink text-[17px] font-bold no-underline hover:bg-[#E0B020] hover:text-ink sm:flex-none"
              onClick={() => {
                track("pledge_popup_click");
                setOpen(false);
              }}
            >
              Pledge to vote
            </Link>
            <button
              type="button"
              onClick={() => close("not_now")}
              className="flex-[1_1_100%] inline-flex items-center justify-center min-h-11 px-4 text-[15px] font-semibold text-ink-soft underline cursor-pointer hover:text-ink sm:flex-none"
            >
              Not now
            </button>
          </div>
          <p className="text-[13px] text-ink-faint">Takes 30 seconds. We never ask who you will vote for.</p>
        </div>
      </div>
    </div>
  );
}
