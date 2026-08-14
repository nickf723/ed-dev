"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import EnergyField from "../../_components/EnergyField";
import { Activity, ArrowRight, Flame, Scale } from "lucide-react";

const TOTAL = 100;

export default function ConservationEnergyPage() {
  const [position, setPosition] = useState(0.45);
  const [friction, setFriction] = useState(0.2);
  const [answer, setAnswer] = useState<string | null>(null);

  const potential = TOTAL * (1 - position);
  const released = TOTAL - potential;
  const thermal = released * friction;
  const kinetic = released - thermal;
  const mechanical = potential + kinetic;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#090615] text-slate-100 selection:bg-violet-300/25">
      <EnergyField mode="energy" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#090615]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Energy & Momentum", href: "/natural-science/physics/mechanics/energy" },
              { label: "Energy", href: "/natural-science/physics/mechanics/energy/work-energy" },
              { label: "Conservation of Energy" },
            ]}
            eyebrow="Energy · 04 / 05"
            icon={Scale}
            title={<span>Conservation of Energy</span>}
            subtitle="Energy can move between stores and cross system boundaries, but the total accounting remains conserved when every relevant form is included."
            accentRgb="167, 139, 250"
            titleClassName="font-mono text-[clamp(1.95rem,4vw,4.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#faf7ff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-violet-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.7fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">If friction reduces mechanical energy, where did the energy go?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Mechanical energy is only part of the ledger. Friction transfers energy into thermal stores. The broader total remains conserved.</p></div>
          <div className="rounded-[18px] border border-violet-200/[0.09] bg-violet-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-violet-300/62">Accounting statement</div><div className="mt-3 text-[19px] text-white"><M>{"E_{before} = E_{after}"}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">If energy crosses the chosen system boundary, include that transfer explicitly.</p></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/70">Energy ledger lab</div>
            <div className="relative mt-4 min-h-[330px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#100b1c]/82 p-5">
              <div className="absolute left-[10%] right-[10%] top-[27%] h-px rotate-[12deg] bg-gradient-to-r from-yellow-300/60 to-slate-500/20" />
              <div className="absolute h-6 w-6 rounded-full border border-violet-200/[0.32] bg-violet-300/[0.12] shadow-[0_0_24px_rgba(167,139,250,0.20)]" style={{ left: `${12 + position * 72}%`, top: `${22 + position * 15}%` }} />

              <div className="absolute bottom-6 left-5 right-5 space-y-3">
                <EnergyBar label="gravitational" value={potential} rgb="250, 204, 21" />
                <EnergyBar label="kinetic" value={kinetic} rgb="34, 211, 238" />
                <EnergyBar label="thermal" value={thermal} rgb="248, 113, 113" />
                <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 font-mono text-[10px]"><span className="text-slate-600">total</span><span className="text-violet-200/80">{(potential + kinetic + thermal).toFixed(1)} J</span></div>
              </div>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2"><Control label="Position down ramp" value={position} min={0} max={1} step={0.01} unit="" onChange={setPosition} /><Control label="Friction share" value={friction} min={0} max={0.8} step={0.05} unit="" onChange={setFriction} /></div>
          </div>

          <div className="space-y-4">
            <Ledger title="Mechanical energy" value={`${mechanical.toFixed(1)} J`} note="K + U can decrease when energy becomes thermal." rgb="34, 211, 238" />
            <Ledger title="Thermal energy" value={`${thermal.toFixed(1)} J`} note="Friction redirects part of the released potential energy here." rgb="248, 113, 113" />
            <Ledger title="Total tracked energy" value={`${TOTAL.toFixed(1)} J`} note="All three stores sum to the same total at every position." rgb="167, 139, 250" />
            <div className="rounded-[22px] border border-emerald-200/[0.10] bg-emerald-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-emerald-300/65">System boundary</div><p className="mt-2 text-[11px] leading-5 text-slate-500">If the surroundings carry energy away, the system's energy can change. Conservation applies to the larger closed accounting that includes the transfer.</p></div>
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Stores can change" text="Kinetic, potential, thermal, chemical, and other stores can increase or decrease while energy is redistributed." rgb="45, 212, 191" />
          <Principle title="Mechanical is a subset" text="K + U is not the same thing as total energy. Friction often makes the distinction visible." rgb="34, 211, 238" />
          <Principle title="Lost means untracked" text="When energy seems to disappear, widen the system or identify the transfer rather than abandoning conservation." rgb="248, 113, 113" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold text-white">A sliding block slows because of friction. Its kinetic energy decreases. Which statement is best?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["energy was destroyed", "kinetic became thermal", "momentum became energy"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.35)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.06)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "kinetic became thermal" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "kinetic became thermal" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "kinetic became thermal" ? "Exactly" : "Follow the ledger"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">Friction redistributes energy into thermal stores. The total accounting still balances.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/mechanics/energy/work-energy/potential-energy" className="text-[10px] text-slate-500 hover:text-slate-300">← Potential Energy</Link><Link href="/natural-science/physics/mechanics/energy/momentum" className="inline-flex items-center gap-2 rounded-full border border-blue-200/[0.12] bg-blue-400/[0.035] px-4 py-2 text-[10px] font-semibold text-blue-100/75">Next pathway: Momentum <ArrowRight size={13} /></Link></div>
        </section>
      </div>
    </main>
  );
}

function EnergyBar({ label, value, rgb }: { label: string; value: number; rgb: string }) { return <div><div className="mb-1 flex justify-between font-mono text-[9px] text-slate-600"><span>{label}</span><span style={{ color: `rgba(${rgb},0.72)` }}>{value.toFixed(1)} J</span></div><div className="h-2.5 overflow-hidden rounded-full bg-black/40"><div className="h-full rounded-full transition-[width] duration-100" style={{ width: `${value}%`, background: `linear-gradient(90deg, rgba(${rgb},0.35), rgba(${rgb},0.86))`, boxShadow: `0 0 18px rgba(${rgb},0.15)` }} /></div></div>; }
function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) { return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-violet-100/60">{value.toFixed(2)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-violet-400" /></div>; }
function Ledger({ title, value, note, rgb }: { title: string; value: string; note: string; rgb: string }) { return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.12] p-4 backdrop-blur-xl"><div className="text-[9px] uppercase tracking-[0.12em] text-slate-600">{title}</div><div className="mt-2 font-mono text-[18px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{note}</p></div>; }
function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) { return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
