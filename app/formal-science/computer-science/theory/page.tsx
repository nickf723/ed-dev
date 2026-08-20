import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Binary,
  Boxes,
  BrainCircuit,
  Braces,
  CircleDot,
  Gauge,
  GitCompareArrows,
  Infinity,
  Network,
  Sigma,
  type LucideIcon,
} from "lucide-react";
import { TheoryBackground } from "./TheoryBackground";

const NODE_ID = "formal.computer-science.theory";

type BranchMeta = {
  icon: LucideIcon;
  question: string;
  short: string;
  rgb: string;
};

const BRANCH_META: Record<string, BranchMeta> = {
  "formal.computer-science.theory.automata": {
    icon: Network,
    question: "What can this machine recognize with this amount of memory?",
    short: "model the machine",
    rgb: "34, 211, 238",
  },
  "formal.computer-science.theory.computability": {
    icon: Infinity,
    question: "Does any algorithm exist that always solves the problem?",
    short: "find the boundary",
    rgb: "192, 132, 252",
  },
  "formal.computer-science.theory.complexity": {
    icon: Gauge,
    question: "If the problem is computable, how much time or memory must solving it require?",
    short: "measure the cost",
    rgb: "251, 146, 60",
  },
};

const MACHINE_LADDER = [
  {
    label: "Finite automaton",
    memory: "finite state",
    language: "regular languages",
    note: "The machine remembers only which state it occupies. It is powerful enough for many pattern-recognition tasks but cannot count without bound.",
    rgb: "34, 211, 238",
  },
  {
    label: "Pushdown automaton",
    memory: "one unbounded stack",
    language: "context-free languages",
    note: "Adding a stack makes nested structure possible: balanced delimiters and recursive syntax become recognizable in ways finite state alone cannot support.",
    rgb: "52, 211, 153",
  },
  {
    label: "Turing machine",
    memory: "unbounded read/write tape",
    language: "general computation model",
    note: "The model is intentionally simple but expressive enough to formalize the ordinary notion of an algorithm and expose problems no algorithm can decide.",
    rgb: "192, 132, 252",
  },
] as const;

const PROOF_MOVES = [
  {
    icon: GitCompareArrows,
    label: "Simulation",
    detail: "Show that one model can reproduce the behavior of another, establishing relative computational power.",
  },
  {
    icon: Braces,
    label: "Reduction",
    detail: "Translate one problem into another so a hypothetical solver for the target would also solve the source problem.",
  },
  {
    icon: Sigma,
    label: "Counting & lower bounds",
    detail: "Prove that certain resources or distinctions are unavoidable rather than merely artifacts of a particular algorithm.",
  },
  {
    icon: CircleDot,
    label: "Diagonalization",
    detail: "Construct an object that escapes an assumed complete list, a classic route to impossibility and hierarchy results.",
  },
] as const;

export default function ComputationTheoryPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06040b] text-slate-100 selection:bg-fuchsia-300/25">
      <TheoryBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_16%,rgba(192,132,252,0.11),transparent_29%),radial-gradient(circle_at_16%_84%,rgba(34,211,238,0.055),transparent_28%),linear-gradient(to_bottom,rgba(6,4,11,0.10),rgba(6,4,11,0.78)_76%,rgba(4,2,8,0.97))]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#06040b]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Machine models · computability · complexity · proof"
            eyebrowStyle="rule"
            icon={BrainCircuit}
            title={<span>Computation Theory</span>}
            subtitle="Computation theory asks what an algorithm is, which problems algorithms can solve in principle, and how resource requirements separate easy computation from hard computation. The subject progresses from machine models to impossibility to complexity."
            accentRgb="192, 132, 252"
            titleClassName="font-sans text-[clamp(2.8rem,5.4vw,6.1rem)] font-semibold leading-[0.84] tracking-[-0.067em] text-[#fff8ff]"
            headerClassName="border-fuchsia-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[32px] border border-fuchsia-200/[0.10] bg-black/[0.15] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-fuchsia-200/58"><Binary size={13} /> Theoretical spine</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.7vw,3.35rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-white">Change the question before changing the mathematics.</h2>
            </div>
            <p className="text-[12px] leading-6 text-slate-400">Automata theory asks what a chosen machine model can express. Computability asks whether any algorithm can solve a problem. Complexity keeps the problem computable and asks how expensive solving it must be.</p>
          </div>

          <nav aria-label="Computation Theory branches" className="grid lg:grid-cols-3">
            {context.children.map((branch, index) => (
              <TheoryBranch key={branch.id} branch={branch} index={index} />
            ))}
          </nav>
        </section>

        <section className="mt-6 overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/54"><Boxes size={13} /> Machine-power ladder · reference</div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Memory changes what patterns a machine can distinguish.</h2>
            </div>
            <p className="text-[11px] leading-5 text-slate-500">These models are not historical computer generations. They are mathematical abstractions designed to isolate how memory and control affect expressive power.</p>
          </div>
          <div className="grid lg:grid-cols-3">
            {MACHINE_LADDER.map((machine, index) => (
              <article key={machine.label} className="relative min-h-[245px] border-b border-white/[0.06] px-5 py-5 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span><span className="h-2.5 w-2.5 rounded-full" style={{ background: `rgb(${machine.rgb})`, boxShadow: `0 0 18px rgba(${machine.rgb},0.22)` }} /></div>
                <h3 className="mt-5 text-[16px] font-semibold text-white/88">{machine.label}</h3>
                <div className="mt-2 font-mono text-[8px] uppercase tracking-[0.09em]" style={{ color: `rgba(${machine.rgb},0.62)` }}>{machine.memory}</div>
                <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.09em] text-slate-600">{machine.language}</div>
                <p className="mt-4 text-[10px] leading-5 text-slate-600">{machine.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6">
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/50">Common proof moves</div>
              <h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold tracking-[-0.043em] text-white">Theory often proves limits by translation rather than by trying every program.</h2>
            </div>
            <div className="grid sm:grid-cols-2">
              {PROOF_MOVES.map((move, index) => {
                const Icon = move.icon;
                return (
                  <article key={move.label} className="min-h-[165px] border-b border-white/[0.06] px-5 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
                    <div className="flex items-center justify-between"><Icon size={14} className="text-fuchsia-200/48" /><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div>
                    <h3 className="mt-4 text-[12px] font-semibold text-white/84">{move.label}</h3>
                    <p className="mt-2 text-[10px] leading-5 text-slate-600">{move.detail}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-orange-200/48">A famous boundary</div>
            <h2 className="mt-2 text-[25px] font-semibold tracking-[-0.04em] text-white">P versus NP belongs to complexity, not to the definition of computation theory.</h2>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">The question asks whether every problem whose proposed solutions can be verified efficiently can also be solved efficiently. It is central and unresolved, but it sits downstream of the more basic questions of machine model and computability.</p>
            <div className="mt-5 rounded-[16px] border border-orange-200/[0.10] bg-orange-200/[0.02] px-4 py-3 font-mono text-[10px] text-orange-100/58">computable does not imply efficiently computable</div>
          </aside>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/logic" label="Formal Logic" note="Proof systems, validity, models, and formal reasoning connect closely to computability." rgb="248, 113, 113" />
          <Neighbor href="/formal-science/computer-science/algorithms" label="Algorithms & Data" note="Concrete algorithm design turns theoretical resource questions into procedures." rgb="167, 139, 250" />
          <Neighbor href="/formal-science/information-science" label="Information Science" note="Information, encoding, representation, and communication overlap with computation from another angle." rgb="34, 211, 238" />
        </section>
      </div>
    </main>
  );
}

function TheoryBranch({ branch, index }: { branch: CurriculumNode; index: number }) {
  const meta = BRANCH_META[branch.id] ?? BRANCH_META["formal.computer-science.theory.automata"];
  const Icon = meta.icon;
  const planned = branch.status === "placeholder";
  const body = (
    <div className={`group min-h-[230px] border-b border-white/[0.06] px-5 py-5 lg:border-b-0 lg:border-r lg:last:border-r-0 ${planned ? "opacity-50" : "transition hover:bg-white/[0.025]"}`}>
      <div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${meta.rgb})`, borderColor: `rgba(${meta.rgb},0.24)`, background: `rgba(${meta.rgb},0.035)` }}><Icon size={16} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div>
      <div className="mt-5 font-mono text-[8px] uppercase tracking-[0.10em]" style={{ color: `rgba(${meta.rgb},0.62)` }}>{meta.short}</div>
      <h3 className="mt-1 text-[16px] font-semibold text-white/88">{branch.label}</h3>
      <p className="mt-3 text-[11px] leading-5 text-slate-500">{meta.question}</p>
      <div className="mt-5 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-slate-700"><span>{planned ? "planned" : "open"}</span>{planned ? null : <ArrowRight size={12} className="transition group-hover:translate-x-1" />}</div>
    </div>
  );
  return planned ? <div aria-label={`${branch.label}, planned`}>{body}</div> : <Link href={branch.href}>{body}</Link>;
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[88px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
