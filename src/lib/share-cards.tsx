/* eslint-disable @next/next/no-img-element -- next/og draws plain <img> elements into the PNG */
import { ImageResponse } from "next/og";
import type { Answer, CardSize } from "@/lib/answers";
import { CARD_SIZES } from "@/lib/answers";
import { Fingerprint, loadFonts, logoDataUrl } from "@/lib/og";
import { PLEDGE_PHOTO } from "@/lib/pledge";

/** PNG share images for the Share kit, Why vote and the pledge card. Rendered on the server with next/og. */

const C = {
  ink: "#0A3B2A",
  inkSoft: "#43574A",
  brand: "#2F8A3B",
  green: "#2A7F36",
  mintPale: "#E2F2E8",
  lineSoft: "#D3DDD5",
  sun: "#F2C230",
  bar: "#B9DCC2",
};

/** Images change only with a deploy: let browsers and the CDN keep them. */
const HEADERS = { "Cache-Control": "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400" };

async function render(node: React.ReactElement, size: { width: number; height: number }, filename: string) {
  return new ImageResponse(node, {
    ...size,
    fonts: await loadFonts(),
    headers: { ...HEADERS, "Content-Disposition": `inline; filename="${filename}"` },
  });
}

/** Scale factor so one design works at every size: 1 at 1080 wide. */
const unit = (size: CardSize) => (size === "x" ? 1.1 : 1);

export async function answerCard(answer: Answer, size: CardSize) {
  const dims = CARD_SIZES[size];
  const k = unit(size);
  const tall = size === "status";
  const logo = await logoDataUrl();
  const quoteSize = (tall ? 112 : size === "square" ? 92 : 84) * (answer.objection.length > 34 ? 0.82 : 1) * k;
  const lineSize = (tall ? 50 : 42) * (answer.line.length > 110 ? 0.85 : 1) * k;
  return render(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: C.mintPale,
        padding: tall ? "120px 90px" : `${80 * k}px ${90 * k}px`,
        fontFamily: "Outfit",
        position: "relative",
      }}
    >
      <img src={logo} width={300 * k} height={67 * k} alt="" />
      <div style={{ display: "flex", flexDirection: "column", gap: 40 * k, maxWidth: size === "x" ? 1300 : 900 }}>
        <span style={{ fontFamily: "Bricolage", fontSize: quoteSize, lineHeight: 0.98, color: C.ink, letterSpacing: -1 }}>
          “{answer.objection}”
        </span>
        <span style={{ width: 120 * k, height: 12 * k, background: C.brand, borderRadius: 6 }} />
        <span style={{ fontSize: lineSize, lineHeight: 1.35, color: C.green }}>{answer.line}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 36 * k, color: C.ink }}>
        <span style={{ display: "flex" }}>Vote on 16 Jan and 6 Feb 2027</span>
        <span style={{ display: "flex", color: C.brand }}>whyvote.ng</span>
      </div>
      <div style={{ position: "absolute", right: -60 * k, top: tall ? 180 : 40 * k, display: "flex", opacity: 0.14 }}>
        <Fingerprint size={(tall ? 520 : 380) * k} color={C.brand} />
      </div>
    </div>,
    dims,
    `whyvote-${answer.slug}-${size}.png`,
  );
}

const TURNOUT = [
  { year: "2011", pct: 54 },
  { year: "2015", pct: 44 },
  { year: "2019", pct: 35 },
  { year: "2023", pct: 27 },
];

function Person({ color, w }: { color: string; w: number }) {
  return (
    <svg width={w} height={w * 1.4} viewBox="0 0 10 14">
      <circle cx="5" cy="3" r="2.6" fill={color} />
      <path d="M0.6 14V9.6C0.6 7.4 2.6 6.2 5 6.2S9.4 7.4 9.4 9.6V14Z" fill={color} />
    </svg>
  );
}

export async function turnoutCard(size: "square" | "status") {
  const dims = CARD_SIZES[size];
  const tall = size === "status";
  const logo = await logoDataUrl();
  const w = tall ? 38 : 34;
  return render(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: tall ? 70 : 34,
        justifyContent: tall ? "center" : "flex-start",
        background: C.mintPale,
        padding: tall ? "120px 80px" : "70px 80px",
        fontFamily: "Outfit",
        color: C.ink,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img src={logo} width={260} height={58} alt="" />
        <span style={{ fontSize: 26, letterSpacing: 3, color: C.inkSoft }}>2023 GENERAL ELECTION</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontFamily: "Bricolage", fontSize: tall ? 150 : 110, lineHeight: 0.92 }}>
        <span>73 in 100</span>
        <span style={{ color: C.brand }}>stayed home.</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: tall ? 10 : 6 }}>
        {Array.from({ length: 5 }, (_, row) => (
          <div key={row} style={{ display: "flex", gap: tall ? 9 : 10 }}>
            {Array.from({ length: 20 }, (_, col) => (
              <Person key={col} w={w} color={row * 20 + col < 27 ? C.brand : C.lineSoft} />
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 40, fontSize: 30, color: C.inkSoft }}>
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 24, height: 24, borderRadius: 12, background: C.brand }} />
          27 voted
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 24, height: 24, borderRadius: 12, background: C.lineSoft }} />
          73 stayed home
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 24, height: tall ? 300 : 170 }}>
        {TURNOUT.map((t) => (
          <div key={t.year} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1 }}>
            <span style={{ fontSize: 30 }}>{t.pct}%</span>
            <span
              style={{
                width: "100%",
                height: (t.pct / 54) * (tall ? 210 : 100),
                background: t.year === "2023" ? C.sun : C.bar,
                borderRadius: "6px 6px 0 0",
              }}
            />
            <span style={{ fontSize: 26, color: C.inkSoft }}>{t.year}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: tall ? 0 : "auto" }}>
        <span style={{ fontFamily: "Bricolage", fontSize: tall ? 76 : 56 }}>Imagine if they came out.</span>
        <span style={{ fontSize: 34, color: C.brand }}>whyvote.ng</span>
      </div>
    </div>,
    dims,
    `whyvote-turnout-${size}.png`,
  );
}


export async function pledgeCard(firstName: string) {
  const logo = await logoDataUrl();
  const name = firstName.trim().slice(0, 24);
  const p = PLEDGE_PHOTO;
  return render(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: C.mintPale, fontFamily: "Outfit", color: C.ink }}>
      <div style={{ position: "absolute", right: -110, bottom: 280, display: "flex", opacity: 0.18 }}>
        <Fingerprint size={720} color="#0D974C" />
      </div>
      <img src={logo} width={330} height={74} alt="" style={{ position: "absolute", left: 90, top: 100 }} />
      <div
        style={{
          position: "absolute",
          left: p.x,
          top: p.y,
          width: p.size,
          height: p.size,
          borderRadius: p.size,
          border: `${p.border}px solid ${C.brand}`,
          background: "white",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <svg width={p.size - 2 * p.border} height={p.size - 2 * p.border} viewBox="0 0 100 100">
          <circle cx="50" cy="40" r="17" fill="#B7D3BF" />
          <path d="M16 100c0-21 15-34 34-34s34 13 34 34z" fill="#B7D3BF" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 90, right: 90, top: p.y + p.size + 50, display: "flex", flexDirection: "column", gap: 30 }}>
        <span style={{ fontSize: 58, color: C.brand }}>{name ? `${name} is in.` : "I am in."}</span>
        <span style={{ fontFamily: "Bricolage", fontSize: 168, lineHeight: 0.9, letterSpacing: -2 }}>I pledge to vote.</span>
        <span style={{ fontSize: 44, lineHeight: 1.45, color: C.inkSoft, maxWidth: 860 }}>
          I will be voting for all five positions, not just the President. Who is with me?
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          bottom: 110,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          borderTop: `6px solid ${C.brand}`,
          paddingTop: 30,
          fontSize: 40,
        }}
      >
        <span>16 Jan and 6 Feb 2027</span>
        <span style={{ color: C.green }}>whyvote.ng</span>
      </div>
    </div>,
    { width: 1080, height: 1920 },
    `whyvote-pledge-card${name ? `-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : ""}.png`,
  );
}
