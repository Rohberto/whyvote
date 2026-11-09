/** Referral codes: each browser gets a short random code that is added to links it shares. */
const KEY = "whyvote:ref";

export function myRefCode() {
  try {
    let code = localStorage.getItem(KEY);
    if (!code) {
      code = Math.random().toString(36).slice(2, 8);
      localStorage.setItem(KEY, code);
    }
    return code;
  } catch {
    return "share";
  }
}

/** Adds ?ref=<code> (and a source label) to a whyVote link. */
export function withRef(url: string, source: string) {
  const u = new URL(url);
  u.searchParams.set("ref", myRefCode());
  u.searchParams.set("src", source);
  return u.toString();
}
