"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import RelativityField from "../../_components/RelativityField";
import { Activity, ArrowRight, Gauge, Orbit, Zap } from "lucide-react";

const C = 299_792_458;

export default function RelativisticEnergyMomentumPage() {
  const [speed, setSpeed] = useState(0.8);
  const [mass, setMass] = useState(1);
  const [answer, setAnswer] = useState<string | null>(null);

  const gamma = 1 / Math.sqrt(1 - speed * speed);
  const restEnergyPJ = mass * C * C / 1e15;
  const totalEnergyPJ = gamma * restEnergyPJ;
  const kineticEnergyPJ = (gamma - 1) * restEnergyPJ;
  const momentumScaled = gamma * mass * speed * C / 1e8;
  const pcPJ = gamma * mass * speed * C * C / 1e15;
  const invariantPJ = Math.sqrt(Math.max(0, totalEnergyPJ * totalEnergyPJ - pcPJ * pcPJ));

  const curve = useMemo(() => {
    const points: string[] = [];
    for (let i = 0; i <= 36; i += 1) {
      const beta = i / 37;
      const g = 1 / Math.sqrt(1 - beta * beta);
      const p = g * beta;
      const x = 350 + Math.min(4.2, p) * 67;
      const y = 265 - Math.min(4.2, g) * 52;
      points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(" ");
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030308] text-slate-100 selection:bg-amber-300/25">
      <RelativityField mode="special" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#030308]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Relativity", href: "/natural-science/physics/relativity" },
              { label: "Special Relativity", href: "/natural-science/physics/relativity/special" },
              { label: "Relativistic Energy & Momentum" },
            ]}
            eyebrow="Special Relativity · 06 / 06"
            icon={Activity}
            title={<span>Relativistic Energy & Momentum</span>}
            subtitle="Energy and momentum form another invariant spacetime structure. Rest energy, kinetic energy, and momentum fit one relation that reduces to familiar Newtonian formulas only at low speed."
            accentRgb="245, 158, 11"
            titleClassName="font-mono text-[clamp(1.6rem,3.6vw,3.8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fffaf0]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-amber-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">What replaces Newtonian momentum and kinetic energy near light speed?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">The Lorentz factor enters both momentum and total energy. Their values depend on frame, but the combination <M>{"E^2-(pc)^2"}</M> does not: it returns the object's rest energy squared in every inertial frame.</p>
          </div>
          <div className="rounded-[18px] border border-amber-200/[0.09] bg-amber-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-300/62">Energy-momentum invariant</div>
            <div className="mt-3 text-[18px] text-white"><M>{"E^2=(pc)^2+(mc^2)^2"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">For a massive object at rest, <M>{"p=0"}</M> and the total energy is still <M>{"E_0=mc^2"}</M>.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/70">Mass-shell lab</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Move along one energy-momentum hyperbola.</h2>
              </div>
              <div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">γ = {gamma.toFixed(3)}</div>
            </div>

            <div className="relative mt-4 min-h-[430px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#09080e]/62 p-5">
              <MassShell curve={curve} gamma={gamma} speed={speed} />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Readout label="rest energy" value={`${restEnergyPJ.toFixed(2)} PJ`} rgb="34, 211, 238" />
                <Readout label="total energy" value={`${totalEnergyPJ.toFixed(2)} PJ`} rgb="245, 158, 11" />
                <Readout label="kinetic energy" value={`${kineticEnergyPJ.toFixed(2)} PJ`} rgb="232, 121, 249" />
                <Readout label="momentum" value={`${momentumScaled.toFixed(2)} ×10⁸ kg·m/s`} rgb="74, 222, 128" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Control label="Speed v" value={speed} min={0} max={0.97} step={0.01} unit="c" onChange={setSpeed} />
              <Control label="Rest mass m" value={mass} min={0.1} max={5} step={0.1} unit="kg" onChange={setMass} />
            </div>
          </div>

          <div className="space-y-4">
            <Insight icon={Gauge} title="Momentum becomes p = γmv" text="At low speed γ ≈ 1, so Newtonian momentum reappears. Near c, the relativistic correction grows rapidly." rgb="74, 222, 128" />
            <Insight icon={Zap} title="Kinetic energy becomes (γ − 1)mc²" text="Its low-speed expansion approaches ½mv², but the exact relativistic expression remains valid all the way toward c." rgb="232, 121, 249" />
            <Insight icon={Orbit} title="Rest mass is the invariant" text={`The current energy-momentum values reconstruct ${invariantPJ.toFixed(2)} PJ of rest energy, matching mc² despite the boost.`} rgb="34, 211, 238" />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <FormulaCard label="momentum" formula="p=\\gamma mv" note="frame-dependent vector quantity" rgb="74, 222, 128" />
          <FormulaCard label="total energy" formula="E=\\gamma mc^2" note="includes rest energy and kinetic energy" rgb="245, 158, 11" />
          <FormulaCard label="kinetic energy" formula="K=(\\gamma-1)mc^2" note="approaches ½mv² when v ≪ c" rgb="232, 121, 249" />
        </section>

        <section className="mt-4 rounded-[26px] border border-cyan-200/[0.10] bg-cyan-400/[0.018] p-5 backdrop-blur-md sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.6fr)] lg:items-center">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/65">Mechanics bridge</div>
              <h2 className="mt-1 text-[20px] font-semibold text-white">Classical energy and momentum are the low-speed limit of this structure.</h2>
              <p className="mt-2 text-[12px] leading-6 text-slate-400">The conservation ideas from Mechanics survive; the formulas change so that conservation remains compatible with Lorentz symmetry.</p>
            </div>
            <Link href="/natural-science/physics/mechanics/energy" className="inline-flex items-center justify-center gap-2 rounded-[16px] border border-cyan-200/[0.12] bg-cyan-400/[0.025] px-4 py-3 text-[10px] font-semibold text-cyan-100/70">Revisit Energy & Momentum <ArrowRight size={12} /></Link>
          </div>
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">A massive particle is at rest in your frame. Its momentum is zero. What is its total energy?</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {["0", "mc²", "½mc²"].map((option) => (
              <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>
            ))}
          </div>
          {answer ? (
            <div className={`mt-4 rounded-[16px] border p-4 ${answer === "mc²" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
              <strong className={`text-[11px] ${answer === "mc²" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "mc²" ? "Exactly" : "Momentum can vanish without energy vanishing"}</strong>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">At rest, <M>{"\\gamma=1"}</M> and <M>{"p=0"}</M>, leaving <M>{"E=mc^2"}</M>.</p>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <Link href="/natural-science/physics/relativity/special/length-contraction" className="text-[10px] text-slate-500 hover:text-slate-300">← Length Contraction</Link>
            <Link href="/natural-science/physics/relativity/special" className="inline-flex items-center gap-2 rounded-full border border-amber-200/[0.12] bg-amber-400/[0.035] px-4 py-2 text-[10px] font-semibold text-amber-100/75">Special Relativity map <ArrowRight size={12} /></Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function MassShell({ curve, gamma, speed }: { curve: string; gamma: number; speed: number }) {
  const pNorm = gamma * speed;
  const x = 350 + Math.min(4.2, pNorm) * 67;
  const y = 265 - Math.min(4.2, gamma) * 52;

  return (
    <svg viewBox="0 0 700 320" className="absolute inset-x-5 top-3 h-[315px] w-[calc(100%-2.5rem)]" preserveAspectRatio="none" role="img" aria-label="Relativistic energy momentum mass shell">
      <line x1="70" y1="265" x2="650" y2="265" stroke="rgba(148,163,184,0.16)" />
      <line x1="350" y1="285" x2="350" y2="35" stroke="rgba(148,163,184,0.16)" />
      <path d={curve} fill="none" stroke="rgba(245,158,11,0.62)" strokeWidth="2.3" vectorEffect="non-scaling-stroke" />
      <path d={curve} fill="none" stroke="rgba(34,211,238,0.11)" strokeWidth="12" vectorEffect="non-scaling-stroke" />
      <circle cx={x} cy={y} r="6" fill="rgb(245,158,11)" />
      <circle cx="350" cy="213" r="4" fill="rgb(34,211,238)" />
      <text x="366" y="215" fill="rgba(34,211,238,0.58)" fontSize="10">rest energy</text>
      <text x="615" y="282" fill="rgba(148,163,184,0.45)" fontSize="10">pc</text>
      <text x="360" y="48" fill="rgba(148,163,184,0.45)" fontSize="10">E</text>
    </svg>
  );
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-amber-100/60">{value.toFixed(2)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-amber-400" /></div>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 truncate font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>;
}

function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Gauge; title: string; text: string; rgb: string }) {
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={12} /> energy-momentum idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function FormulaCard({ label, formula, note, rgb }: { label: string; formula: string; note: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4"><div className="text-[9px] uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.64)` }}>{label}</div><div className="mt-3 text-[16px] text-white"><M>{formula}</M></div><p className="mt-2 text-[10px] leading-5 text-slate-600">{note}</p></div>;
}
