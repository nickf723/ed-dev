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

type IntegratedModule = {
  id: string;
  label: string;
  href: string;
  description: string;
  status?: "active" | "placeholder";
} & ModulePresentation;

type Family = {
  id: string;
  label: string;
  note: string;
  rgb: string;
  moduleIds: readonly string[];
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
    rgb: "45, 212, 191",
    specimen: "y = -2x + 4",
    idea: "lines + rate",
  },
  "formal.mathematics.algebra.elementary-algebra.systems": {
    icon: Layers,
    rgb: "34, 211, 238",
    specimen: "2x + y = 10",
    idea: "simultaneous constraints",
  },
  "formal.mathematics.algebra.elementary-algebra.inequalities": {
    icon: MoveHorizontal,
    rgb: "56, 189, 248",
    specimen: "-3x < 12",
    idea: "solution regions",
  },
  "formal.mathematics.algebra.elementary-algebra.quadratics": {
    icon: Scaling,
    rgb: "96, 165, 250",
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
    rgb: "167, 139, 250",
    specimen: "(x²)³ = x⁶",
    idea: "power rules",
  },
  "formal.mathematics.algebra.elementary-algebra.radicals": {
    icon: Grip,
    rgb: "192, 132, 252",
    specimen: "√(16x⁴) = 4x²",
    idea: "roots + fractional powers",
  },
  "formal.mathematics.algebra.elementary-algebra.functions": {
    icon: FunctionSquare,
    rgb: "244, 114, 182",
    specimen: "f(g(x))",
    idea: "input → output",
  },
  "formal.mathematics.algebra.elementary-algebra.rational": {
    icon: Calculator,
    rgb: "251, 113, 133",
    specimen: "(x² - 1)/(x + 1)",
    idea: "algebraic fractions",
  },
  "formal.mathematics.algebra.elementary-algebra.complex": {
    icon: Braces,
    rgb: "251, 191, 36",
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
    rgb: "129, 140, 248",
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
    rgb: "244, 114, 182",
    moduleIds: [
      "formal.mathematics.algebra.elementary-algebra.quadratics",
      "formal.mathematics.algebra.elementary-algebra.functions",
      "formal.mathematics.algebra.elementary-algebra.complex",
    ],
  },
];

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
      ...presentation,
    };
  });
}

const MODULES = buildModules();
const MODULES_BY_ID = new Map(MODULES.map((module) => [module.id, module]));

export default function IntegratedAlgebraPage() {
  const [slope, setSlope] = useState(1.5);
  const [intercept, setIntercept] = useState(-2);

  const table = useMemo(
    () => [-2, 0, 2].map((x) => ({ x, y: slope * x + intercept })),
    [intercept, slope],
  );

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
            <div className="flex items-center gap-2 rounded-full border border-cyan-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[12px] text-cyan-200/80 backdrop-blur-md">
              <span>y</span><Equal size={12} /><span>{slope}x {intercept >= 0 ? "+" : "−"} {Math.abs(intercept)}</span>
            </div>
          }
        />

        <section className="mt-3 overflow-hidden rounded-[24px] border border-cyan-200/[0.12] bg-black/[0.23] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300/70">Representation workbench</div>
              <p className="mt-1 text-[12px] text-slate-500">One linear relationship, four coordinated views.</p>
            </div>
            <div className="font-mono text-[10px] text-slate-600">symbol ↔ graph ↔ table ↔ language</div>
          </div>

          <div className="grid gap-3 xl:grid-cols-[260px_minmax(320px,0.85fr)_minmax(0,1fr)]">
            <div className="grid content-start gap-3 rounded-[18px] border border-cyan-200/[0.08] bg-black/[0.18] p-4">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Symbolic form</div>
                <div className="mt-2 font-mono text-[25px] font-semibold tracking-[-0.03em] text-white">
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

              <div className="rounded-xl border border-white/[0.045] bg-white/[0.014] p-3">
                <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-600">Verbal rule</div>
                <p className="mt-1.5 text-[11px] leading-5 text-slate-400">
                  Start at <strong className="text-fuchsia-300">{intercept}</strong> on the y-axis, then change y by <strong className="text-cyan-300">{slope}</strong> for every 1 unit increase in x.
                </p>
              </div>
            </div>

            <GraphPanel slope={slope} intercept={intercept} />

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[18px] border border-cyan-200/[0.08] bg-black/[0.18] p-4">
                <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Table</div>
                <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-xl border border-white/[0.05] text-center">
                  <div className="border-b border-r border-white/[0.05] bg-cyan-400/[0.04] py-2 text-[10px] font-semibold text-cyan-300">x</div>
                  <div className="border-b border-white/[0.05] bg-fuchsia-400/[0.04] py-2 text-[10px] font-semibold text-fuchsia-300">y</div>
                  {table.flatMap((row) => [
                    <div key={`x-${row.x}`} className="border-r border-t border-white/[0.04] py-2 font-mono text-[11px] text-slate-400">{row.x}</div>,
                    <div key={`y-${row.x}`} className="border-t border-white/[0.04] py-2 font-mono text-[11px] text-slate-300">{formatNumber(row.y)}</div>,
                  ])}
                </div>
              </div>

              <div className="rounded-[18px] border border-cyan-200/[0.08] bg-black/[0.18] p-4">
                <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">What changes together?</div>
                <div className="mt-3 grid gap-2">
                  <RepresentationFact icon={TrendingUp} label="Slope" value={slope === 0 ? "horizontal" : slope > 0 ? "rises left → right" : "falls left → right"} rgb="34, 211, 238" />
                  <RepresentationFact icon={Equal} label="Y-intercept" value={`crosses at (0, ${intercept})`} rgb="244, 114, 182" />
                  <RepresentationFact icon={FunctionSquare} label="Function" value="one output for every input" rgb="129, 140, 248" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3 overflow-hidden rounded-[24px] border border-cyan-200/[0.10] bg-black/[0.21] p-4 backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300/70">Integrated map</div>
              <p className="mt-1 text-[12px] text-slate-500">Eleven topics, organized by the kind of algebraic work they train.</p>
            </div>
            <div className="font-mono text-[10px] text-slate-600">describe → rewrite → generalize</div>
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
    <label className="block rounded-xl border border-white/[0.045] bg-white/[0.012] p-3">
      <span className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold text-slate-400">{label} <span className="font-mono text-slate-600">({symbol})</span></span>
        <span className="rounded-md px-2 py-1 font-mono text-[10px]" style={{ color: `rgb(${rgb})`, background: `rgba(${rgb},0.06)` }}>{value}</span>
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

function GraphPanel({ slope, intercept }: { slope: number; intercept: number }) {
  const size = 320;
  const center = size / 2;
  const scale = 20;
  const xMin = -10;
  const xMax = 10;
  const yFor = (x: number) => center - (slope * x + intercept) * scale;
  const xFor = (x: number) => center + x * scale;
  const interceptY = yFor(0);

  return (
    <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[18px] border border-cyan-200/[0.10] bg-[#061019]/78 p-3">
      <div className="pointer-events-none absolute left-4 top-4 z-10">
        <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Graph</div>
        <div className="mt-1 font-mono text-[11px] text-cyan-300/75">y = mx + b</div>
      </div>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full max-h-[320px] w-full max-w-[320px]">
        {Array.from({ length: 17 }, (_, index) => {
          const pos = center + (index - 8) * scale;
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
        {interceptY >= -10 && interceptY <= size + 10 ? (
          <circle cx={center} cy={interceptY} r="5" fill="#f472b6" />
        ) : null}
      </svg>
    </div>
  );
}

function RepresentationFact({ icon: Icon, label, value, rgb }: { icon: LucideIcon; label: string; value: string; rgb: string }) {
  return (
    <div className="grid grid-cols-[34px_minmax(0,1fr)] items-center gap-2 rounded-xl border border-white/[0.045] bg-white/[0.012] p-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.18)`, background: `rgba(${rgb},0.04)` }}>
        <Icon size={14} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[10px] font-semibold text-slate-300">{label}</strong>
        <span className="mt-0.5 block truncate text-[9px] text-slate-600">{value}</span>
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
      className="relative flex min-h-[430px] flex-col overflow-hidden rounded-[20px] border p-3.5"
      style={{
        borderColor: `rgba(${family.rgb},0.16)`,
        background: `linear-gradient(160deg, rgba(${family.rgb},0.05), rgba(5,10,16,0.70) 34%, rgba(4,8,13,0.62))`,
      }}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl" style={{ background: `rgba(${family.rgb},0.07)` }} />
      <div className="relative border-b border-white/[0.05] pb-3">
        <div className="text-[9px] font-semibold uppercase tracking-[0.13em]" style={{ color: `rgba(${family.rgb},0.72)` }}>{family.label}</div>
        <p className="mt-1.5 min-h-[40px] text-[11px] leading-5 text-slate-500">{family.note}</p>
      </div>

      <div className="relative mt-3 grid gap-2">
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
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
        style={{
          color: planned ? "rgb(100 116 139)" : `rgb(${module.rgb})`,
          borderColor: planned ? "rgba(100,116,139,0.12)" : `rgba(${module.rgb},0.20)`,
          background: planned ? "rgba(100,116,139,0.03)" : `rgba(${module.rgb},0.045)`,
        }}
      >
        <Icon size={16} strokeWidth={1.5} />
      </span>
      <span className="min-w-0 flex-1">
        <strong className={`block truncate text-[13px] font-semibold ${planned ? "text-slate-700" : "text-slate-200"}`}>{module.label}</strong>
        <span className="mt-0.5 block truncate text-[9px]" style={{ color: planned ? "rgb(71 85 105)" : `rgba(${module.rgb},0.62)` }}>{module.idea}</span>
        <span className="mt-1 block line-clamp-2 text-[10px] leading-4 text-slate-600">{module.description}</span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-2">
        <span className="max-w-[130px] truncate rounded-md border border-white/[0.045] bg-black/[0.18] px-2 py-1 font-mono text-[9px] text-slate-500">{module.specimen}</span>
        {planned ? <span className="text-[8px] font-semibold uppercase tracking-[0.08em] text-slate-700">planned</span> : <ArrowRight size={11} className="text-slate-700 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400" />}
      </span>
    </>
  );

  const className = `group flex min-h-[82px] items-center gap-3 rounded-[16px] border px-3 py-2.5 ${
    planned
      ? "cursor-default border-white/[0.025] bg-white/[0.008]"
      : "border-white/[0.045] bg-white/[0.012] transition-colors hover:border-white/[0.10] hover:bg-white/[0.025]"
  }`;

  if (planned) return <div className={className}>{content}</div>;
  return <Link href={module.href} className={className}>{content}</Link>;
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, "");
}
