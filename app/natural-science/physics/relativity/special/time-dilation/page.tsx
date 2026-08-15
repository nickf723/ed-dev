"use client";

import { useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import RelativityField from "../../_components/RelativityField";
import { ArrowRight, Clock3, Gauge, Hourglass, Orbit } from "lucide-react";

export default function TimeDilationPage() {
  const [speed, setSpeed] = useState(0.8);
  const [properTime, setProperTime] = useState(6);
  const [answer, setAnswer] = useState<string | null>(null);

  const gamma = 1 / Math.sqrt(1 - speed * speed);
  const coordinateTime = gamma * properTime;
  const extraTime = coordinateTime - properTime;
  const diagonalScale = Math.min(1.8, Math.max(1, gamma));

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
              { label: "Time Dilation" },
            ]}
            eyebrow="Special Relativity · 04 / 06"
            icon={Clock3}
            title={<span>Time Dilation</span>}
            subtitle="Proper time is measured by a clock that stays at one place in its own rest frame. Other inertial frames assign a larger coordinate-time interval between the same two ticks."
            accentRgb="245, 158, 11"
            titleClassName="font-mono text-[clamp(2rem,4.3vw,4.6rem)] font-semibold uppercase leading-[0.9] tracking-[-0.052em] text-[#fffaf0]"
            headerClassName="border-transparent"
          />
        </div>

        <section className="mt-5 grid gap-4 rounded-[28px] border border-amber-200/[0.10] bg-black/[0.08] p-5 backdrop-blur-md lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/70">The learner question</div>
            <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">Why does a moving clock accumulate less proper time between the same events?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Use a light clock: in its own rest frame the light pulse moves straight between mirrors. A frame that sees the clock move sees a longer diagonal light path. Because both frames measure the same light speed, the moving-frame coordinate time must be larger.</p>
          </div>
          <div className="rounded-[18px] border border-amber-200/[0.09] bg-amber-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-300/62">Time dilation</div>
            <div className="mt-3 text-[19px] text-white"><M>{"\\Delta t=\\gamma\\Delta\\tau"}</M></div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500"><M>{"\\Delta\\tau"}</M> is proper time: the interval read by one clock present at both events.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
          <div className="rounded-[30px] border border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/70">Light-clock lab</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">The same tick traces different spacetime geometry.</h2>
              </div>
              <div className="rounded-full border border-white/[0.07] bg-black/[0.16] px-3 py-1.5 font-mono text-[10px] text-slate-500">γ = {gamma.toFixed(3)}</div>
            </div>

            <div className="relative mt-4 min-h-[430px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#09080e]/62 p-5">
              <LightClockDiagram speed={speed} diagonalScale={diagonalScale} />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Readout label="speed" value={`${speed.toFixed(2)} c`} rgb="245, 158, 11" />
                <Readout label="proper time Δτ" value={`${properTime.toFixed(2)} s`} rgb="34, 211, 238" />
                <Readout label="lab time Δt" value={`${coordinateTime.toFixed(2)} s`} rgb="232, 121, 249" />
                <Readout label="difference" value={`${extraTime.toFixed(2)} s`} rgb="167, 139, 250" />
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Control label="Relative speed v" value={speed} min={0} max={0.95} step={0.01} unit="c" onChange={setSpeed} />
              <Control label="Proper-time interval Δτ" value={properTime} min={1} max={12} step={0.25} unit="s" onChange={setProperTime} />
            </div>
          </div>

          <div className="space-y-4">
            <Insight icon={Clock3} title="Proper time belongs to a worldline" text="It is the time recorded by a clock carried along the path connecting the two events, not a universal master time." rgb="34, 211, 238" />
            <Insight icon={Gauge} title="Gamma grows nonlinearly" text="At ordinary speeds γ is almost 1. As v approaches c, the difference between proper time and coordinate time grows rapidly." rgb="245, 158, 11" />
            <Insight icon={Orbit} title="No inertial frame owns the true time" text="Each inertial observer can describe the other's moving clock as accumulating less proper time between appropriately compared events. The asymmetry in the twin scenario comes from different worldlines, not a preferred inertial frame." rgb="232, 121, 249" />
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <Principle title="At rest relative to you" value="γ = 1" text="When v = 0, proper time and coordinate time agree." rgb="74, 222, 128" />
          <Principle title="At 0.8c" value="γ ≈ 1.667" text="Six seconds of proper time correspond to ten seconds in the frame where the clock moves at 0.8c." rgb="245, 158, 11" />
          <Principle title="Near light speed" value="γ → ∞" text="A massive clock cannot reach c, but the dilation factor grows without bound as the speed approaches it." rgb="232, 121, 249" />
        </section>

        <section className="mt-4 rounded-[26px] border border-white/[0.08] bg-black/[0.08] p-5 backdrop-blur-md sm:p-6">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/65">Transfer check</div>
          <h2 className="mt-1 text-[20px] font-semibold text-white">A spacecraft moves at 0.8c. Six seconds pass on a clock traveling with the spacecraft. How much time separates those ticks in the Earth frame?</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {["3.6 s", "6.0 s", "10.0 s"].map((option) => (
              <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-full border px-4 py-2 text-[11px]" style={{ borderColor: answer === option ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.07)", background: answer === option ? "rgba(45,212,191,0.05)" : "rgba(0,0,0,0.12)", color: answer === option ? "rgb(209,250,229)" : "rgb(148,163,184)" }}>{option}</button>
            ))}
          </div>
          {answer ? (
            <div className={`mt-4 rounded-[16px] border p-4 ${answer === "10.0 s" ? "border-emerald-300/[0.16] bg-emerald-400/[0.03]" : "border-amber-300/[0.16] bg-amber-400/[0.025]"}`}>
              <strong className={`text-[11px] ${answer === "10.0 s" ? "text-emerald-200" : "text-amber-200"}`}>{answer === "10.0 s" ? "Exactly" : "Multiply the proper time by γ"}</strong>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">At <M>{"v=0.8c"}</M>, <M>{"\\gamma=5/3"}</M>, so <M>{"\\Delta t=(5/3)(6\\,s)=10\\,s"}</M>.</p>
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <Link href="/natural-science/physics/relativity/special/spacetime-interval" className="text-[10px] text-slate-500 hover:text-slate-300">← Spacetime Interval</Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/[0.08] bg-amber-400/[0.02] px-4 py-2 text-[10px] text-slate-600">Next: Length Contraction · planned <ArrowRight size={12} /></div>
          </div>
        </section>
      </div>
    </main>
  );
}

function LightClockDiagram({ speed, diagonalScale }: { speed: number; diagonalScale: number }) {
  const horizontalShift = speed * 95;
  const diagonalWidth = 88 * diagonalScale;

  return (
    <div className="absolute inset-x-5 top-5 h-[315px]">
      <div className="absolute left-[4%] top-[6%] w-[42%] rounded-[20px] border border-cyan-200/[0.08] bg-cyan-400/[0.015] p-4">
        <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-cyan-200/55">clock rest frame</div>
        <div className="relative mx-auto mt-4 h-[180px] w-[120px]">
          <div className="absolute left-[15%] right-[15%] top-[12%] h-2 rounded-full bg-slate-400/35" />
          <div className="absolute bottom-[12%] left-[15%] right-[15%] h-2 rounded-full bg-slate-400/35" />
          <div className="absolute left-1/2 top-[16%] bottom-[16%] w-px -translate-x-1/2 bg-cyan-300/60 shadow-[0_0_18px_rgba(34,211,238,0.26)]" />
          <div className="absolute left-1/2 top-[47%] h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_22px_rgba(34,211,238,0.55)]" />
        </div>
        <div className="text-center font-mono text-[9px] text-cyan-100/50">vertical light path</div>
      </div>

      <div className="absolute right-[4%] top-[6%] w-[42%] rounded-[20px] border border-amber-200/[0.08] bg-amber-400/[0.015] p-4">
        <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-amber-200/55">lab frame</div>
        <div className="relative mx-auto mt-4 h-[180px] w-[160px] overflow-visible">
          <div className="absolute left-[8%] top-[18%] h-px origin-left rotate-[58deg] bg-amber-300/70 shadow-[0_0_18px_rgba(245,158,11,0.28)]" style={{ width: `${diagonalWidth}px` }} />
          <div className="absolute left-[8%] bottom-[18%] h-px origin-left -rotate-[58deg] bg-amber-300/70 shadow-[0_0_18px_rgba(245,158,11,0.28)]" style={{ width: `${diagonalWidth}px` }} />
          <div className="absolute left-[8%] top-[14%] h-2 w-16 rounded-full bg-slate-400/35" />
          <div className="absolute left-[8%] bottom-[14%] h-2 w-16 rounded-full bg-slate-400/35" />
          <div className="absolute left-[8%] top-1/2 h-px bg-gradient-to-r from-amber-300/45 to-transparent" style={{ width: `${50 + horizontalShift}px` }} />
        </div>
        <div className="text-center font-mono text-[9px] text-amber-100/50">longer diagonal light path</div>
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

function Insight({ icon: Icon, title, text, rgb }: { icon: typeof Clock3; title: string; text: string; rgb: string }) {
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.08] p-4 backdrop-blur-md"><div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.68)` }}><Icon size={12} /> clock idea</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function Principle({ title, value, text, rgb }: { title: string; value: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.08] p-4"><div className="font-mono text-[12px]" style={{ color: `rgba(${rgb},0.76)` }}>{value}</div><strong className="mt-2 block text-[12px] text-white">{title}</strong><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}
