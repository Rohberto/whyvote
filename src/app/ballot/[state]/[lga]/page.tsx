import type { Metadata } from "next";
import { Suspense } from "react";
import { BallotView } from "@/components/ballot/ballot-view";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { GEO, getLga, getState } from "@/lib/candidates";

export function generateStaticParams() {
  return GEO.flatMap((s) => s.lgas.map((l) => ({ state: s.slug, lga: l.slug })));
}

export async function generateMetadata({ params }: PageProps<"/ballot/[state]/[lga]">): Promise<Metadata> {
  const { state, lga } = await params;
  const s = getState(state);
  const l = getLga(state, lga);
  if (!s || !l) return { title: "My ballot" };
  return {
    title: `My ballot: ${l.name}, ${s.name}`,
    description: `Every race and candidate on the 2027 ballot for voters registered in ${l.name}, ${s.name}, from INEC’s final list.`,
  };
}

export default function LgaBallotPage({ params }: PageProps<"/ballot/[state]/[lga]">) {
  return (
    <Suspense fallback={<PageSkeleton label="Loading ballot" />}>
      <LgaBallot params={params} />
    </Suspense>
  );
}

async function LgaBallot({ params }: Pick<PageProps<"/ballot/[state]/[lga]">, "params">) {
  const { state, lga } = await params;
  return <BallotView stateSlug={state} lgaSlug={lga} />;
}
