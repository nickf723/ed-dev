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
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import { inequalitiesQuiz } from "./_components/assessment";
import InequalitiesBackground from "./_components/InequalitiesBackground";

type Relation = "<" | "≤" | ">" | "≥";

const COEFFICIENTS = [-3, -2, -1, 1, 2, 3] as const;
const RELATIONS: readonly Relation[] = ["<", "≤", ">", "≥"];
const NUMBER_MIN = -10;
const NUMBER_MAX = 10;

const REFERENCE_ROWS: readonly {
  symbol: Relation;
  read: string;
  direction: string;
  endpoint: string;
  example: string;
  interval: string;
}[] = [
  {
    symbol: "<",
    read: "less than",
    direction: "left",
    endpoint: "open",
    example: "x < 3",
    interval: "(−∞, 3)",
  },
  {
    symbol: "≤",
    read: "less than or equal",
    direction: "left",
    endpoint: "closed",
    example: "x ≤ 3",
    interval: "(−∞, 3]",
  },
  {
    symbol: ">",
    read: "greater than",
    direction: "right",
    endpoint: "open",
    example: "x > 3",
    interval: "(3, ∞)",
  },
  {
    symbol: "≥",
    read: "greater than or equal",
    direction: "right",
    endpoint: "closed",
    example: "x ≥ 3",
    interval: "[3, ∞)",
  },
];

export default function InequalitiesPage() {
  const [introProbe, setIntroProbe] = useState(2);
  const [coefficient, setCoefficient] = useState(1);
  const [constant, setConstant] = useState(0);
  const [rightSide, setRightSide] = useState(3);
  const [relation, setRelation] = useState<Relation>("<");
  const [probe, setProbe] = useState(2);

  const solution = useMemo(
    () => solveLinearInequality(coefficient, constant, rightSide, relation),
    [coefficient, constant, rightSide, relation],
  );
  const probePasses = compare(coefficient * probe + constant, rightSide, relation);
  const introPasses = introProbe < 3;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#071426] text-slate-100 selection:bg-sky-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.11]">
        <InequalitiesBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(14,165,233,0.06),transparent_30%),linear-gradient(to_bottom,rgba(7,20,38,0.46),rgba(3,8,18,0.96))]" />

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
          subtitle="Read an inequality as a region of allowed values, build one yourself, and test which values belong."
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
            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.035em] text-white">
              An inequality usually has many answers.
            </h2>
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

        <section id="inequality-reference" className="scroll-mt-24 mt-4 rounded-[24px] border border-white/[0.07] bg-black/[0.18] p-5 backdrop-blur-xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-300/70">Quick reference</div>
              <h2 className="mt-1 text-[22px] font-semibold text-white">Read the symbol, then draw the region.</h2>
            </div>
            <div className="text-[11px] text-slate-500">All examples below use boundary x = 3.</div>
          </div>

          <div className="mt-4 overflow-x-auto rounded-[16px] border border-white/[0.055]">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="bg-white/[0.025] text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">
                <tr>
                  <th className="px-4 py-3">Symbol</th>
                  <th className="px-4 py-3">Read it</th>
                  <th className="px-4 py-3">Shade</th>
                  <th className="px-4 py-3">Boundary</th>
                  <th className="px-4 py-3">Inequality</th>
                  <th className="px-4 py-3">Interval notation</th>
                </tr>
              </thead>
              <tbody>
                {REFERENCE_ROWS.map((row) => (
                  <tr key={row.symbol} className="border-t border-white/[0.045] text-[12px] text-slate-400">
                    <td className="px-4 py-3 font-mono text-[22px] text-sky-200">{row.symbol}</td>
                    <td className="px-4 py-3 font-medium text-slate-300">{row.read}</td>
                    <td className="px-4 py-3 font-mono text-indigo-300">{row.direction === "left" ? "← left" : "right →"}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span className={`h-3.5 w-3.5 rounded-full border-2 border-sky-300 ${row.endpoint === "closed" ? "bg-sky-300" : "bg-[#071426]"}`} />
                        {row.endpoint}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-200">{row.example}</td>
                    <td className="px-4 py-3 font-mono text-amber-200">{row.interval}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 grid gap-2 text-[11px] sm:grid-cols-3">
            <ReferenceNote title="Parenthesis ( )" text="Boundary excluded. Infinity always uses a parenthesis." />
            <ReferenceNote title="Bracket [ ]" text="Boundary included. It matches a closed endpoint." />
            <ReferenceNote title="Boundary" text="The value where equality would hold before choosing a side." />
          </div>
        </section>

        <section className="mt-4 rounded-[26px] border border-sky-200/[0.11] bg-[#05101d]/88 p-5 shadow-[0_26px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-300/70">
                <SlidersHorizontal size={13} /> Build & test
              </div>
              <h2 className="mt-1 text-[24px] font-semibold text-white">Make one inequality and watch every representation agree.</h2>
              <p className="mt-1 max-w-3xl text-[12px] leading-5 text-slate-500">
                The solution steps change the form of the statement. Testing a value is separate: it checks whether one candidate belongs to the finished region.
              </p>
            </div>
            <div className="rounded-xl border border-sky-300/[0.10] bg-sky-400/[0.025] px-3 py-2 font-mono text-[13px] text-sky-200">
              x {solution.relation} {formatNumber(solution.boundary)} · {solution.interval}
            </div>
          </div>

          <SolutionPath
            coefficient={coefficient}
            constant={constant}
            rightSide={rightSide}
            relation={relation}
            solution={solution}
          />

          <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
            <NumberLinePanel solution={solution} probe={probe} probePasses={probePasses} />
            <TestValuePanel
              coefficient={coefficient}
              constant={constant}
              rightSide={rightSide}
              relation={relation}
              probe={probe}
              solution={solution}
              passes={probePasses}
              onProbe={setProbe}
            />
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
        </section>

        <section className="mt-4 grid gap-4 rounded-[24px] border border-indigo-200/[0.08] bg-black/[0.17] p-5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_330px]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-300/70">Two boundaries</div>
            <h2 className="mt-1 text-[22px] font-semibold text-white">Compound inequalities combine regions.</h2>
            <p className="mt-2 max-w-3xl text-[12px] leading-5 text-slate-500">
              AND keeps only the overlap shared by both conditions. OR keeps values satisfying either condition. This is still one-dimensional inequality reasoning; the next lesson takes the same idea into the coordinate plane.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <CompoundCard
                label="AND"
                subtitle="intersection"
                expression="−2 < x ≤ 5"
                explanation="Keep the values between both boundaries."
                variant="and"
              />
              <CompoundCard
                label="OR"
                subtitle="union"
                expression="x < −3 or x > 4"
                explanation="Keep either outer region."
                variant="or"
              />
            </div>
          </div>

          <Link
            href="/formal-science/mathematics/algebra/elementary-algebra/inequalities/systems"
            className="group flex min-h-[180px] flex-col justify-between rounded-[20px] border border-indigo-300/[0.14] bg-indigo-400/[0.025] p-5 transition-colors hover:border-indigo-300/[0.24] hover:bg-indigo-400/[0.045]"
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-indigo-300/60">Next lesson</span>
            <span>
              <strong className="block text-[20px] font-semibold text-white">Systems of Inequalities</strong>
              <span className="mt-2 block text-[12px] leading-5 text-slate-500">Put multiple regions on a coordinate plane and keep only their overlap.</span>
            </span>
            <span className="flex items-center gap-2 text-[11px] font-semibold text-indigo-300">
              Move into 2D <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </section>

        <section id="inequality-practice" className="scroll-mt-24 mt-4">
          <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300/70">Practice</div>
              <h2 className="mt-1 text-[22px] font-semibold text-white">Use the shared assessment system.</h2>
            </div>
            <p className="max-w-xl text-[11px] leading-5 text-slate-500">The questions change by subject; the interaction and feedback stay consistent across Education Station.</p>
          </div>
          <Assessment title="Inequalities practice" questions={inequalitiesQuiz} accentColor="cyan" />
        </section>

        <TopicNavigation />
      </div>
    </main>
  );
}

function ReferenceNote({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/[0.045] bg-white/[0.012] px-3 py-2.5">
      <strong className="text-slate-300">{title}</strong>
      <span className="ml-2 text-slate-600">{text}</span>
    </div>
  );
}

function SolutionPath({
  coefficient,
  constant,
  rightSide,
  relation,
  solution,
}: {
  coefficient: number;
  constant: number;
  rightSide: number;
  relation: Relation;
  solution: ReturnType<typeof solveLinearInequality>;
}) {
  const movedRight = rightSide - constant;
  const moveLabel = constant === 0
    ? "No constant to move"
    : constant > 0
      ? `Subtract ${constant}`
      : `Add ${Math.abs(constant)}`;

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
          note={coefficient < 0 ? `Negative division reverses ${relation} to ${solution.relation}.` : "Direction stays the same."}
          accent
        />
      </div>
    </div>
  );
}

function PathStep({
  label,
  equation,
  note,
  accent = false,
}: {
  label: string;
  equation: string;
  note?: string;
  accent?: boolean;
}) {
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
  probe,
  probePasses,
}: {
  solution: ReturnType<typeof solveLinearInequality>;
  probe: number;
  probePasses: boolean;
}) {
  const width = 900;
  const height = 300;
  const left = 64;
  const right = width - 64;
  const y = 175;
  const xFor = (value: number) => left + ((value - NUMBER_MIN) / (NUMBER_MAX - NUMBER_MIN)) * (right - left);
  const boundaryX = xFor(clamp(solution.boundary, NUMBER_MIN, NUMBER_MAX));
  const probeX = xFor(clamp(probe, NUMBER_MIN, NUMBER_MAX));

  return (
    <div className="relative min-h-[350px] overflow-hidden rounded-[20px] border border-sky-200/[0.11] bg-[#061522]/92 p-4">
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
              {value % 2 === 0 ? (
                <text x={x} y={y + 28} fill="rgba(148,163,184,0.56)" fontSize="11" textAnchor="middle">{value}</text>
              ) : null}
            </g>
          );
        })}
        <line
          x1={solution.greater ? boundaryX : left}
          y1={y}
          x2={solution.greater ? right : boundaryX}
          y2={y}
          stroke="#38bdf8"
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.70"
        />
        <circle cx={boundaryX} cy={y} r="11" fill={solution.inclusive ? "#38bdf8" : "#061522"} stroke="#38bdf8" strokeWidth="4" />
        <text x={boundaryX} y={y - 28} fill="#7dd3fc" fontSize="12" textAnchor="middle">boundary {formatNumber(solution.boundary)}</text>
        <line x1={probeX} y1={y - 72} x2={probeX} y2={y - 18} stroke={probePasses ? "#34d399" : "#fb7185"} strokeWidth="2" strokeDasharray="5 4" />
        <circle cx={probeX} cy={y - 80} r="7" fill={probePasses ? "#34d399" : "#fb7185"} />
        <text x={probeX} y={y - 99} fill={probePasses ? "#6ee7b7" : "#fda4af"} fontSize="11" textAnchor="middle">test x = {formatNumber(probe)}</text>
      </svg>
    </div>
  );
}

function TestValuePanel({
  coefficient,
  constant,
  rightSide,
  relation,
  probe,
  solution,
  passes,
  onProbe,
}: {
  coefficient: number;
  constant: number;
  rightSide: number;
  relation: Relation;
  probe: number;
  solution: ReturnType<typeof solveLinearInequality>;
  passes: boolean;
  onProbe: (value: number) => void;
}) {
  const leftValue = coefficient * probe + constant;
  const quickValues = Array.from(
    new Set([
      Math.floor(solution.boundary) - 1,
      Number(solution.boundary.toFixed(1)),
      Math.ceil(solution.boundary) + 1,
    ]),
  );

  return (
    <aside className="rounded-[20px] border border-emerald-200/[0.09] bg-black/[0.18] p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300/75">Test one value</div>
      <p className="mt-1 text-[11px] leading-5 text-slate-600">This does not simplify the inequality. It checks one candidate against the original statement.</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {quickValues.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onProbe(value)}
            className={`rounded-lg border px-3 py-2 font-mono text-[10px] ${probe === value ? "border-emerald-300/[0.28] bg-emerald-400/[0.055] text-emerald-200" : "border-white/[0.05] bg-white/[0.01] text-slate-500"}`}
          >
            x = {formatNumber(value)}
          </button>
        ))}
      </div>

      <label className="mt-3 block rounded-xl border border-white/[0.045] bg-white/[0.01] p-3">
        <span className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-600">
          Candidate
          <span className="font-mono text-emerald-300">x = {formatNumber(probe)}</span>
        </span>
        <input
          type="range"
          min={NUMBER_MIN}
          max={NUMBER_MAX}
          step={0.5}
          value={probe}
          onChange={(event) => onProbe(Number(event.target.value))}
          className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-emerald-400"
        />
      </label>

      <div className="mt-3 grid gap-2">
        <TestRow label="Original" value={`${formatLinearExpression(coefficient, constant)} ${relation} ${rightSide}`} />
        <TestRow label="Substitute" value={`${formatSubstitutedExpression(coefficient, constant, probe)} ${relation} ${rightSide}`} />
        <TestRow label="Compare" value={`${formatNumber(leftValue)} ${relation} ${rightSide}`} />
      </div>

      <div className={`mt-3 rounded-[15px] border p-3 ${passes ? "border-emerald-300/[0.16] bg-emerald-400/[0.035]" : "border-rose-300/[0.14] bg-rose-400/[0.03]"}`}>
        <div className="flex items-center gap-2">
          {passes ? <Check size={14} className="text-emerald-300" /> : <X size={14} className="text-rose-300" />}
          <strong className={passes ? "text-emerald-200" : "text-rose-200"}>{passes ? "True" : "False"}</strong>
        </div>
        <p className="mt-1 text-[10px] leading-4 text-slate-500">x = {formatNumber(probe)} {passes ? "belongs" : "does not belong"} to the solution set.</p>
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
          <p className="mt-1 text-[10px] text-slate-600">Change one part and watch the solution path, number line, interval, and test update together.</p>
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
        <SliderControl label="Right side" value={rightSide} min={-6} max={8} onChange={onRightSide} />
      </div>
    </div>
  );
}

function SliderControl({
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
    <label className="block rounded-[14px] border border-white/[0.045] bg-white/[0.01] p-3">
      <span className="flex items-center justify-between text-[9px] font-semibold text-slate-500">
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
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-sky-400"
      />
    </label>
  );
}

function RelationPicker({ value, onChange }: { value: Relation; onChange: (value: Relation) => void }) {
  return (
    <div className="rounded-[14px] border border-white/[0.045] bg-white/[0.01] p-3">
      <div className="text-[9px] font-semibold text-slate-500">Relation</div>
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {RELATIONS.map((relation) => (
          <button
            key={relation}
            type="button"
            onClick={() => onChange(relation)}
            className={`h-8 rounded-lg border font-mono text-[13px] ${value === relation ? "border-sky-300/[0.28] bg-sky-400/[0.06] text-sky-200" : "border-white/[0.04] text-slate-600"}`}
          >
            {relation}
          </button>
        ))}
      </div>
    </div>
  );
}

function CompoundCard({
  label,
  subtitle,
  expression,
  explanation,
  variant,
}: {
  label: string;
  subtitle: string;
  expression: string;
  explanation: string;
  variant: "and" | "or";
}) {
  return (
    <div className="rounded-[16px] border border-indigo-300/[0.10] bg-indigo-400/[0.018] p-3.5">
      <div className="flex items-center justify-between gap-3">
        <strong className="text-[14px] text-white">{label}</strong>
        <span className="text-[9px] font-semibold uppercase tracking-[0.10em] text-indigo-300/60">{subtitle}</span>
      </div>
      <MiniCompoundLine variant={variant} />
      <div className="mt-2 font-mono text-[12px] text-indigo-200">{expression}</div>
      <p className="mt-1 text-[10px] leading-4 text-slate-600">{explanation}</p>
    </div>
  );
}

function MiniCompoundLine({ variant }: { variant: "and" | "or" }) {
  return (
    <div className="relative mt-3 h-9 overflow-hidden rounded-lg border border-white/[0.04] bg-black/[0.14]">
      <div className="absolute left-3 right-3 top-1/2 h-px -translate-y-1/2 bg-white/[0.12]" />
      {variant === "and" ? (
        <>
          <div className="absolute left-[28%] right-[28%] top-1/2 h-2 -translate-y-1/2 rounded-full bg-indigo-400/55" />
          <div className="absolute left-[28%] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-indigo-300 bg-[#080b1b]" />
          <div className="absolute right-[28%] top-1/2 h-3 w-3 translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-300" />
        </>
      ) : (
        <>
          <div className="absolute left-0 right-[72%] top-1/2 h-2 -translate-y-1/2 rounded-full bg-indigo-400/55" />
          <div className="absolute left-[28%] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-indigo-300 bg-[#080b1b]" />
          <div className="absolute left-[72%] right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-indigo-400/55" />
          <div className="absolute left-[72%] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-indigo-300 bg-[#080b1b]" />
        </>
      )}
    </div>
  );
}

function TopicNavigation() {
  return (
    <nav className="mt-4 flex flex-wrap items-center justify-between gap-3 pb-8" aria-label="Inequalities navigation">
      <Link
        href="/formal-science/mathematics/algebra/elementary-algebra"
        className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300"
      >
        <ArrowLeft size={12} /> Integrated Algebra map
      </Link>
      <Link
        href="/formal-science/mathematics/algebra/elementary-algebra/inequalities/systems"
        className="inline-flex items-center gap-2 rounded-full border border-indigo-300/[0.12] bg-indigo-400/[0.025] px-3 py-2 text-[10px] font-semibold text-indigo-300 transition-colors hover:border-indigo-300/[0.22]"
      >
        Systems of Inequalities <ArrowRight size={12} />
      </Link>
    </nav>
  );
}

function solveLinearInequality(a: number, c: number, r: number, relation: Relation) {
  const boundary = (r - c) / a;
  const normalizedRelation = a < 0 ? flipRelation(relation) : relation;
  const greater = normalizedRelation === ">" || normalizedRelation === "≥";
  const inclusive = normalizedRelation === "≤" || normalizedRelation === "≥";
  const value = formatNumber(boundary);
  const interval = greater
    ? `${inclusive ? "[" : "("}${value}, ∞)`
    : `(−∞, ${value}${inclusive ? "]" : ")"}`;
  return { boundary, relation: normalizedRelation, greater, inclusive, interval };
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

function formatCoefficientTerm(a: number) {
  if (a === 1) return "x";
  if (a === -1) return "−x";
  return `${a}x`;
}

function formatLinearExpression(a: number, c: number) {
  const ax = formatCoefficientTerm(a);
  if (c === 0) return ax;
  return `${ax} ${c > 0 ? "+" : "−"} ${Math.abs(c)}`;
}

function formatSubstitutedExpression(a: number, c: number, x: number) {
  const ax = a === 1 ? `${formatNumber(x)}` : a === -1 ? `−(${formatNumber(x)})` : `${a}(${formatNumber(x)})`;
  if (c === 0) return ax;
  return `${ax} ${c > 0 ? "+" : "−"} ${Math.abs(c)}`;
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) return String(value);
  return Number(value.toFixed(2)).toString();
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
