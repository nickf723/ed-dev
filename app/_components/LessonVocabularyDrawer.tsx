"use client";

import { useState } from "react";
import { BookA, Search, Volume2, X } from "lucide-react";

export type LessonVocabWord = {
  term: string;
  category: string;
  definition: string;
  pronunciation?: string;
};

type LessonVocabularyDrawerProps = {
  vocabList: LessonVocabWord[];
  themeColor?: string;
};

/**
 * Lesson-local vocabulary drawer used by pages that own a small glossary
 * directly. This is intentionally distinct from the curriculum-scoped global
 * VocabularyDrawer, which resolves grouped vocabulary by route/scope.
 */
export default function LessonVocabularyDrawer({
  vocabList,
  themeColor = "violet",
}: LessonVocabularyDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const themeText = `text-${themeColor}-400`;
  const themeBorder = `border-${themeColor}-500/30`;
  const themeHover = `hover:bg-${themeColor}-500/20`;

  const filteredVocab = vocabList.filter(
    (entry) =>
      entry.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.definition.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const speakWord = (word: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  if (!vocabList || vocabList.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed right-0 top-24 z-40 flex items-center gap-2 rounded-l-2xl border-y border-l border-white/10 bg-black/80 py-3 pl-3 pr-4 shadow-2xl backdrop-blur-md transition-all hover:pr-6 group ${
          !isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        type="button"
      >
        <div className={`rounded-lg bg-white/5 p-1.5 ${themeText}`}>
          <BookA size={18} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 transition-colors group-hover:text-white">
            Lesson Vocab
          </span>
          <span className="font-mono text-[9px] text-zinc-500">{vocabList.length} Terms</span>
        </div>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-white/10 bg-[#0a0a0c]/95 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-in-out sm:w-80 md:w-96 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="shrink-0 border-b border-white/5 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`rounded-lg border bg-white/5 p-2 ${themeBorder} ${themeText}`}>
                <BookA size={20} />
              </div>
              <div>
                <h3 className="font-bold tracking-wide text-white">Glossary</h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  Active Lesson Terms
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-white/5 p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              type="button"
              aria-label="Close lesson vocabulary"
            >
              <X size={16} />
            </button>
          </div>

          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/50 py-2 pl-9 pr-4 text-sm text-white placeholder-zinc-600 transition-colors focus:border-white/30 focus:outline-none"
            />
          </div>
        </div>

        <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-6">
          {filteredVocab.length > 0 ? (
            filteredVocab.map((item) => (
              <div
                key={`${item.term}-${item.category}`}
                className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/20"
              >
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h4 className={`text-lg font-bold text-white transition-colors group-hover:${themeText}`}>
                      {item.term}
                    </h4>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="rounded border border-white/5 bg-black/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        {item.category}
                      </span>
                      {item.pronunciation ? (
                        <span className="text-xs italic text-zinc-600">/{item.pronunciation}/</span>
                      ) : null}
                    </div>
                  </div>
                  <button
                    onClick={() => speakWord(item.term)}
                    className={`rounded-lg border border-white/5 bg-black/50 p-2 text-zinc-400 transition-colors ${themeHover} hover:text-white`}
                    type="button"
                    title="Listen to pronunciation"
                    aria-label={`Pronounce ${item.term}`}
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
                <p className="mt-3 text-sm font-light leading-relaxed text-zinc-400">
                  {item.definition}
                </p>
              </div>
            ))
          ) : (
            <div className="mt-10 text-center font-mono text-sm text-zinc-600">
              No terms found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </>
  );
}
