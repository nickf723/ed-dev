"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Circle,
  Disc,
  Grid3X3,
  MoveHorizontal,
  Target,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import InequalitiesBackground from "./_components/InequalitiesBackground";

type Relation = "<" | "≤" | ">" | "≥";
type StudioMode = "number" | "plane";

const COEFFICIENTS = [-3, -2, -1, 1, 2, 3] as const;
const RELATIONS: readonly Relation[] = ["<", "≤", ">", "≥"];
const NUMBER_MIN = -10;
const NUMBER_MAX = 10;
const PLANE_MIN = -7;
const PLANE_MAX = 7;

export default function InequalitiesPage() {
  const [mode, setMode] = useState<StudioMode>("number");

  const [coefficient, setCoefficient] = useState(2);
  const [constant, setConstant] = useState(1);
  const [rightSide, setRightSide] = useState(7);
  const [relation, setRelation] = useState<Relation>("≤");
  const [probe, setProbe] = useState(0);

  const [planeSlope, setPlaneSlope] = useState(1);
  const [planeIntercept, setPlaneIntercept] = useState(-1);
  const [planeRelation, setPlaneRelation] = useState<Relation>("≥");
  const [probeX, setProbeX] = useState(2);
  const [probeY, setProbeY] = useState(2);

  const numberSolution = useMemo(
    () => solveLinearInequality(coefficient, constant, rightSide, relation),
    [coefficient, constant, rightSide, relation],
  );

  const numberProbePasses = compare(
    coefficient * probe + constant,
    rightSide,
    relation,
  );
  const planeBoundaryAtProbe = planeSlope * probeX + planeIntercept;
  const planeProbePasses = compare(probeY, planeBoundaryAtProbe, planeRelation);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#071426] text-slate-100 selection:bg-sky-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-35">
        <InequalitiesBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(14,165,233,0.11),transparent_27%),radial-gradient(circle_at_12%_82%,rgba(99,102,241,0.07),transparent_28%),linear-gradient(to_bottom,rgba(7,20,38,0.20),rgba(3,8,18,0.88))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-20 [background-image:linear-gradient(rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.015)_1px,transparent_1px)] [background-size:40px_40px]" />

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
            { label: "Algebraic Inequalities" },
          ]}
          eyebrow="Boundary · Direction · Inclusion · Region"
          icon={MoveHorizontal}
          title={<span>Algebraic Inequalities</span>}
          subtitle="An inequality describes a region of allowed values instead of one exact answer. Learn how boundaries, direction, inclusion, and scaling determine that region."
          accentRgb="14, 165, 233"
          titleClassName="font-mono text-[clamp(2.6rem,4.8vw,5.05rem)] font-semibold uppercase leading-[0.85] tracking-[-0.058em] text-[#f5fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-sky-300/[0.14]"
          aside={
            <div className="rounded-full border border-sky-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[13px] text-sky-200/85 backdrop-blur-md">
              {mode === "number"
                ? `${formatLinearExpression(coefficient, constant)} ${relation} ${rightSide}`
                : `y ${planeRelation} ${formatLine(planeSlope, planeIntercept)}`}
            </div>
          }
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-sky-200/[0.10] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.16fr)_minmax(330px,0.84fr)]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-300/70">Core idea</div>
            <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.035em] text-white">An inequality keeps every value on one side of a boundary.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">
              Equality identifies a boundary. The inequality symbol tells us which side of that boundary survives, and whether the boundary itself is included. In one variable that creates a ray or interval; in two variables it creates a shaded half-plane.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <ConceptFact icon={Target} label="Boundary" text="The value or line where equality would hold." rgb="14, 165, 233" />
            <ConceptFact icon={MoveHorizontal} label="Direction" text="Less than shades one side; greater than shades the other." rgb="99, 102, 241" />
            <ConceptFact icon={Disc} label="Inclusion" text="≤ and ≥ include the boundary; < and > exclude it." rgb="251, 191, 36" />
          </div>
        </section>

        <section className="mt-3 overflow-hidden rounded-[26px] border border-sky-200/[0.12] bg-black/[0.25] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-3 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300/75">Region studio</div>
              <p className="mt-1 text-[13px] text-slate-500">One idea, viewed on a number line or in the coordinate plane.</p>
            </div>
            <div className="grid w-full max-w-[290px] grid-cols-2 gap-2">
              <ModeButton active={mode === "number"} label="Number line" icon={MoveHorizontal} onClick={() => setMode("number")} />
              <ModeButton active={mode === "plane"} label="Half-plane" icon={Grid3X3} onClick={() => setMode("plane")} />
            </div>
          </div>

          {mode === "number" ? (
            <div className="grid gap-3 xl:h-[500px] xl:grid-cols-[320px_minmax(520px,1fr)_330px]">
              <div className="grid min-h-0 content-start gap-3 rounded-[20px] border border-sky-200/[0.08] bg-[#061221]/76 p-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Original inequality</div>
                  <div className="mt-2 font-mono text-[27px] font-semibold tracking-[-0.035em] text-white">
                    {formatLinearExpression(coefficient, constant)} <span className="text-sky-300">{relation}</span> {rightSide}
                  </div>
                </div>

                <div className="rounded-[16px] border border-white/[0.045] bg-white/[0.012] p-3">
                  <div className="text-[10px] font-semibold text-slate-400">Coefficient of x</div>
                  <div className="mt-2 grid grid-cols-6 gap-1.5">
                    {COEFFICIENTS.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setCoefficient(value)}
                        className={`h-9 rounded-lg border font-mono text-[11px] transition-colors ${coefficient === value ? "border-sky-300/[0.30] bg-sky-400/[0.07] text-sky-200" : "border-white/[0.045] bg-black/[0.14] text-slate-500"}`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <SliderControl label="Constant" value={constant} min={-5} max={5} step={1} rgb="99, 102, 241" onChange={setConstant} />
                <SliderControl label="Right side" value={rightSide} min={-5} max={5} step={1} rgb="251, 191, 36" onChange={setRightSide} />
                <RelationPicker value={relation} onChange={setRelation} />
                <SliderControl label="Test value" value={probe} min={NUMBER_MIN} max={NUMBER_MAX} step={1} rgb="52, 211, 153" onChange={setProbe} />
              </div>

              <NumberLinePanel solution={numberSolution} probe={probe} probePasses={numberProbePasses} />

              <div className="grid min-h-0 grid-rows-[auto_1fr] rounded-[20px] border border-indigo-200/[0.09] bg-[#080b1b]/74 p-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-indigo-300/70">Solve the region</div>
                  <div className="mt-2 rounded-[14px] border border-white/[0.045] bg-black/[0.16] px-3 py-3 font-mono text-[22px] text-white">
                    x <span className="text-sky-300">{numberSolution.relation}</span> {formatNumber(numberSolution.boundary)}
                  </div>
                </div>

                <div className="mt-3 grid min-h-0 content-start gap-2">
                  <Readout label="Boundary" value={`x = ${formatNumber(numberSolution.boundary)}`} rgb="14, 165, 233" />
                  <Readout label="Endpoint" value={numberSolution.inclusive ? "closed · included" : "open · excluded"} rgb="251, 191, 36" />
                  <Readout label="Direction" value={numberSolution.greater ? "shade right" : "shade left"} rgb="99, 102, 241" />
                  <Readout label="Interval" value={numberSolution.interval} rgb="192, 132, 252" />
                  <Readout label={`Test x = ${probe}`} value={numberProbePasses ? "satisfies the inequality" : "does not satisfy it"} rgb={numberProbePasses ? "52, 211, 153" : "251, 113, 133"} />

                  <div className={`rounded-[15px] border p-3 ${coefficient < 0 ? "border-rose-300/[0.12] bg-rose-400/[0.025]" : "border-white/[0.045] bg-white/[0.012]"}`}>
                    <div className={`text-[10px] font-semibold uppercase tracking-[0.1em] ${coefficient < 0 ? "text-rose-300/75" : "text-slate-600"}`}>
                      {coefficient < 0 ? "Order reversal" : "Positive scaling"}
                    </div>
                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                      {coefficient < 0
                        ? "Dividing by a negative reverses order, so the inequality symbol flips when x is isolated."
                        : "Dividing by a positive keeps the order unchanged, so the inequality symbol keeps its direction."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-3 xl:h-[500px] xl:grid-cols-[320px_minmax(520px,1fr)_330px]">
              <div className="grid content-start gap-3 rounded-[20px] border border-sky-200/[0.08] bg-[#061221]/76 p-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Boundary inequality</div>
                  <div className="mt-2 font-mono text-[27px] font-semibold tracking-[-0.035em] text-white">
                    y <span className="text-sky-300">{planeRelation}</span> {formatLine(planeSlope, planeIntercept)}
                  </div>
                </div>
                <SliderControl label="Boundary slope" value={planeSlope} min={-3} max={3} step={0.5} rgb="14, 165, 233" onChange={setPlaneSlope} />
                <SliderControl label="Boundary intercept" value={planeIntercept} min={-5} max={5} step={1} rgb="244, 114, 182" onChange={setPlaneIntercept} />
                <RelationPicker value={planeRelation} onChange={setPlaneRelation} />
                <div className="grid grid-cols-2 gap-2">
                  <SliderControl label="Probe x" value={probeX} min={-6} max={6} step={1} rgb="251, 191, 36" onChange={setProbeX} compact />
                  <SliderControl label="Probe y" value={probeY} min={-6} max={6} step={1} rgb="52, 211, 153" onChange={setProbeY} compact />
                </div>
              </div>

              <HalfPlanePanel slope={planeSlope} intercept={planeIntercept} relation={planeRelation} probeX={probeX} probeY={probeY} probePasses={planeProbePasses} />

              <div className="grid min-h-0 grid-rows-[auto_1fr] rounded-[20px] border border-indigo-200/[0.09] bg-[#080b1b]/74 p-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-indigo-300/70">Read the half-plane</div>
                  <p className="mt-1 text-[11px] leading-5 text-slate-600">The equality line is the boundary; the inequality selects one side.</p>
                </div>
                <div className="mt-3 grid content-start gap-2">
                  <Readout label="Boundary" value={`y = ${formatLine(planeSlope, planeIntercept)}`} rgb="14, 165, 233" />
                  <Readout label="Shade" value={isGreaterRelation(planeRelation) ? "above the line" : "below the line"} rgb="99, 102, 241" />
                  <Readout label="Boundary style" value={isInclusive(planeRelation) ? "solid · included" : "dashed · excluded"} rgb="251, 191, 36" />
                  <Readout label={`Probe (${probeX}, ${probeY})`} value={planeProbePasses ? "inside the solution region" : "outside the solution region"} rgb={planeProbePasses ? "52, 211, 153" : "251, 113, 133"} />
                  <div className="rounded-[15px] border border-white/[0.045] bg-white/[0.012] p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-600">Test-point method</div>
                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                      Substitute a point that is not on the boundary. If the statement is true, shade the side containing that point; otherwise shade the opposite side.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="rounded-[22px] border border-rose-200/[0.09] bg-black/[0.20] p-4 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-300/70">Why multiplying by a negative flips the sign</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[15px] border border-white/[0.045] bg-white/[0.012] px-3 py-3 font-mono text-[15px] text-slate-300">
                2 &lt; 5
              </div>
              <div className="rounded-[15px] border border-rose-300/[0.10] bg-rose-400/[0.025] px-3 py-3 font-mono text-[15px] text-rose-200">
                −2 &gt; −5
              </div>
            </div>
            <p className="mt-3 text-[12px] leading-5 text-slate-400">
              Multiplying the number line by a negative reflects it through zero, reversing left and right. That geometric reversal is why order reverses too.
            </p>
          </div>

          <div className="rounded-[22px] border border-indigo-200/[0.09] bg-black/[0.20] p-4 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-300/70">Compound regions</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <CompoundCard
                label="AND"
                subtitle="intersection"
                expression="−2 < x ≤ 5"
                explanation="Keep only values satisfying both boundaries, producing the overlap between them."
                rgb="14, 165, 233"
                variant="and"
              />
              <CompoundCard
                label="OR"
                subtitle="union"
                expression="x < −3  or  x > 4"
                explanation="Keep values satisfying either condition, combining separate solution regions."
                rgb="129, 140, 248"
                variant="or"
              />
            </div>
          </div>
        </section>

        <TopicNavigation />
      </div>
    </main>
  );
}

function ModeButton({ active, label, icon: Icon, onClick }: { active: boolean; label: string; icon: LucideIcon; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`flex h-10 items-center justify-center gap-2 rounded-xl border text-[11px] font-semibold transition-colors ${active ? "border-sky-300/[0.25] bg-sky-400/[0.06] text-sky-200" : "border-white/[0.05] bg-black/[0.16] text-slate-500"}`}>
      <Icon size={14} /> {label}
    </button>
  );
}

function ConceptFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return (
    <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}>
        <Icon size={15} />
      </span>
      <span>
        <strong className="block text-[11px] font-semibold text-slate-300">{label}</strong>
        <span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span>
      </span>
    </div>
  );
}

function SliderControl({ label, value, min, max, step, rgb, onChange, compact = false }: { label: string; value: number; min: number; max: number; step: number; rgb: string; onChange: (value: number) => void; compact?: boolean }) {
  return (
    <label className={`block rounded-[15px] border border-white/[0.045] bg-white/[0.012] ${compact ? "p-2.5" : "p-3"}`}>
      <span className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold text-slate-400">{label}</span>
        <span className="rounded-md px-2 py-1 font-mono text-[10px]" style={{ color: `rgb(${rgb})`, background: `rgba(${rgb},0.06)` }}>{formatNumber(value)}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-sky-400" />
    </label>
  );
}

function RelationPicker({ value, onChange }: { value: Relation; onChange: (value: Relation) => void }) {
  return (
    <div className="rounded-[15px] border border-white/[0.045] bg-white/[0.012] p-3">
      <div className="text-[10px] font-semibold text-slate-400">Relation</div>
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {RELATIONS.map((relation) => (
          <button key={relation} type="button" onClick={() => onChange(relation)} className={`h-9 rounded-lg border font-mono text-[14px] transition-colors ${value === relation ? "border-sky-300/[0.28] bg-sky-400/[0.07] text-sky-200" : "border-white/[0.045] bg-black/[0.14] text-slate-500"}`}>
            {relation}
          </button>
        ))}
      </div>
    </div>
  );
}

function NumberLinePanel({ solution, probe, probePasses }: { solution: ReturnType<typeof solveLinearInequality>; probe: number; probePasses: boolean }) {
  const width = 760;
  const height = 300;
  const left = 52;
  const right = width - 52;
  const y = 150;
  const xFor = (value: number) => left + ((value - NUMBER_MIN) / (NUMBER_MAX - NUMBER_MIN)) * (right - left);
  const boundaryX = xFor(clamp(solution.boundary, NUMBER_MIN, NUMBER_MAX));
  const probeX = xFor(probe);

  return (
    <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[20px] border border-sky-200/[0.10] bg-[#051321]/82 p-4">
      <div className="pointer-events-none absolute left-4 top-4 z-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Solution region</div>
        <div className="mt-1 font-mono text-[12px] text-sky-300/80">x {solution.relation} {formatNumber(solution.boundary)}</div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[820px]" aria-label="Number line showing the inequality solution">
        <line x1={left} y1={y} x2={right} y2={y} stroke="#64748b" strokeWidth="2" />
        {Array.from({ length: 21 }, (_, index) => NUMBER_MIN + index).map((value) => {
          const x = xFor(value);
          return (
            <g key={value}>
              <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="rgba(148,163,184,0.45)" />
              {value % 2 === 0 ? <text x={x} y={y + 28} fill="rgba(148,163,184,0.55)" fontSize="10" textAnchor="middle">{value}</text> : null}
            </g>
          );
        })}

        <line
          x1={solution.greater ? boundaryX : left}
          y1={y}
          x2={solution.greater ? right : boundaryX}
          y2={y}
          stroke="#38bdf8"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.65"
        />
        <circle cx={boundaryX} cy={y} r="10" fill={solution.inclusive ? "#38bdf8" : "#051321"} stroke="#38bdf8" strokeWidth="4" />

        <line x1={probeX} y1={y - 58} x2={probeX} y2={y - 18} stroke={probePasses ? "#34d399" : "#fb7185"} strokeWidth="2" strokeDasharray="4 4" />
        <circle cx={probeX} cy={y - 66} r="7" fill={probePasses ? "#34d399" : "#fb7185"} />
        <text x={probeX} y={y - 84} fill={probePasses ? "#6ee7b7" : "#fda4af"} fontSize="11" textAnchor="middle">x = {probe}</text>
      </svg>
    </div>
  );
}

function HalfPlanePanel({ slope, intercept, relation, probeX, probeY, probePasses }: { slope: number; intercept: number; relation: Relation; probeX: number; probeY: number; probePasses: boolean }) {
  const size = 430;
  const center = size / 2;
  const scale = size / (PLANE_MAX - PLANE_MIN);
  const xFor = (x: number) => center + x * scale;
  const yFor = (y: number) => center - y * scale;
  const leftY = slope * PLANE_MIN + intercept;
  const rightY = slope * PLANE_MAX + intercept;
  const lineLeft = `${xFor(PLANE_MIN)},${yFor(leftY)}`;
  const lineRight = `${xFor(PLANE_MAX)},${yFor(rightY)}`;
  const shadeAbove = isGreaterRelation(relation);
  const polygon = shadeAbove
    ? `0,0 ${size},0 ${lineRight} ${lineLeft}`
    : `${lineLeft} ${lineRight} ${size},${size} 0,${size}`;

  return (
    <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[20px] border border-sky-200/[0.10] bg-[#051321]/82 p-4">
      <div className="pointer-events-none absolute left-4 top-4 z-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Half-plane</div>
        <div className="mt-1 font-mono text-[12px] text-sky-300/80">y {relation} {formatLine(slope, intercept)}</div>
      </div>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full max-h-[445px] w-full max-w-[445px]" aria-label="Coordinate plane with shaded inequality solution region">
        <polygon points={polygon} fill="rgba(56,189,248,0.11)" />
        {Array.from({ length: 15 }, (_, index) => PLANE_MIN + index).map((coord) => {
          const x = xFor(coord);
          const y = yFor(coord);
          return (
            <g key={coord} opacity="0.22">
              <line x1={x} y1="0" x2={x} y2={size} stroke="#38bdf8" strokeWidth="0.7" />
              <line x1="0" y1={y} x2={size} y2={y} stroke="#38bdf8" strokeWidth="0.7" />
            </g>
          );
        })}
        <line x1="0" y1={center} x2={size} y2={center} stroke="#64748b" strokeWidth="1.5" />
        <line x1={center} y1="0" x2={center} y2={size} stroke="#64748b" strokeWidth="1.5" />
        <line
          x1={xFor(PLANE_MIN)}
          y1={yFor(leftY)}
          x2={xFor(PLANE_MAX)}
          y2={yFor(rightY)}
          stroke="#38bdf8"
          strokeWidth="3"
          strokeDasharray={isInclusive(relation) ? undefined : "8 7"}
        />
        <circle cx={xFor(probeX)} cy={yFor(probeY)} r="7" fill={probePasses ? "#34d399" : "#fb7185"} />
        <circle cx={xFor(probeX)} cy={yFor(probeY)} r="13" fill="none" stroke={probePasses ? "rgba(52,211,153,0.45)" : "rgba(251,113,133,0.45)"} />
      </svg>
    </div>
  );
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return (
    <div className="rounded-[14px] border border-white/[0.045] bg-white/[0.012] px-3 py-2.5">
      <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-600">{label}</div>
      <div className="mt-1 text-[11px] font-medium" style={{ color: `rgba(${rgb},0.82)` }}>{value}</div>
    </div>
  );
}

function CompoundCard({ label, subtitle, expression, explanation, rgb, variant }: { label: string; subtitle: string; expression: string; explanation: string; rgb: string; variant: "and" | "or" }) {
  return (
    <div className="rounded-[18px] border p-3.5" style={{ borderColor: `rgba(${rgb},0.14)`, background: `rgba(${rgb},0.025)` }}>
      <div className="flex items-center justify-between gap-3">
        <strong className="text-[15px] text-white">{label}</strong>
        <span className="text-[9px] font-semibold uppercase tracking-[0.1em]" style={{ color: `rgba(${rgb},0.68)` }}>{subtitle}</span>
      </div>
      <MiniCompoundLine variant={variant} rgb={rgb} />
      <div className="mt-3 font-mono text-[12px]" style={{ color: `rgba(${rgb},0.82)` }}>{expression}</div>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">{explanation}</p>
    </div>
  );
}

function MiniCompoundLine({ variant, rgb }: { variant: "and" | "or"; rgb: string }) {
  return (
    <div className="relative mt-3 h-11 overflow-hidden rounded-xl border border-white/[0.04] bg-black/[0.14]">
      <div className="absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 bg-white/[0.12]" />
      {variant === "and" ? (
        <>
          <div className="absolute left-[28%] right-[28%] top-1/2 h-2 -translate-y-1/2 rounded-full" style={{ background: `rgba(${rgb},0.55)` }} />
          <div className="absolute left-[28%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-[#080b1b]" style={{ borderColor: `rgb(${rgb})` }} />
          <div className="absolute right-[28%] top-1/2 h-3.5 w-3.5 translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `rgb(${rgb})` }} />
        </>
      ) : (
        <>
          <div className="absolute left-0 right-[72%] top-1/2 h-2 -translate-y-1/2 rounded-full" style={{ background: `rgba(${rgb},0.55)` }} />
          <div className="absolute left-[28%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-[#080b1b]" style={{ borderColor: `rgb(${rgb})` }} />
          <div className="absolute left-[72%] right-0 top-1/2 h-2 -translate-y-1/2 rounded-full" style={{ background: `rgba(${rgb},0.55)` }} />
          <div className="absolute left-[72%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-[#080b1b]" style={{ borderColor: `rgb(${rgb})` }} />
        </>
      )}
    </div>
  );
}

function TopicNavigation() {
  return (
    <nav className="mt-3 pb-8" aria-label="Integrated Algebra topic navigation">
      <div className="mb-2">
        <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300">
          <ArrowLeft size={12} /> Integrated Algebra map
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations" className="group flex min-h-[74px] items-center gap-3 rounded-[18px] border border-cyan-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-cyan-300/[0.18]">
          <ArrowLeft size={15} className="text-cyan-300 transition-transform group-hover:-translate-x-0.5" />
          <span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-600">Previous Integrated Algebra topic</span>
            <strong className="mt-0.5 block text-[15px] text-slate-200">Systems of Equations</strong>
          </span>
        </Link>
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations" className="group flex min-h-[74px] items-center gap-3 rounded-[18px] border border-rose-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-rose-300/[0.18]">
          <span className="min-w-0 flex-1 text-right">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-600">Next Integrated Algebra topic</span>
            <strong className="mt-0.5 block text-[15px] text-slate-200">Quadratic Equations</strong>
          </span>
          <ArrowRight size={15} className="text-rose-300 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </nav>
  );
}

function solveLinearInequality(a: number, c: number, r: number, relation: Relation) {
  const boundary = (r - c) / a;
  const normalizedRelation = a < 0 ? flipRelation(relation) : relation;
  const greater = isGreaterRelation(normalizedRelation);
  const inclusive = isInclusive(normalizedRelation);
  const value = formatNumber(boundary);
  const interval = greater
    ? `${inclusive ? "[" : "("}${value}, ∞)`
    : `(-∞, ${value}${inclusive ? "]" : ")"}`;
  return { boundary, relation: normalizedRelation, greater, inclusive, interval };
}

function flipRelation(relation: Relation): Relation {
  if (relation === "<") return ">";
  if (relation === "≤") return "≥";
  if (relation === ">") return "<";
  return "≤";
}

function isGreaterRelation(relation: Relation) {
  return relation === ">" || relation === "≥";
}

function isInclusive(relation: Relation) {
  return relation === "≤" || relation === "≥";
}

function compare(left: number, right: number, relation: Relation) {
  if (relation === "<") return left < right;
  if (relation === "≤") return left <= right;
  if (relation === ">") return left > right;
  return left >= right;
}

function formatLinearExpression(a: number, c: number) {
  const ax = a === 1 ? "x" : a === -1 ? "−x" : `${a}x`;
  if (c === 0) return ax;
  return `${ax} ${c > 0 ? "+" : "−"} ${Math.abs(c)}`;
}

function formatLine(slope: number, intercept: number) {
  const mx = slope === 0 ? "0" : slope === 1 ? "x" : slope === -1 ? "−x" : `${formatNumber(slope)}x`;
  if (intercept === 0) return mx;
  return `${mx} ${intercept > 0 ? "+" : "−"} ${Math.abs(intercept)}`;
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) return String(value);
  return Number(value.toFixed(2)).toString();
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
