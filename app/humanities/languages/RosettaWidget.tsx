"use client";

import { useMemo, useState } from "react";
import { BookOpen, Languages, MoveHorizontal, Type } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type PhraseKey = "thanks" | "morning" | "water";
type Entry = {
  language: string;
  text: string;
  reading?: string;
  script: string;
  direction: "LTR" | "RTL";
  note?: string;
};

const PHRASES: Record<PhraseKey, { label: string; prompt: string; entries: readonly Entry[] }> = {
  thanks: {
    label: "Thank you",
    prompt: "Conventional expressions for thanking",
    entries: [
      { language: "English", text: "Thank you", script: "Latin", direction: "LTR" },
      { language: "Spanish", text: "Gracias", script: "Latin", direction: "LTR" },
      { language: "French", text: "Merci", script: "Latin", direction: "LTR" },
      { language: "Japanese", text: "ありがとうございます", reading: "arigatō gozaimasu", script: "Japanese mixed script", direction: "LTR", note: "polite expression" },
      { language: "Mandarin", text: "谢谢", reading: "xièxie", script: "Han characters", direction: "LTR" },
      { language: "Arabic", text: "شكرًا", reading: "shukran", script: "Arabic", direction: "RTL" },
      { language: "Russian", text: "Спасибо", reading: "spasibo", script: "Cyrillic", direction: "LTR" },
    ],
  },
  morning: {
    label: "Good morning",
    prompt: "Common morning greetings",
    entries: [
      { language: "English", text: "Good morning", script: "Latin", direction: "LTR" },
      { language: "Spanish", text: "Buenos días", script: "Latin", direction: "LTR" },
      { language: "French", text: "Bonjour", script: "Latin", direction: "LTR", note: "also used beyond the morning" },
      { language: "German", text: "Guten Morgen", script: "Latin", direction: "LTR" },
      { language: "Japanese", text: "おはようございます", reading: "ohayō gozaimasu", script: "Japanese mixed script", direction: "LTR", note: "polite expression" },
      { language: "Mandarin", text: "早上好", reading: "zǎoshang hǎo", script: "Han characters", direction: "LTR" },
      { language: "Arabic", text: "صباح الخير", reading: "ṣabāḥ al-khayr", script: "Arabic", direction: "RTL" },
      { language: "Russian", text: "Доброе утро", reading: "dobroye utro", script: "Cyrillic", direction: "LTR" },
    ],
  },
  water: {
    label: "Water",
    prompt: "A single concrete noun across languages",
    entries: [
      { language: "English", text: "water", script: "Latin", direction: "LTR" },
      { language: "Spanish", text: "agua", script: "Latin", direction: "LTR" },
      { language: "French", text: "eau", script: "Latin", direction: "LTR" },
      { language: "German", text: "Wasser", script: "Latin", direction: "LTR" },
      { language: "Italian", text: "acqua", script: "Latin", direction: "LTR" },
      { language: "Japanese", text: "水", reading: "mizu", script: "Kanji", direction: "LTR", note: "same character form can have different readings across languages" },
      { language: "Mandarin", text: "水", reading: "shuǐ", script: "Han character", direction: "LTR", note: "shared character does not imply shared pronunciation" },
      { language: "Arabic", text: "ماء", reading: "māʾ", script: "Arabic", direction: "RTL" },
      { language: "Russian", text: "вода", reading: "voda", script: "Cyrillic", direction: "LTR" },
    ],
  },
};

export default function RosettaWidget() {
  const [phraseKey, setPhraseKey] = useState<PhraseKey>("thanks");
  const phrase = PHRASES[phraseKey];
  const scripts = useMemo(() => new Set(phrase.entries.map((entry) => entry.script)).size, [phrase]);

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-violet-100/[0.12]" style={{ background: "rgba(15,11,22,0.24)" }}>
      <div className="grid border-b border-violet-100/[0.08] lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-violet-200/60"><Languages size={14} /> Multilingual phrase window</div>
          <h3 className="mt-2 text-[clamp(1.7rem,2.8vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Equivalent communicative jobs do not require identical words, grammar, scripts, or social conditions.</h3>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-400/72">Select a simple phrase and compare conventional forms. These are teaching examples, not a claim that every expression is interchangeable in every situation. Register, region, relationship, genre, and context can change what speakers actually choose.</p>
        </div>
        <div className="border-t border-violet-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[12px] lg:border-l lg:border-t-0">
          <div className="grid grid-cols-2 gap-3"><Readout icon={Type} label="Forms shown" value={String(phrase.entries.length)} /><Readout icon={BookOpen} label="Scripts represented" value={String(scripts)} /></div>
          <p className="mt-3 text-[11px] leading-5 text-stone-500">Romanized readings are approximate learning aids here. They do not replace the sound system, native orthography, or actual pronunciation practice.</p>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PHRASES) as PhraseKey[]).map((key) => <button key={key} type="button" onClick={() => setPhraseKey(key)} className={`border px-3 py-2 text-[12px] transition ${phraseKey === key ? "border-violet-300/30 bg-violet-400/[0.08] text-violet-100" : "border-white/[0.07] bg-black/[0.05] text-stone-500 hover:text-stone-300"}`}>{PHRASES[key].label}</button>)}
        </div>
        <div className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-stone-600"><MoveHorizontal size={12} /> {phrase.prompt}</div>

        <div className="mt-3 grid border-y border-white/[0.07] md:grid-cols-2 xl:grid-cols-3">
          {phrase.entries.map((entry, index) => (
            <div key={`${phraseKey}-${entry.language}`} className="min-h-[148px] border-b border-white/[0.06] px-4 py-4 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0">
              <div className="flex items-center justify-between gap-3"><span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-200/48">0{index + 1} · {entry.language}</span><span className="font-mono text-[10px] text-stone-600">{entry.direction}</span></div>
              <div dir={entry.direction === "RTL" ? "rtl" : "ltr"} className="mt-4 text-[clamp(1.5rem,2.4vw,2.2rem)] font-medium leading-tight text-white/88">{entry.text}</div>
              {entry.reading ? <div className="mt-2 font-mono text-[11px] text-amber-200/48">{entry.reading}</div> : null}
              <div className="mt-3 text-[11px] text-stone-600">{entry.script}{entry.note ? ` · ${entry.note}` : ""}</div>
            </div>
          ))}
        </div>
      </div>
    </Surface>
  );
}

function Readout({ icon: Icon, label, value }: { icon: typeof Type; label: string; value: string }) {
  return <div className="border-l-2 border-violet-300/18 bg-black/[0.05] px-3 py-2"><span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.06em] text-stone-600"><Icon size={11} /> {label}</span><strong className="mt-1 block font-mono text-[16px] text-white/76">{value}</strong></div>;
}
