"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { M } from "@/app/_components/Math";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Gauge,
  MoveRight,
  Orbit,
  Sparkles,
  Timer,
} from "lucide-react";

type MotionPreset = {
  id: string;
  label: string;
  note: string;
  v0: number;
  a: number;
};

const PRESETS: readonly MotionPreset[] = [
  { id: "cruise", label: "Cruise", note: "constant velocity", v0: 3, a: 0 },
  { id: "accelerate", label: "Accelerate", note: "speeding up", v0: 1, a: 1.1 },
  { id: "brake", label: "Brake + reverse", note: "turning point", v0: 5, a: -1.6 },
  { id: "launch", label: "From rest", note: "pure acceleration", v0: 0, a: 1.8 },
] as const;

const DURATION = 6;
const SAMPLE_COUNT = 61;

export default function KinematicsPage() {
  const [v0, setV0] = useState(3);
  const [acceleration, setAcceleration] = useState(0);
  const [time, setTime] = useState(2.4);
  const [activePreset, setActivePreset] = useState("cruise");

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
  const velocity = v0 + acceleration * time;
  const activeIndex = Math.round((time / DURATION) * (SAMPLE_COUNT - 1));
  const positions = samples.map((sample) => sample.x);
  const minX = Math.min(...positions, 0);
  const maxX = Math.max(...positions, 0);
  const spanX = Math.max(maxX - minX, 1);
  const particleLeft = 6 + ((x - minX) / spanX) * 88;
  const turnTime = Math.abs(acceleration) > 0.001 ? -v0 / acceleration : null;
  const hasTurn = turnTime !== null && turnTime >= 0 && turnTime <= DURATION;

  const motionState =
    Math.abs(velocity) < 0.08
      ? "instantaneously at rest"
      : Math.abs(acceleration) < 0.05
        ? "moving at constant velocity"
        : Math.sign(velocity) === Math.sign(acceleration)
          ? "speeding up"
          : "slowing down";

  function applyPreset(preset: MotionPreset) {
    setV0(preset.v0);
    setAcceleration(preset.a);
    setTime(2.4);
    setActivePreset(preset.id);
  }

  function updateV0(value: number) {
    setV0(value);
    setActivePreset("custom");
  }

  function updateAcceleration(value: number) {
    setAcceleration(value);
    setActivePreset("custom");
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070a0f] text-white selection:bg-orange-400/30">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[10%] top-0 h-80 w-80 rounded-full bg-orange-500/[0.09] blur-[110px]" />
        <div className="absolute right-[5%] top-[28%] h-96 w-96 rounded-full bg-cyan-400/[0.07] blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-7 md:px-8 md:pt-10">
        <header className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
              <Link href="/natural-science/physics" className="transition-colors hover:text-white">Physics</Link>
              <span>/</span>
              <Link href="/natural-science/physics/classical-mechanics" className="transition-colors hover:text-white">Classical Mechanics</Link>
              <span>/</span>
              <span className="text-orange-300/80">Kinematics</span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-300/20 bg-orange-400/[0.08] text-orange-300">
                <MoveRight size={19} />
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-300/70">Motion before causes</div>
                <h1 className="mt-1 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">Kinematics</h1>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 md:text-[15px]">
              Describe where an object is, how fast its position changes, and how its velocity changes. Scrub one motion and watch all three descriptions stay synchronized.
            </p>
          </div>

          <Link
            href="/natural-science/physics/classical-mechanics"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-4 py-2 text-[11px] text-slate-300 backdrop-blur-xl transition hover:border-orange-300/25 hover:text-white"
          >
            <ArrowLeft size={13} /> Mechanics map
          </Link>
        </header>

        <section className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.7fr)]">
          <div className="rounded-[30px] border border-white/[0.09] bg-black/[0.24] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-orange-300/70">Motion lab</div>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.025em] text-white">One object, three synchronized stories</h2>
              </div>
              <div className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 font-mono text-[10px] text-slate-400">
                t = {time.toFixed(2)} s
              </div>
            </div>

            <div className="relative mt-6 overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0b1018]/90 px-5 pb-6 pt-12">
              <div className="absolute inset-x-5 top-[72px] h-px bg-gradient-to-r from-transparent via-slate-500/60 to-transparent" />
              <div className="absolute inset-x-5 top-[67px] flex justify-between font-mono text-[8px] text-slate-700">
                <span>{minX.toFixed(1)} m</span>
                <span>{maxX.toFixed(1)} m</span>
              </div>

              <div
                className="absolute top-[55px] transition-[left] duration-75 ease-linear"
                style={{ left: `${Math.min(94, Math.max(6, particleLeft))}%` }}
              >
                <div className="relative -translate-x-1/2">
                  <div className="h-7 w-7 rounded-full border border-orange-200/50 bg-orange-400 shadow-[0_0_30px_rgba(251,146,60,0.45)]" />
                  {Math.abs(velocity) > 0.08 ? (
                    <div
                      className={`absolute top-[13px] h-px bg-cyan-300/80 ${velocity < 0 ? "right-6" : "left-6"}`}
                      style={{ width: `${Math.min(78, 18 + Math.abs(velocity) * 5)}px` }}
                    >
                      <span className={`absolute -top-[4px] h-2 w-2 rotate-45 border-cyan-300 ${velocity < 0 ? "left-0 border-b border-l" : "right-0 border-r border-t"}`} />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-20 grid gap-3 sm:grid-cols-3">
                <Readout icon={Orbit} label="position" symbol="x" value={`${x.toFixed(2)} m`} note="where it is" />
                <Readout icon={Gauge} label="velocity" symbol="v" value={`${velocity.toFixed(2)} m/s`} note="position changing" />
                <Readout icon={Activity} label="acceleration" symbol="a" value={`${acceleration.toFixed(2)} m/s²`} note="velocity changing" />
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.11em] text-slate-600">
                  <span>scrub time</span>
                  <span>{motionState}</span>
                </div>
                <input
                  aria-label="Time"
                  type="range"
                  min="0"
                  max={DURATION}
                  step="0.02"
                  value={time}
                  onChange={(event) => setTime(Number(event.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-orange-400"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <MotionGraph
                label="Position vs. time"
                symbol="x(t)"
                samples={samples.map((sample) => sample.x)}
                activeIndex={activeIndex}
                value={`${x.toFixed(2)} m`}
                accent="orange"
              />
              <MotionGraph
                label="Velocity vs. time"
                symbol="v(t)"
                samples={samples.map((sample) => sample.v)}
                activeIndex={activeIndex}
                value={`${velocity.toFixed(2)} m/s`}
                accent="cyan"
              />
              <MotionGraph
                label="Acceleration vs. time"
                symbol="a(t)"
                samples={samples.map((sample) => sample.a)}
                activeIndex={activeIndex}
                value={`${acceleration.toFixed(2)} m/s²`}
                accent="violet"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[26px] border border-white/[0.09] bg-black/[0.22] p-5 backdrop-blur-2xl">
              <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                <Sparkles size={12} className="text-orange-300" /> Try a motion
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={`rounded-[16px] border px-3 py-3 text-left transition ${activePreset === preset.id ? "border-orange-300/30 bg-orange-400/[0.08]" : "border-white/[0.06] bg-white/[0.018] hover:border-white/[0.12]"}`}
                  >
                    <span className="block text-[11px] font-semibold text-white">{preset.label}</span>
                    <span className="mt-1 block text-[9px] text-slate-600">{preset.note}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 space-y-5 border-t border-white/[0.06] pt-5">
                <Control
                  label="Initial velocity"
                  value={v0}
                  min={-6}
                  max={6}
                  step={0.1}
                  unit="m/s"
                  onChange={updateV0}
                />
                <Control
                  label="Acceleration"
                  value={acceleration}
                  min={-4}
                  max={4}
                  step={0.1}
                  unit="m/s²"
                  onChange={updateAcceleration}
                />
              </div>
            </div>

            <div className="rounded-[26px] border border-orange-300/[0.13] bg-orange-400/[0.035] p-5 backdrop-blur-2xl">
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-orange-300/70">What the graphs are saying</div>
              <div className="mt-3 text-[13px] leading-6 text-slate-300">
                {Math.abs(acceleration) < 0.05 ? (
                  <p>Zero acceleration keeps velocity flat, so position changes at a constant rate. The position graph is a straight line.</p>
                ) : hasTurn ? (
                  <p>
                    Velocity reaches zero at about <strong className="text-white">{turnTime?.toFixed(2)} s</strong>. That instant is also a turning point on the position graph.
                  </p>
                ) : (
                  <p>Constant acceleration makes velocity change linearly. Position bends because the distance added each second is itself changing.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <ConceptCard
            number="01"
            title="Position"
            question="Where is it?"
            body="Position is a location relative to a chosen origin. A change in position is displacement."
            formula="\\Delta x = x_f - x_i"
          />
          <ConceptCard
            number="02"
            title="Velocity"
            question="How is position changing?"
            body="Velocity is directional. Its sign tells which way the object moves along the chosen axis."
            formula="v = \\frac{\\Delta x}{\\Delta t}"
          />
          <ConceptCard
            number="03"
            title="Acceleration"
            question="How is velocity changing?"
            body="Acceleration can change speed, direction, or both. Negative acceleration does not automatically mean slowing down."
            formula="a = \\frac{\\Delta v}{\\Delta t}"
          />
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <div className="rounded-[28px] border border-white/[0.09] bg-black/[0.2] p-5 backdrop-blur-2xl md:p-6">
            <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/70">
              <Timer size={12} /> Constant-acceleration model
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Three equations describe the same motion.</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <EquationCard label="position" formula="x = x_0 + v_0t + \\frac{1}{2}at^2" />
              <EquationCard label="velocity" formula="v = v_0 + at" />
              <EquationCard label="acceleration" formula="a = \\text{constant}" />
            </div>
            <p className="mt-4 max-w-3xl text-[12px] leading-6 text-slate-500">
              These are not three unrelated formulas to memorize. They are three views of one assumption: acceleration stays constant during the interval.
            </p>
          </div>

          <div className="rounded-[28px] border border-blue-300/[0.14] bg-blue-400/[0.035] p-5 backdrop-blur-2xl md:p-6">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300/75">Algebra bridge</div>
            <h2 className="mt-2 text-xl font-semibold tracking-[-0.025em]">Acceleration draws a parabola.</h2>
            <p className="mt-3 text-[12px] leading-6 text-slate-400">
              When acceleration is nonzero, position contains a t² term. That makes position a quadratic function of time. If the motion reverses, the instant where v = 0 lines up with the quadratic&apos;s vertex.
            </p>
            <Link
              href="/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations/patterns-parabolas"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/[0.07] px-4 py-2 text-[11px] font-medium text-blue-100 transition hover:border-blue-200/35 hover:bg-blue-400/[0.11]"
            >
              See the same shape in Quadratics <ArrowRight size={13} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Readout({ icon: Icon, label, symbol, value, note }: { icon: typeof Orbit; label: string; symbol: string; value: string; note: string }) {
  return (
    <div className="rounded-[17px] border border-white/[0.06] bg-black/[0.18] p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.1em] text-slate-600"><Icon size={11} /> {label}</span>
        <span className="font-mono text-[9px] text-slate-700">{symbol}</span>
      </div>
      <div className="mt-2 font-mono text-[15px] text-white">{value}</div>
      <div className="mt-1 text-[9px] text-slate-700">{note}</div>
    </div>
  );
}

function Control({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-3 text-[10px]">
        <span className="text-slate-500">{label}</span>
        <span className="font-mono text-slate-200">{value.toFixed(1)} {unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-orange-400"
      />
    </label>
  );
}

function ConceptCard({ number, title, question, body, formula }: { number: string; title: string; question: string; body: string; formula: string }) {
  return (
    <div className="rounded-[24px] border border-white/[0.07] bg-white/[0.018] p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-orange-300/65">{number}</span>
        <span className="text-[9px] uppercase tracking-[0.11em] text-slate-700">{question}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
      <div className="mt-2 text-[14px] text-slate-300"><M>{formula}</M></div>
      <p className="mt-3 text-[11px] leading-5 text-slate-500">{body}</p>
    </div>
  );
}

function EquationCard({ label, formula }: { label: string; formula: string }) {
  return (
    <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.16] p-4">
      <div className="text-[9px] uppercase tracking-[0.11em] text-slate-600">{label}</div>
      <div className="mt-3 overflow-x-auto text-[14px] text-white"><M>{formula}</M></div>
    </div>
  );
}

function MotionGraph({ label, symbol, samples, activeIndex, value, accent }: { label: string; symbol: string; samples: number[]; activeIndex: number; value: string; accent: "orange" | "cyan" | "violet" }) {
  const width = 260;
  const height = 112;
  const padding = 12;
  const min = Math.min(...samples);
  const max = Math.max(...samples);
  const span = Math.max(max - min, 0.5);
  const zeroY = padding + ((max - 0) / span) * (height - padding * 2);
  const hasZero = min <= 0 && max >= 0;
  const points = samples
    .map((sample, index) => {
      const px = padding + (index / Math.max(samples.length - 1, 1)) * (width - padding * 2);
      const py = padding + ((max - sample) / span) * (height - padding * 2);
      return `${px.toFixed(1)},${py.toFixed(1)}`;
    })
    .join(" ");
  const safeActiveIndex = Math.min(samples.length - 1, Math.max(0, activeIndex));
  const activeX = padding + (safeActiveIndex / Math.max(samples.length - 1, 1)) * (width - padding * 2);
  const activeY = padding + ((max - samples[safeActiveIndex]) / span) * (height - padding * 2);
  const stroke = accent === "orange" ? "#fb923c" : accent === "cyan" ? "#22d3ee" : "#a78bfa";

  return (
    <div className="rounded-[20px] border border-white/[0.065] bg-[#080c12]/85 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[9px] font-medium text-slate-400">{label}</div>
          <div className="mt-0.5 font-mono text-[8px] text-slate-700">{symbol}</div>
        </div>
        <div className="font-mono text-[9px] text-slate-500">{value}</div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="mt-2 h-28 w-full" role="img" aria-label={label}>
        <line x1={padding} x2={width - padding} y1={height - padding} y2={height - padding} stroke="rgba(148,163,184,0.13)" strokeWidth="1" />
        {hasZero ? <line x1={padding} x2={width - padding} y1={zeroY} y2={zeroY} stroke="rgba(148,163,184,0.12)" strokeDasharray="3 4" /> : null}
        <polyline points={points} fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <line x1={activeX} x2={activeX} y1={padding} y2={height - padding} stroke="rgba(255,255,255,0.12)" strokeDasharray="2 3" />
        <circle cx={activeX} cy={activeY} r="4" fill={stroke} stroke="#070a0f" strokeWidth="2" />
      </svg>
    </div>
  );
}
