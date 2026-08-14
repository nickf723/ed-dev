"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import PhysicsBackground from "../../../_components/PhysicsBackground";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  CircleDot,
  MoveRight,
  RotateCcw,
  ScanLine,
  X,
} from "lucide-react";

type ForceId = "gravity" | "normal" | "tension" | "friction" | "velocity" | "reaction";
type Direction = "up" | "down" | "left" | "right";

type Candidate = {
  id: ForceId;
  label: string;
  short: string;
  direction: Direction;
  rgb: string;
  explanation: string;
  isForce: boolean;
};

type Case = {
  id: string;
  label: string;
  scene: string;
  system: string;
  partners: readonly string[];
  candidates: readonly Candidate[];
  correct: readonly ForceId[];
};

const CASES: readonly Case[] = [
  {
    id: "sled",
    label: "Pulled sled",
    scene: "A sled moves right across snow while a taut rope pulls it to the right.",
    system: "sled",
    partners: ["Earth", "snow", "rope"],
    correct: ["gravity", "normal", "tension", "friction"],
    candidates: [
      { id: "gravity", label: "Earth on sled", short: "gravity", direction: "down", rgb: "167, 139, 250", explanation: "Earth gravitationally attracts the sled downward.", isForce: true },
      { id: "normal", label: "snow on sled", short: "normal", direction: "up", rgb: "34, 211, 238", explanation: "The snow surface pushes perpendicular to itself, upward here.", isForce: true },
      { id: "tension", label: "rope on sled", short: "tension", direction: "right", rgb: "251, 146, 60", explanation: "The taut rope pulls the sled along the rope toward the right.", isForce: true },
      { id: "friction", label: "snow friction on sled", short: "friction", direction: "left", rgb: "250, 204, 21", explanation: "The snow resists the sled's relative sliding across the surface.", isForce: true },
      { id: "velocity", label: "sled velocity", short: "velocity", direction: "right", rgb: "148, 163, 184", explanation: "Velocity describes motion. It is not an interaction, so it does not belong on a free-body diagram.", isForce: false },
      { id: "reaction", label: "sled on rope", short: "reaction pair", direction: "left", rgb: "244, 114, 182", explanation: "The sled exerts this force on the rope. It belongs on the rope's diagram, not the sled's.", isForce: false },
    ],
  },
  {
    id: "lamp",
    label: "Hanging lamp",
    scene: "A lamp hangs motionless from a vertical cable attached to the ceiling.",
    system: "lamp",
    partners: ["Earth", "cable"],
    correct: ["gravity", "tension"],
    candidates: [
      { id: "gravity", label: "Earth on lamp", short: "gravity", direction: "down", rgb: "167, 139, 250", explanation: "Earth attracts the lamp downward.", isForce: true },
      { id: "tension", label: "cable on lamp", short: "tension", direction: "up", rgb: "251, 146, 60", explanation: "The taut cable pulls upward on the lamp.", isForce: true },
      { id: "normal", label: "ceiling normal on lamp", short: "normal", direction: "up", rgb: "34, 211, 238", explanation: "The lamp is not touching the ceiling directly, so the ceiling does not exert a normal force on the lamp.", isForce: false },
      { id: "velocity", label: "zero velocity", short: "velocity", direction: "right", rgb: "148, 163, 184", explanation: "Being motionless describes the state of motion; zero velocity is not a force.", isForce: false },
    ],
  },
  {
    id: "book",
    label: "Book on ramp",
    scene: "A book rests on a rough ramp that rises toward the right.",
    system: "book",
    partners: ["Earth", "ramp"],
    correct: ["gravity", "normal", "friction"],
    candidates: [
      { id: "gravity", label: "Earth on book", short: "gravity", direction: "down", rgb: "167, 139, 250", explanation: "Gravity still points toward Earth, vertically downward in this local sketch.", isForce: true },
      { id: "normal", label: "ramp normal on book", short: "normal", direction: "up", rgb: "34, 211, 238", explanation: "The ramp pushes perpendicular to its surface. The simplified arrow here marks that support interaction.", isForce: true },
      { id: "friction", label: "ramp friction on book", short: "friction", direction: "right", rgb: "250, 204, 21", explanation: "Static friction acts along the ramp to oppose the book's tendency to slide down it.", isForce: true },
      { id: "velocity", label: "down-ramp tendency", short: "motion tendency", direction: "left", rgb: "148, 163, 184", explanation: "A tendency to move is not itself a force. The interaction that prevents sliding is friction.", isForce: false },
      { id: "reaction", label: "book on ramp", short: "reaction pair", direction: "down", rgb: "244, 114, 182", explanation: "That force acts on the ramp, so it belongs on the ramp's diagram.", isForce: false },
    ],
  },
] as const;

export default function FreeBodyDiagramsPage() {
  const [caseIndex, setCaseIndex] = useState(0);
  const [selected, setSelected] = useState<ForceId[]>([]);
  const [checked, setChecked] = useState(false);
  const current = CASES[caseIndex];

  const correctSet = useMemo(() => new Set<ForceId>(current.correct), [current]);
  const selectedSet = useMemo(() => new Set<ForceId>(selected), [selected]);
  const allCorrect = selected.length === current.correct.length && current.correct.every((id) => selectedSet.has(id));

  function chooseCase(index: number) {
    setCaseIndex(index);
    setSelected([]);
    setChecked(false);
  }

  function toggle(id: ForceId) {
    setSelected((currentSelected) => currentSelected.includes(id) ? currentSelected.filter((item) => item !== id) : [...currentSelected, id]);
    setChecked(false);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#060a0f] text-slate-100 selection:bg-cyan-300/25">
      <PhysicsBackground mode="classical" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60" aria-hidden="true">
        <div className="absolute left-[9%] top-[27%] h-px w-[42%] -rotate-4 bg-gradient-to-r from-transparent via-cyan-300/36 to-transparent" />
        <div className="absolute right-[7%] top-[49%] h-px w-[34%] rotate-5 bg-gradient-to-r from-transparent via-violet-300/28 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#060a0f]/78 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Forces", href: "/natural-science/physics/mechanics/forces" },
              { label: "Free-Body Diagrams" },
            ]}
            eyebrow="Choose system · identify partners · draw vectors"
            icon={ScanLine}
            title={<span>Free-Body Diagrams</span>}
            subtitle="Replace a complicated physical scene with one chosen system and the external force vectors acting on it. The simplification is the point."
            accentRgb="34, 211, 238"
            titleClassName="font-mono text-[clamp(2.1rem,4.4vw,4.5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f4fdff]"
            headerClassName="border-transparent"
            aside={<div className="rounded-full border border-cyan-200/[0.10] bg-black/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.11em] text-cyan-100/65 backdrop-blur-md">Forces · 03 / 05</div>}
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-cyan-200/[0.09] bg-black/[0.13] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.04fr)_minmax(300px,0.96fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.4rem)] font-semibold tracking-[-0.04em] text-white">How do we strip a messy scene down to only the forces that matter for one object?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Choose the system first. Then list the external interaction partners touching or influencing that system. Convert each interaction into one force vector. Everything else stays out of the diagram.</p>
          </div>
          <div className="rounded-[18px] border border-cyan-200/[0.09] bg-cyan-300/[0.022] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-300/62">Diagram contract</div>
            <div className="mt-3 text-[17px] text-white"><M>{"\\text{one system} + \\text{all external } \\vec F"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Motion arrows, future tendencies, and forces exerted by the system on other objects are not part of the free-body diagram.</p>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.08] bg-black/[0.14] p-5 backdrop-blur-xl sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/68">Worked model</div>
              <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-white">A book resting on a level table.</h2>
              <div className="mt-4 space-y-3 text-[12px] leading-6 text-slate-400">
                <p><strong className="text-white">1. System:</strong> choose the book.</p>
                <p><strong className="text-white">2. Partners:</strong> Earth interacts gravitationally; the table interacts by contact.</p>
                <p><strong className="text-white">3. Vectors:</strong> gravity points downward and the table's normal force points upward.</p>
                <p><strong className="text-white">4. Omit:</strong> no “rest force,” no velocity arrow, and no book-on-table reaction force.</p>
              </div>
            </div>
            <WorkedDiagram />
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.24fr)_minmax(320px,0.76fr)]">
          <div className="rounded-[30px] border border-white/[0.09] bg-black/[0.15] p-4 backdrop-blur-xl sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 px-1">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/68">Diagram builder</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.03em] text-white">Which vectors belong on the {current.system}?</h2>
              </div>
              <button type="button" onClick={() => { setSelected([]); setChecked(false); }} className="rounded-full border border-white/[0.06] p-2 text-slate-600 transition hover:text-slate-300" aria-label="Reset diagram"><RotateCcw size={13} /></button>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
              <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.012] p-4">
                <div className="text-[9px] uppercase tracking-[0.11em] text-slate-600">Physical scene</div>
                <p className="mt-2 text-[12px] leading-6 text-slate-400">{current.scene}</p>
                <div className="mt-4 text-[9px] uppercase tracking-[0.11em] text-slate-600">Known interaction partners</div>
                <div className="mt-2 flex flex-wrap gap-2">{current.partners.map((partner) => <span key={partner} className="rounded-full border border-white/[0.06] bg-black/20 px-2.5 py-1 text-[9px] text-slate-500">{partner}</span>)}</div>

                <div className="mt-5 space-y-2">
                  {current.candidates.map((candidate) => {
                    const active = selected.includes(candidate.id);
                    return <button key={candidate.id} type="button" onClick={() => toggle(candidate.id)} className="w-full rounded-[13px] border px-3 py-2.5 text-left transition" style={{ borderColor: active ? `rgba(${candidate.rgb},0.25)` : "rgba(255,255,255,0.05)", background: active ? `rgba(${candidate.rgb},0.045)` : "rgba(255,255,255,0.008)" }}><span className="text-[10px]" style={{ color: active ? `rgb(${candidate.rgb})` : "rgb(100,116,139)" }}>{candidate.label}</span></button>;
                  })}
                </div>
              </div>

              <FreeBodyCanvas system={current.system} candidates={current.candidates} selected={selected} checked={checked} correctSet={correctSet} />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[17px] border border-white/[0.06] bg-black/[0.12] px-4 py-3">
              <div className="text-[10px] text-slate-500">Selected {selected.length} vector{selected.length === 1 ? "" : "s"}.</div>
              <button type="button" onClick={() => setChecked(true)} className="rounded-full border border-cyan-200/[0.16] bg-cyan-300/[0.055] px-4 py-2 text-[10px] font-semibold text-cyan-100 transition hover:bg-cyan-300/[0.09]">Check diagram</button>
            </div>

            {checked ? <DiagramFeedback current={current} selected={selected} allCorrect={allCorrect} /> : null}
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.15] p-4 backdrop-blur-xl">
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">Transfer cases</div>
              <div className="mt-3 space-y-2">{CASES.map((item, index) => <button key={item.id} type="button" onClick={() => chooseCase(index)} className={`w-full rounded-[14px] border px-3 py-3 text-left transition ${caseIndex === index ? "border-cyan-200/22 bg-cyan-300/[0.045]" : "border-white/[0.05] bg-white/[0.01] hover:border-white/[0.11]"}`}><strong className={`block text-[10px] ${caseIndex === index ? "text-white" : "text-slate-500"}`}>{item.label}</strong><span className="mt-1 block text-[9px] leading-4 text-slate-700">system: {item.system}</span></button>)}</div>
            </div>

            <div className="rounded-[24px] border border-violet-200/[0.10] bg-violet-300/[0.02] p-5 backdrop-blur-xl">
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/65">Boundary rule</div>
              <p className="mt-3 text-[12px] leading-6 text-slate-400">A free-body diagram is not a picture of the scene. It is a bookkeeping model for external interactions acting on exactly one chosen system.</p>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <RuleCard title="Velocity is not a force" text="Motion can be drawn separately when useful, but a velocity arrow does not belong in the force inventory." rgb="148, 163, 184" />
          <RuleCard title="Reaction pairs split across diagrams" text="The force your system exerts on another object belongs on that other object's free-body diagram." rgb="244, 114, 182" />
          <RuleCard title="Components are not extra forces" text="Breaking one angled force into x and y components is a mathematical rewrite of that force, not two additional interactions." rgb="250, 204, 21" />
        </section>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pb-5">
          <Link href="/natural-science/physics/mechanics/forces/common-forces" className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-2 text-[10px] font-semibold text-slate-500 transition hover:text-slate-300">← Common Forces</Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/[0.08] bg-emerald-300/[0.018] px-3 py-2 text-[10px] text-slate-600">Next: Net Force & Equilibrium <ArrowRight size={12} /></div>
        </div>
      </div>
    </main>
  );
}

function WorkedDiagram() {
  return (
    <div className="relative min-h-[260px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#071019]/82">
      <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[18px] border border-cyan-200/[0.22] bg-cyan-300/[0.045]" />
      <DiagramArrow direction="up" label="normal" rgb="34, 211, 238" />
      <DiagramArrow direction="down" label="gravity" rgb="167, 139, 250" />
      <div className="absolute bottom-5 left-5 right-5 text-center font-mono text-[9px] text-slate-600">book isolated from the scene</div>
    </div>
  );
}

function FreeBodyCanvas({ system, candidates, selected, checked, correctSet }: { system: string; candidates: readonly Candidate[]; selected: readonly ForceId[]; checked: boolean; correctSet: Set<ForceId> }) {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#071019]/82">
      <div className="absolute inset-0 opacity-35" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[21px] border border-cyan-200/[0.24] bg-cyan-300/[0.05] shadow-[0_0_42px_rgba(34,211,238,0.08)]">
        <div className="flex h-full items-center justify-center text-[12px] font-semibold text-white">{system}</div>
      </div>
      {candidates.filter((candidate) => selected.includes(candidate.id) && candidate.isForce).map((candidate) => <DiagramArrow key={candidate.id} direction={candidate.direction} label={candidate.short} rgb={candidate.rgb} />)}
      {candidates.filter((candidate) => selected.includes(candidate.id) && !candidate.isForce).map((candidate, index) => <div key={candidate.id} className="absolute left-4 rounded-[12px] border border-rose-200/[0.10] bg-rose-300/[0.02] px-3 py-2 font-mono text-[9px] text-rose-100/55" style={{ bottom: `${16 + index * 38}px` }}>{candidate.short} ?</div>)}
      <div className="absolute left-4 top-4 rounded-full border border-white/[0.06] bg-black/20 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">free-body diagram</div>
      {checked ? <div className={`absolute right-4 top-4 rounded-full border px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] ${selected.every((id) => correctSet.has(id)) ? "border-cyan-200/[0.10] text-cyan-100/55" : "border-rose-200/[0.10] text-rose-100/55"}`}>checked state</div> : null}
    </div>
  );
}

function DiagramArrow({ direction, label, rgb }: { direction: Direction; label: string; rgb: string }) {
  const config = {
    up: { line: "left-1/2 top-[15%] h-[27%] w-px", label: "left-[53%] top-[18%]", Icon: ArrowUp },
    down: { line: "left-1/2 top-[58%] h-[27%] w-px", label: "left-[53%] top-[76%]", Icon: ArrowDown },
    left: { line: "left-[15%] top-1/2 h-px w-[27%]", label: "left-[16%] top-[53%]", Icon: ArrowLeft },
    right: { line: "left-[58%] top-1/2 h-px w-[27%]", label: "left-[71%] top-[53%]", Icon: ArrowRight },
  }[direction];
  return (
    <>
      <div className={`absolute ${config.line}`} style={{ background: `rgba(${rgb},0.72)`, boxShadow: `0 0 18px rgba(${rgb},0.14)` }} />
      <config.Icon className="absolute" size={15} style={{ color: `rgb(${rgb})`, left: direction === "up" || direction === "down" ? "calc(50% - 7px)" : direction === "left" ? "14%" : "84%", top: direction === "up" ? "13%" : direction === "down" ? "84%" : "calc(50% - 7px)" }} />
      <div className={`absolute ${config.label} font-mono text-[9px]`} style={{ color: `rgba(${rgb},0.72)` }}>{label}</div>
    </>
  );
}

function DiagramFeedback({ current, selected, allCorrect }: { current: Case; selected: readonly ForceId[]; allCorrect: boolean }) {
  if (allCorrect) return <div className="mt-3 flex items-start gap-2 rounded-[15px] border border-emerald-300/[0.14] bg-emerald-300/[0.022] px-4 py-3 text-[10px] leading-5 text-emerald-100/72"><Check size={13} className="mt-0.5 shrink-0" />Complete. Every selected vector is an external force acting on the {current.system}, and every required interaction partner is represented.</div>;
  const selectedSet = new Set(selected);
  const missing = current.correct.filter((id) => !selectedSet.has(id));
  const extras = current.candidates.filter((candidate) => selectedSet.has(candidate.id) && !current.correct.includes(candidate.id));
  return (
    <div className="mt-3 rounded-[15px] border border-amber-300/[0.13] bg-amber-300/[0.02] px-4 py-3 text-[10px] leading-5 text-slate-400">
      <div className="flex items-center gap-2 text-amber-100/72"><X size={13} />Not complete yet.</div>
      {missing.length > 0 ? <p className="mt-2">Missing interaction{missing.length === 1 ? "" : "s"}: {missing.join(", ")}.</p> : null}
      {extras.map((candidate) => <p key={candidate.id} className="mt-2"><strong className="text-slate-300">{candidate.short}:</strong> {candidate.explanation}</p>)}
    </div>
  );
}

function RuleCard({ title, text, rgb }: { title: string; text: string; rgb: string }) {
  return <div className="rounded-[19px] border border-white/[0.06] bg-black/[0.14] p-4 backdrop-blur-xl"><div className="h-1 w-8 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><h3 className="mt-3 text-[13px] font-semibold text-white">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
