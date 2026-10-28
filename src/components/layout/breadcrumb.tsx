import Link from "next/link";
import { Fragment } from "react";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-mist">
      <ol className="mx-auto max-w-[1240px] px-5 py-3 flex flex-wrap gap-2 text-[13px] uppercase tracking-[0.6px]">
        {items.map((item, i) => (
          <Fragment key={item.label}>
            {i > 0 && (
              <li aria-hidden="true" className="text-ink-faint">
                /
              </li>
            )}
            <li>
              {item.href ? (
                <Link href={item.href} className="text-ink-soft no-underline hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink font-semibold">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
