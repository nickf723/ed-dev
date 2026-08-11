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
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";

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
  base: string;
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
    base: "#031912",
    subtitle:
      "Read algebraic expressions structurally before trying to manipulate them. Terms, coefficients, variables, powers, and constants each play different roles.",
    coreTitle: "An expression is a structured object, not a string of characters.",
    explanation: [
      "The expression 3x² − 2x + 5 has three top-level terms: 3x², −2x, and +5. The sign immediately before a term belongs with that term.",
      "Inside each term are smaller multiplicative pieces. A coefficient scales a variable part, an exponent changes its power, and a constant term has no variable factor at all.",
    ],
    why:
      "Later techniques such as combining like terms, factoring, rational expressions, and function notation all depend on seeing which symbols belong together as units.",
    trap:
      "Do not detach a plus or minus sign from the term that follows it. In 3x² − 2x + 5, the second term is −2x, not 2x beside a separate subtraction object.",
    bridge:
      "An expression can be evaluated, simplified, or rewritten. It becomes an equation only when it is related to another expression by equality.",
  },
  {
    slug: "equality-equations",
    step: "02",
    title: "Equality & Equations",
    eyebrow: "Preserved relationships",
    icon: Scale,
    rgb: "34, 211, 238",
    base: "#03151b",
    subtitle:
      "Treat the equal sign as a claim that two expressions represent the same value, then learn why solving works by preserving that relationship.",
    coreTitle: "The equal sign means “same value,” not “the answer comes next.”",
    explanation: [
      "An equation joins two expressions and claims they are equal under some values of their variables. Those values form the equation’s solution set.",
      "Solving is a sequence of equivalent transformations. Each step changes the appearance of the equation while preserving exactly which values make the statement true.",
    ],
    why:
      "This invariant is the foundation of every later solving method, from one-variable equations to systems and symbolic proofs.",
    trap:
      "A legal solving step must preserve equality. In ordinary equation solving, whatever operation is applied to one side must also be applied to the other side.",
    bridge:
      "To know why those transformations are legal, algebra needs a rulebook. Those permissions are the algebraic properties in the next lesson.",
  },
  {
    slug: "algebraic-properties",
    step: "03",
    title: "Algebraic Properties",
    eyebrow: "Rewrite permissions",
    icon: RefreshCcw,
    rgb: "129, 140, 248",
    base: "#09091d",
    subtitle:
      "Use algebraic properties as precise licenses for reordering, regrouping, distributing, preserving identity, and undoing operations.",
    coreTitle: "Properties tell us which changes preserve value for every allowed input.",
    explanation: [
      "A property is not a trick attached to one problem. It is a general statement about an operation or structure, such as a + b = b + a for addition.",
      "When we simplify or solve, we compose these general permissions. Good symbolic work is less about memorizing moves and more about knowing why each move is valid.",
    ],
    why:
      "The same rewrite laws reappear in factoring, polynomial algebra, matrix manipulation, and later abstract algebra, where the properties themselves become objects of study.",
    trap:
      "Every property has a scope. Commutativity works for addition and multiplication, not subtraction and division; multiplicative inverses require nonzero values.",
    bridge:
      "Properties act on values inside a number system. The final lesson identifies the main number sets used throughout early algebra.",
  },
  {
    slug: "number-systems",
    step: "04",
    title: "Number Systems",
    eyebrow: "Allowed values",
    icon: Hash,
    rgb: "251, 191, 36",
    base: "#171205",
    subtitle:
      "Locate natural, integer, rational, irrational, and real values inside one hierarchy and see why the kind of number matters when solving algebra problems.",
    coreTitle: "An algebra problem is always happening inside some set of allowed values.",
    explanation: [
      "The familiar real-number systems are nested extensions. Integers add zero and negative values to counting numbers, rationals add fractions, and the real numbers contain both rational and irrational values.",
      "Knowing the active number system tells you which answers are available. For example, x² = 2 has no rational solution, but it does have real solutions: ±√2.",
    ],
    why:
      "Domains, restrictions, radicals, rational expressions, and equation solving all depend on knowing what kinds of values are available and which operations keep you inside the current set.",
    trap:
      "A decimal is not automatically irrational. Terminating and repeating decimals are rational because they can be written as ratios of integers.",
    bridge:
      "With symbolic grammar, equality, rewrite rules, and the real-number system in place, Integrated Algebra can now focus on relationships such as lines, inequalities, functions, and polynomials.",
  },
] as const;

const LESSON_BY_SLUG = new Map(LESSONS.map((lesson) => [lesson.slug, lesson]));

type ExpressionPartId = "term" | "coefficient" | "variable" | "exponent" | "constant";
type PropertyId = "commutative" | "associative" | "distributive" | "identity" | "inverse";
type NumberSetId = "natural" | "integers" | "rationals" | "irrational" | "real";

type PropertyRule = {
  id: PropertyId;
  label: string;
  rgb: string;
  equations: readonly string[];
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

type NumberSet = {
  id: NumberSetId;
  symbol?: string;
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
    definition:
      "A top-level piece of an expression. In a sum or difference, the sign immediately before the piece travels with the term.",
    example: "3x²\n−2x\n+5",
  },
  coefficient: {
    label: "Coefficient",
    rgb: "34, 211, 238",
    definition:
      "The signed numerical factor multiplying a variable part. In −2x, the coefficient is −2.",
    example: "3 in 3x²\n−2 in −2x",
  },
  variable: {
    label: "Variable",
    rgb: "96, 165, 250",
    definition:
      "A symbol standing for an unknown, changing, or generalized value.",
    example: "x",
  },
  exponent: {
    label: "Exponent",
    rgb: "192, 132, 252",
    definition:
      "A power describing repeated multiplication of the base. In x², the exponent is 2.",
    example: "2 in x²",
  },
  constant: {
    label: "Constant",
    rgb: "251, 191, 36",
    definition:
      "A term with no variable factor. Its value does not depend on the variable.",
    example: "+5",
  },
};

const PROPERTIES: readonly PropertyRule[] = [
  {
    id: "commutative",
    label: "Commutative",
    rgb: "34, 211, 238",
    equations: ["a + b = b + a", "ab = ba"],
    action: "Reorder addends or factors without changing the result.",
    caution: "Subtraction and division are not commutative.",
  },
  {
    id: "associative",
    label: "Associative",
    rgb: "129, 140, 248",
    equations: ["(a + b) + c = a + (b + c)", "(ab)c = a(bc)"],
    action: "Regroup repeated addition or repeated multiplication.",
    caution: "Regrouping cannot freely cross different operations.",
  },
  {
    id: "distributive",
    label: "Distributive",
    rgb: "52, 211, 153",
    equations: ["a(b + c) = ab + ac"],
    action: "Move between a grouped product and an expanded sum.",
    caution: "Every term inside the grouping receives the outside factor.",
  },
  {
    id: "identity",
    label: "Identity",
    rgb: "251, 191, 36",
    equations: ["a + 0 = a", "a × 1 = a"],
    action: "Use a neutral element without changing the value.",
    caution: "Zero is the additive identity; one is the multiplicative identity.",
  },
  {
    id: "inverse",
    label: "Inverse",
    rgb: "244, 114, 182",
    equations: ["a + (−a) = 0", "a × (1/a) = 1    for a ≠ 0"],
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

const NUMBER_SETS: readonly NumberSet[] = [
  {
    id: "natural",
    symbol: "ℕ",
    label: "Natural numbers",
    rgb: "163, 230, 53",
    example: "1, 2, 3, 4, …",
    definition:
      "Counting numbers. Some conventions include 0; the surrounding context should say which convention is being used.",
    operationNote:
      "Addition and multiplication stay natural; subtraction and division may leave the set.",
    boundary: "3 − 5 is not natural.",
  },
  {
    id: "integers",
    symbol: "ℤ",
    label: "Integers",
    rgb: "34, 211, 238",
    example: "…, −2, −1, 0, 1, 2, …",
    definition:
      "Whole-number steps in both directions, including zero and negative values.",
    operationNote:
      "Addition, subtraction, and multiplication stay integer; division may not.",
    boundary: "1 ÷ 2 is not an integer.",
  },
  {
    id: "rationals",
    symbol: "ℚ",
    label: "Rational numbers",
    rgb: "96, 165, 250",
    example: "1/2\n−7/3\n0.125\n0.333…",
    definition:
      "Numbers expressible as p/q for integers p and q with q ≠ 0. Their decimal forms terminate or repeat.",
    operationNote:
      "The four arithmetic operations stay rational when division by zero is excluded.",
    boundary: "√2 cannot be written as a ratio of integers.",
  },
  {
    id: "irrational",
    label: "Irrationals",
    rgb: "192, 132, 252",
    example: "π\n√2\ne",
    definition:
      "Real numbers that are not rational. Their decimal expansions neither terminate nor repeat periodically.",
    operationNote:
      "Irrational values sit on the real number line alongside rationals, but ordinary operations on them do not always stay irrational.",
    boundary: "√2 + (−√2) = 0, which is rational.",
  },
  {
    id: "real",
    symbol: "ℝ",
    label: "Real numbers",
    rgb: "52, 211, 153",
    example: "every point on the ordinary number line",
    definition:
      "Rational and irrational values together form the continuous real number line.",
    operationNote:
      "Most early algebra works inside the real numbers unless a problem explicitly says otherwise.",
    boundary: "The Fundamentals unit stops here; later topics can introduce larger systems when needed.",
  },
];

export default function FundamentalsAtomicLessonPage() {
  const params = useParams<{ lesson: string }>();
  const slug = params.lesson as LessonSlug;
  const lesson = LESSON_BY_SLUG.get(slug);

  const [activePartId, setActivePartId] = useState<ExpressionPartId>("term");
  const [activePropertyId, setActivePropertyId] = useState<PropertyId>("distributive");
  const [equalityStep, setEqualityStep] = useState(0);
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
  const equality = EQUALITY_STATES[equalityStep];
  const activeSet = NUMBER_SETS.find((set) => set.id === activeSetId) ?? NUMBER_SETS[4];
  const lessonIndex = LESSONS.findIndex((item) => item.slug === lesson.slug);
  const previous = lessonIndex > 0 ? LESSONS[lessonIndex - 1] : undefined;
  const next = lessonIndex < LESSONS.length - 1 ? LESSONS[lessonIndex + 1] : undefined;

  return (
    <main
      className="relative min-h-screen overflow-x-hidden text-stone-100"
      style={{ backgroundColor: lesson.base }}
    >
      <LessonBackdrop slug={lesson.slug} />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Formal Sciences", href: "/formal-science" },
            { label: "Mathematics", href: "/formal-science/mathematics" },
            { label: "Algebra", href: "/formal-science/mathematics/algebra" },
            {
              label: "Integrated Algebra",
              href: "/formal-science/mathematics/algebra/elementary-algebra",
            },
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
          headerClassName="border-white/[0.10]"
        />

        <section className="mt-3 grid gap-3 rounded-[24px] border border-white/[0.055] bg-black/[0.22] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <div>
            <div
              className="text-[10px] font-semibold uppercase tracking-[0.15em]"
              style={{ color: `rgba(${lesson.rgb},0.72)` }}
            >
              Core idea
            </div>
            <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.035em] text-white">
              {lesson.coreTitle}
            </h2>
            <div className="mt-4 grid gap-3 text-[14px] leading-6 text-stone-400">
              {lesson.explanation.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
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
              onStep={setEqualityStep}
              onReset={() => setEqualityStep(0)}
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
            <NumberSystemExplorer
              activeId={activeSetId}
              activeSet={activeSet}
              onSelect={setActiveSetId}
            />
          ) : null}
        </div>

        <section className="mt-3 rounded-[22px] border border-white/[0.05] bg-black/[0.20] p-4 backdrop-blur-xl">
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-600">
            Connect the idea
          </div>
          <p className="mt-2 max-w-4xl text-[13px] leading-6 text-stone-400">{lesson.bridge}</p>
        </section>

        <LessonNavigation current={lesson} previous={previous} next={next} />
      </div>
    </main>
  );
}

function LessonBackdrop({ slug }: { slug: LessonSlug }) {
  if (slug === "expressions-variables") {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(52,211,153,0.12),transparent_28%),radial-gradient(circle_at_82%_76%,rgba(34,211,238,0.06),transparent_30%),linear-gradient(to_bottom,rgba(2,18,13,0.20),rgba(1,9,7,0.86))]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(52,211,153,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.025)_1px,transparent_1px)] [background-size:58px_58px]" />
        <div className="absolute -left-8 top-[18%] font-mono text-[18vw] font-semibold leading-none text-emerald-300/[0.025]">&#123;</div>
        <div className="absolute -right-8 bottom-[4%] font-mono text-[18vw] font-semibold leading-none text-emerald-300/[0.025]">&#125;</div>
        <div className="absolute left-[16%] top-[62%] font-mono text-[4rem] text-cyan-300/[0.035]">3x²</div>
        <div className="absolute right-[18%] top-[24%] font-mono text-[4rem] text-blue-300/[0.03]">−2x</div>
      </div>
    );
  }

  if (slug === "equality-equations") {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(34,211,238,0.10),transparent_24%),radial-gradient(circle_at_18%_76%,rgba(244,114,182,0.055),transparent_27%),linear-gradient(to_bottom,rgba(2,17,22,0.18),rgba(1,8,12,0.88))]" />
        <div className="absolute left-[8%] right-[8%] top-1/2 h-px bg-cyan-300/[0.07]" />
        <div className="absolute left-1/2 top-[20%] h-[60%] w-px bg-cyan-300/[0.055]" />
        <div className="absolute left-[14%] top-[32%] h-40 w-40 rounded-full border border-cyan-300/[0.045]" />
        <div className="absolute right-[14%] top-[32%] h-40 w-40 rounded-full border border-fuchsia-300/[0.04]" />
        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 font-mono text-[11rem] text-emerald-300/[0.025]">=</div>
      </div>
    );
  }

  if (slug === "algebraic-properties") {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(129,140,248,0.13),transparent_28%),radial-gradient(circle_at_14%_76%,rgba(192,132,252,0.07),transparent_28%),linear-gradient(to_bottom,rgba(9,9,29,0.22),rgba(3,3,12,0.90))]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,rgba(129,140,248,0.025)_1px,transparent_1px),linear-gradient(45deg,rgba(192,132,252,0.018)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute left-[10%] top-[24%] font-mono text-[8rem] text-indigo-300/[0.025]">( )</div>
        <div className="absolute right-[9%] top-[55%] font-mono text-[7rem] text-violet-300/[0.025]">↔</div>
        <div className="absolute left-[38%] top-[70%] font-mono text-[4rem] text-cyan-300/[0.02]">a(b+c)</div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(251,191,36,0.095),transparent_30%),radial-gradient(circle_at_16%_82%,rgba(163,230,53,0.045),transparent_26%),linear-gradient(to_bottom,rgba(23,18,5,0.18),rgba(10,7,2,0.90))]" />
      <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 1200 800" aria-hidden="true">
        <ellipse cx="600" cy="410" rx="440" ry="270" fill="none" stroke="rgba(52,211,153,0.16)" strokeWidth="2" />
        <ellipse cx="480" cy="420" rx="285" ry="195" fill="none" stroke="rgba(96,165,250,0.13)" strokeWidth="2" />
        <ellipse cx="420" cy="430" rx="190" ry="125" fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth="2" />
        <ellipse cx="380" cy="435" rx="110" ry="70" fill="none" stroke="rgba(163,230,53,0.12)" strokeWidth="2" />
        <line x1="120" y1="650" x2="1080" y2="650" stroke="rgba(251,191,36,0.12)" strokeWidth="2" />
        {Array.from({ length: 17 }, (_, index) => (
          <line key={index} x1={120 + index * 60} y1="642" x2={120 + index * 60} y2="658" stroke="rgba(251,191,36,0.10)" />
        ))}
      </svg>
    </div>
  );
}

function ConceptNote({ label, text, rgb }: { label: string; text: string; rgb: string }) {
  return (
    <div
      className="rounded-[16px] border p-3.5"
      style={{ borderColor: `rgba(${rgb},0.14)`, background: `rgba(${rgb},0.025)` }}
    >
      <div
        className="text-[10px] font-semibold uppercase tracking-[0.1em]"
        style={{ color: `rgba(${rgb},0.72)` }}
      >
        {label}
      </div>
      <p className="mt-2 text-[12px] leading-5 text-stone-400">{text}</p>
    </div>
  );
}

function ExpressionAnatomy({
  activeId,
  onSelect,
}: {
  activeId: ExpressionPartId;
  onSelect: (id: ExpressionPartId) => void;
}) {
  const activePart = EXPRESSION_PARTS[activeId];

  return (
    <section className="overflow-hidden rounded-[24px] border border-emerald-200/[0.12] bg-black/[0.24] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_24px_70px_rgba(0,0,0,0.20)] backdrop-blur-xl xl:h-[430px]">
      <div className="grid h-full grid-rows-[auto_minmax(0,1fr)]">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/70">
              Expression anatomy
            </div>
            <p className="mt-1 text-[13px] text-stone-500">
              Select a structural role inside one expression.
            </p>
          </div>
          <Braces size={20} className="text-emerald-300/30" />
        </div>

        <div className="mt-4 grid min-h-0 gap-4 lg:grid-cols-[minmax(0,1fr)_310px]">
          <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_94px] rounded-[20px] border border-emerald-100/[0.06] bg-[#04140e]/70 p-5">
            <div className="flex min-h-0 flex-wrap items-center justify-center gap-4 font-mono text-[clamp(2.4rem,5vw,5rem)] font-semibold tracking-[-0.06em] text-white">
              <ExpressionTerm active={activeId === "term"} onClick={() => onSelect("term")}>
                <ExpressionToken active={activeId === "coefficient"} rgb="34, 211, 238" onClick={(event) => { event.stopPropagation(); onSelect("coefficient"); }}>3</ExpressionToken>
                <ExpressionToken active={activeId === "variable"} rgb="96, 165, 250" onClick={(event) => { event.stopPropagation(); onSelect("variable"); }}>x</ExpressionToken>
                <ExpressionToken active={activeId === "exponent"} rgb="192, 132, 252" onClick={(event) => { event.stopPropagation(); onSelect("exponent"); }} superscript>2</ExpressionToken>
              </ExpressionTerm>

              <ExpressionTerm active={activeId === "term"} onClick={() => onSelect("term")}>
                <ExpressionToken active={activeId === "coefficient"} rgb="34, 211, 238" onClick={(event) => { event.stopPropagation(); onSelect("coefficient"); }}>−2</ExpressionToken>
                <ExpressionToken active={activeId === "variable"} rgb="96, 165, 250" onClick={(event) => { event.stopPropagation(); onSelect("variable"); }}>x</ExpressionToken>
              </ExpressionTerm>

              <ExpressionTerm active={activeId === "term"} onClick={() => onSelect("term")}>
                <ExpressionToken active={activeId === "constant"} rgb="251, 191, 36" onClick={(event) => { event.stopPropagation(); onSelect("constant"); }}>+5</ExpressionToken>
              </ExpressionTerm>
            </div>

            <div className="grid gap-2 border-t border-white/[0.05] pt-4 sm:grid-cols-3">
              <StructureNote title="Three signed terms" lines={["3x²", "−2x", "+5"]} />
              <StructureNote title="Inside a term" lines={["coefficient", "variable", "power"]} />
              <StructureNote title="Constant term" lines={["+5", "no variable factor"]} />
            </div>
          </div>

          <div className="grid min-h-0 grid-rows-[116px_minmax(0,1fr)] gap-3">
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(EXPRESSION_PARTS) as ExpressionPartId[]).map((id) => {
                const part = EXPRESSION_PARTS[id];
                const active = id === activeId;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onSelect(id)}
                    className="h-[50px] rounded-xl border px-3 text-left text-[11px] font-semibold transition-colors"
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

            <div className="grid min-h-0 grid-rows-[32px_78px_minmax(0,1fr)] rounded-[18px] border border-white/[0.05] bg-white/[0.014] p-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: `rgb(${activePart.rgb})` }} />
                <h3 className="text-[20px] font-semibold text-white">{activePart.label}</h3>
              </div>
              <p className="pt-2 text-[13px] leading-6 text-stone-400">{activePart.definition}</p>
              <div
                className="mt-3 flex min-h-0 items-center whitespace-pre-line rounded-xl border border-white/[0.045] bg-black/[0.18] px-3 py-3 font-mono text-[13px] leading-5"
                style={{ color: `rgba(${activePart.rgb},0.82)` }}
              >
                {activePart.example}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StructureNote({ title, lines }: { title: string; lines: readonly string[] }) {
  return (
    <div className="rounded-xl bg-white/[0.015] px-3 py-2.5">
      <div className="text-[10px] font-semibold text-emerald-300/65">{title}</div>
      <div className="mt-1 font-mono text-[10px] leading-4 text-stone-500">
        {lines.map((line) => <div key={line}>{line}</div>)}
      </div>
    </div>
  );
}

function ExpressionTerm({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`flex cursor-pointer items-start rounded-xl border px-3 py-2 transition-colors ${active ? "border-emerald-300/[0.30] bg-emerald-400/[0.06]" : "border-white/[0.035] bg-white/[0.008]"}`}
    >
      {children}
    </span>
  );
}

function ExpressionToken({
  active,
  rgb,
  onClick,
  children,
  superscript = false,
}: {
  active: boolean;
  rgb: string;
  onClick: (event: MouseEvent<HTMLSpanElement>) => void;
  children: ReactNode;
  superscript?: boolean;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`${superscript ? "mt-1 text-[0.52em]" : ""} cursor-pointer rounded-md px-0.5 transition-colors`}
      style={{ color: active ? `rgb(${rgb})` : undefined, background: active ? `rgba(${rgb},0.08)` : undefined }}
    >
      {children}
    </span>
  );
}

function EqualityLab({
  state,
  step,
  onStep,
  onReset,
}: {
  state: EqualityState;
  step: number;
  onStep: (step: number) => void;
  onReset: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-cyan-200/[0.11] bg-black/[0.24] p-5 backdrop-blur-xl xl:h-[420px]">
      <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_52px]">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/70">Equality lab</div>
            <p className="mt-1 text-[13px] text-stone-500">Transform both sides together and watch the same solution survive.</p>
          </div>
          <Scale size={20} className="text-cyan-300/30" />
        </div>

        <div className="mx-auto mt-4 grid w-full max-w-[900px] min-h-0 grid-rows-[minmax(0,1fr)_76px] rounded-[20px] border border-white/[0.05] bg-[#041116]/72 p-5">
          <div>
            <div className="grid grid-cols-[minmax(0,1fr)_52px_minmax(0,1fr)] items-center gap-3">
              <BalanceSide expression={state.left} value={state.leftValue} rgb="34, 211, 238" />
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-300/[0.18] bg-emerald-400/[0.04] font-mono text-xl text-emerald-300">=</div>
              <BalanceSide expression={state.right} value={state.rightValue} rgb="244, 114, 182" />
            </div>
            <div className="relative mx-8 mt-6 h-8">
              <div className="absolute left-1/2 top-0 h-7 w-1 -translate-x-1/2 rounded-full bg-emerald-300/45" />
              <div className="absolute left-0 right-0 top-1 h-px bg-emerald-300/35" />
              <div className="absolute left-0 top-1 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-500" />
              <div className="absolute right-0 top-1 h-2 w-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-500" />
            </div>
          </div>

          <div className="rounded-xl border border-emerald-300/[0.10] bg-emerald-400/[0.025] px-3 py-3">
            <div className="text-[10px] font-semibold text-emerald-300/75">{state.operation}</div>
            <p className="mt-1 text-[12px] leading-5 text-stone-500">{state.note}</p>
          </div>
        </div>

        <div className="mx-auto mt-3 grid w-full max-w-[900px] gap-2 sm:grid-cols-3">
          <LabButton label="Subtract 6 from both sides" disabled={step !== 0} onClick={() => onStep(1)} />
          <LabButton label="Divide both sides by 2" disabled={step !== 1} onClick={() => onStep(2)} />
          <button type="button" onClick={onReset} className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.015] px-3 text-[11px] font-semibold text-stone-500 transition-colors hover:text-stone-300">
            <RefreshCcw size={13} /> Reset
          </button>
        </div>
      </div>
    </section>
  );
}

function BalanceSide({ expression, value, rgb }: { expression: string; value: string; rgb: string }) {
  return (
    <div className="min-w-0 rounded-[16px] border p-4 text-center" style={{ borderColor: `rgba(${rgb},0.15)`, background: `rgba(${rgb},0.025)` }}>
      <div className="truncate font-mono text-[24px] font-semibold text-white">{expression}</div>
      <div className="mt-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-stone-600">at x = 4</div>
      <div className="mt-1 font-mono text-[13px]" style={{ color: `rgba(${rgb},0.78)` }}>→ {value}</div>
    </div>
  );
}

function LabButton({ label, disabled, onClick }: { label: string; disabled: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} className="h-11 rounded-xl border border-cyan-300/[0.10] bg-cyan-400/[0.02] px-3 text-[11px] font-semibold text-cyan-300/70 transition-colors hover:bg-cyan-400/[0.045] disabled:cursor-default disabled:opacity-30">
      {label}
    </button>
  );
}

function PropertyRulebook({
  activeId,
  activeProperty,
  onSelect,
}: {
  activeId: PropertyId;
  activeProperty: PropertyRule;
  onSelect: (id: PropertyId) => void;
}) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-indigo-200/[0.11] bg-black/[0.23] p-5 backdrop-blur-xl xl:h-[440px]">
      <div className="grid h-full grid-rows-[auto_52px_minmax(0,1fr)] gap-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-300/70">Property rulebook</div>
          <p className="mt-1 text-[13px] text-stone-500">Each property states reusable equivalent forms, not a one-off trick.</p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {PROPERTIES.map((property) => {
            const active = property.id === activeId;
            return (
              <button
                key={property.id}
                type="button"
                onClick={() => onSelect(property.id)}
                className="h-12 rounded-xl border px-2 text-[11px] font-semibold transition-colors"
                style={{
                  color: active ? `rgb(${property.rgb})` : "rgb(120 113 108)",
                  borderColor: active ? `rgba(${property.rgb},0.28)` : "rgba(255,255,255,0.045)",
                  background: active ? `rgba(${property.rgb},0.055)` : "rgba(0,0,0,0.12)",
                }}
              >
                {property.label}
              </button>
            );
          })}
        </div>

        <div className="grid min-h-0 gap-4 rounded-[18px] border border-white/[0.05] bg-white/[0.012] p-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex min-h-0 items-center justify-center rounded-[16px] border border-white/[0.045] bg-black/[0.17] p-5 text-center">
            <div className="grid w-full gap-3">
              {activeProperty.equations.map((equation) => (
                <div key={equation} className="rounded-xl border border-white/[0.04] bg-white/[0.012] px-3 py-3 font-mono text-[20px] font-semibold leading-8" style={{ color: `rgb(${activeProperty.rgb})` }}>
                  {equation}
                </div>
              ))}
            </div>
          </div>
          <div className="grid min-h-0 grid-rows-2 gap-2">
            <RuleNote icon={Check} label="Allows" text={activeProperty.action} rgb={activeProperty.rgb} />
            <RuleNote icon={Braces} label="Boundary" text={activeProperty.caution} rgb="251, 113, 133" />
          </div>
        </div>
      </div>
    </section>
  );
}

function RuleNote({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return (
    <div className="grid min-h-0 grid-cols-[40px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}>
        <Icon size={16} />
      </span>
      <span>
        <strong className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-500">{label}</strong>
        <span className="mt-1 block text-[12px] leading-5 text-stone-400">{text}</span>
      </span>
    </div>
  );
}

function NumberSystemExplorer({
  activeId,
  activeSet,
  onSelect,
}: {
  activeId: NumberSetId;
  activeSet: NumberSet;
  onSelect: (id: NumberSetId) => void;
}) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-amber-200/[0.11] bg-black/[0.23] p-5 backdrop-blur-xl xl:h-[500px]">
      <div className="grid h-full grid-rows-[auto_minmax(0,1fr)]">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/70">Number-system explorer</div>
          <p className="mt-1 text-[13px] text-stone-500">The real numbers contain both rational and irrational values.</p>
        </div>

        <div className="mt-4 grid min-h-0 gap-4 lg:grid-cols-[minmax(0,1.25fr)_350px]">
          <SetRegion
            id="real"
            active={activeId === "real"}
            rgb="52, 211, 153"
            onSelect={onSelect}
            className="grid min-h-0 grid-rows-[58px_minmax(0,1fr)] rounded-[22px] border p-3"
          >
            <div className="flex items-center justify-between gap-3 px-1">
              <div>
                <div className="font-mono text-[18px] font-semibold text-emerald-200">ℝ Real numbers</div>
                <div className="mt-1 text-[10px] text-stone-500">Every point on the ordinary number line</div>
              </div>
              <span className="rounded-full border border-emerald-300/[0.12] bg-emerald-400/[0.025] px-2 py-1 text-[9px] font-semibold text-emerald-300/60">contains both regions below</span>
            </div>

            <div className="grid min-h-0 gap-3 lg:grid-cols-[minmax(0,1.35fr)_minmax(190px,0.65fr)]">
              <SetRegion id="rationals" active={activeId === "rationals"} rgb="96, 165, 250" onSelect={onSelect} className="grid min-h-0 grid-rows-[52px_minmax(0,1fr)] rounded-[18px] border p-3">
                <div>
                  <div className="font-mono text-[15px] font-semibold text-blue-200">ℚ Rational numbers</div>
                  <div className="mt-1 text-[10px] text-stone-500">Fractions; terminating or repeating decimals</div>
                </div>

                <SetRegion id="integers" active={activeId === "integers"} rgb="34, 211, 238" onSelect={onSelect} className="grid min-h-0 grid-rows-[48px_minmax(0,1fr)] rounded-[15px] border p-3">
                  <div>
                    <div className="font-mono text-[14px] font-semibold text-cyan-200">ℤ Integers</div>
                    <div className="mt-1 text-[10px] text-stone-500">…, −2, −1, 0, 1, 2, …</div>
                  </div>

                  <SetRegion id="natural" active={activeId === "natural"} rgb="163, 230, 53" onSelect={onSelect} className="rounded-[13px] border px-3 py-2.5">
                    <div className="font-mono text-[13px] font-semibold text-lime-200">ℕ Natural numbers</div>
                    <div className="mt-1 text-[10px] text-stone-500">1, 2, 3, …</div>
                  </SetRegion>
                </SetRegion>
              </SetRegion>

              <SetRegion id="irrational" active={activeId === "irrational"} rgb="192, 132, 252" onSelect={onSelect} className="flex min-h-0 flex-col justify-between rounded-[18px] border p-3">
                <div>
                  <div className="text-[15px] font-semibold text-violet-200">Irrationals</div>
                  <div className="mt-1 text-[10px] leading-4 text-stone-500">Real values whose decimals do not terminate or repeat</div>
                </div>
                <div className="grid gap-1 text-center font-serif text-[30px] text-violet-100/75">
                  <span>π</span>
                  <span>√2</span>
                  <span>e</span>
                </div>
              </SetRegion>
            </div>
          </SetRegion>

          <div className="grid min-h-0 grid-rows-[56px_82px_72px_minmax(0,1fr)] rounded-[20px] border border-white/[0.05] bg-white/[0.014] p-4">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">Selected set</div>
              <div className="mt-1 flex items-baseline gap-2">
                {activeSet.symbol ? <span className="font-mono text-[22px]" style={{ color: `rgb(${activeSet.rgb})` }}>{activeSet.symbol}</span> : null}
                <h3 className="text-[20px] font-semibold text-white">{activeSet.label}</h3>
              </div>
            </div>
            <p className="pt-2 text-[12px] leading-5 text-stone-400">{activeSet.definition}</p>
            <div className="whitespace-pre-line rounded-xl border border-white/[0.04] bg-black/[0.16] px-3 py-2 font-mono text-[11px] leading-4" style={{ color: `rgba(${activeSet.rgb},0.78)` }}>{activeSet.example}</div>
            <div className="mt-2 grid min-h-0 grid-rows-2 gap-2">
              <MiniNote label="Operations" text={activeSet.operationNote} rgb={activeSet.rgb} />
              <MiniNote label="Boundary" text={activeSet.boundary} rgb="251, 113, 133" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SetRegion({
  id,
  active,
  rgb,
  onSelect,
  className,
  children,
}: {
  id: NumberSetId;
  active: boolean;
  rgb: string;
  onSelect: (id: NumberSetId) => void;
  className: string;
  children: ReactNode;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(id);
      }}
      onKeyDown={handleKeyDown}
      className={`${className} cursor-pointer transition-colors`}
      style={{
        borderColor: active ? `rgba(${rgb},0.42)` : `rgba(${rgb},0.16)`,
        background: active ? `rgba(${rgb},0.065)` : `rgba(${rgb},0.022)`,
        boxShadow: active ? `inset 0 0 28px rgba(${rgb},0.025)` : undefined,
      }}
    >
      {children}
    </div>
  );
}

function MiniNote({ label, text, rgb }: { label: string; text: string; rgb: string }) {
  return (
    <div className="rounded-xl border border-white/[0.04] bg-black/[0.14] px-3 py-2">
      <div className="text-[9px] font-semibold uppercase tracking-[0.1em]" style={{ color: `rgba(${rgb},0.68)` }}>{label}</div>
      <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-stone-500">{text}</p>
    </div>
  );
}

function LessonNavigation({
  current,
  previous,
  next,
}: {
  current: LessonConfig;
  previous?: LessonConfig;
  next?: LessonConfig;
}) {
  return (
    <nav className="mt-3 pb-8" aria-label="Lesson navigation">
      <div className="mb-2 flex items-center justify-between gap-3">
        <Link href={BASE} className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-stone-500 transition-colors hover:text-stone-300">
          <CornerUpLeft size={12} /> Unit: Algebra Fundamentals
        </Link>
        <span className="font-mono text-[10px] text-stone-700">{current.step} / 04</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? (
          <SiblingLink direction="previous" lesson={previous} />
        ) : (
          <div className="min-h-[74px] rounded-[18px] border border-white/[0.025] bg-white/[0.006]" />
        )}

        {next ? (
          <SiblingLink direction="next" lesson={next} />
        ) : (
          <Link href="/formal-science/mathematics/algebra/elementary-algebra/linear-equations" className="group flex min-h-[74px] items-center gap-3 rounded-[18px] border border-blue-300/[0.14] bg-blue-400/[0.03] px-4 py-3 transition-colors hover:border-blue-300/[0.24] hover:bg-blue-400/[0.05]">
            <span className="min-w-0 flex-1 text-right">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.11em] text-blue-300/60">Next Integrated Algebra topic</span>
              <strong className="mt-0.5 block text-[15px] text-stone-200">Graphing Linear Equations</strong>
            </span>
            <ArrowRight size={15} className="text-blue-300 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </nav>
  );
}

function SiblingLink({ direction, lesson }: { direction: "previous" | "next"; lesson: LessonConfig }) {
  const previous = direction === "previous";
  return (
    <Link href={`${BASE}/${lesson.slug}`} className="group flex min-h-[74px] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/[0.20] px-4 py-3 transition-colors hover:border-white/[0.13] hover:bg-white/[0.02]">
      {previous ? <ArrowLeft size={15} style={{ color: `rgb(${lesson.rgb})` }} className="transition-transform group-hover:-translate-x-0.5" /> : null}
      <span className={`min-w-0 flex-1 ${previous ? "" : "text-right"}`}>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.11em] text-stone-600">{previous ? "Previous lesson" : "Next lesson"}</span>
        <strong className="mt-0.5 block text-[15px] text-stone-200">{lesson.title}</strong>
      </span>
      {!previous ? <ArrowRight size={15} style={{ color: `rgb(${lesson.rgb})` }} className="transition-transform group-hover:translate-x-0.5" /> : null}
    </Link>
  );
}
