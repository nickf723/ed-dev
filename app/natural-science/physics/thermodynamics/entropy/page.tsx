"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import ThermoField from "../_components/ThermoField";
import { ArrowRight, Atom, BarChart3, Dices, Scale } from "lucide-react";

export default function EntropyPage() {
  const [particles, setParticles] = useState(12);
  const [leftCount, setLeftCount] = useState(6);
  const [answer, setAnswer] = useState<string | null>(null);

  const clampedLeft = Math.min(leftCount, particles);
  const omega = choose(particles, clampedLeft);
  const totalMicrostates = Math.pow(2, particles);
  const probability = omega / totalMicrostates;
  const entropyKb = Math.log(Math.max(1, omega));
  const distribution = useMemo(() => Array.from({ length: particles }, (_, i) => i < clampedLeft), [particles, clampedLeft]);
  const balanced = Math.abs(clampedLeft - particles / 2) <= 1;

  function updateParticles(value: number) {
    setParticles(value);
    setLeftCount(Math.round(value / 2));
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a0710] text-slate-100 selection:bg-fuchsia-300/25">
      <ThermoField mode="entropy" intensity={1.18} />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#0a0710]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[{ label: "Physics", href: "/natural-science/physics" }, { label: "Thermodynamics", href: "/natural-science/physics/thermodynamics" }, { label: "Entropy & Second Law" }]}
            eyebrow="Thermodynamics · 05 / 06"
            icon={Dices}
            title={<span>Entropy & Second Law</span>}
            subtitle="Entropy connects a macroscopic state to how many microscopic arrangements are compatible with it. The second law emerges from the overwhelming statistical weight of high-multiplicity macrostates."
            accentRgb="232, 121, 249"
            titleClassName="font-mono text-[clamp(1.85rem,4vw,4.15rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fff5ff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-fuchsia-200/[0.10] bg-black/[0.11] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-fuchsia-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">Why is “spread out” usually more likely than “all gathered on one side”?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">A macrostate specifies only coarse information, such as how many particles are on each side. Many different microstates can realize the same macrostate. Entropy grows with that multiplicity.</p></div>
          <div className="rounded-[18px] border border-fuchsia-200/[0.09] bg-fuchsia-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-fuchsia-300/62">Boltzmann relation</div><div className="mt-3 text-[20px] text-white"><M>{"S = k_B \\ln \\Omega"}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">Ω counts the microstates compatible with the macrostate. Larger multiplicity means larger entropy.</p></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-fuchsia-300/70">Multiplicity lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Choose only the macrostate. Count how many microstates hide underneath it.</h2></div><div className="rounded-full border border-white/[0.07] bg-black/[0.18] px-3 py-1.5 font-mono text-[10px] text-slate-500">N = {particles}</div></div>

            <div className="relative mt-4 min-h-[350px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#100b18]/82 p-5">
              <div className="absolute left-[7%] top-[15%] h-[58%] w-[39%] rounded-[22px] border border-blue-200/[0.10] bg-blue-400/[0.02]" />
              <div className="absolute right-[7%] top-[15%] h-[58%] w-[39%] rounded-[22px] border border-red-200/[0.10] bg-red-400/[0.02]" />
              <div className="absolute left-1/2 top-[15%] h-[58%] w-px bg-white/[0.08]" />
              <ParticleDistribution distribution={distribution} />
              <div className="absolute left-[10%] top-[18%] font-mono text-[10px] text-blue-100/55">left: {clampedLeft}</div>
              <div className="absolute right-[10%] top-[18%] font-mono text-[10px] text-red-100/55">right: {particles - clampedLeft}</div>
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2"><Readout label="multiplicity Ω" value={formatNumber(omega)} rgb="232, 121, 249" /><Readout label="macrostate probability" value={`${(probability * 100).toFixed(probability < 0.01 ? 3 : 1)}%`} rgb="250, 204, 21" /><Readout label="S / kB" value={entropyKb.toFixed(2)} rgb="45, 212, 191" /></div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2"><Control label="Particle count" value={particles} min={4} max={20} step={2} unit="" onChange={updateParticles} /><Control label="Particles on left" value={clampedLeft} min={0} max={particles} step={1} unit="" onChange={setLeftCount} /></div>
          </div>

          <div className="space-y-4">
            <Insight icon={BarChart3} title={balanced ? "High-multiplicity macrostate" : "Lower-multiplicity macrostate"} text={balanced ? "Near-even distributions can be realized by many more microscopic arrangements than strongly lopsided distributions." : "Moving particles toward one side reduces the number of compatible microscopic arrangements."} rgb={balanced ? "45, 212, 191" : "250, 204, 21"} />
            <Insight icon={Atom} title="Entropy is not a synonym for mess" text="The statistical definition is about multiplicity and probability. Everyday words such as disorder can be suggestive, but they are too vague to define entropy reliably." rgb="232, 121, 249" />
            <Insight icon={Scale} title="Second law is statistical" text="For macroscopic systems, higher-multiplicity states dominate so overwhelmingly that spontaneous evolution toward equilibrium is effectively certain, even though microscopic fluctuations are not mathematically forbidden." rgb="167, 139, 250" />
          </div>
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-fuchsia-300/65">From counting to the second law</div>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <Step number="01" title="Choose a macrostate" text="Specify coarse variables, not every microscopic detail." rgb="96, 165, 250" />
            <Step number="02" title="Count compatible microstates" text="The macrostate with more realizations has greater multiplicity Ω." rgb="232, 121, 249" />
            <Step number="03" title="Compare statistical weight" text="For many particles, multiplicity differences become astronomically large." rgb="250, 204, 21" />
            <Step number="04" title="Infer direction" text="An isolated macroscopic system overwhelmingly evolves toward higher-entropy equilibrium states." rgb="45, 212, 191" />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Local entropy can decrease" text="The second law constrains the total entropy of an isolated system. A subsystem can become more ordered while its surroundings gain even more entropy." rgb="34, 211, 238" />
          <Principle title="Energy conservation is not enough" text="The first law tells us which energy balances are allowed. The second law distinguishes which directions are thermodynamically favored." rgb="250, 204, 21" />
          <Principle title="Equilibrium is statistically dominant" text="Macroscopic equilibrium corresponds to an enormous region of microscopic state space compared with conspicuously uneven macrostates." rgb="232, 121, 249" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold text-white">Why does gas released into a box almost never gather itself back into one corner?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["energy conservation forbids it", "spread-out macrostates have vastly greater multiplicity", "particles permanently repel every corner"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "spread-out macrostates have vastly greater multiplicity" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "spread-out macrostates have vastly greater multiplicity" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "spread-out macrostates have vastly greater multiplicity" ? "Exactly" : "Think statistically"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">The clustered macrostate is not forbidden by energy conservation; it is simply compatible with an unimaginably smaller fraction of the available microstates.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/thermodynamics/phase-change" className="text-[10px] text-slate-500 hover:text-slate-300">← Phase Change</Link><Link href="/natural-science/physics/thermodynamics/processes" className="inline-flex items-center gap-2 rounded-full border border-violet-200/[0.12] bg-violet-400/[0.035] px-4 py-2 text-[10px] font-semibold text-violet-100/75">Next: Processes <ArrowRight size={13} /></Link></div>
        </section>
      </div>
    </main>
  );
}

function choose(n: number, k: number) { const r = Math.min(k, n - k); let result = 1; for (let i = 1; i <= r; i += 1) result = (result * (n - r + i)) / i; return Math.round(result); }
function formatNumber(value: number) { return value >= 100000 ? value.toExponential(2) : value.toLocaleString(); }
function ParticleDistribution({ distribution }: { distribution: boolean[] }) { return <>{distribution.map((left, index) => { const local = left ? index : index - distribution.filter(Boolean).length; const xBase = left ? 11 : 57; const x = xBase + ((local * 17 + index * 7) % 30); const y = 28 + ((index * 23) % 34); return <span key={index} className="absolute h-2.5 w-2.5 rounded-full" style={{ left: `${x}%`, top: `${y}%`, background: left ? "rgba(96,165,250,0.72)" : "rgba(248,113,113,0.72)", boxShadow: left ? "0 0 12px rgba(96,165,250,0.22)" : "0 0 12px rgba(248,113,113,0.22)" }} />; })}</>; }
function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) { return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-fuchsia-100/60">{value.toFixed(0)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-fuchsia-400" /></div>; }
function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.28] px-3 py-2.5 text-center"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[9px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>; }
function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Atom; title: string; text: string; rgb: string }) { return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.10] p-5"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={13} /> {title}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
function Step({ number, title, text, rgb }: { number: string; title: string; text: string; rgb: string }) { return <div className="rounded-[17px] border border-white/[0.06] bg-black/[0.08] p-4"><div className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.62)` }}>{number}</div><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[10px] leading-5 text-slate-600">{text}</p></div>; }
function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) { return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.10] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
