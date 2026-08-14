"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import PhysicsBackground from "../../../_components/PhysicsBackground";
import {
  ArrowRight,
  Check,
  Cloud,
  Compass,
  Feather,
  Link2,
  Magnet,
  RotateCcw,
  Shield,
  Sparkles,
  Waves,
  X,
  type LucideIcon,
} from "lucide-react";

type ForceKind = {
  id: string;
  name: string;
  partner: string;
  interaction: string;
  direction: string;
  misconception: string;
  icon: LucideIcon;
  rgb: string;
  contact: boolean;
};

const FORCE_KINDS: readonly ForceKind[] = [
  {
    id: "gravity",
    name: "Gravity",
    partner: "another mass, usually Earth nearby",
    interaction: "gravitational attraction",
    direction: "toward the interacting mass",
    misconception: "Gravity is not simply 'the downward force.' Down is only a local direction near a planet's surface.",
    icon: Compass,
    rgb: "167, 139, 250",
    contact: false,
  },
  {
    id: "normal",
    name: "Normal Force",
    partner: "a surface in contact with the system",
    interaction: "surface compression / contact",
    direction: "perpendicular to the local surface",
    misconception: "Normal force is not automatically equal to weight, and it is not always vertical.",
    icon: Shield,
    rgb: "34, 211, 238",
    contact: true,
  },
  {
    id: "friction",
    name: "Friction",
    partner: "a touching surface",
    interaction: "surface contact resisting relative sliding",
    direction: "parallel to the surface, opposing relative sliding or its tendency",
    misconception: "Friction does not simply point opposite an object's velocity. It opposes relative motion between surfaces.",
    icon: Feather,
    rgb: "250, 204, 21",
    contact: true,
  },
  {
    id: "tension",
    name: "Tension",
    partner: "a taut rope, string, cable, or similar connector",
    interaction: "pull transmitted through a stretched connector",
    direction: "along the connector, pulling away from the system",
    misconception: "An ideal rope pulls. It does not push an attached object by tension.",
    icon: Link2,
    rgb: "251, 146, 60",
    contact: true,
  },
  {
    id: "spring",
    name: "Spring Force",
    partner: "a stretched or compressed elastic object",
    interaction: "elastic deformation",
    direction: "toward the spring's equilibrium configuration",
    misconception: "The restoring direction depends on how the spring is deformed, not on a fixed compass direction.",
    icon: Sparkles,
    rgb: "45, 212, 191",
    contact: true,
  },
  {
    id: "drag",
    name: "Drag",
    partner: "a fluid such as air or water",
    interaction: "motion relative to surrounding fluid",
    direction: "opposite the system's motion relative to the fluid",
    misconception: "Drag depends on motion relative to the fluid, so wind or flowing water can change its direction.",
    icon: Waves,
    rgb: "96, 165, 250",
    contact: true,
  },
] as const;

type QuizId = "book" | "rope" | "wind";

const QUIZ = [
  {
    id: "book" as const,
    prompt: "A book rests on a tilted ramp. Which force from the ramp acts perpendicular to the ramp?",
    correct: "normal",
    options: ["normal", "friction", "gravity"],
    explanation: "The ramp is the interaction partner and the perpendicular contact force is the normal force. Its direction tilts with the surface.",
  },
  {
    id: "rope" as const,
    prompt: "A climber hangs from a taut rope. Which force from the rope acts along the rope?",
    correct: "tension",
    options: ["gravity", "tension", "spring"],
    explanation: "A taut rope transmits a pull along its own length. That interaction is modeled as tension.",
  },
  {
    id: "wind" as const,
    prompt: "A cyclist rides east while a strong wind blows east even faster. Which force from the air can point east?",
    correct: "drag",
    options: ["drag", "friction", "normal"],
    explanation: "Drag opposes motion relative to the air. If the air overtakes the cyclist from behind, the drag force can point east.",
  },
] as const;

export default function CommonForcesPage() {
  const [activeId, setActiveId] = useState("gravity");
  const [answers, setAnswers] = useState<Partial<Record<QuizId, string>>>({});
  const force = FORCE_KINDS.find((item) => item.id === activeId) ?? FORCE_KINDS[0];
  const ActiveIcon = force.icon;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#060a0f] text-slate-100 selection:bg-cyan-300/25">
      <PhysicsBackground mode="classical" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-65" aria-hidden="true">
        <div className="absolute left-[12%] top-[26%] h-80 w-80 rounded-full bg-cyan-300/[0.07] blur-[110px]" />
        <div className="absolute right-[7%] top-[44%] h-96 w-96 rounded-full bg-yellow-300/[0.055] blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#060a0f]/78 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Forces", href: "/natural-science/physics/mechanics/forces" },
              { label: "Common Forces" },
            ]}
            eyebrow="Interaction partner · force identity · direction"
            icon={Magnet}
            title={<span>Common Forces</span>}
            subtitle="Recognize familiar force models by asking what is interacting with the system and how that interaction constrains the force direction."
            accentRgb="34, 211, 238"
            titleClassName="font-mono text-[clamp(2.3rem,4.6vw,4.7rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f5fdff]"
            headerClassName="border-transparent"
            aside={
              <div className="rounded-full border border-cyan-200/[0.10] bg-black/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.11em] text-cyan-100/65 backdrop-blur-md">
                Forces · 02 / 05
              </div>
            }
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-cyan-200/[0.09] bg-black/[0.13] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.4rem)] font-semibold tracking-[-0.04em] text-white">How can you identify a force without memorizing which way its arrow usually points?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Start with the interaction partner. A surface suggests normal force or friction. A taut rope suggests tension. Earth suggests gravity. A fluid suggests drag. Direction comes from the geometry of that interaction, not from a memorized page orientation.</p>
          </div>
          <div className="rounded-[18px] border border-cyan-200/[0.09] bg-cyan-300/[0.022] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-300/62">Identification rule</div>
            <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate-400">
              <span className="text-yellow-200/80">partner</span><ArrowRight size={12} className="text-slate-700" />
              <span className="text-cyan-200/80">interaction</span><ArrowRight size={12} className="text-slate-700" />
              <span className="text-violet-200/80">force direction</span>
            </div>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">The name is shorthand for the physical interaction, not shorthand for a compass direction.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.09] bg-black/[0.14] p-4 backdrop-blur-xl sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 px-1">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/68">Force atlas</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.03em] text-white">Select an interaction family.</h2>
              </div>
              <span className="rounded-full border border-white/[0.06] px-3 py-1.5 font-mono text-[9px] text-slate-600">{force.contact ? "contact interaction" : "non-contact interaction"}</span>
            </div>

            <div className="relative mt-4 min-h-[360px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#071019]/82 p-5">
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `radial-gradient(circle at center, rgba(${force.rgb},0.07) 0 2px, transparent 2.5px)`, backgroundSize: "42px 42px" }} />
              <div className="relative z-10 flex items-center justify-between text-[9px] uppercase tracking-[0.12em] text-slate-600">
                <span>interaction partner</span><span>chosen system</span>
              </div>

              <div className="relative z-10 mx-auto mt-10 h-[190px] max-w-[700px]">
                <div className="absolute left-[12%] top-1/2 -translate-y-1/2">
                  <PartnerNode force={force} />
                </div>
                <div className="absolute right-[12%] top-1/2 -translate-y-1/2">
                  <div className="flex h-28 w-28 flex-col items-center justify-center rounded-[27px] border border-white/[0.13] bg-white/[0.025] text-center shadow-2xl">
                    <ActiveIcon size={28} style={{ color: `rgb(${force.rgb})` }} />
                    <span className="mt-2 text-[10px] font-semibold text-white">system</span>
                  </div>
                </div>
                <div className="absolute left-[31%] right-[31%] top-1/2 h-px bg-gradient-to-r from-slate-500/20 via-white/28 to-transparent" />
                <div className="absolute right-[31%] top-[calc(50%-4px)] h-2 w-2 rotate-45 border-r border-t" style={{ borderColor: `rgba(${force.rgb},0.82)` }} />
                <div className="absolute left-1/2 top-[30%] -translate-x-1/2 rounded-full border px-3 py-1.5 font-mono text-[9px]" style={{ color: `rgba(${force.rgb},0.78)`, borderColor: `rgba(${force.rgb},0.12)`, background: `rgba(${force.rgb},0.03)` }}>{force.name}</div>
              </div>

              <div className="relative z-10 grid gap-2 sm:grid-cols-3">
                <Readout label="Partner" value={force.partner} rgb={force.rgb} />
                <Readout label="Interaction" value={force.interaction} rgb={force.rgb} />
                <Readout label="Direction" value={force.direction} rgb={force.rgb} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.15] p-4 backdrop-blur-xl">
              <div className="grid grid-cols-2 gap-2">
                {FORCE_KINDS.map((item) => {
                  const Icon = item.icon;
                  const active = item.id === force.id;
                  return (
                    <button key={item.id} type="button" onClick={() => setActiveId(item.id)} className="rounded-[15px] border p-3 text-left transition" style={{ borderColor: active ? `rgba(${item.rgb},0.28)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${item.rgb},0.055)` : "rgba(255,255,255,0.012)" }}>
                      <Icon size={15} style={{ color: active ? `rgb(${item.rgb})` : "rgb(100,116,139)" }} />
                      <strong className={`mt-2 block text-[10px] ${active ? "text-white" : "text-slate-500"}`}>{item.name}</strong>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[24px] border border-amber-200/[0.10] bg-amber-300/[0.02] p-5 backdrop-blur-xl">
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/64">Common shortcut to avoid</div>
              <p className="mt-3 text-[12px] leading-6 text-slate-400">{force.misconception}</p>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <RuleCard title="Contact does not mean one force" text="The same pair of touching surfaces can produce both a perpendicular normal force and a parallel friction force." rgb="34, 211, 238" />
          <RuleCard title="Direction follows geometry" text="Normal follows the surface normal, tension follows the connector, spring force follows deformation, and drag follows relative fluid motion." rgb="250, 204, 21" />
          <RuleCard title="Names are models" text="Force names summarize interaction mechanisms. They help us build a free-body diagram without redrawing every microscopic detail." rgb="167, 139, 250" />
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.08] bg-black/[0.15] p-5 backdrop-blur-xl sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/68">Transfer check</div>
              <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.03em] text-white">Identify the interaction, not the arrow stereotype.</h2>
            </div>
            <button type="button" onClick={() => setAnswers({})} className="rounded-full border border-white/[0.06] p-2 text-slate-600 transition hover:text-slate-300" aria-label="Reset transfer check"><RotateCcw size={13} /></button>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {QUIZ.map((item) => (
              <QuizCard key={item.id} item={item} selected={answers[item.id]} onSelect={(value) => setAnswers({ ...answers, [item.id]: value })} />
            ))}
          </div>
        </section>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pb-5">
          <Link href="/natural-science/physics/mechanics/forces/interactions" className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-2 text-[10px] font-semibold text-slate-500 transition hover:text-slate-300">← Forces as Interactions</Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/[0.08] bg-cyan-300/[0.018] px-3 py-2 text-[10px] text-slate-600">Next: Free-Body Diagrams <ArrowRight size={12} /></div>
        </div>
      </div>
    </main>
  );
}

function PartnerNode({ force }: { force: ForceKind }) {
  const Icon = force.contact ? Cloud : Compass;
  return (
    <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border text-center" style={{ color: `rgb(${force.rgb})`, borderColor: `rgba(${force.rgb},0.25)`, background: `rgba(${force.rgb},0.055)`, boxShadow: `0 0 45px rgba(${force.rgb},0.10)` }}>
      <Icon size={26} />
      <span className="mt-2 max-w-[92px] text-[9px] leading-4">interaction partner</span>
    </div>
  );
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return (
    <div className="rounded-[15px] border border-white/[0.06] bg-black/[0.16] p-3">
      <div className="text-[8px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.60)` }}>{label}</div>
      <div className="mt-1 text-[10px] leading-4 text-slate-400">{value}</div>
    </div>
  );
}

function RuleCard({ title, text, rgb }: { title: string; text: string; rgb: string }) {
  return (
    <div className="rounded-[19px] border border-white/[0.06] bg-black/[0.14] p-4 backdrop-blur-xl">
      <div className="h-1 w-8 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} />
      <h3 className="mt-3 text-[13px] font-semibold text-white">{title}</h3>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p>
    </div>
  );
}

type QuizItem = (typeof QUIZ)[number];

function QuizCard({ item, selected, onSelect }: { item: QuizItem; selected?: string; onSelect: (value: string) => void }) {
  const correct = selected === item.correct;
  return (
    <div className="rounded-[19px] border border-white/[0.06] bg-black/[0.13] p-4">
      <div className="text-[11px] leading-5 text-slate-300">{item.prompt}</div>
      <div className="mt-3 space-y-2">
        {item.options.map((option) => {
          const force = FORCE_KINDS.find((candidate) => candidate.id === option);
          return (
            <button key={option} type="button" onClick={() => onSelect(option)} className={`w-full rounded-[12px] border px-3 py-2 text-left text-[10px] transition ${selected === option ? "border-cyan-200/22 bg-cyan-300/[0.045] text-white" : "border-white/[0.05] text-slate-600 hover:text-slate-300"}`}>{force?.name ?? option}</button>
          );
        })}
      </div>
      {selected ? (
        <div className={`mt-3 flex items-start gap-2 rounded-[12px] border px-3 py-2 text-[9px] leading-4 ${correct ? "border-emerald-300/[0.13] bg-emerald-300/[0.022] text-emerald-100/70" : "border-rose-300/[0.12] bg-rose-300/[0.018] text-rose-100/65"}`}>
          {correct ? <Check size={12} className="mt-0.5 shrink-0" /> : <X size={12} className="mt-0.5 shrink-0" />} {correct ? item.explanation : "Re-identify the interaction partner first, then choose the force model that matches that interaction."}
        </div>
      ) : null}
    </div>
  );
}
