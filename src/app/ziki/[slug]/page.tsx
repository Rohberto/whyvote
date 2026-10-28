import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BeforeYouChoose } from "@/components/ballot/before-you-choose";
import { ZikiCard } from "@/components/candidates/candidate-cards";
import { CandidatePhoto } from "@/components/candidates/candidate-photo";
import { PartyBadge } from "@/components/candidates/party-badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PledgeBand } from "@/components/layout/pledge-band";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { getCandidate, listCandidateIds, type Candidate } from "@/lib/candidates";
import { electionDate, raceLabel, RUNNING_FOR, seatName } from "@/lib/offices";
import { party } from "@/lib/parties";
import { ZIKI_HEADLINES } from "@/lib/ziki-notes";

/**
 * Prerender every presidential and governorship ticket. Legislative candidates
 * (about 15,000) render on first visit and are then served from the cache.
 */
export async function generateStaticParams() {
  // These two have hand-written articles at their own static routes.
  const editorial = new Set(["bola-tinubu", "gbadebo-rhodes-vivour"]);
  return (await listCandidateIds(["president", "vice-president", "governor", "deputy-governor"]))
    .filter((id) => !editorial.has(id))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/ziki/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = await getCandidate(slug);
  if (!found) return { title: "Ziki" };
  const { candidate, race, state } = found;
  return {
    title: candidate.name,
    description: `${candidate.name} (${party(candidate.party).name}), candidate for ${seatName(candidate, race, state)} on ${electionDate(candidate.office)}. From INEC’s final list of candidates.`,
  };
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5 border-b border-line">
      <dt className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">{label}</dt>
      <dd className="text-[14px] leading-[1.5]">{children}</dd>
    </div>
  );
}

function ageText(c: Candidate) {
  if (c.age) return `${c.age}`;
  if (c.agePrinted) return `Not given (INEC’s list prints ${c.agePrinted})`;
  return "Not given";
}

export default function ZikiProfilePage({ params }: PageProps<"/ziki/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton label="Loading profile" />}>
      <ZikiProfile params={params} />
    </Suspense>
  );
}

async function ZikiProfile({ params }: Pick<PageProps<"/ziki/[slug]">, "params">) {
  const { slug } = await params;
  const found = await getCandidate(slug);
  if (!found) notFound();
  const { candidate: c, race, state, rivals, partner } = found;
  const p = party(c.party);
  const seat = seatName(c, race, state);
  const isDeputy = c.office === "vice-president" || c.office === "deputy-governor";
  const sameRace = rivals.filter((r) => r.office === c.office);
  // The race crumb opens a ballot that includes this race: national races go back to the Ziki index.
  const raceLga = race.lgas?.[0] ? state?.lgas.find((l) => l.name === race.lgas![0]) : state?.lgas[0];
  const raceHref = state && raceLga ? `/ballot/${state.slug}/${raceLga.slug}` : "/ziki";

  return (
    <>
      <Breadcrumb items={[{ label: "Ziki", href: "/ziki" }, { label: raceLabel(c, race, state), href: raceHref }, { label: c.name }]} />
      <section className="pt-8 pb-5 lg:pt-12 lg:pb-7">
        <Container>
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-[48px] leading-[0.95] text-ink uppercase lg:text-[84px]">{c.name}</h1>
            <div className="flex flex-wrap gap-y-2.5 gap-x-3.5 items-center">
              <PartyBadge code={c.party} size="md" decorative />
              <span className="text-[20px] font-semibold lg:text-[24px]">
                {ZIKI_HEADLINES[c.id] ?? `Candidate for ${seat}`}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip>For {RUNNING_FOR[c.office]}</Chip>
              <Chip tone="mist">{p.name}</Chip>
              {c.courtOrder && <Chip tone="warn">Listed by court order</Chip>}
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-2 pb-10">
        <Container>
          <div className="flex flex-wrap gap-10">
            <div className="flex-[999_1_560px] min-w-0 flex flex-col gap-4.5">
              <p className="text-[18px] leading-[1.7] text-ink">
                {c.name} is the {p.name} ({c.party}){" "}
                {isDeputy && partner ? (
                  <>
                    running mate to{" "}
                    <Link className="text-green" href={`/ziki/${partner.id}`}>
                      {partner.name}
                    </Link>
                    , contesting for {seat}
                  </>
                ) : (
                  <>candidate for {seat}</>
                )}{" "}
                on {electionDate(c.office)}, according to INEC’s final list of candidates for the 2027 general election.
                {!isDeputy && partner && (
                  <>
                    {" "}
                    Their running mate is{" "}
                    <Link className="text-green" href={`/ziki/${partner.id}`}>
                      {partner.name}
                    </Link>
                    .
                  </>
                )}
                {c.courtOrder && " INEC lists this candidacy as made by court order."}
              </p>

              <h2 className="mt-3.5 font-display text-[32px]">INEC record</h2>
              <p className="text-[14px] leading-[1.6] text-ink-faint">
                Exactly as published in INEC’s final list. Qualifications are listed as the candidate declared them.
              </p>
              <dl className="bg-white border border-line rounded-md px-4">
                <Fact label="Name as printed">{c.inecName}</Fact>
                <Fact label="Party">{`${p.name} (${c.party})`}</Fact>
                <Fact label="Contesting">{seat}</Fact>
                <Fact label="Age">{ageText(c)}</Fact>
                <Fact label="Gender">{c.gender === "M" ? "Male" : c.gender === "F" ? "Female" : "Not given"}</Fact>
                <Fact label="Qualifications">{c.qualifications ?? "Not given in INEC’s list"}</Fact>
                <Fact label="Disability declared">{c.pwd ?? "None"}</Fact>
                {c.stateOfOrigin && <Fact label="State of origin">{c.stateOfOrigin}</Fact>}
              </dl>

              <div className="bg-mist rounded-md py-4 px-5 flex flex-col gap-1.5">
                <b className="text-[15px]">This profile is still being written.</b>
                <p className="text-[14px] leading-[1.6] text-ink-soft">
                  For now it only shows what INEC published. We add past offices, public record and sources as we verify
                  them. Nothing here is an endorsement.
                </p>
              </div>
            </div>

            <aside className="flex-[1_1_300px] max-w-full bg-mist rounded-lg p-4 flex flex-col gap-3 self-start lg:max-w-[360px] box-content">
              <CandidatePhoto candidate={c} tone={1} className="h-[260px] rounded-md" sizes="360px" priority />
              <p className="font-display text-[24px]">{c.name}</p>
              <dl>
                <Fact label="Party">{p.name}</Fact>
                <Fact label="Running for">
                  {RUNNING_FOR[c.office]}
                  {race.name ? `, ${race.name}` : ""}
                  {state ? ` (${state.name})` : ""}
                </Fact>
                {partner && (
                  <Fact label={isDeputy ? "Running with" : "Running mate"}>
                    <Link className="text-green" href={`/ziki/${partner.id}`}>
                      {partner.name}
                    </Link>
                  </Fact>
                )}
                <Fact label="Election day">{electionDate(c.office)}</Fact>
              </dl>
              <a className="text-[13px] font-semibold" href={`mailto:ijoba@poliz.ng?subject=${encodeURIComponent(`Correction: ${c.name}`)}`}>
                Report a correction
              </a>
            </aside>
          </div>
        </Container>
      </section>

      {sameRace.length > 0 && (
        <section className="py-8">
          <Container>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Eyebrow>
                  {RUNNING_FOR[c.office].replace(/ \(running mate\)$/, "")} · {electionDate(c.office)}
                </Eyebrow>
                <h2 className="font-display text-[32px] leading-[0.95] text-ink uppercase lg:text-[44px]">
                  {isDeputy ? "The other running mates" : "Compare the rest of this race"}
                </h2>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] gap-3 lg:grid-cols-[repeat(auto-fill,minmax(min(200px,100%),1fr))]">
                {sameRace.map((r) => (
                  <ZikiCard key={r.id} candidate={r} headline={ZIKI_HEADLINES[r.id]} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      <BeforeYouChoose />
      <PledgeBand />
    </>
  );
}
