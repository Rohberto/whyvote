import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { HeadlineLanguageProvider, HeadlineLanguageToggle, InLang } from "@/components/why/headline-language";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FingerprintMark } from "@/components/icons/fingerprint-mark";
import { PledgeBand } from "@/components/layout/pledge-band";

export const metadata: Metadata = {
  title: "Why vote",
  description:
    "Eight common reasons young Nigerians give for not voting, each answered plainly, in English and Pidgin, with an image you can share.",
};

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
                  One vote does not count
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
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">Vote buying is retail. It is beaten by volume, not by outrage.</p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Does money really decide Nigerian elections?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      It decides some of them, in some places, and almost always in the same places: polling units where very few people turn up. A buyer has to find you, negotiate with you, pay you and then satisfy himself that you actually did it. That is slow and expensive per head. It only pays off where the total number of votes is small enough that a few hundred people can swing the unit.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      So what does turnout have to do with it?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      Everything. Vote buying is a fixed budget chasing a moving number. If 200 people vote in your unit, a bag of money is decisive. If 600 vote, the same bag buys a third of the influence it used to. Every extra voter makes the price of the unit go up and the return go down. Nobody has to be convinced of anything. They just have to show up.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Is it not just easier to take the money?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      It is your money. That is the point people miss. The five or ten thousand naira offered at the gate is a rebate on the road, the clinic and the school that the same office controls for the next four years. It is the cheapest possible settlement of a very large debt.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What can I do on the day?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      Vote and leave. Do not photograph your ballot. The photograph is the receipt, and without a receipt the buyer cannot verify what he paid for, which is why the whole arrangement gets shaky when people stop taking pictures. Then stay nearby for the count, which is public.
                    </p>
                  </details>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ButtonLink size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                    </svg>
                    WhatsApp status image
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Instagram image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy the line
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                    </svg>
                    Share link
                  </ButtonLink>
                </div>
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
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">A tribunal starts from the numbers on the result sheets. It does not invent a winner.</p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Have courts overturned Nigerian elections?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      Yes, and mostly governorship and legislative elections, usually on grounds like the qualification of a candidate, the validity of a party primary, or non-compliance with the Electoral Act. No presidential election result has been overturned in Nigeria.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Then why bother voting?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      Because the tribunal’s raw material is the polling unit result sheet and the figures uploaded from it. Judges argue over what those numbers mean, not over what they should have been. If you did not vote, you are not in the evidence.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Does turnout change the legal odds?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      It changes the margin, and the margin is what decides whether a petition is worth filing. A seat won by four hundred votes is a lawyer’s business for the next eighteen months. A seat won by forty thousand is usually not. High turnout is what keeps the decision inside the polling unit instead of moving it to a courtroom in Abuja.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What about results being changed at collation?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      That is the argument for staying, not for leaving. Results are counted and announced at your polling unit in front of whoever is standing there, written on a form, and uploaded. The gap between the unit and the collation centre is where disputes happen, and the record from your unit is the thing that closes it.
                    </p>
                  </details>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ButtonLink size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                    </svg>
                    WhatsApp status image
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Instagram image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy the line
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                    </svg>
                    Share link
                  </ButtonLink>
                </div>
              </div>
            </article>
            <article className="bg-white border border-line rounded-lg overflow-hidden" id="one-vote">
              <div className="bg-sun py-5.5 px-5 flex justify-between gap-4 items-start lg:py-8 lg:px-9">
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold tracking-[1px]">03 / 08</span>
                  <p className="font-display text-[32px] leading-[0.95] lg:text-[46px]">
                    “
                    <InLang lang="en">
                    One vote does not count
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
                    One vote does not count
                    </InLang>
                  </p>
                </div>
                <FingerprintMark className="max-lg:hidden" width="70" height="84" stroke="rgba(22,58,36,0.35)" strokeWidth={8.6} />
              </div>
              <div className="p-5 flex flex-col gap-4.5 lg:py-7 lg:px-9">
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">
                  Your vote is not measured against 93 million. It is counted in a room of about 500 people.
                </p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      How is my vote actually counted?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      At your polling unit, which has a few hundred registered voters. The votes there are counted in public, written on a sheet, and added to the ward, then the local government, then the state. You are never one in ninety three million. You are one in a few hundred, several times over, on the same day.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      But the presidential race is huge.
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      It is. In 2023 it was decided by roughly 1.8 million votes. But the presidential race is one line on a ballot paper that has five. Federal and state legislative seats are routinely decided by a few hundred votes, and ward level contests by fewer than that. The offices closest to your street are the ones where your single vote weighs most, and they are the ones people skip.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Does not voting send a message?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      It sends a very clear one, and it is not the one people intend. Parties plan the next cycle from turnout data. A unit that did not vote is a unit that gets no visits, no promises and no projects, because there is nothing there to win. Abstention is read as availability, not as protest.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What if my candidate loses?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      You still moved the margin, and the margin is the whole argument after the election. A representative who won narrowly behaves differently from one who won comfortably. That difference is made by people who voted and lost.
                    </p>
                  </details>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ButtonLink size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                    </svg>
                    WhatsApp status image
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Instagram image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy the line
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                    </svg>
                    Share link
                  </ButtonLink>
                </div>
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
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">
                  That is a statement about the top of the ballot, applied to four other lines where it is not true.
                </p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Are the parties not interchangeable?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      At the very top they often look it, because the same individuals move between them and the manifestos converge. Further down the ballot that breaks apart quickly. A state assembly member and a councillor are not national figures. They are specific people with specific records in a specific place, and they differ from each other enormously.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      How do I tell them apart without doing research all night?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      Three questions. Has this person held public office before, and what visibly happened in the place they held it. What does the office they are seeking actually control. Who else is on the ballot for that same seat. That is fifteen minutes of work and it is more than most voters do.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What if they really are all bad?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      Then the choice is between degrees, and degrees are not nothing. A budget that is looted at sixty percent and one looted at ninety percent produce visibly different streets. Refusing to distinguish between them is a preference for the worse one, because the worse one always has a base that turns out.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Does it not legitimise a broken system?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      The system is legitimised by the calendar, not by you. It runs whether you participate or not. The only question on offer is who runs it.
                    </p>
                  </details>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ButtonLink size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                    </svg>
                    WhatsApp status image
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Instagram image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy the line
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                    </svg>
                    Share link
                  </ButtonLink>
                </div>
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
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">Your vote is tied to one polling unit. Fix that now, not in January.</p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Can I vote anywhere in Nigeria with my PVC?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      No. Your PVC is tied to the exact polling unit where you registered. On the day you can only vote there. There is no absentee or postal voting for ordinary voters in Nigeria.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What are my options?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      Two. Transfer your registration to the polling unit where you actually live, which INEC allows during a window that closes well before the election, or plan to travel home and be in place the night before. Transferring is the better option if you have moved permanently, because it also fixes the next election and every one after it.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      When does the transfer window close?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      INEC publishes a cut-off in its timetable and it falls comfortably before polling day. Check the current date on the INEC portal rather than relying on what applied in 2023, because the timelines changed under the Electoral Act 2026.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Why can I not just travel on the morning?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      Election day usually carries a restriction of movement from early morning until polls close, so inter state travel on the day is not realistic. If you are travelling, you are travelling on the Friday.
                    </p>
                  </details>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ButtonLink size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                    </svg>
                    WhatsApp status image
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Instagram image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy the line
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                    </svg>
                    Share link
                  </ButtonLink>
                </div>
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
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">Something did change. Turnout fell to 27 percent, and every politician read that number.</p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Was 2023 a waste of time?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      It was not a waste, but it was misread by almost everyone who took part. People treated one presidential ballot as a transaction with a same day refund. It is not that. It is the acquisition of standing to complain for four years, which is worth less than people hoped and more than nothing.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What actually changed?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      The strategic picture. Turnout of 27 percent told every party the same thing: the cheapest route to power is a small, reliable, well managed base, and everyone else can be safely ignored. That lesson is being applied to 2027 right now. It is reversible only by the thing that produced it.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Why did nothing improve on my street?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      Because the offices that control your street were probably not the ones you were watching. Drainage, refuse, the primary health centre and the primary school are local government. The state road and the general hospital are the governor. Most people in 2023 voted the presidential line with attention and the rest almost blindly.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What would make 2027 different?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      Voting the whole ballot rather than the top of it, and then behaving like a constituent afterwards. The people who get things done from below are almost always the ones who know the name of their assembly member.
                    </p>
                  </details>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ButtonLink size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                    </svg>
                    WhatsApp status image
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Instagram image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy the line
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                    </svg>
                    Share link
                  </ButtonLink>
                </div>
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
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">Neither does almost anyone. That is a fixable problem, and it takes about twenty minutes.</p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Where do I even start?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      Start with the offices, not the people. Once you know that your councillor controls refuse and your assembly member approves the state budget, the question stops being who is nicest and becomes who is plausibly capable of that specific job.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      How do I find out who is contesting?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      INEC publishes the final list of candidates for every seat before the election, and it is public. Your own ballot has at most five lines on it. That is a short list, not a research project.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      What if I only know the presidential candidates?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      Then you are where the parties want you. Presidential name recognition is bought nationally and cheaply. Down ballot anonymity is the reason down ballot seats are the easiest in Nigeria to win badly.
                    </p>
                  </details>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ButtonLink size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                    </svg>
                    WhatsApp status image
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Instagram image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy the line
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                    </svg>
                    Share link
                  </ButtonLink>
                </div>
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
                <p className="font-display text-[24px] leading-[1.05] text-brand lg:text-[30px]">Leaving takes years, and the people you are leaving behind are not leaving.</p>
                <div className="border-b border-b-line">
                  <details className="border-t border-t-line" open>
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Why vote in a country I am trying to exit?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      Because the exit is slow and the country is not paused while you arrange it. Most people who are japa-ing in 2026 will still be here in January 2027, will still be paying for fuel and school fees here, and will still be renewing a passport issued by the government being elected.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Will it matter to me once I have gone?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      Probably more than you expect. Remittance costs, the naira you send home, whether your parents get treated at the general hospital, and whether you have a country worth returning to are all decided by the offices on this ballot.
                    </p>
                  </details>
                  <details className="border-t border-t-line">
                    <summary className="flex justify-between gap-4 items-center py-4 text-[17px] font-semibold text-ink">
                      Is this not somebody else’s problem now?
                      <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mb-4.5 text-[16px] leading-[1.65] text-ink-soft max-w-[720px]">
                      It is your family’s problem. Voting takes an hour, once, before you go. It is the cheapest thing you will do for the people staying.
                    </p>
                  </details>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ButtonLink size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                    </svg>
                    WhatsApp status image
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Instagram image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X image</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy the line
                  </ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                    </svg>
                    Share link
                  </ButtonLink>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>
      <PledgeBand />
    </HeadlineLanguageProvider>
  );
}
