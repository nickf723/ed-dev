"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  BookOpen,
  Clock3,
  FileText,
  Map as MapIcon,
  Network,
  Search,
  CircleHelp,
} from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type LensKey = "time" | "place" | "theme";

type SourceCase = {
  id: string;
  shortLabel: string;
  title: string;
  sourceType: string;
  provenance: string;
  summary: string;
  reveals: readonly string[];
  limits: readonly string[];
  questions: Record<LensKey, string>;
};

const SOURCE_CASES: readonly SourceCase[] = [
  {
    id: "ledger",
    shortLabel: "Ledger",
    title: "Merchant account book",
    sourceType: "hypothetical written record",
    provenance: "Indian Ocean port · c. 1450",
    summary:
      "A set of entries records goods, prices, debts, ship names, and trading partners over several seasons.",
    reveals: [
      "which commodities were valued",
      "who participated in exchange",
      "patterns of credit and seasonality",
    ],
    limits: [
      "people outside the merchant's records",
      "motives not written into the ledger",
      "whether every entry was accurate or complete",
    ],
    questions: {
      time: "What changed in prices, routes, or partners across the recorded seasons?",
      place: "How did this port connect distant producers, sailors, brokers, and consumers?",
      theme: "What does the ledger reveal about labor, exchange, power, and everyday life?",
    },
  },
  {
    id: "artifact",
    shortLabel: "Artifact",
    title: "Household ceramic fragment",
    sourceType: "hypothetical material source",
    provenance: "urban excavation layer · date range uncertain",
    summary:
      "A decorated ceramic fragment was recovered beside cooking remains and imported glass beads.",
    reveals: [
      "materials and craft techniques",
      "patterns of use inside a household",
      "possible exchange beyond the local settlement",
    ],
    limits: [
      "the owner's identity without corroboration",
      "the complete object or its full life history",
      "the meaning of decoration by itself",
    ],
    questions: {
      time: "Which layers and associated objects can narrow when the fragment was deposited?",
      place: "Were its clay, glaze, or decorative conventions local, imported, or hybrid?",
      theme: "How might the object connect technology, status, food, trade, and household routine?",
    },
  },
  {
    id: "oral",
    shortLabel: "Oral account",
    title: "Intergenerational community narrative",
    sourceType: "hypothetical oral-history record",
    provenance: "recorded interview · recent narration of an older event",
    summary:
      "A narrator recounts migration, neighborhood change, and family strategies remembered across generations.",
    reveals: [
      "lived experience and meaning",
      "memory, identity, and community vocabulary",
      "events absent from official records",
    ],
    limits: [
      "perfect recall of sequence or date",
      "every viewpoint inside the community",
      "a clean separation between memory and later interpretation",
    ],
    questions: {
      time: "How has the story changed as it was retold, and which events anchor its sequence?",
      place: "How did movement between neighborhoods or regions reshape belonging and opportunity?",
      theme: "What does the account reveal about family, migration, work, memory, and power?",
    },
  },
] as const;

const LENSES: Array<{
  id: LensKey;
  label: string;
  icon: typeof Clock3;
  rgb: string;
}> = [
  { id: "time", label: "Time", icon: Clock3, rgb: "251,191,36" },
  { id: "place", label: "Place", icon: MapIcon, rgb: "56,189,248" },
  { id: "theme", label: "Theme", icon: Network, rgb: "167,139,250" },
];

export default function HistoryEvidenceDesk() {
  const [sourceId, setSourceId] = useState(SOURCE_CASES[0].id);
  const [lens, setLens] = useState<LensKey>("time");
  const source = useMemo(
    () => SOURCE_CASES.find((item) => item.id === sourceId) ?? SOURCE_CASES[0],
    [sourceId],
  );
  const activeLens = LENSES.find((item) => item.id === lens) ?? LENSES[0];
  const LensIcon = activeLens.icon;

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[32px] border-amber-100/[0.13]"
      style={{ background: "rgba(20,14,10,0.34)" }}
    >
      <div className="grid border-b border-amber-100/[0.09] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200/72">
            <Archive size={14} /> Evidence desk · one source, several questions
          </div>
          <h2 className="mt-2 text-[clamp(1.9rem,3.5vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
            A source does not speak for itself. Historians make it evidence by asking disciplined questions.
          </h2>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-stone-300/72">
            Select a teaching source, then change the lens. The object stays the same while the historical problem, useful context, and limits of inference change around it.
          </p>
        </div>
        <div className="border-t border-amber-100/[0.08] bg-amber-200/[0.025] p-5 lg:border-l lg:border-t-0">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-stone-400">
            <CircleHelp size={14} /> Method reminder
          </div>
          <p className="mt-3 text-[13px] leading-6 text-stone-300/70">
            Provenance, perspective, corroboration, context, and silence all matter. A vivid source can still be partial, interested, misremembered, or unrepresentative.
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-[210px_minmax(0,0.92fr)_minmax(360px,1.08fr)]">
        <div className="border-b border-amber-100/[0.08] bg-black/[0.10] p-4 backdrop-blur-[12px] xl:border-b-0 xl:border-r">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-stone-500">
            Source drawer
          </div>
          <div className="mt-3 grid gap-2">
            {SOURCE_CASES.map((item, index) => {
              const active = item.id === source.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSourceId(item.id)}
                  className={`relative min-h-[70px] overflow-hidden rounded-[14px] border px-3 py-3 text-left transition ${
                    active
                      ? "border-amber-200/[0.28] bg-amber-100/[0.065]"
                      : "border-white/[0.07] bg-black/[0.12] hover:bg-white/[0.035]"
                  }`}
                >
                  <span className="font-mono text-[11px] text-stone-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong className="mt-1 block text-[13px] text-stone-100/88">
                    {item.shortLabel}
                  </strong>
                  <span className="mt-1 block text-[11px] leading-4 text-stone-500">
                    {item.sourceType}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-b border-amber-100/[0.08] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div className="relative min-h-[390px] overflow-hidden rounded-[22px] border border-amber-100/[0.10] bg-[#e5cf9b]/[0.075] p-5 shadow-[inset_0_0_70px_rgba(92,59,20,0.12)] backdrop-blur-[8px]">
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent_0_25px,rgba(226,207,164,0.035)_25px_26px)]" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-[13px] border border-amber-200/[0.16] bg-amber-100/[0.035] text-amber-200">
                  <FileText size={18} />
                </span>
                <span className="rounded-full border border-amber-100/[0.10] bg-black/[0.14] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.07em] text-stone-400">
                  teaching source
                </span>
              </div>

              <div className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/64">
                {source.sourceType}
              </div>
              <h3 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold leading-[0.98] tracking-[-0.042em] text-[#fff8e7]">
                {source.title}
              </h3>
              <div className="mt-2 font-mono text-[12px] text-cyan-100/55">
                {source.provenance}
              </div>
              <p className="mt-4 text-[14px] leading-6 text-stone-200/72">
                {source.summary}
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <SourceList
                  icon={Search}
                  label="Can reveal"
                  items={source.reveals}
                  rgb="52,211,153"
                />
                <SourceList
                  icon={CircleHelp}
                  label="Cannot establish alone"
                  items={source.limits}
                  rgb="244,114,182"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/[0.08] p-4 backdrop-blur-[10px] sm:p-5">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-stone-500">
            Question lens
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {LENSES.map((item) => {
              const Icon = item.icon;
              const active = item.id === lens;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLens(item.id)}
                  className="min-h-[72px] rounded-[14px] border px-2 py-2 text-center transition"
                  style={{
                    color: active ? `rgb(${item.rgb})` : "rgb(120 113 108)",
                    borderColor: active
                      ? `rgba(${item.rgb},0.32)`
                      : "rgba(255,255,255,0.07)",
                    background: active
                      ? `rgba(${item.rgb},0.065)`
                      : "rgba(0,0,0,0.12)",
                  }}
                >
                  <Icon size={17} className="mx-auto" />
                  <strong className="mt-2 block text-[12px]">{item.label}</strong>
                </button>
              );
            })}
          </div>

          <div
            className="mt-4 rounded-[20px] border p-4"
            style={{
              borderColor: `rgba(${activeLens.rgb},0.20)`,
              background: `linear-gradient(145deg,rgba(${activeLens.rgb},0.065),rgba(4,5,9,0.18))`,
            }}
          >
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]" style={{ color: `rgba(${activeLens.rgb},0.76)` }}>
              <LensIcon size={14} /> Ask through {activeLens.label.toLowerCase()}
            </div>
            <p className="mt-3 text-[16px] font-medium leading-7 text-white/86">
              {source.questions[lens]}
            </p>
          </div>

          <div className="mt-4 border-t border-white/[0.08] pt-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-stone-500">
              <BookOpen size={14} /> Historical claim
            </div>
            <p className="mt-2 text-[13px] leading-6 text-stone-300/70">
              A defensible explanation combines this source with other evidence, identifies uncertainty, and makes clear which conclusion is supported rather than merely possible.
            </p>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function SourceList({
  icon: Icon,
  label,
  items,
  rgb,
}: {
  icon: typeof Search;
  label: string;
  items: readonly string[];
  rgb: string;
}) {
  return (
    <div className="border-t pt-3" style={{ borderColor: `rgba(${rgb},0.18)` }}>
      <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${rgb},0.72)` }}>
        <Icon size={13} /> {label}
      </div>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="grid grid-cols-[8px_minmax(0,1fr)] gap-2 text-[12px] leading-5 text-stone-300/68">
            <span className="mt-2 h-1 w-1 rounded-full" style={{ background: `rgb(${rgb})` }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
