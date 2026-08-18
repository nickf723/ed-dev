"use client";

import { useMemo, useState } from "react";
import { ArrowRightLeft, BookText, Languages, MessageSquareText } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type ExampleKey = "hungry" | "age" | "coffee" | "weather";

type TranslationExample = {
  key: ExampleKey;
  source: string;
  target: string;
  structuralGloss: string;
  grammar: string;
  context: string;
};

const EXAMPLES: readonly TranslationExample[] = [
  {
    key: "hungry",
    source: "I'm hungry.",
    target: "Tengo hambre.",
    structuralGloss: "I have hunger.",
    grammar: "Spanish commonly expresses this state with tener ('to have') + the noun hambre, rather than copying the English adjective construction.",
    context: "A natural translation preserves the ordinary meaning of the utterance, not the English part-of-speech pattern.",
  },
  {
    key: "age",
    source: "How old are you?",
    target: "¿Cuántos años tienes?",
    structuralGloss: "How many years do you have?",
    grammar: "This example uses informal singular tienes. Other relationships and regions can call for different forms of address.",
    context: "A useful translation must choose person and register even when the English source leaves some social distinctions less explicit.",
  },
  {
    key: "coffee",
    source: "I like coffee.",
    target: "Me gusta el café.",
    structuralGloss: "Coffee is pleasing to me.",
    grammar: "The explanatory gloss highlights the different argument pattern around gustar. It is a teaching aid, not a claim that Spanish speakers mentally translate the sentence this way.",
    context: "Word order and grammatical roles can reorganize even when the everyday message is simple.",
  },
  {
    key: "weather",
    source: "It's hot.",
    target: "Hace calor.",
    structuralGloss: "It makes/does heat.",
    grammar: "Weather expressions often use constructions that do not map neatly onto English dummy-it sentences.",
    context: "The target expression should sound ordinary in the target language, not merely preserve the source sentence's visible skeleton.",
  },
] as const;

export default function OmniTranslator() {
  const [exampleKey, setExampleKey] = useState<ExampleKey>("hungry");
  const example = useMemo(() => EXAMPLES.find((item) => item.key === exampleKey) ?? EXAMPLES[0], [exampleKey]);

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-amber-100/[0.12]" style={{ background: "rgba(18,13,17,0.24)" }}>
      <div className="grid border-b border-amber-100/[0.08] lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/60"><ArrowRightLeft size={14} /> Translation choices studio · English ↔ Spanish examples</div>
          <h3 className="mt-2 text-[clamp(1.7rem,2.8vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Translation is controlled rewriting under meaning, context, register, and target-language constraints.</h3>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-400/72">The old live-API translator has been retired from this teaching widget. These fixed examples make the translation problem inspectable and keep network quality or third-party output from masquerading as a lesson.</p>
        </div>
        <div className="border-t border-amber-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[12px] lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-stone-600">Boundary</span>
          <p className="mt-2 text-[11px] leading-5 text-stone-500">Structural glosses are deliberately awkward. They expose a contrast for learners, but they are not full linguistic analyses and should not be mistaken for how speakers consciously process their language.</p>
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[240px_minmax(0,1fr)] sm:p-5">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {EXAMPLES.map((item) => <button key={item.key} type="button" onClick={() => setExampleKey(item.key)} className={`border px-3 py-3 text-left transition ${item.key === exampleKey ? "border-amber-300/30 bg-amber-400/[0.08]" : "border-white/[0.07] bg-black/[0.05]"}`}><strong className="block text-[12px] text-white/84">{item.source}</strong><span className="mt-1 block text-[11px] text-stone-600">{item.target}</span></button>)}
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)]">
          <div className="border border-white/[0.07] bg-black/[0.065] p-4 backdrop-blur-[10px] sm:p-5">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-200/50"><Languages size={13} /> Source → target</div>
            <div className="mt-5 border-l-2 border-violet-300/20 pl-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-stone-600">English source</span>
              <p className="mt-1 text-[22px] font-medium text-white/88">{example.source}</p>
            </div>
            <div className="my-4 ml-4 h-8 border-l border-dashed border-amber-300/20" />
            <div className="border-l-2 border-amber-300/24 pl-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-stone-600">Natural Spanish</span>
              <p className="mt-1 text-[26px] font-medium text-amber-50/88">{example.target}</p>
            </div>
            <div className="mt-5 border-t border-white/[0.06] pt-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-stone-600">Structure-revealing gloss</span>
              <p className="mt-2 font-mono text-[14px] text-violet-200/66">{example.structuralGloss}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Note icon={BookText} title="Grammar contrast" rgb="192,132,252">{example.grammar}</Note>
            <Note icon={MessageSquareText} title="Translation decision" rgb="251,191,36">{example.context}</Note>
            <Note icon={ArrowRightLeft} title="What remains open" rgb="94,234,212">Tone, speaker relationship, regional usage, genre, surrounding discourse, and the larger communicative goal can still change the best target wording.</Note>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function Note({ icon: Icon, title, rgb, children }: { icon: typeof BookText; title: string; rgb: string; children: React.ReactNode }) {
  return <div className="border-l-2 bg-black/[0.055] px-3 py-3 backdrop-blur-[8px]" style={{ borderColor: `rgba(${rgb},0.34)` }}><span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.07em] text-stone-600"><Icon size={12} /> {title}</span><p className="mt-2 text-[12px] leading-5 text-stone-400/76">{children}</p></div>;
}
