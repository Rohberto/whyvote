import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Tabs, TabList, TabPanel, TabStepper } from "@/components/ui/tabs";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PledgeBand } from "@/components/layout/pledge-band";

export const metadata: Metadata = {
  title: "Who does what",
  description:
    "What the President, Senators, House of Representatives members, Governors and State House of Assembly members actually control.",
};

export default function OfficesPage() {
  return (
    <>
      <section className="pt-9 pb-7 lg:pt-16 lg:pb-10">
        <Container>
          <div className="flex flex-col gap-4.5">
            <Eyebrow>Who does what</Eyebrow>
            <h1 className="font-display text-[52px] leading-[0.95] text-ink uppercase lg:text-[84px]">Who controls what on your street.</h1>
            <p className="text-[17px] leading-[1.6] text-ink-soft max-w-[640px] lg:text-[19px]">
              Five offices. Here is what each one has power over, what money it touches, and what it decides about your road, your clinic and your school.
            </p>
          </div>
        </Container>
      </section>
      <section className="pb-10">
        <Container>
          <Tabs count={5}>
          <TabList label="Offices" className="flex gap-2 overflow-x-auto pb-1.5 mb-7 lg:overflow-x-visible lg:pb-0 lg:flex-wrap" tabs={["President", "Senator", "Member, House of Representatives", "Governor", "State House of Assembly member"]} />
          <TabStepper noun="office" className="flex items-center gap-3 -mt-3 mb-6 lg:hidden" names={["President", "Senator", "House of Reps", "Governor", "State Assembly"]} />
          <TabPanel index={0} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5 items-start">
              <Chip>16 Jan 2027</Chip>
              <h2 className="font-display text-[44px] leading-[0.95] text-ink lg:text-[64px]">President</h2>
              <p className="text-[16px] leading-[1.6] text-ink-soft max-w-[680px]">
                One for the whole country, elected with a Vice President. Four year term, maximum two terms. On the ballot 16 January 2027.
              </p>
            </div>
            <div className="flex flex-wrap gap-3.5">
              <div className="bg-mist rounded-md p-5 flex-[1_1_260px] box-content">
                <h3 className="mb-3 font-display text-[24px]">Powers</h3>
                <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                  <li>Heads the federal executive and appoints ministers, subject to Senate confirmation</li>
                  <li>Commander-in-chief of the armed forces</li>
                  <li>Signs or refuses federal bills</li>
                  <li>
                    Appoints service chiefs, ambassadors and heads of federal agencies, many subject to Senate confirmation
                  </li>
                  <li>Sets national economic and foreign policy</li>
                </ul>
              </div>
              <div className="bg-mist rounded-md p-5 flex-[1_1_260px] box-content">
                <h3 className="mb-3 font-display text-[24px]">Money</h3>
                <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                  <li>Proposes the federal budget to the National Assembly</li>
                  <li>Controls federal spending once the budget is passed</li>
                  <li>Oversees federal revenue agencies such as FIRS and Customs</li>
                  <li>Leads federal borrowing, subject to approval</li>
                </ul>
              </div>
              <div className="bg-warn-pale rounded-md p-5 flex-[1_1_260px] box-content">
                <h3 className="mb-3 font-display text-[24px]">On your street</h3>
                <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                  <li>Fuel and exchange rate policy</li>
                  <li>Federal roads, rail and power</li>
                  <li>Federal universities and teaching hospitals</li>
                  <li>The police, the military and national security</li>
                  <li>Student loans and federal social programmes</li>
                </ul>
              </div>
            </div>
            <div className="bg-ink text-white rounded-md py-5 px-5.5 flex gap-3.5 items-start">
              <svg className="flex-none" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E3F07A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              <p className="text-[17px] leading-[1.5] font-medium">
                If it is national policy, the economy, or a federal agency failing everywhere at once, this is the office.
              </p>
            </div>
            <div>
              <ButtonLink href="/ballot">See who is running for this office</ButtonLink>
            </div>
          </TabPanel>
          <TabPanel index={1} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5 items-start">
              <Chip>16 Jan 2027</Chip>
              <h2 className="font-display text-[44px] leading-[0.95] text-ink lg:text-[64px]">Senator</h2>
              <p className="text-[16px] leading-[1.6] text-ink-soft max-w-[680px]">
                109 in total. Three per state plus one for the FCT. Four year term. On the ballot 16 January 2027.
              </p>
            </div>
            <div className="flex flex-wrap gap-3.5">
              <div className="bg-mist rounded-md p-5 flex-[1_1_260px] box-content">
                <h3 className="mb-3 font-display text-[24px]">Powers</h3>
                <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                  <li>Makes federal law alongside the House of Representatives</li>
                  <li>
                    Confirms ministers, ambassadors, service chiefs, judges, the CBN governor and INEC commissioners
                  </li>
                  <li>Oversight of every federal ministry, department and agency, with power to summon</li>
                  <li>Part of the process for removing a president or vice president</li>
                  <li>Must approve a state of emergency</li>
                </ul>
              </div>
              <div className="bg-mist rounded-md p-5 flex-[1_1_260px] box-content">
                <h3 className="mb-3 font-display text-[24px]">Money</h3>
                <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                  <li>Approves the entire federal budget before it can be spent</li>
                  <li>Inserts constituency projects, formally zonal intervention projects, into that budget</li>
                  <li>Scrutinises the spending of every federal agency after the fact</li>
                </ul>
              </div>
              <div className="bg-warn-pale rounded-md p-5 flex-[1_1_260px] box-content">
                <h3 className="mb-3 font-display text-[24px]">On your street</h3>
                <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                  <li>The federal road that runs through your town</li>
                  <li>The federal university, federal medical centre or polytechnic near you</li>
                  <li>Whether the police, army and customs are funded and how</li>
                  <li>The tax law that governs your salary and your airtime</li>
                  <li>The boreholes, transformers and skill kits that appear with a name on them</li>
                </ul>
              </div>
            </div>
            <div className="bg-ink text-white rounded-md py-5 px-5.5 flex gap-3.5 items-start">
              <svg className="flex-none" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E3F07A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              <p className="text-[17px] leading-[1.5] font-medium">
                If it is a federal road, a federal agency, or a national law, this office approved the money for it.
              </p>
            </div>
            <div>
              <ButtonLink href="/ballot">See who is running for this office</ButtonLink>
            </div>
          </TabPanel>
          <TabPanel index={2} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5 items-start">
              <Chip>16 Jan 2027</Chip>
              <h2 className="font-display text-[44px] leading-[0.95] text-ink lg:text-[64px]">Member, House of Representatives</h2>
              <p className="text-[16px] leading-[1.6] text-ink-soft max-w-[680px]">
                360 in total, one per federal constituency, so smaller and closer than a senator. Four year term. On the ballot 16 January 2027.
              </p>
            </div>
            <div className="flex flex-wrap gap-3.5">
              <div className="bg-mist rounded-md p-5 flex-[1_1_260px] box-content">
                <h3 className="mb-3 font-display text-[24px]">Powers</h3>
                <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                  <li>Makes federal law jointly with the Senate</li>
                  <li>Approves the federal budget</li>
                  <li>Oversight and investigation of federal agencies, including public hearings</li>
                  <li>Initiates the removal of a president or vice president</li>
                </ul>
              </div>
              <div className="bg-mist rounded-md p-5 flex-[1_1_260px] box-content">
                <h3 className="mb-3 font-display text-[24px]">Money</h3>
                <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                  <li>Same budget approval power as the Senate</li>
                  <li>Also allocated constituency projects inside the federal budget</li>
                  <li>Its committees decide how much each federal agency receives</li>
                </ul>
              </div>
              <div className="bg-warn-pale rounded-md p-5 flex-[1_1_260px] box-content">
                <h3 className="mb-3 font-display text-[24px]">On your street</h3>
                <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                  <li>The same federal roads and agencies, but for a much smaller area</li>
                  <li>Constituency projects: boreholes, transformers, classroom blocks, empowerment schemes</li>
                  <li>Public hearings that surface things the executive would rather bury</li>
                </ul>
              </div>
            </div>
            <div className="bg-ink text-white rounded-md py-5 px-5.5 flex gap-3.5 items-start">
              <svg className="flex-none" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E3F07A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              <p className="text-[17px] leading-[1.5] font-medium">
                Represents the smallest federal unit there is. If federal money never reaches your constituency, start here.
              </p>
            </div>
            <div>
              <ButtonLink href="/ballot">See who is running for this office</ButtonLink>
            </div>
          </TabPanel>
          <TabPanel index={3} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5 items-start">
              <Chip>6 Feb 2027</Chip>
              <h2 className="font-display text-[44px] leading-[0.95] text-ink lg:text-[64px]">Governor</h2>
              <p className="text-[16px] leading-[1.6] text-ink-soft max-w-[680px]">
                One per state. Four year term, maximum two terms. On the ballot 6 February 2027 in 28 states.
              </p>
            </div>
            <div className="flex flex-wrap gap-3.5">
              <div className="bg-mist rounded-md p-5 flex-[1_1_260px] box-content">
                <h3 className="mb-3 font-display text-[24px]">Powers</h3>
                <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                  <li>Runs the entire state executive and appoints all commissioners</li>
                  <li>Signs or refuses state bills</li>
                  <li>Holds all land in the state in trust and issues Certificates of Occupancy</li>
                  <li>
                    Chief security officer of the state, controls the security vote and the state’s relationship with police command
                  </li>
                  <li>Controls state universities, state polytechnics and the teaching hospital</li>
                </ul>
              </div>
              <div className="bg-mist rounded-md p-5 flex-[1_1_260px] box-content">
                <h3 className="mb-3 font-display text-[24px]">Money</h3>
                <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                  <li>Proposes the whole state budget, often hundreds of billions of naira</li>
                  <li>Receives the state’s federal allocation and internally generated revenue</li>
                  <li>Controls the state internal revenue service and the taxes it collects from you</li>
                  <li>Borrows on behalf of the state, subject to approval</li>
                </ul>
              </div>
              <div className="bg-warn-pale rounded-md p-5 flex-[1_1_260px] box-content">
                <h3 className="mb-3 font-display text-[24px]">On your street</h3>
                <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                  <li>The state road outside your estate</li>
                  <li>The general hospital and its drugs</li>
                  <li>Teachers’ salaries and whether they are striking</li>
                  <li>Your Certificate of Occupancy and how long it takes</li>
                  <li>State taxes, levies and the agberos collecting them</li>
                  <li>Flood control, drainage clearing and emergency response</li>
                </ul>
              </div>
            </div>
            <div className="bg-ink text-white rounded-md py-5 px-5.5 flex gap-3.5 items-start">
              <svg className="flex-none" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E3F07A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              <p className="text-[17px] leading-[1.5] font-medium">
                If the road is state road, the hospital is a general hospital, or the teachers have not been paid, this is the office.
              </p>
            </div>
            <div>
              <ButtonLink href="/ballot">See who is running for this office</ButtonLink>
            </div>
          </TabPanel>
          <TabPanel index={4} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5 items-start">
              <Chip>6 Feb 2027</Chip>
              <h2 className="font-display text-[44px] leading-[0.95] text-ink lg:text-[64px]">State House of Assembly member</h2>
              <p className="text-[16px] leading-[1.6] text-ink-soft max-w-[680px]">
                Around 990 nationwide, 24 to 40 per state, one per state constituency. Four year term. On the ballot 6 February 2027 in all 36 states.
              </p>
            </div>
            <div className="flex flex-wrap gap-3.5">
              <div className="bg-mist rounded-md p-5 flex-[1_1_260px] box-content">
                <h3 className="mb-3 font-display text-[24px]">Powers</h3>
                <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                  <li>Makes all state law</li>
                  <li>Confirms the governor’s commissioners and other nominees</li>
                  <li>Oversight of every state ministry and agency</li>
                  <li>Can impeach the governor</li>
                  <li>
                    Votes on amendments to the Nigerian Constitution, which cannot pass without the state assemblies
                  </li>
                </ul>
              </div>
              <div className="bg-mist rounded-md p-5 flex-[1_1_260px] box-content">
                <h3 className="mb-3 font-display text-[24px]">Money</h3>
                <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                  <li>Approves the state budget line by line, or waves it through</li>
                  <li>Approves state borrowing</li>
                  <li>Passes the law that governs how local governments in the state are run and funded</li>
                </ul>
              </div>
              <div className="bg-warn-pale rounded-md p-5 flex-[1_1_260px] box-content">
                <h3 className="mb-3 font-display text-[24px]">On your street</h3>
                <ul className="pl-4.5 flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft list-disc">
                  <li>The state education and health laws that govern your school and clinic</li>
                  <li>Land charge, tenement rates and market levies</li>
                  <li>Whether your local government is allowed to function</li>
                  <li>Whether the state budget is scrutinised or rubber stamped</li>
                </ul>
              </div>
            </div>
            <div className="bg-ink text-white rounded-md py-5 px-5.5 flex gap-3.5 items-start">
              <svg className="flex-none" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E3F07A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              <p className="text-[17px] leading-[1.5] font-medium">
                The most powerful office almost nobody can name. If the state budget is nonsense and nobody objected, this is who did not object.
              </p>
            </div>
            <div>
              <ButtonLink href="/ballot">See who is running for this office</ButtonLink>
            </div>
          </TabPanel>
          </Tabs>
        </Container>
      </section>
      <PledgeBand />
    </>
  );
}
