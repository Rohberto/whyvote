import type { ComponentProps } from "react";

/** Centred 1200px content column with the site's side gutter. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={["mx-auto max-w-[1240px] px-5", className].filter(Boolean).join(" ")} {...props} />;
}
