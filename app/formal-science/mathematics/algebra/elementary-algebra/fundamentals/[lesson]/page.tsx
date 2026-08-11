"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  Braces,
  Check,
  CornerUpLeft,
  Equal,
  Hash,
  RefreshCcw,
  Scale,
  Variable,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import FundamentalsBackground from "../_components/FundamentalsBackground";

type LessonSlug =
  | "expressions-variables"
  | "equality-equations"
  | "algebraic-properties"
  | "number-systems";

type LessonConfig = {
  slug: LessonSlug;
  step: string;
  title: string;
  eyebrow: string;
  icon: LucideIcon;
  rgb: string;
  subtitle: string;
  coreTitle: string;
  explanation: readonly string[];
  why: string;
  trap: string;
  bridge: string;
};

const BASE = "/formal-science/mathematics/algebra/elementary-algebra/fundamentals";

const LESSONS: readonly LessonConfig[] = [
  {
    slug: "expressions-variables",
    step: "01",
    title: "Expressions & Variables",
    eyebrow: "Symbol grammar",
    icon: Braces,
    rgb: "52, 211, 153",
    subtitle: "Read algebraic expressions structurally before trying to manipulate them. Terms, factors, coefficients, variables, powers, constants, and operators each play different roles.",
    coreTitle: "An expression is a structured object, not a string of characters.",
    explanation: [
      "The expression 3x² − 2x + 5 has three top-level terms. Inside those terms are smaller multiplicative pieces: numerical coefficients, variable factors, and powers.",
      "A variable is a symbol whose value is not fixed by the notation alone. It may represent an unknown to solve for, a changing input, or a generalized number that lets one statement describe many cases at once.",
    ],
    why: "Later techniques such as factoring, simplifying rational expressions, and function notation all depend on recognizing which symbols belong together as units.",
    trap: "Do not treat every visible sign as the same kind of object. A minus sign may separate terms or indicate a negative coefficient depending on the structure around it.",
    bridge: "An expression can be evaluated, simplified, or rewritten. It does not become an equation until it is related to another expression by equality.",
  },
  {
    slug: "equality-equations",
    step: "02",
    title: "Equality & Equations",
    eyebrow: "Preserved relationships",
    icon: Scale,
    rgb: "34, 211, 238",
    subtitle: "Treat the equal sign as a claim that two expressions represent the same value, then learn why solving works only when that relationship is preserved.",
    coreTitle: "The equal sign means “same value,” not “the answer comes next.”",
    explanation: [
      "An equation joins two expressions and claims they are equal under some values of their variables. Those values form the equation’s solution set.",
      "Solving is a sequence of equivalent transformations. We change the appearance of the equation while preserving exactly which values make the statement true.",
    ],
    why: "This invariant is the foundation of every later solving method, from one-variable equations to systems, matrices, and symbolic proofs.",
    trap: "Changing only one side usually creates a different equation. The new statement may look simpler, but it no longer has the same solution set.",
    bridge: "To know which transformations are legal, algebra needs a rulebook. Those permissions are the algebraic properties in the next lesson.",
  },
  {
    slug: "algebraic-properties",
    step: "03",
    title: "Algebraic Properties",
    eyebrow: "Rewrite permissions",
    icon: RefreshCcw,
    rgb: "129, 140, 248",
    subtitle: "Use algebraic properties as precise licenses for reordering, regrouping, distributing, preserving identity, and undoing operations.",
    coreTitle: "Properties tell us which changes preserve value for every allowed input.",
    explanation: [
      "A property is not a trick attached to one problem. It is a general statement about an operation or structure, such as a + b = b + a for addition.",
      "When we simplify or solve, we are composing these general permissions. Good symbolic work is therefore less about memorizing moves and more about knowing why each move is valid.",
    ],
    why: "The same rewrite laws reappear in factoring, polynomial algebra, matrix manipulation, and eventually abstract algebra, where the properties themselves become the objects of study.",
    trap: "A property has a scope. Commutativity works for addition and multiplication, not subtraction and division; multiplicative inverses require nonzero values.",
    bridge: "Properties depend on the number system underneath them. An operation that is always possible in one set may force us into a larger set in another.",
  },
  {
    slug: "number-systems",
    step: "04",
    title: "Number Systems",
    eyebrow: "Allowed values",
    icon: Hash,
    rgb: "251, 191, 36",
    subtitle: "Locate natural, integer, rational, irrational, real, and complex values inside one expanding hierarchy and see why algebra sometimes needs a larger universe.",
    coreTitle: "An algebra problem is always happening inside some set of allowed values.",
    explanation: [
      "The familiar number systems are nested extensions. Integers add negative values to counting numbers; rationals add fractions; reals fill the continuous number line; complex numbers add an imaginary direction.",
      "Extending a number system lets previously impossible equations gain solutions. For example, x² = 2 leaves the rationals but stays real, while x² = −1 leaves the reals and requires complex numbers.",
    ],
    why: "Domains, restrictions, roots, rational expressions, and complex solutions all depend on knowing what kinds of values are available and which operations keep you inside the current set.",
    trap: "A decimal is not automatically irrational. Terminating and repeating decimals are rational because they can be written as ratios of integers.",
    bridge: "With symbolic grammar, equality, rewrite rules, and number systems in place, Integrated Algebra can now focus on relationships such as lines, inequalities, functions, and polynomials.",
  },
] as const;

const LESSON_BY_SLUG = new Map(LESSONS.map((lesson) => [lesson.slug, lesson]));

type ExpressionPartId =
  | "term"
  | "coefficient"
  | "variable"
  | "exponent"
  | "constant"
  | "operator";

type PropertyId =
  | "commutative"
  | "associative"
  | "distributive"
  | "identity"
  | "inverse";

type PropertyRule = {
  id: PropertyId;
  label: string;
  rgb: string;
  equation: string;
  action: string;
  caution: string;
};

type EqualityState = {
  left: string;
  right: string;
  leftValue: string;
  rightValue: string;
  operation: string;
  note: string;
};

type NumberSetId = "natural" | "integers" | "rationals" | "irrational" | "real" | "complex";

type NumberSet = {
  id: NumberSetId;
  symbol: string;
  label: string;
  rgb: string;
  example: string;
  definition: string;
  operationNote: string;
  boundary: string;
};

const EXPRESSION_PARTS: Record<
  ExpressionPartId,
  { label: string; rgb: string; definition: string; example: string }
> = {
  term: {
    label: "Term",
    rgb: "52, 211, 153",
    definition: "A top-level piece separated from neighboring pieces by addition or subtraction.",
    example: "3x² · −2x · 5",
  },
  coefficient: {
    label: "Coefficient",
    rgb: "34, 211, 238",
    definition: "The numerical factor multiplying a variable part.",
    example: "3 in 3x² · −2 in −2x",
  },
  variable: {
    label: "Variable",
    rgb: "96, 165, 250",
    definition: "A symbol standing for an unknown, changing, or generalized value.",
    example: "x",
  },
  exponent: {
    label: "Exponent",
    rgb: "192, 132, 252",
    definition: "A power telling how many factors of the base are multiplied together.",
    example: "2 in x²",
  },
  constant: {
    label: "Constant",
    rgb: "251, 191, 36",
    definition: "A term with no variable factor, so its value does not depend on x.",
    example: "5",
  },
  operator: {
    label: "Operator",
    rgb: "251, 113, 133",
    definition: "A symbol that tells algebra how values or expressions are combined.",
    example: "+ · − · × · ÷",
  },
};

const PROPERTIES: readonly PropertyRule[] = [
  {
    id: "commutative",
    label: "Commutative",
    rgb: "34, 211, 238",
    equation: "a + b = b + a",
    action: "Reorder addends or factors without changing the result.",
    caution: "Subtraction and division are not commutative.",
  },
  {
    id: "associative",
    label: "Associative",
    rgb: "129, 140, 248",
    equation: "(a + b) + c = a + (b + c)",
    action: "Regroup repeated addition or repeated multiplication.",
    caution: "Regrouping cannot freely cross different operations.",
  },
  {
    id: "distributive",
    label: "Distributive",
    rgb: "52, 211, 153",
    equation: "a(b + c) = ab + ac",
    action: "Move between a grouped product and an expanded sum.",
    caution: "Every term inside the grouping receives the outside factor.",
  },
  {
    id: "identity",
    label: "Identity",
    rgb: "251, 191, 36",
    equation: "a + 0 = a    ·    a × 1 = a",
    action: "Use a neutral element without changing the value.",
    caution: "Zero is additive identity; one is multiplicative identity.",
  },
  {
    id: "inverse",
    label: "Inverse",
    rgb: "244, 114, 182",
    equation: "a + (−a) = 0    ·    a(1/a) = 1",
    action: "Pair a value with an operation that cancels it.",
    caution: "The multiplicative inverse exists only when a ≠ 0.",
  },
];

const EQUALITY_STATES: readonly EqualityState[] = [
  {
    left: "2x + 6",
    right: "14",
    leftValue: "14",
    rightValue: "14",
    operation: "Start",
    note: "At x = 4, both sides represent the same value.",
  },
  {
    left: "2x",
    right: "8",
    leftValue: "8",
    rightValue: "8",
    operation: "Subtract 6 from both sides",
    note: "The expressions changed, but the solution x = 4 survived.",
  },
  {
    left: "x",
    right: "4",
    leftValue: "4",
    rightValue: "4",
    operation: "Divide both sides by 2",
    note: "The equivalent equation now reveals the solution directly.",
  },
];

const BROKEN_EQUALITY: EqualityState = {
  left: "2x + 6",
  right: "8",
  leftValue: "14",
  rightValue: "8",
  operation: "Subtract 6 from one side only",
  note: "The balance is broken: x = 4 no longer makes both sides equal.",
};

const NUMBER_SETS: readonly NumberSet[] = [
  {
    id: "natural",
    symbol: "ℕ",
    label: "Natural numbers",
    rgb: "163, 230, 53",
    example: "1, 2, 3, 4, …",
    definition: "Counting numbers. Some conventions include 0; the surrounding context should say which convention is being used.",
    operationNote: "Addition and multiplication stay natural; subtraction and division may leave the set.",
    boundary: "3 − 5 is not natural.",
  },
  {
    id: "integers",
    symbol: "ℤ",
    label: "Integers",
    rgb: "34, 211, 238",
    example: "…, −2, −1, 0, 1, 2, …",
    definition: "Whole-number steps in both directions, including zero and negative values.",
    operationNote: "Addition, subtraction, and multiplication stay integer; division may not.",
    boundary: "1 ÷ 2 is not an integer.",
  },
  {
    id: "rationals",
    symbol: "ℚ",
    label: "Rational numbers",
    rgb: "96, 165, 250",
    example: "1/2 · −7/3 · 0.125 · 0.333…",
    definition: "Numbers expressible as p/q for integers p and q with q ≠ 0. Their decimal forms terminate or repeat.",
    operationNote: "The four arithmetic operations stay rational when division by zero is excluded.",
    boundary: "√2 cannot be written as a ratio of integers.",
  },
  {
    id: "irrational",
    symbol: "ℝ∖ℚ",
    label: "Irrational reals",
    rgb: "192, 132, 252",
    example: "π · √2 · e",
    definition: "Real numbers that are not rational. Their decimal expansions neither terminate nor repeat periodically.",
    operationNote: "Irrational numbers are real, but ordinary operations on irrationals do not necessarily stay irrational.",
    boundary: "√2 + (−√2) = 0, which is rational.",
  },
  {
    id: "real",
    symbol: "ℝ",
    label: "Real numbers",
    rgb: "52, 211, 153",
    example: "every point on the number line",
    definition: "Rational and irrational values together form the continuous real number line.",
    operationNote: "Ordinary arithmetic stays real when defined, but square roots of negative values do not.",
    boundary: "x² = −1 has no real solution.",
  },
  {
    id: "complex",
    symbol: "ℂ",
    label: "Complex numbers",
    rgb: "251, 191, 36",
    example: "a + bi · 3 + 2i · −i",
    definition: "Numbers with real and imaginary components. The real numbers sit inside this larger two-dimensional system.",
    operationNote: "Complex arithmetic includes roots of negative real numbers and supports the later study of polynomial roots.",
    boundary: "This is a preview; Complex Numbers gets its own Integrated Algebra lesson later.",
  },
];

export default function FundamentalsAtomicLessonPage() {
  const params = useParams<{ lesson: string }>();
  const slug = params.lesson as LessonSlug;
  const lesson = LESSON_BY_SLUG.get(slug);

  const [activePartId, setActivePartId] = useState<ExpressionPartId>("term");
  const [activePropertyId, setActivePropertyId] = useState<PropertyId>("distributive");
  const [equalityStep, setEqualityStep] = useState(0);
  const [brokenEquality, setBrokenEquality] = useState(false);
  const [activeSetId, setActiveSetId] = useState<NumberSetId>("real");

  if (!lesson) {
    return (
      <main className="min-h-screen bg-[#031912] px-6 py-16 text-stone-100">
        <div className="mx-auto max-w-2xl rounded-[24px] border border-emerald-200/[0.12] bg-black/30 p-8">
          <h1 className="text-2xl font-semibold">Lesson not found</h1>
          <p className="mt-3 text-stone-400">This route is not part of the Algebra Fundamentals unit.</p>
          <Link href={BASE} className="mt-5 inline-flex items-center gap-2 text-emerald-300">
            <CornerUpLeft size={15} /> Return to Algebra Fundamentals
          </Link>
        </div>
      </main>
    );
  }

  const activeProperty =
    PROPERTIES.find((property) => property.id === activePropertyId) ?? PROPERTIES[0];
  const equality = brokenEquality ? BROKEN_EQUALITY : EQUALITY_STATES[equalityStep];
  const activeSet = NUMBER_SETS.find((set) => set.id === activeSetId) ?? NUMBER_SETS[4];
  const lessonIndex = LESSONS.findIndex((item) => item.slug === lesson.slug);
  const previous = lessonIndex > 0 ? LESSONS[lessonIndex - 1] : undefined;
  const next = lessonIndex < LESSONS.length - 1 ? LESSONS[lessonIndex + 1] : undefined;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#031912] text-stone-100 selection:bg-emerald-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-38">
        <FundamentalsBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_16%,rgba(52,211,153,0.09),transparent_27%),radial-gradient(circle_at_14%_82%,rgba(34,211,238,0.05),transparent_26%),linear-gradient(to_bottom,rgba(3,25,18,0.30),rgba(2,12,9,0.86))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-18 [background-image:linear-gradient(rgba(52,211,153,0.020)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.020)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Formal Sciences", href: "/formal-science" },
            { label: "Mathematics", href: "/formal-science/mathematics" },
            { label: "Algebra", href: "/formal-science/mathematics/algebra" },
            { label: "Integrated Algebra", href: "/formal-science/mathematics/algebra/elementary-algebra" },
            { label: "Fundamentals", href: BASE },
            { label: lesson.title },
          ]}
          eyebrow={`Lesson ${lesson.step} · ${lesson.eyebrow}`}
          icon={lesson.icon}
          title={<span>{lesson.title}</span>}
          subtitle={lesson.subtitle}
          accentRgb={lesson.rgb}
          titleClassName="font-mono text-[clamp(2.6rem,4.7vw,4.9rem)] font-semibold uppercase leading-[0.86] tracking-[-0.055em] text-[#f5fff9]"
          iconClassName="rounded-[16px]"
          headerClassName="border-emerald-300/[0.12]"
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-white/[0.055] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: `rgba(${lesson.rgb},0.72)` }}>Core idea</div>
            <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.035em] text-white">{lesson.coreTitle}</h2>
            <div className="mt-4 grid gap-3 text-[14px] leading-6 text-stone-400">
              {lesson.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            <ConceptNote label="Why it matters" text={lesson.why} rgb={lesson.rgb} />
            <ConceptNote label="Common trap" text={lesson.trap} rgb="251, 113, 133" />
          </div>
        </section>

        <div className="mt-3">
          {lesson.slug === "expressions-variables" ? (
            <ExpressionAnatomy activeId={activePartId} onSelect={setActivePartId} />
          ) : null}
          {lesson.slug === "equality-equations" ? (
            <EqualityLab
              state={equality}
              step={equalityStep}
              balanced={!brokenEquality}
              onStep={setEqualityStep}
              onBreak={() => setBrokenEquality(true)}
              onReset={() => {
                setEqualityStep(0);
                setBrokenEquality(false);
              }}
            />
          ) : null}
          {lesson.slug === "algebraic-properties" ? (
            <PropertyRulebook
              activeId={activePropertyId}
              activeProperty={activeProperty}
              onSelect={setActivePropertyId}
            />
          ) : null}
          {lesson.slug === "number-systems" ? (
            <NumberSystemExplorer activeId={activeSetId} activeSet={activeSet} onSelect={setActiveSetId} />
          ) : null}
        </div>

        <section className="mt-3 rounded-[22px] border border-white/[0.05] bg-black/[0.20] p-4 backdrop-blur-xl">
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-600">Connect the idea</div>
          <p className="mt-2 max-w-4xl text-[13px] leading-6 text-stone-400">{lesson.bridge}</p>
        </section>

        <LessonNavigation current={lesson} previous={previous} next={next} />
      </div>
    </main>
  );
}

function ConceptNote({ label, text, rgb }: { label: string; text: string; rgb: string }) {
  return (
    <div className="rounded-[16px] border p-3.5" style={{ borderColor: `rgba(${rgb},0.14)`, background: `rgba(${rgb},0.025)` }}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: `rgba(${rgb},0.72)` }}>{label}</div>
      <p className="mt-2 text-[12px] leading-5 text-stone-400">{text}</p>
    </div>
  );
}

function ExpressionAnatomy({ activeId, onSelect }: { activeId: ExpressionPartId; onSelect: (id: ExpressionPartId) => void }) {
  const activePart = EXPRESSION_PARTS[activeId];
  return (
    <section className="overflow-hidden rounded-[24px] border border-emerald-200/[0.12] bg-black/[0.24] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_24px_70px_rgba(0,0,0,0.20)] backdrop-blur-xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/70">Expression anatomy</div>
          <p className="mt-1 text-[13px] text-stone-500">Select a structural role inside one expression.</p>
        </div>
        <Braces size={20} className="text-emerald-300/30" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex min-h-[300px] flex-col justify-between rounded-[20px] border border-emerald-100/[0.06] bg-[#04140e]/70 p-5">
          <div className="flex min-h-[160px] flex-wrap items-center justify-center gap-2 font-mono text-[clamp(2.4rem,5vw,5rem)] font-semibold tracking-[-0.06em] text-white">
            <ExpressionTerm active={activeId === "term"} onClick={() => onSelect("term")}>
              <ExpressionToken active={activeId === "coefficient"} rgb="34, 211, 238" onClick={(event) => { event.stopPropagation(); onSelect("coefficient"); }}>3</ExpressionToken>
              <ExpressionToken active={activeId === "variable"} rgb="96, 165, 250" onClick={(event) => { event.stopPropagation(); onSelect("variable"); }}>x</ExpressionToken>
              <ExpressionToken active={activeId === "exponent"} rgb="192, 132, 252" onClick={(event) => { event.stopPropagation(); onSelect("exponent"); }} superscript>2</ExpressionToken>
            </ExpressionTerm>
            <ExpressionToken active={activeId === "operator"} rgb="251, 113, 133" onClick={() => onSelect("operator")}>−</ExpressionToken>
            <ExpressionTerm active={activeId === "term"} onClick={() => onSelect("term")}>
              <ExpressionToken active={activeId === "coefficient"} rgb="34, 211, 238" onClick={(event) => { event.stopPropagation(); onSelect("coefficient"); }}>2</ExpressionToken>
              <ExpressionToken active={activeId === "variable"} rgb="96, 165, 250" onClick={(event) => { event.stopPropagation(); onSelect("variable"); }}>x</ExpressionToken>
            </ExpressionTerm>
            <ExpressionToken active={activeId === "operator"} rgb="251, 113, 133" onClick={() => onSelect("operator")}>+</ExpressionToken>
            <ExpressionTerm active={activeId === "term"} onClick={() => onSelect("term")}>
              <ExpressionToken active={activeId === "constant"} rgb="251, 191, 36" onClick={(event) => { event.stopPropagation(); onSelect("constant"); }}>5</ExpressionToken>
            </ExpressionTerm>
          </div>

          <div className="grid grid-cols-4 gap-2 border-t border-white/[0.05] pt-4 text-center">
            {[["1", "grouping"], ["2", "powers"], ["3", "multiply / divide"], ["4", "add / subtract"]].map(([rank, label]) => (
              <div key={rank} className="rounded-xl bg-white/[0.015] px-2 py-2.5">
                <div className="text-[10px] font-semibold text-emerald-300/60">{rank}</div>
                <div className="mt-1 text-[11px] text-stone-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-rows-[auto_minmax(0,1fr)] gap-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
            {(Object.keys(EXPRESSION_PARTS) as ExpressionPartId[]).map((id) => {
              const part = EXPRESSION_PARTS[id];
              const active = id === activeId;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelect(id)}
                  className="h-11 rounded-xl border px-2 text-[11px] font-semibold transition-colors"
                  style={{
                    color: active ? `rgb(${part.rgb})` : "rgb(120 113 108)",
                    borderColor: active ? `rgba(${part.rgb},0.28)` : "rgba(255,255,255,0.045)",
                    background: active ? `rgba(${part.rgb},0.06)` : "rgba(0,0,0,0.12)",
                  }}
                >
                  {part.label}
                </button>
              );
            })}
          </div>

          <div className="rounded-[18px] border border-white/[0.05] bg-white/[0.014] p-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: `rgb(${activePart.rgb})` }} />
              <h3 className="text-[20px] font-semibold text-white">{activePart.label}</h3>
            </div>
            <p className="mt-3 text-[13px] leading-6 text-stone-400">{activePart.definition}</p>
            <div className="mt-4 rounded-xl border border-white/[0.045] bg-black/[0.18] px-3 py-3 font-mono text-[13px]" style={{ color: `rgba(${activePart.rgb},0.82)` }}>
              {activePart.example}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpressionTerm({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };
  return (
    <span role="button" tabIndex={0} onClick={onClick} onKeyDown={handleKeyDown} className={`flex cursor-pointer items-start rounded-xl border px-2 py-1 transition-colors ${active ? "border-emerald-300/[0.30] bg-emerald-400/[0.06]" : "border-transparent"}`}>
      {children}
    </span>
  );
}

function ExpressionToken({ active, rgb, onClick, children, superscript = false }: { active: boolean; rgb: string; onClick: (event: MouseEvent<HTMLSpanElement>) => void; children: ReactNode; superscript?: boolean }) {
  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  };
  return (
    <span role="button" tabIndex={0} onClick={onClick} onKeyDown={handleKeyDown} className={`${superscript ? "mt-1 text-[0.52em]" : ""} cursor-pointer rounded-md px-0.5 transition-colors`} style={{ color: active ? `rgb(${rgb})` : undefined, background: active ? `rgba(${rgb},0.08)` : undefined }}>
      {children}
    </span>
  );
}

function EqualityLab({ state, step, balanced, onStep, onBreak, onReset }: { state: EqualityState; step: number; balanced: boolean; onStep: (step: number) => void; onBreak: () => void; onReset: () => void }) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-cyan-200/[0.11] bg-black/[0.24] p-5 backdrop-blur-xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/70">Equality lab</div>
          <p className="mt-1 text-[13px] text-stone-500">Transform both sides together and watch the solution survive.</p>
        </div>
        <Scale size={20} className="text-cyan-300/30" />
      </div>

      <div className="mx-auto mt-4 max-w-[900px] rounded-[20px] border border-white/[0.05] bg-[#041116]/72 p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] items-center gap-3">
          <BalanceSide expression={state.left} value={state.leftValue} rgb={balanced ? "34, 211, 238" : "251, 113, 133"} />
          <div className={`flex h-14 w-14 items-center justify-center rounded-full border font-mono text-2xl ${balanced ? "border-emerald-300/[0.18] bg-emerald-400/[0.04] text-emerald-300" : "border-rose-300/[0.18] bg-rose-400/[0.04] text-rose-300"}`}>
            {balanced ? "=" : "≠"}
          </div>
          <BalanceSide expression={state.right} value={state.rightValue} rgb={balanced ? "244, 114, 182" : "251, 113, 133"} />
        </div>

        <div className="relative mx-8 mt-6 h-9">
          <div className={`absolute left-1/2 top-0 h-8 w-1 -translate-x-1/2 rounded-full ${balanced ? "bg-emerald-300/45" : "rotate-[10deg] bg-rose-300/45"}`} />
          <div className={`absolute left-0 right-0 top-1 h-px origin-center ${balanced ? "bg-emerald-300/35" : "rotate-[4deg] bg-rose-300/35"}`} />
        </div>

        <div className={`mt-1 rounded-xl border px-4 py-3 ${balanced ? "border-emerald-300/[0.10] bg-emerald-400/[0.025]" : "border-rose-300/[0.12] bg-rose-400/[0.03]"}`}>
          <div className={`text-[11px] font-semibold ${balanced ? "text-emerald-300/75" : "text-rose-300/80"}`}>{state.operation}</div>
          <p className="mt-1 text-[12px] leading-5 text-stone-500">{state.note}</p>
        </div>
      </div>

      <div className="mx-auto mt-3 grid max-w-[900px] grid-cols-2 gap-2 sm:grid-cols-4">
        <LabButton label="− 6 both sides" disabled={!balanced || step !== 0} onClick={() => onStep(1)} />
        <LabButton label="÷ 2 both sides" disabled={!balanced || step !== 1} onClick={() => onStep(2)} />
        <button type="button" onClick={onBreak} disabled={!balanced} className="h-11 rounded-xl border border-rose-300/[0.12] bg-rose-400/[0.025] px-2 text-[11px] font-semibold text-rose-300/65 transition-colors hover:bg-rose-400/[0.05] disabled:cursor-default disabled:opacity-35">change one side</button>
        <button type="button" onClick={onReset} className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.015] px-2 text-[11px] font-semibold text-stone-500 transition-colors hover:text-stone-300"><RefreshCcw size={13} /> Reset</button>
      </div>
    </section>
  );
}

function BalanceSide({ expression, value, rgb }: { expression: string; value: string; rgb: string }) {
  return (
    <div className="min-w-0 rounded-[16px] border p-4 text-center" style={{ borderColor: `rgba(${rgb},0.15)`, background: `rgba(${rgb},0.025)` }}>
      <div className="truncate font-mono text-[28px] font-semibold text-white">{expression}</div>
      <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-600">at x = 4</div>
      <div className="mt-1 font-mono text-[15px]" style={{ color: `rgba(${rgb},0.78)` }}>→ {value}</div>
    </div>
  );
}

function LabButton({ label, disabled, onClick }: { label: string; disabled: boolean; onClick: () => void }) {
  return <button type="button" disabled={disabled} onClick={onClick} className="h-11 rounded-xl border border-cyan-300/[0.10] bg-cyan-400/[0.02] px-2 text-[11px] font-semibold text-cyan-300/65 transition-colors hover:bg-cyan-400/[0.045] disabled:cursor-default disabled:opacity-30">{label}</button>;
}

function PropertyRulebook({ activeId, activeProperty, onSelect }: { activeId: PropertyId; activeProperty: PropertyRule; onSelect: (id: PropertyId) => void }) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-indigo-200/[0.11] bg-black/[0.23] p-5 backdrop-blur-xl">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-300/70">Property rulebook</div>
        <p className="mt-1 text-[13px] text-stone-500">Select a rule, then read both its permission and its boundary.</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {PROPERTIES.map((property) => {
          const active = property.id === activeId;
          return (
            <button key={property.id} type="button" onClick={() => onSelect(property.id)} className="h-12 rounded-xl border px-2 text-[11px] font-semibold transition-colors" style={{ color: active ? `rgb(${property.rgb})` : "rgb(120 113 108)", borderColor: active ? `rgba(${property.rgb},0.28)` : "rgba(255,255,255,0.045)", background: active ? `rgba(${property.rgb},0.055)` : "rgba(0,0,0,0.12)" }}>
              {property.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 rounded-[18px] border border-white/[0.05] bg-white/[0.012] p-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex min-h-[230px] items-center justify-center rounded-[16px] border border-white/[0.045] bg-black/[0.17] p-5 text-center">
          <div>
            <div className="font-mono text-[26px] font-semibold leading-10" style={{ color: `rgb(${activeProperty.rgb})` }}>{activeProperty.equation}</div>
            <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-600">equivalent forms</div>
          </div>
        </div>
        <div className="grid gap-3">
          <RuleNote icon={Check} label="Allows" text={activeProperty.action} rgb={activeProperty.rgb} />
          <RuleNote icon={Braces} label="Boundary" text={activeProperty.caution} rgb="251, 113, 133" />
        </div>
      </div>
    </section>
  );
}

function RuleNote({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return (
    <div className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><Icon size={17} /></span>
      <span><strong className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-500">{label}</strong><span className="mt-1 block text-[13px] leading-5 text-stone-400">{text}</span></span>
    </div>
  );
}

function NumberSystemExplorer({ activeId, activeSet, onSelect }: { activeId: NumberSetId; activeSet: NumberSet; onSelect: (id: NumberSetId) => void }) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-amber-200/[0.11] bg-black/[0.23] p-5 backdrop-blur-xl">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/70">Number-system explorer</div>
        <p className="mt-1 text-[13px] text-stone-500">Move outward through increasingly expressive sets of values.</p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {NUMBER_SETS.map((set) => {
          const active = set.id === activeId;
          return (
            <button key={set.id} type="button" onClick={() => onSelect(set.id)} className="rounded-xl border px-2 py-3 text-center transition-colors" style={{ color: active ? `rgb(${set.rgb})` : "rgb(120 113 108)", borderColor: active ? `rgba(${set.rgb},0.30)` : "rgba(255,255,255,0.045)", background: active ? `rgba(${set.rgb},0.055)` : "rgba(0,0,0,0.12)" }}>
              <div className="font-mono text-[18px] font-semibold">{set.symbol}</div>
              <div className="mt-1 text-[10px] font-semibold">{set.label}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <div className="rounded-[18px] border p-5" style={{ borderColor: `rgba(${activeSet.rgb},0.17)`, background: `rgba(${activeSet.rgb},0.025)` }}>
          <div className="font-mono text-[46px] font-semibold" style={{ color: `rgb(${activeSet.rgb})` }}>{activeSet.symbol}</div>
          <h3 className="mt-2 text-[23px] font-semibold text-white">{activeSet.label}</h3>
          <div className="mt-3 rounded-xl border border-white/[0.045] bg-black/[0.16] px-3 py-3 font-mono text-[13px] text-stone-300">{activeSet.example}</div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-[16px] border border-white/[0.05] bg-white/[0.012] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-600">What belongs here?</div>
            <p className="mt-2 text-[13px] leading-6 text-stone-400">{activeSet.definition}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <ConceptNote label="Operations" text={activeSet.operationNote} rgb={activeSet.rgb} />
            <ConceptNote label="Boundary" text={activeSet.boundary} rgb="251, 113, 133" />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[16px] border border-white/[0.045] bg-black/[0.15] px-4 py-3 text-center font-mono text-[14px] text-stone-500">
        <span className="text-lime-300/70">ℕ</span> ⊂ <span className="text-cyan-300/70">ℤ</span> ⊂ <span className="text-blue-300/70">ℚ</span> ⊂ <span className="text-emerald-300/70">ℝ</span> ⊂ <span className="text-amber-300/70">ℂ</span>
        <span className="mx-3 text-stone-700">·</span>
        <span className="text-violet-300/70">irrationals = ℝ ∖ ℚ</span>
      </div>
    </section>
  );
}

function LessonNavigation({ current, previous, next }: { current: LessonConfig; previous?: LessonConfig; next?: LessonConfig }) {
  return (
    <nav className="mt-4 pb-8" aria-label="Lesson sequence">
      <div className="flex items-center justify-between gap-3 border-t border-white/[0.05] pt-4">
        <Link href={BASE} className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/[0.10] bg-emerald-400/[0.02] px-3 py-2 text-[11px] font-semibold text-emerald-200/65 transition-colors hover:bg-emerald-400/[0.045]">
          <CornerUpLeft size={13} />
          <span><span className="text-stone-600">Unit:</span> Algebra Fundamentals</span>
        </Link>
        <span className="font-mono text-[10px] text-stone-700">{current.step} / 04</span>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {previous ? (
          <Link href={`${BASE}/${previous.slug}`} className="group flex min-h-[78px] items-center gap-3 rounded-[18px] border border-white/[0.055] bg-black/[0.18] px-4 py-3 transition-colors hover:border-white/[0.11] hover:bg-white/[0.018]">
            <ArrowLeft size={16} className="shrink-0 text-stone-500 transition-transform group-hover:-translate-x-0.5" />
            <span className="min-w-0"><span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-600">Previous lesson</span><strong className="mt-1 block truncate text-[15px] text-stone-300">{previous.title}</strong></span>
          </Link>
        ) : <div />}

        {next ? (
          <Link href={`${BASE}/${next.slug}`} className="group flex min-h-[78px] items-center justify-between gap-3 rounded-[18px] border px-4 py-3 transition-colors" style={{ borderColor: `rgba(${next.rgb},0.15)`, background: `rgba(${next.rgb},0.025)` }}>
            <span className="min-w-0"><span className="block text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: `rgba(${next.rgb},0.60)` }}>Next lesson</span><strong className="mt-1 block truncate text-[15px] text-stone-200">{next.title}</strong></span>
            <ArrowRight size={16} className="shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: `rgb(${next.rgb})` }} />
          </Link>
        ) : (
          <Link href="/formal-science/mathematics/algebra/elementary-algebra/linear-equations" className="group flex min-h-[78px] items-center justify-between gap-3 rounded-[18px] border border-blue-300/[0.14] bg-blue-400/[0.025] px-4 py-3 transition-colors hover:bg-blue-400/[0.045]">
            <span className="min-w-0"><span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-blue-300/60">Next Integrated Algebra topic</span><strong className="mt-1 block truncate text-[15px] text-stone-200">Graphing Linear Equations</strong></span>
            <ArrowRight size={16} className="shrink-0 text-blue-300 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </nav>
  );
}
