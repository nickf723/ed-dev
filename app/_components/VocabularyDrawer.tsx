"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import { BookOpen, Search, Tags, X } from "lucide-react";
import { findVocabularyScope } from "@/app/_data/vocab/compose";
import type {
  VocabTerm,
  VocabularyAccent,
  VocabularyScope,
} from "@/app/_data/vocab/types";

const ACCENT_STYLES: Record<
  VocabularyAccent,
  {
    button: string;
    icon: string;
    activeFilter: string;
    focus: string;
    border: string;
  }
> = {
  rose: {
    button:
      "border-rose-500/30 bg-neutral-950/95 text-rose-200 hover:border-rose-400/60 hover:bg-rose-950/40",
    icon: "text-rose-400",
    activeFilter: "border-rose-400/50 bg-rose-500/15 text-rose-100",
    focus: "focus:border-rose-400/60",
    border: "border-rose-500/20",
  },
  cyan: {
    button:
      "border-cyan-500/30 bg-neutral-950/95 text-cyan-200 hover:border-cyan-400/60 hover:bg-cyan-950/40",
    icon: "text-cyan-400",
    activeFilter: "border-cyan-400/50 bg-cyan-500/15 text-cyan-100",
    focus: "focus:border-cyan-400/60",
    border: "border-cyan-500/20",
  },
  violet: {
    button:
      "border-violet-500/30 bg-neutral-950/95 text-violet-200 hover:border-violet-400/60 hover:bg-violet-950/40",
    icon: "text-violet-400",
    activeFilter:
      "border-violet-400/50 bg-violet-500/15 text-violet-100",
    focus: "focus:border-violet-400/60",
    border: "border-violet-500/20",
  },
  sky: {
    button:
      "border-sky-500/30 bg-neutral-950/95 text-sky-200 hover:border-sky-400/60 hover:bg-sky-950/40",
    icon: "text-sky-400",
    activeFilter: "border-sky-400/50 bg-sky-500/15 text-sky-100",
    focus: "focus:border-sky-400/60",
    border: "border-sky-500/20",
  },
  emerald: {
    button:
      "border-emerald-500/30 bg-neutral-950/95 text-emerald-200 hover:border-emerald-400/60 hover:bg-emerald-950/40",
    icon: "text-emerald-400",
    activeFilter:
      "border-emerald-400/50 bg-emerald-500/15 text-emerald-100",
    focus: "focus:border-emerald-400/60",
    border: "border-emerald-500/20",
  },
  amber: {
    button:
      "border-amber-500/30 bg-neutral-950/95 text-amber-200 hover:border-amber-400/60 hover:bg-amber-950/40",
    icon: "text-amber-400",
    activeFilter: "border-amber-400/50 bg-amber-500/15 text-amber-100",
    focus: "focus:border-amber-400/60",
    border: "border-amber-500/20",
  },
};

type VocabularyDrawerProps = {
  scopes: VocabularyScope[];
};

type DrawerEntry = {
  term: VocabTerm;
  groupId: string;
  groupLabel: string;
};

export default function VocabularyDrawer({ scopes }: VocabularyDrawerProps) {
  const pathname = usePathname();
  const scope = useMemo(
    () => findVocabularyScope(pathname, scopes),
    [pathname, scopes],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("all");
  const [hideAdult, setHideAdult] = useState(true);

  useEffect(() => {
    const savedSafeMode = window.localStorage.getItem("vocab_safe_mode");
    if (savedSafeMode !== null) {
      setHideAdult(savedSafeMode === "true");
    }
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setQuery("");
    setActiveGroup("all");
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const entries = useMemo<DrawerEntry[]>(() => {
    if (!scope) return [];

    const seenIds = new Set<string>();
    const seenWords = new Set<string>();
    const flattened: DrawerEntry[] = [];

    for (const group of scope.groups) {
      const sortedTerms = [...group.terms]
        .filter((term) => !hideAdult || !term.isAdult)
        .sort((left, right) => left.word.localeCompare(right.word));

      for (const term of sortedTerms) {
        const normalizedWord = term.word.trim().toLowerCase();
        if (seenIds.has(term.id) || seenWords.has(normalizedWord)) continue;
        seenIds.add(term.id);
        seenWords.add(normalizedWord);
        flattened.push({
          term,
          groupId: group.id,
          groupLabel: group.label,
        });
      }
    }

    return flattened;
  }, [hideAdult, scope]);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return entries.filter((entry) => {
      const matchesGroup =
        activeGroup === "all" || entry.groupId === activeGroup;
      if (!matchesGroup) return false;
      if (!normalizedQuery) return true;

      const searchableText = [
        entry.term.word,
        entry.term.definition,
        entry.term.domain,
        entry.groupLabel,
        ...entry.term.tags,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [activeGroup, entries, query]);

  if (!scope || entries.length === 0) return null;

  const accent = ACCENT_STYLES[scope.accent];

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="page-vocabulary-drawer"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 z-[60] flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold shadow-2xl backdrop-blur transition-colors md:bottom-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:rounded-r-none ${accent.button}`}
      >
        <Tags size={17} aria-hidden="true" />
        <span>Vocabulary</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">
          {entries.length}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[80]">
          <button
            type="button"
            aria-label="Close vocabulary"
            className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <aside
            id="page-vocabulary-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="page-vocabulary-title"
            className={`absolute inset-y-0 right-0 flex w-[min(94vw,30rem)] flex-col border-l bg-neutral-950 shadow-2xl ${accent.border}`}
          >
            <header className={`border-b p-5 ${accent.border}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg border border-white/10 bg-white/5 p-2">
                    <BookOpen
                      size={19}
                      className={accent.icon}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h2
                      id="page-vocabulary-title"
                      className="text-lg font-bold text-white"
                    >
                      {scope.title} vocabulary
                    </h2>
                    <p className="mt-1 text-sm text-neutral-400">
                      {entries.length} terms from this page and its lessons
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Close vocabulary"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-white/10 p-2 text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <label className="relative mt-5 block">
                <span className="sr-only">Search vocabulary</span>
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setQuery(event.target.value)
                  }
                  placeholder="Search terms and definitions"
                  className={`w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 ${accent.focus}`}
                />
              </label>

              {scope.groups.length > 1 && (
                <div
                  className="mt-4 flex gap-2 overflow-x-auto pb-1"
                  aria-label="Vocabulary groups"
                >
                  <button
                    type="button"
                    onClick={() => setActiveGroup("all")}
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      activeGroup === "all"
                        ? accent.activeFilter
                        : "border-white/10 text-neutral-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    All
                  </button>
                  {scope.groups.map((group) => (
                    <button
                      type="button"
                      key={group.id}
                      onClick={() => setActiveGroup(group.id)}
                      className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                        activeGroup === group.id
                          ? accent.activeFilter
                          : "border-white/10 text-neutral-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {group.label}
                    </button>
                  ))}
                </div>
              )}
            </header>

            <div className="flex-1 overflow-y-auto px-5">
              {filteredEntries.length === 0 ? (
                <div className="flex min-h-48 items-center justify-center text-center text-sm text-neutral-500">
                  No vocabulary matches this search.
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {filteredEntries.map(({ term, groupLabel }) => (
                    <article key={term.id} className="py-5">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-semibold text-white">{term.word}</h3>
                        <span className="text-xs text-neutral-500">
                          {groupLabel}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-neutral-300">
                        {term.definition}
                      </p>
                      {term.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {term.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-neutral-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </div>

            <footer className={`border-t p-4 ${accent.border}`}>
              <Link
                href="/glossary"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Open the full glossary
              </Link>
            </footer>
          </aside>
        </div>
      )}
    </>
  );
}
