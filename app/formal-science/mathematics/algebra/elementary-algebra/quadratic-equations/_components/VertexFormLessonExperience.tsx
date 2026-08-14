"use client";

import { useState } from "react";
import { Move } from "lucide-react";
import type { AssessmentQuestion } from "@/app/_components/Assessment";
import QuadraticMiniGraph, { formatNumber } from "./QuadraticMiniGraph";
import QuadraticsLessonShell, { type QuadraticsLessonNavItem } from "./QuadraticsLessonShell";

type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: QuadraticsLessonNavItem;
  next?: QuadraticsLessonNavItem;
  unitHref: string;
};

type Focus = "a" | "h" | "k";

const ACCENT = "129, 140, 248";
const PINK = "244, 114, 182";
const TEAL = "45, 212, 191";
const A_VALUES = [-2, -1, 0.5, 2] as const;
const H_VALUES = [-3, 0, 2] as const;
const K_VALUES = [-3, 0, 2] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "vertex-form-read-vertex",
    type: "mcq",
    prompt: "What is the vertex of y = 3(x − 4)² + 1?",
    options: ["(4, 1)", "(−4, 1)", "(3, 1)", "(4, −1)"],
    correctAnswer: "(4, 1)",
    explanation: "Vertex form is y = a(x − h)² + k, so h = 4 and k = 1.",
  },
  {
    id: "vertex-form-negative-a",
    type: "tf",
    prompt: "The graph of y = −(x + 2)² opens downward.",
    correctAnswer: true,
    explanation: "A negative a-value reflects the parabola across the x-axis, so the vertex becomes a maximum.",
  },
  {
    id: "vertex-form-axis",
    type: "short_answer",
    prompt: "Write the axis of symmetry for y = 2(x + 5)² − 3.",
    acceptableAnswers: ["x=-5", "x = -5", "x=−5", "x = −5"],
    explanation: "x + 5 is x − (−5), so h = −5 and the axis is x = −5.",
  },
];

export default function VertexFormLessonExperience({ breadcrumbs, previous, next, unitHref }: Props) {
  const [focus, setFocus] = useState<Focus>("h");
  const [aIndex, setAIndex] = useState(2);
  const [hIndex, setHIndex] = useState(1);
  const [kIndex, setKIndex] = useState(1);

  const a = focus === "a" ? A_VALUES[aIndex] : 1;
  const h = focus === "h" ? H_VALUES[hIndex] : 0;
  const k = focus === "k" ? K_VALUES[kIndex] : 0;

  function switchFocus(nextFocus: Focus) {
    setFocus(nextFocus);
    setAIndex(2);
    setHIndex(1);
    setKIndex(1);
  }

  return (
    <QuadraticsLessonShell
      breadcrumbs={breadcrumbs}
      previous={previous}
      next={next}
      unitHref={unitHref}
      step="02"
      title="Vertex Form & Transformations"
      subtitle="Read y = a(x − h)² + k as a transformation map: a controls opening and width, while h and k place the turning point."
      eyebrow="Shape and position"
      accentRgb={ACCENT}
      base="#08091c"
      icon={Move}
      practiceId="vertex-form-practice"
      questions={QUIZ}
      assessmentColor="indigo"
    >
      <section className="mt-4 grid gap-4 rounded-[26px] border border-indigo-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/75">The learner question</div>
          <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">How can three parameters place and shape an entire parabola?</h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Vertex form starts with the parent curve y = x², then stretches, reflects, and translates it without hiding the turning point.</p>
        </div>
        <div className="rounded-[18px] border border-indigo-200/[0.09] bg-indigo-400/[0.025] px-4 py-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-indigo-300/65">The form</div>
          <div className="mt-2 font-mono text-[16px] text-white">y = <span className="text-teal-200">a</span>(x − <span className="text-pink-200">h</span>)² + <span className="text-indigo-200">k</span></div>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">The vertex is (h, k), and the axis of symmetry is x = h.</p>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
        <div className="max-w-3xl">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/72">Worked model</div>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">Read y = 2(x − 1)² − 3 from the vertex outward.</h2>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid content-center gap-3">
            <StepCard number="01" title="Place the vertex" formula="(h, k) = (1, −3)" text="The curve turns at (1, −3), and its mirror line is x = 1." rgb={PINK} />
            <StepCard number="02" title="Read the opening" formula="a = 2 > 0" text="Positive a opens upward, so the vertex is a minimum." rgb={TEAL} />
            <StepCard number="03" title="Read the width" formula="|a| = 2 > 1" text="The output changes faster than y = x², so the parabola appears narrower." rgb={ACCENT} />
          </div>
          <QuadraticMiniGraph a={2} h={1} k={-3} accentRgb={ACCENT} secondaryRgb={PINK} ariaLabel="Graph of y equals 2 times x minus 1 squared minus 3" />
        </div>
      </section>

      <section className="mt-4 grid gap-3 md:grid-cols-3">
        <RuleCard label="a changes shape" formula="a < 0 flips · |a| changes width" text="The sign controls opening. Magnitude controls vertical stretch or compression." rgb={TEAL} />
        <RuleCard label="h moves sideways" formula="x − h" text="The sign appears opposite inside the parentheses: x + 3 means h = −3." rgb={PINK} />
        <RuleCard label="k moves vertically" formula="+ k" text="k raises or lowers every output, including the vertex." rgb={ACCENT} />
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.14fr)_minmax(320px,0.86fr)]">
        <div className="rounded-[28px] border border-indigo-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/72">Transformation lab</div>
              <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Change one parameter at a time.</h2>
              <p className="mt-2 text-[11px] leading-5 text-slate-500">Holding the other parameters fixed makes each job visible instead of blending three effects into one slider cloud.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <FocusButton label="Change a" active={focus === "a"} rgb={TEAL} onClick={() => switchFocus("a")} />
              <FocusButton label="Change h" active={focus === "h"} rgb={PINK} onClick={() => switchFocus("h")} />
              <FocusButton label="Change k" active={focus === "k"} rgb={ACCENT} onClick={() => switchFocus("k")} />
            </div>
          </div>
          <div className="mt-4">
            <QuadraticMiniGraph a={a} h={h} k={k} accentRgb={ACCENT} secondaryRgb={focus === "a" ? TEAL : PINK} ariaLabel={`Graph of ${formatVertexEquation(a, h, k)}`} />
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {focus === "a"
              ? A_VALUES.map((value, index) => <ParameterButton key={value} label={`a = ${value}`} active={aIndex === index} rgb={TEAL} onClick={() => setAIndex(index)} />)
              : focus === "h"
                ? H_VALUES.map((value, index) => <ParameterButton key={value} label={`h = ${value}`} active={hIndex === index} rgb={PINK} onClick={() => setHIndex(index)} />)
                : K_VALUES.map((value, index) => <ParameterButton key={value} label={`k = ${value}`} active={kIndex === index} rgb={ACCENT} onClick={() => setKIndex(index)} />)}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.18] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Current parabola</div>
          <div className="mt-2 font-mono text-[17px] text-white">{formatVertexEquation(a, h, k)}</div>
          <div className="mt-4 space-y-2">
            <Readout label="Vertex" value={`(${formatNumber(h)}, ${formatNumber(k)})`} rgb={PINK} />
            <Readout label="Axis" value={`x = ${formatNumber(h)}`} rgb={ACCENT} />
            <Readout label="Opening" value={a > 0 ? "upward · minimum" : "downward · maximum"} rgb={TEAL} />
            <Readout label="Width" value={Math.abs(a) > 1 ? "narrower than y = x²" : Math.abs(a) < 1 ? "wider than y = x²" : "same width as y = x²"} rgb="148, 163, 184" />
          </div>
          <div className="mt-5 border-t border-white/[0.06] pt-4 text-[11px] leading-5 text-slate-500"><strong className="text-pink-200">Sign trap:</strong> in y = (x + 3)², the parentheses are x − (−3). The vertex is at x = −3, not x = 3.</div>
        </div>
      </section>
    </QuadraticsLessonShell>
  );
}

function formatVertexEquation(a: number, h: number, k: number) {
  const coefficient = a === 1 ? "" : a === -1 ? "−" : formatNumber(a);
  const inside = h === 0 ? "x" : `x ${h > 0 ? "−" : "+"} ${formatNumber(Math.abs(h))}`;
  const vertical = k === 0 ? "" : ` ${k > 0 ? "+" : "−"} ${formatNumber(Math.abs(k))}`;
  return `y = ${coefficient}(${inside})²${vertical}`;
}

function StepCard({ number, title, formula, text, rgb }: { number: string; title: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.13] p-4"><div className="flex items-center justify-between"><span className="font-mono text-[9px]" style={{ color: `rgba(${rgb},0.72)` }}>{number}</span><span className="text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">{title}</span></div><div className="mt-2 font-mono text-[13px] text-white">{formula}</div><p className="mt-1.5 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function RuleCard({ label, formula, text, rgb }: { label: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.17] p-4"><div className="text-[9px] font-semibold uppercase tracking-[0.11em]" style={{ color: `rgba(${rgb},0.75)` }}>{label}</div><div className="mt-2 font-mono text-[13px] text-white">{formula}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{text}</p></div>;
}

function FocusButton({ label, active, rgb, onClick }: { label: string; active: boolean; rgb: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-xl border px-3 py-2 text-[10px] font-semibold" style={{ borderColor: active ? `rgba(${rgb},0.30)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${rgb},0.06)` : "rgba(0,0,0,0.10)", color: active ? `rgb(${rgb})` : "rgb(100,116,139)" }}>{label}</button>;
}

function ParameterButton({ label, active, rgb, onClick }: { label: string; active: boolean; rgb: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-xl border px-3 py-2 font-mono text-[10px]" style={{ borderColor: active ? `rgba(${rgb},0.34)` : "rgba(255,255,255,0.06)", background: active ? `rgba(${rgb},0.07)` : "rgba(0,0,0,0.10)", color: active ? `rgb(${rgb})` : "rgb(100,116,139)" }}>{label}</button>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="flex items-center justify-between gap-4 rounded-[13px] border border-white/[0.05] bg-black/[0.10] px-3 py-2"><span className="text-[10px] text-slate-600">{label}</span><strong className="text-right font-mono text-[10px]" style={{ color: `rgb(${rgb})` }}>{value}</strong></div>;
}
