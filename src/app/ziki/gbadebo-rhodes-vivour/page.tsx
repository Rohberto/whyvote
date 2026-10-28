import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZikiCard } from "@/components/candidates/candidate-cards";
import { CandidatePhoto } from "@/components/candidates/candidate-photo";
import { PartyBadge } from "@/components/candidates/party-badge";
import { getCandidate } from "@/lib/candidates";
import { ZIKI_HEADLINES } from "@/lib/ziki-notes";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PledgeBand } from "@/components/layout/pledge-band";

export const metadata: Metadata = {
  title: "Gbadebo Rhodes-Vivour",
  description:
    "Ziki profile: Gbadebo Rhodes-Vivour, candidate for Governor of Lagos in the 6 February 2027 election.",
};

export default async function RhodesVivourPage() {
  const found = await getCandidate("gbadebo-rhodes-vivour");
  if (!found) notFound();
  return (
    <>
      <Breadcrumb items={[{"label": "Ziki", "href": "/ziki"}, {"label": "Lagos governorship candidates, 2027", "href": "/ziki"}, {"label": "Gbadebo Rhodes-Vivour"}]} />
      <section className="pt-8 pb-5 lg:pt-12 lg:pb-7">
        <Container>
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-[48px] leading-[0.95] text-ink uppercase lg:text-[84px]">Gbadebo Rhodes-Vivour</h1>
            <div className="flex flex-wrap gap-y-2.5 gap-x-3.5 items-center">
              <PartyBadge code="ADC" size="md" />
              <span className="text-[20px] font-semibold lg:text-[24px]">Architect and 2023 runner-up</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip>For Governor</Chip>
              <Chip tone="mist">African Democratic Congress</Chip>
            </div>
          </div>
        </Container>
      </section>
      <section className="pt-2 pb-10">
        <Container>
          <div className="flex flex-wrap gap-10">
            <div className="flex-[999_1_560px] min-w-0 flex flex-col gap-4.5">
              <p className="text-[18px] leading-[1.7] text-ink">
                Gbadebo Rhodes-Vivour is an architect and the{" "}
                African Democratic Congress candidate in the 2027{" "}
                Lagos governorship election.
                <sup>
                  <a className="text-green text-[11px]" href="#ref-1">[1]</a>
                </sup>
              </p>
              <nav className="bg-mist-light border border-line rounded-md py-4 px-5" aria-label="Contents">
                <b className="text-[14px]">Contents</b>
                <ol className="mt-2.5 pl-5 flex flex-col gap-1.5 text-[14px] list-decimal">
                  <li>
                    <a href="#c0">Political career</a>
                  </li>
                  <li>
                    <a href="#c1">2027 candidacy</a>
                  </li>
                  <li>
                    <a href="#c2">Past offices</a>
                  </li>
                  <li>
                    <a href="#c3">Previous elections</a>
                  </li>
                  <li>
                    <a href="#c4">Accomplishments</a>
                  </li>
                  <li>
                    <a href="#c5">Sources</a>
                  </li>
                </ol>
              </nav>
              <h2 className="mt-3.5 font-display text-[32px]" id="c0">Political career</h2>
              <p className="text-[17px] leading-[1.7] text-ink-soft">
                He was the{" "}
                PDP candidate for the Lagos West Senate seat in 2019. In 2023 he ran for governor on the{" "}
                Labour Party ticket and finished second.
                <sup>
                  <a className="text-green text-[11px]" href="#ref-2">[2]</a>
                </sup>
              </p>
              <h2 className="mt-3.5 font-display text-[32px]" id="c1">2027 candidacy</h2>
              <p className="text-[17px] leading-[1.7] text-ink-soft">
                He moved to the ADC ahead of 2027 and is on INEC’s final list of 17 Lagos governorship candidates.
                <sup>
                  <a className="text-green text-[11px]" href="#ref-1">[1]</a>
                </sup>
                <sup>
                  <a className="text-green text-[11px]" href="#ref-3">[3]</a>
                </sup>
              </p>
              <h2 className="mt-3.5 font-display text-[32px]" id="c2">Past offices</h2>
              <div className="flex gap-3 items-start bg-mist-light border [border-top-style:dashed] border-line [border-right-style:dashed] [border-bottom-style:dashed] [border-left-style:dashed] rounded-md p-4">
                <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v6M12 7.5v.5" />
                </svg>
                <p className="text-[15px] leading-[1.55] text-ink-soft">
                  No elected or appointed public office on record in our sources. If that is wrong, tell us and we will correct it.
                </p>
              </div>
              <h2 className="mt-3.5 font-display text-[32px]" id="c3">Previous elections</h2>
              <ol className="list-none mt-1.5">
                <li className="relative pb-5.5 pl-7 border-l-2 border-l-brand ml-[7px]">
                  <span className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-brand box-content" />
                  <div className="flex flex-wrap gap-2 items-center">
                    <b className="text-[18px]">Governor of Lagos State</b>
                  </div>
                  <p className="mt-1 text-[14px] text-ink-soft">Labour Party · finished second · 2023</p>
                </li>
                <li className="relative pb-5.5 pl-7 border-l-2 border-l-line ml-[7px]">
                  <span className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-brand box-content" />
                  <div className="flex flex-wrap gap-2 items-center">
                    <b className="text-[18px]">Senator, Lagos West</b>
                  </div>
                  <p className="mt-1 text-[14px] text-ink-soft">Peoples Democratic Party · 2019</p>
                </li>
              </ol>
              <h2 className="mt-3.5 font-display text-[32px]" id="c4">Accomplishments</h2>
              <div className="flex gap-3 items-start bg-mist-light border [border-top-style:dashed] border-line [border-right-style:dashed] [border-bottom-style:dashed] [border-left-style:dashed] rounded-md p-4">
                <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v6M12 7.5v.5" />
                </svg>
                <p className="text-[15px] leading-[1.55] text-ink-soft">
                  Accomplishments are listed for time spent in public office. With no office on record, there is nothing to list here yet. His professional background is in the infobox.
                </p>
              </div>
              <h2 className="mt-3.5 font-display text-[32px]">See also</h2>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex min-h-11 items-center px-3.5 rounded-full bg-mist text-ink no-underline text-[14px] font-semibold">Lagos State</span>
                <span className="inline-flex min-h-11 items-center px-3.5 rounded-full bg-mist text-ink no-underline text-[14px] font-semibold">African Democratic Congress</span>
              </div>
              <h2 className="mt-3.5 font-display text-[32px]" id="c5">Sources</h2>
              <ol className="pl-5 flex flex-col gap-2 list-decimal">
                <li className="text-[14px] leading-[1.5]" id="ref-1">
                  <a href="#">Hamzat, Rhodes-Vivour, 15 others make INEC’s Lagos governorship list (Tribune, Oct 2026)</a>
                </li>
                <li className="text-[14px] leading-[1.5]" id="ref-2">
                  <a href="#">Gbadebo Rhodes-Vivour (Wikipedia)</a>
                </li>
                <li className="text-[14px] leading-[1.5]" id="ref-3">
                  <a href="#">INEC releases 2027 governorship list (The Journal)</a>
                </li>
              </ol>
              <p className="text-[12px] leading-[1.6] text-ink-faint">Last checked against sources on 18 October 2026.</p>
            </div>
            <aside className="flex-[1_1_300px] max-w-full bg-mist rounded-lg p-4 flex flex-col gap-3 self-start lg:max-w-[360px] box-content">
              <CandidatePhoto candidate={found.candidate} tone={1} className="h-[260px] rounded-md" sizes="360px" priority />
              <p className="font-display text-[24px]">Gbadebo Rhodes-Vivour</p>
              <div>
                <div className="flex flex-col gap-0.5 py-2.5 border-b border-b-line">
                  <span className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">Age on INEC list</span>
                  <span className="text-[14px] leading-[1.5]">43</span>
                </div>
                <div className="flex flex-col gap-0.5 py-2.5 border-b border-b-line">
                  <span className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">Party</span>
                  <span className="text-[14px] leading-[1.5]">
                    African Democratic Congress
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 py-2.5 border-b border-b-line">
                  <span className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">Running for</span>
                  <span className="text-[14px] leading-[1.5]">
                    Governor of{" "}
                    Lagos, 2027
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 py-2.5 border-b border-b-line">
                  <span className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">Profession</span>
                  <span className="text-[14px] leading-[1.5]">Architect</span>
                </div>
                <div className="flex flex-col gap-0.5 py-2.5 border-b border-b-line">
                  <span className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">Previous runs</span>
                  <span className="text-[14px] leading-[1.5]">
                    Lagos governor, 2023 (
                    LP); Senate, Lagos West, 2019 (
                    PDP)
                  </span>
                </div>
              </div>
              <a className="text-[13px] font-semibold" href="#">Report a correction</a>
            </aside>
          </div>
        </Container>
      </section>
      <section className="py-8">
        <Container>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Eyebrow>Governor of Lagos · 6 February 2027</Eyebrow>
              <h2 className="font-display text-[32px] leading-[0.95] text-ink uppercase lg:text-[44px]">Compare the rest of this race</h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] gap-3 lg:grid-cols-[repeat(auto-fill,minmax(min(200px,100%),1fr))]">
              {found.rivals.filter((r) => r.office === found.candidate.office).map((r) => (
                <ZikiCard key={r.id} candidate={r} headline={ZIKI_HEADLINES[r.id]} />
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="py-10 bg-mist-light">
        <Container>
          <div className="flex flex-col gap-4.5">
            <div className="flex flex-col gap-2">
              <Eyebrow>Before you choose</Eyebrow>
              <h2 className="font-display text-[36px] leading-[0.95] text-ink uppercase lg:text-[48px]">What to check before you choose.</h2>
              <p className="text-[15px] leading-[1.6] text-ink-soft">
                A useful profile separates verified facts, public claims and missing information. Nothing on whyvote is an endorsement.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(240px,100%),1fr))] gap-4">
              <div className="bg-white rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <p className="text-[13px] leading-[1.6] text-green">01</p>
                  <h2 className="font-display text-[26px] leading-[0.95] text-ink">Public record</h2>
                  <p className="text-[14px] leading-[1.6] text-ink-soft">Offices previously held, public voting and governance records, where available.</p>
                </div>
              </div>
              <div className="bg-white rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <p className="text-[13px] leading-[1.6] text-green">02</p>
                  <h2 className="font-display text-[26px] leading-[0.95] text-ink">Published priorities</h2>
                  <p className="text-[14px] leading-[1.6] text-ink-soft">Manifesto, policy proposals and documented campaign commitments.</p>
                </div>
              </div>
              <div className="bg-white rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <p className="text-[13px] leading-[1.6] text-green">03</p>
                  <h2 className="font-display text-[26px] leading-[0.95] text-ink">Evidence and sources</h2>
                  <p className="text-[14px] leading-[1.6] text-ink-soft">Primary sources, publication dates and corrections so you can check claims.</p>
                </div>
              </div>
            </div>
            <div className="bg-lime rounded-lg py-5.5 px-4.5 flex flex-col gap-3.5 lg:py-7 lg:px-8">
              <h3 className="font-display text-[32px] leading-[0.95] text-ink uppercase lg:text-[40px]">Ask better questions.</h3>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(min(220px,100%),1fr))] gap-2.5">
                <p className="text-[16px] font-semibold py-3 px-3.5 bg-[rgba(255,255,255,0.6)] rounded-md">What decisions does this office control?</p>
                <p className="text-[16px] font-semibold py-3 px-3.5 bg-[rgba(255,255,255,0.6)] rounded-md">What has the candidate proposed?</p>
                <p className="text-[16px] font-semibold py-3 px-3.5 bg-[rgba(255,255,255,0.6)] rounded-md">How can their statements be verified?</p>
                <p className="text-[16px] font-semibold py-3 px-3.5 bg-[rgba(255,255,255,0.6)] rounded-md">What is still unknown?</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <PledgeBand />
    </>
  );
}
