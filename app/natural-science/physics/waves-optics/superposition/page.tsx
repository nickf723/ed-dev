"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import WaveField from "../_components/WaveField";
import { Activity, ArrowRight, Blend, Radio, Waves } from "lucide-react";

export default function SuperpositionPage() {
  const [amplitudeA, setAmplitudeA] = useState(1);
  const [amplitudeB, setAmplitudeB] = useState(1);
  const [phaseOffset, setPhaseOffset] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);

  const samples = useMemo(() => {
    return Array.from({ length: 150 }, (_, index) => {
      const x = (index / 149) * Math.PI * 4;
      const a = amplitudeA * Math.sin(x);
      const b = amplitudeB * Math.sin(x + phaseOffset * Math.PI * 2);
      return { x, a, b, sum: a + b };
    });
  }, [amplitudeA, amplitudeB, phaseOffset]);

  const resultantAmplitude = Math.sqrt(
    amplitudeA * amplitudeA + amplitudeB * amplitudeB + 2 * amplitudeA * amplitudeB * Math.cos(phaseOffset * Math.PI * 2),
  );

  const relation = resultantAmplitude < 0.08 ? "near cancellation" : resultantAmplitude > amplitudeA + amplitudeB - 0.08 ? "strong reinforcement" : "partial interference";

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#040519] text-slate-100 selection:bg-fuchsia-300/25">
      <WaveField mode="superposition" intensity={1.25} />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#040519]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Waves & Optics", href: "/natural-science/physics/waves-optics" },
              { label: "Superposition & Interference" },
            ]}
            eyebrow="Waves & Optics · 02 / 06"
            icon={Blend}
            title={<span>Superposition & Interference</span>}
            subtitle="When waves overlap, their instantaneous displacements add. Interference is not a separate force—it is the pattern produced by ordinary superposition."
            accentRgb="232, 121, 249"
            titleClassName="font-mono text-[clamp(1.75rem,3.9vw,4rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fff5ff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-fuchsia-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-fuchsia-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">How can two waves share the same place without blocking each other?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">In a linear medium, each wave contributes independently. At every point, the actual displacement is simply the algebraic sum of those contributions.</p>
          </div>
          <div className="rounded-[18px] border border-fuchsia-200/[0.09] bg-fuchsia-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-fuchsia-300/62">Superposition principle</div>
            <div className="mt-3 text-[18px] text-white"><M>{"y_{total}=y_1+y_2"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Phase determines whether the two contributions reinforce, partially cancel, or fully cancel at a given point.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-fuchsia-300/70">Interference lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Slide one wave through phase and watch the resultant change.</h2></div>
              <div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">{relation}</div>
            </div>

            <div className="relative mt-4 min-h-[390px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0a0919]/64 p-5">
              <InterferenceGraph samples={samples} />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                <Readout label="phase offset" value={`${(phaseOffset * 360).toFixed(0)}°`} rgb="232, 121, 249" />
                <Readout label="resultant amplitude" value={resultantAmplitude.toFixed(2)} rgb="34, 211, 238" />
                <Readout label="relationship" value={relation} rgb="250, 204, 21" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <Control label="Amplitude A₁" value={amplitudeA} min={0} max={1.5} step={0.05} unit="" onChange={setAmplitudeA} />
              <Control label="Amplitude A₂" value={amplitudeB} min={0} max={1.5} step={0.05} unit="" onChange={setAmplitudeB} />
              <Control label="Phase offset" value={phaseOffset} min={0} max={1} step={0.01} unit="cycle" onChange={setPhaseOffset} />
            </div>
          </div>

          <div className="space-y-4">
            <Insight icon={Waves} title="Constructive interference" text="When equal-frequency waves arrive nearly in phase, crest aligns with crest and trough with trough, so the resultant amplitude grows." rgb="34, 211, 238" />
            <Insight icon={Radio} title="Destructive interference" text="When equal-amplitude waves differ by half a cycle, each crest aligns with a trough and the resultant can vanish locally." rgb="232, 121, 249" />
            <Insight icon={Activity} title="The waves continue afterward" text="Interference does not normally destroy the original waves. After overlapping, each component continues according to the medium&apos;s wave equation." rgb="250, 204, 21" />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Phase matters" text="Equal frequency alone does not determine interference. Relative phase decides the alignment of peaks and troughs." rgb="232, 121, 249" />
          <Principle title="Interference can vary through space" text="When path lengths differ, the phase difference can change from point to point, creating alternating maxima and minima." rgb="34, 211, 238" />
          <Principle title="Intensity is not amplitude" text="For many waves, measured intensity scales with amplitude squared, so doubling amplitude can quadruple intensity." rgb="250, 204, 21" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">Two equal-amplitude sine waves have the same frequency and differ in phase by exactly half a cycle. What is their resultant?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["double amplitude", "zero everywhere in this ideal model", "same as one wave"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "zero everywhere in this ideal model" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "zero everywhere in this ideal model" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "zero everywhere in this ideal model" ? "Exactly" : "Compare every point"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">A half-cycle shift makes <M>{"y_2=-y_1"}</M>, so their sum is zero at every point for these ideal equal waves.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/waves-optics/wave-motion" className="text-[10px] text-slate-500 hover:text-slate-300">← Wave Motion</Link><div className="inline-flex items-center gap-2 rounded-full border border-yellow-200/[0.08] bg-yellow-400/[0.02] px-4 py-2 text-[10px] text-slate-600">Next: Reflection & Refraction · planned <ArrowRight size={12} /></div></div>
        </section>
      </div>
    </main>
  );
}

function InterferenceGraph({ samples }: { samples: { x: number; a: number; b: number; sum: number }[] }) {
  const width = 760;
  const height = 275;
  const scale = 42;
  const paths = [
    { key: "a" as const, center: 58, color: "rgb(34,211,238)" },
    { key: "b" as const, center: 134, color: "rgb(232,121,249)" },
    { key: "sum" as const, center: 220, color: "rgb(250,204,21)" },
  ];
  return <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-x-5 top-5 h-[275px] w-[calc(100%-2.5rem)]" preserveAspectRatio="none" role="img" aria-label="Two component waves and their sum">{paths.map(({ key, center, color }) => { const path = samples.map((sample, index) => `${index === 0 ? "M" : "L"} ${(index / (samples.length - 1) * width).toFixed(1)},${(center - sample[key] * scale).toFixed(1)}`).join(" "); return <g key={key}><line x1="0" x2={width} y1={center} y2={center} stroke="rgba(148,163,184,0.10)" /><path d={path} fill="none" stroke={color} strokeWidth={key === "sum" ? 3 : 2} vectorEffect="non-scaling-stroke" /></g>; })}<text x="12" y="22" fill="rgba(34,211,238,0.72)" fontSize="10">wave 1</text><text x="12" y="98" fill="rgba(232,121,249,0.72)" fontSize="10">wave 2</text><text x="12" y="184" fill="rgba(250,204,21,0.72)" fontSize="10">resultant</text></svg>;
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-fuchsia-100/60">{value.toFixed(2)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-fuchsia-400" /></div>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>;
}

function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Waves; title: string; text: string; rgb: string }) {
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={12} /> interference idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
