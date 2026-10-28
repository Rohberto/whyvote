import Link from "next/link";
import type { ComponentProps } from "react";

export type ButtonVariant = "primary" | "soft" | "sun" | "mint" | "outline" | "white" | "ghost-light";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 min-h-11 rounded-sm border-2 font-semibold no-underline transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2.5 text-[14px]",
  md: "px-6 py-3.5 text-[15px]",
  lg: "px-7.5 py-[17px] text-[16px]",
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-green border-green text-white hover:bg-ink hover:border-ink hover:text-white",
  soft: "bg-mist border-mist text-ink hover:bg-mist-deep hover:border-mist-deep hover:text-ink",
  sun: "bg-sun border-sun text-ink hover:bg-[#E0B020] hover:border-[#E0B020] hover:text-ink",
  mint: "bg-mint border-mint text-ink hover:bg-[#45C26E] hover:border-[#45C26E] hover:text-ink",
  outline: "bg-white border-ink text-ink hover:bg-mist hover:text-ink",
  white: "bg-white border-white text-ink hover:bg-mist hover:border-mist hover:text-ink",
  "ghost-light": "bg-transparent border-white/60 text-white hover:bg-white/10 hover:text-white",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return [base, sizes[size], variants[variant], className].filter(Boolean).join(" ");
}

type Common = { variant?: ButtonVariant; size?: ButtonSize };

type ButtonLinkProps = Common & Omit<ComponentProps<"a">, "href"> & { href: string };

/** A link styled as a button. Internal paths use client-side navigation. */
export function ButtonLink({ variant, size, className, href, ...props }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  if (href.startsWith("/")) {
    return <Link href={href} className={classes} {...props} />;
  }
  return <a href={href} className={classes} {...props} />;
}

type ButtonProps = Common & ComponentProps<"button">;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
