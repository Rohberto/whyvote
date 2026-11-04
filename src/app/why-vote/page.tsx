import Link from "next/link";
import { HeadlineLanguageProvider, HeadlineLanguageToggle, InLang } from "@/components/why/headline-language";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FingerprintMark } from "@/components/icons/fingerprint-mark";
import { PledgeBand } from "@/components/layout/pledge-band";
import { AnswerShareRow } from "@/components/share/answer-share-row";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Why vote",
  description:
    "Eight common reasons young Nigerians give for not voting, each answered plainly, in English and Pidgin, with an image you can share.",
  path: "/why-vote",
});

export default function WhyVotePage() {
  return (
    <HeadlineLanguageProvider>
      <section className="pt-9 pb-7 lg:pt-16 lg:pb-10">
        <Container>
          <div className="flex flex-col gap-4.5">
            <Eyebrow>Why vote</Eyebrow>
            <h1 className="font-display text-[52px] leading-[0.95] text-ink uppercase lg:text-[84px]">Eight reasons not to vote, answered.</h1>
            <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:text-[19px]">
              <span className="max-lg:hidden">Read them in any order. Send to the people who need convincing. Every answer comes with an image you can post.</span>
              <span className="lg:hidden">Read them in any order. Send to the people who need convincing. Every answer comes with an image.</span>
            </p>
            <div className="flex flex-col gap-4.5">
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-[14px] text-ink-soft">Show the headlines in</span>
                <HeadlineLanguageToggle />
              </div>
              <div className="flex flex-wrap gap-2">
                <a className="inline-flex items-center min-h-11 px-3.5 rounded-full bg-mint text-ink no-underline text-[14px] font-semibold" href="#vote-buying">
                  <InLang lang="en">
                  They will just buy votes anyway
                  </InLang>
                  <InLang lang="pcm">
                  Dem go just share money for polling unit
                  </InLang>
                </a>
                <a className="inline-flex items-center min-h-11 px-3.5 rounded-full bg-[#F3E8D8] text-ink no-underline text-[14px] font-semibold" href="#courts">
                  <InLang lang="en">
                  The courts will change the result anyway
                  </InLang>
                  <InLang lang="pcm">
                  Na court go decide am
                  </InLang>
                </a>
                <a className="inline-flex items-center min-h-11 px-3.5 rounded-full bg-sun text-ink no-underline text-[14px] font-semibold" href="#one-vote">
                  <InLang lang="en">
                  My vote does not count
                  </InLang>
                  <InLang lang="pcm">
                  My one vote no go change anything
                  </InLang>
                </a>
                <a className="inline-flex items-center min-h-11 px-3.5 rounded-full bg-[#F07A6A] text-ink no-underline text-[14px] font-semibold" href="#all-the-same">
                  <InLang lang="en">
                  They are all the same
                  </InLang>
                  <InLang lang="pcm">
                  Dem be the same people
                  </InLang>
                </a>
                <a className="inline-flex items-center min-h-11 px-3.5 rounded-full bg-lime text-ink no-underline text-[14px] font-semibold" href="#not-in-state">
                  <InLang lang="en">
                  I will not be in my state on election day
                  </InLang>
                  <InLang lang="pcm">
                  I no dey my state for that day
                  </InLang>
                </a>
                <a className="inline-flex items-center min-h-11 px-3.5 rounded-full bg-sky text-ink no-underline text-[14px] font-semibold" href="#nothing-changed">
                  <InLang lang="en">
                  I voted in 2023 and nothing changed
                  </InLang>
                  <InLang lang="pcm">
                  I voted in 2023, wetin change?
                  </InLang>
                </a>
                <a className="inline-flex items-center min-h-11 px-3.5 rounded-full bg-[#E7D8F2] text-ink no-underline text-[14px] font-semibold" href="#dont-know-candidates">
                  <InLang lang="en">
                  I do not know anybody on the ballot
                  </InLang>
                  <InLang lang="pcm">
                  I no sabi any of dem
                  </InLang>
                </a>
                <a className="inline-flex items-center min-h-11 px-3.5 rounded-full bg-[#FBD9C9] text-ink no-underline text-[14px] font-semibold" href="#japa">
                  <InLang lang="en">
                  I am leaving the country anyway
                  </InLang>
                  <InLang lang="pcm">
                  I dey japa, e no concern me
                  </InLang>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="pt-2 pb-10">
        <Container>
          <div className="flex flex-col gap-6">
            <article className="bg-white border border-line rounded-lg overflow-hidden" id="vote-buying">
              <div className="bg-mint py-5.5 px-5 flex justify-between gap-4 items-start lg:py-8 lg:px-9">
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold tracking-[1px]">01 / 08</span>
                  <p className="font-display text-[32px] leading-[0.95] lg:text-[46px]">
                    “
                    <InLang lang="en">
                    They will just buy votes anyway
                    </InLang>
                    <InLang lang="pcm">
                    Dem go just share money for polling unit
                    </InLang>
                    ”
                  </p>
                  <p className="text-[15px] opacity-80">
                    <InLang lang="en">
                    Dem go just share money for polling unit
                    </InLang>
                    <InLang lang="pcm">
                    They will just buy votes anyway
                    </InLang>
                  </p>
                </div>
                <FingerprintMark className="max-lg:hidden" width="70" height="84" stroke="rgba(22,58,36,0.35)" strokeWidth={8.6} />
              </div>
              <div className="p-5 flex flex-col gap-4.5 lg:py-7 lg:px-9">
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">
                  Vote buying works best where few people turn up. The more of us who vote, the less it works.
                </p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Does money really decide Nigerian elections?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      In some places, yes. Mostly in polling units where few people turn up to vote. A buyer has to find someone willing to sell their vote, agree on a price, pay them, and then make sure they voted as promised. That is slow and costly per person.
                    </p>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      It only works where the total number of voters is small enough that paying a few hundred people can swing the unit or the ward.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      So what does turnout have to do with it?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Everything. A vote buyer has a fixed budget and a target number of votes. If only 200 people vote in your unit, that budget can buy enough of them to decide the result. If 1,000 people turn up, the same money now buys only one in five votes, and that is not enough. Every extra voter pushes up the cost.
                    </p>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      When enough people come out to vote, buying the unit becomes too expensive to try. Nobody has to be convinced of anything. People just have to show up.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Is it not just easier to take the money?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      It is your money. That is the part most people miss. The ₦5,000 or ₦10,000 offered to you comes from our common wealth. It is a small payoff in exchange for the road, the clinic and the school that should be built in your area over the next four years.
                    </p>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">When you take it, you settle for very little and lose something much bigger.</p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What can I do on the day?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <ul className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] pl-5 flex flex-col gap-1.5 lg:max-w-none box-content list-disc">
                      <li>Cast your vote, then step away from the voting point.</li>
                      <li>Do not accept money from anyone.</li>
                      <li>
                        Do not photograph your ballot. There is no need. INEC rules do not allow phones or cameras inside the voting cubicle.
                      </li>
                      <li>Stay nearby for the count. It is public, so watch and make sure there is no fraud.</li>
                      <li>If it is safe, report vote buying to the security officials at your unit.</li>
                    </ul>
                  </details>
                </div>
                <AnswerShareRow slug="vote-buying" />
              </div>
            </article>
            <article className="bg-white border border-line rounded-lg overflow-hidden" id="courts">
              <div className="bg-[#F3E8D8] py-5.5 px-5 flex justify-between gap-4 items-start lg:py-8 lg:px-9">
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold tracking-[1px]">02 / 08</span>
                  <p className="font-display text-[32px] leading-[0.95] lg:text-[46px]">
                    “
                    <InLang lang="en">
                    The courts will change the result anyway
                    </InLang>
                    <InLang lang="pcm">
                    Na court go decide am
                    </InLang>
                    ”
                  </p>
                  <p className="text-[15px] opacity-80">
                    <InLang lang="en">
                    Na court go decide am
                    </InLang>
                    <InLang lang="pcm">
                    The courts will change the result anyway
                    </InLang>
                  </p>
                </div>
                <FingerprintMark className="max-lg:hidden" width="70" height="84" stroke="rgba(22,58,36,0.35)" strokeWidth={8.6} />
              </div>
              <div className="p-5 flex flex-col gap-4.5 lg:py-7 lg:px-9">
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">Courts work from the votes on the result sheets. They do not pick a winner from nowhere.</p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Have courts overturned Nigerian elections?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Yes, mostly governorship and legislative elections. The usual grounds are a candidate not being qualified, a party primary not being valid, or the Electoral Act not being followed. No presidential election result has ever been overturned in Nigeria.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Then why bother voting?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Because judges work with the polling unit result sheets and the figures uploaded from them. People who did not vote, or who wanted to but stayed home, are not part of the case. If you did not vote, you are not in the evidence. And a result with fewer votes behind it is easier for the wrong people to challenge and overturn.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Does turnout change the legal odds?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Yes. It changes the margin, and the margin decides whether a petition is worth filing. Courts ask whether the votes in dispute are enough to change the result. If they are not, the case goes nowhere.
                    </p>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      A seat won by 400 votes can keep lawyers busy for the next 18 months. A seat won by 400,000 is usually too big a gap to challenge. High turnout keeps the decision at the polling unit instead of moving it to a courtroom.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What about results being changed at collation?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      That is the argument for staying. Results are counted and announced at your polling unit, written on a form, and uploaded. So stay for the count, watch the numbers being written on the form, and take note of the figures. When enough people know what was announced at the unit, it becomes much harder to change it later.
                    </p>
                  </details>
                </div>
                <AnswerShareRow slug="courts" />
              </div>
            </article>
            <article className="bg-white border border-line rounded-lg overflow-hidden" id="one-vote">
              <div className="bg-sun py-5.5 px-5 flex justify-between gap-4 items-start lg:py-8 lg:px-9">
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold tracking-[1px]">03 / 08</span>
                  <p className="font-display text-[32px] leading-[0.95] lg:text-[46px]">
                    “
                    <InLang lang="en">
                    My vote does not count
                    </InLang>
                    <InLang lang="pcm">
                    My one vote no go change anything
                    </InLang>
                    ”
                  </p>
                  <p className="text-[15px] opacity-80">
                    <InLang lang="en">
                    My one vote no go change anything
                    </InLang>
                    <InLang lang="pcm">
                    My vote does not count
                    </InLang>
                  </p>
                </div>
                <FingerprintMark className="max-lg:hidden" width="70" height="84" stroke="rgba(22,58,36,0.35)" strokeWidth={8.6} />
              </div>
              <div className="p-5 flex flex-col gap-4.5 lg:py-7 lg:px-9">
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">If your vote does not count, why are they trying to buy it?</p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      How is my vote actually counted?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      At your polling unit, which has a few hundred registered voters. The votes there are counted in public, written on a sheet, and added to the ward, then the local government, then the state. You are never one in 103 million. You are one in a few hundred.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      But the presidential race is huge.
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      It is. In 2023, the winner won by about 1.8 million votes. That sounds like a lot, but 93 million people were on the register, and only about 25 million voted. That means close to 68 million registered voters stayed home,{" "}
                      <b className="text-ink">more than 35 times the winning margin.</b>
                    </p>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Every vote added to or taken from that margin counts, and the people who stayed home were more than enough to change the result.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Does not voting send a message?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      It sends a very clear one, and it is not the one people intend. Parties plan the next cycle from turnout data. A unit that did not vote is a unit that unfortunately gets no visits, no promises and no projects, because there is nothing there to win.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What if my candidate loses?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      You still moved the margin, and the margin is the whole argument after the election. A representative who won narrowly behaves differently from one who won comfortably. That difference is made by people who voted and lost.
                    </p>
                  </details>
                </div>
                <AnswerShareRow slug="one-vote" />
              </div>
            </article>
            <article className="bg-white border border-line rounded-lg overflow-hidden" id="all-the-same">
              <div className="bg-[#F07A6A] py-5.5 px-5 flex justify-between gap-4 items-start lg:py-8 lg:px-9">
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold tracking-[1px]">04 / 08</span>
                  <p className="font-display text-[32px] leading-[0.95] lg:text-[46px]">
                    “
                    <InLang lang="en">
                    They are all the same
                    </InLang>
                    <InLang lang="pcm">
                    Dem be the same people
                    </InLang>
                    ”
                  </p>
                  <p className="text-[15px] opacity-80">
                    <InLang lang="en">
                    Dem be the same people
                    </InLang>
                    <InLang lang="pcm">
                    They are all the same
                    </InLang>
                  </p>
                </div>
                <FingerprintMark className="max-lg:hidden" width="70" height="84" stroke="rgba(22,58,36,0.35)" strokeWidth={8.6} />
              </div>
              <div className="p-5 flex flex-col gap-4.5 lg:py-7 lg:px-9">
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">Someone will still win. If you stay home, someone else chooses for you.</p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Are the parties not interchangeable?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      At the very top they often look it, because the same individuals move between them and the manifestos converge.
                    </p>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Further down the ballot, that breaks apart quickly. A Senator, state assembly member and a councillor are specific people with specific records in a specific place, and they differ from each other enormously.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      How do I tell them apart without doing research all night?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-2.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Use whyVote. Look up your ballot, see who is running for each seat, and check their profiles.
                    </p>
                    <p className="mb-2.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">Then ask three questions.</p>
                    <ul className="mb-2.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] pl-5 flex flex-col gap-1.5 lg:max-w-none box-content list-disc">
                      <li>Has this person held public office before?</li>
                      <li>
                        What actually happened while they held it, and if they have never held office, have they led anything else?
                      </li>
                      <li>What does the office they want actually do, and can they handle it?</li>
                    </ul>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">That is a few minutes of work, and it is more than most voters do.</p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What if they really are all bad?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">Then you choose the best of the options in front of you.</p>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      We will not always get saints on the ballot, but the difference between candidates still matters. Refusing to choose usually helps the worse one, because the worse one usually has a base that turns out.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Does it not legitimise a broken system?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      The system is legitimised by the calendar, not by you. It runs whether you take part or not. The only question is who runs it.
                    </p>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      And because it is broken, the work of fixing it falls on us. That means taking part all year, not just on election day: engaging with our leaders at the local government level, joining party politics, and showing up for party primaries, where the candidates on the ballot are chosen in the first place.
                    </p>
                  </details>
                </div>
                <AnswerShareRow slug="all-the-same" />
              </div>
            </article>
            <article className="bg-white border border-line rounded-lg overflow-hidden" id="not-in-state">
              <div className="bg-lime py-5.5 px-5 flex justify-between gap-4 items-start lg:py-8 lg:px-9">
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold tracking-[1px]">05 / 08</span>
                  <p className="font-display text-[32px] leading-[0.95] lg:text-[46px]">
                    “
                    <InLang lang="en">
                    I will not be in my state on election day
                    </InLang>
                    <InLang lang="pcm">
                    I no dey my state for that day
                    </InLang>
                    ”
                  </p>
                  <p className="text-[15px] opacity-80">
                    <InLang lang="en">
                    I no dey my state for that day
                    </InLang>
                    <InLang lang="pcm">
                    I will not be in my state on election day
                    </InLang>
                  </p>
                </div>
                <FingerprintMark className="max-lg:hidden" width="70" height="84" stroke="rgba(22,58,36,0.35)" strokeWidth={8.6} />
              </div>
              <div className="p-5 flex flex-col gap-4.5 lg:py-7 lg:px-9">
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">You can only vote where you registered. Plan now to be there on both Saturdays.</p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Can I vote anywhere in Nigeria with my PVC?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      No. Your PVC is tied to the polling unit where you registered. On election day, you can only vote there. There is no absentee or postal voting in Nigeria.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What are my options?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      If you did not transfer your registration before the window closed, your only option for 2027 is to travel to your polling unit and vote there.
                    </p>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      INEC does allow you to transfer your registration to the polling unit where you now live, but that window has closed for this election. If you have moved for good, plan to transfer your registration when INEC opens the window again, so the next election is easier.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Can I still transfer my registration?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Not for 2027. The transfer window closed with voter registration on 26 July 2026. INEC will open it again after the elections, so keep an eye on the INEC portal and official channels for the new dates.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Why can I not just travel on the morning?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Election day usually comes with a restriction of movement from early morning until polls close, so travelling between states on the day is not realistic. Travel the day before.
                    </p>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      The presidential and National Assembly elections hold on Saturday, 16 January 2027, and the governorship and state assembly elections on Saturday, 6 February 2027, so plan to be close to your polling unit the day before.
                    </p>
                  </details>
                </div>
                <AnswerShareRow slug="not-in-state" />
              </div>
            </article>
            <article className="bg-white border border-line rounded-lg overflow-hidden" id="nothing-changed">
              <div className="bg-sky py-5.5 px-5 flex justify-between gap-4 items-start lg:py-8 lg:px-9">
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold tracking-[1px]">06 / 08</span>
                  <p className="font-display text-[32px] leading-[0.95] lg:text-[46px]">
                    “
                    <InLang lang="en">
                    I voted in 2023 and nothing changed
                    </InLang>
                    <InLang lang="pcm">
                    I voted in 2023, wetin change?
                    </InLang>
                    ”
                  </p>
                  <p className="text-[15px] opacity-80">
                    <InLang lang="en">
                    I voted in 2023, wetin change?
                    </InLang>
                    <InLang lang="pcm">
                    I voted in 2023 and nothing changed
                    </InLang>
                  </p>
                </div>
                <FingerprintMark className="max-lg:hidden" width="70" height="84" stroke="rgba(22,58,36,0.35)" strokeWidth={8.6} />
              </div>
              <div className="p-5 flex flex-col gap-4.5 lg:py-7 lg:px-9">
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">
                  One election is not a quick fix. Leaders change when young people keep showing up, every election, until they cannot be ignored.
                </p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Was 2023 a waste of time?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      No. Many people treated their vote like a payment and expected to see change the next day.
                    </p>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      A vote does not work that way. Turnout was low, but the people who came out made their voices heard, and it showed.
                    </p>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Results surprised many and long-held seats changed hands. That counted for something, and it gave those voters the standing to demand more for the next four years.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What actually changed?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      The strategic picture. Turnout of 27 per cent told every party the same thing: the cheapest route to power is a small, reliable, well-managed base, and everyone else can be safely ignored.
                    </p>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">That lesson is being applied to 2027 right now.</p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Why did nothing improve on my street?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Because the offices that control your street were probably not the ones you were watching. Drainage, refuse, the primary health centre and the primary school are local government. The state road and the general hospital are the governor’s.
                    </p>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Most people in 2023 voted the presidential line with attention and the rest almost blindly.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What would make 2027 different?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Voting the whole ballot rather than the top of it, and then being an active citizen afterwards. The people who get things done from below are almost always the ones who know the name of their assembly member.
                    </p>
                  </details>
                </div>
                <AnswerShareRow slug="nothing-changed" />
              </div>
            </article>
            <article className="bg-white border border-line rounded-lg overflow-hidden" id="dont-know-candidates">
              <div className="bg-[#E7D8F2] py-5.5 px-5 flex justify-between gap-4 items-start lg:py-8 lg:px-9">
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold tracking-[1px]">07 / 08</span>
                  <p className="font-display text-[32px] leading-[0.95] lg:text-[46px]">
                    “
                    <InLang lang="en">
                    I do not know anybody on the ballot
                    </InLang>
                    <InLang lang="pcm">
                    I no sabi any of dem
                    </InLang>
                    ”
                  </p>
                  <p className="text-[15px] opacity-80">
                    <InLang lang="en">
                    I no sabi any of dem
                    </InLang>
                    <InLang lang="pcm">
                    I do not know anybody on the ballot
                    </InLang>
                  </p>
                </div>
                <FingerprintMark className="max-lg:hidden" width="70" height="84" stroke="rgba(22,58,36,0.35)" strokeWidth={8.6} />
              </div>
              <div className="p-5 flex flex-col gap-4.5 lg:py-7 lg:px-9">
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">
                  Most people don’t. Use whyvote.ng. Start with what each office does. It takes about twenty minutes.
                </p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Where do I even start?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">Start with the offices, not the people.</p>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Go to{" "}
                      <Link className="text-green font-semibold" href="/who-does-what">Who does what</Link>
                      {" "}to learn what each position controls.
                    </p>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Once you know what your councillor controls and what your assembly member approves, the question stops being who is nicest and becomes who can actually do that job.
                    </p>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Then go to{" "}
                      <Link className="text-green font-semibold" href="/ballot">My ballot</Link>
                      {" "}to see who is contesting for each position.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      How do I find out who is contesting?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Go to{" "}
                      <Link className="text-green font-semibold" href="/ballot">My ballot</Link>
                      {" "}on whyVote. Enter your state and LGA, and you will see your full ballot for both elections: the presidential and National Assembly elections on 16 January 2027, and the governorship and state assembly elections on 6 February 2027.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What if I only know the presidential candidates?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-3 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Then you are where the parties want you. Presidential names are everywhere, but the people who represent you closer to home get almost no attention.
                    </p>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      So many people complain that their senator or rep never shows up, never visits, and does nothing for the area, but when elections come, they become nonchalant. You can avoid another four years of complaining by checking who they are now, before you vote.
                    </p>
                  </details>
                </div>
                <AnswerShareRow slug="dont-know-candidates" />
              </div>
            </article>
            <article className="bg-white border border-line rounded-lg overflow-hidden" id="japa">
              <div className="bg-[#FBD9C9] py-5.5 px-5 flex justify-between gap-4 items-start lg:py-8 lg:px-9">
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold tracking-[1px]">08 / 08</span>
                  <p className="font-display text-[32px] leading-[0.95] lg:text-[46px]">
                    “
                    <InLang lang="en">
                    I am leaving the country anyway
                    </InLang>
                    <InLang lang="pcm">
                    I dey japa, e no concern me
                    </InLang>
                    ”
                  </p>
                  <p className="text-[15px] opacity-80">
                    <InLang lang="en">
                    I dey japa, e no concern me
                    </InLang>
                    <InLang lang="pcm">
                    I am leaving the country anyway
                    </InLang>
                  </p>
                </div>
                <FingerprintMark className="max-lg:hidden" width="70" height="84" stroke="rgba(22,58,36,0.35)" strokeWidth={8.6} />
              </div>
              <div className="p-5 flex flex-col gap-4.5 lg:py-7 lg:px-9">
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">Leaving might take years. Until then, the people in charge still decide your life here.</p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Why vote in a country I am trying to exit?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Because leaving is slow, and the country’s problems will not pause while you plan your japa. Most people planning to japa will still be here for most of 2027. They will still be paying for fuel and school fees here, and still renewing a passport issued by the government being elected. So it makes sense to have a say in who runs the country you are still living in.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Will it matter to me once I have gone?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      Probably more than you expect. Whether your parents get proper care, how much money you have to keep sending home, the comfort, safety and rights of your siblings and friends, and whether you have a country worth coming back to are all decided by the offices on this ballot.
                    </p>
                  </details>
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Is this not somebody else’s problem now?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px] lg:max-w-none">
                      It is your problem, your family’s problem and your friends’ problem. Voting does not take long, and you can do it before you japa. It is one of the best things you can do for the people staying back.
                    </p>
                  </details>
                </div>
                <AnswerShareRow slug="japa" />
              </div>
            </article>
          </div>
        </Container>
      </section>
      <PledgeBand />
    </HeadlineLanguageProvider>
  );
}
