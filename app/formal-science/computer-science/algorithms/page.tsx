import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import {
  SceneFrame,
  Surface,
  WorldWindow,
} from "@/app/_page-system/scene";
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
import AlgorithmWorkbench from "./_components/AlgorithmWorkbench";

const SCENES = [
  {
    id: "traversal",
    label: "Traverse a graph",
    description: "Change the frontier discipline and watch the same network produce breadth-first or depth-first order.",
    accentRgb: "34, 211, 238",
  },
  {
    id: "sorting",
    label: "Reorder a sequence",
    description: "Step through adjacent comparisons and watch a loop invariant grow a sorted suffix.",
    accentRgb: "52, 211, 153",
  },
  {
    id: "growth",
    label: "Compare growth",
    description: "Increase input size and compare families of resource growth rather than one machine's stopwatch time.",
    accentRgb: "167, 139, 250",
  },
];

const BRANCHES: Array<{
  icon: LucideIcon;
  label: string;
  question: string;
  summary: string;
  rgb: string;
  href?: string;
  status: "active" | "planned";
}> = [
  {
    icon: SortAsc,
    label: "Sorting",
    question: "How can a sequence be reorganized predictably?",
    summary: "Comparison sorts, non-comparison sorts, stability, in-place tradeoffs, and lower bounds.",
    rgb: "52, 211, 153",
    href: "/formal-science/computer-science/algorithms/sorting",
    status: "active",
  },
  {
    icon: Search,
    label: "Search",
    question: "How can structure reduce the work needed to find something?",
    summary: "Linear search, binary search, indexes, state-space search, and the assumptions each method requires.",
    rgb: "34, 211, 238",
    status: "planned",
  },
  {
    icon: Network,
    label: "Graphs & traversal",
    question: "How can an algorithm explore relationships without getting trapped in cycles?",
    summary: "BFS, DFS, shortest paths, spanning structures, connectivity, and graph representations.",
    rgb: "167, 139, 250",
    status: "planned",
  },
  {
    icon: Gauge,
    label: "Complexity",
    question: "How does resource use change as the input grows?",
    summary: "Time, space, asymptotic bounds, amortized cost, and practical performance tradeoffs.",
    rgb: "250, 204, 21",
    status: "planned",
  },
  {
    icon: Binary,
    label: "Dynamic programming",
    question: "When can repeated subproblems be solved once and reused?",
    summary: "State definitions, recurrences, memoization, tabulation, and reconstructing optimal solutions.",
    rgb: "244, 114, 182",
    status: "planned",
  },
  {
    icon: GitBranch,
    label: "Greedy & divide-and-conquer",
    question: "When can local structure safely simplify a global problem?",
    summary: "Greedy-choice proofs, recursive decomposition, merge patterns, and counterexamples.",
    rgb: "96, 165, 250",
    status: "planned",
  },
];

export default function AlgorithmsPage() {
  return (
    <SceneFrame
      background={<AlgorithmWorldBackground />}
      initialScene="traversal"
      className="bg-[#020709] text-slate-100 selection:bg-cyan-400/25"
      maxWidthClassName="max-w-[1600px]"
      headerBackground="rgba(2,8,10,0.58)"
      header={
        <DomainPageHeader
          breadcrumbs={[
            { label: "Formal Science", href: "/formal-science" },
            { label: "Computer Science", href: "/formal-science/computer-science" },
            { label: "Algorithms" },
          ]}
          eyebrow="State · invariant · frontier · correctness · cost"
          eyebrowStyle="rule"
          icon={Cpu}
          title={<span>Algorithms</span>}
          subtitle="An algorithm is a precise process for transforming state. Study what information it keeps, which invariant remains true, why it terminates, and how its resource cost grows."
          accentRgb="34, 211, 238"
          titleClassName="font-sans text-[clamp(2.8rem,5.3vw,6rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#f2feff]"
          headerClassName="border-white/[0.08]"
        />
      }
    >
      <section className="mt-4">
        <WorldWindow
          density="compact"
          eyebrow="Execution theater"
          title="Change the rule that manages state, then watch the process unfold."
          description="The workbench keeps controls, frontier or sequence state, visual response, and complexity readouts together. Its ambient world follows the same active algorithm."
          scenes={SCENES}
        >
          <AlgorithmWorkbench />
        </WorldWindow>
      </section>

      <section className="mt-10">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/70">
              <Braces size={14} /> Problem families
            </div>
            <h2 className="mt-3 max-w-5xl text-[clamp(2rem,4vw,4.2rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white">
              Different problems demand different representations, proof ideas, and cost models.
            </h2>
          </div>
          <Surface variant="ghost" className="rounded-[22px] p-5">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-400">Design loop</div>
            <div className="mt-3 grid gap-2">
              <LoopStep number="01" label="Represent the state" />
              <LoopStep number="02" label="Choose the next legal move" />
              <LoopStep number="03" label="Prove progress and correctness" />
              <LoopStep number="04" label="Measure time and memory" />
            </div>
          </Surface>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {BRANCHES.map((branch) => <BranchCard key={branch.label} {...branch} />)}
        </div>
      </section>

      <section className="mt-10 grid gap-3 md:grid-cols-3">
        <Principle
          icon={CheckCircle2}
          label="Correctness"
          title="A useful algorithm must do what it claims."
          text="Examples build intuition, but invariants, induction, exchange arguments, and contradiction explain why every valid input is handled correctly."
          rgb="52, 211, 153"
        />
        <Principle
          icon={Gauge}
          label="Efficiency"
          title="Cost belongs to an input model."
          text="Time and space depend on input size, representation, machine assumptions, and which operations are counted. Big O summarizes growth, not exact seconds."
          rgb="250, 204, 21"
        />
        <Principle
          icon={Network}
          label="Representation"
          title="The data structure changes the algorithmic landscape."
          text="The same abstract problem can become easy or expensive depending on whether information is stored as an array, tree, graph, heap, hash table, or stream."
          rgb="167, 139, 250"
        />
      </section>
    </SceneFrame>
  );
}

function BranchCard({
  icon: Icon,
  label,
  question,
  summary,
  rgb,
  href,
  status,
}: (typeof BRANCHES)[number]) {
  const body = (
    <Surface
      variant="ghost"
      className={`group flex min-h-[230px] flex-col rounded-[22px] p-5 transition ${status === "active" ? "hover:-translate-y-1 hover:bg-black/[0.28]" : "opacity-70"}`}
      style={{ borderColor: `rgba(${rgb},0.16)` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-[14px] border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.28)`, background: `rgba(${rgb},0.055)` }}><Icon size={18} /></span>
        {status === "active" ? <ArrowRight size={15} className="mt-2 text-white/28 transition group-hover:translate-x-1 group-hover:text-white/75" /> : null}
      </div>
      <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.035em] text-white">{label}</h3>
      <strong className="mt-3 block text-[13px] leading-5 text-slate-200/82">{question}</strong>
      <p className="mt-2 text-[14px] leading-6 text-slate-400/70">{summary}</p>
      <span className="mt-auto pt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.09em]" style={{ color: `rgba(${rgb},0.72)` }}>{status === "active" ? "open branch" : "planned branch"}</span>
    </Surface>
  );
  return status === "active" && href ? <Link href={href}>{body}</Link> : body;
}

function LoopStep({ number, label }: { number: string; label: string }) {
  return (
    <div className="grid grid-cols-[32px_minmax(0,1fr)] items-center gap-3 rounded-[12px] border border-white/[0.07] bg-black/[0.14] px-3 py-2.5">
      <span className="font-mono text-[11px] text-cyan-200/54">{number}</span>
      <span className="text-[13px] text-slate-200/76">{label}</span>
    </div>
  );
}

function Principle({
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
    <Surface variant="ghost" className="rounded-[22px] p-5" style={{ borderColor: `rgba(${rgb},0.13)` }}>
      <Icon size={18} style={{ color: `rgb(${rgb})` }} />
      <div className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.10em]" style={{ color: `rgba(${rgb},0.70)` }}>{label}</div>
      <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.025em] text-white">{title}</h3>
      <p className="mt-2 text-[14px] leading-6 text-slate-400/70">{text}</p>
    </Surface>
  );
}
