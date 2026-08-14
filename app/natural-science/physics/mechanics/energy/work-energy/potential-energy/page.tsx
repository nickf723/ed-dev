"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import EnergyField from "../../_components/EnergyField";
import { Activity, ArrowRight, Layers, MoveVertical } from "lucide-react";

const G = 9.8;

export default function PotentialEnergyPage() {
  const [mass, setMass] = useState(2);
  const [initialHeight, setInitialHeight] = useState(2);
  const [finalHeight, setFinalHeight] = useState(6);
  const [reference, setReference] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);

  const ui = mass * G * (initialHeight - reference);
  const uf = mass * G * (finalHeight - reference);
  const delta = uf - ui;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#100d03] text-slate-100 selection:bg-yellow-300/25">
      <EnergyField mode="energy" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#100d03]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Energy & Momentum", href: "/natural-science/physics/mechanics/energy" },
              { label: "Energy", href: "/natural-science/physics/mechanics/energy/work-energy" },
              { label: "Potential Energy" },
            ]}
            eyebrow="Energy · 03 / 05"
            icon={Layers}
            title={<span>Potential Energy</span>}
            subtitle="Potential energy is stored in the configuration of an interacting system. Its zero is a reference choice; changes in potential energy are what connect physical states."
            accentRgb="250, 204, 21"
            titleClassName="font-mono text-[clamp(2.1rem,4.3vw,4.55rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fffced]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-yellow-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.7fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-yellow-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">If the zero level is arbitrary, what part of gravitational potential energy is physically meaningful?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Changing the reference shifts every potential-energy value by the same amount. The difference between two states stays unchanged.</p></div>
          <div className="rounded-[18px] border border-yellow-200/[0.09] bg-yellow-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-yellow-300/62">Near Earth's surface</div><div className="mt-3 text-[22px] text-white"><M>{"U_g = mgh"}</M></div><div className="mt-2 text-[15px] text-white"><M>{"\\Delta U_g = mg\\Delta h"}</M></div></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-yellow-300/70">Reference-level lab</div>
            <div className="relative mt-4 min-h-[360px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#171304]/82 p-5">
              <div className="absolute left-[20%] top-[8%] bottom-[12%] w-px bg-slate-500/30" />
              <HeightMarker label="initial" height={initialHeight} rgb="34, 211, 238" />
              <HeightMarker label="final" height={finalHeight} rgb="250, 204, 21" />
              <div className="absolute left-[10%] right-[10%] h-px bg-rose-300/55" style={{ bottom: `${12 + (reference / 8) * 72}%` }}><span className="absolute right-0 -top-5 font-mono text-[9px] text-rose-200/65">chosen U = 0 at {reference.toFixed(1)} m</span></div>
              <div className="absolute bottom-4 left-5 right-5 grid grid-cols-3 gap-2"><Readout label="initial U" value={`${ui.toFixed(1)} J`} rgb="34, 211, 238" /><Readout label="final U" value={`${uf.toFixed(1)} J`} rgb="250, 204, 21" /><Readout label="change ΔU" value={`${delta.toFixed(1)} J`} rgb="45, 212, 191" /></div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><Control label="Mass" value={mass} min={0.5} max={6} step={0.5} unit="kg" onChange={setMass} /><Control label="Initial height" value={initialHeight} min={0} max={8} step={0.5} unit="m" onChange={setInitialHeight} /><Control label="Final height" value={finalHeight} min={0} max={8} step={0.5} unit="m" onChange={setFinalHeight} /><Control label="Zero reference" value={reference} min={0} max={8} step={0.5} unit="m" onChange={setReference} /></div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-yellow-200/[0.10] bg-yellow-400/[0.025] p-5 backdrop-blur-xl"><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-yellow-300/65">System, not object</div><p className="mt-3 text-[12px] leading-6 text-slate-400">Gravitational potential energy belongs to the Earth-object system. Elastic potential energy belongs to the spring-object system. The configuration of interacting parts is what matters.</p></div>
            <div className="rounded-[24px] border border-emerald-200/[0.10] bg-emerald-400/[0.025] p-5 backdrop-blur-xl"><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Invariant difference</div><p className="mt-3 text-[12px] leading-6 text-slate-400">Move the zero reference. Both absolute values shift, but <M>{"\\Delta U"}</M> stays the same because the same reference offset appears in both states and cancels.</p></div>
            <div className="rounded-[24px] border border-cyan-200/[0.10] bg-cyan-400/[0.025] p-5 backdrop-blur-xl"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/65"><Activity size={12} /> Other stores</div><p className="mt-3 text-[12px] leading-6 text-slate-400">Potential energy is broader than height. Springs, electric charges, chemical bonds, and many other interactions can store energy in configuration.</p></div>
          </div>
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">You raise the zero reference by 3 m without moving the object. What happens?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["U changes, ΔU does not", "both U and ΔU change", "neither changes"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(167,139,250,0.35)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(167,139,250,0.06)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(221,214,254)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "U changes, ΔU does not" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "U changes, ΔU does not" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "U changes, ΔU does not" ? "Exactly" : "Separate value from change"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">The reference shifts the numerical value assigned to each state, but the difference between states is unchanged.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/mechanics/energy/work-energy/kinetic-energy" className="text-[10px] text-slate-500 hover:text-slate-300">← Kinetic Energy</Link><Link href="/natural-science/physics/mechanics/energy/work-energy/conservation" className="inline-flex items-center gap-2 rounded-full border border-violet-200/[0.12] bg-violet-400/[0.035] px-4 py-2 text-[10px] font-semibold text-violet-100/75">Next: Conservation <ArrowRight size={13} /></Link></div>
        </section>
      </div>
    </main>
  );
}

function HeightMarker({ label, height, rgb }: { label: string; height: number; rgb: string }) { const bottom = 12 + (height / 8) * 72; return <div className="absolute left-[20%] right-[12%] h-px" style={{ bottom: `${bottom}%`, background: `linear-gradient(90deg, rgba(${rgb},0.72), transparent)` }}><div className="absolute -left-3 -top-3 h-6 w-6 rounded-full border bg-black/70" style={{ borderColor: `rgba(${rgb},0.46)`, boxShadow: `0 0 22px rgba(${rgb},0.16)` }} /><span className="absolute left-8 -top-5 font-mono text-[9px]" style={{ color: `rgba(${rgb},0.72)` }}>{label} · {height.toFixed(1)} m</span></div>; }
function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) { return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-yellow-100/60">{value.toFixed(1)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-yellow-400" /></div>; }
function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.24] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>; }
