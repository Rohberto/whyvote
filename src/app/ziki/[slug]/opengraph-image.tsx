import { getCandidate } from "@/lib/candidates";
import { OG_COLORS, OG_SIZE, ogAsset, ogCard } from "@/lib/og";
import { electionDate, seatName } from "@/lib/offices";
import { party } from "@/lib/parties";

export const alt = "Candidate profile on whyVote";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = await getCandidate(slug);
  if (!found) {
    return ogCard(<span style={{ fontFamily: "Bricolage", fontSize: 80 }}>Ziki: know your candidates</span>);
  }
  const { candidate, race, state } = found;
  const [photo, logo] = await Promise.all([
    candidate.photo ? ogAsset(`candidates/${candidate.id}.jpg`) : null,
    ogAsset(`parties/${candidate.party.toLowerCase()}.jpg`),
  ]);
  const long = candidate.name.length > 26;
  return ogCard(
    <div style={{ display: "flex", alignItems: "center", gap: 52, width: "100%" }}>
      {photo ? (
        <img src={photo} width={300} height={340} style={{ borderRadius: 28, objectFit: "cover", objectPosition: "50% 30%" }} alt="" />
      ) : (
        <div style={{ width: 300, height: 340, borderRadius: 28, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
          Photo pending
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
        <span style={{ display: "flex", fontSize: 24, color: OG_COLORS.MINT, textTransform: "uppercase", letterSpacing: 2 }}>Ziki profile</span>
        <span style={{ fontFamily: "Bricolage", fontSize: long ? 60 : 76, lineHeight: 1.02, letterSpacing: -2 }}>{candidate.name}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {logo && <img src={logo} width={52} height={52} style={{ borderRadius: 999, background: "white" }} alt="" />}
          <span style={{ fontSize: 30 }}>{party(candidate.party).name}</span>
        </div>
        <span style={{ fontSize: 28, color: OG_COLORS.LIME }}>
          {seatName(candidate, race, state)} · {electionDate(candidate.office)}
        </span>
      </div>
    </div>,
    "From INEC’s final list of candidates",
  );
}
