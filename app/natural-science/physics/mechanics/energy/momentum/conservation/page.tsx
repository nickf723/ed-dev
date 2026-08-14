"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import EnergyField from "../../_components/EnergyField";
import { ArrowRight, Scale } from "lucide-react";

export default function MomentumConservationPage() {
  const [mA, setMA] = useState(2);
  const [vA, setVA] = useState(4);
  const [mB, setMB] = useState(3);
  const [vB, setVB] = useState(-1);
  const [impulse, setImpulse] = useState(-4);
  const [answer, setAnswer] = useState<string | null>(null);

  const pAi = mA * vA;
  const pBi = mB * vB;
  const pAf = pAi + impulse;
  const pBf = pBi - impulse;
  const totalBefore = pAi + pBi;
  const totalAfter = pAf + pBf;
  const vAf = pAf / mA;
  const vBf = pBf / mB;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080716] text-slate-100 selection:bg-violet-300/25">
      <EnergyField mode="momentum" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#080716]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Energy & Momentum", href: "/natural-science/physics/mechanics/energy" },
              { label: "Momentum", href: "/natural-science/physics/mechanics/energy/momentum" },
              { label: "Conservation of Momentum" },
            ]}
            eyebrow="Momentum · 03 / 04"
            icon={Scale}
            title={<span>Conservation of Momentum</span>}
            subtitle="Internal interactions can redistribute momentum between objects, but the total momentum of an isolated system remains unchanged."
            accentRgb="167, 139, 250"
            titleClassName="font-mono text-[clamp(1.9rem,4vw,4.15rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#faf7ff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-violet-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.7fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">How can both objects change momentum while the system total stays fixed?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Internal forces come in equal-and-opposite interaction pairs, so the impulses exchanged inside the system cancel in the total accounting.</p></div>
          <div className="rounded-[18px] border border-violet-200/[0.09] bg-violet-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-violet-300/62">System statement</div><div className="mt-3 text-[18px] text-white"><M>{"\\sum \\vec p_{before} = \\sum \\vec p_{after}"}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">This requires negligible external impulse during the interaction.</p></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/70">Internal-exchange lab</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ObjectLedger label="Object A" before={pAi} after={pAf} velocity={vAf} rgb="96, 165, 250" />
              <ObjectLedger label="Object B" before={pBi} after={pBf} velocity={vBf} rgb="244, 114, 182" />
            </div>
            <div className="mt-3 rounded-[20px] border border-white/[0.07] bg-[#0d0a1c]/80 p-4">
              <div className="flex items-center justify-between gap-4 font-mono text-[10px]"><span className="text-slate-600">internal impulse on A</span><span className="text-blue-200/75">{impulse.toFixed(1)} N·s</span></div>
              <div className="mt-2 flex items-center justify-between gap-4 font-mono text-[10px]"><span className="text-slate-600">internal impulse on B</span><span className="text-pink-200/75">{(-impulse).toFixed(1)} N·s</span></div>
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-4"><Readout label="system before" value={`${totalBefore.toFixed(1)} kg·m/s`} rgb="167, 139, 250" /><Readout label="system after" value={`${totalAfter.toFixed(1)} kg·m/s`} rgb="45, 212, 191" /></div>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"><Control label="mA" value={mA} min={0.5} max={6} step={0.5} unit="kg" onChange={setMA} /><Control label="vA" value={vA} min={-8} max={8} step={0.5} unit="m/s" onChange={setVA} /><Control label="mB" value={mB} min={0.5} max={6} step={0.5} unit="kg" onChange={setMB} /><Control label="vB" value={vB} min={-8} max={8} step={0.5} unit="m/s" onChange={setVB} /><Control label="internal J on A" value={impulse} min={-16} max={16} step={0.5} unit="N·s" onChange={setImpulse} /></div>
          </div>

          <div className="space-y-4">
            <Principle title="Individual momentum can change" text="Each object experiences an internal impulse, so neither object's momentum is generally conserved by itself." rgb="96, 165, 250" />
            <Principle title="Internal impulses cancel" text="The impulse on A is equal and opposite to the impulse on B. Added together, their contribution to system Δp is zero." rgb="244, 114, 182" />
            <Principle title="External impulse changes the total" text="If an outside force delivers a significant impulse, include it: system momentum changes by that external impulse." rgb="250, 204, 21" />
          </div>
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold text-white">During a brief collision in an isolated two-cart system, cart A gains 6 kg·m/s of momentum. What must happen to cart B?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["gains 6", "loses 6", "stays unchanged"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.35)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.06)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "loses 6" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "loses 6" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "loses 6" ? "Exactly" : "Keep the system total fixed"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">The internal momentum changes must sum to zero, so <M>{"\\Delta p_B = -6"}</M> kg·m/s.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/mechanics/energy/momentum/impulse" className="text-[10px] text-slate-500 hover:text-slate-300">← Impulse</Link><Link href="/natural-science/physics/mechanics/energy/momentum/collisions" className="inline-flex items-center gap-2 rounded-full border border-pink-200/[0.12] bg-pink-400/[0.035] px-4 py-2 text-[10px] font-semibold text-pink-100/75">Next: Collisions <ArrowRight size={13} /></Link></div>
        </section>
      </div>
    </main>
  );
}

function ObjectLedger({ label, before, after, velocity, rgb }: { label: string; before: number; after: number; velocity: number; rgb: string }) { return <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.16] p-4"><div className="text-[10px] font-semibold" style={{ color: `rgba(${rgb},0.72)` }}>{label}</div><div className="mt-3 grid grid-cols-2 gap-2"><Readout label="before p" value={`${before.toFixed(1)}`} rgb={rgb} /><Readout label="after p" value={`${after.toFixed(1)}`} rgb={rgb} /></div><div className="mt-3 font-mono text-[9px] text-slate-600">after velocity {velocity.toFixed(2)} m/s</div></div>; }
function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) { return <div><div className="mb-2 flex justify-between text-[8px] uppercase tracking-[0.1em] text-slate-600"><span>{label}</span><span className="font-mono text-violet-100/60">{value.toFixed(1)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-violet-400" /></div>; }
function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.24] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>; }
function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) { return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.12] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
