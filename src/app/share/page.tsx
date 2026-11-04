import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import logo from "@/assets/logo.png";
import { CopyButton, ShareImageButton } from "@/components/share/share-actions";
import { ANSWERS, answerCardHref, answerShareText, CARD_SIZES, type CardSize } from "@/lib/answers";
import { pageMetadata, SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Share kit",
  description:
    "Answer cards, a WhatsApp broadcast, the numbers and ballot guides, ready to share with the people who need convincing.",
  path: "/share",
});

const BROADCAST =
  "16 January 2027. 6 February 2027. Two Saturdays.\n\nNot just president. You are also choosing your senator, your rep, your governor and your state assembly member. Those are the ones who decide your road, your clinic and your school.\n\nCheck you are registered: cvr.inecnigeria.org\nCollect your PVC before the deadline.\n\nSee what is on your own ballot: whyvote.ng";

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
              {ANSWERS.map((a) => (
                <div key={a.slug} className="bg-white border border-line rounded-lg overflow-hidden flex flex-col" id={`card-${a.slug}`}>
                  <div className="bg-mint-pale p-5 min-h-[180px] flex flex-col justify-between gap-3 box-content flex-1">
                    <Image src={logo} alt="" className="h-4 w-auto self-start" />
                    <span className="font-display text-ink text-[26px] leading-[0.98]">“{a.objection}”</span>
                    <span className="w-9 h-1 bg-brand rounded-xs" />
                    <span className="text-green text-[14px] font-semibold leading-[1.4]">{a.line}</span>
                  </div>
                  <div className="p-3.5 flex flex-wrap gap-1.5">
                    {(Object.keys(CARD_SIZES) as CardSize[]).map((size, i) => (
                      <ShareImageButton
                        key={size}
                        size="sm"
                        variant={i === 0 ? "primary" : "soft"}
                        href={answerCardHref(a.slug, size)}
                        filename={`whyvote-${a.slug}-${size}.png`}
                      >
                        {CARD_SIZES[size].label}
                      </ShareImageButton>
                    ))}
                    <CopyButton variant="soft" size="sm" text={answerShareText(a, SITE_URL)}>
                      Copy text
                    </CopyButton>
                  </div>
                </div>
              ))}
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
              <textarea className="w-full p-4 border border-line rounded-md text-[15px] leading-[1.6] text-ink bg-white resize-y" rows={10} defaultValue={BROADCAST} />
            </label>
            <div className="flex flex-wrap gap-2.5">
              <CopyButton text={BROADCAST}>Copy broadcast</CopyButton>
              <ButtonLink variant="soft" href={`https://wa.me/?text=${encodeURIComponent(BROADCAST)}`} target="_blank" rel="noopener">
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
              <p className="text-[15px] leading-[1.6] text-ink-soft">
                In 2023, only 27 in every 100 registered voters turned up, the lowest turnout since 1999. Source: INEC.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <ShareImageButton href="/share/turnout/square" filename="whyvote-turnout-square.png">
                  Turnout graphic, square
                </ShareImageButton>
                <ShareImageButton variant="soft" href="/share/turnout/status" filename="whyvote-turnout-status.png">
                  Turnout graphic, status
                </ShareImageButton>
              </div>
            </div>
            <div className="flex-[1_1_320px] max-w-[420px] aspect-square bg-mint-pale rounded-lg p-5.5 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <Image src={logo} alt="" className="h-4 w-auto" />
                <span className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">2023 general election</span>
              </div>
              <p className="font-display text-[34px] leading-[0.92] text-ink">
                73 in 100{" "}
                <span className="text-brand">stayed home.</span>
              </p>
              <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-y-[3px] gap-x-1" role="img" aria-label="100 people: 27 voted, 73 stayed home">
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#2F8A3B" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#2F8A3B" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
                <svg className="block w-full h-auto" aria-hidden="true" viewBox="0 0 10 14">
                  <circle cx="5" cy="3" r="2.6" fill="#C2D3C7" />
                  <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill="#C2D3C7" />
                </svg>
              </div>
              <div className="flex gap-3.5 text-[12px] text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  <i className="w-2.5 h-2.5 rounded-full bg-brand" />
                  27 voted
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <i className="w-2.5 h-2.5 rounded-full bg-[#C2D3C7]" />
                  73 stayed home
                </span>
              </div>
              <div className="flex items-start justify-between gap-1 pt-2.5 border-t border-t-[#C9DECE]">
                <span className="flex flex-col items-center gap-0.5">
                  <b className="font-display text-[20px] text-ink-soft">54%</b>
                  <span className="text-[11px] text-ink-soft">2011</span>
                </span>
                <span className="text-[#9DB3A4] text-[14px] pt-1" aria-hidden="true">→</span>
                <span className="flex flex-col items-center gap-0.5">
                  <b className="font-display text-[20px] text-ink-soft">44%</b>
                  <span className="text-[11px] text-ink-soft">2015</span>
                </span>
                <span className="text-[#9DB3A4] text-[14px] pt-1" aria-hidden="true">→</span>
                <span className="flex flex-col items-center gap-0.5">
                  <b className="font-display text-[20px] text-ink-soft">35%</b>
                  <span className="text-[11px] text-ink-soft">2019</span>
                </span>
                <span className="text-[#9DB3A4] text-[14px] pt-1" aria-hidden="true">→</span>
                <span className="flex flex-col items-center gap-0.5">
                  <b className="font-display text-[20px] text-brand">27%</b>
                  <span className="text-[11px] text-ink-soft">2023</span>
                </span>
              </div>
              <div className="mt-auto flex justify-between items-end gap-2.5">
                <p className="font-display text-[22px] leading-[0.95] text-ink">Imagine if they came out.</p>
                <b className="text-[13px] text-brand whitespace-nowrap">whyvote.ng</b>
              </div>
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
                  Open My ballot, choose your state and LGA, and share the link with friends who vote in your area. Friends elsewhere can pick their own state and LGA.
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
