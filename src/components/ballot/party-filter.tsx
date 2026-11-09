"use client";

import { useRouter } from "next/navigation";
import { useId, useSyncExternalStore } from "react";
import { track } from "@/lib/analytics";

type Option = { code: string; name: string };

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener("whyvote:party", onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("whyvote:party", onChange);
  };
}
const current = () => new URLSearchParams(window.location.search).get("party")?.toUpperCase() ?? "";

const selectClass = "min-h-12 px-3.5 border border-line rounded-md bg-white text-[16px] text-ink box-content";

/**
 * "Filter by party". On the All candidates page it hides every other party's rows (and says
 * when a race has no candidate from that party). Elsewhere, pass `href` to open that page filtered.
 */
export function PartyFilter({ parties, href }: { parties: Option[]; href?: string }) {
  const id = useId();
  const router = useRouter();
  const party = useSyncExternalStore(subscribe, current, () => "");

  function choose(code: string) {
    track("filter_party", { party: code || "all", page: window.location.pathname });
    if (href) {
      if (code) router.push(`${href}?party=${code.toLowerCase()}`);
      return;
    }
    const u = new URL(window.location.href);
    if (code) u.searchParams.set("party", code.toLowerCase());
    else u.searchParams.delete("party");
    history.replaceState(null, "", u);
    window.dispatchEvent(new Event("whyvote:party"));
  }

  const name = parties.find((p) => p.code === party)?.name;
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
      <label htmlFor={id} className="text-[12px] font-semibold tracking-[1px] uppercase text-ink-soft">
        Filter by party
      </label>
      <select id={id} className={selectClass} value={href ? "" : party} onChange={(e) => choose(e.target.value)}>
        <option value="">{href ? "Choose a party" : "All parties"}</option>
        {parties.map((p) => (
          <option key={p.code} value={p.code}>
            {p.name} ({p.code})
          </option>
        ))}
      </select>
      {!href && party && name && (
        <>
          {/* Hide other parties' rows; say so when a race has none from this party. */}
          <style>{`[data-party]:not([data-party="${party}"]){display:none}
[data-race-list]:not(:has([data-party="${party}"]))::after{content:"No ${name.replace(/"/g, "")} candidate in this race.";display:block;padding:14px 16px;color:#43574A;font-size:15px}`}</style>
          <button type="button" className="text-[14px] font-semibold text-green underline cursor-pointer" onClick={() => choose("")}>
            Show all parties
          </button>
        </>
      )}
    </div>
  );
}
