"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import PhysicsBackground from "../../_components/PhysicsBackground";
import {
  Activity,
  ArrowRight,
  Gauge,
  LocateFixed,
  MoveRight,
  Route,
  Sparkles,
  Timer,
  TrendingUp,
} from "lucide-react";

type Preset = {
  id: string;
  label: string;
  v0: number;
  a: number;
  description: string;
};

const DURATION = 6;
const SAMPLE_COUNT = 81;

const PRESETS: readonly Preset[] = [
  { id: "steady", label: "Steady", v0: 3, a: 0, description: "constant velocity" },
  { id: "speed-up", label: "Speed up", v0: 1, a: 1.2, description: "velocity grows" },
  { id: "slow-turn", label: "Turn around", v0: 5, a: -1.7, description: "velocity crosses zero" },
  { id: "from-rest", label: "From rest", v0: 0, a: 1.8, description: "pure acceleration" },
] as const;

export default function KinematicsPage() {
  const [time, setTime] = useState(2.4);
  const [v0, setV0] = useState(3);
  const [acceleration, setAcceleration] = useState(0);
  const [preset, setPreset] = useState("steady");

  const samples = useMemo(
    () =>
      Array.from({ length: SAMPLE_COUNT }, (_, index) => {
        const t = (index / (SAMPLE_COUNT - 1)) * DURATION;
        return {
          t,
          x: v0 * t + 0.5 * acceleration * t * t,
          v: v0 + acceleration * t,
          a: acceleration,
        };
      }),
    [v0, acceleration],
  );

  const x = v0 * time + 0.5 * acceleration * time * time;
  const v = v0 + acceleration * time;
  const activeIndex = Math.min(SAMPLE_COUNT - 1, Math.max(0, Math.round((time / DURATION) * (SAMPLE_COUNT - 1))));
  const positions = samples.map((sample) => sample.x);
  const minPosition = Math.min(0, ...positions);
  const maxPosition = Math.max(0, ...positions);
  const positionSpan = Math.max(maxPosition - minPosition, 1);
  const particleLeft = 8 + ((x - minPosition) / positionSpan) * 84;
  const turnTime = Math.abs(acceleration) > 0.001 ? -v0 / acceleration : null;
  const hasTurn = turnTime !== null && turnTime >= 0 && turnTime <= DURATION;

  const motionState =
    Math.abs(v) < 0.06
      ? "instantaneously at rest"
      : Math.abs(acceleration) < 0.05
        ? "constant velocity"
        : Math.sign(v) === Math.sign(acceleration)
          ? "speeding up"
          : "slowing down";

  function applyPreset(next: Preset) {
    setPreset(next.id);
    setV0(next.v0);
    setAcceleration(next.a);
    setTime(2.4);
  }

  function customizeVelocity(value: number) {
    setPreset("custom");
    setV0(value);
  }

  function customizeAcceleration(value: number) {
    setPreset("custom");
    setAcceleration(value);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#040910] text-slate-100 selection:bg-orange-400/25">
      <PhysicsBackground mode="motion" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_48%_28%,rgba(251,146,60,0.045),transparent_24%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6 xl:px-8">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Natural Science", href: "/natural-science" },
            { label: "Physics", href: "/natural-science/physics" },
            { label: "Motion", href: "/natural-science/physics/motion" },
            { label: "Kinematics" },
          ]}
          eyebrow="Motion without causes"
          icon={MoveRight}
          title={<span>Kinematics</span>}
          subtitle="Describe where an object is, how its position changes, and how its velocity changes. The graphs and equations below are different views of the same motion."
          accentRgb="251, 146, 60"
          titleClassName="font-mono text-[clamp(2.6rem,4.8vw,5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.058em] text-[#fffaf7]"
          headerClassName="border-white/[0.10]"
          aside={
            <div className="rounded-full border border-orange-200/[0.10] bg-black/25 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.11em] text-orange-100/65 backdrop-blur-md">
              Motion · 01 / 03
            </div>
          }
        />

        <section className="mt-4 grid gap-4 rounded-[26px] border border-white/[0.08] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)] sm:p-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-300/72">The learner question</div>
            <h2 className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.45rem)] font-semibold tracking-[-0.04em] text-white">
              How can one moving object produce three different graphs?
            </h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">
              Start with position. Velocity tells how quickly position changes. Acceleration tells how quickly velocity changes. Nothing new is being invented at each step; we are reading the same history at a different level of change.
            </p>
          </div>

          <div className="rounded-[18px] border border-orange-200/[0.09] bg-orange-400/[0.025] px-4 py-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-orange-300/62">Change ladder</div>
            <div className="mt-3 flex items-center gap-2 font-mono text-[12px] text-slate-300">
              <span className="text-orange-200">position</span>
              <ArrowRight size={13} className="text-slate-700" />
              <span className="text-cyan-200">velocity</span>
              <ArrowRight size={13} className="text-slate-700" />
              <span className="text-violet-200">acceleration</span>
            </div>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">Each arrow means “rate of change with respect to time.”</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.28fr)_minmax(310px,0.72fr)]">
          <div className="rounded-[28px] border border-white/[0.09] bg-black/[0.22] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 px-1">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-orange-300/72">Motion lab</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Scrub one motion through time.</h2>
              </div>
              <div className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 font-mono text-[10px] text-slate-400">t = {time.toFixed(2)} s</div>
            </div>

            <div className="relative mt-4 overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#07101a]/80 px-5 pb-5 pt-6">
              <div className="flex items-center justify-between font-mono text-[8px] text-slate-700">
                <span>{minPosition.toFixed(1)} m</span>
                <span>position axis</span>
                <span>{maxPosition.toFixed(1)} m</span>
              </div>

              <div className="relative mt-8 h-20">
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-slate-400/45 to-transparent" />
                {[0, 0.25, 0.5, 0.75, 1].map((mark) => (
                  <div key={mark} className="absolute top-[calc(50%-4px)] h-2 w-px bg-slate-600/45" style={{ left: `${mark * 100}%` }} />
                ))}
                <div className="absolute top-[calc(50%-14px)] transition-[left] duration-75 ease-linear" style={{ left: `${Math.min(92, Math.max(8, particleLeft))}%` }}>
                  <div className="relative -translate-x-1/2">
                    <div className="h-7 w-7 rounded-full border border-orange-100/45 bg-orange-400 shadow-[0_0_32px_rgba(251,146,60,0.42)]" />
                    {Math.abs(v) > 0.06 ? (
                      <div
                        className={`absolute top-[13px] h-px bg-cyan-300/80 ${v < 0 ? "right-6" : "left-6"}`}
                        style={{ width: `${Math.min(88, 20 + Math.abs(v) * 5)}px` }}
                      >
                        <span className={`absolute -top-[3px] h-1.5 w-1.5 rotate-45 border-cyan-300 ${v < 0 ? "left-0 border-b border-l" : "right-0 border-r border-t"}`} />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <StateReadout label="Position" symbol="x" value={`${x.toFixed(2)} m`} rgb="251, 146, 60" />
                <StateReadout label="Velocity" symbol="v" value={`${v.toFixed(2)} m/s`} rgb="34, 211, 238" />
                <StateReadout label="Acceleration" symbol="a" value={`${acceleration.toFixed(2)} m/s²`} rgb="167, 139, 250" />
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between gap-4 text-[9px] uppercase tracking-[0.11em] text-slate-600">
                  <span>time</span>
                  <span className="text-orange-200/60">{motionState}</span>
                </div>
                <input aria-label="Time" type="range" min="0" max={DURATION} step="0.02" value={time} onChange={(event) => setTime(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-orange-400" />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <MotionGraph label="Position" symbol="x(t)" values={samples.map((sample) => sample.x)} activeIndex={activeIndex} rgb="251, 146, 60" />
              <MotionGraph label="Velocity" symbol="v(t)" values={samples.map((sample) => sample.v)} activeIndex={activeIndex} rgb="34, 211, 238" />
              <MotionGraph label="Acceleration" symbol="a(t)" values={samples.map((sample) => sample.a)} activeIndex={activeIndex} rgb="167, 139, 250" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.20] p-5 backdrop-blur-2xl">
              <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500"><Sparkles size={12} className="text-orange-300" /> Try a motion</div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {PRESETS.map((item) => (
                  <button key={item.id} type="button" onClick={() => applyPreset(item)} className={`rounded-[15px] border px-3 py-3 text-left transition ${preset === item.id ? "border-orange-300/28 bg-orange-400/[0.07]" : "border-white/[0.06] bg-white/[0.014] hover:border-white/[0.12]"}`}>
                    <span className="block text-[11px] font-semibold text-white">{item.label}</span>
                    <span className="mt-1 block text-[9px] text-slate-600">{item.description}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 space-y-5 border-t border-white/[0.06] pt-5">
                <Control label="Initial velocity" value={v0} min={-6} max={6} step={0.1} unit="m/s" onChange={customizeVelocity} />
                <Control label="Acceleration" value={acceleration} min={-4} max={4} step={0.1} unit="m/s²" onChange={customizeAcceleration} />
              </div>
            </div>

            <div className="rounded-[24px] border border-cyan-200/[0.10] bg-cyan-400/[0.025] p-5 backdrop-blur-2xl">
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/65">Read the motion</div>
              <p className="mt-3 text-[12px] leading-6 text-slate-400">
                {Math.abs(acceleration) < 0.05
                  ? "Velocity stays constant, so the position graph is a straight line. Equal time intervals add equal displacements."
                  : hasTurn
                    ? `Velocity reaches zero near ${turnTime?.toFixed(2)} s. At that same instant, the position graph reaches a turning point.`
                    : "Constant acceleration makes velocity a straight sloped line. Position bends because the amount added each second is changing."}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-4">
          <ConceptCard icon={LocateFixed} number="01" title="Position" question="Where is it?" body="A coordinate gives location relative to a chosen origin and positive direction." formula="x" rgb="251, 146, 60" />
          <ConceptCard icon={Route} number="02" title="Displacement" question="How far did position change?" body="Displacement compares final and initial position. It can be positive, negative, or zero." formula="\\Delta x = x_f - x_i" rgb="250, 204, 21" />
          <ConceptCard icon={Gauge} number="03" title="Velocity" question="How fast is position changing?" body="Velocity includes direction. Its sign tells which way position changes along the chosen axis." formula="v_{avg} = \\frac{\\Delta x}{\\Delta t}" rgb="34, 211, 238" />
          <ConceptCard icon={Activity} number="04" title="Acceleration" question="How fast is velocity changing?" body="Acceleration describes changing velocity. Negative acceleration does not automatically mean slowing down." formula="a_{avg} = \\frac{\\Delta v}{\\Delta t}" rgb="167, 139, 250" />
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.08] bg-black/[0.20] p-5 backdrop-blur-2xl sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
            <div>
              <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/68"><Timer size={12} /> Constant acceleration</div>
              <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-white">Three equations, one model.</h2>
              <p className="mt-3 text-[12px] leading-6 text-slate-400">
                When acceleration is constant, these equations are linked descriptions of the same motion. Choose the one whose known quantities match the question rather than treating them as unrelated formulas.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <EquationCard label="Position from time" formula="x = x_0 + v_0t + \\frac{1}{2}at^2" note="tracks position as time passes" rgb="251, 146, 60" />
              <EquationCard label="Velocity from time" formula="v = v_0 + at" note="tracks velocity as time passes" rgb="34, 211, 238" />
              <EquationCard label="Time eliminated" formula="v^2 = v_0^2 + 2a(x-x_0)" note="connects velocity directly to displacement" rgb="167, 139, 250" />
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <div className="rounded-[26px] border border-orange-200/[0.10] bg-orange-400/[0.025] p-5 backdrop-blur-2xl sm:p-6">
            <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-orange-300/68"><TrendingUp size={12} /> Physics ↔ Algebra</div>
            <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-white">Constant acceleration makes position quadratic.</h2>
            <div className="mt-4 rounded-[17px] border border-white/[0.06] bg-black/[0.18] px-4 py-4 text-[17px] text-orange-100">
              <M>{"x(t) = x_0 + v_0t + \\frac{1}{2}at^2"}</M>
            </div>
            <p className="mt-3 text-[12px] leading-6 text-slate-400">The squared time term is why the position graph bends into a parabola whenever acceleration is nonzero. The vertex can represent a physical turning point.</p>
            <Link href="/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations/patterns-parabolas" className="mt-4 inline-flex items-center gap-2 rounded-full border border-orange-200/[0.14] bg-orange-400/[0.05] px-3.5 py-2 text-[10px] font-semibold text-orange-100/80 transition hover:bg-orange-400/[0.09]">
              Open Patterns & Parabolas <ArrowRight size={12} />
            </Link>
          </div>

          <div className="rounded-[26px] border border-white/[0.07] bg-black/[0.18] p-5 backdrop-blur-2xl sm:p-6">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-600">Keep the representations connected</div>
            <div className="mt-4 space-y-3">
              <Connection row="steeper position graph" result="larger |velocity|" rgb="34, 211, 238" />
              <Connection row="velocity crosses zero" result="position turning point" rgb="251, 146, 60" />
              <Connection row="sloped velocity graph" result="nonzero acceleration" rgb="167, 139, 250" />
              <Connection row="flat velocity graph" result="zero acceleration" rgb="45, 212, 191" />
            </div>
          </div>
        </section>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pb-8">
          <Link href="/natural-science/physics/motion" className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300">← Motion map</Link>
          <div className="rounded-full border border-white/[0.05] bg-black/[0.14] px-3 py-2 text-[10px] text-slate-700">Next: Projectile Motion · planned</div>
        </div>
      </div>
    </main>
  );
}

function StateReadout({ label, symbol, value, rgb }: { label: string; symbol: string; value: string; rgb: string }) {
  return (
    <div className="rounded-[15px] border border-white/[0.055] bg-black/[0.14] px-3 py-3">
      <div className="flex items-center justify-between gap-3 text-[9px] uppercase tracking-[0.10em] text-slate-600"><span>{label}</span><span className="font-mono" style={{ color: `rgba(${rgb},0.66)` }}>{symbol}</span></div>
      <div className="mt-1 font-mono text-[14px] text-white">{value}</div>
    </div>
  );
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-3 text-[10px]"><span className="text-slate-500">{label}</span><span className="font-mono text-slate-300">{value.toFixed(1)} {unit}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-orange-400" />
    </label>
  );
}

function MotionGraph({ label, symbol, values, activeIndex, rgb }: { label: string; symbol: string; values: number[]; activeIndex: number; rgb: string }) {
  const width = 720;
  const height = 86;
  const paddingX = 18;
  const paddingY = 13;
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 0);
  const span = Math.max(max - min, 1);
  const path = values
    .map((value, index) => {
      const x = paddingX + (index / Math.max(1, values.length - 1)) * (width - paddingX * 2);
      const y = paddingY + ((max - value) / span) * (height - paddingY * 2);
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const activeX = paddingX + (activeIndex / Math.max(1, values.length - 1)) * (width - paddingX * 2);
  const activeValue = values[activeIndex] ?? 0;
  const activeY = paddingY + ((max - activeValue) / span) * (height - paddingY * 2);
  const zeroY = paddingY + ((max - 0) / span) * (height - paddingY * 2);

  return (
    <div className="grid grid-cols-[92px_minmax(0,1fr)] items-center overflow-hidden rounded-[17px] border border-white/[0.055] bg-black/[0.13]">
      <div className="px-3 py-3">
        <div className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">{label}</div>
        <div className="mt-1 font-mono text-[12px]" style={{ color: `rgba(${rgb},0.76)` }}>{symbol}</div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[86px] w-full" role="img" aria-label={`${label} graph`} preserveAspectRatio="none">
        <line x1={paddingX} x2={width - paddingX} y1={zeroY} y2={zeroY} stroke="rgba(148,163,184,0.10)" strokeWidth="1" />
        <path d={path} fill="none" stroke={`rgb(${rgb})`} strokeOpacity="0.78" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
        <line x1={activeX} x2={activeX} y1={8} y2={height - 8} stroke="rgba(255,255,255,0.12)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <circle cx={activeX} cy={activeY} r="4" fill={`rgb(${rgb})`} />
      </svg>
    </div>
  );
}

function ConceptCard({ icon: Icon, number, title, question, body, formula, rgb }: { icon: typeof Gauge; number: string; title: string; question: string; body: string; formula: string; rgb: string }) {
  return (
    <div className="rounded-[21px] border p-4 backdrop-blur-xl" style={{ borderColor: `rgba(${rgb},0.11)`, background: `linear-gradient(145deg, rgba(${rgb},0.038), rgba(2,7,13,0.54))` }}>
      <div className="flex items-center justify-between gap-3"><span className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.62)` }}>{number}</span><Icon size={15} style={{ color: `rgba(${rgb},0.78)` }} /></div>
      <h3 className="mt-4 text-[16px] font-semibold text-white">{title}</h3>
      <div className="mt-1 text-[10px]" style={{ color: `rgba(${rgb},0.68)` }}>{question}</div>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">{body}</p>
      <div className="mt-4 border-t border-white/[0.05] pt-3 text-[13px] text-slate-200"><M>{formula}</M></div>
    </div>
  );
}

function EquationCard({ label, formula, note, rgb }: { label: string; formula: string; note: string; rgb: string }) {
  return (
    <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.14] p-4">
      <div className="text-[9px] font-semibold uppercase tracking-[0.10em]" style={{ color: `rgba(${rgb},0.64)` }}>{label}</div>
      <div className="mt-3 min-h-[42px] text-[14px] text-white"><M>{formula}</M></div>
      <p className="mt-2 text-[10px] leading-5 text-slate-600">{note}</p>
    </div>
  );
}

function Connection({ row, result, rgb }: { row: string; result: string; rgb: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[14px] border border-white/[0.05] bg-black/[0.12] px-3 py-3 text-[10px]">
      <span className="text-slate-500">{row}</span>
      <ArrowRight size={11} className="shrink-0 text-slate-700" />
      <span className="text-right font-medium" style={{ color: `rgba(${rgb},0.72)` }}>{result}</span>
    </div>
  );
}
