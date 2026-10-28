"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export function NumbersCarousel() {
  const [slide, setSlide] = useState(0);
  const [sl0, sl1, sl2] = [slide === 0, slide === 1, slide === 2];
  const pos = `${slide + 1} / 3`;
  const prev = () => setSlide((s) => (s + 2) % 3);
  const next = () => setSlide((s) => (s + 1) % 3);

  return (
    <section className="py-10 bg-mist-light lg:py-18">
      <Container>
        <div className="flex items-center justify-between gap-4 flex-wrap mb-7">
          <h2 className="font-display text-[32px] leading-[0.95] text-ink lg:text-[44px]">The numbers tell a story.</h2>
          <div className="flex items-center gap-2.5">
            <button className="w-11 h-11 rounded-full border-0 bg-mist text-ink inline-flex items-center justify-center cursor-pointer" type="button" onClick={prev} aria-label="Previous">
              <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
            </button>
            <span className="text-[13px] text-ink-soft min-w-8.5 text-center">{pos}</span>
            <button className="w-11 h-11 rounded-full border-0 bg-ink text-white inline-flex items-center justify-center cursor-pointer" type="button" onClick={next} aria-label="Next">
              <svg className="flex-none" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
        <div className="bg-white border border-line rounded-lg py-7 px-5.5 lg:py-12 lg:px-14">
          {sl0 && (
            <>
              <div className="flex flex-wrap gap-10 items-center">
                <div className="flex-[1_1_340px] flex flex-col gap-3.5">
                  <h2 className="font-display text-[88px] leading-[0.95] text-[#8A6400] lg:text-[120px]">6.2m</h2>
                  <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[38px]">PVCs have not been collected</h2>
                  <p className="text-[16px] leading-[1.6] text-ink-soft">
                    Over 6 million registered voters have not collected their Permanent Voter Cards (PVCs), meaning they could not vote even if they wanted to.
                  </p>
                  <div className="mt-1.5">
                    <ButtonLink variant="mint" href="/pledge">Take the pledge</ButtonLink>
                  </div>
                </div>
                <div className="flex-[1_1_340px] flex flex-wrap gap-6 items-center">
                  <div className="flex-[0_0_220px] grid grid-cols-[repeat(10,minmax(0,1fr))] gap-[5px] lg:flex-[0_0_260px] lg:gap-[7px]" role="img" aria-label="100 dots for every 100 registered voters in 2023: 27 voted, 7 had no PVC, 66 had a PVC and did not vote">
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-brand" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                  </div>
                  <div className="flex-[1_1_180px] flex flex-col gap-3">
                    <p className="font-display text-[40px] leading-[0.95] text-ink lg:text-[48px]">
                      73 in 100{" "}
                      <span className="text-ink-soft">did not vote in 2023</span>
                    </p>
                    <div className="flex gap-2.5 items-start">
                      <i className="w-3.5 h-3.5 rounded-full bg-brand flex-none mt-1" />
                      <span className="text-[14px] leading-[1.45] text-ink-soft">
                        <b className="text-ink">27</b>
                        {" "}voted
                      </span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <i className="w-3.5 h-3.5 rounded-full bg-sun flex-none mt-1" />
                      <span className="text-[14px] leading-[1.45] text-ink-soft">
                        <b className="text-ink">7</b>
                        {" "}never collected their PVC
                      </span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <i className="w-3.5 h-3.5 rounded-full bg-line-soft flex-none mt-1" />
                      <span className="text-[14px] leading-[1.45] text-ink-soft">
                        <b className="text-ink">66</b>
                        {" "}had a PVC and stayed home
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {sl1 && (
            <>
              <div className="flex flex-wrap gap-10 items-center">
                <div className="flex-[1_1_340px] flex flex-col gap-3.5">
                  <h2 className="font-display text-[88px] leading-[0.95] text-[#8A6400] lg:text-[120px]">39.7%</h2>
                  <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[38px]">of registered voters are aged 18 to 34</h2>
                  <p className="text-[16px] leading-[1.6] text-ink-soft">
                    Young people are the largest share of Nigeria’s register. Many still did not show up on election day.
                  </p>
                  <div className="mt-1.5">
                    <ButtonLink variant="mint" href="/pledge">Take the pledge</ButtonLink>
                  </div>
                </div>
                <div className="flex-[1_1_340px] flex flex-wrap gap-6 items-center">
                  <div className="flex-[0_0_220px] grid grid-cols-[repeat(10,minmax(0,1fr))] gap-[5px] lg:flex-[0_0_260px] lg:gap-[7px]" role="img" aria-label="100 dots for the 2023 register: 40 aged 18 to 34">
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-sun" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                    <i className="block aspect-square rounded-full bg-line-soft" />
                  </div>
                  <div className="flex-[1_1_180px] flex flex-col gap-3">
                    <p className="font-display text-[40px] leading-[0.95] lg:text-[48px]">
                      40 in 100{" "}
                      <span className="text-ink-soft">on the register were young</span>
                    </p>
                    <div className="flex gap-2.5 items-center">
                      <i className="w-3.5 h-3.5 rounded-full bg-sun" />
                      <span className="text-[14px] text-ink-soft">Aged 18 to 34, in 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {sl2 && (
            <>
              <div className="flex flex-wrap gap-10 items-center">
                <div className="flex-[1_1_340px] flex flex-col gap-3.5">
                  <h2 className="font-display text-[88px] leading-[0.95] text-[#8A6400] lg:text-[120px]">27 in 100</h2>
                  <h2 className="font-display text-[30px] leading-[0.95] text-ink lg:text-[38px]">registered voters showed up in 2023</h2>
                  <p className="text-[16px] leading-[1.6] text-ink-soft">
                    The lowest turnout since 1999. It told every party that a small, paid base is enough to win. The same plan is in the 2027 campaigns if you stay home.
                  </p>
                  <div className="mt-1.5">
                    <ButtonLink variant="mint" href="/pledge">Take the pledge</ButtonLink>
                  </div>
                </div>
                <div className="flex-[1_1_320px] flex gap-3.5 items-end min-h-[200px] lg:min-h-[260px]" role="img" aria-label="Presidential election turnout: 2011 53.68%, 2015 43.65%, 2019 34.75%, 2023 26.71%">
                  <div className="flex flex-col justify-end items-center gap-1.5 flex-1">
                    <span className="text-[14px] font-bold text-ink">53.68%</span>
                    <span className="w-full h-[161px] bg-[#B9DCC2] rounded-[3px_3px_0_0] lg:h-[215px]" />
                    <span className="text-[13px] text-ink-soft">2011</span>
                  </div>
                  <div className="flex flex-col justify-end items-center gap-1.5 flex-1">
                    <span className="text-[14px] font-bold text-ink">43.65%</span>
                    <span className="w-full h-[131px] bg-[#B9DCC2] rounded-[3px_3px_0_0] lg:h-[175px]" />
                    <span className="text-[13px] text-ink-soft">2015</span>
                  </div>
                  <div className="flex flex-col justify-end items-center gap-1.5 flex-1">
                    <span className="text-[14px] font-bold text-ink">34.75%</span>
                    <span className="w-full h-[104px] bg-[#B9DCC2] rounded-[3px_3px_0_0] lg:h-[139px]" />
                    <span className="text-[13px] text-ink-soft">2019</span>
                  </div>
                  <div className="flex flex-col justify-end items-center gap-1.5 flex-1">
                    <span className="text-[14px] font-bold text-ink">26.71%</span>
                    <span className="w-full h-20 bg-sun rounded-[3px_3px_0_0] lg:h-[107px]" />
                    <span className="text-[13px] text-ink-soft">2023</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="mt-9">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(170px,100%),1fr))] gap-5">
            <div className="border-t-3 border-t-ink pt-3">
              <h2 className="font-display text-[40px] leading-[0.95] text-ink lg:text-[48px]">103.4m</h2>
              <p className="mt-1.5 text-[14px] text-ink-soft">Registered voters for 2027</p>
            </div>
            <div className="border-t-3 border-t-ink pt-3">
              <h2 className="font-display text-[40px] leading-[0.95] text-ink lg:text-[48px]">24.9m</h2>
              <p className="mt-1.5 text-[14px] text-ink-soft">Votes cast in 2023</p>
            </div>
            <div className="border-t-3 border-t-ink pt-3">
              <h2 className="font-display text-[40px] leading-[0.95] text-ink lg:text-[48px]">26.7%</h2>
              <p className="mt-1.5 text-[14px] text-ink-soft">Turnout in 2023, the lowest since 1999</p>
            </div>
            <div className="border-t-3 border-t-ink pt-3">
              <h2 className="font-display text-[40px] leading-[0.95] text-ink lg:text-[48px]">6.2m</h2>
              <p className="mt-1.5 text-[14px] text-ink-soft">PVCs not collected</p>
            </div>
            <div className="border-t-3 border-t-ink pt-3">
              <h2 className="font-display text-[40px] leading-[0.95] text-ink lg:text-[48px]">39.7%</h2>
              <p className="mt-1.5 text-[14px] text-ink-soft">Of the 2023 register aged 18 to 34</p>
            </div>
          </div>
        </div>
        <p className="mt-3.5 text-[12px] leading-[1.6] text-ink-faint">
          Source: INEC. The 2027 register figure is from INEC’s October 2026 update, before the final register is published.
        </p>
      </Container>
    </section>
  );
}
