"use client";

import { useMemo, useState } from "react";
import { Eye, Hand, Lightbulb, ShieldCheck, Wrench } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type ScenarioKey = "find" | "grip" | "operate" | "clean" | "service";

const SCENARIOS = [
  {
    key: "find" as const,
    label: "Find & orient",
    icon: Eye,
    rgb: "125,211,252",
    prompt: "Can someone identify the active end and the primary control before the product is already in use?",
    notes: ["Make orientation cues legible", "Distinguish the main control", "Let form suggest a likely grip"],
  },
  {
    key: "grip" as const,
    label: "Grip & carry",
    icon: Hand,
    rgb: "244,114,182",
    prompt: "What changes when the object meets hands, gloves, moisture, fatigue, motion, and different carrying habits?",
    notes: ["Map palm, finger, and thumb contact", "Keep controls usable without destabilizing grip", "Check balance and accidental activation"],
  },
  {
    key: "operate" as const,
    label: "Operate & confirm",
    icon: Lightbulb,
    rgb: "251,191,36",
    prompt: "A control is not enough. The user also needs to perceive what happened after the control was used.",
    notes: ["Match control motion to expectation", "Make system state perceivable", "Test under realistic light, noise, and attention"],
  },
  {
    key: "clean" as const,
    label: "Clean & store",
    icon: ShieldCheck,
    rgb: "94,234,212",
    prompt: "Products keep existing between moments of use. Seams, finishes, charging surfaces, and storage geometry become part of the design.",
    notes: ["Look for residue and dirt traps", "Check whether cleaning can trigger controls", "Test shelf, hook, drawer, dock, and work-surface behavior"],
  },
  {
    key: "service" as const,
    label: "Open & service",
    icon: Wrench,
    rgb: "192,132,252",
    prompt: "Assembly architecture determines whether maintenance is routine, destructive, or effectively impossible.",
    notes: ["Identify the real service seam", "Prefer reusable fastening where appropriate", "Plan access to likely wear items and replaceable cores"],
  },
] as const;

export default function ProductUseJourney2026() {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>("find");
  const scenario = useMemo(() => SCENARIOS.find((item) => item.key === scenarioKey) ?? SCENARIOS[0], [scenarioKey]);

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-orange-100/[0.12]" style={{ background: "rgba(20,13,9,0.25)" }}>
      <div className="border-b border-orange-100/[0.08] px-5 py-5 sm:px-6">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-orange-200/60">Product critique · one object, five moments</div>
        <h3 className="mt-2 text-[clamp(1.6rem,2.8vw,2.6rem)] font-semibold tracking-[-0.045em] text-white">The form stays fixed. The design question moves.</h3>
        <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-400/75">Use the same fictional handheld light through its life. This is a critique prompt, not a scoring model. Real product research would add observation, intended-user testing, accessibility review, measurements, manufacturing evidence, and task context.</p>
      </div>

      <div className="grid gap-4 p-4 xl:grid-cols-[220px_minmax(0,1fr)_300px] sm:p-5">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
          {SCENARIOS.map((item) => {
            const Icon = item.icon;
            const selected = item.key === scenarioKey;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setScenarioKey(item.key)}
                className="flex items-center gap-3 border px-3 py-3 text-left transition"
                style={{ borderColor: selected ? `rgba(${item.rgb},0.34)` : "rgba(255,255,255,0.07)", background: selected ? `rgba(${item.rgb},0.065)` : "rgba(0,0,0,0.055)" }}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.25)` }}><Icon size={13} /></span>
                <strong className="text-[12px] text-white/82">{item.label}</strong>
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[360px] overflow-hidden border border-white/[0.07] bg-[#17100d]/42 backdrop-blur-[8px]">
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(251,146,60,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.09)_1px,transparent_1px)] [background-size:36px_36px]" />
          <svg className="absolute inset-[7%_5%_22%_5%] h-[71%] w-[90%]" viewBox="0 0 500 260" aria-hidden="true">
            <path d="M70 96 C132 49 278 47 390 78 C431 89 456 111 464 134 C444 167 398 184 318 188 C252 192 206 181 172 166 C151 157 133 160 113 177 C98 190 77 190 65 172 C49 148 50 116 70 96 Z" fill={`rgba(${scenario.rgb},0.035)`} stroke={`rgba(${scenario.rgb},0.48)`} strokeWidth="2" />
            <path d="M154 164 C174 180 186 196 183 230 C166 244 143 241 130 224 C126 195 129 176 139 165" fill={`rgba(${scenario.rgb},0.025)`} stroke={`rgba(${scenario.rgb},0.30)`} strokeWidth="2" />
            <ellipse cx="407" cy="126" rx="42" ry="40" fill="none" stroke={`rgba(${scenario.rgb},0.24)`} strokeWidth="2" />
            <rect x="257" y="70" width="42" height="18" rx="9" fill={`rgba(${scenario.rgb},0.14)`} stroke={`rgba(${scenario.rgb},0.34)`} />
            <path d="M111 101 L111 165 M219 66 L219 184 M325 65 L325 187" stroke={`rgba(${scenario.rgb},0.10)`} strokeDasharray="5 6" />
          </svg>
          <div className="absolute inset-x-4 bottom-4 border-t border-white/[0.07] pt-3 text-[12px] leading-5 text-stone-400/74">{scenario.prompt}</div>
        </div>

        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-600">Questions for the next prototype</div>
          <div className="mt-3 space-y-2">
            {scenario.notes.map((note, index) => (
              <div key={note} className="grid grid-cols-[30px_minmax(0,1fr)] gap-2 border-l-2 bg-black/[0.055] px-3 py-3" style={{ borderColor: `rgba(${scenario.rgb},0.32)` }}>
                <span className="font-mono text-[11px]" style={{ color: `rgba(${scenario.rgb},0.60)` }}>0{index + 1}</span>
                <p className="text-[12px] leading-5 text-stone-400/80">{note}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-white/[0.07] pt-3 text-[11px] leading-5 text-stone-500">Prototype the uncertainty. A foam model, appearance model, interaction mockup, service mockup, and production-intent build answer different questions.</p>
        </div>
      </div>
    </Surface>
  );
}
