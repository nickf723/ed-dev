"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Binary,
  Calculator,
  Network,
  Pi,
  Sigma,
  Triangle,
  Variable,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import MathBackground from "./MathBackground";

export type MathematicsHubNode = {
  id: string;
  label: string;
  href: string;
  description?: string;
  status?: "active" | "placeholder";
};

type LensId =
  | "quantity"
  | "structure"
  | "space"
  | "change"
  | "uncertainty"
  | "models";

type BranchPresentation = {
  icon: LucideIcon;
  rgb: string;
  shortLabel: string;
  equation: string;
  lenses: readonly LensId[];
};

type BuiltBranch = MathematicsHubNode & BranchPresentation;

const BRANCH_ORDER = [
  "formal.mathematics.foundations",
  "formal.mathematics.algebra",
  "formal.mathematics.geometry",
  "formal.mathematics.calculus",
  "formal.mathematics.statistics",
  "formal.mathematics.number-theory",
  "formal.mathematics.discrete",
  "formal.mathematics.applied",
] as const;

const PRESENTATION: Record<string, BranchPresentation> = {
  "formal.mathematics.foundations": {
    icon: Calculator,
    rgb: "52, 211, 153",
    shortLabel: "Quantity & basic structure",
    equation: "1 + 1 = 2",
    lenses: ["quantity", "structure"],
  },
  "formal.mathematics.algebra": {
    icon: Variable,
    rgb: "96, 165, 250",
    shortLabel: "Relations & symbolic structure",
    equation: "f(x) = y",
    lenses: ["structure", "change"],
  },
  "formal.mathematics.geometry": {
    icon: Triangle,
    rgb: "251, 191, 36",
    shortLabel: "Space, form & invariance",
    equation: "a² + b² = c²",
    lenses: ["space", "structure"],
  },
  "formal.mathematics.calculus": {
    icon: Sigma,
    rgb: "255, 65, 54",
    shortLabel: "Continuous change & accumulation",
    equation: "∫ f(x) dx",
    lenses: ["change", "models"],
  },
  "formal.mathematics.statistics": {
    icon: BarChart3,
    rgb: "192, 132, 252",
    shortLabel: "Evidence, variation & chance",
    equation: "P(A | B)",
    lenses: ["uncertainty", "models"],
  },
  "formal.mathematics.number-theory": {
    icon: Binary,
    rgb: "34, 211, 238",
    shortLabel: "Integers & arithmetic structure",
    equation: "a ≡ b (mod n)",
    lenses: ["quantity", "structure"],
  },
  "formal.mathematics.discrete": {
    icon: Network,
    rgb: "163, 230, 53",
    shortLabel: "Finite structures & combinatorics",
    equation: "G = (V, E)",
    lenses: ["structure", "models"],
  },
  "formal.mathematics.applied": {
    icon: Pi,
    rgb: "129, 140, 248",
    shortLabel: "Models, optimization & decisions",
    equation: "model → prediction",
    lenses: ["models", "change", "uncertainty"],
  },
};

const LENSES: readonly {
  id: LensId;
  symbol: string;
  label: string;
  detail: string;
  rgb: string;
}[] = [
  { id: "quantity", symbol: "#", label: "Quantity", detail: "number, magnitude, comparison", rgb: "52, 211, 153" },
  { id: "structure", symbol: "{ }", label: "Structure", detail: "patterns, rules, relations", rgb: "96, 165, 250" },
  { id: "space", symbol: "△", label: "Space", detail: "shape, position, dimension", rgb: "251, 191, 36" },
  { id: "change", symbol: "Δ", label: "Change", detail: "variation, motion, accumulation", rgb: "255, 65, 54" },
  { id: "uncertainty", symbol: "%", label: "Uncertainty", detail: "chance, inference, evidence", rgb: "192, 132, 252" },
  { id: "models", symbol: "↦", label: "Models", detail: "abstraction, prediction, application", rgb: "129, 140, 248" },
];

function buildBranches(nodes: readonly MathematicsHubNode[]): BuiltBranch[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  return BRANCH_ORDER.map((id) => {
    const node = byId.get(id);
    const presentation = PRESENTATION[id];
    if (!node || !presentation) throw new Error(`Mathematics branch ${id} is incomplete.`);
    return { ...node, ...presentation };
  });
}

export default function MathematicsHub({ nodes }: { nodes: readonly MathematicsHubNode[] }) {
  const branches = buildBranches(nodes);
  const [activeLens, setActiveLens] = useState<LensId | null>(null);
  const selectedLens = activeLens ? LENSES.find((lens) => lens.id === activeLens) : undefined;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050506] text-slate-100 selection:bg-[#ff4136]/30">
      <div className="pointer-events-none fixed inset-0 z-0">
        <MathBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_76%_16%,rgba(255,65,54,0.08),transparent_28%),radial-gradient(circle_at_16%_82%,rgba(34,211,238,0.04),transparent_28%),linear-gradient(to_bottom,rgba(5,5,6,0.05),rgba(5,5,6,0.74))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.07] bg-[#050506]/78 px-4 pb-4 pt-5 backdrop-blur-2xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Formal Sciences", href: "/formal-science" },
              { label: "Mathematics" },
            ]}
            eyebrow="Quantity · Structure · Space · Change · Uncertainty · Models"
            eyebrowStyle="rule"
            icon={Sigma}
            title={<span>Mathematics</span>}
            subtitle="Mathematics is easier to navigate by the kind of question being asked than by course labels alone. Choose a lens to see which branches emphasize it; every branch stays available because mathematical ideas routinely overlap."
            accentRgb="255, 65, 54"
            titleClassName="font-mono text-[clamp(3rem,5.6vw,5.9rem)] font-semibold uppercase leading-[0.84] tracking-[-0.055em] text-[#fff9f8]"
            iconClassName="rounded-sm"
            headerClassName="border-[#ff4136]/[0.14]"
          />
        </div>

        <section className="mx-auto mt-10 max-w-[1060px] rounded-[24px] border border-[#ff4136]/[0.13] bg-black/[0.22] p-5 backdrop-blur-xl sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end">
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#ff756d]/70">Mathematical lenses</div>
              <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.3rem)] font-semibold tracking-[-0.04em] text-white">What kind of structure are you trying to understand?</h2>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-300">
                Select a lens to emphasize branches that use it heavily. This is not a prerequisite chart: Algebra, Geometry, Statistics, Calculus, and the rest continually borrow ideas from one another.
              </p>
            </div>
            <div className="rounded-[18px] border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate-500">Current lens</div>
              <div className="mt-2 text-[18px] font-semibold text-white">{selectedLens?.label ?? "All mathematics"}</div>
              <div className="mt-1 text-[13px] leading-5 text-slate-400">{selectedLens?.detail ?? "Nothing filtered. Compare the whole map."}</div>
            </div>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {LENSES.map((lens) => {
              const selected = lens.id === activeLens;
              return (
                <button
                  key={lens.id}
                  type="button"
                  onClick={() => setActiveLens((current) => current === lens.id ? null : lens.id)}
                  className="group flex min-h-[78px] items-center gap-3 rounded-[16px] border px-4 py-3 text-left transition hover:bg-white/[0.035]"
                  style={{
                    borderColor: selected ? `rgba(${lens.rgb},0.40)` : "rgba(255,255,255,0.07)",
                    background: selected ? `rgba(${lens.rgb},0.07)` : "rgba(0,0,0,0.10)",
                  }}
                  aria-pressed={selected}
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border font-mono text-[15px] font-semibold"
                    style={{ color: `rgb(${lens.rgb})`, borderColor: `rgba(${lens.rgb},0.24)`, background: `rgba(${lens.rgb},0.045)` }}
                  >
                    {lens.symbol}
                  </span>
                  <span>
                    <strong className="block text-[15px] font-semibold text-white">{lens.label}</strong>
                    <span className="mt-1 block text-[12px] leading-5 text-slate-500">{lens.detail}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-[1060px]">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#ff756d]/70">Direct branches</div>
              <h2 className="mt-1 text-[27px] font-semibold tracking-[-0.04em] text-white">Eight entry points into the same mathematical landscape.</h2>
            </div>
            {activeLens ? (
              <button type="button" onClick={() => setActiveLens(null)} className="font-mono text-[10px] uppercase tracking-[0.05em] text-slate-500 transition hover:text-white">
                clear lens
              </button>
            ) : null}
          </div>

          <nav aria-label="Mathematics branches" className="grid gap-3 md:grid-cols-2">
            {branches.map((branch) => {
              const Icon = branch.icon;
              const planned = branch.status === "placeholder";
              const relevant = !activeLens || branch.lenses.includes(activeLens);
              const body = (
                <article
                  className={`group relative min-h-[190px] overflow-hidden rounded-[22px] border p-5 backdrop-blur-xl transition-all duration-300 sm:p-6 ${planned ? "opacity-45" : relevant ? "hover:-translate-y-0.5 hover:bg-white/[0.03]" : "opacity-45"}`}
                  style={{
                    borderColor: relevant ? `rgba(${branch.rgb},0.22)` : "rgba(255,255,255,0.06)",
                    background: relevant
                      ? `linear-gradient(145deg, rgba(${branch.rgb},0.07), rgba(6,6,8,0.72) 54%, rgba(6,6,8,0.54))`
                      : "rgba(0,0,0,0.16)",
                  }}
                >
                  <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 opacity-60 blur-3xl" style={{ background: relevant ? `rgba(${branch.rgb},0.09)` : "transparent" }} />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border"
                        style={{ color: `rgb(${branch.rgb})`, borderColor: `rgba(${branch.rgb},0.28)`, background: `rgba(${branch.rgb},0.05)` }}
                      >
                        <Icon size={19} strokeWidth={1.55} />
                      </span>
                      <span className="font-mono text-[16px]" style={{ color: `rgba(${branch.rgb},0.75)` }}>{branch.equation}</span>
                    </div>
                    <div className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.05em]" style={{ color: `rgba(${branch.rgb},0.70)` }}>
                      {branch.shortLabel}
                    </div>
                    <h3 className="mt-1 text-[21px] font-semibold tracking-[-0.03em] text-white">{branch.label}</h3>
                    <p className="mt-2 text-[14px] leading-6 text-slate-300/82">{branch.description}</p>
                    <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-5">
                      <div className="flex flex-wrap gap-1.5">
                        {branch.lenses.map((lensId) => {
                          const lens = LENSES.find((item) => item.id === lensId);
                          if (!lens) return null;
                          return (
                            <span
                              key={lens.id}
                              className="rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.04em]"
                              style={{ color: `rgba(${lens.rgb},0.82)`, borderColor: `rgba(${lens.rgb},0.18)`, background: `rgba(${lens.rgb},0.035)` }}
                            >
                              {lens.label}
                            </span>
                          );
                        })}
                      </div>
                      {planned ? <span className="font-mono text-[10px] uppercase text-slate-600">planned</span> : <ArrowRight size={15} style={{ color: `rgb(${branch.rgb})` }} className="transition group-hover:translate-x-1" />}
                    </div>
                  </div>
                </article>
              );

              return planned ? (
                <div key={branch.id} aria-label={`${branch.label}, planned`}>{body}</div>
              ) : (
                <Link key={branch.id} href={branch.href}>{body}</Link>
              );
            })}
          </nav>
        </section>

        <section className="mx-auto mt-10 max-w-[1060px] border-t border-[#ff4136]/[0.10] pt-6">
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_330px] md:items-start">
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.07em] text-[#ff756d]/65">The overlap matters</div>
              <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.035em] text-white">A branch is not a box. It is a concentration of recurring questions.</h2>
              <p className="mt-3 text-[15px] leading-7 text-slate-300">
                Geometry uses algebra. Statistics uses calculus and discrete mathematics. Applied mathematics can combine nearly every lens on the page. Use the branch names to orient yourself, then follow the structure of the problem wherever it leads.
              </p>
            </div>
            <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.20] p-4 backdrop-blur-xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.055em] text-slate-500">Try the map</div>
              <p className="mt-2 text-[14px] leading-6 text-slate-300">Select <strong className="text-white">Change</strong> and Calculus rises immediately, but Algebra and Applied Mathematics remain relevant too. That overlap is the point.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
