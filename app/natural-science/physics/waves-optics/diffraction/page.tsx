"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import WaveField from "../_components/WaveField";
import { ArrowRight, Aperture, ScanLine, Waves } from "lucide-react";

export default function DiffractionPage() {
  const [wavelength, setWavelength] = useState(0.55);
  const [aperture, setAperture] = useState(1.2);
  const [answer, setAnswer] = useState<string | null>(null);

  const ratio = aperture / wavelength;
  const firstMinimum = Math.asin(Math.min(0.999, wavelength / Math.max(aperture, wavelength * 1.001))) * 180 / Math.PI;
  const spreadLabel = ratio < 1.4 ? "strong spreading" : ratio < 4 ? "moderate spreading" : "narrow spreading";

  const screen = useMemo(() => {
    return Array.from({ length: 181 }, (_, index) => {
      const x = (index - 90) / 90;
      const beta = Math.PI * ratio * x * 0.95;
      const sinc = Math.abs(beta) < 1e-6 ? 1 : Math.sin(beta) / beta;
      return { x, intensity: sinc * sinc };
    });
  }, [ratio]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050519] text-slate-100 selection:bg-violet-300/25">
      <WaveField mode="diffraction" intensity={1.26} />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#050519]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader breadcrumbs={[{ label: "Physics", href: "/natural-science/physics" }, { label: "Waves & Optics", href: "/natural-science/physics/waves-optics" }, { label: "Diffraction" }]} eyebrow="Waves & Optics · 04 / 06" icon={Aperture} title={<span>Diffraction</span>} subtitle="Waves spread after passing through openings or around obstacles. The effect becomes strongest when the opening is comparable to the wavelength." accentRgb="167, 139, 250" titleClassName="font-mono text-[clamp(2.3rem,4.6vw,4.8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#faf7ff]" headerClassName="border-transparent" />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-violet-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">When does a narrow beam stop behaving like a perfectly straight ray?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Ray optics works well when apertures and obstacles are much larger than the wavelength. As the scales approach each other, wavefront spreading becomes impossible to ignore.</p></div>
          <div className="rounded-[18px] border border-violet-200/[0.09] bg-violet-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-violet-300/62">Single-slit scale</div><div className="mt-3 text-[18px] text-white"><M>{"a\\sin\\theta_1=\\lambda"}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">The first dark minimum gives a useful measure of angular spread.</p></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/70">Aperture lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Change aperture width relative to wavelength.</h2></div><div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">a / λ = {ratio.toFixed(2)}</div></div>
            <div className="relative mt-4 min-h-[390px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0a0a18]/64 p-5"><DiffractionDiagram ratio={ratio} screen={screen} /><div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2"><Readout label="a / λ" value={ratio.toFixed(2)} rgb="167, 139, 250" /><Readout label="first minimum" value={`${firstMinimum.toFixed(1)}°`} rgb="34, 211, 238" /><Readout label="behavior" value={spreadLabel} rgb="250, 204, 21" /></div></div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2"><Control label="Wavelength λ" value={wavelength} min={0.2} max={1.2} step={0.02} unit="arb." onChange={setWavelength} /><Control label="Aperture width a" value={aperture} min={0.25} max={4} step={0.05} unit="arb." onChange={setAperture} /></div>
          </div>
          <div className="space-y-4"><Insight icon={Aperture} title="Narrow openings spread more" text="For fixed wavelength, reducing aperture width increases the angular spread of the transmitted pattern." rgb="167, 139, 250" /><Insight icon={Waves} title="Longer wavelengths spread more" text="For fixed aperture, increasing wavelength makes diffraction stronger because the opening is smaller in wavelength units." rgb="34, 211, 238" /><Insight icon={ScanLine} title="The pattern contains interference" text="Different parts of the wavefront across the opening arrive at the screen with different phases, producing a bright central maximum and weaker side lobes." rgb="250, 204, 21" /></div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3"><Principle title="Diffraction is not random scattering" text="The outgoing pattern is coherent and predictable from wave geometry." rgb="167, 139, 250" /><Principle title="Ray optics is a scale approximation" text="Straight rays emerge as a useful limit when wavelength is tiny compared with optical structures." rgb="250, 204, 21" /><Principle title="Resolution has a wave limit" text="Finite apertures necessarily diffract, which places fundamental limits on how finely imaging systems can distinguish nearby detail." rgb="34, 211, 238" /></section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6"><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold text-white">You make a slit narrower while keeping wavelength fixed. What happens to the diffraction pattern?</h2><div className="mt-4 flex flex-wrap gap-2">{["spreads wider", "gets narrower", "does not change"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>{answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "spreads wider" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "spreads wider" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "spreads wider" ? "Exactly" : "Compare a/λ"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">A smaller <M>a</M> makes <M>{"\\lambda/a"}</M> larger, pushing the first minimum to a larger angle.</p></div> : null}<div className="mt-5 flex justify-between"><Link href="/natural-science/physics/waves-optics/reflection-refraction" className="text-[10px] text-slate-500 hover:text-slate-300">← Reflection & Refraction</Link><div className="inline-flex items-center gap-2 rounded-full border border-green-200/[0.08] bg-green-400/[0.02] px-4 py-2 text-[10px] text-slate-600">Next: Lenses & Imaging · planned <ArrowRight size={12} /></div></div></section>
      </div>
    </main>
  );
}

function DiffractionDiagram({ ratio, screen }: { ratio: number; screen: { x: number; intensity: number }[] }) { const spread = Math.max(22, Math.min(80, 105 / Math.max(ratio, 0.35))); return <svg viewBox="0 0 760 300" className="absolute inset-x-5 top-5 h-[300px] w-[calc(100%-2.5rem)]" preserveAspectRatio="none" role="img" aria-label="Single slit diffraction visualization"><line x1="255" y1="20" x2="255" y2="120" stroke="rgba(255,255,255,0.18)" strokeWidth="5" /><line x1="255" y1="180" x2="255" y2="280" stroke="rgba(255,255,255,0.18)" strokeWidth="5" /><line x1="50" y1="150" x2="255" y2="150" stroke="rgb(34,211,238)" strokeWidth="3" /><path d={`M 258 150 Q 430 ${150-spread} 610 65`} fill="none" stroke="rgba(167,139,250,0.45)" /><path d={`M 258 150 Q 430 ${150+spread} 610 235`} fill="none" stroke="rgba(167,139,250,0.45)" /><line x1="650" y1="30" x2="650" y2="270" stroke="rgba(255,255,255,0.14)" />{screen.map((item, index) => { const y = 150 + item.x * 110; const width = item.intensity * 44; return <line key={index} x1={650-width} x2={650+width} y1={y} y2={y} stroke={`rgba(250,204,21,${0.12 + item.intensity * 0.72})`} strokeWidth="2" />; })}<text x="70" y="133" fill="rgba(34,211,238,0.66)" fontSize="10">incoming wave</text><text x="282" y="52" fill="rgba(167,139,250,0.66)" fontSize="10">spread</text><text x="665" y="45" fill="rgba(250,204,21,0.66)" fontSize="10">screen</text></svg>; }
function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) { return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-violet-100/60">{value.toFixed(2)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-violet-400" /></div>; }
function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 truncate font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>; }
function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Waves; title: string; text: string; rgb: string }) { return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={12} /> diffraction idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) { return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
