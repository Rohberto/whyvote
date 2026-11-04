import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PledgeBand } from "@/components/layout/pledge-band";
import { UnitCodeForm } from "@/components/polling-unit/unit-code-form";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { areaHref, constituenciesFor, getUnit, parseUnitCode, PU_AS_OF, PU_SOURCE, unitHref } from "@/lib/polling-units";
import { pageMetadata, SITE_URL } from "@/lib/site";

type Props = PageProps<"/get-ready/polling-unit/unit/[code]">;

/** 176,846 units: render on first visit, then serve from the cache. One is prerendered as an example. */
export function generateStaticParams() {
  return [{ code: "24-02-05-012" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const unit = await getUnit(code);
  if (!unit) return { title: "Polling unit not found", robots: { index: false } };
  return pageMetadata({
    title: `Polling unit ${unit.code}: ${unit.name}`,
    description: `INEC polling unit ${unit.code}, ${unit.name}${unit.location ? `, ${unit.location}` : ""}. ${unit.ward.name} ward, ${unit.lga.name} LGA, ${unit.state.name}.`,
    path: unitHref(unit.code),
  });
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <UnitPage params={params} />
    </Suspense>
  );
}

const external = (
  <svg className="flex-none" aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 py-3 border-b border-b-line text-[15px]">
      <span className="text-ink-soft">{label}</span>
      <b className="text-right">{value}</b>
    </div>
  );
}

async function UnitPage({ params }: { params: Props["params"] }) {
  const { code } = await params;
  const unit = await getUnit(code);
  if (!unit) return <NotFound code={code} />;

  const { state, lga, ward } = unit;
  const seats = await constituenciesFor(state.slug, lga.slug);
  const place = [unit.name, unit.location, ward.name, lga.name, state.name === "FCT" ? "Abuja" : `${state.name} State`, "Nigeria"].filter(Boolean).join(", ");
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place)}`;
  const share = `https://wa.me/?text=${encodeURIComponent(
    `My polling unit for the 2027 elections is ${unit.code}: ${unit.name}, ${ward.name} ward, ${lga.name}, ${state.name}. Find yours: ${SITE_URL}/get-ready/polling-unit`,
  )}`;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Get ready", href: "/get-ready" },
          { label: "Polling unit locator", href: "/get-ready/polling-unit" },
          { label: lga.name, href: `${areaHref(state.slug, lga.slug)}#ward-${ward.code}` },
          { label: unit.code },
        ]}
      />
      <section className="pt-8 pb-12 lg:pt-12 lg:pb-16">
        <Container>
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-6 items-start">
              <div className="flex-[1.5_1_480px] min-w-0 flex flex-col gap-4">
                <div className="bg-ink text-white rounded-lg py-5.5 px-4.5 flex flex-col gap-3 lg:py-8 lg:px-9">
                  <p className="text-[12px] font-semibold tracking-[1.4px] uppercase text-lime">Polling unit</p>
                  <h1 className="font-mono text-[30px] font-bold tracking-[1px] lg:text-[40px]">{unit.code}</h1>
                  <p className="font-display text-[32px] leading-[0.95] wrap-anywhere lg:text-[44px]">{unit.name}</p>
                  {unit.location && <p className="text-[16px] leading-[1.5] text-sage-pale wrap-anywhere">{unit.location}</p>}
                  <div className="flex flex-wrap gap-2">
                    <Chip wrap>Ward {ward.code} · {ward.name}</Chip>
                    <Chip wrap tone="white">{lga.name} LGA</Chip>
                    <Chip wrap tone="white">{state.name === "FCT" ? "Abuja (FCT)" : state.name}</Chip>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <ButtonLink variant="mint" href={directions} target="_blank" rel="noopener">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
                      <circle cx="12" cy="9.5" r="2.5" />
                    </svg>
                    Get directions
                  </ButtonLink>
                  <ButtonLink variant="soft" href={maps} target="_blank" rel="noopener">
                    Search Google Maps
                    {external}
                  </ButtonLink>
                </div>
                <p className="text-[13px] leading-[1.55] text-ink-faint">
                  INEC does not publish map pins, so these search Google Maps for the unit’s name and area. Check the result against the location above, and
                  visit once before election day.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <ButtonLink size="lg" href={`/ballot/${state.slug}/${lga.slug}`}>
                    See my ballot
                  </ButtonLink>
                  <ButtonLink variant="soft" size="lg" href={share} target="_blank" rel="noopener">
                    <svg className="flex-none" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20z" />
                      <path d="M9 9.5c.3 2.3 2.2 4.2 4.5 4.5l1-1.2 2 .8" />
                    </svg>
                    Share with family
                  </ButtonLink>
                  <ButtonLink variant="outline" size="lg" href={PU_SOURCE} target="_blank" rel="noopener">
                    Confirm on INEC
                    {external}
                  </ButtonLink>
                </div>
              </div>
              <div className="flex-[1_1_320px] flex flex-col gap-4">
                {seats && (
                  <div className="bg-mist rounded-lg p-5 flex flex-col gap-1">
                    <h2 className="font-display text-[26px] leading-[0.95] text-ink">Your constituencies</h2>
                    <Row label="Senatorial district" value={seats.senate.join(" or ")} />
                    <Row label="Federal constituency" value={seats.reps.join(" or ")} />
                    <Row label="State constituency" value={seats.assembly.join(" or ")} />
                    {(seats.senate.length > 1 || seats.reps.length > 1 || seats.assembly.length > 1) && (
                      <p className="text-[14px] leading-[1.5] text-ink-soft mt-3">
                        {lga.name} is split between seats, and INEC’s list does not say which ward goes where. Your{" "}
                        <Link className="font-semibold" href={`/ballot/${state.slug}/${lga.slug}`}>
                          ballot page
                        </Link>{" "}
                        shows every possible race.
                      </p>
                    )}
                  </div>
                )}
                <div className="bg-white border border-line rounded-lg p-5 flex flex-col gap-3">
                  <h2 className="font-display text-[26px] leading-[0.95] text-ink">Before you go</h2>
                  <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                    <li>Visit once before election day so you know the way.</li>
                    <li>Bring your PVC. Nothing else replaces it.</li>
                    <li>Arrive early. Anyone already in the queue at closing time still votes.</li>
                    <li>Opening hours for 2027 will be confirmed by INEC.</li>
                  </ul>
                  <Link className="text-[14px] font-semibold" href="/get-ready">
                    Read the full election day guide
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-5">
              <Link className="text-[14px] font-semibold" href="/get-ready/polling-unit">
                Not your unit? Search again
              </Link>
              <Link className="text-[14px] font-semibold" href={`${areaHref(state.slug, lga.slug)}#ward-${ward.code}`}>
                Other units in {ward.name}
              </Link>
              <p className="text-[13px] leading-[1.6] text-ink-faint basis-full">From INEC’s published polling unit list, as of {PU_AS_OF}.</p>
            </div>
          </div>
        </Container>
      </section>
      <PledgeBand />
    </>
  );
}

function NotFound({ code }: { code: string }) {
  const parts = parseUnitCode(code) ?? ["", "", "", ""];
  return (
    <>
      <Breadcrumb items={[{ label: "Get ready", href: "/get-ready" }, { label: "Polling unit locator", href: "/get-ready/polling-unit" }, { label: "Not found" }]} />
      <section className="pt-8 pb-12 lg:pt-12 lg:pb-16">
        <Container>
          <div className="bg-white border border-line rounded-lg p-5 flex flex-col gap-3.5 max-w-[640px] lg:p-7">
            <Chip tone="danger">Code not recognised</Chip>
            <h1 className="font-display text-[32px] leading-[0.95] text-ink lg:text-[40px]">We could not find that unit</h1>
            <UnitCodeForm initial={[...parts]} invalid />
            <p className="text-[14px] leading-[1.55] text-ink-soft">
              Still stuck? <Link className="font-semibold" href="/get-ready/polling-unit/area">Search by area</Link> instead, or{" "}
              <a className="font-semibold" href={PU_SOURCE} target="_blank" rel="noopener">
                check INEC’s official locator
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
