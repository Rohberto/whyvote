import type { ComponentProps } from "react";

/** Small uppercase label that sits above a heading. */
export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={["text-[12px] font-semibold tracking-[1.4px] uppercase text-green", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
