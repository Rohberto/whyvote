/* eslint-disable @next/next/no-img-element -- next/og draws plain <img> elements into the PNG */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { ReactNode } from "react";
import { FINGERPRINT_PATHS } from "@/components/icons/fingerprint-mark";

/** Shared look for Open Graph / Twitter share cards (1200×630). */
export const OG_SIZE = { width: 1200, height: 630 };

const ASSETS = join(process.cwd(), "src/assets");
const INK = "#0A3B2A";
const MINT = "#57D37F";
const LIME = "#E3F07A";

let fonts: Promise<{ name: string; data: Buffer; weight: 600 | 800; style: "normal" }[]> | null = null;
export function loadFonts() {
  fonts ??= Promise.all([
    readFile(join(ASSETS, "fonts/outfit-latin-600-normal.woff")),
    readFile(join(ASSETS, "fonts/bricolage-grotesque-latin-800-normal.woff")),
  ]).then(([outfit, bricolage]) => [
    { name: "Outfit", data: outfit, weight: 600, style: "normal" },
    { name: "Bricolage", data: bricolage, weight: 800, style: "normal" },
  ]);
  return fonts;
}

let logo: Promise<string> | null = null;
/** The whyVote logo (dark, for light backgrounds) as a data URL. */
export function logoDataUrl() {
  logo ??= readFile(join(ASSETS, "logo.png")).then((d) => `data:image/png;base64,${d.toString("base64")}`);
  return logo;
}

let mark: Promise<string> | null = null;
/** The round whyVote icon (public/favicon.png) as a data URL. */
export function markDataUrl() {
  mark ??= readFile(join(ASSETS, "favicon.png")).then((d) => `data:image/png;base64,${d.toString("base64")}`);
  return mark;
}

/** A JPEG from src/assets/og as a data URL, or null if it is missing. */
export async function ogAsset(path: string) {
  try {
    const data = await readFile(join(ASSETS, "og", path));
    return `data:image/jpeg;base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

export function Fingerprint({ size, color = MINT }: { size: number; color?: string }) {
  return (
    <svg width={size * 0.73} height={size} viewBox="40 25 135 185" fill="none" stroke={color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
      {FINGERPRINT_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/** Dark green card with the whyVote wordmark at the top and election dates at the bottom. */
export async function ogCard(children: ReactNode, footer = "Elections · 16 January & 6 February 2027") {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: INK, color: "white", padding: "56px 64px", fontFamily: "Outfit" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={await markDataUrl()} width={56} height={56} alt="" />
          <span style={{ fontFamily: "Bricolage", fontSize: 38, letterSpacing: -1 }}>whyVote</span>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>{children}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "rgba(255,255,255,0.75)" }}>
          <span>{footer}</span>
          <span style={{ display: "flex", background: LIME, color: INK, borderRadius: 999, padding: "8px 18px", fontSize: 20 }}>Nonpartisan guide</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}

export const OG_COLORS = { INK, MINT, LIME };
