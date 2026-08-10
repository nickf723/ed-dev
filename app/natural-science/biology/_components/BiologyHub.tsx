"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Atom,
  Bug,
  ChevronRight,
  Dna,
  Globe2,
  HeartPulse,
  Leaf,
  Microscope,
  PawPrint,
  Sparkles,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import DnaBackground from "../DnaBackground";

export type BiologyHubNode = {
  id: string;
  label: string;
  href: string;
  description?: string;
  status?: "active" | "placeholder";
};

type DisciplinePresentation = {
  icon: LucideIcon;
  rgb: string;
  accent: string;
  border: string;
  soft: string;
  shortLabel: string;
};

type GroupPresentation = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  border: string;
  glow: string;
  nodeIds: readonly string[];
};

const DISCIPLINES: Record<string, DisciplinePresentation> = {
  "natural.biology.cytology": {
    icon: Microscope,
    rgb: "34, 211, 238",
    accent: "text-cyan-300",
    border: "border-cyan-400/50",
    soft: "bg-cyan-400/10",
    shortLabel: "Cells",
  },
  "natural.biology.genetics": {
    icon: Dna,
    rgb: "168, 85, 247",
    accent: "text-purple-300",
    border: "border-purple-400/50",
    soft: "bg-purple-400/10",
    shortLabel: "Inheritance",
  },
  "natural.biology.molecular": {
    icon: Atom,
    rgb: "96, 165, 250",
    accent: "text-blue-300",
    border: "border-blue-400/50",
    soft: "bg-blue-400/10",
    shortLabel: "Molecules",
  },
  "natural.biology.microbiology": {
    icon: Bug,
    rgb: "45, 212, 191",
    accent: "text-teal-300",
    border: "border-teal-400/50",
    soft: "bg-teal-400/10",
    shortLabel: "Microbes",
  },
  "natural.biology.mycology": {
    icon: Sprout,
    rgb: "192, 132, 252",
    accent: "text-violet-300",
    border: "border-violet-400/50",
    soft: "bg-violet-400/10",
    shortLabel: "Fungi",
  },
  "natural.biology.botany": {
    icon: Leaf,
    rgb: "132, 204, 22",
    accent: "text-lime-300",
    border: "border-lime-400/50",
    soft: "bg-lime-400/10",
    shortLabel: "Plants",
  },
  "natural.biology.zoology": {
    icon: PawPrint,
    rgb: "251, 146, 60",
    accent: "text-orange-300",
    border: "border-orange-400/50",
    soft: "bg-orange-400/10",
    shortLabel: "Animals",
  },
  "natural.biology.anatomy": {
    icon: HeartPulse,
    rgb: "251, 113, 133",
    accent: "text-rose-300",
    border: "border-rose-400/50",
    soft: "bg-rose-400/10",
    shortLabel: "Body systems",
  },
  "natural.biology.ecology": {
    icon: Globe2,
    rgb: "52, 211, 153",
    accent: "text-emerald-300",
    border: "border-emerald-400/50",
    soft: "bg-emerald-400/10",
    shortLabel: "Ecosystems",
  },
  "natural.biology.evolution": {
    icon: Activity,
    rgb: "250, 204, 21",
    accent: "text-yellow-300",
    border: "border-yellow-400/50",
    soft: "bg-yellow-400/10",
    shortLabel: "Change",
  },
};

const GROUPS: readonly GroupPresentation[] = [
  {
    id: "inside-life",
    eyebrow: "01 · Mechanisms",
    title: "Inside Life",
    description: "How cells store information, build molecules, and keep themselves alive.",
    accent: "text-cyan-200",
    border: "border-cyan-400/20",
    glow: "rgba(34,211,238,0.10)",
    nodeIds: [
      "natural.biology.cytology",
      "natural.biology.genetics",
      "natural.biology.molecular",
    ],
  },
  {
    id: "forms-of-life",
    eyebrow: "02 · Diversity",
    title: "Forms of Life",
    description: "The major living forms and the structures and strategies that make each distinct.",
    accent: "text-lime-200",
    border: "border-lime-400/20",
    glow: "rgba(132,204,22,0.10)",
    nodeIds: [
      "natural.biology.microbiology",
      "natural.biology.mycology",
      "natural.biology.botany",
      "natural.biology.zoology",
    ],
  },
  {
    id: "living-systems",
    eyebrow: "03 · Relationships",
    title: "Living Systems",
    description: "How bodies function, organisms interact, and populations change across generations.",
    accent: "text-emerald-200",
    border: "border-emerald-400/20",
    glow: "rgba(52,211,153,0.10)",
    nodeIds: [
      "natural.biology.anatomy",
      "natural.biology.ecology",
      "natural.biology.evolution",
    ],
  },
];

function resolveGroups(nodes: readonly BiologyHubNode[]) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  return GROUPS.map((group) => ({
    ...group,
    nodes: group.nodeIds.map((id) => {
      const node = byId.get(id);
      const presentation = DISCIPLINES[id];
      if (!node || !presentation) {
        throw new Error(`Biology hub node ${id} is incomplete.`);
      }
      return { ...node, ...presentation };
    }),
  }));
}

export default function BiologyHub({ nodes }: { nodes: readonly BiologyHubNode[] }) {
  const groups = resolveGroups(nodes);
  const liveCount = nodes.filter((node) => node.status !== "placeholder").length;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#031008] text-stone-100 selection:bg-emerald-400/30">
      <DnaBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_15%_12%,rgba(34,197,94,0.18),transparent_30%),radial-gradient(circle_at_88%_78%,rgba(34,211,238,0.08),transparent_28%),linear-gradient(to_bottom,rgba(2,12,7,0.12),rgba(2,9,6,0.88))]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-15 [background-image:radial-gradient(circle_at_center,rgba(187,247,208,0.18)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <header className="shrink-0 border-b border-emerald-200/10 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-200/55">
              <Dna size={12} /> Natural Sciences · Biology
            </div>

            <nav aria-label="Breadcrumb" className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.13em] text-slate-500 backdrop-blur-lg">
              <Link href="/" className="transition-colors hover:text-emerald-200">Knowledge map</Link>
              <ChevronRight size={11} className="text-slate-700" />
              <Link href="/natural-science" className="transition-colors hover:text-emerald-200">Natural Sciences</Link>
              <ChevronRight size={11} className="text-slate-700" />
              <span className="text-green-300">Biology</span>
            </nav>
          </div>

          <div className="mt-3 flex items-center gap-5 sm:gap-6">
            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-[22px] border border-green-300/25 bg-green-400/10 text-green-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_35px_rgba(34,197,94,0.12)] sm:flex">
              <Dna size={31} strokeWidth={1.55} />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-[clamp(3.4rem,6vw,6.2rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-[#f5fff7] drop-shadow-[0_0_28px_rgba(34,197,94,0.11)]">
                Biology
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-5 text-stone-400 sm:text-base">
                How living things are built, function, diversify, interact, and change.
              </p>
            </div>
            <div className="hidden text-right lg:block">
              <div className="text-2xl font-semibold text-green-300">{liveCount}</div>
              <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-stone-600">fields available</div>
            </div>
          </div>
        </header>

        <section className="mt-4 grid flex-1 gap-4 lg:grid-cols-3">
          {groups.map((group) => (
            <article
              key={group.id}
              className={`relative overflow-hidden rounded-[26px] border bg-black/25 p-4 backdrop-blur-xl sm:p-5 ${group.border}`}
              style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 60px rgba(0,0,0,0.22), 0 0 44px ${group.glow}` }}
            >
              <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full blur-3xl" style={{ background: group.glow }} />

              <div className="relative border-b border-white/[0.07] pb-4">
                <div className={`font-mono text-[8px] uppercase tracking-[0.18em] ${group.accent}`}>{group.eyebrow}</div>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-white">{group.title}</h2>
                <p className="mt-2 max-w-sm text-xs leading-5 text-stone-500">{group.description}</p>
              </div>

              <div className="relative mt-3 space-y-2.5">
                {group.nodes.map((node) => (
                  <DisciplineCard key={node.id} node={node} />
                ))}
              </div>
            </article>
          ))}
        </section>

        <footer className="mt-4 flex shrink-0 items-center justify-between gap-4 rounded-[18px] border border-emerald-300/10 bg-black/15 px-4 py-3 backdrop-blur-lg">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Sparkles size={13} className="text-green-300/60" />
            Biology connects information, structure, function, diversity, and adaptation into one study of life.
          </div>
          <Link href="/natural-science" className="hidden items-center gap-2 text-xs font-medium text-green-300/70 transition-colors hover:text-green-200 sm:flex">
            Natural Sciences <ArrowRight size={13} />
          </Link>
        </footer>
      </div>
    </main>
  );
}

function DisciplineCard({
  node,
}: {
  node: BiologyHubNode & DisciplinePresentation;
}) {
  const Icon = node.icon;
  const planned = node.status === "placeholder";

  const content = (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(100deg, rgba(${node.rgb},0.10), transparent 72%)` }}
      />
      <div className="relative flex items-center gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${node.border} ${node.soft} ${node.accent}`}>
          <Icon size={18} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <strong className={`truncate text-sm font-semibold ${planned ? "text-stone-500" : "text-white"}`}>{node.label}</strong>
            {planned ? (
              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.12em] text-stone-600">planned</span>
            ) : null}
          </span>
          <span className={`mt-0.5 block font-mono text-[8px] uppercase tracking-[0.12em] ${planned ? "text-stone-700" : node.accent}`}>
            {node.shortLabel}
          </span>
        </span>
        {!planned ? <ArrowRight size={14} className={`shrink-0 transition-transform group-hover:translate-x-1 ${node.accent}`} /> : null}
      </div>
      <p className={`relative mt-2 line-clamp-2 pl-[52px] text-[11px] leading-4 ${planned ? "text-stone-700" : "text-stone-500"}`}>
        {node.description}
      </p>
    </>
  );

  const className = `group relative block overflow-hidden rounded-[16px] border px-3.5 py-3 transition-all ${planned ? "cursor-default border-white/[0.05] bg-black/15 opacity-70" : "border-white/[0.08] bg-black/25 hover:-translate-y-0.5 hover:border-white/15 hover:bg-black/35"}`;

  return planned ? (
    <div className={className} aria-label={`${node.label}, planned`}>{content}</div>
  ) : (
    <Link href={node.href} className={className}>{content}</Link>
  );
}
