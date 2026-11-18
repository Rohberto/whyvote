import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { BeforeYouChoose } from "@/components/ballot/before-you-choose";
import { ZikiCard } from "@/components/candidates/candidate-cards";
import { candidatePhotoSrc } from "@/components/candidates/candidate-photo";
import { PartyBadge } from "@/components/candidates/party-badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PledgeBand } from "@/components/layout/pledge-band";
import { Chip, type ChipTone } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { ProfileSection } from "@/components/ziki/profile-section";
import { getCandidate, listCandidateIds, type Candidate } from "@/lib/candidates";
import { electionDate, raceLabel, RUNNING_FOR, seatName } from "@/lib/offices";
import { party } from "@/lib/parties";
import { PROFILE_CONTENT, type ControversyStatus, type ProfileContent, type Rich, type Source } from "@/lib/profile-content";
import { jsonLd, pageMetadata, SITE_URL } from "@/lib/site";
import { OFFICEHOLDERS, ZIKI_HEADLINES } from "@/lib/ziki-notes";

/**
 * Prerender every presidential and governorship ticket. Legislative candidates
 * (about 15,000) render on first visit and are then served from the cache.
 */
export async function generateStaticParams() {
  return (await listCandidateIds(["president", "vice-president", "governor", "deputy-governor"])).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/ziki/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = await getCandidate(slug);
  if (!found) return { title: "Ziki", robots: { index: false } };
  const { candidate, race, state } = found;
  return pageMetadata({
    title: candidate.name,
    description: `${candidate.name} (${party(candidate.party).name}), candidate for ${seatName(candidate, race, state)} on ${electionDate(candidate.office)}. Background, past offices, previous elections, manifesto and sources.`,
    path: `/ziki/${candidate.id}`,
    ownImage: true,
    type: "profile",
  });
}

const INEC_SOURCE: Source = { title: "INEC: Final list of candidates for the 2027 general election", url: "https://inecnigeria.org/" };
const CORRECTIONS = "ijoba@poliz.ng";

const SECTIONS = [
  { id: "s-bg", title: "Background" },
  { id: "s-po", title: "Past offices" },
  { id: "s-pe", title: "Previous elections" },
  { id: "s-mf", title: "Manifesto" },
  { id: "s-ac", title: "Accomplishments" },
  { id: "s-co", title: "Controversies" },
  { id: "s-sa", title: "See also" },
  { id: "s-src", title: "Sources" },
] as const;

const STATUS_STYLE: Record<ControversyStatus, { chip: ChipTone; edge: string }> = {
  Allegation: { chip: "warn", edge: "border-l-warn" },
  "Under investigation": { chip: "warn", edge: "border-l-warn" },
  Charged: { chip: "warn", edge: "border-l-warn" },
  "Case ongoing": { chip: "warn", edge: "border-l-warn" },
  Cleared: { chip: "green", edge: "border-l-green" },
  "Overturned on appeal": { chip: "green", edge: "border-l-green" },
  Convicted: { chip: "danger", edge: "border-l-danger" },
};

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
  const content: ProfileContent = PROFILE_CONTENT[c.id] ?? {};
  // Unreviewed profiles say "not added yet", so an empty section never reads as a clean record.
  const reviewed = c.id in PROFILE_CONTENT;
  const none = reviewed ? "None on record" : "Not added yet";
  const p = party(c.party);
  const seat = seatName(c, race, state);
  const isDeputy = c.office === "vice-president" || c.office === "deputy-governor";
  const sameRace = rivals.filter((r) => r.office === c.office);
  const holder = OFFICEHOLDERS[c.race]?.runningAgain === c.id ? OFFICEHOLDERS[c.race] : null;
  const sources: Source[] = [INEC_SOURCE, ...(content.sources ?? [])];
  const mailto = `mailto:${CORRECTIONS}?subject=${encodeURIComponent(`Correction: ${c.name}`)}`;
  // The race crumb opens a ballot that includes this race: national races go back to the Ziki index.
  const raceLga = race.lgas?.[0] ? state?.lgas.find((l) => l.name === race.lgas![0]) : state?.lgas[0];
  const raceHref = state && raceLga ? `/ballot/${state.slug}/${raceLga.slug}` : "/ziki";

  const pastOffices = content.pastOffices ?? [];
  const elections = content.elections ?? [];
  const accomplishments = content.accomplishments ?? [];
  const controversies = content.controversies ?? [];
  const seeAlso = content.seeAlso ?? [
    { label: p.name, href: `/ziki/parties/${c.party.toLowerCase()}` },
    ...(partner ? [{ label: partner.name, href: `/ziki/${partner.id}` }] : []),
  ];

  const background: Rich[] = content.background ?? [
    [
      `${c.name} is the `,
      { text: p.name, href: `/ziki/parties/${c.party.toLowerCase()}` },
      ` (${c.party}) ${isDeputy && partner ? "running mate to " : "candidate for "}`,
      ...(isDeputy && partner ? [{ text: partner.name, href: `/ziki/${partner.id}` }, `, contesting for ${seat}`] : [seat]),
      ` on ${electionDate(c.office)}, according to INEC’s final list of candidates for the 2027 general election.`,
      ...(!isDeputy && partner ? [" Their running mate is ", { text: partner.name, href: `/ziki/${partner.id}` }, "."] : []),
      ...(c.courtOrder ? [" INEC lists this candidacy as made by court order."] : []),
      { ref: 1 },
    ],
  ];

  const facts = content.keyFacts ?? {};
  const keyFacts: [string, ReactNode][] = [
    ["Full name", facts.fullName ?? titleCase(c.inecName)],
    ["Party", <Link key="p" href={`/ziki/parties/${c.party.toLowerCase()}`}>{`${p.name} (${c.party})`}</Link>],
    ["Office sought", `${seat}, 2027`],
    ["Current role", facts.currentRole ?? (holder ? `${holder.since}` : "Not on record")],
    ["Date of birth", facts.dateOfBirth ?? (c.age ? `Not on record (age ${c.age} on INEC’s list)` : "Not on record")],
    ["State of origin", facts.stateOfOrigin ?? c.stateOfOrigin ?? "Not on record"],
    ["Education", facts.education ?? c.qualifications ?? "Not on record"],
    ["Profession", facts.profession ?? "Not on record"],
  ];

  const officeShort = RUNNING_FOR[c.office].replace(/ \(running mate\)$/, "");
  const won = elections.filter((e) => e.result !== "Not elected").length;
  const years = accomplishments.map((a) => a.year).sort();
  const previews: Record<(typeof SECTIONS)[number]["id"], string> = {
    "s-bg": "",
    "s-po": pastOffices.length
      ? `${count(pastOffices.length, "office")}${pastOffices.some((o) => o.current) ? ` · current: ${pastOffices.find((o) => o.current)!.title.replace(/ of Nigeria$/, "")}` : ""}`
      : none,
    "s-pe": elections.length
      ? `${count(elections.length, "election")} · ${won === elections.length ? "all won" : won === 0 ? "none won" : `${won} won`}`
      : none,
    "s-mf": content.manifesto ? "2027 manifesto · tap to read" : "Not published yet",
    "s-ac": accomplishments.length
      ? `${count(accomplishments.length, "action")} in office · ${years[0]}${years.at(-1) !== years[0] ? ` to ${years.at(-1)}` : ""}`
      : none,
    "s-co": controversies.length ? count(controversies.length, "entry", "entries") : none,
    "s-sa": "Related Ziki pages",
    "s-src": count(sources.length, "source"),
  };

  const structured = jsonLd({
    "@type": "Person",
    name: c.name,
    alternateName: c.inecName,
    url: `${SITE_URL}/ziki/${c.id}`,
    ...(c.photo ? { image: `${SITE_URL}/images/candidates/${c.id}.webp` } : {}),
    ...(c.gender ? { gender: c.gender === "M" ? "Male" : "Female" } : {}),
    affiliation: { "@type": "PoliticalParty", name: p.name, alternateName: c.party },
    description: `Candidate for ${seat}, ${electionDate(c.office)}.`,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={structured} />
      <Breadcrumb items={[{ label: "Ziki", href: "/ziki" }, { label: raceLabel(c, race, state), href: raceHref }, { label: c.name }]} />

      {/* Summary card */}
      <section className="pt-6 pb-2 lg:pt-10 lg:pb-4">
        <Container>
          <div className="bg-mist rounded-xl py-5 px-4 flex flex-col gap-4.5 lg:py-7 lg:px-8">
            <div className="flex flex-wrap gap-5 items-center">
              <Avatar candidate={c} />
              <div className="flex-[1_1_280px] flex flex-col gap-2.5 min-w-0">
                <h1 className="font-display text-[44px] leading-[0.95] text-ink uppercase lg:text-[64px]">{c.name}</h1>
                <div className="flex flex-wrap gap-2.5 items-center">
                  <PartyBadge code={c.party} size="md" decorative />
                  <span className="text-[18px] font-semibold lg:text-[22px]">
                    {content.roleLine ?? ZIKI_HEADLINES[c.id] ?? `Candidate for ${seat}`}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Chip>For {officeShort}</Chip>
                  <Chip tone="white">{p.name}</Chip>
                  {holder && <Chip tone="ink">Current officeholder</Chip>}
                  {c.courtOrder && <Chip tone="warn">Listed by court order</Chip>}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <SummaryBox label="Running for" value={seat} note={`Election day: Saturday ${electionDate(c.office)}`} />
              {partner && (
                <SummaryBox
                  label={isDeputy ? "Running with" : "Running mate"}
                  value={
                    <Link className="text-ink" href={`/ziki/${partner.id}`}>
                      {partner.name}
                    </Link>
                  }
                />
              )}
              {content.summaryFact && <SummaryBox label={content.summaryFact.label} value={content.summaryFact.value} />}
            </div>
            <div className="flex gap-2.5 items-start text-[13px] leading-[1.5] text-ink-soft">
              <InfoIcon />
              <span>
                {content.lastChecked
                  ? `Every fact links to its source. Last checked ${content.lastChecked}.`
                  : "Built from INEC’s final list of candidates. We add past offices, previous elections and sources as editors verify them."}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-4 pb-10">
        <Container>
          <div className="flex flex-wrap gap-5 lg:gap-10">
            <div className="flex-[999_1_560px] min-w-0 flex flex-col lg:gap-7.5">
              <section id="s-bg" className="scroll-mt-6 flex flex-col gap-3.5 pt-2 pb-4.5 lg:pb-0">
                <h2 className="font-display text-[24px] text-ink lg:text-[32px]">Background</h2>
                {background.map((para, i) => (
                  <p key={i} className="text-[16px] leading-[1.7] text-ink-soft">
                    <RichText value={para} />
                  </p>
                ))}
              </section>

              <ProfileSection id="s-po" title="Past offices" preview={previews["s-po"]}>
                {pastOffices.length ? (
                  <Timeline
                    items={pastOffices.map((o) => ({
                      title: o.title,
                      tag: o.current ? <Chip>Current</Chip> : null,
                      detail: o.detail,
                      refs: o.refs,
                      filled: o.current,
                    }))}
                  />
                ) : (
                  reviewed ? (
                    <Empty>
                      No elected or appointed public office on record in our sources. If that is wrong,{" "}
                      <a className="font-semibold" href={mailto}>
                        tell us
                      </a>{" "}
                      and we will correct it.
                    </Empty>
                  ) : (
                    <Empty>Not added yet. Past offices appear here once our editors have checked them against official sources.</Empty>
                  )
                )}
              </ProfileSection>

              <ProfileSection id="s-pe" title="Previous elections" preview={previews["s-pe"]}>
                {elections.length ? (
                  <Timeline
                    items={elections.map((e) => ({
                      title: e.title,
                      tag: <Chip tone={e.result === "Not elected" ? "mist" : "green"}>{e.result}</Chip>,
                      detail: e.detail,
                      refs: e.refs,
                    }))}
                  />
                ) : (
                  <Empty>
                    {reviewed
                      ? "No previous elections on record in our sources."
                      : "Not added yet. Previous elections appear here once our editors have checked them against INEC records."}
                  </Empty>
                )}
              </ProfileSection>

              <ProfileSection id="s-mf" title="Manifesto" preview={previews["s-mf"]}>
                {content.manifesto ? (
                  <>
                    <a
                      href={content.manifesto.url}
                      target="_blank"
                      rel="noopener"
                      aria-label="Open the full manifesto (opens the document)"
                      className="flex gap-4 items-center py-4.5 px-5 rounded-[10px] bg-mint-pale border-2 border-brand text-ink no-underline max-w-[560px] hover:text-ink"
                    >
                      <span className="flex-none w-14.5 h-18 rounded-md bg-white border border-[#cfe6d6] inline-flex items-center justify-center shadow-[3px_3px_0_#c6e0cd]">
                        <DocIcon />
                      </span>
                      <span className="flex-1 min-w-0 flex flex-col gap-1">
                        <span className="text-[11px] font-bold tracking-[1px] uppercase text-green">Manifesto</span>
                        <b className="font-display text-[22px] leading-none text-ink lg:text-[26px]">{content.manifesto.title}</b>
                        <span className="text-[13px] text-ink-soft">
                          {p.name} · {content.manifesto.published} · {content.manifesto.format}
                        </span>
                      </span>
                      <span className="flex-none w-11 h-11 rounded-full bg-ink text-white inline-flex items-center justify-center">
                        <ArrowIcon />
                      </span>
                    </a>
                    <p className="text-[13px] leading-[1.7] text-ink-soft">
                      Opens the full document published by the campaign. whyVote does not summarise or rate manifestos.
                    </p>
                  </>
                ) : (
                  <Empty>No published manifesto found yet.</Empty>
                )}
              </ProfileSection>

              <ProfileSection id="s-ac" title="Accomplishments" preview={previews["s-ac"]}>
                {accomplishments.length ? (
                  <>
                    <p className="text-[14px] leading-[1.7] text-ink-soft">
                      Actions taken in office, each linked to a source. whyVote records what was done, not whether it worked.
                    </p>
                    <div className="flex flex-col gap-2">
                      {accomplishments.map((a, i) => (
                        <div key={i} className="flex gap-4 items-start py-3 px-3.5 bg-white border border-line rounded-md">
                          <span className="font-display text-[22px] text-brand flex-none w-13">{a.year}</span>
                          <span className="text-[15px] leading-[1.5] font-medium text-ink">
                            {a.text}
                            <Refs refs={a.refs} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <Empty>
                    {!reviewed
                      ? "Not added yet. Accomplishments are listed for time in public office, once our editors have checked them against official sources."
                      : pastOffices.length
                        ? "Accomplishments are listed for time in public office. Nothing on record yet."
                        : "Accomplishments are listed for time in public office. With no office on record, there is nothing to list here yet."}
                  </Empty>
                )}
              </ProfileSection>

              <ProfileSection id="s-co" title="Controversies" preview={previews["s-co"]}>
                {controversies.length ? (
                  <>
                    <p className="text-[14px] leading-[1.7] text-ink-soft">
                      Reported issues of public interest, each from two approved sources, with their current status.
                    </p>
                    <div className="flex flex-col gap-2.5">
                      {controversies.map((x, i) => (
                        <div key={i} className={`bg-white border border-line border-l-4 ${STATUS_STYLE[x.status].edge} rounded-md py-3.5 px-4 flex flex-col gap-2`}>
                          <div className="flex flex-wrap gap-2 items-center justify-between">
                            <b className="text-[16px] text-ink">{x.title}</b>
                            <Chip tone={STATUS_STYLE[x.status].chip}>{x.status}</Chip>
                          </div>
                          <p className="text-[15px] leading-[1.6] text-ink-soft">
                            <RichText value={x.summary} />
                          </p>
                          {x.response && (
                            <p className="text-[14px] leading-[1.5] text-ink-soft">
                              <b className="text-ink">Response:</b> <RichText value={x.response} />
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <Empty>
                    {reviewed
                      ? "No controversies on record in our sources."
                      : "Not reviewed yet. We only add reported issues of public interest after an editor has checked them against two approved sources."}
                  </Empty>
                )}
              </ProfileSection>

              {seeAlso.length > 0 && (
                <ProfileSection id="s-sa" title="See also" preview={previews["s-sa"]}>
                  <div className="flex flex-wrap gap-2">
                    {seeAlso.map((s) => {
                      const cls = "inline-flex min-h-11 items-center px-3.5 rounded-full bg-mist text-ink no-underline text-[14px] font-semibold hover:text-ink";
                      return s.href.startsWith("http") ? (
                        <a key={s.label} className={cls} href={s.href} target="_blank" rel="noopener">
                          {s.label}
                        </a>
                      ) : (
                        <Link key={s.label} className={cls} href={s.href}>
                          {s.label}
                        </Link>
                      );
                    })}
                  </div>
                </ProfileSection>
              )}

              <ProfileSection id="s-src" title="Sources" preview={previews["s-src"]}>
                <ol className="pl-5 flex flex-col gap-2 list-decimal">
                  {sources.map((s, i) => (
                    <li key={i} id={`ref-${i + 1}`} className="scroll-mt-6 text-[14px] leading-[1.5] text-ink-soft">
                      {s.url ? (
                        <a href={s.url} target="_blank" rel="noopener">
                          {s.title}
                        </a>
                      ) : (
                        <span className="text-ink">{s.title}</span>
                      )}
                      {s.checked && <span className="text-ink-faint"> · checked {s.checked}</span>}
                    </li>
                  ))}
                </ol>
              </ProfileSection>

              {content.lastChecked && <p className="pt-4 text-[12px] text-ink-faint lg:pt-0">Last checked against sources on {content.lastChecked}.</p>}
            </div>

            <aside className="order-first flex-[1_1_300px] max-w-full flex flex-col gap-3.5 self-start lg:order-none lg:max-w-[340px]">
              <div className="bg-mist rounded-lg p-4">
                <p className="mb-1 font-display text-[20px] text-ink">Key facts</p>
                <dl>
                  {keyFacts.map(([label, value]) => (
                    <div key={label} className="flex flex-col gap-0.5 py-2.25 border-b border-line">
                      <dt className="text-[11px] font-semibold tracking-[1px] uppercase text-ink-soft">{label}</dt>
                      <dd className="text-[14px] leading-[1.45] text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
                <a className="inline-block mt-2.5 text-[13px] font-semibold" href={mailto}>
                  Report a correction
                </a>
              </div>
              <nav aria-label="Contents" className="hidden border border-line rounded-lg py-3.5 px-4 lg:block">
                <b className="text-[14px] text-ink">On this page</b>
                <ol className="mt-2 pl-4.5 flex flex-col gap-1.5 text-[14px] list-decimal">
                  {SECTIONS.filter((s) => s.id !== "s-sa" || seeAlso.length > 0).map((s) => (
                    <li key={s.id}>
                      <a className="no-underline" href={`#${s.id}`}>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
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
                  {officeShort} · {electionDate(c.office)}
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

function titleCase(name: string) {
  return name.toLowerCase().replace(/(^|[\s'-])(\p{L})/gu, (_, sep: string, ch: string) => sep + ch.toUpperCase());
}

function count(n: number, one: string, many = `${one}s`) {
  return `${n} ${n === 1 ? one : many}`;
}

function Avatar({ candidate }: { candidate: Pick<Candidate, "id" | "name" | "photo"> }) {
  return (
    <div className="relative flex-none w-24 h-24 rounded-full border-3 border-brand bg-mist-deep overflow-hidden box-content lg:w-33 lg:h-33">
      {candidate.photo ? (
        <Image src={candidatePhotoSrc(candidate.id)} alt={candidate.name} fill sizes="132px" priority className="object-cover object-[50%_25%]" />
      ) : (
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true" viewBox="0 0 100 100">
          <circle cx="50" cy="40" r="17" fill="#9CBFA5" />
          <path d="M16 100c0-21 15-34 34-34s34 13 34 34z" fill="#9CBFA5" />
        </svg>
      )}
    </div>
  );
}

function SummaryBox({ label, value, note }: { label: string; value: ReactNode; note?: string }) {
  return (
    <div className="bg-white rounded-md py-3 px-3.5 flex-[1_1_180px]">
      <p className="text-[11px] font-bold tracking-[1px] uppercase text-ink-faint">{label}</p>
      <p className="mt-1 text-[15px] font-semibold leading-[1.4] text-ink">{value}</p>
      {note && <p className="mt-0.5 text-[13px] text-ink-soft">{note}</p>}
    </div>
  );
}

function RichText({ value }: { value: Rich }) {
  return value.map((part, i) => {
    if (typeof part === "string") return part;
    if ("ref" in part) return <Refs key={i} refs={[part.ref]} />;
    return part.href.startsWith("http") ? (
      <a key={i} href={part.href} target="_blank" rel="noopener">
        {part.text}
      </a>
    ) : (
      <Link key={i} href={part.href}>
        {part.text}
      </Link>
    );
  });
}

function Refs({ refs }: { refs?: number[] }) {
  if (!refs?.length) return null;
  return refs.map((r) => (
    <sup key={r}>
      <a className="text-[11px] no-underline" href={`#ref-${r}`}>
        [{r}]
      </a>
    </sup>
  ));
}

function Timeline({ items }: { items: { title: string; tag: ReactNode; detail: string; refs?: number[]; filled?: boolean }[] }) {
  return (
    <ol className="list-none">
      {items.map((it, i) => (
        <li key={i} className={`relative pb-5 pl-6.5 ml-[7px] border-l-2 ${i === items.length - 1 ? "border-l-line" : "border-l-brand"}`}>
          <span className={`absolute left-[-9px] top-0.5 w-4 h-4 rounded-full border-2 border-brand box-content ${it.filled ? "bg-brand" : "bg-white"}`} />
          <div className="flex flex-wrap gap-2 items-center">
            <b className="text-[17px] text-ink">{it.title}</b>
            {it.tag}
          </div>
          <p className="mt-1 text-[14px] text-ink-soft">
            {it.detail}
            <Refs refs={it.refs} />
          </p>
        </li>
      ))}
    </ol>
  );
}

function Empty({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 items-start bg-mist-light border border-dashed border-line rounded-md py-3.5 px-4">
      <span className="mt-0.5">
        <InfoIcon />
      </span>
      <p className="text-[15px] leading-[1.55] text-ink-soft">{children}</p>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.5v.5" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg aria-hidden="true" width="26" height="30" viewBox="0 0 24 24" fill="none" stroke="#2f8a3b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
