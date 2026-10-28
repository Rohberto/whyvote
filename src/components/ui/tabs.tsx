"use client";

import { createContext, useContext, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type TabsState = { selected: number; select: (i: number) => void; count: number; id: string };

const TabsContext = createContext<TabsState | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used inside <Tabs>");
  return ctx;
}

/**
 * `hashes` (optional): one URL hash per tab, e.g. ["president", "senate"]. A matching
 * `#hash` in the address opens that tab, so other pages can link straight to it.
 */
export function Tabs({ count, hashes, children }: { count: number; hashes?: string[]; children: ReactNode }) {
  const [selected, select] = useState(0);
  const id = useId();

  const hashKey = hashes?.join(" ");
  useEffect(() => {
    if (!hashKey) return;
    const list = hashKey.split(" ");
    const sync = () => {
      const i = list.indexOf(window.location.hash.slice(1));
      if (i >= 0) select(i);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [hashKey]);

  return <TabsContext.Provider value={{ selected, select, count, id }}>{children}</TabsContext.Provider>;
}

const pill = "flex-none min-h-11 px-4 rounded-full border-2 text-[14px] font-semibold cursor-pointer whitespace-nowrap";

/** Pill-shaped tab buttons with arrow-key navigation. */
export function TabList({ label, tabs, className }: { label: string; tabs: string[]; className?: string }) {
  const { selected, select, id } = useTabs();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const last = tabs.length - 1;
    const target =
      e.key === "ArrowRight" ? (selected === last ? 0 : selected + 1)
      : e.key === "ArrowLeft" ? (selected === 0 ? last : selected - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (target === null) return;
    e.preventDefault();
    select(target);
    refs.current[target]?.focus();
  }

  return (
    <div className={className} role="tablist" aria-label={label}>
      {tabs.map((tab, i) => {
        const active = i === selected;
        return (
          <button
            key={tab}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={active}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={onKeyDown}
            className={`${pill} ${active ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"}`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({ index, className, children }: { index: number; className?: string; children: ReactNode }) {
  const { selected, id } = useTabs();
  if (index !== selected) return null;
  return (
    <div className={className} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} tabIndex={0}>
      {children}
    </div>
  );
}

const roundButton = "w-12 h-12 rounded-full inline-flex items-center justify-center flex-none cursor-pointer";

/** Previous / next arrows with a position label and dots. */
export function TabStepper({ names, className, noun }: { names: string[]; className?: string; noun: string }) {
  const { selected, select, count } = useTabs();
  return (
    <div className={className}>
      <button
        className={`${roundButton} bg-mist text-ink hover:bg-mist-deep`}
        type="button"
        onClick={() => select((selected + count - 1) % count)}
        aria-label={`Previous ${noun}`}
      >
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      </button>
      <div className="flex-1 flex flex-col items-center gap-2">
        <span className="text-[13px] font-semibold text-ink-soft" aria-live="polite">
          {names[selected]} · {selected + 1} of {count}
        </span>
        <div className="flex gap-1.5" aria-hidden="true">
          {names.map((n, i) => (
            <i key={n} className={`block h-2 rounded-sm ${i === selected ? "w-5.5 bg-ink" : "w-2 bg-line-soft"}`} />
          ))}
        </div>
      </div>
      <button
        className={`${roundButton} bg-ink text-white hover:bg-forest`}
        type="button"
        onClick={() => select((selected + 1) % count)}
        aria-label={`Next ${noun}`}
      >
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
