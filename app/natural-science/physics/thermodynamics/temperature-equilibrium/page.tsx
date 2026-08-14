"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import ThermoField from "../_components/ThermoField";
import { ArrowRight, Atom, Link2, Thermometer } from "lucide-react";

const PARTICLES = Array.from({ length: 28 }, (_, index) => ({
  x: 8 + ((index * 31) % 84),
  y: 12 + ((index * 47) % 72),
  size: 2 + (index % 3),
}));

export default function TemperatureEquilibriumPage() {
  const [leftInitial, setLeftInitial] = useState(280);
  const [rightInitial, setRightInitial] = useState(420);
  const [progress, setProgress] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);

  const equilibrium = (leftInitial + rightInitial) / 2;
  const left = leftInitial + (equilibrium - leftInitial) * progress;
  const right = rightInitial + (equilibrium - rightInitial) * progress;
  const difference = Math.abs(right - left);
  const direction = right > left ? "right → left" : left > right ? "left → right" : "no net transfer";
  const almostEqual = difference < 1;

  const speeds = useMemo(() => ({ left: Math.sqrt(left / 300), right: Math.sqrt(right / 300) }), [left, right]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#08090e] text-slate-100 selection:bg-yellow-300/25">
      <ThermoField mode="equilibrium" intensity={1.1} />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#08090e]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Thermodynamics", href: "/natural-science/physics/thermodynamics" },
              { label: "Temperature & Equilibrium" },
            ]}
            eyebrow="Thermodynamics · 01 / 06"
            icon={Thermometer}
            title={<span>Temperature & Equilibrium</span>}
            subtitle="Temperature describes thermal state. When systems can exchange energy, a temperature difference drives net heat transfer until thermal equilibrium is reached."
            accentRgb="250, 204, 21"
            titleClassName="font-mono text-[clamp(1.8rem,3.9vw,4.1rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fffdf1]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-yellow-200/[0.10] bg-black/[0.11] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-yellow-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">What disappears at thermal equilibrium, and what does not?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">At equilibrium, the temperature difference disappears, so there is no net heat transfer between the systems. Microscopic particles do not stop moving. Equilibrium is a stable macroscopic balance, not microscopic stillness.</p>
          </div>
          <div className="rounded-[18px] border border-yellow-200/[0.09] bg-yellow-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-yellow-300/62">Ideal-gas microscopic bridge</div>
            <div className="mt-3 text-[18px] text-white"><M>{"\\langle K_{trans}\\rangle = \\frac{3}{2}k_B T"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">For a monatomic ideal gas, absolute temperature is proportional to average translational kinetic energy per particle. Temperature is not the total energy of the whole sample.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-yellow-300/70">Equilibrium lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Bring two equal samples into thermal contact.</h2></div>
              <div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">equal heat capacities</div>
            </div>

            <div className="relative mt-4 min-h-[360px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0b0d14]/82 p-5">
              <div className="absolute inset-y-[14%] left-1/2 w-px bg-white/[0.08]" />
              <ParticleChamber side="left" temperature={left} speed={speeds.left} />
              <ParticleChamber side="right" temperature={right} speed={speeds.right} />
              <div className="absolute left-[43%] top-[47%] h-px w-[14%]" style={{ background: almostEqual ? "rgba(148,163,184,0.18)" : right > left ? "linear-gradient(90deg, rgba(248,113,113,0.64), rgba(250,204,21,0.48), rgba(56,189,248,0.32))" : "linear-gradient(90deg, rgba(56,189,248,0.32), rgba(250,204,21,0.48), rgba(248,113,113,0.64))" }} />
              <div className="absolute left-1/2 top-[52%] -translate-x-1/2 rounded-full border border-white/[0.07] bg-black/35 px-3 py-1.5 font-mono text-[9px] text-slate-500">{direction}</div>

              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                <Readout label="left" value={`${left.toFixed(1)} K`} rgb="56, 189, 248" />
                <Readout label="ΔT" value={`${difference.toFixed(1)} K`} rgb={almostEqual ? "45, 212, 191" : "250, 204, 21"} />
                <Readout label="right" value={`${right.toFixed(1)} K`} rgb="248, 113, 113" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <Control label="Left initial T" value={leftInitial} min={180} max={500} step={10} unit="K" onChange={(value) => { setLeftInitial(value); setProgress(0); }} />
              <Control label="Contact progress" value={progress} min={0} max={1} step={0.01} unit="" onChange={setProgress} />
              <Control label="Right initial T" value={rightInitial} min={180} max={500} step={10} unit="K" onChange={(value) => { setRightInitial(value); setProgress(0); }} />
            </div>
          </div>

          <div className="space-y-4">
            <Insight icon={Thermometer} title="Temperature is intensive" text="Doubling the amount of the same material at the same thermal state does not double its temperature." rgb="250, 204, 21" />
            <Insight icon={Link2} title="Equilibrium is relational" text="Two systems are in thermal equilibrium when contact between them produces no net heat transfer." rgb="45, 212, 191" />
            <Insight icon={Atom} title="Microscopic motion remains" text="Equal temperatures mean matching thermal state, not identical particle-by-particle velocities and certainly not zero motion." rgb="34, 211, 238" />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.10] p-5"><div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-cyan-300/62">Zeroth law</div><p className="mt-2 text-[12px] leading-6 text-slate-400">If A is in thermal equilibrium with C, and B is in thermal equilibrium with C, then A and B are in thermal equilibrium with each other. This is what makes temperature a consistent measurable property.</p></div>
          <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.10] p-5"><div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-orange-300/62">Do not confuse</div><p className="mt-2 text-[12px] leading-6 text-slate-400">A bathtub and a cup of water can have the same temperature while storing very different amounts of internal energy because the amount and kind of matter differ.</p></div>
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">Two objects have reached the same temperature. Which statement must be true?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["their particles stopped moving", "they store equal total energy", "there is no net heat transfer between them"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "there is no net heat transfer between them" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "there is no net heat transfer between them" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "there is no net heat transfer between them" ? "Exactly" : "Temperature does not tell the whole energy story"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">Thermal equilibrium removes the temperature difference that drives net heat transfer. Microscopic motion and total stored energy can still differ.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/thermodynamics" className="text-[10px] text-slate-500 hover:text-slate-300">← Thermodynamics map</Link><Link href="/natural-science/physics/thermodynamics/heat-transfer" className="inline-flex items-center gap-2 rounded-full border border-orange-200/[0.12] bg-orange-400/[0.035] px-4 py-2 text-[10px] font-semibold text-orange-100/75">Next: Heat Transfer <ArrowRight size={13} /></Link></div>
        </section>
      </div>
    </main>
  );
}

function ParticleChamber({ side, temperature, speed }: { side: "left" | "right"; temperature: number; speed: number }) {
  const rgb = side === "left" ? "56, 189, 248" : "248, 113, 113";
  return <div className={`absolute top-[15%] h-[58%] w-[38%] overflow-hidden rounded-[22px] border ${side === "left" ? "left-[8%]" : "right-[8%]"}`} style={{ borderColor: `rgba(${rgb},0.14)`, background: `rgba(${rgb},0.028)` }}>{PARTICLES.map((particle, index) => <span key={index} className="absolute rounded-full animate-pulse" style={{ left: `${particle.x}%`, top: `${particle.y}%`, width: particle.size * speed, height: particle.size * speed, background: `rgba(${rgb},${0.22 + Math.min(0.28, temperature / 1200)})`, boxShadow: `0 0 ${6 + speed * 5}px rgba(${rgb},0.16)`, animationDuration: `${Math.max(0.8, 3.2 / speed + (index % 4) * 0.3)}s` }} />)}<div className="absolute bottom-3 left-3 font-mono text-[9px]" style={{ color: `rgba(${rgb},0.65)` }}>{temperature.toFixed(1)} K</div></div>;
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-yellow-100/60">{step < 1 ? value.toFixed(2) : value.toFixed(0)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-yellow-400" /></div>;
}
function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.24] px-3 py-2.5 text-center"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[11px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>; }
function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Thermometer; title: string; text: string; rgb: string }) { return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.10] p-5 backdrop-blur-lg"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={13} /> {title}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
