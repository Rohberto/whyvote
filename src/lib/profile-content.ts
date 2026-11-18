/**
 * Reviewed Ziki profile content, by candidate id (see the Ziki AI framework).
 *
 * Every profile shows the same sections in the same order: Background, Past offices, Previous
 * elections, Manifesto, Accomplishments, Controversies, See also, Sources. A section with no
 * entry here shows its empty state; nothing is hidden except See also when there is nothing to link.
 *
 * Rules:
 * - Only facts from approved sources. Every sentence and entry cites at least one source by number
 *   (`ref`, 1-based, into `sources`). No source, no sentence.
 * - An editor checks every claim against its source before it goes live, including AI drafts.
 * - Neutral verbs, no adjectives, British spelling, dates as "16 January 2027", no em dashes.
 * - Controversies: two Rank 1 or 2 sources each, always with a status, and the person's public
 *   response when there is one. Legal sign-off before launch.
 */

/** A run of text: plain strings, links to other pages, and numbered citations. */
export type Rich = (string | { text: string; href: string } | { ref: number })[];

export type Source = {
  /** "Publisher: Title, date" */
  title: string;
  /** Omit when the link is still missing; the title then shows unlinked. */
  url?: string;
  /** Date the source was last checked, e.g. "18 Oct 2026". */
  checked?: string;
};

export type ControversyStatus =
  | "Allegation"
  | "Under investigation"
  | "Charged"
  | "Case ongoing"
  | "Cleared"
  | "Convicted"
  | "Overturned on appeal";

export type ProfileContent = {
  /** One line under the name, e.g. "President of Nigeria since 2023". */
  roleLine?: string;
  /** Third box in the summary card, e.g. { label: "Before this", value: "Governor of Lagos State, 1999 to 2007" }. */
  summaryFact?: { label: string; value: string };
  /** Key facts that INEC does not publish. Anything left out shows "Not on record". */
  keyFacts?: {
    fullName?: string;
    currentRole?: string;
    dateOfBirth?: string;
    stateOfOrigin?: string;
    education?: string;
    profession?: string;
  };
  /** Up to 120 words. Replaces the INEC-only paragraph. */
  background?: Rich[];
  pastOffices?: { title: string; detail: string; current?: boolean; refs?: number[] }[];
  /** Always "Ran for…", so a run is never confused with an office held. */
  elections?: { title: string; detail: string; result: "Elected" | "Re-elected" | "Not elected"; refs?: number[] }[];
  /** One card linking to the document the campaign or party published. No summary, no rating. */
  manifesto?: { title: string; published: string; format: string; url: string };
  accomplishments?: { year: string; text: string; refs?: number[] }[];
  controversies?: { title: string; status: ControversyStatus; summary: Rich; response?: Rich }[];
  seeAlso?: { label: string; href: string }[];
  /** Sources after INEC's list, which is always source 1. */
  sources?: Source[];
  /** "18 October 2026" */
  lastChecked?: string;
};

export const PROFILE_CONTENT: Record<string, ProfileContent> = {
  "bola-tinubu": {
    roleLine: "President of Nigeria since 2023",
    summaryFact: { label: "Before this", value: "Governor of Lagos State, 1999 to 2007" },
    keyFacts: {
      fullName: "Bola Ahmed Tinubu",
      currentRole: "President of Nigeria (since 2023)",
      dateOfBirth: "29 March 1952",
      stateOfOrigin: "Lagos",
      education: "Chicago State University (BSc, Accounting)",
      profession: "Accountant",
    },
    background: [
      [
        "Bola Ahmed Tinubu is the President of Nigeria, in office since 29 May 2023, and the ",
        { text: "All Progressives Congress", href: "/ziki/parties/apc" },
        " candidate in the 2027 presidential election. He is seeking a second term, with Vice President ",
        { text: "Kashim Shettima", href: "/ziki/kashim-shettima" },
        " again as his running mate.",
        { ref: 2 },
      ],
      [
        "He studied accounting at Chicago State University and worked as an accountant in the United States before joining Mobil Oil Nigeria. He was elected senator for Lagos West in 1992 and Governor of ",
        { text: "Lagos State", href: "/ziki#lagos-governorship" },
        " in 1999, serving two terms until 2007. In 2013 he was one of the leaders whose parties merged to form the APC.",
        { ref: 3 },
      ],
    ],
    pastOffices: [
      { title: "President of Nigeria", detail: "Federal Government of Nigeria · 2023 to present", current: true, refs: [3] },
      { title: "Governor of Lagos State", detail: "Lagos State · 1999 to 2007", refs: [3] },
      { title: "Senator, Lagos West", detail: "Senate of Nigeria · 1992 to 1993", refs: [3] },
    ],
    elections: [
      { title: "Ran for President", detail: "All Progressives Congress · 2023", result: "Elected", refs: [3] },
      { title: "Ran for Governor of Lagos State", detail: "Alliance for Democracy · 2003", result: "Re-elected", refs: [3] },
      { title: "Ran for Governor of Lagos State", detail: "Alliance for Democracy · 1999", result: "Elected", refs: [3] },
      { title: "Ran for Senator, Lagos West", detail: "Social Democratic Party · 1992", result: "Elected", refs: [3] },
    ],
    accomplishments: [
      { year: "2023", text: "Ended the petrol subsidy", refs: [3] },
      { year: "2023", text: "Unified the naira exchange rate", refs: [3] },
      { year: "2024", text: "Launched federal student loans through NELFUND", refs: [3] },
      { year: "2025", text: "Signed a set of tax reform laws", refs: [3] },
      { year: "2026", text: "Signed the Electoral Act 2026", refs: [4] },
    ],
    seeAlso: [
      { label: "Kashim Shettima", href: "/ziki/kashim-shettima" },
      { label: "All Progressives Congress", href: "/ziki/parties/apc" },
      { label: "2023 presidential election", href: "https://en.wikipedia.org/wiki/2023_Nigerian_presidential_election" },
    ],
    sources: [
      { title: "INEC releases final list of 18 presidential candidates (Metro Daily, 13 Sep 2026)", checked: "18 Oct 2026" },
      { title: "Bola Tinubu (Wikipedia)", url: "https://en.wikipedia.org/wiki/Bola_Tinubu", checked: "18 Oct 2026" },
      { title: "2027 Nigerian general election (Wikipedia)", url: "https://en.wikipedia.org/wiki/2027_Nigerian_general_election", checked: "18 Oct 2026" },
    ],
    lastChecked: "18 October 2026",
  },

  "gbadebo-rhodes-vivour": {
    roleLine: "Architect and 2023 runner-up for Lagos governor",
    summaryFact: { label: "Last election", value: "Came second for Lagos governor, 2023" },
    keyFacts: {
      fullName: "Gbadebo Rhodes-Vivour",
      currentRole: "No public office",
      profession: "Architect",
    },
    background: [
      [
        "Gbadebo Rhodes-Vivour is an architect and the ",
        { text: "African Democratic Congress", href: "/ziki/parties/adc" },
        " candidate in the 2027 ",
        { text: "Lagos", href: "/ziki#lagos-governorship" },
        " governorship election.",
        { ref: 2 },
      ],
      [
        "He was the PDP candidate for the Lagos West Senate seat in 2019. In 2023 he ran for governor on the ",
        { text: "Labour Party", href: "/ziki/parties/lp" },
        " ticket and finished second. He moved to the ADC ahead of 2027 and is on INEC’s final list of 17 Lagos governorship candidates.",
        { ref: 3 },
        { ref: 2 },
        { ref: 4 },
      ],
    ],
    elections: [
      { title: "Ran for Governor of Lagos State", detail: "Labour Party candidate · came second · 2023", result: "Not elected", refs: [3] },
      { title: "Ran for Senator, Lagos West", detail: "Peoples Democratic Party candidate · 2019", result: "Not elected", refs: [3] },
    ],
    seeAlso: [
      { label: "Lagos State", href: "/ziki#lagos-governorship" },
      { label: "African Democratic Congress", href: "/ziki/parties/adc" },
    ],
    sources: [
      { title: "Hamzat, Rhodes-Vivour, 15 others make INEC’s Lagos governorship list (Tribune, Oct 2026)", checked: "18 Oct 2026" },
      { title: "Gbadebo Rhodes-Vivour (Wikipedia)", url: "https://en.wikipedia.org/wiki/Gbadebo_Rhodes-Vivour", checked: "18 Oct 2026" },
      { title: "INEC releases 2027 governorship list (The Journal)", checked: "18 Oct 2026" },
    ],
    lastChecked: "18 October 2026",
  },
};
