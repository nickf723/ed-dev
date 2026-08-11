"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Crosshair,
  Equal,
  GitMerge,
  Layers,
  RefreshCw,
  Target,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import SystemsBackground from "./_components/SystemsBackground";

type Method = "graph" | "substitution" | "elimination";
type SystemStatus = "one" | "none" | "infinite";

type Solution = {
  status: SystemStatus;
  x?: number;
  y?: number;
};

type MethodStep = {
  label: string;
  equation: string;
  note: string;
};

const GRAPH_MIN = -7;
const GRAPH_MAX = 7;

export default function SystemsPage() {
  const [m1, setM1] = useState(1);
  const [b1, setB1] = useState(2);
  const [m2, setM2] = useState(-1);
  const [b2, setB2] = useState(4);
  const [method, setMethod] = useState<Method>("graph");

  const solution = useMemo(() => solveSystem(m1, b1, m2, b2), [m1, b1, m2, b2]);
  const methodSteps = useMemo(
    () => buildMethodSteps(method, solution, m1, b1, m2, b2),
    [method, solution, m1, b1, m2, b2],
  );

  const applyPreset = (preset: "one" | "none" | "infinite") => {
    if (preset === "one") {
      setM1(1);
      setB1(2);
      setM2(-1);
      setB2(4);
    } else if (preset === "none") {
      setM1(1);
      setB1(2);
      setM2(1);
      setB2(-2);
    } else {
      setM1(1);
      setB1(2);
      setM2(1);
      setB2(2);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#04060f] text-slate-100 selection:bg-cyan-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-62">
        <SystemsBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_77%_13%,rgba(6,182,212,0.10),transparent_27%),radial-gradient(circle_at_13%_80%,rgba(249,115,22,0.07),transparent_27%),linear-gradient(to_bottom,rgba(4,6,15,0.20),rgba(2,4,10,0.88))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-20 [background-image:linear-gradient(rgba(6,182,212,0.020)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.015)_1px,transparent_1px)] [background-size:40px_40px]" />

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
            { label: "Systems of Equations" },
          ]}
          eyebrow="Constraint · Intersection · Equivalence"
          icon={Layers}
          title={<span>Systems of Equations</span>}
          subtitle="A system asks for values that satisfy several equations at once. Graphing, substitution, and elimination are different ways of locating the same shared solution set."
          accentRgb="6, 182, 212"
          titleClassName="font-mono text-[clamp(2.7rem,4.9vw,5.15rem)] font-semibold uppercase leading-[0.85] tracking-[-0.058em] text-[#f4fdff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-cyan-300/[0.14]"
          aside={
            <div className="flex items-center gap-2 rounded-full border border-cyan-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[13px] text-cyan-200/85 backdrop-blur-md">
              <span>{formatLine(m1, b1)}</span>
              <span className="text-slate-700">+</span>
              <span className="text-orange-200/85">{formatLine(m2, b2)}</span>
            </div>
          }
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-cyan-200/[0.10] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.15fr)_minmax(330px,0.85fr)]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/70">Core idea</div>
            <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.035em] text-white">A solution must survive every constraint in the system.</h2>
            <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-400">
              Each equation describes its own set of ordered pairs. The system keeps only the points shared by all of those sets. For two linear equations, that geometry can produce exactly one point, no shared points, or an entire shared line.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <ConceptFact icon={Crosshair} label="One solution" text="Distinct lines cross once." rgb="16, 185, 129" />
            <ConceptFact icon={GitMerge} label="No solution" text="Parallel distinct lines never meet." rgb="251, 113, 133" />
            <ConceptFact icon={Equal} label="Infinite solutions" text="Equivalent equations describe the same line." rgb="163, 230, 53" />
          </div>
        </section>

        <section className="mt-3 overflow-hidden rounded-[26px] border border-cyan-200/[0.12] bg-black/[0.25] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300/75">Constraint studio</div>
              <p className="mt-1 text-[13px] text-slate-500">Change the two constraints, then solve the same system by graphing, substitution, or elimination.</p>
            </div>
            <div className="font-mono text-[11px] text-slate-600">two constraints → shared solution set</div>
          </div>

          <div className="grid gap-3 xl:h-[540px] xl:grid-cols-[310px_minmax(520px,1fr)_360px]">
            <div className="grid min-h-0 grid-rows-[auto_auto_auto_minmax(0,1fr)] gap-3 rounded-[20px] border border-cyan-200/[0.08] bg-[#040a14]/78 p-4">
              <LineControl
                label="Constraint A"
                equation={formatLine(m1, b1)}
                slope={m1}
                intercept={b1}
                rgb="6, 182, 212"
                onSlope={setM1}
                onIntercept={setB1}
              />
              <LineControl
                label="Constraint B"
                equation={formatLine(m2, b2)}
                slope={m2}
                intercept={b2}
                rgb="249, 115, 22"
                onSlope={setM2}
                onIntercept={setB2}
              />

              <div className="grid grid-cols-3 gap-2">
                <PresetButton label="1 solution" onClick={() => applyPreset("one")} />
                <PresetButton label="None" onClick={() => applyPreset("none")} />
                <PresetButton label="Infinite" onClick={() => applyPreset("infinite")} />
              </div>

              <SolutionReadout solution={solution} />
            </div>

            <SystemGraph m1={m1} b1={b1} m2={m2} b2={b2} solution={solution} />

            <div className="grid min-h-0 grid-rows-[auto_1fr] rounded-[20px] border border-indigo-200/[0.09] bg-[#080918]/76 p-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-indigo-300/70">Solve the same system</div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <MethodButton active={method === "graph"} label="Graph" icon={Crosshair} rgb="6, 182, 212" onClick={() => setMethod("graph")} />
                  <MethodButton active={method === "substitution"} label="Substitute" icon={RefreshCw} rgb="249, 115, 22" onClick={() => setMethod("substitution")} />
                  <MethodButton active={method === "elimination"} label="Eliminate" icon={GitMerge} rgb="129, 140, 248" onClick={() => setMethod("elimination")} />
                </div>
              </div>

              <div className="mt-3 grid min-h-0 grid-rows-[auto_1fr] rounded-[16px] border border-white/[0.05] bg-black/[0.16] p-3.5">
                <MethodSummary method={method} solution={solution} />
                <div className="mt-3 grid min-h-0 content-start gap-2">
                  {methodSteps.map((step, index) => (
                    <MethodStepCard key={`${method}-${index}`} index={index + 1} step={step} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
          <div className="rounded-[22px] border border-cyan-200/[0.09] bg-black/[0.20] p-4 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-300/70">Three geometries</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <GeometryState active={solution.status === "one"} title="Cross once" equation="m₁ ≠ m₂" result="one solution" rgb="16, 185, 129" />
              <GeometryState active={solution.status === "none"} title="Never cross" equation="m₁ = m₂, b₁ ≠ b₂" result="no solution" rgb="251, 113, 133" />
              <GeometryState active={solution.status === "infinite"} title="Same line" equation="m₁ = m₂, b₁ = b₂" result="infinitely many" rgb="163, 230, 53" />
            </div>
          </div>

          <div className="rounded-[22px] border border-amber-200/[0.09] bg-black/[0.20] p-4 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300/70">Method choice</div>
            <h3 className="mt-2 text-[19px] font-semibold text-white">Choose the representation that exposes structure.</h3>
            <p className="mt-2 text-[12px] leading-5 text-slate-400">
              Graphing reveals geometry. Substitution is convenient when one variable is already isolated. Elimination is efficient when coefficients line up. They are not different answers, only different routes to the same solution set.
            </p>
          </div>
        </section>

        <TopicNavigation />
      </div>
    </main>
  );
}

function LineControl({
  label,
  equation,
  slope,
  intercept,
  rgb,
  onSlope,
  onIntercept,
}: {
  label: string;
  equation: string;
  slope: number;
  intercept: number;
  rgb: string;
  onSlope: (value: number) => void;
  onIntercept: (value: number) => void;
}) {
  return (
    <div className="rounded-[16px] border p-3" style={{ borderColor: `rgba(${rgb},0.18)`, background: `rgba(${rgb},0.028)` }}>
      <div className="flex items-center justify-between gap-3">
        <div className="text-[10px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.75)` }}>{label}</div>
        <div className="font-mono text-[13px] text-white">{equation}</div>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        <MiniSlider label="Slope" value={slope} min={-3} max={3} step={0.5} rgb={rgb} onChange={onSlope} />
        <MiniSlider label="Y-intercept" value={intercept} min={-5} max={5} step={1} rgb={rgb} onChange={onIntercept} />
      </div>
    </div>
  );
}

function MiniSlider({ label, value, min, max, step, rgb, onChange }: { label: string; value: number; min: number; max: number; step: number; rgb: string; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-[10px] text-slate-500">
        <span>{label}</span>
        <span className="font-mono" style={{ color: `rgba(${rgb},0.85)` }}>{formatNumber(value)}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-cyan-400" />
    </label>
  );
}

function PresetButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="h-10 rounded-xl border border-white/[0.055] bg-white/[0.012] px-2 text-[10px] font-semibold text-slate-500 transition-colors hover:border-white/[0.11] hover:text-slate-300">{label}</button>;
}

function SolutionReadout({ solution }: { solution: Solution }) {
  const config = solution.status === "one"
    ? { label: "Shared solution", value: `(${formatNumber(solution.x ?? 0)}, ${formatNumber(solution.y ?? 0)})`, rgb: "16, 185, 129" }
    : solution.status === "none"
      ? { label: "Shared solution", value: "none", rgb: "251, 113, 133" }
      : { label: "Shared solution", value: "every point on the line", rgb: "163, 230, 53" };

  return (
    <div className="flex min-h-0 flex-col justify-center rounded-[16px] border p-4 text-center" style={{ borderColor: `rgba(${config.rgb},0.17)`, background: `rgba(${config.rgb},0.025)` }}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">{config.label}</div>
      <div className="mt-2 font-mono text-[20px] font-semibold" style={{ color: `rgb(${config.rgb})` }}>{config.value}</div>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">
        {solution.status === "one" ? "This ordered pair satisfies both equations simultaneously." : solution.status === "none" ? "The constraints are incompatible, so no ordered pair satisfies both." : "The equations are equivalent descriptions of the same constraint."}
      </p>
    </div>
  );
}

function SystemGraph({ m1, b1, m2, b2, solution }: { m1: number; b1: number; m2: number; b2: number; solution: Solution }) {
  const size = 440;
  const scale = size / (GRAPH_MAX - GRAPH_MIN);
  const xFor = (x: number) => (x - GRAPH_MIN) * scale;
  const yFor = (y: number) => size - (y - GRAPH_MIN) * scale;
  const showSolution = solution.status === "one" && inGraph(solution.x ?? 0) && inGraph(solution.y ?? 0);

  return (
    <div className="relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-[20px] border border-cyan-200/[0.10] bg-[#030915]/86 p-4">
      <div className="pointer-events-none absolute left-4 top-4 z-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Shared coordinate plane</div>
        <div className="mt-1 grid gap-0.5 font-mono text-[11px]">
          <span className="text-cyan-300/80">A · {formatLine(m1, b1)}</span>
          <span className="text-orange-300/80">B · {formatLine(m2, b2)}</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${size} ${size}`} className="h-full max-h-[470px] w-full max-w-[470px]" aria-label="Graph of the current system of linear equations">
        {Array.from({ length: 15 }, (_, index) => {
          const coord = GRAPH_MIN + index;
          const x = xFor(coord);
          const y = yFor(coord);
          return (
            <g key={coord}>
              <line x1={x} y1="0" x2={x} y2={size} stroke="#06b6d4" strokeWidth="0.7" opacity={coord === 0 ? 0.34 : 0.10} />
              <line x1="0" y1={y} x2={size} y2={y} stroke="#06b6d4" strokeWidth="0.7" opacity={coord === 0 ? 0.34 : 0.10} />
            </g>
          );
        })}
        <line x1={xFor(GRAPH_MIN)} y1={yFor(m1 * GRAPH_MIN + b1)} x2={xFor(GRAPH_MAX)} y2={yFor(m1 * GRAPH_MAX + b1)} stroke="#06b6d4" strokeWidth="3" />
        <line x1={xFor(GRAPH_MIN)} y1={yFor(m2 * GRAPH_MIN + b2)} x2={xFor(GRAPH_MAX)} y2={yFor(m2 * GRAPH_MAX + b2)} stroke="#f97316" strokeWidth="3" strokeDasharray={solution.status === "infinite" ? "8 6" : undefined} />
        {showSolution ? (
          <g>
            <circle cx={xFor(solution.x ?? 0)} cy={yFor(solution.y ?? 0)} r="6" fill="#10b981" />
            <circle cx={xFor(solution.x ?? 0)} cy={yFor(solution.y ?? 0)} r="15" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.45" />
          </g>
        ) : null}
      </svg>

      <div className="absolute bottom-4 left-4 rounded-xl border border-white/[0.05] bg-black/55 px-3 py-2 backdrop-blur-md">
        <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-600">Geometry</div>
        <div className="mt-1 text-[11px] font-semibold" style={{ color: solution.status === "one" ? "rgb(16 185 129)" : solution.status === "none" ? "rgb(251 113 133)" : "rgb(163 230 53)" }}>
          {solution.status === "one" ? "one intersection" : solution.status === "none" ? "parallel · no intersection" : "coincident · same line"}
        </div>
      </div>
    </div>
  );
}

function MethodButton({ active, label, icon: Icon, rgb, onClick }: { active: boolean; label: string; icon: LucideIcon; rgb: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex h-12 items-center justify-center gap-2 rounded-xl border px-2 text-[10px] font-semibold transition-colors" style={{ color: active ? `rgb(${rgb})` : "rgb(100 116 139)", borderColor: active ? `rgba(${rgb},0.26)` : "rgba(255,255,255,0.045)", background: active ? `rgba(${rgb},0.055)` : "rgba(0,0,0,0.12)" }}>
      <Icon size={13} /> {label}
    </button>
  );
}

function MethodSummary({ method, solution }: { method: Method; solution: Solution }) {
  const descriptions: Record<Method, string> = {
    graph: "Treat each equation as a geometric constraint and inspect their shared points.",
    substitution: "Because both equations equal y, set their right-hand expressions equal and solve the resulting one-variable equation.",
    elimination: "Rewrite both equations so one variable has matching coefficients, then subtract the equations to remove that variable.",
  };
  return (
    <div className="border-b border-white/[0.05] pb-3">
      <div className="text-[14px] font-semibold capitalize text-white">{method}</div>
      <p className="mt-1 text-[11px] leading-5 text-slate-500">{descriptions[method]}</p>
      <div className="mt-2 font-mono text-[10px] text-slate-600">result · {solution.status === "one" ? "one shared point" : solution.status === "none" ? "contradiction" : "identity"}</div>
    </div>
  );
}

function MethodStepCard({ index, step }: { index: number; step: MethodStep }) {
  return (
    <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-2 rounded-xl border border-white/[0.045] bg-white/[0.012] p-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.03] font-mono text-[9px] text-slate-600">{String(index).padStart(2, "0")}</span>
      <span className="min-w-0">
        <strong className="block text-[10px] font-semibold text-slate-400">{step.label}</strong>
        <span className="mt-1 block font-mono text-[12px] text-slate-200">{step.equation}</span>
        <span className="mt-1 block text-[9px] leading-4 text-slate-600">{step.note}</span>
      </span>
    </div>
  );
}

function GeometryState({ active, title, equation, result, rgb }: { active: boolean; title: string; equation: string; result: string; rgb: string }) {
  return (
    <div className="rounded-[16px] border p-3" style={{ borderColor: active ? `rgba(${rgb},0.30)` : "rgba(255,255,255,0.045)", background: active ? `rgba(${rgb},0.05)` : "rgba(255,255,255,0.010)" }}>
      <div className="text-[13px] font-semibold text-white">{title}</div>
      <div className="mt-2 font-mono text-[11px]" style={{ color: `rgba(${rgb},0.78)` }}>{equation}</div>
      <div className="mt-1 text-[10px] text-slate-600">{result}</div>
    </div>
  );
}

function ConceptFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return (
    <div className="grid grid-cols-[36px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-white/[0.012] p-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.17)`, background: `rgba(${rgb},0.035)` }}><Icon size={15} /></span>
      <span><strong className="block text-[12px] font-semibold text-slate-300">{label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span></span>
    </div>
  );
}

function TopicNavigation() {
  return (
    <nav className="mt-3 pb-8" aria-label="Integrated Algebra topic navigation">
      <div className="mb-2">
        <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="inline-flex items-center gap-2 rounded-full border border-cyan-300/[0.09] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300">
          <Layers size={12} /> Integrated Algebra map
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/linear-equations" className="group flex min-h-[74px] items-center gap-3 rounded-[18px] border border-teal-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-teal-300/[0.20]">
          <ArrowLeft size={15} className="text-teal-300 transition-transform group-hover:-translate-x-0.5" />
          <span><span className="block text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-600">Previous Integrated Algebra topic</span><strong className="mt-0.5 block text-[15px] text-slate-200">Graphing Linear Equations</strong></span>
        </Link>
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/inequalities" className="group flex min-h-[74px] items-center gap-3 rounded-[18px] border border-blue-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-blue-300/[0.20]">
          <span className="min-w-0 flex-1 text-right"><span className="block text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-600">Next Integrated Algebra topic</span><strong className="mt-0.5 block text-[15px] text-slate-200">Algebraic Inequalities</strong></span>
          <ArrowRight size={15} className="text-blue-300 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </nav>
  );
}

function buildMethodSteps(method: Method, solution: Solution, m1: number, b1: number, m2: number, b2: number): MethodStep[] {
  if (method === "graph") {
    return [
      { label: "Draw constraint A", equation: formatLine(m1, b1), note: "Every point on this line satisfies the first equation." },
      { label: "Draw constraint B", equation: formatLine(m2, b2), note: "Every point on this line satisfies the second equation." },
      solution.status === "one"
        ? { label: "Keep the overlap", equation: `(${formatNumber(solution.x ?? 0)}, ${formatNumber(solution.y ?? 0)})`, note: "The intersection satisfies both constraints." }
        : solution.status === "none"
          ? { label: "Keep the overlap", equation: "∅", note: "Parallel lines share no ordered pair." }
          : { label: "Keep the overlap", equation: "same entire line", note: "Every point on either equation satisfies both." },
    ];
  }

  if (method === "substitution") {
    const deltaM = m1 - m2;
    const deltaB = b2 - b1;
    return [
      { label: "Set the y-expressions equal", equation: `${formatExpression(m1, b1)} = ${formatExpression(m2, b2)}`, note: "At a shared point, both equations produce the same y-value." },
      { label: "Collect x-terms", equation: `${formatNumber(deltaM)}x = ${formatNumber(deltaB)}`, note: solution.status === "one" ? "This one-variable equation determines the shared x-coordinate." : solution.status === "none" ? "The x-terms cancel but leave a false numerical statement." : "Everything cancels, leaving an identity." },
      solution.status === "one"
        ? { label: "Recover the point", equation: `x = ${formatNumber(solution.x ?? 0)},  y = ${formatNumber(solution.y ?? 0)}`, note: "Substitute x into either original equation to find y." }
        : solution.status === "none"
          ? { label: "Interpret", equation: `0 = ${formatNumber(deltaB)}`, note: "A contradiction means the system has no solution." }
          : { label: "Interpret", equation: "0 = 0", note: "An identity means the equations are equivalent and every point on the line works." },
    ];
  }

  const a1 = -m1;
  const a2 = -m2;
  const deltaA = a1 - a2;
  const deltaB = b1 - b2;
  return [
    { label: "Write matching y-coefficients", equation: `${formatStandardWithY(a1, b1)}   |   ${formatStandardWithY(a2, b2)}`, note: "Both equations now have a +1 coefficient on y." },
    { label: "Subtract the equations", equation: `${formatNumber(deltaA)}x = ${formatNumber(deltaB)}`, note: solution.status === "one" ? "The y-terms cancel, leaving one equation in x." : solution.status === "none" ? "Both variable terms cancel but the constants disagree." : "Both sides cancel completely." },
    solution.status === "one"
      ? { label: "Recover the point", equation: `x = ${formatNumber(solution.x ?? 0)},  y = ${formatNumber(solution.y ?? 0)}`, note: "Use either original equation to recover y." }
      : solution.status === "none"
        ? { label: "Interpret", equation: `0 = ${formatNumber(deltaB)}`, note: "The contradiction confirms that the parallel constraints never meet." }
        : { label: "Interpret", equation: "0 = 0", note: "The identity confirms that the equations describe the same line." },
  ];
}

function solveSystem(m1: number, b1: number, m2: number, b2: number): Solution {
  if (m1 === m2) return b1 === b2 ? { status: "infinite" } : { status: "none" };
  const x = (b2 - b1) / (m1 - m2);
  return { status: "one", x, y: m1 * x + b1 };
}

function formatLine(m: number, b: number) {
  return `y = ${formatExpression(m, b)}`;
}

function formatExpression(m: number, b: number) {
  const xPart = m === 0 ? "" : m === 1 ? "x" : m === -1 ? "−x" : `${formatNumber(m)}x`;
  if (m === 0) return formatNumber(b);
  if (b === 0) return xPart;
  return `${xPart} ${b > 0 ? "+" : "−"} ${formatNumber(Math.abs(b))}`;
}

function formatStandardWithY(a: number, b: number) {
  if (a === 0) return `y = ${formatNumber(b)}`;
  const xPart = a === 1 ? "x" : a === -1 ? "−x" : `${formatNumber(a)}x`;
  return `${xPart} + y = ${formatNumber(b)}`;
}

function formatNumber(value: number) {
  const rounded = Math.abs(value) < 1e-9 ? 0 : value;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function inGraph(value: number) {
  return value >= GRAPH_MIN && value <= GRAPH_MAX;
}
