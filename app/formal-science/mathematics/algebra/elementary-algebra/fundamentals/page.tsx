"use client";

import Link from "next/link";
import {
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  Braces,
  Check,
  Equal,
  Hash,
  Layers,
  RefreshCcw,
  Scale,
  Variable,
  type LucideIcon,
} from "lucide-react";
import Assessment from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import FundamentalsBackground from "./_components/FundamentalsBackground";
import { fundamentalsQuiz } from "./_components/assessment";

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

const EXPRESSION_PARTS: Record<
  ExpressionPartId,
  { label: string; rgb: string; definition: string; example: string }
> = {
  term: {
    label: "Term",
    rgb: "52, 211, 153",
    definition: "A top-level piece of an expression separated by addition or subtraction.",
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
    definition: "A symbol that tells algebra what operation joins or transforms values.",
    example: "+ · − · × · ÷",
  },
};

const PROPERTIES: readonly PropertyRule[] = [
  {
    id: "commutative",
    label: "Commutative",
    rgb: "34, 211, 238",
    equation: "a + b = b + a",
    action: "Reorder terms under addition or factors under multiplication.",
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
    action: "Add or multiply by a neutral element without changing the value.",
    caution: "Zero is additive identity; one is multiplicative identity.",
  },
  {
    id: "inverse",
    label: "Inverse",
    rgb: "244, 114, 182",
    equation: "a + (−a) = 0    ·    a(1/a) = 1",
    action: "Pair a value with an operation that cancels it.",
    caution: "The multiplicative inverse requires a ≠ 0.",
  },
];

const EQUALITY_STATES: readonly EqualityState[] = [
  {
    left: "2x + 6",
    right: "14",
    leftValue: "14",
    rightValue: "14",
    operation: "Start",
    note: "At x = 4, both sides have the same value.",
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
  note: "The balance is broken: at x = 4 the two sides no longer agree.",
};

export default function FundamentalsPage() {
  const [activePartId, setActivePartId] = useState<ExpressionPartId>("term");
  const [activePropertyId, setActivePropertyId] = useState<PropertyId>("distributive");
  const [equalityStep, setEqualityStep] = useState(0);
  const [brokenEquality, setBrokenEquality] = useState(false);

  const activePart = EXPRESSION_PARTS[activePartId];
  const activeProperty =
    PROPERTIES.find((property) => property.id === activePropertyId) ?? PROPERTIES[0];
  const equality = brokenEquality ? BROKEN_EQUALITY : EQUALITY_STATES[equalityStep];
  const balanced = !brokenEquality;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#031912] text-stone-100 selection:bg-emerald-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-45">
        <FundamentalsBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_16%,rgba(52,211,153,0.10),transparent_27%),radial-gradient(circle_at_14%_82%,rgba(34,211,238,0.06),transparent_26%),linear-gradient(to_bottom,rgba(3,25,18,0.26),rgba(2,12,9,0.82))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-25 [background-image:linear-gradient(rgba(52,211,153,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.022)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
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
            { label: "Fundamentals" },
          ]}
          eyebrow="Expression · Equality · Property · Number"
          icon={Hash}
          title={<span>Algebra Fundamentals</span>}
          subtitle="Learn the grammar that makes symbolic manipulation legal: identify the pieces of an expression, preserve equality, and use algebraic properties deliberately."
          accentRgb="52, 211, 153"
          titleClassName="font-mono text-[clamp(2.8rem,5vw,5.2rem)] font-semibold uppercase leading-[0.84] tracking-[-0.06em] text-[#f4fff9]"
          iconClassName="rounded-[16px]"
          headerClassName="border-emerald-300/[0.14]"
          aside={
            <div className="flex items-center gap-2 rounded-full border border-emerald-300/[0.14] bg-black/25 px-4 py-2 font-mono text-[13px] text-emerald-200/85 backdrop-blur-md">
              <span>3x + 5</span>
              <Equal size={12} />
              <span>20</span>
            </div>
          }
        />

        <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.15fr)_minmax(390px,0.85fr)]">
          <ExpressionAnatomy
            activeId={activePartId}
            activePart={activePart}
            onSelect={setActivePartId}
          />
          <EqualityLab
            state={equality}
            step={equalityStep}
            balanced={balanced}
            onStep={setEqualityStep}
            onBreak={() => setBrokenEquality(true)}
            onReset={() => {
              setEqualityStep(0);
              setBrokenEquality(false);
            }}
          />
        </div>

        <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.15fr)_minmax(390px,0.85fr)]">
          <PropertyRulebook
            activeId={activePropertyId}
            activeProperty={activeProperty}
            onSelect={setActivePropertyId}
          />
          <NumberSystemMap />
        </div>

        <details className="group mt-3 overflow-hidden rounded-[22px] border border-emerald-200/[0.10] bg-black/[0.22] backdrop-blur-xl">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/70">Fundamentals checkpoint</div>
              <p className="mt-1 text-[12px] text-stone-500">Three quick questions on number sets, operation grammar, and variables.</p>
            </div>
            <span className="rounded-lg border border-emerald-300/[0.12] bg-emerald-400/[0.035] px-3 py-2 text-[11px] font-semibold text-emerald-200/75 group-open:hidden">
              Open check
            </span>
          </summary>
          <div className="border-t border-emerald-200/[0.08] p-4">
            <Assessment
              title="Fundamentals Check"
              questions={fundamentalsQuiz}
              accentColor="emerald"
              onComplete={() => undefined}
            />
          </div>
        </details>

        <nav className="mt-3 grid gap-3 pb-8 sm:grid-cols-2" aria-label="Lesson navigation">
          <Link
            href="/formal-science/mathematics/algebra/elementary-algebra"
            className="group flex min-h-[74px] items-center gap-3 rounded-[18px] border border-cyan-300/[0.12] bg-cyan-400/[0.025] px-4 py-3 transition-colors hover:border-cyan-300/[0.22] hover:bg-cyan-400/[0.045]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/[0.16] bg-cyan-400/[0.04] text-cyan-300">
              <Layers size={17} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-300/65">Back to map</span>
              <strong className="mt-0.5 block text-[15px] text-stone-200">Integrated Algebra</strong>
            </span>
          </Link>

          <Link
            href="/formal-science/mathematics/algebra/elementary-algebra/linear-equations"
            className="group flex min-h-[74px] items-center gap-3 rounded-[18px] border border-blue-300/[0.14] bg-blue-400/[0.03] px-4 py-3 transition-colors hover:border-blue-300/[0.24] hover:bg-blue-400/[0.05]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/[0.18] bg-blue-400/[0.045] text-blue-300">
              <Variable size={17} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-300/65">Next relationship</span>
              <strong className="mt-0.5 block text-[15px] text-stone-200">Graphing Linear Equations</strong>
            </span>
            <ArrowRight size={14} className="text-blue-300 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </nav>
      </div>
    </main>
  );
}

function ExpressionAnatomy({
  activeId,
  activePart,
  onSelect,
}: {
  activeId: ExpressionPartId;
  activePart: (typeof EXPRESSION_PARTS)[ExpressionPartId];
  onSelect: (id: ExpressionPartId) => void;
}) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-emerald-200/[0.12] bg-black/[0.24] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_24px_70px_rgba(0,0,0,0.20)] backdrop-blur-xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/70">Expression anatomy</div>
          <p className="mt-1 text-[12px] text-stone-500">Select a structural role inside one expression.</p>
        </div>
        <Braces size={18} className="text-emerald-300/30" />
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_270px]">
        <div className="flex min-h-[250px] flex-col justify-between rounded-[20px] border border-emerald-100/[0.06] bg-[#04140e]/70 p-5">
          <div className="flex min-h-[118px] flex-wrap items-center justify-center gap-2 font-mono text-[clamp(2rem,4vw,4.2rem)] font-semibold tracking-[-0.06em] text-white">
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
            {[
              ["1", "grouping"],
              ["2", "powers"],
              ["3", "multiply / divide"],
              ["4", "add / subtract"],
            ].map(([rank, label]) => (
              <div key={rank} className="rounded-xl bg-white/[0.015] px-2 py-2.5">
                <div className="text-[9px] font-semibold text-emerald-300/60">{rank}</div>
                <div className="mt-1 text-[10px] text-stone-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-rows-[auto_minmax(0,1fr)] gap-3">
          <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6 lg:grid-cols-2">
            {(Object.keys(EXPRESSION_PARTS) as ExpressionPartId[]).map((id) => {
              const part = EXPRESSION_PARTS[id];
              const active = id === activeId;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelect(id)}
                  className="h-10 rounded-xl border px-2 text-[10px] font-semibold transition-colors"
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
              <h2 className="text-[18px] font-semibold text-white">{activePart.label}</h2>
            </div>
            <p className="mt-3 text-[12px] leading-5 text-stone-400">{activePart.definition}</p>
            <div className="mt-4 rounded-xl border border-white/[0.045] bg-black/[0.18] px-3 py-2.5 font-mono text-[12px]" style={{ color: `rgba(${activePart.rgb},0.82)` }}>
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
    <span
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`flex cursor-pointer items-start rounded-xl border px-2 py-1 transition-colors ${active ? "border-emerald-300/[0.30] bg-emerald-400/[0.06]" : "border-transparent"}`}
    >
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
  balanced,
  onStep,
  onBreak,
  onReset,
}: {
  state: EqualityState;
  step: number;
  balanced: boolean;
  onStep: (step: number) => void;
  onBreak: () => void;
  onReset: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-cyan-200/[0.11] bg-black/[0.24] p-4 backdrop-blur-xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300/70">Equality lab</div>
          <p className="mt-1 text-[12px] text-stone-500">An equation survives only when both sides are transformed together.</p>
        </div>
        <Scale size={18} className="text-cyan-300/30" />
      </div>

      <div className="mt-4 rounded-[20px] border border-white/[0.05] bg-[#041116]/72 p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)] items-center gap-2">
          <BalanceSide expression={state.left} value={state.leftValue} rgb={balanced ? "34, 211, 238" : "251, 113, 133"} />
          <div className={`flex h-11 w-11 items-center justify-center rounded-full border font-mono text-xl ${balanced ? "border-emerald-300/[0.18] bg-emerald-400/[0.04] text-emerald-300" : "border-rose-300/[0.18] bg-rose-400/[0.04] text-rose-300"}`}>
            {balanced ? "=" : "≠"}
          </div>
          <BalanceSide expression={state.right} value={state.rightValue} rgb={balanced ? "244, 114, 182" : "251, 113, 133"} />
        </div>

        <div className="relative mx-6 mt-5 h-8">
          <div className={`absolute left-1/2 top-0 h-7 w-1 -translate-x-1/2 rounded-full ${balanced ? "bg-emerald-300/45" : "rotate-[10deg] bg-rose-300/45"}`} />
          <div className={`absolute left-0 right-0 top-1 h-px origin-center ${balanced ? "bg-emerald-300/35" : "rotate-[4deg] bg-rose-300/35"}`} />
          <div className="absolute left-0 top-1 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-500" />
          <div className="absolute right-0 top-1 h-2 w-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-500" />
        </div>

        <div className={`mt-1 rounded-xl border px-3 py-2.5 ${balanced ? "border-emerald-300/[0.10] bg-emerald-400/[0.025]" : "border-rose-300/[0.12] bg-rose-400/[0.03]"}`}>
          <div className={`text-[10px] font-semibold ${balanced ? "text-emerald-300/75" : "text-rose-300/80"}`}>{state.operation}</div>
          <p className="mt-1 text-[11px] leading-5 text-stone-500">{state.note}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <LabButton label="− 6 both sides" disabled={!balanced || step !== 0} onClick={() => onStep(1)} />
        <LabButton label="÷ 2 both sides" disabled={!balanced || step !== 1} onClick={() => onStep(2)} />
        <button
          type="button"
          onClick={onBreak}
          disabled={!balanced}
          className="h-10 rounded-xl border border-rose-300/[0.12] bg-rose-400/[0.025] px-2 text-[10px] font-semibold text-rose-300/65 transition-colors hover:bg-rose-400/[0.05] disabled:cursor-default disabled:opacity-35"
        >
          change one side
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.015] px-2 text-[10px] font-semibold text-stone-500 transition-colors hover:text-stone-300"
        >
          <RefreshCcw size={12} /> Reset
        </button>
      </div>
    </section>
  );
}

function BalanceSide({ expression, value, rgb }: { expression: string; value: string; rgb: string }) {
  return (
    <div className="min-w-0 rounded-[16px] border p-3 text-center" style={{ borderColor: `rgba(${rgb},0.15)`, background: `rgba(${rgb},0.025)` }}>
      <div className="truncate font-mono text-[21px] font-semibold text-white">{expression}</div>
      <div className="mt-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-stone-600">at x = 4</div>
      <div className="mt-1 font-mono text-[13px]" style={{ color: `rgba(${rgb},0.78)` }}>→ {value}</div>
    </div>
  );
}

function LabButton({ label, disabled, onClick }: { label: string; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="h-10 rounded-xl border border-cyan-300/[0.10] bg-cyan-400/[0.02] px-2 text-[10px] font-semibold text-cyan-300/65 transition-colors hover:bg-cyan-400/[0.045] disabled:cursor-default disabled:opacity-30"
    >
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
    <section className="overflow-hidden rounded-[24px] border border-emerald-200/[0.10] bg-black/[0.22] p-4 backdrop-blur-xl">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300/70">Property rulebook</div>
        <p className="mt-1 text-[12px] text-stone-500">These are permissions for rewriting expressions without changing their value.</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {PROPERTIES.map((property) => {
          const active = property.id === activeId;
          return (
            <button
              key={property.id}
              type="button"
              onClick={() => onSelect(property.id)}
              className="h-11 rounded-xl border px-2 text-[10px] font-semibold transition-colors"
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

      <div className="mt-3 grid gap-3 rounded-[18px] border border-white/[0.05] bg-white/[0.012] p-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex min-h-[150px] items-center justify-center rounded-[16px] border border-white/[0.045] bg-black/[0.17] p-4 text-center">
          <div>
            <div className="font-mono text-[20px] font-semibold leading-8" style={{ color: `rgb(${activeProperty.rgb})` }}>
              {activeProperty.equation}
            </div>
            <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-600">equivalent forms</div>
          </div>
        </div>
        <div className="grid gap-2">
          <RuleNote icon={Check} label="Allows" text={activeProperty.action} rgb={activeProperty.rgb} />
          <RuleNote icon={Braces} label="Boundary" text={activeProperty.caution} rgb="251, 113, 133" />
        </div>
      </div>
    </section>
  );
}

function RuleNote({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return (
    <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-white/[0.045] bg-black/[0.14] p-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}>
        <Icon size={15} />
      </span>
      <span>
        <strong className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-500">{label}</strong>
        <span className="mt-1 block text-[11px] leading-5 text-stone-400">{text}</span>
      </span>
    </div>
  );
}

function NumberSystemMap() {
  return (
    <section className="overflow-hidden rounded-[24px] border border-amber-200/[0.10] bg-black/[0.22] p-4 backdrop-blur-xl">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300/70">Number system map</div>
        <p className="mt-1 text-[12px] text-stone-500">Algebra depends on knowing which values and operations are available.</p>
      </div>

      <div className="mt-4 rounded-[18px] border border-emerald-300/[0.13] bg-emerald-400/[0.025] p-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-mono text-[18px] font-semibold text-emerald-200">ℝ Real numbers</div>
            <div className="mt-1 text-[10px] text-stone-500">Every point on the ordinary number line</div>
          </div>
          <Hash size={18} className="text-emerald-300/35" />
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1.35fr)_minmax(150px,0.65fr)]">
          <div className="rounded-[15px] border border-cyan-300/[0.14] bg-cyan-400/[0.025] p-3">
            <div className="font-mono text-[14px] font-semibold text-cyan-200">ℚ Rational</div>
            <div className="mt-1 text-[10px] text-stone-500">Fractions; terminating or repeating decimals</div>

            <div className="mt-3 rounded-[13px] border border-blue-300/[0.14] bg-blue-400/[0.025] p-3">
              <div className="font-mono text-[13px] font-semibold text-blue-200">ℤ Integers</div>
              <div className="mt-1 text-[10px] text-stone-500">… −2, −1, 0, 1, 2 …</div>

              <div className="mt-2 rounded-[11px] border border-violet-300/[0.13] bg-violet-400/[0.025] px-3 py-2">
                <div className="font-mono text-[12px] font-semibold text-violet-200">ℕ Natural</div>
                <div className="mt-1 text-[9px] text-stone-500">1, 2, 3, … · some conventions include 0</div>
              </div>
            </div>
          </div>

          <div className="flex min-h-[170px] flex-col justify-between rounded-[15px] border border-amber-300/[0.14] bg-amber-400/[0.025] p-3">
            <div>
              <div className="font-mono text-[14px] font-semibold text-amber-200">Irrational</div>
              <div className="mt-1 text-[10px] leading-4 text-stone-500">Non-terminating, non-repeating decimals</div>
            </div>
            <div className="font-serif text-[42px] text-center text-amber-100/80">π · √2</div>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-white/[0.045] bg-white/[0.012] p-3">
          <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-stone-600">Equation can expand the set</div>
          <div className="mt-2 font-mono text-[12px] text-cyan-300/75">x² = 2 → √2</div>
        </div>
        <div className="rounded-xl border border-white/[0.045] bg-white/[0.012] p-3">
          <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-stone-600">Later: beyond the reals</div>
          <div className="mt-2 font-mono text-[12px] text-amber-300/75">x² = −1 → i</div>
        </div>
      </div>
    </section>
  );
}
