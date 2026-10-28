"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "en" | "pcm";

const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

/** Holds the English / Pidgin choice for the Why vote headlines. */
export function HeadlineLanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

/** Renders its children only while the given language is selected. */
export function InLang({ lang, children }: { lang: Lang; children: ReactNode }) {
  return useContext(LangContext).lang === lang ? children : null;
}

const toggle = "min-h-11 px-4.5 text-[14px] font-semibold cursor-pointer";

export function HeadlineLanguageToggle() {
  const { lang, setLang } = useContext(LangContext);
  return (
    <div className="inline-flex border-2 border-ink rounded-sm overflow-hidden" role="group" aria-label="Headline language">
      {(
        [
          ["en", "English"],
          ["pcm", "Pidgin"],
        ] as const
      ).map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => setLang(value)}
          aria-pressed={lang === value}
          className={`${toggle} ${lang === value ? "bg-forest text-white" : "bg-white text-forest hover:bg-mist"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
