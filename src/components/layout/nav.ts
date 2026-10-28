export type NavItem = { label: string; href: string; match: string[] };

/** Primary sections, in header and footer order. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Why vote", href: "/why-vote", match: ["/why-vote"] },
  { label: "My ballot", href: "/ballot", match: ["/ballot"] },
  { label: "Ziki", href: "/ziki", match: ["/ziki"] },
  { label: "Who does what", href: "/who-does-what", match: ["/who-does-what"] },
  { label: "Get ready", href: "/get-ready", match: ["/get-ready"] },
  { label: "Share kit", href: "/share", match: ["/share"] },
  { label: "About", href: "/about", match: ["/about"] },
];

export const OFFICIAL_SOURCES = [
  { label: "INEC", href: "https://inecnigeria.org" },
  { label: "Voter registration portal", href: "https://cvr.inecnigeria.org" },
  { label: "Polling unit locator", href: "https://cvr.inecnigeria.org/pu" },
];

export function activeItem(pathname: string): NavItem | undefined {
  return NAV_ITEMS.find((item) => item.match.some((m) => pathname === m || pathname.startsWith(`${m}/`)));
}

/** Label on the mobile menu button: the current section, "Home", or "Menu". */
export function sectionLabel(pathname: string): string {
  if (pathname === "/") return "Home";
  return activeItem(pathname)?.label ?? "Menu";
}
