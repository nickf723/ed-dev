"use client";

import { useState } from "react";
import { BookOpen, Languages, MoveHorizontal, Type } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";
import {
  LANGUAGE_PHRASES,
  calculatePhraseDirectionShare,
  countPhraseDirections,
  formatLanguagePercent,
  type PhraseKey,
} from "./languagesModel";

export default function RosettaWidget() {
  const [phraseKey, setPhraseKey] = useState<PhraseKey>("thanks");
  const phrase = LANGUAGE_PHRASES[phraseKey];
  const scripts = new Set(phrase.entries.map((entry) => entry.script)).size;
  const rtlCount = countPhraseDirections(phraseKey, "RTL");
  const rtlShare = calculatePhraseDirectionShare(phraseKey, "RTL");

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[30px] border-violet-100/[0.12]"
      style={{ background: "rgba(15,11,22,0.24)" }}
    >
      <div className="grid border-b border-violet-100/[0.08] lg:grid-cols-[minmax(0,1fr)_410px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-violet-200/60">
            <Languages size={14} aria-hidden="true" /> Multilingual phrase
            window
          </div>
          <h3 className="mt-2 text-[clamp(1.7rem,2.8vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">
            Equivalent communicative jobs do not require identical words,
            grammar, scripts, or social conditions.
          </h3>
          <p className="text-stone-400/72 mt-3 max-w-3xl text-[13px] leading-6">
            Select a simple phrase and compare conventional forms. These are
            teaching examples, not a claim that every expression is
            interchangeable in every situation. Register, region, relationship,
            genre, and context can change what speakers choose.
          </p>
        </div>
        <div className="border-t border-violet-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[12px] lg:border-l lg:border-t-0">
          <div className="grid grid-cols-3 gap-3">
            <Readout
              icon={Type}
              label="Forms"
              value={String(phrase.entries.length)}
            />
            <Readout
              icon={BookOpen}
              label="Script labels"
              value={String(scripts)}
            />
            <Readout
              icon={MoveHorizontal}
              label="RTL share"
              value={`${rtlCount}/${phrase.entries.length} · ${formatLanguagePercent(rtlShare)}`}
            />
          </div>
          <p className="mt-3 text-[11px] leading-5 text-stone-500">
            Romanized readings are approximate learning aids here. Script labels
            describe this display; neither measure is a census of world
            languages or writing practices.
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(LANGUAGE_PHRASES) as PhraseKey[]).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={phraseKey === key}
              onClick={() => setPhraseKey(key)}
              className={`border px-3 py-2 text-[12px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200/60 ${
                phraseKey === key
                  ? "border-violet-300/30 bg-violet-400/[0.08] text-violet-100"
                  : "border-white/[0.07] bg-black/[0.05] text-stone-500 hover:text-stone-300"
              }`}
            >
              {LANGUAGE_PHRASES[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-stone-600">
          <MoveHorizontal size={12} aria-hidden="true" /> {phrase.prompt}
        </div>

        <div className="mt-3 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-3">
          {phrase.entries.map((entry, index) => (
            <div
              key={`${phraseKey}-${entry.language}`}
              className="min-h-[148px] border-b border-white/[0.06] px-4 py-4 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-violet-200/48 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]">
                  {String(index + 1).padStart(2, "0")} · {entry.language}
                </span>
                <span className="font-mono text-[11px] text-stone-600">
                  {entry.direction}
                </span>
              </div>
              <div
                dir={entry.direction === "RTL" ? "rtl" : "ltr"}
                className="text-white/88 mt-4 text-[clamp(1.5rem,2.4vw,2.2rem)] font-medium leading-tight"
              >
                {entry.text}
              </div>
              {entry.reading ? (
                <div className="text-amber-200/48 mt-2 font-mono text-[11px]">
                  {entry.reading}
                </div>
              ) : null}
              <div className="mt-3 text-[11px] leading-5 text-stone-600">
                {entry.script}
                {entry.note ? ` · ${entry.note}` : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Surface>
  );
}

function Readout({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Type;
  label: string;
  value: string;
}) {
  return (
    <div className="border-violet-300/18 border-l-2 bg-black/[0.05] px-3 py-2">
      <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.06em] text-stone-600">
        <Icon size={11} aria-hidden="true" /> {label}
      </span>
      <strong className="text-white/76 mt-1 block font-mono text-[14px]">
        {value}
      </strong>
    </div>
  );
}
