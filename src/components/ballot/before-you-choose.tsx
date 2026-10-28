import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

const CHECKS = [
  ["Public record", "Offices previously held, public voting and governance records, where available."],
  ["Published priorities", "Manifesto, policy proposals and documented campaign commitments."],
  ["Evidence and sources", "Primary sources, publication dates and corrections so you can check claims."],
];

const QUESTIONS = [
  "What decisions does this office control?",
  "What has the candidate proposed?",
  "How can their statements be verified?",
  "What is still unknown?",
];

export function BeforeYouChoose() {
  return (
    <section className="py-10 bg-mist-light">
      <Container>
        <div className="flex flex-col gap-4.5">
          <div className="flex flex-col gap-2">
            <Eyebrow>Before you choose</Eyebrow>
            <h2 className="font-display text-[36px] leading-[0.95] text-ink uppercase lg:text-[48px]">What to check before you choose.</h2>
            <p className="text-[15px] leading-[1.6] text-ink-soft">
              A useful profile separates verified facts, public claims and missing information. Nothing on whyvote is an
              endorsement.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(240px,100%),1fr))] gap-4">
            {CHECKS.map(([title, body], i) => (
              <div key={title} className="bg-white rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <p className="text-[13px] leading-[1.6] text-green">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-display text-[26px] leading-[0.95] text-ink">{title}</h3>
                  <p className="text-[14px] leading-[1.6] text-ink-soft">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-lime rounded-lg py-5.5 px-4.5 flex flex-col gap-3.5 lg:py-7 lg:px-8">
            <h3 className="font-display text-[32px] leading-[0.95] text-ink uppercase lg:text-[40px]">Ask better questions.</h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(220px,100%),1fr))] gap-2.5">
              {QUESTIONS.map((q) => (
                <p key={q} className="text-[16px] font-semibold py-3 px-3.5 bg-white/60 rounded-md">
                  {q}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
