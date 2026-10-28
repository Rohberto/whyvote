import type { Metadata } from "next";
import Link from "next/link";
import { ZikiCard } from "@/components/candidates/candidate-cards";
import { PartyBadge } from "@/components/candidates/party-badge";
import { PledgeBand } from "@/components/layout/pledge-band";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ZikiSearch } from "@/components/ziki/ziki-search";
import { GEO, getNational, getStateData } from "@/lib/candidates";
import { PARTIES } from "@/lib/parties";
import { ZIKI_HEADLINES } from "@/lib/ziki-notes";

export const metadata: Metadata = {
  title: "Ziki",
  description: "Plain, sourced profiles of the candidates and officeholders on your 2027 ballot.",
};

const ELECTIONS = [
  ["2027 Nigerian general election", "16 January and 6 February 2027."],
  ["2023 Nigerian presidential election", "Won by Tinubu. Turnout 26.7%."],
  ["Electoral Act 2026", "The law governing the 2027 polls."],
  ["Independent National Electoral Commission", "Runs federal and state elections."],
];

const sectionTitle = "pb-2.5 border-b border-line font-display text-[28px] lg:text-[34px]";
const cardGrid =
  "grid grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] gap-3.5 lg:grid-cols-[repeat(auto-fill,minmax(min(230px,100%),1fr))]";
const tileGrid = "grid grid-cols-[repeat(auto-fill,minmax(min(240px,100%),1fr))] gap-2.5";

/** Put the six parties featured on My ballot first, as the design does. */
const FEATURED_FIRST = ["APC", "ADC", "NDC", "PDP", "LP", "APM"];
const featuredFirst = (a: { party: string }, b: { party: string }) => {
  const ia = FEATURED_FIRST.indexOf(a.party);
  const ib = FEATURED_FIRST.indexOf(b.party);
  return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.party.localeCompare(b.party);
};

export default async function ZikiPage() {
  const national = getNational();
  const presidents = national.filter((c) => c.office === "president").sort(featuredFirst);
  const mates = national.filter((c) => c.office === "vice-president").sort(featuredFirst);
  const lagos = await getStateData("lagos");
  const lagosGov = (lagos?.candidates ?? []).filter((c) => c.office === "governor").sort(featuredFirst);

  const states = await Promise.all(GEO.map(async (s) => ({ geo: s, data: await getStateData(s.slug) })));
  const partyCount = new Map<string, number>();
  for (const c of [...national, ...states.flatMap((s) => s.data?.candidates ?? [])]) {
    partyCount.set(c.party, (partyCount.get(c.party) ?? 0) + 1);
  }
  const parties = Object.values(PARTIES).sort((a, b) => featuredFirst({ party: a.code }, { party: b.code }));

  return (
    <>
      <section className="pt-9 pb-7 lg:pt-16 lg:pb-10">
        <Container>
          <div className="flex flex-col gap-4.5">
            <Eyebrow>Ziki</Eyebrow>
            <h1 className="font-display text-[52px] leading-[0.95] text-ink uppercase lg:text-[84px]">whyvote ziki</h1>
            <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:text-[19px]">
              Plain, sourced profiles of the people, parties and rules on your ballot.
            </p>
            <div className="flex flex-col gap-4.5">
              <div className="bg-mist rounded-md py-3.5 px-4">
                <p className="text-[14px] leading-[1.6] text-ink-soft">
                  <b className="text-ink">Every profile uses the same template.</b> No opinions, no rankings. Candidates
                  are taken from INEC’s published final lists, and every claim links to a source.
                </p>
              </div>
              <ZikiSearch />
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-2 pb-10">
        <Container>
          <div className="flex flex-col gap-11">
            <div className="flex flex-col gap-4">
              <h2 className={sectionTitle}>Presidential candidates, 2027</h2>
              <div className={cardGrid}>
                {presidents.map((c) => (
                  <ZikiCard key={c.id} candidate={c} headline={ZIKI_HEADLINES[c.id]} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className={sectionTitle}>Running mates, 2027</h2>
              <div className={cardGrid}>
                {mates.map((c) => (
                  <ZikiCard key={c.id} candidate={c} headline={ZIKI_HEADLINES[c.id]} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className={sectionTitle}>Lagos governorship candidates, 2027</h2>
              <div className={cardGrid}>
                {lagosGov.map((c) => (
                  <ZikiCard key={c.id} candidate={c} headline={ZIKI_HEADLINES[c.id]} />
                ))}
              </div>
              <p className="text-[14px] text-ink-soft">
                Another state? <Link href="/ballot#where">Choose it on My ballot</Link> to see its governorship race.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className={sectionTitle}>Parties</h2>
              <div className={tileGrid}>
                {parties.map((p) => (
                  <div key={p.code} className="flex gap-3 items-center p-3.5 bg-mist rounded-md text-ink">
                    <PartyBadge code={p.code} size="md" decorative />
                    <span className="flex flex-col gap-0.5">
                      <b className="text-[15px]">{p.name}</b>
                      <span className="text-[13px] text-ink-soft">
                        {p.note ?? `${(partyCount.get(p.code) ?? 0).toLocaleString("en-NG")} candidates in 2027.`}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className={sectionTitle}>Elections</h2>
              <div className={tileGrid}>
                {ELECTIONS.map(([title, body]) => (
                  <div key={title} className="flex gap-3 items-center p-3.5 bg-mist rounded-md text-ink">
                    <span className="flex flex-col gap-0.5">
                      <b className="text-[15px]">{title}</b>
                      <span className="text-[13px] text-ink-soft">{body}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className={sectionTitle}>States</h2>
              <div className={tileGrid}>
                {states.map(({ geo, data }) => {
                  const districts = data?.races.filter((r) => r.office === "senate").length ?? 0;
                  return (
                    <Link
                      key={geo.slug}
                      className="flex gap-3 items-center p-3.5 bg-mist rounded-md no-underline text-ink hover:bg-mist-deep hover:text-ink"
                      href={`/ballot/${geo.slug}/${geo.lgas[0].slug}`}
                    >
                      <span className="flex flex-col gap-0.5">
                        <b className="text-[15px]">{geo.slug === "fct" ? "Federal Capital Territory" : `${geo.name} State`}</b>
                        <span className="text-[13px] text-ink-soft">
                          {geo.lgas.length} {geo.slug === "fct" ? "area councils" : "LGAs"}, {districts} senatorial{" "}
                          {districts === 1 ? "district" : "districts"}.
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <PledgeBand />
    </>
  );
}
