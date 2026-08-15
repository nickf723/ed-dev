"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import WaveField from "../_components/WaveField";
import { Activity, ArrowRight, Focus, Radio, Waves } from "lucide-react";

export default function ResonancePage() {
  const [harmonic, setHarmonic] = useState(2);
  const [length, setLength] = useState(2);
  const [waveSpeed, setWaveSpeed] = useState(6);
  const [driverFrequency, setDriverFrequency] = useState(3);
  const [phase, setPhase] = useState(0.15);
  const [answer, setAnswer] = useState<string | null>(null);

  const naturalFrequency = harmonic * waveSpeed / (2 * length);
  const wavelength = 2 * length / harmonic;
  const ratio = driverFrequency / Math.max(naturalFrequency, 0.01);
  const damping = 0.09;
  const response = Math.min(8, 1 / Math.sqrt((1 - ratio * ratio) ** 2 + (2 * damping * ratio) ** 2));
  const normalizedResponse = Math.min(1, response / 5.5);

  const samples = useMemo(() => Array.from({ length: 140 }, (_, index) => {
    const x = (index / 139) * length;
    const shape = Math.sin(harmonic * Math.PI * x / length);
    const y = shape * Math.cos(phase * Math.PI * 2) * normalizedResponse;
    return { x, y };
  }), [length, harmonic, phase, normalizedResponse]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#070518] text-slate-100 selection:bg-fuchsia-300/25">
      <WaveField mode="resonance" intensity={1.27} />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#070518]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader breadcrumbs={[{ label: "Physics", href: "/natural-science/physics" }, { label: "Waves & Optics", href: "/natural-science/physics/waves-optics" }, { label: "Standing Waves & Resonance" }]} eyebrow="Waves & Optics · 06 / 06" icon={Focus} title={<span>Standing Waves & Resonance</span>} subtitle="Reflections can interfere with incoming waves to form standing patterns. Boundary conditions allow only particular modes, and periodic driving is strongest when it matches one of those natural frequencies." accentRgb="232, 121, 249" titleClassName="font-mono text-[clamp(1.75rem,3.8vw,4rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fff5ff]" headerClassName="border-transparent" />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-fuchsia-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-fuchsia-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">Why do bounded systems prefer particular frequencies?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">The reflected wave must fit the boundary conditions and remain self-consistent after repeated trips. Only certain wavelengths create stable node patterns, so only corresponding frequencies become normal modes.</p></div>
          <div className="rounded-[18px] border border-fuchsia-200/[0.09] bg-fuchsia-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-fuchsia-300/62">String fixed at both ends</div><div className="mt-3 space-y-2 text-[18px] text-white"><M>{"L=n\\frac{\\lambda_n}{2}"}</M><br /><M>{"f_n=n\\frac{v}{2L}"}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">The integer <M>n</M> labels the harmonic mode.</p></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-fuchsia-300/70">Standing-wave lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Choose a mode, then drive the system through resonance.</h2></div><div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">response ×{response.toFixed(2)}</div></div>
            <div className="relative mt-4 min-h-[390px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0b0919]/64 p-5"><StandingGraph samples={samples} length={length} harmonic={harmonic} glow={normalizedResponse} /><div className="absolute bottom-5 left-5 right-5 grid grid-cols-4 gap-2"><Readout label="harmonic" value={`n = ${harmonic}`} rgb="232, 121, 249" /><Readout label="λₙ" value={`${wavelength.toFixed(2)} m`} rgb="34, 211, 238" /><Readout label="natural fₙ" value={`${naturalFrequency.toFixed(2)} Hz`} rgb="250, 204, 21" /><Readout label="driver f" value={`${driverFrequency.toFixed(2)} Hz`} rgb="74, 222, 128" /></div></div>
            <div className="mt-5 grid gap-5 sm:grid-cols-5"><IntegerControl label="Harmonic n" value={harmonic} min={1} max={6} onChange={setHarmonic} /><Control label="Length L" value={length} min={1} max={4} step={0.05} unit="m" onChange={setLength} /><Control label="Wave speed v" value={waveSpeed} min={2} max={12} step={0.1} unit="m/s" onChange={setWaveSpeed} /><Control label="Driver frequency" value={driverFrequency} min={0.2} max={12} step={0.05} unit="Hz" onChange={setDriverFrequency} /><Control label="Phase" value={phase} min={0} max={1} step={0.01} unit="cycle" onChange={setPhase} /></div>
          </div>
          <div className="space-y-4"><Insight icon={Waves} title="Nodes satisfy the boundaries" text="For a string fixed at both ends, displacement must vanish at the endpoints. Allowed modes insert an integer number of half-wavelengths into the length." rgb="34, 211, 238" /><Insight icon={Radio} title="Resonance is frequency matching" text="A periodic driver adds energy most efficiently when its frequency is near a natural mode and its forcing overlaps that mode shape." rgb="232, 121, 249" /><Insight icon={Activity} title="Damping limits the response" text="Real systems lose energy each cycle. Without damping, an ideal driven resonance could grow without bound in the linear model." rgb="250, 204, 21" /></div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3"><Principle title="Standing waves do not transport the same way" text="A perfect standing wave is the superposition of equal waves traveling in opposite directions; its nodes stay fixed in space." rgb="232, 121, 249" /><Principle title="Harmonics share a fundamental" text="For this ideal string, mode frequencies are integer multiples of the fundamental frequency f₁." rgb="34, 211, 238" /><Principle title="Resonance appears everywhere" text="Strings, air columns, buildings, circuits, atoms, and optical cavities all exhibit mode structure and resonant response." rgb="250, 204, 21" /></section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6"><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold text-white">For a string fixed at both ends, what happens to the fundamental frequency if the string length doubles while wave speed stays fixed?</h2><div className="mt-4 flex flex-wrap gap-2">{["doubles", "halves", "stays the same"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>{answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "halves" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "halves" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "halves" ? "Exactly" : "Use the mode relationship"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">For the fundamental, <M>{"f_1=v/(2L)"}</M>. Doubling <M>L</M> halves the natural frequency.</p></div> : null}<div className="mt-5 flex justify-between"><Link href="/natural-science/physics/waves-optics/lenses-imaging" className="text-[10px] text-slate-500 hover:text-slate-300">← Lenses & Imaging</Link><Link href="/natural-science/physics/waves-optics" className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/[0.12] bg-fuchsia-400/[0.035] px-4 py-2 text-[10px] font-semibold text-fuchsia-100/75">Waves & Optics map <ArrowRight size={13} /></Link></div></section>
      </div>
    </main>
  );
}

function StandingGraph({ samples, length, harmonic, glow }: { samples: { x: number; y: number }[]; length: number; harmonic: number; glow: number }) { const width=760; const height=270; const center=135; const scale=72; const x=(value:number)=>(value/length)*width; const y=(value:number)=>center-value*scale; const path=samples.map((sample,index)=>`${index===0?"M":"L"} ${x(sample.x).toFixed(1)},${y(sample.y).toFixed(1)}`).join(" "); const nodes=Array.from({length:harmonic+1},(_,index)=>(index/harmonic)*length); return <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-x-5 top-5 h-[270px] w-[calc(100%-2.5rem)]" preserveAspectRatio="none" role="img" aria-label="Standing wave mode"><line x1="0" x2={width} y1={center} y2={center} stroke="rgba(148,163,184,0.13)" /><path d={path} fill="none" stroke="rgb(232,121,249)" strokeWidth={2.5+glow*2} vectorEffect="non-scaling-stroke" style={{filter:`drop-shadow(0 0 ${4+glow*12}px rgba(232,121,249,${0.18+glow*0.35}))`}} />{nodes.map((node)=><g key={node}><line x1={x(node)} x2={x(node)} y1="38" y2="232" stroke="rgba(34,211,238,0.15)" strokeDasharray="4 5" /><circle cx={x(node)} cy={center} r="4" fill="rgb(34,211,238)" /></g>)}</svg>; }
function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) { return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-fuchsia-100/60">{value.toFixed(2)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event)=>onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-fuchsia-400" /></div>; }
function IntegerControl({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value:number)=>void }) { return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-fuchsia-100/60">{value}</span></div><input aria-label={label} type="range" min={min} max={max} step={1} value={value} onChange={(event)=>onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-fuchsia-400" /></div>; }
function Readout({ label, value, rgb }: { label:string; value:string; rgb:string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 truncate font-mono text-[10px]" style={{color:`rgba(${rgb},0.78)`}}>{value}</div></div>; }
function Insight({ icon:Icon, title, text, rgb }: { icon:typeof Focus; title:string; text:string; rgb:string }) { return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{color:`rgba(${rgb},0.68)`}}><Icon size={12} /> resonance idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
function Principle({ title,text,rgb }:{title:string;text:string;rgb:string}) { return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4"><div className="h-1 w-10 rounded-full" style={{background:`rgba(${rgb},0.72)`}} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
