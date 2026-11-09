import type { ReactNode } from "react";
import { PROFILE_CONTENT, PROFILE_SECTIONS, type ProfileContent, type SourcedItem } from "@/lib/profile-content";

const info = (
  <svg className="flex-none" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#43574A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 7.5v.5" />
  </svg>
);

export function EmptySection({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 items-start bg-mist-light border border-dashed border-line rounded-md p-4">
      {info}
      <p className="text-[15px] leading-[1.55] text-ink-soft">{children}</p>
    </div>
  );
}

function Items({ items }: { items: SourcedItem[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((it) => (
        <li key={it.title} className="bg-white border border-line rounded-md p-4 flex flex-col gap-1.5">
          <div className="flex flex-wrap gap-2 items-center">
            <b className="text-[16px]">{it.title}</b>
            {it.outcome && (
              <span className="inline-flex items-center py-[3px] px-2.5 rounded-full bg-mist text-ink-soft text-[12px] font-semibold tracking-[0.4px] uppercase">
                {it.outcome}
              </span>
            )}
          </div>
          {it.detail && <p className="text-[15px] leading-[1.6] text-ink-soft">{it.detail}</p>}
          <a className="text-[13px] font-semibold" href={it.source.url} target="_blank" rel="noopener">
            Source: {it.source.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Past offices, Manifesto, Accomplishments and Controversies, always in that order.
 * `custom` lets an editorial page supply its own markup for a section.
 */
export function ProfileSections({
  id,
  custom = {},
  idPrefix = "s",
  only,
}: {
  id: string;
  custom?: Partial<Record<keyof ProfileContent, ReactNode>>;
  idPrefix?: string;
  /** Render just these sections (editorial pages place them between their own sections). */
  only?: (keyof ProfileContent)[];
}) {
  const content = PROFILE_CONTENT[id] ?? {};
  return (
    <>
      {PROFILE_SECTIONS.filter((s) => !only || only.includes(s.key)).map((s) => {
        const items = content[s.key];
        return (
          <section key={s.key} className="flex flex-col gap-2.5" aria-labelledby={`${idPrefix}-${s.key}`}>
            <h2 className="mt-3.5 font-display text-[32px]" id={`${idPrefix}-${s.key}`}>
              {s.title}
            </h2>
            {custom[s.key] ?? (items?.length ? <Items items={items} /> : <EmptySection>{s.empty}</EmptySection>)}
          </section>
        );
      })}
    </>
  );
}
