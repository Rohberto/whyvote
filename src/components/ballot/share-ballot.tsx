"use client";

import { useMemo, useSyncExternalStore } from "react";
import { ShareImageButton } from "@/components/share/share-actions";
import { buttonClasses } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { withRef } from "@/lib/referral";

const noSubscribe = () => () => {};

/** "Share your ballot": a card of the offices on this ballot, for WhatsApp status, Instagram stories, X or download. */
export function ShareBallot({ siteUrl, stateSlug, lgaSlug, place }: { siteUrl: string; stateSlug: string; lgaSlug: string; place: string }) {
  const base = `/ballot/${stateSlug}/${lgaSlug}/card`;
  const file = (size: string) => `whyvote-ballot-${stateSlug}-${lgaSlug}-${size}.png`;
  // The referral code lives in this browser, so build share links after hydration.
  const ready = useSyncExternalStore(noSubscribe, () => true, () => false);
  const links = useMemo(() => {
    if (!ready) return null;
    const page = `${siteUrl}/ballot/${stateSlug}/${lgaSlug}`;
    const text = (src: string) => `I checked my 2027 ballot: five offices on two Saturdays in ${place}. Check yours: ${withRef(page, src)}`;
    return {
      whatsapp: text("whatsapp"),
      instagram: text("instagram"),
      x: `https://x.com/intent/post?text=${encodeURIComponent(`I checked my 2027 ballot for ${place}. Five offices, two Saturdays. Check yours:`)}&url=${encodeURIComponent(withRef(page, "x"))}`,
    };
  }, [ready, siteUrl, stateSlug, lgaSlug, place]);

  return (
    <div className="bg-white border border-line rounded-lg p-4.5 flex flex-wrap gap-5 items-center lg:p-6">
      {/* eslint-disable-next-line @next/next/no-img-element -- generated PNG */}
      <img src={`${base}/square`} alt={`My 2027 ballot card for ${place}`} width={1080} height={1080} className="w-[132px] h-[132px] rounded-md flex-none bg-mint-pale" loading="lazy" />
      <div className="flex-[1_1_300px] flex flex-col gap-3">
        <div>
          <h2 className="font-display text-[28px] leading-[0.95] text-ink lg:text-[34px]">Share your ballot</h2>
          <p className="mt-1.5 text-[14px] leading-[1.55] text-ink-soft">
            A card with your offices and seats, never who you plan to vote for. Your friends can check theirs from the link.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ShareImageButton size="sm" href={`${base}/status`} filename={file("status")} text={links?.whatsapp}>
            WhatsApp status
          </ShareImageButton>
          <ShareImageButton variant="soft" size="sm" href={`${base}/status`} filename={file("story")} text={links?.instagram}>
            Instagram story
          </ShareImageButton>
          <a
            className={buttonClasses("soft", "sm")}
            href={links?.x ?? "#"}
            target="_blank"
            rel="noopener"
            onClick={() => track("share_link", { content: "ballot", method: "x" })}
          >
            Post on X
          </a>
          <ShareImageButton variant="soft" size="sm" href={`${base}/square`} filename={file("square")}>
            Download square
          </ShareImageButton>
        </div>
      </div>
    </div>
  );
}
