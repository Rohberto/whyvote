import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Find your polling unit",
  description:
    "Find the only place you can vote using the polling unit code on your PVC, or search by state, LGA and ward.",
};

export default function PollingUnitPage() {
  return (
    <>
      <Breadcrumb items={[{"label": "Get ready", "href": "/get-ready"}, {"label": "Polling unit locator"}]} />
      <section className="pt-8 pb-6 lg:pt-12 lg:pb-8">
        <Container>
          <div className="flex flex-col gap-4">
            <Eyebrow>Get ready · Step 04</Eyebrow>
            <h1 className="font-display text-[48px] leading-[0.95] text-ink uppercase lg:text-[84px]">Find your polling unit</h1>
            <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:text-[19px]">
              It is the only place you can vote, and it is printed on your PVC. Find it now, not on the morning of 16 January.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-12">
        <Container>
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-5 items-stretch">
              <div className="flex-[1.3_1_480px] bg-white border-2 border-ink rounded-lg p-5 flex flex-col gap-4.5 lg:p-8 box-content">
                <Chip>Fastest</Chip>
                <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[38px]">Type the code on your PVC</h2>
                <p className="text-[15px] leading-[1.6] text-ink-soft">
                  Four numbers, separated by slashes: state, LGA, ward and unit. Copy them exactly as printed.
                </p>
                <div className="flex flex-wrap gap-6 items-center">
                  <figure className="flex flex-col gap-2.5 items-start">
                    <svg className="w-[300px] max-w-full h-auto lg:w-[360px]" role="img" aria-label="Back of a PVC with the polling unit code highlighted" viewBox="0 0 340 214">
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
                    <figcaption className="text-[12px] text-ink-faint max-w-[300px] lg:max-w-[360px]">Illustration. The code is on the back of the card; the layout of real cards may differ.</figcaption>
                  </figure>
                  <div className="flex flex-col gap-3.5">
                    <div className="flex gap-1.5 items-start flex-wrap">
                      <label className="flex flex-col gap-1.5 items-center">
                        <input className="w-14 h-14 text-center border-2 border-line rounded-md text-[22px] font-bold text-ink bg-white" inputMode="numeric" aria-label="State code" defaultValue="24" maxLength={2} />
                        <span className="text-[11px] font-semibold tracking-[0.8px] uppercase text-ink-soft">State</span>
                      </label>
                      <span className="text-[26px] text-ink-faint pt-2.5" aria-hidden="true">/</span>
                      <label className="flex flex-col gap-1.5 items-center">
                        <input className="w-14 h-14 text-center border-2 border-line rounded-md text-[22px] font-bold text-ink bg-white" inputMode="numeric" aria-label="LGA code" defaultValue="02" maxLength={2} />
                        <span className="text-[11px] font-semibold tracking-[0.8px] uppercase text-ink-soft">LGA</span>
                      </label>
                      <span className="text-[26px] text-ink-faint pt-2.5" aria-hidden="true">/</span>
                      <label className="flex flex-col gap-1.5 items-center">
                        <input className="w-14 h-14 text-center border-2 border-line rounded-md text-[22px] font-bold text-ink bg-white" inputMode="numeric" aria-label="Ward code" defaultValue="05" maxLength={2} />
                        <span className="text-[11px] font-semibold tracking-[0.8px] uppercase text-ink-soft">Ward</span>
                      </label>
                      <span className="text-[26px] text-ink-faint pt-2.5" aria-hidden="true">/</span>
                      <label className="flex flex-col gap-1.5 items-center">
                        <input className="w-19 h-14 text-center border-2 border-line rounded-md text-[22px] font-bold text-ink bg-white" inputMode="numeric" aria-label="Unit code" defaultValue="012" maxLength={3} />
                        <span className="text-[11px] font-semibold tracking-[0.8px] uppercase text-ink-soft">Unit</span>
                      </label>
                    </div>
                    <ButtonLink size="lg" href="/get-ready/polling-unit/result">
                      Find my unit
                      <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </ButtonLink>
                  </div>
                </div>
              </div>
              <div className="flex-[1_1_300px] bg-mist rounded-lg p-5 flex flex-col gap-4 lg:p-8 box-content">
                <Chip tone="white">No PVC with you?</Chip>
                <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[38px]">Search by area</h2>
                <p className="text-[15px] leading-[1.6] text-ink-soft">
                  Choose your state, LGA and ward, then pick your unit from the list. We fill in what you already set on My ballot.
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center bg-white rounded-md py-3 px-3.5 text-[15px]">
                    <span className="text-ink-soft">State</span>
                    <b>Lagos</b>
                  </div>
                  <div className="flex justify-between items-center bg-white rounded-md py-3 px-3.5 text-[15px]">
                    <span className="text-ink-soft">LGA</span>
                    <b>Ajeromi-Ifelodun</b>
                  </div>
                  <div className="flex justify-between items-center bg-white rounded-md py-3 px-3.5 text-[15px]">
                    <span className="text-ink-soft">Ward</span>
                    <b>Choose a ward</b>
                  </div>
                </div>
                <div className="mt-auto">
                  <ButtonLink variant="white" size="lg" href="/get-ready/polling-unit/area">
                    Search by area
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </ButtonLink>
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-start bg-mist rounded-md py-3.5 px-4">
              <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v6M12 7.5v.5" />
              </svg>
              <p className="text-[14px] leading-[1.55] text-ink-soft">
                Every result comes from INEC’s published polling unit list. We never change addresses ourselves.{" "}
                <a className="font-semibold" href="#">Confirm on INEC’s official locator</a>
                .
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-3">
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-1.5">
                  <b className="text-[16px]">No PVC yet?</b>
                  <p className="text-[14px] leading-[1.6] text-ink-soft">Collect it first. Step 02 on Get ready shows where it is waiting.</p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-1.5">
                  <b className="text-[16px]">Moved since you registered?</b>
                  <p className="text-[14px] leading-[1.6] text-ink-soft">You vote where you registered unless INEC approved a transfer. See step 05.</p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-1.5">
                  <b className="text-[16px]">Lost your PVC?</b>
                  <p className="text-[14px] leading-[1.6] text-ink-soft">Report it at your INEC LGA office and ask about a replacement before the deadline.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
