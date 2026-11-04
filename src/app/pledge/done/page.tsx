import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { PledgedHeading, PledgeReminderNote } from "@/components/pledge/pledge-greeting";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FingerprintMark } from "@/components/icons/fingerprint-mark";
import { Suspense } from "react";
import { InviteLinkButton, PledgeCard, WhatsAppInvite } from "@/components/pledge/pledge-card";
import { ballotSummary, type BallotSummary } from "@/lib/ballot-summary";
import { pageMetadata, SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Pledge done",
  description:
    "Your ballot summary and what happens next after taking the whyVote pledge.",
  path: "/pledge/done",
  noIndex: true,
});

type Props = PageProps<"/pledge/done">;

function SummaryLists({ summary }: { summary: BallotSummary | null }) {
  const days = summary?.days ?? [
    { date: "Saturday 16 January 2027", races: [{ line: "President and Vice President" }, { line: "Senator" }, { line: "Member, House of Representatives" }] },
    { date: "Saturday 6 February 2027", races: [{ line: "Governor and Deputy Governor" }, { line: "Member, State House of Assembly" }] },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(280px,100%),1fr))] gap-3">
        {days.map((d) => (
          <div key={d.date} className="bg-mist rounded-md p-6">
            <div className="flex flex-col gap-2.5">
              <Eyebrow>{d.date}</Eyebrow>
              {d.races.length > 0 && (
                <ul className="pl-4.5 text-ink-soft list-disc">
                  {d.races.map((r) => (
                    <li key={r.line} className="text-[15px] leading-[1.6]">
                      {r.line}
                    </li>
                  ))}
                </ul>
              )}
              {"note" in d && d.note && <p className="text-[14px] leading-[1.6] text-ink-soft">{d.note}</p>}
            </div>
          </div>
        ))}
      </div>
      {summary ? (
        <p className="text-[14px] leading-[1.6] text-ink-soft">
          {summary.lga.name}, {summary.state.name === "FCT" ? "Abuja (FCT)" : summary.state.name}.{" "}
          <Link className="font-semibold" href={`/ballot/${summary.state.slug}/${summary.lga.slug}`}>
            See who is running
          </Link>
        </p>
      ) : (
        <p className="text-[14px] leading-[1.6] text-ink-soft">
          <Link className="font-semibold" href="/ballot">
            Choose your state and LGA on My ballot
          </Link>{" "}
          to see your exact seats and everyone running.
        </p>
      )}
    </div>
  );
}

async function Summary({ searchParams }: { searchParams: Props["searchParams"] }) {
  const q = await searchParams;
  const state = typeof q.state === "string" ? q.state : "";
  const lga = typeof q.lga === "string" ? q.lga : "";
  return <SummaryLists summary={state && lga ? await ballotSummary(state, lga) : null} />;
}

export default function PledgeDonePage({ searchParams }: Props) {
  return (
    <>
      <section className="py-9 lg:py-16">
        <Container>
          <div className="flex flex-wrap gap-9 items-start">
            <div className="flex-[999_1_520px] min-w-0 flex flex-col gap-5">
              <div className="flex gap-3.5 items-center">
                <span className="w-14 h-14 rounded-full bg-mint inline-flex items-center justify-center flex-none">
                  <svg className="flex-none" aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0A3B2A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <PledgedHeading className="font-display text-[52px] leading-[0.95] text-ink lg:text-[76px]" />
              </div>
              <PledgeReminderNote className="text-[17px] leading-[1.6] text-ink-soft" />
              <Suspense fallback={<SummaryLists summary={null} />}>
                <Summary searchParams={searchParams} />
              </Suspense>
              <div className="flex flex-wrap gap-2.5">
                <WhatsAppInvite siteUrl={SITE_URL} />
                <ButtonLink variant="outline" size="lg" href="/get-ready">What to do next</ButtonLink>
              </div>
            </div>
            <PledgeCard />
          </div>
        </Container>
      </section>
      <section className="py-5 lg:py-8">
        <div className="max-w-[1200px] mx-auto px-3 lg:px-5 box-content">
          <div className="relative overflow-hidden bg-brand rounded-lg py-9 px-6 flex flex-wrap items-center justify-between gap-6 lg:py-14 lg:px-16">
            <div className="flex-[1_1_440px] flex flex-col gap-4 relative z-1">
              <h2 className="font-display text-[40px] leading-[0.95] text-white lg:text-[64px]">You pledged. Now invite your friends to pledge.</h2>
              <p className="text-[16px] leading-[1.6] text-green-pale max-w-[560px] lg:text-[17px]">
                One vote is good. Five friends who vote with you is better. Send your invite link anywhere: WhatsApp, Instagram, X, text or email.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <InviteLinkButton siteUrl={SITE_URL} />
                <ButtonLink variant="ghost-light" size="lg" href="/get-ready">What to do next</ButtonLink>
              </div>
            </div>
            <div className="flex-[0_0_auto] absolute -right-7.5 -bottom-10 lg:static lg:right-auto lg:bottom-auto">
              <FingerprintMark className="w-[130px] h-[156px] lg:w-[210px] lg:h-[252px]" stroke="rgba(255,255,255,0.32)" strokeWidth={7.6} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
