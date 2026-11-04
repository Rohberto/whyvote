import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PledgeBand } from "@/components/layout/pledge-band";
import checklist from "@/assets/checklist.webp";
import { ReadyChecklist } from "@/components/get-ready/ready-checklist";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Get ready",
  description:
    "Six things to sort out before January: registration, your PVC, your polling unit and both election dates.",
  path: "/get-ready",
});

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
                  <span className="text-[15px] leading-[1.6] text-ink-soft">Polls usually open from 8:30am. Arriving early means a shorter queue and a calmer unit.</span>
                </span>
              </li>
              <li className="flex gap-4 py-4.5 border-b border-b-line">
                <span className="w-10 h-10 rounded-full bg-lime inline-flex items-center justify-center flex-none font-display text-[20px]">2</span>
                <span className="flex flex-col gap-1">
                  <b className="text-[18px]">Find your unit and join the queue</b>
                  <span className="text-[15px] leading-[1.6] text-ink-soft">
                    Officials will direct you. The list of voters for each unit is normally posted at the polling unit, so check it for your name. Do not join a queue for a different unit, because you cannot vote there.
                  </span>
                </span>
              </li>
              <li className="flex gap-4 py-4.5 border-b border-b-line">
                <span className="w-10 h-10 rounded-full bg-lime inline-flex items-center justify-center flex-none font-display text-[20px]">3</span>
                <span className="flex flex-col gap-1">
                  <b className="text-[18px]">Get accredited</b>
                  <span className="text-[15px] leading-[1.6] text-ink-soft">
                    An official scans your PVC and verifies you with the BVAS machine, using your fingerprint or your face. This is accreditation. It proves that you are you, and that you have not already voted.
                  </span>
                </span>
              </li>
              <li className="flex gap-4 py-4.5 border-b border-b-line">
                <span className="w-10 h-10 rounded-full bg-lime inline-flex items-center justify-center flex-none font-display text-[20px]">4</span>
                <span className="flex flex-col gap-1">
                  <b className="text-[18px]">Collect your ballot papers</b>
                  <span className="text-[15px] leading-[1.6] text-ink-soft">
                    On 16 January, you will receive three ballot papers, one each for President, Senate and House of Representatives. On 6 February, you will receive two, one each for Governor and State House of Assembly. Check that each is stamped and signed.
                  </span>
                </span>
              </li>
              <li className="flex gap-4 py-4.5 border-b border-b-line">
                <span className="w-10 h-10 rounded-full bg-lime inline-flex items-center justify-center flex-none font-display text-[20px]">5</span>
                <span className="flex flex-col gap-1">
                  <b className="text-[18px]">Vote in the booth, alone</b>
                  <span className="text-[15px] leading-[1.6] text-ink-soft">
                    Press your inked thumb inside the box of the party you choose, once on each paper. Keep your whole thumbprint inside that one box. If it touches the row above or below, the vote will be rendered invalid.
                  </span>
                  <span className="text-[15px] leading-[1.6] text-ink-soft mt-2">
                    When you fold the paper, be careful that the wet ink does not stain another row. Give it a moment to dry first. There is no need to photograph your ballot.
                  </span>
                </span>
              </li>
              <li className="flex gap-4 py-4.5 border-b border-b-line">
                <span className="w-10 h-10 rounded-full bg-lime inline-flex items-center justify-center flex-none font-display text-[20px]">6</span>
                <span className="flex flex-col gap-1">
                  <b className="text-[18px]">Drop each paper in the right box</b>
                  <span className="text-[15px] leading-[1.6] text-ink-soft">
                    On 16 January there will be three ballot boxes, one for each of your three ballot papers. Put each paper in its own box. If you put the presidential paper in the Senate box, that vote can be ruled invalid.
                  </span>
                  <span className="text-[15px] leading-[1.6] text-ink-soft mt-2">
                    The boxes are labelled and colour coded to match the papers: in recent elections,{" "}
                    <b className="text-ink">red</b>
                    {" "}was for President,{" "}
                    <b className="text-ink">black</b>
                    {" "}for Senate and{" "}
                    <b className="text-ink">green</b>
                    {" "}for House of Representatives. Match the colour on your paper to the colour of the box lid, and read the label.
                  </span>
                  <span className="text-[15px] leading-[1.6] text-ink-soft mt-2">
                    On 6 February, it is two boxes, Governor and State House of Assembly. If you are unsure, ask the official standing by the boxes before you drop your paper.
                  </span>
                </span>
              </li>
              <li className="flex gap-4 py-4.5 border-b border-b-line">
                <span className="w-10 h-10 rounded-full bg-lime inline-flex items-center justify-center flex-none font-display text-[20px]">7</span>
                <span className="flex flex-col gap-1">
                  <b className="text-[18px]">Stay for the count</b>
                  <span className="text-[15px] leading-[1.6] text-ink-soft">
                    At the close of voting, the INEC officials count the votes right there at your polling unit, in front of everyone.
                  </span>
                  <span className="text-[15px] leading-[1.6] text-ink-soft mt-2">
                    They open each ballot box, sort the papers into a pile for each party, then count each pile out loud, holding each paper up so people watching can see it.
                  </span>
                  <span className="text-[15px] leading-[1.6] text-ink-soft mt-2">
                    The result for your unit is written on a form called EC8A, read out, pasted up at the polling unit and uploaded online for the public to see. You are allowed to stay and watch the whole count. It is the most useful hour you can spend after you vote.
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
                {" "}It is important to have the refusal recorded. Ask the presiding officer to write it down, and note your polling unit code.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-3">
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">Your name is not on the register at that unit</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">
                    First, confirm your polling unit again on INEC’s polling unit locator, using the code on the back of your PVC. In most cases, the person is simply at the wrong unit. If the locator shows you are at the right unit, ask the presiding officer to check the register for your name.
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
                    You cannot vote without it. There is no substitute document. This is why collection matters.
                  </p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">An official simply refuses you</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">
                    Ask for the reason to be officially recorded. Take the presiding officer’s name and the polling unit code. Then report it, calmly, to INEC’s contact channels and to any accredited observers present.
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
                  <p className="text-[15px] leading-[1.6] text-ink-soft">There is no way to vote without it, and there is no replacement or backup on the day.</p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">A charged phone and a power bank</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">
                    So you can reach INEC or the security agencies if you need to report something. You can also stay in touch with family and friends, and keep yourself busy, because you may be there for a while.
                  </p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">Water and something small to eat</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">
                    The queues might run for hours, and you will need to eat and drink while you wait for the count.
                  </p>
                </div>
              </div>
              <div className="bg-mist rounded-md p-6">
                <div className="flex flex-col gap-2">
                  <b className="text-[17px]">Cap, umbrella or hat</b>
                  <p className="text-[15px] leading-[1.6] text-ink-soft">January and February are hot, and the queue might have no shade.</p>
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
