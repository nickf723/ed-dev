"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Braces,
  Calculator,
  Divide,
  Equal,
  FunctionSquare,
  Grip,
  Hash,
  Layers,
  MoveHorizontal,
  Scaling,
  TrendingUp,
  Variable,
  X,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import GraphingBackground from "./_components/GraphingBackground";

type ModulePresentation = {
  icon: LucideIcon;
  rgb: string;
  specimen: string;
  idea: string;
};

type IntegratedChild = {
  id: string;
  label: string;
  href: string;
  description: string;
  status?: "active" | "placeholder";
};

type IntegratedModule = {
  id: string;
  label: string;
  href: string;
  description: string;
  status?: "active" | "placeholder";
  children: IntegratedChild[];
} & ModulePresentation;

type Family = {
  id: string;
  label: string;
  note: string;
  rgb: string;
  moduleIds: readonly string[];
};

type TableRow = {
  x: number;
  y: number;
};

const PRESENTATION: Record<string, ModulePresentation> = {
  "formal.mathematics.algebra.elementary-algebra.fundamentals": {
    icon: Hash,
    rgb: "52, 211, 153",
    specimen: "3(x - 5) + 2",
    idea: "syntax + equality",
  },
  "formal.mathematics.algebra.elementary-algebra.linear-equations": {
    icon: TrendingUp,
    rgb: "59, 130, 246",
    specimen: "y = -2x + 4",
    idea: "lines + rate",
  },
  "formal.mathematics.algebra.elementary-algebra.systems": {
    icon: Layers,
    rgb: "251, 191, 36",
    specimen: "2x + y = 10",
    idea: "simultaneous constraints",
  },
  "formal.mathematics.algebra.elementary-algebra.inequalities": {
    icon: MoveHorizontal,
    rgb: "244, 114, 182",
    specimen: "-3x < 12",
    idea: "solution regions",
  },
  "formal.mathematics.algebra.elementary-algebra.quadratics": {
    icon: Scaling,
    rgb: "251, 113, 133",
    specimen: "y = ax² + bx + c",
    idea: "curvature + roots",
  },
  "formal.mathematics.algebra.elementary-algebra.factoring": {
    icon: Divide,
    rgb: "129, 140, 248",
    specimen: "x² - 9 = (x-3)(x+3)",
    idea: "structure revealed",
  },
  "formal.mathematics.algebra.elementary-algebra.exponents": {
    icon: X,
    rgb: "251, 146, 60",
    specimen: "(x²)³ = x⁶",
    idea: "power rules",
  },
  "formal.mathematics.algebra.elementary-algebra.radicals": {
    icon: Grip,
    rgb: "34, 211, 238",
    specimen: "√(16x⁴) = 4x²",
    idea: "roots + fractional powers",
  },
  "formal.mathematics.algebra.elementary-algebra.functions": {
    icon: FunctionSquare,
    rgb: "163, 230, 53",
    specimen: "f(g(x))",
    idea: "input → output",
  },
  "formal.mathematics.algebra.elementary-algebra.rational": {
    icon: Calculator,
    rgb: "192, 132, 252",
    specimen: "(x² - 1)/(x + 1)",
    idea: "algebraic fractions",
  },
  "formal.mathematics.algebra.elementary-algebra.complex": {
    icon: Braces,
    rgb: "250, 204, 21",
    specimen: "i² = -1",
    idea: "number system extension",
  },
};

const FAMILIES: readonly Family[] = [
  {
    id: "relations",
    label: "Constraints & Relations",
    note: "Describe what values may be, how quantities change, and where multiple conditions agree.",
    rgb: "34, 211, 238",
    moduleIds: [
      "formal.mathematics.algebra.elementary-algebra.fundamentals",
      "formal.mathematics.algebra.elementary-algebra.linear-equations",
      "formal.mathematics.algebra.elementary-algebra.systems",
      "formal.mathematics.algebra.elementary-algebra.inequalities",
    ],
  },
  {
    id: "forms",
    label: "Forms & Transformations",
    note: "Rewrite expressions into forms that reveal factors, powers, roots, and restrictions.",
    rgb: "251, 146, 60",
    moduleIds: [
      "formal.mathematics.algebra.elementary-algebra.factoring",
      "formal.mathematics.algebra.elementary-algebra.exponents",
      "formal.mathematics.algebra.elementary-algebra.radicals",
      "formal.mathematics.algebra.elementary-algebra.rational",
    ],
  },
  {
    id: "behavior",
    label: "Behavior & Extensions",
    note: "Treat relationships as objects, study nonlinear behavior, and enlarge the numbers available to algebra.",
    rgb: "163, 230, 53",
    moduleIds: [
      "formal.mathematics.algebra.elementary-algebra.quadratics",
      "formal.mathematics.algebra.elementary-algebra.functions",
      "formal.mathematics.algebra.elementary-algebra.complex",
    ],
  },
];

const TABLE_STEPS = [0.5, 1, 2] as const;

function buildModules(): IntegratedModule[] {
  const integrated = curriculumRegistry.getNode("formal.mathematics.algebra.elementary-algebra");
  if (!integrated) throw new Error("Integrated Algebra is missing from the curriculum registry.");

  return (integrated.children ?? []).map((module) => {
    const presentation = PRESENTATION[module.id];
    if (!presentation) {
      throw new Error(`Integrated Algebra module ${module.id} is missing presentation metadata.`);
    }

    return {
      id: module.id,
      label: module.label,
      href: module.href,
      description: module.description ?? "",
      status: module.status,
      children: (module.children ?? []).map((child) => ({
        id: child.id,
        label: child.label,
        href: child.href,
        description: child.description ?? "",
        status: child.status,
      })),
      ...presentation,
    };
  });
}

const MODULES = buildModules();
const MODULES_BY_ID = new Map(MODULES.map((module) => [module.id, module]));

export default function IntegratedAlgebraPage() {
  const [slope, setSlope] = useState(2);
  const [intercept, setIntercept] = useState(0);
  const [tableCenter, setTableCenter] = useState(0);
  const [tableStep, setTableStep] = useState<(typeof TABLE_STEPS)[number]>(1);

  const table = useMemo<TableRow[]>(
    () =>
      Array.from({ length: 7 }, (_, index) => {
        const x = tableCenter + (index - 3) * tableStep;
        return { x, y: slope * x + intercept };
      }),
    [intercept, slope, tableCenter, tableStep],
  );

  const moveTable = (direction: -1 | 1) => {
    setTableCenter((current) => clamp(current + direction * tableStep, -20, 20));
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#071018] text-slate-100 selection:bg-cyan-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-45">
        <GraphingBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(34,211,238,0.10),transparent_27%),radial-gradient(circle_at_14%_82%,rgba(129,140,248,0.07),transparent_26%),linear-gradient(to_bottom,rgba(5,12,18,0.18),rgba(4,8,14,0.82))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-25 [background-image:linear-gradient(rgba(34,211,238,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.022)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Formal Sciences", href: "/formal-science" },
            { label: "Mathematics", href: "/formal-science/mathematics" },
            { label: "Algebra", href: "/formal-science/mathematics/algebra" },
            { label: "Integrated Algebra" },
          ]}
          eyebrow="Equation · Graph · Table · Function"
          icon={Variable}
          title={<span>Integrated Algebra</span>}
          subtitle="Study relationships by moving between symbolic, visual, numerical, and functional representations. The representation changes; the relationship stays connected."
          accentRgb="34, 211, 238"
          titleClassName="font-mono text-[clamp(2.8rem,5.2vw,5.5rem)] font-semibold uppercase leading-[0.84] tracking-[-0.06em] text-[#f4fdff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-cyan-300/[0.14]"
          aside={
            <div className="flex items-center gap-2 rounded-full border border-cyan-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[13px] text-cyan-200/85 backdrop-blur-md">
              <span>y</span><Equal size={12} /><span>{slope}x {intercept >= 0 ? "+" : "−"} {Math.abs(intercept)}</span>
            </div>
          }
        />

        <section className="mt-3 overflow-hidden rounded-[24px] border border-cyan-200/[0.12] bg-black/[0.23] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-300/75">Representation workbench</div>
              <p className="mt-1 text-[13px] text-slate-400">One linear relationship, four coordinated views.</p>
            </div>
            <div className="font-mono text-[11px] text-slate-500">symbol ↔ graph ↔ table ↔ language</div>
          </div>

          <div className="grid gap-3 xl:grid-cols-[285px_minmax(500px,1fr)_315px]">
            <div className="grid content-start gap-3 rounded-[18px] border border-cyan-200/[0.08] bg-black/[0.18] p-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-500">Symbolic form</div>
                <div className="mt-2 font-mono text-[28px] font-semibold tracking-[-0.03em] text-white">
                  y = <span className="text-cyan-300">{slope}</span>x {intercept >= 0 ? "+" : "−"} <span className="text-fuchsia-300">{Math.abs(intercept)}</span>
                </div>
              </div>

              <Control
                label="Slope"
                symbol="m"
                value={slope}
                min={-4}
                max={4}
                step={0.5}
                rgb="34, 211, 238"
                onChange={setSlope}
              />
              <Control
                label="Intercept"
                symbol="b"
                value={intercept}
                min={-8}
                max={8}
                step={1}
                rgb="244, 114, 182"
                onChange={setIntercept}
              />

              <div className="rounded-xl border border-white/[0.045] bg-white/[0.014] p-3.5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">Verbal rule</div>
                <p className="mt-1.5 text-[12px] leading-5 text-slate-300">
                  Start at <strong className="text-fuchsia-300">{intercept}</strong> on the y-axis, then change y by <strong className="text-cyan-300">{slope}</strong> for every 1 unit increase in x.
                </p>
              </div>
            </div>

            <GraphPanel slope={slope} intercept={intercept} samples={table} />

            <div className="grid content-start gap-3">
              <TablePanel
                rows={table}
                center={tableCenter}
                step={tableStep}
                onMove={moveTable}
                onCenterChange={setTableCenter}
                onStepChange={setTableStep}
              />

              <div className="rounded-[18px] border border-cyan-200/[0.08] bg-black/[0.18] p-3.5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-500">What changes together?</div>
                <div className="mt-3 grid gap-2">
                  <RepresentationFact icon={TrendingUp} label="Slope" value={slope === 0 ? "horizontal" : slope > 0 ? "rises left → right" : "falls left → right"} rgb="34, 211, 238" />
                  <RepresentationFact icon={Equal} label="Y-intercept" value={`crosses at (0, ${intercept})`} rgb="244, 114, 182" />
                  <RepresentationFact icon={FunctionSquare} label="Function" value="one output for every input" rgb="163, 230, 53" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3 overflow-hidden rounded-[24px] border border-cyan-200/[0.10] bg-black/[0.21] p-4 backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-300/75">Integrated map</div>
              <p className="mt-1 text-[13px] text-slate-400">Eleven core topics, with deeper lessons nested beneath the topic they extend.</p>
            </div>
            <div className="font-mono text-[11px] text-slate-500">describe → rewrite → generalize</div>
          </div>

          <nav aria-label="Integrated Algebra topics" className="grid gap-3 xl:grid-cols-3">
            {FAMILIES.map((family) => (
              <FamilyColumn key={family.id} family={family} />
            ))}
          </nav>
        </section>
      </div>
    </main>
  );
}

function Control({
  label,
  symbol,
  value,
  min,
  max,
  step,
  rgb,
  onChange,
}: {
  label: string;
  symbol: string;
  value: number;
  min: number;
  max: number;
  step: number;
  rgb: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-xl border border-white/[0.045] bg-white/[0.012] p-3.5">
      <span className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold text-slate-300">{label} <span className="font-mono text-slate-500">({symbol})</span></span>
        <span className="rounded-md px-2 py-1 font-mono text-[11px]" style={{ color: `rgb(${rgb})`, background: `rgba(${rgb},0.06)` }}>{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-cyan-400"
      />
    </label>
  );
}

function GraphPanel({ slope, intercept, samples }: { slope: number; intercept: number; samples: readonly TableRow[] }) {
  const size = 400;
  const center = size / 2;
  const scale = 23;
  const xMin = -12;
  const xMax = 12;
  const yFor = (x: number) => center - (slope * x + intercept) * scale;
  const xFor = (x: number) => center + x * scale;
  const interceptY = yFor(0);

  return (
    <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden rounded-[18px] border border-cyan-200/[0.10] bg-[#061019]/78 p-3">
      <div className="pointer-events-none absolute left-4 top-4 z-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-500">Graph</div>
        <div className="mt-1 font-mono text-[12px] text-cyan-300/80">y = mx + b</div>
      </div>
      <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-lg border border-amber-300/[0.12] bg-amber-400/[0.035] px-2.5 py-1.5 text-[10px] text-amber-200/70">
        gold points = table window
      </div>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full max-h-[400px] w-full max-w-[400px]">
        {Array.from({ length: 19 }, (_, index) => {
          const pos = center + (index - 9) * scale;
          return (
            <g key={index} opacity="0.22">
              <line x1={pos} y1="0" x2={pos} y2={size} stroke="#22d3ee" strokeWidth="0.65" />
              <line x1="0" y1={pos} x2={size} y2={pos} stroke="#22d3ee" strokeWidth="0.65" />
            </g>
          );
        })}
        <line x1="0" y1={center} x2={size} y2={center} stroke="#64748b" strokeWidth="1.5" />
        <line x1={center} y1="0" x2={center} y2={size} stroke="#64748b" strokeWidth="1.5" />
        <line
          x1={xFor(xMin)}
          y1={yFor(xMin)}
          x2={xFor(xMax)}
          y2={yFor(xMax)}
          stroke="#22d3ee"
          strokeWidth="3"
        />
        {samples.map((sample) => {
          const cx = xFor(sample.x);
          const cy = center - sample.y * scale;
          if (cx < -8 || cx > size + 8 || cy < -8 || cy > size + 8) return null;
          return <circle key={`${sample.x}-${sample.y}`} cx={cx} cy={cy} r="4" fill="#fbbf24" stroke="#071018" strokeWidth="2" />;
        })}
        {interceptY >= -10 && interceptY <= size + 10 ? (
          <circle cx={center} cy={interceptY} r="5.5" fill="#f472b6" />
        ) : null}
      </svg>
    </div>
  );
}

function TablePanel({
  rows,
  center,
  step,
  onMove,
  onCenterChange,
  onStepChange,
}: {
  rows: readonly TableRow[];
  center: number;
  step: (typeof TABLE_STEPS)[number];
  onMove: (direction: -1 | 1) => void;
  onCenterChange: (value: number) => void;
  onStepChange: (value: (typeof TABLE_STEPS)[number]) => void;
}) {
  return (
    <div
      className="rounded-[18px] border border-cyan-200/[0.08] bg-black/[0.18] p-3.5"
      onWheel={(event) => {
        if (Math.abs(event.deltaY) < 2) return;
        event.preventDefault();
        onMove(event.deltaY > 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.11em] text-slate-500">Table window</div>
          <div className="mt-1 text-[10px] text-slate-600">Scroll here or move the sampled x-values.</div>
        </div>
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={() => onMove(-1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.015] text-[14px] text-slate-400 hover:text-white" aria-label="Move table to lower x-values">←</button>
          <span className="min-w-[58px] rounded-lg border border-amber-300/[0.12] bg-amber-400/[0.035] px-2 py-1.5 text-center font-mono text-[11px] text-amber-200/75">x ≈ {formatNumber(center)}</span>
          <button type="button" onClick={() => onMove(1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.015] text-[14px] text-slate-400 hover:text-white" aria-label="Move table to higher x-values">→</button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-xl border border-white/[0.05] text-center">
        <div className="border-b border-r border-white/[0.05] bg-cyan-400/[0.04] py-2 text-[11px] font-semibold text-cyan-300">x</div>
        <div className="border-b border-white/[0.05] bg-fuchsia-400/[0.04] py-2 text-[11px] font-semibold text-fuchsia-300">y</div>
        {rows.flatMap((row) => [
          <div key={`x-${row.x}`} className="border-r border-t border-white/[0.04] py-1.5 font-mono text-[11px] text-slate-300">{formatNumber(row.x)}</div>,
          <div key={`y-${row.x}`} className="border-t border-white/[0.04] py-1.5 font-mono text-[11px] text-slate-200">{formatNumber(row.y)}</div>,
        ])}
      </div>

      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <label className="min-w-0">
          <span className="sr-only">Table center x-value</span>
          <input
            type="range"
            min={-12}
            max={12}
            step={0.5}
            value={center}
            onChange={(event) => onCenterChange(Number(event.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-amber-400"
          />
        </label>
        <div className="flex items-center gap-1">
          <span className="mr-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-600">step</span>
          {TABLE_STEPS.map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => onStepChange(candidate)}
              className="h-7 min-w-8 rounded-md border px-2 font-mono text-[10px] transition-colors"
              style={{
                color: candidate === step ? "rgb(251 191 36)" : "rgb(100 116 139)",
                borderColor: candidate === step ? "rgba(251,191,36,0.24)" : "rgba(255,255,255,0.05)",
                background: candidate === step ? "rgba(251,191,36,0.05)" : "rgba(255,255,255,0.01)",
              }}
            >
              {candidate}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RepresentationFact({ icon: Icon, label, value, rgb }: { icon: LucideIcon; label: string; value: string; rgb: string }) {
  return (
    <div className="grid grid-cols-[36px_minmax(0,1fr)] items-center gap-2.5 rounded-xl border border-white/[0.045] bg-white/[0.012] p-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.18)`, background: `rgba(${rgb},0.04)` }}>
        <Icon size={15} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[11px] font-semibold text-slate-200">{label}</strong>
        <span className="mt-0.5 block truncate text-[10px] text-slate-500">{value}</span>
      </span>
    </div>
  );
}

function FamilyColumn({ family }: { family: Family }) {
  const modules = family.moduleIds.flatMap((id) => {
    const module = MODULES_BY_ID.get(id);
    return module ? [module] : [];
  });

  return (
    <section
      className="relative flex min-h-[430px] flex-col overflow-hidden rounded-[20px] border p-4"
      style={{
        borderColor: `rgba(${family.rgb},0.16)`,
        background: `linear-gradient(160deg, rgba(${family.rgb},0.05), rgba(5,10,16,0.70) 34%, rgba(4,8,13,0.62))`,
      }}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl" style={{ background: `rgba(${family.rgb},0.07)` }} />
      <div className="relative border-b border-white/[0.05] pb-3.5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${family.rgb},0.78)` }}>{family.label}</div>
        <p className="mt-1.5 min-h-[44px] text-[12px] leading-5 text-slate-400">{family.note}</p>
      </div>

      <div className="relative mt-3 grid gap-2.5">
        {modules.map((module) => (
          <ModuleRow key={module.id} module={module} />
        ))}
      </div>
    </section>
  );
}

function ModuleRow({ module }: { module: IntegratedModule }) {
  const Icon = module.icon;
  const planned = module.status === "placeholder";

  const content = (
    <>
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
        style={{
          color: planned ? "rgb(100 116 139)" : `rgb(${module.rgb})`,
          borderColor: planned ? "rgba(100,116,139,0.12)" : `rgba(${module.rgb},0.22)`,
          background: planned ? "rgba(100,116,139,0.03)" : `rgba(${module.rgb},0.05)`,
        }}
      >
        <Icon size={17} strokeWidth={1.5} />
      </span>
      <span className="min-w-0 flex-1">
        <strong className={`block truncate text-[15px] font-semibold ${planned ? "text-slate-700" : "text-slate-100"}`}>{module.label}</strong>
        <span className="mt-0.5 block truncate text-[10px] font-medium" style={{ color: planned ? "rgb(71 85 105)" : `rgba(${module.rgb},0.72)` }}>{module.idea}</span>
        <span className="mt-1 block line-clamp-2 text-[11px] leading-4 text-slate-500">{module.description}</span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-2">
        <span className="max-w-[138px] truncate rounded-md border border-white/[0.045] bg-black/[0.18] px-2 py-1 font-mono text-[10px] text-slate-400">{module.specimen}</span>
        {planned ? <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-700">planned</span> : <ArrowRight size={12} className="text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-300" />}
      </span>
    </>
  );

  const className = `group flex min-h-[92px] items-center gap-3 rounded-[16px] border px-3 py-3 ${
    planned
      ? "cursor-default border-white/[0.025] bg-white/[0.008]"
      : "border-white/[0.045] bg-white/[0.012] transition-colors hover:border-white/[0.10] hover:bg-white/[0.025]"
  }`;

  const primary = planned ? (
    <div className={className}>{content}</div>
  ) : (
    <Link href={module.href} className={className}>{content}</Link>
  );

  return (
    <div className="grid gap-1.5">
      {primary}
      {module.children.map((child) => (
        <NestedModuleRow key={child.id} child={child} rgb={module.rgb} />
      ))}
    </div>
  );
}

function NestedModuleRow({ child, rgb }: { child: IntegratedChild; rgb: string }) {
  const planned = child.status === "placeholder";
  const className = `group ml-6 grid min-h-[58px] grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-2 rounded-[13px] border px-2.5 py-2 ${
    planned
      ? "cursor-default border-white/[0.025] bg-white/[0.006]"
      : "border-white/[0.04] bg-black/[0.12] transition-colors hover:border-white/[0.10] hover:bg-white/[0.02]"
  }`;

  const content = (
    <>
      <span
        className="flex h-7 w-7 items-center justify-center rounded-lg border font-mono text-[11px]"
        style={{
          color: planned ? "rgb(71 85 105)" : `rgba(${rgb},0.78)`,
          borderColor: planned ? "rgba(71,85,105,0.12)" : `rgba(${rgb},0.18)`,
          background: planned ? "rgba(71,85,105,0.02)" : `rgba(${rgb},0.035)`,
        }}
      >
        ↳
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <strong className={`truncate text-[12px] font-semibold ${planned ? "text-slate-700" : "text-slate-300"}`}>{child.label}</strong>
          <span className="shrink-0 text-[8px] font-semibold uppercase tracking-[0.08em] text-slate-600">deeper lesson</span>
        </span>
        <span className="mt-0.5 block truncate text-[10px] text-slate-600">{child.description}</span>
      </span>
      {planned ? (
        <span className="text-[8px] font-semibold uppercase tracking-[0.08em] text-slate-700">planned</span>
      ) : (
        <ArrowRight size={11} className="text-slate-700 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400" />
      )}
    </>
  );

  if (planned) return <div className={className}>{content}</div>;
  return <Link href={child.href} className={className}>{content}</Link>;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, "");
}
