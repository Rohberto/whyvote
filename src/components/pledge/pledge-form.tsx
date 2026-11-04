"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { submitPledge, type PledgeState } from "@/app/pledge/actions";
import { BALLOT_STORAGE_KEY, type PickerState } from "@/components/ballot/ballot-picker";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PLEDGE_STORAGE_KEY } from "@/lib/pledge";

const HOLD_MS = 1250;
const fieldLabel = "text-[12px] font-semibold tracking-[1px] uppercase text-ink-soft";
const fieldInput =
  "min-h-13 px-3.5 border border-line rounded-md text-[16px] text-ink bg-white box-content aria-invalid:border-danger";

function readSavedPlace() {
  try {
    return localStorage.getItem(BALLOT_STORAGE_KEY);
  } catch {
    return null;
  }
}
const noSubscribe = () => () => {};

export function PledgeForm({ states }: { states: PickerState[] }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<PledgeState, FormData>(submitPledge, { status: "idle" });
  // Start from the place saved on My ballot, if any; the voter can change it.
  const savedRaw = useSyncExternalStore(noSubscribe, readSavedPlace, () => null);
  const saved = (() => {
    try {
      const v = JSON.parse(savedRaw ?? "null");
      return v && states.some((s) => s.slug === v.state) ? (v as { state: string; lga: string }) : null;
    } catch {
      return null;
    }
  })();
  const [place, setPlace] = useState<{ state: string; lga: string } | null>(null);
  const stateSlug = place?.state ?? saved?.state ?? "";
  const lgaSlug = place ? place.lga : (saved?.lga ?? "");
  const lgas = states.find((s) => s.slug === stateSlug)?.lgas ?? [];
  const [progress, setProgress] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const frame = useRef<number | null>(null);
  const done = state.status === "done";
  const errors = state.status === "error" ? state.fields ?? {} : {};

  // Keep the details for the confirmation screen (this tab only), then go there.
  useEffect(() => {
    if (state.status !== "done") return;
    try {
      sessionStorage.setItem(
        PLEDGE_STORAGE_KEY,
        JSON.stringify({ firstName: state.firstName, email: state.email, phone: state.phone, state: state.state, lga: state.lga }),
      );
      if (state.state && state.lga) localStorage.setItem(BALLOT_STORAGE_KEY, JSON.stringify({ state: state.state, lga: state.lga }));
    } catch {
      // Storage unavailable: the confirmation screen falls back to generic copy.
    }
    router.push(state.state && state.lga ? `/pledge/done?state=${state.state}&lga=${state.lga}` : "/pledge/done");
  }, [state, router]);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  function stop() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
  }

  function start() {
    if (done || pending || frame.current !== null) return;
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    const began = performance.now();
    const tick = (now: number) => {
      const p = Math.min(100, ((now - began) / HOLD_MS) * 100);
      setProgress(p);
      if (p >= 100) {
        frame.current = null;
        form.requestSubmit();
        return;
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }

  function release() {
    stop();
    setProgress(0);
  }

  const filled = done || pending ? 100 : state.status === "error" ? 0 : progress;
  const label = done ? "Pledged" : pending ? "Saving your pledge" : progress > 0 ? "Keep holding" : "Press and hold to pledge";

  return (
    <section className="pb-14">
      <Container>
        <form ref={formRef} action={formAction} className="flex flex-wrap gap-5 items-stretch">
          <fieldset
            disabled={done}
            className="flex-[1.3_1_420px] bg-white border border-line rounded-lg p-5 flex flex-col gap-4 lg:p-8"
          >
            <legend className="sr-only">Your details</legend>
            <h2 className="font-display text-[30px] leading-[0.95] text-ink">Your details</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(240px,100%),1fr))] gap-3.5">
              <label className="flex flex-col gap-1.5">
                <span className={fieldLabel}>Your name</span>
                <input
                  className={fieldInput}
                  type="text"
                  name="name"
                  required
                  minLength={2}
                  autoComplete="name"
                  placeholder="First and last name"
                  aria-invalid={errors.name ? true : undefined}
                />
                {errors.name && <span className="text-[13px] text-danger">{errors.name}</span>}
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={fieldLabel}>Email address</span>
                <input
                  className={fieldInput}
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@email.com"
                  aria-invalid={errors.email ? true : undefined}
                />
                {errors.email && <span className="text-[13px] text-danger">{errors.email}</span>}
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={fieldLabel}>
                  Phone number <span className="normal-case tracking-[0] font-medium text-ink-faint">(optional)</span>
                </span>
                <input
                  className={fieldInput}
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="080..."
                  aria-invalid={errors.phone ? true : undefined}
                />
                {errors.phone && <span className="text-[13px] text-danger">{errors.phone}</span>}
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={fieldLabel}>State</span>
                <select
                  className={fieldInput}
                  name="state"
                  value={stateSlug}
                  onChange={(e) => setPlace({ state: e.target.value, lga: "" })}
                >
                  <option value="">Select your state</option>
                  {states.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name === "FCT" ? "Abuja (FCT)" : s.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={fieldLabel}>Local government area</span>
                <select
                  className={`${fieldInput} disabled:opacity-60`}
                  name="lga"
                  value={lgaSlug}
                  disabled={!stateSlug}
                  onChange={(e) => setPlace({ state: stateSlug, lga: e.target.value })}
                >
                  <option value="">Select your LGA</option>
                  {lgas.map((l) => (
                    <option key={l.slug} value={l.slug}>
                      {l.name}
                    </option>
                  ))}
                </select>
                <span className="text-[13px] text-ink-faint">The list updates to match the state you choose.</span>
              </label>
            </div>
            <label className="flex gap-3 items-start bg-mint-pale rounded-md py-3.5 px-4 cursor-pointer">
              <input className="w-5.5 h-5.5 mt-0.5 accent-green flex-none" type="checkbox" name="sms" defaultChecked />
              <span className="flex flex-col gap-1">
                <b className="text-[15px]">Text me reminders too</b>
                <span className="text-[14px] leading-[1.5] text-ink-soft">
                  We will send a text before PVC collection closes and the day before each Saturday. Needs a phone
                  number. Reply STOP any time.
                </span>
              </span>
            </label>
            <p className="text-[13px] leading-[1.6] text-ink-faint">
              PoliZ uses this only to send your ballot summary and election reminders. It is never sold, never shared
              with a party or candidate, and you can stop the messages any time.
            </p>
          </fieldset>

          <div className="flex-[1_1_300px] bg-mint-pale border border-[#CFE6D6] rounded-2xl py-7.5 px-5 flex flex-col justify-center items-center gap-1 box-content">
            <button
              type="button"
              aria-label={label}
              aria-disabled={done || pending}
              className="relative w-[180px] h-[229px] cursor-pointer touch-none select-none rounded-lg focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-green"
              onPointerDown={start}
              onPointerUp={release}
              onPointerLeave={release}
              onPointerCancel={release}
              onKeyDown={(e) => {
                if ((e.key === " " || e.key === "Enter") && !e.repeat) {
                  e.preventDefault();
                  start();
                }
              }}
              onKeyUp={(e) => {
                if (e.key === " " || e.key === "Enter") release();
              }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <span className="fp-ghost" />
              <span className="fp-ink" style={{ clipPath: `inset(${100 - filled}% 0 0 0)` }} />
            </button>
            <p className="mt-4 text-[18px] font-bold text-center" aria-live="polite">
              {label}
            </p>
            <p className="text-[14px] text-ink-faint text-center max-w-[260px]">
              Press your fingerprint until it fills.
            </p>
            {state.status === "error" && (
              <p role="alert" className="mt-2 text-[14px] font-semibold text-danger text-center">
                {state.message}
              </p>
            )}
            {done && (
              <div className="mt-3.5">
                {/* Shown only if the automatic move to the summary is slow. */}
                <ButtonLink href="/pledge/done">See your ballot summary</ButtonLink>
              </div>
            )}
          </div>
        </form>
      </Container>
    </section>
  );
}
