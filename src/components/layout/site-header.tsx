"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { activeItem, NAV_ITEMS, sectionLabel } from "@/components/layout/nav";
import logo from "@/assets/logo.png";
import logoLight from "@/assets/logo-light.png";

type Props = {
  firstVote: string;
  secondVote: string;
};

export function SiteHeader({ firstVote, secondVote }: Props) {
  const pathname = usePathname();
  const current = activeItem(pathname);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  // Routes stay mounted (hidden) after navigation, so close the menu whenever this page is hidden.
  useLayoutEffect(() => () => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const trigger = menuButton.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="bg-white border-b border-line">
      {/* Desktop */}
      <div className="mx-auto max-w-[1240px] px-5 py-4 hidden lg:flex flex-wrap gap-4 items-center justify-between">
        <Link href="/" aria-label="whyvote home" className="no-underline">
          <Image src={logo} alt="whyvote" priority className="block h-8 w-auto" />
        </Link>
        <nav aria-label="Main" className="flex flex-wrap border border-line rounded-sm overflow-hidden">
          {NAV_ITEMS.map((item) => {
            const isActive = current?.href === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "px-3.5 py-2.5 text-[14px] no-underline text-ink border-r border-line hover:text-ink",
                  isActive ? "font-bold bg-lime" : "font-medium hover:bg-mist",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <ButtonLink href="/pledge" variant="sun" size="sm">
          Take the pledge
        </ButtonLink>
      </div>

      {/* Mobile */}
      <div className="flex lg:hidden items-center justify-between px-5 py-3.5">
        <Link href="/" aria-label="whyvote home" className="no-underline">
          <Image src={logo} alt="whyvote" priority className="block h-6 w-auto" />
        </Link>
        <button
          ref={menuButton}
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 min-h-11 px-3.5 rounded-sm bg-mist text-ink text-[14px] font-semibold cursor-pointer"
        >
          {sectionLabel(pathname)}
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 overflow-y-auto bg-night text-white flex flex-col lg:hidden"
        >
          <div className="flex items-center justify-between px-5 py-3.5">
            <Link href="/" aria-label="whyvote home" onClick={close} className="no-underline">
              <Image src={logoLight} alt="whyvote" className="block h-6.5 w-auto" />
            </Link>
            <button
              ref={closeButton}
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="w-11 h-11 rounded-sm bg-white/10 text-white inline-flex items-center justify-center cursor-pointer"
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav aria-label="Main" className="px-5 py-3 flex flex-col">
            {[{ label: "Home", href: "/" }, ...NAV_ITEMS].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={(item.href === "/" ? pathname === "/" : current?.href === item.href) ? "page" : undefined}
                className="flex justify-between items-center min-h-15 box-content border-b border-white/14 text-white no-underline font-display text-[34px] hover:text-lime"
              >
                {item.label}
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E3F07A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </nav>
          <div className="p-5 flex flex-col gap-3">
            <ButtonLink href="/pledge" variant="sun" size="lg" onClick={close}>
              Take the pledge
            </ButtonLink>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white/8 rounded-md p-3.5">
                <span className="text-[12px] text-sage-light">First vote</span>
                <p className="mt-0.5 font-display text-[22px]">{firstVote}</p>
              </div>
              <div className="bg-white/8 rounded-md p-3.5">
                <span className="text-[12px] text-sage-light">Second vote</span>
                <p className="mt-0.5 font-display text-[22px]">{secondVote}</p>
              </div>
            </div>
            <p className="mt-2 text-[12px] text-sage-light leading-[1.5]">
              whyvote does not endorse any party or candidate. We never ask who you vote for.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
