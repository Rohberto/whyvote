/** The eight reasons people give for not voting, with the one-line answer used on share cards. */
export const ANSWERS = [
  {
    slug: "vote-buying",
    objection: "They will just buy votes anyway",
    line: "Vote buying works best where few people turn up. The more of us who vote, the less it works.",
  },
  {
    slug: "courts",
    objection: "The courts will change the result anyway",
    line: "Courts work from the votes on the result sheets. They do not pick a winner from nowhere.",
  },
  {
    slug: "one-vote",
    objection: "My vote does not count",
    line: "If your vote does not count, why are they trying to buy it?",
  },
  {
    slug: "all-the-same",
    objection: "They are all the same",
    line: "Someone will still win. If you stay home, someone else chooses for you.",
  },
  {
    slug: "not-in-state",
    objection: "I will not be in my state on election day",
    line: "You can only vote where you registered. Plan now to be there on both Saturdays.",
  },
  {
    slug: "nothing-changed",
    objection: "I voted in 2023 and nothing changed",
    line: "One election is not a quick fix. Leaders change when young people keep showing up, every election, until they cannot be ignored.",
  },
  {
    slug: "dont-know-candidates",
    objection: "I do not know anybody on the ballot",
    line: "Most people don’t. Use whyvote.ng. Start with what each office does. It takes about twenty minutes.",
  },
  {
    slug: "japa",
    objection: "I am leaving the country anyway",
    line: "Leaving might take years. Until then, the people in charge still decide your life here.",
  },
] as const;

export type Answer = (typeof ANSWERS)[number];

/** Share image sizes, named as on the Share kit. */
export const CARD_SIZES = {
  status: { width: 1080, height: 1920, label: "Status" },
  square: { width: 1080, height: 1080, label: "Square" },
  x: { width: 1600, height: 900, label: "X" },
} as const;

export type CardSize = keyof typeof CARD_SIZES;

export const answerBySlug = (slug: string) => ANSWERS.find((a) => a.slug === slug);
export const answerCardHref = (slug: string, size: CardSize) => `/share/cards/${slug}/${size}`;
export const answerShareText = (a: Answer, siteUrl: string) => `“${a.objection}”\n\n${a.line}\n\n${siteUrl}/why-vote#${a.slug}`;
