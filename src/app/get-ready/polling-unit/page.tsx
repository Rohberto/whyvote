import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BallotPicker } from "@/components/ballot/ballot-picker";
import { UnitCodeForm } from "@/components/polling-unit/unit-code-form";
import { PICKER_STATES } from "@/lib/candidates";
import { PU_AS_OF, PU_COUNTS, PU_SOURCE } from "@/lib/polling-units";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Find your polling unit",
  description:
    "Find the only place you can vote using the polling unit code on your PVC, or search by state, LGA and ward.",
  path: "/get-ready/polling-unit",
});

export default function PollingUnitPage() {
  return (
    <>
      <Breadcrumb items={[{"label": "Get ready", "href": "/get-ready"}, {"label": "Polling unit locator"}]} />
      <section className="pt-8 pb-6 lg:pt-12 lg:pb-8">
        <Container>
          <div className="flex flex-col gap-4">
            <Eyebrow>Get ready · Step 04</Eyebrow>
            <h1 className="font-display text-[48px] leading-[0.95] text-ink uppercase lg:text-[84px]">Find your polling unit</h1>
            <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:text-[19px]">
              It is the only place you can vote, and it is printed on your PVC. Find it now, not on the morning of 16 January.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-12">
        <Container>
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-5 items-stretch">
              <div className="flex-[1.3_1_480px] bg-white border-2 border-ink rounded-lg p-5 flex flex-col gap-4.5 lg:p-8 box-content">
                <Chip>Fastest</Chip>
                <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[38px]">Type the code on your PVC</h2>
                <p className="text-[15px] leading-[1.6] text-ink-soft">
                  Four numbers, separated by slashes: state, LGA, ward and unit. Copy them exactly as printed.
                </p>
                <div className="flex flex-wrap gap-6 items-center">
                  <figure className="flex flex-col gap-2.5 items-start">
                    <svg className="w-[300px] max-w-full h-auto lg:w-[360px]" role="img" aria-label="Back of a PVC with the polling unit code highlighted" viewBox="0 0 340 214">
                      <rect x="1" y="1" width="338" height="212" rx="14" fill="#F4F7F2" stroke="#C9D6CB" strokeWidth="2" />
                      <rect x="1" y="1" width="338" height="34" rx="14" fill="#2F8A3B" />
                      <rect x="1" y="20" width="338" height="15" fill="#2F8A3B" />
                      <text x="18" y="23" fontFamily="Outfit, sans-serif" fontSize="11" fontWeight="700" fill="#FFFFFF" letterSpacing="1">BACK OF YOUR PVC</text>
                      <rect x="18" y="52" width="150" height="7" rx="3.5" fill="#D3DDD5" />
                      <rect x="18" y="68" width="210" height="7" rx="3.5" fill="#D3DDD5" />
                      <rect x="18" y="84" width="120" height="7" rx="3.5" fill="#D3DDD5" />
                      <rect x="12" y="104" width="250" height="46" rx="6" fill="#E3F07A" />
                      <text x="22" y="122" fontFamily="Outfit, sans-serif" fontSize="10" fontWeight="700" fill="#43574A" letterSpacing="1">POLLING UNIT</text>
                      <text x="22" y="142" fontFamily="Outfit, sans-serif" fontSize="19" fontWeight="700" fill="#0A3B2A">24/02/05/012</text>
                      <rect x="18" y="166" width="190" height="7" rx="3.5" fill="#D3DDD5" />
                      <rect x="18" y="182" width="140" height="7" rx="3.5" fill="#D3DDD5" />
                      <rect x="262" y="150" width="58" height="46" rx="4" fill="none" stroke="#C9D6CB" strokeWidth="2" />
                    </svg>
                    <figcaption className="text-[12px] text-ink-faint max-w-[300px] lg:max-w-[360px]">Illustration. The code is on the back of the card; the layout of real cards may differ.</figcaption>
                  </figure>
                  <UnitCodeForm />
                </div>
              </div>
              <div className="flex-[1_1_300px] bg-mist rounded-lg p-5 flex flex-col gap-4 lg:p-8 box-content">
                <Chip tone="white">No PVC with you?</Chip>
                <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[38px]">Search by area</h2>
                <p className="text-[15px] leading-[1.6] text-ink-soft">
                  Choose your state and LGA, then pick your ward and unit from INEC’s list.
                </p>
                <BallotPicker states={PICKER_STATES} state="" lga="" basePath="/get-ready/polling-unit" />
              </div>
            </div>
            <div className="flex gap-3 items-start bg-mist rounded-md py-3.5 px-4">
              <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v6M12 7.5v.5" />
              </svg>
              <p className="text-[14px] leading-[1.55] text-ink-soft">
                Every result comes from INEC’s published polling unit list ({PU_COUNTS.polling_units.toLocaleString("en-NG")} units, as of {PU_AS_OF}). We never change addresses ourselves.{" "}
                <a className="font-semibold" href={PU_SOURCE} target="_blank" rel="noopener">Confirm on INEC’s official locator</a>
                .
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] gap-3">
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-1.5">
                  <b className="text-[16px]">No PVC yet?</b>
                  <p className="text-[14px] leading-[1.6] text-ink-soft">Collect it first. Step 02 on Get ready shows where it is waiting.</p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-1.5">
                  <b className="text-[16px]">Moved since you registered?</b>
                  <p className="text-[14px] leading-[1.6] text-ink-soft">You vote where you registered unless INEC approved a transfer. See step 05.</p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-1.5">
                  <b className="text-[16px]">Lost your PVC?</b>
                  <p className="text-[14px] leading-[1.6] text-ink-soft">Report it at your INEC LGA office and ask about a replacement before the deadline.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
