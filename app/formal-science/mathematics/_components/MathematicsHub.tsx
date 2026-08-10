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
import GalaxyBackground from "./GalaxyBackground";
import MathBackground from "./MathBackground";

export type MathematicsHubNode = {
  id: string;
  label: string;
  href: string;
  description?: string;
  status?: "active" | "placeholder";
};

type BranchPresentation = {
  icon: LucideIcon;
  rgb: string;
  shortLabel: string;
  equation: string;
  lenses: readonly LensId[];
};

type LensId = "quantity" | "structure" | "space" | "change" | "uncertainty" | "models";

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
    shortLabel: "Foundations",
    equation: "1 + 1 = 2",
    lenses: ["quantity", "structure"],
  },
  "formal.mathematics.algebra": {
    icon: Variable,
    rgb: "96, 165, 250",
    shortLabel: "Relations",
    equation: "f(x) = y",
    lenses: ["structure", "change"],
  },
  "formal.mathematics.geometry": {
    icon: Triangle,
    rgb: "251, 191, 36",
    shortLabel: "Space & shape",
    equation: "a² + b² = c²",
    lenses: ["space", "structure"],
  },
  "formal.mathematics.calculus": {
    icon: Sigma,
    rgb: "255, 65, 54",
    shortLabel: "Continuous change",
    equation: "∫ f(x) dx",
    lenses: ["change", "models"],
  },
  "formal.mathematics.statistics": {
    icon: BarChart3,
    rgb: "192, 132, 252",
    shortLabel: "Evidence & chance",
    equation: "P(A | B)",
    lenses: ["uncertainty", "models"],
  },
  "formal.mathematics.number-theory": {
    icon: Binary,
    rgb: "34, 211, 238",
    shortLabel: "Integers",
    equation: "a ≡ b (mod n)",
    lenses: ["quantity", "structure"],
  },
  "formal.mathematics.discrete": {
    icon: Network,
    rgb: "163, 230, 53",
    shortLabel: "Finite structure",
    equation: "G = (V, E)",
    lenses: ["structure", "models"],
  },
  "formal.mathematics.applied": {
    icon: Pi,
    rgb: "129, 140, 248",
    shortLabel: "Modeling",
    equation: "model → prediction",
    lenses: ["models", "change", "uncertainty"],
  },
};

const LENSES: readonly { id: LensId; symbol: string; label: string; detail: string }[] = [
  { id: "quantity", symbol: "#", label: "Quantity", detail: "number, magnitude, comparison" },
  { id: "structure", symbol: "{ }", label: "Structure", detail: "patterns, rules, relations" },
  { id: "space", symbol: "△", label: "Space", detail: "shape, position, dimension" },
  { id: "change", symbol: "Δ", label: "Change", detail: "variation, motion, accumulation" },
  { id: "uncertainty", symbol: "%", label: "Uncertainty", detail: "chance, inference, evidence" },
  { id: "models", symbol: "↦", label: "Models", detail: "abstraction, prediction, application" },
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
  const [activeId, setActiveId] = useState<string>("formal.mathematics.algebra");
  const active = branches.find((branch) => branch.id === activeId) ?? branches[0];
  const activeLenses = new Set(active.lenses);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050506] text-slate-100 selection:bg-[#ff4136]/30 lg:h-screen lg:overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <GalaxyBackground />
        <MathBackground />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 bg-black/20" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(rgba(255,65,54,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,65,54,0.045)_1px,transparent_1px)] bg-[size:36px_36px]" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_80%_22%,rgba(255,65,54,0.10),transparent_25%),radial-gradient(circle_at_18%_80%,rgba(34,211,238,0.07),transparent_24%),linear-gradient(to_bottom,rgba(5,5,6,0.04),rgba(5,5,6,0.58))]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-4 sm:px-6 lg:h-screen lg:min-h-0 lg:px-8 lg:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Formal Sciences", href: "/formal-science" },
            { label: "Mathematics" },
          ]}
          eyebrow="Quantity · Structure · Change"
          icon={Sigma}
          title={<span>Mathematics</span>}
          subtitle="Study quantity, structure, space, change, uncertainty, and the patterns connecting them."
          accentRgb="255, 65, 54"
          titleClassName="font-mono text-[clamp(3.4rem,6vw,6.2rem)] font-semibold uppercase leading-[0.82] tracking-[-0.07em] text-[#fff9f8]"
          iconClassName="rounded-sm"
          headerClassName="border-[#ff4136]/18"
          aside={
            <div className="flex items-center gap-3 rounded-full border border-[#ff4136]/18 bg-black/25 px-4 py-2 font-mono text-sm text-[#ff756d] backdrop-blur-md">
              <span>π</span><span className="text-slate-700">·</span><span>∑</span><span className="text-slate-700">·</span><span>∫</span><span className="text-slate-700">·</span><span>∞</span>
            </div>
          }
        />

        <div className="mt-4 grid min-h-0 flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
          <section className="relative min-h-0 overflow-hidden rounded-[24px] border border-[#ff4136]/18 bg-black/[0.20] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_22px_70px_rgba(0,0,0,0.25)] backdrop-blur-md sm:p-4">
            <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative mb-3 flex items-center justify-between gap-4 px-1">
              <div>
                <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#ff756d]/70">Branches</div>
                <p className="mt-1 text-xs text-slate-600">Eight ways to ask mathematical questions.</p>
              </div>
              <div className="hidden font-mono text-[8px] uppercase tracking-[0.15em] text-slate-700 sm:block">hover to compare lenses</div>
            </div>

            <nav aria-label="Mathematics branches" className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {branches.map((branch, index) => (
                <BranchCard
                  key={branch.id}
                  branch={branch}
                  index={index}
                  selected={active.id === branch.id}
                  onActivate={() => setActiveId(branch.id)}
                />
              ))}
            </nav>
          </section>

          <aside className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/25 p-4 backdrop-blur-xl sm:p-5">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl" style={{ background: `rgba(${active.rgb},0.12)` }} />
            <div className="relative">
              <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#ff756d]/70">Mathematical lenses</div>
              <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">{active.label}</h2>
              <div className="mt-1 font-mono text-xs" style={{ color: `rgb(${active.rgb})` }}>{active.equation}</div>
              <p className="mt-3 text-xs leading-5 text-slate-500">{active.description}</p>

              <div className="mt-5 space-y-2">
                {LENSES.map((lens) => {
                  const enabled = activeLenses.has(lens.id);
                  return (
                    <div
                      key={lens.id}
                      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all ${enabled ? "border-white/12 bg-white/[0.045]" : "border-white/[0.045] bg-black/10 opacity-45"}`}
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-mono text-xs"
                        style={{
                          color: enabled ? `rgb(${active.rgb})` : "rgb(100 116 139)",
                          borderColor: enabled ? `rgba(${active.rgb},0.34)` : "rgba(255,255,255,0.07)",
                          background: enabled ? `rgba(${active.rgb},0.07)` : "rgba(255,255,255,0.02)",
                        }}
                      >
                        {lens.symbol}
                      </span>
                      <span className="min-w-0">
                        <strong className="block text-xs font-semibold text-slate-200">{lens.label}</strong>
                        <span className="mt-0.5 block text-[9px] leading-4 text-slate-600">{lens.detail}</span>
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 border-t border-white/[0.07] pt-4">
                <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-600">One language, many views</div>
                <p className="mt-2 text-[11px] leading-5 text-slate-600">The branches overlap constantly. Algebra describes geometry, statistics uses calculus, discrete structures power computation, and applied mathematics borrows from all of them.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function BranchCard({
  branch,
  index,
  selected,
  onActivate,
}: {
  branch: BuiltBranch;
  index: number;
  selected: boolean;
  onActivate: () => void;
}) {
  const Icon = branch.icon;
  const planned = branch.status === "placeholder";

  const content = (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `linear-gradient(145deg, rgba(${branch.rgb},0.14), transparent 55%)` }} />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl border"
            style={{
              color: `rgb(${branch.rgb})`,
              borderColor: `rgba(${branch.rgb},0.34)`,
              background: `rgba(${branch.rgb},0.07)`,
            }}
          >
            <Icon size={20} strokeWidth={1.55} />
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-700">{String(index + 1).padStart(2, "0")}</span>
        </div>

        <div className="mt-5">
          <h3 className="text-base font-semibold tracking-[-0.025em] text-white">{branch.label}</h3>
          <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em]" style={{ color: `rgba(${branch.rgb},0.82)` }}>{branch.shortLabel}</div>
          <p className="mt-2 line-clamp-2 min-h-10 text-[11px] leading-5 text-slate-500">{branch.description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t pt-3" style={{ borderColor: `rgba(${branch.rgb},0.14)` }}>
          <span className="font-mono text-[10px] text-slate-500">{branch.equation}</span>
          {!planned ? <ArrowRight size={13} style={{ color: `rgb(${branch.rgb})` }} className="transition-transform group-hover:translate-x-1" /> : null}
        </div>
      </div>
    </>
  );

  const className = `group relative min-h-[190px] overflow-hidden rounded-[18px] border p-4 backdrop-blur-md transition-all duration-300 ${planned ? "cursor-default opacity-50" : "hover:-translate-y-0.5"}`;
  const style = {
    borderColor: selected ? `rgba(${branch.rgb},0.52)` : `rgba(${branch.rgb},0.20)`,
    background: selected
      ? `linear-gradient(145deg, rgba(${branch.rgb},0.11), rgba(7,7,9,0.76) 52%, rgba(7,7,9,0.62))`
      : `linear-gradient(145deg, rgba(${branch.rgb},0.035), rgba(7,7,9,0.62))`,
    boxShadow: selected ? `0 0 34px rgba(${branch.rgb},0.07), inset 0 1px 0 rgba(255,255,255,0.04)` : "inset 0 1px 0 rgba(255,255,255,0.025)",
  };

  if (planned) return <div className={className} style={style} onMouseEnter={onActivate}>{content}</div>;

  return (
    <Link
      href={branch.href}
      className={className}
      style={style}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      {content}
    </Link>
  );
}
