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

export default function AlgorithmsPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <SceneFrame
      background={<AlgorithmWorldBackground />}
      className="bg-[#020709] text-slate-100 selection:bg-cyan-400/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(2,8,10,0.60)"
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
        <BranchIndex branches={context.children} />
      </section>

      <section className="mt-10">
        <SectionIntro
          eyebrow="Demonstration 01 · frontier discipline"
          title="Traverse one graph with two different worklists."
          text="This widget isolates graph exploration. Sorting and growth analysis are intentionally separate instruments below because they answer different questions and need different visual grammars."
          rgb="34,211,238"
        />
        <div className="mt-4">
          <TraversalLab />
        </div>
      </section>

      <section className="mt-12">
        <SectionIntro
          eyebrow="Demonstration 02 · local exchange"
          title="Watch a sorted suffix grow one pass at a time."
          text="The conveyor treats sorting as a sequence transformation rather than a graph problem. Its controls, invariant, comparisons, and swaps remain inside one self-contained widget."
          rgb="52,211,153"
        />
        <div className="mt-4">
          <SortingLab />
        </div>
      </section>

      <section className="mt-12">
        <SectionIntro
          eyebrow="Demonstration 03 · resource growth"
          title="Compare operation counts without hiding their absolute separation."
          text="The complexity observatory uses a linear vertical axis. Exact counts stay visible in a ledger so small families remain readable without making O(n log n) and O(n²) look deceptively close."
          rgb="167,139,250"
        />
        <div className="mt-4">
          <ComplexityLab />
        </div>
      </section>

      <section className="mt-12 overflow-hidden rounded-[24px] border-y border-white/[0.10] bg-black/[0.12] backdrop-blur-md">
        <div className="flex flex-col gap-3 border-b border-white/[0.08] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
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
        <div className="grid md:grid-cols-3">
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
            text="The same abstract problem can become easy or expensive depending on whether information is stored as an array, tree, graph, heap, hash table, or stream."
            rgb="167,139,250"
          />
        </div>
      </section>
    </SceneFrame>
  );
}

function BranchIndex({ branches }: { branches: readonly CurriculumNode[] }) {
  return (
    <nav
      aria-label="Algorithm branches"
      className="overflow-hidden rounded-[30px] border border-cyan-100/[0.13] bg-[#020a0d]/72 shadow-[0_30px_110px_rgba(0,0,0,0.27)] backdrop-blur-lg"
    >
      <div className="grid border-b border-cyan-100/[0.09] lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="p-5 sm:p-6">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-cyan-200/72">
            Primary navigation · direct children
          </div>
          <h2 className="mt-2 text-[clamp(1.9rem,3.5vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
            Choose the algorithmic problem before choosing a technique.
          </h2>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/68">
            These routes define the branch structure. The demonstrations below are examples inside this parent page, not competing destinations.
          </p>
        </div>
        <div className="border-t border-cyan-100/[0.08] bg-cyan-300/[0.025] p-5 lg:border-l lg:border-t-0">
          <Link
            href="/formal-science/computer-science"
            className="group flex items-center justify-between gap-4 rounded-[15px] border border-white/[0.08] bg-black/[0.18] px-4 py-3 transition hover:bg-white/[0.04]"
          >
            <span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">
                Parent hub
              </span>
              <strong className="mt-1 block text-[14px] text-white">
                Computer Science
              </strong>
            </span>
            <ArrowRight size={15} className="text-cyan-200/55 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="divide-y divide-white/[0.07]">
        {branches.map((branch) => (
          <BranchRow key={branch.id} branch={branch} />
        ))}
      </div>
    </nav>
  );
}

function BranchRow({ branch }: { branch: CurriculumNode }) {
  const meta = BRANCH_META[branch.id] ?? {
    icon: Braces,
    question: branch.description ?? "Explore this algorithmic branch.",
    rgb: "34,211,238",
    index: "--",
  };
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const content = (
    <div
      className={`group grid min-h-[92px] gap-4 px-5 py-4 sm:grid-cols-[48px_52px_minmax(0,1fr)_150px_28px] sm:items-center sm:px-6 ${
        planned ? "opacity-58" : "transition hover:bg-white/[0.025]"
      }`}
    >
      <span className="font-mono text-[12px] text-slate-600">{meta.index}</span>
      <span
        className="flex h-11 w-11 items-center justify-center rounded-[13px] border"
        style={{
          color: `rgb(${meta.rgb})`,
          borderColor: `rgba(${meta.rgb},0.25)`,
          background: `rgba(${meta.rgb},0.045)`,
        }}
      >
        <Icon size={17} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[17px] font-semibold text-white">
          {branch.label}
        </strong>
        <span className="mt-1 block text-[13px] leading-5 text-slate-400/72">
          {meta.question}
        </span>
      </span>
      <span
        className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em]"
        style={{ color: `rgba(${meta.rgb},0.72)` }}
      >
        {planned ? "planned branch" : "open branch"}
      </span>
      {planned ? (
        <span className="h-2 w-2 rounded-full border border-white/[0.12]" />
      ) : (
        <ArrowRight
          size={15}
          className="text-white/30 transition group-hover:translate-x-1 group-hover:text-white/78"
        />
      )}
    </div>
  );

  return planned ? (
    <div aria-disabled="true">{content}</div>
  ) : (
    <Link href={branch.href}>{content}</Link>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
  rgb,
}: {
  eyebrow: string;
  title: string;
  text: string;
  rgb: string;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
      <div>
        <div
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: `rgba(${rgb},0.72)` }}
        >
          {eyebrow}
        </div>
        <h2 className="mt-2 text-[clamp(1.8rem,3.2vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.046em] text-white">
          {title}
        </h2>
      </div>
      <p className="text-[14px] leading-6 text-slate-400/72">{text}</p>
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
    <article className="min-h-[190px] border-b border-white/[0.07] px-5 py-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <Icon size={17} style={{ color: `rgb(${rgb})` }} />
      <div
        className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]"
        style={{ color: `rgba(${rgb},0.70)` }}
      >
        {label}
      </div>
      <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.025em] text-white">
        {title}
      </h3>
      <p className="mt-2 text-[14px] leading-6 text-slate-400/70">{text}</p>
    </article>
  );
}
