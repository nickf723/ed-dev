"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MoveHorizontal,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Assessment from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import GeneratedPractice from "@/app/_components/GeneratedPractice";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import { inequalitiesQuiz } from "./_components/assessment";
import { generateInequalityPracticeQuestion } from "./_components/InequalitiesPracticeGenerator";
import InequalitiesBackground from "./_components/InequalitiesBackgroundV2";

type Relation = "<" | "≤" | ">" | "≥";
type StudioMode = "see" | "solve" | "build" | "test" | "combine";
type CompoundMode = "and" | "or";

type SolvedInequality = {
  boundary: number;
  relation: Relation;
  greater: boolean;
  inclusive: boolean;
  interval: string;
};

type Marker = {
  value: number;
  valid: boolean;
  label: string;
};

type WorkedExample = {
  id: string;
  label: string;
  source: string;
  steps: readonly string[];
  actions: readonly string[];
  relation: Relation;
  boundary: number;
  note: string;
};

const COEFFICIENTS = [-3, -2, -1, 1, 2, 3] as const;
const RELATIONS: readonly Relation[] = ["<", "≤", ">", "≥"];
const NUMBER_MIN = -10;
const NUMBER_MAX = 10;

const STUDIO_MODES: readonly { id: StudioMode; label: string; hint: string }[] = [
  { id: "see", label: "See", hint: "many solutions" },
  { id: "solve", label: "Solve", hint: "worked examples" },
  { id: "build", label: "Build", hint: "change the rule" },
  { id: "test", label: "Test", hint: "check membership" },
  { id: "combine", label: "Combine", hint: "two boundaries" },
];

const REFERENCE_ROWS: readonly {
  symbol: Relation;
  read: string;
  direction: string;
  endpoint: string;
  interval: string;
}[] = [
  { symbol: "<", read: "less than", direction: "←", endpoint: "○", interval: "(−∞, 3)" },
  { symbol: "≤", read: "less than or equal", direction: "←", endpoint: "●", interval: "(−∞, 3]" },
  { symbol: ">", read: "greater than", direction: "→", endpoint: "○", interval: "(3, ∞)" },
  { symbol: "≥", read: "greater than or equal", direction: "→", endpoint: "●", interval: "[3, ∞)" },
];

const WORKED_EXAMPLES: readonly WorkedExample[] = [
  {
    id: "positive",
    label: "A · positive coefficient",
    source: "2x + 1 < 7",
    steps: ["2x + 1 < 7", "2x < 6", "x < 3"],
    actions: ["subtract 1", "divide by 2"],
    relation: "<",
    boundary: 3,
    note: "Positive division keeps the inequality direction.",
  },
  {
    id: "inclusive",
    label: "B · included boundary",
    source: "3x − 4 ≥ 8",
    steps: ["3x − 4 ≥ 8", "3x ≥ 12", "x ≥ 4"],
    actions: ["add 4", "divide by 3"],
    relation: "≥",
    boundary: 4,
    note: "The equality bar means the boundary 4 belongs to the solution set.",
  },
  {
    id: "negative",
    label: "C · negative coefficient",
    source: "−2x + 1 < 7",
    steps: ["−2x + 1 < 7", "−2x < 6", "x > −3"],
    actions: ["subtract 1", "divide by −2 · reverse order"],
    relation: ">",
    boundary: -3,
    note: "Negative division reflects order, so < reverses to >.",
  },
];

export default function InequalitiesPage() {
  const [studioMode, setStudioMode] = useState<StudioMode>("see");
  const [introProbe, setIntroProbe] = useState(2);
  const [workedExampleIndex, setWorkedExampleIndex] = useState(0);
  const [coefficient, setCoefficient] = useState(2);
  const [constant, setConstant] = useState(1);
  const [rightSide, setRightSide] = useState(7);
  const [relation, setRelation] = useState<Relation>("<");
  const [testerProbe, setTesterProbe] = useState(0);
  const [compoundMode, setCompoundMode] = useState<CompoundMode>("and");

  const seeSolution = useMemo(() => solveLinearInequality(1, 0, 3, "<"), []);
  const buildSolution = useMemo(
    () => solveLinearInequality(coefficient, constant, rightSide, relation),
    [coefficient, constant, rightSide, relation],
  );
  const testSolution = useMemo(() => solveLinearInequality(1, 0, -2, "≥"), []);
  const workedExample = WORKED_EXAMPLES[workedExampleIndex];
  const workedSolution = useMemo(
    () => solutionFromBoundary(workedExample.boundary, workedExample.relation),
    [workedExample],
  );

  const activeSolution = studioMode === "solve"
    ? workedSolution
    : studioMode === "build"
      ? buildSolution
      : studioMode === "test"
        ? testSolution
        : seeSolution;

  const activeEquation = studioMode === "solve"
    ? workedExample.source
    : studioMode === "build"
      ? `${formatLinearExpression(coefficient, constant)} ${relation} ${rightSide}`
      : studioMode === "test"
        ? "x ≥ −2"
        : "x < 3";

  const activeMarker: Marker | undefined = studioMode === "see"
    ? { value: introProbe, valid: introProbe < 3, label: `x = ${introProbe}` }
    : studioMode === "test"
      ? { value: testerProbe, valid: compare(testerProbe, -2, "≥"), label: `x = ${formatNumber(testerProbe)}` }
      : undefined;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#071426] text-slate-100 selection:bg-sky-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.46]">
        <InequalitiesBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_76%_12%,rgba(14,165,233,0.045),transparent_31%),linear-gradient(to_bottom,rgba(7,20,38,0.12),rgba(3,8,18,0.76))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1340px] px-4 py-5 sm:px-6 xl:px-8">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Formal Sciences", href: "/formal-science" },
            { label: "Mathematics", href: "/formal-science/mathematics" },
            { label: "Algebra", href: "/formal-science/mathematics/algebra" },
            { label: "Integrated Algebra", href: "/formal-science/mathematics/algebra/elementary-algebra" },
            { label: "Algebraic Inequalities" },
          ]}
          eyebrow="One boundary · many solutions"
          icon={MoveHorizontal}
          title={<span>Algebraic Inequalities</span>}
          subtitle="Turn a comparison into a region of allowed values, then learn to solve, build, test, and combine those regions."
          accentRgb="14, 165, 233"
          titleClassName="font-mono text-[clamp(2.55rem,4.6vw,5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.058em] text-[#f5fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-sky-300/[0.12]"
          aside={
            <div className="rounded-full border border-sky-300/[0.12] bg-black/25 px-4 py-2 font-mono text-[12px] text-sky-200/80 backdrop-blur-md">
              x &lt; 3 → (−∞, 3)
            </div>
          }
        />

        <LessonUtilityBar
          referenceTargetId="inequality-reference"
          practiceTargetId="inequality-practice"
          vocabulary
          accentRgb="14, 165, 233"
        />

        <ReferenceStrip />

        <section className="mt-4 overflow-hidden rounded-[28px] border border-sky-200/[0.12] bg-[#040d18]/90 shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-xl">
          <div className="grid border-b border-white/[0.055] sm:grid-cols-5">
            {STUDIO_MODES.map((mode) => {
              const active = studioMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setStudioMode(mode.id)}
                  className={`min-h-[62px] border-b border-white/[0.04] px-4 py-3 text-left transition-colors sm:border-b-0 sm:border-r sm:last:border-r-0 ${
                    active ? "bg-sky-400/[0.065]" : "bg-black/[0.08] hover:bg-white/[0.018]"
                  }`}
                >
                  <strong className={`block text-[12px] ${active ? "text-sky-200" : "text-slate-400"}`}>{mode.label}</strong>
                  <span className="mt-0.5 block text-[9px] text-slate-600">{mode.hint}</span>
                </button>
              );
            })}
          </div>

          <div className="px-5 pb-5 pt-4 sm:px-7 sm:pb-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-sky-300/65">Inequality studio</div>
                <div className="mt-1 font-mono text-[clamp(2rem,4vw,3.6rem)] font-semibold tracking-[-0.04em] text-white">
                  {studioMode === "combine" ? (compoundMode === "and" ? "−2 < x ≤ 5" : "x < −3  or  x > 4") : activeEquation}
                </div>
              </div>
              {studioMode !== "combine" ? (
                <div className="text-left sm:text-right">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.11em] text-slate-600">Solution</div>
                  <div className="mt-1 font-mono text-[16px] text-sky-200">
                    x {activeSolution.relation} {formatNumber(activeSolution.boundary)}
                    <span className="mx-2 text-slate-700">·</span>
                    <span className="text-amber-200">{activeSolution.interval}</span>
                  </div>
                </div>
              ) : (
                <div className="font-mono text-[13px] text-indigo-200/80">
                  {compoundMode === "and" ? "intersection" : "union"}
                </div>
              )}
            </div>

            <div className="mt-4 border-y border-white/[0.055] py-3">
              {studioMode === "combine" ? (
                <CompoundNumberLine variant={compoundMode} />
              ) : (
                <StudioNumberLine solution={activeSolution} marker={activeMarker} />
              )}
            </div>

            <div className="pt-4">
              {studioMode === "see" ? (
                <SeeControls value={introProbe} onChange={setIntroProbe} />
              ) : null}

              {studioMode === "solve" ? (
                <SolveControls
                  activeIndex={workedExampleIndex}
                  onSelect={setWorkedExampleIndex}
                  example={workedExample}
                />
              ) : null}

              {studioMode === "build" ? (
                <BuildControls
                  coefficient={coefficient}
                  constant={constant}
                  rightSide={rightSide}
                  relation={relation}
                  solution={buildSolution}
                  onCoefficient={setCoefficient}
                  onConstant={setConstant}
                  onRightSide={setRightSide}
                  onRelation={setRelation}
                />
              ) : null}

              {studioMode === "test" ? (
                <TestControls value={testerProbe} onChange={setTesterProbe} />
              ) : null}

              {studioMode === "combine" ? (
                <CombineControls value={compoundMode} onChange={setCompoundMode} />
              ) : null}
            </div>
          </div>
        </section>

        <section id="inequality-practice" className="scroll-mt-24 mt-4 space-y-3">
          <GeneratedPractice
            title="Practice for as long as it helps"
            description="Generated problems mix solving, interval notation, and membership. New numbers, same underlying structures."
            generator={generateInequalityPracticeQuestion}
            accentRgb="52, 211, 153"
          />

          <details className="group rounded-[20px] border border-white/[0.07] bg-black/[0.16] backdrop-blur-xl">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.13em] text-cyan-300/65">Concept check</span>
                <strong className="mt-1 block text-[15px] text-slate-200">Four questions when you want a checkpoint</strong>
              </span>
              <span className="rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-2 text-[10px] text-slate-500 group-open:hidden">open</span>
            </summary>
            <div className="border-t border-white/[0.05] p-3 sm:p-4">
              <Assessment title="Inequalities concept check" questions={inequalitiesQuiz} accentColor="cyan" />
            </div>
          </details>
        </section>

        <TopicNavigation />
      </div>
    </main>
  );
}

function ReferenceStrip() {
  return (
    <section id="inequality-reference" className="scroll-mt-24 mt-4 grid gap-3 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
      <div className="overflow-hidden rounded-[18px] border border-white/[0.065] bg-black/[0.15] backdrop-blur-lg">
        <div className="border-b border-white/[0.05] px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-sky-300/65">
          Read the inequality sign
        </div>
        <table className="w-full border-collapse">
          <tbody>
            {REFERENCE_ROWS.map((row) => (
              <tr key={row.symbol} className="border-t border-white/[0.035] first:border-t-0">
                <td className="w-14 px-4 py-2 font-mono text-[20px] text-sky-200">{row.symbol}</td>
                <td className="px-2 py-2 text-[11px] text-slate-400">{row.read}</td>
                <td className="w-24 px-2 py-2 text-center font-mono text-[14px] text-indigo-200">{row.direction} {row.endpoint}</td>
                <td className="w-32 px-4 py-2 text-right font-mono text-[11px] text-amber-200">{row.interval}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-hidden rounded-[18px] border border-white/[0.065] bg-black/[0.15] backdrop-blur-lg">
        <div className="border-b border-white/[0.05] px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-300/65">
          Interval notation
        </div>
        <table className="w-full border-collapse text-[11px]">
          <tbody>
            <tr className="border-b border-white/[0.04]">
              <td className="w-20 px-4 py-3 font-mono text-[18px] text-amber-200">( )</td>
              <td className="px-2 py-3 text-slate-400">endpoint excluded</td>
              <td className="px-4 py-3 text-right font-mono text-slate-600">x &lt; 3</td>
            </tr>
            <tr className="border-b border-white/[0.04]">
              <td className="px-4 py-3 font-mono text-[18px] text-amber-200">[ ]</td>
              <td className="px-2 py-3 text-slate-400">endpoint included</td>
              <td className="px-4 py-3 text-right font-mono text-slate-600">x ≤ 3</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-[18px] text-amber-200">∞</td>
              <td className="px-2 py-3 text-slate-400">never an endpoint value</td>
              <td className="px-4 py-3 text-right font-mono text-slate-600">always ( )</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SeeControls({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const valid = value < 3;
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <strong className="text-[13px] text-slate-200">One inequality can have many solutions.</strong>
        <p className="mt-1 text-[11px] text-slate-500">Try a value. The ray already shows every value that works.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {[2, 3, 4].map((candidate) => (
          <button
            key={candidate}
            type="button"
            onClick={() => onChange(candidate)}
            className={`rounded-lg border px-4 py-2 font-mono text-[12px] ${
              value === candidate
                ? candidate < 3
                  ? "border-emerald-300/[0.30] bg-emerald-400/[0.055] text-emerald-200"
                  : "border-rose-300/[0.24] bg-rose-400/[0.04] text-rose-200"
                : "border-white/[0.05] text-slate-500 hover:text-white"
            }`}
          >
            x = {candidate}
          </button>
        ))}
        <span className={`ml-1 inline-flex items-center gap-2 text-[11px] ${valid ? "text-emerald-300" : "text-rose-300"}`}>
          {valid ? <Check size={13} /> : <X size={13} />}
          {valid ? "belongs" : value === 3 ? "boundary excluded" : "outside"}
        </span>
      </div>
    </div>
  );
}

function SolveControls({
  activeIndex,
  onSelect,
  example,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  example: WorkedExample;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {WORKED_EXAMPLES.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(index)}
            className={`rounded-lg border px-3 py-2 text-left text-[10px] font-semibold ${
              activeIndex === index
                ? "border-sky-300/[0.24] bg-sky-400/[0.055] text-sky-100"
                : "border-white/[0.05] text-slate-500 hover:text-slate-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <TransformationRibbon steps={example.steps} actions={example.actions} />
      <p className="mt-2 text-[11px] text-slate-500">{example.note}</p>
    </div>
  );
}

function BuildControls({
  coefficient,
  constant,
  rightSide,
  relation,
  solution,
  onCoefficient,
  onConstant,
  onRightSide,
  onRelation,
}: {
  coefficient: number;
  constant: number;
  rightSide: number;
  relation: Relation;
  solution: SolvedInequality;
  onCoefficient: (value: number) => void;
  onConstant: (value: number) => void;
  onRightSide: (value: number) => void;
  onRelation: (value: Relation) => void;
}) {
  const movedRight = rightSide - constant;
  const steps = [
    `${formatLinearExpression(coefficient, constant)} ${relation} ${rightSide}`,
    `${formatCoefficientTerm(coefficient)} ${relation} ${formatNumber(movedRight)}`,
    `x ${solution.relation} ${formatNumber(solution.boundary)}`,
  ];
  const actions = [
    constant === 0 ? "constant already zero" : constant > 0 ? `subtract ${constant}` : `add ${Math.abs(constant)}`,
    coefficient < 0 ? `divide by ${coefficient} · reverse order` : `divide by ${coefficient}`,
  ];

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-600">Coefficient</div>
          <div className="grid grid-cols-6 gap-1">
            {COEFFICIENTS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => onCoefficient(value)}
                className={`h-9 rounded-lg border font-mono text-[10px] ${coefficient === value ? "border-sky-300/[0.26] bg-sky-400/[0.055] text-sky-200" : "border-white/[0.05] text-slate-600"}`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <CompactSlider label="Constant" value={constant} min={-5} max={5} onChange={onConstant} />
        <div>
          <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-600">Relation</div>
          <div className="grid grid-cols-4 gap-1.5">
            {RELATIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onRelation(item)}
                className={`h-9 rounded-lg border font-mono text-[13px] ${relation === item ? "border-sky-300/[0.26] bg-sky-400/[0.055] text-sky-200" : "border-white/[0.05] text-slate-600"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <CompactSlider label="Right side" value={rightSide} min={-6} max={8} onChange={onRightSide} />
      </div>
      <TransformationRibbon steps={steps} actions={actions} />
    </div>
  );
}

function TestControls({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const valid = compare(value, -2, "≥");
  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div>
        <strong className="text-[13px] text-slate-200">Testing is not another solving step.</strong>
        <p className="mt-1 text-[11px] text-slate-500">The region is already x ≥ −2. Substitute one candidate and ask whether the statement is true.</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate-400">
          <span>x = {formatNumber(value)}</span>
          <span className="text-slate-700">→</span>
          <span>{formatNumber(value)} ≥ −2</span>
          <span className="text-slate-700">→</span>
          <span className={valid ? "text-emerald-300" : "text-rose-300"}>{valid ? "true" : "false"}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {[-3, -2, 0, 4].map((candidate) => (
          <button
            key={candidate}
            type="button"
            onClick={() => onChange(candidate)}
            className={`rounded-lg border px-4 py-2 font-mono text-[11px] ${value === candidate ? "border-emerald-300/[0.26] bg-emerald-400/[0.05] text-emerald-200" : "border-white/[0.05] text-slate-500 hover:text-white"}`}
          >
            {candidate}
          </button>
        ))}
      </div>
    </div>
  );
}

function CombineControls({ value, onChange }: { value: CompoundMode; onChange: (value: CompoundMode) => void }) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <strong className="text-[13px] text-slate-200">
          {value === "and" ? "AND keeps the overlap." : "OR keeps either region."}
        </strong>
        <p className="mt-1 text-[11px] text-slate-500">
          {value === "and"
            ? "Both conditions must be true, so only the interval shared by them survives."
            : "Either condition may be true, so the two outer rays are combined."}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {(["and", "or"] as const).map((candidate) => (
          <button
            key={candidate}
            type="button"
            onClick={() => onChange(candidate)}
            className={`rounded-lg border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${value === candidate ? "border-indigo-300/[0.28] bg-indigo-400/[0.06] text-indigo-200" : "border-white/[0.05] text-slate-500"}`}
          >
            {candidate}
          </button>
        ))}
      </div>
    </div>
  );
}

function TransformationRibbon({ steps, actions }: { steps: readonly string[]; actions: readonly string[] }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <div className="grid min-w-[720px] grid-cols-[1fr_110px_1fr_110px_1fr] items-center border-y border-white/[0.045] py-3">
        <RibbonEquation value={steps[0]} />
        <RibbonAction value={actions[0]} />
        <RibbonEquation value={steps[1]} />
        <RibbonAction value={actions[1]} />
        <RibbonEquation value={steps[2]} accent />
      </div>
    </div>
  );
}

function RibbonEquation({ value, accent = false }: { value: string; accent?: boolean }) {
  return <div className={`px-3 text-center font-mono text-[17px] font-semibold ${accent ? "text-sky-200" : "text-slate-300"}`}>{value}</div>;
}

function RibbonAction({ value }: { value: string }) {
  return (
    <div className="text-center">
      <div className="text-[8px] font-semibold uppercase tracking-[0.08em] text-slate-600">{value}</div>
      <div className="mt-1 text-slate-700">→</div>
    </div>
  );
}

function CompactSlider({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-600">
        {label}
        <span className="font-mono text-sky-300">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-9 w-full cursor-pointer accent-sky-400"
      />
    </label>
  );
}

function StudioNumberLine({ solution, marker }: { solution: SolvedInequality; marker?: Marker }) {
  const width = 1000;
  const height = 250;
  const left = 70;
  const right = width - 70;
  const y = 145;
  const xFor = (value: number) => left + ((value - NUMBER_MIN) / (NUMBER_MAX - NUMBER_MIN)) * (right - left);
  const boundaryX = xFor(clamp(solution.boundary, NUMBER_MIN, NUMBER_MAX));
  const markerX = marker ? xFor(clamp(marker.value, NUMBER_MIN, NUMBER_MAX)) : 0;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" aria-label={`Number line showing x ${solution.relation} ${formatNumber(solution.boundary)}`}>
      <line x1={left} y1={y} x2={right} y2={y} stroke="rgba(148,163,184,0.42)" strokeWidth="2" />
      {Array.from({ length: 21 }, (_, index) => NUMBER_MIN + index).map((value) => {
        const x = xFor(value);
        return (
          <g key={value}>
            <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="rgba(148,163,184,0.32)" />
            {value % 2 === 0 ? <text x={x} y={y + 30} fill="rgba(148,163,184,0.46)" fontSize="11" textAnchor="middle">{value}</text> : null}
          </g>
        );
      })}
      <line
        x1={solution.greater ? boundaryX : left}
        y1={y}
        x2={solution.greater ? right : boundaryX}
        y2={y}
        stroke="#38bdf8"
        strokeWidth="15"
        strokeLinecap="round"
        opacity="0.74"
      />
      <circle cx={boundaryX} cy={y} r="12" fill={solution.inclusive ? "#38bdf8" : "#040d18"} stroke="#38bdf8" strokeWidth="4" />
      <text x={boundaryX} y={y - 30} fill="#7dd3fc" fontSize="12" textAnchor="middle">boundary {formatNumber(solution.boundary)}</text>
      {marker ? (
        <>
          <line x1={markerX} y1={y - 76} x2={markerX} y2={y - 22} stroke={marker.valid ? "#34d399" : "#fb7185"} strokeWidth="2" strokeDasharray="5 4" />
          <circle cx={markerX} cy={y - 84} r="7" fill={marker.valid ? "#34d399" : "#fb7185"} />
          <text x={markerX} y={y - 103} fill={marker.valid ? "#6ee7b7" : "#fda4af"} fontSize="11" textAnchor="middle">{marker.label}</text>
        </>
      ) : null}
    </svg>
  );
}

function CompoundNumberLine({ variant }: { variant: CompoundMode }) {
  const width = 1000;
  const height = 250;
  const left = 70;
  const right = width - 70;
  const y = 145;
  const xFor = (value: number) => left + ((value - NUMBER_MIN) / (NUMBER_MAX - NUMBER_MIN)) * (right - left);

  const first = variant === "and" ? -2 : -3;
  const second = variant === "and" ? 5 : 4;
  const firstX = xFor(first);
  const secondX = xFor(second);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" aria-label={variant === "and" ? "Compound inequality intersection" : "Compound inequality union"}>
      <line x1={left} y1={y} x2={right} y2={y} stroke="rgba(148,163,184,0.42)" strokeWidth="2" />
      {Array.from({ length: 21 }, (_, index) => NUMBER_MIN + index).map((value) => {
        const x = xFor(value);
        return (
          <g key={value}>
            <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="rgba(148,163,184,0.32)" />
            {value % 2 === 0 ? <text x={x} y={y + 30} fill="rgba(148,163,184,0.46)" fontSize="11" textAnchor="middle">{value}</text> : null}
          </g>
        );
      })}
      {variant === "and" ? (
        <line x1={firstX} y1={y} x2={secondX} y2={y} stroke="#818cf8" strokeWidth="15" strokeLinecap="round" opacity="0.76" />
      ) : (
        <>
          <line x1={left} y1={y} x2={firstX} y2={y} stroke="#818cf8" strokeWidth="15" strokeLinecap="round" opacity="0.76" />
          <line x1={secondX} y1={y} x2={right} y2={y} stroke="#818cf8" strokeWidth="15" strokeLinecap="round" opacity="0.76" />
        </>
      )}
      <circle cx={firstX} cy={y} r="12" fill="#040d18" stroke="#818cf8" strokeWidth="4" />
      <circle cx={secondX} cy={y} r="12" fill={variant === "and" ? "#818cf8" : "#040d18"} stroke="#818cf8" strokeWidth="4" />
      <text x={firstX} y={y - 30} fill="#a5b4fc" fontSize="12" textAnchor="middle">{first}</text>
      <text x={secondX} y={y - 30} fill="#a5b4fc" fontSize="12" textAnchor="middle">{second}</text>
    </svg>
  );
}

function TopicNavigation() {
  return (
    <nav className="mt-4 pb-8" aria-label="Inequalities navigation">
      <div className="mb-2">
        <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300">
          <ArrowLeft size={12} /> Integrated Algebra map
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations" className="group flex min-h-[70px] items-center gap-3 rounded-[16px] border border-cyan-300/[0.09] bg-black/[0.17] px-4 py-3 transition-colors hover:border-cyan-300/[0.18]">
          <ArrowLeft size={14} className="text-cyan-300 transition-transform group-hover:-translate-x-0.5" />
          <span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Previous topic</span>
            <strong className="mt-0.5 block text-[14px] text-slate-200">Systems of Equations</strong>
          </span>
        </Link>
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/inequalities/systems" className="group flex min-h-[70px] items-center gap-3 rounded-[16px] border border-indigo-300/[0.12] bg-indigo-400/[0.02] px-4 py-3 transition-colors hover:border-indigo-300/[0.22]">
          <span className="min-w-0 flex-1 text-right">
            <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-indigo-300/60">Next lesson</span>
            <strong className="mt-0.5 block text-[14px] text-slate-200">Systems of Inequalities</strong>
          </span>
          <ArrowRight size={14} className="text-indigo-300 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </nav>
  );
}

function solveLinearInequality(a: number, c: number, r: number, relation: Relation): SolvedInequality {
  const boundary = (r - c) / a;
  const normalizedRelation = a < 0 ? flipRelation(relation) : relation;
  const greater = normalizedRelation === ">" || normalizedRelation === "≥";
  const inclusive = normalizedRelation === "≤" || normalizedRelation === "≥";
  return {
    boundary,
    relation: normalizedRelation,
    greater,
    inclusive,
    interval: intervalFor(boundary, normalizedRelation),
  };
}

function solutionFromBoundary(boundary: number, relation: Relation): SolvedInequality {
  const greater = relation === ">" || relation === "≥";
  const inclusive = relation === "≤" || relation === "≥";
  return { boundary, relation, greater, inclusive, interval: intervalFor(boundary, relation) };
}

function intervalFor(boundary: number, relation: Relation) {
  const value = formatNumber(boundary);
  if (relation === ">") return `(${value}, ∞)`;
  if (relation === "≥") return `[${value}, ∞)`;
  if (relation === "<") return `(−∞, ${value})`;
  return `(−∞, ${value}]`;
}

function flipRelation(relation: Relation): Relation {
  if (relation === "<") return ">";
  if (relation === "≤") return "≥";
  if (relation === ">") return "<";
  return "≤";
}

function compare(left: number, right: number, relation: Relation) {
  if (relation === "<") return left < right;
  if (relation === "≤") return left <= right;
  if (relation === ">") return left > right;
  return left >= right;
}

function formatLinearExpression(a: number, c: number) {
  const ax = formatCoefficientTerm(a);
  if (c === 0) return ax;
  return `${ax} ${c > 0 ? "+" : "−"} ${Math.abs(c)}`;
}

function formatCoefficientTerm(a: number) {
  if (a === 1) return "x";
  if (a === -1) return "−x";
  return `${a}x`;
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : Number(value.toFixed(2)).toString();
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
