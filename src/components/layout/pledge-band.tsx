import { FingerprintMark } from "@/components/icons/fingerprint-mark";
import { ButtonLink } from "@/components/ui/button";

/** "Put your thumb on it" call to action that closes most pages. */
export function PledgeBand() {
  return (
    <section className="py-5 lg:py-8">
      <div className="mx-auto max-w-[1224px] px-3 lg:max-w-[1240px] lg:px-5">
        <div className="relative overflow-hidden bg-brand rounded-lg px-6 py-9 lg:px-16 lg:py-14 flex flex-wrap items-center justify-between gap-6">
          <div className="flex-[1_1_440px] flex flex-col gap-4 relative z-1">
            <h2 className="font-display text-[40px] leading-[0.95] text-white lg:text-[64px]">Put your thumb on it.</h2>
            <p className="text-[16px] leading-[1.6] text-green-pale max-w-[560px] lg:text-[17px]">
              Pledge to vote on both Saturdays. You get your own ballot summary straight away, a reminder to collect your
              PVC, and a nudge in the final week. Nothing else.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <ButtonLink href="/pledge" variant="sun" size="lg">
                Take the pledge
              </ButtonLink>
            </div>
          </div>
          <div className="flex-none absolute -right-7.5 -bottom-10 lg:static">
            <FingerprintMark className="w-[130px] h-[156px] text-white/32 lg:w-[210px] lg:h-[252px]" strokeWidth={7.6} />
          </div>
        </div>
      </div>
    </section>
  );
}
