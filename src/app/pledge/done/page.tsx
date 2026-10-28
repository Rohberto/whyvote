import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { PledgedHeading, PledgeReminderNote } from "@/components/pledge/pledge-greeting";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FingerprintMark } from "@/components/icons/fingerprint-mark";
import logo from "@/assets/logo.png";

export const metadata: Metadata = {
  title: "Pledge done",
  description:
    "Your ballot summary and what happens next after taking the whyvote pledge.",
};

export default function PledgeDonePage() {
  return (
    <>
      <section className="py-9 lg:py-16">
        <Container>
          <div className="flex flex-wrap gap-9 items-start">
            <div className="flex-[999_1_520px] min-w-0 flex flex-col gap-5">
              <div className="flex gap-3.5 items-center">
                <span className="w-14 h-14 rounded-full bg-mint inline-flex items-center justify-center flex-none">
                  <svg className="flex-none" aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0A3B2A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <PledgedHeading className="font-display text-[52px] leading-[0.95] text-ink lg:text-[76px]" />
              </div>
              <PledgeReminderNote className="text-[17px] leading-[1.6] text-ink-soft" />
              <div className="grid grid-cols-[repeat(auto-fill,minmax(min(280px,100%),1fr))] gap-3">
                <div className="bg-mist rounded-md p-6">
                  <div className="flex flex-col gap-2.5">
                    <Eyebrow>Saturday 16 January 2027</Eyebrow>
                    <ul className="pl-4.5 text-ink-soft list-disc">
                      <li className="text-[15px] leading-[1.6]">President and Vice President</li>
                      <li className="text-[15px] leading-[1.6]">Senator, Lagos West</li>
                      <li className="text-[15px] leading-[1.6]">Member, House of Representatives, Ajeromi-Ifelodun</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-mist rounded-md p-6">
                  <div className="flex flex-col gap-2.5">
                    <Eyebrow>Saturday 6 February 2027</Eyebrow>
                    <ul className="pl-4.5 text-ink-soft list-disc">
                      <li className="text-[15px] leading-[1.6]">Governor and Deputy Governor</li>
                      <li className="text-[15px] leading-[1.6]">Member, State House of Assembly</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3.5 items-center justify-between bg-mist rounded-md py-4 px-4.5">
                <div className="flex gap-3 items-center">
                  <svg className="flex-none" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A7F36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </svg>
                  <div>
                    <p className="text-[12px] font-semibold tracking-[1px] uppercase text-ink-soft">Your polling unit</p>
                    <p className="mt-0.5 text-[15px]">
                      <b className="font-mono">24/02/05/012</b>
                      {" "}· [Polling unit name]
                    </p>
                  </div>
                </div>
                <Link className="text-[14px] font-semibold" href="/get-ready/polling-unit/result">View and get directions</Link>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <ButtonLink size="lg" href="#">
                  <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20z" />
                    <path d="M9 9.5c.3 2.3 2.2 4.2 4.5 4.5l1-1.2 2 .8" />
                  </svg>
                  Send to a friend on WhatsApp
                </ButtonLink>
                <ButtonLink variant="outline" size="lg" href="/get-ready">What to do next</ButtonLink>
              </div>
            </div>
            <div className="flex-[0_1_320px] w-full flex flex-col gap-3">
              <div className="aspect-[9/16] max-h-[560px] bg-mint-pale rounded-lg p-6.5 flex flex-col justify-between relative overflow-hidden">
                <Image src={logo} alt="whyvote" className="h-5.5 w-auto self-start" />
                <div className="flex flex-col gap-3 relative z-1">
                  <div className="w-24 h-24 rounded-full border-3 border-brand bg-white overflow-hidden relative flex-none box-content">
                    <svg className="absolute top-0 right-0 bottom-0 left-0 w-full h-full" aria-hidden="true" viewBox="0 0 100 100">
                      <circle cx="50" cy="40" r="17" fill="#B7D3BF" />
                      <path d="M16 100c0-21 15-34 34-34s34 13 34 34z" fill="#B7D3BF" />
                    </svg>
                  </div>
                  <span className="text-brand font-bold text-[18px]">Tolu is in.</span>
                  <span className="font-display text-ink text-[50px] leading-[0.9]">I pledged to vote.</span>
                  <span className="text-ink-soft text-[14px] leading-[1.5]">
                    Both Saturdays. All five lines on the ballot, not just the top one. Who is coming with me?
                  </span>
                </div>
                <div className="relative z-1 border-t-2 border-t-brand pt-2.5">
                  <b className="text-ink text-[13px] block">16 Jan and 6 Feb 2027</b>
                  <span className="text-green text-[13px] font-bold">[site link]</span>
                </div>
                <div className="absolute -right-12.5 bottom-15">
                  <FingerprintMark width="170" height="204" stroke="rgba(13,151,76,0.18)" strokeWidth={8.2} />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <ButtonLink className="flex-[1_1_140px]" variant="outline" href="#">
                  <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                  </svg>
                  Add your photo
                </ButtonLink>
                <ButtonLink className="flex-[1_1_140px]" href="#">
                  <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                  </svg>
                  Save card
                </ButtonLink>
              </div>
              <p className="text-[12px] leading-[1.6] text-ink-faint">Your photo stays on your device. It is only used to make this card.</p>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-5 lg:py-8">
        <div className="max-w-[1200px] mx-auto px-3 lg:px-5 box-content">
          <div className="relative overflow-hidden bg-brand rounded-lg py-9 px-6 flex flex-wrap items-center justify-between gap-6 lg:py-14 lg:px-16">
            <div className="flex-[1_1_440px] flex flex-col gap-4 relative z-1">
              <h2 className="font-display text-[40px] leading-[0.95] text-white lg:text-[64px]">You pledged. Now bring two friends.</h2>
              <p className="text-[16px] leading-[1.6] text-green-pale max-w-[560px] lg:text-[17px]">
                A pledge shared is worth more than a pledge kept quiet. Send yours to the group chat and ask who is coming with you.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <ButtonLink variant="sun" size="lg" href="#">Get my pledge card</ButtonLink>
                <ButtonLink variant="ghost-light" size="lg" href="/share">Open the share kit</ButtonLink>
              </div>
            </div>
            <div className="flex-[0_0_auto] absolute -right-7.5 -bottom-10 lg:static lg:right-auto lg:bottom-auto">
              <FingerprintMark className="w-[130px] h-[156px] lg:w-[210px] lg:h-[252px]" stroke="rgba(255,255,255,0.32)" strokeWidth={7.6} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
