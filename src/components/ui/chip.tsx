import type { ComponentProps } from "react";

export type ChipTone = "lime" | "ink" | "white" | "mist" | "sky" | "mint" | "danger" | "warn" | "night";

const tones: Record<ChipTone, string> = {
  lime: "bg-lime text-ink",
  ink: "bg-ink text-white",
  white: "bg-white text-ink",
  mist: "bg-mist text-ink",
  sky: "bg-sky text-ink",
  mint: "bg-mint-pale text-ink",
  danger: "bg-danger-pale text-danger",
  warn: "bg-warn-pale text-warn",
  night: "bg-night text-white",
};

/** Small uppercase pill used for tags, dates and statuses. */
export function Chip({ tone = "lime", className, ...props }: ComponentProps<"span"> & { tone?: ChipTone }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-full text-[12px] font-semibold tracking-[0.4px] uppercase whitespace-nowrap",
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
