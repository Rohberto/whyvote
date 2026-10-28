import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BallotPicker, type PickerState } from "@/components/ballot/ballot-picker";
import { BeforeYouChoose } from "@/components/ballot/before-you-choose";
import { RaceBlock } from "@/components/ballot/race-block";
import { PledgeBand } from "@/components/layout/pledge-band";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { compareRaceNames, GEO, getLga, getNational, getState, getStateData, type Race } from "@/lib/candidates";
import ballotBox from "@/assets/ballot-box.webp";

const PICKER_STATES: PickerState[] = GEO.map((s) => ({
  slug: s.slug,
  name: s.name,
  lgas: s.lgas.map((l) => ({ slug: l.slug, name: l.name })),
}));

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-md py-3 px-3.5">
      <p className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">{label}</p>
      <div className="mt-1 text-[15px] font-semibold">{children}</div>
    </div>
  );
}

export async function BallotView({ stateSlug, lgaSlug, example = false }: { stateSlug: string; lgaSlug: string; example?: boolean }) {
  const state = getState(stateSlug);
  const lga = getLga(stateSlug, lgaSlug);
  const data = await getStateData(stateSlug);
  if (!state || !lga || !data) notFound();

  const raceById = new Map(data.races.map((r) => [r.id, r]));
  const races = (ids: string[]) =>
    ids
      .map((id) => raceById.get(id))
      .filter((r): r is Race => Boolean(r))
      .sort((a, b) => compareRaceNames(a.name ?? "", b.name ?? ""));
  const senate = races(lga.senate);
  const reps = races(lga.reps);
  const assembly = races(lga.assembly);
  const governor = data.races.find((r) => r.office === "governor");
  const national = getNational();
  const presidentRace: Race = { id: "president:national", office: "president", name: null };
  const others = (hash: string) => `/ballot/${stateSlug}/${lgaSlug}/candidates#${hash}`;
  const isFct = stateSlug === "fct";
  const pick = (list: Race[], one: (r: Race) => string) =>
    list.length === 1 ? one(list[0]) : `${list.length} options · check your PVC`;

  return (
    <>
      <section className="pt-8 pb-6 lg:pt-14 lg:pb-8">
        <Container>
          <div className="flex flex-wrap gap-8 items-center">
            <div className="flex-[1_1_480px] flex flex-col gap-4.5">
              <Eyebrow>2027 / Your ballot guide</Eyebrow>
              <h1 className="font-display text-[56px] leading-[0.9] uppercase lg:text-[96px]">
                What’s on
                <br />
                <span className="text-brand">my ballot?</span>
              </h1>
              <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:text-[19px]">
                Choose where you vote to see the five offices and the candidates. Explore every race before election day.
              </p>
              <div className="bg-mist rounded-md py-3.5 px-4">
                <p className="text-[14px] leading-[1.6] text-ink-soft">
                  <b className="text-ink">No party endorsements. Just the information.</b> Each race shows the six parties
                  holding the most elected offices, in alphabetical order. Every other candidate is one tap away.
                </p>
              </div>
            </div>
            <div className="flex-[1_1_320px] flex justify-center">
              <Image
                src={ballotBox}
                alt="Ballot box with candidate list, calendar and magnifying glass"
                priority
                className="w-[300px] max-w-full h-auto lg:w-[460px]"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-6" id="where">
        <Container>
          <div className="bg-mist rounded-lg py-5 px-4 flex flex-col gap-4.5 lg:p-8">
            <Eyebrow>Where you vote</Eyebrow>
            <h2 className="font-display text-[34px] leading-[0.95] text-ink lg:text-[44px]">Start with where you vote</h2>
            <p className="text-[15px] leading-[1.6] text-ink-soft">
              Your constituency depends on where you registered, not where you live now.
            </p>
            <BallotPicker key={`${stateSlug}/${lgaSlug}`} states={PICKER_STATES} state={stateSlug} lga={lgaSlug} />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(170px,100%),1fr))] gap-2.5">
              <Tile label="State">{state.name}</Tile>
              <Tile label="LGA">{lga.name}</Tile>
              <Tile label="Senatorial district">{pick(senate, (r) => r.name ?? "")}</Tile>
              <Tile label="Federal constituency">{pick(reps, (r) => r.name ?? "")}</Tile>
              <Tile label="State assembly seat">
                {isFct ? (
                  "No state assembly in the FCT"
                ) : assembly.length === 1 ? (
                  assembly[0].name
                ) : (
                  <>
                    Confirm with your PVC
                    <br />
                    <Link className="text-[13px]" href="/get-ready/polling-unit">
                      Find my polling unit
                    </Link>
                  </>
                )}
              </Tile>
            </div>
            <p className="text-[12px] leading-[1.6] text-ink-faint">
              {example ? "Example selection. " : ""}Candidates from INEC’s final list for the 2027 general election. Check
              your exact constituency and polling unit using INEC’s official records.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-6">
        <Container>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Eyebrow>Saturday 16 January 2027</Eyebrow>
              <h2 className="font-display text-[40px] leading-[0.95] text-ink lg:text-[56px]">Federal elections</h2>
              <p className="text-[15px] leading-[1.6] text-ink-soft">
                Three contests. One national race and two tied to your constituency.
              </p>
            </div>
            <RaceBlock
              title="President"
              subtitle={() => "National contest · every registered voter sees this race"}
              races={[presidentRace]}
              candidates={national.filter((c) => c.office === "president")}
              otherHref={() => others("president")}
            />
            <RaceBlock
              title="Senator"
              subtitle={(r) => `${r.name} senatorial district`}
              races={senate}
              candidates={data.candidates}
              otherHref={() => others("senate")}
            />
            <RaceBlock
              title="House of Representatives"
              subtitle={(r) => `${r.name} federal constituency`}
              races={reps}
              candidates={data.candidates}
              otherHref={() => others("reps")}
              splitNote={`${lga.name} is split between ${reps.length} federal constituencies. Pick the one on your PVC.`}
            />
          </div>
        </Container>
      </section>

      <section className="py-6">
        <Container>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Eyebrow>Saturday 6 February 2027</Eyebrow>
              <h2 className="font-display text-[40px] leading-[0.95] text-ink lg:text-[56px]">State elections</h2>
              <p className="text-[15px] leading-[1.6] text-ink-soft">
                {isFct
                  ? "The FCT has no governor or State House of Assembly, so there is no state election here."
                  : "Who runs your state and who represents you in the State House of Assembly."}
              </p>
            </div>
            {!isFct &&
              (governor ? (
                <RaceBlock
                  title="Governor"
                  subtitle={() => `Statewide contest · ${state.name}`}
                  races={[governor]}
                  candidates={data.candidates.filter((c) => c.office === "governor")}
                  otherHref={() => others("governor")}
                />
              ) : (
                <div className="bg-white border border-line rounded-lg py-4.5 px-3.5 flex flex-col gap-2 lg:p-7">
                  <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[36px]">Governor</h2>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">
                    {state.name} elects its governor on a different cycle, so there is no governorship race here in 2027.
                  </p>
                </div>
              ))}
            {!isFct && assembly.length > 0 && (
              <RaceBlock
                title="State House of Assembly"
                subtitle={(r) => `${r.name} state constituency`}
                races={assembly}
                candidates={data.candidates}
                otherHref={() => others("assembly")}
                splitNote={`${lga.name} has ${assembly.length} state constituencies. Your seat is set by where you registered: pick the one on your PVC.`}
              />
            )}
          </div>
        </Container>
      </section>

      <BeforeYouChoose />
      <PledgeBand />
    </>
  );
}
