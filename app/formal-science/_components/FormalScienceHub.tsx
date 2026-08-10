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
  "formal.logic": { code: "01", icon: Scale, shortLabel: "Reasoning" },
  "formal.mathematics": { code: "02", icon: Sigma, shortLabel: "Structure" },
  "formal.information-science": { code: "03", icon: Database, shortLabel: "Representation" },
  "formal.computer-science": { code: "04", icon: Terminal, shortLabel: "Computation" },
  "formal.data-science": { code: "05", icon: GitGraph, shortLabel: "Evidence" },
  "formal.systems-science": { code: "06", icon: Network, shortLabel: "Dynamics" },
};

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

      <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(rgba(255,65,54,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,65,54,0.055)_1px,transparent_1px)] bg-[size:38px_38px]" />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_78%_12%,rgba(255,65,54,0.13),transparent_27%),radial-gradient(circle_at_16%_78%,rgba(255,65,54,0.055),transparent_25%),linear-gradient(to_bottom,rgba(5,5,5,0.12),rgba(5,5,5,0.72))]" />
      <div className="pointer-events-none fixed inset-0 z-[2] opacity-30 [background-image:repeating-linear-gradient(0deg,transparent_0px,transparent_3px,rgba(255,255,255,0.018)_4px)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-4 sm:px-6 lg:h-screen lg:min-h-0 lg:px-8 lg:py-5">
        <header className="shrink-0 border-b border-[#ff4136]/20 pb-4">
          <div className="flex items-center justify-end">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600">
              <Link href="/" className="transition-colors hover:text-[#ff8c85]">Home</Link>
              <ChevronRight size={11} className="text-slate-800" />
              <span className="text-[#ff7c73]">Formal Science</span>
            </nav>
          </div>

          <div className="mt-2 grid items-end gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-[#ff746b]/70">
                <span className="h-1.5 w-1.5 bg-[#ff4136] shadow-[0_0_10px_rgba(255,65,54,0.9)]" />
                Structure & proof
              </div>
              <h1 className="font-mono text-[clamp(3.4rem,6.5vw,6.8rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em] text-[#fff9f8]">
                Formal <span className="text-[#ff6258]">Science</span><span className="ml-2 inline-block h-[0.72em] w-[0.11em] bg-[#ff4136] align-[-0.02em] shadow-[0_0_18px_rgba(255,65,54,0.55)]" />
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
                Abstract structures for reasoning, quantity, computation, information, data, and complex systems.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-sm border border-[#ff4136]/20 bg-black/40 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500 lg:flex">
              <Stage icon={CircleDot} label="Axioms" />
              <ArrowRight size={11} className="text-[#ff4136]/55" />
              <Stage icon={Braces} label="Rules" />
              <ArrowRight size={11} className="text-[#ff4136]/55" />
              <Stage icon={CheckCircle2} label="Proof" />
            </div>
          </div>
        </header>

        <section className="relative mt-4 min-h-0 flex-1 overflow-hidden border border-[#ff4136]/20 bg-black/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-md">
          <PanelCorners />

          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
              <line x1="12" y1="27" x2="88" y2="27" stroke="rgba(255,65,54,0.18)" strokeWidth="0.16" vectorEffect="non-scaling-stroke" />
              <line x1="12" y1="73" x2="88" y2="73" stroke="rgba(255,65,54,0.18)" strokeWidth="0.16" vectorEffect="non-scaling-stroke" />
              <line x1="50" y1="27" x2="50" y2="73" stroke="rgba(255,65,54,0.22)" strokeWidth="0.18" vectorEffect="non-scaling-stroke" />
              <line x1="17" y1="27" x2="50" y2="50" stroke="rgba(255,65,54,0.11)" strokeWidth="0.12" strokeDasharray="1 1" vectorEffect="non-scaling-stroke" />
              <line x1="83" y1="27" x2="50" y2="50" stroke="rgba(255,65,54,0.11)" strokeWidth="0.12" strokeDasharray="1 1" vectorEffect="non-scaling-stroke" />
              <line x1="17" y1="73" x2="50" y2="50" stroke="rgba(255,65,54,0.11)" strokeWidth="0.12" strokeDasharray="1 1" vectorEffect="non-scaling-stroke" />
              <line x1="83" y1="73" x2="50" y2="50" stroke="rgba(255,65,54,0.11)" strokeWidth="0.12" strokeDasharray="1 1" vectorEffect="non-scaling-stroke" />
              <circle cx="50" cy="50" r="11" fill="none" stroke="rgba(255,65,54,0.10)" strokeWidth="0.15" strokeDasharray="1 1.4" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          <div className="relative grid h-full min-h-[610px] gap-3 p-4 sm:p-5 lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-10 lg:gap-y-24 lg:p-8 xl:min-h-0">
            {branches.map((branch) => <BranchNode key={branch.id} branch={branch} />)}

            <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 hidden w-[230px] -translate-x-1/2 -translate-y-1/2 border border-[#ff4136]/30 bg-[#090606]/95 px-5 py-4 text-center shadow-[0_0_50px_rgba(255,65,54,0.09)] backdrop-blur-xl lg:block">
              <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#ff6258]/65">Formal core</div>
              <div className="mt-2 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-white">Define → Relate → Prove</div>
              <div className="mt-3 grid grid-cols-3 gap-px bg-[#ff4136]/15">
                {["symbol", "rule", "result"].map((label) => (
                  <span key={label} className="bg-[#080808] py-2 font-mono text-[7px] uppercase tracking-[0.12em] text-slate-600">{label}</span>
                ))}
              </div>
            </div>
          </div>
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
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,65,54,0.085),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute right-3 top-3 grid grid-cols-3 gap-1 opacity-25">
        {Array.from({ length: 9 }).map((_, index) => <span key={index} className="h-1 w-1 bg-[#ff6258]" />)}
      </div>

      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#ff4136]/30 bg-[#ff4136]/[0.06] text-[#ff756d] shadow-[inset_0_0_20px_rgba(0,0,0,0.45)]">
            <Icon size={20} strokeWidth={1.5} />
          </span>
          <span>
            <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-[#ff6258]/60">Node {branch.code}</span>
            <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.16em] text-slate-600">{branch.shortLabel}</span>
          </span>
        </div>

        <div className="mt-auto pt-5">
          <h2 className="font-mono text-lg font-semibold uppercase tracking-[-0.025em] text-white sm:text-xl">{branch.label}</h2>
          <p className="mt-2 max-w-md text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">{branch.description}</p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#ff4136]/10 pt-3 font-mono text-[8px] uppercase tracking-[0.14em]">
          <span className={planned ? "text-slate-700" : "text-[#ff756d]/70"}>{planned ? "Planned" : "Enter branch"}</span>
          {!planned ? <ArrowRight size={13} className="text-[#ff6258] transition-transform group-hover:translate-x-1" /> : null}
        </div>
      </div>
    </>
  );

  const className = `group relative min-h-[210px] overflow-hidden border bg-[#080808]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition-all duration-300 sm:p-5 ${planned ? "cursor-default border-white/[0.05] opacity-55" : "border-[#ff4136]/20 hover:-translate-y-0.5 hover:border-[#ff4136]/55 hover:bg-[#0d0808]/90 hover:shadow-[0_0_32px_rgba(255,65,54,0.08)]"}`;

  return planned ? <div className={className}>{body}</div> : <Link href={branch.href} className={className}>{body}</Link>;
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
