import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { SceneFrame } from "@/app/_page-system/scene";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Binary,
  Braces,
  CheckCircle2,
  Cpu,
  Gauge,
  GitBranch,
  Network,
  Search,
  SortAsc,
  type LucideIcon,
} from "lucide-react";
import AlgorithmWorldBackground from "./_components/AlgorithmWorldBackground";
import ComplexityLab from "./_components/ComplexityLab";
import SortingLab from "./_components/SortingLab";
import TraversalLab from "./_components/TraversalLab";

const NODE_ID = "formal.computer-science.algorithms";

type BranchMeta = {
  icon: LucideIcon;
  question: string;
  rgb: string;
  index: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "formal.computer-science.algorithms.sorting": {
    icon: SortAsc,
    question: "How can a sequence be reorganized predictably?",
    rgb: "52,211,153",
    index: "01",
  },
  "formal.computer-science.algorithms.search": {
    icon: Search,
    question: "How can structure reduce the work needed to find something?",
    rgb: "34,211,238",
    index: "02",
  },
  "formal.computer-science.algorithms.graphs": {
    icon: Network,
    question: "How can relationships be explored without getting trapped in cycles?",
    rgb: "167,139,250",
    index: "03",
  },
  "formal.computer-science.algorithms.complexity": {
    icon: Gauge,
    question: "How does resource use change as the input grows?",
    rgb: "250,204,21",
    index: "04",
  },
  "formal.computer-science.algorithms.dynamic-programming": {
    icon: Binary,
    question: "When can repeated subproblems be solved once and reused?",
    rgb: "244,114,182",
    index: "05",
  },
  "formal.computer-science.algorithms.design-paradigms": {
    icon: GitBranch,
    question: "Which decomposition strategy fits the structure of the problem?",
    rgb: "96,165,250",
    index: "06",
  },
};

const ANALYSIS_STEPS = [
  { label: "Represent", note: "Choose the state that exposes useful moves." },
  { label: "Advance", note: "Define one legal transition at a time." },
  { label: "Prove", note: "Track an invariant and termination measure." },
  { label: "Measure", note: "Count time and memory under an input model." },
] as const;

export default function AlgorithmsPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <SceneFrame
      background={<AlgorithmWorldBackground />}
      className="bg-[#020709] text-slate-100 selection:bg-cyan-400/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(2,8,10,0.52)"
      header={
        <DomainPageHeader
          breadcrumbs={context.breadcrumbs}
          eyebrow="State · invariant · frontier · correctness · cost"
          eyebrowStyle="rule"
          icon={Cpu}
          title={<span>Algorithms</span>}
          subtitle="An algorithm is a precise process for transforming state. First choose the problem family; then study the representation, legal transitions, proof of correctness, termination, and resource growth."
          accentRgb="34, 211, 238"
          titleClassName="font-sans text-[clamp(2.8rem,5.3vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#f2feff]"
          headerClassName="border-white/[0.08]"
        />
      }
    >
      <section className="mt-5">
        <BranchAtlas branches={context.children} />
      </section>

      <section className="mt-8">
        <ChapterMarker
          number="01"
          label="Frontier discipline"
          note="One graph, two worklist rules"
          rgb="34,211,238"
        />
        <div className="mt-3 max-w-[1320px]">
          <TraversalLab />
        </div>
      </section>

      <section className="mt-8">
        <ChapterMarker
          number="02"
          label="Local exchange"
          note="A sequence becomes ordered through repeated comparisons"
          rgb="52,211,153"
          align="right"
        />
        <div className="ml-auto mt-3 max-w-[1280px]">
          <SortingLab />
        </div>
      </section>

      <section className="mt-8">
        <ChapterMarker
          number="03"
          label="Resource growth"
          note="Absolute operation counts on an honest linear axis"
          rgb="167,139,250"
        />
        <div className="mt-3 max-w-[1360px]">
          <ComplexityLab />
        </div>
      </section>

      <section className="mt-8 border-t border-white/[0.10] pt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Evaluation criteria · reference, not navigation
            </div>
            <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.03em] text-white">
              Three questions follow every algorithm into deeper pages.
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600">
            no destinations in this band
          </span>
        </div>
        <div className="mt-4 grid border-y border-white/[0.08] md:grid-cols-3">
          <Criterion
            icon={CheckCircle2}
            label="Correctness"
            title="Does it do what it claims?"
            text="Examples build intuition, but invariants, induction, exchange arguments, and contradiction explain why every valid input is handled correctly."
            rgb="52,211,153"
          />
          <Criterion
            icon={Gauge}
            label="Efficiency"
            title="How does cost scale?"
            text="Time and space depend on input size, representation, assumptions, and which operations are counted. Big O summarizes growth, not exact seconds."
            rgb="250,204,21"
          />
          <Criterion
            icon={Braces}
            label="Representation"
            title="What state makes the next move cheap?"
            text="The same problem changes when information is stored as an array, tree, graph, heap, hash table, or stream."
            rgb="167,139,250"
          />
        </div>
      </section>
    </SceneFrame>
  );
}

function BranchAtlas({ branches }: { branches: readonly CurriculumNode[] }) {
  const problemFamilies = branches.slice(0, 3);
  const designFamilies = branches.slice(3);

  return (
    <section className="relative isolate overflow-hidden border-y border-cyan-100/[0.12] py-5 sm:py-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.055),transparent_26%),linear-gradient(90deg,rgba(1,9,12,0.25),transparent_38%,transparent_62%,rgba(3,5,12,0.22))]" />
      <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-cyan-200/72">
            Primary navigation · direct children
          </div>
          <h2 className="mt-2 max-w-5xl text-[clamp(1.9rem,3.6vw,3.7rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-white">
            Choose the structure of the problem before choosing a technique.
          </h2>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/72">
            The six destinations remain peers in the curriculum. This atlas groups them only by the kind of question they ask: transforming or exploring state on the left, designing and evaluating procedures on the right.
          </p>
        </div>
        <Link
          href="/formal-science/computer-science"
          className="group flex items-center justify-between gap-4 border-l border-cyan-200/[0.20] bg-black/[0.18] px-4 py-3 transition hover:bg-black/[0.28]"
        >
          <span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">
              Parent hub
            </span>
            <strong className="mt-1 block text-[14px] text-white">Computer Science</strong>
          </span>
          <ArrowRight size={15} className="text-cyan-200/55 transition group-hover:translate-x-1" />
        </Link>
      </div>

      <nav aria-label="Algorithm branches" className="relative mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_230px_minmax(0,1fr)] xl:items-center">
        <BranchGroup label="Transform & explore state" branches={problemFamilies} side="left" />
        <AnalysisCore />
        <BranchGroup label="Design & evaluate procedures" branches={designFamilies} side="right" />
      </nav>

      <div className="relative mt-5 grid border-y border-white/[0.08] sm:grid-cols-2 xl:grid-cols-4">
        {ANALYSIS_STEPS.map((step, index) => (
          <div key={step.label} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 border-b border-white/[0.07] px-4 py-3 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0 xl:border-r xl:last:border-r-0">
            <span className="font-mono text-[11px] text-cyan-200/54">0{index + 1}</span>
            <span>
              <strong className="block text-[13px] text-slate-200/84">{step.label}</strong>
              <span className="mt-0.5 block text-[11px] leading-4 text-slate-500">{step.note}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function BranchGroup({
  label,
  branches,
  side,
}: {
  label: string;
  branches: readonly CurriculumNode[];
  side: "left" | "right";
}) {
  return (
    <div className="min-w-0">
      <div className={`mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-slate-500 ${side === "right" ? "xl:text-right" : ""}`}>
        {label}
      </div>
      <div className="space-y-2.5">
        {branches.map((branch) => (
          <BranchNode key={branch.id} branch={branch} side={side} />
        ))}
      </div>
    </div>
  );
}

function BranchNode({ branch, side }: { branch: CurriculumNode; side: "left" | "right" }) {
  const meta = BRANCH_META[branch.id] ?? {
    icon: Braces,
    question: branch.description ?? "Explore this algorithmic branch.",
    rgb: "34,211,238",
    index: "--",
  };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const body = (
    <div
      className={`group relative grid min-h-[92px] gap-3 overflow-hidden rounded-[18px] border px-4 py-3 sm:grid-cols-[42px_minmax(0,1fr)_115px_22px] sm:items-center ${planned ? "opacity-58" : "transition hover:-translate-y-0.5"}`}
      style={{
        borderColor: `rgba(${meta.rgb},${planned ? 0.08 : 0.18})`,
        background: `linear-gradient(${side === "left" ? "90deg" : "270deg"},rgba(${meta.rgb},0.055),rgba(1,8,12,0.34) 58%,rgba(1,6,10,0.10))`,
        boxShadow: planned ? undefined : `inset ${side === "left" ? "3px" : "-3px"} 0 0 rgba(${meta.rgb},0.44)`,
      }}
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-[12px] border"
        style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)`, background: `rgba(${meta.rgb},0.04)` }}
      >
        <Icon size={17} />
      </span>
      <span className="min-w-0">
        <span className="font-mono text-[11px] text-slate-600">{meta.index}</span>
        <strong className="ml-2 text-[16px] font-semibold text-white">{branch.label}</strong>
        <span className="mt-1 block text-[12px] leading-5 text-slate-400/74">{meta.question}</span>
      </span>
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${meta.rgb},0.70)` }}>
        {planned ? "planned" : "open route"}
      </span>
      {planned ? <span className="h-2 w-2 rounded-full border border-white/[0.13]" /> : <ArrowRight size={15} className={`text-white/30 transition group-hover:text-white/80 ${side === "right" ? "xl:rotate-180" : ""}`} />}
    </div>
  );

  return planned ? <div aria-disabled="true">{body}</div> : <Link href={branch.href}>{body}</Link>;
}

function AnalysisCore() {
  return (
    <div className="relative hidden min-h-[330px] xl:flex xl:items-center xl:justify-center">
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-cyan-200/[0.18] via-white/[0.18] to-violet-200/[0.18]" />
      <div className="pointer-events-none absolute bottom-5 left-1/2 top-5 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.16] to-transparent" />
      <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-cyan-100/[0.18] bg-black/[0.16] text-center shadow-[0_0_80px_rgba(34,211,238,0.08)] backdrop-blur-sm">
        <span className="absolute inset-5 rounded-full border border-violet-100/[0.12]" />
        <span className="relative px-5">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-200/62">Algorithmic core</span>
          <strong className="mt-2 block text-[18px] leading-5 text-white">state → rule → result</strong>
          <span className="mt-2 block text-[11px] leading-4 text-slate-500">representation connects both sides</span>
        </span>
      </div>
    </div>
  );
}

function ChapterMarker({
  number,
  label,
  note,
  rgb,
  align = "left",
}: {
  number: string;
  label: string;
  note: string;
  rgb: string;
  align?: "left" | "right";
}) {
  return (
    <div className={`flex items-center gap-3 ${align === "right" ? "justify-end text-right" : ""}`}>
      {align === "right" ? <div className="h-px min-w-16 flex-1 bg-gradient-to-r from-transparent to-white/[0.10]" /> : null}
      <span className="font-mono text-[11px] font-semibold" style={{ color: `rgba(${rgb},0.70)` }}>{number}</span>
      <span>
        <strong className="block text-[14px] text-white/84">{label}</strong>
        <span className="block text-[12px] text-slate-500">{note}</span>
      </span>
      {align === "left" ? <div className="h-px min-w-16 flex-1 bg-gradient-to-r from-white/[0.10] to-transparent" /> : null}
    </div>
  );
}

function Criterion({
  icon: Icon,
  label,
  title,
  text,
  rgb,
}: {
  icon: LucideIcon;
  label: string;
  title: string;
  text: string;
  rgb: string;
}) {
  return (
    <article className="relative min-h-[170px] border-b border-white/[0.07] px-5 py-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <div className="absolute left-0 top-5 h-11 w-px" style={{ background: `rgba(${rgb},0.46)` }} />
      <Icon size={17} style={{ color: `rgb(${rgb})` }} />
      <div className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]" style={{ color: `rgba(${rgb},0.70)` }}>
        {label}
      </div>
      <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.025em] text-white">{title}</h3>
      <p className="mt-2 text-[14px] leading-6 text-slate-400/72">{text}</p>
    </article>
  );
}
