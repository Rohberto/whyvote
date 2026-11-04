import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BallotPicker } from "@/components/ballot/ballot-picker";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { UnitBrowser } from "@/components/polling-unit/unit-browser";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { getLga, getState, PICKER_STATES } from "@/lib/candidates";
import { allLgaPaths, areaHref, getLgaUnits, PU_AS_OF, PU_SOURCE } from "@/lib/polling-units";
import { pageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return allLgaPaths().map(([state, lga]) => ({ state, lga }));
}

export async function generateMetadata({ params }: PageProps<"/get-ready/polling-unit/[state]/[lga]">): Promise<Metadata> {
  const { state: s, lga: l } = await params;
  const state = getState(s);
  const lga = getLga(s, l);
  if (!state || !lga) return { title: "Polling units", robots: { index: false } };
  const place = `${lga.name}, ${state.name === "FCT" ? "Abuja (FCT)" : state.name}`;
  return pageMetadata({
    title: `Polling units in ${place}`,
    description: `Every INEC polling unit in ${place}, by ward, with unit codes and locations. Find where you vote in the 2027 general election.`,
    path: areaHref(s, l),
  });
}

export default function Page({ params }: PageProps<"/get-ready/polling-unit/[state]/[lga]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <AreaPage params={params} />
    </Suspense>
  );
}

async function AreaPage({ params }: { params: PageProps<"/get-ready/polling-unit/[state]/[lga]">["params"] }) {
  const { state: s, lga: l } = await params;
  const state = getState(s);
  const lga = getLga(s, l);
  const data = await getLgaUnits(s, l);
  if (!state || !lga || !data) notFound();
  const units = data.wards.reduce((n, w) => n + w.u.length, 0);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Get ready", href: "/get-ready" },
          { label: "Polling unit locator", href: "/get-ready/polling-unit" },
          { label: `${lga.name}, ${state.name}` },
        ]}
      />
      <section className="pt-8 pb-5 lg:pt-12 lg:pb-7">
        <Container>
          <div className="flex flex-col gap-3.5">
            <Eyebrow>Polling unit locator · {data.code}</Eyebrow>
            <h1 className="font-display text-[44px] leading-[0.95] text-ink uppercase wrap-anywhere lg:text-[72px]">{lga.name}</h1>
            <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[680px] lg:text-[19px]">
              {units.toLocaleString("en-NG")} polling units in {data.wards.length} wards in {lga.name}, {state.name}. Pick your ward, then find your unit
              by name, landmark or number.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-12">
        <Container>
          <div className="flex flex-col gap-4.5">
            <div className="bg-mist rounded-lg py-4.5 px-4 lg:p-6">
              <BallotPicker key={`${s}/${l}`} states={PICKER_STATES} state={s} lga={l} basePath="/get-ready/polling-unit" />
            </div>
            <UnitBrowser lgaCode={data.code} wards={data.wards} />
            <div className="flex gap-3 items-start bg-mist rounded-md py-3.5 px-4">
              <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v6M12 7.5v.5" />
              </svg>
              <p className="text-[14px] leading-[1.55] text-ink-soft">
                Not sure of your ward? The third number in the code on your PVC is the ward. Names and locations are exactly as INEC publishes them, as of{" "}
                {PU_AS_OF}.{" "}
                <a className="font-semibold" href={PU_SOURCE} target="_blank" rel="noopener">
                  Confirm on INEC’s official locator
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
