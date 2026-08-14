"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import WaveField from "../_components/WaveField";
import { Activity, ArrowRight, Gauge, MoveRight, Waves } from "lucide-react";

export default function WaveMotionPage() {
  const [amplitude, setAmplitude] = useState(1);
  const [frequency, setFrequency] = useState(1.5);
  const [speed, setSpeed] = useState(3);
  const [phase, setPhase] = useState(0.15);
  const [answer, setAnswer] = useState<string | null>(null);

  const wavelength = speed / Math.max(frequency, 0.05);
  const angularFrequency = 2 * Math.PI * frequency;
  const waveNumber = 2 * Math.PI / wavelength;

  const samples = useMemo(
    () => Array.from({ length: 140 }, (_, index) => {
      const x = (index / 139) * 12;
      const y = amplitude * Math.sin(waveNumber * x - phase * Math.PI * 2);
      return { x, y };
    }),
    [amplitude, waveNumber, phase],
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] text-slate-100 selection:bg-cyan-300/25">
      <WaveField mode="wave" intensity={1.22} />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#020617]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Waves & Optics", href: "/natural-science/physics/waves-optics" },
              { label: "Wave Motion" },
            ]}
            eyebrow="Waves & Optics · 01 / 06"
            icon={Waves}
            title={<span>Wave Motion</span>}
            subtitle="A traveling wave carries a changing pattern and transfers energy through space. In a mechanical wave, the medium&apos;s particles usually oscillate around equilibrium rather than traveling with the wave itself."
            accentRgb="34, 211, 238"
            titleClassName="font-mono text-[clamp(2.2rem,4.6vw,4.8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#effdff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-cyan-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">What actually moves when a wave travels?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">The wave pattern moves with a propagation speed. For a transverse mechanical wave, individual particles move up and down locally while the crest pattern advances horizontally.</p>
          </div>
          <div className="rounded-[18px] border border-cyan-200/[0.09] bg-cyan-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-300/62">Core relationships</div>
            <div className="mt-3 space-y-2 text-[18px] text-white"><M>{"v=f\\lambda"}</M><br /><M>{"y=A\\sin(kx-\\omega t)"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Amplitude controls displacement scale; frequency and wavelength combine with speed.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/70">Traveling-wave lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Change the wave and keep every representation synchronized.</h2></div>
              <div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">phase = {(phase * 360).toFixed(0)}°</div>
            </div>

            <div className="relative mt-4 min-h-[365px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#06101a]/62 p-5">
              <WaveGraph samples={samples} wavelength={wavelength} />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                <Readout label="wavelength λ" value={`${wavelength.toFixed(2)} m`} rgb="34, 211, 238" />
                <Readout label="frequency f" value={`${frequency.toFixed(2)} Hz`} rgb="232, 121, 249" />
                <Readout label="period T" value={`${(1 / frequency).toFixed(2)} s`} rgb="250, 204, 21" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-4">
              <Control label="Amplitude A" value={amplitude} min={0.25} max={1.75} step={0.05} unit="m" onChange={setAmplitude} />
              <Control label="Frequency f" value={frequency} min={0.25} max={4} step={0.05} unit="Hz" onChange={setFrequency} />
              <Control label="Wave speed v" value={speed} min={0.5} max={8} step={0.1} unit="m/s" onChange={setSpeed} />
              <Control label="Phase" value={phase} min={0} max={1} step={0.01} unit="cycle" onChange={setPhase} />
            </div>
          </div>

          <div className="space-y-4">
            <Insight icon={MoveRight} title="The pattern propagates" text="A crest at one location is replaced by another crest later. Tracking equal phase points reveals the wave speed." rgb="34, 211, 238" />
            <Insight icon={Activity} title="The medium oscillates locally" text="In this transverse model, sample particles move perpendicular to propagation. They do not ride the crest across the whole domain." rgb="232, 121, 249" />
            <Insight icon={Gauge} title="Changing frequency changes wavelength at fixed speed" text="If the medium fixes wave speed, increasing frequency packs more cycles into the same distance, so wavelength decreases." rgb="250, 204, 21" />
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-md sm:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Principle title="Amplitude" formula="A" text="Maximum displacement from equilibrium in this wave variable. Larger amplitude changes the scale, not the wavelength." rgb="34, 211, 238" />
            <Principle title="Wavelength" formula="\\lambda" text="Spatial repeat distance between equal-phase points such as neighboring crests." rgb="74, 222, 128" />
            <Principle title="Frequency" formula="f" text="Number of oscillation cycles per second at one location. Period is its reciprocal." rgb="232, 121, 249" />
          </div>
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">A wave travels through a medium at constant speed. Its frequency doubles. What happens to its wavelength?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["doubles", "halves", "stays the same"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "halves" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "halves" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "halves" ? "Exactly" : "Keep v fixed"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">Since <M>{"v=f\\lambda"}</M>, doubling <M>f</M> at fixed <M>v</M> requires halving <M>{"\\lambda"}</M>.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/waves-optics" className="text-[10px] text-slate-500 hover:text-slate-300">← Waves & Optics map</Link><div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/[0.08] bg-fuchsia-400/[0.02] px-4 py-2 text-[10px] text-slate-600">Next: Superposition · planned <ArrowRight size={12} /></div></div>
        </section>
      </div>
    </main>
  );
}

function WaveGraph({ samples, wavelength }: { samples: { x: number; y: number }[]; wavelength: number }) {
  const width = 760;
  const height = 255;
  const centerY = 118;
  const scale = 58;
  const x = (value: number) => (value / 12) * width;
  const y = (value: number) => centerY - value * scale;
  const path = samples.map((sample, index) => `${index === 0 ? "M" : "L"} ${x(sample.x).toFixed(1)},${y(sample.y).toFixed(1)}`).join(" ");
  const particles = [1.2, 2.8, 4.4, 6, 7.6, 9.2, 10.8];
  return <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-x-5 top-5 h-[255px] w-[calc(100%-2.5rem)]" preserveAspectRatio="none" role="img" aria-label="Traveling transverse wave"><line x1="0" x2={width} y1={centerY} y2={centerY} stroke="rgba(148,163,184,0.14)" /><path d={path} fill="none" stroke="rgb(34,211,238)" strokeWidth="3" vectorEffect="non-scaling-stroke" />{particles.map((px) => { const nearest = samples.reduce((best, sample) => Math.abs(sample.x - px) < Math.abs(best.x - px) ? sample : best, samples[0]); return <g key={px}><line x1={x(px)} x2={x(px)} y1={centerY} y2={y(nearest.y)} stroke="rgba(232,121,249,0.30)" strokeDasharray="3 4" /><circle cx={x(px)} cy={y(nearest.y)} r="5" fill="rgb(232,121,249)" /></g>; })}<line x1={x(1)} x2={x(1 + wavelength)} y1="38" y2="38" stroke="rgba(74,222,128,0.62)" /><line x1={x(1)} x2={x(1)} y1="33" y2="43" stroke="rgba(74,222,128,0.62)" /><line x1={x(1 + wavelength)} x2={x(1 + wavelength)} y1="33" y2="43" stroke="rgba(74,222,128,0.62)" /><text x={(x(1) + x(1 + wavelength)) / 2 - 8} y="28" fill="rgba(74,222,128,0.72)" fontSize="10">λ</text><text x={width - 125} y={centerY - 12} fill="rgba(250,204,21,0.58)" fontSize="10">propagation →</text></svg>;
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-cyan-100/60">{value.toFixed(2)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-cyan-400" /></div>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>;
}

function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Waves; title: string; text: string; rgb: string }) {
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={12} /> wave idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function Principle({ title, formula, text, rgb }: { title: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}>{title}</div><div className="mt-2 text-[17px] text-white"><M>{formula}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
