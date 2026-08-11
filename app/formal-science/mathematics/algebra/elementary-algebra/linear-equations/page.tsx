"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Crosshair,
  Grid3X3,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LinearBackground from "./_components/LinearBackground";

const GRAPH_MIN = -7;
const GRAPH_MAX = 7;
const SAMPLE_XS = [-2, -1, 0, 1, 2] as const;

export default function LinearEquationsPage() {
  const [slope, setSlope] = useState(2);
  const [intercept, setIntercept] = useState(-1);
  const [probeX, setProbeX] = useState(2);

  const probeY = slope * probeX + intercept;
  const xIntercept = slope === 0 ? null : -intercept / slope;
  const samplePoints = useMemo(
    () => SAMPLE_XS.map((x) => ({ x, y: slope * x + intercept })),
    [intercept, slope],
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#041018] text-slate-100 selection:bg-teal-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-55">
        <LinearBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_76%_13%,rgba(45,212,191,0.11),transparent_26%),radial-gradient(circle_at_13%_80%,rgba(59,130,246,0.07),transparent_27%),linear-gradient(to_bottom,rgba(4,16,24,0.18),rgba(2,8,14,0.86))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-22 [background-image:linear-gradient(rgba(45,212,191,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.022)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Formal Sciences", href: "/formal-science" },
            { label: "Mathematics", href: "/formal-science/mathematics" },
            { label: "Algebra", href: "/formal-science/mathematics/algebra" },
            {
              label: "Integrated Algebra",
              href: "/formal-science/mathematics/algebra/elementary-algebra",
            },
            { label: "Graphing Linear Equations" },
          ]}
          eyebrow="Rate · Intercept · Point · Line"
          icon={TrendingUp}
          title={<span>Graphing Linear Equations</span>}
          subtitle="A linear equation describes an entire straight-line relationship. Learn to read its rate of change, locate its intercepts, and move between an equation and the points that satisfy it."
          accentRgb="45, 212, 191"
          titleClassName="font-mono text-[clamp(2.7rem,4.9vw,5.15rem)] font-semibold uppercase leading-[0.85] tracking-[-0.058em] text-[#f4fffe]"
          iconClassName="rounded-[16px]"
          headerClassName="border-teal-300/[0.14]"
          aside={
            <div className="rounded-full border border-teal-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[13px] text-teal-200/85 backdrop-blur-md">
              {formatSlopeIntercept(slope, intercept)}
            </div>
          }
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-teal-200/[0.10] bg-black/[0.21] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.16fr)_minmax(320px,0.84fr)]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-teal-300/70">Core idea</div>
            <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.035em] text-white">A line is the full solution set of a two-variable equation.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">
              In an equation such as <span className="font-mono text-teal-200">y = 2x − 1</span>, every allowed x-value produces a y-value. Plot all of those ordered pairs and they align on one straight line because the same change in x always produces the same proportional change in y.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <ConceptFact icon={TrendingUp} label="Slope m" text="How much y changes when x increases by 1." rgb="45, 212, 191" />
            <ConceptFact icon={Target} label="Y-intercept b" text="The output when x = 0, so the line crosses at (0, b)." rgb="244, 114, 182" />
            <ConceptFact icon={Crosshair} label="Point (x, y)" text="A solution only when its coordinates make the equation true." rgb="251, 191, 36" />
          </div>
        </section>

        <section className="mt-3 rounded-[26px] border border-teal-200/[0.12] bg-black/[0.24] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-300/75">Line studio</div>
              <p className="mt-1 text-[13px] text-slate-500">Change one relationship and watch its equation, geometry, sample values, and alternate forms move together.</p>
            </div>
            <div className="font-mono text-[11px] text-slate-600">equation ↔ graph ↔ points ↔ forms</div>
          </div>

          <div className="grid items-stretch gap-3 xl:min-h-[560px] xl:grid-cols-[300px_minmax(520px,1fr)_320px]">
            <div className="grid content-start gap-3 rounded-[20px] border border-teal-200/[0.08] bg-[#041117]/76 p-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Slope-intercept form</div>
                <div className="mt-2 font-mono text-[29px] font-semibold tracking-[-0.04em] text-white">{formatSlopeIntercept(slope, intercept)}</div>
              </div>

              <SliderControl label="Slope" symbol="m" value={slope} min={-3} max={3} step={0.5} rgb="45, 212, 191" onChange={setSlope} />
              <SliderControl label="Y-intercept" symbol="b" value={intercept} min={-5} max={5} step={1} rgb="244, 114, 182" onChange={setIntercept} />
              <SliderControl label="Probe x-value" symbol="x" value={probeX} min={-6} max={6} step={1} rgb="251, 191, 36" onChange={setProbeX} />

              <div className="rounded-[16px] border border-white/[0.05] bg-white/[0.014] p-3.5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.10em] text-slate-600">Read it aloud</div>
                <p className="mt-2 text-[12px] leading-5 text-slate-400">
                  Start at <strong className="text-pink-300">(0, {formatNumber(intercept)})</strong>. For every +1 in x, y changes by <strong className="text-teal-300">{formatSigned(slope)}</strong>.
                </p>
              </div>
            </div>

            <LineGraph slope={slope} intercept={intercept} probeX={probeX} probeY={probeY} xIntercept={xIntercept} samplePoints={samplePoints} />

            <div className="grid content-start gap-3">
              <div className="min-h-[214px] rounded-[20px] border border-teal-200/[0.08] bg-[#041117]/72 p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Read the line</div>
                <div className="mt-3 grid gap-2">
                  <Readout label="Direction" value={slope === 0 ? "horizontal" : slope > 0 ? "rises left → right" : "falls left → right"} rgb="45, 212, 191" />
                  <Readout label="Y-intercept" value={`(0, ${formatNumber(intercept)})`} rgb="244, 114, 182" />
                  <Readout label="X-intercept" value={xIntercept === null ? "none" : `(${formatNumber(xIntercept)}, 0)`} rgb="251, 191, 36" />
                  <Readout label={`At x = ${probeX}`} value={`y = ${formatNumber(probeY)}`} rgb="96, 165, 250" />
                </div>
              </div>

              <div className="rounded-[20px] border border-indigo-200/[0.09] bg-[#080b18]/72 p-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-indigo-300/70">Same line, different forms</div>
                  <p className="mt-1 text-[11px] leading-5 text-slate-600">The notation changes; the solution set does not.</p>
                </div>
                <div className="mt-3 grid gap-2">
                  <EquationForm label="Slope-intercept" equation={formatSlopeIntercept(slope, intercept)} rgb="45, 212, 191" />
                  <EquationForm label="Point-slope" equation={formatPointSlope(slope, probeX, probeY)} rgb="96, 165, 250" />
                  <EquationForm label="Standard" equation={formatStandard(slope, intercept)} rgb="129, 140, 248" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
          <div className="rounded-[22px] border border-teal-200/[0.09] bg-black/[0.20] p-4 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-300/70">From equation to graph</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <ProcessStep number="01" title="Plot b" text={`Mark the y-intercept at (0, ${formatNumber(intercept)}).`} rgb="244, 114, 182" />
              <ProcessStep number="02" title="Use m" text={`Move 1 unit right and ${slope >= 0 ? "up" : "down"} ${formatNumber(Math.abs(slope))}.`} rgb="45, 212, 191" />
              <ProcessStep number="03" title="Extend" text="A linear relationship continues through every point with the same rate of change." rgb="96, 165, 250" />
            </div>
          </div>

          <div className="rounded-[22px] border border-amber-200/[0.09] bg-black/[0.20] p-4 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300/70">Boundary case</div>
            <h3 className="mt-2 text-[19px] font-semibold text-white">Vertical lines need a different form.</h3>
            <p className="mt-2 text-[12px] leading-5 text-slate-400">
              A vertical line has equation <span className="font-mono text-amber-200">x = c</span>. Its run is zero, so its slope is undefined and it cannot be written as <span className="font-mono text-teal-200">y = mx + b</span>.
            </p>
          </div>
        </section>

        <TopicNavigation />
      </div>
    </main>
  );
}

function SliderControl({ label, symbol, value, min, max, step, rgb, onChange }: { label: string; symbol: string; value: number; min: number; max: number; step: number; rgb: string; onChange: (value: number) => void }) {
  return (
    <label className="block rounded-[16px] border border-white/[0.045] bg-white/[0.012] p-3">
      <span className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold text-slate-400">{label} <span className="font-mono text-slate-600">({symbol})</span></span>
        <span className="rounded-md px-2 py-1 font-mono text-[11px]" style={{ color: `rgb(${rgb})`, background: `rgba(${rgb},0.06)` }}>{formatNumber(value)}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-teal-400" />
    </label>
  );
}

function LineGraph({ slope, intercept, probeX, probeY, xIntercept, samplePoints }: { slope: number; intercept: number; probeX: number; probeY: number; xIntercept: number | null; samplePoints: readonly { x: number; y: number }[] }) {
  const size = 420;
  const center = size / 2;
  const scale = size / (GRAPH_MAX - GRAPH_MIN);
  const xFor = (x: number) => center + x * scale;
  const yFor = (y: number) => center - y * scale;
  const yAtMin = slope * GRAPH_MIN + intercept;
  const yAtMax = slope * GRAPH_MAX + intercept;
  const triangleY = intercept + slope;
  const showTriangle = inGraph(intercept) && inGraph(triangleY);

  return (
    <div className="relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-[20px] border border-teal-200/[0.10] bg-[#031018]/82 p-4">
      <div className="pointer-events-none absolute left-4 top-4 z-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Coordinate plane</div>
        <div className="mt-1 font-mono text-[12px] text-teal-300/80">{formatSlopeIntercept(slope, intercept)}</div>
      </div>

      <svg viewBox={`0 0 ${size} ${size}`} className="h-full max-h-[450px] w-full max-w-[450px]" aria-label="Graph of the current linear equation">
        {Array.from({ length: 15 }, (_, index) => {
          const coord = GRAPH_MIN + index;
          const pos = xFor(coord);
          const yPos = yFor(coord);
          return (
            <g key={coord}>
              <line x1={pos} y1="0" x2={pos} y2={size} stroke="#2dd4bf" strokeWidth="0.65" opacity="0.16" />
              <line x1="0" y1={yPos} x2={size} y2={yPos} stroke="#2dd4bf" strokeWidth="0.65" opacity="0.16" />
            </g>
          );
        })}
        <line x1="0" y1={center} x2={size} y2={center} stroke="#64748b" strokeWidth="1.5" />
        <line x1={center} y1="0" x2={center} y2={size} stroke="#64748b" strokeWidth="1.5" />
        <line x1={xFor(GRAPH_MIN)} y1={yFor(yAtMin)} x2={xFor(GRAPH_MAX)} y2={yFor(yAtMax)} stroke="#2dd4bf" strokeWidth="3" />

        {showTriangle ? (
          <g>
            <line x1={xFor(0)} y1={yFor(intercept)} x2={xFor(1)} y2={yFor(intercept)} stroke="#fbbf24" strokeWidth="2" strokeDasharray="5 5" />
            <line x1={xFor(1)} y1={yFor(intercept)} x2={xFor(1)} y2={yFor(triangleY)} stroke="#fbbf24" strokeWidth="2" strokeDasharray="5 5" />
          </g>
        ) : null}

        {samplePoints.map((point) => inGraph(point.y) ? <circle key={point.x} cx={xFor(point.x)} cy={yFor(point.y)} r="3.5" fill="#60a5fa" opacity="0.72" /> : null)}
        {inGraph(intercept) ? <circle cx={xFor(0)} cy={yFor(intercept)} r="5" fill="#f472b6" /> : null}
        {xIntercept !== null && inGraph(xIntercept) ? <circle cx={xFor(xIntercept)} cy={yFor(0)} r="5" fill="#fbbf24" /> : null}
        {inGraph(probeY) ? (
          <g>
            <circle cx={xFor(probeX)} cy={yFor(probeY)} r="7" fill="#020617" stroke="#a7f3d0" strokeWidth="2.5" />
            <circle cx={xFor(probeX)} cy={yFor(probeY)} r="2.5" fill="#a7f3d0" />
          </g>
        ) : null}
      </svg>

      <div className="absolute bottom-4 left-4 rounded-xl border border-white/[0.05] bg-black/55 px-3 py-2 font-mono text-[10px] text-slate-500">
        <span className="text-pink-300">●</span> y-int&nbsp;&nbsp; <span className="text-amber-300">●</span> x-int&nbsp;&nbsp; <span className="text-emerald-200">○</span> probe
      </div>
    </div>
  );
}

function ConceptFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return (
    <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border border-white/[0.045] bg-white/[0.012] p-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.18)`, background: `rgba(${rgb},0.04)` }}><Icon size={15} strokeWidth={1.5} /></span>
      <span><strong className="block text-[11px] font-semibold text-slate-300">{label}</strong><span className="mt-1 block text-[11px] leading-4 text-slate-500">{text}</span></span>
    </div>
  );
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="flex min-h-[36px] items-center justify-between gap-3 rounded-xl border border-white/[0.04] bg-black/[0.15] px-3 py-2"><span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600">{label}</span><span className="font-mono text-[11px] text-right" style={{ color: `rgba(${rgb},0.82)` }}>{value}</span></div>;
}

function EquationForm({ label, equation, rgb }: { label: string; equation: string; rgb: string }) {
  return <div className="grid min-h-[70px] grid-cols-[92px_minmax(0,1fr)] items-center gap-3 rounded-xl border border-white/[0.045] bg-black/[0.14] px-3 py-2.5"><span className="text-[10px] font-semibold text-slate-600">{label}</span><span className="font-mono text-[12px] leading-5" style={{ color: `rgba(${rgb},0.84)` }}>{equation}</span></div>;
}

function ProcessStep({ number, title, text, rgb }: { number: string; title: string; text: string; rgb: string }) {
  return <div className="rounded-[16px] border p-3" style={{ borderColor: `rgba(${rgb},0.13)`, background: `rgba(${rgb},0.022)` }}><div className="font-mono text-[10px] font-semibold" style={{ color: `rgba(${rgb},0.70)` }}>{number}</div><h3 className="mt-1 text-[14px] font-semibold text-white">{title}</h3><p className="mt-1.5 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function TopicNavigation() {
  return (
    <nav className="mt-3 pb-8" aria-label="Integrated Algebra topic navigation">
      <div className="mb-2">
        <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300"><Grid3X3 size={12} /> Integrated Algebra map</Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/fundamentals" className="group flex min-h-[76px] items-center gap-3 rounded-[18px] border border-emerald-300/[0.10] bg-emerald-400/[0.018] px-4 py-3 transition-colors hover:border-emerald-300/[0.20] hover:bg-emerald-400/[0.035]"><ArrowLeft size={15} className="text-emerald-300 transition-transform group-hover:-translate-x-0.5" /><span className="min-w-0"><span className="block text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-600">Previous Integrated Algebra topic</span><strong className="mt-0.5 block text-[15px] text-slate-200">Algebra Fundamentals</strong></span></Link>
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations" className="group flex min-h-[76px] items-center gap-3 rounded-[18px] border border-amber-300/[0.11] bg-amber-400/[0.02] px-4 py-3 transition-colors hover:border-amber-300/[0.21] hover:bg-amber-400/[0.038]"><span className="min-w-0 flex-1 text-right"><span className="block text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-600">Next Integrated Algebra topic</span><strong className="mt-0.5 block text-[15px] text-slate-200">Systems of Equations</strong></span><ArrowRight size={15} className="text-amber-300 transition-transform group-hover:translate-x-0.5" /></Link>
      </div>
    </nav>
  );
}

function formatSlopeIntercept(slope: number, intercept: number) {
  const slopePart = slope === 1 ? "x" : slope === -1 ? "−x" : `${formatNumber(slope)}x`;
  if (intercept === 0) return `y = ${slopePart}`;
  return `y = ${slopePart} ${intercept > 0 ? "+" : "−"} ${formatNumber(Math.abs(intercept))}`;
}

function formatPointSlope(slope: number, x: number, y: number) {
  const ySide = y === 0 ? "y" : `y ${y > 0 ? "−" : "+"} ${formatNumber(Math.abs(y))}`;
  const xSide = x === 0 ? "x" : `x ${x > 0 ? "−" : "+"} ${formatNumber(Math.abs(x))}`;
  const slopeFactor = slope === 1 ? "" : slope === -1 ? "−" : formatNumber(slope);
  return `${ySide} = ${slopeFactor}(${xSide})`;
}

function formatStandard(slope: number, intercept: number) {
  const denominator = Number.isInteger(slope) ? 1 : 2;
  const numerator = Math.round(slope * denominator);
  let a = -numerator;
  let b = denominator;
  let c = Math.round(intercept * denominator);
  if (a < 0) { a *= -1; b *= -1; c *= -1; }
  if (a === 0) return `y = ${formatNumber(c / b)}`;
  const ax = a === 1 ? "x" : `${a}x`;
  const byMagnitude = Math.abs(b) === 1 ? "y" : `${Math.abs(b)}y`;
  return `${ax} ${b >= 0 ? "+" : "−"} ${byMagnitude} = ${c}`;
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) return String(value);
  return Number(value.toFixed(2)).toString();
}

function formatSigned(value: number) {
  if (value > 0) return `+${formatNumber(value)}`;
  return formatNumber(value);
}

function inGraph(value: number) {
  return value >= GRAPH_MIN && value <= GRAPH_MAX;
}
