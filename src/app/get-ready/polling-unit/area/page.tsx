import { BallotPicker } from "@/components/ballot/ballot-picker";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PICKER_STATES } from "@/lib/candidates";
import { PU_SOURCE } from "@/lib/polling-units";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Search by area",
  description: "Find your polling unit by choosing your state, local government area and ward, from INEC’s polling unit list.",
  path: "/get-ready/polling-unit/area",
});

export default function PollingUnitAreaPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Get ready", href: "/get-ready" }, { label: "Polling unit locator", href: "/get-ready/polling-unit" }, { label: "Search by area" }]} />
      <section className="pt-8 pb-5 lg:pt-12 lg:pb-7">
        <Container>
          <div className="flex flex-col gap-3.5">
            <Eyebrow>Polling unit locator</Eyebrow>
            <h1 className="font-display text-[44px] leading-[0.95] text-ink uppercase lg:text-[72px]">Search by area</h1>
            <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:text-[19px]">
              Choose the state and LGA where you registered. Then pick your ward and find your unit by name, landmark or number.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-12">
        <Container>
          <div className="flex flex-col gap-4.5">
            <div className="bg-mist rounded-lg py-4.5 px-4 lg:p-6">
              <BallotPicker states={PICKER_STATES} state="" lga="" basePath="/get-ready/polling-unit" />
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-soft">
              Not sure of your ward? Your PVC shows it in the code: the third number is the ward.{" "}
              <a className="font-semibold" href={PU_SOURCE} target="_blank" rel="noopener">
                Confirm on INEC’s official locator
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
