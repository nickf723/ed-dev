"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import EMField from "../_components/EMField";
import { ArrowRight, CircleDot, Gauge, LocateFixed, Zap } from "lucide-react";

const K = 8.99e9;

export default function ChargeFieldsPage() {
  const [sourceCharge, setSourceCharge] = useState(2);
  const [testCharge, setTestCharge] = useState(1);
  const [distance, setDistance] = useState(2);
  const [answer, setAnswer] = useState<string | null>(null);

  const qSource = sourceCharge * 1e-6;
  const qTest = testCharge * 1e-6;
  const signedField = K * qSource / (distance * distance);
  const fieldMagnitude = Math.abs(signedField);
  const force = qTest * signedField;
  const sourcePositive = sourceCharge >= 0;
  const forceRight = force >= 0;
  const fieldRight = signedField >= 0;
  const testLeft = 53 + ((distance - 0.5) / 4.5) * 31;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03060b] text-slate-100 selection:bg-yellow-300/25">
      <EMField mode="electric" intensity={1.28} />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#03060b]/68 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Physics", href: "/natural-science/physics" },
              { label: "Electromagnetism", href: "/natural-science/physics/electromagnetism" },
              { label: "Charge & Electric Fields" },
            ]}
            eyebrow="Electromagnetism · 01 / 06"
            icon={Zap}
            title={<span>Charge & Electric Fields</span>}
            subtitle="A source charge changes the space around it. The electric field tells what force a positive test charge would experience at each location."
            accentRgb="250, 204, 21"
            titleClassName="font-mono text-[clamp(1.9rem,4vw,4.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fffdeb]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-yellow-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-yellow-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">What exists between two charged objects before the second object even arrives?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">The electric field belongs to the source configuration and space around it. A test charge samples that field. Changing the test charge changes the force, but it does not redefine the pre-existing field in this model.</p>
          </div>
          <div className="rounded-[18px] border border-yellow-200/[0.09] bg-yellow-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-yellow-300/62">Two linked relationships</div>
            <div className="mt-3 space-y-2 text-[17px] text-white"><M>{"E = k\\frac{|Q|}{r^2}"}</M><br /><M>{"\\mathbf F = q\\mathbf E"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">The field comes from the source charge <M>Q</M>. The force also depends on the test charge <M>q</M>.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.075] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-yellow-300/70">Field sampler</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Change the source, distance, and test charge independently.</h2></div>
              <div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">point is to the right of Q</div>
            </div>

            <div className="relative mt-4 min-h-[350px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#06101a]/62 p-5">
              <div className="absolute left-[10%] right-[8%] top-1/2 h-px bg-white/[0.08]" />
              {[20, 35, 50, 65, 80].map((mark) => <div key={mark} className="absolute top-[calc(50%-4px)] h-2 w-px bg-white/[0.10]" style={{ left: `${mark}%` }} />)}

              <div className="absolute left-[32%] top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border text-[22px] font-semibold" style={{ color: sourcePositive ? "rgb(254,240,138)" : "rgb(125,211,252)", borderColor: sourcePositive ? "rgba(250,204,21,0.42)" : "rgba(56,189,248,0.42)", background: sourcePositive ? "rgba(250,204,21,0.11)" : "rgba(56,189,248,0.11)", boxShadow: sourcePositive ? "0 0 42px rgba(250,204,21,0.18)" : "0 0 42px rgba(56,189,248,0.18)" }}>{sourcePositive ? "+" : "−"}</div>
                <div className="mt-2 text-center font-mono text-[9px] text-slate-600">source Q</div>
              </div>

              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-150" style={{ left: `${testLeft}%` }}>
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-fuchsia-200/[0.30] bg-fuchsia-400/[0.09] text-[15px] text-fuchsia-100">{testCharge >= 0 ? "+" : "−"}</div>
                  <VectorArrow right={fieldRight} top={-30} label="E" rgb="250, 204, 21" magnitude={fieldMagnitude} />
                  <VectorArrow right={forceRight} top={50} label="F" rgb="232, 121, 249" magnitude={Math.abs(force) * 1e5} />
                </div>
                <div className="mt-2 text-center font-mono text-[9px] text-slate-600">test q</div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                <Readout label="distance" value={`${distance.toFixed(2)} m`} rgb="96, 165, 250" />
                <Readout label="field magnitude" value={formatScientific(fieldMagnitude, "N/C")} rgb="250, 204, 21" />
                <Readout label="force on q" value={formatScientific(force, "N")} rgb="232, 121, 249" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <Control label="Source charge Q" value={sourceCharge} min={-5} max={5} step={0.5} unit="μC" onChange={setSourceCharge} />
              <Control label="Distance r" value={distance} min={0.5} max={5} step={0.1} unit="m" onChange={setDistance} />
              <Control label="Test charge q" value={testCharge} min={-3} max={3} step={0.5} unit="μC" onChange={setTestCharge} />
            </div>
          </div>

          <div className="space-y-4">
            <Insight icon={LocateFixed} title="Direction is defined with a positive test charge" text="Electric field points in the direction a positive test charge would accelerate: away from positive sources and toward negative sources." rgb="250, 204, 21" />
            <Insight icon={CircleDot} title="A negative test charge reverses force, not field" text="The source field stays the same. Since F = qE, a negative q makes the force point opposite the electric field." rgb="232, 121, 249" />
            <Insight icon={Gauge} title="Distance matters quadratically" text="For a point charge, doubling the distance reduces the field magnitude to one quarter. The inverse-square structure spreads influence over growing spherical area." rgb="34, 211, 238" />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="Field is local" text="At each point in space, E tells the force-per-positive-charge that a small test charge would experience there." rgb="250, 204, 21" />
          <Principle title="Superposition comes next" text="With several source charges, add their electric-field vectors. Each source contributes independently to the total field." rgb="34, 211, 238" />
          <Principle title="Force depends on the traveler" text="The same electric field can push positive and negative charges in opposite directions and with different magnitudes." rgb="232, 121, 249" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">You double the distance from a point charge but change nothing else. What happens to the electric-field magnitude?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["halves", "quarters", "stays the same"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "quarters" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "quarters" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "quarters" ? "Exactly" : "Check the exponent"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500"><M>{"E \\propto 1/r^2"}</M>, so doubling <M>r</M> multiplies the field by <M>{"1/2^2 = 1/4"}</M>.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/electromagnetism" className="text-[10px] text-slate-500 hover:text-slate-300">← Electromagnetism map</Link><div className="inline-flex items-center gap-2 rounded-full border border-violet-200/[0.08] bg-violet-400/[0.02] px-4 py-2 text-[10px] text-slate-600">Next: Electric Potential · planned <ArrowRight size={12} /></div></div>
        </section>
      </div>
    </main>
  );
}

function VectorArrow({ right, top, label, rgb, magnitude }: { right: boolean; top: number; label: string; rgb: string; magnitude: number }) {
  const width = 34 + Math.min(70, Math.log10(Math.max(1, magnitude) + 1) * 18);
  return <div className={`absolute ${right ? "left-8" : "right-8"}`} style={{ top }}><div className="relative h-px" style={{ width, background: `rgba(${rgb},0.80)`, boxShadow: `0 0 12px rgba(${rgb},0.24)` }}><span className={`absolute -top-[3px] h-1.5 w-1.5 rotate-45 border ${right ? "right-0 border-r border-t" : "left-0 border-b border-l"}`} style={{ borderColor: `rgb(${rgb})` }} /><span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[9px]" style={{ color: `rgba(${rgb},0.72)` }}>{label}</span></div></div>;
}

function formatScientific(value: number, unit: string) {
  if (Math.abs(value) < 1e-12) return `0 ${unit}`;
  return `${value.toExponential(2)} ${unit}`;
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-cyan-100/60">{value.toFixed(1)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-cyan-400" /></div>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 truncate font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>;
}

function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Gauge; title: string; text: string; rgb: string }) {
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={12} /> field idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function Principle({ title, text, rgb }: { title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4"><div className="h-1 w-10 rounded-full" style={{ background: `rgba(${rgb},0.72)` }} /><strong className="mt-3 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
