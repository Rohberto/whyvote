/** Session storage key for the details shown on the pledge confirmation screen. */
export const PLEDGE_STORAGE_KEY = "whyvote:pledge";

export type StoredPledge = {
  firstName: string;
  email: string;
  phone: string | null;
  /** State and LGA slugs, when chosen, so the confirmation screen can show that ballot. */
  state?: string | null;
  lga?: string | null;
};

/**
 * Where the photo circle sits on the 1080 × 1920 pledge card. The server draws the card;
 * the browser draws the voter's own photo into this circle, so the photo never leaves the phone.
 */
export const PLEDGE_PHOTO = { x: 90, y: 640, size: 300, border: 10 } as const;

export const pledgeCardHref = (firstName?: string | null) =>
  firstName ? `/pledge/card?name=${encodeURIComponent(firstName)}` : "/pledge/card";

/** Invite link for friends. `from` lets a later version credit the person who invited them. */
export const pledgeInviteUrl = (siteUrl: string, firstName?: string | null) =>
  `${siteUrl}/pledge${firstName ? `?from=${encodeURIComponent(firstName.toLowerCase())}` : ""}`;
