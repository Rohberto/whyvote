/** Session storage key for the details shown on the pledge confirmation screen. */
export const PLEDGE_STORAGE_KEY = "whyvote:pledge";

export type StoredPledge = { firstName: string; email: string; phone: string | null };
