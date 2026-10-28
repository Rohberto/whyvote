export type PartyCode =
  | "A" | "AA" | "AAC" | "ADC" | "ADP" | "APC" | "APGA" | "APM" | "APP" | "BP" | "DLA"
  | "LP" | "NDC" | "NDP" | "NNPP" | "NRM" | "PDP" | "PRP" | "SDP" | "YP" | "YPP" | "ZLP";

export type Party = {
  code: PartyCode;
  name: string;
  /** One-line context shown on the Ziki index, where we have one. */
  note?: string;
};

/** The 22 parties on INEC's 2027 final candidate lists. */
export const PARTIES: Record<PartyCode, Party> = {
  A: { code: "A", name: "Accord" },
  AA: { code: "AA", name: "Action Alliance" },
  AAC: { code: "AAC", name: "African Action Congress" },
  ADC: { code: "ADC", name: "African Democratic Congress", note: "Opposition coalition platform since 2025." },
  ADP: { code: "ADP", name: "Action Democratic Party" },
  APC: { code: "APC", name: "All Progressives Congress", note: "Governing party since 2015." },
  APGA: { code: "APGA", name: "All Progressives Grand Alliance", note: "Governs Anambra." },
  APM: { code: "APM", name: "Allied Peoples Movement", note: "Seyi Makinde’s party for 2027." },
  APP: { code: "APP", name: "Action Peoples Party" },
  BP: { code: "BP", name: "Boot Party" },
  DLA: { code: "DLA", name: "Democratic Leadership Alliance" },
  LP: { code: "LP", name: "Labour Party", note: "Obi’s 2023 platform; governs Abia." },
  NDC: { code: "NDC", name: "Nigeria Democratic Congress", note: "Peter Obi’s party for 2027." },
  NDP: { code: "NDP", name: "National Democratic Party" },
  NNPP: { code: "NNPP", name: "New Nigeria Peoples Party" },
  NRM: { code: "NRM", name: "National Rescue Movement" },
  PDP: { code: "PDP", name: "Peoples Democratic Party", note: "Held the presidency 1999 to 2015." },
  PRP: { code: "PRP", name: "Peoples Redemption Party" },
  SDP: { code: "SDP", name: "Social Democratic Party" },
  YP: { code: "YP", name: "Youth Party" },
  YPP: { code: "YPP", name: "Young Progressives Party" },
  ZLP: { code: "ZLP", name: "Zenith Labour Party" },
};

/**
 * Parties shown up front on My ballot, in alphabetical order. The design's rule is
 * "the six parties holding the most elected offices"; update this list if that changes.
 * Every other party's candidate is one tap away on the Other candidates page.
 */
export const FEATURED_PARTIES: PartyCode[] = ["ADC", "APC", "APM", "LP", "NDC", "PDP"];

export function party(code: string): Party {
  return PARTIES[code as PartyCode] ?? { code: code as PartyCode, name: code };
}

export function partyLogo(code: string) {
  return `/images/parties/${code.toLowerCase()}.webp`;
}

/** Soft background and figure colours for the "Photo pending" placeholder, cycled per card. */
export const PLACEHOLDER_TONES = [
  { bg: "#D9E7FB", fg: "#8FB2EA" },
  { bg: "#DDEEDF", fg: "#96C6A2" },
  { bg: "#FBEFC9", fg: "#DDB86A" },
  { bg: "#EEDDF2", fg: "#C59CD3" },
  { bg: "#FBE1D6", fg: "#E4A285" },
  { bg: "#DDEEF0", fg: "#8CC3C9" },
] as const;
