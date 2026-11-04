import { getLga, getState } from "@/lib/candidates";
import { OG_COLORS, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Your 2027 ballot on whyVote";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ state: string; lga: string }> }) {
  const { state: s, lga: l } = await params;
  const state = getState(s);
  const lga = getLga(s, l);
  return ogCard(
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <span style={{ display: "flex", fontSize: 24, color: OG_COLORS.MINT, textTransform: "uppercase", letterSpacing: 2 }}>My ballot</span>
      <span style={{ fontFamily: "Bricolage", fontSize: 86, lineHeight: 1.02, letterSpacing: -3, maxWidth: 1000 }}>
        {lga && state ? `${lga.name}, ${state.name}` : "Your 2027 ballot"}
      </span>
      <span style={{ fontSize: 32, color: OG_COLORS.LIME }}>Every race and candidate on your 2027 ballot.</span>
    </div>,
  );
}
