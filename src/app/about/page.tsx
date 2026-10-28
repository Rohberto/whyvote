import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PledgeBand } from "@/components/layout/pledge-band";

export const metadata: Metadata = {
  title: "About",
  description:
    "whyvote is a nonpartisan voter programme of PoliZ. We do not endorse any party or candidate, and we never ask who you vote for.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-9 pb-7 lg:pt-16 lg:pb-10">
        <Container>
          <div className="flex flex-col gap-4.5">
            <Eyebrow>About</Eyebrow>
            <h1 className="font-display text-[52px] leading-[0.95] text-ink uppercase lg:text-[84px]">About whyvote</h1>
            <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:text-[19px]">
              whyvote is a voter programme of PoliZ, a Nigerian youth civic organisation founded in 2023 after the misinformation of that election made it clear young Nigerians were being asked to vote without anything useful to vote with.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-10">
        <Container>
          <div className="flex flex-wrap gap-8 items-start">
            <div className="flex-[1_1_440px] flex flex-col gap-4">
              <h2 className="font-display text-[36px] leading-[0.95] text-ink lg:text-[48px]">What it is for</h2>
              <p className="text-[17px] leading-[1.6] text-ink-soft">
                Two things. First, to argue directly with the belief that the outcome is already decided, because that belief is the main reason young Nigerians stay home, and almost nobody answers it seriously.
              </p>
              <p className="text-[17px] leading-[1.6] text-ink-soft">
                Second, to move attention below the presidential race. A Nigerian ballot has five offices on it. Most voters treat it as one. The ones people ignore control the road, the clinic, the school and the drain, and they can be won or lost by a few hundred votes.
              </p>
              <p className="text-[17px] leading-[1.6] text-ink-soft">
                whyvote is not a one-election campaign. We are building it as civic infrastructure for young Nigerians: first to help you vote with full information, then to help you hold the people you elect to account.
              </p>
            </div>
            <div className="flex-[1_1_380px] bg-ink text-white rounded-lg p-6 flex flex-col gap-3.5 lg:p-9 box-content">
              <h2 className="font-display text-[32px] leading-[0.95] text-white lg:text-[40px]">Nonpartisan, in writing</h2>
              <p className="text-[15px] leading-[1.6] text-sage-pale">
                whyvote does not support, oppose, endorse, rank or rate any party, candidate or officeholder.
              </p>
              <p className="text-[15px] leading-[1.6] text-sage-pale">
                We take no funding, payment, staff or in kind support from any party, candidate, campaign or anyone acting for them. Every funder of this programme will be named here.
              </p>
              <p className="text-[15px] leading-[1.6] text-sage-pale">
                Where we name a person, it is because they hold or seek public office and it is on the public record. Candidate details come only from INEC’s published final list.
              </p>
              <p className="mt-1.5 py-3.5 px-4 bg-lime text-ink rounded-md font-bold text-[16px]">Our only ask is that you vote. We never ask who for.</p>
            </div>
          </div>
        </Container>
      </section>
      <section className="pb-10">
        <Container>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(280px,100%),1fr))] gap-3.5">
            <div className="bg-mist rounded-md p-6">
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-[26px] leading-[0.95] text-ink">Contact</h2>
                <p className="text-[15px] leading-[1.6] text-ink-soft">
                  ijoba@poliz.ng
                  <br />
                  poliz.ng
                  <br />
                  Lagos, Nigeria
                </p>
              </div>
            </div>
            <div className="bg-mist rounded-md p-6">
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-[26px] leading-[0.95] text-ink">Corrections</h2>
                <p className="text-[15px] leading-[1.6] text-ink-soft">If anything here is wrong, tell us. We will fix it and say what changed.</p>
              </div>
            </div>
            <div className="bg-mist rounded-md p-6">
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-[26px] leading-[0.95] text-ink">Partners and funders</h2>
                <p className="text-[15px] leading-[1.6] text-ink-soft">Listed here as they are confirmed.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <PledgeBand />
    </>
  );
}
