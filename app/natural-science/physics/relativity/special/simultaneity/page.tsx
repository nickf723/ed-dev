"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import RelativityField from "../../_components/RelativityField";
import { ArrowRight, Clock3, Gauge, Orbit, Split } from "lucide-react";

export default function SimultaneityPage() {
  const [frameSpeed, setFrameSpeed] = useState(0.6);
  const [separation, setSeparation] = useState(2);
  const [answer, setAnswer] = useState<string | null>(null);

  const gamma = 1 / Math.sqrt(1 - frameSpeed * frameSpeed);
  const rearPrime = gamma * frameSpeed * separation / 2;
  const frontPrime = -rearPrime;
  const deltaPrime = frontPrime - rearPrime;
  const nearZero = Math.abs(frameSpeed) < 0.015;

  const earlier = nearZero ? "simultaneous" : frontPrime < rearPrime ? "front event" : "rear event";

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
              { label: "Relativity of Simultaneity" },
            ]}
            eyebrow="Special Relativity · 02 / 06"
            icon={Split}
            title={<span>Relativity of Simultaneity</span>}
            subtitle="Two spatially separated events can share the same time coordinate in one inertial frame and receive different time coordinates in another. Simultaneity is frame-dependent, not universal."
            accentRgb="245, 158, 11"
            titleClassName="font-mono text-[clamp(1.75rem,3.9vw,4.05rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fffaf0]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-amber-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">Can two events be simultaneous for one observer but not another?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Yes. The disagreement is not caused by signal delay or faulty clocks. It comes from how different inertial frames assign coordinates to the same pair of events.</p>
          </div>
          <div className="rounded-[18px] border border-amber-200/[0.09] bg-amber-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-300/62">Lorentz time coordinate</div>
            <div className="mt-3 text-[18px] text-white"><M>{"t'=\\gamma\\left(t-\\frac{vx}{c^2}\\right)"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Below we use units with <M>{"c=1"}</M>. The platform assigns both events <M>{"t=0"}</M>.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/70">Event-coordinate lab</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Keep the events fixed. Change only the observer.</h2>
              </div>
              <div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">γ = {gamma.toFixed(3)}</div>
            </div>

            <div className="relative mt-4 min-h-[410px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#09080e]/62 p-5">
              <SpacetimeDiagram frameSpeed={frameSpeed} rearPrime={rearPrime} frontPrime={frontPrime} />

              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Readout label="frame speed" value={`${frameSpeed.toFixed(2)} c`} rgb="245, 158, 11" />
                <Readout label="rear event t′" value={`${rearPrime.toFixed(2)}`} rgb="34, 211, 238" />
                <Readout label="front event t′" value={`${frontPrime.toFixed(2)}`} rgb="232, 121, 249" />
                <Readout label="Δt′ front−rear" value={`${deltaPrime.toFixed(2)}`} rgb="167, 139, 250" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Control label="Moving-frame speed v" value={frameSpeed} min={-0.9} max={0.9} step={0.01} unit="c" onChange={setFrameSpeed} />
              <Control label="Event separation Δx" value={separation} min={0.5} max={4} step={0.1} unit="light-seconds" onChange={setSeparation} />
            </div>
          </div>

          <div className="space-y-4">
            <Insight icon={Orbit} title="The events do not move" text="The two flashes are the same physical events in every frame. Only their coordinate labels change." rgb="245, 158, 11" />
            <Insight icon={Clock3} title="Simultaneous means equal coordinate time" text="In the platform frame both events have t = 0. In the moving frame their t′ values separate as soon as v is nonzero." rgb="34, 211, 238" />
            <Insight icon={Gauge} title="The ordering flips with frame direction" text="Reverse the frame velocity and the event that was earlier becomes later. For spacelike-separated events, no invariant time order exists." rgb="232, 121, 249" />
          </div>
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-md sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.7fr)] lg:items-center">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/65">What the slider is showing</div>
              <h2 className="mt-1 text-[20px] font-semibold text-white">A moving frame slices spacetime into “now” differently.</h2>
              <p className="mt-2 text-[12px] leading-6 text-slate-400">For the platform, the horizontal line through both events is one instant of time. A moving inertial frame uses a tilted simultaneity line. The light cone stays fixed while the frame's space and time axes tilt together.</p>
            </div>
            <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4">
              <div className="text-[9px] uppercase tracking-[0.12em] text-slate-600">current verdict</div>
              <div className="mt-2 text-[18px] font-semibold text-amber-100/85">{nearZero ? "same time in both frames" : `${earlier} occurs earlier in the moving frame`}</div>
              <p className="mt-2 text-[10px] leading-5 text-slate-600">This statement concerns assigned event coordinates, not visual appearance.</p>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">Two events are simultaneous in the lab at x = −1 and x = +1. A ship moves in the +x direction. Which event gets the earlier ship-frame time coordinate?</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {["the +x event", "the −x event", "they remain simultaneous"].map((option) => (
              <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>
            ))}
          </div>
          {answer ? (
            <div className={`mt-4 rounded-[16px] border p-4 ${answer === "the +x event" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
              <strong className={`text-[11px] ${answer === "the +x event" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "the +x event" ? "Exactly" : "Apply the transformed time coordinate"}</strong>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">With <M>{"v>0"}</M> and <M>{"t=0"}</M>, the term <M>{"-vx/c^2"}</M> makes the positive-x event receive the smaller, earlier <M>{"t'"}</M>.</p>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <Link href="/natural-science/physics/relativity/special/frames-postulates" className="text-[10px] text-slate-500 hover:text-slate-300">← Frames & Postulates</Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/[0.08] bg-amber-400/[0.02] px-4 py-2 text-[10px] text-slate-600">Next: Spacetime Interval · planned <ArrowRight size={12} /></div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SpacetimeDiagram({ frameSpeed, rearPrime, frontPrime }: { frameSpeed: number; rearPrime: number; frontPrime: number }) {
  const tilt = frameSpeed * 24;
  const rearY = 48 - Math.max(-1.5, Math.min(1.5, rearPrime)) * 15;
  const frontY = 48 - Math.max(-1.5, Math.min(1.5, frontPrime)) * 15;

  return (
    <div className="absolute inset-x-5 top-5 h-[300px]">
      <div className="absolute left-1/2 top-[7%] bottom-[8%] w-px -translate-x-1/2 bg-white/[0.13]" />
      <div className="absolute left-[8%] right-[8%] top-[48%] h-px bg-white/[0.13]" />
      <div className="absolute left-1/2 top-[8%] h-[78%] w-[44%] -translate-x-1/2 rotate-45 border-l border-t border-cyan-200/[0.15]" />
      <div className="absolute left-1/2 top-[8%] h-[78%] w-[44%] -translate-x-1/2 -rotate-45 border-r border-t border-cyan-200/[0.15]" />

      <div className="absolute left-[10%] right-[10%] top-1/2 origin-center border-t border-dashed border-amber-300/50" style={{ transform: `rotate(${-tilt}deg)` }} />
      <div className="absolute right-[10%] top-[18%] font-mono text-[9px] text-amber-200/55">moving-frame simultaneity line</div>
      <div className="absolute left-[9%] top-[51%] font-mono text-[9px] text-slate-600">platform t = 0</div>

      <EventDot left="27%" top="48%" label="rear · platform" rgb="34, 211, 238" />
      <EventDot left="73%" top="48%" label="front · platform" rgb="232, 121, 249" />
      <EventDot left="27%" top={`${rearY}%`} label={`rear · t′ ${rearPrime.toFixed(2)}`} rgb="34, 211, 238" compact />
      <EventDot left="73%" top={`${frontY}%`} label={`front · t′ ${frontPrime.toFixed(2)}`} rgb="232, 121, 249" compact />
    </div>
  );
}

function EventDot({ left, top, label, rgb, compact = false }: { left: string; top: string; label: string; rgb: string; compact?: boolean }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left, top }}>
      <div className={`${compact ? "h-2.5 w-2.5" : "h-4 w-4"} rounded-full border`} style={{ background: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.55)`, boxShadow: `0 0 22px rgba(${rgb},0.38)` }} />
      <div className="mt-2 whitespace-nowrap font-mono text-[8px]" style={{ color: `rgba(${rgb},0.66)` }}>{label}</div>
    </div>
  );
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600"><span>{label}</span><span className="font-mono text-amber-100/60">{value.toFixed(2)} {unit}</span></div>
      <input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-amber-400" />
    </div>
  );
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[13px] border border-white/[0.06] bg-black/[0.20] px-3 py-2.5"><div className="text-[8px] uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 truncate font-mono text-[10px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</div></div>;
}

function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Orbit; title: string; text: string; rgb: string }) {
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={12} /> frame idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
