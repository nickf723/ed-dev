"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import EnergyField from "../../_components/EnergyField";
import { ArrowRight, Timer, Zap } from "lucide-react";

const PRESETS = [
  { label: "Hard + brief", force: 20, time: 0.5 },
  { label: "Gentle + long", force: 5, time: 2 },
  { label: "Reverse impulse", force: -10, time: 1 },
] as const;

export default function ImpulsePage() {
  const [force, setForce] = useState(20);
  const [duration, setDuration] = useState(0.5);
  const [mass, setMass] = useState(2);
  const [initialVelocity, setInitialVelocity] = useState(1);
  const [answer, setAnswer] = useState<string | null>(null);

  const impulse = force * duration;
  const initialMomentum = mass * initialVelocity;
  const finalMomentum = initialMomentum + impulse;
  const finalVelocity = finalMomentum / mass;
  const graphHeight = Math.min(42, 8 + Math.abs(force) * 1.5);
  const graphWidth = Math.min(72, 18 + duration * 26);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020c16] text-slate-100 selection:bg-cyan-300/25">
      <EnergyField mode="momentum" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#020c16]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Energy & Momentum", href: "/natural-science/physics/mechanics/energy" },
              { label: "Momentum", href: "/natural-science/physics/mechanics/energy/momentum" },
              { label: "Impulse" },
            ]}
            eyebrow="Momentum · 02 / 04"
            icon={Timer}
            title={<span>Impulse</span>}
            subtitle="Impulse measures momentum transfer by a force acting over time. The same impulse can come from a large force briefly or a smaller force for longer."
            accentRgb="34, 211, 238"
            titleClassName="font-mono text-[clamp(2.45rem,4.7vw,4.9rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#effdff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-cyan-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.7fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">How can different force histories cause the same momentum change?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Impulse depends on both force and time. On a force–time graph, impulse is the signed area under the curve.</p></div>
          <div className="rounded-[18px] border border-cyan-200/[0.09] bg-cyan-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-300/62">Core relationship</div><div className="mt-3 text-[20px] text-white"><M>{"J = F\\Delta t = \\Delta p"}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">For a changing force, impulse is the area under the force–time curve.</p></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/70">Force–time lab</div>
            <div className="relative mt-4 min-h-[320px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#06131d]/84 p-5">
              <div className="absolute left-[12%] right-[8%] top-1/2 h-px bg-slate-500/35" />
              <div className="absolute bottom-[12%] top-[12%] left-[12%] w-px bg-slate-500/35" />
              <div className={`absolute left-[12%] ${force >= 0 ? "bottom-1/2" : "top-1/2"}`} style={{ width: `${graphWidth}%`, height: `${graphHeight}%`, background: force >= 0 ? "rgba(34,211,238,0.20)" : "rgba(248,113,113,0.20)", border: `1px solid ${force >= 0 ? "rgba(34,211,238,0.42)" : "rgba(248,113,113,0.42)"}`, boxShadow: `0 0 28px ${force >= 0 ? "rgba(34,211,238,0.10)" : "rgba(248,113,113,0.10)"}` }} />
              <div className="absolute left-[14%] top-[14%] font-mono text-[9px] text-slate-600">force</div><div className="absolute bottom-[14%] right-[10%] font-mono text-[9px] text-slate-600">time</div>
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2"><Readout label="impulse" value={`${impulse.toFixed(1)} N·s`} rgb={impulse >= 0 ? "34, 211, 238" : "248, 113, 113"} /><Readout label="final momentum" value={`${finalMomentum.toFixed(1)} kg·m/s`} rgb="167, 139, 250" /><Readout label="final velocity" value={`${finalVelocity.toFixed(1)} m/s`} rgb="96, 165, 250" /></div>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><Control label="Force" value={force} min={-20} max={20} step={1} unit="N" onChange={setForce} /><Control label="Duration" value={duration} min={0.1} max={3} step={0.1} unit="s" onChange={setDuration} /><Control label="Mass" value={mass} min={0.5} max={6} step={0.5} unit="kg" onChange={setMass} /><Control label="Initial velocity" value={initialVelocity} min={-6} max={6} step={0.5} unit="m/s" onChange={setInitialVelocity} /></div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl"><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">Same impulse, different feel</div><div className="mt-4 space-y-2">{PRESETS.map((item) => <button key={item.label} type="button" onClick={() => { setForce(item.force); setDuration(item.time); }} className="flex w-full items-center justify-between rounded-[15px] border border-white/[0.06] bg-white/[0.012] px-3 py-3 text-left hover:border-cyan-200/[0.16]"><span className="text-[11px] font-semibold text-white">{item.label}</span><span className="font-mono text-[9px] text-cyan-100/55">{(item.force * item.time).toFixed(1)} N·s</span></button>)}</div></div>
            <div className="rounded-[24px] border border-violet-200/[0.10] bg-violet-400/[0.025] p-5"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/65"><Zap size={12} />Safety connection</div><p className="mt-3 text-[12px] leading-6 text-slate-400">For the same momentum change, increasing the stopping time reduces the average force. Airbags, padding, and crumple zones exploit this relationship.</p></div>
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Area is impulse" text="A wider low rectangle and a narrower tall rectangle can enclose the same signed area and produce the same Δp." rgb="34, 211, 238" />
          <Principle title="Sign matters" text="Impulse points with the force and can increase, decrease, or reverse an object's momentum." rgb="248, 113, 113" />
          <Principle title="Mass controls Δv" text="The same impulse gives the same Δp, but a larger mass experiences a smaller change in velocity." rgb="167, 139, 250" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold text-white">Two stopping methods give the same change in momentum. Method B doubles the stopping time. What happens to the average force?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["doubles", "halves", "stays the same"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.35)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.06)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "halves" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "halves" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "halves" ? "Exactly" : "Hold impulse fixed"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">With <M>{"J = F\\Delta t"}</M> fixed, doubling the time requires half the average force.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/mechanics/energy/momentum/fundamentals" className="text-[10px] text-slate-500 hover:text-slate-300">← Momentum</Link><Link href="/natural-science/physics/mechanics/energy/momentum/conservation" className="inline-flex items-center gap-2 rounded-full border border-violet-200/[0.12] bg-violet-400/[0.035] px-4 py-2 text-[10px] font-semibold text-violet-100/75">Next: Conservation <ArrowRight size={13} /></Link></div>
        </section>
      </div>
    </main>
  );
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) { return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-cyan-100/60">{value.toFixed(step < 1 ? 1 : 0)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-cyan-400" /></div>; }
function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.24] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>; }
function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) { return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
