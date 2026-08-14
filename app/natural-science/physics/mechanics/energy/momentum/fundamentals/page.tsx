"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import EnergyField from "../../_components/EnergyField";
import { ArrowRight, Gauge, MoveRight, Scale } from "lucide-react";

export default function MomentumFundamentalsPage() {
  const [mass, setMass] = useState(3);
  const [velocity, setVelocity] = useState(4);
  const [answer, setAnswer] = useState<string | null>(null);
  const momentum = mass * velocity;
  const kinetic = 0.5 * mass * velocity * velocity;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030916] text-slate-100 selection:bg-blue-300/25">
      <EnergyField mode="momentum" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#030916]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Energy & Momentum", href: "/natural-science/physics/mechanics/energy" },
              { label: "Momentum", href: "/natural-science/physics/mechanics/energy/momentum" },
              { label: "Momentum" },
            ]}
            eyebrow="Momentum · 01 / 04"
            icon={MoveRight}
            title={<span>Momentum</span>}
            subtitle="Momentum combines mass with velocity, so it carries both an amount and a direction. Reversing velocity reverses momentum."
            accentRgb="96, 165, 250"
            titleClassName="font-mono text-[clamp(2.45rem,4.7vw,4.9rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#f2f7ff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-blue-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.7fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">What information does momentum keep that kinetic energy throws away?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Momentum uses velocity, not speed. Two objects can have the same kinetic energy while carrying momentum in opposite directions.</p></div>
          <div className="rounded-[18px] border border-blue-200/[0.09] bg-blue-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-blue-300/62">Core relationship</div><div className="mt-3 text-[22px] text-white"><M>{"\\vec p = m\\vec v"}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">Mass is scalar. Velocity supplies the direction.</p></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300/70">Vector lab</div>
            <div className="relative mt-4 min-h-[300px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#07101d]/84 p-5">
              <div className="absolute left-[10%] right-[10%] top-[55%] h-px bg-slate-500/30" />
              <div className="absolute left-1/2 top-[calc(55%-18px)] h-9 -translate-x-1/2 rounded-[12px] border border-blue-200/[0.22] bg-blue-300/[0.08]" style={{ width: `${52 + mass * 9}px` }} />
              {Math.abs(momentum) > 0.05 ? <div className={`absolute top-[55%] h-px bg-blue-300/75 ${momentum < 0 ? "right-1/2" : "left-1/2"}`} style={{ width: `${Math.min(360, 40 + Math.abs(momentum) * 13)}px`, boxShadow: "0 0 20px rgba(96,165,250,0.18)" }}><span className={`absolute -top-1 h-2 w-2 rotate-45 border-blue-300 ${momentum < 0 ? "left-0 border-b border-l" : "right-0 border-r border-t"}`} /></div> : null}
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2"><Readout label="mass" value={`${mass.toFixed(1)} kg`} rgb="45, 212, 191" /><Readout label="velocity" value={`${velocity.toFixed(1)} m/s`} rgb="96, 165, 250" /><Readout label="momentum" value={`${momentum.toFixed(1)} kg·m/s`} rgb="167, 139, 250" /></div>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2"><Control label="Mass" value={mass} min={0.5} max={8} step={0.5} unit="kg" onChange={setMass} /><Control label="Velocity" value={velocity} min={-10} max={10} step={0.5} unit="m/s" onChange={setVelocity} /></div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[22px] border border-blue-200/[0.09] bg-blue-400/[0.02] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-blue-300/65">Momentum</div><div className="mt-2 font-mono text-[18px] text-blue-100/80">{momentum.toFixed(1)} kg·m/s</div><p className="mt-2 text-[11px] leading-5 text-slate-500">Changes sign when velocity reverses.</p></div>
            <div className="rounded-[22px] border border-emerald-200/[0.09] bg-emerald-400/[0.02] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-emerald-300/65">Kinetic energy</div><div className="mt-2 font-mono text-[18px] text-emerald-100/80">{kinetic.toFixed(1)} J</div><p className="mt-2 text-[11px] leading-5 text-slate-500">Uses <M>{"v^2"}</M>, so reversing direction leaves the value unchanged.</p></div>
            <div className="rounded-[22px] border border-violet-200/[0.09] bg-violet-400/[0.02] p-4"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-violet-300/65"><Scale size={12} />Same momentum, different motion</div><p className="mt-2 text-[11px] leading-5 text-slate-500">A larger mass can carry the same momentum at a smaller speed. Momentum alone does not determine kinetic energy.</p></div>
          </div>
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/65">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold text-white">A cart keeps the same mass and speed but reverses direction. What happens?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["p changes sign; K stays same", "both change sign", "neither changes"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(34,211,238,0.35)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(34,211,238,0.06)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(207,250,254)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "p changes sign; K stays same" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "p changes sign; K stays same" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "p changes sign; K stays same" ? "Exactly" : "Track vector vs scalar"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">Velocity reverses, so momentum reverses. Speed is unchanged, so kinetic energy is unchanged.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/mechanics/energy/work-energy/conservation" className="text-[10px] text-slate-500 hover:text-slate-300">← Energy pathway</Link><Link href="/natural-science/physics/mechanics/energy/momentum/impulse" className="inline-flex items-center gap-2 rounded-full border border-cyan-200/[0.12] bg-cyan-400/[0.035] px-4 py-2 text-[10px] font-semibold text-cyan-100/75">Next: Impulse <ArrowRight size={13} /></Link></div>
        </section>
      </div>
    </main>
  );
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) { return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-blue-100/60">{value.toFixed(1)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-blue-400" /></div>; }
function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.24] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>; }
