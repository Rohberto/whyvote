import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Search by area",
  description:
    "Find your polling unit by choosing your state, local government area and ward.",
};

export default function PollingUnitAreaPage() {
  return (
    <>
      <Breadcrumb items={[{"label": "Get ready", "href": "/get-ready"}, {"label": "Polling unit locator", "href": "/get-ready/polling-unit"}, {"label": "Search by area"}]} />
      <section className="pt-8 pb-5 lg:pt-12 lg:pb-7">
        <Container>
          <div className="flex flex-col gap-3.5">
            <Eyebrow>Polling unit locator</Eyebrow>
            <h1 className="font-display text-[44px] leading-[0.95] text-ink uppercase lg:text-[72px]">Search by area</h1>
            <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:text-[19px]">Pick your ward, then find your unit by name, landmark or number.</p>
          </div>
        </Container>
      </section>
      <section className="pb-12">
        <Container>
          <div className="flex flex-col gap-4.5">
            <div className="bg-mist rounded-lg py-4.5 px-4 flex flex-col gap-3.5 lg:p-6">
              <div className="flex flex-wrap gap-2 items-center">
                <Chip tone="mint">
                  <svg className="flex-none" aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  Filled in from My ballot
                </Chip>
                <a className="text-[14px] font-semibold" href="#">Change</a>
              </div>
              <div className="flex flex-wrap gap-3.5">
                <label className="flex flex-col gap-1.5 flex-[1_1_200px]">
                  <span className="text-[12px] font-semibold tracking-[1px] uppercase text-ink-soft">State</span>
                  <select className="min-h-13 px-3.5 border border-line rounded-md bg-white text-[16px] text-ink box-content" defaultValue="Lagos">
                    <option>Lagos</option>
                    <option>Ogun</option>
                    <option>Oyo</option>
                    <option>Abuja (FCT)</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1.5 flex-[1_1_200px]">
                  <span className="text-[12px] font-semibold tracking-[1px] uppercase text-ink-soft">Local government area</span>
                  <select className="min-h-13 px-3.5 border border-line rounded-md bg-white text-[16px] text-ink box-content" defaultValue="Ajeromi-Ifelodun">
                    <option>Ajeromi-Ifelodun</option>
                    <option>Agege</option>
                    <option>Alimosho</option>
                    <option>Surulere</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1.5 flex-[1_1_200px]">
                  <span className="text-[12px] font-semibold tracking-[1px] uppercase text-ink-soft">Ward</span>
                  <select className="min-h-13 px-3.5 border border-line rounded-md bg-white text-[16px] text-ink box-content" defaultValue="Ward 05">
                    <option>Choose a ward</option>
                    <option>Ward 01</option>
                    <option>Ward 02</option>
                    <option>Ward 03</option>
                    <option>Ward 04</option>
                    <option>Ward 05</option>
                    <option>Ward 06</option>
                    <option>Ward 07</option>
                    <option>Ward 08</option>
                    <option>Ward 09</option>
                    <option>Ward 10</option>
                  </select>
                </label>
              </div>
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-[12px] font-semibold tracking-[1px] uppercase text-ink-soft">Filter units</span>
              <span className="flex items-center gap-2.5 min-h-13 px-3.5 border border-line rounded-md bg-white box-content">
                <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <input className="flex-1 border-0 [outline:0] text-[16px] bg-transparent text-ink" type="search" placeholder="School, church, street or unit number" />
              </span>
            </label>
            <div className="flex justify-between items-baseline gap-2.5 flex-wrap">
              <b className="text-[16px]">[n] polling units in Ward 05</b>
              <span className="text-[13px] text-ink-faint">Sorted by unit number</span>
            </div>
            <div className="border border-line rounded-lg overflow-hidden">
              <Link className="flex gap-3.5 items-center py-3.5 px-4 border-b border-b-line no-underline text-ink bg-white" href="/get-ready/polling-unit/result">
                <span className="font-mono text-[14px] font-bold text-green flex-none w-[104px] lg:w-[120px]">24/02/05/001</span>
                <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <b className="text-[15px]">[Polling unit name]</b>
                  <span className="text-[13px] text-ink-soft">[Location description from INEC’s list]</span>
                </span>
                <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link className="flex gap-3.5 items-center py-3.5 px-4 border-b border-b-line no-underline text-ink bg-white" href="/get-ready/polling-unit/result">
                <span className="font-mono text-[14px] font-bold text-green flex-none w-[104px] lg:w-[120px]">24/02/05/002</span>
                <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <b className="text-[15px]">[Polling unit name]</b>
                  <span className="text-[13px] text-ink-soft">[Location description from INEC’s list]</span>
                </span>
                <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link className="flex gap-3.5 items-center py-3.5 px-4 border-b border-b-line no-underline text-ink bg-white" href="/get-ready/polling-unit/result">
                <span className="font-mono text-[14px] font-bold text-green flex-none w-[104px] lg:w-[120px]">24/02/05/003</span>
                <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <b className="text-[15px]">[Polling unit name]</b>
                  <span className="text-[13px] text-ink-soft">[Location description from INEC’s list]</span>
                </span>
                <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link className="flex gap-3.5 items-center py-3.5 px-4 border-b border-b-line no-underline text-ink bg-white" href="/get-ready/polling-unit/result">
                <span className="font-mono text-[14px] font-bold text-green flex-none w-[104px] lg:w-[120px]">24/02/05/004</span>
                <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <b className="text-[15px]">[Polling unit name]</b>
                  <span className="text-[13px] text-ink-soft">[Location description from INEC’s list]</span>
                </span>
                <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link className="flex gap-3.5 items-center py-3.5 px-4 border-b border-b-line no-underline text-ink bg-white" href="/get-ready/polling-unit/result">
                <span className="font-mono text-[14px] font-bold text-green flex-none w-[104px] lg:w-[120px]">24/02/05/005</span>
                <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <b className="text-[15px]">[Polling unit name]</b>
                  <span className="text-[13px] text-ink-soft">[Location description from INEC’s list]</span>
                </span>
                <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link className="flex gap-3.5 items-center py-3.5 px-4 border-b border-b-line no-underline text-ink bg-white" href="/get-ready/polling-unit/result">
                <span className="font-mono text-[14px] font-bold text-green flex-none w-[104px] lg:w-[120px]">24/02/05/006</span>
                <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <b className="text-[15px]">[Polling unit name]</b>
                  <span className="text-[13px] text-ink-soft">[Location description from INEC’s list]</span>
                </span>
                <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link className="flex gap-3.5 items-center py-3.5 px-4 border-b border-b-line no-underline text-ink bg-white" href="/get-ready/polling-unit/result">
                <span className="font-mono text-[14px] font-bold text-green flex-none w-[104px] lg:w-[120px]">24/02/05/007</span>
                <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <b className="text-[15px]">[Polling unit name]</b>
                  <span className="text-[13px] text-ink-soft">[Location description from INEC’s list]</span>
                </span>
                <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link className="flex gap-3.5 items-center py-3.5 px-4 border-b border-b-line no-underline text-ink bg-white" href="/get-ready/polling-unit/result">
                <span className="font-mono text-[14px] font-bold text-green flex-none w-[104px] lg:w-[120px]">24/02/05/008</span>
                <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <b className="text-[15px]">[Polling unit name]</b>
                  <span className="text-[13px] text-ink-soft">[Location description from INEC’s list]</span>
                </span>
                <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link className="flex gap-3.5 items-center py-3.5 px-4 border-b border-b-line no-underline text-ink bg-white" href="/get-ready/polling-unit/result">
                <span className="font-mono text-[14px] font-bold text-green flex-none w-[104px] lg:w-[120px]">24/02/05/009</span>
                <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <b className="text-[15px]">[Polling unit name]</b>
                  <span className="text-[13px] text-ink-soft">[Location description from INEC’s list]</span>
                </span>
                <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link className="flex gap-3.5 items-center py-3.5 px-4 border-b border-b-line no-underline text-ink bg-white" href="/get-ready/polling-unit/result">
                <span className="font-mono text-[14px] font-bold text-green flex-none w-[104px] lg:w-[120px]">24/02/05/010</span>
                <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <b className="text-[15px]">[Polling unit name]</b>
                  <span className="text-[13px] text-ink-soft">[Location description from INEC’s list]</span>
                </span>
                <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div>
              <ButtonLink variant="soft" href="#">Show more units</ButtonLink>
            </div>
            <div className="flex gap-3 items-start bg-mist rounded-md py-3.5 px-4">
              <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v6M12 7.5v.5" />
              </svg>
              <p className="text-[14px] leading-[1.55] text-ink-soft">
                Not sure of your ward? Your PVC shows it in the code: the third number is the ward.{" "}
                <a className="font-semibold" href="#">Confirm on INEC’s official locator</a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
