"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import PhysicsBackground from "../../../_components/PhysicsBackground";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Equal,
  Gauge,
  RotateCcw,
  Scale,
  X,
} from "lucide-react";

type Preset = { label: string; left: number; right: number; note: string };

const PRESETS: readonly Preset[] = [
  { label: "Balanced", left: 6, right: 6, note: "equal opposite forces" },
  { label: "Right wins", left: 3, right: 8, note: "net force right" },
  { label: "Left wins", left: 9, right: 4, note: "net force left" },
  { label: "No horizontal forces", left: 0, right: 0, note: "still equilibrium" },
] as const;

type CheckId = "moving" | "forces" | "direction";

export default function NetForcePage() {
  const [leftForce, setLeftForce] = useState(6);
  const [rightForce, setRightForce] = useState(6);
  const [answers, setAnswers] = useState<Partial<Record<CheckId, string>>>({});
  const net = rightForce - leftForce;
  const magnitude = Math.abs(net);
  const equilibrium = magnitude < 0.001;
  const direction = equilibrium ? "none" : net > 0 ? "right" : "left";

  const interpretation = equilibrium
    ? "Horizontal acceleration is zero. The object could be at rest or moving with constant horizontal velocity."
    : `The net force points ${direction}, so the object's velocity will change in that direction.`;

  function applyPreset(preset: Preset) {
    setLeftForce(preset.left);
    setRightForce(preset.right);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#060a0f] text-slate-100 selection:bg-emerald-300/25">
      <PhysicsBackground mode="classical" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-65" aria-hidden="true">
        <div className="absolute left-[6%] top-[35%] h-px w-[43%] bg-gradient-to-r from-transparent via-yellow-300/32 to-emerald-300/18" />
        <div className="absolute right-[5%] top-[35%] h-px w-[43%] bg-gradient-to-l from-transparent via-cyan-300/32 to-emerald-300/18" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#060a0f]/78 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Forces", href: "/natural-science/physics/mechanics/forces" },
              { label: "Net Force & Equilibrium" },
            ]}
            eyebrow="Vector sum · balance · inertia"
            icon={Scale}
            title={<span>Net Force & Equilibrium</span>}
            subtitle="Combine all force vectors acting on one system. The vector sum, not any single force, determines whether the system's velocity changes."
            accentRgb="45, 212, 191"
            titleClassName="font-mono text-[clamp(2rem,4.2vw,4.35rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f1fffb]"
            headerClassName="border-transparent"
            aside={<div className="rounded-full border border-emerald-200/[0.10] bg-black/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.11em] text-emerald-100/65 backdrop-blur-md">Forces · 04 / 05</div>}
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-emerald-200/[0.09] bg-black/[0.13] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.04fr)_minmax(300px,0.96fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.4rem)] font-semibold tracking-[-0.04em] text-white">What matters when several forces act at the same time?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Force vectors combine. If the vector sum is zero, the system is in translational equilibrium and its velocity does not change. If the sum is nonzero, the system accelerates in the direction of the net force.</p>
          </div>
          <div className="rounded-[18px] border border-emerald-200/[0.09] bg-emerald-300/[0.022] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-300/62">Net-force rule</div>
            <div className="mt-3 text-[19px] text-white"><M>{"\\vec F_{net}=\\sum_i \\vec F_i"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500"><M>{"\\vec F_{net}=0"}</M> means zero acceleration, not necessarily zero velocity.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(310px,0.75fr)]">
          <div className="rounded-[30px] border border-white/[0.09] bg-black/[0.15] p-4 backdrop-blur-xl sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 px-1">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/68">Force balance lab</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.03em] text-white">Add two opposite horizontal forces.</h2>
              </div>
              <div className={`rounded-full border px-3 py-1.5 font-mono text-[9px] ${equilibrium ? "border-emerald-200/[0.13] text-emerald-100/70" : "border-amber-200/[0.13] text-amber-100/65"}`}>{equilibrium ? "equilibrium" : `net ${direction}`}</div>
            </div>

            <div className="relative mt-4 min-h-[340px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#071019]/82 p-5">
              <div className="absolute inset-0 opacity-38" style={{ backgroundImage: "linear-gradient(rgba(45,212,191,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
              <div className="absolute left-1/2 top-[48%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[22px] border border-white/[0.14] bg-white/[0.025] shadow-2xl"><div className="flex h-full items-center justify-center text-[12px] font-semibold text-white">system</div></div>

              <ForceArrow side="left" magnitude={leftForce} label={`${leftForce.toFixed(1)} N`} rgb="250, 204, 21" />
              <ForceArrow side="right" magnitude={rightForce} label={`${rightForce.toFixed(1)} N`} rgb="34, 211, 238" />

              {!equilibrium ? <NetArrow direction={direction as "left" | "right"} magnitude={magnitude} /> : <div className="absolute left-1/2 top-[17%] -translate-x-1/2 rounded-full border border-emerald-200/[0.12] bg-emerald-300/[0.025] px-3 py-1.5 font-mono text-[9px] text-emerald-100/65"><Equal size={11} className="mr-1 inline" />net = 0 N</div>}

              <div className="absolute bottom-5 left-5 right-5 grid gap-2 sm:grid-cols-3">
                <Readout label="Left force" value={`${leftForce.toFixed(1)} N`} rgb="250, 204, 21" />
                <Readout label="Right force" value={`${rightForce.toFixed(1)} N`} rgb="34, 211, 238" />
                <Readout label="Net force" value={equilibrium ? "0.0 N" : `${magnitude.toFixed(1)} N ${direction}`} rgb="45, 212, 191" />
              </div>
            </div>

            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <Control label="Force to the left" value={leftForce} onChange={setLeftForce} rgb="250, 204, 21" />
              <Control label="Force to the right" value={rightForce} onChange={setRightForce} rgb="34, 211, 238" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.15] p-4 backdrop-blur-xl">
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">Presets</div>
              <div className="mt-3 grid grid-cols-2 gap-2">{PRESETS.map((preset) => <button key={preset.label} type="button" onClick={() => applyPreset(preset)} className="rounded-[14px] border border-white/[0.06] bg-white/[0.01] p-3 text-left transition hover:border-white/[0.13]"><strong className="block text-[10px] text-slate-300">{preset.label}</strong><span className="mt-1 block text-[8px] leading-4 text-slate-700">{preset.note}</span></button>)}</div>
            </div>
            <div className="rounded-[24px] border border-emerald-200/[0.10] bg-emerald-300/[0.02] p-5 backdrop-blur-xl">
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Interpretation</div>
              <p className="mt-3 text-[12px] leading-6 text-slate-400">{interpretation}</p>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <RuleCard title="Zero net force can hide many forces" text="A system can have several nonzero forces that cancel vectorially. Equilibrium does not mean 'no forces.'" rgb="250, 204, 21" />
          <RuleCard title="Equilibrium preserves velocity" text="At rest stays at rest; constant velocity stays constant velocity. Both have zero acceleration." rgb="45, 212, 191" />
          <RuleCard title="Sum components by direction" text="In more dimensions, add x-components together and y-components together. A vector sum can vanish even when individual forces do not." rgb="34, 211, 238" />
        </section>

        <TransferCheck answers={answers} setAnswers={setAnswers} />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pb-5">
          <Link href="/natural-science/physics/mechanics/forces/free-body-diagrams" className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-2 text-[10px] font-semibold text-slate-500 transition hover:text-slate-300">← Free-Body Diagrams</Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/[0.08] bg-violet-300/[0.018] px-3 py-2 text-[10px] text-slate-600">Next: Newton's Second Law <ArrowRight size={12} /></div>
        </div>
      </div>
    </main>
  );
}

function ForceArrow({ side, magnitude, label, rgb }: { side: "left" | "right"; magnitude: number; label: string; rgb: string }) {
  const width = Math.max(8, Math.min(34, 8 + magnitude * 2.4));
  const style = side === "left" ? { right: "58%", width: `${width}%` } : { left: "58%", width: `${width}%` };
  return <><div className="absolute top-[48%] h-px" style={{ ...style, background: `rgba(${rgb},0.72)`, boxShadow: `0 0 18px rgba(${rgb},0.14)` }} /><div className={`absolute top-[calc(48%-7px)] ${side === "left" ? "left-[10%]" : "right-[10%]"}`} style={{ color: `rgb(${rgb})` }}>{side === "left" ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</div><div className={`absolute top-[52%] font-mono text-[9px] ${side === "left" ? "left-[12%]" : "right-[12%]"}`} style={{ color: `rgba(${rgb},0.72)` }}>{label}</div></>;
}

function NetArrow({ direction, magnitude }: { direction: "left" | "right"; magnitude: number }) {
  const width = Math.max(10, Math.min(26, 10 + magnitude * 2.2));
  return <div className="absolute left-1/2 top-[19%] -translate-x-1/2 text-center"><div className="text-[8px] uppercase tracking-[0.1em] text-emerald-200/55">net force</div><div className="mt-2 flex items-center justify-center gap-2 text-emerald-200/75">{direction === "left" ? <ArrowLeft size={17} /> : null}<div className="h-px bg-emerald-300/70" style={{ width: `${width * 3}px` }} />{direction === "right" ? <ArrowRight size={17} /> : null}</div><div className="mt-1 font-mono text-[9px] text-emerald-100/60">{magnitude.toFixed(1)} N</div></div>;
}

function Control({ label, value, onChange, rgb }: { label: string; value: number; onChange: (value: number) => void; rgb: string }) {
  return <label className="block"><div className="mb-2 flex items-center justify-between gap-3"><span className="text-[10px] text-slate-500">{label}</span><span className="font-mono text-[10px]" style={{ color: `rgba(${rgb},0.72)` }}>{value.toFixed(1)} N</span></div><input type="range" min="0" max="10" step="0.5" value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-emerald-400" /></label>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.05] bg-black/20 px-3 py-2"><div className="text-[8px] uppercase tracking-[0.1em]" style={{ color: `rgba(${rgb},0.58)` }}>{label}</div><div className="mt-1 font-mono text-[10px] text-slate-300">{value}</div></div>;
}

function RuleCard({ title, text, rgb }: { title: string; text: string; rgb: string }) {
  return <div className="rounded-[19px] border border-white/[0.06] bg-black/[0.14] p-4 backdrop-blur-xl"><div className="h-1 w-8 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><h3 className="mt-3 text-[13px] font-semibold text-white">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function TransferCheck({ answers, setAnswers }: { answers: Partial<Record<CheckId, string>>; setAnswers: (next: Partial<Record<CheckId, string>>) => void }) {
  const questions = useMemo(() => [
    { id: "moving" as const, prompt: "A puck glides right at constant velocity. Its net force must be...", options: [{ value: "zero", label: "zero" }, { value: "right", label: "to the right" }], correct: "zero", explanation: "Constant velocity means zero acceleration, so the net force is zero." },
    { id: "forces" as const, prompt: "Can a system have zero net force while several forces act on it?", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }], correct: "yes", explanation: "Yes. Nonzero force vectors can cancel in the vector sum." },
    { id: "direction" as const, prompt: "4 N left and 9 N right act on one object. The net force is...", options: [{ value: "5right", label: "5 N right" }, { value: "13right", label: "13 N right" }], correct: "5right", explanation: "Opposite directions subtract: 9 N − 4 N = 5 N to the right." },
  ], []);

  return <section className="mt-4 rounded-[28px] border border-white/[0.08] bg-black/[0.15] p-5 backdrop-blur-xl sm:p-6"><div className="flex items-center justify-between gap-3"><div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/68">Transfer check</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.03em] text-white">Can you reason from the vector sum?</h2></div><button type="button" onClick={() => setAnswers({})} className="rounded-full border border-white/[0.06] p-2 text-slate-600 transition hover:text-slate-300" aria-label="Reset transfer check"><RotateCcw size={13} /></button></div><div className="mt-5 grid gap-3 lg:grid-cols-3">{questions.map((question) => { const selected = answers[question.id]; const correct = selected === question.correct; return <div key={question.id} className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="text-[11px] leading-5 text-slate-300">{question.prompt}</div><div className="mt-3 space-y-2">{question.options.map((option) => <button key={option.value} type="button" onClick={() => setAnswers({ ...answers, [question.id]: option.value })} className={`w-full rounded-[12px] border px-3 py-2 text-left text-[10px] transition ${selected === option.value ? "border-emerald-200/20 bg-emerald-300/[0.04] text-white" : "border-white/[0.05] text-slate-600 hover:text-slate-300"}`}>{option.label}</button>)}</div>{selected ? <div className={`mt-3 flex items-start gap-2 rounded-[12px] border px-3 py-2 text-[9px] leading-4 ${correct ? "border-emerald-300/[0.13] text-emerald-100/70" : "border-rose-300/[0.12] text-rose-100/65"}`}>{correct ? <Check size={12} className="mt-0.5 shrink-0" /> : <X size={12} className="mt-0.5 shrink-0" />}{correct ? question.explanation : "Recompute the net force by treating opposite directions with opposite signs."}</div> : null}</div>; })}</div></section>;
}
