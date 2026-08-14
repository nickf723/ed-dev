"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import EMField from "../_components/EMField";
import { ArrowRight, Compass, Magnet, MoveRight, Orbit } from "lucide-react";

export default function MagneticFieldsPage() {
  const [charge, setCharge] = useState(1);
  const [speed, setSpeed] = useState(4);
  const [field, setField] = useState(1.2);
  const [fieldOut, setFieldOut] = useState(true);
  const [answer, setAnswer] = useState<string | null>(null);

  const forceMagnitude = Math.abs(charge * speed * field);
  const directionSign = Math.sign(charge || 1) * (fieldOut ? -1 : 1);
  const forceUp = directionSign < 0;
  const radius = forceMagnitude > 0 ? Math.max(42, Math.min(150, (speed * speed) / Math.max(forceMagnitude, 0.15) * 18)) : 150;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#07060b] text-slate-100 selection:bg-red-300/25">
      <EMField mode="magnetic" intensity={1.3} />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#07060b]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Electromagnetism", href: "/natural-science/physics/electromagnetism" },
              { label: "Magnetic Fields" },
            ]}
            eyebrow="Electromagnetism · 04 / 06"
            icon={Magnet}
            title={<span>Magnetic Fields</span>}
            subtitle="Magnetic fields act on moving charge. The force is sideways to both the charge&apos;s velocity and the magnetic field, so magnetism naturally bends trajectories."
            accentRgb="248, 113, 113"
            titleClassName="font-mono text-[clamp(2rem,4.4vw,4.6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fff4f4]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-red-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-red-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">Why can a magnetic field bend a charged particle without speeding it up?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">For motion perpendicular to the magnetic field, the magnetic force stays perpendicular to the velocity. A sideways force changes direction, not the instantaneous speed.</p>
          </div>
          <div className="rounded-[18px] border border-red-200/[0.09] bg-red-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-red-300/62">Magnetic part of Lorentz force</div>
            <div className="mt-3 text-[18px] text-white"><M>{"\\mathbf F_B = q\\,\\mathbf v \\times \\mathbf B"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">For perpendicular vectors, <M>{"F_B=|q|vB"}</M>. Parallel motion feels no magnetic force.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-red-300/70">Trajectory lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Send a charged particle across a uniform magnetic field.</h2></div>
              <button type="button" onClick={() => setFieldOut((value) => !value)} className="rounded-full border border-white/[0.08] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-400 hover:text-white">B {fieldOut ? "out of page ⊙" : "into page ⊗"}</button>
            </div>

            <div className="relative mt-4 min-h-[360px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0b0b13]/62 p-5">
              <FieldDots out={fieldOut} />
              <div className="absolute left-[22%] top-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-fuchsia-200/[0.28] bg-fuchsia-400/[0.09] font-semibold text-fuchsia-100">{charge >= 0 ? "+" : "−"}</div>
                  <div className="absolute left-11 top-[21px] h-px w-24 bg-cyan-300/75"><span className="absolute right-0 -top-[3px] h-1.5 w-1.5 rotate-45 border-r border-t border-cyan-300" /><span className="absolute left-10 -top-5 font-mono text-[9px] text-cyan-200/70">v</span></div>
                  <div className={`absolute left-[21px] w-px bg-red-300/80 ${forceUp ? "bottom-10" : "top-10"}`} style={{ height: `${28 + Math.min(78, forceMagnitude * 10)}px` }}><span className={`absolute left-[-3px] h-1.5 w-1.5 rotate-45 border-red-300 ${forceUp ? "top-0 border-l border-t" : "bottom-0 border-b border-r"}`} /><span className={`absolute left-2 font-mono text-[9px] text-red-200/70 ${forceUp ? "top-1" : "bottom-1"}`}>F</span></div>
                </div>
              </div>

              <div className="absolute left-[37%] top-1/2 border-l border-dashed border-red-200/[0.18]" style={{ width: radius, height: radius, borderRadius: "50%", transform: `translateY(${forceUp ? -radius : 0}px) rotate(${forceUp ? 8 : -8}deg)` }} />

              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                <Readout label="magnetic force" value={`${forceMagnitude.toFixed(2)} (scaled)`} rgb="248, 113, 113" />
                <Readout label="turning tendency" value={forceMagnitude === 0 ? "none" : forceUp ? "upward" : "downward"} rgb="167, 139, 250" />
                <Readout label="speed" value={`${speed.toFixed(1)} units/s`} rgb="34, 211, 238" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <Control label="Charge q" value={charge} min={-3} max={3} step={0.5} unit="" onChange={setCharge} />
              <Control label="Speed v" value={speed} min={0} max={8} step={0.25} unit="" onChange={setSpeed} />
              <Control label="Field B" value={field} min={0} max={3} step={0.1} unit="" onChange={setField} />
            </div>
          </div>

          <div className="space-y-4">
            <Insight icon={Compass} title="Direction comes from three vectors" text="Velocity, magnetic field, and force form a right-handed relationship for positive charge. A negative charge reverses the force direction." rgb="248, 113, 113" />
            <Insight icon={Orbit} title="Perpendicular force creates curvature" text="When v stays perpendicular to B, the magnetic force acts like a centripetal force and the path becomes circular." rgb="167, 139, 250" />
            <Insight icon={MoveRight} title="Magnetic force does no work" text="Because the magnetic force is perpendicular to displacement, it changes direction without changing kinetic energy in the ideal case." rgb="34, 211, 238" />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Current creates magnetic field" text="A current is moving charge, so wires and coils create magnetic fields around them. Field geometry follows the current geometry." rgb="248, 113, 113" />
          <Principle title="Magnetic poles come in pairs" text="Ordinary magnetic field lines form closed loops. Cutting a bar magnet produces two smaller dipoles, not isolated north and south poles." rgb="96, 165, 250" />
          <Principle title="Static and moving observers can disagree" text="Electric and magnetic field descriptions depend on motion of the observer; relativity reveals them as parts of one electromagnetic field." rgb="167, 139, 250" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">A charged particle moves exactly parallel to a uniform magnetic field. What magnetic force does it feel?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["maximum", "zero", "depends only on charge sign"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "zero" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "zero" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "zero" ? "Exactly" : "Check the cross product"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">The magnitude contains <M>{"\\sin\\theta"}</M>. For parallel vectors, <M>{"\\theta=0"}</M> and the magnetic force is zero.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/electromagnetism/circuits" className="text-[10px] text-slate-500 hover:text-slate-300">← Circuits</Link><div className="inline-flex items-center gap-2 rounded-full border border-violet-200/[0.08] bg-violet-400/[0.02] px-4 py-2 text-[10px] text-slate-600">Next: Induction · planned <ArrowRight size={12} /></div></div>
        </section>
      </div>
    </main>
  );
}

function FieldDots({ out }: { out: boolean }) {
  return <div className="absolute inset-0 grid grid-cols-9 grid-rows-6 place-items-center opacity-50">{Array.from({ length: 54 }, (_, index) => <span key={index} className="font-mono text-[12px] text-red-200/50">{out ? "⊙" : "⊗"}</span>)}</div>;
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-red-100/60">{value.toFixed(1)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-red-400" /></div>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>;
}

function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Magnet; title: string; text: string; rgb: string }) {
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={12} /> magnetic idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
