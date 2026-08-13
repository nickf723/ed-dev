"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Crosshair,
  Grid3X3,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import Assessment, { type AssessmentQuestion } from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import LinearBackground from "./LinearBackground";
import LinearMiniGraph from "./LinearMiniGraph";
import type { LinearLessonNavItem } from "./SlopeRateLessonExperience";

type GraphingLineLessonExperienceProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: LinearLessonNavItem;
  next?: LinearLessonNavItem;
  unitHref: string;
};

type Point = { x: number; y: number };

type GraphCase = {
  label: string;
  equation: string;
  slope: number;
  intercept: number;
  run: number;
  rise: number;
  interceptChoices: readonly number[];
  secondPoint: Point;
  secondChoices: readonly Point[];
  validPoint: Point;
  invalidPoint: Point;
};

const ACCENT = "96, 165, 250";
const PINK = "244, 114, 182";
const TEAL = "45, 212, 191";

const CASES: readonly GraphCase[] = [
  {
    label: "Positive slope",
    equation: "y = 2x − 1",
    slope: 2,
    intercept: -1,
    run: 1,
    rise: 2,
    interceptChoices: [-2, -1, 1],
    secondPoint: { x: 1, y: 1 },
    secondChoices: [{ x: 1, y: 1 }, { x: 1, y: -3 }, { x: 2, y: 1 }],
    validPoint: { x: 2, y: 3 },
    invalidPoint: { x: 2, y: 4 },
  },
  {
    label: "Negative slope",
    equation: "y = −x + 2",
    slope: -1,
    intercept: 2,
    run: 1,
    rise: -1,
    interceptChoices: [-2, 0, 2],
    secondPoint: { x: 1, y: 1 },
    secondChoices: [{ x: 1, y: 3 }, { x: 1, y: 1 }, { x: -1, y: 1 }],
    validPoint: { x: 3, y: -1 },
    invalidPoint: { x: 3, y: 1 },
  },
  {
    label: "Fractional slope",
    equation: "y = 1/2x − 2",
    slope: 0.5,
    intercept: -2,
    run: 2,
    rise: 1,
    interceptChoices: [-2, -1, 2],
    secondPoint: { x: 2, y: -1 },
    secondChoices: [{ x: 1, y: -1 }, { x: 2, y: -3 }, { x: 2, y: -1 }],
    validPoint: { x: 4, y: 0 },
    invalidPoint: { x: 4, y: 1 },
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "graph-line-transfer-intercept",
    type: "mcq",
    prompt: "What point should you plot first for y = −3x + 4?",
    options: ["(0, 4)", "(4, 0)", "(0, −3)", "(−3, 4)"],
    correctAnswer: "(0, 4)",
    explanation: "In y = mx + b, b = 4, so the y-intercept is (0, 4).",
  },
  {
    id: "graph-line-transfer-slope",
    type: "mcq",
    prompt: "Starting at (0, −1), which point follows slope 1/2 using run 2?",
    options: ["(2, 0)", "(2, −2)", "(1, 1)", "(−2, 0)"],
    correctAnswer: "(2, 0)",
    explanation: "A run of +2 with slope 1/2 gives rise +1, so (0, −1) moves to (2, 0).",
  },
  {
    id: "graph-line-transfer-solution",
    type: "tf",
    prompt: "The point (2, 5) lies on y = 2x + 1.",
    correctAnswer: true,
    explanation: "Substitute x = 2: y = 2(2) + 1 = 5, so the point satisfies the equation.",
  },
];

export default function GraphingLineLessonExperience({
  breadcrumbs,
  previous,
  next,
  unitHref,
}: GraphingLineLessonExperienceProps) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [interceptAnswer, setInterceptAnswer] = useState<number | null>(null);
  const [pointAnswer, setPointAnswer] = useState<number | null>(null);
  const [probe, setProbe] = useState<"valid" | "invalid" | null>(null);

  const current = CASES[caseIndex];
  const interceptCorrect = interceptAnswer === current.intercept;
  const selectedPoint = pointAnswer === null ? null : current.secondChoices[pointAnswer];
  const pointCorrect = selectedPoint?.x === current.secondPoint.x && selectedPoint?.y === current.secondPoint.y;
  const plottedPoints = stage === 0
    ? []
    : stage === 1
      ? [{ x: 0, y: current.intercept, label: `(0, ${current.intercept})` }]
      : [
          { x: 0, y: current.intercept, label: `(0, ${current.intercept})` },
          { ...current.secondPoint, label: `(${current.secondPoint.x}, ${current.secondPoint.y})` },
        ];

  function resetCase(index = caseIndex) {
    setCaseIndex(index);
    setStage(0);
    setInterceptAnswer(null);
    setPointAnswer(null);
    setProbe(null);
  }

  const probePoint = probe === "valid" ? current.validPoint : probe === "invalid" ? current.invalidPoint : null;
  const probeExpected = probePoint ? current.slope * probePoint.x + current.intercept : null;
  const probeWorks = Boolean(probePoint && probeExpected === probePoint.y);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#06101e] text-slate-100">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-48"><LinearBackground /></div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_77%_13%,rgba(96,165,250,0.12),transparent_27%),radial-gradient(circle_at_12%_78%,rgba(45,212,191,0.07),transparent_28%),linear-gradient(to_bottom,rgba(6,16,30,0.18),rgba(3,7,15,0.90))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow="Lesson 03 · Graphing a Line"
          icon={Grid3X3}
          title={<span>Graphing a Line</span>}
          subtitle="Construct a linear graph from its equation, then connect the drawn line to what it really represents: every ordered pair that makes the equation true."
          accentRgb={ACCENT}
          titleClassName="font-mono text-[clamp(2.2rem,4.35vw,4.55rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f4f8ff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-blue-300/[0.14]"
        />

        <LessonUtilityBar practiceTargetId="graph-line-practice" vocabulary accentRgb={ACCENT} />

        <section className="mt-4 grid gap-4 rounded-[26px] border border-blue-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300/75">The learner question</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">How does one equation become an entire geometric line?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">The equation generates ordered-pair solutions. The graph is the picture of all of them at once. Slope-intercept form gives us an efficient way to construct that picture without making a giant table.</p>
          </div>
          <div className="rounded-[18px] border border-blue-200/[0.09] bg-blue-400/[0.025] px-4 py-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-blue-300/65">Construction recipe</div>
            <div className="mt-2 font-mono text-[13px] text-blue-100">plot b → use m → extend</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Two points determine the straight line, but the finished line represents infinitely many solutions, not just those two points.</p>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
          <div className="max-w-3xl">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300/72">Worked model</div>
            <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">Build y = 2x − 1 in three moves.</h2>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <ProcessCard number="01" title="Plot the intercept" formula="b = −1 → (0, −1)" text="Set x = 0. The equation gives y = −1." rgb={PINK} />
            <ProcessCard number="02" title="Use the slope" formula="m = 2 = 2/1" text="From (0, −1), run +1 and rise +2 to reach (1, 1)." rgb={TEAL} />
            <ProcessCard number="03" title="Extend the relationship" formula="(0,−1), (1,1), …" text="The same constant rate continues in both directions, producing the full line." rgb={ACCENT} />
          </div>
          <div className="mt-4 rounded-[20px] border border-white/[0.06] bg-black/[0.12] px-4 py-3 text-[11px] leading-5 text-slate-500">
            <strong className="text-blue-200">Why this works:</strong> the first point satisfies the equation, the slope move creates another satisfying point, and a linear relationship keeps that rate everywhere.
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="rounded-[28px] border border-blue-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300/72">Line constructor</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Create the graph in the same order the equation describes it.</h2>
              </div>
              <button type="button" onClick={() => resetCase()} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.07] px-3 py-2 text-[10px] font-semibold text-slate-500 hover:text-slate-300"><RefreshCcw size={13} />Reset</button>
            </div>

            <div className="mt-4">
              <LinearMiniGraph
                slope={current.slope}
                intercept={current.intercept}
                points={plottedPoints}
                showRiseRun={stage >= 2}
                showLine={stage >= 2}
                accentRgb={ACCENT}
                secondaryRgb={PINK}
                ariaLabel={`Construction graph for ${current.equation}`}
              />
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {CASES.map((item, index) => (
                <button key={item.label} type="button" onClick={() => resetCase(index)} className="rounded-[15px] border px-3 py-3 text-left" style={{ borderColor: caseIndex === index ? `rgba(${ACCENT},0.28)` : "rgba(255,255,255,0.06)", background: caseIndex === index ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)" }}>
                  <span className="block text-[10px] font-semibold text-slate-300">{item.label}</span>
                  <span className="mt-1 block font-mono text-[10px] text-slate-600">{item.equation}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.18] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Current equation</div>
            <div className="mt-2 font-mono text-[20px] text-white">{current.equation}</div>

            {stage === 0 ? (
              <div className="mt-5">
                <h3 className="text-[15px] font-semibold text-white">1. Where is the y-intercept?</h3>
                <p className="mt-1 text-[10px] leading-4 text-slate-500">Choose b, then plot the point (0, b).</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {current.interceptChoices.map((value) => (
                    <button key={value} type="button" onClick={() => setInterceptAnswer(value)} className="rounded-xl border px-3 py-3 font-mono text-[11px]" style={{ borderColor: interceptAnswer === value ? `rgba(${PINK},0.28)` : "rgba(255,255,255,0.06)", color: interceptAnswer === value ? `rgb(${PINK})` : "rgb(100 116 139)" }}>b = {value}</button>
                  ))}
                </div>
                {interceptAnswer !== null ? <Feedback correct={interceptCorrect} text={interceptCorrect ? `Correct. The first point is (0, ${current.intercept}).` : "Not yet. b is the constant term in y = mx + b, so read it with its sign."} /> : null}
                {interceptCorrect ? <button type="button" onClick={() => setStage(1)} className="mt-3 w-full rounded-xl border border-pink-300/[0.20] bg-pink-400/[0.045] px-4 py-2.5 text-[10px] font-semibold text-pink-200">Plot (0, {current.intercept})</button> : null}
              </div>
            ) : null}

            {stage === 1 ? (
              <div className="mt-5">
                <h3 className="text-[15px] font-semibold text-white">2. Use slope {formatSlope(current.slope)}.</h3>
                <p className="mt-1 text-[10px] leading-4 text-slate-500">From the intercept, run {signed(current.run)} and rise {signed(current.rise)}. Which point do you reach?</p>
                <div className="mt-3 grid gap-2">
                  {current.secondChoices.map((point, index) => (
                    <button key={`${point.x}-${point.y}`} type="button" onClick={() => setPointAnswer(index)} className="rounded-xl border px-3 py-3 font-mono text-[11px]" style={{ borderColor: pointAnswer === index ? `rgba(${TEAL},0.28)` : "rgba(255,255,255,0.06)", color: pointAnswer === index ? `rgb(${TEAL})` : "rgb(100 116 139)" }}>({point.x}, {point.y})</button>
                  ))}
                </div>
                {selectedPoint ? <Feedback correct={Boolean(pointCorrect)} text={pointCorrect ? "Yes. The rise/run move lands on another solution." : "That point does not match the stated rise and run from the intercept."} /> : null}
                {pointCorrect ? <button type="button" onClick={() => setStage(2)} className="mt-3 w-full rounded-xl border border-teal-300/[0.20] bg-teal-400/[0.045] px-4 py-2.5 text-[10px] font-semibold text-teal-200">Plot point and extend the line</button> : null}
              </div>
            ) : null}

            {stage >= 2 ? (
              <div className="mt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-300/[0.20] bg-blue-400/[0.05] text-blue-200"><Check size={18} /></div>
                <h3 className="mt-3 text-[16px] font-semibold text-white">The graph is built.</h3>
                <p className="mt-2 text-[11px] leading-5 text-slate-500">Those two plotted points helped construct the line. They are not the only solutions. Every point along the line satisfies {current.equation}.</p>
              </div>
            ) : null}
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/72">Stress-test the graph</div>
              <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">A point belongs on the line only if it satisfies the equation.</h2>
              <p className="mt-2 max-w-3xl text-[12px] leading-5 text-slate-500">The picture and the algebra must agree. Test a nearby point by substituting its coordinates into the rule.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" disabled={stage < 2} onClick={() => setProbe("valid")} className="rounded-xl border border-emerald-300/[0.14] px-4 py-2.5 font-mono text-[11px] text-emerald-200 disabled:opacity-30">Test ({current.validPoint.x}, {current.validPoint.y})</button>
                <button type="button" disabled={stage < 2} onClick={() => setProbe("invalid")} className="rounded-xl border border-rose-300/[0.14] px-4 py-2.5 font-mono text-[11px] text-rose-200 disabled:opacity-30">Test ({current.invalidPoint.x}, {current.invalidPoint.y})</button>
              </div>
            </div>
            <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
              {probePoint ? (
                <>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Substitution</div>
                  <div className="mt-3 font-mono text-[14px] text-slate-300">x = {probePoint.x} → expected y = {formatNumber(probeExpected ?? 0)}</div>
                  <div className="mt-2 font-mono text-[14px] text-slate-300">point gives y = {probePoint.y}</div>
                  <div className={`mt-3 text-[11px] font-semibold ${probeWorks ? "text-emerald-300" : "text-rose-300"}`}>{probeWorks ? "The values match, so the point is on the line." : "The values do not match, so the point is off the line."}</div>
                </>
              ) : <p className="text-[11px] leading-5 text-slate-600">Finish constructing the line, then test a point against the original equation.</p>}
            </div>
          </div>
        </section>

        <section id="graph-line-practice" className="scroll-mt-24 mt-4">
          <details className="group overflow-hidden rounded-[22px] border border-white/[0.09] bg-black/[0.18] backdrop-blur-2xl">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span><span className="block text-[9px] font-semibold uppercase tracking-[0.13em] text-blue-300/72">Transfer check</span><strong className="mt-1 block text-[15px] text-slate-200">Construct and test a fresh line</strong></span>
              <Sparkles size={16} className="text-blue-300" />
            </summary>
            <div className="linear-assessment border-t border-white/[0.06] p-3 sm:p-4"><Assessment title="Graphing a Line check" questions={QUIZ} accentColor="cyan" /></div>
          </details>
        </section>

        <div className="mt-4 rounded-[18px] border border-blue-200/[0.08] bg-blue-400/[0.025] px-4 py-3 text-[11px] leading-5 text-slate-500"><strong className="text-blue-200">Next:</strong> the same line can be encoded in several algebraic forms. The notation changes which information is easiest to read, but not which points belong to the line.</div>

        <LessonNavigation previous={previous} next={next} unitHref={unitHref} />
      </div>

      <style>{`.linear-assessment > div { border-radius: 18px !important; padding: 16px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; } .linear-assessment > div > div { min-height: 300px !important; }`}</style>
    </main>
  );
}

function ProcessCard({ number, title, formula, text, rgb }: { number: string; title: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="flex items-center gap-3"><span className="font-mono text-[9px] text-slate-700">{number}</span><strong className="text-[12px] text-white">{title}</strong></div><div className="mt-2 font-mono text-[14px]" style={{ color: `rgb(${rgb})` }}>{formula}</div><p className="mt-2 text-[10px] leading-4 text-slate-600">{text}</p></div>;
}

function Feedback({ correct, text }: { correct: boolean; text: string }) {
  return <div className={`mt-3 rounded-[14px] border px-3 py-2.5 text-[10px] leading-4 ${correct ? "border-emerald-300/[0.14] bg-emerald-400/[0.025] text-emerald-200" : "border-amber-300/[0.14] bg-amber-400/[0.025] text-amber-200"}`}>{text}</div>;
}

function LessonNavigation({ previous, next, unitHref }: { previous?: LinearLessonNavItem; next?: LinearLessonNavItem; unitHref: string }) {
  return <nav className="mt-4 pb-8" aria-label="Graphing Linear Equations lesson navigation"><div className="mb-2 flex justify-end"><span className="font-mono text-[10px] text-slate-700">03 / 04</span></div><div className="grid gap-3 sm:grid-cols-2">{previous ? <NavCard item={previous} direction="previous" /> : <div className="hidden sm:block" aria-hidden="true" />}{next ? <NavCard item={next} direction="next" /> : <Link href={unitHref} className="flex min-h-[76px] items-center rounded-[18px] border border-blue-300/[0.14] bg-blue-400/[0.025] px-4"><span className="min-w-0 flex-1 text-right"><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Unit</span><strong className="mt-1 block text-[14px] text-slate-200">Graphing Linear Equations</strong></span><Check size={15} className="ml-3 text-blue-300" /></Link>}</div></nav>;
}

function NavCard({ item, direction }: { item: LinearLessonNavItem; direction: "previous" | "next" }) {
  const left = direction === "previous";
  return <Link href={item.href} className="flex min-h-[76px] items-center gap-3 rounded-[18px] border border-blue-300/[0.12] bg-blue-400/[0.018] px-4 py-3">{left ? <ArrowLeft size={15} className="text-blue-300" /> : null}<span className={`min-w-0 flex-1 ${left ? "" : "text-right"}`}><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">{left ? "Previous lesson" : "Next lesson"}</span><strong className="mt-1 block text-[14px] text-slate-200">{item.label}</strong></span>{!left ? <ArrowRight size={15} className="text-blue-300" /> : null}</Link>;
}

function formatSlope(value: number) {
  if (value === 0.5) return "1/2";
  return String(value).replace("-", "−");
}

function signed(value: number) {
  return value >= 0 ? `+${value}` : String(value).replace("-", "−");
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) return String(value);
  return String(Number(value.toFixed(2)));
}
