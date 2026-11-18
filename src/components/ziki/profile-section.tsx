"use client";

import { useEffect, useRef, type ReactNode } from "react";

const DESKTOP = "(min-width: 64rem)";

/**
 * A profile section. On phones it starts closed with a one-line preview; on desktop it is always
 * open and reads as a plain heading (globals.css shows its content before this script runs).
 */
export function ProfileSection({ id, title, preview, children }: { id: string; title: string; preview: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const sync = () => {
      if (ref.current && mq.matches) ref.current.open = true;
    };
    // A citation or contents link that points inside a closed section opens it first.
    const reveal = () => {
      const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target && ref.current?.contains(target) && !ref.current.open) {
        ref.current.open = true;
        target.scrollIntoView();
      }
    };
    sync();
    reveal();
    mq.addEventListener("change", sync);
    window.addEventListener("hashchange", reveal);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("hashchange", reveal);
    };
  }, []);

  return (
    <details ref={ref} id={id} className="profile-section group scroll-mt-6 border-t border-line lg:border-t-0">
      <summary
        className="flex gap-3 items-center justify-between py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden lg:py-0 lg:pt-2 lg:cursor-default"
        onClick={(e) => {
          if (window.matchMedia(DESKTOP).matches) e.preventDefault();
        }}
      >
        <span className="flex flex-col gap-0.5 min-w-0">
          <h2 className="font-display text-[24px] text-ink lg:text-[32px]">{title}</h2>
          <span className="text-[13px] text-ink-faint lg:hidden">{preview}</span>
        </span>
        <svg
          aria-hidden="true"
          className="flex-none text-ink transition-transform group-open:rotate-180 lg:hidden"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="pb-4.5 flex flex-col gap-3.5 lg:pt-3.5 lg:pb-0">{children}</div>
    </details>
  );
}
