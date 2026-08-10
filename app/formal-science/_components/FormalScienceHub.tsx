"use client";

import Link from "next/link";
import {
  ArrowRight,
  Braces,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Database,
  GitGraph,
  Network,
  Scale,
  Sigma,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import GameOfLifeBackground from "./GameOfLifeBackground";
import FormalNetworkBackground from "./NetworkBackground";

export type FormalHubNode = {
  id: string;
  label: string;
  href: string;
  description?: string;
  status?: "active" | "placeholder";
  prerequisiteIds?: readonly string[];
};

type NodePresentation = {
  code: string;
  icon: LucideIcon;
  shortLabel: string;
  rgb: string;
};

const NODE_ORDER = [
  "formal.logic",
  "formal.mathematics",
  "formal.information-science",
  "formal.computer-science",
  "formal.data-science",
  "formal.systems-science",
] as const;

const PRESENTATION: Record<string, NodePresentation> = {
  "formal.logic": { code: "01", icon: Scale, shortLabel: "Reasoning", rgb: "245, 158, 11" },
  "formal.mathematics": { code: "02", icon: Sigma, shortLabel: "Structure", rgb: "255, 65, 54" },
  "formal.information-science": { code: "03", icon: Database, shortLabel: "Representation", rgb: "34, 211, 238" },
  "formal.computer-science": { code: "04", icon: Terminal, shortLabel: "Computation", rgb: "167, 139, 250" },
  "formal.data-science": { code: "05", icon: GitGraph, shortLabel: "Evidence", rgb: "52, 211, 153" },
  "formal.systems-science": { code: "06", icon: Network, shortLabel: "Dynamics", rgb: "96, 165, 250" },
};

const SHARED_GRAMMAR = [
  { token: ":=", label: "Definitions" },
  { token: "≡", label: "Relations" },
  { token: "f(x)", label: "Functions" },
  { token: "→", label: "Transforms" },
  { token: "[ ]", label: "Structures" },
  { token: "∴", label: "Proofs" },
] as const;

function buildNodes(nodes: readonly FormalHubNode[]) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  return NODE_ORDER.map((id) => {
    const node = byId.get(id);
    const presentation = PRESENTATION[id];
    if (!node || !presentation) throw new Error(`Formal Science node ${id} is incomplete.`);
    return { ...node, ...presentation };
  });
}

export default function FormalScienceHub({ nodes }: { nodes: readonly FormalHubNode[] }) {
  const branches = buildNodes(nodes);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-slate-100 selection:bg-[#ff4136]/30 lg:h-screen lg:overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <GameOfLifeBackground />
        <FormalNetworkBackground />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1] bg-black/[0.14]" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(rgba(255,65,54,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,65,54,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_78%_12%,rgba(255,65,54,0.08),transparent_27%),radial-gradient(circle_at_16%_78%,rgba(255,65,54,0.035),transparent_25%),linear-gradient(to_bottom,rgba(5,5,5,0.04),rgba(5,5,5,0.36))]" />
      <div className="pointer-events-none fixed inset-0 z-[2] opacity-20 [background-image:repeating-linear-gradient(0deg,transparent_0px,transparent_3px,rgba(255,255,255,0.018)_4px)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-4 sm:px-6 lg:h-screen lg:min-h-0 lg:px-8 lg:py-5">
        <header className="shrink-0 border-b border-[#ff4136]/20 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[#ff746b]/70">
              <span className="h-1.5 w-1.5 bg-[#ff4136] shadow-[0_0_10px_rgba(255,65,54,0.9)]" />
              Structure & proof
            </div>

            <nav aria-label="Breadcrumb" className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.13em] text-slate-500 backdrop-blur-lg">
              <Link href="/" className="transition-colors hover:text-[#ff9a94]">Knowledge map</Link>
              <ChevronRight size={11} className="text-slate-700" />
              <span className="text-[#ff7c73]">Formal Science</span>
            </nav>
          </div>

          <div className="mt-3 grid items-end gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <h1 className="font-mono text-[clamp(3.4rem,6.5vw,6.8rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em] text-[#fff9f8]">
                Formal <span className="text-[#ff6258]">Science</span>
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
                Abstract structures for reasoning, quantity, computation, information, data, and complex systems.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-[#ff4136]/20 bg-black/25 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500 backdrop-blur-md lg:flex">
              <Stage icon={CircleDot} label="Axioms" />
              <ArrowRight size={11} className="text-[#ff4136]/55" />
              <Stage icon={Braces} label="Rules" />
              <ArrowRight size={11} className="text-[#ff4136]/55" />
              <Stage icon={CheckCircle2} label="Proof" />
            </div>
          </div>
        </header>

        <section className="relative mt-4 shrink-0 overflow-hidden border border-[#ff4136]/20 bg-black/[0.16] shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-[2px]">
          <PanelCorners />

          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
              <line x1="17" y1="22" x2="83" y2="22" stroke="rgba(255,65,54,0.14)" strokeWidth="0.16" vectorEffect="non-scaling-stroke" />
              <line x1="17" y1="59" x2="83" y2="59" stroke="rgba(255,65,54,0.14)" strokeWidth="0.16" vectorEffect="non-scaling-stroke" />
              <line x1="17" y1="22" x2="17" y2="59" stroke="rgba(255,65,54,0.08)" strokeWidth="0.12" strokeDasharray="1 1.4" vectorEffect="non-scaling-stroke" />
              <line x1="50" y1="22" x2="50" y2="59" stroke="rgba(255,65,54,0.11)" strokeWidth="0.14" strokeDasharray="1 1.4" vectorEffect="non-scaling-stroke" />
              <line x1="83" y1="22" x2="83" y2="59" stroke="rgba(255,65,54,0.08)" strokeWidth="0.12" strokeDasharray="1 1.4" vectorEffect="non-scaling-stroke" />
              <line x1="6" y1="76" x2="94" y2="76" stroke="rgba(255,65,54,0.12)" strokeWidth="0.12" strokeDasharray="0.7 1.3" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          <div className="relative grid gap-3 p-3 sm:p-4 lg:grid-cols-3 lg:grid-rows-2 lg:gap-3 lg:p-4 lg:pb-3">
            {branches.map((branch) => <BranchNode key={branch.id} branch={branch} />)}
          </div>

          <SharedGrammar />
        </section>
      </div>
    </main>
  );
}

type BuiltNode = ReturnType<typeof buildNodes>[number];

function BranchNode({ branch }: { branch: BuiltNode }) {
  const Icon = branch.icon;
  const planned = branch.status === "placeholder";

  const body = (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(120deg, rgba(${branch.rgb},0.12), transparent 50%)` }}
      />
      <div className="pointer-events-none absolute right-3 top-3 grid grid-cols-3 gap-1 opacity-35">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} className="h-1 w-1" style={{ background: `rgb(${branch.rgb})` }} />
        ))}
      </div>

      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center border shadow-[inset_0_0_18px_rgba(0,0,0,0.45)]"
            style={{
              color: `rgb(${branch.rgb})`,
              borderColor: `rgba(${branch.rgb},0.46)`,
              background: `rgba(${branch.rgb},0.09)`,
            }}
          >
            <Icon size={18} strokeWidth={1.5} />
          </span>
          <span>
            <span className="block font-mono text-[8px] uppercase tracking-[0.2em]" style={{ color: `rgba(${branch.rgb},0.78)` }}>
              Node {branch.code}
            </span>
            <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.16em] text-slate-600">{branch.shortLabel}</span>
          </span>
        </div>

        <div className="mt-5">
          <h2 className="font-mono text-base font-semibold uppercase tracking-[-0.025em] text-white sm:text-lg">{branch.label}</h2>
          <p className="mt-2 line-clamp-2 max-w-md text-xs leading-5 text-slate-500 sm:text-[13px]">{branch.description}</p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-3 font-mono text-[8px] uppercase tracking-[0.14em]" style={{ borderColor: `rgba(${branch.rgb},0.20)` }}>
          <span style={{ color: planned ? "rgb(71 85 105)" : `rgba(${branch.rgb},0.82)` }}>{planned ? "Planned" : "Enter branch"}</span>
          {!planned ? <ArrowRight size={13} style={{ color: `rgb(${branch.rgb})` }} className="transition-transform group-hover:translate-x-1" /> : null}
        </div>
      </div>
    </>
  );

  const className = `group relative min-h-[174px] overflow-hidden border p-4 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] transition-all duration-300 sm:min-h-[184px] ${
    planned ? "cursor-default opacity-55" : "hover:-translate-y-0.5"
  }`;

  const style = {
    borderColor: planned ? "rgba(255,255,255,0.05)" : `rgba(${branch.rgb},0.30)`,
    background: planned
      ? "rgba(8,8,8,0.54)"
      : `linear-gradient(135deg, rgba(${branch.rgb},0.055), rgba(8,8,8,0.68) 48%, rgba(8,8,8,0.56))`,
    boxShadow: planned ? undefined : `inset 0 1px 0 rgba(255,255,255,0.045), 0 0 28px rgba(${branch.rgb},0.045)`,
  };

  return planned ? <div className={className} style={style}>{body}</div> : <Link href={branch.href} className={className} style={style}>{body}</Link>;
}

function SharedGrammar() {
  return (
    <div className="relative border-t border-[#ff4136]/15 bg-black/[0.34] px-4 py-3 backdrop-blur-md sm:px-5 lg:px-6 lg:py-4">
      <div className="grid gap-3 lg:grid-cols-[210px_minmax(0,1fr)] lg:items-center">
        <div>
          <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#ff6258]/70">Shared grammar</div>
          <p className="mt-1 text-[11px] leading-4 text-slate-600">Define objects, connect them, transform them, and prove what follows.</p>
        </div>

        <div className="grid grid-cols-3 gap-px bg-[#ff4136]/12 sm:grid-cols-6">
          {SHARED_GRAMMAR.map((item) => (
            <div key={item.label} className="flex min-w-0 items-center gap-2 bg-[#090909]/80 px-3 py-2.5 backdrop-blur-md">
              <span className="min-w-8 font-mono text-sm font-semibold text-[#ff756d]">{item.token}</span>
              <span className="truncate font-mono text-[8px] uppercase tracking-[0.11em] text-slate-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stage({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return <span className="inline-flex items-center gap-1.5"><Icon size={11} className="text-[#ff6258]" /><span>{label}</span></span>;
}

function PanelCorners() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      <span className="absolute left-[-1px] top-[-1px] h-6 w-6 border-l border-t border-[#ff4136]/65" />
      <span className="absolute right-[-1px] top-[-1px] h-6 w-6 border-r border-t border-[#ff4136]/65" />
      <span className="absolute bottom-[-1px] left-[-1px] h-6 w-6 border-b border-l border-[#ff4136]/65" />
      <span className="absolute bottom-[-1px] right-[-1px] h-6 w-6 border-b border-r border-[#ff4136]/65" />
    </div>
  );
}