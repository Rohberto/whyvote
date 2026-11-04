import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CandidateRow } from "@/components/candidates/candidate-cards";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { compareRaceNames, getLga, getNational, getState, getStateData, type Candidate, type Race } from "@/lib/candidates";
import { OFFICEHOLDERS } from "@/lib/ziki-notes";
import { pageMetadata } from "@/lib/site";

/** Prerender the design's example; every other LGA renders on first visit and is then cached. */
export function generateStaticParams() {
  return [{ state: "lagos", lga: "ajeromi-ifelodun" }];
}

export async function generateMetadata({ params }: PageProps<"/ballot/[state]/[lga]/candidates">): Promise<Metadata> {
  const { state, lga } = await params;
  const l = getLga(state, lga);
  const s = getState(state);
  if (!s || !l) return { title: "All candidates", robots: { index: false } };
  return pageMetadata({
    title: `All candidates: ${l.name}, ${s.name}`,
    description: `Every candidate on the 2027 ballot in ${l.name}, ${s.name}, listed alphabetically by party, from INEC’s final list.`,
    path: `/ballot/${state}/${lga}/candidates`,
  });
}

const byParty = (a: Candidate, b: Candidate) => a.party.localeCompare(b.party) || a.name.localeCompare(b.name);

function List({ candidates }: { candidates: Candidate[] }) {
  if (candidates.length === 0) {
    return (
      <div className="bg-mist rounded-md p-6">
        <p className="text-[15px] leading-[1.6] text-ink-soft">
          INEC’s final list has no candidates for this race.
        </p>
      </div>
    );
  }
  return (
    <div className="border border-line rounded-lg overflow-hidden">
      {candidates.map((c, i) => (
        <CandidateRow key={c.id} candidate={c} index={i} officeholder={OFFICEHOLDERS[c.race]?.runningAgain === c.id} />
      ))}
    </div>
  );
}

function RacePanel({ races, candidates, label }: { races: Race[]; candidates: Candidate[]; label: string }) {
  if (races.length === 0) {
    return <p className="text-[15px] leading-[1.6] text-ink-soft">There is no {label} race here in 2027.</p>;
  }
  const all = (r: Race) => candidates.filter((c) => c.race === r.id).sort(byParty);
  if (races.length === 1) {
    const list = all(races[0]);
    return (
      <>
        {list.length > 0 && (
          <p className="text-[15px] leading-[1.6] text-ink-soft">
            All {list.length} {label} candidates{races[0].name ? ` for ${races[0].name}` : ""} on INEC’s final list, in alphabetical order by party.
          </p>
        )}
        <List candidates={list} />
      </>
    );
  }
  return (
    <>
      <p className="text-[15px] leading-[1.6] text-ink-soft">
        This LGA is split between {races.length} constituencies. Your seat is the one printed on your PVC.
      </p>
      {races.map((r) => (
        <div key={r.id} className="flex flex-col gap-2.5">
          <h2 className="font-display text-[26px] leading-[0.95] text-ink">{r.name}</h2>
          <List candidates={all(r)} />
        </div>
      ))}
    </>
  );
}

export default function OtherCandidatesPage({ params }: PageProps<"/ballot/[state]/[lga]/candidates">) {
  return (
    <Suspense fallback={<PageSkeleton label="Loading candidates" />}>
      <OtherCandidates params={params} />
    </Suspense>
  );
}

async function OtherCandidates({ params }: Pick<PageProps<"/ballot/[state]/[lga]/candidates">, "params">) {
  const { state: stateSlug, lga: lgaSlug } = await params;
  const state = getState(stateSlug);
  const lga = getLga(stateSlug, lgaSlug);
  const data = await getStateData(stateSlug);
  if (!state || !lga || !data) notFound();

  const raceById = new Map(data.races.map((r) => [r.id, r]));
  const pickRaces = (ids: string[]) =>
    ids
      .map((id) => raceById.get(id))
      .filter((r): r is Race => Boolean(r))
      .sort((a, b) => compareRaceNames(a.name ?? "", b.name ?? ""));
  const presidential = getNational().filter((c) => c.office === "president");
  const governor = data.races.filter((r) => r.office === "governor");
  const count = (cs: Candidate[]) => cs.length;

  const panels = [
    {
      hash: "president",
      tab: `President (${count(presidential)})`,
      body: <RacePanel label="presidential" races={[{ id: "president:national", office: "president", name: null }]} candidates={presidential} />,
    },
    { hash: "senate", tab: "Senator", body: <RacePanel label="Senate" races={pickRaces(lga.senate)} candidates={data.candidates} /> },
    { hash: "reps", tab: "House of Reps", body: <RacePanel label="House of Representatives" races={pickRaces(lga.reps)} candidates={data.candidates} /> },
    {
      hash: "governor",
      tab: governor.length ? `Governor (${count(data.candidates.filter((c) => c.office === "governor"))})` : "Governor",
      body: <RacePanel label="governorship" races={governor} candidates={data.candidates} />,
    },
    { hash: "assembly", tab: "State Assembly", body: <RacePanel label="State House of Assembly" races={pickRaces(lga.assembly)} candidates={data.candidates} /> },
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "My ballot", href: `/ballot/${stateSlug}/${lgaSlug}` },
          { label: state.name, href: `/ballot/${stateSlug}/${lgaSlug}` },
          { label: "All candidates" },
        ]}
      />
      <section className="pt-8 pb-5 lg:pt-12 lg:pb-7">
        <Container>
          <div className="flex flex-col gap-4">
            <Eyebrow>
              My ballot · {state.name} · {lga.name}
            </Eyebrow>
            <h1 className="font-display text-[44px] leading-[0.95] text-ink uppercase lg:text-[72px]">Every candidate on your ballot</h1>
            <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:text-[19px]">
              Every candidate for each race, listed alphabetically by party. Every name opens their Ziki profile.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-10">
        <Container>
          <Tabs count={panels.length} hashes={panels.map((p) => p.hash)}>
            <TabList
              label="Races"
              className="flex gap-2 overflow-x-auto pb-1.5 mb-5 lg:overflow-x-visible lg:pb-0 lg:flex-wrap"
              tabs={panels.map((p) => p.tab)}
            />
            {panels.map((p, i) => (
              <TabPanel key={p.hash} index={i} className="flex flex-col gap-3.5">
                {p.body}
              </TabPanel>
            ))}
          </Tabs>
        </Container>
      </section>
    </>
  );
}
