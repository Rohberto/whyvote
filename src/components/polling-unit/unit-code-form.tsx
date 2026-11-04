"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

const FIELDS = [
  { label: "State", max: 2, width: "w-14" },
  { label: "LGA", max: 2, width: "w-14" },
  { label: "Ward", max: 2, width: "w-14" },
  { label: "Unit", max: 3, width: "w-19" },
] as const;

/** The four boxes of a PVC polling unit code. Pasting "24/02/05/012" into any box fills all four. */
export function UnitCodeForm({ initial = ["", "", "", ""], invalid = false }: { initial?: string[]; invalid?: boolean }) {
  const router = useRouter();
  const [parts, setParts] = useState(initial);
  const [error, setError] = useState(invalid ? "That code is not on INEC’s list. Check each number against your PVC." : "");
  const [pending, startTransition] = useTransition();
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function set(i: number, raw: string) {
    const many = raw.split(/[\s/\-.]+/).filter(Boolean);
    if (many.length === 4) {
      setParts(many.map((p, j) => p.replace(/\D/g, "").slice(0, FIELDS[j].max)));
      refs.current[3]?.focus();
      return;
    }
    const value = raw.replace(/\D/g, "").slice(0, FIELDS[i].max);
    setParts((p) => p.map((x, j) => (j === i ? value : x)));
    setError("");
    if (value.length === FIELDS[i].max) refs.current[i + 1]?.focus();
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (parts.some((p) => !p)) {
      setError("Fill in all four numbers from your PVC.");
      refs.current[parts.findIndex((p) => !p)]?.focus();
      return;
    }
    const code = parts.map((p, i) => p.padStart(FIELDS[i].max, "0")).join("-");
    startTransition(() => router.push(`/get-ready/polling-unit/unit/${code}`));
  }

  const border = error ? "border-danger" : "border-line focus:border-ink";
  return (
    <form className="flex flex-col gap-3.5" onSubmit={submit} noValidate>
      <div className="flex gap-1.5 items-start flex-wrap">
        {FIELDS.map((f, i) => (
          <div key={f.label} className="contents">
            {i > 0 && (
              <span className="text-[26px] text-ink-faint pt-2.5" aria-hidden="true">
                /
              </span>
            )}
            <label className="flex flex-col gap-1.5 items-center">
              <input
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={`${f.width} h-14 text-center border-2 rounded-md text-[22px] font-bold text-ink bg-white outline-none ${border}`}
                inputMode="numeric"
                autoComplete="off"
                aria-label={`${f.label} code`}
                aria-invalid={Boolean(error)}
                placeholder={"0".repeat(f.max)}
                value={parts[i]}
                onChange={(e) => set(i, e.target.value)}
                onPaste={(e) => {
                  const text = e.clipboardData.getData("text");
                  if (/[\s/\-.]/.test(text.trim())) {
                    e.preventDefault();
                    set(i, text);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !parts[i] && i > 0) refs.current[i - 1]?.focus();
                }}
              />
              <span className="text-[11px] font-semibold tracking-[0.8px] uppercase text-ink-soft">{f.label}</span>
            </label>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-[14px] text-danger font-semibold" role="alert">
          {error}
        </p>
      )}
      <div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Finding…" : "Find my unit"}
          <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Button>
      </div>
    </form>
  );
}
