"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, Layers, X } from "lucide-react";
import Assessment from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import GeneratedPractice from "@/app/_components/GeneratedPractice";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import { systemsInequalitiesQuiz } from "./_components/assessment";
import { generateSystemsInequalitiesPracticeQuestion } from "./_components/SystemsInequalitiesPracticeGenerator";

type Relation = "<" | "≤" | ">" | "≥";
type StudioMode = "see" | "read" | "try" | "combine" | "test";
type PracticeMode = "check" | "drill";

type Point = { x: number; y: number };

type Constraint = {
  label: "A" | "B";
  slope: number;
  intercept: number;
  relation: Relation;
};

type SystemExample = {
  label: string;
  a: Constraint;
  b: Constraint;
  points: readonly Point[];
};

const GRAPH_MIN = -6;
const GRAPH_MAX = 6;

const STUDIO_MODES: readonly { id: StudioMode; label: string }[] = [
  { id: "see", label: "See" },
  { id: "read", label: "Read" },
  { id: "try", label: "Try" },
  { id: "combine", label: "Combine" },
  { id: "test", label: "Test" },
];

const RELATIONS: readonly Relation[] = ["<", "≤", ">", "≥"];

const REFERENCE_ROWS: readonly {
  relation: Relation;
  shade: string;
  boundary: string;
}[] = [
  { relation: "<", shade: "Below", boundary: "Dashed" },
  { relation: "≤", shade: "Below", boundary: "Solid" },
  { relation: ">", shade: "Above", boundary: "Dashed" },
  { relation: "≥", shade: "Above", boundary: "Solid" },
];

const READ_EXAMPLES: readonly Constraint[] = [
  { label: "A", slope: 1, intercept: -1, relation: ">" },
  { label: "A", slope: -1, intercept: 2, relation: "≤" },
  { label: "A", slope: 0, intercept: 2, relation: "<" },
];

const SYSTEMS: readonly SystemExample[] = [
  {
    label: "Example 1",
    a: { label: "A", slope: 1, intercept: 1, relation: "≥" },
    b: { label: "B", slope: -1, intercept: 5, relation: "≤" },
    points: [
      { x: 0, y: 2 },
      { x: 0, y: 0 },
      { x: 3, y: 3 },
      { x: 4, y: 2 },
    ],
  },
  {
    label: "Example 2",
    a: { label: "A", slope: 0, intercept: 1, relation: "≥" },
    b: { label: "B", slope: 0, intercept: 4, relation: "<" },
    points: [
      { x: -2, y: 2 },
      { x: 1, y: 4 },
      { x: 2, y: 0 },
      { x: 4, y: 3 },
    ],
  },
  {
    label: "Example 3",
    a: { label: "A", slope: 0, intercept: 3, relation: "≥" },
    b: { label: "B", slope: 0, intercept: 1, relation: "≤" },
    points: [
      { x: 0, y: 0 },
      { x: 0, y: 2 },
      { x: 0, y: 4 },
      { x: 3, y: 3 },
    ],
  },
];

const SEE_POINTS: readonly Point[] = [
  { x: 0, y: 0 },
  { x: 0, y: 2 },
  { x: 2, y: 4 },
];

export default function SystemsOfInequalitiesPage() {
  const [studioMode, setStudioMode] = useState<StudioMode>("see");
  const [seePointIndex, setSeePointIndex] = useState(1);
  const [readExampleIndex, setReadExampleIndex] = useState(0);
  const [tryRelation, setTryRelation] = useState<Relation>("≥");
  const [tryIntercept, setTryIntercept] = useState(1);
  const [systemIndex, setSystemIndex] = useState(0);
  const [testPointIndex, setTestPointIndex] = useState(0);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>("check");

  const seeConstraint: Constraint = {
    label: "A",
    slope: 1,
    intercept: 1,
    relation: "≥",
  };

  const readConstraint = READ_EXAMPLES[readExampleIndex];

  const tryConstraint = useMemo<Constraint>(
    () => ({
      label: "A",
      slope: 1,
      intercept: tryIntercept,
      relation: tryRelation,
    }),
    [tryIntercept, tryRelation],
  );

  const system = SYSTEMS[systemIndex];
  const selectedTestPoint = system.points[testPointIndex] ?? system.points[0];

  const activeConstraints: readonly Constraint[] =
    studioMode === "read"
      ? [readConstraint]
      : studioMode === "try"
        ? [tryConstraint]
        : studioMode === "combine" || studioMode === "test"
          ? [system.a, system.b]
          : [seeConstraint];

  const activeMarker: Point | undefined =
    studioMode === "see"
      ? SEE_POINTS[seePointIndex]
      : studioMode === "test"
        ? selectedTestPoint
        : undefined;

  const markerPasses =
    activeMarker !== undefined &&
    activeConstraints.every((constraint) => satisfies(activeMarker, constraint));

  const overlap = useMemo(
    () =>
      [system.a, system.b].reduce<Point[]>(
        (polygon, constraint) => clipPolygon(polygon, constraint),
        graphRectangle(),
      ),
    [system],
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#070b18] text-slate-100 selection:bg-indigo-400/25">
      <SystemsBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1340px] px-4 py-5 sm:px-6 xl:px-8">
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
            {
              label: "Algebraic Inequalities",
              href: "/formal-science/mathematics/algebra/elementary-algebra/inequalities",
            },
            { label: "Systems of Inequalities" },
          ]}
          eyebrow="Half-planes · overlap · shared solutions"
          icon={Layers}
          title={<span>Systems of Inequalities</span>}
          subtitle="Shade one allowed region, add another constraint, and keep only the points that satisfy both."
          accentRgb="129, 140, 248"
          titleClassName="font-mono text-[clamp(2.45rem,4.5vw,4.85rem)] font-semibold uppercase leading-[0.86] tracking-[-0.055em] text-[#f8f8ff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-indigo-300/[0.14]"
          aside={
            <div className="rounded-full border border-indigo-300/[0.14] bg-black/20 px-4 py-2 font-mono text-[12px] text-indigo-200/85 backdrop-blur-md">
              half-plane ∩ half-plane
            </div>
          }
        />

        <LessonUtilityBar
          referenceTargetId="systems-reference"
          practiceTargetId="systems-practice"
          vocabulary
          accentRgb="129, 140, 248"
        />

        <ReferenceStrip />

        <section className="mt-4 overflow-hidden rounded-[28px] border border-indigo-200/[0.13] bg-[#070b18]/55 shadow-[0_32px_110px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
          <div className="grid border-b border-white/[0.06] sm:grid-cols-5">
            {STUDIO_MODES.map((mode) => {
              const active = studioMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setStudioMode(mode.id)}
                  className={`min-h-[58px] border-b border-white/[0.04] px-4 py-3 text-left transition-colors sm:border-b-0 sm:border-r sm:last:border-r-0 ${
                    active
                      ? "bg-indigo-400/[0.075]"
                      : "bg-black/[0.05] hover:bg-white/[0.02]"
                  }`}
                >
                  <strong
                    className={`block text-[12px] ${
                      active ? "text-indigo-100" : "text-slate-400"
                    }`}
                  >
                    {mode.label}
                  </strong>
                </button>
              );
            })}
          </div>

          <div className="px-5 pb-5 pt-4 sm:px-7 sm:pb-7">
            <StudioHeader
              mode={studioMode}
              constraints={activeConstraints}
              overlapExists={overlap.length >= 3}
            />

            <div className="mt-4 overflow-hidden rounded-[24px] border border-white/[0.06] bg-black/[0.10]">
              <CoordinatePlane
                constraints={activeConstraints}
                marker={
                  activeMarker
                    ? {
                        ...activeMarker,
                        valid: markerPasses,
                      }
                    : undefined
                }
                showOverlap={studioMode === "combine" || studioMode === "test"}
              />
            </div>

            <div className="min-h-[150px] border-t border-white/[0.055] pt-4">
              {studioMode === "see" ? (
                <SeeControls
                  selectedIndex={seePointIndex}
                  onSelect={setSeePointIndex}
                />
              ) : null}

              {studioMode === "read" ? (
                <ReadControls
                  selectedIndex={readExampleIndex}
                  onSelect={setReadExampleIndex}
                  constraint={readConstraint}
                />
              ) : null}

              {studioMode === "try" ? (
                <TryControls
                  relation={tryRelation}
                  intercept={tryIntercept}
                  onRelation={setTryRelation}
                  onIntercept={setTryIntercept}
                />
              ) : null}

              {studioMode === "combine" ? (
                <CombineControls
                  selectedIndex={systemIndex}
                  onSelect={(index) => {
                    setSystemIndex(index);
                    setTestPointIndex(0);
                  }}
                  system={system}
                  overlapExists={overlap.length >= 3}
                />
              ) : null}

              {studioMode === "test" ? (
                <TestControls
                  system={system}
                  selectedPointIndex={testPointIndex}
                  onSelect={setTestPointIndex}
                />
              ) : null}
            </div>
          </div>
        </section>

        <section
          id="systems-practice"
          className="scroll-mt-24 mt-4 overflow-hidden rounded-[24px] border border-white/[0.09] bg-[#070b18]/48 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-2xl"
        >
          <div className="flex flex-col gap-3 border-b border-white/[0.055] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-indigo-300/70">
                Practice
              </div>
              <div className="mt-0.5 text-[13px] font-semibold text-slate-200">
                Check the idea, then repeat it if you want.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <PracticeTab
                active={practiceMode === "check"}
                label="Concept check"
                onClick={() => setPracticeMode("check")}
              />
              <PracticeTab
                active={practiceMode === "drill"}
                label="Keep practicing"
                onClick={() => setPracticeMode("drill")}
              />
            </div>
          </div>

          <div className="p-3 sm:p-4">
            {practiceMode === "check" ? (
              <div className="assessment-compact">
                <Assessment
                  title="Systems of inequalities concept check"
                  questions={systemsInequalitiesQuiz}
                  accentColor="indigo"
                />
              </div>
            ) : (
              <div className="generated-embedded">
                <GeneratedPractice
                  title="Fresh coordinate-plane questions"
                  description="Practice line style, half-plane direction, and whether a point satisfies one or both constraints."
                  generator={generateSystemsInequalitiesPracticeQuestion}
                  accentRgb="129, 140, 248"
                />
              </div>
            )}
          </div>
        </section>

        <TopicNavigation />
      </div>

      <style>{`
        #systems-practice .generated-embedded > section {
          border: 0 !important;
          background: transparent !important;
          padding: 0 !important;
          backdrop-filter: none !important;
          box-shadow: none !important;
        }
        #systems-practice .assessment-compact > div {
          border-radius: 18px !important;
          padding: 16px !important;
          background: rgba(0,0,0,0.08) !important;
          box-shadow: none !important;
        }
        #systems-practice .assessment-compact > div > div {
          min-height: 310px !important;
        }
        #systems-practice .assessment-compact h3 {
          margin-bottom: 16px !important;
          font-size: 1.05rem !important;
          line-height: 1.45 !important;
        }
        #systems-practice .assessment-compact button {
          padding-top: 10px !important;
          padding-bottom: 10px !important;
        }
      `}</style>
    </main>
  );
}

function ReferenceStrip() {
  return (
    <section
      id="systems-reference"
      className="scroll-mt-24 mt-4 grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]"
    >
      <div className="overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#070b18]/46 backdrop-blur-2xl">
        <div className="border-b border-white/[0.055] px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-indigo-300/70">
          Read a half-plane
        </div>
        <table className="w-full border-collapse text-left">
          <thead className="bg-white/[0.018] text-[8px] font-semibold uppercase tracking-[0.10em] text-slate-600">
            <tr>
              <th className="px-4 py-2.5">Sign</th>
              <th className="px-3 py-2.5">Shade</th>
              <th className="px-3 py-2.5">Boundary line</th>
            </tr>
          </thead>
          <tbody>
            {REFERENCE_ROWS.map((row) => (
              <tr key={row.relation} className="border-t border-white/[0.04]">
                <td className="w-20 px-4 py-2.5 font-mono text-[20px] text-indigo-200">
                  {row.relation}
                </td>
                <td className="px-3 py-2.5 text-[11px] text-slate-300">
                  {row.shade}
                </td>
                <td className="px-3 py-2.5 text-[11px] text-slate-400">
                  {row.boundary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#070b18]/46 backdrop-blur-2xl">
        <div className="border-b border-white/[0.055] px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-sky-300/70">
          System logic
        </div>
        <table className="w-full border-collapse text-left text-[11px]">
          <tbody>
            <tr className="border-t border-white/[0.04]">
              <td className="px-4 py-3 font-semibold text-sky-200">1 inequality</td>
              <td className="px-3 py-3 text-slate-400">one allowed half-plane</td>
            </tr>
            <tr className="border-t border-white/[0.04]">
              <td className="px-4 py-3 font-semibold text-indigo-200">2 inequalities</td>
              <td className="px-3 py-3 text-slate-400">keep their overlap</td>
            </tr>
            <tr className="border-t border-white/[0.04]">
              <td className="px-4 py-3 font-semibold text-emerald-200">Test a point</td>
              <td className="px-3 py-3 text-slate-400">it must satisfy every constraint</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StudioHeader({
  mode,
  constraints,
  overlapExists,
}: {
  mode: StudioMode;
  constraints: readonly Constraint[];
  overlapExists: boolean;
}) {
  return (
    <div className="grid min-h-[76px] gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
      <div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-indigo-300/65">
          Coordinate-plane studio
        </div>
        <div className="mt-1 flex flex-wrap gap-2">
          {constraints.map((constraint) => (
            <span
              key={`${constraint.label}-${constraint.slope}-${constraint.intercept}-${constraint.relation}`}
              className="rounded-lg border border-white/[0.07] bg-black/[0.10] px-3 py-2 font-mono text-[13px] text-slate-200"
            >
              <span
                className={
                  constraint.label === "A" ? "text-sky-300" : "text-orange-300"
                }
              >
                {constraint.label}
              </span>
              {" · "}
              y {constraint.relation} {formatLine(constraint.slope, constraint.intercept)}
            </span>
          ))}
        </div>
      </div>

      <div className="text-left sm:text-right">
        <div className="text-[9px] font-semibold uppercase tracking-[0.11em] text-slate-600">
          {mode === "combine" || mode === "test" ? "Shared region" : "Region"}
        </div>
        <div className="mt-1 text-[12px] font-semibold text-indigo-200">
          {mode === "combine" || mode === "test"
            ? overlapExists
              ? "overlap survives"
              : "no shared points"
            : describeConstraint(constraints[0])}
        </div>
      </div>
    </div>
  );
}

function SeeControls({
  selectedIndex,
  onSelect,
}: {
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  const point = SEE_POINTS[selectedIndex] ?? SEE_POINTS[0];
  const constraint: Constraint = {
    label: "A",
    slope: 1,
    intercept: 1,
    relation: "≥",
  };
  const valid = satisfies(point, constraint);

  return (
    <div className="grid h-full gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div>
        <strong className="text-[14px] text-slate-200">
          A line is only the boundary. The inequality keeps one whole side.
        </strong>
        <p className="mt-1 text-[11px] text-slate-500">
          Pick a point and see whether it lands inside the shaded half-plane.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {SEE_POINTS.map((candidate, index) => (
          <button
            key={`${candidate.x}-${candidate.y}`}
            type="button"
            onClick={() => onSelect(index)}
            className={`rounded-xl border px-4 py-2.5 font-mono text-[11px] ${
              selectedIndex === index
                ? valid
                  ? "border-emerald-300/[0.28] bg-emerald-400/[0.05] text-emerald-200"
                  : "border-rose-300/[0.24] bg-rose-400/[0.04] text-rose-200"
                : "border-white/[0.06] bg-black/[0.06] text-slate-500 hover:text-white"
            }`}
          >
            ({candidate.x}, {candidate.y})
          </button>
        ))}
        <span
          className={`ml-1 inline-flex min-w-[90px] items-center gap-2 text-[11px] ${
            valid ? "text-emerald-300" : "text-rose-300"
          }`}
        >
          {valid ? <Check size={13} /> : <X size={13} />}
          {valid ? "inside" : "outside"}
        </span>
      </div>
    </div>
  );
}

function ReadControls({
  selectedIndex,
  onSelect,
  constraint,
}: {
  selectedIndex: number;
  onSelect: (index: number) => void;
  constraint: Constraint;
}) {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-4">
      <div className="flex flex-wrap gap-2">
        {READ_EXAMPLES.map((item, index) => (
          <button
            key={`${item.slope}-${item.intercept}-${item.relation}`}
            type="button"
            onClick={() => onSelect(index)}
            className={`rounded-xl border px-4 py-2 text-[10px] font-semibold ${
              selectedIndex === index
                ? "border-indigo-300/[0.28] bg-indigo-400/[0.06] text-indigo-100"
                : "border-white/[0.06] bg-black/[0.06] text-slate-500 hover:text-slate-300"
            }`}
          >
            Example {index + 1}
          </button>
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        <Readout label="Boundary" value={`y = ${formatLine(constraint.slope, constraint.intercept)}`} />
        <Readout
          label="Shade"
          value={isGreater(constraint.relation) ? "above" : "below"}
        />
        <Readout
          label="Line"
          value={isInclusive(constraint.relation) ? "solid · included" : "dashed · excluded"}
        />
      </div>
    </div>
  );
}

function TryControls({
  relation,
  intercept,
  onRelation,
  onIntercept,
}: {
  relation: Relation;
  intercept: number;
  onRelation: (relation: Relation) => void;
  onIntercept: (value: number) => void;
}) {
  return (
    <div className="grid h-full gap-5 lg:grid-cols-2 lg:items-start">
      <div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.11em] text-slate-600">
          Choose the sign
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {RELATIONS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onRelation(item)}
              className={`h-11 rounded-xl border font-mono text-[17px] ${
                relation === item
                  ? "border-indigo-300/[0.30] bg-indigo-400/[0.07] text-indigo-100"
                  : "border-white/[0.06] bg-black/[0.06] text-slate-500 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-slate-600">
          The sign changes both the shaded side and whether the boundary line is solid.
        </p>
      </div>

      <label>
        <span className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.11em] text-slate-600">
          Move the line up or down
          <span className="font-mono text-indigo-300">b = {intercept}</span>
        </span>
        <input
          type="range"
          min={-4}
          max={4}
          step={1}
          value={intercept}
          onChange={(event) => onIntercept(Number(event.target.value))}
          className="mt-4 h-2 w-full cursor-pointer accent-indigo-400"
        />
        <div className="mt-2 flex justify-between font-mono text-[9px] text-slate-700">
          <span>−4</span>
          <span>0</span>
          <span>4</span>
        </div>
        <p className="mt-2 text-[10px] text-slate-600">
          The boundary stays parallel because its slope remains 1.
        </p>
      </label>
    </div>
  );
}

function CombineControls({
  selectedIndex,
  onSelect,
  system,
  overlapExists,
}: {
  selectedIndex: number;
  onSelect: (index: number) => void;
  system: SystemExample;
  overlapExists: boolean;
}) {
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-4">
      <div className="flex flex-wrap gap-2">
        {SYSTEMS.map((item, index) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onSelect(index)}
            className={`rounded-xl border px-4 py-2 text-[10px] font-semibold ${
              selectedIndex === index
                ? "border-indigo-300/[0.28] bg-indigo-400/[0.06] text-indigo-100"
                : "border-white/[0.06] bg-black/[0.06] text-slate-500 hover:text-slate-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
        <ConstraintReadout constraint={system.a} />
        <ConstraintReadout constraint={system.b} />
        <div
          className={`rounded-xl border px-4 py-3 text-[11px] font-semibold ${
            overlapExists
              ? "border-emerald-300/[0.18] bg-emerald-400/[0.03] text-emerald-200"
              : "border-rose-300/[0.16] bg-rose-400/[0.03] text-rose-200"
          }`}
        >
          {overlapExists ? "shared region remains" : "no shared region"}
        </div>
      </div>
    </div>
  );
}

function TestControls({
  system,
  selectedPointIndex,
  onSelect,
}: {
  system: SystemExample;
  selectedPointIndex: number;
  onSelect: (index: number) => void;
}) {
  const point = system.points[selectedPointIndex] ?? system.points[0];
  const passesA = satisfies(point, system.a);
  const passesB = satisfies(point, system.b);
  const passesBoth = passesA && passesB;

  return (
    <div className="grid h-full gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div>
        <strong className="text-[14px] text-slate-200">
          A system accepts the point only if both rows are true.
        </strong>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <SubstitutionRow
            label="A"
            point={point}
            constraint={system.a}
            passes={passesA}
          />
          <SubstitutionRow
            label="B"
            point={point}
            constraint={system.b}
            passes={passesB}
          />
        </div>
        <div
          className={`mt-2 text-[11px] font-semibold ${
            passesBoth ? "text-emerald-300" : "text-rose-300"
          }`}
        >
          {passesBoth ? "Both are true · the point is in the overlap." : "At least one is false · the point is outside the system."}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {system.points.map((candidate, index) => (
          <button
            key={`${candidate.x}-${candidate.y}-${index}`}
            type="button"
            onClick={() => onSelect(index)}
            className={`rounded-xl border px-4 py-2.5 font-mono text-[11px] ${
              selectedPointIndex === index
                ? passesBoth
                  ? "border-emerald-300/[0.28] bg-emerald-400/[0.05] text-emerald-200"
                  : "border-rose-300/[0.24] bg-rose-400/[0.04] text-rose-200"
                : "border-white/[0.06] bg-black/[0.06] text-slate-500 hover:text-white"
            }`}
          >
            ({candidate.x}, {candidate.y})
          </button>
        ))}
      </div>
    </div>
  );
}

function ConstraintReadout({ constraint }: { constraint: Constraint }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/[0.07] px-4 py-3">
      <div className="text-[8px] font-semibold uppercase tracking-[0.10em] text-slate-600">
        Constraint {constraint.label}
      </div>
      <div className="mt-1 font-mono text-[13px] text-slate-300">
        y {constraint.relation} {formatLine(constraint.slope, constraint.intercept)}
      </div>
    </div>
  );
}

function SubstitutionRow({
  label,
  point,
  constraint,
  passes,
}: {
  label: string;
  point: Point;
  constraint: Constraint;
  passes: boolean;
}) {
  const boundaryValue = constraint.slope * point.x + constraint.intercept;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/[0.07] px-3 py-2.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[8px] font-semibold uppercase tracking-[0.10em] text-slate-600">
          {label}
        </span>
        <span className={passes ? "text-emerald-300" : "text-rose-300"}>
          {passes ? <Check size={12} /> : <X size={12} />}
        </span>
      </div>
      <div className="mt-1 font-mono text-[11px] text-slate-300">
        {point.y} {constraint.relation} {formatNumber(boundaryValue)}
      </div>
    </div>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/[0.07] px-4 py-3">
      <div className="text-[8px] font-semibold uppercase tracking-[0.10em] text-slate-600">
        {label}
      </div>
      <div className="mt-1 text-[11px] font-semibold text-slate-300">{value}</div>
    </div>
  );
}

function PracticeTab({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-2 text-[10px] font-semibold ${
        active
          ? "border-indigo-300/[0.28] bg-indigo-400/[0.06] text-indigo-100"
          : "border-white/[0.06] bg-black/[0.06] text-slate-500 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function CoordinatePlane({
  constraints,
  marker,
  showOverlap,
}: {
  constraints: readonly Constraint[];
  marker?: Point & { valid: boolean };
  showOverlap: boolean;
}) {
  const width = 900;
  const height = 520;
  const margin = 48;
  const plotLeft = margin;
  const plotRight = width - margin;
  const plotTop = margin;
  const plotBottom = height - margin;

  const xFor = (value: number) =>
    plotLeft +
    ((value - GRAPH_MIN) / (GRAPH_MAX - GRAPH_MIN)) * (plotRight - plotLeft);

  const yFor = (value: number) =>
    plotBottom -
    ((value - GRAPH_MIN) / (GRAPH_MAX - GRAPH_MIN)) * (plotBottom - plotTop);

  const overlap = showOverlap
    ? constraints.reduce<Point[]>(
        (polygon, constraint) => clipPolygon(polygon, constraint),
        graphRectangle(),
      )
    : [];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      aria-label="Coordinate plane showing inequality solution regions"
    >
      <defs>
        <linearGradient id="systems-overlap" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(129,140,248,0.42)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0.34)" />
        </linearGradient>
      </defs>

      <rect width={width} height={height} fill="rgba(3,7,18,0.12)" />

      {Array.from({ length: GRAPH_MAX - GRAPH_MIN + 1 }, (_, index) => GRAPH_MIN + index).map(
        (value) => {
          const x = xFor(value);
          const y = yFor(value);
          return (
            <g key={value}>
              <line
                x1={x}
                y1={plotTop}
                x2={x}
                y2={plotBottom}
                stroke={value === 0 ? "rgba(148,163,184,0.34)" : "rgba(148,163,184,0.09)"}
                strokeWidth={value === 0 ? 1.5 : 1}
              />
              <line
                x1={plotLeft}
                y1={y}
                x2={plotRight}
                y2={y}
                stroke={value === 0 ? "rgba(148,163,184,0.34)" : "rgba(148,163,184,0.09)"}
                strokeWidth={value === 0 ? 1.5 : 1}
              />
              {value !== 0 && value % 2 === 0 ? (
                <>
                  <text x={x} y={yFor(0) + 18} fill="rgba(148,163,184,0.38)" fontSize="10" textAnchor="middle">
                    {value}
                  </text>
                  <text x={xFor(0) - 12} y={y + 4} fill="rgba(148,163,184,0.38)" fontSize="10" textAnchor="end">
                    {value}
                  </text>
                </>
              ) : null}
            </g>
          );
        },
      )}

      {constraints.map((constraint, index) => {
        const polygon = clipPolygon(graphRectangle(), constraint);
        const line = boundarySegment(constraint);
        const fill = index === 0 ? "rgba(56,189,248,0.16)" : "rgba(249,115,22,0.13)";
        const stroke = index === 0 ? "#38bdf8" : "#fb923c";

        return (
          <g key={`${constraint.label}-${constraint.slope}-${constraint.intercept}-${constraint.relation}`}>
            {polygon.length >= 3 ? (
              <polygon
                points={polygon
                  .map((point) => `${xFor(point.x)},${yFor(point.y)}`)
                  .join(" ")}
                fill={fill}
              />
            ) : null}

            {line ? (
              <line
                x1={xFor(line[0].x)}
                y1={yFor(line[0].y)}
                x2={xFor(line[1].x)}
                y2={yFor(line[1].y)}
                stroke={stroke}
                strokeWidth="4"
                strokeDasharray={isInclusive(constraint.relation) ? undefined : "10 8"}
              />
            ) : null}
          </g>
        );
      })}

      {showOverlap && overlap.length >= 3 ? (
        <polygon
          points={overlap
            .map((point) => `${xFor(point.x)},${yFor(point.y)}`)
            .join(" ")}
          fill="url(#systems-overlap)"
          stroke="rgba(165,180,252,0.50)"
          strokeWidth="2"
        />
      ) : null}

      {marker ? (
        <>
          <circle
            cx={xFor(marker.x)}
            cy={yFor(marker.y)}
            r="9"
            fill={marker.valid ? "#34d399" : "#fb7185"}
            stroke="rgba(255,255,255,0.72)"
            strokeWidth="2"
          />
          <text
            x={xFor(marker.x)}
            y={yFor(marker.y) - 16}
            fill={marker.valid ? "#6ee7b7" : "#fda4af"}
            fontSize="11"
            textAnchor="middle"
          >
            ({marker.x}, {marker.y})
          </text>
        </>
      ) : null}
    </svg>
  );
}

function SystemsBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.022)_1px,transparent_1px)] bg-[size:58px_58px]" />
      <div className="systems-plane-a absolute -left-[18vw] top-[8vh] h-[52vh] w-[82vw] bg-sky-400/[0.075] blur-[28px]" />
      <div className="systems-plane-b absolute right-[-20vw] top-[26vh] h-[58vh] w-[86vw] bg-orange-400/[0.055] blur-[34px]" />
      <div className="systems-overlap-glow absolute left-[28vw] top-[30vh] h-[34vh] w-[44vw] rounded-full bg-indigo-400/[0.085] blur-[70px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(7,11,24,0.10)_45%,rgba(3,6,15,0.72)_100%)]" />

      <style>{`
        .systems-plane-a {
          clip-path: polygon(0 100%, 100% 0, 100% 100%);
          animation: systemsPlaneA 18s ease-in-out infinite alternate;
        }
        .systems-plane-b {
          clip-path: polygon(0 0, 100% 100%, 0 100%);
          animation: systemsPlaneB 21s ease-in-out infinite alternate;
        }
        .systems-overlap-glow {
          animation: systemsOverlap 12s ease-in-out infinite alternate;
        }
        @keyframes systemsPlaneA {
          from { transform: translate3d(-2%, -1%, 0) rotate(-2deg); }
          to { transform: translate3d(6%, 4%, 0) rotate(3deg); }
        }
        @keyframes systemsPlaneB {
          from { transform: translate3d(3%, 3%, 0) rotate(2deg); }
          to { transform: translate3d(-5%, -2%, 0) rotate(-3deg); }
        }
        @keyframes systemsOverlap {
          from { transform: scale(0.92); opacity: 0.7; }
          to { transform: scale(1.08); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .systems-plane-a,
          .systems-plane-b,
          .systems-overlap-glow { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function TopicNavigation() {
  return (
    <nav className="mt-4 pb-8" aria-label="Systems of inequalities navigation">
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/formal-science/mathematics/algebra/elementary-algebra/inequalities"
          className="group flex min-h-[70px] items-center gap-3 rounded-[16px] border border-sky-300/[0.10] bg-black/[0.16] px-4 py-3 transition-colors hover:border-sky-300/[0.18]"
        >
          <ArrowLeft size={14} className="text-sky-300 transition-transform group-hover:-translate-x-0.5" />
          <span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">
              Parent lesson
            </span>
            <strong className="mt-0.5 block text-[14px] text-slate-200">
              Algebraic Inequalities
            </strong>
          </span>
        </Link>

        <Link
          href="/formal-science/mathematics/algebra/elementary-algebra"
          className="group flex min-h-[70px] items-center justify-end gap-3 rounded-[16px] border border-indigo-300/[0.10] bg-indigo-400/[0.018] px-4 py-3 text-right transition-colors hover:border-indigo-300/[0.18]"
        >
          <span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">
              Unit map
            </span>
            <strong className="mt-0.5 block text-[14px] text-slate-200">
              Integrated Algebra
            </strong>
          </span>
        </Link>
      </div>
    </nav>
  );
}

function describeConstraint(constraint: Constraint) {
  return `${isGreater(constraint.relation) ? "shade above" : "shade below"} · ${
    isInclusive(constraint.relation) ? "solid boundary" : "dashed boundary"
  }`;
}

function formatLine(slope: number, intercept: number) {
  const slopePart =
    slope === 0
      ? ""
      : slope === 1
        ? "x"
        : slope === -1
          ? "−x"
          : `${formatNumber(slope)}x`;

  if (slope === 0) return formatNumber(intercept);
  if (intercept === 0) return slopePart;
  return `${slopePart} ${intercept > 0 ? "+" : "−"} ${Math.abs(intercept)}`;
}

function satisfies(point: Point, constraint: Constraint) {
  const boundary = constraint.slope * point.x + constraint.intercept;
  return compare(point.y, boundary, constraint.relation);
}

function compare(left: number, right: number, relation: Relation) {
  if (relation === "<") return left < right;
  if (relation === "≤") return left <= right;
  if (relation === ">") return left > right;
  return left >= right;
}

function isGreater(relation: Relation) {
  return relation === ">" || relation === "≥";
}

function isInclusive(relation: Relation) {
  return relation === "≤" || relation === "≥";
}

function graphRectangle(): Point[] {
  return [
    { x: GRAPH_MIN, y: GRAPH_MIN },
    { x: GRAPH_MAX, y: GRAPH_MIN },
    { x: GRAPH_MAX, y: GRAPH_MAX },
    { x: GRAPH_MIN, y: GRAPH_MAX },
  ];
}

function clipPolygon(polygon: readonly Point[], constraint: Constraint): Point[] {
  if (polygon.length === 0) return [];

  const result: Point[] = [];

  for (let index = 0; index < polygon.length; index += 1) {
    const current = polygon[index];
    const previous = polygon[(index + polygon.length - 1) % polygon.length];
    const currentInside = insideRegion(current, constraint);
    const previousInside = insideRegion(previous, constraint);

    if (currentInside) {
      if (!previousInside) {
        result.push(segmentBoundaryIntersection(previous, current, constraint));
      }
      result.push(current);
    } else if (previousInside) {
      result.push(segmentBoundaryIntersection(previous, current, constraint));
    }
  }

  return result;
}

function insideRegion(point: Point, constraint: Constraint) {
  const delta = point.y - (constraint.slope * point.x + constraint.intercept);
  return isGreater(constraint.relation) ? delta >= -1e-9 : delta <= 1e-9;
}

function segmentBoundaryIntersection(
  start: Point,
  end: Point,
  constraint: Constraint,
): Point {
  const startValue =
    start.y - constraint.slope * start.x - constraint.intercept;
  const endValue =
    end.y - constraint.slope * end.x - constraint.intercept;
  const denominator = startValue - endValue;

  if (Math.abs(denominator) < 1e-9) return start;

  const t = startValue / denominator;
  return {
    x: start.x + (end.x - start.x) * t,
    y: start.y + (end.y - start.y) * t,
  };
}

function boundarySegment(constraint: Constraint): [Point, Point] | null {
  const candidates: Point[] = [];

  const add = (point: Point) => {
    if (
      point.x < GRAPH_MIN - 1e-9 ||
      point.x > GRAPH_MAX + 1e-9 ||
      point.y < GRAPH_MIN - 1e-9 ||
      point.y > GRAPH_MAX + 1e-9
    ) {
      return;
    }

    if (
      candidates.some(
        (candidate) =>
          Math.abs(candidate.x - point.x) < 1e-6 &&
          Math.abs(candidate.y - point.y) < 1e-6,
      )
    ) {
      return;
    }

    candidates.push(point);
  };

  add({
    x: GRAPH_MIN,
    y: constraint.slope * GRAPH_MIN + constraint.intercept,
  });
  add({
    x: GRAPH_MAX,
    y: constraint.slope * GRAPH_MAX + constraint.intercept,
  });

  if (Math.abs(constraint.slope) > 1e-9) {
    add({
      x: (GRAPH_MIN - constraint.intercept) / constraint.slope,
      y: GRAPH_MIN,
    });
    add({
      x: (GRAPH_MAX - constraint.intercept) / constraint.slope,
      y: GRAPH_MAX,
    });
  }

  return candidates.length >= 2 ? [candidates[0], candidates[1]] : null;
}

function formatNumber(value: number) {
  return Number.isInteger(value)
    ? String(value)
    : Number(value.toFixed(2)).toString();
}
