"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleDot,
  Hash,
  Sparkles,
} from "lucide-react";
import Assessment, { type AssessmentQuestion } from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import FundamentalsLessonBackgroundV2 from "./FundamentalsLessonBackgroundV2";

export type NumberSystemsLessonNavItem = {
  label: string;
  href: string;
};

type NumberSystemsLessonExperienceProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: NumberSystemsLessonNavItem;
  next?: NumberSystemsLessonNavItem;
  unitHref: string;
  showVocabulary?: boolean;
};

type NumberSetId = "natural" | "integer" | "rational" | "irrational" | "real";

type ClassificationCase = {
  value: string;
  target: NumberSetId;
  reason: string;
  chain: readonly NumberSetId[];
};

const ACCENT = "251, 191, 36";

const SETS: Record<
  NumberSetId,
  {
    symbol: string;
    label: string;
    definition: string;
    example: string;
    color: string;
  }
> = {
  natural: {
    symbol: "ℕ",
    label: "Natural numbers",
    definition: "Counting numbers: 1, 2, 3, …",
    example: "1 · 2 · 3 · 12",
    color: "163, 230, 53",
  },
  integer: {
    symbol: "ℤ",
    label: "Integers",
    definition: "Whole-number steps in both directions, including 0 and negatives.",
    example: "… · −2 · −1 · 0 · 1 · 2 · …",
    color: "34, 211, 238",
  },
  rational: {
    symbol: "ℚ",
    label: "Rational numbers",
    definition: "Numbers that can be written as p/q for integers p and q with q ≠ 0.",
    example: "3/4 · −7/2 · 0.125 · 0.333…",
    color: "96, 165, 250",
  },
  irrational: {
    symbol: "",
    label: "Irrational numbers",
    definition: "Real numbers that cannot be written as a ratio of integers.",
    example: "√2 · π · e",
    color: "192, 132, 252",
  },
  real: {
    symbol: "ℝ",
    label: "Real numbers",
    definition: "Every rational and irrational point on the ordinary number line.",
    example: "ℚ ∪ irrational numbers",
    color: "52, 211, 153",
  },
};

const CLASSIFICATION_CASES: readonly ClassificationCase[] = [
  {
    value: "7",
    target: "natural",
    reason: "7 is a counting number, so ℕ is already enough.",
    chain: ["natural", "integer", "rational", "real"],
  },
  {
    value: "−4",
    target: "integer",
    reason: "−4 is not natural, but it is an integer and therefore also rational and real.",
    chain: ["integer", "rational", "real"],
  },
  {
    value: "3/5",
    target: "rational",
    reason: "3/5 is already written as a ratio of integers, so ℚ is the smallest standard set here.",
    chain: ["rational", "real"],
  },
  {
    value: "0.272727…",
    target: "rational",
    reason: "A repeating decimal can be rewritten as a ratio of integers, so it is rational.",
    chain: ["rational", "real"],
  },
  {
    value: "√2",
    target: "irrational",
    reason: "√2 is real but cannot be expressed as p/q for integers p and q, so it is irrational.",
    chain: ["irrational", "real"],
  },
  {
    value: "π",
    target: "irrational",
    reason: "π is real and not rational, so irrational is the most specific listed set.",
    chain: ["irrational", "real"],
  },
];

const QUIZ: AssessmentQuestion[] = [
  {
    id: "number-transfer-integer",
    type: "mcq",
    prompt: "What is the smallest listed set containing −12?",
    options: ["Natural", "Integer", "Rational", "Real"],
    correctAnswer: "Integer",
    explanation: "−12 is an integer. Integers are also rational and real, but Integer is the most specific listed set.",
  },
  {
    id: "number-transfer-repeat",
    type: "tf",
    prompt: "0.454545… is rational.",
    correctAnswer: true,
    explanation: "A repeating decimal can be written as a ratio of integers, so it is rational.",
  },
  {
    id: "number-transfer-irrational",
    type: "mcq",
    prompt: "Which value is irrational?",
    options: ["√3", "5/8", "−9", "0.25"],
    correctAnswer: "√3",
    explanation: "√3 cannot be written as a ratio of integers. The other three values are rational.",
  },
];

export default function NumberSystemsLessonExperience({
  breadcrumbs,
  previous,
  next,
  unitHref,
  showVocabulary = true,
}: NumberSystemsLessonExperienceProps) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [answer, setAnswer] = useState<NumberSetId | null>(null);
  const currentCase = CLASSIFICATION_CASES[caseIndex];
  const verdict = answer ? getClassificationVerdict(currentCase, answer) : null;

  function moveCase(direction: 1 | -1) {
    setCaseIndex((current) =>
      (current + direction + CLASSIFICATION_CASES.length) % CLASSIFICATION_CASES.length,
    );
    setAnswer(null);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#171205] text-stone-100">
      <FundamentalsLessonBackgroundV2 lesson="number-systems" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03),rgba(0,0,0,0.42))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow="Lesson 05 · Number systems"
          icon={Hash}
          title={<span>Number Systems</span>}
          subtitle="See why familiar number sets grow from one another, how they fit together, and how to choose the most specific set that describes a value."
          accentRgb={ACCENT}
          titleClassName="font-mono text-[clamp(2.35rem,4.5vw,4.7rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#fffaf0]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <LessonUtilityBar
          practiceTargetId="number-systems-practice"
          vocabulary={showVocabulary}
          accentRgb={ACCENT}
        />

        <section className="mt-4 grid gap-4 rounded-[26px] border border-amber-200/[0.11] bg-black/[0.20] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_26px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/75">
              The learner question
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">
              Why do we need several kinds of numbers instead of one giant bucket?
            </h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-400">
              Each familiar number system answers questions that an earlier system cannot. The sets grow outward, and a value keeps its earlier memberships as it enters larger sets.
            </p>
          </div>
          <div className="rounded-[18px] border border-amber-200/[0.09] bg-amber-400/[0.025] px-4 py-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-300/65">
              Keep this map in mind
            </div>
            <div className="mt-2 font-mono text-[clamp(1.1rem,2vw,1.45rem)] text-amber-100">
              ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ
            </div>
            <p className="mt-2 text-[11px] leading-5 text-stone-500">
              Irrational numbers also live inside ℝ, but outside ℚ. They are not another rung containing the rationals.
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
          <div className="max-w-3xl">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/72">
              Why the sets grow
            </div>
            <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">
              New operations create answers the old set cannot hold.
            </h2>
            <p className="mt-2 text-[12px] leading-5 text-stone-500">
              Start with counting. Then ask increasingly demanding numerical questions and watch the allowable universe expand.
            </p>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-4">
            <GrowthStep
              step="01"
              title="Count"
              example="3"
              set="ℕ Natural"
              explanation="Counting needs positive whole numbers."
              rgb="163, 230, 53"
            />
            <GrowthStep
              step="02"
              title="Subtract past zero"
              example="3 − 5 = −2"
              set="ℤ Integers"
              explanation="Negative whole numbers force us beyond ℕ."
              rgb="34, 211, 238"
            />
            <GrowthStep
              step="03"
              title="Divide between integers"
              example="1 ÷ 2 = 1/2"
              set="ℚ Rationals"
              explanation="Fractions force us beyond ℤ."
              rgb="96, 165, 250"
            />
            <GrowthStep
              step="04"
              title="Fill the remaining gaps"
              example="√2"
              set="ℝ Reals"
              explanation="Irrational values join the rationals to fill the real number line."
              rgb="192, 132, 252"
            />
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(310px,0.82fr)]">
          <div className="rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/68">
              Containment model
            </div>
            <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">
              Smaller sets sit inside larger sets.
            </h2>
            <p className="mt-2 max-w-3xl text-[12px] leading-5 text-stone-500">
              A natural number never stops being natural when we view it inside the integers, rationals, or reals. The larger sets add possibilities; they do not erase earlier membership.
            </p>
            <div className="mt-5">
              <NumberContainmentMap />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <RuleCard
              label="Membership carries outward"
              formula="7 ∈ ℕ ⇒ 7 ∈ ℤ, ℚ, ℝ"
              text="If a value belongs to a smaller nested set, it also belongs to every larger set containing it."
              rgb="163, 230, 53"
            />
            <RuleCard
              label="Irrational means real but not rational"
              formula="√2 ∈ ℝ and √2 ∉ ℚ"
              text="Irrational numbers share the real number line with rationals, but they sit outside the rational region."
              rgb="192, 132, 252"
            />
            <RuleCard
              label="Use the smallest useful label"
              formula="−4 → Integer"
              text="Calling −4 real is true, but Integer tells us more. Classification usually asks for the most specific standard set."
              rgb="251, 191, 36"
            />
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-amber-200/[0.12] bg-[#151005]/55 p-5 backdrop-blur-2xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/72">
                Classification lab
              </div>
              <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">
                Now place the value in its smallest set.
              </h2>
              <p className="mt-2 max-w-3xl text-[12px] leading-5 text-stone-500">
                The containment model is already built. Your job is to decide how far inward each value can go.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => moveCase(-1)}
                className="rounded-xl border border-white/[0.07] px-3 py-2 text-[10px] font-semibold text-stone-500 hover:text-stone-300"
              >
                Previous value
              </button>
              <button
                type="button"
                onClick={() => moveCase(1)}
                className="rounded-xl border border-amber-300/[0.16] bg-amber-400/[0.035] px-3 py-2 text-[10px] font-semibold text-amber-200/80"
              >
                Next value
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <div className="flex min-h-[270px] flex-col items-center justify-center rounded-[24px] border border-white/[0.07] bg-black/[0.16] p-5 text-center">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
                Value {caseIndex + 1} of {CLASSIFICATION_CASES.length}
              </div>
              <div className="mt-5 font-mono text-[clamp(3.2rem,7vw,6rem)] font-semibold tracking-[-0.05em] text-amber-100">
                {currentCase.value}
              </div>
              <p className="mt-4 max-w-md text-[11px] leading-5 text-stone-500">
                Which set is the most specific description of this value?
              </p>
            </div>

            <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.11] p-4">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-2 xl:grid-cols-5">
                {(Object.keys(SETS) as NumberSetId[]).map((id) => {
                  const set = SETS[id];
                  const active = answer === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setAnswer(id)}
                      className="min-h-[74px] rounded-[15px] border px-3 py-3 text-left transition-colors"
                      style={{
                        borderColor: active ? `rgba(${set.color},0.38)` : "rgba(255,255,255,0.06)",
                        background: active ? `rgba(${set.color},0.07)` : "rgba(0,0,0,0.08)",
                      }}
                    >
                      <span className="block font-mono text-[14px]" style={{ color: `rgb(${set.color})` }}>
                        {set.symbol || "Irr."}
                      </span>
                      <span className="mt-1 block text-[10px] font-semibold text-stone-400">
                        {shortSetLabel(id)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 min-h-[150px] rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4">
                {!verdict ? (
                  <div className="flex h-full min-h-[116px] items-center justify-center text-center text-[11px] leading-5 text-stone-600">
                    Choose the smallest set that contains {currentCase.value}.
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <CircleDot
                        size={14}
                        className={verdict.kind === "correct" ? "text-emerald-300" : verdict.kind === "broad" ? "text-amber-300" : "text-rose-300"}
                      />
                      <strong
                        className={`text-[13px] ${
                          verdict.kind === "correct"
                            ? "text-emerald-200"
                            : verdict.kind === "broad"
                              ? "text-amber-200"
                              : "text-rose-200"
                        }`}
                      >
                        {verdict.heading}
                      </strong>
                    </div>
                    <p className="mt-2 text-[11px] leading-5 text-stone-500">
                      {verdict.message}
                    </p>
                    {verdict.kind === "correct" ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {currentCase.chain.map((id) => (
                          <span
                            key={id}
                            className="rounded-full border px-2.5 py-1.5 font-mono text-[10px]"
                            style={{
                              color: `rgb(${SETS[id].color})`,
                              borderColor: `rgba(${SETS[id].color},0.20)`,
                              background: `rgba(${SETS[id].color},0.035)`,
                            }}
                          >
                            {SETS[id].symbol || "Irrational"}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-violet-200/[0.10] bg-black/[0.18] p-5 backdrop-blur-2xl">
          <div className="max-w-3xl">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/70">
              Stress-test the model
            </div>
            <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">
              Classification describes the value, not every operation you can perform on it.
            </h2>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <ContrastCard
              title="Repeating does not mean irrational"
              example="0.333… = 1/3"
              text="Terminating and repeating decimals are rational because they can be written as ratios of integers."
              rgb="96, 165, 250"
            />
            <ContrastCard
              title="Irrational is not closed under addition"
              example="√2 + (−√2) = 0"
              text="Two irrational inputs can produce a rational result. Do not turn a classification into an arithmetic rule."
              rgb="192, 132, 252"
            />
            <ContrastCard
              title="Zero needs a convention note"
              example="0 ∈ ℤ"
              text="Some authors include 0 in ℕ and some begin ℕ at 1. This lesson uses ℕ = {1, 2, 3, …}, so 0 is classified here as an integer."
              rgb="251, 191, 36"
            />
          </div>
        </section>

        <section id="number-systems-practice" className="scroll-mt-24 mt-4">
          <details className="group overflow-hidden rounded-[22px] border border-amber-200/[0.09] bg-black/[0.18] backdrop-blur-2xl">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.13em] text-amber-300/70">
                  Transfer check
                </span>
                <strong className="mt-1 block text-[15px] text-stone-200">
                  Three fresh cases without the lesson example in front of you
                </strong>
              </span>
              <Sparkles size={16} className="text-amber-300" />
            </summary>
            <div className="number-systems-assessment border-t border-white/[0.06] p-3 sm:p-4">
              <Assessment title="Number Systems check" questions={QUIZ} accentColor="amber" />
            </div>
          </details>
        </section>

        <section className="mt-4 rounded-[20px] border border-white/[0.07] bg-black/[0.12] px-5 py-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
            What this unlocks
          </div>
          <p className="mt-1 text-[12px] leading-5 text-stone-500">
            Later algebra will ask which values are allowed in a domain, whether an operation stays inside a set, and when a problem needs a larger number system. This hierarchy gives those questions a map.
          </p>
        </section>

        <LessonNavigation previous={previous} next={next} unitHref={unitHref} />
      </div>

      <style>{`
        .number-systems-assessment > div { border-radius: 18px !important; padding: 16px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; }
        .number-systems-assessment > div > div { min-height: 300px !important; }
        .number-systems-assessment h3 { margin-bottom: 16px !important; font-size: 1.05rem !important; line-height: 1.45 !important; }
        .number-systems-assessment button { padding-top: 10px !important; padding-bottom: 10px !important; }
      `}</style>
    </main>
  );
}

function GrowthStep({
  step,
  title,
  example,
  set,
  explanation,
  rgb,
}: {
  step: string;
  title: string;
  example: string;
  set: string;
  explanation: string;
  rgb: string;
}) {
  return (
    <div className="relative min-h-[210px] rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] text-stone-700">{step}</span>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: `rgb(${rgb})` }} />
      </div>
      <h3 className="mt-4 text-[15px] font-semibold text-stone-200">{title}</h3>
      <div className="mt-3 rounded-[14px] border border-white/[0.05] bg-black/[0.12] px-3 py-3 font-mono text-[15px]" style={{ color: `rgb(${rgb})` }}>
        {example}
      </div>
      <div className="mt-3 text-[11px] font-semibold" style={{ color: `rgba(${rgb},0.82)` }}>
        {set}
      </div>
      <p className="mt-1.5 text-[10px] leading-4 text-stone-600">{explanation}</p>
    </div>
  );
}

function NumberContainmentMap() {
  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-[24px] border border-emerald-200/[0.08] bg-[#07140d]/65 p-4 sm:p-5">
      <div className="absolute inset-4 rounded-[28px] border border-emerald-300/[0.22] bg-emerald-400/[0.025]">
        <span className="absolute left-4 top-3 font-mono text-[13px] font-semibold text-emerald-300">ℝ Real</span>
      </div>
      <div className="absolute bottom-[10%] left-[7%] right-[34%] top-[17%] rounded-[26px] border border-blue-300/[0.24] bg-blue-400/[0.025]">
        <span className="absolute left-4 top-3 font-mono text-[12px] font-semibold text-blue-300">ℚ Rational</span>
      </div>
      <div className="absolute bottom-[19%] left-[14%] right-[50%] top-[31%] rounded-[24px] border border-cyan-300/[0.26] bg-cyan-400/[0.025]">
        <span className="absolute left-4 top-3 font-mono text-[11px] font-semibold text-cyan-300">ℤ Integer</span>
      </div>
      <div className="absolute bottom-[29%] left-[21%] right-[63%] top-[47%] rounded-[20px] border border-lime-300/[0.28] bg-lime-400/[0.03]">
        <span className="absolute left-3 top-3 font-mono text-[10px] font-semibold text-lime-300">ℕ Natural</span>
      </div>
      <div className="absolute bottom-[16%] left-[71%] right-[7%] top-[24%] rounded-[24px] border border-violet-300/[0.26] bg-violet-400/[0.03]">
        <span className="absolute left-4 top-3 text-[11px] font-semibold text-violet-300">Irrational</span>
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 text-center font-mono text-[clamp(1.2rem,3vw,2rem)] text-violet-200/75">
          √2 · π
        </div>
      </div>
      <div className="absolute bottom-[37%] left-[25%] right-[69%] top-[62%] flex items-center justify-center font-mono text-[13px] text-lime-200/70">
        5
      </div>
      <div className="absolute bottom-[25%] left-[35%] right-[55%] top-[52%] flex items-center justify-center font-mono text-[13px] text-cyan-200/70">
        −3
      </div>
      <div className="absolute bottom-[18%] left-[52%] right-[36%] top-[42%] flex items-center justify-center font-mono text-[13px] text-blue-200/70">
        3/4
      </div>
    </div>
  );
}

function RuleCard({
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
    <div className="flex-1 rounded-[20px] border p-4" style={{ borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.025)` }}>
      <div className="text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.72)` }}>
        {label}
      </div>
      <div className="mt-2 font-mono text-[13px]" style={{ color: `rgb(${rgb})` }}>
        {formula}
      </div>
      <p className="mt-2 text-[10px] leading-4 text-stone-500">{text}</p>
    </div>
  );
}

function ContrastCard({
  title,
  example,
  text,
  rgb,
}: {
  title: string;
  example: string;
  text: string;
  rgb: string;
}) {
  return (
    <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.11] p-4">
      <h3 className="text-[14px] font-semibold text-stone-200">{title}</h3>
      <div className="mt-3 rounded-[13px] border border-white/[0.05] bg-black/[0.12] px-3 py-2.5 font-mono text-[13px]" style={{ color: `rgb(${rgb})` }}>
        {example}
      </div>
      <p className="mt-3 text-[10px] leading-4 text-stone-500">{text}</p>
    </div>
  );
}

function getClassificationVerdict(item: ClassificationCase, answer: NumberSetId) {
  if (answer === item.target) {
    return {
      kind: "correct" as const,
      heading: `${item.value} → ${SETS[item.target].label}`,
      message: item.reason,
    };
  }

  if (item.chain.includes(answer)) {
    return {
      kind: "broad" as const,
      heading: "True, but too broad",
      message: `${item.value} does belong to ${SETS[answer].label}, but ${SETS[item.target].label} is a smaller set that already contains it. Move inward for the most specific label.`,
    };
  }

  return {
    kind: "incorrect" as const,
    heading: "That set does not contain this value",
    message: item.reason,
  };
}

function shortSetLabel(id: NumberSetId) {
  if (id === "natural") return "Natural";
  if (id === "integer") return "Integer";
  if (id === "rational") return "Rational";
  if (id === "irrational") return "Irrational";
  return "Real";
}

function LessonNavigation({
  previous,
  next,
  unitHref,
}: {
  previous?: NumberSystemsLessonNavItem;
  next?: NumberSystemsLessonNavItem;
  unitHref: string;
}) {
  return (
    <nav className="mt-4 pb-8" aria-label="Algebra Fundamentals lesson navigation">
      <div className="mb-2 flex justify-end">
        <span className="font-mono text-[10px] text-stone-700">05 / 05</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? <NavCard item={previous} direction="previous" /> : <div className="hidden sm:block" aria-hidden="true" />}
        {next ? (
          <NavCard item={next} direction="next" />
        ) : (
          <Link
            href={unitHref}
            className="group flex min-h-[76px] items-center rounded-[18px] border border-amber-300/[0.16] bg-amber-400/[0.035] px-4"
          >
            <span className="min-w-0 flex-1 text-right">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-stone-600">
                Unit complete
              </span>
              <strong className="mt-1 block text-[14px] text-stone-200">
                Return to Algebra Fundamentals
              </strong>
            </span>
            <Check size={15} className="ml-3 text-amber-300" />
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
  item: NumberSystemsLessonNavItem;
  direction: "previous" | "next";
}) {
  const isPrevious = direction === "previous";
  return (
    <Link
      href={item.href}
      className="group flex min-h-[76px] items-center gap-3 rounded-[18px] border border-amber-300/[0.14] bg-amber-400/[0.025] px-4 py-3"
    >
      {isPrevious ? <ArrowLeft size={15} className="text-amber-300" /> : null}
      <span className={`min-w-0 flex-1 ${isPrevious ? "" : "text-right"}`}>
        <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-stone-600">
          {isPrevious ? "Previous lesson" : "Next lesson"}
        </span>
        <strong className="mt-1 block text-[14px] text-stone-200">{item.label}</strong>
      </span>
      {!isPrevious ? <ArrowRight size={15} className="text-amber-300" /> : null}
    </Link>
  );
}
