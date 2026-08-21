"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Braces,
  Check,
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
  showVocabulary?: boolean;
};

type TermFamily = "x2" | "x" | "constant";
type ExpressionTermId = "quadratic" | "linear" | "constant";

type AnatomyPiece = {
  token: string;
  label: string;
};

type ExpressionTerm = {
  id: ExpressionTermId;
  symbol: string;
  family: TermFamily;
  evaluate: (x: number) => number;
  anatomy: readonly AnatomyPiece[];
  insight: string;
  borderClass: string;
  surfaceClass: string;
  textClass: string;
  barClass: string;
};

type SortTerm = {
  display: string;
  family: TermFamily;
  reason: string;
};

const ACCENT = "52, 211, 153";
const X_VALUES = [-3, -2, -1, 0, 1, 2, 3] as const;
const FAMILY_ORDER: readonly TermFamily[] = ["x2", "x", "constant"];

const EXPRESSION_TERMS: readonly ExpressionTerm[] = [
  {
    id: "quadratic",
    symbol: "3x²",
    family: "x2",
    evaluate: (x) => 3 * x * x,
    anatomy: [
      { token: "3", label: "coefficient" },
      { token: "x", label: "variable" },
      { token: "2", label: "exponent" },
    ],
    insight: "The exponent applies to x. The coefficient 3 multiplies the result.",
    borderClass: "border-emerald-200/[0.14]",
    surfaceClass: "bg-emerald-300/[0.055]",
    textClass: "text-emerald-100",
    barClass: "bg-emerald-300/70",
  },
  {
    id: "linear",
    symbol: "−2x",
    family: "x",
    evaluate: (x) => -2 * x,
    anatomy: [
      { token: "−2", label: "coefficient" },
      { token: "x", label: "variable" },
      { token: "1", label: "implied exponent" },
    ],
    insight: "The minus sign belongs to the coefficient: −2x means (−2) · x.",
    borderClass: "border-cyan-200/[0.14]",
    surfaceClass: "bg-cyan-300/[0.05]",
    textClass: "text-cyan-100",
    barClass: "bg-cyan-300/70",
  },
  {
    id: "constant",
    symbol: "+5",
    family: "constant",
    evaluate: () => 5,
    anatomy: [{ token: "+5", label: "constant" }],
    insight: "No x appears here, so this term stays 5 for every value of x.",
    borderClass: "border-violet-200/[0.14]",
    surfaceClass: "bg-violet-300/[0.05]",
    textClass: "text-violet-100",
    barClass: "bg-violet-300/70",
  },
] as const;

const SORT_TERMS: readonly SortTerm[] = [
  {
    display: "3x²",
    family: "x2",
    reason: "Its variable structure is x².",
  },
  {
    display: "+4x",
    family: "x",
    reason: "Its variable structure is x¹, written x.",
  },
  {
    display: "−2x²",
    family: "x2",
    reason: "The sign differs, but the variable structure is still x².",
  },
  {
    display: "+5",
    family: "constant",
    reason: "It has no variable factor.",
  },
  {
    display: "−x",
    family: "x",
    reason: "−x means −1x, so the variable structure is x.",
  },
] as const;

const FAMILY_LABELS: Record<TermFamily, string> = {
  x2: "x² family",
  x: "x family",
  constant: "constants",
};

const FAMILY_PATTERNS: Record<TermFamily, string> = {
  x2: "□x²",
  x: "□x",
  constant: "□",
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
    explanation: "Like terms have the same variables raised to the same powers.",
  },
  {
    id: "expression-transfer-simplify",
    type: "short_answer",
    prompt: "Simplify 6x − 2x + 3. Enter the expression.",
    acceptableAnswers: ["4x+3", "4x + 3"],
    explanation: "6x and −2x share the same variable structure, so their coefficients combine.",
  },
];

export default function ExpressionsVariablesLessonExperience({
  breadcrumbs,
  previous,
  next,
  unitHref,
  showVocabulary = true,
}: ExpressionsLessonExperienceProps) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#031912] text-stone-100">
      <FundamentalsLessonBackgroundV2 lesson="expressions-variables" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0.58))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow="Lesson 01 · Expressions & Variables"
          icon={Braces}
          title={<span>Expressions & Variables</span>}
          subtitle="Change x, take the expression apart, and discover which terms can combine."
          accentRgb={ACCENT}
          titleClassName="font-mono text-[clamp(2.2rem,4.35vw,4.55rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f4fff9]"
          metadataTextClassName="text-[11px]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <LessonUtilityBar
          practiceTargetId="expressions-practice"
          vocabulary={showVocabulary}
          accentRgb={ACCENT}
          labelClassName="text-[11px]"
        />

        <LessonFlow />
        <VariableDiscoveryLab />
        <TermAnatomyLab />
        <StructureSorter />
        <PatternSummary />

        <section id="expressions-practice" className="mt-4 scroll-mt-24">
          <details className="group overflow-hidden rounded-[22px] border border-white/[0.09] bg-black/[0.20] backdrop-blur-2xl">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.13em] text-emerald-300/75">
                  Stage 4 · Check
                </span>
                <strong className="mt-1 block text-[16px] text-stone-100">
                  Try a fresh expression
                </strong>
              </span>
              <Sparkles size={17} className="text-emerald-300" />
            </summary>
            <div className="fundamentals-assessment border-t border-white/[0.06] p-3 sm:p-4">
              <Assessment
                title="Expressions & Variables check"
                questions={QUIZ}
                accentColor="emerald"
              />
            </div>
          </details>
        </section>

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

function LessonFlow() {
  const stages = [
    ["01", "Change x"],
    ["02", "Split terms"],
    ["03", "Sort families"],
    ["04", "Check"],
  ] as const;

  return (
    <ol
      aria-label="Lesson flow"
      className="mt-4 grid gap-2 rounded-[22px] border border-white/[0.08] bg-black/[0.18] p-3 backdrop-blur-2xl sm:grid-cols-4"
    >
      {stages.map(([number, label]) => (
        <li
          key={number}
          className="flex items-center gap-3 rounded-[15px] border border-white/[0.055] bg-white/[0.018] px-3 py-3"
        >
          <span className="font-mono text-[12px] font-semibold text-emerald-300/80">
            {number}
          </span>
          <span className="text-[13px] font-semibold text-stone-300">{label}</span>
        </li>
      ))}
    </ol>
  );
}

function VariableDiscoveryLab() {
  const [xValue, setXValue] = useState(2);
  const [guess, setGuess] = useState<ExpressionTermId | null>(null);
  const values = EXPRESSION_TERMS.map((term) => ({
    term,
    value: term.evaluate(xValue),
  }));
  const total = values.reduce((sum, item) => sum + item.value, 0);
  const correct = guess === "constant";

  function chooseValue(value: number) {
    setXValue(value);
    setGuess(null);
  }

  return (
    <section className="mt-4 rounded-[28px] border border-emerald-200/[0.12] bg-[#03120d]/62 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_24px_70px_rgba(0,0,0,0.20)] backdrop-blur-2xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300/75">
            Stage 1 · Change x
          </div>
          <h2 className="mt-2 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-[-0.035em] text-white">
            What changes when x changes?
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2" aria-label="Choose a value for x">
          <span className="mr-1 text-[13px] font-semibold text-stone-400">x =</span>
          {X_VALUES.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => chooseValue(value)}
              aria-pressed={xValue === value}
              className={`flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 font-mono text-[14px] font-semibold transition-colors ${
                xValue === value
                  ? "border-emerald-200/30 bg-emerald-300/[0.10] text-emerald-100"
                  : "border-white/[0.07] bg-black/[0.12] text-stone-400 hover:text-stone-200"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 rounded-[20px] border border-white/[0.07] bg-black/[0.16] px-4 py-5 font-mono">
        <span className="text-[clamp(1.5rem,3.5vw,2.5rem)] text-emerald-100">3({xValue})²</span>
        <span className="text-[clamp(1.2rem,3vw,2rem)] text-stone-600">−</span>
        <span className="text-[clamp(1.5rem,3.5vw,2.5rem)] text-cyan-100">2({xValue})</span>
        <span className="text-[clamp(1.2rem,3vw,2rem)] text-stone-600">+</span>
        <span className="text-[clamp(1.5rem,3.5vw,2.5rem)] text-violet-100">5</span>
        <span className="text-[clamp(1.2rem,3vw,2rem)] text-stone-600">=</span>
        <span className="text-[clamp(1.7rem,4vw,2.8rem)] font-semibold text-white">{total}</span>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {values.map(({ term, value }) => (
          <ContributionCard key={term.id} term={term} value={value} />
        ))}
      </div>

      <div className="mt-5 grid gap-4 border-t border-white/[0.07] pt-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
        <h3 className="text-[18px] font-semibold text-stone-100">
          Which term stays unchanged?
        </h3>
        <div className="grid gap-2 sm:grid-cols-3">
          {EXPRESSION_TERMS.map((term) => (
            <button
              key={term.id}
              type="button"
              onClick={() => setGuess(term.id)}
              aria-pressed={guess === term.id}
              className={`rounded-[15px] border px-3 py-3 font-mono text-[15px] font-semibold transition-colors ${
                guess === term.id
                  ? `${term.borderClass} ${term.surfaceClass} ${term.textClass}`
                  : "border-white/[0.07] bg-black/[0.10] text-stone-400 hover:text-stone-200"
              }`}
            >
              {term.symbol}
            </button>
          ))}
        </div>
      </div>

      {guess ? (
        <div
          className={`mt-3 rounded-[16px] border px-4 py-3 text-[13px] leading-6 ${
            correct
              ? "border-emerald-200/[0.16] bg-emerald-300/[0.045] text-emerald-100"
              : "border-amber-200/[0.13] bg-amber-300/[0.035] text-amber-100"
          }`}
          aria-live="polite"
        >
          {correct
            ? "+5 stays fixed because it contains no x. It is the constant."
            : "Try another value of x and watch the three contribution bars."}
        </div>
      ) : null}
    </section>
  );
}

function ContributionCard({ term, value }: { term: ExpressionTerm; value: number }) {
  const width = Math.abs(value) === 0
    ? 0
    : Math.max(3, Math.min(50, (Math.abs(value) / 27) * 50));
  const negative = value < 0;

  return (
    <div className={`rounded-[19px] border p-4 ${term.borderClass} ${term.surfaceClass}`}>
      <div className="flex items-baseline justify-between gap-3">
        <span className={`font-mono text-[18px] font-semibold ${term.textClass}`}>
          {term.symbol}
        </span>
        <span className="font-mono text-[24px] font-semibold text-white">{value}</span>
      </div>
      <div
        className="relative mt-4 h-3 rounded-full bg-black/[0.20]"
        role="img"
        aria-label={`${term.symbol} contributes ${value}`}
      >
        <span className="absolute inset-y-[-3px] left-1/2 w-px bg-white/20" />
        <span
          className={`absolute inset-y-0 rounded-full ${term.barClass}`}
          style={negative ? { right: "50%", width: `${width}%` } : { left: "50%", width: `${width}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] font-medium text-stone-600" aria-hidden="true">
        <span>negative</span>
        <span>positive</span>
      </div>
    </div>
  );
}

function TermAnatomyLab() {
  const [selectedId, setSelectedId] = useState<ExpressionTermId>("quadratic");
  const [seen, setSeen] = useState<ExpressionTermId[]>(["quadratic"]);
  const selectedTerm = EXPRESSION_TERMS.find((term) => term.id === selectedId) ?? EXPRESSION_TERMS[0];

  function inspectTerm(termId: ExpressionTermId) {
    setSelectedId(termId);
    setSeen((current) => current.includes(termId) ? current : [...current, termId]);
  }

  return (
    <section className="mt-4 rounded-[28px] border border-cyan-200/[0.11] bg-[#04151a]/62 p-5 backdrop-blur-2xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-300/75">
            Stage 2 · Split terms
          </div>
          <h2 className="mt-2 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-[-0.035em] text-white">
            Select a signed term.
          </h2>
        </div>
        <div className="text-[12px] font-semibold text-stone-500">
          {seen.length} / {EXPRESSION_TERMS.length} inspected
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 rounded-[22px] border border-white/[0.07] bg-black/[0.17] p-4">
        {EXPRESSION_TERMS.map((term) => (
          <div key={term.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inspectTerm(term.id)}
              aria-pressed={selectedId === term.id}
              className={`rounded-[16px] border px-5 py-4 font-mono text-[clamp(1.5rem,4vw,2.7rem)] font-semibold transition-colors ${
                selectedId === term.id
                  ? `${term.borderClass} ${term.surfaceClass} ${term.textClass}`
                  : "border-transparent text-stone-500 hover:border-white/[0.08] hover:text-stone-300"
              }`}
            >
              {term.symbol}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center">
        <div className={`rounded-[20px] border p-5 ${selectedTerm.borderClass} ${selectedTerm.surfaceClass}`}>
          <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-stone-500">
            Selected term
          </div>
          <div className={`mt-3 font-mono text-[clamp(2.4rem,6vw,4.5rem)] font-semibold ${selectedTerm.textClass}`}>
            {selectedTerm.symbol}
          </div>
        </div>

        <div>
          <div className="grid gap-2 [grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]">
            {selectedTerm.anatomy.map((piece) => (
              <div
                key={`${selectedTerm.id}-${piece.label}`}
                className="rounded-[18px] border border-white/[0.07] bg-black/[0.14] p-4 text-center"
              >
                <div className="font-mono text-[26px] font-semibold text-white">
                  {piece.token}
                </div>
                <div className="mt-2 text-[12px] font-semibold text-stone-400">
                  {piece.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[13px] leading-6 text-stone-400" aria-live="polite">
            {selectedTerm.insight}
          </p>
        </div>
      </div>
    </section>
  );
}

function StructureSorter() {
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
    <section className="mt-4 rounded-[28px] border border-violet-200/[0.11] bg-[#0b0919]/60 p-5 backdrop-blur-2xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-300/75">
            Stage 3 · Sort families
          </div>
          <h2 className="mt-2 text-[clamp(1.55rem,3vw,2.35rem)] font-semibold tracking-[-0.035em] text-white">
            Which terms have the same shape?
          </h2>
          <div className="mt-3 font-mono text-[16px] text-stone-400">
            3x² + 4x − 2x² + 5 − x
          </div>
        </div>
        <button
          type="button"
          onClick={resetSorter}
          className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-3 py-2 text-[11px] font-semibold text-stone-500 transition-colors hover:text-stone-300"
        >
          <RefreshCcw size={14} />
          Reset
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.18] p-5">
          {!complete && currentTerm ? (
            <>
              <div className="text-[12px] font-semibold text-stone-500">
                Term {termIndex + 1} of {SORT_TERMS.length}
              </div>
              <div className="mt-4 flex min-h-[124px] items-center justify-center rounded-[20px] border border-violet-200/[0.12] bg-violet-300/[0.04] font-mono text-[clamp(2.5rem,6vw,4.2rem)] font-semibold text-violet-100">
                {currentTerm.display}
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {FAMILY_ORDER.map((family) => {
                  const selected = answer === family;
                  return (
                    <button
                      key={family}
                      type="button"
                      onClick={() => chooseFamily(family)}
                      aria-pressed={selected}
                      className={`rounded-[16px] border px-3 py-3 transition-colors ${
                        selected
                          ? "border-violet-200/25 bg-violet-300/[0.08] text-violet-100"
                          : "border-white/[0.07] bg-black/[0.10] text-stone-400 hover:text-stone-200"
                      }`}
                    >
                      <span className="block font-mono text-[20px] font-semibold">
                        {FAMILY_PATTERNS[family]}
                      </span>
                      <span className="mt-1 block text-[12px] font-semibold">
                        {FAMILY_LABELS[family]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {answer ? (
                <div
                  className={`mt-4 rounded-[17px] border px-4 py-3 ${
                    correct
                      ? "border-emerald-200/[0.16] bg-emerald-300/[0.04]"
                      : "border-amber-200/[0.14] bg-amber-300/[0.035]"
                  }`}
                  aria-live="polite"
                >
                  <div className={`text-[13px] font-semibold ${correct ? "text-emerald-100" : "text-amber-100"}`}>
                    {correct ? currentTerm.reason : "Match the variable and its exponent."}
                  </div>
                  {correct ? (
                    <button
                      type="button"
                      onClick={placeTerm}
                      className="mt-3 rounded-xl border border-emerald-200/[0.20] bg-emerald-300/[0.06] px-4 py-2.5 text-[12px] font-semibold text-emerald-100"
                    >
                      Place with {FAMILY_LABELS[currentTerm.family]}
                    </button>
                  ) : null}
                </div>
              ) : null}
            </>
          ) : (
            <div className="flex min-h-[285px] flex-col justify-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-200/[0.18] bg-emerald-300/[0.06] text-emerald-100">
                <Check size={20} />
              </div>
              <h3 className="mt-4 text-[22px] font-semibold text-white">
                Every term has a family.
              </h3>
              <p className="mt-2 text-[13px] leading-6 text-stone-400">
                Now combine the numbers attached to matching structures.
              </p>
            </div>
          )}
        </div>

        <div className="rounded-[24px] border border-white/[0.08] bg-black/[0.14] p-4">
          <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-stone-500">
            Family bins
          </div>
          <div className="mt-3 space-y-2">
            {FAMILY_ORDER.map((family) => (
              <FamilyBin key={family} family={family} terms={sorted[family]} />
            ))}
          </div>

          {complete ? (
            <div className="mt-4 border-t border-white/[0.07] pt-4">
              {!combined ? (
                <button
                  type="button"
                  onClick={() => setCombined(true)}
                  className="w-full rounded-xl border border-cyan-200/[0.18] bg-cyan-300/[0.05] px-4 py-3 text-[12px] font-semibold text-cyan-100"
                >
                  Combine coefficients
                </button>
              ) : (
                <div className="rounded-[17px] border border-cyan-200/[0.16] bg-cyan-300/[0.04] p-4">
                  <div className="font-mono text-[14px] text-stone-400">
                    (3 − 2)x² + (4 − 1)x + 5
                  </div>
                  <div className="mt-3 font-mono text-[24px] font-semibold text-cyan-100">
                    x² + 3x + 5
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function FamilyBin({ family, terms }: { family: TermFamily; terms: readonly string[] }) {
  return (
    <div className="grid grid-cols-[74px_minmax(0,1fr)] items-center gap-3 rounded-[17px] border border-white/[0.06] bg-white/[0.015] p-3">
      <div>
        <div className="font-mono text-[18px] font-semibold text-violet-200/80">
          {FAMILY_PATTERNS[family]}
        </div>
        <div className="mt-1 text-[11px] font-semibold text-stone-600">
          {FAMILY_LABELS[family]}
        </div>
      </div>
      <div className="min-h-8 font-mono text-[15px] text-stone-300">
        {terms.length ? terms.join("   ") : "—"}
      </div>
    </div>
  );
}

function PatternSummary() {
  const patterns = [
    {
      label: "Same structure",
      formula: "3x² − 2x²  →  x²",
      tone: "text-emerald-100",
    },
    {
      label: "Different structure",
      formula: "x² + x  →  x² + x",
      tone: "text-amber-100",
    },
    {
      label: "The sign stays attached",
      formula: "4x − x  →  3x",
      tone: "text-cyan-100",
    },
  ] as const;

  return (
    <section className="mt-4 grid gap-3 md:grid-cols-3" aria-label="Patterns discovered">
      {patterns.map((pattern) => (
        <div
          key={pattern.label}
          className="rounded-[20px] border border-white/[0.08] bg-black/[0.18] p-4 backdrop-blur-xl"
        >
          <div className="text-[12px] font-semibold text-stone-500">{pattern.label}</div>
          <div className={`mt-3 font-mono text-[17px] font-semibold ${pattern.tone}`}>
            {pattern.formula}
          </div>
        </div>
      ))}
    </section>
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
        <span className="font-mono text-[11px] text-stone-600">01 / 05</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? (
          <NavCard item={previous} direction="previous" />
        ) : (
          <div className="hidden sm:block" aria-hidden="true" />
        )}
        {next ? (
          <NavCard item={next} direction="next" />
        ) : (
          <Link
            href={unitHref}
            className="group flex min-h-[76px] items-center rounded-[18px] border border-emerald-200/[0.14] bg-emerald-300/[0.03] px-4"
          >
            <span className="min-w-0 flex-1 text-right">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.10em] text-stone-500">
                Unit complete
              </span>
              <strong className="mt-1 block text-[14px] text-stone-200">
                Return to Algebra Fundamentals
              </strong>
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
      className="group flex min-h-[76px] items-center gap-3 rounded-[18px] border border-emerald-200/[0.12] bg-emerald-300/[0.025] px-4 py-3"
    >
      {previous ? <ArrowLeft size={15} className="text-emerald-300" /> : null}
      <span className={`min-w-0 flex-1 ${previous ? "" : "text-right"}`}>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.10em] text-stone-500">
          {previous ? "Previous lesson" : "Next lesson"}
        </span>
        <strong className="mt-1 block text-[14px] text-stone-200">{item.label}</strong>
      </span>
      {!previous ? <ArrowRight size={15} className="text-emerald-300" /> : null}
    </Link>
  );
}
