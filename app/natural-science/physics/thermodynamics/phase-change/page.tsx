"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import ThermoField from "../_components/ThermoField";
import { ArrowRight, Droplets, Layers3, Snowflake, Wind } from "lucide-react";

export default function PhaseChangePage() {
  const [energy, setEnergy] = useState(38);
  const [answer, setAnswer] = useState<string | null>(null);

  const state = getState(energy);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#070a10] text-slate-100 selection:bg-cyan-300/25">
      <ThermoField mode="phase" intensity={1.12} />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#070a10]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[{ label: "Physics", href: "/natural-science/physics" }, { label: "Thermodynamics", href: "/natural-science/physics/thermodynamics" }, { label: "Phase Change" }]}
            eyebrow="Thermodynamics · 04 / 06"
            icon={Layers3}
            title={<span>Phase Change</span>}
            subtitle="Energy can change the microscopic organization of matter without changing temperature. During a phase transition, transferred energy can go into changing phase instead of raising temperature."
            accentRgb="34, 211, 238"
            titleClassName="font-mono text-[clamp(2.05rem,4.4vw,4.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#effdff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-cyan-200/[0.10] bg-black/[0.11] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">How can energy enter a substance while its temperature stays flat?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Within a single phase, added energy often raises temperature. At a phase boundary, energy can instead change intermolecular arrangement and potential energy while the temperature remains nearly constant.</p></div>
          <div className="rounded-[18px] border border-cyan-200/[0.09] bg-cyan-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-300/62">Two thermal jobs</div><div className="mt-3 space-y-2 text-[16px] text-white"><M>{"Q = mc\\Delta T"}</M><br /><M>{"Q = mL"}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">The first changes temperature within a phase. The second changes phase at a transition.</p></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.22fr)_minmax(320px,0.78fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/70">Conceptual heating curve</div>
            <div className="relative mt-4 min-h-[360px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#09101a]/82 p-5">
              <svg viewBox="0 0 800 300" className="absolute inset-x-5 top-6 h-[250px] w-[calc(100%-2.5rem)]" preserveAspectRatio="none" role="img" aria-label="Conceptual heating curve">
                <line x1="60" y1="250" x2="760" y2="250" stroke="rgba(148,163,184,0.16)" />
                <line x1="60" y1="250" x2="60" y2="30" stroke="rgba(148,163,184,0.16)" />
                <polyline points="60,235 195,185 335,185 485,95 620,95 760,45" fill="none" stroke="rgba(34,211,238,0.76)" strokeWidth="4" vectorEffect="non-scaling-stroke" />
                <circle cx={60 + energy * 7} cy={curveY(energy)} r="7" fill="rgb(34,211,238)" />
              </svg>
              <div className="absolute left-[7%] top-[7%] text-[9px] uppercase tracking-[0.12em] text-slate-600">temperature</div>
              <div className="absolute bottom-[22%] right-[7%] text-[9px] uppercase tracking-[0.12em] text-slate-600">energy added →</div>
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2"><Readout label="region" value={state.label} rgb={state.rgb} /><Readout label="temperature" value={state.temperature} rgb="34, 211, 238" /><Readout label="energy job" value={state.job} rgb="167, 139, 250" /></div>
            </div>
            <div className="mt-5"><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>energy added</span><span className="font-mono text-cyan-100/60">{energy.toFixed(0)} conceptual units</span></div><input aria-label="Energy added" type="range" min="0" max="100" step="1" value={energy} onChange={(event) => setEnergy(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-cyan-400" /></div>
          </div>

          <div className="space-y-4">
            <Phase icon={Snowflake} title="Solid" text="Particles vibrate around relatively fixed arrangements. Heating increases thermal motion until the melting transition is reached." rgb="96, 165, 250" active={state.phase === "solid"} />
            <Phase icon={Droplets} title="Liquid" text="Particles remain close but can rearrange. Heating raises temperature until the vaporization transition is reached." rgb="34, 211, 238" active={state.phase === "liquid"} />
            <Phase icon={Wind} title="Gas" text="Particles are widely separated and move freely through the available volume." rgb="248, 113, 113" active={state.phase === "gas"} />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Plateau ≠ no energy transfer" text="During melting or boiling, energy is still entering. It is being used to reorganize the microscopic state rather than raise temperature." rgb="34, 211, 238" />
          <Principle title="Latent heat is phase-specific" text="Different transitions and substances require different energy per unit mass, represented by the latent heat L." rgb="167, 139, 250" />
          <Principle title="Pressure matters" text="Transition temperatures depend on pressure. A boiling point is not a universal fixed temperature independent of environment." rgb="250, 204, 21" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold text-white">A pure substance is boiling at constant pressure while heat continues to enter. What is the added energy mainly doing?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["raising temperature", "changing phase", "destroying energy"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "changing phase" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "changing phase" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "changing phase" ? "Exactly" : "Read the plateau"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">At the phase boundary, latent heat changes microscopic organization while the temperature stays approximately constant.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/thermodynamics/first-law" className="text-[10px] text-slate-500 hover:text-slate-300">← First Law</Link><Link href="/natural-science/physics/thermodynamics/entropy" className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/[0.12] bg-fuchsia-400/[0.035] px-4 py-2 text-[10px] font-semibold text-fuchsia-100/75">Next: Entropy <ArrowRight size={13} /></Link></div>
        </section>
      </div>
    </main>
  );
}

function curveY(energy: number) { if (energy <= 20) return 235 - (energy / 20) * 50; if (energy <= 40) return 185; if (energy <= 65) return 185 - ((energy - 40) / 25) * 90; if (energy <= 80) return 95; return 95 - ((energy - 80) / 20) * 50; }
function getState(energy: number) { if (energy < 20) return { label: "warming solid", temperature: "rising", job: "ΔT", phase: "solid", rgb: "96, 165, 250" }; if (energy <= 40) return { label: "melting", temperature: "constant", job: "phase", phase: "solid", rgb: "34, 211, 238" }; if (energy < 65) return { label: "warming liquid", temperature: "rising", job: "ΔT", phase: "liquid", rgb: "34, 211, 238" }; if (energy <= 80) return { label: "vaporizing", temperature: "constant", job: "phase", phase: "liquid", rgb: "244, 114, 182" }; return { label: "warming gas", temperature: "rising", job: "ΔT", phase: "gas", rgb: "248, 113, 113" }; }
function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.28] px-3 py-2.5 text-center"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[9px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>; }
function Phase({ icon: Icon, title, text, rgb, active }: { icon: typeof Snowflake; title: string; text: string; rgb: string; active: boolean }) { return <div className="rounded-[22px] border p-5 transition-colors" style={{ borderColor: active ? `rgba(${rgb},0.22)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${rgb},0.035)` : "rgba(0,0,0,0.10)" }}><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={13} /> {title}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) { return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.10] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
