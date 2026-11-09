"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { PLEDGED_KEY } from "@/lib/pledge";

/**
 * Invites visitors to pledge once they have spent 2 minutes on the site in one visit
 * (time on every page counts, only while the tab is visible). Shown once; if closed,
 * not again for 7 days. Never shown to someone who has pledged, or on the pledge pages.
 */

const DELAY_MS = 2 * 60 * 1000;
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;
const VISIT_KEY = "whyvote:visit-ms"; // sessionStorage: time spent in this visit
const SEEN_KEY = "whyvote:pledge-popup"; // localStorage: when it was last closed
const TICK_MS = 5000;

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
  const primary = useRef<HTMLAnchorElement>(null);
  const returnFocus = useRef<Element | null>(null);

  // Count time across pages; open once the visit reaches 2 minutes.
  useEffect(() => {
    if (open || !allowed(pathname)) return;
    const id = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      const spent = Number(read(() => sessionStorage, VISIT_KEY) ?? 0) + TICK_MS;
      write(() => sessionStorage, VISIT_KEY, String(spent));
      if (spent >= DELAY_MS && allowed(window.location.pathname)) {
        returnFocus.current = document.activeElement;
        setOpen(true);
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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 sm:items-center sm:p-5" onClick={() => close("outside")}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pledge-popup-title"
        className="relative w-full max-h-[70vh] overflow-y-auto bg-white rounded-t-2xl py-6 px-5 pb-[max(24px,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(15,37,24,0.2)] sm:max-w-[460px] sm:rounded-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => close("x")}
          className="absolute top-3 right-3 w-11 h-11 inline-flex items-center justify-center rounded-full text-ink-soft hover:bg-mist cursor-pointer"
        >
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <p className="text-[12px] font-semibold tracking-[1.2px] uppercase text-green">Two Saturdays. Five offices.</p>
        <h2 id="pledge-popup-title" className="mt-2 pr-8 font-display text-[34px] leading-[0.95] text-ink lg:text-[40px]">
          Will you vote in 2027?
        </h2>
        <p className="mt-3 text-[16px] leading-[1.55] text-ink-soft">
          Vote on Saturday 16 January and Saturday 6 February 2027. Make the promise now and we will remind you.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            ref={primary}
            href="/pledge?ref=popup"
            className={buttonClasses("sun", "lg")}
            onClick={() => {
              track("pledge_popup_click");
              setOpen(false);
            }}
          >
            Pledge to vote
          </Link>
          <button type="button" onClick={() => close("not_now")} className="text-[15px] font-semibold text-green underline cursor-pointer">
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
