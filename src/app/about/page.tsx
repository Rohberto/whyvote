import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PledgeBand } from "@/components/layout/pledge-band";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "whyVote is a nonpartisan voter programme of PoliZ. We do not endorse any party or candidate, and we never ask who you vote for.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="pt-9 pb-7 lg:pt-16 lg:pb-10">
        <Container>
          <div className="flex flex-col gap-4.5">
            <Eyebrow>About</Eyebrow>
            <h1 className="font-display text-[52px] leading-[0.95] text-ink uppercase lg:text-[84px]">About whyVote</h1>
            <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:max-w-none lg:text-[19px]">
              <span className="max-lg:hidden">whyVote is a platform that helps young Nigerians see why their vote matters, know exactly what is on their ballot, and stay involved long after election day. It is built by{" "}</span>
              <span className="lg:hidden">whyVote is a platform that helps young Nigerians see why their vote matters, know exactly what is on their ballot, and stay involved long after election day.</span>
              <a className="text-green font-semibold max-lg:hidden" href="https://www.poliz.ng" target="_blank" rel="noopener">PoliZ</a>
              <span className="max-lg:hidden">, a youth-led civic organisation leveraging technology to empower youths to actively participate in governance and policy.</span>
            </p>
            <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:hidden">
              It is built by{" "}
              <a className="text-green font-semibold" href="https://www.poliz.ng" target="_blank" rel="noopener">PoliZ</a>
              , a youth-led civic organisation leveraging technology to empower youths to actively participate in governance and policy.
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
                whyVote exists to answer the reasons young Nigerians give for not voting. “They will buy votes anyway.” “My vote does not count.” “They are all the same.” We hear these every day, and almost nobody answers them properly. whyVote does, with plain facts and straight answers you can share with the people who need convincing.
              </p>
              <p className="text-[17px] leading-[1.6] text-ink-soft">
                It also helps you make an informed vote. Your ballot has five offices on it, not one. The offices most people ignore are the ones that decide your road, your clinic and your school, and they are often won by a few hundred votes. whyVote shows you what each office does and who is running for it.
              </p>
              <p className="text-[17px] leading-[1.6] text-ink-soft">
                And it does not stop on election day. Voting is the start, not the end. whyVote is here to help you stay involved after the election: knowing who represents you, following what they do with your money, and holding them to account until the next time you vote.
              </p>
            </div>
            <div className="flex-[1_1_380px] bg-ink text-white rounded-lg p-6 flex flex-col gap-3.5 lg:p-9 box-content">
              <h2 className="font-display text-[32px] leading-[0.95] text-white lg:text-[40px]">Nonpartisan, in writing</h2>
              <p className="text-[15px] leading-[1.6] text-sage-pale">
                whyVote does not support, oppose, endorse, rank or rate any party, candidate or officeholder.
              </p>
              <p className="text-[15px] leading-[1.6] text-sage-pale">
                We take no funding, payment, staff or in kind support from any party, candidate, campaign or anyone acting for them. Every funder of whyVote will be named here.
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
