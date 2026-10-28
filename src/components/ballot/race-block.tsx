import Link from "next/link";
import type { Candidate, Race } from "@/lib/candidates";
import { FEATURED_PARTIES } from "@/lib/parties";
import { OFFICEHOLDERS } from "@/lib/ziki-notes";
import { BallotCard } from "@/components/candidates/candidate-cards";
import { Chip } from "@/components/ui/chip";
import { Tabs, TabList, TabPanel } from "@/components/ui/tabs";

export function featuredOf(candidates: Candidate[]) {
  return FEATURED_PARTIES.map((p) => candidates.find((c) => c.party === p)).filter((c): c is Candidate => Boolean(c));
}

function Officeholder({ raceId }: { raceId: string }) {
  const o = OFFICEHOLDERS[raceId];
  if (!o) return null;
  return (
    <div className="flex flex-wrap gap-3 items-center bg-mint-pale rounded-md py-3 px-3.5">
      <Chip tone="ink">
        <svg className="flex-none" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
        </svg>
        Current officeholder
      </Chip>
      <span>
        <b className="text-[15px]">{o.name}</b> <span className="text-[14px] text-ink-soft">({o.party})</span>
        <span className="text-[14px] text-ink-soft"> · {o.since}</span>
      </span>
      {o.status && <span className="text-[13px] text-ink-soft">{o.status}</span>}
    </div>
  );
}

function RaceGrid({ race, candidates, otherHref }: { race: Race; candidates: Candidate[]; otherHref: string }) {
  const featured = featuredOf(candidates);
  const others = candidates.length - featured.length;
  const holder = OFFICEHOLDERS[race.id]?.runningAgain;
  return (
    <>
      <Officeholder raceId={race.id} />
      {featured.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] gap-3 lg:grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))]">
          {featured.map((c, i) => (
            <BallotCard key={c.id} candidate={c} tone={i} officeholder={c.id === holder} />
          ))}
        </div>
      ) : (
        <p className="text-[15px] leading-[1.6] text-ink-soft">None of the six largest parties has a candidate in this race.</p>
      )}
      {others > 0 && (
        <Link
          className="flex justify-between items-center min-h-13 px-4 bg-mist rounded-md text-ink no-underline text-[15px] font-semibold hover:bg-mist-deep hover:text-ink"
          href={otherHref}
        >
          Other candidates on this ballot ({others})
          <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      )}
    </>
  );
}

/**
 * One office on My ballot. When an LGA is split between several constituencies,
 * each one gets a tab and the voter picks the one on their PVC.
 */
export function RaceBlock({
  title,
  subtitle,
  races,
  candidates,
  otherHref,
  splitNote,
}: {
  title: string;
  subtitle: (race: Race) => string;
  races: Race[];
  candidates: Candidate[];
  otherHref: (race: Race) => string;
  splitNote?: string;
}) {
  const byRace = (r: Race) => candidates.filter((c) => c.race === r.id);
  return (
    <div className="bg-white border border-line rounded-lg py-4.5 px-3.5 flex flex-col gap-4 lg:p-7">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[36px]">{title}</h2>
        <p className="text-[14px] leading-[1.6] text-ink-soft">
          {races.length > 1 ? (splitNote ?? "Your LGA is split between more than one constituency. Pick the one on your PVC.") : subtitle(races[0])}
        </p>
      </div>
      {races.length > 1 ? (
        <Tabs count={races.length}>
          <TabList
            label={`${title} constituency`}
            className="flex gap-2 overflow-x-auto pb-1.5 lg:overflow-x-visible lg:pb-0 lg:flex-wrap"
            tabs={races.map((r) => r.name ?? r.id)}
          />
          {races.map((r, i) => (
            <TabPanel key={r.id} index={i} className="flex flex-col gap-4">
              <RaceGrid race={r} candidates={byRace(r)} otherHref={otherHref(r)} />
            </TabPanel>
          ))}
        </Tabs>
      ) : (
        <RaceGrid race={races[0]} candidates={byRace(races[0])} otherHref={otherHref(races[0])} />
      )}
    </div>
  );
}
