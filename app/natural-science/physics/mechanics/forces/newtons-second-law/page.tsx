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
  Gauge,
  RotateCcw,
  Scale,
  Sparkles,
  X,
} from "lucide-react";

type Preset = { label: string; force: number; mass: number; note: string };

const PRESETS: readonly Preset[] = [
  { label: "Baseline", force: 6, mass: 3, note: "2 m/s²" },
  { label: "Double force", force: 12, mass: 3, note: "double acceleration" },
  { label: "Double mass", force: 6, mass: 6, note: "half acceleration" },
  { label: "Reverse force", force: -6, mass: 3, note: "reverse acceleration" },
] as const;

type CheckId = "double-force" | "double-mass" | "direction";

export default function NewtonsSecondLawPage() {
  const [netForce, setNetForce] = useState(6);
  const [mass, setMass] = useState(3);
  const [answers, setAnswers] = useState<Partial<Record<CheckId, string>>>({});
  const acceleration = netForce / mass;
  const forceDirection = netForce > 0 ? "right" : netForce < 0 ? "left" : "none";
  const accelDirection = acceleration > 0 ? "right" : acceleration < 0 ? "left" : "none";

  const interpretation = Math.abs(netForce) < 0.001
    ? "Zero net force gives zero acceleration, regardless of the object's mass."
    : `A ${Math.abs(netForce).toFixed(1)} N net force on ${mass.toFixed(1)} kg produces ${Math.abs(acceleration).toFixed(2)} m/s² of acceleration ${accelDirection}.`;

  function applyPreset(preset: Preset) {
    setNetForce(preset.force);
    setMass(preset.mass);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#060a0f] text-slate-100 selection:bg-violet-300/25">
      <PhysicsBackground mode="classical" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-65" aria-hidden="true">
        <div className="absolute left-[9%] top-[31%] h-px w-[42%] -rotate-2 bg-gradient-to-r from-transparent via-violet-300/36 to-transparent" />
        <div className="absolute right-[8%] top-[53%] h-px w-[38%] rotate-3 bg-gradient-to-r from-transparent via-cyan-300/28 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#060a0f]/78 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Forces", href: "/natural-science/physics/mechanics/forces" },
              { label: "Newton's Second Law" },
            ]}
            eyebrow="Net force · mass · acceleration"
            icon={Gauge}
            title={<span>Newton&apos;s Second Law</span>}
            subtitle="Connect the force model back to motion: acceleration points with the net force, grows with net force, and shrinks when the same force is spread across more mass."
            accentRgb="167, 139, 250"
            titleClassName="font-mono text-[clamp(2rem,4.2vw,4.4rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#fbf8ff]"
            headerClassName="border-transparent"
            aside={<div className="rounded-full border border-violet-200/[0.10] bg-black/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.11em] text-violet-100/65 backdrop-blur-md">Forces · 05 / 05</div>}
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-violet-200/[0.09] bg-black/[0.13] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.04fr)_minmax(300px,0.96fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.65rem,3vw,2.4rem)] font-semibold tracking-[-0.04em] text-white">How does a force diagram predict how the motion will change?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Once all external forces are combined into one net force, the system&apos;s mass tells us how much acceleration that net force produces. This is the bridge from dynamics back to kinematics.</p>
          </div>
          <div className="rounded-[18px] border border-violet-200/[0.09] bg-violet-300/[0.022] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-violet-300/62">Core relationship</div>
            <div className="mt-3 text-[22px] text-white"><M>{"\\sum \\vec F = m\\vec a"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Equivalently, <M>{"\\vec a = \\frac{\\sum \\vec F}{m}"}</M>. Acceleration follows the net force, not the object&apos;s current velocity.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(310px,0.75fr)]">
          <div className="rounded-[30px] border border-white/[0.09] bg-black/[0.15] p-4 backdrop-blur-xl sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 px-1">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/68">Dynamics lab</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.03em] text-white">Hold one variable steady and change the other.</h2>
              </div>
              <div className="rounded-full border border-violet-200/[0.10] bg-violet-300/[0.02] px-3 py-1.5 font-mono text-[9px] text-violet-100/65">a = {acceleration.toFixed(2)} m/s²</div>
            </div>

            <div className="relative mt-4 min-h-[360px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#071019]/82 p-5">
              <div className="absolute inset-0 opacity-38" style={{ backgroundImage: "linear-gradient(rgba(167,139,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

              <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center justify-center rounded-[24px] border border-white/[0.14] bg-white/[0.025] shadow-2xl" style={{ width: `${88 + mass * 5}px`, height: `${88 + mass * 5}px` }}>
                  <div className="text-center"><div className="text-[9px] uppercase tracking-[0.1em] text-slate-600">mass</div><strong className="mt-1 block font-mono text-[15px] text-white">{mass.toFixed(1)} kg</strong></div>
                </div>
              </div>

              <VectorArrow kind="force" direction={forceDirection} magnitude={Math.abs(netForce)} />
              <VectorArrow kind="acceleration" direction={accelDirection} magnitude={Math.abs(acceleration) * 2.5} />

              <div className="absolute bottom-5 left-5 right-5 grid gap-2 sm:grid-cols-3">
                <Readout label="Net force" value={`${netForce.toFixed(1)} N`} rgb="250, 204, 21" />
                <Readout label="Mass" value={`${mass.toFixed(1)} kg`} rgb="34, 211, 238" />
                <Readout label="Acceleration" value={`${acceleration.toFixed(2)} m/s²`} rgb="167, 139, 250" />
              </div>
            </div>

            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <Control label="Net force" value={netForce} min={-12} max={12} step={0.5} unit="N" onChange={setNetForce} rgb="250, 204, 21" />
              <Control label="Mass" value={mass} min={1} max={10} step={0.5} unit="kg" onChange={setMass} rgb="34, 211, 238" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.15] p-4 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500"><Sparkles size={12} className="text-violet-300" /> Compare cases</div>
              <div className="mt-3 grid grid-cols-2 gap-2">{PRESETS.map((preset) => <button key={preset.label} type="button" onClick={() => applyPreset(preset)} className="rounded-[14px] border border-white/[0.06] bg-white/[0.01] p-3 text-left transition hover:border-white/[0.13]"><strong className="block text-[10px] text-slate-300">{preset.label}</strong><span className="mt-1 block text-[8px] leading-4 text-slate-700">{preset.note}</span></button>)}</div>
            </div>
            <div className="rounded-[24px] border border-violet-200/[0.10] bg-violet-300/[0.02] p-5 backdrop-blur-xl">
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/65">Interpretation</div>
              <p className="mt-3 text-[12px] leading-6 text-slate-400">{interpretation}</p>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <RuleCard title="More net force → more acceleration" text="For the same mass, doubling the net force doubles the acceleration. The relationship is directly proportional." rgb="250, 204, 21" formula="a ∝ Fnet" />
          <RuleCard title="More mass → less acceleration" text="For the same net force, doubling the mass halves the acceleration. Mass measures resistance to acceleration." rgb="34, 211, 238" formula="a ∝ 1/m" />
          <RuleCard title="Direction comes from net force" text="Acceleration points with the net force even when velocity currently points somewhere else. That is how velocity turns or slows." rgb="167, 139, 250" formula="a⃗ ∥ F⃗net" />
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="rounded-[25px] border border-cyan-200/[0.10] bg-cyan-300/[0.02] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/65">Unit meaning</div>
            <h2 className="mt-2 text-[21px] font-semibold tracking-[-0.03em] text-white">One newton is already encoded by the law.</h2>
            <div className="mt-4 text-[18px] text-white"><M>{"1\\,\\mathrm{N}=1\\,\\mathrm{kg}\\cdot\\mathrm{m/s^2}"}</M></div>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">A one-newton net force gives a one-kilogram mass an acceleration of one meter per second squared.</p>
          </div>
          <TransferCheck answers={answers} setAnswers={setAnswers} />
        </section>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pb-5">
          <Link href="/natural-science/physics/mechanics/forces/net-force" className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-2 text-[10px] font-semibold text-slate-500 transition hover:text-slate-300">← Net Force & Equilibrium</Link>
          <Link href="/natural-science/physics/mechanics" className="inline-flex items-center gap-2 rounded-full border border-orange-200/[0.08] bg-orange-300/[0.018] px-3 py-2 text-[10px] text-slate-600 transition hover:text-slate-300">Forces complete · Mechanics map <ArrowRight size={12} /></Link>
        </div>
      </div>
    </main>
  );
}

function VectorArrow({ kind, direction, magnitude }: { kind: "force" | "acceleration"; direction: string; magnitude: number }) {
  if (direction === "none" || magnitude < 0.01) return null;
  const rgb = kind === "force" ? "250, 204, 21" : "167, 139, 250";
  const width = Math.max(44, Math.min(150, 44 + magnitude * 7));
  const right = direction === "right";
  return <div className={`absolute left-1/2 ${kind === "force" ? "top-[33%]" : "top-[64%]"} -translate-x-1/2`}><div className="mb-1 text-center font-mono text-[8px] uppercase tracking-[0.1em]" style={{ color: `rgba(${rgb},0.58)` }}>{kind === "force" ? "net force" : "acceleration"}</div><div className="flex items-center justify-center gap-1" style={{ color: `rgb(${rgb})` }}>{!right ? <ArrowLeft size={16} /> : null}<div className="h-px" style={{ width, background: `rgba(${rgb},0.72)`, boxShadow: `0 0 18px rgba(${rgb},0.14)` }} />{right ? <ArrowRight size={16} /> : null}</div></div>;
}

function Control({ label, value, min, max, step, unit, onChange, rgb }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void; rgb: string }) {
  return <label className="block"><div className="mb-2 flex items-center justify-between gap-3"><span className="text-[10px] text-slate-500">{label}</span><span className="font-mono text-[10px]" style={{ color: `rgba(${rgb},0.72)` }}>{value.toFixed(1)} {unit}</span></div><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-violet-400" /></label>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.05] bg-black/20 px-3 py-2"><div className="text-[8px] uppercase tracking-[0.1em]" style={{ color: `rgba(${rgb},0.58)` }}>{label}</div><div className="mt-1 font-mono text-[10px] text-slate-300">{value}</div></div>;
}

function RuleCard({ title, text, rgb, formula }: { title: string; text: string; rgb: string; formula: string }) {
  return <div className="rounded-[19px] border border-white/[0.06] bg-black/[0.14] p-4 backdrop-blur-xl"><div className="font-mono text-[10px]" style={{ color: `rgba(${rgb},0.72)` }}>{formula}</div><h3 className="mt-3 text-[13px] font-semibold text-white">{title}</h3><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function TransferCheck({ answers, setAnswers }: { answers: Partial<Record<CheckId, string>>; setAnswers: (next: Partial<Record<CheckId, string>>) => void }) {
  const questions = useMemo(() => [
    { id: "double-force" as const, prompt: "Mass stays fixed. If net force doubles, acceleration...", options: [{ value: "double", label: "doubles" }, { value: "half", label: "halves" }], correct: "double", explanation: "With mass fixed, acceleration is directly proportional to net force." },
    { id: "double-mass" as const, prompt: "Net force stays fixed. If mass doubles, acceleration...", options: [{ value: "double", label: "doubles" }, { value: "half", label: "halves" }], correct: "half", explanation: "With net force fixed, acceleration is inversely proportional to mass." },
    { id: "direction" as const, prompt: "An object moves right while the net force points left. Its acceleration points...", options: [{ value: "left", label: "left" }, { value: "right", label: "right" }], correct: "left", explanation: "Acceleration follows the net force. A leftward acceleration can slow a rightward velocity." },
  ], []);

  return <div className="rounded-[25px] border border-white/[0.08] bg-black/[0.15] p-5 backdrop-blur-xl sm:p-6"><div className="flex items-center justify-between gap-3"><div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/68">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold tracking-[-0.03em] text-white">Can you predict the relationship?</h2></div><button type="button" onClick={() => setAnswers({})} className="rounded-full border border-white/[0.06] p-2 text-slate-600 transition hover:text-slate-300" aria-label="Reset transfer check"><RotateCcw size={13} /></button></div><div className="mt-4 space-y-4">{questions.map((question) => { const selected = answers[question.id]; const correct = selected === question.correct; return <div key={question.id} className="border-t border-white/[0.06] pt-4 first:border-t-0 first:pt-0"><div className="text-[11px] leading-5 text-slate-300">{question.prompt}</div><div className="mt-3 grid grid-cols-2 gap-2">{question.options.map((option) => <button key={option.value} type="button" onClick={() => setAnswers({ ...answers, [question.id]: option.value })} className={`rounded-[12px] border px-3 py-2 text-left text-[10px] transition ${selected === option.value ? "border-violet-200/20 bg-violet-300/[0.04] text-white" : "border-white/[0.05] text-slate-600 hover:text-slate-300"}`}>{option.label}</button>)}</div>{selected ? <div className={`mt-3 flex items-start gap-2 rounded-[12px] border px-3 py-2 text-[9px] leading-4 ${correct ? "border-emerald-300/[0.13] text-emerald-100/70" : "border-rose-300/[0.12] text-rose-100/65"}`}>{correct ? <Check size={12} className="mt-0.5 shrink-0" /> : <X size={12} className="mt-0.5 shrink-0" />}{correct ? question.explanation : "Use a = Fnet/m and change only the variable named in the question."}</div> : null}</div>; })}</div></div>;
}
