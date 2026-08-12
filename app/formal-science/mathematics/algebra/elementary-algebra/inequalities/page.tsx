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

const COEFFICIENTS = [-3, -2, -1, 1, 2, 3] as const;
const RELATIONS: readonly Relation[] = ["<", "≤", ">", "≥"];
const NUMBER_MIN = -10;
const NUMBER_MAX = 10;

const REFERENCE_ROWS: readonly {
  symbol: Relation;
  read: string;
  direction: "left" | "right";
  inclusive: boolean;
  example: string;
  interval: string;
}[] = [
  { symbol: "<", read: "less than", direction: "left", inclusive: false, example: "x < 3", interval: "(−∞, 3)" },
  { symbol: "≤", read: "less than or equal", direction: "left", inclusive: true, example: "x ≤ 3", interval: "(−∞, 3]" },
  { symbol: ">", read: "greater than", direction: "right", inclusive: false, example: "x > 3", interval: "(3, ∞)" },
  { symbol: "≥", read: "greater than or equal", direction: "right", inclusive: true, example: "x ≥ 3", interval: "[3, ∞)" },
];

const WORKED_EXAMPLES = [
  {
    label: "Example A",
    title: "Move, then divide",
    steps: ["2x + 1 < 7", "2x < 6", "x < 3"],
    actions: ["subtract 1", "divide by 2"],
    note: "Dividing by a positive number keeps the inequality direction.",
    tone: "sky",
  },
  {
    label: "Example B",
    title: "Include the boundary",
    steps: ["3x − 4 ≥ 8", "3x ≥ 12", "x ≥ 4"],
    actions: ["add 4", "divide by 3"],
    note: "The ≥ survives the solving process, so 4 belongs to the solution set.",
    tone: "amber",
  },
  {
    label: "Example C",
    title: "Negative division reverses order",
    steps: ["−2x + 1 < 7", "−2x < 6", "x > −3"],
    actions: ["subtract 1", "divide by −2 · reverse < to >"],
    note: "Multiplying or dividing by a negative reflects order, so the inequality reverses.",
    tone: "rose",
  },
] as const;

export default function InequalitiesPage() {
  const [introProbe, setIntroProbe] = useState(2);
  const [coefficient, setCoefficient] = useState(2);
  const [constant, setConstant] = useState(1);
  const [rightSide, setRightSide] = useState(7);
  const [relation, setRelation] = useState<Relation>("<");
  const [testerProbe, setTesterProbe] = useState(0);

  const solution = useMemo(
    () => solveLinearInequality(coefficient, constant, rightSide, relation),
    [coefficient, constant, rightSide, relation],
  );
  const introPasses = introProbe < 3;
  const testerSolution = useMemo(() => solveLinearInequality(1, 0, -2, "≥"), []);
  const testerPasses = compare(testerProbe, -2, "≥");

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#071426] text-slate-100 selection:bg-sky-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.46]">
        <InequalitiesBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_76%_12%,rgba(14,165,233,0.055),transparent_30%),linear-gradient(to_bottom,rgba(7,20,38,0.16),rgba(3,8,18,0.78))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-5 sm:px-6 xl:px-8">
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
          subtitle="Read an inequality as a region of allowed values, learn how solving changes its form, then build and test your own."
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

        <section className="mt-4 grid gap-4 rounded-[24px] border border-sky-200/[0.10] bg-[#06111e]/82 p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-300/70">Start here</div>
            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.035em] text-white">An inequality usually has many answers.</h2>
            <p className="mt-2 max-w-2xl text-[14px] leading-6 text-slate-400">
              An equation such as x = 3 points to one value. An inequality such as x &lt; 3 describes every value on one side of a boundary.
            </p>
          </div>

          <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.18] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Tiny check</div>
                <div className="mt-1 font-mono text-[27px] font-semibold text-white">x &lt; 3</div>
              </div>
              <span className="text-[11px] text-slate-500">Which value works?</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[2, 3, 4].map((value) => {
                const selected = introProbe === value;
                const works = value < 3;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setIntroProbe(value)}
                    className={`rounded-xl border px-3 py-3 font-mono text-[14px] transition-colors ${
                      selected
                        ? works
                          ? "border-emerald-300/[0.30] bg-emerald-400/[0.06] text-emerald-200"
                          : "border-rose-300/[0.24] bg-rose-400/[0.045] text-rose-200"
                        : "border-white/[0.05] bg-white/[0.012] text-slate-400 hover:text-white"
                    }`}
                  >
                    x = {value}
                  </button>
                );
              })}
            </div>
            <div className={`mt-3 flex items-start gap-2 rounded-xl border px-3 py-2.5 ${introPasses ? "border-emerald-300/[0.14] bg-emerald-400/[0.025]" : "border-rose-300/[0.12] bg-rose-400/[0.02]"}`}>
              {introPasses ? <Check size={14} className="mt-0.5 text-emerald-300" /> : <X size={14} className="mt-0.5 text-rose-300" />}
              <p className="text-[11px] leading-5 text-slate-400">
                {introPasses
                  ? `${introProbe} is smaller than 3, so ${introProbe} < 3 is true.`
                  : introProbe === 3
                    ? "3 is the boundary, but < does not include the boundary."
                    : `${introProbe} is larger than 3, so it lies outside the solution region.`}
              </p>
            </div>
          </div>
        </section>

        <ReferenceSection />
        <WorkedExamples />

        <section className="mt-4 rounded-[26px] border border-sky-200/[0.11] bg-[#05101d]/88 p-5 shadow-[0_26px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-300/70">
                <SlidersHorizontal size={13} /> Interactive builder
              </div>
              <h2 className="mt-1 text-[24px] font-semibold text-white">Build one inequality and watch it simplify.</h2>
              <p className="mt-1 max-w-3xl text-[12px] leading-5 text-slate-500">
                Change one part at a time. The algebraic steps, isolated solution, number line, and interval notation all describe the same solution set.
              </p>
            </div>
            <div className="rounded-xl border border-sky-300/[0.10] bg-sky-400/[0.025] px-3 py-2 font-mono text-[13px] text-sky-200">
              x {solution.relation} {formatNumber(solution.boundary)} · {solution.interval}
            </div>
          </div>

          <BuilderControls
            coefficient={coefficient}
            constant={constant}
            rightSide={rightSide}
            relation={relation}
            onCoefficient={setCoefficient}
            onConstant={setConstant}
            onRightSide={setRightSide}
            onRelation={setRelation}
          />

          <SolutionPath
            coefficient={coefficient}
            constant={constant}
            rightSide={rightSide}
            relation={relation}
            solution={solution}
          />

          <div className="mt-4">
            <NumberLinePanel solution={solution} />
          </div>
        </section>

        <section className="mt-4 grid gap-4 rounded-[24px] border border-emerald-200/[0.08] bg-black/[0.17] p-5 backdrop-blur-xl xl:grid-cols-[minmax(0,1fr)_330px]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300/70">A different question</div>
            <h2 className="mt-1 text-[22px] font-semibold text-white">Does one value belong to a region?</h2>
            <p className="mt-2 max-w-3xl text-[12px] leading-5 text-slate-500">
              Testing a value is not another solving step. The inequality is already fixed at x ≥ −2. Choose a candidate and check whether that one value makes the statement true.
            </p>
            <div className="mt-3">
              <NumberLinePanel
                solution={testerSolution}
                compact
                marker={{ value: testerProbe, valid: testerPasses, label: `test x = ${formatNumber(testerProbe)}` }}
              />
            </div>
          </div>

          <MembershipTester probe={testerProbe} passes={testerPasses} onProbe={setTesterProbe} />
        </section>

        <section className="mt-4 rounded-[24px] border border-indigo-200/[0.08] bg-black/[0.17] p-5 backdrop-blur-xl">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-300/70">Two boundaries</div>
          <h2 className="mt-1 text-[22px] font-semibold text-white">Compound inequalities combine regions.</h2>
          <p className="mt-2 max-w-3xl text-[12px] leading-5 text-slate-500">
            AND keeps only the overlap shared by both conditions. OR keeps values satisfying either condition. This is still one-dimensional inequality reasoning; Systems of Inequalities will carry the same overlap idea into two dimensions.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <CompoundCard label="AND" subtitle="intersection" expression="−2 < x ≤ 5" explanation="Keep the values between both boundaries." variant="and" />
            <CompoundCard label="OR" subtitle="union" expression="x < −3 or x > 4" explanation="Keep either outer region." variant="or" />
          </div>
        </section>

        <section id="inequality-practice" className="scroll-mt-24 mt-4 space-y-3">
          <GeneratedPractice
            title="Keep practicing as long as you want"
            description="Generated problems mix solving, interval notation, and membership. They are for fluency, so there is no artificial finish line."
            generator={generateInequalityPracticeQuestion}
            accentRgb="52, 211, 153"
          />

          <details className="group rounded-[22px] border border-white/[0.07] bg-black/[0.17] backdrop-blur-xl">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.13em] text-cyan-300/70">Concept check</span>
                <strong className="mt-1 block text-[16px] text-slate-200">Open the short lesson assessment</strong>
              </span>
              <span className="rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-2 text-[10px] text-slate-500 group-open:hidden">4 questions</span>
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

function ReferenceSection() {
  return (
    <section id="inequality-reference" className="scroll-mt-24 mt-4 rounded-[24px] border border-white/[0.07] bg-black/[0.18] p-5 backdrop-blur-xl">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-300/70">Quick reference</div>
        <h2 className="mt-1 text-[22px] font-semibold text-white">Read the region and its notation together.</h2>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="overflow-x-auto rounded-[16px] border border-white/[0.055]">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead className="bg-white/[0.025] text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">
              <tr>
                <th className="px-4 py-3">Symbol</th>
                <th className="px-4 py-3">Meaning</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">Example ↔ interval</th>
              </tr>
            </thead>
            <tbody>
              {REFERENCE_ROWS.map((row) => (
                <tr key={row.symbol} className="border-t border-white/[0.045] text-[12px] text-slate-400">
                  <td className="px-4 py-3 font-mono text-[22px] text-sky-200">{row.symbol}</td>
                  <td className="px-4 py-3 font-medium text-slate-300">{row.read}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 font-mono text-indigo-300">
                      {row.direction === "left" ? "←" : "→"}
                      <span className={`h-3.5 w-3.5 rounded-full border-2 border-sky-300 ${row.inclusive ? "bg-sky-300" : "bg-[#071426]"}`} />
                      <span className="font-sans text-[10px] text-slate-600">{row.inclusive ? "include 3" : "exclude 3"}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono">
                    <span className="text-slate-200">{row.example}</span>
                    <span className="mx-2 text-slate-700">↔</span>
                    <span className="text-amber-200">{row.interval}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-[16px] border border-amber-200/[0.09] bg-amber-400/[0.018] p-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-300/70">Interval notation key</div>
          <div className="mt-3 overflow-hidden rounded-xl border border-white/[0.05]">
            <table className="w-full text-left text-[11px]">
              <tbody>
                <IntervalKeyRow notation="( a" meaning="left endpoint excluded" />
                <IntervalKeyRow notation="[ a" meaning="left endpoint included" />
                <IntervalKeyRow notation="b )" meaning="right endpoint excluded" />
                <IntervalKeyRow notation="b ]" meaning="right endpoint included" />
                <IntervalKeyRow notation="±∞" meaning="always use a parenthesis" />
              </tbody>
            </table>
          </div>
          <div className="mt-3 grid gap-2 font-mono text-[11px]">
            <div className="rounded-lg border border-white/[0.045] bg-black/[0.12] px-3 py-2 text-amber-100">x &lt; 3 ↔ (−∞, 3)</div>
            <div className="rounded-lg border border-white/[0.045] bg-black/[0.12] px-3 py-2 text-amber-100">x ≥ 3 ↔ [3, ∞)</div>
          </div>
          <p className="mt-3 text-[10px] leading-4 text-slate-600">Infinity is a direction without a reachable endpoint, so it can never be included.</p>
        </div>
      </div>
    </section>
  );
}

function IntervalKeyRow({ notation, meaning }: { notation: string; meaning: string }) {
  return (
    <tr className="border-t border-white/[0.045] first:border-t-0">
      <td className="w-20 px-3 py-2.5 font-mono text-[14px] text-amber-200">{notation}</td>
      <td className="px-3 py-2.5 text-slate-500">{meaning}</td>
    </tr>
  );
}

function WorkedExamples() {
  return (
    <section className="mt-4 rounded-[24px] border border-white/[0.07] bg-black/[0.16] p-5 backdrop-blur-xl">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-300/70">Worked examples</div>
        <h2 className="mt-1 text-[22px] font-semibold text-white">See the solving pattern before changing the controls.</h2>
        <p className="mt-1 text-[11px] leading-5 text-slate-500">These are three separate examples, not steps in one long problem.</p>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {WORKED_EXAMPLES.map((example) => (
          <WorkedExampleCard key={example.label} example={example} />
        ))}
      </div>
    </section>
  );
}

function WorkedExampleCard({ example }: { example: (typeof WORKED_EXAMPLES)[number] }) {
  const border = example.tone === "rose" ? "border-rose-300/[0.12]" : example.tone === "amber" ? "border-amber-300/[0.12]" : "border-sky-300/[0.12]";
  const accent = example.tone === "rose" ? "text-rose-300" : example.tone === "amber" ? "text-amber-300" : "text-sky-300";
  return (
    <article className={`rounded-[18px] border ${border} bg-[#06111e]/72 p-4`}>
      <div className={`text-[9px] font-semibold uppercase tracking-[0.11em] ${accent}`}>{example.label}</div>
      <h3 className="mt-1 text-[15px] font-semibold text-white">{example.title}</h3>
      <div className="mt-3 grid gap-2">
        {example.steps.map((step, index) => (
          <div key={step}>
            <div className={`rounded-xl border px-3 py-2.5 font-mono text-[14px] ${index === example.steps.length - 1 ? `${border} bg-white/[0.025] ${accent}` : "border-white/[0.045] bg-black/[0.12] text-slate-300"}`}>{step}</div>
            {index < example.actions.length ? <div className="px-2 py-1 text-center text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-700">↓ {example.actions[index]}</div> : null}
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] leading-4 text-slate-600">{example.note}</p>
    </article>
  );
}

function BuilderControls({
  coefficient,
  constant,
  rightSide,
  relation,
  onCoefficient,
  onConstant,
  onRightSide,
  onRelation,
}: {
  coefficient: number;
  constant: number;
  rightSide: number;
  relation: Relation;
  onCoefficient: (value: number) => void;
  onConstant: (value: number) => void;
  onRightSide: (value: number) => void;
  onRelation: (value: Relation) => void;
}) {
  return (
    <div className="mt-4 rounded-[18px] border border-white/[0.055] bg-black/[0.13] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Build your inequality</div>
          <p className="mt-1 text-[10px] text-slate-600">The default 2x + 1 &lt; 7 requires both solving steps, so the transformation is visible immediately.</p>
        </div>
        <div className="font-mono text-[15px] text-sky-200">{formatLinearExpression(coefficient, constant)} {relation} {rightSide}</div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[14px] border border-white/[0.045] bg-white/[0.01] p-3">
          <div className="text-[9px] font-semibold text-slate-500">Coefficient of x</div>
          <div className="mt-2 grid grid-cols-6 gap-1">
            {COEFFICIENTS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => onCoefficient(value)}
                className={`h-8 rounded-lg border font-mono text-[10px] ${coefficient === value ? "border-sky-300/[0.28] bg-sky-400/[0.06] text-sky-200" : "border-white/[0.04] text-slate-600"}`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <SliderControl label="Constant" value={constant} min={-5} max={5} onChange={onConstant} />
        <RelationPicker value={relation} onChange={onRelation} />
        <SliderControl label="Right side" value={rightSide} min={-6} max={10} onChange={onRightSide} />
      </div>
    </div>
  );
}

function SolutionPath({ coefficient, constant, rightSide, relation, solution }: { coefficient: number; constant: number; rightSide: number; relation: Relation; solution: ReturnType<typeof solveLinearInequality> }) {
  const movedRight = rightSide - constant;
  const moveLabel = constant === 0 ? "Constant already 0" : constant > 0 ? `Subtract ${constant}` : `Add ${Math.abs(constant)}`;
  return (
    <div className="mt-4 rounded-[18px] border border-white/[0.055] bg-black/[0.15] p-3.5">
      <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Solution path</div>
      <div className="grid gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
        <PathStep label="Original statement" equation={`${formatLinearExpression(coefficient, constant)} ${relation} ${rightSide}`} />
        <PathArrow />
        <PathStep label={moveLabel} equation={`${formatCoefficientTerm(coefficient)} ${relation} ${formatNumber(movedRight)}`} />
        <PathArrow />
        <PathStep
          label={`Divide by ${coefficient}`}
          equation={`x ${solution.relation} ${formatNumber(solution.boundary)}`}
          note={coefficient < 0 ? `Negative division reverses ${relation} to ${solution.relation}.` : "Positive division preserves the direction."}
          accent
        />
      </div>
    </div>
  );
}

function PathStep({ label, equation, note, accent = false }: { label: string; equation: string; note?: string; accent?: boolean }) {
  return (
    <div className={`rounded-[14px] border px-3 py-3 ${accent ? "border-sky-300/[0.14] bg-sky-400/[0.025]" : "border-white/[0.045] bg-white/[0.01]"}`}>
      <div className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">{label}</div>
      <div className={`mt-1.5 font-mono text-[17px] ${accent ? "text-sky-200" : "text-slate-200"}`}>{equation}</div>
      {note ? <p className="mt-1.5 text-[10px] leading-4 text-slate-600">{note}</p> : null}
    </div>
  );
}

function PathArrow() {
  return <div className="hidden items-center justify-center text-slate-700 lg:flex">→</div>;
}

function NumberLinePanel({
  solution,
  compact = false,
  marker,
}: {
  solution: ReturnType<typeof solveLinearInequality>;
  compact?: boolean;
  marker?: { value: number; valid: boolean; label: string };
}) {
  const width = 900;
  const height = compact ? 235 : 285;
  const left = 64;
  const right = width - 64;
  const y = compact ? 142 : 170;
  const xFor = (value: number) => left + ((value - NUMBER_MIN) / (NUMBER_MAX - NUMBER_MIN)) * (right - left);
  const boundaryX = xFor(clamp(solution.boundary, NUMBER_MIN, NUMBER_MAX));
  const markerX = marker ? xFor(clamp(marker.value, NUMBER_MIN, NUMBER_MAX)) : null;

  return (
    <div className={`relative overflow-hidden rounded-[20px] border border-sky-200/[0.11] bg-[#061522]/92 p-4 ${compact ? "min-h-[285px]" : "min-h-[345px]"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Solution region</div>
          <div className="mt-1 font-mono text-[23px] font-semibold text-sky-200">x {solution.relation} {formatNumber(solution.boundary)}</div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Interval</div>
          <div className="mt-1 font-mono text-[18px] text-amber-200">{solution.interval}</div>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="mt-1 w-full" aria-label={`Number line for x ${solution.relation} ${formatNumber(solution.boundary)}`}>
        <line x1={left} y1={y} x2={right} y2={y} stroke="#64748b" strokeWidth="2" />
        {Array.from({ length: 21 }, (_, index) => NUMBER_MIN + index).map((value) => {
          const x = xFor(value);
          return (
            <g key={value}>
              <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="rgba(148,163,184,0.45)" />
              {value % 2 === 0 ? <text x={x} y={y + 28} fill="rgba(148,163,184,0.56)" fontSize="11" textAnchor="middle">{value}</text> : null}
            </g>
          );
        })}
        <line x1={solution.greater ? boundaryX : left} y1={y} x2={solution.greater ? right : boundaryX} y2={y} stroke="#38bdf8" strokeWidth="12" strokeLinecap="round" opacity="0.70" />
        <circle cx={boundaryX} cy={y} r="11" fill={solution.inclusive ? "#38bdf8" : "#061522"} stroke="#38bdf8" strokeWidth="4" />
        <text x={boundaryX} y={y - 28} fill="#7dd3fc" fontSize="12" textAnchor="middle">boundary {formatNumber(solution.boundary)}</text>
        {marker && markerX !== null ? (
          <>
            <line x1={markerX} y1={y - 67} x2={markerX} y2={y - 18} stroke={marker.valid ? "#34d399" : "#fb7185"} strokeWidth="2" strokeDasharray="5 4" />
            <circle cx={markerX} cy={y - 74} r="7" fill={marker.valid ? "#34d399" : "#fb7185"} />
            <text x={markerX} y={y - 93} fill={marker.valid ? "#6ee7b7" : "#fda4af"} fontSize="11" textAnchor="middle">{marker.label}</text>
          </>
        ) : null}
      </svg>
    </div>
  );
}

function MembershipTester({ probe, passes, onProbe }: { probe: number; passes: boolean; onProbe: (value: number) => void }) {
  return (
    <aside className="rounded-[20px] border border-emerald-200/[0.10] bg-[#06130f]/55 p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300/75">Test x ≥ −2</div>
      <p className="mt-1 text-[11px] leading-5 text-slate-600">Pick one candidate. The inequality itself does not change.</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[-3, -2, 0].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onProbe(value)}
            className={`rounded-xl border px-3 py-3 font-mono text-[12px] ${probe === value ? "border-emerald-300/[0.28] bg-emerald-400/[0.055] text-emerald-200" : "border-white/[0.05] bg-white/[0.01] text-slate-500"}`}
          >
            x = {value}
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-2">
        <TestRow label="Rule" value="x ≥ −2" />
        <TestRow label="Substitute" value={`${formatNumber(probe)} ≥ −2`} />
        <TestRow label="Verdict" value={passes ? "true" : "false"} />
      </div>
      <div className={`mt-3 rounded-[15px] border p-3 ${passes ? "border-emerald-300/[0.16] bg-emerald-400/[0.035]" : "border-rose-300/[0.14] bg-rose-400/[0.03]"}`}>
        <div className="flex items-center gap-2">
          {passes ? <Check size={14} className="text-emerald-300" /> : <X size={14} className="text-rose-300" />}
          <strong className={passes ? "text-emerald-200" : "text-rose-200"}>{passes ? "Belongs" : "Outside"}</strong>
        </div>
        <p className="mt-1 text-[10px] leading-4 text-slate-500">x = {formatNumber(probe)} {passes ? "is part of" : "is not part of"} the region x ≥ −2.</p>
      </div>
    </aside>
  );
}

function TestRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-2 rounded-xl border border-white/[0.045] bg-white/[0.01] px-3 py-2.5">
      <span className="text-[8px] font-semibold uppercase tracking-[0.08em] text-slate-600">{label}</span>
      <span className="font-mono text-[11px] text-slate-300">{value}</span>
    </div>
  );
}

function SliderControl({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return (
    <label className="block rounded-[14px] border border-white/[0.045] bg-white/[0.01] p-3">
      <span className="flex items-center justify-between text-[9px] font-semibold text-slate-500">{label}<span className="font-mono text-sky-300">{value}</span></span>
      <input type="range" min={min} max={max} step={1} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-sky-400" />
    </label>
  );
}

function RelationPicker({ value, onChange }: { value: Relation; onChange: (value: Relation) => void }) {
  return (
    <div className="rounded-[14px] border border-white/[0.045] bg-white/[0.01] p-3">
      <div className="text-[9px] font-semibold text-slate-500">Relation</div>
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {RELATIONS.map((relation) => (
          <button key={relation} type="button" onClick={() => onChange(relation)} className={`h-8 rounded-lg border font-mono text-[13px] ${value === relation ? "border-sky-300/[0.28] bg-sky-400/[0.06] text-sky-200" : "border-white/[0.04] text-slate-600"}`}>{relation}</button>
        ))}
      </div>
    </div>
  );
}

function CompoundCard({ label, subtitle, expression, explanation, variant }: { label: string; subtitle: string; expression: string; explanation: string; variant: "and" | "or" }) {
  return (
    <div className="rounded-[16px] border border-indigo-300/[0.10] bg-indigo-400/[0.018] p-3.5">
      <div className="flex items-center justify-between gap-3"><strong className="text-[14px] text-white">{label}</strong><span className="text-[9px] font-semibold uppercase tracking-[0.10em] text-indigo-300/60">{subtitle}</span></div>
      <MiniCompoundLine variant={variant} />
      <div className="mt-2 font-mono text-[12px] text-indigo-200">{expression}</div>
      <p className="mt-1 text-[10px] leading-4 text-slate-600">{explanation}</p>
    </div>
  );
}

function MiniCompoundLine({ variant }: { variant: "and" | "or" }) {
  return (
    <div className="relative mt-3 h-10 overflow-hidden rounded-xl border border-white/[0.04] bg-black/[0.14]">
      <div className="absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 bg-white/[0.12]" />
      {variant === "and" ? (
        <>
          <div className="absolute left-[28%] right-[28%] top-1/2 h-2 -translate-y-1/2 rounded-full bg-indigo-400/50" />
          <div className="absolute left-[28%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-indigo-300 bg-[#080b1b]" />
          <div className="absolute right-[28%] top-1/2 h-3.5 w-3.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-300" />
        </>
      ) : (
        <>
          <div className="absolute left-0 right-[72%] top-1/2 h-2 -translate-y-1/2 rounded-full bg-indigo-400/50" />
          <div className="absolute left-[28%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-indigo-300 bg-[#080b1b]" />
          <div className="absolute left-[72%] right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-indigo-400/50" />
          <div className="absolute left-[72%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-indigo-300 bg-[#080b1b]" />
        </>
      )}
    </div>
  );
}

function TopicNavigation() {
  return (
    <nav className="mt-4 pb-8" aria-label="Inequalities navigation">
      <div className="mb-2"><Link href="/formal-science/mathematics/algebra/elementary-algebra" className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300"><ArrowLeft size={12} /> Integrated Algebra map</Link></div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/systems-of-equations" className="group flex min-h-[72px] items-center gap-3 rounded-[18px] border border-cyan-300/[0.10] bg-black/[0.20] px-4 py-3 transition-colors hover:border-cyan-300/[0.18]"><ArrowLeft size={15} className="text-cyan-300 transition-transform group-hover:-translate-x-0.5" /><span><span className="block text-[9px] font-semibold uppercase tracking-[0.11em] text-slate-600">Previous Integrated Algebra topic</span><strong className="mt-0.5 block text-[14px] text-slate-200">Systems of Equations</strong></span></Link>
        <Link href="/formal-science/mathematics/algebra/elementary-algebra/inequalities/systems" className="group flex min-h-[72px] items-center gap-3 rounded-[18px] border border-indigo-300/[0.14] bg-indigo-400/[0.025] px-4 py-3 transition-colors hover:border-indigo-300/[0.24]"><span className="min-w-0 flex-1 text-right"><span className="block text-[9px] font-semibold uppercase tracking-[0.11em] text-indigo-300/60">Next lesson</span><strong className="mt-0.5 block text-[14px] text-slate-200">Systems of Inequalities</strong></span><ArrowRight size={15} className="text-indigo-300 transition-transform group-hover:translate-x-0.5" /></Link>
      </div>
    </nav>
  );
}

function solveLinearInequality(a: number, c: number, r: number, relation: Relation) {
  const boundary = (r - c) / a;
  const normalizedRelation = a < 0 ? flipRelation(relation) : relation;
  const greater = normalizedRelation === ">" || normalizedRelation === "≥";
  const inclusive = normalizedRelation === "≤" || normalizedRelation === "≥";
  const value = formatNumber(boundary);
  const interval = greater ? `${inclusive ? "[" : "("}${value}, ∞)` : `(−∞, ${value}${inclusive ? "]" : ")"}`;
  return { boundary, relation: normalizedRelation, greater, inclusive, interval };
}

function flipRelation(relation: Relation): Relation { if (relation === "<") return ">"; if (relation === "≤") return "≥"; if (relation === ">") return "<"; return "≤"; }
function compare(left: number, right: number, relation: Relation) { if (relation === "<") return left < right; if (relation === "≤") return left <= right; if (relation === ">") return left > right; return left >= right; }
function formatCoefficientTerm(a: number) { return a === 1 ? "x" : a === -1 ? "−x" : `${a}x`; }
function formatLinearExpression(a: number, c: number) { const ax = formatCoefficientTerm(a); if (c === 0) return ax; return `${ax} ${c > 0 ? "+" : "−"} ${Math.abs(c)}`; }
function formatNumber(value: number) { return Number.isInteger(value) ? String(value) : Number(value.toFixed(2)).toString(); }
function clamp(value: number, min: number, max: number) { return Math.max(min, Math.min(max, value)); }
