/**
 * Reviewed profile content, by candidate id. Every profile shows the same four sections in
 * the same order; a section with no entry here shows its empty state.
 *
 * Rules (from the developer to-do):
 * - Only facts from approved, credible sources, each with a source link. A human editor checks
 *   every claim against its source before it goes live, including anything drafted with AI.
 * - Controversies: reported facts only, neutral wording, always with the outcome
 *   (for example "charged", "cleared", "case ongoing"). Legal check before launch.
 */
export type SourcedItem = {
  /** One line, e.g. "Governor of Lagos State, 1999–2007". */
  title: string;
  /** Optional detail sentence. */
  detail?: string;
  /** For controversies: the outcome, e.g. "Case ongoing". Required there. */
  outcome?: string;
  source: { title: string; url: string };
};

export type ProfileContent = {
  pastOffices?: SourcedItem[];
  manifesto?: SourcedItem[];
  accomplishments?: SourcedItem[];
  controversies?: SourcedItem[];
};

export const PROFILE_CONTENT: Record<string, ProfileContent> = {
  // "candidate-id": { pastOffices: [{ title: "...", source: { title: "...", url: "https://..." } }] },
};

export const PROFILE_SECTIONS = [
  { key: "pastOffices", title: "Past offices", empty: "No elected or appointed public office on record in our sources yet. If that is wrong, tell us and we will correct it." },
  { key: "manifesto", title: "Manifesto", empty: "No manifesto or published policy document found yet. We add one once the candidate or party publishes it." },
  { key: "accomplishments", title: "Accomplishments", empty: "Nothing listed yet. Accomplishments appear here once our editors have checked them against official sources." },
  { key: "controversies", title: "Controversies", empty: "Nothing listed. We only include reported facts from credible sources, with the outcome of each case." },
] as const;
