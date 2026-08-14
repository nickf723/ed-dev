"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import EnergyField from "../../_components/EnergyField";
import { ArrowRight, MoveRight, Sparkles } from "lucide-react";

const CASES = [
  { label: "Push with motion", force: 12, distance: 4, angle: 0 },
  { label: "Hold sideways", force: 12, distance: 4, angle: 90 },
  { label: "Brake", force: 12, distance: 4, angle: 180 },
] as const;

export default function WorkEnergyTransferPage() {
  const [force, setForce] = useState(12);
  const [distance, setDistance] = useState(4);
  const [angle, setAngle] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);

  const radians = (angle * Math.PI) / 180;
  const parallelForce = force * Math.cos(radians);
  const work = parallelForce * distance;
  const interpretation = Math.abs(work) < 0.05 ? "zero transfer" : work > 0 ? "energy enters the motion" : "energy leaves the motion";

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03100e] text-slate-100 selection:bg-emerald-300/25">
      <EnergyField mode="energy" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#03100e]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Mechanics", href: "/natural-science/physics/mechanics" },
              { label: "Energy & Momentum", href: "/natural-science/physics/mechanics/energy" },
              { label: "Energy", href: "/natural-science/physics/mechanics/energy/work-energy" },
              { label: "Work & Energy Transfer" },
            ]}
            eyebrow="Energy · 01 / 05"
            icon={MoveRight}
            title={<span>Work & Energy Transfer</span>}
            subtitle="A force transfers energy through displacement only to the extent that the force points along the displacement."
            accentRgb="45, 212, 191"
            titleClassName="font-mono text-[clamp(2rem,4.2vw,4.35rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#f0fff9]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-emerald-200/[0.10] bg-black/[0.12] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.7fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">When does a force actually transfer energy?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">The geometry matters. A perpendicular force can be large and still do zero work; an opposing force does negative work.</p>
          </div>
          <div className="rounded-[18px] border border-emerald-200/[0.09] bg-emerald-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-300/62">Core relationship</div>
            <div className="mt-3 text-[22px] text-white"><M>{"W = Fd\\cos\\theta"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Work = parallel force component × displacement.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-start justify-between gap-4"><div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/70">Transfer lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.03em] text-white">Rotate the force relative to the displacement.</h2></div><div className="rounded-full border border-white/[0.07] bg-black/20 px-3 py-1.5 font-mono text-[10px] text-slate-400">θ = {angle}°</div></div>

            <div className="relative mt-5 min-h-[285px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#061513]/82 p-5">
              <div className="absolute left-[12%] right-[10%] top-[62%] h-px bg-slate-500/35" />
              <div className="absolute left-[20%] top-[calc(62%-28px)] h-14 w-20 rounded-[14px] border border-emerald-200/[0.20] bg-emerald-300/[0.07]" />
              <div className="absolute left-[31%] top-[62%] h-px w-[48%] bg-cyan-300/55"><span className="absolute -right-1 -top-1 h-2 w-2 rotate-45 border-r border-t border-cyan-300" /><span className="absolute left-1/2 top-2 -translate-x-1/2 font-mono text-[9px] text-cyan-200/65">displacement {distance.toFixed(1)} m</span></div>
              <div className="absolute left-[24%] top-[calc(62%-1px)] h-px origin-left bg-emerald-300/70" style={{ width: `${Math.min(210, 60 + force * 8)}px`, transform: `rotate(${-angle}deg)`, boxShadow: "0 0 18px rgba(45,212,191,0.18)" }}><span className="absolute -right-1 -top-1 h-2 w-2 rotate-45 border-r border-t border-emerald-300" /><span className="absolute left-1/2 -top-5 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] text-emerald-200/70">force {force.toFixed(0)} N</span></div>

              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                <Readout label="parallel force" value={`${parallelForce.toFixed(1)} N`} rgb="45, 212, 191" />
                <Readout label="work" value={`${work.toFixed(1)} J`} rgb={work > 0 ? "34, 211, 238" : work < 0 ? "248, 113, 113" : "148, 163, 184"} />
                <Readout label="meaning" value={interpretation} rgb="250, 204, 21" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <Control label="Force" value={force} min={0} max={24} step={1} unit="N" onChange={setForce} />
              <Control label="Displacement" value={distance} min={0} max={8} step={0.5} unit="m" onChange={setDistance} />
              <Control label="Angle" value={angle} min={0} max={180} step={5} unit="°" onChange={setAngle} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500"><Sparkles size={12} className="text-emerald-300" /> Curated cases</div>
              <div className="mt-4 space-y-2">{CASES.map((item) => <button key={item.label} type="button" onClick={() => { setForce(item.force); setDistance(item.distance); setAngle(item.angle); }} className="flex w-full items-center justify-between rounded-[15px] border border-white/[0.06] bg-white/[0.012] px-3 py-3 text-left transition hover:border-emerald-200/[0.16]"><span className="text-[11px] font-semibold text-white">{item.label}</span><span className="font-mono text-[9px] text-slate-600">{item.angle}°</span></button>)}</div>
            </div>
            <div className="rounded-[24px] border border-yellow-200/[0.10] bg-yellow-400/[0.025] p-5 backdrop-blur-xl"><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-yellow-300/65">Boundary</div><p className="mt-3 text-[12px] leading-6 text-slate-400">A support force can be real and large while doing zero work if the displacement is perpendicular to it.</p></div>
          </div>
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.12] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">A satellite moves tangent to its circular orbit while gravity points inward. What work does gravity do at that instant?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["positive work", "zero work", "negative work"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px] transition" style={{ borderColor: answer === option ? "rgba(167,139,250,0.35)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(167,139,250,0.06)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(221,214,254)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "zero work" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "zero work" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "zero work" ? "Exactly" : "Re-check the angle"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">Gravity is perpendicular to the instantaneous displacement, so <M>{"Fd\\cos 90^\\circ = 0"}</M>.</p></div> : null}
          <div className="mt-5 flex justify-end"><Link href="/natural-science/physics/mechanics/energy/work-energy/kinetic-energy" className="inline-flex items-center gap-2 rounded-full border border-cyan-200/[0.12] bg-cyan-400/[0.035] px-4 py-2 text-[10px] font-semibold text-cyan-100/75">Next: Kinetic Energy <ArrowRight size={13} /></Link></div>
        </section>
      </div>
    </main>
  );
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) { return <div><div className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-emerald-100/60">{value.toFixed(step < 1 ? 1 : 0)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-emerald-400" /></div>; }
function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.24] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>; }
