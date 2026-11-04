import { featuredOf } from "@/components/ballot/race-block";
import { compareRaceNames, getLga, getNational, getState, getStateData, type Candidate, type Race } from "@/lib/candidates";
import { OFFICEHOLDERS } from "@/lib/ziki-notes";

/** One contest on a voter's ballot, with the six featured candidates per constituency. */
export type SummaryRace = {
  /** "Senator", "House of Representatives", ... */
  title: string;
  /** Line for the pledge screen, e.g. "Senator, Lagos West". */
  line: string;
  /** Where the contest is, e.g. "Lagos West" or "Ajeromi-Ifelodun I or Ajeromi-Ifelodun II". */
  seat: string;
  hash: string;
  constituencies: { race: Race; featured: Candidate[]; total: number; officeholder?: string }[];
};

export type BallotSummary = {
  state: { slug: string; name: string };
  lga: { slug: string; name: string };
  days: { label: string; date: string; races: SummaryRace[]; note?: string }[];
};

const orNames = (races: Race[]) => races.map((r) => r.name).join(" or ");

/** The voter's ballot for both Saturdays, or null for an unknown state or LGA. */
export async function ballotSummary(stateSlug: string, lgaSlug: string): Promise<BallotSummary | null> {
  const state = getState(stateSlug);
  const lga = getLga(stateSlug, lgaSlug);
  const data = await getStateData(stateSlug);
  if (!state || !lga || !data) return null;

  const byId = new Map(data.races.map((r) => [r.id, r]));
  const races = (ids: string[]) =>
    ids
      .map((id) => byId.get(id))
      .filter((r): r is Race => Boolean(r))
      .sort((a, b) => compareRaceNames(a.name ?? "", b.name ?? ""));
  const contest = (race: Race, pool: Candidate[]) => {
    const all = pool.filter((c) => c.race === race.id);
    return { race, featured: featuredOf(all), total: all.length, officeholder: OFFICEHOLDERS[race.id]?.runningAgain };
  };

  const president: Race = { id: "president:national", office: "president", name: null };
  const senate = races(lga.senate);
  const reps = races(lga.reps);
  const assembly = races(lga.assembly);
  const governor = data.races.find((r) => r.office === "governor");
  const isFct = stateSlug === "fct";
  const stateName = isFct ? "the FCT" : state.name;

  const first: SummaryRace[] = [
    {
      title: "President",
      line: "President and Vice President",
      seat: "Nationwide",
      hash: "president",
      constituencies: [contest(president, getNational())],
    },
    {
      title: "Senator",
      line: `Senator, ${orNames(senate)}`,
      seat: orNames(senate),
      hash: "senate",
      constituencies: senate.map((r) => contest(r, data.candidates)),
    },
    {
      title: "House of Representatives",
      line: `Member, House of Representatives, ${orNames(reps)}`,
      seat: orNames(reps),
      hash: "reps",
      constituencies: reps.map((r) => contest(r, data.candidates)),
    },
  ];

  const second: SummaryRace[] = [];
  if (!isFct && governor) {
    second.push({
      title: "Governor",
      line: "Governor and Deputy Governor",
      seat: `${state.name} State`,
      hash: "governor",
      constituencies: [contest(governor, data.candidates)],
    });
  }
  if (!isFct && assembly.length) {
    second.push({
      title: "State House of Assembly",
      line: assembly.length === 1 ? `Member, State House of Assembly, ${assembly[0].name}` : "Member, State House of Assembly",
      seat: orNames(assembly),
      hash: "assembly",
      constituencies: assembly.map((r) => contest(r, data.candidates)),
    });
  }

  return {
    state: { slug: state.slug, name: state.name },
    lga: { slug: lga.slug, name: lga.name },
    days: [
      { label: "First vote", date: "Saturday 16 January 2027", races: first },
      {
        label: "Second vote",
        date: "Saturday 6 February 2027",
        races: second,
        note: isFct
          ? "The FCT has no governor or State House of Assembly, so there is no state election here."
          : !governor
            ? `${stateName} elects its governor on a different cycle, so only the State House of Assembly is on this ballot.`
            : undefined,
      },
    ],
  };
}
