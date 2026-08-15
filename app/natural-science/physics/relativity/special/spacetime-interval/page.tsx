"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import RelativityField from "../../_components/RelativityField";
import { ArrowRight, Gauge, Orbit, Route, ShieldCheck } from "lucide-react";

type SeparationKind = "timelike" | "lightlike" | "spacelike";

export default function SpacetimeIntervalPage() {
  const [deltaT, setDeltaT] = useState(2.4);
  const [deltaX, setDeltaX] = useState(1.4);
  const [frameSpeed, setFrameSpeed] = useState(0.45);
  const [answer, setAnswer] = useState<string | null>(null);

  const gamma = 1 / Math.sqrt(1 - frameSpeed * frameSpeed);
  const deltaTPrime = gamma * (deltaT - frameSpeed * deltaX);
  const deltaXPrime = gamma * (deltaX - frameSpeed * deltaT);
  const interval = deltaT * deltaT - deltaX * deltaX;
  const transformedInterval = deltaTPrime * deltaTPrime - deltaXPrime * deltaXPrime;
  const kind: SeparationKind = Math.abs(interval) < 0.04 ? "lightlike" : interval > 0 ? "timelike" : "spacelike";
  const invariantMagnitude = Math.sqrt(Math.abs(interval));

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
              { label: "Spacetime Interval" },
            ]}
            eyebrow="Special Relativity · 03 / 06"
            icon={ShieldCheck}
            title={<span>Spacetime Interval</span>}
            subtitle="Observers can disagree about spatial distance and elapsed coordinate time while agreeing on one deeper quantity: the spacetime interval between the same two events."
            accentRgb="245, 158, 11"
            titleClassName="font-mono text-[clamp(1.9rem,4.1vw,4.3rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fffaf0]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-amber-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">If observers disagree about space and time, what can they still agree on?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Lorentz transformations reshuffle the spatial and temporal parts of an event separation. The interval stays invariant, giving every inertial observer the same causal classification of the pair.</p>
          </div>
          <div className="rounded-[18px] border border-amber-200/[0.09] bg-amber-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-300/62">Invariant interval · one spatial dimension</div>
            <div className="mt-3 text-[18px] text-white"><M>{"\\Delta s^2=c^2\\Delta t^2-\\Delta x^2"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">The lab uses <M>{"c=1"}</M>, so time is measured in seconds and distance in light-seconds.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/70">Invariant-geometry lab</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Move the second event, then boost the observer.</h2>
              </div>
              <div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">γ = {gamma.toFixed(3)}</div>
            </div>

            <div className="relative mt-4 min-h-[430px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#09080e]/62 p-5">
              <IntervalDiagram deltaT={deltaT} deltaX={deltaX} deltaTPrime={deltaTPrime} deltaXPrime={deltaXPrime} kind={kind} />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Readout label="Δs² original" value={interval.toFixed(3)} rgb={kindRgb(kind)} />
                <Readout label="Δs² boosted" value={transformedInterval.toFixed(3)} rgb="74, 222, 128" />
                <Readout label="Δt′" value={deltaTPrime.toFixed(2)} rgb="245, 158, 11" />
                <Readout label="Δx′" value={deltaXPrime.toFixed(2)} rgb="34, 211, 238" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              <Control label="Coordinate-time separation Δt" value={deltaT} min={0.2} max={4} step={0.05} unit="s" onChange={setDeltaT} />
              <Control label="Spatial separation Δx" value={deltaX} min={-4} max={4} step={0.05} unit="light-s" onChange={setDeltaX} />
              <Control label="Boost speed v" value={frameSpeed} min={-0.9} max={0.9} step={0.01} unit="c" onChange={setFrameSpeed} />
            </div>
          </div>

          <div className="space-y-4">
            <Classification kind="timelike" active={kind === "timelike"} formula="Δs² > 0" text="A slower-than-light causal influence can connect the events. Some frame places both events at the same position." />
            <Classification kind="lightlike" active={kind === "lightlike"} formula="Δs² = 0" text="Only a light-speed signal connects the events. Every inertial observer keeps them on the light cone." />
            <Classification kind="spacelike" active={kind === "spacelike"} formula="Δs² < 0" text="No subluminal causal signal can connect the events. Different frames may disagree about their time order." />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle icon={ShieldCheck} title="The interval is invariant" text="Change the frame speed. Δt′ and Δx′ move, but their Minkowski combination stays the same apart from numerical rounding." rgb="74, 222, 128" />
          <Principle icon={Route} title="Causality is geometric" text="Timelike, lightlike, and spacelike are not observer opinions. The interval fixes the causal class for every inertial frame." rgb="34, 211, 238" />
          <Principle icon={Gauge} title="Proper quantities come from the interval" text={kind === "timelike" ? `For this timelike pair, the proper-time magnitude is ${invariantMagnitude.toFixed(2)} s.` : kind === "spacelike" ? `For this spacelike pair, the proper-distance magnitude is ${invariantMagnitude.toFixed(2)} light-s.` : "For a lightlike pair, the interval magnitude is exactly zero."} rgb="245, 158, 11" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">Two events are separated by 2 seconds and 3 light-seconds. What kind of spacetime separation do they have?</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {["timelike", "lightlike", "spacelike"].map((option) => (
              <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>
            ))}
          </div>
          {answer ? (
            <div className={`mt-4 rounded-[16px] border p-4 ${answer === "spacelike" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
              <strong className={`text-[11px] ${answer === "spacelike" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "spacelike" ? "Exactly" : "Compare cΔt with Δx"}</strong>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">With <M>{"c=1"}</M>, <M>{"\\Delta s^2=2^2-3^2=-5"}</M>, so the separation is spacelike.</p>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <Link href="/natural-science/physics/relativity/special/simultaneity" className="text-[10px] text-slate-500 hover:text-slate-300">← Relativity of Simultaneity</Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/[0.08] bg-amber-400/[0.02] px-4 py-2 text-[10px] text-slate-600">Next: Time Dilation · planned <ArrowRight size={12} /></div>
          </div>
        </section>
      </div>
    </main>
  );
}

function IntervalDiagram({ deltaT, deltaX, deltaTPrime, deltaXPrime, kind }: { deltaT: number; deltaX: number; deltaTPrime: number; deltaXPrime: number; kind: SeparationKind }) {
  const x = (value: number) => 50 + Math.max(-4, Math.min(4, value)) * 8;
  const y = (value: number) => 56 - Math.max(-4, Math.min(4, value)) * 10;
  const rgb = kindRgb(kind);

  return (
    <div className="absolute inset-x-5 top-5 h-[315px]">
      <div className="absolute left-1/2 top-[5%] bottom-[5%] w-px -translate-x-1/2 bg-white/[0.13]" />
      <div className="absolute left-[8%] right-[8%] top-[56%] h-px bg-white/[0.13]" />
      <div className="absolute left-1/2 top-[7%] h-[80%] w-[40%] -translate-x-1/2 rotate-45 border-l border-t border-cyan-200/[0.18]" />
      <div className="absolute left-1/2 top-[7%] h-[80%] w-[40%] -translate-x-1/2 -rotate-45 border-r border-t border-cyan-200/[0.18]" />

      <div className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.30)]" style={{ left: "50%", top: "56%" }} />
      <div className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: `${x(deltaX)}%`, top: `${y(deltaT)}%`, background: `rgb(${rgb})`, boxShadow: `0 0 24px rgba(${rgb},0.50)` }} />
      <div className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ left: `${x(deltaXPrime)}%`, top: `${y(deltaTPrime)}%`, borderColor: `rgba(${rgb},0.60)`, background: `rgba(${rgb},0.16)` }} />

      <div className="absolute left-[9%] top-[10%] font-mono text-[9px] text-slate-600">ct</div>
      <div className="absolute right-[9%] top-[58%] font-mono text-[9px] text-slate-600">x</div>
      <div className="absolute left-[10%] bottom-[5%] rounded-[14px] border border-white/[0.06] bg-black/[0.16] px-3 py-2 font-mono text-[9px] text-slate-500">solid = original coordinates · outline = boosted coordinates</div>
    </div>
  );
}

function Classification({ kind, active, formula, text }: { kind: SeparationKind; active: boolean; formula: string; text: string }) {
  const rgb = kindRgb(kind);
  return <div className="rounded-[22px] border p-4 backdrop-blur-md" style={{ borderColor: active ? `rgba(${rgb},0.26)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${rgb},0.045)` : "rgba(0,0,0,0.08)", boxShadow: active ? `0 0 35px rgba(${rgb},0.07)` : undefined }}><div className="flex items-center justify-between gap-3"><strong className={`text-[12px] capitalize ${active ? "text-white" : "text-slate-600"}`}>{kind}</strong><span className="font-mono text-[11px]" style={{ color: `rgba(${rgb},${active ? 0.78 : 0.36})` }}>{formula}</span></div><p className={`mt-2 text-[11px] leading-5 ${active ? "text-slate-400" : "text-slate-700"}`}>{text}</p></div>;
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <div><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-amber-100/60">{value.toFixed(2)} {unit}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-amber-400" /></div>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 truncate font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>;
}

function Principle({ icon: Icon, title, text, rgb }: { icon: typeof Orbit; title: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={12} /> invariant idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function kindRgb(kind: SeparationKind) {
  if (kind === "timelike") return "245, 158, 11";
  if (kind === "lightlike") return "34, 211, 238";
  return "232, 121, 249";
}
