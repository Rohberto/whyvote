import { cacheLife } from "next/cache";

/** The two 2027 general election Saturdays (Nigeria, WAT). */
export const ELECTION_DAYS = {
  first: {
    date: "2027-01-16T08:00:00+01:00",
    label: "Saturday 16 January 2027",
    short: "Sat 16 Jan",
    offices: "President, Senate, House of Representatives",
  },
  second: {
    date: "2027-02-06T08:00:00+01:00",
    label: "Saturday 6 February 2027",
    short: "Sat 6 Feb",
    offices: "Governor, State House of Assembly",
  },
} as const;

export type ElectionDay = keyof typeof ELECTION_DAYS;

const DAY_MS = 24 * 60 * 60 * 1000;

/** Whole days from today (Lagos time) until each election day. Refreshed hourly. */
export async function getDaysToVote(): Promise<Record<ElectionDay, number>> {
  "use cache";
  cacheLife("hours");

  // Start of today in Lagos (UTC+1, no daylight saving).
  const lagosNow = Date.now() + 60 * 60 * 1000;
  const today = Math.floor(lagosNow / DAY_MS);
  const daysTo = (iso: string) => {
    const target = Math.floor((new Date(iso).getTime() + 60 * 60 * 1000) / DAY_MS);
    return Math.max(0, target - today);
  };

  return {
    first: daysTo(ELECTION_DAYS.first.date),
    second: daysTo(ELECTION_DAYS.second.date),
  };
}
