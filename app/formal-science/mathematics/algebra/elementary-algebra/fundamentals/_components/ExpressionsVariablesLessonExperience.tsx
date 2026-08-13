"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Braces,
  Check,
  CircleDot,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import Assessment, { type AssessmentQuestion } from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import FundamentalsLessonBackgroundV2 from "./FundamentalsLessonBackgroundV2";

export type ExpressionsLessonNavItem = {
  label: string;
  href: string;
};

type ExpressionsLessonExperienceProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: ExpressionsLessonNavItem;
  next?: ExpressionsLessonNavItem;
  unitHref: string;
};

type TermFamily = "x2" | "x" | "constant";

type SortTerm = {
  display: string;
  family: TermFamily;
  reason: string;
};

const ACCENT = "52, 211, 153";

const SORT_TERMS: readonly SortTerm[] = [
  {
    display: "3x²",
    family: "x2",
    reason: "Its variable part is x², so it belongs with every other x² term.",
  },
  {
    display: "+4x",
    family: "x",
    reason: "Its variable part is x¹, usually written simply as x.",
  },
  {
    display: "−2x²",
    family: "x2",
    reason: "The coefficient is negative, but the variable part is still x².",
  },
  {
    display: "+5",
    family: "constant",
    reason: "There is no variable factor, so this is a constant term.",
  },
  {
    display: "−x",
    family: "x",
    reason: "−x means −1x, so its variable part matches the other x terms.",
  },
] as const;

const FAMILY_LABELS: Record<TermFamily, string> = {
  x2: "x² terms",
  x: "x terms",
  constant: "constants",
};

const QUIZ: AssessmentQuestion[] = [
  {
    id: "expression-transfer-coefficient",
    type: "mcq",
    prompt: "What is the coefficient of x in −7x + 4?",
    options: ["−7", "7", "4"],
    correctAnswer: "−7",
    explanation: "The sign belongs to the term, so the signed numerical factor is −7.",
  },
  {
    id: "expression-transfer-like",
    type: "multiselect",
    prompt: "Which terms are like terms with 5y²?",
    options: ["−3y²", "8y", "y²/2", "2y³"],
    correctAnswers: ["−3y²", "y²/2"],
    explanation: "Like terms must have the same variable part, including the same exponent.",
  },
  {
    id: "expression-transfer-simplify",
    type: "short_answer",
    prompt: "Simplify 6x − 2x + 3. Enter the expression.",
    acceptableAnswers: ["4x+3", "4x + 3"],
    explanation: "6x and −2x are like terms, so their coefficients combine to 4. The constant stays separate.",
  },
];

export default function ExpressionsVariablesLessonExperience({
  breadcrumbs,
  previous,
  next,
  unitHref,
}: ExpressionsLessonExperienceProps) {
  const [termIndex, setTermIndex] = useState(0);
  const [answer, setAnswer] = useState<TermFamily | null>(null);
  const [sorted, setSorted] = useState<Record<TermFamily, string[]>>({
    x2: [],
    x: [],
    constant: [],
  });
  const [combined, setCombined] = useState(false);

  const complete = termIndex >= SORT_TERMS.length;
  const currentTerm = complete ? null : SORT_TERMS[termIndex];
  const correct = Boolean(currentTerm && answer === currentTerm.family);

  function chooseFamily(family: TermFamily) {
    setAnswer(family);
  }

  function placeTerm() {
    if (!currentTerm || answer !== currentTerm.family) return;
    setSorted((current) => ({
      ...current,
      [currentTerm.family]: [...current[currentTerm.family], currentTerm.display],
    }));
    setTermIndex((current) => current + 1);
    setAnswer(null);
  }

  function resetSorter() {
    setTermIndex(0);
    setAnswer(null);
    setSorted({ x2: [], x: [], constant: [] });
    setCombined(false);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#031912] text-stone-100">
      <FundamentalsLessonBackgroundV2 lesson="expressions-variables" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03),rgba(0,0,0,0.42))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow="Lesson 01 · Expressions & Variables"
          icon={Braces}
          title={<span>Expressions & Variables</span>}
          subtitle="Learn to read an algebraic expression as a hierarchy of signed terms and factors, then use that structure to simplify without changing its meaning."
          accentRgb={ACCENT}
          titleClassName="font-mono text-[clamp(2.2rem,4.35vw,4.55rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f4fff9]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <LessonUtilityBar
          practiceTargetId="expressions-practice"
          vocabulary
          accentRgb={ACCENT}
        />

        <section className="mt-4 grid gap-4 rounded-[26px] border border-emerald-200/[0.11] bg-black/[0.20] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_26px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/75">
              The learner question
            </div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">
              What structure is hiding inside a line of algebra?
            </h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-400">
              Algebra becomes easier when you stop reading an expression one character at a time. First find its top-level signed terms. Then look inside each term for the factors that give it structure.
            </p>
          </div>
          <div className="rounded-[18px] border border-emerald-200/[0.09] bg-emerald-400/[0.025] px-4 py-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-300/65">
              Object under the lens
            </div>
            <div className="mt-2 font-mono text-[clamp(1.35rem,2.4vw,1.85rem)] text-emerald-100">
              3x² − 2x + 5
            </div>
            <p className="mt-2 text-[11px] leading-5 text-stone-500">
              Three top-level terms. Inside the variable terms, multiplication binds coefficients, variables, and powers together.
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
          <div className="max-w-3xl">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/72">
              Read from the outside in
            </div>
            <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">
              Addition and subtraction split the expression into signed terms.
            </h2>
            <p className="mt-2 text-[12px] leading-5 text-stone-500">
              The sign immediately before a term belongs to that term. Once a term is isolated, multiplication tells us how its coefficient and variable part fit together.
            </p>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <StructureCard
              label="Whole expression"
              formula="3x² − 2x + 5"
              text="One expression built from three top-level terms."
              rgb="52, 211, 153"
            />
            <StructureCard
              label="Signed terms"
              formula="+3x²   −2x   +5"
              text="The subtraction sign travels with −2x; it is not a loose symbol between terms."
              rgb="34, 211, 238"
            />
            <StructureCard
              label="Inside 3x²"
              formula="3 · x²"
              text="3 is the coefficient, x is the variable, and 2 is the exponent on x."
              rgb="192, 132, 252"
            />
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-300/70">
                What a variable does
              </div>
              <h3 className="mt-2 text-[17px] font-semibold text-white">
                A variable is a symbol for a value, not automatically “the mystery answer.”
              </h3>
              <p className="mt-2 text-[11px] leading-5 text-stone-500">
                A variable may be unknown, may change, or may stand for any allowed value. If x = 2, the same expression can be evaluated by replacing every x with 2.
              </p>
              <div className="mt-3 rounded-xl border border-white/[0.05] bg-white/[0.012] px-3 py-3 font-mono text-[13px] text-cyan-100">
                3(2)² − 2(2) + 5 = 13
              </div>
            </div>
            <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-300/70">
                The simplification rule
              </div>
              <h3 className="mt-2 text-[17px] font-semibold text-white">
                Like terms have exactly the same variable part.
              </h3>
              <p className="mt-2 text-[11px] leading-5 text-stone-500">
                Coefficients may differ, but variables and exponents must match. That is why 3x² and −2x² can combine while x² and x cannot.
              </p>
              <div className="mt-3 rounded-xl border border-white/[0.05] bg-white/[0.012] px-3 py-3 font-mono text-[13px] text-amber-100">
                ax² + bx² = (a + b)x²
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-emerald-200/[0.12] bg-[#03120d]/55 p-5 backdrop-blur-2xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/72">
                Structure sorter
              </div>
              <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">
                Group by variable structure before you combine anything.
              </h2>
              <p className="mt-2 max-w-3xl text-[11px] leading-5 text-stone-500">
                We are simplifying 3x² + 4x − 2x² + 5 − x. Place each signed term with terms that have the same variable part.
              </p>
            </div>
            <button
              type="button"
              onClick={resetSorter}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.07] px-3 py-2 text-[10px] font-semibold text-stone-500 transition-colors hover:text-stone-300"
            >
              <RefreshCcw size={13} />
              Reset
            </button>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.16] p-5">
              {!complete && currentTerm ? (
                <>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
                    Term {termIndex + 1} of {SORT_TERMS.length}
                  </div>
                  <div className="mt-5 flex min-h-[120px] items-center justify-center rounded-[20px] border border-emerald-300/[0.10] bg-emerald-400/[0.025] font-mono text-[clamp(2.2rem,5vw,3.8rem)] font-semibold text-emerald-100">
                    {currentTerm.display}
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {(Object.keys(FAMILY_LABELS) as TermFamily[]).map((family) => {
                      const selected = answer === family;
                      return (
                        <button
                          key={family}
                          type="button"
                          onClick={() => chooseFamily(family)}
                          className="rounded-[15px] border px-3 py-3 text-[11px] font-semibold transition-colors"
                          style={{
                            borderColor: selected ? "rgba(52,211,153,0.30)" : "rgba(255,255,255,0.06)",
                            background: selected ? "rgba(52,211,153,0.055)" : "rgba(0,0,0,0.10)",
                            color: selected ? "rgb(167 243 208)" : "rgb(168 162 158)",
                          }}
                        >
                          {FAMILY_LABELS[family]}
                        </button>
                      );
                    })}
                  </div>

                  {answer ? (
                    <div
                      className={`mt-4 rounded-[17px] border px-4 py-3 ${
                        correct
                          ? "border-emerald-300/[0.16] bg-emerald-400/[0.035]"
                          : "border-amber-300/[0.14] bg-amber-400/[0.025]"
                      }`}
                      aria-live="polite"
                    >
                      <div className={`text-[10px] font-semibold ${correct ? "text-emerald-200" : "text-amber-200"}`}>
                        {correct ? "Same variable structure" : "Look at the variable part again"}
                      </div>
                      <p className="mt-1 text-[11px] leading-5 text-stone-500">
                        {correct
                          ? currentTerm.reason
                          : answer === "constant"
                            ? "A constant has no variable factor. This term still contains x."
                            : `This term belongs with ${FAMILY_LABELS[currentTerm.family]} because its variable part must match exactly.`}
                      </p>
                      {correct ? (
                        <button
                          type="button"
                          onClick={placeTerm}
                          className="mt-3 rounded-xl border border-emerald-300/[0.20] bg-emerald-400/[0.05] px-4 py-2 text-[10px] font-semibold text-emerald-200"
                        >
                          Place term
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="flex min-h-[280px] flex-col justify-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/[0.20] bg-emerald-400/[0.05] text-emerald-200">
                    <Check size={20} />
                  </div>
                  <div className="mt-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
                    Structure identified
                  </div>
                  <h3 className="mt-2 text-[20px] font-semibold text-white">
                    Now combine only the coefficients inside each group.
                  </h3>
                  <p className="mt-2 max-w-xl text-[11px] leading-5 text-stone-500">
                    Grouping did not change the terms. It only made the compatible structure visible.
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.12] p-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
                Groups
              </div>
              <div className="mt-3 space-y-2">
                {(Object.keys(FAMILY_LABELS) as TermFamily[]).map((family) => (
                  <div key={family} className="rounded-[16px] border border-white/[0.05] bg-white/[0.012] p-3">
                    <div className="text-[9px] font-semibold text-stone-500">
                      {FAMILY_LABELS[family]}
                    </div>
                    <div className="mt-2 min-h-7 font-mono text-[14px] text-stone-300">
                      {sorted[family].length ? sorted[family].join("   ") : "—"}
                    </div>
                  </div>
                ))}
              </div>

              {complete ? (
                <div className="mt-4 border-t border-white/[0.06] pt-4">
                  {!combined ? (
                    <button
                      type="button"
                      onClick={() => setCombined(true)}
                      className="w-full rounded-xl border border-cyan-300/[0.18] bg-cyan-400/[0.04] px-4 py-2.5 text-[10px] font-semibold text-cyan-200"
                    >
                      Combine coefficients
                    </button>
                  ) : (
                    <div className="rounded-[17px] border border-cyan-300/[0.16] bg-cyan-400/[0.035] p-3">
                      <div className="font-mono text-[13px] text-stone-400">
                        (3 − 2)x² + (4 − 1)x + 5
                      </div>
                      <div className="mt-2 font-mono text-[20px] font-semibold text-cyan-100">
                        x² + 3x + 5
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-2">
          <ContrastCard
            label="Same variable, different power"
            formula="3x² + 2x"
            verdict="Do not combine"
            text="The letter matches, but x² and x are different variable structures."
          />
          <ContrastCard
            label="The sign travels with the term"
            formula="4x − x = 4x + (−x)"
            verdict="4x + (−x) = 3x"
            text="Treating the second term as +x would change the expression before you even simplify it."
          />
        </section>

        <section id="expressions-practice" className="scroll-mt-24 mt-4">
          <details className="group overflow-hidden rounded-[22px] border border-white/[0.09] bg-black/[0.18] backdrop-blur-2xl">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.13em] text-emerald-300/72">
                  Check transfer
                </span>
                <strong className="mt-1 block text-[15px] text-stone-200">
                  Read a fresh expression without the microscope
                </strong>
              </span>
              <Sparkles size={16} className="text-emerald-300" />
            </summary>
            <div className="fundamentals-assessment border-t border-white/[0.06] p-3 sm:p-4">
              <Assessment title="Expressions & Variables check" questions={QUIZ} accentColor="emerald" />
            </div>
          </details>
        </section>

        <div className="mt-4 rounded-[20px] border border-white/[0.06] bg-black/[0.12] px-4 py-3">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">
            What this unlocks
          </div>
          <p className="mt-1 text-[11px] leading-5 text-stone-500">
            Once you can see expression structure, equation solving can act on whole terms without accidentally changing what the symbols mean.
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

function StructureCard({
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
    <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
      <div className="text-[9px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.76)` }}>
        {label}
      </div>
      <div className="mt-3 font-mono text-[17px] text-stone-200">{formula}</div>
      <p className="mt-2 text-[11px] leading-5 text-stone-500">{text}</p>
    </div>
  );
}

function ContrastCard({
  label,
  formula,
  verdict,
  text,
}: {
  label: string;
  formula: string;
  verdict: string;
  text: string;
}) {
  return (
    <div className="rounded-[20px] border border-amber-200/[0.09] bg-black/[0.14] p-4 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-300/65">
        <CircleDot size={12} />
        {label}
      </div>
      <div className="mt-3 font-mono text-[16px] text-stone-200">{formula}</div>
      <div className="mt-2 text-[11px] font-semibold text-amber-100">{verdict}</div>
      <p className="mt-1 text-[11px] leading-5 text-stone-500">{text}</p>
    </div>
  );
}

function LessonNavigation({
  previous,
  next,
  unitHref,
}: {
  previous?: ExpressionsLessonNavItem;
  next?: ExpressionsLessonNavItem;
  unitHref: string;
}) {
  return (
    <nav className="mt-4 pb-8" aria-label="Algebra Fundamentals lesson navigation">
      <div className="mb-2 flex justify-end">
        <span className="font-mono text-[10px] text-stone-700">01 / 05</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? <NavCard item={previous} direction="previous" /> : <div className="hidden sm:block" aria-hidden="true" />}
        {next ? (
          <NavCard item={next} direction="next" />
        ) : (
          <Link
            href={unitHref}
            className="group flex min-h-[76px] items-center rounded-[18px] border border-emerald-300/[0.14] bg-emerald-400/[0.025] px-4"
          >
            <span className="min-w-0 flex-1 text-right">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-stone-600">Unit complete</span>
              <strong className="mt-1 block text-[14px] text-stone-200">Return to Algebra Fundamentals</strong>
            </span>
            <Check size={15} className="ml-3 text-emerald-300" />
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
  item: ExpressionsLessonNavItem;
  direction: "previous" | "next";
}) {
  const previous = direction === "previous";
  return (
    <Link
      href={item.href}
      className="group flex min-h-[76px] items-center gap-3 rounded-[18px] border border-emerald-300/[0.12] bg-emerald-400/[0.02] px-4 py-3"
    >
      {previous ? <ArrowLeft size={15} className="text-emerald-300" /> : null}
      <span className={`min-w-0 flex-1 ${previous ? "" : "text-right"}`}>
        <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-stone-600">
          {previous ? "Previous lesson" : "Next lesson"}
        </span>
        <strong className="mt-1 block text-[14px] text-stone-200">{item.label}</strong>
      </span>
      {!previous ? <ArrowRight size={15} className="text-emerald-300" /> : null}
    </Link>
  );
}
