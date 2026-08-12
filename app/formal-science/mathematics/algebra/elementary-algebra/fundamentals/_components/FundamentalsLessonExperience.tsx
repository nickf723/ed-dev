"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Braces,
  Check,
  CircleDot,
  Equal,
  Hash,
  RefreshCcw,
  Scale,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Assessment, { type AssessmentQuestion } from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import FundamentalsLessonBackgroundV2, {
  type FundamentalsLessonKey,
} from "./FundamentalsLessonBackgroundV2";

export type FundamentalsLessonNavItem = {
  label: string;
  href: string;
};

type FundamentalsLessonExperienceProps = {
  lesson: FundamentalsLessonKey;
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

type ExpressionPart = "term" | "coefficient" | "variable" | "exponent" | "constant";
type EquationLessonKey = "one-step-equations" | "two-step-equations";
type PropertyId = "commutative" | "associative" | "distributive" | "identity" | "inverse";
type NumberSetId = "natural" | "integer" | "rational" | "irrational" | "real";

const META: Record<FundamentalsLessonKey, LessonMeta> = {
  "expressions-variables": {
    step: "01",
    title: "Expressions & Variables",
    eyebrow: "Symbol grammar",
    subtitle: "Learn to see the internal structure of an expression before you manipulate it.",
    core: "An expression is built from meaningful parts, not just a row of symbols.",
    accent: "52, 211, 153",
    base: "#031912",
    icon: Braces,
  },
  "one-step-equations": {
    step: "02",
    title: "Solving One-Step Equations",
    eyebrow: "Undo one operation",
    subtitle: "Use one inverse operation to isolate the variable while preserving equality on both sides.",
    core: "A one-step equation hides the variable behind exactly one operation.",
    accent: "34, 211, 238",
    base: "#03151b",
    icon: Scale,
  },
  "two-step-equations": {
    step: "03",
    title: "Solving Two-Step Equations",
    eyebrow: "Peel back two layers",
    subtitle: "Work from the outside inward, undoing one operation at a time until the variable is isolated.",
    core: "A two-step equation is a one-step equation with one extra layer around the variable.",
    accent: "96, 165, 250",
    base: "#04111f",
    icon: Equal,
  },
  "algebraic-properties": {
    step: "04",
    title: "Algebraic Properties",
    eyebrow: "Rewrite permissions",
    subtitle: "Properties explain exactly which rewrites preserve value and where each permission stops working.",
    core: "A property is a reusable reason that two forms mean the same thing.",
    accent: "129, 140, 248",
    base: "#09091d",
    icon: RefreshCcw,
  },
  "number-systems": {
    step: "05",
    title: "Number Systems",
    eyebrow: "Allowed values",
    subtitle: "Place familiar numbers inside a nested hierarchy and use the smallest set that actually describes a value.",
    core: "Every algebra problem lives inside some universe of allowed values.",
    accent: "251, 191, 36",
    base: "#171205",
    icon: Hash,
  },
};

const LESSON_TOTAL = String(Object.keys(META).length).padStart(2, "0");

const EXPRESSION_PARTS: Record<ExpressionPart, { label: string; definition: string; example: string; color: string }> = {
  term: { label: "Term", definition: "A top-level piece separated by addition or subtraction. Its sign travels with it.", example: "3x² · −2x · +5", color: "52, 211, 153" },
  coefficient: { label: "Coefficient", definition: "The signed numerical factor multiplying a variable part.", example: "3 and −2", color: "34, 211, 238" },
  variable: { label: "Variable", definition: "A symbol standing for an unknown, changing, or generalized value.", example: "x", color: "96, 165, 250" },
  exponent: { label: "Exponent", definition: "A power attached to a base. It changes the structure of the variable part.", example: "2 in x²", color: "192, 132, 252" },
  constant: { label: "Constant", definition: "A term with no variable factor, so its value does not depend on x.", example: "+5", color: "251, 191, 36" },
};

const PROPERTIES: Record<PropertyId, { label: string; before: string; after: string; meaning: string; limit: string; color: string }> = {
  commutative: { label: "Commutative", before: "a + b", after: "b + a", meaning: "Reorder addends or factors.", limit: "Subtraction and division are not commutative.", color: "34, 211, 238" },
  associative: { label: "Associative", before: "(a + b) + c", after: "a + (b + c)", meaning: "Regroup repeated addition or multiplication.", limit: "Regrouping cannot freely cross different operations.", color: "129, 140, 248" },
  distributive: { label: "Distributive", before: "a(b + c)", after: "ab + ac", meaning: "Move between a grouped product and an expanded sum.", limit: "Every term inside the group receives the outside factor.", color: "52, 211, 153" },
  identity: { label: "Identity", before: "a + 0", after: "a", meaning: "Use a neutral element without changing value.", limit: "0 is additive identity; 1 is multiplicative identity.", color: "251, 191, 36" },
  inverse: { label: "Inverse", before: "a + (−a)", after: "0", meaning: "Pair a value with something that cancels it.", limit: "A multiplicative inverse requires a ≠ 0.", color: "244, 114, 182" },
};

const NUMBER_VALUES = [
  { display: "5", set: "natural" as NumberSetId, note: "5 is a counting number, so ℕ is already enough." },
  { display: "−3", set: "integer" as NumberSetId, note: "Negative whole numbers require ℤ but are still rational and real." },
  { display: "3/4", set: "rational" as NumberSetId, note: "A ratio of integers belongs to ℚ." },
  { display: "√2", set: "irrational" as NumberSetId, note: "√2 is real but cannot be written as a ratio of integers." },
  { display: "π", set: "irrational" as NumberSetId, note: "π is an irrational real number." },
] as const;

const NUMBER_SET_LABELS: Record<NumberSetId, string> = {
  natural: "ℕ Natural",
  integer: "ℤ Integer",
  rational: "ℚ Rational",
  irrational: "Irrational",
  real: "ℝ Real",
};

const QUIZZES: Record<FundamentalsLessonKey, AssessmentQuestion[]> = {
  "expressions-variables": [
    { id: "expr-coeff", type: "mcq", prompt: "What is the coefficient of x in −7x + 4?", options: ["−7", "7", "4"], correctAnswer: "−7", explanation: "The sign is part of the term, so the signed numerical factor is −7." },
    { id: "expr-like", type: "multiselect", prompt: "Which terms are like terms with 3x²?", options: ["−5x²", "7x", "x²/2", "4"], correctAnswers: ["−5x²", "x²/2"], explanation: "Like terms must have the same variable part with the same exponents." },
    { id: "expr-term", type: "tf", prompt: "In 4x − 9, the second term is −9.", correctAnswer: true, explanation: "The subtraction sign travels with the following term, so the term is −9." },
  ],
  "one-step-equations": [
    { id: "one-inverse", type: "mcq", prompt: "What operation isolates x in x + 6 = 14?", options: ["Subtract 6 from both sides", "Add 6 to both sides", "Divide both sides by 6"], correctAnswer: "Subtract 6 from both sides", explanation: "Subtraction undoes the addition of 6 while keeping both sides equal." },
    { id: "one-balance", type: "tf", prompt: "Dividing both sides of 5x = 20 by 5 preserves the solution.", correctAnswer: true, explanation: "Applying the same reversible operation to both sides creates an equivalent equation." },
    { id: "one-solve", type: "short_answer", prompt: "Solve x/4 = 3. Enter x.", acceptableAnswers: ["12", "x=12", "x = 12"], explanation: "Multiply both sides by 4 to undo division by 4." },
  ],
  "two-step-equations": [
    { id: "two-first", type: "mcq", prompt: "What is the cleanest first move for 3x + 5 = 20?", options: ["Subtract 5 from both sides", "Divide both sides by 3", "Add 5 to both sides"], correctAnswer: "Subtract 5 from both sides", explanation: "Undo the outer additive layer first, giving 3x = 15." },
    { id: "two-balance", type: "tf", prompt: "In 2x + 6 = 14, subtracting 6 only from the left side preserves equality.", correctAnswer: false, explanation: "A solving step must preserve the relationship by applying the operation to both sides." },
    { id: "two-solve", type: "short_answer", prompt: "Solve 2x + 6 = 14. Enter x.", acceptableAnswers: ["4", "x=4", "x = 4"], explanation: "Subtract 6 to get 2x = 8, then divide by 2." },
  ],
  "algebraic-properties": [
    { id: "prop-dist", type: "mcq", prompt: "Which property justifies 4(x + 3) = 4x + 12?", options: ["Commutative", "Distributive", "Identity"], correctAnswer: "Distributive", explanation: "The factor 4 is distributed to every term inside the parentheses." },
    { id: "prop-comm", type: "tf", prompt: "a − b = b − a is a commutative law.", correctAnswer: false, explanation: "Subtraction is not commutative." },
    { id: "prop-identity", type: "multiselect", prompt: "Which statements use an identity element?", options: ["a + 0 = a", "a × 1 = a", "a + (−a) = 0", "a + b = b + a"], correctAnswers: ["a + 0 = a", "a × 1 = a"], explanation: "0 and 1 are neutral elements for addition and multiplication respectively." },
  ],
  "number-systems": [
    { id: "num-int", type: "mcq", prompt: "What is the smallest listed set containing −5?", options: ["Natural", "Integer", "Rational", "Real"], correctAnswer: "Integer", explanation: "−5 is an integer; integers are also rational and real, but ℤ is the smallest listed set." },
    { id: "num-repeat", type: "tf", prompt: "A repeating decimal is rational.", correctAnswer: true, explanation: "Every repeating decimal can be written as a ratio of integers." },
    { id: "num-real", type: "multiselect", prompt: "Which values are real numbers?", options: ["3/4", "√2", "π", "−7"], correctAnswers: ["3/4", "√2", "π", "−7"], explanation: "Rational and irrational values together make the real numbers." },
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
    <main className="relative min-h-screen overflow-x-hidden text-stone-100" style={{ backgroundColor: meta.base }}>
      <FundamentalsLessonBackgroundV2 lesson={lesson} />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03),rgba(0,0,0,0.38))]" />

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
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: `rgba(${meta.accent},0.76)` }}>Core idea</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.45rem,2.5vw,2rem)] font-semibold tracking-[-0.035em] text-white">{meta.core}</h2>
          </div>
          <LessonOrientation lesson={lesson} />
        </section>

        <div className="mt-4">
          {lesson === "expressions-variables" ? <ExpressionsLesson /> : null}
          {lesson === "one-step-equations" ? <EquationLesson lesson="one-step-equations" /> : null}
          {lesson === "two-step-equations" ? <EquationLesson lesson="two-step-equations" /> : null}
          {lesson === "algebraic-properties" ? <PropertiesLesson /> : null}
          {lesson === "number-systems" ? <NumberSystemsLesson /> : null}
        </div>

        <section id="fundamentals-practice" className="scroll-mt-24 mt-4">
          <details className="group overflow-hidden rounded-[22px] border border-white/[0.09] bg-black/[0.18] backdrop-blur-2xl">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.13em]" style={{ color: `rgba(${meta.accent},0.72)` }}>Concept check</span>
                <strong className="mt-1 block text-[15px] text-stone-200">Three questions when you want a checkpoint</strong>
              </span>
              <Sparkles size={16} style={{ color: `rgb(${meta.accent})` }} />
            </summary>
            <div className="fundamentals-assessment border-t border-white/[0.06] p-3 sm:p-4">
              <Assessment title={`${meta.title} check`} questions={QUIZZES[lesson]} accentColor={assessmentColor(lesson)} />
            </div>
          </details>
        </section>

        <LessonNavigation previous={previous} next={next} unitHref={unitHref} currentStep={meta.step} accent={meta.accent} />
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

function LessonOrientation({ lesson }: { lesson: FundamentalsLessonKey }) {
  const content: Record<FundamentalsLessonKey, { label: string; value: string; note: string }> = {
    "expressions-variables": { label: "Persistent object", value: "3x² − 2x + 5", note: "Zoom from the whole expression into its structural layers." },
    "one-step-equations": { label: "One hidden layer", value: "x + 6 = 14", note: "One inverse operation exposes x while equality stays intact." },
    "two-step-equations": { label: "Two hidden layers", value: "2x + 6 = 14", note: "Peel away one operation at a time without changing the solution." },
    "algebraic-properties": { label: "Persistent question", value: "Why is this rewrite legal?", note: "Every move needs a general permission." },
    "number-systems": { label: "Persistent map", value: "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ", note: "Classify a value without forgetting the larger sets containing it." },
  };
  const item = content[lesson];
  return (
    <div className="rounded-[18px] border border-white/[0.07] bg-white/[0.018] px-4 py-3">
      <div className="text-[8px] font-semibold uppercase tracking-[0.12em] text-stone-600">{item.label}</div>
      <div className="mt-1 font-mono text-[17px] text-stone-200">{item.value}</div>
      <p className="mt-1.5 text-[10px] leading-4 text-stone-500">{item.note}</p>
    </div>
  );
}

function ExpressionsLesson() {
  const [part, setPart] = useState<ExpressionPart>("term");
  const [combineStep, setCombineStep] = useState(0);
  const active = EXPRESSION_PARTS[part];
  const combine = [
    "3x² + 4x − 2x² + 5 − x",
    "(3x² − 2x²) + (4x − x) + 5",
    "x² + 3x + 5",
  ];

  return (
    <section className="rounded-[28px] border border-emerald-200/[0.12] bg-[#03120d]/48 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_330px]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-300/70">Anatomy</div>
          <div className="mt-6 flex min-h-[150px] items-center justify-center rounded-[20px] border border-white/[0.06] bg-black/[0.14] p-5 font-mono text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.05em] text-white">
            <ExpressionDisplay active={part} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {(Object.keys(EXPRESSION_PARTS) as ExpressionPart[]).map((id) => {
              const item = EXPRESSION_PARTS[id];
              return <ChoiceButton key={id} active={id === part} label={item.label} rgb={item.color} onClick={() => setPart(id)} />;
            })}
          </div>
        </div>
        <div className="flex min-h-[280px] flex-col justify-center rounded-[20px] border p-4" style={{ borderColor: `rgba(${active.color},0.18)`, background: `rgba(${active.color},0.035)` }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${active.color},0.75)` }}>Selected role</div>
          <h3 className="mt-2 text-[22px] font-semibold text-white">{active.label}</h3>
          <p className="mt-3 text-[12px] leading-5 text-stone-400">{active.definition}</p>
          <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/[0.16] px-3 py-3 font-mono text-[14px]" style={{ color: `rgb(${active.color})` }}>{active.example}</div>
        </div>
      </div>

      <div className="mt-5 border-t border-white/[0.06] pt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-cyan-300/70">Go one layer deeper</div>
            <h3 className="mt-1 text-[18px] font-semibold text-white">Like terms share the same variable structure.</h3>
          </div>
          <div className="flex gap-2">
            {[0, 1, 2].map((step) => <button key={step} type="button" onClick={() => setCombineStep(step)} className={`h-9 min-w-9 rounded-xl border font-mono text-[10px] ${combineStep === step ? "border-cyan-300/[0.28] bg-cyan-400/[0.06] text-cyan-200" : "border-white/[0.06] text-stone-600"}`}>{step + 1}</button>)}
          </div>
        </div>
        <div className="mt-4 min-h-[86px] rounded-[18px] border border-white/[0.06] bg-black/[0.14] px-4 py-5 text-center font-mono text-[clamp(1.1rem,2.2vw,1.55rem)] text-stone-200">{combine[combineStep]}</div>
        <p className="mt-2 text-[10px] leading-4 text-stone-600">You may rearrange terms using algebraic properties, but only terms with identical variable-and-exponent structure can combine.</p>
      </div>
    </section>
  );
}

function ExpressionDisplay({ active }: { active: ExpressionPart }) {
  if (active === "term") return <span><Mark>3x²</Mark> <span className="text-stone-600">−</span> <Mark>2x</Mark> <span className="text-stone-600">+</span> <Mark>5</Mark></span>;
  if (active === "coefficient") return <span><Mark>3</Mark>x² − <Mark>2</Mark>x + 5</span>;
  if (active === "variable") return <span>3<Mark>x</Mark>² − 2<Mark>x</Mark> + 5</span>;
  if (active === "exponent") return <span>3x<sup className="text-violet-300">2</sup> − 2x + 5</span>;
  return <span>3x² − 2x + <Mark>5</Mark></span>;
}

function Mark({ children }: { children: ReactNode }) {
  return <span className="rounded-lg bg-emerald-400/[0.10] px-1.5 text-emerald-200 ring-1 ring-emerald-300/[0.18]">{children}</span>;
}

function EquationLesson({ lesson }: { lesson: EquationLessonKey }) {
  const oneStep = lesson === "one-step-equations";
  const accent = oneStep ? "34, 211, 238" : "96, 165, 250";
  const [step, setStep] = useState(0);
  const [probe, setProbe] = useState(oneStep ? 8 : 4);
  const [choice, setChoice] = useState<string | null>(null);
  const states = oneStep
    ? [
        { left: "x + 6", right: "14", op: "Start" },
        { left: "x", right: "8", op: "subtract 6 from both sides" },
      ]
    : [
        { left: "2x + 6", right: "14", op: "Start" },
        { left: "2x", right: "8", op: "subtract 6 from both sides" },
        { left: "x", right: "4", op: "divide both sides by 2" },
      ];
  const probes = oneStep ? [7, 8, 9] : [3, 4, 5];
  const state = states[step];
  const leftValue = oneStep
    ? step === 0 ? probe + 6 : probe
    : step === 0 ? 2 * probe + 6 : step === 1 ? 2 * probe : probe;
  const rightValue = oneStep ? (step === 0 ? 14 : 8) : (step === 0 ? 14 : step === 1 ? 8 : 4);
  const balanced = leftValue === rightValue;
  const challenges = oneStep
    ? [
        { label: "x = 8", valid: true },
        { label: "x = 20", valid: false },
        { label: "x + 6 = 8", valid: false },
      ]
    : [
        { label: "2x = 8", valid: true },
        { label: "2x = 14", valid: false },
        { label: "x + 3 = 7", valid: true },
      ];
  const selected = challenges.find((item) => item.label === choice);
  const solution = oneStep ? 8 : 4;

  return (
    <section className="rounded-[28px] border bg-[#03131a]/48 p-5 backdrop-blur-2xl" style={{ borderColor: `rgba(${accent},0.14)` }}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_330px]">
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: `rgba(${accent},0.72)` }}>{oneStep ? "One-step lab" : "Two-step lab"}</div>
              <h3 className="mt-1 text-[18px] font-semibold text-white">{oneStep ? "Undo the only operation around x." : "Undo the outer operation, then the inner one."}</h3>
            </div>
            <span className="font-mono text-[10px] text-stone-600">x = {probe}</span>
          </div>
          <div className={`mt-4 rounded-[22px] border p-5 ${balanced ? "border-emerald-300/[0.16]" : "border-rose-300/[0.16]"} bg-black/[0.14]`}>
            <div className="grid grid-cols-[1fr_56px_1fr] items-center gap-3 text-center">
              <BalanceExpression expression={state.left} value={leftValue} accent={accent} />
              <div className={`font-mono text-[42px] ${balanced ? "text-emerald-300" : "text-rose-300"}`}>=</div>
              <BalanceExpression expression={state.right} value={rightValue} accent={accent} />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {probes.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setProbe(value)}
                  className="rounded-xl border px-4 py-2 font-mono text-[11px]"
                  style={{
                    color: probe === value ? `rgb(${accent})` : "rgb(120 113 108)",
                    borderColor: probe === value ? `rgba(${accent},0.30)` : "rgba(255,255,255,0.06)",
                    background: probe === value ? `rgba(${accent},0.06)` : "transparent",
                  }}
                >
                  x = {value}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          {states.map((item, index) => (
            <button
              key={item.op}
              type="button"
              onClick={() => setStep(index)}
              className="rounded-[16px] border p-3 text-left"
              style={{
                borderColor: step === index ? `rgba(${accent},0.26)` : "rgba(255,255,255,0.05)",
                background: step === index ? `rgba(${accent},0.05)` : "rgba(0,0,0,0.10)",
              }}
            >
              <span className="font-mono text-[9px] text-stone-600">0{index + 1}</span>
              <strong className="ml-2 text-[11px] text-stone-300">{item.op}</strong>
              <div className="mt-1.5 font-mono text-[13px]" style={{ color: `rgb(${accent})` }}>{item.left} = {item.right}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 border-t border-white/[0.06] pt-5">
        <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-fuchsia-300/70">Equivalent or not?</div>
        <p className="mt-1 text-[11px] text-stone-500">Starting from {oneStep ? "x + 6 = 14" : "2x + 6 = 14"}, does this new equation keep the same solution?</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {challenges.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setChoice(item.label)}
              className={`rounded-[16px] border px-4 py-4 font-mono text-[14px] ${choice === item.label ? item.valid ? "border-emerald-300/[0.28] bg-emerald-400/[0.05] text-emerald-200" : "border-rose-300/[0.24] bg-rose-400/[0.04] text-rose-200" : "border-white/[0.06] bg-black/[0.10] text-stone-400"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        {selected ? <p className={`mt-2 text-[10px] ${selected.valid ? "text-emerald-300" : "text-rose-300"}`}>{selected.valid ? `Equivalent: x = ${solution} still satisfies this equation.` : "Not equivalent: this changes the solution set."}</p> : null}
      </div>
    </section>
  );
}

function BalanceExpression({ expression, value, accent }: { expression: string; value: number; accent: string }) {
  return <div className="rounded-[16px] border border-white/[0.06] bg-white/[0.012] p-4"><div className="font-mono text-[clamp(1.3rem,3vw,2rem)] text-white">{expression}</div><div className="mt-2 text-[9px] uppercase tracking-[0.1em] text-stone-600">evaluates to</div><div className="mt-1 font-mono text-[14px]" style={{ color: `rgb(${accent})` }}>{value}</div></div>;
}

function PropertiesLesson() {
  const [propertyId, setPropertyId] = useState<PropertyId>("distributive");
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [answer, setAnswer] = useState<PropertyId | null>(null);
  const active = PROPERTIES[propertyId];
  const challenges = [
    { before: "4(x + 3)", after: "4x + 12", answer: "distributive" as PropertyId },
    { before: "7 + 0", after: "7", answer: "identity" as PropertyId },
    { before: "a + b", after: "b + a", answer: "commutative" as PropertyId },
  ];
  const challenge = challenges[challengeIndex];

  return (
    <section className="rounded-[28px] border border-indigo-200/[0.12] bg-[#080819]/48 p-5 backdrop-blur-2xl">
      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="grid content-start gap-2">
          {(Object.keys(PROPERTIES) as PropertyId[]).map((id) => <ChoiceButton key={id} active={id === propertyId} label={PROPERTIES[id].label} rgb={PROPERTIES[id].color} onClick={() => setPropertyId(id)} />)}
        </div>
        <div className="rounded-[22px] border border-white/[0.06] bg-black/[0.14] p-5">
          <div className="flex items-center gap-3"><RefreshCcw size={18} style={{ color: `rgb(${active.color})` }} /><strong className="text-[18px] text-white">{active.label}</strong></div>
          <div className="mt-5 grid grid-cols-[1fr_60px_1fr] items-center gap-2 text-center font-mono text-[clamp(1.2rem,3vw,2rem)]"><div className="rounded-[16px] border border-white/[0.05] p-4 text-stone-300">{active.before}</div><span className="text-indigo-300">↔</span><div className="rounded-[16px] border p-4" style={{ borderColor: `rgba(${active.color},0.18)`, color: `rgb(${active.color})` }}>{active.after}</div></div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2"><MiniTextCard label="Allows" text={active.meaning} rgb={active.color} /><MiniTextCard label="Limit" text={active.limit} rgb="251, 113, 133" /></div>
        </div>
      </div>

      <div className="mt-5 border-t border-white/[0.06] pt-5">
        <div className="flex items-end justify-between gap-4"><div><div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-violet-300/70">Name the reason</div><p className="mt-1 text-[11px] text-stone-500">Which property justifies this rewrite?</p></div><button type="button" onClick={() => { setChallengeIndex((challengeIndex + 1) % challenges.length); setAnswer(null); }} className="rounded-xl border border-white/[0.06] px-3 py-2 text-[10px] text-stone-500">Next rewrite</button></div>
        <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"><div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] px-4 py-5 text-center font-mono text-[18px] text-stone-200">{challenge.before} <span className="mx-3 text-stone-700">→</span> {challenge.after}</div><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{(Object.keys(PROPERTIES) as PropertyId[]).map((id) => <button key={id} type="button" onClick={() => setAnswer(id)} className={`rounded-xl border px-2 py-3 text-[10px] font-semibold ${answer === id ? id === challenge.answer ? "border-emerald-300/[0.28] bg-emerald-400/[0.05] text-emerald-200" : "border-rose-300/[0.24] bg-rose-400/[0.04] text-rose-200" : "border-white/[0.06] text-stone-600"}`}>{PROPERTIES[id].label}</button>)}</div></div>
      </div>
    </section>
  );
}

function NumberSystemsLesson() {
  const [activeSet, setActiveSet] = useState<NumberSetId>("real");
  const [valueIndex, setValueIndex] = useState(0);
  const value = NUMBER_VALUES[valueIndex];

  return (
    <section className="rounded-[28px] border border-amber-200/[0.12] bg-[#151005]/48 p-5 backdrop-blur-2xl">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_330px]">
        <NestedSets active={activeSet} onSelect={setActiveSet} />
        <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.14] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-300/70">Selected set</div>
          <h3 className="mt-2 text-[22px] font-semibold text-white">{NUMBER_SET_LABELS[activeSet]}</h3>
          <p className="mt-3 text-[12px] leading-5 text-stone-400">{setDescription(activeSet)}</p>
          <div className="mt-4 rounded-xl border border-white/[0.05] bg-white/[0.012] px-3 py-3 font-mono text-[12px] text-amber-200">{setExample(activeSet)}</div>
        </div>
      </div>

      <div className="mt-5 border-t border-white/[0.06] pt-5">
        <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-lime-300/70">Classify a value</div>
        <p className="mt-1 text-[11px] text-stone-500">Choose a value, then identify its smallest useful set in this hierarchy.</p>
        <div className="mt-3 flex flex-wrap gap-2">{NUMBER_VALUES.map((item, index) => <button key={item.display} type="button" onClick={() => setValueIndex(index)} className={`rounded-xl border px-4 py-2.5 font-mono text-[12px] ${valueIndex === index ? "border-amber-300/[0.28] bg-amber-400/[0.06] text-amber-100" : "border-white/[0.06] text-stone-600"}`}>{item.display}</button>)}</div>
        <div className="mt-3 rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="flex items-center gap-2"><CircleDot size={14} className="text-amber-300" /><strong className="text-[13px] text-stone-200">{value.display} → {NUMBER_SET_LABELS[value.set]}</strong></div><p className="mt-2 text-[11px] leading-5 text-stone-500">{value.note}</p></div>
      </div>
    </section>
  );
}

function NestedSets({ active, onSelect }: { active: NumberSetId; onSelect: (id: NumberSetId) => void }) {
  const sets: { id: NumberSetId; label: string; color: string; className: string }[] = [
    { id: "real", label: "ℝ Real", color: "52, 211, 153", className: "inset-0" },
    { id: "rational", label: "ℚ Rational", color: "96, 165, 250", className: "left-[7%] top-[15%] right-[29%] bottom-[12%]" },
    { id: "integer", label: "ℤ Integer", color: "34, 211, 238", className: "left-[15%] top-[31%] right-[45%] bottom-[24%]" },
    { id: "natural", label: "ℕ Natural", color: "163, 230, 53", className: "left-[23%] top-[48%] right-[57%] bottom-[35%]" },
    { id: "irrational", label: "Irrational", color: "192, 132, 252", className: "left-[73%] top-[20%] right-[5%] bottom-[15%]" },
  ];
  return <div className="relative min-h-[390px] overflow-hidden rounded-[22px] border border-white/[0.06] bg-black/[0.12]">{sets.map((set) => <button key={set.id} type="button" onClick={() => onSelect(set.id)} className={`absolute rounded-[28px] border text-left transition-colors ${set.className}`} style={{ borderColor: active === set.id ? `rgba(${set.color},0.50)` : `rgba(${set.color},0.18)`, background: active === set.id ? `rgba(${set.color},0.08)` : `rgba(${set.color},0.025)` }}><span className="absolute left-4 top-3 font-mono text-[12px] font-semibold" style={{ color: `rgb(${set.color})` }}>{set.label}</span></button>)}</div>;
}

function setDescription(id: NumberSetId) {
  if (id === "natural") return "Counting numbers. Some conventions include 0, so context should say which convention is being used.";
  if (id === "integer") return "Whole-number steps in both directions, including zero and negatives.";
  if (id === "rational") return "Numbers expressible as p/q with integers p and q and q ≠ 0. Their decimals terminate or repeat.";
  if (id === "irrational") return "Real numbers that cannot be written as ratios of integers; their decimals do not terminate or repeat periodically.";
  return "Rational and irrational values together form every point on the ordinary continuous number line.";
}

function setExample(id: NumberSetId) {
  if (id === "natural") return "1, 2, 3, 4, …";
  if (id === "integer") return "…, −2, −1, 0, 1, 2, …";
  if (id === "rational") return "1/2 · −7/3 · 0.125 · 0.333…";
  if (id === "irrational") return "π · √2 · e";
  return "ℚ ∪ irrational values";
}

function LessonNavigation({ previous, next, unitHref, currentStep, accent }: { previous?: FundamentalsLessonNavItem; next?: FundamentalsLessonNavItem; unitHref: string; currentStep: string; accent: string }) {
  return (
    <nav className="mt-4 pb-8" aria-label="Algebra Fundamentals lesson navigation">
      <div className="mb-2 flex justify-end"><span className="font-mono text-[10px] text-stone-700">{currentStep} / {LESSON_TOTAL}</span></div>
      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? <NavCard item={previous} direction="previous" accent={accent} /> : <div className="hidden sm:block" aria-hidden="true" />}
        {next ? <NavCard item={next} direction="next" accent={accent} /> : <Link href={unitHref} className="group flex min-h-[76px] items-center rounded-[18px] border px-4" style={{ borderColor: `rgba(${accent},0.16)`, background: `rgba(${accent},0.035)` }}><span className="min-w-0 flex-1 text-right"><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-stone-600">Unit complete</span><strong className="mt-1 block text-[14px] text-stone-200">Return to Algebra Fundamentals</strong></span><Check size={15} className="ml-3" style={{ color: `rgb(${accent})` }} /></Link>}
      </div>
    </nav>
  );
}

function NavCard({ item, direction, accent }: { item: FundamentalsLessonNavItem; direction: "previous" | "next"; accent: string }) {
  const previous = direction === "previous";
  return <Link href={item.href} className="group flex min-h-[76px] items-center gap-3 rounded-[18px] border px-4 py-3" style={{ borderColor: `rgba(${accent},0.14)`, background: `rgba(${accent},0.025)` }}>{previous ? <ArrowLeft size={15} style={{ color: `rgb(${accent})` }} /> : null}<span className={`min-w-0 flex-1 ${previous ? "" : "text-right"}`}><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-stone-600">{previous ? "Previous lesson" : "Next lesson"}</span><strong className="mt-1 block text-[14px] text-stone-200">{item.label}</strong></span>{!previous ? <ArrowRight size={15} style={{ color: `rgb(${accent})` }} /> : null}</Link>;
}

function ChoiceButton({ active, label, rgb, onClick }: { active: boolean; label: string; rgb: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-xl border px-3 py-3 text-[10px] font-semibold transition-colors" style={{ color: active ? `rgb(${rgb})` : "rgb(120 113 108)", borderColor: active ? `rgba(${rgb},0.30)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${rgb},0.065)` : "rgba(0,0,0,0.10)" }}>{label}</button>;
}

function MiniTextCard({ label, text, rgb }: { label: string; text: string; rgb: string }) {
  return <div className="rounded-[15px] border border-white/[0.05] bg-black/[0.10] p-3"><div className="text-[8px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.75)` }}>{label}</div><p className="mt-1.5 text-[10px] leading-4 text-stone-500">{text}</p></div>;
}

function assessmentColor(lesson: FundamentalsLessonKey): "emerald" | "cyan" | "indigo" | "amber" {
  if (lesson === "expressions-variables") return "emerald";
  if (lesson === "one-step-equations" || lesson === "two-step-equations") return "cyan";
  if (lesson === "algebraic-properties") return "indigo";
  return "amber";
}
