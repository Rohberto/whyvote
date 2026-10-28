import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PledgeBand } from "@/components/layout/pledge-band";
import checklist from "@/assets/checklist.webp";
import { ReadyChecklist } from "@/components/get-ready/ready-checklist";

export const metadata: Metadata = {
  title: "Get ready",
  description:
    "Six things to sort out before January: registration, your PVC, your polling unit and both election dates.",
};

export default function GetReadyPage() {
  return (
    <>
      <section className="pt-8 pb-6 lg:pt-14 lg:pb-8">
        <Container>
          <div className="flex flex-wrap gap-8 items-center">
            <div className="flex-[1_1_480px] flex flex-col gap-4.5">
              <Eyebrow>Get ready</Eyebrow>
              <h1 className="font-display text-[52px] leading-[0.95] text-ink uppercase lg:text-[84px]">Six things before January.</h1>
              <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:text-[19px]">
                Tick them off as you go. Then read what happens on the day, what to do if you are turned away, and what to bring.
              </p>
            </div>
            <div className="flex-[1_1_260px] flex justify-center">
              <Image src={checklist} alt="Clipboard checklist being ticked" className="w-[220px] h-auto rounded-lg lg:w-[300px]" />
            </div>
          </div>
        </Container>
      </section>
      <ReadyChecklist />
      <section className="py-10 bg-mist-light">
        <Container>
          <div className="flex flex-col gap-3">
            <Eyebrow>Election day</Eyebrow>
            <h2 className="font-display text-[36px] leading-[0.95] text-ink lg:text-[52px]">What happens at your polling unit</h2>
            <ol className="list-none">
              <li className="flex gap-4 py-4.5 border-b border-b-line">
                <span className="w-10 h-10 rounded-full bg-lime inline-flex items-center justify-center flex-none font-display text-[20px]">1</span>
                <span className="flex flex-col gap-1">
                  <b className="text-[18px]">Arrive early</b>
                  <span className="text-[15px] leading-[1.6] text-ink-soft">
                    Polls have opened at 8:30am in recent elections. Arriving early means a shorter queue and a calmer unit. Confirm the exact timing closer to the day, because the Electoral Act 2026 changed several procedural timelines.
                  </span>
                </span>
              </li>
              <li className="flex gap-4 py-4.5 border-b border-b-line">
                <span className="w-10 h-10 rounded-full bg-lime inline-flex items-center justify-center flex-none font-display text-[20px]">2</span>
                <span className="flex flex-col gap-1">
                  <b className="text-[18px]">Find your unit and join the queue</b>
                  <span className="text-[15px] leading-[1.6] text-ink-soft">
                    Officials will direct you. If your name is being read from a list, listen for it. Do not join a queue for a different unit, because you cannot vote there.
                  </span>
                </span>
              </li>
              <li className="flex gap-4 py-4.5 border-b border-b-line">
                <span className="w-10 h-10 rounded-full bg-lime inline-flex items-center justify-center flex-none font-display text-[20px]">3</span>
                <span className="flex flex-col gap-1">
                  <b className="text-[18px]">Get accredited</b>
                  <span className="text-[15px] leading-[1.6] text-ink-soft">
                    An official scans your PVC and verifies you with the BVAS machine, using your fingerprint or your face. This is accreditation. It proves you are you and that you have not already voted.
                  </span>
                </span>
              </li>
              <li className="flex gap-4 py-4.5 border-b border-b-line">
                <span className="w-10 h-10 rounded-full bg-lime inline-flex items-center justify-center flex-none font-display text-[20px]">4</span>
                <span className="flex flex-col gap-1">
                  <b className="text-[18px]">Collect your ballot papers</b>
                  <span className="text-[15px] leading-[1.6] text-ink-soft">
                    You will receive one paper per election being held that day. On 16 January that is three: President, Senate and House of Representatives. On 6 February it is two: Governor and State Assembly. Check that each is stamped and signed.
                  </span>
                </span>
              </li>
              <li className="flex gap-4 py-4.5 border-b border-b-line">
                <span className="w-10 h-10 rounded-full bg-lime inline-flex items-center justify-center flex-none font-display text-[20px]">5</span>
                <span className="flex flex-col gap-1">
                  <b className="text-[18px]">Vote in the booth, alone</b>
                  <span className="text-[15px] leading-[1.6] text-ink-soft">
                    Thumbprint inside the box of your choice, once per paper. A print that touches two boxes cancels that vote. Fold the paper so the mark is inside, and do not photograph it.
                  </span>
                </span>
              </li>
              <li className="flex gap-4 py-4.5 border-b border-b-line">
                <span className="w-10 h-10 rounded-full bg-lime inline-flex items-center justify-center flex-none font-display text-[20px]">6</span>
                <span className="flex flex-col gap-1">
                  <b className="text-[18px]">Drop each paper in the right box</b>
                  <span className="text-[15px] leading-[1.6] text-ink-soft">
                    There is a separate ballot box for each election. Putting the presidential paper in the Senate box destroys that vote.
                  </span>
                </span>
              </li>
              <li className="flex gap-4 py-4.5 border-b border-b-line">
                <span className="w-10 h-10 rounded-full bg-lime inline-flex items-center justify-center flex-none font-display text-[20px]">7</span>
                <span className="flex flex-col gap-1">
                  <b className="text-[18px]">Stay for the count</b>
                  <span className="text-[15px] leading-[1.6] text-ink-soft">
                    Counting happens at your polling unit, in public, at the close of polls. The result is announced aloud, written on form EC8A, pasted at the unit and uploaded. You are entitled to stand there and watch. This is the single most useful hour a voter can spend.
                  </span>
                </span>
              </li>
            </ol>
          </div>
        </Container>
      </section>
      <section className="py-10 lg:py-18">
        <Container>
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-[36px] leading-[0.95] text-ink lg:text-[52px]">If you are turned away</h2>
            <div className="flex gap-3 items-start bg-warn-pale rounded-md py-4 px-4.5">
              <svg className="flex-none" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8A6400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l10 18H2L12 3z" />
                <path d="M12 10v5M12 18v.5" />
              </svg>
              <p className="text-[15px] leading-[1.55]">
                <b>Do not walk away quietly.</b>
                {" "}A refusal nobody wrote down is invisible afterwards. Get it recorded and get the polling unit code.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-3">
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">Your name is not on the register at that unit</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">
                    Ask the presiding officer to check the unit you were transferred to or registered at. Bring out your PVC and read the polling unit code on the back. Most cases are people standing in the wrong unit.
                  </p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">The BVAS will not read your fingerprint</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">
                    There is a facial verification fallback. Ask for it by name. Officials are required to attempt it before refusing you.
                  </p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">You do not have your PVC</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">
                    You cannot vote without it. There is no substitute document. This is why collection matters in October, not January.
                  </p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">An official simply refuses you</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">
                    Ask for the reason to be entered in the polling unit diary. Take the presiding officer’s name and the polling unit code. Then report it, calmly, to INEC’s contact channels and to any accredited observers present.
                  </p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">Party agents or thugs try to stop you</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">
                    Do not argue and do not fight. Step back, find security or an accredited observer, and report it. Your safety comes first and a reported incident is evidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="pb-10">
        <Container>
          <div className="flex flex-col gap-4.5">
            <h2 className="font-display text-[36px] leading-[0.95] text-ink lg:text-[52px]">What to bring</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-3">
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">Your PVC</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">There is no way to vote without it and no replacement on the day.</p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">A charged phone and a power bank</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">For INEC’s contact lines, for reporting, and because you may be there a while.</p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">Water and something small to eat</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">Queues have run for hours in past elections.</p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">Cap, umbrella or hat</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">January and February are hot and the queue has no shade.</p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">No party colours, caps or wristbands</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">Campaigning at a polling unit is an offence and it will get you sent away.</p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">Your patience</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">Arguments at polling units are how units get shut down and results get cancelled.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(200px,100%),1fr))] gap-4">
              <div className="border-t-3 border-t-ink pt-2.5">
                <h2 className="font-display text-[34px] leading-[0.95] text-ink">8:30am</h2>
                <p className="mt-1 text-[14px] text-ink-soft">Polls opened in 2023</p>
              </div>
              <div className="border-t-3 border-t-ink pt-2.5">
                <h2 className="font-display text-[34px] leading-[0.95] text-ink">2:30pm</h2>
                <p className="mt-1 text-[14px] text-ink-soft">Close, but anyone already in the queue votes</p>
              </div>
              <div className="border-t-3 border-t-ink pt-2.5">
                <h2 className="font-display text-[34px] leading-[0.95] text-ink">Saturday</h2>
                <p className="mt-1 text-[14px] text-ink-soft">Both election days</p>
              </div>
              <div className="border-t-3 border-t-ink pt-2.5">
                <h2 className="font-display text-[34px] leading-[0.95] text-ink">Free</h2>
                <p className="mt-1 text-[14px] text-ink-soft">Voting costs nothing, ever</p>
              </div>
            </div>
            <p className="text-[12px] leading-[1.6] text-ink-faint">
              Timings are from the 2023 general election. The Electoral Act 2026 changed several timelines, so confirm final hours with INEC closer to the date.
            </p>
          </div>
        </Container>
      </section>
      <PledgeBand />
    </>
  );
}
