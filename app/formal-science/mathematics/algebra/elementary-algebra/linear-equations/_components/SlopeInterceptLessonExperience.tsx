"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Equal,
  Sparkles,
} from "lucide-react";
import Assessment, { type AssessmentQuestion } from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import LinearBackground from "./LinearBackground";
import LinearMiniGraph from "./LinearMiniGraph";
import type { LinearLessonNavItem } from "./SlopeRateLessonExperience";

type SlopeInterceptLessonExperienceProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: LinearLessonNavItem;
  next?: LinearLessonNavItem;
  unitHref: string;
};

type Focus = "intercept" | "slope";

const ACCENT = "244, 114, 182";
const TEAL = "45, 212, 191";
const INTERCEPTS = [-3, 0, 2] as const;
const SLOPES = [-2, 0, 1, 2] as const;
const SAMPLE_XS = [-1, 0, 1, 2] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "slope-intercept-transfer-read",
    type: "mcq",
    prompt: "In y = −3x + 4, what is the y-intercept?",
    options: ["−3", "3", "4", "(4, 0)"],
    correctAnswer: "4",
    explanation: "b = 4, so when x = 0 the line passes through (0, 4).",
  },
  {
    id: "slope-intercept-transfer-change",
    type: "tf",
    prompt: "If b changes but m stays fixed, the line keeps the same slope.",
    correctAnswer: true,
    explanation: "Changing b moves the y-intercept while leaving the rate of change unchanged, so the lines are parallel.",
  },
  {
    id: "slope-intercept-transfer-evaluate",
    type: "short_answer",
    prompt: "For y = 2x − 3, find y when x = 4.",
    acceptableAnswers: ["5", "y=5", "y = 5"],
    explanation: "Substitute x = 4: y = 2(4) − 3 = 8 − 3 = 5.",
  },
];

export default function SlopeInterceptLessonExperience({
  breadcrumbs,
  previous,
  next,
  unitHref,
}: SlopeInterceptLessonExperienceProps) {
  const [focus, setFocus] = useState<Focus>("intercept");
  const [interceptIndex, setInterceptIndex] = useState(1);
  const [slopeIndex, setSlopeIndex] = useState(2);

  const slope = focus === "intercept" ? 2 : SLOPES[slopeIndex];
  const intercept = focus === "intercept" ? INTERCEPTS[interceptIndex] : 1;
  const samplePoints = SAMPLE_XS.map((x) => ({ x, y: slope * x + intercept }));

  function switchFocus(nextFocus: Focus) {
    setFocus(nextFocus);
    if (nextFocus === "intercept") setInterceptIndex(1);
    if (nextFocus === "slope") setSlopeIndex(2);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#120713] text-slate-100">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-45">
        <LinearBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_12%,rgba(244,114,182,0.12),transparent_27%),radial-gradient(circle_at_16%_78%,rgba(45,212,191,0.08),transparent_30%),linear-gradient(to_bottom,rgba(18,7,19,0.22),rgba(5,5,12,0.90))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow="Lesson 02 · Slope-Intercept Form"
          icon={Equal}
          title={<span>Slope-Intercept Form</span>}
          subtitle="Read y = mx + b as a complete linear story: b gives the output when x starts at zero, and m tells how that output changes for each step in x."
          accentRgb={ACCENT}
          titleClassName="font-mono text-[clamp(2.2rem,4.35vw,4.55rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#fff6fb]"
          iconClassName="rounded-[16px]"
          headerClassName="border-pink-300/[0.14]"
        />

        <LessonUtilityBar
          practiceTargetId="slope-intercept-practice"
          vocabulary
          accentRgb={ACCENT}
        />

        <section className="mt-4 grid gap-4 rounded-[26px] border border-pink-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-pink-300/75">The learner question</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">
              How can two numbers describe an entire straight-line relationship?
            </h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">
              Slope-intercept form separates a linear relationship into two jobs: a starting output and a constant rate of change from that start.
            </p>
          </div>
          <div className="rounded-[18px] border border-pink-200/[0.09] bg-pink-400/[0.025] px-4 py-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-pink-300/65">The form</div>
            <div className="mt-2 font-mono text-[clamp(1.4rem,2.6vw,2rem)] text-white">
              y = <span className="text-teal-200">m</span>x + <span className="text-pink-200">b</span>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              <span className="text-teal-200">m</span> is slope. <span className="text-pink-200">b</span> is the y-intercept, the value of y when x = 0.
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
          <div className="max-w-3xl">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-pink-300/72">Worked model</div>
            <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">Read y = 2x − 1 from the starting point outward.</h2>
            <p className="mt-2 text-[12px] leading-5 text-slate-500">
              Setting x to zero exposes the intercept. Then slope tells us what happens as x moves away from zero.
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="space-y-3">
              <ModelStep number="01" label="Find the start" formula="x = 0 → y = −1" text="The line crosses the y-axis at (0, −1), so b = −1." rgb={ACCENT} />
              <ModelStep number="02" label="Apply the rate" formula="+1 in x → +2 in y" text="The slope m = 2 means every rightward step of 1 raises y by 2." rgb={TEAL} />
              <ModelStep number="03" label="Generate solutions" formula="(0,−1), (1,1), (2,3)" text="Repeating the same rate creates ordered pairs that all satisfy the equation." rgb="96, 165, 250" />
            </div>

            <div className="rounded-[22px] border border-white/[0.06] bg-black/[0.14] p-4">
              <div className="grid grid-cols-4 overflow-hidden rounded-[16px] border border-white/[0.06] font-mono text-center">
                <div className="col-span-1 bg-teal-400/[0.05] px-3 py-3 text-[10px] text-teal-200">x</div>
                <div className="col-span-1 bg-pink-400/[0.05] px-3 py-3 text-[10px] text-pink-200">2x</div>
                <div className="col-span-1 bg-pink-400/[0.04] px-3 py-3 text-[10px] text-pink-200">−1</div>
                <div className="col-span-1 bg-white/[0.03] px-3 py-3 text-[10px] text-white">y</div>
                {[0, 1, 2].map((x) => (
                  <div key={x} className="contents">
                    <div className="border-t border-white/[0.05] px-3 py-3 text-slate-300">{x}</div>
                    <div className="border-t border-white/[0.05] px-3 py-3 text-slate-300">{2 * x}</div>
                    <div className="border-t border-white/[0.05] px-3 py-3 text-slate-500">−1</div>
                    <div className="border-t border-white/[0.05] px-3 py-3 text-white">{2 * x - 1}</div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10px] leading-4 text-slate-600">The same equation coordinates the table, graph, and verbal rate. These are different views of one relationship.</p>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
          <div className="grid gap-3 md:grid-cols-2">
            <RuleCard label="b sets the anchor" formula="x = 0 ⇒ y = b" text="The y-intercept is not merely where the line happens to cross. It is the output built into the rule when the input is zero." rgb={ACCENT} />
            <RuleCard label="m sets the rate" formula="m = Δy / Δx" text="Once the line is anchored, the slope determines the same change in y for every equal change in x." rgb={TEAL} />
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="rounded-[28px] border border-pink-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-pink-300/72">Parameter lab</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Change one parameter at a time.</h2>
                <p className="mt-2 text-[12px] leading-5 text-slate-500">Isolating one parameter makes its job visible instead of turning the first interaction into a two-slider sandbox.</p>
              </div>
              <div className="flex gap-2">
                <FocusButton active={focus === "intercept"} label="Change b" rgb={ACCENT} onClick={() => switchFocus("intercept")} />
                <FocusButton active={focus === "slope"} label="Change m" rgb={TEAL} onClick={() => switchFocus("slope")} />
              </div>
            </div>

            <div className="mt-4">
              <LinearMiniGraph
                slope={slope}
                intercept={intercept}
                points={[{ x: 0, y: intercept, label: `(0, ${intercept})` }]}
                accentRgb={focus === "intercept" ? ACCENT : TEAL}
                secondaryRgb={focus === "intercept" ? TEAL : ACCENT}
                ariaLabel={`Graph of ${formatEquation(slope, intercept)}`}
              />
            </div>

            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {focus === "intercept"
                ? INTERCEPTS.map((value, index) => (
                    <ParameterButton key={value} active={interceptIndex === index} label={`b = ${value}`} rgb={ACCENT} onClick={() => setInterceptIndex(index)} />
                  ))
                : SLOPES.map((value, index) => (
                    <ParameterButton key={value} active={slopeIndex === index} label={`m = ${value}`} rgb={TEAL} onClick={() => setSlopeIndex(index)} />
                  ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.18] p-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Current relationship</div>
              <div className="mt-2 font-mono text-[22px] text-white">{formatEquation(slope, intercept)}</div>
              <div className="mt-4 space-y-2">
                <Readout label="Slope m" value={formatNumber(slope)} rgb={TEAL} />
                <Readout label="Y-intercept b" value={`(0, ${formatNumber(intercept)})`} rgb={ACCENT} />
              </div>
              <p className="mt-3 text-[11px] leading-5 text-slate-500">
                {focus === "intercept"
                  ? "m stays at 2. Changing b slides the line to a new starting height without changing its steepness, so the resulting lines are parallel."
                  : "b stays at 1. Changing m changes direction and steepness while every line keeps the same anchor point (0, 1)."}
              </p>
            </div>

            <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.18] p-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Sample values</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {samplePoints.map((point) => (
                  <div key={point.x} className="rounded-[13px] border border-white/[0.05] bg-white/[0.012] px-3 py-2 font-mono text-[10px] text-slate-400">
                    x={point.x} → <span className="text-white">y={formatNumber(point.y)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/72">Stress-test the form</div>
            <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Three special readings are worth recognizing immediately.</h2>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <BoundaryCard title="b = 0" formula="y = mx" text="The starting output is zero, so the line passes through the origin." rgb={ACCENT} />
            <BoundaryCard title="m = 0" formula="y = b" text="The output never changes as x changes, so the line is horizontal." rgb={TEAL} />
            <BoundaryCard title="Vertical line" formula="x = c" text="A vertical line has undefined slope, so it cannot be written as y = mx + b. A later lesson compares the forms that handle this cleanly." rgb="251, 191, 36" />
          </div>
        </section>

        <section id="slope-intercept-practice" className="scroll-mt-24 mt-4">
          <details className="group overflow-hidden rounded-[22px] border border-white/[0.09] bg-black/[0.18] backdrop-blur-2xl">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.13em] text-pink-300/72">Transfer check</span>
                <strong className="mt-1 block text-[15px] text-slate-200">Read and use a fresh linear rule</strong>
              </span>
              <Sparkles size={16} className="text-pink-300" />
            </summary>
            <div className="linear-assessment border-t border-white/[0.06] p-3 sm:p-4">
              <Assessment title="Slope-Intercept Form check" questions={QUIZ} accentColor="cyan" />
            </div>
          </details>
        </section>

        <div className="mt-4 rounded-[18px] border border-pink-200/[0.08] bg-pink-400/[0.025] px-4 py-3 text-[11px] leading-5 text-slate-500">
          <strong className="text-pink-200">Next:</strong> use <span className="font-mono text-slate-300">b</span> as the first point and <span className="font-mono text-slate-300">m</span> as a repeatable move to construct the entire line on a coordinate plane.
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

function ModelStep({ number, label, formula, text, rgb }: { number: string; label: string; formula: string; text: string; rgb: string }) {
  return (
    <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4">
      <div className="flex items-center gap-3"><span className="font-mono text-[9px] text-slate-700">{number}</span><strong className="text-[12px] text-white">{label}</strong></div>
      <div className="mt-2 font-mono text-[15px]" style={{ color: `rgb(${rgb})` }}>{formula}</div>
      <p className="mt-2 text-[10px] leading-4 text-slate-600">{text}</p>
    </div>
  );
}

function RuleCard({ label, formula, text, rgb }: { label: string; formula: string; text: string; rgb: string }) {
  return (
    <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
      <div className="text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${rgb},0.72)` }}>{label}</div>
      <div className="mt-2 font-mono text-[17px]" style={{ color: `rgb(${rgb})` }}>{formula}</div>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p>
    </div>
  );
}

function FocusButton({ active, label, rgb, onClick }: { active: boolean; label: string; rgb: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-xl border px-3 py-2 text-[10px] font-semibold" style={{ borderColor: active ? `rgba(${rgb},0.28)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${rgb},0.06)` : "rgba(0,0,0,0.10)", color: active ? `rgb(${rgb})` : "rgb(100 116 139)" }}>{label}</button>;
}

function ParameterButton({ active, label, rgb, onClick }: { active: boolean; label: string; rgb: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-xl border px-4 py-2.5 font-mono text-[11px]" style={{ borderColor: active ? `rgba(${rgb},0.30)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${rgb},0.055)` : "rgba(0,0,0,0.10)", color: active ? `rgb(${rgb})` : "rgb(100 116 139)" }}>{label}</button>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="flex items-center justify-between gap-3 rounded-[14px] border border-white/[0.05] bg-white/[0.012] px-3 py-2.5"><span className="text-[10px] text-slate-600">{label}</span><strong className="font-mono text-[12px]" style={{ color: `rgb(${rgb})` }}>{value}</strong></div>;
}

function BoundaryCard({ title, formula, text, rgb }: { title: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="text-[10px] font-semibold text-white">{title}</div><div className="mt-2 font-mono text-[15px]" style={{ color: `rgb(${rgb})` }}>{formula}</div><p className="mt-2 text-[10px] leading-4 text-slate-600">{text}</p></div>;
}

function LessonNavigation({ previous, next, unitHref }: { previous?: LinearLessonNavItem; next?: LinearLessonNavItem; unitHref: string }) {
  return (
    <nav className="mt-4 pb-8" aria-label="Graphing Linear Equations lesson navigation">
      <div className="mb-2 flex justify-end"><span className="font-mono text-[10px] text-slate-700">02 / 04</span></div>
      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? <NavCard item={previous} direction="previous" /> : <div className="hidden sm:block" aria-hidden="true" />}
        {next ? <NavCard item={next} direction="next" /> : <Link href={unitHref} className="flex min-h-[76px] items-center rounded-[18px] border border-pink-300/[0.14] bg-pink-400/[0.025] px-4"><span className="min-w-0 flex-1 text-right"><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Unit</span><strong className="mt-1 block text-[14px] text-slate-200">Graphing Linear Equations</strong></span><Check size={15} className="ml-3 text-pink-300" /></Link>}
      </div>
    </nav>
  );
}

function NavCard({ item, direction }: { item: LinearLessonNavItem; direction: "previous" | "next" }) {
  const isPrevious = direction === "previous";
  return <Link href={item.href} className="flex min-h-[76px] items-center gap-3 rounded-[18px] border border-pink-300/[0.12] bg-pink-400/[0.018] px-4 py-3">{isPrevious ? <ArrowLeft size={15} className="text-pink-300" /> : null}<span className={`min-w-0 flex-1 ${isPrevious ? "" : "text-right"}`}><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">{isPrevious ? "Previous lesson" : "Next lesson"}</span><strong className="mt-1 block text-[14px] text-slate-200">{item.label}</strong></span>{!isPrevious ? <ArrowRight size={15} className="text-pink-300" /> : null}</Link>;
}

function formatEquation(slope: number, intercept: number) {
  const slopePart = slope === 0 ? "" : slope === 1 ? "x" : slope === -1 ? "−x" : `${formatNumber(slope)}x`;
  if (slope === 0) return `y = ${formatNumber(intercept)}`;
  if (intercept === 0) return `y = ${slopePart}`;
  return `y = ${slopePart} ${intercept > 0 ? "+" : "−"} ${formatNumber(Math.abs(intercept))}`;
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) return String(value);
  return String(Number(value.toFixed(2)));
}
