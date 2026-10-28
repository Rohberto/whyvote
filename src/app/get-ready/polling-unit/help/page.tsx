import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Polling unit help",
  description:
    "What to do if your polling unit code is not recognised, your unit has moved, or the details look wrong.",
};

export default function PollingUnitHelpPage() {
  return (
    <>
      <Breadcrumb items={[{"label": "Get ready", "href": "/get-ready"}, {"label": "Polling unit locator", "href": "/get-ready/polling-unit"}, {"label": "States and errors"}]} />
      <section className="pt-8 pb-5 lg:pt-12 lg:pb-7">
        <Container>
          <div className="flex flex-col gap-3.5">
            <Eyebrow>Polling unit locator</Eyebrow>
            <h1 className="font-display text-[40px] leading-[0.95] text-ink uppercase lg:text-[64px]">Edge cases and errors</h1>
            <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:text-[19px]">
              What the locator shows when something is not straightforward. Every state keeps a way back to INEC.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-12">
        <Container>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(360px,100%),1fr))] gap-4">
            <div className="bg-white border border-line rounded-lg p-5 flex flex-col gap-3.5 lg:p-7">
              <Chip tone="danger">Code not recognised</Chip>
              <h2 className="font-display text-[28px] leading-[0.95] text-ink lg:text-[32px]">We could not find that unit</h2>
              <div className="flex gap-1.5 items-start flex-wrap">
                <label className="flex flex-col gap-1.5 items-center">
                  <input className="w-14 h-14 text-center border-2 border-danger rounded-md text-[22px] font-bold text-ink bg-white" inputMode="numeric" aria-label="State code" defaultValue="24" maxLength={2} />
                  <span className="text-[11px] font-semibold tracking-[0.8px] uppercase text-ink-soft">State</span>
                </label>
                <span className="text-[26px] text-ink-faint pt-2.5" aria-hidden="true">/</span>
                <label className="flex flex-col gap-1.5 items-center">
                  <input className="w-14 h-14 text-center border-2 border-danger rounded-md text-[22px] font-bold text-ink bg-white" inputMode="numeric" aria-label="LGA code" defaultValue="02" maxLength={2} />
                  <span className="text-[11px] font-semibold tracking-[0.8px] uppercase text-ink-soft">LGA</span>
                </label>
                <span className="text-[26px] text-ink-faint pt-2.5" aria-hidden="true">/</span>
                <label className="flex flex-col gap-1.5 items-center">
                  <input className="w-14 h-14 text-center border-2 border-danger rounded-md text-[22px] font-bold text-ink bg-white" inputMode="numeric" aria-label="Ward code" defaultValue="05" maxLength={2} />
                  <span className="text-[11px] font-semibold tracking-[0.8px] uppercase text-ink-soft">Ward</span>
                </label>
                <span className="text-[26px] text-ink-faint pt-2.5" aria-hidden="true">/</span>
                <label className="flex flex-col gap-1.5 items-center">
                  <input className="w-19 h-14 text-center border-2 border-danger rounded-md text-[22px] font-bold text-ink bg-white" inputMode="numeric" aria-label="Unit code" defaultValue="912" maxLength={3} />
                  <span className="text-[11px] font-semibold tracking-[0.8px] uppercase text-ink-soft">Unit</span>
                </label>
              </div>
              <div className="flex gap-2.5 items-start bg-danger-pale rounded-md py-3 px-3.5" role="alert">
                <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B42318" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l10 18H2L12 3z" />
                  <path d="M12 10v5M12 18v.5" />
                </svg>
                <p className="text-[14px] leading-[1.5] text-danger">
                  No unit 912 in Ward 05. Check each number against your PVC. Unit numbers usually start with 0.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <ButtonLink href="/get-ready/polling-unit">Try again</ButtonLink>
                <ButtonLink variant="soft" href="/get-ready/polling-unit/area">Search by area</ButtonLink>
              </div>
            </div>
            <div className="bg-white border border-line rounded-lg p-5 flex flex-col gap-3.5 lg:p-7">
              <Chip tone="warn">Unit relocated</Chip>
              <h2 className="font-display text-[28px] leading-[0.95] text-ink lg:text-[32px]">INEC has moved this unit</h2>
              <div className="flex flex-col gap-2">
                <div className="flex gap-3 py-3 px-3.5 rounded-md bg-mist">
                  <span className="flex-[0_0_60px] text-[12px] font-bold tracking-[0.8px] uppercase text-ink-soft pt-0.5">Before</span>
                  <span className="text-[15px] line-through text-ink-faint">[Old location]</span>
                </div>
                <div className="flex gap-3 py-3 px-3.5 rounded-md bg-warn-pale">
                  <span className="flex-[0_0_60px] text-[12px] font-bold tracking-[0.8px] uppercase text-ink-soft pt-0.5">Now</span>
                  <span className="text-[15px] font-bold">[New location from INEC]</span>
                </div>
              </div>
              <p className="text-[14px] leading-[1.6] text-ink-soft">
                Your code stays the same. Only the place has changed. Go to the new location on election day.
              </p>
              <div className="flex flex-wrap gap-2">
                <ButtonLink href="#">Get directions to the new place</ButtonLink>
                <ButtonLink variant="outline" href="#">
                  Confirm on INEC
                  <svg className="flex-none" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </ButtonLink>
              </div>
            </div>
            <div className="bg-white border border-line rounded-lg p-5 flex flex-col gap-3.5 lg:p-7">
              <Chip tone="mist">Not available yet</Chip>
              <h2 className="font-display text-[28px] leading-[0.95] text-ink lg:text-[32px]">We are still loading your area</h2>
              <p className="text-[15px] leading-[1.6] text-ink-soft">
                Polling units for this state are not on whyvote yet. INEC’s own locator has the full national list.
              </p>
              <div className="flex flex-wrap gap-2">
                <ButtonLink href="#">
                  Use INEC’s locator
                  <svg className="flex-none" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </ButtonLink>
                <ButtonLink variant="soft" href="#">Tell me when it is ready</ButtonLink>
              </div>
            </div>
            <div className="bg-white border border-line rounded-lg p-5 flex flex-col gap-3.5 lg:p-7">
              <Chip tone="night">Offline</Chip>
              <h2 className="font-display text-[28px] leading-[0.95] text-ink lg:text-[32px]">You are offline</h2>
              <p className="text-[15px] leading-[1.6] text-ink-soft">Your saved unit is still on this phone:</p>
              <div className="bg-ink text-white rounded-md py-3.5 px-4">
                <p className="font-mono font-bold text-[18px]">24/02/05/012</p>
                <p className="mt-1 text-[14px] text-sage-pale">[Polling unit name] · Ward 05</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <ButtonLink variant="soft" href="#">Try again</ButtonLink>
              </div>
            </div>
            <div className="bg-white border border-line rounded-lg p-5 flex flex-col gap-3.5 lg:p-7">
              <Chip tone="mint">Report a problem</Chip>
              <h2 className="font-display text-[28px] leading-[0.95] text-ink lg:text-[32px]">Something wrong with this unit?</h2>
              <label className="flex gap-2.5 items-center min-h-11 text-[15px]">
                <input className="w-5 h-5 accent-green" type="radio" name="issue" defaultChecked />
                The unit has moved
              </label>
              <label className="flex gap-2.5 items-center min-h-11 text-[15px]">
                <input className="w-5 h-5 accent-green" type="radio" name="issue" />
                The address or landmark is wrong
              </label>
              <label className="flex gap-2.5 items-center min-h-11 text-[15px]">
                <input className="w-5 h-5 accent-green" type="radio" name="issue" />
                The unit was closed or merged
              </label>
              <label className="flex gap-2.5 items-center min-h-11 text-[15px]">
                <input className="w-5 h-5 accent-green" type="radio" name="issue" />
                Something else
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-semibold tracking-[1px] uppercase text-ink-soft">Tell us more (optional)</span>
                <textarea className="p-3 border border-line rounded-md text-[15px]" rows={3} />
              </label>
              <p className="text-[13px] leading-[1.6] text-ink-faint">Reports go to our corrections team. We check them against INEC before anything changes.</p>
              <div className="flex flex-wrap gap-2">
                <ButtonLink href="#">Send report</ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
