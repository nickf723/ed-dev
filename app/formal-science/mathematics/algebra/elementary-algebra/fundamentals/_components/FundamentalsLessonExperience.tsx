"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Braces,
  Check,
  CircleDot,
  Hash,
  RefreshCcw,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Assessment, { type AssessmentQuestion } from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import FundamentalsLessonBackgroundV2 from "./FundamentalsLessonBackgroundV2";

type ConceptLessonKey =
  | "expressions-variables"
  | "algebraic-properties"
  | "number-systems";

export type FundamentalsLessonNavItem = {
  label: string;
  href: string;
};

type FundamentalsLessonExperienceProps = {
  lesson: ConceptLessonKey;
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: FundamentalsLessonNavItem;
  next?: FundamentalsLessonNavItem;
  unitHref: string;
};

type LessonMeta = {
  step: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  core: string;
  accent: string;
  base: string;
  icon: LucideIcon;
};

type ExpressionPart =
  | "term"
  | "coefficient"
  | "variable"
  | "exponent"
  | "constant";

type PropertyId =
  | "commutative"
  | "associative"
  | "distributive"
  | "identity"
  | "inverse";

type PropertyAnswer = PropertyId | "invalid";

type NumberSetId =
  | "natural"
  | "integer"
  | "rational"
  | "irrational"
  | "real";

const META: Record<ConceptLessonKey, LessonMeta> = {
  "expressions-variables": {
    step: "01",
    title: "Expressions & Variables",
    eyebrow: "Read the structure",
    subtitle:
      "Take an expression apart into meaningful pieces, then use that structure to decide which terms can actually combine.",
    core: "Before changing an expression, learn to see what each piece is doing.",
    accent: "52, 211, 153",
    base: "#031912",
    icon: Braces,
  },
  "algebraic-properties": {
    step: "04",
    title: "Algebraic Properties",
    eyebrow: "Legal rewrites",
    subtitle:
      "Use properties as reusable permissions for changing an expression without changing its value.",
    core: "A rewrite is trustworthy when a general property explains why it preserves value.",
    accent: "129, 140, 248",
    base: "#09091d",
    icon: RefreshCcw,
  },
  "number-systems": {
    step: "05",
    title: "Number Systems",
    eyebrow: "Place the value",
    subtitle:
      "Classify numbers by the smallest set that contains them, then trace how those sets nest inside the real numbers.",
    core: "A number can belong to several sets at once, but one set is usually the most specific useful description.",
    accent: "251, 191, 36",
    base: "#171205",
    icon: Hash,
  },
};

const EXPRESSION_PARTS: Record<
  ExpressionPart,
  { label: string; definition: string; example: string; color: string }
> = {
  term: {
    label: "Term",
    definition:
      "A top-level signed piece separated by addition or subtraction. The sign travels with the term.",
    example: "3x² · −2x · +5",
    color: "52, 211, 153",
  },
  coefficient: {
    label: "Coefficient",
    definition: "The signed numerical factor multiplying a variable part.",
    example: "3 and −2",
    color: "34, 211, 238",
  },
  variable: {
    label: "Variable",
    definition:
      "A symbol that can stand for an unknown, changing, or generalized value.",
    example: "x",
    color: "96, 165, 250",
  },
  exponent: {
    label: "Exponent",
    definition:
      "A power attached to a base. It changes the variable structure of a term.",
    example: "2 in x²",
    color: "192, 132, 252",
  },
  constant: {
    label: "Constant",
    definition:
      "A term with no variable factor, so its value does not depend on the variable.",
    example: "+5",
    color: "251, 191, 36",
  },
};

const PROPERTIES: Record<
  PropertyId,
  {
    label: string;
    before: string;
    after: string;
    meaning: string;
    limit: string;
    color: string;
  }
> = {
  commutative: {
    label: "Commutative",
    before: "a + b",
    after: "b + a",
    meaning: "Reorder addends or factors.",
    limit: "Subtraction and division are not commutative.",
    color: "34, 211, 238",
  },
  associative: {
    label: "Associative",
    before: "(a + b) + c",
    after: "a + (b + c)",
    meaning: "Regroup repeated addition or multiplication.",
    limit: "Regrouping cannot freely cross different operations.",
    color: "129, 140, 248",
  },
  distributive: {
    label: "Distributive",
    before: "a(b + c)",
    after: "ab + ac",
    meaning: "Move between a grouped product and an expanded sum.",
    limit: "Every term inside the group receives the outside factor.",
    color: "52, 211, 153",
  },
  identity: {
    label: "Identity",
    before: "a + 0",
    after: "a",
    meaning: "Use a neutral element without changing value.",
    limit: "0 is additive identity; 1 is multiplicative identity.",
    color: "251, 191, 36",
  },
  inverse: {
    label: "Inverse",
    before: "a + (−a)",
    after: "0",
    meaning: "Pair a value with something that cancels it to an identity.",
    limit: "A multiplicative inverse requires a nonzero value.",
    color: "244, 114, 182",
  },
};

const QUIZZES: Record<ConceptLessonKey, AssessmentQuestion[]> = {
  "expressions-variables": [
    {
      id: "expr-coeff",
      type: "mcq",
      prompt: "What is the coefficient of x in −7x + 4?",
      options: ["−7", "7", "4"],
      correctAnswer: "−7",
      explanation:
        "The sign belongs to the term, so the signed numerical factor is −7.",
    },
    {
      id: "expr-like",
      type: "multiselect",
      prompt: "Which terms are like terms with 3x²?",
      options: ["−5x²", "7x", "x²/2", "4"],
      correctAnswers: ["−5x²", "x²/2"],
      explanation:
        "Like terms have the same variable part with the same exponents.",
    },
    {
      id: "expr-term",
      type: "tf",
      prompt: "In 4x − 9, the second term is −9.",
      correctAnswer: true,
      explanation:
        "The subtraction sign travels with the following term, so the term is −9.",
    },
  ],
  "algebraic-properties": [
    {
      id: "prop-dist",
      type: "mcq",
      prompt: "Which property justifies 4(x + 3) = 4x + 12?",
      options: ["Commutative", "Distributive", "Identity"],
      correctAnswer: "Distributive",
      explanation:
        "The factor 4 is distributed to every term inside the parentheses.",
    },
    {
      id: "prop-comm",
      type: "tf",
      prompt: "a − b = b − a is a commutative law.",
      correctAnswer: false,
      explanation: "Subtraction is not commutative.",
    },
    {
      id: "prop-identity",
      type: "multiselect",
      prompt: "Which statements use an identity element?",
      options: ["a + 0 = a", "a × 1 = a", "a + (−a) = 0", "a + b = b + a"],
      correctAnswers: ["a + 0 = a", "a × 1 = a"],
      explanation:
        "0 and 1 are the neutral elements for addition and multiplication.",
    },
  ],
  "number-systems": [
    {
      id: "num-int",
      type: "mcq",
      prompt: "What is the smallest listed set containing −5?",
      options: ["Natural", "Integer", "Rational", "Real"],
      correctAnswer: "Integer",
      explanation:
        "−5 is an integer. It is also rational and real, but Integer is the most specific listed set.",
    },
    {
      id: "num-repeat",
      type: "tf",
      prompt: "A repeating decimal is rational.",
      correctAnswer: true,
      explanation:
        "Every repeating decimal can be written as a ratio of integers.",
    },
    {
      id: "num-real",
      type: "multiselect",
      prompt: "Which values are real numbers?",
      options: ["3/4", "√2", "π", "−7"],
      correctAnswers: ["3/4", "√2", "π", "−7"],
      explanation:
        "Rational and irrational values together make the real numbers.",
    },
  ],
};

export default function FundamentalsLessonExperience({
  lesson,
  breadcrumbs,
  previous,
  next,
  unitHref,
}: FundamentalsLessonExperienceProps) {
  const meta = META[lesson];
  const Icon = meta.icon;

  return (
    <main
      className="relative min-h-screen overflow-x-hidden text-stone-100"
      style={{ backgroundColor: meta.base }}
    >
      <FundamentalsLessonBackgroundV2 lesson={lesson} />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03),rgba(0,0,0,0.40))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow={`Lesson ${meta.step} · ${meta.eyebrow}`}
          icon={Icon}
          title={<span>{meta.title}</span>}
          subtitle={meta.subtitle}
          accentRgb={meta.accent}
          titleClassName="font-mono text-[clamp(2.15rem,4.2vw,4.4rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f7fff9]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <LessonUtilityBar
          practiceTargetId="fundamentals-practice"
          vocabulary
          accentRgb={meta.accent}
        />

        <section className="mt-4 grid gap-4 rounded-[26px] border border-white/[0.10] bg-black/[0.20] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_26px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div>
            <div
              className="text-[9px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: `rgba(${meta.accent},0.76)` }}
            >
              Core idea
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.45rem,2.5vw,2rem)] font-semibold tracking-[-0.035em] text-white">
              {meta.core}
            </h2>
          </div>
          <LessonOrientation lesson={lesson} />
        </section>

        <div className="mt-4">
          {lesson === "expressions-variables" ? <ExpressionsLesson /> : null}
          {lesson === "algebraic-properties" ? <PropertiesLesson /> : null}
          {lesson === "number-systems" ? <NumberSystemsLesson /> : null}
        </div>

        <section id="fundamentals-practice" className="scroll-mt-24 mt-4">
          <details className="group overflow-hidden rounded-[22px] border border-white/[0.09] bg-black/[0.18] backdrop-blur-2xl">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span>
                <span
                  className="block text-[9px] font-semibold uppercase tracking-[0.13em]"
                  style={{ color: `rgba(${meta.accent},0.72)` }}
                >
                  Concept check
                </span>
                <strong className="mt-1 block text-[15px] text-stone-200">
                  Three questions when you want a checkpoint
                </strong>
              </span>
              <Sparkles size={16} style={{ color: `rgb(${meta.accent})` }} />
            </summary>
            <div className="fundamentals-assessment border-t border-white/[0.06] p-3 sm:p-4">
              <Assessment
                title={`${meta.title} check`}
                questions={QUIZZES[lesson]}
                accentColor={assessmentColor(lesson)}
              />
            </div>
          </details>
        </section>

        <LessonNavigation
          previous={previous}
          next={next}
          unitHref={unitHref}
          currentStep={meta.step}
          accent={meta.accent}
        />
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

function LessonOrientation({ lesson }: { lesson: ConceptLessonKey }) {
  const content: Record<
    ConceptLessonKey,
    { label: string; value: string; note: string }
  > = {
    "expressions-variables": {
      label: "Object under the lens",
      value: "3x² − 2x + 5",
      note: "Read the whole expression, then zoom into its terms and factors.",
    },
    "algebraic-properties": {
      label: "Rewrite question",
      value: "Why is this move legal?",
      note: "Every trusted symbolic move should have a reusable reason behind it.",
    },
    "number-systems": {
      label: "Containment map",
      value: "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ",
      note: "Specific sets sit inside larger sets, so one value can carry several memberships.",
    },
  };
  const item = content[lesson];

  return (
    <div className="rounded-[18px] border border-white/[0.07] bg-white/[0.018] px-4 py-3">
      <div className="text-[8px] font-semibold uppercase tracking-[0.12em] text-stone-600">
        {item.label}
      </div>
      <div className="mt-1 font-mono text-[17px] text-stone-200">
        {item.value}
      </div>
      <p className="mt-1.5 text-[10px] leading-4 text-stone-500">
        {item.note}
      </p>
    </div>
  );
}

function ExpressionsLesson() {
  const [part, setPart] = useState<ExpressionPart>("term");
  const [stage, setStage] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const active = EXPRESSION_PARTS[part];

  const stages = [
    {
      expression: "3x² + 4x − 2x² + 5 − x",
      prompt: "First, collect terms with identical variable structure.",
      result: "(3x² − 2x²) + (4x − x) + 5",
      options: [
        {
          id: "group-like",
          label: "Group like terms",
          helpful: true,
          feedback:
            "Correct. x² terms belong together, x terms belong together, and the constant stays separate.",
        },
        {
          id: "group-all-x",
          label: "Group every x-term",
          helpful: false,
          feedback:
            "x² and x have different variable structures, so they are not like terms.",
        },
        {
          id: "combine-signs",
          label: "Drop the signs",
          helpful: false,
          feedback:
            "The signs are part of the terms. Losing them changes the expression.",
        },
      ],
    },
    {
      expression: "(3x² − 2x²) + (4x − x) + 5",
      prompt: "Now combine the numerical coefficients inside each group.",
      result: "x² + 3x + 5",
      options: [
        {
          id: "combine-coefficients",
          label: "Combine coefficients",
          helpful: true,
          feedback:
            "Exactly. 3 − 2 = 1 for x², and 4 − 1 = 3 for x.",
        },
        {
          id: "combine-powers",
          label: "Add the exponents",
          helpful: false,
          feedback:
            "Adding exponents is a multiplication rule, not a rule for adding like terms.",
        },
        {
          id: "absorb-constant",
          label: "Combine +5 with 3x",
          helpful: false,
          feedback:
            "A constant and an x-term have different variable structure, so they remain separate.",
        },
      ],
    },
  ] as const;

  const solved = stage >= stages.length;
  const current = solved ? null : stages[stage];
  const selected = current?.options.find((option) => option.id === choice) ?? null;

  function applyStep() {
    if (!selected?.helpful) return;
    setStage((currentStage) => Math.min(currentStage + 1, stages.length));
    setChoice(null);
  }

  function resetWorkshop() {
    setStage(0);
    setChoice(null);
  }

  return (
    <section className="rounded-[28px] border border-emerald-200/[0.12] bg-[#03120d]/48 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_330px]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/70">
            Expression microscope
          </div>
          <h3 className="mt-1 text-[18px] font-semibold text-white">
            Change the lens, not the expression.
          </h3>
          <div className="mt-4 flex min-h-[170px] items-center justify-center rounded-[22px] border border-white/[0.06] bg-black/[0.14] p-5 font-mono text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.05em] text-white">
            <ExpressionDisplay active={part} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {(Object.keys(EXPRESSION_PARTS) as ExpressionPart[]).map((id) => {
              const item = EXPRESSION_PARTS[id];
              return (
                <ChoiceButton
                  key={id}
                  active={id === part}
                  label={item.label}
                  rgb={item.color}
                  onClick={() => setPart(id)}
                />
              );
            })}
          </div>
        </div>

        <div
          className="flex min-h-[310px] flex-col justify-center rounded-[20px] border p-4"
          style={{
            borderColor: `rgba(${active.color},0.18)`,
            background: `rgba(${active.color},0.035)`,
          }}
        >
          <div
            className="text-[9px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: `rgba(${active.color},0.75)` }}
          >
            Selected role
          </div>
          <h3 className="mt-2 text-[22px] font-semibold text-white">
            {active.label}
          </h3>
          <p className="mt-3 text-[12px] leading-5 text-stone-400">
            {active.definition}
          </p>
          <div
            className="mt-4 rounded-xl border border-white/[0.06] bg-black/[0.16] px-3 py-3 font-mono text-[14px]"
            style={{ color: `rgb(${active.color})` }}
          >
            {active.example}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/[0.06] pt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-cyan-300/70">
              Like-term workshop
            </div>
            <h3 className="mt-1 text-[18px] font-semibold text-white">
              Simplify by following the structure you just identified.
            </h3>
          </div>
          <button
            type="button"
            onClick={resetWorkshop}
            className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.06] px-3 py-2 text-[10px] font-semibold text-stone-500 hover:text-stone-300"
          >
            <RefreshCcw size={13} />
            Reset
          </button>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="flex min-h-[190px] flex-col items-center justify-center rounded-[22px] border border-white/[0.06] bg-black/[0.14] p-5 text-center">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
              {solved ? "Simplified expression" : `Step ${stage + 1} of ${stages.length}`}
            </div>
            <div className="mt-4 font-mono text-[clamp(1.2rem,3vw,2rem)] text-stone-100">
              {solved ? "x² + 3x + 5" : current?.expression}
            </div>
            {!solved ? (
              <p className="mt-4 max-w-2xl text-[11px] leading-5 text-stone-500">
                {current?.prompt}
              </p>
            ) : (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/[0.16] bg-emerald-400/[0.04] px-3 py-2 text-[10px] font-semibold text-emerald-200">
                <Check size={13} />
                No unlike terms were combined
              </div>
            )}
          </div>

          <div className="rounded-[22px] border border-white/[0.06] bg-black/[0.10] p-4">
            {!solved && current ? (
              <>
                <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
                  Choose the next move
                </div>
                <div className="mt-3 grid gap-2">
                  {current.options.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setChoice(option.id)}
                      className="rounded-[14px] border px-3 py-3 text-left text-[11px] font-semibold transition-colors"
                      style={{
                        borderColor:
                          choice === option.id
                            ? option.helpful
                              ? "rgba(110,231,183,0.28)"
                              : "rgba(251,113,133,0.24)"
                            : "rgba(255,255,255,0.06)",
                        background:
                          choice === option.id
                            ? option.helpful
                              ? "rgba(52,211,153,0.05)"
                              : "rgba(244,63,94,0.04)"
                            : "rgba(0,0,0,0.08)",
                        color:
                          choice === option.id
                            ? option.helpful
                              ? "rgb(167 243 208)"
                              : "rgb(253 164 175)"
                            : "rgb(168 162 158)",
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {selected ? (
                  <div
                    className="mt-3 rounded-[14px] border px-3 py-3 text-[10px] leading-5"
                    style={{
                      borderColor: selected.helpful
                        ? "rgba(110,231,183,0.16)"
                        : "rgba(251,113,133,0.14)",
                      color: selected.helpful
                        ? "rgb(110 231 183)"
                        : "rgb(251 113 133)",
                    }}
                  >
                    {selected.feedback}
                  </div>
                ) : null}

                <button
                  type="button"
                  disabled={!selected?.helpful}
                  onClick={applyStep}
                  className="mt-3 w-full rounded-[14px] border px-3 py-3 text-[11px] font-semibold disabled:cursor-not-allowed disabled:opacity-30"
                  style={{
                    borderColor: "rgba(52,211,153,0.22)",
                    background: "rgba(52,211,153,0.05)",
                    color: "rgb(167 243 208)",
                  }}
                >
                  {stage === 0 ? "Group the terms" : "Combine the coefficients"}
                </button>
              </>
            ) : (
              <div className="flex min-h-[220px] flex-col justify-center">
                <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-300/70">
                  What survived
                </div>
                <p className="mt-3 text-[12px] leading-5 text-stone-400">
                  x², x, and constants are different structures. Simplifying changes the coefficients, not the kinds of terms present.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpressionDisplay({ active }: { active: ExpressionPart }) {
  if (active === "term") {
    return (
      <span>
        <Mark rgb="52, 211, 153">3x²</Mark>{" "}
        <span className="text-stone-600">−</span>{" "}
        <Mark rgb="52, 211, 153">2x</Mark>{" "}
        <span className="text-stone-600">+</span>{" "}
        <Mark rgb="52, 211, 153">5</Mark>
      </span>
    );
  }
  if (active === "coefficient") {
    return (
      <span>
        <Mark rgb="34, 211, 238">3</Mark>x² − <Mark rgb="34, 211, 238">2</Mark>x + 5
      </span>
    );
  }
  if (active === "variable") {
    return (
      <span>
        3<Mark rgb="96, 165, 250">x</Mark>² − 2<Mark rgb="96, 165, 250">x</Mark> + 5
      </span>
    );
  }
  if (active === "exponent") {
    return (
      <span>
        3x<Mark rgb="192, 132, 252">²</Mark> − 2x + 5
      </span>
    );
  }
  return (
    <span>
      3x² − 2x + <Mark rgb="251, 191, 36">5</Mark>
    </span>
  );
}

function Mark({ children, rgb }: { children: ReactNode; rgb: string }) {
  return (
    <span
      className="rounded-lg px-1.5 ring-1"
      style={{
        color: `rgb(${rgb})`,
        background: `rgba(${rgb},0.10)`,
        boxShadow: `0 0 0 1px rgba(${rgb},0.16)`,
      }}
    >
      {children}
    </span>
  );
}

const REWRITE_CHALLENGES: readonly {
  before: string;
  goal: string;
  after: string;
  answer: PropertyAnswer;
  explanation: string;
}[] = [
  {
    before: "4(x + 3)",
    goal: "Remove the parentheses without changing value.",
    after: "4x + 12",
    answer: "distributive",
    explanation: "The outside factor multiplies every term inside the group.",
  },
  {
    before: "m + n",
    goal: "Reverse the order of the addends.",
    after: "n + m",
    answer: "commutative",
    explanation: "Addition allows its inputs to trade places.",
  },
  {
    before: "(a + b) + c",
    goal: "Regroup without changing the order.",
    after: "a + (b + c)",
    answer: "associative",
    explanation: "Associativity changes grouping while preserving order.",
  },
  {
    before: "q + 0",
    goal: "Remove a neutral addend.",
    after: "q",
    answer: "identity",
    explanation: "Adding zero leaves a value unchanged.",
  },
  {
    before: "p + (−p)",
    goal: "Collapse a value with its additive opposite.",
    after: "0",
    answer: "inverse",
    explanation: "Additive inverses cancel to the additive identity.",
  },
  {
    before: "a − b",
    goal: "Reverse the order to b − a.",
    after: "a − b",
    answer: "invalid",
    explanation:
      "No listed property allows this rewrite. Subtraction is not commutative.",
  },
];

function PropertiesLesson() {
  const [propertyId, setPropertyId] = useState<PropertyId>("distributive");
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [answer, setAnswer] = useState<PropertyAnswer | null>(null);
  const [applied, setApplied] = useState(false);
  const active = PROPERTIES[propertyId];
  const challenge = REWRITE_CHALLENGES[challengeIndex];
  const correct = answer === challenge.answer;

  function nextChallenge() {
    setChallengeIndex((index) => (index + 1) % REWRITE_CHALLENGES.length);
    setAnswer(null);
    setApplied(false);
  }

  return (
    <section className="rounded-[28px] border border-indigo-200/[0.12] bg-[#080819]/48 p-5 backdrop-blur-2xl">
      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-indigo-300/70">
            Property library
          </div>
          <div className="mt-3 grid gap-2">
            {(Object.keys(PROPERTIES) as PropertyId[]).map((id) => (
              <ChoiceButton
                key={id}
                active={id === propertyId}
                label={PROPERTIES[id].label}
                rgb={PROPERTIES[id].color}
                onClick={() => setPropertyId(id)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-[22px] border border-white/[0.06] bg-black/[0.14] p-5">
          <div className="flex items-center gap-3">
            <RefreshCcw size={18} style={{ color: `rgb(${active.color})` }} />
            <strong className="text-[18px] text-white">{active.label}</strong>
          </div>
          <div className="mt-5 grid grid-cols-[1fr_60px_1fr] items-center gap-2 text-center font-mono text-[clamp(1.2rem,3vw,2rem)]">
            <div className="rounded-[16px] border border-white/[0.05] p-4 text-stone-300">
              {active.before}
            </div>
            <span className="text-indigo-300">↔</span>
            <div
              className="rounded-[16px] border p-4"
              style={{
                borderColor: `rgba(${active.color},0.18)`,
                color: `rgb(${active.color})`,
              }}
            >
              {active.after}
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <MiniTextCard label="Allows" text={active.meaning} rgb={active.color} />
            <MiniTextCard label="Boundary" text={active.limit} rgb="251, 113, 133" />
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/[0.06] pt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-violet-300/70">
              Rewrite workbench
            </div>
            <h3 className="mt-1 text-[18px] font-semibold text-white">
              Pick the permission, then perform the rewrite.
            </h3>
          </div>
          <button
            type="button"
            onClick={nextChallenge}
            className="self-start rounded-xl border border-white/[0.06] px-3 py-2 text-[10px] font-semibold text-stone-500 hover:text-stone-300"
          >
            Next rewrite
          </button>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="rounded-[22px] border border-white/[0.06] bg-black/[0.12] p-5">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
              Goal
            </div>
            <p className="mt-2 text-[12px] leading-5 text-stone-400">
              {challenge.goal}
            </p>
            <div className="mt-5 grid grid-cols-[1fr_56px_1fr] items-center gap-2 text-center font-mono text-[clamp(1.15rem,3vw,1.8rem)]">
              <div className="rounded-[16px] border border-white/[0.06] px-3 py-5 text-stone-200">
                {challenge.before}
              </div>
              <ArrowRight size={18} className="mx-auto text-stone-700" />
              <div
                className="rounded-[16px] border px-3 py-5"
                style={{
                  borderColor: applied
                    ? correct
                      ? "rgba(129,140,248,0.28)"
                      : "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.04)",
                  color: applied && correct ? "rgb(199 210 254)" : "rgb(87 83 78)",
                  background: applied && correct ? "rgba(129,140,248,0.05)" : "rgba(0,0,0,0.08)",
                }}
              >
                {applied && correct ? challenge.after : "?"}
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-white/[0.06] bg-black/[0.10] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
              Which rule permits the move?
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(Object.keys(PROPERTIES) as PropertyId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setAnswer(id);
                    setApplied(false);
                  }}
                  className="rounded-[13px] border px-2 py-3 text-[10px] font-semibold"
                  style={{
                    borderColor:
                      answer === id
                        ? correct
                          ? "rgba(110,231,183,0.28)"
                          : "rgba(251,113,133,0.22)"
                        : "rgba(255,255,255,0.06)",
                    color:
                      answer === id
                        ? correct
                          ? "rgb(167 243 208)"
                          : "rgb(253 164 175)"
                        : "rgb(120 113 108)",
                    background:
                      answer === id
                        ? correct
                          ? "rgba(52,211,153,0.045)"
                          : "rgba(244,63,94,0.035)"
                        : "transparent",
                  }}
                >
                  {PROPERTIES[id].label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setAnswer("invalid");
                  setApplied(false);
                }}
                className="col-span-2 rounded-[13px] border px-2 py-3 text-[10px] font-semibold"
                style={{
                  borderColor:
                    answer === "invalid"
                      ? correct
                        ? "rgba(110,231,183,0.28)"
                        : "rgba(251,113,133,0.22)"
                      : "rgba(255,255,255,0.06)",
                  color:
                    answer === "invalid"
                      ? correct
                        ? "rgb(167 243 208)"
                        : "rgb(253 164 175)"
                      : "rgb(120 113 108)",
                  background:
                    answer === "invalid"
                      ? correct
                        ? "rgba(52,211,153,0.045)"
                        : "rgba(244,63,94,0.035)"
                      : "transparent",
                }}
              >
                No listed property permits it
              </button>
            </div>

            {answer ? (
              <div
                className="mt-3 rounded-[14px] border px-3 py-3 text-[10px] leading-5"
                style={{
                  borderColor: correct
                    ? "rgba(110,231,183,0.16)"
                    : "rgba(251,113,133,0.14)",
                  color: correct ? "rgb(110 231 183)" : "rgb(251 113 133)",
                }}
              >
                {correct
                  ? challenge.explanation
                  : "That rule does not justify the requested rewrite. Try another permission."}
              </div>
            ) : null}

            <button
              type="button"
              disabled={!correct}
              onClick={() => setApplied(true)}
              className="mt-3 w-full rounded-[14px] border border-indigo-300/[0.18] bg-indigo-400/[0.045] px-3 py-3 text-[11px] font-semibold text-indigo-200 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {challenge.answer === "invalid" ? "Reject the rewrite" : "Apply the property"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const NUMBER_SET_INFO: Record<
  NumberSetId,
  {
    label: string;
    color: string;
    definition: string;
    example: string;
    closure: readonly string[];
  }
> = {
  natural: {
    label: "ℕ Natural",
    color: "163, 230, 53",
    definition:
      "Counting numbers. Some conventions include 0, so a source should state which convention it uses.",
    example: "1 · 2 · 3 · 4 · …",
    closure: ["+ stays natural", "× stays natural", "− may leave", "÷ may leave"],
  },
  integer: {
    label: "ℤ Integer",
    color: "34, 211, 238",
    definition:
      "Whole-number steps in both directions, including zero and negative values.",
    example: "… · −2 · −1 · 0 · 1 · 2 · …",
    closure: ["+ stays integer", "− stays integer", "× stays integer", "÷ may leave"],
  },
  rational: {
    label: "ℚ Rational",
    color: "96, 165, 250",
    definition:
      "Numbers expressible as p/q with integers p and q, where q is not zero. Their decimals terminate or repeat.",
    example: "1/2 · −7/3 · 0.125 · 0.333…",
    closure: ["+ stays rational", "− stays rational", "× stays rational", "÷ stays rational except ÷0"],
  },
  irrational: {
    label: "Irrational",
    color: "192, 132, 252",
    definition:
      "Real numbers that cannot be written as a ratio of integers. Their decimals do not terminate or repeat periodically.",
    example: "π · √2 · e",
    closure: ["Not closed under +", "Not closed under −", "Not closed under ×", "Not closed under ÷"],
  },
  real: {
    label: "ℝ Real",
    color: "52, 211, 153",
    definition:
      "Rational and irrational values together form every point on the ordinary continuous number line.",
    example: "Every ordinary number-line point",
    closure: ["+ stays real", "− stays real", "× stays real", "÷ stays real except ÷0"],
  },
};

const NUMBER_VALUES: readonly {
  display: string;
  smallest: NumberSetId;
  memberships: readonly NumberSetId[];
  note: string;
}[] = [
  {
    display: "5",
    smallest: "natural",
    memberships: ["natural", "integer", "rational", "real"],
    note: "5 is a counting number, so Natural is already specific enough.",
  },
  {
    display: "−3",
    smallest: "integer",
    memberships: ["integer", "rational", "real"],
    note: "Negative whole numbers require the integers, then inherit rational and real membership.",
  },
  {
    display: "3/4",
    smallest: "rational",
    memberships: ["rational", "real"],
    note: "3/4 is literally a ratio of integers, so it belongs to ℚ.",
  },
  {
    display: "0.125",
    smallest: "rational",
    memberships: ["rational", "real"],
    note: "A terminating decimal is rational because it can be rewritten as a fraction.",
  },
  {
    display: "√2",
    smallest: "irrational",
    memberships: ["irrational", "real"],
    note: "√2 is real but cannot be expressed as a ratio of integers.",
  },
  {
    display: "π",
    smallest: "irrational",
    memberships: ["irrational", "real"],
    note: "π is an irrational real number.",
  },
];

function NumberSystemsLesson() {
  const [valueIndex, setValueIndex] = useState(0);
  const [guess, setGuess] = useState<NumberSetId | null>(null);
  const [explorerSet, setExplorerSet] = useState<NumberSetId>("rational");
  const value = NUMBER_VALUES[valueIndex];
  const correct = guess === value.smallest;
  const broadButTrue = guess ? value.memberships.includes(guess) && !correct : false;
  const explored = NUMBER_SET_INFO[explorerSet];

  function nextValue() {
    setValueIndex((index) => (index + 1) % NUMBER_VALUES.length);
    setGuess(null);
  }

  return (
    <section className="rounded-[28px] border border-amber-200/[0.12] bg-[#151005]/48 p-5 backdrop-blur-2xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-amber-300/70">
            Classification lab
          </div>
          <h3 className="mt-1 text-[18px] font-semibold text-white">
            Find the smallest set that contains the value.
          </h3>
        </div>
        <button
          type="button"
          onClick={nextValue}
          className="self-start rounded-xl border border-white/[0.06] px-3 py-2 text-[10px] font-semibold text-stone-500 hover:text-stone-300"
        >
          Next value
        </button>
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-[380px_minmax(0,1fr)]">
        <div className="rounded-[22px] border border-white/[0.06] bg-black/[0.14] p-4">
          <div className="flex min-h-[150px] items-center justify-center rounded-[18px] border border-white/[0.05] bg-black/[0.12] font-mono text-[clamp(3rem,7vw,5.5rem)] font-semibold text-amber-100">
            {value.display}
          </div>
          <div className="mt-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
            Choose the most specific set
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(Object.keys(NUMBER_SET_INFO) as NumberSetId[]).map((id) => {
              const info = NUMBER_SET_INFO[id];
              const selected = guess === id;
              const selectedCorrect = selected && correct;
              const selectedWrong = selected && !correct;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setGuess(id)}
                  className="rounded-[14px] border px-3 py-3 text-[10px] font-semibold"
                  style={{
                    borderColor: selectedCorrect
                      ? "rgba(110,231,183,0.30)"
                      : selectedWrong
                        ? "rgba(251,113,133,0.22)"
                        : "rgba(255,255,255,0.06)",
                    background: selectedCorrect
                      ? "rgba(52,211,153,0.05)"
                      : selectedWrong
                        ? "rgba(244,63,94,0.035)"
                        : "rgba(0,0,0,0.06)",
                    color: selectedCorrect
                      ? "rgb(167 243 208)"
                      : selectedWrong
                        ? "rgb(253 164 175)"
                        : `rgba(${info.color},0.72)`,
                  }}
                >
                  {info.label}
                </button>
              );
            })}
          </div>

          {guess ? (
            <div
              className="mt-3 rounded-[14px] border px-3 py-3 text-[10px] leading-5"
              style={{
                borderColor: correct
                  ? "rgba(110,231,183,0.16)"
                  : "rgba(251,113,133,0.14)",
                color: correct ? "rgb(110 231 183)" : "rgb(251 113 133)",
              }}
            >
              {correct
                ? value.note
                : broadButTrue
                  ? "That set does contain the value, but it is not the smallest one. Move inward to a more specific set."
                  : "That value does not belong to the selected set. Try another region of the hierarchy."}
            </div>
          ) : null}
        </div>

        <NumberUniverse value={value.display} memberships={value.memberships} reveal={correct} />
      </div>

      {correct ? (
        <div className="mt-4 rounded-[18px] border border-emerald-300/[0.12] bg-emerald-400/[0.025] p-4">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.11em] text-emerald-300/70">
            <CircleDot size={13} />
            Membership chain
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[12px] text-stone-300">
            {value.memberships.map((id, index) => (
              <span key={id} className="contents">
                {index > 0 ? <span className="text-stone-700">⊂</span> : null}
                <span
                  className="rounded-lg border px-2.5 py-1.5"
                  style={{
                    borderColor: `rgba(${NUMBER_SET_INFO[id].color},0.16)`,
                    color: `rgb(${NUMBER_SET_INFO[id].color})`,
                  }}
                >
                  {NUMBER_SET_INFO[id].label}
                </span>
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-6 border-t border-white/[0.06] pt-5">
        <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-lime-300/70">
          Set boundary explorer
        </div>
        <h3 className="mt-1 text-[18px] font-semibold text-white">
          What kinds of arithmetic keep you inside a set?
        </h3>

        <div className="mt-4 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="grid content-start gap-2">
            {(Object.keys(NUMBER_SET_INFO) as NumberSetId[]).map((id) => (
              <ChoiceButton
                key={id}
                active={id === explorerSet}
                label={NUMBER_SET_INFO[id].label}
                rgb={NUMBER_SET_INFO[id].color}
                onClick={() => setExplorerSet(id)}
              />
            ))}
          </div>

          <div
            className="rounded-[22px] border bg-black/[0.12] p-5"
            style={{ borderColor: `rgba(${explored.color},0.16)` }}
          >
            <div
              className="font-mono text-[20px] font-semibold"
              style={{ color: `rgb(${explored.color})` }}
            >
              {explored.label}
            </div>
            <p className="mt-3 max-w-3xl text-[12px] leading-5 text-stone-400">
              {explored.definition}
            </p>
            <div className="mt-4 rounded-[14px] border border-white/[0.05] bg-black/[0.10] px-3 py-3 font-mono text-[12px] text-stone-300">
              {explored.example}
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {explored.closure.map((item) => (
                <div
                  key={item}
                  className="rounded-[13px] border border-white/[0.05] bg-white/[0.012] px-3 py-3 text-[10px] leading-4 text-stone-500"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NumberUniverse({
  value,
  memberships,
  reveal,
}: {
  value: string;
  memberships: readonly NumberSetId[];
  reveal: boolean;
}) {
  const active = (id: NumberSetId) => reveal && memberships.includes(id);

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[24px] border border-white/[0.06] bg-black/[0.12] p-4">
      <div
        className="absolute inset-4 rounded-[28px] border"
        style={{
          borderColor: active("real")
            ? "rgba(52,211,153,0.46)"
            : "rgba(52,211,153,0.14)",
          background: active("real")
            ? "rgba(52,211,153,0.035)"
            : "rgba(52,211,153,0.012)",
        }}
      >
        <span className="absolute left-4 top-3 font-mono text-[11px] font-semibold text-emerald-300/70">
          ℝ Real
        </span>
      </div>
      <div
        className="absolute bottom-[13%] left-[8%] right-[30%] top-[18%] rounded-[26px] border"
        style={{
          borderColor: active("rational")
            ? "rgba(96,165,250,0.48)"
            : "rgba(96,165,250,0.15)",
          background: active("rational")
            ? "rgba(96,165,250,0.04)"
            : "rgba(96,165,250,0.012)",
        }}
      >
        <span className="absolute left-4 top-3 font-mono text-[11px] font-semibold text-blue-300/70">
          ℚ Rational
        </span>
      </div>
      <div
        className="absolute bottom-[24%] left-[15%] right-[47%] top-[34%] rounded-[24px] border"
        style={{
          borderColor: active("integer")
            ? "rgba(34,211,238,0.50)"
            : "rgba(34,211,238,0.16)",
          background: active("integer")
            ? "rgba(34,211,238,0.045)"
            : "rgba(34,211,238,0.012)",
        }}
      >
        <span className="absolute left-4 top-3 font-mono text-[11px] font-semibold text-cyan-300/70">
          ℤ Integer
        </span>
      </div>
      <div
        className="absolute bottom-[35%] left-[23%] right-[59%] top-[51%] rounded-[20px] border"
        style={{
          borderColor: active("natural")
            ? "rgba(163,230,53,0.52)"
            : "rgba(163,230,53,0.17)",
          background: active("natural")
            ? "rgba(163,230,53,0.05)"
            : "rgba(163,230,53,0.012)",
        }}
      >
        <span className="absolute left-3 top-2 font-mono text-[10px] font-semibold text-lime-300/70">
          ℕ
        </span>
      </div>
      <div
        className="absolute bottom-[16%] left-[73%] right-[7%] top-[23%] rounded-[24px] border"
        style={{
          borderColor: active("irrational")
            ? "rgba(192,132,252,0.50)"
            : "rgba(192,132,252,0.15)",
          background: active("irrational")
            ? "rgba(192,132,252,0.045)"
            : "rgba(192,132,252,0.012)",
        }}
      >
        <span className="absolute left-3 top-3 font-mono text-[10px] font-semibold text-violet-300/70">
          Irrational
        </span>
      </div>

      {reveal ? (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-amber-300/[0.18] bg-[#171205]/90 px-4 py-2 font-mono text-[13px] font-semibold text-amber-100 shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
          {value}
        </div>
      ) : (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-[10px] text-stone-600">
          Classify the value to illuminate its memberships.
        </div>
      )}
    </div>
  );
}

function LessonNavigation({
  previous,
  next,
  unitHref,
  currentStep,
  accent,
}: {
  previous?: FundamentalsLessonNavItem;
  next?: FundamentalsLessonNavItem;
  unitHref: string;
  currentStep: string;
  accent: string;
}) {
  return (
    <nav className="mt-4 pb-8" aria-label="Algebra Fundamentals lesson navigation">
      <div className="mb-2 flex justify-end">
        <span className="font-mono text-[10px] text-stone-700">
          {currentStep} / 05
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? (
          <NavCard item={previous} direction="previous" accent={accent} />
        ) : (
          <div className="hidden sm:block" aria-hidden="true" />
        )}
        {next ? (
          <NavCard item={next} direction="next" accent={accent} />
        ) : (
          <Link
            href={unitHref}
            className="group flex min-h-[76px] items-center rounded-[18px] border px-4"
            style={{
              borderColor: `rgba(${accent},0.16)`,
              background: `rgba(${accent},0.035)`,
            }}
          >
            <span className="min-w-0 flex-1 text-right">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-stone-600">
                Unit complete
              </span>
              <strong className="mt-1 block text-[14px] text-stone-200">
                Return to Algebra Fundamentals
              </strong>
            </span>
            <Check size={15} className="ml-3" style={{ color: `rgb(${accent})` }} />
          </Link>
        )}
      </div>
    </nav>
  );
}

function NavCard({
  item,
  direction,
  accent,
}: {
  item: FundamentalsLessonNavItem;
  direction: "previous" | "next";
  accent: string;
}) {
  const previous = direction === "previous";
  return (
    <Link
      href={item.href}
      className="group flex min-h-[76px] items-center gap-3 rounded-[18px] border px-4 py-3"
      style={{
        borderColor: `rgba(${accent},0.14)`,
        background: `rgba(${accent},0.025)`,
      }}
    >
      {previous ? <ArrowLeft size={15} style={{ color: `rgb(${accent})` }} /> : null}
      <span className={`min-w-0 flex-1 ${previous ? "" : "text-right"}`}>
        <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-stone-600">
          {previous ? "Previous lesson" : "Next lesson"}
        </span>
        <strong className="mt-1 block text-[14px] text-stone-200">
          {item.label}
        </strong>
      </span>
      {!previous ? <ArrowRight size={15} style={{ color: `rgb(${accent})` }} /> : null}
    </Link>
  );
}

function ChoiceButton({
  active,
  label,
  rgb,
  onClick,
}: {
  active: boolean;
  label: string;
  rgb: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border px-3 py-3 text-[10px] font-semibold transition-colors"
      style={{
        color: active ? `rgb(${rgb})` : "rgb(120 113 108)",
        borderColor: active ? `rgba(${rgb},0.30)` : "rgba(255,255,255,0.06)",
        background: active ? `rgba(${rgb},0.065)` : "rgba(0,0,0,0.10)",
      }}
    >
      {label}
    </button>
  );
}

function MiniTextCard({
  label,
  text,
  rgb,
}: {
  label: string;
  text: string;
  rgb: string;
}) {
  return (
    <div className="rounded-[15px] border border-white/[0.05] bg-black/[0.10] p-3">
      <div
        className="text-[8px] font-semibold uppercase tracking-[0.11em]"
        style={{ color: `rgba(${rgb},0.75)` }}
      >
        {label}
      </div>
      <p className="mt-1.5 text-[10px] leading-4 text-stone-500">{text}</p>
    </div>
  );
}

function assessmentColor(
  lesson: ConceptLessonKey,
): "emerald" | "indigo" | "amber" {
  if (lesson === "expressions-variables") return "emerald";
  if (lesson === "algebraic-properties") return "indigo";
  return "amber";
}
