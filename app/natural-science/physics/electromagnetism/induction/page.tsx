"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import EMField from "../_components/EMField";
import { ArrowRight, Gauge, RefreshCw, RotateCcw, Sparkles } from "lucide-react";

export default function InductionPage() {
  const [turns, setTurns] = useState(20);
  const [area, setArea] = useState(0.06);
  const [fieldRate, setFieldRate] = useState(0.8);
  const [increasingIntoPage, setIncreasingIntoPage] = useState(true);
  const [answer, setAnswer] = useState<string | null>(null);

  const signedRate = (increasingIntoPage ? 1 : -1) * fieldRate;
  const emf = -turns * area * signedRate;
  const inducedCounterclockwise = emf > 0;
  const glow = Math.min(1, Math.abs(emf) / 1.4);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050611] text-slate-100 selection:bg-violet-300/25">
      <EMField mode="induction" intensity={1.32} />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#050611]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Electromagnetism", href: "/natural-science/physics/electromagnetism" },
              { label: "Electromagnetic Induction" },
            ]}
            eyebrow="Electromagnetism · 05 / 06"
            icon={Sparkles}
            title={<span>Electromagnetic Induction</span>}
            subtitle="A changing magnetic flux creates an induced electric response. The induced current acts in the direction that opposes the change in flux that produced it."
            accentRgb="167, 139, 250"
            titleClassName="font-mono text-[clamp(1.75rem,3.8vw,4rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#faf7ff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-violet-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">How can a magnetic change make charge move without a battery?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Changing magnetic flux creates a circulating electric field. A conducting loop lets that electric field drive a current around the loop.</p>
          </div>
          <div className="rounded-[18px] border border-violet-200/[0.09] bg-violet-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-violet-300/62">Faraday&apos;s law</div>
            <div className="mt-3 space-y-2 text-[18px] text-white"><M>{"\\mathcal E = -N\\frac{d\\Phi_B}{dt}"}</M><br /><M>{"\\Phi_B = BA\\cos\\theta"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">The minus sign is Lenz&apos;s law: the induced response opposes the change in flux.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/70">Flux-change lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Change the magnetic field through a loop.</h2></div>
              <button type="button" onClick={() => setIncreasingIntoPage((value) => !value)} className="rounded-full border border-white/[0.08] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-400 hover:text-white">{increasingIntoPage ? "B into page increasing" : "B into page decreasing"}</button>
            </div>

            <div className="relative mt-4 min-h-[370px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0a0a18]/64 p-5">
              <div className="absolute inset-0 grid grid-cols-10 grid-rows-7 place-items-center opacity-45">{Array.from({ length: 70 }, (_, index) => <span key={index} className="font-mono text-[12px] text-violet-200/45">⊗</span>)}</div>
              <div className="absolute left-1/2 top-[42%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-cyan-200/50" style={{ boxShadow: `0 0 ${30 + glow * 80}px rgba(34,211,238,${0.08 + glow * 0.24}), inset 0 0 ${18 + glow * 45}px rgba(167,139,250,${0.04 + glow * 0.14})` }}>
                <div className={`absolute inset-4 rounded-full border-2 border-dashed ${inducedCounterclockwise ? "animate-[spin_2.6s_linear_infinite_reverse]" : "animate-[spin_2.6s_linear_infinite]"}`} style={{ borderColor: `rgba(250,204,21,${0.28 + glow * 0.52})` }} />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"><RefreshCw size={24} className="mx-auto text-yellow-200/75" /><div className="mt-2 font-mono text-[9px] text-yellow-100/60">{inducedCounterclockwise ? "CCW current" : "CW current"}</div></div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                <Readout label="dB/dt" value={`${signedRate.toFixed(2)} T/s`} rgb="167, 139, 250" />
                <Readout label="induced emf" value={`${emf.toFixed(2)} V`} rgb="250, 204, 21" />
                <Readout label="response" value={increasingIntoPage ? "oppose increase" : "oppose decrease"} rgb="34, 211, 238" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <Control label="Turns N" value={turns} min={1} max={60} step={1} unit="" onChange={setTurns} />
              <Control label="Loop area A" value={area} min={0.01} max={0.15} step={0.01} unit="m²" onChange={setArea} />
              <Control label="Field change rate" value={fieldRate} min={0} max={2} step={0.05} unit="T/s" onChange={setFieldRate} />
            </div>
          </div>

          <div className="space-y-4">
            <Insight icon={Gauge} title="Flux is what matters" text="Induction responds to magnetic flux through the loop, so field strength, loop area, orientation, or any combination of them can create a change." rgb="167, 139, 250" />
            <Insight icon={RotateCcw} title="Lenz&apos;s law protects energy bookkeeping" text="If the induced current reinforced the change that created it, the system could amplify itself without an energy source. The opposing direction prevents that runaway." rgb="250, 204, 21" />
            <Insight icon={Sparkles} title="Generators are motion-to-electric transfer" text="Rotating a coil in a magnetic field changes flux periodically, creating alternating emf. Mechanical work becomes electrical energy transfer." rgb="34, 211, 238" />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Changing B creates circulating E" text="Induced electric fields do not need to begin or end on charge. They form closed loops around changing magnetic flux." rgb="167, 139, 250" />
          <Principle title="More turns multiply emf" text="Each loop experiences the same flux change, so a coil with N turns adds the induced emf around all turns." rgb="34, 211, 238" />
          <Principle title="No change means no induction" text="A large steady magnetic flux produces no Faraday emf by itself. The time variation is the crucial ingredient." rgb="250, 204, 21" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">A strong magnetic field passes through a loop but stays perfectly constant. What Faraday emf is induced?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["large", "zero", "depends only on field direction"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "zero" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "zero" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "zero" ? "Exactly" : "Look for a time derivative"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">Faraday&apos;s law depends on <M>{"d\\Phi_B/dt"}</M>. Constant flux means that derivative is zero.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/electromagnetism/magnetic-fields" className="text-[10px] text-slate-500 hover:text-slate-300">← Magnetic Fields</Link><div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/[0.08] bg-fuchsia-400/[0.02] px-4 py-2 text-[10px] text-slate-600">Next: Electromagnetic Waves · planned <ArrowRight size={12} /></div></div>
        </section>
      </div>
    </main>
  );
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-violet-100/60">{step < 1 ? value.toFixed(2) : value.toFixed(0)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-violet-400" /></div>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>;
}

function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Sparkles; title: string; text: string; rgb: string }) {
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={12} /> induction idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
