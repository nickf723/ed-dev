"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RefreshCcw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Assessment, { type AssessmentQuestion } from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import LinearBackground from "./LinearBackground";
import LinearMiniGraph from "./LinearMiniGraph";

export type LinearLessonNavItem = {
  label: string;
  href: string;
};

type SlopeRateLessonExperienceProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: LinearLessonNavItem;
  next?: LinearLessonNavItem;
  unitHref: string;
};

type PairCase = {
  label: string;
  a: { x: number; y: number };
  b: { x: number; y: number };
};

const ACCENT = "45, 212, 191";
const SECONDARY = "244, 114, 182";

const PAIRS: readonly PairCase[] = [
  { label: "Wide interval", a: { x: -2, y: -3 }, b: { x: 0, y: 1 } },
  { label: "One-unit run", a: { x: 0, y: 1 }, b: { x: 1, y: 3 } },
  { label: "Different points", a: { x: -1, y: -1 }, b: { x: 2, y: 5 } },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "slope-transfer-points",
    type: "short_answer",
    prompt: "Find the slope through (1, 2) and (4, 8). Enter m.",
    acceptableAnswers: ["2", "m=2", "m = 2"],
    explanation: "Δy = 8 − 2 = 6 and Δx = 4 − 1 = 3, so m = 6/3 = 2.",
  },
  {
    id: "slope-transfer-negative",
    type: "mcq",
    prompt: "A line falls 3 units for every 2 units it moves right. What is its slope?",
    options: ["−3/2", "3/2", "−2/3", "0"],
    correctAnswer: "−3/2",
    explanation: "Moving right makes Δx positive while the fall makes Δy negative, so the ratio is −3/2.",
  },
  {
    id: "slope-transfer-vertical",
    type: "tf",
    prompt: "A vertical line has slope 0.",
    correctAnswer: false,
    explanation: "A vertical line has Δx = 0, so Δy/Δx would require division by zero. Its slope is undefined.",
  },
];

export default function SlopeRateLessonExperience({
  breadcrumbs,
  previous,
  next,
  unitHref,
}: SlopeRateLessonExperienceProps) {
  const [pairIndex, setPairIndex] = useState(0);
  const [reversed, setReversed] = useState(false);
  const [measured, setMeasured] = useState(false);

  const pair = PAIRS[pairIndex];
  const first = reversed ? pair.b : pair.a;
  const second = reversed ? pair.a : pair.b;
  const rise = second.y - first.y;
  const run = second.x - first.x;
  const slope = rise / run;

  function choosePair(index: number) {
    setPairIndex(index);
    setReversed(false);
    setMeasured(false);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#041018] text-slate-100">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-55">
        <LinearBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_76%_13%,rgba(45,212,191,0.11),transparent_26%),radial-gradient(circle_at_13%_80%,rgba(59,130,246,0.07),transparent_27%),linear-gradient(to_bottom,rgba(4,16,24,0.18),rgba(2,8,14,0.88))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow="Lesson 01 · Slope & Rate of Change"
          icon={TrendingUp}
          title={<span>Slope & Rate of Change</span>}
          subtitle="Measure how two quantities change together, turn that comparison into slope, and learn why a straight line keeps the same rate between any two of its points."
          accentRgb={ACCENT}
          titleClassName="font-mono text-[clamp(2.2rem,4.35vw,4.55rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f4fffe]"
          iconClassName="rounded-[16px]"
          headerClassName="border-teal-300/[0.14]"
        />

        <LessonUtilityBar
          practiceTargetId="slope-practice"
          vocabulary
          accentRgb={ACCENT}
        />

        <section className="mt-4 grid gap-4 rounded-[26px] border border-teal-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-teal-300/75">The learner question</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">
              How fast is y changing compared with x?
            </h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">
              Slope is a comparison of two changes. Instead of asking only where two points are, it asks how much the output changed while the input changed by some amount.
            </p>
          </div>
          <div className="rounded-[18px] border border-teal-200/[0.09] bg-teal-400/[0.025] px-4 py-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-teal-300/65">Core relationship</div>
            <div className="mt-2 font-mono text-[clamp(1.25rem,2.4vw,1.8rem)] text-teal-100">m = Δy / Δx</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              Read it as “change in y divided by change in x.” The differences must be taken in the same point order.
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
          <div className="max-w-3xl">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-teal-300/72">Worked model</div>
            <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">First notice the repeated change.</h2>
            <p className="mt-2 text-[12px] leading-5 text-slate-500">
              In this table, every increase of 1 in x produces an increase of 2 in y. That constant change is what makes the relationship linear.
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="rounded-[22px] border border-white/[0.06] bg-black/[0.14] p-4">
              <div className="grid grid-cols-2 overflow-hidden rounded-[16px] border border-white/[0.06] font-mono text-center">
                <div className="bg-teal-400/[0.05] px-4 py-3 text-[11px] font-semibold text-teal-200">x</div>
                <div className="bg-pink-400/[0.05] px-4 py-3 text-[11px] font-semibold text-pink-200">y</div>
                {[[-1, -1], [0, 1], [1, 3], [2, 5]].map(([x, y]) => (
                  <div key={`${x}-${y}`} className="contents">
                    <div className="border-t border-white/[0.05] px-4 py-3 text-slate-300">{x}</div>
                    <div className="border-t border-white/[0.05] px-4 py-3 text-slate-300">{y}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <ChangeCard label="Input change" formula="Δx = +1" text="Move one column-step to the right." rgb="251, 191, 36" />
                <ChangeCard label="Output change" formula="Δy = +2" text="The output rises by two each time." rgb={SECONDARY} />
              </div>
            </div>

            <div className="rounded-[22px] border border-white/[0.06] bg-black/[0.14] p-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Turn the pattern into a ratio</div>
              <div className="mt-5 flex items-center justify-center gap-5 font-mono text-[clamp(1.35rem,3vw,2.2rem)]">
                <span className="text-teal-200">m</span>
                <span className="text-slate-600">=</span>
                <span className="rounded-xl border border-pink-300/[0.14] bg-pink-400/[0.035] px-4 py-3 text-pink-200">+2</span>
                <span className="text-slate-600">/</span>
                <span className="rounded-xl border border-amber-300/[0.14] bg-amber-400/[0.035] px-4 py-3 text-amber-200">+1</span>
                <span className="text-slate-600">=</span>
                <span className="text-white">2</span>
              </div>
              <p className="mx-auto mt-5 max-w-xl text-center text-[12px] leading-5 text-slate-500">
                A slope of 2 means: for every +1 in x, y increases by 2. The units of slope are “y-units per x-unit.”
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(310px,0.85fr)]">
          <div className="rounded-[28px] border border-teal-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-teal-300/72">Same line, different point pairs</div>
              <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">A straight line keeps the same slope everywhere.</h2>
              <p className="mt-2 text-[12px] leading-5 text-slate-500">
                Pick different pairs on the line y = 2x + 1. The rise and run change size, but their ratio does not.
              </p>
            </div>

            <div className="mt-4">
              <LinearMiniGraph
                slope={2}
                intercept={1}
                points={[{ ...first, label: `A (${first.x}, ${first.y})` }, { ...second, label: `B (${second.x}, ${second.y})` }]}
                showRiseRun={measured}
                accentRgb={ACCENT}
                secondaryRgb={SECONDARY}
                ariaLabel="Graph of y equals 2x plus 1 with two selected points"
              />
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {PAIRS.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => choosePair(index)}
                  className="rounded-[15px] border px-3 py-3 text-left"
                  style={{
                    borderColor: pairIndex === index ? `rgba(${ACCENT},0.28)` : "rgba(255,255,255,0.06)",
                    background: pairIndex === index ? `rgba(${ACCENT},0.05)` : "rgba(0,0,0,0.10)",
                  }}
                >
                  <span className="block text-[10px] font-semibold text-slate-300">{item.label}</span>
                  <span className="mt-1 block font-mono text-[10px] text-slate-600">({item.a.x}, {item.a.y}) → ({item.b.x}, {item.b.y})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.18] p-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Measure this pair</div>
              <div className="mt-3 font-mono text-[17px] text-white">A ({first.x}, {first.y}) → B ({second.x}, {second.y})</div>
              {!measured ? (
                <button
                  type="button"
                  onClick={() => setMeasured(true)}
                  className="mt-4 w-full rounded-xl border border-teal-300/[0.20] bg-teal-400/[0.045] px-4 py-3 text-[11px] font-semibold text-teal-200"
                >
                  Measure Δy and Δx
                </button>
              ) : (
                <div className="mt-4 space-y-2">
                  <Readout label="Rise" value={`Δy = ${rise}`} rgb={SECONDARY} />
                  <Readout label="Run" value={`Δx = ${run}`} rgb="251, 191, 36" />
                  <Readout label="Slope" value={`m = ${rise}/${run} = ${formatNumber(slope)}`} rgb={ACCENT} />
                </div>
              )}
            </div>

            <div className="rounded-[22px] border border-indigo-200/[0.08] bg-black/[0.18] p-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-indigo-300/65">Reverse the point order</div>
              <p className="mt-2 text-[11px] leading-5 text-slate-500">
                If you reverse the points, both differences change sign. The slope stays the same because the signs cancel together.
              </p>
              <button
                type="button"
                onClick={() => { setReversed((value) => !value); setMeasured(true); }}
                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-indigo-300/[0.16] px-3 py-2 text-[10px] font-semibold text-indigo-200"
              >
                <RefreshCcw size={13} />
                Reverse A and B
              </button>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/72">Read the sign and boundary</div>
            <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Slope describes direction as well as steepness.</h2>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <BoundaryCard title="Positive" formula="m > 0" text="As x increases, y increases. The line rises left to right." rgb="45, 212, 191" />
            <BoundaryCard title="Negative" formula="m < 0" text="As x increases, y decreases. The line falls left to right." rgb="244, 114, 182" />
            <BoundaryCard title="Zero" formula="m = 0" text="y does not change while x changes. The line is horizontal." rgb="96, 165, 250" />
            <BoundaryCard title="Undefined" formula="Δx = 0" text="A vertical line has no run, so Δy/Δx would divide by zero." rgb="251, 191, 36" />
          </div>
        </section>

        <section id="slope-practice" className="scroll-mt-24 mt-4">
          <details className="group overflow-hidden rounded-[22px] border border-white/[0.09] bg-black/[0.18] backdrop-blur-2xl">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.13em] text-teal-300/72">Transfer check</span>
                <strong className="mt-1 block text-[15px] text-slate-200">Use slope on three fresh cases</strong>
              </span>
              <Sparkles size={16} className="text-teal-300" />
            </summary>
            <div className="linear-assessment border-t border-white/[0.06] p-3 sm:p-4">
              <Assessment title="Slope & Rate of Change check" questions={QUIZ} accentColor="cyan" />
            </div>
          </details>
        </section>

        <div className="mt-4 rounded-[18px] border border-teal-200/[0.08] bg-teal-400/[0.025] px-4 py-3 text-[11px] leading-5 text-slate-500">
          <strong className="text-teal-200">Next:</strong> slope becomes the <span className="font-mono text-slate-300">m</span> in <span className="font-mono text-slate-300">y = mx + b</span>, where we pair a constant rate with a starting value.
        </div>

        <LessonNavigation previous={previous} next={next} unitHref={unitHref} />
      </div>

      <style>{`
        .linear-assessment > div { border-radius: 18px !important; padding: 16px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; }
        .linear-assessment > div > div { min-height: 300px !important; }
      `}</style>
    </main>
  );
}

function ChangeCard({ label, formula, text, rgb }: { label: string; formula: string; text: string; rgb: string }) {
  return (
    <div className="rounded-[16px] border border-white/[0.05] bg-white/[0.012] p-3">
      <div className="text-[9px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.72)` }}>{label}</div>
      <div className="mt-1.5 font-mono text-[15px]" style={{ color: `rgb(${rgb})` }}>{formula}</div>
      <p className="mt-1.5 text-[10px] leading-4 text-slate-600">{text}</p>
    </div>
  );
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[14px] border border-white/[0.05] bg-white/[0.012] px-3 py-2.5">
      <span className="text-[10px] text-slate-600">{label}</span>
      <strong className="font-mono text-[12px]" style={{ color: `rgb(${rgb})` }}>{value}</strong>
    </div>
  );
}

function BoundaryCard({ title, formula, text, rgb }: { title: string; formula: string; text: string; rgb: string }) {
  return (
    <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4">
      <div className="text-[10px] font-semibold text-white">{title}</div>
      <div className="mt-2 font-mono text-[15px]" style={{ color: `rgb(${rgb})` }}>{formula}</div>
      <p className="mt-2 text-[10px] leading-4 text-slate-600">{text}</p>
    </div>
  );
}

function LessonNavigation({ previous, next, unitHref }: { previous?: LinearLessonNavItem; next?: LinearLessonNavItem; unitHref: string }) {
  return (
    <nav className="mt-4 pb-8" aria-label="Graphing Linear Equations lesson navigation">
      <div className="mb-2 flex justify-end"><span className="font-mono text-[10px] text-slate-700">01 / 04</span></div>
      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? <NavCard item={previous} direction="previous" /> : <div className="hidden sm:block" aria-hidden="true" />}
        {next ? <NavCard item={next} direction="next" /> : (
          <Link href={unitHref} className="flex min-h-[76px] items-center rounded-[18px] border border-teal-300/[0.14] bg-teal-400/[0.025] px-4">
            <span className="min-w-0 flex-1 text-right"><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Unit</span><strong className="mt-1 block text-[14px] text-slate-200">Graphing Linear Equations</strong></span><Check size={15} className="ml-3 text-teal-300" />
          </Link>
        )}
      </div>
    </nav>
  );
}

function NavCard({ item, direction }: { item: LinearLessonNavItem; direction: "previous" | "next" }) {
  const isPrevious = direction === "previous";
  return (
    <Link href={item.href} className="flex min-h-[76px] items-center gap-3 rounded-[18px] border border-teal-300/[0.12] bg-teal-400/[0.018] px-4 py-3">
      {isPrevious ? <ArrowLeft size={15} className="text-teal-300" /> : null}
      <span className={`min-w-0 flex-1 ${isPrevious ? "" : "text-right"}`}>
        <span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">{isPrevious ? "Previous lesson" : "Next lesson"}</span>
        <strong className="mt-1 block text-[14px] text-slate-200">{item.label}</strong>
      </span>
      {!isPrevious ? <ArrowRight size={15} className="text-teal-300" /> : null}
    </Link>
  );
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) return String(value);
  return String(Number(value.toFixed(2)));
}
