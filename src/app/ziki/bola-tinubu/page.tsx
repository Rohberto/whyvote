import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Bola Tinubu",
  description:
    "Ziki profile: Bola Ahmed Tinubu, President of Nigeria and presidential candidate in the 16 January 2027 election.",
};

export default async function TinubuPage() {
  const found = await getCandidate("bola-tinubu");
  if (!found) notFound();
  return (
    <>
      <Breadcrumb items={[{"label": "Ziki", "href": "/ziki"}, {"label": "Presidential candidates, 2027", "href": "/ziki"}, {"label": "Bola Tinubu"}]} />
      <section className="pt-8 pb-5 lg:pt-12 lg:pb-7">
        <Container>
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-[48px] leading-[0.95] text-ink uppercase lg:text-[84px]">Bola Tinubu</h1>
            <div className="flex flex-wrap gap-y-2.5 gap-x-3.5 items-center">
              <PartyBadge code="APC" size="md" />
              <span className="text-[20px] font-semibold lg:text-[24px]">President of Nigeria since 2023</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip>For President</Chip>
              <Chip tone="mist">All Progressives Congress</Chip>
              <Chip tone="ink">Current officeholder</Chip>
            </div>
          </div>
        </Container>
      </section>
      <section className="pt-2 pb-10">
        <Container>
          <div className="flex flex-wrap gap-10">
            <div className="flex-[999_1_560px] min-w-0 flex flex-col gap-4.5">
              <p className="text-[18px] leading-[1.7] text-ink">
                Bola Ahmed Tinubu (born 29 March 1952) is the President of Nigeria, in office since 29 May 2023, and the{" "}
                All Progressives Congress candidate in the{" "}
                2027 presidential election. He is seeking a second term, with Vice President{" "}
                <Link className="text-green" href="/ziki/kashim-shettima">Kashim Shettima</Link>
                {" "}again as his running mate.
                <sup>
                  <a className="text-green text-[11px]" href="#ref-1">[1]</a>
                </sup>
              </p>
              <nav className="bg-mist-light border border-line rounded-md py-4 px-5" aria-label="Contents">
                <b className="text-[14px]">Contents</b>
                <ol className="mt-2.5 pl-5 flex flex-col gap-1.5 text-[14px] list-decimal">
                  <li>
                    <a href="#c0">Early career</a>
                  </li>
                  <li>
                    <a href="#c1">Political career</a>
                  </li>
                  <li>
                    <a href="#c2">Presidency</a>
                  </li>
                  <li>
                    <a href="#c3">Past offices</a>
                  </li>
                  <li>
                    <a href="#c4">Accomplishments</a>
                  </li>
                  <li>
                    <a href="#c5">Sources</a>
                  </li>
                </ol>
              </nav>
              <h2 className="mt-3.5 font-display text-[32px]" id="c0">Early career</h2>
              <p className="text-[17px] leading-[1.7] text-ink-soft">
                Tinubu studied accounting at Chicago State University, graduating in 1979, and worked as an accountant in the United States before joining Mobil Oil Nigeria.
                <sup>
                  <a className="text-green text-[11px]" href="#ref-2">[2]</a>
                </sup>
              </p>
              <h2 className="mt-3.5 font-display text-[32px]" id="c1">Political career</h2>
              <p className="text-[17px] leading-[1.7] text-ink-soft">
                He was elected{" "}
                senator for Lagos West in 1992 during the Third Republic. After the annulment of the 1993 presidential election he joined the pro-democracy coalition NADECO and spent time in exile.
                <sup>
                  <a className="text-green text-[11px]" href="#ref-2">[2]</a>
                </sup>
              </p>
              <p className="text-[17px] leading-[1.7] text-ink-soft">
                He was elected{" "}
                Governor of{" "}
                Lagos State in 1999 and re-elected in 2003, serving until 2007. In 2013 he was one of the leaders whose parties merged to form the{" "}
                APC.
                <sup>
                  <a className="text-green text-[11px]" href="#ref-2">[2]</a>
                </sup>
              </p>
              <h2 className="mt-3.5 font-display text-[32px]" id="c2">Presidency</h2>
              <p className="text-[17px] leading-[1.7] text-ink-soft">
                Tinubu won the{" "}
                2023 presidential election with about 8.79 million votes. In 2023 his government ended the petrol subsidy and unified the naira exchange rate. It also launched federal student loans through NELFUND and signed a set of tax reform laws in 2025.
                <sup>
                  <a className="text-green text-[11px]" href="#ref-2">[2]</a>
                </sup>
              </p>
              <p className="text-[17px] leading-[1.7] text-ink-soft">
                In February 2026 he signed the{" "}
                Electoral Act 2026, which moved the presidential election to 16 January 2027.
                <sup>
                  <a className="text-green text-[11px]" href="#ref-3">[3]</a>
                </sup>
              </p>
              <h2 className="mt-3.5 font-display text-[32px]" id="c3">Past offices</h2>
              <ol className="list-none mt-1.5">
                <li className="relative pb-5.5 pl-7 border-l-2 border-l-brand ml-[7px]">
                  <span className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-brand border-2 border-brand box-content" />
                  <div className="flex flex-wrap gap-2 items-center">
                    <b className="text-[18px]">President of Nigeria</b>
                    <Chip>Current</Chip>
                  </div>
                  <p className="mt-1 text-[14px] text-ink-soft">Federal Government of Nigeria · 2023 to present</p>
                </li>
                <li className="relative pb-5.5 pl-7 border-l-2 border-l-brand ml-[7px]">
                  <span className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-brand box-content" />
                  <div className="flex flex-wrap gap-2 items-center">
                    <b className="text-[18px]">Governor of Lagos State</b>
                  </div>
                  <p className="mt-1 text-[14px] text-ink-soft">Lagos State · 1999 to 2007</p>
                </li>
                <li className="relative pb-5.5 pl-7 border-l-2 border-l-line ml-[7px]">
                  <span className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-brand box-content" />
                  <div className="flex flex-wrap gap-2 items-center">
                    <b className="text-[18px]">Senator, Lagos West</b>
                  </div>
                  <p className="mt-1 text-[14px] text-ink-soft">Senate of Nigeria · 1992 to 1993</p>
                </li>
              </ol>
              <h2 className="mt-3.5 font-display text-[32px]" id="c4">Accomplishments</h2>
              <p className="text-[14px] leading-[1.6] text-ink-faint">
                Actions taken in office, each linked to a source. whyvote records what was done, not whether it worked. That judgement is yours.
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-start py-3.5 px-4 bg-white border border-line rounded-md">
                  <span className="font-display text-[22px] text-brand flex-none w-13.5">2023</span>
                  <span className="text-[16px] leading-[1.5] font-medium">
                    Ended the petrol subsidy
                    <sup>
                      <a className="text-green text-[11px]" href="#ref-2">[2]</a>
                    </sup>
                  </span>
                </div>
                <div className="flex gap-4 items-start py-3.5 px-4 bg-white border border-line rounded-md">
                  <span className="font-display text-[22px] text-brand flex-none w-13.5">2023</span>
                  <span className="text-[16px] leading-[1.5] font-medium">
                    Unified the naira exchange rate
                    <sup>
                      <a className="text-green text-[11px]" href="#ref-2">[2]</a>
                    </sup>
                  </span>
                </div>
                <div className="flex gap-4 items-start py-3.5 px-4 bg-white border border-line rounded-md">
                  <span className="font-display text-[22px] text-brand flex-none w-13.5">2024</span>
                  <span className="text-[16px] leading-[1.5] font-medium">
                    Launched federal student loans through NELFUND
                    <sup>
                      <a className="text-green text-[11px]" href="#ref-2">[2]</a>
                    </sup>
                  </span>
                </div>
                <div className="flex gap-4 items-start py-3.5 px-4 bg-white border border-line rounded-md">
                  <span className="font-display text-[22px] text-brand flex-none w-13.5">2025</span>
                  <span className="text-[16px] leading-[1.5] font-medium">
                    Signed a set of tax reform laws
                    <sup>
                      <a className="text-green text-[11px]" href="#ref-2">[2]</a>
                    </sup>
                  </span>
                </div>
                <div className="flex gap-4 items-start py-3.5 px-4 bg-white border border-line rounded-md">
                  <span className="font-display text-[22px] text-brand flex-none w-13.5">2026</span>
                  <span className="text-[16px] leading-[1.5] font-medium">
                    Signed the Electoral Act 2026
                    <sup>
                      <a className="text-green text-[11px]" href="#ref-3">[3]</a>
                    </sup>
                  </span>
                </div>
              </div>
              <h2 className="mt-3.5 font-display text-[32px]">See also</h2>
              <div className="flex flex-wrap gap-2">
                <Link className="inline-flex min-h-11 items-center px-3.5 rounded-full bg-mist text-ink no-underline text-[14px] font-semibold" href="/ziki/kashim-shettima">Kashim Shettima</Link>
                <span className="inline-flex min-h-11 items-center px-3.5 rounded-full bg-mist text-ink no-underline text-[14px] font-semibold">All Progressives Congress</span>
                <span className="inline-flex min-h-11 items-center px-3.5 rounded-full bg-mist text-ink no-underline text-[14px] font-semibold">2023 Nigerian presidential election</span>
              </div>
              <h2 className="mt-3.5 font-display text-[32px]" id="c5">Sources</h2>
              <ol className="pl-5 flex flex-col gap-2 list-decimal">
                <li className="text-[14px] leading-[1.5]" id="ref-1">
                  <a href="#">INEC releases final list of 18 presidential candidates (Metro Daily, 13 Sep 2026)</a>
                </li>
                <li className="text-[14px] leading-[1.5]" id="ref-2">
                  <a href="#">Bola Tinubu (Wikipedia)</a>
                </li>
                <li className="text-[14px] leading-[1.5]" id="ref-3">
                  <a href="#">2027 Nigerian general election (Wikipedia)</a>
                </li>
              </ol>
              <p className="text-[12px] leading-[1.6] text-ink-faint">Last checked against sources on 18 October 2026.</p>
            </div>
            <aside className="flex-[1_1_300px] max-w-full bg-mist rounded-lg p-4 flex flex-col gap-3 self-start lg:max-w-[360px] box-content">
              <CandidatePhoto candidate={found.candidate} tone={1} className="h-[260px] rounded-md" sizes="360px" priority />
              <p className="font-display text-[24px]">Bola Tinubu</p>
              <div>
                <div className="flex flex-col gap-0.5 py-2.5 border-b border-b-line">
                  <span className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">Born</span>
                  <span className="text-[14px] leading-[1.5]">29 March 1952, Lagos</span>
                </div>
                <div className="flex flex-col gap-0.5 py-2.5 border-b border-b-line">
                  <span className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">Party</span>
                  <span className="text-[14px] leading-[1.5]">
                    All Progressives Congress
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 py-2.5 border-b border-b-line">
                  <span className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">Running for</span>
                  <span className="text-[14px] leading-[1.5]">
                    President, 2027
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 py-2.5 border-b border-b-line">
                  <span className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">Running mate</span>
                  <span className="text-[14px] leading-[1.5]">
                    <Link className="text-green" href="/ziki/kashim-shettima">Kashim Shettima</Link>
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 py-2.5 border-b border-b-line">
                  <span className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">Current office</span>
                  <span className="text-[14px] leading-[1.5]">President of Nigeria (since 2023)</span>
                </div>
                <div className="flex flex-col gap-0.5 py-2.5 border-b border-b-line">
                  <span className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">Previous offices</span>
                  <span className="text-[14px] leading-[1.5]">
                    Governor of{" "}
                    Lagos State (1999 to 2007);{" "}
                    Senator, Lagos West (1992 to 1993)
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 py-2.5 border-b border-b-line">
                  <span className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">Education</span>
                  <span className="text-[14px] leading-[1.5]">Chicago State University (BSc, Accounting)</span>
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
              <Eyebrow>President · 16 January 2027</Eyebrow>
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
