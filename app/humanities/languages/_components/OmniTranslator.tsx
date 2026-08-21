"use client";

import { useState, type ReactNode } from "react";
import {
  ArrowRightLeft,
  BookText,
  Languages,
  MessageSquareText,
} from "lucide-react";
import { Surface } from "@/app/_page-system/scene";
import {
  LANGUAGE_TRANSLATION_EXAMPLES,
  type TranslationExampleKey,
} from "../languagesModel";

export default function OmniTranslator() {
  const [exampleKey, setExampleKey] = useState<TranslationExampleKey>("hungry");
  const example =
    LANGUAGE_TRANSLATION_EXAMPLES.find((item) => item.key === exampleKey) ??
    LANGUAGE_TRANSLATION_EXAMPLES[0];

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[30px] border-amber-100/[0.12]"
      style={{ background: "rgba(18,13,17,0.24)" }}
    >
      <div className="grid border-b border-amber-100/[0.08] lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/60">
            <ArrowRightLeft size={14} aria-hidden="true" /> Translation choices
            studio · English ↔ Spanish examples
          </div>
          <h3 className="mt-2 text-[clamp(1.7rem,2.8vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">
            Translation is controlled rewriting under meaning, context,
            register, and target-language constraints.
          </h3>
          <p className="text-stone-400/72 mt-3 max-w-3xl text-[13px] leading-6">
            Fixed examples make the translation problem inspectable and keep
            network quality or third-party output from masquerading as a lesson.
            They are examples, not a complete grammar or phrasebook.
          </p>
        </div>
        <div className="border-t border-amber-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[12px] lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone-600">
            Boundary
          </span>
          <p className="mt-2 text-[11px] leading-5 text-stone-500">
            Structural glosses are deliberately awkward. They expose a contrast
            for learners, but they are not full linguistic analyses or claims
            about how speakers consciously process language.
          </p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 lg:self-start">
          {LANGUAGE_TRANSLATION_EXAMPLES.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={item.key === exampleKey}
              onClick={() => setExampleKey(item.key)}
              className={`border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60 ${
                item.key === exampleKey
                  ? "border-amber-300/30 bg-amber-400/[0.08]"
                  : "border-white/[0.07] bg-black/[0.05] hover:border-white/[0.13]"
              }`}
            >
              <strong className="text-white/84 block text-[12px]">
                {item.source}
              </strong>
              <span className="mt-1 block text-[11px] text-stone-600">
                {item.target}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)]">
          <div className="border border-white/[0.07] bg-black/[0.065] p-4 backdrop-blur-[10px] sm:p-5">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-200/50">
              <Languages size={13} aria-hidden="true" /> Source → target
            </div>
            <div className="mt-5 border-l-2 border-violet-300/20 pl-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-stone-600">
                English source
              </span>
              <p className="text-white/88 mt-1 text-[22px] font-medium">
                {example.source}
              </p>
            </div>
            <div className="my-4 ml-4 h-8 border-l border-dashed border-amber-300/20" />
            <div className="border-amber-300/24 border-l-2 pl-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-stone-600">
                Natural Spanish
              </span>
              <p className="text-amber-50/88 mt-1 text-[26px] font-medium">
                {example.target}
              </p>
            </div>
            <div className="mt-5 border-t border-white/[0.06] pt-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-stone-600">
                Structure-revealing gloss
              </span>
              <p className="text-violet-200/66 mt-2 font-mono text-[14px]">
                {example.structuralGloss}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Note icon={BookText} title="Grammar contrast" rgb="192,132,252">
              {example.grammar}
            </Note>
            <Note
              icon={MessageSquareText}
              title="Translation decision"
              rgb="251,191,36"
            >
              {example.context}
            </Note>
            <Note
              icon={ArrowRightLeft}
              title="What remains open"
              rgb="94,234,212"
            >
              Tone, speaker relationship, regional usage, genre, surrounding
              discourse, and the larger communicative goal can still change the
              best target wording.
            </Note>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function Note({
  icon: Icon,
  title,
  rgb,
  children,
}: {
  icon: typeof BookText;
  title: string;
  rgb: string;
  children: ReactNode;
}) {
  return (
    <div
      className="border-l-2 bg-black/[0.055] px-3 py-3 backdrop-blur-[8px]"
      style={{ borderColor: `rgba(${rgb},0.34)` }}
    >
      <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.07em] text-stone-600">
        <Icon size={12} aria-hidden="true" /> {title}
      </span>
      <p className="text-stone-400/76 mt-2 text-[12px] leading-5">{children}</p>
    </div>
  );
}
