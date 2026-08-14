"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import EnergyField from "../../_components/EnergyField";
import { Activity, ArrowRight, Gauge, Scale } from "lucide-react";

export default function KineticEnergyPage() {
  const [mass, setMass] = useState(2);
  const [speed, setSpeed] = useState(4);
  const [answer, setAnswer] = useState<string | null>(null);
  const kinetic = 0.5 * mass * speed * speed;
  const doubledSpeed = 0.5 * mass * (speed * 2) ** 2;
  const doubledMass = 0.5 * (mass * 2) * speed * speed;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03100e] text-slate-100 selection:bg-cyan-300/25">
      <EnergyField mode="energy" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#03100e]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Energy & Momentum", href: "/natural-science/physics/mechanics/energy" },
              { label: "Energy", href: "/natural-science/physics/mechanics/energy/work-energy" },
              { label: "Kinetic Energy" },
            ]}
            eyebrow="Energy · 02 / 05"
            icon={Gauge}
            title={<span>Kinetic Energy</span>}
            subtitle="Kinetic energy measures the energy associated with motion. Mass matters once; speed matters twice because the speed is squared."
            accentRgb="34, 211, 238"
            titleClassName="font-mono text-[clamp(2.15rem,4.3vw,4.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#f1fdff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-cyan-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.68fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">Why does speed matter so much more than mass?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Doubling the mass doubles kinetic energy. Doubling the speed quadruples it. That asymmetry is the main idea to notice.</p></div>
          <div className="rounded-[18px] border border-cyan-200/[0.09] bg-cyan-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-300/62">Core relationship</div><div className="mt-3 text-[22px] text-white"><M>{"K = \\frac{1}{2}mv^2"}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">Kinetic energy is scalar. Direction does not change its value; speed does.</p></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/70">Motion-energy lab</div>
            <div className="relative mt-4 min-h-[300px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#06151a]/82 p-5">
              <div className="absolute left-[8%] right-[8%] top-[61%] h-px bg-slate-500/30" />
              <div className="absolute left-[18%] top-[calc(61%-18px)] h-9 rounded-[12px] border border-cyan-200/[0.22] bg-cyan-300/[0.08] transition-all" style={{ width: `${54 + mass * 10}px`, boxShadow: "0 0 30px rgba(34,211,238,0.09)" }} />
              <div className="absolute left-[30%] top-[calc(61%-1px)] h-px bg-cyan-300/75 transition-all" style={{ width: `${Math.min(360, 38 + speed * 38)}px`, boxShadow: "0 0 18px rgba(34,211,238,0.18)" }}><span className="absolute -right-1 -top-1 h-2 w-2 rotate-45 border-r border-t border-cyan-300" /></div>
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2"><Readout label="mass" value={`${mass.toFixed(1)} kg`} rgb="45, 212, 191" /><Readout label="speed" value={`${speed.toFixed(1)} m/s`} rgb="34, 211, 238" /><Readout label="kinetic energy" value={`${kinetic.toFixed(1)} J`} rgb="167, 139, 250" /></div>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2"><Control label="Mass" value={mass} min={0.5} max={8} step={0.5} unit="kg" onChange={setMass} /><Control label="Speed" value={speed} min={0} max={12} step={0.5} unit="m/s" onChange={setSpeed} /></div>
          </div>

          <div className="space-y-4">
            <Comparison icon={Scale} title="Double the mass" base={kinetic} changed={doubledMass} result="2× kinetic energy" rgb="45, 212, 191" />
            <Comparison icon={Activity} title="Double the speed" base={kinetic} changed={doubledSpeed} result="4× kinetic energy" rgb="34, 211, 238" />
            <div className="rounded-[24px] border border-yellow-200/[0.10] bg-yellow-400/[0.025] p-5 backdrop-blur-xl"><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-yellow-300/65">Connection to work</div><p className="mt-3 text-[12px] leading-6 text-slate-400">The net work done on an object equals its change in kinetic energy. Work is the transfer process; kinetic energy is the motion store that changes.</p><div className="mt-3 text-[16px] text-white"><M>{"W_{net} = \\Delta K"}</M></div></div>
          </div>
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">Two identical cars travel at 10 m/s and 20 m/s. How does the faster car's kinetic energy compare?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["2× as much", "4× as much", "8× as much"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(167,139,250,0.35)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(167,139,250,0.06)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(221,214,254)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "4× as much" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "4× as much" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "4× as much" ? "Exactly" : "Remember the square"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">The speed doubles, so the <M>{"v^2"}</M> factor becomes four times as large.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/mechanics/energy/work-energy/work" className="text-[10px] text-slate-500 hover:text-slate-300">← Work & Energy Transfer</Link><Link href="/natural-science/physics/mechanics/energy/work-energy/potential-energy" className="inline-flex items-center gap-2 rounded-full border border-yellow-200/[0.12] bg-yellow-400/[0.035] px-4 py-2 text-[10px] font-semibold text-yellow-100/75">Next: Potential Energy <ArrowRight size={13} /></Link></div>
        </section>
      </div>
    </main>
  );
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) { return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-cyan-100/60">{value.toFixed(1)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-cyan-400" /></div>; }
function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.24] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>; }
function Comparison({ icon: Icon, title, base, changed, result, rgb }: { icon: typeof Scale; title: string; base: number; changed: number; result: string; rgb: string }) { return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.12] p-4 backdrop-blur-xl"><div className="flex items-center gap-2 text-[10px] font-semibold" style={{ color: `rgba(${rgb},0.72)` }}><Icon size={13} />{title}</div><div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 font-mono text-[10px] text-slate-500"><span>{base.toFixed(1)} J</span><ArrowRight size={12} /><span style={{ color: `rgba(${rgb},0.76)` }}>{changed.toFixed(1)} J</span></div><div className="mt-2 text-[11px] text-slate-400">{result}</div></div>; }
