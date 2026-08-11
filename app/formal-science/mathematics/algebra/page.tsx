"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Braces,
  Calculator,
  Check,
  Equal,
  Grid3X3,
  Infinity,
  Scale,
  Variable,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import AlgebraBackground2 from "./_components/AlgebraBackground2";

type BranchPresentation = {
  icon: LucideIcon;
  rgb: string;
  eyebrow: string;
  equation: string;
  thesis: string;
  preserves: string;
};

type AlgebraChild = {
  id: string;
  label: string;
  href: string;
  status?: "active" | "placeholder";
};

type AlgebraBranch = AlgebraChild &
  BranchPresentation & {
    description: string;
    children: AlgebraChild[];
  };

const PRESENTATION: Record<string, BranchPresentation> = {
  "formal.mathematics.algebra.pre-algebra": {
    icon: Calculator,
    rgb: "52, 211, 153",
    eyebrow: "Unknowns enter arithmetic",
    equation: "2(x + 3) = 10",
    thesis: "Numbers become placeholders, expressions, and equations.",
    preserves: "equality + arithmetic laws",
  },
  "formal.mathematics.algebra.elementary-algebra": {
    icon: Variable,
    rgb: "96, 165, 250",
    eyebrow: "Relations become objects",
    equation: "f(x) = y",
    thesis: "Equations become graphs, functions, systems, and families of relationships.",
    preserves: "solutions + functional relationships",
  },
  "formal.mathematics.algebra.linear-algebra": {
    icon: Grid3X3,
    rgb: "129, 140, 248",
    eyebrow: "Equations become geometry",
    equation: "A x = b",
    thesis: "Coordinates, vectors, and matrices turn systems into transformations of space.",
    preserves: "linear combinations + vector structure",
  },
  "formal.mathematics.algebra.abstract-algebra": {
    icon: Infinity,
    rgb: "192, 132, 252",
    eyebrow: "Rules become structures",
    equation: "φ(ab) = φ(a)φ(b)",
    thesis: "Algebra studies the operations themselves and the structures that survive translation.",
    preserves: "operations + algebraic structure",
  },
};

const REWRITE_STEPS = [
  {
    label: "Start",
    equation: "2(x + 3) = 10",
    operation: "same relationship",
    note: "An equation states that two expressions represent the same value.",
  },
  {
    label: "Expand",
    equation: "2x + 6 = 10",
    operation: "distribute 2",
    note: "The expression changes form, but its value does not.",
  },
  {
    label: "Isolate",
    equation: "2x = 4",
    operation: "subtract 6 from both sides",
    note: "Applying the same reversible operation preserves the solution set.",
  },
  {
    label: "Normalize",
    equation: "x = 2",
    operation: "divide both sides by 2",
    note: "A simpler representation reveals the hidden value directly.",
  },
] as const;

function buildBranches(): AlgebraBranch[] {
  const algebra = curriculumRegistry.getNode("formal.mathematics.algebra");
  if (!algebra) throw new Error("Algebra is missing from the curriculum registry.");

  return (algebra.children ?? []).map((branch) => {
    const presentation = PRESENTATION[branch.id];
    if (!presentation) {
      throw new Error(`Algebra branch ${branch.id} is missing presentation metadata.`);
    }

    return {
      id: branch.id,
      label: branch.label,
      href: branch.href,
      status: branch.status,
      description: branch.description ?? "",
      children: (branch.children ?? []).map((child) => ({
        id: child.id,
        label: child.label,
        href: child.href,
        status: child.status,
      })),
      ...presentation,
    };
  });
}

const BRANCHES = buildBranches();

export default function AlgebraHubPage() {
  const [rewriteIndex, setRewriteIndex] = useState(0);
  const rewrite = REWRITE_STEPS[rewriteIndex];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080910] text-slate-100 selection:bg-blue-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-35">
        <AlgebraBackground2 />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_80%_14%,rgba(96,165,250,0.10),transparent_26%),radial-gradient(circle_at_12%_82%,rgba(192,132,252,0.07),transparent_24%),linear-gradient(to_bottom,rgba(5,6,12,0.22),rgba(5,6,12,0.80))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-25 [background-image:linear-gradient(rgba(129,140,248,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(129,140,248,0.025)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Formal Sciences", href: "/formal-science" },
            { label: "Mathematics", href: "/formal-science/mathematics" },
            { label: "Algebra" },
          ]}
          eyebrow="Equivalence · Relation · Transformation · Structure"
          icon={Braces}
          title={<span>Algebra</span>}
          subtitle="Algebra grows by abstraction: from concrete unknowns, to symbolic relations, to linear transformations, to general structures whose rules survive translation."
          accentRgb="96, 165, 250"
          titleClassName="font-mono text-[clamp(3.4rem,6vw,6rem)] font-semibold uppercase leading-[0.82] tracking-[-0.065em] text-[#f8fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-blue-300/[0.14]"
          aside={
            <div className="flex items-center gap-3 rounded-full border border-blue-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[12px] text-blue-300/80 backdrop-blur-md">
              <span>x</span><Equal size={12} /><span className="text-violet-300">?</span>
            </div>
          }
        />

        <section className="mt-3 grid gap-3 rounded-[22px] border border-blue-200/[0.12] bg-black/[0.23] p-3.5 backdrop-blur-xl xl:h-[112px] xl:grid-cols-[230px_minmax(0,1fr)_330px] xl:items-stretch">
          <div className="flex min-w-0 items-center gap-3 xl:h-[82px]">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-300/[0.18] bg-blue-400/[0.055] text-blue-300">
              <Scale size={19} strokeWidth={1.45} />
            </span>
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-300/65">Equivalence rail</div>
              <p className="mt-1 text-[11px] leading-4 text-slate-500">Rewrite without changing what is true.</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 xl:h-[82px]">
            {REWRITE_STEPS.map((step, index) => {
              const active = index === rewriteIndex;
              return (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => setRewriteIndex(index)}
                  onMouseEnter={() => setRewriteIndex(index)}
                  className="h-full min-w-0 rounded-xl border px-2 py-2.5 text-left transition-colors"
                  style={{
                    borderColor: active ? "rgba(96,165,250,0.34)" : "rgba(255,255,255,0.055)",
                    background: active ? "rgba(96,165,250,0.075)" : "rgba(0,0,0,0.16)",
                  }}
                >
                  <div className={`text-[9px] font-semibold ${active ? "text-blue-300" : "text-slate-600"}`}>{step.label}</div>
                  <div className="mt-1 truncate font-mono text-[11px] text-slate-300">{step.equation}</div>
                </button>
              );
            })}
          </div>

          <div className="grid h-[82px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.018] px-3.5 py-2.5">
            <div className="grid min-w-0 grid-rows-[24px_18px_32px]">
              <div className="truncate font-mono text-[17px] font-semibold leading-6 text-white">{rewrite.equation}</div>
              <div className="truncate text-[10px] font-medium leading-4 text-blue-300/70">{rewrite.operation}</div>
              <p className="line-clamp-2 text-[10px] leading-4 text-slate-500">{rewrite.note}</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-300/[0.15] bg-emerald-400/[0.045] text-emerald-300" title="Solution preserved">
              <Check size={14} />
            </div>
          </div>
        </section>

        <section className="mt-3 overflow-hidden rounded-[24px] border border-blue-200/[0.12] bg-black/[0.22] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-1 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300/65">The algebra ladder</div>
              <p className="mt-1 text-[12px] text-slate-500">The objects become more abstract; preserving relationships remains the connective idea.</p>
            </div>
            <div className="font-mono text-[10px] text-slate-600">concrete → symbolic → linear → structural</div>
          </div>

          <nav aria-label="Algebra branches" className="grid gap-3 xl:grid-cols-4">
            {BRANCHES.map((branch) => (
              <BranchColumn key={branch.id} branch={branch} />
            ))}
          </nav>
        </section>
      </div>
    </main>
  );
}

function BranchColumn({ branch }: { branch: AlgebraBranch }) {
  const Icon = branch.icon;
  const planned = branch.status === "placeholder";

  return (
    <article
      className={`relative flex min-h-[520px] flex-col overflow-hidden rounded-[20px] border p-3.5 ${planned ? "opacity-55" : ""}`}
      style={{
        borderColor: `rgba(${branch.rgb},0.20)`,
        background: `linear-gradient(160deg, rgba(${branch.rgb},0.065), rgba(6,7,12,0.72) 36%, rgba(5,6,10,0.64))`,
      }}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl" style={{ background: `rgba(${branch.rgb},0.08)` }} />

      <div className="relative flex items-start justify-between gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
          style={{
            color: `rgb(${branch.rgb})`,
            borderColor: `rgba(${branch.rgb},0.28)`,
            background: `rgba(${branch.rgb},0.06)`,
          }}
        >
          <Icon size={19} strokeWidth={1.5} />
        </span>
        <span className="rounded-full border px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.09em]" style={{ color: `rgba(${branch.rgb},0.68)`, borderColor: `rgba(${branch.rgb},0.14)` }}>
          {branch.eyebrow}
        </span>
      </div>

      <div className="relative mt-4">
        <Link href={branch.href} className="group inline-flex items-center gap-2">
          <h2 className="text-[21px] font-semibold tracking-[-0.035em] text-white transition-colors group-hover:text-blue-100">{branch.label}</h2>
          <ArrowRight size={13} style={{ color: `rgb(${branch.rgb})` }} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <p className="mt-2 min-h-[60px] text-[11px] leading-5 text-slate-500">{branch.thesis}</p>

        <div className="mt-3 grid gap-2 rounded-xl border border-white/[0.045] bg-black/[0.16] p-2.5">
          <div className="font-mono text-[13px] font-semibold" style={{ color: `rgb(${branch.rgb})` }}>{branch.equation}</div>
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <Braces size={11} style={{ color: `rgba(${branch.rgb},0.70)` }} />
            <span>Preserves {branch.preserves}</span>
          </div>
        </div>
      </div>

      <div className="relative mt-3 flex-1 border-t border-white/[0.05] pt-2.5">
        <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Inside this branch</div>
        <div className="grid gap-1.5">
          {branch.children.map((child) => {
            const childPlanned = child.status === "placeholder";
            const row = (
              <>
                <span className={`truncate text-[10px] font-medium ${childPlanned ? "text-slate-700" : "text-slate-400"}`}>{child.label}</span>
                {childPlanned ? (
                  <span className="text-[8px] font-semibold uppercase tracking-[0.07em] text-slate-700">planned</span>
                ) : (
                  <ArrowRight size={10} className="shrink-0 text-slate-700 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400" />
                )}
              </>
            );

            const className = `group flex h-8 min-w-0 items-center justify-between gap-2 rounded-lg border px-2.5 ${
              childPlanned
                ? "cursor-default border-white/[0.025] bg-white/[0.008]"
                : "border-white/[0.045] bg-white/[0.014] transition-colors hover:border-white/[0.10] hover:bg-white/[0.03]"
            }`;

            return childPlanned ? (
              <div key={child.id} className={className}>{row}</div>
            ) : (
              <Link key={child.id} href={child.href} className={className}>{row}</Link>
            );
          })}
        </div>
      </div>

      <Link
        href={branch.href}
        className="relative mt-3 flex h-9 items-center justify-between rounded-xl border px-3 text-[10px] font-semibold transition-colors hover:bg-white/[0.03]"
        style={{ color: `rgba(${branch.rgb},0.82)`, borderColor: `rgba(${branch.rgb},0.16)` }}
      >
        <span>Open {branch.label}</span>
        <ArrowRight size={12} />
      </Link>
    </article>
  );
}
