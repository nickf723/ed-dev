"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleDot,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import Assessment, { type AssessmentQuestion } from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import FundamentalsLessonBackgroundV2 from "./FundamentalsLessonBackgroundV2";

export type PropertiesLessonNavItem = {
  label: string;
  href: string;
};

type AlgebraicPropertiesLessonExperienceProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: PropertiesLessonNavItem;
  next?: PropertiesLessonNavItem;
  unitHref: string;
};

type PropertyId =
  | "commutative"
  | "associative"
  | "distributive"
  | "identity"
  | "inverse";

type PropertyAnswer = PropertyId | "invalid";

type RewriteCase = {
  before: string;
  goal: string;
  after: string;
  answer: PropertyAnswer;
  explanation: string;
};

const ACCENT = "129, 140, 248";

const PROPERTIES: Record<
  PropertyId,
  {
    label: string;
    rule: string;
    action: string;
    boundary: string;
    color: string;
  }
> = {
  commutative: {
    label: "Commutative",
    rule: "a + b = b + a",
    action: "Change order without changing grouping.",
    boundary: "Works for addition and multiplication, not subtraction or division.",
    color: "34, 211, 238",
  },
  associative: {
    label: "Associative",
    rule: "(a + b) + c = a + (b + c)",
    action: "Change grouping without changing order.",
    boundary: "Applies to repeated addition or repeated multiplication.",
    color: "129, 140, 248",
  },
  distributive: {
    label: "Distributive",
    rule: "a(b + c) = ab + ac",
    action: "Connect multiplication outside a group to every term inside it.",
    boundary: "Every term in the grouped sum or difference receives the factor.",
    color: "52, 211, 153",
  },
  identity: {
    label: "Identity",
    rule: "a + 0 = a   ·   a · 1 = a",
    action: "Add or remove a neutral element without changing the value.",
    boundary: "0 is additive identity; 1 is multiplicative identity.",
    color: "251, 191, 36",
  },
  inverse: {
    label: "Inverse",
    rule: "a + (−a) = 0   ·   a · 1/a = 1",
    action: "Pair a value with something that cancels it to an identity.",
    boundary: "A multiplicative inverse requires a ≠ 0.",
    color: "244, 114, 182",
  },
};

const REWRITE_CASES: readonly RewriteCase[] = [
  {
    before: "a + b",
    goal: "Swap the order of the addends.",
    after: "b + a",
    answer: "commutative",
    explanation: "Addition is commutative, so changing order preserves the value.",
  },
  {
    before: "(a + b) + c",
    goal: "Keep the same order, but regroup the addition.",
    after: "a + (b + c)",
    answer: "associative",
    explanation: "Associativity changes grouping while preserving the order of the addends.",
  },
  {
    before: "4(x + 3)",
    goal: "Remove the grouping by multiplying through it.",
    after: "4x + 12",
    answer: "distributive",
    explanation: "The outside factor 4 multiplies every term inside the parentheses.",
  },
  {
    before: "y + 0",
    goal: "Remove the neutral additive element.",
    after: "y",
    answer: "identity",
    explanation: "Adding 0 does not change a value, so the additive identity can disappear.",
  },
  {
    before: "z + (−z)",
    goal: "Collapse the additive inverse pair.",
    after: "0",
    answer: "inverse",
    explanation: "A value plus its additive inverse cancels to the additive identity 0.",
  },
  {
    before: "a − b",
    goal: "Swap the two terms to get b − a without changing anything else.",
    after: "a − b",
    answer: "invalid",
    explanation: "Subtraction is not commutative. In general, a − b and b − a are different values.",
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "properties-transfer-distribute",
    type: "mcq",
    prompt: "Which property justifies 5(y − 2) = 5y − 10?",
    options: ["Commutative", "Associative", "Distributive", "Identity"],
    correctAnswer: "Distributive",
    explanation: "The factor 5 is applied to both terms inside the parentheses.",
  },
  {
    id: "properties-transfer-associative",
    type: "tf",
    prompt: "(a × b) × c = a × (b × c) is an associative property.",
    correctAnswer: true,
    explanation: "The order stays the same while the grouping changes.",
  },
  {
    id: "properties-transfer-invalid",
    type: "mcq",
    prompt: "Which rewrite is NOT justified by a commutative property?",
    options: ["a + b → b + a", "ab → ba", "a − b → b − a"],
    correctAnswer: "a − b → b − a",
    explanation: "Subtraction is not commutative.",
  },
];

export default function AlgebraicPropertiesLessonExperience({
  breadcrumbs,
  previous,
  next,
  unitHref,
}: AlgebraicPropertiesLessonExperienceProps) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [answer, setAnswer] = useState<PropertyAnswer | null>(null);
  const [applied, setApplied] = useState(false);

  const currentCase = REWRITE_CASES[caseIndex];
  const correct = answer === currentCase.answer;

  function nextCase() {
    setCaseIndex((current) => (current + 1) % REWRITE_CASES.length);
    setAnswer(null);
    setApplied(false);
  }

  function resetCase() {
    setAnswer(null);
    setApplied(false);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#09091d] text-stone-100">
      <FundamentalsLessonBackgroundV2 lesson="algebraic-properties" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03),rgba(0,0,0,0.44))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow="Lesson 04 · Algebraic Properties"
          icon={RefreshCcw}
          title={<span>Algebraic Properties</span>}
          subtitle="Treat algebraic properties as general permissions for rewriting expressions without changing their value, and learn the boundaries of each permission."
          accentRgb={ACCENT}
          titleClassName="font-mono text-[clamp(2.2rem,4.35vw,4.55rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f8f7ff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <LessonUtilityBar
          practiceTargetId="properties-practice"
          vocabulary
          accentRgb={ACCENT}
        />

        <section className="mt-4 grid gap-4 rounded-[26px] border border-indigo-200/[0.11] bg-black/[0.20] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_26px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/75">
              The learner question
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">
              When are two different-looking expressions guaranteed to mean the same thing?
            </h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-400">
              Algebraic properties are not tricks for moving symbols. They are general statements that tell us exactly which rewrites preserve value for every allowed input.
            </p>
          </div>
          <div className="rounded-[18px] border border-indigo-200/[0.09] bg-indigo-400/[0.025] px-4 py-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-indigo-300/65">
              The question behind every rewrite
            </div>
            <div className="mt-2 font-mono text-[clamp(1.05rem,2vw,1.45rem)] text-indigo-100">
              Why is this legal?
            </div>
            <p className="mt-2 text-[11px] leading-5 text-stone-500">
              A trustworthy symbolic move should have a reusable property behind it, not merely look familiar.
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
          <div className="max-w-3xl">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/72">
              Worked model
            </div>
            <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">
              Distribution changes the form, not the value.
            </h2>
            <p className="mt-2 text-[12px] leading-5 text-stone-500">
              In 4(x + 3), the 4 multiplies the entire grouped sum. The distributive property lets us express that same multiplication term-by-term.
            </p>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] lg:items-center">
            <ModelExpression label="Grouped form" formula="4(x + 3)" rgb="129, 140, 248" />
            <div className="text-center font-mono text-[28px] text-violet-300">↔</div>
            <ModelExpression label="Distributed form" formula="4x + 12" rgb="52, 211, 153" />
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-300/68">
                General rule
              </div>
              <div className="mt-2 font-mono text-[18px] text-emerald-100">a(b + c) = ab + ac</div>
              <p className="mt-2 text-[11px] leading-5 text-stone-500">
                The statement is about the structure of multiplication over addition, so it works for every allowed choice of a, b, and c.
              </p>
            </div>
            <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-300/68">
                Concrete check
              </div>
              <div className="mt-2 font-mono text-[14px] text-cyan-100">x = 2: 4(2 + 3) = 20</div>
              <div className="mt-1 font-mono text-[14px] text-cyan-100">x = 2: 4(2) + 12 = 20</div>
              <p className="mt-2 text-[11px] leading-5 text-stone-500">
                A numerical check illustrates the equivalence. The property itself is stronger: it guarantees the relationship generally.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/72">
              The five permissions
            </div>
            <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">
              Each property changes a different feature of the expression.
            </h2>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {(Object.keys(PROPERTIES) as PropertyId[]).map((id) => {
              const property = PROPERTIES[id];
              return (
                <div key={id} className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
                  <div className="text-[10px] font-semibold" style={{ color: `rgb(${property.color})` }}>
                    {property.label}
                  </div>
                  <div className="mt-3 min-h-[48px] font-mono text-[12px] text-stone-300">
                    {property.rule}
                  </div>
                  <p className="mt-3 text-[10px] leading-4 text-stone-500">{property.action}</p>
                  <div className="mt-3 border-t border-white/[0.05] pt-3 text-[9px] leading-4 text-stone-600">
                    {property.boundary}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-indigo-200/[0.12] bg-[#080819]/55 p-5 backdrop-blur-2xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/72">
                Rewrite permit
              </div>
              <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">
                Name the law that permits the requested transformation.
              </h2>
              <p className="mt-2 max-w-3xl text-[11px] leading-5 text-stone-500">
                Sometimes the correct answer is that no listed property allows the requested move. Knowing where a rule stops is part of knowing the rule.
              </p>
            </div>
            <button
              type="button"
              onClick={resetCase}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.07] px-3 py-2 text-[10px] font-semibold text-stone-500 transition-colors hover:text-stone-300"
            >
              <RefreshCcw size={13} />
              Reset case
            </button>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_390px]">
            <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.16] p-5">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
                Case {caseIndex + 1} of {REWRITE_CASES.length}
              </div>
              <div className="mt-5 flex min-h-[112px] items-center justify-center rounded-[20px] border border-indigo-300/[0.10] bg-indigo-400/[0.025] px-4 font-mono text-[clamp(1.7rem,4vw,2.8rem)] text-indigo-100">
                {applied ? currentCase.after : currentCase.before}
              </div>
              <div className="mt-4 rounded-[18px] border border-white/[0.05] bg-white/[0.012] p-4">
                <div className="text-[9px] font-semibold uppercase tracking-[0.11em] text-stone-600">Goal</div>
                <p className="mt-2 text-[12px] leading-5 text-stone-400">{currentCase.goal}</p>
              </div>

              {applied ? (
                <div className="mt-4 rounded-[18px] border border-emerald-300/[0.15] bg-emerald-400/[0.035] p-4">
                  <div className="flex items-center gap-2 text-[10px] font-semibold text-emerald-200">
                    <Check size={13} />
                    {currentCase.answer === "invalid" ? "Correctly rejected" : "Rewrite justified"}
                  </div>
                  <p className="mt-2 text-[11px] leading-5 text-stone-500">{currentCase.explanation}</p>
                  <button
                    type="button"
                    onClick={nextCase}
                    className="mt-3 rounded-xl border border-emerald-300/[0.18] bg-emerald-400/[0.04] px-4 py-2 text-[10px] font-semibold text-emerald-200"
                  >
                    Next case
                  </button>
                </div>
              ) : null}
            </div>

            <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.12] p-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
                Choose a justification
              </div>
              <div className="mt-3 grid gap-2">
                {(Object.keys(PROPERTIES) as PropertyId[]).map((id) => {
                  const selected = answer === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      disabled={applied}
                      onClick={() => setAnswer(id)}
                      className="rounded-[14px] border px-3 py-3 text-left text-[11px] font-semibold transition-colors disabled:opacity-60"
                      style={{
                        borderColor: selected ? `rgba(${PROPERTIES[id].color},0.28)` : "rgba(255,255,255,0.06)",
                        background: selected ? `rgba(${PROPERTIES[id].color},0.05)` : "rgba(0,0,0,0.10)",
                        color: selected ? `rgb(${PROPERTIES[id].color})` : "rgb(168 162 158)",
                      }}
                    >
                      {PROPERTIES[id].label}
                    </button>
                  );
                })}
                <button
                  type="button"
                  disabled={applied}
                  onClick={() => setAnswer("invalid")}
                  className={`rounded-[14px] border px-3 py-3 text-left text-[11px] font-semibold transition-colors disabled:opacity-60 ${
                    answer === "invalid"
                      ? "border-amber-300/[0.24] bg-amber-400/[0.04] text-amber-200"
                      : "border-white/[0.06] bg-black/[0.10] text-stone-400"
                  }`}
                >
                  No listed property permits this
                </button>
              </div>

              {answer && !applied ? (
                <div
                  className={`mt-4 rounded-[17px] border px-4 py-3 ${
                    correct
                      ? "border-emerald-300/[0.16] bg-emerald-400/[0.035]"
                      : "border-amber-300/[0.14] bg-amber-400/[0.025]"
                  }`}
                  aria-live="polite"
                >
                  <div className={`text-[10px] font-semibold ${correct ? "text-emerald-200" : "text-amber-200"}`}>
                    {correct ? "That permission matches the goal" : "That property changes a different feature"}
                  </div>
                  <p className="mt-1 text-[11px] leading-5 text-stone-500">
                    {correct
                      ? currentCase.explanation
                      : answer === "invalid"
                        ? "A listed property does justify this rewrite. Compare whether the goal changes order, grouping, distribution, identity, or cancellation."
                        : `${PROPERTIES[answer].action} That is not the structural change requested here.`}
                  </p>
                  {correct ? (
                    <button
                      type="button"
                      onClick={() => setApplied(true)}
                      className="mt-3 rounded-xl border border-emerald-300/[0.18] bg-emerald-400/[0.04] px-4 py-2 text-[10px] font-semibold text-emerald-200"
                    >
                      {currentCase.answer === "invalid" ? "Reject rewrite" : "Apply rewrite"}
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <ContrastCard
            label="Commutative"
            formula="a + b → b + a"
            text="Order changes. Grouping does not."
            rgb="34, 211, 238"
          />
          <ContrastCard
            label="Associative"
            formula="(a + b) + c → a + (b + c)"
            text="Grouping changes. Order does not."
            rgb="129, 140, 248"
          />
          <ContrastCard
            label="Distributive"
            formula="a(b + c) → ab + ac"
            text="The operation structure changes: multiplication is carried across a grouped sum."
            rgb="52, 211, 153"
          />
        </section>

        <section id="properties-practice" className="scroll-mt-24 mt-4">
          <details className="group overflow-hidden rounded-[22px] border border-white/[0.09] bg-black/[0.18] backdrop-blur-2xl">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.13em] text-indigo-300/72">
                  Check transfer
                </span>
                <strong className="mt-1 block text-[15px] text-stone-200">
                  Justify fresh rewrites without the permit guide
                </strong>
              </span>
              <Sparkles size={16} className="text-indigo-300" />
            </summary>
            <div className="fundamentals-assessment border-t border-white/[0.06] p-3 sm:p-4">
              <Assessment title="Algebraic Properties check" questions={QUIZ} accentColor="indigo" />
            </div>
          </details>
        </section>

        <div className="mt-4 rounded-[20px] border border-white/[0.06] bg-black/[0.12] px-4 py-3">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
            What this unlocks
          </div>
          <p className="mt-1 text-[11px] leading-5 text-stone-500">
            These same permissions justify simplification, factoring, equation transformations, polynomial work, and eventually the abstract structures where the properties themselves become the subject.
          </p>
        </div>

        <LessonNavigation previous={previous} next={next} unitHref={unitHref} />
      </div>

      <style>{`
        .fundamentals-assessment > div { border-radius: 18px !important; padding: 16px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; }
        .fundamentals-assessment > div > div { min-height: 300px !important; }
        .fundamentals-assessment h3 { margin-bottom: 16px !important; font-size: 1.05rem !important; line-height: 1.45 !important; }
        .fundamentals-assessment button { padding-top: 10px !important; padding-bottom: 10px !important; }
      `}</style>
    </main>
  );
}

function ModelExpression({
  label,
  formula,
  rgb,
}: {
  label: string;
  formula: string;
  rgb: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/[0.06] bg-black/[0.12] p-5 text-center">
      <div className="text-[9px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.72)` }}>
        {label}
      </div>
      <div className="mt-3 font-mono text-[clamp(1.7rem,4vw,2.8rem)]" style={{ color: `rgb(${rgb})` }}>
        {formula}
      </div>
    </div>
  );
}

function ContrastCard({
  label,
  formula,
  text,
  rgb,
}: {
  label: string;
  formula: string;
  text: string;
  rgb: string;
}) {
  return (
    <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.14] p-4 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.72)` }}>
        <CircleDot size={12} />
        {label}
      </div>
      <div className="mt-3 font-mono text-[14px] text-stone-200">{formula}</div>
      <p className="mt-2 text-[11px] leading-5 text-stone-500">{text}</p>
    </div>
  );
}

function LessonNavigation({
  previous,
  next,
  unitHref,
}: {
  previous?: PropertiesLessonNavItem;
  next?: PropertiesLessonNavItem;
  unitHref: string;
}) {
  return (
    <nav className="mt-4 pb-8" aria-label="Algebra Fundamentals lesson navigation">
      <div className="mb-2 flex justify-end">
        <span className="font-mono text-[10px] text-stone-700">04 / 05</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? <NavCard item={previous} direction="previous" /> : <div className="hidden sm:block" aria-hidden="true" />}
        {next ? (
          <NavCard item={next} direction="next" />
        ) : (
          <Link
            href={unitHref}
            className="group flex min-h-[76px] items-center rounded-[18px] border border-indigo-300/[0.14] bg-indigo-400/[0.025] px-4"
          >
            <span className="min-w-0 flex-1 text-right">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-stone-600">Unit complete</span>
              <strong className="mt-1 block text-[14px] text-stone-200">Return to Algebra Fundamentals</strong>
            </span>
            <Check size={15} className="ml-3 text-indigo-300" />
          </Link>
        )}
      </div>
    </nav>
  );
}

function NavCard({
  item,
  direction,
}: {
  item: PropertiesLessonNavItem;
  direction: "previous" | "next";
}) {
  const previous = direction === "previous";
  return (
    <Link
      href={item.href}
      className="group flex min-h-[76px] items-center gap-3 rounded-[18px] border border-indigo-300/[0.12] bg-indigo-400/[0.02] px-4 py-3"
    >
      {previous ? <ArrowLeft size={15} className="text-indigo-300" /> : null}
      <span className={`min-w-0 flex-1 ${previous ? "" : "text-right"}`}>
        <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-stone-600">
          {previous ? "Previous lesson" : "Next lesson"}
        </span>
        <strong className="mt-1 block text-[14px] text-stone-200">{item.label}</strong>
      </span>
      {!previous ? <ArrowRight size={15} className="text-indigo-300" /> : null}
    </Link>
  );
}
