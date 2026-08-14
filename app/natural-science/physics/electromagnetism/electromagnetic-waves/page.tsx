"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import EMField from "../_components/EMField";
import { ArrowRight, Radio, Sparkles, Waves, Zap } from "lucide-react";

const C = 299_792_458;

const BANDS = [
  { label: "Radio", frequency: 1e8 },
  { label: "Microwave", frequency: 1e10 },
  { label: "Infrared", frequency: 3e13 },
  { label: "Visible", frequency: 5.5e14 },
  { label: "Ultraviolet", frequency: 1e16 },
  { label: "X-ray", frequency: 1e18 },
  { label: "Gamma", frequency: 1e20 },
] as const;

export default function ElectromagneticWavesPage() {
  const [frequency, setFrequency] = useState(5.5e14);
  const [amplitude, setAmplitude] = useState(1);
  const [phase, setPhase] = useState(0.18);
  const [answer, setAnswer] = useState<string | null>(null);

  const wavelength = C / frequency;
  const selectedBand = nearestBand(frequency);
  const logFrequency = Math.log10(frequency);
  const visualCycles = 1.5 + ((logFrequency - 8) / 12) * 6;

  const points = useMemo(() => {
    return Array.from({ length: 120 }, (_, index) => {
      const t = index / 119;
      const angle = t * Math.PI * 2 * visualCycles + phase * Math.PI * 2;
      return { t, e: Math.sin(angle) * amplitude, b: Math.cos(angle + Math.PI / 2) * amplitude };
    });
  }, [amplitude, phase, visualCycles]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#04050d] text-slate-100 selection:bg-fuchsia-300/25">
      <EMField mode="waves" intensity={1.34} />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#04050d]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Electromagnetism", href: "/natural-science/physics/electromagnetism" },
              { label: "Electromagnetic Waves" },
            ]}
            eyebrow="Electromagnetism · 06 / 06"
            icon={Radio}
            title={<span>Electromagnetic Waves</span>}
            subtitle="Light is not a separate substance added to electromagnetism. It is a traveling electromagnetic field: electric and magnetic components oscillating together while energy moves through space."
            accentRgb="232, 121, 249"
            titleClassName="font-mono text-[clamp(1.85rem,4vw,4.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fff5ff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-fuchsia-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-fuchsia-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">How can fields keep traveling after leaving their original charges and currents behind?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">A changing electric field is linked to magnetic change, and changing magnetic flux is linked to circulating electric field. In wave solutions, those coupled changes sustain a propagating disturbance.</p>
          </div>
          <div className="rounded-[18px] border border-fuchsia-200/[0.09] bg-fuchsia-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-fuchsia-300/62">Wave relationship</div>
            <div className="mt-3 space-y-2 text-[18px] text-white"><M>{"c=f\\lambda"}</M><br /><M>{"c=\\frac{1}{\\sqrt{\\mu_0\\epsilon_0}}"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Frequency and wavelength trade inversely while the wave speed in vacuum remains <M>c</M>.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-fuchsia-300/70">Coupled-field lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">See the same electromagnetic wave as two perpendicular field components.</h2></div>
              <div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">{selectedBand.label}</div>
            </div>

            <div className="relative mt-4 min-h-[380px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#090916]/64 p-5">
              <WavePlot points={points} />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                <Readout label="frequency" value={formatFrequency(frequency)} rgb="232, 121, 249" />
                <Readout label="wavelength" value={formatLength(wavelength)} rgb="34, 211, 238" />
                <Readout label="vacuum speed" value="2.998 × 10⁸ m/s" rgb="250, 204, 21" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <div>
                <div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>Frequency band</span><span className="font-mono text-fuchsia-100/60">10^{logFrequency.toFixed(1)} Hz</span></div>
                <input aria-label="Frequency" type="range" min="8" max="20" step="0.05" value={logFrequency} onChange={(event) => setFrequency(10 ** Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-fuchsia-400" />
              </div>
              <Control label="Field amplitude" value={amplitude} min={0.25} max={1.5} step={0.05} unit="×" onChange={setAmplitude} />
              <Control label="Wave phase" value={phase} min={0} max={1} step={0.01} unit="cycle" onChange={setPhase} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">{BANDS.map((band) => <button key={band.label} type="button" onClick={() => setFrequency(band.frequency)} className="rounded-full border px-3 py-1.5 text-[9px] transition" style={{ borderColor: band.label === selectedBand.label ? "rgba(232,121,249,0.26)" : "rgba(255,255,255,0.06)", background: band.label === selectedBand.label ? "rgba(232,121,249,0.05)" : "rgba(0,0,0,0.10)", color: band.label === selectedBand.label ? "rgb(245,208,254)" : "rgb(100,116,139)" }}>{band.label}</button>)}</div>
          </div>

          <div className="space-y-4">
            <Insight icon={Zap} title="E and B are perpendicular" text="For an ideal plane wave in vacuum, the electric field, magnetic field, and propagation direction are mutually perpendicular." rgb="34, 211, 238" />
            <Insight icon={Waves} title="The spectrum is one phenomenon" text="Radio, microwave, infrared, visible, ultraviolet, X-ray, and gamma radiation differ mainly in frequency and wavelength, not in their basic electromagnetic identity." rgb="232, 121, 249" />
            <Insight icon={Sparkles} title="No material medium is required" text="Mechanical waves need matter to oscillate. Electromagnetic waves are oscillations of the electromagnetic field itself and propagate through vacuum." rgb="250, 204, 21" />
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-md sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/65">Maxwell synthesis</div>
              <h2 className="mt-2 text-[23px] font-semibold tracking-[-0.03em] text-white">Now the four field laws form one dynamical theory.</h2>
              <p className="mt-3 text-[12px] leading-6 text-slate-400">Charge sources electric field. There are no observed magnetic monopoles. Changing magnetic flux curls electric field, while currents and changing electric flux curl magnetic field. Together, those relationships admit traveling electromagnetic waves.</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Equation label="Gauss — electric" formula="\\nabla\\cdot\\mathbf E=\\rho/\\epsilon_0" rgb="250, 204, 21" />
              <Equation label="Gauss — magnetic" formula="\\nabla\\cdot\\mathbf B=0" rgb="248, 113, 113" />
              <Equation label="Faraday" formula="\\nabla\\times\\mathbf E=-\\partial\\mathbf B/\\partial t" rgb="34, 211, 238" />
              <Equation label="Ampère-Maxwell" formula="\\nabla\\times\\mathbf B=\\mu_0\\mathbf J+\\mu_0\\epsilon_0\\partial\\mathbf E/\\partial t" rgb="167, 139, 250" />
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">The frequency of an electromagnetic wave in vacuum doubles. What happens to its wavelength?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["doubles", "halves", "stays the same"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "halves" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "halves" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "halves" ? "Exactly" : "Hold c fixed"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">Since <M>{"c=f\\lambda"}</M>, doubling frequency while <M>c</M> stays constant requires halving wavelength.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/electromagnetism/induction" className="text-[10px] text-slate-500 hover:text-slate-300">← Electromagnetic Induction</Link><Link href="/natural-science/physics/electromagnetism" className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/[0.12] bg-fuchsia-400/[0.035] px-4 py-2 text-[10px] font-semibold text-fuchsia-100/75">Electromagnetism map <ArrowRight size={13} /></Link></div>
        </section>
      </div>
    </main>
  );
}

function WavePlot({ points }: { points: { t: number; e: number; b: number }[] }) {
  const width = 760;
  const height = 270;
  const centerY = 125;
  const scale = 68;
  const path = (key: "e" | "b") => points.map((point, index) => `${index === 0 ? "M" : "L"} ${(point.t * width).toFixed(1)},${(centerY - point[key] * scale).toFixed(1)}`).join(" ");
  return <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-x-5 top-6 h-[270px] w-[calc(100%-2.5rem)]" preserveAspectRatio="none" role="img" aria-label="Electric and magnetic field wave components"><line x1="0" x2={width} y1={centerY} y2={centerY} stroke="rgba(148,163,184,0.13)" /><path d={path("e")} fill="none" stroke="rgb(34,211,238)" strokeWidth="3" vectorEffect="non-scaling-stroke" /><path d={path("b")} fill="none" stroke="rgb(232,121,249)" strokeWidth="2.5" strokeDasharray="7 5" vectorEffect="non-scaling-stroke" /><text x="18" y="42" fill="rgba(34,211,238,0.78)" fontSize="11">electric field E</text><text x="18" y="61" fill="rgba(232,121,249,0.72)" fontSize="11">magnetic field B</text><text x={width - 95} y={centerY - 10} fill="rgba(250,204,21,0.60)" fontSize="10">propagation →</text></svg>;
}

function nearestBand(frequency: number) {
  return BANDS.reduce((closest, band) => Math.abs(Math.log10(band.frequency) - Math.log10(frequency)) < Math.abs(Math.log10(closest.frequency) - Math.log10(frequency)) ? band : closest, BANDS[0]);
}

function formatFrequency(value: number) {
  if (value >= 1e18) return `${(value / 1e18).toFixed(2)} EHz`;
  if (value >= 1e15) return `${(value / 1e15).toFixed(2)} PHz`;
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)} THz`;
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)} GHz`;
  return `${(value / 1e6).toFixed(2)} MHz`;
}

function formatLength(value: number) {
  if (value >= 1) return `${value.toFixed(2)} m`;
  if (value >= 1e-3) return `${(value * 1e3).toFixed(2)} mm`;
  if (value >= 1e-6) return `${(value * 1e6).toFixed(2)} μm`;
  if (value >= 1e-9) return `${(value * 1e9).toFixed(2)} nm`;
  if (value >= 1e-12) return `${(value * 1e12).toFixed(2)} pm`;
  return `${value.toExponential(2)} m`;
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-fuchsia-100/60">{value.toFixed(2)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-fuchsia-400" /></div>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 truncate font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>;
}

function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Radio; title: string; text: string; rgb: string }) {
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={12} /> wave idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function Equation({ label, formula, rgb }: { label: string; formula: string; rgb: string }) {
  return <div className="rounded-[16px] border border-white/[0.06] bg-black/[0.10] p-3"><div className="text-[8px] uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.66)` }}>{label}</div><div className="mt-2 overflow-x-auto text-[12px] text-white"><M>{formula}</M></div></div>;
}
