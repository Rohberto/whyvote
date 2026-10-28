import type { Metadata } from "next";
import { PledgeForm } from "@/components/pledge/pledge-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Take the pledge",
  description:
    "Promise yourself you will vote on both Saturdays. Get your ballot summary, a reminder to collect your PVC and a nudge in the final week.",
};

export default function PledgePage() {
  return (
    <>
      <section className="pt-9 pb-7 lg:pt-16 lg:pb-10">
        <Container>
          <div className="flex flex-col gap-4.5">
            <Eyebrow>Take the pledge</Eyebrow>
            <h1 className="font-display text-[52px] leading-[0.95] text-ink uppercase lg:text-[84px]">Put your thumb on it.</h1>
            <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:text-[19px]">
              One promise to yourself: you will vote on both Saturdays. You get your ballot summary right away, a reminder
              to collect your PVC, and a nudge in the final week.
            </p>
          </div>
        </Container>
      </section>
      <PledgeForm />
    </>
  );
}
