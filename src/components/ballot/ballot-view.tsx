import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BallotPicker } from "@/components/ballot/ballot-picker";
import { BeforeYouChoose } from "@/components/ballot/before-you-choose";
import { RaceBlock } from "@/components/ballot/race-block";
import { PledgeBand } from "@/components/layout/pledge-band";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { compareRaceNames, getLga, getNational, getState, getStateData, PICKER_STATES, type Race } from "@/lib/candidates";
import ballotBox from "@/assets/ballot-box.webp";


function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-md py-3 px-3.5">
      <p className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">{label}</p>
      <div className="mt-1 text-[15px] font-semibold">{children}</div>
    </div>
  );
}

const INEC_CANDIDATES = "https://inecnigeria.org/";

function ChooseFirst({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-dashed border-line rounded-lg py-4.5 px-4 flex flex-col gap-2.5 items-start lg:p-7">
      <p className="text-[15px] leading-[1.6] text-ink-soft">{children}</p>
      <Link className="text-[14px] font-semibold" href="#where">
        Choose your state and LGA
      </Link>
    </div>
  );
}

/** My ballot. Without a state and LGA it shows the empty picker and the one national race. */
export async function BallotView({ stateSlug, lgaSlug }: { stateSlug?: string; lgaSlug?: string }) {
  const chosen = Boolean(stateSlug && lgaSlug);
  const state = chosen ? getState(stateSlug!) : undefined;
  const lga = chosen ? getLga(stateSlug!, lgaSlug!) : undefined;
  const data = chosen ? await getStateData(stateSlug!) : null;
  if (chosen && (!state || !lga || !data)) notFound();

  const raceById = new Map((data?.races ?? []).map((r) => [r.id, r]));
  const races = (ids: string[] = []) =>
    ids
      .map((id) => raceById.get(id))
      .filter((r): r is Race => Boolean(r))
      .sort((a, b) => compareRaceNames(a.name ?? "", b.name ?? ""));
  const senate = races(lga?.senate);
  const reps = races(lga?.reps);
  const assembly = races(lga?.assembly);
  const governor = data?.races.find((r) => r.office === "governor");
  const national = getNational();
  const presidentRace: Race = { id: "president:national", office: "president", name: null };
  const all = (hash: string) => () => (chosen ? `/ballot/${stateSlug}/${lgaSlug}/candidates#${hash}` : undefined);
  const isFct = stateSlug === "fct";
  const pick = (list: Race[], one: (r: Race) => string) =>
    list.length === 1 ? one(list[0]) : `${list.length} options · check your PVC`;
  const after = <span className="text-ink-faint font-medium">Shows after you choose</span>;

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

      <section className="pb-6 scroll-mt-24" id="where">
        <Container>
          <div className="bg-mist rounded-lg py-5 px-4 flex flex-col gap-4.5 lg:p-8">
            <Eyebrow>Where you vote</Eyebrow>
            <h2 className="font-display text-[34px] leading-[0.95] text-ink lg:text-[44px]">Start with where you vote</h2>
            <p className="text-[15px] leading-[1.6] text-ink-soft">
              Your constituency depends on where you registered, not where you live now.
            </p>
            <BallotPicker key={`${stateSlug}/${lgaSlug}`} states={PICKER_STATES} state={stateSlug ?? ""} lga={lgaSlug ?? ""} />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(170px,100%),1fr))] gap-2.5">
              <Tile label="State">{state ? state.name : after}</Tile>
              <Tile label="LGA">{lga ? lga.name : after}</Tile>
              <Tile label="Senatorial district">{chosen ? pick(senate, (r) => r.name ?? "") : after}</Tile>
              <Tile label="Federal constituency">{chosen ? pick(reps, (r) => r.name ?? "") : after}</Tile>
              <Tile label="State assembly seat">
                {!chosen ? after : isFct ? "No state assembly in the FCT" : assembly.length === 1 ? assembly[0].name : "Confirm with your PVC"}
              </Tile>
            </div>
            {!chosen && (
              <p className="text-[14px] leading-[1.6] text-ink-soft">Select your state and LGA to see your constituencies and everyone on your ballot.</p>
            )}
            <p className="text-[12px] leading-[1.6] text-ink-faint">
              <b className="text-ink-soft">Source: INEC.</b> Candidates, parties and constituencies come from INEC’s official published lists. If INEC
              updates a list, we update ours.{" "}
              <a className="font-semibold" href={INEC_CANDIDATES} target="_blank" rel="noopener">
                See INEC’s final list
              </a>
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
              otherHref={all("president")}
            />
            {chosen ? (
              <>
                <RaceBlock
                  title="Senator"
                  subtitle={(r) => `${r.name} senatorial district`}
                  races={senate}
                  candidates={data!.candidates}
                  otherHref={all("senate")}
                />
                <RaceBlock
                  title="House of Representatives"
                  subtitle={(r) => `${r.name} federal constituency`}
                  races={reps}
                  candidates={data!.candidates}
                  otherHref={all("reps")}
                  splitNote={`${lga!.name} is split between ${reps.length} federal constituencies. Pick the one on your PVC.`}
                />
              </>
            ) : (
              <ChooseFirst>Your Senator and House of Representatives races depend on where you registered.</ChooseFirst>
            )}
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
            {!chosen && <ChooseFirst>Governorship elections hold in 28 states in 2027, and every state except the FCT elects its State House of Assembly.</ChooseFirst>}
            {chosen &&
              !isFct &&
              (governor ? (
                <RaceBlock
                  title="Governor"
                  subtitle={() => `Statewide contest · ${state!.name}`}
                  races={[governor]}
                  candidates={data!.candidates.filter((c) => c.office === "governor")}
                  otherHref={all("governor")}
                />
              ) : (
                <div className="bg-white border border-line rounded-lg py-4.5 px-3.5 flex flex-col gap-2 lg:p-7">
                  <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[36px]">Governor</h2>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">
                    {state!.name} elects its governor on a different cycle, so there is no governorship race here in 2027.
                  </p>
                </div>
              ))}
            {chosen && !isFct && assembly.length > 0 && (
              <RaceBlock
                title="State House of Assembly"
                subtitle={(r) => `${r.name} state constituency`}
                races={assembly}
                candidates={data!.candidates}
                otherHref={all("assembly")}
                splitNote={`${lga!.name} has ${assembly.length} state constituencies. Your seat is set by where you registered: pick the one on your PVC.`}
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
