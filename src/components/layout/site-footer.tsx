import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS, OFFICIAL_SOURCES } from "@/components/layout/nav";
import logo from "@/assets/logo.png";

// TODO: replace with the real PoliZ social profiles.
const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M4 4l16 16M20 4L4 20" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M6 10v8M6 6v.5M10 18v-8M10 13c0-2 1.5-3 3.5-3s3.5 1 3.5 3.5V18" />
      </svg>
    ),
  },
];

const headingClass = "mb-3.5 font-display text-[20px]";
const linkClass = "text-ink no-underline text-[14px] hover:underline";

export function SiteFooter() {
  return (
    <footer className="bg-mist mt-2 lg:mt-4">
      <div className="mx-auto max-w-[1240px] px-5 pt-11 pb-8 lg:pt-16 lg:pb-10">
        <div className="flex flex-wrap gap-10 justify-between">
          <div className="flex-[1_1_300px] flex flex-col gap-4 items-start">
            <Image src={logo} alt="whyvote" className="block h-9.5 w-auto" />
            <p className="text-[14px] leading-[1.6] text-ink-soft max-w-[320px]">
              Civic infrastructure for young Nigerians, built by PoliZ. Two Saturdays. Five offices. Your future.
            </p>
          </div>
          <div className="flex flex-wrap gap-12">
            <div>
              <h3 className={headingClass}>The site</h3>
              <ul className="flex flex-col gap-2.5">
                {[{ label: "Home", href: "/" }, ...NAV_ITEMS].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={headingClass}>Official sources</h3>
              <ul className="flex flex-col gap-2.5">
                {OFFICIAL_SOURCES.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex gap-1.5 items-center`}>
                      {item.label}
                      <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none">
                        <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                      </svg>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={headingClass}>Contact</h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a href="mailto:ijoba@poliz.ng" className={linkClass}>
                    ijoba@poliz.ng
                  </a>
                </li>
                <li>
                  <a href="https://poliz.ng" className={linkClass}>
                    poliz.ng
                  </a>
                </li>
                <li className="text-[14px]">Lagos, Nigeria</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-9 pt-6 border-t border-line flex flex-wrap gap-5 items-center justify-between">
          <p className="text-[13px] leading-[1.6] text-ink-soft max-w-[640px]">
            whyvote does not support, oppose, endorse or rank any political party or candidate, and takes no money from
            parties or candidates. The only ask is that you vote. We never ask who for.
          </p>
          <div className="flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-11 h-11 rounded-sm bg-white border border-line inline-flex items-center justify-center text-ink hover:bg-mist-deep"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
