"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import ThermoField from "../_components/ThermoField";
import { ArrowRight, Flame, Radiation, Thermometer, Waves, Wind } from "lucide-react";

type Mechanism = "conduction" | "convection" | "radiation";

const MECHANISMS = {
  conduction: {
    title: "Conduction",
    description: "Microscopic collisions and interactions transfer energy through matter without bulk transport of the material.",
    formula: "P = \\frac{kA\\Delta T}{L}",
    icon: Thermometer,
    rgb: "250, 204, 21",
  },
  convection: {
    title: "Convection",
    description: "Moving fluid carries internal energy from one region to another, often driven by buoyancy or forced flow.",
    formula: "P \\approx hA\\Delta T",
    icon: Wind,
    rgb: "34, 211, 238",
  },
  radiation: {
    title: "Radiation",
    description: "Electromagnetic radiation transfers energy without requiring matter between the source and receiver.",
    formula: "P = \\varepsilon\\sigma A(T_h^4-T_c^4)",
    icon: Radiation,
    rgb: "248, 113, 113",
  },
} as const;

export default function HeatTransferPage() {
  const [hot, setHot] = useState(420);
  const [cold, setCold] = useState(280);
  const [mechanism, setMechanism] = useState<Mechanism>("conduction");
  const [answer, setAnswer] = useState<string | null>(null);

  const delta = Math.max(0, hot - cold);
  const relativeRate = mechanism === "radiation"
    ? Math.min(100, ((Math.pow(hot / 300, 4) - Math.pow(cold / 300, 4)) / 6) * 100)
    : Math.min(100, (delta / 240) * 100);
  const active = MECHANISMS[mechanism];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#09080c] text-slate-100 selection:bg-orange-300/25">
      <ThermoField mode="transfer" intensity={1.18} />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#09080c]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Thermodynamics", href: "/natural-science/physics/thermodynamics" },
              { label: "Heat Transfer" },
            ]}
            eyebrow="Thermodynamics · 02 / 06"
            icon={Waves}
            title={<span>Heat Transfer</span>}
            subtitle="Heat is energy transferred because of a temperature difference. Conduction, convection, and radiation are different physical routes for that transfer."
            accentRgb="251, 146, 60"
            titleClassName="font-mono text-[clamp(2.1rem,4.5vw,4.6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fff8f1]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-orange-200/[0.10] bg-black/[0.11] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">What makes thermal energy cross from one system to another?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">A temperature difference creates the thermodynamic drive. The mechanism determines how energy crosses the boundary, but the spontaneous net direction is from the hotter region toward the colder one.</p></div>
          <div className="rounded-[18px] border border-orange-200/[0.09] bg-orange-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-orange-300/62">Language check</div><div className="mt-3 font-mono text-[14px] text-white">system stores internal energy<br /><span className="text-orange-200">heat = transfer across boundary</span></div><p className="mt-2 text-[11px] leading-5 text-slate-500">After energy crosses the boundary, we account for it as part of the receiving system's internal energy rather than saying the object “contains heat.”</p></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-orange-300/70">Transfer lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Choose the pathway between hot and cold.</h2></div><div className="rounded-full border border-white/[0.07] bg-black/[0.18] px-3 py-1.5 font-mono text-[10px] text-slate-500">ΔT = {delta.toFixed(0)} K</div></div>

            <div className="relative mt-4 min-h-[350px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0c0d12]/82 p-5">
              <div className="absolute left-[7%] top-[18%] h-[54%] w-[29%] rounded-[24px] border border-red-200/[0.14] bg-red-400/[0.045]" />
              <div className="absolute right-[7%] top-[18%] h-[54%] w-[29%] rounded-[24px] border border-cyan-200/[0.12] bg-cyan-400/[0.035]" />
              <div className="absolute left-[11%] top-[29%] font-mono text-[20px] text-red-100/80">{hot} K</div>
              <div className="absolute right-[11%] top-[29%] font-mono text-[20px] text-cyan-100/80">{cold} K</div>
              <TransferVisual mechanism={mechanism} rgb={active.rgb} rate={relativeRate} />
              <div className="absolute bottom-5 left-5 right-5"><div className="mb-1 flex justify-between font-mono text-[9px] text-slate-600"><span>relative transfer rate</span><span style={{ color: `rgba(${active.rgb},0.72)` }}>{relativeRate.toFixed(0)}%</span></div><div className="h-2 overflow-hidden rounded-full bg-black/45"><div className="h-full rounded-full transition-[width] duration-200" style={{ width: `${relativeRate}%`, background: `linear-gradient(90deg, rgba(${active.rgb},0.35), rgba(${active.rgb},0.86))` }} /></div></div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2"><Control label="Hot temperature" value={hot} min={300} max={800} step={10} unit="K" onChange={(value) => setHot(Math.max(value, cold))} /><Control label="Cold temperature" value={cold} min={100} max={500} step={10} unit="K" onChange={(value) => setCold(Math.min(value, hot))} /></div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl"><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">Transfer mechanism</div><div className="mt-4 space-y-2">{(Object.keys(MECHANISMS) as Mechanism[]).map((key) => { const item = MECHANISMS[key]; const Icon = item.icon; const selected = key === mechanism; return <button key={key} type="button" onClick={() => setMechanism(key)} className="flex w-full items-center gap-3 rounded-[16px] border px-3 py-3 text-left" style={{ borderColor: selected ? `rgba(${item.rgb},0.26)` : "rgba(255,255,255,0.06)", background: selected ? `rgba(${item.rgb},0.045)` : "rgba(255,255,255,0.01)" }}><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.18)` }}><Icon size={15} /></div><div><strong className="block text-[11px] text-white">{item.title}</strong><span className="text-[9px] text-slate-600">{item.description}</span></div></button>; })}</div></div>
            <div className="rounded-[24px] border p-5" style={{ borderColor: `rgba(${active.rgb},0.10)`, background: `rgba(${active.rgb},0.02)` }}><div className="text-[9px] font-semibold uppercase tracking-[0.13em]" style={{ color: `rgba(${active.rgb},0.66)` }}>{active.title} model</div><div className="mt-3 text-[17px] text-white"><M>{active.formula}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">{active.description}</p></div>
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Conduction" text="Dominant through direct material contact. Better conductors and larger cross-sectional area increase the transfer rate; greater thickness reduces it." rgb="250, 204, 21" />
          <Principle title="Convection" text="Requires bulk fluid motion. Warm and cool regions can circulate naturally, or fans and pumps can force the flow." rgb="34, 211, 238" />
          <Principle title="Radiation" text="Requires no medium. Every object with nonzero absolute temperature emits electromagnetic radiation; hotter objects radiate much more strongly." rgb="248, 113, 113" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold text-white">Energy from the Sun reaches Earth through mostly empty space. Which mechanism carries it?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["conduction", "convection", "radiation"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "radiation" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "radiation" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "radiation" ? "Exactly" : "Check whether matter is required"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">Electromagnetic radiation can cross a vacuum. Conduction and convection require matter.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/thermodynamics/temperature-equilibrium" className="text-[10px] text-slate-500 hover:text-slate-300">← Temperature & Equilibrium</Link><Link href="/natural-science/physics/thermodynamics/first-law" className="inline-flex items-center gap-2 rounded-full border border-emerald-200/[0.12] bg-emerald-400/[0.035] px-4 py-2 text-[10px] font-semibold text-emerald-100/75">Next: First Law <ArrowRight size={13} /></Link></div>
        </section>
      </div>
    </main>
  );
}

function TransferVisual({ mechanism, rgb, rate }: { mechanism: Mechanism; rgb: string; rate: number }) {
  if (mechanism === "convection") return <div className="absolute left-[37%] top-[26%] h-[42%] w-[26%] rounded-[50%] border animate-[spin_6s_linear_infinite]" style={{ borderColor: `rgba(${rgb},0.34)`, boxShadow: `inset 0 0 28px rgba(${rgb},0.05)` }}><div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full" style={{ background: `rgb(${rgb})` }} /></div>;
  if (mechanism === "radiation") return <>{[0,1,2,3].map((i) => <div key={i} className="absolute rounded-[50%] border" style={{ left: `${34 + i * 4}%`, right: `${34 + i * 4}%`, top: `${29 + i * 5}%`, bottom: `${29 + i * 5}%`, borderColor: `rgba(${rgb},${0.25 - i * 0.04})` }} />)}</>;
  return <><div className="absolute left-[36%] top-[45%] h-4 w-[28%] rounded-full border" style={{ borderColor: `rgba(${rgb},0.24)`, background: `linear-gradient(90deg, rgba(248,113,113,0.18), rgba(${rgb},${0.18 + rate / 500}), rgba(56,189,248,0.10))` }} />{[0,1,2,3,4].map((i) => <span key={i} className="absolute top-[calc(45%+5px)] h-1.5 w-1.5 rounded-full animate-pulse" style={{ left: `${39 + i * 5}%`, background: `rgba(${rgb},0.62)`, animationDelay: `${i * 0.2}s` }} />)}</>;
}
function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) { return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-orange-100/60">{value.toFixed(0)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-orange-400" /></div>; }
function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) { return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.10] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
