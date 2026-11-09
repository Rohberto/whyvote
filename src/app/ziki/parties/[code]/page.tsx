import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ZikiCard } from "@/components/candidates/candidate-cards";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PledgeBand } from "@/components/layout/pledge-band";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { OFFICE_LABEL, partyCandidates, type Office } from "@/lib/candidates";
import { PARTIES, party, partyLogo } from "@/lib/parties";
import { jsonLd, pageMetadata, SITE_URL } from "@/lib/site";

type Props = PageProps<"/ziki/parties/[code]">;

export function generateStaticParams() {
  return Object.keys(PARTIES).map((code) => ({ code: code.toLowerCase() }));
}

const known = (code: string) => code.toUpperCase() in PARTIES;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  if (!known(code)) return { title: "Party", robots: { index: false } };
  const p = party(code.toUpperCase());
  return pageMetadata({
    title: `${p.name} (${p.code})`,
    description: `${p.name} in the 2027 Nigerian general election: its presidential ticket, governorship candidates and how many candidates it has for each office, from INEC’s final list.`,
    path: `/ziki/parties/${code.toLowerCase()}`,
  });
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PartyPage params={params} />
    </Suspense>
  );
}

const ORDER: Office[] = ["president", "governor", "senate", "reps", "assembly"];
const PLURAL: Partial<Record<Office, string>> = {
  president: "Presidential ticket",
  governor: "Governorship candidates",
  senate: "Senate candidates",
  reps: "House of Representatives candidates",
  assembly: "State House of Assembly candidates",
};

async function PartyPage({ params }: { params: Props["params"] }) {
  const { code: raw } = await params;
  if (!known(raw)) notFound();
  const code = raw.toUpperCase();
  const p = party(code);
  const { counts, total, ticket, governors } = await partyCandidates(code);
  const president = ticket.find((c) => c.office === "president");
  const vp = ticket.find((c) => c.office === "vice-president");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@type": "PoliticalParty",
          name: p.name,
          alternateName: p.code,
          url: `${SITE_URL}/ziki/parties/${raw.toLowerCase()}`,
          logo: `${SITE_URL}${partyLogo(code)}`,
        })}
      />
      <Breadcrumb items={[{ label: "Ziki", href: "/ziki" }, { label: "Parties" }, { label: p.name }]} />
      <section className="pt-8 pb-6 lg:pt-12 lg:pb-8">
        <Container>
          <div className="flex flex-wrap gap-6 items-center">
            <Image src={partyLogo(code)} alt={`${p.name} logo`} width={120} height={120} className="w-24 h-24 rounded-full bg-white border border-line object-contain lg:w-30 lg:h-30" />
            <div className="flex-[1_1_320px] flex flex-col gap-3">
              <Eyebrow>Political party · {p.code}</Eyebrow>
              <h1 className="font-display text-[44px] leading-[0.95] text-ink uppercase wrap-anywhere lg:text-[72px]">{p.name}</h1>
              {p.note && <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px]">{p.note}</p>}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[38px]">On the 2027 ballot</h2>
            <p className="text-[15px] leading-[1.6] text-ink-soft">
              {total.toLocaleString("en-NG")} candidates on INEC’s final list across both Saturdays.
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(170px,100%),1fr))] gap-2.5">
              {ORDER.map((o) => (
                <div key={o} className="bg-mist rounded-md py-3.5 px-4">
                  <p className="font-display text-[32px] leading-none text-ink">{o === "president" ? (president ? "Yes" : "No") : counts[o].toLocaleString("en-NG")}</p>
                  <p className="mt-1 text-[13px] text-ink-soft">{o === "president" ? "Presidential candidate" : PLURAL[o]}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {president && (
        <section className="pb-8">
          <Container>
            <div className="flex flex-col gap-3">
              <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[38px]">Presidential ticket</h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(min(220px,100%),1fr))] gap-3.5 max-w-[480px]">
                <ZikiCard candidate={president} />
                {vp && <ZikiCard candidate={vp} />}
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="pb-12">
        <Container>
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[38px]">Governorship candidates</h2>
            {governors.length ? (
              <div className="border border-line rounded-lg overflow-hidden">
                {governors.map((g) => (
                  <Link
                    key={g.id}
                    href={`/ziki/${g.id}`}
                    className="flex justify-between gap-3 py-3.5 px-4 border-b border-b-line last:border-b-0 no-underline text-ink bg-white hover:bg-mist-light hover:text-ink"
                  >
                    <b className="text-[15px] wrap-anywhere">{g.name}</b>
                    <span className="text-[14px] text-ink-soft flex-none">{g.state}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="bg-mist rounded-md py-4 px-4 text-[15px] text-ink-soft">This party has no governorship candidates in 2027.</p>
            )}
            <p className="text-[13px] leading-[1.6] text-ink-faint">
              Counts and names from INEC’s final list of candidates. {OFFICE_LABEL.senate} and other constituency candidates are on each{" "}
              <Link href="/ballot">ballot page</Link>.
            </p>
          </div>
        </Container>
      </section>
      <PledgeBand />
    </>
  );
}
