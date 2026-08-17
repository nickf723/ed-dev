"use client";

import { useState } from "react";
import {
  Aperture,
  History,
  Layers3,
  Palette,
  ScanEye,
  Shapes,
  type LucideIcon,
} from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type LensKey = "material" | "form" | "context" | "encounter";

type Lens = {
  id: LensKey;
  label: string;
  icon: LucideIcon;
  rgb: string;
  question: string;
  interpretation: string;
};

const LENSES: readonly Lens[] = [
  {
    id: "material",
    label: "Material",
    icon: Layers3,
    rgb: "251,146,60",
    question: "What is physically present, and how do fabrication choices shape the work?",
    interpretation:
      "The translucent panel, steel frame, projected light, and floor shadow behave differently. Material is not merely a list of ingredients; it determines weight, opacity, durability, reflection, and how the work can be installed.",
  },
  {
    id: "form",
    label: "Form",
    icon: ScanEye,
    rgb: "244,63,94",
    question: "How are scale, contrast, rhythm, edge, negative space, and emphasis organized?",
    interpretation:
      "The strongest contrast sits where the warm panel crosses the cool projection. Repeated verticals create rhythm, while the open center and long shadow make absence as important as solid form.",
  },
  {
    id: "context",
    label: "Context",
    icon: History,
    rgb: "96,165,250",
    question: "What changes when site, technology, maker, audience, and historical moment enter the reading?",
    interpretation:
      "A projected image means something different in a gallery, a transit station, or a memorial site. Context does not replace close looking, but it can alter which choices appear possible, intentional, contested, or legible.",
  },
  {
    id: "encounter",
    label: "Encounter",
    icon: Aperture,
    rgb: "167,139,250",
    question: "How does the viewer's body, movement, distance, and duration become part of the work?",
    interpretation:
      "The work changes as the viewer approaches, crosses the projection, or sees another person interrupt the light. Some visual art is not a stable image; it is an event distributed through space and time.",
  },
] as const;

export default function VisualAnalysisStudio() {
  const [lens, setLens] = useState<LensKey>("material");
  const active = LENSES.find((item) => item.id === lens) ?? LENSES[0];
  const ActiveIcon = active.icon;

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[34px] border-rose-100/[0.12]"
      style={{ background: "rgba(13,8,10,0.34)" }}
    >
      <div className="grid border-b border-rose-100/[0.08] lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-rose-200/70">
            <Palette size={14} /> Visual reading studio · one work, four lenses
          </div>
          <h2 className="mt-2 text-[clamp(1.9rem,3.5vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
            The artwork stays still. The structure of attention changes.
          </h2>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-stone-300/[0.72]">
            This hypothetical mixed-media installation is not a puzzle with one hidden answer. Switch analytical lenses to see how material, form, context, and embodied encounter produce different but compatible questions.
          </p>
        </div>
        <div className="border-t border-rose-100/[0.08] bg-rose-200/[0.025] p-5 lg:border-l lg:border-t-0">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-stone-400">
            <Shapes size={14} /> Teaching work
          </div>
          <strong className="mt-3 block text-[18px] text-white">Threshold Study</strong>
          <p className="mt-2 text-[13px] leading-6 text-stone-300/[0.68]">
            Powder-coated frame, translucent panel, projected light, and architectural shadow. Fictional object, real analytical habits.
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="border-b border-rose-100/[0.08] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div className="relative min-h-[420px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#08070a]/70 shadow-[inset_0_0_90px_rgba(0,0,0,0.24)] backdrop-blur-[8px]">
            <ArtworkStage lens={lens} />
          </div>
        </div>

        <div className="bg-black/[0.08] p-4 backdrop-blur-[12px] sm:p-5">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-stone-500">
            Analysis lens
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {LENSES.map((item) => {
              const Icon = item.icon;
              const selected = item.id === lens;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLens(item.id)}
                  className="min-h-[76px] rounded-[15px] border px-3 py-3 text-left transition"
                  style={{
                    borderColor: selected
                      ? `rgba(${item.rgb},0.34)`
                      : "rgba(255,255,255,0.07)",
                    background: selected
                      ? `rgba(${item.rgb},0.065)`
                      : "rgba(0,0,0,0.12)",
                  }}
                >
                  <Icon size={17} style={{ color: `rgb(${item.rgb})` }} />
                  <strong className="mt-2 block text-[13px] text-white/[0.86]">
                    {item.label}
                  </strong>
                </button>
              );
            })}
          </div>

          <div
            className="mt-4 rounded-[20px] border p-4"
            style={{
              borderColor: `rgba(${active.rgb},0.20)`,
              background: `linear-gradient(145deg,rgba(${active.rgb},0.065),rgba(4,5,9,0.18))`,
            }}
          >
            <div
              className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
              style={{ color: `rgba(${active.rgb},0.76)` }}
            >
              <ActiveIcon size={14} /> Ask through {active.label.toLowerCase()}
            </div>
            <p className="mt-3 text-[16px] font-medium leading-7 text-white/[0.86]">
              {active.question}
            </p>
          </div>

          <div className="mt-4 border-t border-white/[0.08] pt-4">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-stone-500">
              What this lens notices
            </div>
            <p className="mt-2 text-[13px] leading-6 text-stone-300/70">
              {active.interpretation}
            </p>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function ArtworkStage({ lens }: { lens: LensKey }) {
  return (
    <svg
      viewBox="0 0 760 430"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Hypothetical mixed-media installation shown through a selected visual-analysis lens"
    >
      <defs>
        <linearGradient id="studio-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12131a" />
          <stop offset="1" stopColor="#08090d" />
        </linearGradient>
        <linearGradient id="acrylic-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(244,63,94,0.68)" />
          <stop offset="0.52" stopColor="rgba(251,146,60,0.42)" />
          <stop offset="1" stopColor="rgba(250,204,21,0.20)" />
        </linearGradient>
        <linearGradient id="projection" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(34,211,238,0)" />
          <stop offset="0.48" stopColor="rgba(34,211,238,0.32)" />
          <stop offset="1" stopColor="rgba(167,139,250,0.04)" />
        </linearGradient>
        <filter id="soft-glow">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <rect width="760" height="430" fill="url(#studio-wall)" />
      <path d="M0 318 L760 280 L760 430 L0 430 Z" fill="#07080b" />
      <path d="M0 318 L760 280" stroke="rgba(226,232,240,0.12)" />

      <path d="M80 274 L366 130 L670 222 L394 361 Z" fill="url(#projection)" filter="url(#soft-glow)" opacity="0.62" />
      <path d="M92 274 L366 144 L652 225 L395 348 Z" fill="url(#projection)" opacity="0.72" />

      <path d="M252 88 L486 98 L468 316 L268 320 Z" fill="none" stroke="#cbd5e1" strokeWidth="10" opacity="0.76" />
      <path d="M287 114 L449 120 L437 292 L300 294 Z" fill="url(#acrylic-panel)" opacity="0.86" />
      <path d="M294 124 L444 130" stroke="rgba(255,255,255,0.30)" strokeWidth="2" />
      <path d="M268 320 L454 366 L585 337 L468 316 Z" fill="rgba(0,0,0,0.32)" />
      <path d="M268 320 L454 366" stroke="rgba(244,63,94,0.19)" />
      <path d="M468 316 L585 337" stroke="rgba(34,211,238,0.18)" />

      {lens === "material" ? <MaterialOverlay /> : null}
      {lens === "form" ? <FormOverlay /> : null}
      {lens === "context" ? <ContextOverlay /> : null}
      {lens === "encounter" ? <EncounterOverlay /> : null}
    </svg>
  );
}

function MaterialOverlay() {
  return (
    <g>
      <Callout x1={284} y1={101} x2={128} y2={62} label="powder-coated steel" rgb="251,146,60" />
      <Callout x1={430} y1={178} x2={606} y2={112} label="translucent acrylic" rgb="244,63,94" />
      <Callout x1={560} y1={236} x2={680} y2={270} label="projected light" rgb="34,211,238" />
      <Callout x1={424} y1={349} x2={585} y2={392} label="architectural shadow" rgb="167,139,250" />
      <circle cx="365" cy="208" r="118" fill="none" stroke="rgba(251,146,60,0.18)" strokeDasharray="6 8" />
    </g>
  );
}

function FormOverlay() {
  return (
    <g>
      {[1, 2].map((division) => (
        <g key={division}>
          <line x1={(760 / 3) * division} y1="0" x2={(760 / 3) * division} y2="430" stroke="rgba(244,63,94,0.16)" />
          <line x1="0" y1={(430 / 3) * division} x2="760" y2={(430 / 3) * division} stroke="rgba(244,63,94,0.16)" />
        </g>
      ))}
      <line x1="0" y1="430" x2="760" y2="0" stroke="rgba(250,204,21,0.15)" strokeDasharray="7 8" />
      <line x1="0" y1="0" x2="760" y2="430" stroke="rgba(34,211,238,0.12)" strokeDasharray="7 8" />
      <circle cx="382" cy="210" r="26" fill="none" stroke="rgba(244,63,94,0.55)" strokeWidth="2" />
      <circle cx="382" cy="210" r="6" fill="rgba(244,63,94,0.68)" />
      <text x="402" y="202" fill="rgba(255,255,255,0.72)" fontSize="13">highest contrast</text>
      <text x="84" y="382" fill="rgba(255,255,255,0.54)" fontSize="12">negative space extends the composition</text>
    </g>
  );
}

function ContextOverlay() {
  return (
    <g>
      <rect x="34" y="34" width="222" height="116" rx="14" fill="rgba(5,7,12,0.72)" stroke="rgba(96,165,250,0.24)" />
      <text x="52" y="60" fill="rgba(96,165,250,0.78)" fontSize="12" fontWeight="700">HYPOTHETICAL CONTEXT FILE</text>
      <text x="52" y="84" fill="rgba(255,255,255,0.78)" fontSize="14" fontWeight="700">Threshold Study</text>
      <text x="52" y="106" fill="rgba(203,213,225,0.62)" fontSize="12">mixed-media installation · teaching object</text>
      <text x="52" y="127" fill="rgba(203,213,225,0.56)" fontSize="12">site, audience, technology, patronage unknown</text>
      <path d="M256 104 C318 104 318 126 348 142" fill="none" stroke="rgba(96,165,250,0.30)" />
      <circle cx="348" cy="142" r="4" fill="rgba(96,165,250,0.72)" />
      <rect x="548" y="322" width="172" height="70" rx="12" fill="rgba(5,7,12,0.68)" stroke="rgba(96,165,250,0.18)" />
      <text x="565" y="347" fill="rgba(96,165,250,0.76)" fontSize="12" fontWeight="700">CONTEXT CAN CHANGE</text>
      <text x="565" y="368" fill="rgba(203,213,225,0.58)" fontSize="11">meaning without changing the object</text>
    </g>
  );
}

function EncounterOverlay() {
  return (
    <g>
      <circle cx="132" cy="318" r="19" fill="rgba(167,139,250,0.18)" stroke="rgba(167,139,250,0.52)" />
      <path d="M132 337 L132 390 M105 357 L159 357 M132 390 L112 421 M132 390 L153 421" stroke="rgba(167,139,250,0.58)" strokeWidth="6" strokeLinecap="round" />
      <path d="M153 312 C230 266 272 238 330 221" fill="none" stroke="rgba(167,139,250,0.42)" strokeWidth="2" strokeDasharray="6 7" />
      <path d="M150 376 C232 364 278 350 326 330" fill="none" stroke="rgba(34,211,238,0.24)" strokeWidth="2" />
      <text x="58" y="284" fill="rgba(255,255,255,0.72)" fontSize="12">viewer enters the projection</text>
      <line x1="252" y1="88" x2="252" y2="320" stroke="rgba(250,204,21,0.28)" strokeDasharray="4 6" />
      <line x1="486" y1="98" x2="486" y2="316" stroke="rgba(250,204,21,0.28)" strokeDasharray="4 6" />
      <path d="M252 72 L486 82" stroke="rgba(250,204,21,0.42)" />
      <text x="334" y="62" fill="rgba(250,204,21,0.72)" fontSize="12">human-scale span</text>
      <circle cx="391" cy="262" r="62" fill="none" stroke="rgba(167,139,250,0.18)" strokeDasharray="6 7" />
    </g>
  );
}

function Callout({
  x1,
  y1,
  x2,
  y2,
  label,
  rgb,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  rgb: string;
}) {
  const anchor = x2 > x1 ? "start" : "end";
  return (
    <g>
      <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke={`rgba(${rgb},0.42)`} strokeWidth="1.5" />
      <circle cx={x1} cy={y1} r="4" fill={`rgba(${rgb},0.72)`} />
      <text x={x2 + (anchor === "start" ? 8 : -8)} y={y2 - 5} textAnchor={anchor} fill="rgba(255,255,255,0.74)" fontSize="12">
        {label}
      </text>
    </g>
  );
}
