"use client";

import { useChecklist } from "@/lib/checklist";
import Link from "next/link";
import { UnitCodeForm } from "@/components/polling-unit/unit-code-form";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";

export function ReadyChecklist() {
  const { done, toggle, count: n } = useChecklist();
  const [c0, c1, c2, c3, c4, c5] = done;
  const [t0, t1, t2, t3, t4, t5] = done.map((_, i) => () => toggle(i));

  return (
    <section className="pb-6">
      <Container>
        <div className="flex flex-col gap-3">
          <div className="sticky top-2 z-20 bg-night text-white rounded-lg py-3.5 px-5 flex flex-wrap gap-x-5 gap-y-2 items-center justify-between shadow-[0_6px_20px_rgba(15,37,24,0.25)] lg:py-5.5 lg:px-6">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[44px] leading-none lg:text-[64px]" aria-live="polite">{n}</span>
              <span className="font-display text-[20px] text-sage-light lg:text-[26px]">of 6 done</span>
            </div>
            <div className="flex-[1_1_260px] flex gap-1.5" aria-hidden="true">
              {done.map((isDone, i) => (
                <i key={i} className={`flex-1 h-2.5 rounded-xs ${isDone ? "bg-mint" : "bg-white/18"}`} />
              ))}
            </div>
            <p className="flex-[1_1_100%] text-[13px] text-sage-pale max-sm:hidden">Your progress stays on this device.</p>
          </div>
          <label className="flex gap-4 items-start p-5 bg-white border border-line rounded-lg cursor-pointer">
            <input className="w-6.5 h-6.5 mt-0.5 accent-green flex-none" type="checkbox" checked={c0} onChange={t0} />
            <span className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold tracking-[1px] text-green">STEP 01</span>
              <span className="font-display text-[26px]">Check that you are registered</span>
              <span className="text-[15px] leading-[1.6] text-ink-soft">
                Go to the INEC voter registration portal and enter your details. It tells you whether your registration exists and whether it is valid. Do this first, because everything else depends on it.
              </span>
            </span>
          </label>
          <label className="flex gap-4 items-start p-5 bg-white border border-line rounded-lg cursor-pointer">
            <input className="w-6.5 h-6.5 mt-0.5 accent-green flex-none" type="checkbox" checked={c1} onChange={t1} />
            <span className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold tracking-[1px] text-green">STEP 02</span>
              <span className="font-display text-[26px]">Find out where your PVC is</span>
              <span className="text-[15px] leading-[1.6] text-ink-soft">
                You can get your card from your{" "}
                <b className="text-ink">INEC local government office, 9am to 3pm</b>
                . Collection opened on{" "}
                <b className="text-ink">Friday 9 October 2026</b>
                . INEC has not announced a deadline yet, so collect yours now rather than later. You must go yourself, in person. Bring the slip you were given at registration if you still have it, and a form of identification.
              </span>
            </span>
          </label>
          <label className="flex gap-4 items-start p-5 bg-white border border-line rounded-lg cursor-pointer">
            <input className="w-6.5 h-6.5 mt-0.5 accent-green flex-none" type="checkbox" checked={c2} onChange={t2} />
            <span className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold tracking-[1px] text-green">STEP 03</span>
              <span className="font-display text-[26px]">Collect the card yourself</span>
              <span className="text-[15px] leading-[1.6] text-ink-soft">
                Nobody can collect your PVC for you. Around six million cards sat uncollected in INEC offices through the 2023 election. Those votes were lost before election day even started.
              </span>
            </span>
          </label>
          <label className="flex gap-4 items-start p-5 bg-white border border-line rounded-lg cursor-pointer">
            <input className="w-6.5 h-6.5 mt-0.5 accent-green flex-none" type="checkbox" checked={c3} onChange={t3} />
            <span className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold tracking-[1px] text-green">STEP 04</span>
              <span className="font-display text-[26px]">Confirm your polling unit</span>
              <span className="text-[15px] leading-[1.6] text-ink-soft">
                Your polling unit code is printed on the back of your PVC, and INEC’s polling unit locator will show you the physical location. Check it before January, not on the morning, because units are sometimes split or relocated.
              </span>
            </span>
          </label>
          <div className="-mt-1 mb-1 bg-mint-pale border border-[#CFE6D6] rounded-lg py-4.5 px-4 flex flex-wrap gap-4.5 items-center lg:ml-10.5 lg:py-5.5 lg:px-6">
            <div className="flex-[1_1_320px] flex flex-col gap-2.5">
              <Chip tone="white" className="self-start">
                <svg className="flex-none" aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                Polling unit locator
              </Chip>
              <p className="font-display text-[26px]">Find yours in under a minute</p>
              <UnitCodeForm />
              <Link className="text-[14px] font-semibold" href="/get-ready/polling-unit/area">No PVC with you? Search by area</Link>
            </div>
            <div className="flex-[0_0_auto] max-lg:hidden">
              <figure className="flex flex-col gap-2.5 items-start">
                <svg className="w-[260px] max-w-full h-auto" role="img" aria-label="Back of a PVC with the polling unit code highlighted" viewBox="0 0 340 214">
                  <rect x="1" y="1" width="338" height="212" rx="14" fill="#F4F7F2" stroke="#C9D6CB" strokeWidth="2" />
                  <rect x="1" y="1" width="338" height="34" rx="14" fill="#2F8A3B" />
                  <rect x="1" y="20" width="338" height="15" fill="#2F8A3B" />
                  <text x="18" y="23" fontFamily="Outfit, sans-serif" fontSize="11" fontWeight="700" fill="#FFFFFF" letterSpacing="1">BACK OF YOUR PVC</text>
                  <rect x="18" y="52" width="150" height="7" rx="3.5" fill="#D3DDD5" />
                  <rect x="18" y="68" width="210" height="7" rx="3.5" fill="#D3DDD5" />
                  <rect x="18" y="84" width="120" height="7" rx="3.5" fill="#D3DDD5" />
                  <rect x="12" y="104" width="250" height="46" rx="6" fill="#E3F07A" />
                  <text x="22" y="122" fontFamily="Outfit, sans-serif" fontSize="10" fontWeight="700" fill="#43574A" letterSpacing="1">POLLING UNIT</text>
                  <text x="22" y="142" fontFamily="Outfit, sans-serif" fontSize="19" fontWeight="700" fill="#0A3B2A">24/02/05/012</text>
                  <rect x="18" y="166" width="190" height="7" rx="3.5" fill="#D3DDD5" />
                  <rect x="18" y="182" width="140" height="7" rx="3.5" fill="#D3DDD5" />
                  <rect x="262" y="150" width="58" height="46" rx="4" fill="none" stroke="#C9D6CB" strokeWidth="2" />
                </svg>
                <figcaption className="text-[12px] text-ink-faint max-w-[260px]">Illustration. The code is on the back of the card; the layout of real cards may differ.</figcaption>
              </figure>
            </div>
          </div>
          <label className="flex gap-4 items-start p-5 bg-white border border-line rounded-lg cursor-pointer">
            <input className="w-6.5 h-6.5 mt-0.5 accent-green flex-none" type="checkbox" checked={c4} onChange={t4} />
            <span className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold tracking-[1px] text-green">STEP 05</span>
              <span className="font-display text-[26px]">Plan to vote where you registered</span>
              <span className="text-[15px] leading-[1.6] text-ink-soft">
                The window to transfer your polling unit has closed, so you can only vote at the unit where you registered. If you have moved and are no longer close to your polling unit, make plans to be back before each election day.
              </span>
            </span>
          </label>
          <label className="flex gap-4 items-start p-5 bg-white border border-line rounded-lg cursor-pointer">
            <input className="w-6.5 h-6.5 mt-0.5 accent-green flex-none" type="checkbox" checked={c5} onChange={t5} />
            <span className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold tracking-[1px] text-green">STEP 06</span>
              <span className="font-display text-[26px]">Put both dates in your phone now</span>
              <span className="text-[15px] leading-[1.6] text-ink-soft">
                Saturday 16 January 2027 for President, Senate and House of Representatives. Saturday 6 February 2027 for Governor and State House of Assembly. They are three weeks apart and both of them matter.
              </span>
            </span>
          </label>
        </div>
      </Container>
    </section>
  );
}
