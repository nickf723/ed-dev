"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import EnergyField from "../../_components/EnergyField";
import { ArrowRight, Orbit } from "lucide-react";

type CollisionType = "elastic" | "stick";

export default function CollisionsPage() {
  const [m1, setM1] = useState(2);
  const [v1, setV1] = useState(5);
  const [m2, setM2] = useState(3);
  const [v2, setV2] = useState(-1);
  const [type, setType] = useState<CollisionType>("elastic");
  const [answer, setAnswer] = useState<string | null>(null);

  const totalMass = m1 + m2;
  const pBefore = m1 * v1 + m2 * v2;
  const kBefore = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;

  const elasticV1 = ((m1 - m2) / totalMass) * v1 + ((2 * m2) / totalMass) * v2;
  const elasticV2 = ((2 * m1) / totalMass) * v1 + ((m2 - m1) / totalMass) * v2;
  const stuckV = pBefore / totalMass;
  const finalV1 = type === "elastic" ? elasticV1 : stuckV;
  const finalV2 = type === "elastic" ? elasticV2 : stuckV;

  const pAfter = m1 * finalV1 + m2 * finalV2;
  const kAfter = 0.5 * m1 * finalV1 * finalV1 + 0.5 * m2 * finalV2 * finalV2;
  const transformed = Math.max(0, kBefore - kAfter);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#120510] text-slate-100 selection:bg-pink-300/25">
      <EnergyField mode="momentum" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#120510]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Energy & Momentum", href: "/natural-science/physics/mechanics/energy" },
              { label: "Momentum", href: "/natural-science/physics/mechanics/energy/momentum" },
              { label: "Collisions" },
            ]}
            eyebrow="Momentum · 04 / 04"
            icon={Orbit}
            title={<span>Collisions</span>}
            subtitle="Collisions reveal why momentum and energy are complementary. Momentum conservation survives both elastic and inelastic collisions; kinetic-energy conservation does not."
            accentRgb="244, 114, 182"
            titleClassName="font-mono text-[clamp(2.35rem,4.6vw,4.75rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fff2fa]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-pink-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.7fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-pink-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">What distinguishes an elastic collision from an inelastic one if momentum is conserved in both?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">The difference is kinetic-energy accounting. In an inelastic collision, some kinetic energy becomes deformation, thermal, sound, or other internal energy.</p></div>
          <div className="rounded-[18px] border border-pink-200/[0.09] bg-pink-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-pink-300/62">Two ledgers</div><div className="mt-3 text-[15px] text-white"><M>{"\\sum p_i = \\sum p_f"}</M></div><div className="mt-2 text-[15px] text-white"><M>{"K_i = K_f \\quad \\text{only if elastic}"}</M></div></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-pink-300/70">Collision lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.03em] text-white">Track both ledgers through the same collision.</h2></div><div className="flex gap-2">{(["elastic", "stick"] as const).map((option) => <button key={option} type="button" onClick={() => setType(option)} className="rounded-full border px-3 py-1.5 text-[10px]" style={{ borderColor: type === option ? "rgba(244,114,182,0.34)" : "rgba(255,255,255,0.07)", background: type === option ? "rgba(244,114,182,0.06)" : "rgba(0,0,0,0.12)", color: type === option ? "rgb(251,207,232)" : "rgb(148,163,184)" }}>{option === "elastic" ? "elastic" : "stick together"}</button>)}</div></div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <StatePanel title="Before" vA={v1} vB={v2} p={pBefore} k={kBefore} rgb="96, 165, 250" />
              <StatePanel title="After" vA={finalV1} vB={finalV2} p={pAfter} k={kAfter} rgb="244, 114, 182" />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><Control label="m₁" value={m1} min={0.5} max={6} step={0.5} unit="kg" onChange={setM1} /><Control label="v₁" value={v1} min={-8} max={8} step={0.5} unit="m/s" onChange={setV1} /><Control label="m₂" value={m2} min={0.5} max={6} step={0.5} unit="kg" onChange={setM2} /><Control label="v₂" value={v2} min={-8} max={8} step={0.5} unit="m/s" onChange={setV2} /></div>
          </div>

          <div className="space-y-4">
            <Ledger title="Momentum difference" value={`${(pAfter - pBefore).toFixed(4)} kg·m/s`} note="Numerically zero apart from rounding in both collision models." rgb="167, 139, 250" />
            <Ledger title="Kinetic-energy difference" value={`${(kAfter - kBefore).toFixed(1)} J`} note={type === "elastic" ? "Zero for the elastic model." : "Negative because kinetic energy became internal energy."} rgb={type === "elastic" ? "45, 212, 191" : "248, 113, 113"} />
            <Ledger title="Transformed internally" value={`${transformed.toFixed(1)} J`} note="For the sticking collision, this appears as deformation, thermal energy, sound, and other internal stores." rgb="250, 204, 21" />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Elastic" text="Momentum and kinetic energy are both conserved within the modeled system." rgb="45, 212, 191" />
          <Principle title="Inelastic" text="Momentum is conserved, but kinetic energy decreases as energy moves into other internal stores." rgb="248, 113, 113" />
          <Principle title="Perfectly inelastic" text="The objects leave with one shared velocity. This is the maximum kinetic-energy loss compatible with the initial momentum for two sticking bodies." rgb="244, 114, 182" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold text-white">Two carts stick together after colliding on a nearly frictionless track. Which quantity must be conserved for the two-cart system?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["momentum only", "kinetic energy only", "both momentum and kinetic energy"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.35)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.06)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "momentum only" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "momentum only" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "momentum only" ? "Exactly" : "Sticking means inelastic"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">With negligible external impulse, momentum is conserved. Sticking together signals a perfectly inelastic collision, so kinetic energy is not conserved.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/mechanics/energy/momentum/conservation" className="text-[10px] text-slate-500 hover:text-slate-300">← Conservation of Momentum</Link><Link href="/natural-science/physics/mechanics/energy" className="inline-flex items-center gap-2 rounded-full border border-emerald-200/[0.12] bg-emerald-400/[0.035] px-4 py-2 text-[10px] font-semibold text-emerald-100/75">Energy & Momentum map <ArrowRight size={13} /></Link></div>
        </section>
      </div>
    </main>
  );
}

function StatePanel({ title, vA, vB, p, k, rgb }: { title: string; vA: number; vB: number; p: number; k: number; rgb: string }) { return <div className="rounded-[22px] border border-white/[0.07] bg-[#0d0915]/75 p-4"><div className="text-[10px] font-semibold" style={{ color: `rgba(${rgb},0.72)` }}>{title}</div><div className="mt-4 space-y-3"><VelocityArrow label="1" value={vA} rgb="96, 165, 250" /><VelocityArrow label="2" value={vB} rgb="244, 114, 182" /></div><div className="mt-4 grid grid-cols-2 gap-2"><Readout label="total p" value={`${p.toFixed(2)}`} rgb="167, 139, 250" /><Readout label="total K" value={`${k.toFixed(2)} J`} rgb="45, 212, 191" /></div></div>; }
function VelocityArrow({ label, value, rgb }: { label: string; value: number; rgb: string }) { return <div className="flex items-center gap-2"><span className="font-mono text-[9px] text-slate-600">cart {label}</span><div className={`h-px ${value < 0 ? "order-first" : ""}`} style={{ width: `${30 + Math.abs(value) * 12}px`, background: `rgba(${rgb},0.68)` }} /><span className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.72)` }}>{value.toFixed(2)} m/s</span></div>; }
function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) { return <div><div className="mb-2 flex justify-between text-[8px] uppercase tracking-[0.1em] text-slate-600"><span>{label}</span><span className="font-mono text-pink-100/60">{value.toFixed(1)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-pink-400" /></div>; }
function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.24] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>; }
function Ledger({ title, value, note, rgb }: { title: string; value: string; note: string; rgb: string }) { return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.12] p-4"><div className="text-[9px] uppercase tracking-[0.12em] text-slate-600">{title}</div><div className="mt-2 font-mono text-[17px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{note}</p></div>; }
function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) { return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
