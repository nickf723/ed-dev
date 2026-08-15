"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import RelativityField from "../../_components/RelativityField";
import { ArrowRight, Gauge, MoveHorizontal, Orbit, Ruler } from "lucide-react";

export default function LengthContractionPage() {
  const [speed, setSpeed] = useState(0.6);
  const [properLength, setProperLength] = useState(10);
  const [answer, setAnswer] = useState<string | null>(null);

  const gamma = 1 / Math.sqrt(1 - speed * speed);
  const measuredLength = properLength / gamma;
  const contraction = properLength - measuredLength;
  const widthPercent = 82 / gamma;

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
              { label: "Length Contraction" },
            ]}
            eyebrow="Special Relativity · 05 / 06"
            icon={Ruler}
            title={<span>Length Contraction</span>}
            subtitle="The rest-frame length of an object is its proper length. A frame in which the object moves measures a shorter length along the direction of motion because endpoint positions must be recorded simultaneously in that measuring frame."
            accentRgb="245, 158, 11"
            titleClassName="font-mono text-[clamp(1.9rem,4.1vw,4.3rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fffaf0]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-amber-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">Why is a moving object's measured length shorter along its motion?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Length means the distance between two endpoint positions measured at the same time. But simultaneity is frame-dependent. Once different frames slice spacetime differently, they do not use the same pair of endpoint events to measure a moving object.</p>
          </div>
          <div className="rounded-[18px] border border-amber-200/[0.09] bg-amber-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-300/62">Length contraction</div>
            <div className="mt-3 text-[19px] text-white"><M>{"L=\\frac{L_0}{\\gamma}"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500"><M>{"L_0"}</M> is proper length, measured in the object's own rest frame.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/70">Length-measurement lab</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Compare one rod in two inertial frames.</h2>
              </div>
              <div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">γ = {gamma.toFixed(3)}</div>
            </div>

            <div className="relative mt-4 min-h-[400px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#09080e]/62 p-5">
              <RodComparison widthPercent={widthPercent} speed={speed} />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Readout label="speed" value={`${speed.toFixed(2)} c`} rgb="245, 158, 11" />
                <Readout label="proper length L₀" value={`${properLength.toFixed(2)} m`} rgb="34, 211, 238" />
                <Readout label="moving-frame length L" value={`${measuredLength.toFixed(2)} m`} rgb="232, 121, 249" />
                <Readout label="difference" value={`${contraction.toFixed(2)} m`} rgb="167, 139, 250" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Control label="Relative speed v" value={speed} min={0} max={0.95} step={0.01} unit="c" onChange={setSpeed} />
              <Control label="Proper length L₀" value={properLength} min={2} max={20} step={0.25} unit="m" onChange={setProperLength} />
            </div>
          </div>

          <div className="space-y-4">
            <Insight icon={Ruler} title="Proper length is the maximum inertial-frame length" text="The rest frame measures both endpoints simultaneously while the object itself is stationary, defining L₀." rgb="34, 211, 238" />
            <Insight icon={MoveHorizontal} title="Only the parallel dimension contracts" text="Lengths perpendicular to the relative motion are unchanged by a Lorentz boost along the motion direction." rgb="245, 158, 11" />
            <Insight icon={Orbit} title="This is not a visual squashing effect" text="Length contraction is a statement about coordinate measurements made with synchronized clocks and simultaneous endpoint positions, not simply how an object looks after light-travel delays." rgb="232, 121, 249" />
          </div>
        </section>

        <section className="mt-4 rounded-[26px] border border-indigo-200/[0.10] bg-indigo-400/[0.018] p-5 backdrop-blur-md sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.6fr)] lg:items-center">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/65">Connection to simultaneity</div>
              <h2 className="mt-1 text-[20px] font-semibold text-white">To measure a length, you must first decide what “at the same time” means.</h2>
              <p className="mt-2 text-[12px] leading-6 text-slate-400">That is why length contraction is not an independent trick. It is another consequence of Lorentz geometry and frame-dependent simultaneity.</p>
            </div>
            <Link href="/natural-science/physics/relativity/special/simultaneity" className="inline-flex items-center justify-center gap-2 rounded-[16px] border border-indigo-200/[0.12] bg-indigo-400/[0.025] px-4 py-3 text-[10px] font-semibold text-indigo-100/70">Revisit simultaneity <ArrowRight size={12} /></Link>
          </div>
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">A 10 m rod moves parallel to its length at 0.6c. What length is measured in the lab frame?</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {["6 m", "8 m", "12.5 m"].map((option) => (
              <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>
            ))}
          </div>
          {answer ? (
            <div className={`mt-4 rounded-[16px] border p-4 ${answer === "8 m" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
              <strong className={`text-[11px] ${answer === "8 m" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "8 m" ? "Exactly" : "Divide by γ"}</strong>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">At <M>{"0.6c"}</M>, <M>{"\\gamma=1.25"}</M>, so <M>{"L=10/1.25=8\\,m"}</M>.</p>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <Link href="/natural-science/physics/relativity/special/time-dilation" className="text-[10px] text-slate-500 hover:text-slate-300">← Time Dilation</Link>
            <Link href="/natural-science/physics/relativity/special/energy-momentum" className="inline-flex items-center gap-2 rounded-full border border-amber-200/[0.12] bg-amber-400/[0.035] px-4 py-2 text-[10px] font-semibold text-amber-100/75">Next: Relativistic Energy & Momentum <ArrowRight size={12} /></Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function RodComparison({ widthPercent, speed }: { widthPercent: number; speed: number }) {
  return (
    <div className="absolute inset-x-5 top-5 h-[285px]">
      <div className="absolute left-[7%] right-[7%] top-[24%] rounded-[18px] border border-cyan-200/[0.08] bg-cyan-400/[0.012] p-4">
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-cyan-200/50"><span>rod rest frame</span><span>proper length</span></div>
        <div className="relative mt-5 h-16">
          <div className="absolute left-[9%] right-[9%] top-1/2 h-5 -translate-y-1/2 rounded-full border border-cyan-200/25 bg-cyan-300/12 shadow-[0_0_24px_rgba(34,211,238,0.10)]" />
          <div className="absolute left-[9%] top-[75%] h-3 w-px bg-cyan-200/45" /><div className="absolute right-[9%] top-[75%] h-3 w-px bg-cyan-200/45" />
        </div>
      </div>

      <div className="absolute left-[7%] right-[7%] top-[56%] rounded-[18px] border border-amber-200/[0.08] bg-amber-400/[0.012] p-4">
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-amber-200/50"><span>lab frame</span><span>v = {speed.toFixed(2)}c</span></div>
        <div className="relative mt-5 h-16">
          <div className="absolute left-1/2 top-1/2 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/25 bg-amber-300/12 shadow-[0_0_24px_rgba(245,158,11,0.10)] transition-[width]" style={{ width: `${Math.max(24, widthPercent)}%` }} />
          <div className="absolute left-[9%] right-[9%] top-[75%] border-t border-dashed border-white/[0.10]" />
          <div className="absolute right-[8%] top-[5%] font-mono text-[8px] text-slate-600">endpoint positions sampled at one lab time</div>
        </div>
      </div>
    </div>
  );
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-amber-100/60">{value.toFixed(2)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-amber-400" /></div>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 truncate font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>;
}

function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Ruler; title: string; text: string; rgb: string }) {
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={12} /> length idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
