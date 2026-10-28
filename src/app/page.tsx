import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Chip } from "@/components/ui/chip";
import { PledgeBand } from "@/components/layout/pledge-band";
import heroCollage from "@/assets/hero-collage.webp";
import checklist from "@/assets/checklist.webp";
import { NumbersCarousel } from "@/components/home/numbers-carousel";
import { ReadyProgress } from "@/components/home/ready-progress";
import { getDaysToVote } from "@/lib/election";

export const metadata: Metadata = {
  title: { absolute: "whyvote: 2027 general election guide" },
  description:
    "They have already decided. So why vote? Plain answers to the eight common reasons young Nigerians do not vote, and what is on your 2027 ballot.",
};

export default async function HomePage() {
  const days = await getDaysToVote();
  return (
    <>
      <section className="pt-8 pb-10 lg:pt-14 lg:pb-16">
        <Container>
          <div className="flex flex-wrap gap-10 items-center">
            <div className="flex-[1_1_520px] flex flex-col gap-5.5">
              <Eyebrow>2027 general election guide</Eyebrow>
              <h1 className="font-display text-[56px] leading-[0.9] uppercase text-ink lg:text-[92px]">
                They have already decided.{" "}
                <span className="text-brand">So why vote?</span>
              </h1>
              <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:text-[19px]">
                Fair question. It deserves a real answer, not a slogan. Here are the answers to the eight common reasons why people do not vote.
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink variant="mint" size="lg" href="/why-vote">Read the answers</ButtonLink>
                <ButtonLink variant="soft" size="lg" href="/ballot">See my ballot</ButtonLink>
              </div>
            </div>
            <div className="flex-[1_1_340px] flex justify-center">
              <div className="relative w-[300px] max-w-full lg:w-[400px]">
                <Image priority src={heroCollage} alt="Collage of a young Nigerian woman’s face set inside an orange map of Nigeria" className="block w-full h-auto" />
                <div className="absolute -left-3 top-[56%] w-[56%] min-h-[32%] bg-lime flex flex-col justify-center py-2.5 px-3.5">
                  <span className="font-display text-[44px] leading-[0.85] lg:text-[58px]">5 offices</span>
                  <span className="text-[13px] font-semibold">on 2 Saturdays</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-16" />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(420px,100%),1fr))] gap-4">
            <div className="bg-mist rounded-md p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <Eyebrow>First vote</Eyebrow>
                  <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[36px]">Sat 16 January 2027</h2>
                  <p className="text-[14px] leading-[1.6] text-ink-soft">President, Senate, House of Representatives</p>
                </div>
                <div className="text-center flex-none bg-white rounded-md py-3 px-4">
                  <p className="font-display text-[40px] leading-[0.95] text-brand lg:text-[48px]">{days.first}</p>
                  <span className="text-[12px] text-ink-soft">days away</span>
                </div>
              </div>
            </div>
            <div className="bg-mist rounded-md p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <Eyebrow>Second vote</Eyebrow>
                  <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[36px]">Sat 6 February 2027</h2>
                  <p className="text-[14px] leading-[1.6] text-ink-soft">Governor, State House of Assembly</p>
                </div>
                <div className="text-center flex-none bg-white rounded-md py-3 px-4">
                  <p className="font-display text-[40px] leading-[0.95] text-brand lg:text-[48px]">{days.second}</p>
                  <span className="text-[12px] text-ink-soft">days away</span>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-[13px] leading-[1.6] text-ink-faint">
            whyvote is a PoliZ programme. It does not support, oppose, endorse or rank any party or candidate. The only ask is that you vote. We never ask who for.
          </p>
        </Container>
      </section>
      <section className="py-10 lg:py-18">
        <Container>
          <div className="flex flex-wrap gap-12 items-center">
            <div className="flex-[1_1_380px] flex flex-col gap-4.5">
              <h2 className="font-display text-[48px] leading-[0.9] text-ink lg:text-[76px]">
                You have heard these{" "}
                <span className="text-brand">before</span>
              </h2>
              <p className="text-[16px] leading-[1.6] text-ink-soft">
                Tap a card for the short answer. Every one has a full reply you can send to the person who said it.
              </p>
              <div>
                <ButtonLink href="/why-vote">All eight answers</ButtonLink>
              </div>
            </div>
            <div className="flex-[1_1_440px] flex flex-col gap-3.5">
              <Link className="flex items-center justify-between gap-4 bg-mint text-ink no-underline rounded-2xl py-5 px-5.5 [transform:rotate(-1.5deg)] shadow-[0_8px_20px_rgba(15,37,24,0.08)] lg:[transform:rotate(-3deg)] lg:ml-10" href="/why-vote">
                <span className="text-[17px] font-semibold">“They will just buy votes anyway”</span>
                <span className="w-10 h-10 rounded-full bg-ink text-white inline-flex items-center justify-center flex-none">
                  <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </Link>
              <Link className="flex items-center justify-between gap-4 bg-[#F3E8D8] text-ink no-underline rounded-2xl py-5 px-5.5 [transform:rotate(1.0deg)] shadow-[0_8px_20px_rgba(15,37,24,0.08)] lg:[transform:rotate(2deg)] lg:ml-0" href="/why-vote">
                <span className="text-[17px] font-semibold">“The courts will change the result anyway”</span>
                <span className="w-10 h-10 rounded-full bg-ink text-white inline-flex items-center justify-center flex-none">
                  <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </Link>
              <Link className="flex items-center justify-between gap-4 bg-sun text-ink no-underline rounded-2xl py-5 px-5.5 [transform:rotate(-1.0deg)] shadow-[0_8px_20px_rgba(15,37,24,0.08)] lg:[transform:rotate(-2deg)] lg:ml-7.5" href="/why-vote">
                <span className="text-[17px] font-semibold">“One vote does not count”</span>
                <span className="w-10 h-10 rounded-full bg-ink text-white inline-flex items-center justify-center flex-none">
                  <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </Link>
              <Link className="flex items-center justify-between gap-4 bg-[#F07A6A] text-ink no-underline rounded-2xl py-5 px-5.5 [transform:rotate(1.5deg)] shadow-[0_8px_20px_rgba(15,37,24,0.08)] lg:[transform:rotate(3deg)] lg:ml-2.5" href="/why-vote">
                <span className="text-[17px] font-semibold">“They are all the same”</span>
                <span className="w-10 h-10 rounded-full bg-ink text-white inline-flex items-center justify-center flex-none">
                  <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <NumbersCarousel />
      <section className="py-10 lg:py-18">
        <Container>
          <div className="flex flex-wrap gap-12">
            <div className="flex-[2_1_520px]">
              <h2 className="font-display text-[44px] leading-[0.95] text-ink lg:text-[64px]">
                Five lines on your ballot.{" "}
                <span className="text-brand">Not one.</span>
              </h2>
              <p className="mt-3.5 mb-2.5 text-[16px] leading-[1.6] text-ink-soft max-w-[620px]">
                Most people vote the top line with attention and the rest blindly. The lines below the president are the ones that decide your road, your clinic and your school.
              </p>
              <div>
                <Link className="flex gap-4 items-start py-4.5 border-b border-b-line no-underline text-ink" href="/who-does-what">
                  <span className="w-11 h-11 border-2 border-ink rounded-md inline-flex items-center justify-center flex-none font-display text-[20px] box-content">01</span>
                  <span className="flex-1 flex flex-col gap-1">
                    <span className="font-display text-[26px] text-brand">President</span>
                    <span className="text-[14px] leading-[1.5] text-ink-soft">
                      Runs the federal executive and proposes the federal budget. The loudest race, and only one line out of five.
                    </span>
                  </span>
                  <Chip>16 Jan</Chip>
                </Link>
                <Link className="flex gap-4 items-start py-4.5 border-b border-b-line no-underline text-ink" href="/who-does-what">
                  <span className="w-11 h-11 border-2 border-ink rounded-md inline-flex items-center justify-center flex-none font-display text-[20px] box-content">02</span>
                  <span className="flex-1 flex flex-col gap-1">
                    <span className="font-display text-[26px] text-brand">Senator</span>
                    <span className="text-[14px] leading-[1.5] text-ink-soft">
                      If it is a federal road, a federal agency, or a national law, this office approved the money for it.
                    </span>
                  </span>
                  <Chip>16 Jan</Chip>
                </Link>
                <Link className="flex gap-4 items-start py-4.5 border-b border-b-line no-underline text-ink" href="/who-does-what">
                  <span className="w-11 h-11 border-2 border-ink rounded-md inline-flex items-center justify-center flex-none font-display text-[20px] box-content">03</span>
                  <span className="flex-1 flex flex-col gap-1">
                    <span className="font-display text-[26px] text-brand">House of Representatives</span>
                    <span className="text-[14px] leading-[1.5] text-ink-soft">
                      Represents the smallest federal unit there is. If federal money never reaches your constituency, start here.
                    </span>
                  </span>
                  <Chip>16 Jan</Chip>
                </Link>
                <Link className="flex gap-4 items-start py-4.5 border-b border-b-line no-underline text-ink" href="/who-does-what">
                  <span className="w-11 h-11 border-2 border-ink rounded-md inline-flex items-center justify-center flex-none font-display text-[20px] box-content">04</span>
                  <span className="flex-1 flex flex-col gap-1">
                    <span className="font-display text-[26px] text-brand">Governor</span>
                    <span className="text-[14px] leading-[1.5] text-ink-soft">
                      If the road is state road, the hospital is a general hospital, or the teachers have not been paid, this is the office.
                    </span>
                  </span>
                  <Chip tone="sky">6 Feb</Chip>
                </Link>
                <Link className="flex gap-4 items-start py-4.5 border-b border-b-line no-underline text-ink" href="/who-does-what">
                  <span className="w-11 h-11 border-2 border-ink rounded-md inline-flex items-center justify-center flex-none font-display text-[20px] box-content">05</span>
                  <span className="flex-1 flex flex-col gap-1">
                    <span className="font-display text-[26px] text-brand">State House of Assembly</span>
                    <span className="text-[14px] leading-[1.5] text-ink-soft">
                      The most powerful office almost nobody can name. If the state budget is nonsense and nobody objected, this is who did not object.
                    </span>
                  </span>
                  <Chip tone="sky">6 Feb</Chip>
                </Link>
              </div>
            </div>
            <div className="flex-[1_1_300px] flex flex-col gap-3.5">
              <div className="bg-lime rounded-lg p-5 flex gap-4.5 items-center">
                <div className="bg-white rounded-md w-21 text-center overflow-hidden flex-none">
                  <div className="bg-ink text-white text-[12px] font-semibold py-1 tracking-[1px]">JAN 2027</div>
                  <div className="font-display text-[44px] pt-1.5 pb-0.5">16</div>
                  <div className="text-[11px] text-ink-soft pb-1.5">Saturday</div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[13px] leading-[1.6] text-ink-soft">Saturday</p>
                  <b className="text-[16px]">President, Senate, House of Reps</b>
                </div>
              </div>
              <div className="bg-[#DDEEF6] rounded-lg p-5 flex gap-4.5 items-center">
                <div className="bg-white rounded-md w-21 text-center overflow-hidden flex-none">
                  <div className="bg-ink text-white text-[12px] font-semibold py-1 tracking-[1px]">FEB 2027</div>
                  <div className="font-display text-[44px] pt-1.5 pb-0.5">6</div>
                  <div className="text-[11px] text-ink-soft pb-1.5">Saturday</div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[13px] leading-[1.6] text-ink-soft">Saturday</p>
                  <b className="text-[16px]">Governor, State House of Assembly</b>
                </div>
              </div>
              <div>
                <ButtonLink variant="mint" href="/ballot">See my ballot</ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-10 lg:py-18">
        <Container>
          <h2 className="mb-6 font-display text-[44px] text-center lg:text-[64px]">
            How{" "}
            <span className="text-brand">ready</span>
            {" "}are you?
          </h2>
          <div className="bg-mist rounded-lg p-5 flex flex-wrap gap-7 items-center lg:p-7">
            <div className="flex-[1_1_280px] flex justify-center">
              <Image src={checklist} alt="Clipboard checklist being ticked" className="w-[220px] h-auto rounded-md lg:w-[300px]" />
            </div>
            <ReadyProgress />
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-5.5">
            <ButtonLink variant="mint" size="lg" href="/get-ready">Start the checklist</ButtonLink>
            <ButtonLink variant="outline" size="lg" href="/pledge">Take the pledge</ButtonLink>
          </div>
        </Container>
      </section>
      <PledgeBand />
    </>
  );
}
