import type { Metadata } from "next";
import Link from "next/link";
import CurriculumSiblingNav from "@/app/_components/CurriculumSiblingNav";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import { requireCurriculumPageContext } from "@/lib/curriculum/page-context";
import type { CurriculumNode } from "@/lib/curriculum/types";
import {
  ArrowRight,
  Binary,
  BookOpenText,
  Brackets,
  CircleDotDashed,
  Combine,
  Divide,
  EqualApproximately,
  GitBranch,
  ListOrdered,
  Route,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import CombinatoricsAssessment from "./CombinatoricsAssessment";
import CombinatoricsWorld from "./CombinatoricsWorld";
import CountingTokenMark from "./CountingTokenMark";
import CountingVault from "./CountingVault";
import {
  CANONICAL_COUNTING_CASE,
  COUNTING_TOKENS,
  enumerateOutcomes,
} from "./combinatoricsModel";

const NODE_ID = "formal.mathematics.discrete.combinatorics";

export const metadata: Metadata = {
  title: "Combinatorics",
  description:
    "Count ordered arrangements and unordered selections by tracing decisions, recognizing symmetry, and practicing deterministic permutation and combination cases.",
};

const ORDERED_CANONICAL_OUTCOMES = enumerateOutcomes(
  CANONICAL_COUNTING_CASE.tokenIds,
  CANONICAL_COUNTING_CASE.k,
  "permutation"
);

const COUNTING_RULES = [
  {
    icon: GitBranch,
    name: "Add disjoint routes",
    label: "Sum rule",
    expression: String.raw`m+n`,
    explanation:
      "Use addition when an outcome follows exactly one of several non-overlapping alternatives.",
    tone: "cyan",
  },
  {
    icon: Combine,
    name: "Multiply successive choices",
    label: "Product rule",
    expression: String.raw`m\times n`,
    explanation:
      "Use multiplication when every first-stage choice can be followed by every available second-stage choice.",
    tone: "amber",
  },
  {
    icon: Divide,
    name: "Collapse equivalent orders",
    label: "Symmetry correction",
    expression: String.raw`\frac{P(n,k)}{k!}=C(n,k)`,
    explanation:
      "Divide when several ordered descriptions represent the same outcome under the problem's sameness rule.",
    tone: "violet",
  },
] as const;

const RULE_TONE = {
  cyan: "border-cyan-100/[0.14] bg-cyan-300/[0.035] text-cyan-100",
  amber: "border-amber-100/[0.14] bg-amber-300/[0.04] text-amber-100",
  violet: "border-violet-100/[0.14] bg-violet-300/[0.035] text-violet-100",
} as const;

export default function CombinatoricsPage() {
  const context = requireCurriculumPageContext(NODE_ID);

  if (context.pageKind !== "unit") {
    throw new Error("Combinatorics must be classified as a root unit.");
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080705] text-stone-100 selection:bg-amber-300/25">
      <CombinatoricsWorld />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_68%_33%,transparent_0%,rgba(8,7,5,0.08)_44%,rgba(8,7,5,0.72)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 pb-28 sm:px-6 xl:px-10">
        <div className="bg-[#080705]/68 sticky top-0 z-30 -mx-4 border-b border-amber-100/[0.08] px-4 pb-4 pt-6 shadow-[0_18px_58px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:-mx-6 sm:px-6 xl:-mx-10 xl:px-10">
          <DomainPageHeader
            breadcrumbs={context.breadcrumbs}
            eyebrow="Discrete mathematics · root unit"
            eyebrowStyle="rule"
            icon={Brackets}
            title={<span>Combinatorics</span>}
            subtitle="Combinatorics compresses a decision process into a count. Ask which choices are possible, which stages multiply, which cases add, and—most importantly—when two descriptions represent the same outcome."
            accentRgb="251, 191, 36"
            titleClassName="font-sans text-[clamp(2.85rem,5.4vw,5.6rem)] font-semibold leading-[0.88] tracking-[-0.062em] text-[#fffaf0]"
            headerClassName="border-amber-100/[0.1]"
            aside={
              <div className="grid grid-cols-2 border border-amber-100/[0.12] bg-black/20 font-mono">
                <div className="border-r border-white/[0.08] px-4 py-3 text-center">
                  <strong className="block text-[18px] text-amber-100">
                    12
                  </strong>
                  <span className="text-[9px] uppercase tracking-[0.13em] text-stone-600">
                    sequences
                  </span>
                </div>
                <div className="px-4 py-3 text-center">
                  <strong className="block text-[18px] text-cyan-100">6</strong>
                  <span className="text-[9px] uppercase tracking-[0.13em] text-stone-600">
                    selections
                  </span>
                </div>
              </div>
            }
          />
        </div>

        <CombinatoricsLearningLedger lessons={context.children} />

        <section
          className="mt-28 grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center"
          aria-labelledby="combinatorics-model-title"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/60">
              <Binary size={14} /> Orient · one finite decision process
            </div>
            <h2
              id="combinatorics-model-title"
              className="mt-3 text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[0.96] tracking-[-0.052em] text-white"
            >
              Four first choices. Three choices remain.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-stone-300">
              Place two different tokens into two numbered slots. Any of four
              tokens can go first; after that choice, only three remain. The
              product rule counts every branch without writing an endless list.
            </p>
            <div className="mt-6 border-y border-white/[0.08] py-5 text-[clamp(1.3rem,3vw,2rem)] text-amber-50">
              <M>{String.raw`4\times 3=12`}</M>
            </div>
            <p className="mt-5 text-[14px] leading-6 text-stone-500">
              Every token keeps the same color and shape in the background, this
              decision register, and the default counting chamber below.
            </p>
          </div>

          <CanonicalDecisionRegister />
        </section>

        <section className="mt-28" aria-labelledby="counting-rules-title">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100/60">
              Explain · the reusable compression rules
            </div>
            <h2
              id="counting-rules-title"
              className="mt-3 text-[clamp(2rem,3.8vw,3.45rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white"
            >
              Build the count, then correct what counts as the same.
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-stone-400">
              Counting is not formula matching. Trace the decisions first, then
              choose the operation that preserves the problem’s meaning.
            </p>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            {COUNTING_RULES.map((rule) => (
              <CountingRule key={rule.label} {...rule} />
            ))}
          </div>

          <div className="bg-[#0e0a06]/52 mt-5 grid border-y border-white/[0.08] backdrop-blur-xl lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-100/55">
                <ListOrdered size={13} /> Numbered positions
              </div>
              <p className="mt-3 text-[14px] leading-6 text-stone-300">
                AB and BA are different sequences, so the 12 ordered outcomes
                remain distinct.
              </p>
            </div>
            <div className="hidden h-14 w-px bg-white/[0.1] lg:block" />
            <div className="border-t border-white/[0.08] p-5 sm:p-6 lg:border-t-0 lg:text-right">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100/55 lg:justify-end">
                <EqualApproximately size={13} /> One selected collection
              </div>
              <p className="mt-3 text-[14px] leading-6 text-stone-300">
                {`{A, B}`} and {`{B, A}`} name the same pair, so each selection
                was counted 2! times: 12 ÷ 2 = 6.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-32" aria-labelledby="counting-chamber-title">
          <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_370px] lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100/60">
                <CircleDotDashed size={14} /> Do · counting chamber
              </div>
              <h2
                id="counting-chamber-title"
                className="mt-3 text-[clamp(2rem,4vw,3.65rem)] font-semibold leading-[0.98] tracking-[-0.052em] text-white"
              >
                Change the sameness rule. Watch the possibility space collapse.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-stone-400">
                Keep the available objects and selection size visible while you
                switch between numbered positions and one unordered collection.
                The tokens stay fixed; only the meaning of an outcome changes.
              </p>
            </div>
            <aside className="border-l border-cyan-200/20 pl-5 text-[13px] leading-6 text-stone-400">
              <strong className="block text-[14px] text-cyan-100">
                Meaning comes before notation.
              </strong>
              “Choose” does not automatically mean combination. Ask whether a
              reordering creates a genuinely different result.
            </aside>
          </div>

          <CountingVault />
        </section>

        <section
          className="mt-28 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]"
          aria-labelledby="counting-boundaries-title"
        >
          <div className="border-y border-rose-100/[0.12] bg-rose-300/[0.025] p-6 backdrop-blur-xl sm:p-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-100/60">
              Boundary · the familiar formulas have assumptions
            </div>
            <h2
              id="counting-boundaries-title"
              className="mt-3 text-[28px] font-semibold tracking-[-0.045em] text-white"
            >
              Distinct objects. No repetition. Fixed selection size.
            </h2>
            <p className="mt-4 max-w-3xl text-[14px] leading-7 text-stone-400">
              The chamber uses those three conditions. Allowing repetition can
              keep the same number of choices at each slot. Indistinguishable
              objects erase labels. Overlapping cases require
              inclusion–exclusion. Distribution constraints may require a new
              model entirely.
            </p>
            <div className="mt-6 grid gap-px bg-white/[0.08] sm:grid-cols-3">
              {[
                ["Repetition", "Can an object be used again?"],
                ["Identity", "Are the objects distinguishable?"],
                ["Constraint", "Can every choice follow every earlier choice?"],
              ].map(([label, question]) => (
                <div key={label} className="bg-[#0b0806]/92 p-4">
                  <strong className="text-[13px] text-stone-200">
                    {label}
                  </strong>
                  <p className="mt-2 text-[12px] leading-5 text-stone-500">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="border border-violet-100/[0.12] bg-violet-300/[0.025] p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-100/60">
              <BookOpenText size={14} /> Advanced horizon
            </div>
            <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.04em] text-white">
              There are deeper counting engines.
            </h3>
            <p className="mt-4 text-[13px] leading-6 text-stone-500">
              Generating functions, recurrence methods, Ramsey theory, extremal
              combinatorics, and enumerative geometry become valuable later.
              They remain one visible horizon here—not an endless placeholder
              taxonomy.
            </p>
          </aside>
        </section>

        <section className="mt-32" aria-labelledby="combinatorics-check-title">
          <div className="mb-8 max-w-3xl">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-100/60">
              <Sparkles size={14} /> Check · transfer and fluency
            </div>
            <h2
              id="combinatorics-check-title"
              className="mt-3 text-[clamp(2rem,4vw,3.65rem)] font-semibold leading-[0.98] tracking-[-0.052em] text-white"
            >
              Name what changes, then compute the count.
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-stone-400">
              First identify the correct sameness rule in a new context. Then
              practice fresh bounded cases checked by the same counting model.
            </p>
          </div>

          <CombinatoricsAssessment />
        </section>

        <section className="mt-24 border-y border-white/[0.08] bg-[#0b0806]/50 backdrop-blur-xl">
          <div className="grid lg:grid-cols-2">
            <div className="p-6 sm:p-8 lg:border-r lg:border-white/[0.08]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/60">
                Parent tool
              </div>
              <Link
                href="/formal-science/mathematics/discrete"
                className="group mt-4 flex items-center justify-between gap-5 border-y border-white/[0.08] py-4"
              >
                <span>
                  <strong className="block text-[15px] text-stone-100">
                    Discrete Mathematics graph builder
                  </strong>
                  <span className="mt-1 block text-[12px] leading-5 text-stone-500">
                    Return to the shared finite specimen and compare counting
                    with membership, connection, and recursion.
                  </span>
                </span>
                <ArrowRight
                  className="shrink-0 text-stone-500 transition-transform group-hover:translate-x-1"
                  size={15}
                />
              </Link>
            </div>
            <div className="p-6 sm:p-8">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-100/60">
                Conceptual cross-link
              </div>
              <Link
                href="/formal-science/mathematics/statistics/probability"
                className="group mt-4 flex items-center justify-between gap-5 border-y border-white/[0.08] py-4"
              >
                <span>
                  <strong className="block text-[15px] text-stone-100">
                    Probability Theory
                  </strong>
                  <span className="mt-1 block text-[12px] leading-5 text-stone-500">
                    Use combinatorial counts to measure equally likely outcomes
                    inside a sample space.
                  </span>
                </span>
                <ArrowRight
                  className="shrink-0 text-stone-500 transition-transform group-hover:translate-x-1"
                  size={15}
                />
              </Link>
            </div>
          </div>
        </section>

        <CurriculumSiblingNav
          previous={context.previousActiveSibling}
          parent={context.parent}
          next={context.nextActiveSibling}
          accentRgb="251, 191, 36"
        />
      </div>
    </main>
  );
}

function CombinatoricsLearningLedger({
  lessons,
}: {
  lessons: readonly CurriculumNode[];
}) {
  const leaves = [
    {
      title: "Build the count",
      note: "Trace alternatives, stages, and symmetry before reaching for a formula.",
      tone: "amber",
      lessons: lessons.slice(0, 3),
    },
    {
      title: "Control the constraints",
      note: "Correct overlap, distribution rules, and existence claims that simple multiplication misses.",
      tone: "cyan",
      lessons: lessons.slice(3),
    },
  ] as const;

  return (
    <section
      className="mt-12 grid gap-8 border-b border-amber-100/[0.08] pb-16 lg:grid-cols-[0.56fr_1.44fr] lg:items-center"
      aria-labelledby="combinatorics-ledger-title"
    >
      <div className="max-w-lg">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100/60">
          <Route size={14} /> Navigate · a bounded counting ledger
        </div>
        <h2
          id="combinatorics-ledger-title"
          className="mt-3 text-[clamp(2rem,3.9vw,3.6rem)] font-semibold leading-[0.97] tracking-[-0.052em] text-white"
        >
          First construct possibilities. Then repair the naive count.
        </h2>
        <p className="mt-5 text-[15px] leading-7 text-stone-400">
          Six direct lessons form the practical depth ceiling. This overview
          teaches ordered versus unordered selection; the planned leaves later
          isolate each counting question without turning the field into an
          infinite outline.
        </p>
        <div className="mt-7 border-l border-amber-200/25 bg-amber-300/[0.035] px-5 py-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-100/55">
            Current overview workshop
          </div>
          <strong className="mt-2 block text-[17px] text-white">
            Permutations, combinations, and sameness
          </strong>
        </div>
      </div>

      <nav
        className="bg-[#0c0906]/58 grid overflow-hidden border border-amber-100/[0.12] shadow-[0_30px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl md:grid-cols-2"
        aria-label="Combinatorics learning ledger"
      >
        {leaves.map((leaf, leafIndex) => (
          <div
            key={leaf.title}
            className={`${leafIndex === 0 ? "md:border-r md:border-amber-100/[0.1]" : "border-t border-cyan-100/[0.08] md:border-t-0"}`}
          >
            <div
              className={`border-b p-5 sm:p-6 ${
                leaf.tone === "amber"
                  ? "border-amber-100/[0.12] bg-amber-300/[0.045]"
                  : "border-cyan-100/[0.12] bg-cyan-300/[0.035]"
              }`}
            >
              <div
                className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${leaf.tone === "amber" ? "text-amber-100/60" : "text-cyan-100/60"}`}
              >
                Ledger leaf {leafIndex + 1}
              </div>
              <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.035em] text-white">
                {leaf.title}
              </h3>
              <p className="mt-2 text-[12px] leading-5 text-stone-500">
                {leaf.note}
              </p>
            </div>

            <ol className="divide-y divide-white/[0.07]">
              {leaf.lessons.map((lesson, index) => (
                <li key={lesson.id} className="grid grid-cols-[42px_1fr]">
                  <span className="flex items-start justify-center border-r border-white/[0.07] pt-5 font-mono text-[10px] text-stone-600">
                    {String(leafIndex * 3 + index + 1).padStart(2, "0")}
                  </span>
                  <article className="min-h-36 p-4 sm:p-5">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600">
                      Planned lesson
                    </div>
                    <h4 className="mt-1 text-[16px] font-semibold leading-5 text-stone-200">
                      {lesson.label}
                    </h4>
                    <p className="mt-2 text-[12px] leading-5 text-stone-500">
                      {lesson.description}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </nav>
    </section>
  );
}

function CanonicalDecisionRegister() {
  const tokens = COUNTING_TOKENS.slice(0, 4);

  return (
    <div className="bg-[#100b06]/68 relative overflow-hidden border border-amber-100/[0.14] p-5 shadow-[0_34px_100px_rgba(0,0,0,0.26)] backdrop-blur-2xl sm:p-7">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100/60">
            Canonical decision register
          </div>
          <h3 className="mt-2 text-[25px] font-semibold tracking-[-0.04em] text-white">
            Each first token opens three second branches.
          </h3>
        </div>
        <span className="shrink-0 font-mono text-[12px] text-amber-100/55">
          4 × 3
        </span>
      </div>

      <div className="mt-7 overflow-x-auto [scrollbar-color:rgba(251,191,36,0.18)_transparent] [scrollbar-width:thin]">
        <div className="min-w-[590px] border border-white/[0.08] bg-black/20">
          <div className="grid grid-cols-[125px_1fr] border-b border-white/[0.08] text-[10px] font-semibold uppercase tracking-[0.13em] text-stone-600">
            <div className="border-r border-white/[0.08] px-4 py-3">
              First slot
            </div>
            <div className="px-4 py-3">Three remaining second choices</div>
          </div>
          {tokens.map((firstToken) => {
            const branches = ORDERED_CANONICAL_OUTCOMES.filter(
              (outcome) => outcome[0] === firstToken.id
            );
            return (
              <div
                key={firstToken.id}
                className="grid grid-cols-[125px_1fr] border-b border-white/[0.07] last:border-b-0"
              >
                <div className="flex items-center gap-3 border-r border-white/[0.08] p-3">
                  <CountingTokenMark token={firstToken} size="md" />
                  <span className="font-mono text-[10px] text-stone-600">
                    first
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-px bg-white/[0.06]">
                  {branches.map((outcome) => {
                    const secondToken = tokens.find(
                      (token) => token.id === outcome[1]
                    );
                    if (!secondToken) return null;
                    return (
                      <div
                        key={outcome.join("")}
                        className="flex min-h-16 items-center justify-center gap-2 bg-[#0b0806] p-2"
                      >
                        <CountingTokenMark token={firstToken} size="sm" />
                        <ArrowRight size={12} className="text-stone-700" />
                        <CountingTokenMark token={secondToken} size="sm" />
                        <span className="font-mono text-[10px] text-stone-500">
                          {outcome.join("")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CountingRule({
  icon: Icon,
  name,
  label,
  expression,
  explanation,
  tone,
}: {
  icon: LucideIcon;
  name: string;
  label: string;
  expression: string;
  explanation: string;
  tone: keyof typeof RULE_TONE;
}) {
  return (
    <article className={`border p-5 backdrop-blur-xl ${RULE_TONE[tone]}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] opacity-55">
            {label}
          </div>
          <h3 className="mt-2 text-[19px] font-semibold text-white">{name}</h3>
        </div>
        <Icon size={19} className="shrink-0 opacity-65" />
      </div>
      <div className="mt-5 min-h-12 border-y border-white/[0.08] py-3 text-[18px]">
        <M>{expression}</M>
      </div>
      <p className="mt-4 text-[13px] leading-6 text-stone-400">{explanation}</p>
    </article>
  );
}
