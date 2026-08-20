"use client";

import { useMemo, useState } from "react";
import { Ear, Mic2, Play, Waves } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type PairKey = "pin-bin" | "sip-zip" | "coat-goat";
type ContextKey = "top" | "stop" | "water";

type ContrastPair = {
  key: PairKey;
  left: string;
  right: string;
  leftSegment: string;
  rightSegment: string;
  place: string;
  manner: string;
  feature: string;
  cue: string;
};

const PAIRS: readonly ContrastPair[] = [
  {
    key: "pin-bin",
    left: "pin",
    right: "bin",
    leftSegment: "/p/",
    rightSegment: "/b/",
    place: "bilabial",
    manner: "stop",
    feature: "voicing",
    cue: "The initial consonant category changes while place and manner stay similar; English listeners can use the contrast to distinguish different words.",
  },
  {
    key: "sip-zip",
    left: "sip",
    right: "zip",
    leftSegment: "/s/",
    rightSegment: "/z/",
    place: "alveolar",
    manner: "fricative",
    feature: "voicing",
    cue: "A voiceless/voiced fricative contrast can distinguish lexical items in English even though the consonants share much of their articulation.",
  },
  {
    key: "coat-goat",
    left: "coat",
    right: "goat",
    leftSegment: "/k/",
    rightSegment: "/g/",
    place: "velar",
    manner: "stop",
    feature: "voicing",
    cue: "The words differ in the initial consonant category. The exact acoustic realization varies by speaker and context, but the contrast remains useful in this broad analysis.",
  },
] as const;

const CONTEXTS = [
  {
    key: "top" as const,
    word: "top",
    broad: "/t/",
    narrow: "[tʰ]",
    environment: "at the start of a stressed syllable",
    note: "In many English varieties, a voiceless stop such as /t/ is commonly aspirated here. The superscript h marks a following burst of aspiration.",
    rgb: "251,146,60",
  },
  {
    key: "stop" as const,
    word: "stop",
    broad: "/t/",
    narrow: "[t]",
    environment: "after /s/ in the same onset",
    note: "In many English varieties, the /t/ after /s/ lacks the strong aspiration heard in a word such as top. The broad category can stay /t/ even though the phonetic realization differs.",
    rgb: "34,211,238",
  },
  {
    key: "water" as const,
    word: "water",
    broad: "/t/",
    narrow: "[ɾ]",
    environment: "between vowels in many North American English varieties",
    note: "Many North American speakers use an alveolar tap in words such as water. Other varieties and speaking styles may realize the segment differently, so this is an illustrative dialect pattern, not a universal rule.",
    rgb: "192,132,252",
  },
] as const;

export default function ContrastLab() {
  const [pairKey, setPairKey] = useState<PairKey>("pin-bin");
  const [contextKey, setContextKey] = useState<ContextKey>("top");
  const pair = useMemo(() => PAIRS.find((item) => item.key === pairKey) ?? PAIRS[0], [pairKey]);
  const context = CONTEXTS.find((item) => item.key === contextKey) ?? CONTEXTS[0];

  function speak(word: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-orange-100/[0.11]" style={{ background: "rgba(15,7,8,0.30)" }}>
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-orange-200/64"><Ear size={14} /> Contrast laboratory</div>
          <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.9rem)] font-semibold tracking-[-0.045em] text-white">One tiny change can create a different word. Another tiny change can be predictable from context.</h3>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/74">Compare a minimal contrast, then compare several realizations associated with one broad /t/ category. The speech buttons use your browser's synthesized voice for whole-word reference only; they are not laboratory recordings or phonetic ground truth.</p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.055] p-5 lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-slate-500">Current contrast</span>
          <strong className="mt-2 block text-[21px] text-orange-200">{pair.left} ↔ {pair.right}</strong>
          <p className="mt-2 text-[12px] leading-5 text-slate-400/72">{pair.cue}</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[230px_minmax(0,1fr)_320px] xl:items-start">
        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">Minimal-pair bank</div>
          <div className="mt-3 space-y-2">
            {PAIRS.map((item) => {
              const active = pairKey === item.key;
              return <button key={item.key} type="button" onClick={() => setPairKey(item.key)} className={`w-full rounded-[15px] border p-3 text-left transition ${active ? "border-orange-200/[0.24] bg-orange-300/[0.04]" : "border-white/[0.06] bg-black/[0.05]"}`}><strong className="text-[14px] text-white/84">{item.left} ↔ {item.right}</strong><span className="mt-1 block font-mono text-[11px] text-orange-200/58">{item.leftSegment} ↔ {item.rightSegment}</span></button>;
            })}
          </div>

          <div className="mt-5 rounded-[16px] border border-white/[0.06] bg-black/[0.06] p-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate-500">Shared features</div>
            <div className="mt-2 space-y-2 text-[12px]"><FeatureRow label="Place" value={pair.place} /><FeatureRow label="Manner" value={pair.manner} /><FeatureRow label="Changing feature" value={pair.feature} accent /></div>
          </div>
        </div>

        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            <WordCard word={pair.left} segment={pair.leftSegment} voiced={pair.leftSegment === "/b/" || pair.leftSegment === "/z/" || pair.leftSegment === "/g/"} onPlay={() => speak(pair.left)} rgb="251,146,60" />
            <WordCard word={pair.right} segment={pair.rightSegment} voiced={pair.rightSegment === "/b/" || pair.rightSegment === "/z/" || pair.rightSegment === "/g/"} onPlay={() => speak(pair.right)} rgb="244,114,182" />
          </div>

          <div className="mt-4 rounded-[20px] border border-white/[0.07] bg-black/[0.07] p-4">
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.07em] text-cyan-200/52"><Waves size={12} /> Schematic voicing cue</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <SignalStrip label={pair.leftSegment} voiced={pair.leftSegment === "/b/" || pair.leftSegment === "/z/" || pair.leftSegment === "/g/"} />
              <SignalStrip label={pair.rightSegment} voiced={pair.rightSegment === "/b/" || pair.rightSegment === "/z/" || pair.rightSegment === "/g/"} />
            </div>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">The stripes only mark the presence or absence of a periodic voicing cue in this simplified comparison. Real speech contains many overlapping acoustic cues, and voicing timing differs by segment, speaker, context, and language.</p>
          </div>
        </div>

        <aside className="xl:sticky xl:top-[172px] xl:self-start">
          <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.07] p-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-fuchsia-200/52"><Mic2 size={13} /> Same broad category, different realization</div>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              {CONTEXTS.map((item) => <button key={item.key} type="button" onClick={() => setContextKey(item.key)} className="rounded-[11px] border px-2 py-2.5 text-[10px] font-semibold transition" style={{ borderColor: contextKey === item.key ? `rgba(${item.rgb},0.28)` : "rgba(255,255,255,0.055)", color: contextKey === item.key ? `rgb(${item.rgb})` : "rgb(148,163,184)", background: contextKey === item.key ? `rgba(${item.rgb},0.04)` : "rgba(0,0,0,0.04)" }}>{item.word}</button>)}
            </div>

            <div className="mt-4 rounded-[16px] border border-white/[0.06] bg-black/[0.08] p-4 text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate-500">broad category → illustrative realization</div>
              <div className="mt-3 flex items-center justify-center gap-4 font-mono text-[26px]"><span className="text-orange-100">{context.broad}</span><span className="text-slate-600">→</span><span style={{ color: `rgb(${context.rgb})` }}>{context.narrow}</span></div>
              <div className="mt-3 text-[12px] text-white/76">{context.word}</div>
              <div className="mt-1 text-[11px] leading-5 text-slate-500">{context.environment}</div>
            </div>
            <p className="mt-4 text-[12px] leading-5 text-slate-400/72">{context.note}</p>
          </div>
        </aside>
      </div>
    </Surface>
  );
}

function WordCard({ word, segment, voiced, onPlay, rgb }: { word: string; segment: string; voiced: boolean; onPlay: () => void; rgb: string }) {
  return <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.07] p-4"><div className="flex items-start justify-between gap-3"><span><span className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate-500">word</span><strong className="mt-1 block text-[30px] tracking-[-0.04em] text-white">{word}</strong></span><button type="button" onClick={onPlay} className="flex h-10 w-10 items-center justify-center rounded-full border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.24)` }} aria-label={`Speak ${word}`}><Play size={14} /></button></div><div className="mt-4 grid grid-cols-2 gap-2"><div className="rounded-[12px] border border-white/[0.055] bg-black/[0.05] p-3"><span className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-600">initial category</span><strong className="mt-1 block font-mono text-[20px]" style={{ color: `rgb(${rgb})` }}>{segment}</strong></div><div className="rounded-[12px] border border-white/[0.055] bg-black/[0.05] p-3"><span className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-600">voicing cue</span><strong className="mt-1 block text-[13px] text-white/76">{voiced ? "voiced" : "voiceless"}</strong></div></div></div>;
}

function SignalStrip({ label, voiced }: { label: string; voiced: boolean }) {
  return <div className="rounded-[14px] border border-white/[0.055] bg-[#12080a]/60 p-3"><div className="flex items-center justify-between"><strong className="font-mono text-[12px] text-white/78">{label}</strong><span className="font-mono text-[9px] uppercase text-slate-600">{voiced ? "periodic cue" : "no periodic cue here"}</span></div><div className="mt-3 flex h-12 items-center gap-1 overflow-hidden rounded-[8px] bg-black/[0.16] px-2">{Array.from({ length: 22 }, (_, index) => <span key={index} className="block w-[2px] rounded-full" style={{ height: voiced ? `${8 + ((index * 13) % 30)}px` : `${4 + ((index * 17) % 12)}px`, background: voiced ? "rgba(244,114,182,0.48)" : "rgba(251,146,60,0.26)", opacity: voiced ? (index % 2 === 0 ? 0.9 : 0.55) : 0.55 }} />)}</div></div>;
}

function FeatureRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="flex items-center justify-between gap-3 border-b border-white/[0.05] pb-2 last:border-b-0"><span className="text-slate-500">{label}</span><strong className={accent ? "text-orange-200" : "text-slate-300"}>{value}</strong></div>;
}
