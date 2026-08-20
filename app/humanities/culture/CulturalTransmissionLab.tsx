"use client";

import { useMemo, useState } from "react";
import { Archive, Home, MapPin, Radio, Users } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type ContextKey = "home" | "relocation" | "institution" | "platform";

type Context = {
  key: ContextKey;
  label: string;
  icon: typeof Home;
  rgb: string;
  setting: string;
  description: string;
  changes: readonly string[];
  continuities: readonly string[];
  questions: readonly string[];
};

const CONTEXTS: readonly Context[] = [
  {
    key: "home",
    label: "Family & neighborhood",
    icon: Home,
    rgb: "251,191,36",
    setting: "Small-scale transmission",
    description: "A fictional annual practice called Riverlight Night is prepared through households and neighborhood relationships. People cook together, make lanterns, exchange stories, and walk a familiar route after sunset.",
    changes: ["individual recipes and stories vary", "participation changes with age and household", "materials respond to cost and availability"],
    continuities: ["annual gathering", "shared preparation", "lantern walk", "story exchange"],
    questions: ["Who teaches whom?", "Which parts are negotiable?", "What meanings do participants themselves emphasize?"],
  },
  {
    key: "relocation",
    label: "New place",
    icon: MapPin,
    rgb: "96,165,250",
    setting: "Migration & adaptation",
    description: "Some participants move and organize Riverlight Night in a different city. The old walking route cannot be reproduced, ingredients differ, and new neighbors join the practice.",
    changes: ["route and public space", "available foods and materials", "language choices and explanations", "who participates"],
    continuities: ["gathering around light", "collective preparation", "memory of earlier places", "annual recurrence"],
    questions: ["What is recreated, translated, or invented?", "How does memory shape the new version?", "Do newcomers become participants, observers, or co-creators?"],
  },
  {
    key: "institution",
    label: "Public institution",
    icon: Archive,
    rgb: "192,132,252",
    setting: "Heritage & formalization",
    description: "A museum and city arts office invite community organizers to present Riverlight Night as a public program. Documentation, schedules, safety rules, funding, and interpretation now shape the event.",
    changes: ["formal schedule", "documentation and signage", "funding requirements", "audience scale", "institutional safety constraints"],
    continuities: ["community organizers remain involved", "lantern making", "shared stories", "public gathering"],
    questions: ["Who has authority to represent the practice?", "What gets simplified for visitors?", "What responsibilities accompany preservation and funding?"],
  },
  {
    key: "platform",
    label: "Digital circulation",
    icon: Radio,
    rgb: "244,114,182",
    setting: "Networked participation",
    description: "Short videos, tutorials, photos, playlists, and discussion threads spread fragments of Riverlight Night beyond the original participants. People encounter the practice without sharing the same place or history.",
    changes: ["visual fragments travel faster than context", "new audiences remix formats", "platform incentives shape what is visible", "participation can become asynchronous"],
    continuities: ["recognizable lantern imagery", "storytelling", "instructions for making", "annual bursts of attention"],
    questions: ["What context disappears when fragments travel?", "Who benefits from visibility?", "When does remix become collaboration, borrowing, commercialization, or appropriation?"],
  },
] as const;

const PRACTICE_PARTS = [
  { label: "Lantern walk", rgb: "251,191,36" },
  { label: "Shared meal", rgb: "251,146,60" },
  { label: "Neighborhood stories", rgb: "192,132,252" },
  { label: "Handmade signs", rgb: "94,234,212" },
] as const;

export default function CulturalTransmissionLab() {
  const [contextKey, setContextKey] = useState<ContextKey>("relocation");
  const context = useMemo(() => CONTEXTS.find((item) => item.key === contextKey) ?? CONTEXTS[1], [contextKey]);

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-pink-100/[0.12]" style={{ background: "rgba(22,10,18,0.21)" }}>
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_310px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-pink-200/62"><Users size={14} /> Culture in motion · fictional case</div>
          <h3 className="mt-2 text-[clamp(1.65rem,2.8vw,2.6rem)] font-semibold tracking-[-0.045em] text-white">A practice can remain recognizable while almost every detail is negotiable.</h3>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-300/70">Riverlight Night is invented for this lesson. It is not a real tradition or a model of any specific community. The point is to examine transmission, adaptation, authority, memory, and circulation without treating culture as a sealed object.</p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.06] p-5 backdrop-blur-[10px] lg:border-l lg:border-t-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-stone-600">Current setting</span>
          <strong className="mt-2 block text-[17px] text-white/86">{context.setting}</strong>
          <p className="mt-2 text-[11px] leading-5 text-stone-500">No context here is presented as a universal sequence. Real practices can occupy several settings at once.</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[215px_minmax(0,1fr)_300px]">
        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-600">Change the context</div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {CONTEXTS.map((item) => {
              const Icon = item.icon;
              const selected = item.key === contextKey;
              return <button key={item.key} type="button" onClick={() => setContextKey(item.key)} className="flex items-center gap-3 border px-3 py-3 text-left transition" style={{ borderColor: selected ? `rgba(${item.rgb},0.34)` : "rgba(255,255,255,0.06)", background: selected ? `rgba(${item.rgb},0.06)` : "rgba(0,0,0,0.035)" }}><span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.24)` }}><Icon size={13} /></span><strong className="text-[12px] text-white/80">{item.label}</strong></button>;
            })}
          </div>
        </div>

        <div className="relative min-h-[405px] overflow-hidden border border-white/[0.07] bg-[#160b13]/42 p-5 backdrop-blur-[8px] sm:p-6">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(244,114,182,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(244,114,182,0.06)_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="relative">
            <div className="font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: `rgba(${context.rgb},0.65)` }}>Riverlight Night · {context.label}</div>
            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-stone-300/76">{context.description}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {PRACTICE_PARTS.map((part, index) => <div key={part.label} className="relative overflow-hidden border border-white/[0.07] bg-black/[0.055] px-3 py-4"><div className="absolute inset-y-0 left-0 w-1" style={{ background: `rgba(${part.rgb},0.45)` }} /><span className="font-mono text-[9px] uppercase tracking-[0.06em] text-stone-600">part 0{index + 1}</span><strong className="mt-1 block text-[13px] text-white/82">{part.label}</strong><span className="mt-2 block text-[10px] leading-4 text-stone-500">The label stays visible across contexts, but participants may change its form, meaning, material, scale, or audience.</span></div>)}
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <ListPanel title="What may change" items={context.changes} rgb={context.rgb} />
              <ListPanel title="What may continue" items={context.continuities} rgb="94,234,212" />
            </div>
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-600">Questions before making a claim</div>
          <div className="mt-3 divide-y divide-white/[0.06] border-y border-white/[0.07]">
            {context.questions.map((question, index) => <div key={question} className="grid grid-cols-[34px_minmax(0,1fr)] gap-2 py-3"><span className="font-mono text-[10px]" style={{ color: `rgba(${context.rgb},0.56)` }}>0{index + 1}</span><p className="text-[11px] leading-5 text-stone-400/78">{question}</p></div>)}
          </div>
          <div className="mt-4 border-l-2 border-pink-300/24 bg-black/[0.045] px-3 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-pink-200/48">Interpretive boundary</span>
            <p className="mt-2 text-[11px] leading-5 text-stone-500">Similarity does not prove common origin. Change does not automatically mean decline. Continuity does not mean a practice has one fixed meaning. Communities also disagree internally about ownership, authenticity, representation, and change.</p>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function ListPanel({ title, items, rgb }: { title: string; items: readonly string[]; rgb: string }) {
  return <div className="border border-white/[0.07] bg-black/[0.035] p-3"><span className="font-mono text-[9px] uppercase tracking-[0.07em]" style={{ color: `rgba(${rgb},0.58)` }}>{title}</span><div className="mt-2 space-y-1.5">{items.map((item) => <div key={item} className="flex gap-2 text-[10px] leading-4 text-stone-500"><span style={{ color: `rgba(${rgb},0.45)` }}>•</span><span>{item}</span></div>)}</div></div>;
}
