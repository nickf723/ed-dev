"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import EMField from "../_components/EMField";
import { ArrowRight, BatteryCharging, Gauge, Lightbulb, Zap } from "lucide-react";

export default function CircuitsPage() {
  const [voltage, setVoltage] = useState(9);
  const [resistance, setResistance] = useState(6);
  const [answer, setAnswer] = useState<string | null>(null);

  const current = voltage / Math.max(resistance, 0.1);
  const power = voltage * current;
  const energyPerSecond = power;
  const glow = Math.min(1, power / 40);
  const particleDuration = Math.max(0.45, 3.4 / Math.max(current, 0.12));

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020b12] text-slate-100 selection:bg-cyan-300/25">
      <EMField mode="circuits" intensity={1.3} />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#020b12]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Electromagnetism", href: "/natural-science/physics/electromagnetism" },
              { label: "Circuits" },
            ]}
            eyebrow="Electromagnetism · 03 / 06"
            icon={BatteryCharging}
            title={<span>Circuits</span>}
            subtitle="A circuit is a closed path that lets charge move while electric potential energy is transferred between sources and components."
            accentRgb="34, 211, 238"
            titleClassName="font-mono text-[clamp(2.5rem,4.8vw,5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#effdff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-cyan-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">How do voltage, resistance, and current describe one moving-charge system?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Voltage describes energy transferred per charge. Current measures charge flow. Resistance connects the two by describing how strongly the component opposes that current.</p>
          </div>
          <div className="rounded-[18px] border border-cyan-200/[0.09] bg-cyan-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-300/62">Simple resistive circuit</div>
            <div className="mt-3 space-y-2 text-[18px] text-white"><M>{"V = IR"}</M><br /><M>{"P = VI"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Ohm&apos;s law relates the state of an ideal resistor. Power tells how quickly electrical energy is transferred.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/70">Closed-loop lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Turn the source up or throttle the path.</h2></div>
              <div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">conventional current shown</div>
            </div>

            <div className="relative mt-4 min-h-[370px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#06131d]/64 p-5">
              <CircuitLoop current={current} glow={glow} duration={particleDuration} />

              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                <Readout label="current" value={`${current.toFixed(2)} A`} rgb="34, 211, 238" />
                <Readout label="power" value={`${power.toFixed(1)} W`} rgb="250, 204, 21" />
                <Readout label="energy each second" value={`${energyPerSecond.toFixed(1)} J/s`} rgb="45, 212, 191" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Control label="Source voltage" value={voltage} min={1} max={24} step={1} unit="V" onChange={setVoltage} />
              <Control label="Resistance" value={resistance} min={1} max={24} step={1} unit="Ω" onChange={setResistance} />
            </div>
          </div>

          <div className="space-y-4">
            <Insight icon={BatteryCharging} title="The battery is not a current tank" text="The source establishes a potential difference. In a complete circuit, that electric condition drives charge already present throughout the conductor." rgb="34, 211, 238" />
            <Insight icon={Gauge} title="Resistance changes the current" text="At fixed voltage, larger resistance means smaller current. The current is a system response, not a fixed amount supplied by the battery." rgb="167, 139, 250" />
            <Insight icon={Lightbulb} title="Brightness tracks power" text="For a simple resistive load, higher electrical power means energy is being transferred to thermal and radiant forms more quickly." rgb="250, 204, 21" />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Current is not used up" text="Charge flow is continuous around a steady series loop. Components transfer energy, but charge itself is conserved." rgb="34, 211, 238" />
          <Principle title="Voltage is measured between points" text="Voltage is a potential difference. A single-point voltage only makes sense after choosing a reference potential." rgb="167, 139, 250" />
          <Principle title="Power closes the energy story" text="Current tells how much charge crosses per second; voltage tells energy per charge. Their product gives energy transferred per second." rgb="250, 204, 21" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">You keep the battery voltage fixed and double the resistance. What happens to the current?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["doubles", "halves", "stays the same"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "halves" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "halves" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "halves" ? "Exactly" : "Hold voltage fixed"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">From <M>{"I=V/R"}</M>, doubling <M>R</M> at fixed <M>V</M> halves the current.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/electromagnetism/electric-potential" className="text-[10px] text-slate-500 hover:text-slate-300">← Electric Potential</Link><div className="inline-flex items-center gap-2 rounded-full border border-red-200/[0.08] bg-red-400/[0.02] px-4 py-2 text-[10px] text-slate-600">Next: Magnetic Fields · planned <ArrowRight size={12} /></div></div>
        </section>
      </div>
    </main>
  );
}

function CircuitLoop({ current, glow, duration }: { current: number; glow: number; duration: number }) {
  const dots = Array.from({ length: 14 }, (_, index) => index);
  return <div className="absolute left-[12%] right-[12%] top-[14%] bottom-[28%]"><div className="absolute inset-0 rounded-[34px] border border-cyan-200/[0.18]" style={{ boxShadow: `0 0 ${25 + glow * 55}px rgba(34,211,238,${0.05 + glow * 0.14}), inset 0 0 30px rgba(34,211,238,0.025)` }} /><div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[16px] border border-yellow-200/[0.25] bg-yellow-400/[0.07] px-3 py-5 text-center"><BatteryCharging size={22} className="mx-auto text-yellow-300" /><div className="mt-2 font-mono text-[9px] text-yellow-100/60">source</div></div><div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-200/[0.28] bg-orange-400/[0.08] p-5" style={{ boxShadow: `0 0 ${20 + glow * 60}px rgba(250,204,21,${0.08 + glow * 0.26})` }}><Lightbulb size={28} style={{ color: `rgba(254,240,138,${0.35 + glow * 0.65})` }} /></div>{dots.map((index) => <span key={index} className="absolute h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.75)]" style={{ offsetPath: "inset(0 round 34px)", offsetDistance: `${(index / dots.length) * 100}%`, animation: `circuitFlow ${duration}s linear infinite`, animationDelay: `${-(index / dots.length) * duration}s` }} />)}<style>{`@keyframes circuitFlow { from { offset-distance: 0%; } to { offset-distance: 100%; } }`}</style></div>;
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-cyan-100/60">{value.toFixed(0)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-cyan-400" /></div>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>;
}

function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Zap; title: string; text: string; rgb: string }) {
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={12} /> circuit idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
