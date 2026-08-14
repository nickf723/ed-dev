"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import ThermoField from "../_components/ThermoField";
import { ArrowRight, Gauge, RefreshCw, Route } from "lucide-react";

type Process = "isobaric" | "isochoric" | "isothermal";

const PROCESS_INFO = {
  isobaric: { title: "Isobaric", constraint: "constant pressure", formula: "P=\\text{constant}", rgb: "251, 146, 60" },
  isochoric: { title: "Isochoric", constraint: "constant volume", formula: "V=\\text{constant}", rgb: "34, 211, 238" },
  isothermal: { title: "Isothermal ideal gas", constraint: "constant temperature", formula: "PV=\\text{constant}", rgb: "167, 139, 250" },
} as const;

const P1 = 200;
const V1 = 2;

export default function ThermodynamicProcessesPage() {
  const [process, setProcess] = useState<Process>("isobaric");
  const [extent, setExtent] = useState(0.6);
  const [answer, setAnswer] = useState<string | null>(null);
  const active = PROCESS_INFO[process];
  const state = getFinalState(process, extent);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080713] text-slate-100 selection:bg-violet-300/25">
      <ThermoField mode="process" intensity={1.14} />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-12 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#080713]/76 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[{ label: "Physics", href: "/natural-science/physics" }, { label: "Thermodynamics", href: "/natural-science/physics/thermodynamics" }, { label: "Thermodynamic Processes" }]}
            eyebrow="Thermodynamics · 06 / 06"
            icon={RefreshCw}
            title={<span>Thermodynamic Processes</span>}
            subtitle="A thermodynamic process is a path through state space. Constraints such as constant pressure, volume, or temperature shape the path and determine how energy crosses the boundary as work and heat."
            accentRgb="167, 139, 250"
            titleClassName="font-mono text-[clamp(1.8rem,4vw,4.1rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#faf7ff]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-violet-200/[0.10] bg-black/[0.11] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-300/70">The learner question</div><h2 className="mt-2 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">Why does the path between thermodynamic states matter?</h2><p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">State variables describe the endpoints. Heat and work describe energy transfer along the process. Boundary work depends on how pressure changes while volume changes, so different paths can transfer different amounts of work.</p></div>
          <div className="rounded-[18px] border border-violet-200/[0.09] bg-violet-400/[0.025] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-violet-300/62">Boundary work</div><div className="mt-3 text-[20px] text-white"><M>{"W_{by}=\\int P\\,dV"}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">On a pressure-volume diagram, reversible boundary work is the signed area under the process curve.</p></div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3"><div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/70">State-space lab</div><h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Move one idealized gas process through pressure–volume space.</h2></div><div className="rounded-full border border-white/[0.07] bg-black/[0.18] px-3 py-1.5 font-mono text-[10px] text-slate-500">1 kPa·L = 1 J</div></div>

            <div className="relative mt-4 min-h-[390px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0c0a18]/82 p-5">
              <PVGraph process={process} extent={extent} state={state} rgb={active.rgb} />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-4 gap-2"><Readout label="P₂" value={`${state.p2.toFixed(0)} kPa`} rgb="251, 146, 60" /><Readout label="V₂" value={`${state.v2.toFixed(2)} L`} rgb="34, 211, 238" /><Readout label="work by gas" value={`${state.work.toFixed(0)} J`} rgb={state.work >= 0 ? "45, 212, 191" : "248, 113, 113"} /><Readout label="constraint" value={active.constraint} rgb={active.rgb} /></div>
            </div>

            <div className="mt-5"><div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>process extent</span><span className="font-mono text-violet-100/60">{extent > 0 ? "expansion / heating direction" : extent < 0 ? "compression / cooling direction" : "initial state"}</span></div><input aria-label="Process extent" type="range" min="-0.8" max="1" step="0.02" value={extent} onChange={(event) => setExtent(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-violet-400" /></div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl"><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">Choose a constraint</div><div className="mt-4 space-y-2">{(Object.keys(PROCESS_INFO) as Process[]).map((key) => { const item = PROCESS_INFO[key]; const selected = key === process; return <button key={key} type="button" onClick={() => { setProcess(key); setExtent(0.6); }} className="w-full rounded-[16px] border px-4 py-3 text-left" style={{ borderColor: selected ? `rgba(${item.rgb},0.24)` : "rgba(255,255,255,0.06)", background: selected ? `rgba(${item.rgb},0.04)` : "rgba(255,255,255,0.01)" }}><div className="flex items-center justify-between gap-3"><strong className="text-[11px] text-white">{item.title}</strong><span className="font-mono text-[10px]" style={{ color: `rgba(${item.rgb},0.66)` }}>{item.constraint}</span></div><div className="mt-2 text-[14px] text-slate-300"><M>{item.formula}</M></div></button>; })}</div></div>
            <Insight icon={Route} title="Path quantities" text="Heat and work are not state variables. Their values depend on the process connecting the endpoints." rgb="167, 139, 250" />
            <Insight icon={Gauge} title="State quantities" text="Pressure, volume, temperature, and internal energy characterize thermodynamic states. A state does not remember the path used to reach it." rgb="45, 212, 191" />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <ProcessCard title="Isobaric" formula="W=P\\Delta V" text="A horizontal path on a pressure-volume diagram. Expansion creates a rectangular positive work area; compression gives negative work by the gas." rgb="251, 146, 60" />
          <ProcessCard title="Isochoric" formula="W=0" text="A vertical path. Volume does not change, so there is no boundary work even though pressure, temperature, and internal energy can change." rgb="34, 211, 238" />
          <ProcessCard title="Isothermal ideal gas" formula="PV=\\text{constant}" text="For an ideal gas at constant temperature, internal energy stays constant, so the first law requires heat transfer to balance the boundary work." rgb="167, 139, 250" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.6fr)]"><div><div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/65">Cycles and engines</div><h2 className="mt-1 text-[20px] font-semibold text-white">A closed loop in state space can convert recurring heat transfers into net work.</h2><p className="mt-2 text-[12px] leading-6 text-slate-400">When a system returns to its initial thermodynamic state, its net change in internal energy over the cycle is zero. The enclosed pressure-volume area represents net boundary work, so the first law connects that work to net heat transferred over the cycle.</p></div><div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="text-[9px] uppercase tracking-[0.12em] text-slate-600">over a complete cycle</div><div className="mt-3 space-y-2 text-[15px] text-white"><M>{"\\Delta U_{cycle}=0"}</M><br /><M>{"Q_{net}=W_{net}"}</M></div></div></div>
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.11] p-5 backdrop-blur-xl sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div><h2 className="mt-1 text-[20px] font-semibold text-white">A gas is heated in a rigid sealed container, so its volume stays fixed. What is the boundary work?</h2>
          <div className="mt-4 flex flex-wrap gap-2">{["positive", "zero", "negative"].map((option) => <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>)}</div>
          {answer ? <div className={`mt-4 rounded-[16px] border p-4 ${answer === "zero" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}><strong className={`text-[11px] ${answer === "zero" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "zero" ? "Exactly" : "Check the volume change"}</strong><p className="mt-1 text-[11px] leading-5 text-slate-500">Rigid means ΔV = 0, so <M>{"\\int P\\,dV=0"}</M>. Heat can still raise the internal energy and pressure.</p></div> : null}
          <div className="mt-5 flex justify-between"><Link href="/natural-science/physics/thermodynamics/entropy" className="text-[10px] text-slate-500 hover:text-slate-300">← Entropy & Second Law</Link><Link href="/natural-science/physics/thermodynamics" className="inline-flex items-center gap-2 rounded-full border border-violet-200/[0.12] bg-violet-400/[0.035] px-4 py-2 text-[10px] font-semibold text-violet-100/75">Thermodynamics map <ArrowRight size={13} /></Link></div>
        </section>
      </div>
    </main>
  );
}

function getFinalState(process: Process, extent: number) {
  const volumeFactor = Math.max(0.35, 1 + 0.65 * extent);
  if (process === "isochoric") {
    const p2 = Math.max(60, P1 * (1 + 0.65 * extent));
    return { p2, v2: V1, work: 0 };
  }
  const v2 = V1 * volumeFactor;
  if (process === "isobaric") return { p2: P1, v2, work: P1 * (v2 - V1) };
  const p2 = (P1 * V1) / v2;
  return { p2, v2, work: P1 * V1 * Math.log(v2 / V1) };
}

function PVGraph({ process, state, rgb }: { process: Process; extent: number; state: { p2: number; v2: number; work: number }; rgb: string }) {
  const x = (v: number) => 80 + ((v - 0.5) / 3.8) * 600;
  const y = (p: number) => 280 - ((p - 40) / 300) * 220;
  const x1 = x(V1);
  const y1 = y(P1);
  const x2 = x(state.v2);
  const y2 = y(state.p2);
  let path = `M ${x1},${y1} L ${x2},${y2}`;
  if (process === "isothermal") {
    path = Array.from({ length: 28 }, (_, i) => {
      const t = i / 27;
      const v = V1 + (state.v2 - V1) * t;
      const p = P1 * V1 / v;
      return `${i === 0 ? "M" : "L"} ${x(v)},${y(p)}`;
    }).join(" ");
  }
  const areaPath = process === "isochoric" ? "" : `${path} L ${x2},${y(40)} L ${x1},${y(40)} Z`;
  return <svg viewBox="0 0 760 330" className="absolute inset-x-5 top-4 h-[300px] w-[calc(100%-2.5rem)]" preserveAspectRatio="none" role="img" aria-label="Pressure-volume process diagram"><line x1="65" y1="280" x2="710" y2="280" stroke="rgba(148,163,184,0.17)" /><line x1="65" y1="280" x2="65" y2="35" stroke="rgba(148,163,184,0.17)" />{areaPath ? <path d={areaPath} fill={`rgba(${rgb},0.075)`} stroke="none" /> : null}<path d={path} fill="none" stroke={`rgb(${rgb})`} strokeOpacity="0.80" strokeWidth="3" vectorEffect="non-scaling-stroke" /><circle cx={x1} cy={y1} r="6" fill="rgb(250,204,21)" /><circle cx={x2} cy={y2} r="7" fill={`rgb(${rgb})`} /><text x={x1 + 10} y={y1 - 10} fill="rgba(250,204,21,0.65)" fontSize="12">1</text><text x={x2 + 10} y={y2 - 10} fill={`rgba(${rgb},0.72)`} fontSize="12">2</text><text x="675" y="305" fill="rgba(148,163,184,0.48)" fontSize="11">V (L)</text><text x="22" y="47" fill="rgba(148,163,184,0.48)" fontSize="11">P (kPa)</text></svg>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) { return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.28] px-3 py-2.5 text-center"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 font-mono text-[9px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>; }
function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Route; title: string; text: string; rgb: string }) { return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.10] p-5"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={13} /> {title}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
function ProcessCard({ title, formula, text, rgb }: { title: string; formula: string; text: string; rgb: string }) { return <div className="rounded-[19px] border border-white/[0.06] bg-black/[0.10] p-4"><div className="text-[9px] uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.66)` }}>{title}</div><div className="mt-3 text-[15px] text-white"><M>{formula}</M></div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>; }
