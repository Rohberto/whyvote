"use client";

import { CHECKLIST_STEPS, useChecklist } from "@/lib/checklist";

/** Home page summary of the Get ready checklist saved on this device. */
export function ReadyProgress() {
  const { done, count, nextStep } = useChecklist();
  return (
    <div className="flex-[1.4_1_340px] bg-night text-white rounded-md p-6 flex flex-col gap-4 lg:p-8 box-content">
      <div className="flex items-baseline gap-2">
        <p className="font-display text-[72px] leading-[0.95] text-white">{count}</p>
        <span className="font-display text-[28px] text-sage-light">of {CHECKLIST_STEPS.length}</span>
      </div>
      <div className="flex gap-1.5" aria-hidden="true">
        {done.map((isDone, i) => (
          <i key={CHECKLIST_STEPS[i]} className={`flex-1 h-2 rounded-xs ${isDone ? "bg-mint" : "bg-white/18"}`} />
        ))}
      </div>
      {nextStep ? (
        <>
          <p className="text-[13px] text-sage-light uppercase tracking-[1px]">Next up</p>
          <p className="font-display text-[26px]">{nextStep}</p>
        </>
      ) : (
        <p className="font-display text-[26px]">All six done. See you on 16 January.</p>
      )}
      <p className="text-[14px] leading-[1.55] text-sage-pale">
        Six things to sort out before January. Tick them off as you go. Your progress stays on this device.
      </p>
    </div>
  );
}
