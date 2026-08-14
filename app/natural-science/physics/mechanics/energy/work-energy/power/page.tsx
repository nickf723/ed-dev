"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import EnergyField from "../../_components/EnergyField";
import { ArrowRight, Timer, Zap } from "lucide-react";

export default function PowerPage() {
  const [energy, setEnergy] = useState(120);
  const [time, setTime] = useState(4);
  const [answer, setAnswer] = useState<string | null>(null);
  const power = energy / Math.max(time, 0.1);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#120706] text-slate-100 selection:bg-rose-300/25">
      <EnergyField mode="energy" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#120706]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Energy & Momentum", href: "/natural-science/physics/mechanics/energy" },
              { label: "Energy", href: "/natural-science/physics/mechanics/energy/work-energy" },
              { label: "Power" },
            ]}
            eyebrow="Energy · 05 / 05"
            icon={Timer}
            title={<span>Power</span>}
            subtitle="Power measures the rate of energy transfer or transformation. The same amount of energy can be delivered slowly or quickly."
            accentRgb="248, 113, 113"
            titleClassName="font-mono text-[clamp(2.45rem,4.7vw,4.9rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fff3f2]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-rose-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.7fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-rose-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">How can two devices transfer the same energy but behave very differently?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Power adds time to the energy ledger. A high-power process moves the same energy through the system boundary in less time.</p></div>
          <div className="rounded-[18px] border border-rose-200/[0.09] bg-rose-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-rose-300/62">Core relationship</div><div className="mt-3 text-[20px] text-white"><M>{"P = \\frac{\\Delta E}{\\Delta t}"}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">1 watt = 1 joule per second.</p></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-rose-300/70">Transfer-rate lab</div>
            <div className="relative mt-4 min-h-[290px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#170b0a]/84 p-5">
              <div className="absolute left-[9%] right-[9%] top-1/2 h-3 -translate-y-1/2 rounded-full bg-black/40" />
              <div className="absolute left-[9%] top-1/2 h-3 -translate-y-1/2 rounded-full bg-gradient-to-r from-yellow-300/45 to-rose-300/85 shadow-[0_0_28px_rgba(248,113,113,0.16)] transition-[width]" style={{ width: `${Math.min(82, 18 + power * 1.5)}%` }} />
              <div className="absolute left-[10%] top-[35%] font-mono text-[9px] text-slate-600">energy crossing boundary</div>
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2"><Readout label="energy" value={`${energy.toFixed(0)} J`} rgb="250, 204, 21" /><Readout label="time" value={`${time.toFixed(1)} s`} rgb="96, 165, 250" /><Readout label="power" value={`${power.toFixed(1)} W`} rgb="248, 113, 113" /></div>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2"><Control label="Energy transferred" value={energy} min={20} max={300} step={10} unit="J" onChange={setEnergy} /><Control label="Transfer time" value={time} min={0.5} max={12} step={0.5} unit="s" onChange={setTime} /></div>
          </div>

          <div className="space-y-4">
            <RateCase title="Same energy, half the time" value={`${(energy / (time / 2)).toFixed(1)} W`} note="Power doubles because the transfer rate doubles." rgb="248, 113, 113" />
            <RateCase title="Double the energy, same time" value={`${((energy * 2) / time).toFixed(1)} W`} note="Power also doubles because twice as much energy crosses in the same interval." rgb="250, 204, 21" />
            <div className="rounded-[22px] border border-cyan-200/[0.10] bg-cyan-400/[0.025] p-4"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-cyan-300/65"><Zap size={12} />Mechanical connection</div><p className="mt-2 text-[11px] leading-5 text-slate-500">When a force acts along an object's velocity, instantaneous mechanical power can also be written <M>{"P = Fv"}</M>.</p></div>
          </div>
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold text-white">A motor does the same work but takes twice as long. What happens to its average power?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["doubles", "halves", "stays the same"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.35)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.06)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "halves" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "halves" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "halves" ? "Exactly" : "Hold energy fixed"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">With the same energy transfer, doubling the time halves <M>{"\\Delta E/\\Delta t"}</M>.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/mechanics/energy/work-energy/conservation" className="text-[10px] text-slate-500 hover:text-slate-300">← Conservation of Energy</Link><Link href="/natural-science/physics/mechanics/energy/momentum" className="inline-flex items-center gap-2 rounded-full border border-blue-200/[0.12] bg-blue-400/[0.035] px-4 py-2 text-[10px] font-semibold text-blue-100/75">Next pathway: Momentum <ArrowRight size={13} /></Link></div>
        </section>
      </div>
    </main>
  );
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) { return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-rose-100/60">{value.toFixed(step < 1 ? 1 : 0)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-rose-400" /></div>; }
function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.24] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>; }
function RateCase({ title, value, note, rgb }: { title: string; value: string; note: string; rgb: string }) { return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.12] p-4"><div className="text-[9px] uppercase tracking-[0.12em] text-slate-600">{title}</div><div className="mt-2 font-mono text-[18px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{note}</p></div>; }
