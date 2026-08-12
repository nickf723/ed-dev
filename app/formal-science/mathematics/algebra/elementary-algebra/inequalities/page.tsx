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
type StudioMode = "see" | "solve" | "try" | "test" | "combine";
type CompoundMode = "and" | "or";
type PracticeMode = "check" | "drill";

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

const RELATIONS: readonly Relation[] = ["<", "≤", ">", "≥"];
const NUMBER_MIN = -10;
const NUMBER_MAX = 10;

const STUDIO_MODES: readonly { id: StudioMode; label: string }[] = [
  { id: "see", label: "See" },
  { id: "solve", label: "Solve" },
  { id: "try", label: "Try" },
  { id: "test", label: "Test" },
  { id: "combine", label: "Combine" },
];

const REFERENCE_ROWS: readonly {
  symbol: Relation;
  read: string;
  direction: string;
  boundary: string;
}[] = [
  { symbol: "<", read: "less than", direction: "Left ←", boundary: "Open ○" },
  { symbol: "≤", read: "less than or equal", direction: "Left ←", boundary: "Closed ●" },
  { symbol: ">", read: "greater than", direction: "Right →", boundary: "Open ○" },
  { symbol: "≥", read: "greater than or equal", direction: "Right →", boundary: "Closed ●" },
];

const WORKED_EXAMPLES: readonly WorkedExample[] = [
  {
    id: "example-1",
    label: "Example 1",
    source: "2x + 1 < 7",
    steps: ["2x + 1 < 7", "2x < 6", "x < 3"],
    actions: ["subtract 1", "divide by 2"],
    relation: "<",
    boundary: 3,
    note: "The same inequality sign remains because the final division is by a positive number.",
  },
  {
    id: "example-2",
    label: "Example 2",
    source: "3x − 4 ≥ 8",
    steps: ["3x − 4 ≥ 8", "3x ≥ 12", "x ≥ 4"],
    actions: ["add 4", "divide by 3"],
    relation: "≥",
    boundary: 4,
    note: "The equality bar means the boundary value 4 is included in the solution set.",
  },
  {
    id: "example-3",
    label: "Example 3",
    source: "−2x + 1 < 7",
    steps: ["−2x + 1 < 7", "−2x < 6", "x > −3"],
    actions: ["subtract 1", "divide by −2 · reverse order"],
    relation: ">",
    boundary: -3,
    note: "Dividing by a negative reverses the order, so < becomes >.",
  },
];

export default function InequalitiesPage() {
  const [studioMode, setStudioMode] = useState<StudioMode>("see");
  const [introProbe, setIntroProbe] = useState(2);
  const [workedExampleIndex, setWorkedExampleIndex] = useState(0);
  const [tryBoundary, setTryBoundary] = useState(3);
  const [tryRelation, setTryRelation] = useState<Relation>("<");
  const [testerProbe, setTesterProbe] = useState(0);
  const [compoundMode, setCompoundMode] = useState<CompoundMode>("and");
  const [practiceMode, setPracticeMode] = useState<PracticeMode>("check");

  const [teacherCoefficient, setTeacherCoefficient] = useState(2);
  const [teacherConstant, setTeacherConstant] = useState(1);
  const [teacherRightSide, setTeacherRightSide] = useState(7);
  const [teacherRelation, setTeacherRelation] = useState<Relation>("<");

  const seeSolution = useMemo(() => solveLinearInequality(1, 0, 3, "<"), []);
  const trySolution = useMemo(
    () => solutionFromBoundary(tryBoundary, tryRelation),
    [tryBoundary, tryRelation],
  );
  const testSolution = useMemo(() => solveLinearInequality(1, 0, -2, "≥"), []);
  const workedExample = WORKED_EXAMPLES[workedExampleIndex];
  const workedSolution = useMemo(
    () => solutionFromBoundary(workedExample.boundary, workedExample.relation),
    [workedExample],
  );
  const teacherSolution = useMemo(
    () => solveLinearInequality(teacherCoefficient, teacherConstant, teacherRightSide, teacherRelation),
    [teacherCoefficient, teacherConstant, teacherRightSide, teacherRelation],
  );

  const activeSolution = studioMode === "solve"
    ? workedSolution
    : studioMode === "try"
      ? trySolution
      : studioMode === "test"
        ? testSolution
        : seeSolution;

  const activeEquation = studioMode === "solve"
    ? workedExample.source
    : studioMode === "try"
      ? `x ${tryRelation} ${formatNumber(tryBoundary)}`
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
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.78]">
        <InequalitiesBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_12%,rgba(14,165,233,0.025),transparent_32%),linear-gradient(to_bottom,rgba(7,20,38,0.04),rgba(3,8,18,0.48))]" />

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
          subtitle="Read an inequality as a region, solve it, then test which values belong."
          accentRgb="14, 165, 233"
          titleClassName="font-mono text-[clamp(2.55rem,4.6vw,5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.058em] text-[#f5fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-sky-300/[0.12] bg-[#06111e]/30 backdrop-blur-xl"
          aside={
            <div className="rounded-full border border-sky-300/[0.12] bg-black/20 px-4 py-2 font-mono text-[12px] text-sky-200/80 backdrop-blur-xl">
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

        <section className="mt-4 overflow-hidden rounded-[30px] border border-sky-200/[0.15] bg-[linear-gradient(145deg,rgba(4,13,24,0.64),rgba(7,25,40,0.46))] shadow-[0_34px_110px_rgba(0,0,0,0.30),inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-2xl">
          <div className="grid border-b border-white/[0.065] bg-black/[0.10] sm:grid-cols-5">
            {STUDIO_MODES.map((mode) => {
              const active = studioMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setStudioMode(mode.id)}
                  className={`min-h-[54px] border-b border-white/[0.04] px-4 py-3 text-center transition-colors sm:border-b-0 sm:border-r sm:last:border-r-0 ${
                    active ? "bg-sky-400/[0.075] text-sky-100" : "text-slate-500 hover:bg-white/[0.02] hover:text-slate-300"
                  }`}
                >
                  <strong className="text-[12px]">{mode.label}</strong>
                </button>
              );
            })}
          </div>

          <div className="px-5 pb-5 pt-5 sm:px-7 sm:pb-7">
            <div className="grid min-h-[78px] gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-sky-300/65">Inequality studio</div>
                <div className="mt-1 font-mono text-[clamp(2rem,4vw,3.7rem)] font-semibold tracking-[-0.04em] text-white">
                  {studioMode === "combine" ? (compoundMode === "and" ? "−2 < x ≤ 5" : "x < −3  or  x > 4") : activeEquation}
                </div>
              </div>
              {studioMode !== "combine" ? (
                <div className="sm:text-right">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.11em] text-slate-600">Solution</div>
                  <div className="mt-1 font-mono text-[15px] text-sky-200">
                    x {activeSolution.relation} {formatNumber(activeSolution.boundary)}
                    <span className="mx-2 text-slate-700">·</span>
                    <span className="text-amber-200">{activeSolution.interval}</span>
                  </div>
                </div>
              ) : (
                <div className="font-mono text-[13px] text-indigo-200/80 sm:text-right">
                  {compoundMode === "and" ? "intersection" : "union"}
                </div>
              )}
            </div>

            <div className="mt-4 min-h-[255px] border-y border-white/[0.06] bg-black/[0.06] py-3">
              {studioMode === "combine" ? (
                <CompoundNumberLine variant={compoundMode} />
              ) : (
                <StudioNumberLine solution={activeSolution} marker={activeMarker} />
              )}
            </div>

            <div className="min-h-[168px] pt-4">
              {studioMode === "see" ? <SeeControls value={introProbe} onChange={setIntroProbe} /> : null}
              {studioMode === "solve" ? (
                <SolveControls
                  activeIndex={workedExampleIndex}
                  onSelect={setWorkedExampleIndex}
                  example={workedExample}
                />
              ) : null}
              {studioMode === "try" ? (
                <TryControls
                  boundary={tryBoundary}
                  relation={tryRelation}
                  onBoundary={setTryBoundary}
                  onRelation={setTryRelation}
                />
              ) : null}
              {studioMode === "test" ? <TestControls value={testerProbe} onChange={setTesterProbe} /> : null}
              {studioMode === "combine" ? <CombineControls value={compoundMode} onChange={setCompoundMode} /> : null}
            </div>
          </div>
        </section>

        <details className="teacher-sandbox mt-3 rounded-[20px] border border-fuchsia-300/[0.12] bg-black/[0.20] backdrop-blur-xl">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[11px] font-semibold text-fuchsia-200/80">
            <span className="flex items-center gap-2"><SlidersHorizontal size={13} /> Teacher sandbox</span>
            <span className="font-mono text-[9px] text-slate-600">developer tools only</span>
          </summary>
          <div className="border-t border-white/[0.05] p-4">
            <TeacherSandbox
              coefficient={teacherCoefficient}
              constant={teacherConstant}
              rightSide={teacherRightSide}
              relation={teacherRelation}
              solution={teacherSolution}
              onCoefficient={setTeacherCoefficient}
              onConstant={setTeacherConstant}
              onRightSide={setTeacherRightSide}
              onRelation={setTeacherRelation}
            />
          </div>
        </details>

        <PracticeStudio mode={practiceMode} onMode={setPracticeMode} />
        <TopicNavigation />
      </div>

      <style>{`
        .teacher-sandbox { display: none; }
        [data-developer-tools="true"] .teacher-sandbox { display: block; }
        #inequality-practice .generated-embedded > section {
          border: 0 !important;
          background: transparent !important;
          padding: 0 !important;
          backdrop-filter: none !important;
          box-shadow: none !important;
        }
        #inequality-practice .assessment-compact > div {
          border-radius: 18px !important;
          padding: 16px !important;
          background: rgba(0,0,0,0.08) !important;
          box-shadow: none !important;
        }
        #inequality-practice .assessment-compact > div > div {
          min-height: 310px !important;
        }
        #inequality-practice .assessment-compact h3 {
          margin-bottom: 16px !important;
          font-size: 1.05rem !important;
          line-height: 1.45 !important;
        }
        #inequality-practice .assessment-compact button {
          padding-top: 10px !important;
          padding-bottom: 10px !important;
        }
      `}</style>
    </main>
  );
}

function ReferenceStrip() {
  return (
    <section id="inequality-reference" className="scroll-mt-24 mt-4 grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
      <div className="overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#06111e]/48 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] backdrop-blur-2xl">
        <div className="border-b border-white/[0.055] px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-sky-300/70">
          Read the inequality sign
        </div>
        <table className="w-full border-collapse text-left">
          <thead className="bg-white/[0.018] text-[8px] font-semibold uppercase tracking-[0.10em] text-slate-600">
            <tr>
              <th className="px-4 py-2.5">Sign</th>
              <th className="px-3 py-2.5">Read as</th>
              <th className="px-3 py-2.5">Direction</th>
              <th className="px-4 py-2.5">Boundary</th>
            </tr>
          </thead>
          <tbody>
            {REFERENCE_ROWS.map((row) => (
              <tr key={row.symbol} className="border-t border-white/[0.04]">
                <td className="w-16 px-4 py-2.5 font-mono text-[20px] text-sky-200">{row.symbol}</td>
                <td className="px-3 py-2.5 text-[11px] text-slate-400">{row.read}</td>
                <td className="px-3 py-2.5 font-mono text-[11px] text-indigo-200">{row.direction}</td>
                <td className="px-4 py-2.5 font-mono text-[11px] text-amber-200">{row.boundary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#06111e]/48 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] backdrop-blur-2xl">
        <div className="border-b border-white/[0.055] px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-300/70">
          Interval notation
        </div>
        <table className="w-full border-collapse text-left text-[11px]">
          <thead className="bg-white/[0.018] text-[8px] font-semibold uppercase tracking-[0.10em] text-slate-600">
            <tr>
              <th className="px-4 py-2.5">Mark</th>
              <th className="px-3 py-2.5">Use when</th>
              <th className="px-4 py-2.5">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-white/[0.04]">
              <td className="px-4 py-3 font-mono text-[18px] text-amber-200">( )</td>
              <td className="px-3 py-3 text-slate-400">endpoint excluded</td>
              <td className="px-4 py-3 font-mono text-slate-500">x &lt; 3 → (−∞, 3)</td>
            </tr>
            <tr className="border-t border-white/[0.04]">
              <td className="px-4 py-3 font-mono text-[18px] text-amber-200">[ ]</td>
              <td className="px-3 py-3 text-slate-400">endpoint included</td>
              <td className="px-4 py-3 font-mono text-slate-500">x ≤ 3 → (−∞, 3]</td>
            </tr>
            <tr className="border-t border-white/[0.04]">
              <td className="px-4 py-3 font-mono text-[18px] text-amber-200">∞</td>
              <td className="px-3 py-3 text-slate-400">never included</td>
              <td className="px-4 py-3 font-mono text-slate-500">always use ( )</td>
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
    <div className="grid h-full gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div className="self-start">
        <strong className="text-[14px] text-slate-200">One inequality can describe many values.</strong>
        <p className="mt-1 text-[11px] text-slate-500">The blue ray is the whole solution set. Pick one value and see whether it lands inside.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
        {[2, 3, 4].map((candidate) => (
          <button
            key={candidate}
            type="button"
            onClick={() => onChange(candidate)}
            className={`rounded-xl border px-4 py-2.5 font-mono text-[12px] transition-colors ${
              value === candidate
                ? candidate < 3
                  ? "border-emerald-300/[0.30] bg-emerald-400/[0.055] text-emerald-200"
                  : "border-rose-300/[0.24] bg-rose-400/[0.04] text-rose-200"
                : "border-white/[0.06] bg-black/[0.08] text-slate-500 hover:text-white"
            }`}
          >
            x = {candidate}
          </button>
        ))}
        <span className={`ml-1 inline-flex min-w-[130px] items-center gap-2 text-[11px] ${valid ? "text-emerald-300" : "text-rose-300"}`}>
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
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
      <div className="flex flex-wrap gap-2">
        {WORKED_EXAMPLES.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(index)}
            className={`rounded-xl border px-4 py-2 text-[10px] font-semibold ${
              activeIndex === index
                ? "border-sky-300/[0.26] bg-sky-400/[0.06] text-sky-100"
                : "border-white/[0.06] bg-black/[0.06] text-slate-500 hover:text-slate-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <TransformationRibbon steps={example.steps} actions={example.actions} />
      <p className="min-h-[18px] text-[11px] text-slate-500">{example.note}</p>
    </div>
  );
}

function TryControls({
  boundary,
  relation,
  onBoundary,
  onRelation,
}: {
  boundary: number;
  relation: Relation;
  onBoundary: (value: number) => void;
  onRelation: (value: Relation) => void;
}) {
  return (
    <div className="grid h-full gap-5 lg:grid-cols-2 lg:items-start">
      <div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.11em] text-slate-600">Choose the sign</div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {RELATIONS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onRelation(item)}
              className={`h-11 rounded-xl border font-mono text-[17px] ${
                relation === item
                  ? "border-sky-300/[0.28] bg-sky-400/[0.065] text-sky-100"
                  : "border-white/[0.06] bg-black/[0.06] text-slate-500 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-slate-600">The sign controls direction and whether the boundary is included.</p>
      </div>
      <label>
        <span className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.11em] text-slate-600">
          Move the boundary
          <span className="font-mono text-sky-300">{formatNumber(boundary)}</span>
        </span>
        <input
          type="range"
          min={-6}
          max={6}
          step={1}
          value={boundary}
          onChange={(event) => onBoundary(Number(event.target.value))}
          className="mt-4 h-2 w-full cursor-pointer accent-sky-400"
        />
        <div className="mt-2 flex justify-between font-mono text-[9px] text-slate-700"><span>−6</span><span>0</span><span>6</span></div>
        <p className="mt-2 text-[10px] text-slate-600">The boundary moves the endpoint without changing what the sign means.</p>
      </label>
    </div>
  );
}

function TestControls({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const valid = compare(value, -2, "≥");
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div className="grid min-h-[92px] content-start">
        <strong className="text-[14px] text-slate-200">Test one value against a finished region.</strong>
        <div className="mt-3 grid grid-cols-[auto_auto_auto_auto_auto] items-center justify-start gap-2 font-mono text-[12px] text-slate-400">
          <span>x = {formatNumber(value)}</span>
          <span className="text-slate-700">→</span>
          <span>{formatNumber(value)} ≥ −2</span>
          <span className="text-slate-700">→</span>
          <span className={valid ? "text-emerald-300" : "text-rose-300"}>{valid ? "true" : "false"}</span>
        </div>
        <p className="mt-2 text-[10px] text-slate-600">This checks membership. It does not change or simplify the inequality.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {[-3, -2, 0, 4].map((candidate) => (
          <button
            key={candidate}
            type="button"
            onClick={() => onChange(candidate)}
            className={`min-w-12 rounded-xl border px-4 py-2.5 font-mono text-[11px] ${
              value === candidate
                ? valid
                  ? "border-emerald-300/[0.26] bg-emerald-400/[0.05] text-emerald-200"
                  : "border-rose-300/[0.24] bg-rose-400/[0.04] text-rose-200"
                : "border-white/[0.06] bg-black/[0.06] text-slate-500 hover:text-white"
            }`}
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
    <div className="grid h-full gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div>
        <strong className="text-[14px] text-slate-200">{value === "and" ? "AND keeps the overlap." : "OR keeps either region."}</strong>
        <p className="mt-2 max-w-2xl text-[11px] leading-5 text-slate-500">
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
            className={`rounded-xl border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${
              value === candidate
                ? "border-indigo-300/[0.28] bg-indigo-400/[0.065] text-indigo-200"
                : "border-white/[0.06] bg-black/[0.06] text-slate-500"
            }`}
          >
            {candidate}
          </button>
        ))}
      </div>
    </div>
  );
}

function PracticeStudio({ mode, onMode }: { mode: PracticeMode; onMode: (value: PracticeMode) => void }) {
  return (
    <section id="inequality-practice" className="scroll-mt-24 mt-4 overflow-hidden rounded-[26px] border border-emerald-200/[0.12] bg-[linear-gradient(145deg,rgba(3,16,20,0.58),rgba(5,14,24,0.44))] shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] backdrop-blur-2xl">
      <div className="grid border-b border-white/[0.06] sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onMode("check")}
          className={`px-5 py-3 text-left transition-colors ${mode === "check" ? "bg-cyan-400/[0.055]" : "bg-black/[0.06] hover:bg-white/[0.018]"}`}
        >
          <strong className={`block text-[12px] ${mode === "check" ? "text-cyan-200" : "text-slate-400"}`}>Check understanding</strong>
          <span className="mt-0.5 block text-[9px] text-slate-600">4 focused questions</span>
        </button>
        <button
          type="button"
          onClick={() => onMode("drill")}
          className={`border-t border-white/[0.05] px-5 py-3 text-left transition-colors sm:border-l sm:border-t-0 ${mode === "drill" ? "bg-emerald-400/[0.055]" : "bg-black/[0.06] hover:bg-white/[0.018]"}`}
        >
          <strong className={`block text-[12px] ${mode === "drill" ? "text-emerald-200" : "text-slate-400"}`}>Keep practicing</strong>
          <span className="mt-0.5 block text-[9px] text-slate-600">fresh problems, no finish line</span>
        </button>
      </div>

      <div className="min-h-[360px] p-4 sm:p-5">
        {mode === "check" ? (
          <div className="assessment-compact mx-auto max-w-[980px]">
            <Assessment title="Inequalities concept check" questions={inequalitiesQuiz} accentColor="cyan" />
          </div>
        ) : (
          <div className="generated-embedded">
            <GeneratedPractice
              title="More practice"
              description="Solve, translate, and test new inequalities. The numbers change, but the structures stay familiar."
              generator={generateInequalityPracticeQuestion}
              accentRgb="52, 211, 153"
            />
          </div>
        )}
      </div>
    </section>
  );
}

function TeacherSandbox({
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
        <label>
          <span className="flex justify-between text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-600">Coefficient <span className="font-mono text-fuchsia-300">{coefficient}</span></span>
          <input type="range" min={-4} max={4} step={1} value={coefficient} onChange={(event) => { const value = Number(event.target.value); if (value !== 0) onCoefficient(value); }} className="mt-2 w-full accent-fuchsia-400" />
        </label>
        <label>
          <span className="flex justify-between text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-600">Constant <span className="font-mono text-fuchsia-300">{constant}</span></span>
          <input type="range" min={-6} max={6} step={1} value={constant} onChange={(event) => onConstant(Number(event.target.value))} className="mt-2 w-full accent-fuchsia-400" />
        </label>
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-600">Relation</div>
          <div className="mt-2 grid grid-cols-4 gap-1">
            {RELATIONS.map((item) => <button key={item} type="button" onClick={() => onRelation(item)} className={`h-8 rounded-lg border font-mono text-[12px] ${relation === item ? "border-fuchsia-300/[0.26] bg-fuchsia-400/[0.05] text-fuchsia-200" : "border-white/[0.05] text-slate-600"}`}>{item}</button>)}
          </div>
        </div>
        <label>
          <span className="flex justify-between text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-600">Right side <span className="font-mono text-fuchsia-300">{rightSide}</span></span>
          <input type="range" min={-10} max={10} step={1} value={rightSide} onChange={(event) => onRightSide(Number(event.target.value))} className="mt-2 w-full accent-fuchsia-400" />
        </label>
      </div>
      <TransformationRibbon steps={steps} actions={actions} />
      <div className="mt-3 rounded-[16px] border border-white/[0.05] bg-black/[0.08] p-2">
        <StudioNumberLine solution={solution} />
      </div>
    </div>
  );
}

function TransformationRibbon({ steps, actions }: { steps: readonly string[]; actions: readonly string[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[720px] grid-cols-[1fr_120px_1fr_120px_1fr] items-center border-y border-white/[0.05] py-4">
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
  return <div className={`px-3 text-center font-mono text-[18px] font-semibold ${accent ? "text-sky-200" : "text-slate-300"}`}>{value}</div>;
}

function RibbonAction({ value }: { value: string }) {
  return (
    <div className="grid min-h-[54px] place-items-center text-center">
      <div>
        <div className="text-[8px] font-semibold uppercase tracking-[0.08em] text-slate-600">{value}</div>
        <div className="mt-1 text-slate-700">→</div>
      </div>
    </div>
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
            {value % 2 === 0 ? <text x={x} y={y + 30} fill="rgba(148,163,184,0.48)" fontSize="11" textAnchor="middle">{value}</text> : null}
          </g>
        );
      })}
      <line
        x1={solution.greater ? boundaryX : left}
        y1={y}
        x2={solution.greater ? right : boundaryX}
        y2={y}
        stroke="#38bdf8"
        strokeWidth="16"
        strokeLinecap="round"
        opacity="0.78"
      />
      <circle cx={boundaryX} cy={y} r="12" fill={solution.inclusive ? "#38bdf8" : "#06111e"} stroke="#38bdf8" strokeWidth="4" />
      <text x={boundaryX} y={y - 30} fill="#7dd3fc" fontSize="12" textAnchor="middle">{formatNumber(solution.boundary)}</text>
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
            {value % 2 === 0 ? <text x={x} y={y + 30} fill="rgba(148,163,184,0.48)" fontSize="11" textAnchor="middle">{value}</text> : null}
          </g>
        );
      })}
      {variant === "and" ? (
        <line x1={firstX} y1={y} x2={secondX} y2={y} stroke="#818cf8" strokeWidth="16" strokeLinecap="round" opacity="0.78" />
      ) : (
        <>
          <line x1={left} y1={y} x2={firstX} y2={y} stroke="#818cf8" strokeWidth="16" strokeLinecap="round" opacity="0.78" />
          <line x1={secondX} y1={y} x2={right} y2={y} stroke="#818cf8" strokeWidth="16" strokeLinecap="round" opacity="0.78" />
        </>
      )}
      <circle cx={firstX} cy={y} r="12" fill="#06111e" stroke="#818cf8" strokeWidth="4" />
      <circle cx={secondX} cy={y} r="12" fill={variant === "and" ? "#818cf8" : "#06111e"} stroke="#818cf8" strokeWidth="4" />
      <text x={firstX} y={y - 30} fill="#a5b4fc" fontSize="12" textAnchor="middle">{first}</text>
      <text x={secondX} y={y - 30} fill="#a5b4fc" fontSize="12" textAnchor="middle">{second}</text>
    </svg>
  );
}

function TopicNavigation() {
  return (
    <nav className="mt-4 pb-8" aria-label="Inequalities navigation">
      <div className="mb-2">
        <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/[0.14] px-3 py-2 text-[10px] font-semibold text-slate-500 backdrop-blur-xl transition-colors hover:text-slate-300">
          <ArrowLeft size={12} /> Integrated Algebra map
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations" className="group flex min-h-[70px] items-center gap-3 rounded-[18px] border border-cyan-300/[0.10] bg-black/[0.14] px-4 py-3 backdrop-blur-xl transition-colors hover:border-cyan-300/[0.18]">
          <ArrowLeft size={14} className="text-cyan-300 transition-transform group-hover:-translate-x-0.5" />
          <span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Previous topic</span>
            <strong className="mt-0.5 block text-[14px] text-slate-200">Systems of Equations</strong>
          </span>
        </Link>
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/inequalities/systems" className="group flex min-h-[70px] items-center gap-3 rounded-[18px] border border-indigo-300/[0.12] bg-indigo-400/[0.025] px-4 py-3 backdrop-blur-xl transition-colors hover:border-indigo-300/[0.22]">
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
  return solutionFromBoundary(boundary, normalizedRelation);
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
