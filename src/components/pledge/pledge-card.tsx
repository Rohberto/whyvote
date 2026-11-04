"use client";

import { useEffect, useRef, useState } from "react";
import { useStoredPledge } from "@/components/pledge/pledge-greeting";
import { shareOrDownload, ShareLinkButton } from "@/components/share/share-actions";
import { Button, ButtonLink } from "@/components/ui/button";
import { PLEDGE_PHOTO, pledgeCardHref, pledgeInviteUrl } from "@/lib/pledge";

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Draws the server card, then the voter's photo inside its circle. */
async function compose(cardSrc: string, photo: string | null) {
  const card = await loadImage(cardSrc);
  const canvas = document.createElement("canvas");
  canvas.width = card.naturalWidth;
  canvas.height = card.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(card, 0, 0);
  if (photo) {
    const img = await loadImage(photo);
    const { x, y, size, border } = PLEDGE_PHOTO;
    const d = size - 2 * border;
    const cx = x + size / 2;
    const cy = y + size / 2;
    // Cover-crop the photo into the circle, a little above centre so faces are not cut.
    const scale = Math.max(d / img.naturalWidth, d / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, d / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, cx - w / 2, cy - h * 0.42, w, h);
    ctx.restore();
  }
  return new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob"))), "image/png"));
}

const icon = {
  person: (
    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  ),
  save: (
    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  ),
  share: (
    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  ),
  whatsapp: (
    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20z" />
      <path d="M9 9.5c.3 2.3 2.2 4.2 4.5 4.5l1-1.2 2 .8" />
    </svg>
  ),
};

/** The pledge card with "Add your photo" and "Save card". */
export function PledgeCard() {
  const pledge = useStoredPledge();
  const src = pledgeCardHref(pledge?.firstName);
  const [photo, setPhoto] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  // Rebuild the preview when a photo is added; the server image alone needs no canvas.
  useEffect(() => {
    if (!photo) return;
    let url: string | null = null;
    let live = true;
    compose(src, photo).then((blob) => {
      if (!live) return;
      url = URL.createObjectURL(blob);
      setPreview(url);
    });
    return () => {
      live = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [photo, src]);

  async function save() {
    setBusy(true);
    try {
      const blob = await compose(src, photo);
      const name = pledge?.firstName ? `-${pledge.firstName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : "";
      await shareOrDownload(blob, `whyvote-pledge-card${name}.png`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex-[0_1_320px] w-full flex flex-col gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element -- generated PNG, sized by its route */}
      <img
        src={photo && preview ? preview : src}
        alt={`Pledge card: ${pledge?.firstName ? `${pledge.firstName} is in.` : ""} I pledge to vote.`}
        width={1080}
        height={1920}
        className="w-full h-auto max-h-[560px] object-contain rounded-lg bg-mint-pale"
      />
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => setPhoto(String(reader.result));
          reader.readAsDataURL(file);
        }}
      />
      <div className="flex flex-wrap gap-2">
        <Button className="flex-[1_1_140px]" variant="outline" onClick={() => input.current?.click()}>
          {icon.person}
          {photo ? "Change photo" : "Add your photo"}
        </Button>
        <Button className="flex-[1_1_140px]" onClick={save} disabled={busy}>
          {icon.save}
          {busy ? "Making card…" : "Save card"}
        </Button>
      </div>
      <p className="text-[12px] leading-[1.6] text-ink-faint">Your photo stays on your device. It is only used to make this card.</p>
    </div>
  );
}

/** "Send to a friend on WhatsApp" with the invite link. */
export function WhatsAppInvite({ siteUrl, className }: { siteUrl: string; className?: string }) {
  const pledge = useStoredPledge();
  const text = `I just pledged to vote on 16 January and 6 February 2027, for all five positions, not just the President. Pledge with me: ${pledgeInviteUrl(siteUrl, pledge?.firstName)}`;
  return (
    <ButtonLink size="lg" className={className} href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener">
      {icon.whatsapp}
      Send to a friend on WhatsApp
    </ButtonLink>
  );
}

/** "Share invite link": share sheet on phones, copy on desktop. */
export function InviteLinkButton({ siteUrl }: { siteUrl: string }) {
  const pledge = useStoredPledge();
  return (
    <ShareLinkButton
      variant="sun"
      size="lg"
      url={pledgeInviteUrl(siteUrl, pledge?.firstName)}
      text="I pledged to vote in 2027. Pledge with me:"
    >
      {icon.share}
      Share invite link
    </ShareLinkButton>
  );
}
