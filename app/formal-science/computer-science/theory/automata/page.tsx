import Link from "next/link";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import {
  ArrowRight,
  Binary,
  Bot,
  Braces,
  CircleDot,
  GitBranch,
  Layers3,
  Regex,
  Route,
} from "lucide-react";
import { AutomataBackground } from "./AutomataBackground";
import FiniteAutomatonLab from "./FiniteAutomatonLab";

const NODE_ID = "formal.computer-science.theory.automata";

const ANATOMY = [
  ["Alphabet", "A finite set of input symbols, usually written Σ. Strings are finite sequences drawn from that alphabet."],
  ["States", "A finite collection of abstract memory situations. The current state summarizes everything about the past that matters for future behavior."],
  ["Transition function", "A rule that maps the current state and next input symbol to the machine's next state."],
  ["Start state", "The state occupied before any input is consumed. It anchors every computation trace."],
  ["Accepting states", "A designated subset of states. A completed input string belongs to the language exactly when the trace ends in one of them."],
] as const;

const REGULAR_TOOLKIT = [
  {
    icon: Regex,
    label: "Regular expressions",
    detail: "Regular expressions and finite automata describe the same class of languages. One is a pattern notation; the other is an executable state model.",
    rgb: "244, 114, 182",
  },
  {
    icon: GitBranch,
    label: "Nondeterminism",
    detail: "An NFA may branch among several next states, yet it recognizes no languages beyond those recognized by deterministic finite automata.",
    rgb: "192, 132, 252",
  },
  {
    icon: Braces,
    label: "Closure",
    detail: "Regular languages remain regular under operations such as union, intersection, complement, concatenation, and Kleene star.",
    rgb: "52, 211, 153",
  },
] as const;

const MEMORY_STEPS = [
  ["Finite state", "Regular languages", "No unbounded auxiliary memory. The machine chooses among finitely many remembered situations."],
  ["Stack memory", "Context-free languages", "A pushdown automaton can remember an unbounded nested history using last-in, first-out access."],
  ["General read/write memory", "Turing-computable behavior", "A Turing machine can revisit and rewrite an unbounded tape, supporting general algorithmic computation."],
] as const;

export default function AutomataPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030914] text-slate-100 selection:bg-cyan-300/25">
      <AutomataBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_15%,rgba(34,211,238,0.11),transparent_29%),radial-gradient(circle_at_17%_84%,rgba(192,132,252,0.055),transparent_28%),linear-gradient(to_bottom,rgba(3,9,20,0.07),rgba(3,9,20,0.78)_76%,rgba(2,6,14,0.97))]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1560px] px-4 pb-14 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.06] bg-[#030914]/80 px-4 pb-3 pt-5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="States · transitions · languages · recognition · memory"
            eyebrowStyle="rule"
            icon={Bot}
            title={<span>Automata & Formal Languages</span>}
            subtitle="Automata theory studies deliberately simple machines so the relationship between memory, state, and recognizable patterns becomes mathematically precise. A machine consumes symbols, changes state, and decides whether the resulting string belongs to a formal language."
            accentRgb="34, 211, 238"
            titleClassName="font-sans text-[clamp(2.7rem,5.2vw,5.9rem)] font-semibold leading-[0.84] tracking-[-0.066em] text-[#f3fdff]"
            headerClassName="border-cyan-100/[0.10]"
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-[30px] border border-cyan-200/[0.10] bg-black/[0.14] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/58"><CircleDot size={13} /> Anatomy of a finite automaton</div>
              <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,3.25rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">A tiny amount of memory can recognize an infinite set of strings.</h2>
            </div>
            <p className="text-[12px] leading-6 text-slate-400">The machine itself is finite. The language it recognizes can contain infinitely many strings because the same transition structure can process inputs of arbitrary finite length.</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-5">
            {ANATOMY.map(([name, detail], index) => (
              <article key={name} className="min-h-[190px] border-b border-white/[0.06] px-5 py-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0">
                <span className="font-mono text-[8px] text-cyan-200/34">0{index + 1}</span>
                <h3 className="mt-4 text-[12px] font-semibold text-white/84">{name}</h3>
                <p className="mt-2 text-[10px] leading-5 text-slate-600">{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-6"><FiniteAutomatonLab /></div>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
          <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:px-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/50"><Binary size={13} /> Regular-language toolkit</div>
              <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Different descriptions can encode the same recognition power.</h2>
            </div>
            <p className="text-[11px] leading-5 text-slate-500">One of automata theory's recurring moves is proving two apparently different formalisms equivalent by translating between them.</p>
          </div>
          <div className="grid lg:grid-cols-3">
            {REGULAR_TOOLKIT.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="min-h-[190px] border-b border-white/[0.06] px-5 py-5 lg:border-b-0 lg:border-r lg:last:border-r-0">
                  <div className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.22)`, background: `rgba(${item.rgb},0.035)` }}><Icon size={15} /></span><span className="font-mono text-[8px] text-slate-700">0{index + 1}</span></div>
                  <h3 className="mt-4 text-[13px] font-semibold text-white/84">{item.label}</h3>
                  <p className="mt-2 text-[10px] leading-5 text-slate-600">{item.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
            <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6">
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200/48"><Layers3 size={13} /> More memory, more language structure</div>
              <h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold tracking-[-0.043em] text-white">Machine classes form a ladder of expressive power.</h2>
            </div>
            <div>
              {MEMORY_STEPS.map(([memory, language, detail], index) => (
                <div key={memory} className="grid gap-3 border-b border-white/[0.06] px-5 py-4 last:border-b-0 sm:grid-cols-[38px_150px_170px_minmax(0,1fr)] sm:items-center">
                  <span className="font-mono text-[8px] text-cyan-200/34">0{index + 1}</span>
                  <strong className="text-[11px] text-white/82">{memory}</strong>
                  <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-violet-200/50">{language}</span>
                  <span className="text-[10px] leading-5 text-slate-600">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-white/[0.08] bg-black/[0.13] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-pink-200/46"><Route size={13} /> Recognition, not simulation theater</div>
            <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">Automata are mathematical models, not tiny virtual robots.</h2>
            <p className="mt-3 text-[11px] leading-5 text-slate-500">The point is to isolate computational structure: how much memory is available, how input is consumed, what transitions are legal, and which strings are accepted. Practical systems may use finite-state ideas, but applications do not define the theory.</p>
          </aside>
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <Neighbor href="/formal-science/computer-science/theory" label="Computation Theory" note="Return to the broader model → possibility → cost spine." rgb="192, 132, 252" />
          <Neighbor href="/formal-science/computer-science/algorithms" label="Algorithms & Data" note="Compare abstract recognition models with concrete algorithm design." rgb="167, 139, 250" />
          <Neighbor href="/formal-science/logic" label="Formal Logic" note="Languages, syntax, models, and proof systems meet computation throughout theoretical computer science." rgb="248, 113, 113" />
        </section>
      </div>
    </main>
  );
}

function Neighbor({ href, label, note, rgb }: { href: string; label: string; note: string; rgb: string }) {
  return <Link href={href} className="group flex min-h-[88px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.12] px-4 py-3 backdrop-blur-md transition hover:bg-white/[0.025]"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 18px rgba(${rgb},0.22)` }} /><span className="min-w-0 flex-1"><strong className="block text-[12px] text-white/82">{label}</strong><span className="mt-1 block text-[10px] leading-4 text-slate-600">{note}</span></span><ArrowRight size={12} className="text-slate-600 transition group-hover:translate-x-1" /></Link>;
}
