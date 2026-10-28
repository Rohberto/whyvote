import type { Candidate, Race, StateGeo } from "@/lib/candidates";

const FIRST = "16 January 2027";
const SECOND = "6 February 2027";

export function electionDate(office: Candidate["office"]) {
  return office === "president" || office === "vice-president" || office === "senate" || office === "reps" ? FIRST : SECOND;
}

/** "Governor of Lagos", "Senator for Lagos West", ... */
export function seatName(c: Candidate, race: Race, state: StateGeo | null) {
  const s = state?.name ?? "";
  switch (c.office) {
    case "president":
      return "President of Nigeria";
    case "vice-president":
      return "Vice President of Nigeria";
    case "governor":
      return `Governor of ${s}`;
    case "deputy-governor":
      return `Deputy Governor of ${s}`;
    case "senate":
      return `Senator for ${race.name}, ${s}`;
    case "reps":
      return `Member, House of Representatives for ${race.name}, ${s}`;
    case "assembly":
      return `Member, ${s} House of Assembly for ${race.name}`;
  }
}

/** Breadcrumb / section label for the race a candidate is in. */
export function raceLabel(c: Candidate, race: Race, state: StateGeo | null) {
  switch (c.office) {
    case "president":
      return "Presidential candidates, 2027";
    case "vice-president":
      return "Running mates, 2027";
    case "governor":
    case "deputy-governor":
      return `${state?.name} governorship candidates, 2027`;
    case "senate":
      return `${race.name} senatorial district, 2027`;
    case "reps":
      return `${race.name} federal constituency, 2027`;
    case "assembly":
      return `${race.name} state constituency, 2027`;
  }
}

export const RUNNING_FOR: Record<Candidate["office"], string> = {
  president: "President",
  "vice-president": "Vice President (running mate)",
  governor: "Governor",
  "deputy-governor": "Deputy Governor (running mate)",
  senate: "Senate",
  reps: "House of Representatives",
  assembly: "State House of Assembly",
};
