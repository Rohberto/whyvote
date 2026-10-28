/**
 * Short, sourced one-line context shown on Ziki cards, keyed by candidate id.
 * Candidates without a line show their party name instead. Add lines only with a source.
 */
export const ZIKI_HEADLINES: Record<string, string> = {
  "bola-tinubu": "President of Nigeria since 2023",
  "atiku-abubakar": "Vice President 1999 to 2007",
  "peter-obi": "Governor of Anambra 2006 to 2014",
  "sandy-onor": "Senator for Cross River Central 2019 to 2023",
  "chibuzo-okereke": "Governance and legislative policy expert",
  "seyi-makinde": "Governor of Oyo since 2019",
  "kashim-shettima": "Vice President since 2023",
  "rotimi-amaechi": "Former Rivers governor and transport minister",
  "rabiu-musa-kwankwaso": "Former Kano governor",
  "obafemi-hamzat": "Deputy Governor of Lagos since 2019",
  "gbadebo-rhodes-vivour": "Architect and 2023 runner-up",
  "funso-doherty": "Former investment banker",
  "adedeji-doherty": "Former Lagos PDP chairman",
};

/**
 * Current officeholders shown in the "Current officeholder" strip on My ballot, keyed by race id.
 * Only filled where confirmed. Incumbents are not part of INEC's candidate list.
 */
export const OFFICEHOLDERS: Record<
  string,
  { name: string; party: string; since: string; runningAgain?: string; status?: string }
> = {
  "president:national": {
    name: "Bola Tinubu",
    party: "APC",
    since: "President since 2023",
    runningAgain: "bola-tinubu",
    status: "Running again",
  },
  "governor:lagos": {
    name: "Babajide Sanwo-Olu",
    party: "APC",
    since: "Governor since 2019",
    status: "Serving his second and final term, so not on this ballot",
  },
};
