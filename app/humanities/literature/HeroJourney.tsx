"use client";

import { useState } from "react";
import {
  Compass,
  DoorOpen,
  Home,
  KeyRound,
  Mountain,
  RotateCcw,
  ShieldQuestion,
  Sparkles,
  Swords,
  Trophy,
  UsersRound,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type Stage = {
  id: number;
  act: "Departure" | "Initiation" | "Return";
  label: string;
  icon: LucideIcon;
  description: string;
  question: string;
  rgb: string;
};

const STAGES: readonly Stage[] = [
  { id: 1, act: "Departure", label: "Ordinary World", icon: Home, description: "Establish the character's existing routines, relationships, needs, and constraints before the central disruption.", question: "What does normal look like, and what is already unresolved?", rgb: "251,191,36" },
  { id: 2, act: "Departure", label: "Call to Adventure", icon: Compass, description: "A demand, discovery, threat, desire, or opportunity creates pressure to move beyond the current situation.", question: "What changes the cost of staying still?", rgb: "251,191,36" },
  { id: 3, act: "Departure", label: "Refusal", icon: ShieldQuestion, description: "The character hesitates, resists, bargains, or reveals why the coming change is difficult.", question: "What fear, loyalty, ignorance, or practical barrier resists change?", rgb: "251,191,36" },
  { id: 4, act: "Departure", label: "Mentor or Aid", icon: WandSparkles, description: "Knowledge, equipment, permission, warning, training, or support changes what the character can attempt.", question: "What new resource makes a different choice possible?", rgb: "251,191,36" },
  { id: 5, act: "Departure", label: "Threshold", icon: DoorOpen, description: "The character crosses into a situation where old routines no longer provide enough control or certainty.", question: "Which decision makes the journey difficult to undo?", rgb: "251,191,36" },
  { id: 6, act: "Initiation", label: "Tests & Relations", icon: UsersRound, description: "Conflicts, alliances, skills, rules, and recurring pressures teach the character how the new world behaves.", question: "Which repeated situations expose the story's real pressures?", rgb: "167,139,250" },
  { id: 7, act: "Initiation", label: "Approach", icon: Mountain, description: "The story narrows toward a difficult confrontation, revelation, commitment, or irreversible risk.", question: "What must be prepared, surrendered, or understood before the central test?", rgb: "167,139,250" },
  { id: 8, act: "Initiation", label: "Ordeal", icon: Swords, description: "A major crisis forces the character, group, or value system into a decisive test with meaningful consequences.", question: "What is placed at maximum risk, and why does the outcome matter?", rgb: "167,139,250" },
  { id: 9, act: "Initiation", label: "Reward", icon: Trophy, description: "The crisis produces knowledge, status, reconciliation, an object, a victory, or another consequence that changes the available future.", question: "What has been gained, and what did gaining it cost?", rgb: "167,139,250" },
  { id: 10, act: "Return", label: "Road Back", icon: RotateCcw, description: "The character must act on what has changed rather than letting the central victory or revelation end the story immediately.", question: "Which consequences follow the character out of the crisis?", rgb: "94,234,212" },
  { id: 11, act: "Return", label: "Final Test", icon: Sparkles, description: "A final pressure asks whether the transformation survives contact with a renewed version of the old problem.", question: "Can the character now respond differently to a familiar kind of pressure?", rgb: "94,234,212" },
  { id: 12, act: "Return", label: "Return with Change", icon: KeyRound, description: "The ending shows what knowledge, relationship, capacity, wound, or altered order persists after the journey.", question: "What is different now, and who besides the protagonist is affected?", rgb: "94,234,212" },
] as const;

export default function HeroJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const current = STAGES[activeStep];
  const CurrentIcon = current.icon;

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[32px] border-amber-100/[0.12]"
      style={{ background: "rgba(31,17,13,0.32)" }}
    >
      <div className="grid border-b border-amber-100/[0.08] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-amber-200/68">
            <Compass size={14} /> Narrative pattern lens · twelve-stage teaching model
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.3vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
            Use a story pattern as a question generator, not a mold every story must fit.
          </h2>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-stone-300/70">
            Select a stage to examine one familiar version of the hero-journey pattern. A text may compress stages, reorder them, distribute them among several characters, refuse the return, or reject this pattern altogether.
          </p>
        </div>
        <div className="border-t border-amber-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[14px] lg:border-l lg:border-t-0">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-rose-200/60">Model boundary</div>
          <p className="mt-3 text-[13px] leading-6 text-stone-300/64">
            This is one influential narrative template, not a universal theory of literature. Applying it too aggressively can flatten cultural differences, non-quest structures, ensemble narratives, lyric forms, and texts whose point is precisely to resist closure.
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-[430px_minmax(0,1fr)]">
        <div className="border-b border-amber-100/[0.08] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div className="relative mx-auto aspect-square w-full max-w-[390px]">
            <div className="absolute inset-[13%] rounded-full border border-dashed border-amber-200/[0.17]" />
            <div className="absolute inset-[27%] flex items-center justify-center rounded-full border border-amber-100/[0.10] bg-[#1a0f0d]/58 text-center shadow-[inset_0_0_60px_rgba(0,0,0,0.18)] backdrop-blur-[8px]">
              <span className="px-4">
                <CurrentIcon size={24} className="mx-auto" style={{ color: `rgb(${current.rgb})` }} />
                <span className="mt-3 block font-mono text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${current.rgb},0.74)` }}>{current.act}</span>
                <strong className="mt-1 block text-[15px] leading-5 text-white">{current.label}</strong>
              </span>
            </div>

            {STAGES.map((stage, index) => {
              const angle = (index / STAGES.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 42;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;
              const selected = index === activeStep;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  aria-label={`Stage ${stage.id}: ${stage.label}`}
                  className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-[11px] transition"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    color: selected ? "#fff" : `rgba(${stage.rgb},0.68)`,
                    borderColor: selected ? `rgba(${stage.rgb},0.72)` : `rgba(${stage.rgb},0.24)`,
                    background: selected ? `rgba(${stage.rgb},0.22)` : "rgba(26,15,13,0.74)",
                    boxShadow: selected ? `0 0 24px rgba(${stage.rgb},0.22)` : undefined,
                  }}
                >
                  {stage.id}
                </button>
              );
            })}
          </div>

          <div className="mt-2 grid grid-cols-3 border-y border-white/[0.07] font-mono text-[11px] uppercase tracking-[0.07em]">
            <span className="px-2 py-2 text-center text-amber-200/52">Departure · 1–5</span>
            <span className="border-x border-white/[0.07] px-2 py-2 text-center text-violet-200/52">Initiation · 6–9</span>
            <span className="px-2 py-2 text-center text-emerald-200/52">Return · 10–12</span>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-stone-500">Selected stage</div>
            <span className="font-mono text-[11px] text-stone-600">{String(current.id).padStart(2, "0")} / 12</span>
          </div>
          <div className="mt-3 border-l pl-4" style={{ borderColor: `rgba(${current.rgb},0.34)` }}>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${current.rgb},0.72)` }}>{current.act}</div>
            <h3 className="mt-1 text-[25px] font-semibold tracking-[-0.035em] text-white">{current.label}</h3>
            <p className="mt-3 text-[14px] leading-6 text-stone-300/70">{current.description}</p>
          </div>

          <div className="mt-5 rounded-[20px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-[10px]">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-amber-200/52">Close-reading question</div>
            <p className="mt-2 text-[17px] font-medium leading-7 text-white/82">{current.question}</p>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <LensPrompt label="Compare" text="Does another character experience the same event as a different stage?" />
            <LensPrompt label="Resist" text="What changes if the text refuses, reverses, or never supplies this stage?" />
          </div>
        </div>
      </div>
    </Surface>
  );
}

function LensPrompt({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-t border-amber-100/[0.10] pt-3">
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-500">{label}</div>
      <p className="mt-1 text-[12px] leading-5 text-stone-400/68">{text}</p>
    </div>
  );
}
