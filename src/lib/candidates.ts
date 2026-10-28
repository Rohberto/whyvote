import { readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";
import geoData from "@/data/geo.json";
import nationalData from "@/data/national.json";

/**
 * Candidate data from INEC's final list of candidates for the 2027 general election.
 * Generated from the spreadsheet by scripts/candidates (see its README).
 */

export type Office = "president" | "vice-president" | "governor" | "deputy-governor" | "senate" | "reps" | "assembly";

export type Candidate = {
  id: string;
  /** Display name. INEC order, title-cased, except a few common-usage names. */
  name: string;
  /** Name exactly as printed by INEC. */
  inecName: string;
  party: string;
  office: Office;
  /** Race id, e.g. "senate:lagos:lagos-west" or "president:national". */
  race: string;
  ticket?: number;
  age?: number;
  /** Set when INEC printed an impossible age (e.g. 147); `age` is then omitted. */
  agePrinted?: number;
  gender?: "M" | "F";
  qualifications?: string;
  pwd?: string;
  stateOfOrigin?: string;
  courtOrder?: boolean;
  photo?: boolean;
};

export type Race = { id: string; office: Office; name: string | null; lgas?: string[] };

export type StateData = { state: string; slug: string; races: Race[]; candidates: Candidate[] };

export type Lga = { slug: string; name: string; senate: string[]; reps: string[]; assembly: string[] };

export type StateGeo = { slug: string; name: string; hasGovernorship: boolean; lgas: Lga[] };

export const GEO = geoData as StateGeo[];
const NATIONAL = nationalData as Candidate[];

export const OFFICE_LABEL: Record<Office, string> = {
  president: "President",
  "vice-president": "Vice President",
  governor: "Governor",
  "deputy-governor": "Deputy Governor",
  senate: "Senator",
  reps: "Member, House of Representatives",
  assembly: "Member, State House of Assembly",
};

export function getState(slug: string): StateGeo | undefined {
  return GEO.find((s) => s.slug === slug);
}

export function getLga(stateSlug: string, lgaSlug: string): Lga | undefined {
  return getState(stateSlug)?.lgas.find((l) => l.slug === lgaSlug);
}

export function getNational(): Candidate[] {
  return NATIONAL;
}

/** One state's races and candidates. Read from disk so each page only loads its own state. */
export async function getStateData(slug: string): Promise<StateData | null> {
  "use cache";
  cacheLife("max");
  if (!getState(slug)) return null;
  const file = path.join(process.cwd(), "src/data/states", `${slug}.json`);
  return JSON.parse(await readFile(file, "utf8")) as StateData;
}

async function getSlugIndex(): Promise<Record<string, string>> {
  "use cache";
  cacheLife("max");
  const file = path.join(process.cwd(), "src/data/slugs.json");
  return JSON.parse(await readFile(file, "utf8"));
}

export type CandidateWithContext = {
  candidate: Candidate;
  race: Race;
  state: StateGeo | null;
  /** Everyone else in the same race. */
  rivals: Candidate[];
  /** Presidential and governorship running mate (or the principal, for a deputy). */
  partner: Candidate | null;
};

export async function getCandidate(id: string): Promise<CandidateWithContext | null> {
  "use cache";
  cacheLife("max");
  const where = (await getSlugIndex())[id];
  if (!where) return null;
  let pool: Candidate[];
  let races: Race[];
  let state: StateGeo | null = null;
  if (where === "national") {
    pool = NATIONAL;
    races = [
      { id: "president:national", office: "president", name: null },
      { id: "vice-president:national", office: "vice-president", name: null },
    ];
  } else {
    const data = await getStateData(where);
    if (!data) return null;
    pool = data.candidates;
    races = data.races;
    state = getState(where) ?? null;
  }
  const candidate = pool.find((c) => c.id === id);
  if (!candidate) return null;
  const race = races.find((r) => r.id === candidate.race)!;
  const partnerOffice: Partial<Record<Office, Office>> = {
    president: "vice-president",
    "vice-president": "president",
    governor: "deputy-governor",
    "deputy-governor": "governor",
  };
  const po = partnerOffice[candidate.office];
  const partner = po ? pool.find((c) => c.office === po && c.party === candidate.party) ?? null : null;
  const rivals = pool.filter((c) => c.race === candidate.race && c.id !== candidate.id);
  return { candidate, race, state, rivals, partner };
}

/** Light search across every candidate: name, party, state or constituency. */
export async function searchCandidates(query: string, limit = 20) {
  "use cache";
  cacheLife("max");
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const file = path.join(process.cwd(), "src/data/search.json");
  const rows = JSON.parse(await readFile(file, "utf8")) as [string, string, string, Office, string, string][];
  const terms = q.split(/\s+/);
  const out: { id: string; name: string; party: string; office: Office; state: string; constituency: string }[] = [];
  for (const [id, name, party, office, state, constituency] of rows) {
    const hay = `${name} ${party} ${state} ${constituency} ${OFFICE_LABEL[office]}`.toLowerCase();
    if (terms.every((t) => hay.includes(t))) {
      out.push({ id, name, party, office, state, constituency });
      if (out.length >= limit) break;
    }
  }
  return out;
}

/** Sort constituencies like "Ajeromi-Ifelodun I" before "Ajeromi-Ifelodun II". */
export function compareRaceNames(a: string, b: string) {
  return a.localeCompare(b, "en", { numeric: true });
}
