import { OG_COLORS, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "whyvote: a plain, nonpartisan guide to Nigeria’s 2027 general election";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return ogCard(
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <span style={{ fontFamily: "Bricolage", fontSize: 92, lineHeight: 1, letterSpacing: -3, maxWidth: 950 }}>
        Your vote, your ballot, in plain words.
      </span>
      <span style={{ fontSize: 32, color: OG_COLORS.LIME, maxWidth: 950 }}>
        Every 2027 candidate from INEC’s final list, and how to get ready to vote.
      </span>
    </div>,
  );
}
