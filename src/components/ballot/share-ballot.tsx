"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { ShareImageButton } from "@/components/share/share-actions";
import { buttonClasses } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { withRef } from "@/lib/referral";

const noSubscribe = () => () => {};

type Size = "status" | "square";

/**
 * "Share your ballot" (My ballot design): a link to copy, and an image in two sizes with a live
 * preview. The image shows the races and the six largest parties' candidates, never a vote choice.
 */
export function ShareBallot({ siteUrl, stateSlug, lgaSlug, place }: { siteUrl: string; stateSlug: string; lgaSlug: string; place: string }) {
  const [size, setSize] = useState<Size>("status");
  const [copied, setCopied] = useState(false);
  const base = `/ballot/${stateSlug}/${lgaSlug}/card`;
  const page = `${siteUrl}/ballot/${stateSlug}/${lgaSlug}`;
  const file = (s: string) => `whyvote-ballot-${stateSlug}-${lgaSlug}-${s}.png`;
  // The referral code lives in this browser, so build share links after hydration.
  const ready = useSyncExternalStore(noSubscribe, () => true, () => false);
  const links = useMemo(() => {
    if (!ready) return null;
    const text = (src: string) => `I checked my 2027 ballot for ${place}: every race and the main candidates. Check yours: ${withRef(page, src)}`;
    return {
      copy: withRef(page, "link"),
      whatsapp: text("whatsapp"),
      instagram: text("instagram"),
      x: `https://x.com/intent/post?text=${encodeURIComponent(`I checked my 2027 ballot for ${place}. Two Saturdays, five offices. Check yours:`)}&url=${encodeURIComponent(withRef(page, "x"))}`,
    };
  }, [ready, page, place]);

  async function copy() {
    const url = links?.copy ?? page;
    track("share_link", { content: "ballot", method: "copy" });
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this link", url);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const tall = size === "status";
  return (
    <div id="share" className="scroll-mt-6 bg-mist rounded-xl py-6 px-4.5 flex flex-wrap gap-8 items-center lg:py-9 lg:px-10 lg:gap-12">
      <div className="flex-[1_1_420px] min-w-0 flex flex-col gap-4.5">
        <p className="text-[12px] font-semibold tracking-[1.4px] uppercase text-green">Share</p>
        <h2 className="font-display text-[38px] leading-[0.92] text-ink lg:text-[48px]">Share your ballot</h2>
        <p className="text-[16px] leading-[1.6] text-ink-soft">
          Send it to friends who vote where you do, or post it to your status. It shows your races and the candidates from the six largest parties,
          never who you plan to vote for.
        </p>

        <div className="flex flex-col gap-2">
          <b className="text-[14px] text-ink">Share a link</b>
          <div className="flex gap-2 items-stretch">
            <div className="flex-[1_1_220px] min-w-0 flex items-center gap-2 min-h-12 px-3.5 border border-line rounded-sm bg-white text-[15px] text-ink overflow-hidden">
              <svg className="flex-none text-ink-faint" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
              </svg>
              <span className="truncate">{page.replace(/^https?:\/\/(www\.)?/, "")}</span>
            </div>
            <button
              type="button"
              onClick={copy}
              className="flex-none inline-flex items-center justify-center min-h-12 px-4.5 rounded-sm bg-ink border-2 border-ink text-white text-[15px] font-bold cursor-pointer hover:bg-green hover:border-green"
            >
              <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
            </button>
          </div>
          <span className="text-[13px] text-ink-faint">Anyone who opens it sees this ballot, and can switch to their own state and LGA.</span>
        </div>

        <div className="flex flex-col gap-2.5">
          <b className="text-[14px] text-ink">Share an image</b>
          <div role="group" aria-label="Image size" className="self-start inline-flex border border-line rounded-full p-[3px] bg-white">
            {(
              [
                ["status", "Story 9:16"],
                ["square", "Square 1:1"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={size === value}
                onClick={() => setSize(value)}
                className={`py-[7px] px-3.5 rounded-full text-[13px] cursor-pointer ${size === value ? "bg-ink text-white font-bold" : "text-ink font-semibold hover:bg-mist"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5">
            <ShareImageButton variant="sun" href={`${base}/${size}`} filename={file(size)}>
              <DownloadIcon />
              Download image
            </ShareImageButton>
            <ShareImageButton variant="outline" href={`${base}/status`} filename={file("status")} text={links?.whatsapp}>
              <WhatsAppIcon />
              WhatsApp status
            </ShareImageButton>
            <ShareImageButton variant="outline" href={`${base}/status`} filename={file("story")} text={links?.instagram}>
              <InstagramIcon />
              Instagram story
            </ShareImageButton>
            <a
              className={buttonClasses("outline")}
              href={links?.x ?? "#"}
              target="_blank"
              rel="noopener"
              onClick={() => track("share_link", { content: "ballot", method: "x" })}
            >
              <XIcon />
              Post on X
            </a>
          </div>
        </div>
      </div>

      <div className="flex-[0_1_auto] mx-auto flex flex-col items-center gap-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element -- generated PNG, shown exactly as it will be shared */}
        <img
          key={size}
          src={`${base}/${size}`}
          alt={`Preview of the shareable ballot image for ${place}`}
          width={1080}
          height={tall ? 1920 : 1080}
          loading="lazy"
          className={`w-[280px] rounded-xl bg-mint-pale shadow-[0_10px_28px_rgba(10,59,42,0.18)] sm:w-[340px] ${tall ? "aspect-[9/16]" : "aspect-square"}`}
        />
        <span className="text-[12px] text-ink-faint">Preview of your image</span>
      </div>
    </div>
  );
}

const icon = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function DownloadIcon() {
  return (
    <svg className="flex-none" aria-hidden="true" {...icon}>
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="flex-none" aria-hidden="true" {...icon}>
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
      <path d="M9.5 9.5c.3 1.7 1.9 3.6 4 4.3l1-1 1.5.8c-.2 1-1 1.6-2 1.4-3-.6-5.4-3-6-6-.2-1 .4-1.8 1.4-2l.8 1.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="flex-none" aria-hidden="true" {...icon}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7h.01" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" />
    </svg>
  );
}
