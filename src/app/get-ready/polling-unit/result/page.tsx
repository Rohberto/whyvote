import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { PledgeBand } from "@/components/layout/pledge-band";

export const metadata: Metadata = {
  title: "Your polling unit",
  description:
    "Your polling unit, how to get there and what to expect on election day.",
};

export default function PollingUnitResultPage() {
  return (
    <>
      <Breadcrumb items={[{"label": "Get ready", "href": "/get-ready"}, {"label": "Polling unit locator", "href": "/get-ready/polling-unit"}, {"label": "Your polling unit"}]} />
      <section className="pt-8 pb-12 lg:pt-12 lg:pb-16">
        <Container>
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-6 items-start">
              <div className="flex-[1.5_1_480px] min-w-0 flex flex-col gap-4">
                <div className="bg-ink text-white rounded-lg py-5.5 px-4.5 flex flex-col gap-3 lg:py-8 lg:px-9">
                  <p className="text-[12px] font-semibold tracking-[1.4px] uppercase text-lime">Your polling unit</p>
                  <p className="font-mono text-[30px] font-bold tracking-[1px] lg:text-[40px]">24/02/05/012</p>
                  <p className="font-display text-[32px] leading-[0.95] lg:text-[44px]">[Polling unit name]</p>
                  <p className="text-[16px] leading-[1.5] text-sage-pale">[Location description from INEC’s list, for example the school or landmark and street]</p>
                  <div className="flex flex-wrap gap-2">
                    <Chip>Ward 05</Chip>
                    <Chip tone="white">Ajeromi-Ifelodun LGA</Chip>
                    <Chip tone="white">Lagos</Chip>
                  </div>
                </div>
                <div className="relative h-[220px] rounded-lg overflow-hidden bg-[#E9EFE7] lg:h-[300px]">
                  <svg className="absolute top-0 right-0 bottom-0 left-0 w-full h-full" aria-hidden="true" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice">
                    <g stroke="#FFFFFF" strokeWidth="14" fill="none">
                      <path d="M-20 80 L620 120" />
                      <path d="M120 -20 L180 320" />
                      <path d="M380 -20 L340 320" />
                      <path d="M-20 230 L620 200" />
                    </g>
                    <g stroke="#FFFFFF" strokeWidth="6" fill="none">
                      <path d="M0 160 L600 150" />
                      <path d="M260 0 L270 300" />
                      <path d="M480 0 L500 300" />
                    </g>
                  </svg>
                  <div className="absolute left-[50%] top-[46%] [transform:translate(-50%,-100%)]">
                    <svg aria-hidden="true" width="44" height="44" viewBox="0 0 24 24">
                      <path d="M12 22s7-6.2 7-11.5A7 7 0 0 0 5 10.5C5 15.8 12 22 12 22z" fill="#0A3B2A" />
                      <circle cx="12" cy="10.5" r="2.6" fill="#E3F07A" />
                    </svg>
                  </div>
                  <span className="absolute left-3 bottom-3 bg-white rounded-sm py-1 px-2 text-[12px] text-ink-soft">Map preview</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <ButtonLink variant="mint" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
                      <circle cx="12" cy="9.5" r="2.5" />
                    </svg>
                    Get directions
                  </ButtonLink>
                  <ButtonLink variant="soft" href="#">
                    Open in Google Maps
                    <svg className="flex-none" aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                    </svg>
                  </ButtonLink>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <ButtonLink size="lg" href="/ballot">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    Save to my ballot
                  </ButtonLink>
                  <ButtonLink variant="soft" size="lg" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20z" />
                      <path d="M9 9.5c.3 2.3 2.2 4.2 4.5 4.5l1-1.2 2 .8" />
                    </svg>
                    Share with family
                  </ButtonLink>
                  <ButtonLink variant="outline" size="lg" href="#">
                    Confirm on INEC
                    <svg className="flex-none" aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                    </svg>
                  </ButtonLink>
                </div>
              </div>
              <div className="flex-[1_1_320px] flex flex-col gap-4">
                <div className="bg-mist rounded-lg p-5 flex flex-col gap-1">
                  <h2 className="font-display text-[26px] leading-[0.95] text-ink">Your constituencies</h2>
                  <div className="flex justify-between gap-3 py-3 border-b border-b-line text-[15px]">
                    <span className="text-ink-soft">Senatorial district</span>
                    <b className="text-right">Lagos West</b>
                  </div>
                  <div className="flex justify-between gap-3 py-3 border-b border-b-line text-[15px]">
                    <span className="text-ink-soft">Federal constituency</span>
                    <b className="text-right">Ajeromi-Ifelodun</b>
                  </div>
                  <div className="flex justify-between gap-3 py-3 border-b border-b-line text-[15px]">
                    <span className="text-ink-soft">State constituency</span>
                    <b className="text-right">[Exact seat from your ward]</b>
                  </div>
                  <div className="flex gap-2.5 items-start bg-mint-pale rounded-md py-3 px-3.5 mt-3">
                    <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2A7F36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    <p className="text-[14px] leading-[1.5]">
                      Your State House of Assembly race is now exact.{" "}
                      <Link className="font-semibold" href="/ballot">See it on My ballot</Link>
                    </p>
                  </div>
                </div>
                <div className="bg-white border border-line rounded-lg p-5 flex flex-col gap-3">
                  <h2 className="font-display text-[26px] leading-[0.95] text-ink">Before you go</h2>
                  <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                    <li>Visit once before election day so you know the way.</li>
                    <li>Bring your PVC. Nothing else replaces it.</li>
                    <li>Arrive early. Anyone already in the queue at closing time still votes.</li>
                    <li>Opening hours for 2027 will be confirmed by INEC.</li>
                  </ul>
                  <Link className="text-[14px] font-semibold" href="/get-ready">Read the full election day guide</Link>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-5">
              <Link className="text-[14px] font-semibold" href="/get-ready/polling-unit">Not your unit? Search again</Link>
              <Link className="text-[14px] font-semibold" href="/get-ready/polling-unit/help">Report a problem with this unit</Link>
              <p className="text-[13px] leading-[1.6] text-ink-faint basis-full">From INEC’s published polling unit list. Last checked 18 October 2026.</p>
            </div>
          </div>
        </Container>
      </section>
      <PledgeBand />
    </>
  );
}
