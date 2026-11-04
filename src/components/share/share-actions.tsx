"use client";

import { useState, type ReactNode } from "react";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/button";

type Common = { variant?: ButtonVariant; size?: ButtonSize; className?: string; children: ReactNode };

const copyIcon = (
  <svg className="flex-none" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h8" />
  </svg>
);

/** Save a blob as a file through a temporary link. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

/**
 * Share an image file. Phones open the share sheet (WhatsApp, Instagram, Save image);
 * browsers that cannot share files download it instead.
 */
export async function shareOrDownload(blob: Blob, filename: string, text?: string) {
  const file = new File([blob], filename, { type: blob.type || "image/png" });
  const data: ShareData = { files: [file], ...(text ? { text } : {}) };
  const touch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  if (touch && navigator.canShare?.(data)) {
    try {
      await navigator.share(data);
      return "shared" as const;
    } catch (err) {
      // The voter closed the share sheet: nothing to do.
      if (err instanceof DOMException && err.name === "AbortError") return "cancelled" as const;
    }
  }
  downloadBlob(blob, filename);
  return "downloaded" as const;
}

/** A button that fetches a generated PNG and shares or downloads it. */
export function ShareImageButton({
  href,
  filename,
  text,
  variant,
  size,
  className,
  children,
}: Common & { href: string; filename: string; text?: string }) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  async function go() {
    if (state === "busy") return;
    setState("busy");
    try {
      const res = await fetch(href);
      if (!res.ok) throw new Error(String(res.status));
      const result = await shareOrDownload(await res.blob(), filename, text);
      setState(result === "cancelled" ? "idle" : "done");
      setTimeout(() => setState("idle"), 2500);
    } catch {
      setState("error");
      // Last resort: open the image so it can be saved by hand.
      window.open(href, "_blank", "noopener");
      setTimeout(() => setState("idle"), 2500);
    }
  }

  return (
    <button type="button" className={buttonClasses(variant, size, className)} onClick={go} aria-busy={state === "busy"}>
      {state === "busy" ? "Making image…" : state === "done" ? "Done" : children}
    </button>
  );
}

/** Copies text to the clipboard and confirms. */
export function CopyButton({ text, variant, size, className, children, copied = "Copied" }: Common & { text: string; copied?: string }) {
  const [done, setDone] = useState(false);
  async function go() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const t = document.createElement("textarea");
      t.value = text;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  }
  return (
    <button type="button" className={buttonClasses(variant, size, className)} onClick={go}>
      {copyIcon}
      <span aria-live="polite">{done ? copied : children}</span>
    </button>
  );
}

/** Shares a link with the share sheet on phones, or copies it on desktop. */
export function ShareLinkButton({ url, text, variant, size, className, children }: Common & { url: string; text?: string }) {
  const [copied, setCopied] = useState(false);
  async function go() {
    const data = { url, ...(text ? { text } : {}) };
    if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
      try {
        await navigator.share(data);
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(text ? `${text} ${url}` : url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", url);
    }
  }
  return (
    <button type="button" className={buttonClasses(variant, size, className)} onClick={go}>
      <span aria-live="polite" className="inline-flex items-center gap-2">
        {copied ? "Link copied" : children}
      </span>
    </button>
  );
}
