"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import ThermoField from "../_components/ThermoField";
import { ArrowRight, Box, Flame, Gauge, MoveRight } from "lucide-react";

const PRESETS = [
  { label: "Heat sealed gas", q: 80, w: 0, note: "heat enters; no boundary work" },
  { label: "Gas expands", q: 100, w: 55, note: "heat enters; gas does work" },
  { label: "Compress gas", q: 0, w: -60, note: "surroundings do work on gas" },
  { label: "Adiabatic expansion", q: 0, w: 50, note: "gas does work without heat input" },
] as const;

export default function FirstLawPage() {
  const [heat, setHeat] = useState(80);
  const [workBy, setWorkBy] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const deltaU = heat - workBy;

  const state = deltaU > 0.5 ? "internal energy increases" : deltaU < -0.5 ? "internal energy decreases" : "internal energy unchanged";

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#08090d] text-slate-100 selection:bg-emerald-300/25">
      <ThermoField mode="first-law" intensity={1.16} />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#08090d]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Thermodynamics", href: "/natural-science/physics/thermodynamics" },
              { label: "Internal Energy & First Law" },
            ]}
            eyebrow="Thermodynamics · 03 / 06"
            icon={Gauge}
            title={<span>Internal Energy & First Law</span>}
            subtitle="Track energy crossing a system boundary as heat or work, and use that transfer to account for the change in internal energy."
            accentRgb="45, 212, 191"
            titleClassName="font-mono text-[clamp(1.75rem,3.8vw,4rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#f1fffb]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-emerald-200/[0.10] bg-black/[0.11] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">When energy crosses a system boundary, how much stays inside?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Internal energy changes when energy enters or leaves. Heat transfer and mechanical work are two ways energy can cross the boundary. The first law is the accounting rule that keeps those transfers consistent.</p></div>
          <div className="rounded-[18px] border border-emerald-200/[0.09] bg-emerald-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-300/62">Convention used here</div><div className="mt-3 text-[20px] text-white"><M>{"\\Delta U = Q - W_{by}"}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">Positive Q enters the system. Positive W_by leaves the system as work done by the system. Equivalently, <M>{"\\Delta U=Q+W_{on}"}</M>.</p></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/70">Boundary ledger</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Push energy across the boundary and watch the ledger close.</h2></div><div className="rounded-full border border-white/[0.07] bg-black/[0.18] px-3 py-1.5 font-mono text-[10px] text-slate-500">{state}</div></div>

            <div className="relative mt-4 min-h-[360px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0b0f13]/82 p-5">
              <div className="absolute left-1/2 top-1/2 h-44 w-64 -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-emerald-200/[0.18] bg-emerald-400/[0.035] shadow-[0_0_45px_rgba(45,212,191,0.07)]">
                <div className="flex h-full flex-col items-center justify-center text-center"><Box size={26} className="text-emerald-200/65" /><div className="mt-2 text-[9px] uppercase tracking-[0.13em] text-emerald-300/55">chosen system</div><strong className="mt-1 text-[18px] text-white">ΔU = {deltaU.toFixed(0)} J</strong><span className="mt-2 text-[10px] text-slate-500">{state}</span></div>
              </div>

              <BoundaryArrow side="left" amount={heat} label="Q" positiveText="heat in" negativeText="heat out" rgb="251, 146, 60" />
              <BoundaryArrow side="right" amount={workBy} label="Wby" positiveText="work out" negativeText="work in" rgb="96, 165, 250" />

              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2"><Readout label="heat Q" value={`${heat.toFixed(0)} J`} rgb="251, 146, 60" /><Readout label="work by system" value={`${workBy.toFixed(0)} J`} rgb="96, 165, 250" /><Readout label="change in U" value={`${deltaU.toFixed(0)} J`} rgb="45, 212, 191" /></div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2"><Control label="Heat into system Q" value={heat} min={-120} max={120} step={5} unit="J" onChange={setHeat} /><Control label="Work done by system Wby" value={workBy} min={-120} max={120} step={5} unit="J" onChange={setWorkBy} /></div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl"><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">Curated processes</div><div className="mt-4 space-y-2">{PRESETS.map((preset) => <button key={preset.label} type="button" onClick={() => { setHeat(preset.q); setWorkBy(preset.w); }} className="flex w-full items-start justify-between gap-3 rounded-[15px] border border-white/[0.06] bg-white/[0.012] px-3 py-3 text-left hover:border-emerald-200/[0.16]"><div><strong className="block text-[11px] text-white">{preset.label}</strong><span className="mt-1 block text-[9px] text-slate-600">{preset.note}</span></div><span className="font-mono text-[9px] text-emerald-100/55">ΔU {preset.q - preset.w} J</span></button>)}</div></div>
            <Insight icon={Flame} title="Heat is one boundary transfer" text="Positive heat input increases the system's energy unless an equal or larger amount leaves as work." rgb="251, 146, 60" />
            <Insight icon={MoveRight} title="Work can go either direction" text="Expansion often means the system does positive work on its surroundings. Compression means the surroundings do work on the system, so W_by is negative." rgb="96, 165, 250" />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Internal energy is a state quantity" text="U belongs to the system state. Heat and work describe paths by which energy crossed the boundary during a process." rgb="45, 212, 191" />
          <Principle title="Sign convention must be stated" text="Some texts use work done on the system instead. Both conventions are valid when used consistently." rgb="167, 139, 250" />
          <Principle title="Adiabatic does not mean unchanged U" text="Q = 0 only says no heat crosses the boundary. Work alone can still raise or lower internal energy." rgb="250, 204, 21" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold text-white">A gas is compressed adiabatically. Under our convention, which signs fit the process?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["Q = 0, Wby < 0, ΔU > 0", "Q > 0, Wby = 0, ΔU > 0", "Q = 0, Wby > 0, ΔU < 0"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "Q = 0, Wby < 0, ΔU > 0" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "Q = 0, Wby < 0, ΔU > 0" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "Q = 0, Wby < 0, ΔU > 0" ? "Exactly" : "Track the boundary"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">Adiabatic gives Q = 0. Compression means the surroundings do work on the gas, so W_by is negative and ΔU = 0 − (negative) is positive.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/thermodynamics/heat-transfer" className="text-[10px] text-slate-500 hover:text-slate-300">← Heat Transfer</Link><div className="rounded-full border border-white/[0.05] bg-black/[0.10] px-4 py-2 text-[10px] text-slate-700">Next: Phase Change · planned</div></div>
        </section>
      </div>
    </main>
  );
}

function BoundaryArrow({ side, amount, label, positiveText, negativeText, rgb }: { side: "left" | "right"; amount: number; label: string; positiveText: string; negativeText: string; rgb: string }) {
  const positive = amount >= 0;
  const width = Math.min(150, 46 + Math.abs(amount) * 0.7);
  const fromLeft = side === "left" ? positive : !positive;
  return <div className={`absolute top-[45%] ${side === "left" ? "left-[5%]" : "right-[5%]"}`}><div className="relative"><div className="h-px" style={{ width, background: `rgba(${rgb},0.62)` }} /><span className={`absolute -top-[3px] h-1.5 w-1.5 rotate-45 border ${fromLeft ? "right-0 border-r border-t" : "left-0 border-b border-l"}`} style={{ borderColor: `rgba(${rgb},0.76)` }} /><div className="mt-2 font-mono text-[9px]" style={{ color: `rgba(${rgb},0.68)` }}>{label}: {amount.toFixed(0)} J · {positive ? positiveText : negativeText}</div></div></div>;
}
function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) { return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-emerald-100/60">{value.toFixed(0)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-emerald-400" /></div>; }
function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.24] px-3 py-2.5 text-center"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>; }
function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Flame; title: string; text: string; rgb: string }) { return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.10] p-5"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={13} /> {title}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) { return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.10] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
