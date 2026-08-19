import Link from "next/link";
import {
  ArrowRight,
  Binary,
  Braces,
  CircleDot,
  GitBranch,
  Table2,
} from "lucide-react";
import Assessment from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import VocabApplet from "@/app/_components/VocabApplet";
import { propLogicVocab } from "@/app/_data/vocab/p/propositional-logic";
import { propLogicQuiz } from "./_components/assessment";
import EquivalenceLab from "./_components/EquivalenceLab";
import PropositionalBackground from "./_components/PropositionalBackground";
import TruthTableLab from "./_components/TruthTableLab";

const CONNECTIVES = [
  ["¬P", "negation", "reverses the truth value of P"],
  ["P ∧ Q", "conjunction", "true only when both P and Q are true"],
  ["P ∨ Q", "inclusive disjunction", "true when at least one of P or Q is true"],
  ["P → Q", "material conditional", "false only when P is true and Q is false"],
  ["P ↔ Q", "biconditional", "true when P and Q have matching truth values"],
  ["P ⊕ Q", "exclusive disjunction", "true when exactly one of P and Q is true"],
] as const;

export default function PropositionalLogicPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#040208] text-slate-100 selection:bg-violet-400/25">
      <PropositionalBackground />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_18%_16%,rgba(168,85,247,0.06),transparent_28%),linear-gradient(to_bottom,rgba(4,2,8,0.08),rgba(4,2,8,0.62))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-4 pb-16 sm:px-6 xl:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-white/[0.055] bg-[#040208]/78 px-4 pb-3 pt-4 shadow-[0_18px_58px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8">
          <DomainPageHeader
            breadcrumbs={[
              { label: "Formal Sciences", href: "/formal-science" },
              { label: "Logic", href: "/formal-science/logic" },
              { label: "Propositional Logic" },
            ]}
            eyebrow="Propositions · assignments · connectives · truth tables · equivalence"
            eyebrowStyle="rule"
            icon={GitBranch}
            title={<span>Propositional Logic</span>}
            subtitle="Study formulas built from propositions and truth-functional connectives. Truth tables define how formulas evaluate under assignments, while equivalence compares formulas across every possible assignment in the table."
            accentRgb="168, 85, 247"
            titleClassName="font-sans text-[clamp(2.65rem,5vw,5.5rem)] font-semibold leading-[0.86] tracking-[-0.063em] text-[#fcf8ff]"
            headerClassName="border-white/[0.07]"
          />
        </div>

        <nav className="mt-3 grid gap-2 sm:grid-cols-3" aria-label="Logic sequence">
          <Link
            href="/formal-science/logic"
            className="group rounded-[16px] border border-white/[0.06] bg-black/24 p-3 backdrop-blur-lg transition-colors hover:border-violet-200/16"
          >
            <div className="font-mono text-[8px] uppercase tracking-[0.11em] text-slate-700">parent</div>
            <div className="mt-1 flex items-center justify-between gap-2 text-[11px] font-semibold text-slate-400">
              Logic hub <ArrowRight size={11} className="text-slate-700 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
          <div className="rounded-[16px] border border-violet-300/20 bg-violet-300/[0.045] p-3 backdrop-blur-lg">
            <div className="font-mono text-[8px] uppercase tracking-[0.11em] text-violet-300/50">current</div>
            <div className="mt-1 text-[11px] font-semibold text-violet-100">Propositional Logic</div>
          </div>
          <Link
            href="/formal-science/logic/first-order-logic"
            className="group rounded-[16px] border border-white/[0.06] bg-black/24 p-3 backdrop-blur-lg transition-colors hover:border-cyan-200/16"
          >
            <div className="font-mono text-[8px] uppercase tracking-[0.11em] text-slate-700">next active branch</div>
            <div className="mt-1 flex items-center justify-between gap-2 text-[11px] font-semibold text-slate-400">
              First-Order Logic <ArrowRight size={11} className="text-slate-700 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </nav>

        <section className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-stretch">
          <div className="rounded-[24px] border border-violet-200/[0.12] bg-[#0a0610]/76 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/65">
              <CircleDot size={12} /> Classical scope
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">A proposition is treated as true or false.</h2>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              In classical propositional logic, an atomic proposition is a statement represented by a symbol such as P or Q and assigned one of two truth values. The formal system then studies how compound formulas depend on those assigned values.
            </p>
            <div className="mt-4 space-y-2">
              <Example label="Proposition" text="P: 7 is prime." tone="violet" />
              <Example label="Proposition" text="Q: 10 is odd." tone="violet" />
              <Example label="Not a proposition here" text="What time is it? (question)" tone="slate" />
              <Example label="Not a proposition here" text="x > 2 (open formula until x is specified or quantified)" tone="slate" />
            </div>
            <div className="mt-4 rounded-xl border border-amber-200/[0.08] bg-amber-100/[0.018] p-3 text-[10px] leading-5 text-slate-600">
              This lesson is about a particular formal system. It is not a claim that every meaningful sentence, vague statement, paradox, or real-world uncertainty must fit neatly into two values.
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.065] bg-black/22 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-600">
              <Braces size={12} /> syntax → assignment → evaluation
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <Step number="01" title="Write a formula" text="Combine proposition symbols with connectives and parentheses." />
              <Step number="02" title="Choose an assignment" text="Give each atomic proposition a truth value." />
              <Step number="03" title="Evaluate" text="Apply connective definitions from the inside outward." />
            </div>
          </div>
        </section>

        <div className="mt-3">
          <TruthTableLab />
        </div>

        <div className="mt-3">
          <EquivalenceLab />
        </div>

        <section className="mt-3 rounded-[24px] border border-white/[0.065] bg-[#08050d]/74 p-5 backdrop-blur-xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/60">
                <Binary size={12} /> Connective reference
              </div>
              <h2 className="mt-1.5 text-xl font-semibold text-white">Definitions first, intuition second.</h2>
            </div>
            <p className="max-w-xl text-[10px] leading-5 text-slate-600">
              Everyday language often carries implication, exclusivity, emphasis, timing, and context beyond these truth-functional definitions.
            </p>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {CONNECTIVES.map(([formula, label, rule]) => (
              <div key={formula} className="rounded-[15px] border border-white/[0.05] bg-white/[0.014] p-3">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-serif text-lg text-violet-100/85">{formula}</div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.09em] text-slate-700">{label}</div>
                </div>
                <p className="mt-2 text-[10px] leading-4 text-slate-500">{rule}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-3 grid gap-3 xl:grid-cols-2">
          <div className="rounded-[24px] border border-white/[0.06] bg-black/20 p-4 backdrop-blur-xl">
            <VocabApplet currentDomain="Prop Logic" localTerms={propLogicVocab} accentColor="purple" />
          </div>
          <div className="rounded-[24px] border border-white/[0.06] bg-black/20 p-4 backdrop-blur-xl">
            <Assessment
              title="Knowledge Check: Propositional Logic"
              questions={propLogicQuiz}
              accentColor="purple"
            />
          </div>
        </section>

        <div className="mt-4 flex flex-col gap-2 border-t border-white/[0.055] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/formal-science/logic" className="text-[10px] font-semibold text-slate-600 transition-colors hover:text-slate-300">
            Return to Logic
          </Link>
          <Link
            href="/formal-science/logic/first-order-logic"
            className="group inline-flex items-center gap-2 rounded-xl border border-violet-300/16 bg-violet-300/[0.04] px-4 py-2.5 text-[10px] font-semibold text-violet-200/80 transition-colors hover:border-violet-300/28 hover:text-violet-100"
          >
            Next: First-Order Logic <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}

function Example({ label, text, tone }: { label: string; text: string; tone: "violet" | "slate" }) {
  return (
    <div className="rounded-xl border border-white/[0.055] bg-black/18 p-3">
      <div className={`font-mono text-[8px] uppercase tracking-[0.1em] ${tone === "violet" ? "text-violet-300/58" : "text-slate-700"}`}>{label}</div>
      <div className="mt-1.5 text-[11px] text-slate-400">{text}</div>
    </div>
  );
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="rounded-[16px] border border-white/[0.055] bg-white/[0.014] p-4">
      <div className="font-mono text-[9px] font-semibold text-violet-300/42">{number}</div>
      <div className="mt-2 text-[13px] font-semibold text-slate-200">{title}</div>
      <p className="mt-1.5 text-[10px] leading-5 text-slate-600">{text}</p>
    </div>
  );
}
