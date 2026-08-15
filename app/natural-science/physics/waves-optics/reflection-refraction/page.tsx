"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import WaveField from "../_components/WaveField";
import { ArrowRight, Gauge, Route, Triangle } from "lucide-react";

export default function ReflectionRefractionPage() {
  const [n1, setN1] = useState(1);
  const [n2, setN2] = useState(1.5);
  const [incidence, setIncidence] = useState(35);
  const [answer, setAnswer] = useState<string | null>(null);

  const theta1 = incidence * Math.PI / 180;
  const sinTheta2 = (n1 / n2) * Math.sin(theta1);
  const totalInternal = Math.abs(sinTheta2) > 1;
  const theta2 = totalInternal ? null : Math.asin(sinTheta2) * 180 / Math.PI;
  const reflected = incidence;
  const wavelengthRatio = n1 / n2;
  const speedRatio = n1 / n2;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#081008] text-slate-100 selection:bg-yellow-300/25">
      <WaveField mode="refraction" intensity={1.24} />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#081008]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[{ label: "Physics", href: "/natural-science/physics" }, { label: "Waves & Optics", href: "/natural-science/physics/waves-optics" }, { label: "Reflection & Refraction" }]}
            eyebrow="Waves & Optics · 03 / 06"
            icon={Triangle}
            title={<span>Reflection & Refraction</span>}
            subtitle="At a boundary, part of a wave may reflect while the transmitted part changes speed and direction. Frequency stays continuous across the boundary; wavelength adjusts with speed."
            accentRgb="250, 204, 21"
            titleClassName="font-mono text-[clamp(1.8rem,4vw,4.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fffdeb]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-yellow-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-yellow-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">Why does a wave bend when it crosses into a new medium?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">The boundary does not reset the source oscillation frequency. Instead, the propagation speed changes, which changes wavelength. Matching the wavefront across the interface forces a new direction.</p></div>
          <div className="rounded-[18px] border border-yellow-200/[0.09] bg-yellow-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-yellow-300/62">Snell&apos;s law</div><div className="mt-3 text-[18px] text-white"><M>{"n_1\\sin\\theta_1=n_2\\sin\\theta_2"}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">For light, <M>{"n=c/v"}</M>. Larger refractive index means smaller wave speed in the medium.</p></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-yellow-300/70">Boundary lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Aim a ray at the interface and change both media.</h2></div><div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">angles measured from normal</div></div>

            <div className="relative mt-4 min-h-[390px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0d130c]/62 p-5">
              <RayDiagram incidence={incidence} refraction={theta2} reflected={reflected} totalInternal={totalInternal} />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-4 gap-2"><Readout label="θ₁" value={`${incidence.toFixed(1)}°`} rgb="250, 204, 21" /><Readout label="θᵣ" value={`${reflected.toFixed(1)}°`} rgb="248, 113, 113" /><Readout label="θ₂" value={totalInternal ? "no transmitted ray" : `${theta2?.toFixed(1)}°`} rgb="34, 211, 238" /><Readout label="λ₂ / λ₁" value={wavelengthRatio.toFixed(2)} rgb="74, 222, 128" /></div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3"><Control label="Index n₁" value={n1} min={1} max={2.5} step={0.05} unit="" onChange={setN1} /><Control label="Index n₂" value={n2} min={1} max={2.5} step={0.05} unit="" onChange={setN2} /><Control label="Incidence angle" value={incidence} min={0} max={80} step={1} unit="°" onChange={setIncidence} /></div>
          </div>

          <div className="space-y-4">
            <Insight icon={Route} title="Reflection keeps the angle" text="For a smooth boundary, the reflected ray leaves at the same angle to the normal as the incoming ray: θr = θ1." rgb="248, 113, 113" />
            <Insight icon={Gauge} title="Frequency stays the same" text={`Across the interface, the source frequency remains continuous. In this setup the speed ratio v₂/v₁ is ${speedRatio.toFixed(2)}, so the wavelength ratio matches it.`} rgb="74, 222, 128" />
            <Insight icon={Triangle} title="Total internal reflection has a threshold" text="When a wave moves from higher index to lower index at a sufficiently large angle, Snell's law has no transmitted solution and all idealized ray energy reflects." rgb="34, 211, 238" />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3"><Principle title="Toward the normal" text="Entering a higher-index, slower medium bends the transmitted ray toward the normal." rgb="250, 204, 21" /><Principle title="Away from the normal" text="Entering a lower-index, faster medium bends the transmitted ray away from the normal until total internal reflection becomes possible." rgb="34, 211, 238" /><Principle title="Wavefront explanation" text="Refraction is not a mysterious force on a ray. It emerges because different portions of a wavefront enter the new medium at different times and speeds." rgb="74, 222, 128" /></section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold text-white">Light enters a higher-index medium. Which quantity must stay the same across the boundary?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["frequency", "speed", "wavelength"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "frequency" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "frequency" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "frequency" ? "Exactly" : "Follow the source oscillation"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">The boundary changes propagation speed. Since <M>{"v=f\\lambda"}</M> and <M>f</M> remains fixed, the wavelength changes with the speed.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/waves-optics/superposition" className="text-[10px] text-slate-500 hover:text-slate-300">← Superposition & Interference</Link><div className="inline-flex items-center gap-2 rounded-full border border-violet-200/[0.08] bg-violet-400/[0.02] px-4 py-2 text-[10px] text-slate-600">Next: Diffraction · planned <ArrowRight size={12} /></div></div>
        </section>
      </div>
    </main>
  );
}

function RayDiagram({ incidence, refraction, reflected, totalInternal }: { incidence: number; refraction: number | null; reflected: number; totalInternal: boolean }) {
  const centerX = 380; const centerY = 150; const length = 180; const toPoint = (angle: number, upper: boolean, right: boolean) => { const rad = angle * Math.PI / 180; const dx = Math.sin(rad) * length * (right ? 1 : -1); const dy = Math.cos(rad) * length * (upper ? -1 : 1); return { x: centerX + dx, y: centerY + dy }; }; const incident = toPoint(incidence, true, false); const refl = toPoint(reflected, true, true); const refr = refraction === null ? null : toPoint(refraction, false, true);
  return <svg viewBox="0 0 760 300" className="absolute inset-x-5 top-5 h-[300px] w-[calc(100%-2.5rem)]" preserveAspectRatio="none" role="img" aria-label="Reflection and refraction ray diagram"><rect x="0" y={centerY} width="760" height={150} fill="rgba(34,211,238,0.035)" /><line x1="0" x2="760" y1={centerY} y2={centerY} stroke="rgba(255,255,255,0.16)" /><line x1={centerX} x2={centerX} y1="20" y2="280" stroke="rgba(255,255,255,0.12)" strokeDasharray="5 6" /><line x1={incident.x} y1={incident.y} x2={centerX} y2={centerY} stroke="rgb(250,204,21)" strokeWidth="3" /><line x1={centerX} y1={centerY} x2={refl.x} y2={refl.y} stroke="rgb(248,113,113)" strokeWidth="2.5" />{refr ? <line x1={centerX} y1={centerY} x2={refr.x} y2={refr.y} stroke="rgb(34,211,238)" strokeWidth="3" /> : null}{totalInternal ? <text x={centerX + 80} y={centerY + 58} fill="rgba(167,139,250,0.78)" fontSize="11">total internal reflection</text> : null}<text x="20" y="28" fill="rgba(250,204,21,0.62)" fontSize="10">medium 1</text><text x="20" y="178" fill="rgba(34,211,238,0.62)" fontSize="10">medium 2</text></svg>;
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) { return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-yellow-100/60">{value.toFixed(2)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-yellow-400" /></div>; }
function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 truncate font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>; }
function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Triangle; title: string; text: string; rgb: string }) { return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={12} /> boundary idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) { return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
