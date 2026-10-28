import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import logo from "@/assets/logo.png";

export const metadata: Metadata = {
  title: "Share kit",
  description:
    "Answer cards, a WhatsApp broadcast, the numbers and ballot guides, ready to share with the people who need convincing.",
};

export default function SharePage() {
  return (
    <>
      <section className="pt-9 pb-7 lg:pt-16 lg:pb-10">
        <Container>
          <div className="flex flex-col gap-4.5">
            <Eyebrow>Share kit</Eyebrow>
            <h1 className="font-display text-[52px] leading-[0.95] text-ink uppercase lg:text-[84px]">Share kit</h1>
            <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:text-[19px]">
              Everything here is ready to post. Images are made on your phone, sized for each platform, with nothing to edit.
            </p>
          </div>
        </Container>
      </section>
      <section className="pt-2 pb-10">
        <Container>
          <div className="flex flex-col gap-3.5">
            <h2 className="font-display text-[36px] leading-[0.95] text-ink lg:text-[48px]">Answer cards</h2>
            <p className="text-[15px] leading-[1.6] text-ink-soft">
              One per objection. Pick the size you need: Status is 1080 by 1920, Square is 1080 by 1080, X is 1600 by 900.
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-3.5">
              <div className="bg-white border border-line rounded-lg overflow-hidden flex flex-col">
                <div className="bg-mint-pale p-5 min-h-[180px] flex flex-col justify-between gap-3 box-content">
                  <Image src={logo} alt="" className="h-4 w-auto self-start" />
                  <span className="font-display text-ink text-[26px] leading-[0.98]">“They will just buy votes anyway”</span>
                  <span className="w-9 h-1 bg-brand rounded-xs" />
                  <span className="text-green text-[14px] font-semibold leading-[1.4]">Vote buying is retail. It is beaten by volume, not by outrage.</span>
                </div>
                <div className="p-3.5 flex flex-wrap gap-1.5">
                  <ButtonLink size="sm" href="#">Status</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Square</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy text
                  </ButtonLink>
                </div>
              </div>
              <div className="bg-white border border-line rounded-lg overflow-hidden flex flex-col">
                <div className="bg-mint-pale p-5 min-h-[180px] flex flex-col justify-between gap-3 box-content">
                  <Image src={logo} alt="" className="h-4 w-auto self-start" />
                  <span className="font-display text-ink text-[26px] leading-[0.98]">“The courts will change the result anyway”</span>
                  <span className="w-9 h-1 bg-brand rounded-xs" />
                  <span className="text-green text-[14px] font-semibold leading-[1.4]">A tribunal starts from the numbers on the result sheets. It does not invent a winner.</span>
                </div>
                <div className="p-3.5 flex flex-wrap gap-1.5">
                  <ButtonLink size="sm" href="#">Status</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Square</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy text
                  </ButtonLink>
                </div>
              </div>
              <div className="bg-white border border-line rounded-lg overflow-hidden flex flex-col">
                <div className="bg-mint-pale p-5 min-h-[180px] flex flex-col justify-between gap-3 box-content">
                  <Image src={logo} alt="" className="h-4 w-auto self-start" />
                  <span className="font-display text-ink text-[26px] leading-[0.98]">“One vote does not count”</span>
                  <span className="w-9 h-1 bg-brand rounded-xs" />
                  <span className="text-green text-[14px] font-semibold leading-[1.4]">
                    Your vote is not measured against 93 million. It is counted in a room of about 500 people.
                  </span>
                </div>
                <div className="p-3.5 flex flex-wrap gap-1.5">
                  <ButtonLink size="sm" href="#">Status</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Square</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy text
                  </ButtonLink>
                </div>
              </div>
              <div className="bg-white border border-line rounded-lg overflow-hidden flex flex-col">
                <div className="bg-mint-pale p-5 min-h-[180px] flex flex-col justify-between gap-3 box-content">
                  <Image src={logo} alt="" className="h-4 w-auto self-start" />
                  <span className="font-display text-ink text-[26px] leading-[0.98]">“They are all the same”</span>
                  <span className="w-9 h-1 bg-brand rounded-xs" />
                  <span className="text-green text-[14px] font-semibold leading-[1.4]">
                    That is a statement about the top of the ballot, applied to four other lines where it is not true.
                  </span>
                </div>
                <div className="p-3.5 flex flex-wrap gap-1.5">
                  <ButtonLink size="sm" href="#">Status</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Square</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy text
                  </ButtonLink>
                </div>
              </div>
              <div className="bg-white border border-line rounded-lg overflow-hidden flex flex-col">
                <div className="bg-mint-pale p-5 min-h-[180px] flex flex-col justify-between gap-3 box-content">
                  <Image src={logo} alt="" className="h-4 w-auto self-start" />
                  <span className="font-display text-ink text-[26px] leading-[0.98]">“I will not be in my state on election day”</span>
                  <span className="w-9 h-1 bg-brand rounded-xs" />
                  <span className="text-green text-[14px] font-semibold leading-[1.4]">Your vote is tied to one polling unit. Fix that now, not in January.</span>
                </div>
                <div className="p-3.5 flex flex-wrap gap-1.5">
                  <ButtonLink size="sm" href="#">Status</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Square</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy text
                  </ButtonLink>
                </div>
              </div>
              <div className="bg-white border border-line rounded-lg overflow-hidden flex flex-col">
                <div className="bg-mint-pale p-5 min-h-[180px] flex flex-col justify-between gap-3 box-content">
                  <Image src={logo} alt="" className="h-4 w-auto self-start" />
                  <span className="font-display text-ink text-[26px] leading-[0.98]">“I voted in 2023 and nothing changed”</span>
                  <span className="w-9 h-1 bg-brand rounded-xs" />
                  <span className="text-green text-[14px] font-semibold leading-[1.4]">Something did change. Turnout fell to 27 percent, and every politician read that number.</span>
                </div>
                <div className="p-3.5 flex flex-wrap gap-1.5">
                  <ButtonLink size="sm" href="#">Status</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Square</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy text
                  </ButtonLink>
                </div>
              </div>
              <div className="bg-white border border-line rounded-lg overflow-hidden flex flex-col">
                <div className="bg-mint-pale p-5 min-h-[180px] flex flex-col justify-between gap-3 box-content">
                  <Image src={logo} alt="" className="h-4 w-auto self-start" />
                  <span className="font-display text-ink text-[26px] leading-[0.98]">“I do not know anybody on the ballot”</span>
                  <span className="w-9 h-1 bg-brand rounded-xs" />
                  <span className="text-green text-[14px] font-semibold leading-[1.4]">Neither does almost anyone. That is a fixable problem, and it takes about twenty minutes.</span>
                </div>
                <div className="p-3.5 flex flex-wrap gap-1.5">
                  <ButtonLink size="sm" href="#">Status</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Square</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy text
                  </ButtonLink>
                </div>
              </div>
              <div className="bg-white border border-line rounded-lg overflow-hidden flex flex-col">
                <div className="bg-mint-pale p-5 min-h-[180px] flex flex-col justify-between gap-3 box-content">
                  <Image src={logo} alt="" className="h-4 w-auto self-start" />
                  <span className="font-display text-ink text-[26px] leading-[0.98]">“I am leaving the country anyway”</span>
                  <span className="w-9 h-1 bg-brand rounded-xs" />
                  <span className="text-green text-[14px] font-semibold leading-[1.4]">Leaving takes years, and the people you are leaving behind are not leaving.</span>
                </div>
                <div className="p-3.5 flex flex-wrap gap-1.5">
                  <ButtonLink size="sm" href="#">Status</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">Square</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">X</ButtonLink>
                  <ButtonLink variant="soft" size="sm" href="#">
                    <svg className="flex-none" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="11" height="11" rx="2" />
                      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                    </svg>
                    Copy text
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-10 bg-mist-light lg:h-[470px] box-content">
        <Container>
          <div className="flex flex-col gap-3.5">
            <h2 className="font-display text-[36px] leading-[0.95] text-ink lg:text-[48px]">WhatsApp broadcast</h2>
            <p className="text-[15px] leading-[1.6] text-ink-soft">Paste as is, or change the last line to your own link.</p>
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold tracking-[1px] uppercase text-ink-soft">Broadcast text</span>
              <textarea className="w-full p-4 border border-line rounded-md text-[15px] leading-[1.6] text-ink bg-white resize-y" rows={10} defaultValue={"16 January 2027. 6 February 2027. Two Saturdays.\n\nNot just president. You are also choosing your senator, your rep, your governor and your state assembly member. Those are the ones who decide your road, your clinic and your school.\n\nCheck you are registered: cvr.inecnigeria.org\nCollect your PVC before the deadline.\n\nSee what is on your own ballot: [site link]"} />
            </label>
            <div className="flex flex-wrap gap-2.5">
              <ButtonLink href="#">
                <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="11" height="11" rx="2" />
                  <path d="M5 15V5a2 2 0 0 1 2-2h8" />
                </svg>
                Copy broadcast
              </ButtonLink>
              <ButtonLink variant="soft" href="#">
                <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20z" />
                  <path d="M9 9.5c.3 2.3 2.2 4.2 4.5 4.5l1-1.2 2 .8" />
                </svg>
                Open in WhatsApp
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-10 lg:py-18">
        <Container>
          <div className="flex flex-wrap gap-7 items-center">
            <div className="flex-[1_1_380px] flex flex-col gap-3.5">
              <h2 className="font-display text-[36px] leading-[0.95] text-ink lg:text-[48px]">The numbers</h2>
              <p className="text-[15px] leading-[1.6] text-ink-soft">Presidential election turnout as a share of registered voters. Source: INEC.</p>
              <div className="flex flex-wrap gap-2.5">
                <ButtonLink href="#">Turnout graphic, square</ButtonLink>
                <ButtonLink variant="soft" href="#">Turnout graphic, status</ButtonLink>
              </div>
            </div>
            <div className="flex-[1_1_320px] max-w-[420px] aspect-square bg-mint-pale rounded-lg p-6 flex flex-col gap-4">
              <Image src={logo} alt="" className="h-4 w-auto self-start" />
              <div className="flex-1 flex gap-3 items-end">
                <div className="flex flex-col justify-end items-center gap-1.5 flex-1">
                  <span className="text-ink text-[13px] font-bold">53.68%</span>
                  <span className="w-full h-[140px] bg-[#A9D3B4] rounded-[3px_3px_0_0] lg:h-[118px]" />
                  <span className="text-ink-soft text-[12px]">2011</span>
                </div>
                <div className="flex flex-col justify-end items-center gap-1.5 flex-1">
                  <span className="text-ink text-[13px] font-bold">43.65%</span>
                  <span className="w-full h-[113px] bg-[#A9D3B4] rounded-[3px_3px_0_0] lg:h-24" />
                  <span className="text-ink-soft text-[12px]">2015</span>
                </div>
                <div className="flex flex-col justify-end items-center gap-1.5 flex-1">
                  <span className="text-ink text-[13px] font-bold">34.75%</span>
                  <span className="w-full h-22.5 bg-[#A9D3B4] rounded-[3px_3px_0_0] lg:h-19" />
                  <span className="text-ink-soft text-[12px]">2019</span>
                </div>
                <div className="flex flex-col justify-end items-center gap-1.5 flex-1">
                  <span className="text-ink text-[13px] font-bold">26.71%</span>
                  <span className="w-full h-[69px] bg-brand rounded-[3px_3px_0_0] lg:h-[59px]" />
                  <span className="text-ink-soft text-[12px]">2023</span>
                </div>
              </div>
              <span className="font-display text-ink text-[28px] leading-[0.95]">Only 27 in every 100 registered voters showed up in 2023.</span>
            </div>
          </div>
        </Container>
      </section>
      <section className="pb-10">
        <Container>
          <div className="bg-lime rounded-md p-7">
            <div className="flex flex-wrap gap-5">
              <div className="flex flex-col gap-2 flex-[1_1_400px]">
                <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[40px]">Ballot guides</h2>
                <p className="text-[15px] leading-[1.6] text-ink-soft">
                  Open your state on My ballot and use Save as PDF. It prints clean and is light enough to send on WhatsApp.
                </p>
              </div>
              <div className="self-center">
                <ButtonLink variant="mint" href="/ballot">Go to My ballot</ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
