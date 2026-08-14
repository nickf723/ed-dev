"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import EMField from "../_components/EMField";
import { ArrowRight, Gauge, Mountain, Route, Sparkles } from "lucide-react";

const K = 8.99e9;

export default function ElectricPotentialPage() {
  const [sourceCharge, setSourceCharge] = useState(2);
  const [position, setPosition] = useState(2.2);
  const [testCharge, setTestCharge] = useState(1);
  const [answer, setAnswer] = useState<string | null>(null);

  const qSource = sourceCharge * 1e-6;
  const qTest = testCharge * 1e-6;
  const potential = K * qSource / position;
  const potentialEnergy = qTest * potential;
  const field = K * qSource / (position * position);
  const positiveSource = sourceCharge >= 0;

  const samples = useMemo(
    () => Array.from({ length: 70 }, (_, index) => {
      const r = 0.55 + (index / 69) * 4.45;
      return { r, v: K * qSource / r };
    }),
    [qSource],
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050510] text-slate-100 selection:bg-violet-300/25">
      <EMField mode="potential" intensity={1.28} />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#050510]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Electromagnetism", href: "/natural-science/physics/electromagnetism" },
              { label: "Electric Potential" },
            ]}
            eyebrow="Electromagnetism · 02 / 06"
            icon={Gauge}
            title={<span>Electric Potential</span>}
            subtitle="Electric potential turns the electric interaction into an energy landscape. Voltage compares two points on that landscape; the electric field points toward the steepest decrease in potential."
            accentRgb="167, 139, 250"
            titleClassName="font-mono text-[clamp(2rem,4.3vw,4.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#faf7ff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-violet-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">Can we describe an electric interaction without drawing a force arrow everywhere?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Yes. Potential assigns a scalar value to each point. A charged particle&apos;s potential energy depends on both that landscape and the particle&apos;s charge.</p>
          </div>
          <div className="rounded-[18px] border border-violet-200/[0.09] bg-violet-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-violet-300/62">Point-charge potential</div>
            <div className="mt-3 space-y-2 text-[18px] text-white"><M>{"V = k\\frac{Q}{r}"}</M><br /><M>{"U = qV"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Potential depends on the source. Potential energy also depends on the test charge.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/70">Potential landscape</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Move through the landscape and watch potential, field, and energy stay connected.</h2></div>
              <div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">reference: V → 0 far away</div>
            </div>

            <div className="relative mt-4 min-h-[360px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#090b18]/64 p-5">
              <PotentialGraph samples={samples} position={position} positive={positiveSource} />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                <Readout label="potential V" value={formatScientific(potential, "V")} rgb="167, 139, 250" />
                <Readout label="field E" value={formatScientific(field, "N/C")} rgb="250, 204, 21" />
                <Readout label="potential energy U" value={formatScientific(potentialEnergy, "J")} rgb="232, 121, 249" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <Control label="Source charge Q" value={sourceCharge} min={-5} max={5} step={0.5} unit="μC" onChange={setSourceCharge} />
              <Control label="Position r" value={position} min={0.55} max={5} step={0.05} unit="m" onChange={setPosition} />
              <Control label="Test charge q" value={testCharge} min={-3} max={3} step={0.5} unit="μC" onChange={setTestCharge} />
            </div>
          </div>

          <div className="space-y-4">
            <Insight icon={Mountain} title="Potential is scalar" text="At a point, V is one number. You do not need a direction until you take the spatial slope and recover the electric field." rgb="167, 139, 250" />
            <Insight icon={Route} title="Field points downhill in potential" text="In one dimension, E = -dV/dx. Stronger spatial change in potential means a stronger electric field." rgb="250, 204, 21" />
            <Insight icon={Sparkles} title="Voltage is a difference" text="A voltmeter compares two points. The physically useful quantity in circuits is usually ΔV, not an absolute potential value." rgb="34, 211, 238" />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Positive charges roll downhill" text="A positive test charge lowers its electric potential energy by moving toward lower electric potential." rgb="250, 204, 21" />
          <Principle title="Negative charges invert the energy landscape" text="Because U = qV, a negative charge has lower potential energy where V is larger." rgb="232, 121, 249" />
          <Principle title="Equipotentials cross field lines at right angles" text="Moving along an equipotential changes no electric potential, so the electric field has no component along that path." rgb="34, 211, 238" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">A positive charge moves to a point of lower electric potential. What happens to its electric potential energy?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["increases", "decreases", "must stay constant"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "decreases" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "decreases" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "decreases" ? "Exactly" : "Use U = qV"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">For positive <M>q</M>, lowering <M>V</M> lowers <M>U=qV</M>. For negative <M>q</M>, the direction reverses.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/electromagnetism/charge-fields" className="text-[10px] text-slate-500 hover:text-slate-300">← Charge & Electric Fields</Link><div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/[0.08] bg-cyan-400/[0.02] px-4 py-2 text-[10px] text-slate-600">Next: Circuits · planned <ArrowRight size={12} /></div></div>
        </section>
      </div>
    </main>
  );
}

function PotentialGraph({ samples, position, positive }: { samples: { r: number; v: number }[]; position: number; positive: boolean }) {
  const width = 760;
  const height = 245;
  const padX = 48;
  const padY = 24;
  const values = samples.map((item) => item.v);
  const maxAbs = Math.max(...values.map((value) => Math.abs(value)), 1);
  const x = (r: number) => padX + ((r - 0.55) / 4.45) * (width - padX * 2);
  const y = (v: number) => height / 2 - (v / maxAbs) * (height / 2 - padY);
  const path = samples.map((item, index) => `${index === 0 ? "M" : "L"} ${x(item.r).toFixed(1)},${y(item.v).toFixed(1)}`).join(" ");
  const active = samples.reduce((closest, item) => Math.abs(item.r - position) < Math.abs(closest.r - position) ? item : closest, samples[0]);

  return <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-x-5 top-5 h-[245px] w-[calc(100%-2.5rem)]" preserveAspectRatio="none" role="img" aria-label="Electric potential versus distance"><line x1={padX} x2={width - padX} y1={height / 2} y2={height / 2} stroke="rgba(148,163,184,0.14)" /><line x1={padX} x2={padX} y1={padY} y2={height - padY} stroke="rgba(148,163,184,0.14)" /><path d={path} fill="none" stroke={positive ? "rgb(167,139,250)" : "rgb(56,189,248)"} strokeWidth="3" vectorEffect="non-scaling-stroke" /><line x1={x(active.r)} x2={x(active.r)} y1={padY} y2={height - padY} stroke="rgba(255,255,255,0.13)" strokeDasharray="5 6" /><circle cx={x(active.r)} cy={y(active.v)} r="6" fill={positive ? "rgb(167,139,250)" : "rgb(56,189,248)"} /><text x={padX + 4} y={18} fill="rgba(148,163,184,0.55)" fontSize="10">V</text><text x={width - 34} y={height / 2 - 8} fill="rgba(148,163,184,0.55)" fontSize="10">r</text></svg>;
}

function formatScientific(value: number, unit: string) {
  if (Math.abs(value) < 1e-12) return `0 ${unit}`;
  return `${value.toExponential(2)} ${unit}`;
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-violet-100/60">{value.toFixed(1)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-violet-400" /></div>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 truncate font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>;
}

function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Gauge; title: string; text: string; rgb: string }) {
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={12} /> landscape idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
