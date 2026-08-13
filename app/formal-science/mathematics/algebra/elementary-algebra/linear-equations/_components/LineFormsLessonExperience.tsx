"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Repeat2,
  Sparkles,
} from "lucide-react";
import Assessment, { type AssessmentQuestion } from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import LinearBackground from "./LinearBackground";
import LinearMiniGraph from "./LinearMiniGraph";
import type { LinearLessonNavItem } from "./SlopeRateLessonExperience";

type LineFormsLessonExperienceProps = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: LinearLessonNavItem;
  next?: LinearLessonNavItem;
  unitHref: string;
};

type FormId = "slope-intercept" | "point-slope" | "standard";

type TranslationCase = {
  given: string;
  target: string;
  options: readonly string[];
  answer: string;
  explanation: string;
};

const ACCENT = "129, 140, 248";
const TEAL = "45, 212, 191";
const PINK = "244, 114, 182";

const FORMS: Record<FormId, { label: string; formula: string; foreground: string; example: string; color: string }> = {
  "slope-intercept": {
    label: "Slope-intercept",
    formula: "y = mx + b",
    foreground: "Makes slope m and y-intercept b immediately visible.",
    example: "y = 2x − 3",
    color: "45, 212, 191",
  },
  "point-slope": {
    label: "Point-slope",
    formula: "y − y₁ = m(x − x₁)",
    foreground: "Builds a line directly from one known point and its slope.",
    example: "y − 1 = 2(x − 2)",
    color: "244, 114, 182",
  },
  standard: {
    label: "Standard",
    formula: "Ax + By = C",
    foreground: "Treats x and y symmetrically and represents vertical lines cleanly.",
    example: "2x − y = 3",
    color: "129, 140, 248",
  },
};

const TRANSLATIONS: readonly TranslationCase[] = [
  {
    given: "y = 2x − 3",
    target: "Point-slope form through (2, 1)",
    options: ["y − 1 = 2(x − 2)", "y + 1 = 2(x + 2)", "y − 2 = x − 1"],
    answer: "y − 1 = 2(x − 2)",
    explanation: "Use m = 2 and the point (2, 1): y − y₁ = m(x − x₁).",
  },
  {
    given: "y = −x + 4",
    target: "Standard form",
    options: ["x + y = 4", "x − y = 4", "−x + y = 4"],
    answer: "x + y = 4",
    explanation: "Add x to both sides. The same line becomes x + y = 4.",
  },
  {
    given: "3x + y = 6",
    target: "Slope-intercept form",
    options: ["y = 3x + 6", "y = −3x + 6", "y = −3x − 6"],
    answer: "y = −3x + 6",
    explanation: "Subtract 3x from both sides to isolate y: y = −3x + 6.",
  },
] as const;

const QUIZ: AssessmentQuestion[] = [
  {
    id: "forms-transfer-point-slope",
    type: "mcq",
    prompt: "Which equation is point-slope form for slope −2 through (3, 5)?",
    options: ["y − 5 = −2(x − 3)", "y + 5 = −2(x + 3)", "y = −2x + 3"],
    correctAnswer: "y − 5 = −2(x − 3)",
    explanation: "Substitute m = −2, x₁ = 3, and y₁ = 5 into y − y₁ = m(x − x₁).",
  },
  {
    id: "forms-transfer-standard",
    type: "mcq",
    prompt: "Which standard-form equation is equivalent to y = 2x + 1?",
    options: ["2x − y = −1", "2x + y = 1", "x − 2y = −1"],
    correctAnswer: "2x − y = −1",
    explanation: "Move y to the left and 1 to the right: 2x − y = −1.",
  },
  {
    id: "forms-transfer-vertical",
    type: "tf",
    prompt: "The vertical line x = 4 cannot be written in slope-intercept form y = mx + b.",
    correctAnswer: true,
    explanation: "A vertical line has undefined slope, so no finite m can represent it in y = mx + b.",
  },
];

export default function LineFormsLessonExperience({
  breadcrumbs,
  previous,
  next,
  unitHref,
}: LineFormsLessonExperienceProps) {
  const [form, setForm] = useState<FormId>("slope-intercept");
  const [caseIndex, setCaseIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);

  const active = FORMS[form];
  const translation = TRANSLATIONS[caseIndex];
  const correct = answer === translation.answer;

  function nextCase() {
    setCaseIndex((current) => (current + 1) % TRANSLATIONS.length);
    setAnswer(null);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#09091d] text-slate-100">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-42"><LinearBackground /></div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_12%,rgba(129,140,248,0.14),transparent_27%),radial-gradient(circle_at_14%_80%,rgba(244,114,182,0.07),transparent_28%),linear-gradient(to_bottom,rgba(9,9,29,0.20),rgba(3,4,13,0.91))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow="Lesson 04 · Line Forms & Special Cases"
          icon={Repeat2}
          title={<span>Line Forms & Special Cases</span>}
          subtitle="See slope-intercept, point-slope, and standard form as different descriptions of the same line, then learn which forms stay useful when the line is horizontal or vertical."
          accentRgb={ACCENT}
          titleClassName="font-mono text-[clamp(2.15rem,4.15vw,4.35rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f7f7ff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-indigo-300/[0.14]"
        />

        <LessonUtilityBar practiceTargetId="line-forms-practice" vocabulary accentRgb={ACCENT} />

        <section className="mt-4 grid gap-4 rounded-[26px] border border-indigo-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/75">The learner question</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.035em] text-white">Why would we rewrite a line if the line itself has not changed?</h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400">Different forms expose different information. Rewriting is useful when it makes the next question easier, while preserving exactly the same set of ordered-pair solutions.</p>
          </div>
          <div className="rounded-[18px] border border-indigo-200/[0.09] bg-indigo-400/[0.025] px-4 py-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-indigo-300/65">Invariant</div>
            <div className="mt-2 font-mono text-[13px] text-indigo-100">notation changes · solution set stays</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Equivalent forms are not three nearby lines. They are three algebraic views of one identical geometric object.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
          <div className="rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
            <div className="max-w-3xl">
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/72">Worked model</div>
              <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">One line, three forms.</h2>
              <p className="mt-2 text-[12px] leading-5 text-slate-500">The line y = 2x − 3 passes through (2, 1). Rewriting it changes which facts are visible first.</p>
            </div>
            <div className="mt-4"><LinearMiniGraph slope={2} intercept={-3} points={[{ x: 0, y: -3, label: "(0, −3)" }, { x: 2, y: 1, label: "(2, 1)" }]} accentRgb={ACCENT} secondaryRgb={PINK} ariaLabel="Graph of the line represented by three equivalent forms" /></div>
          </div>

          <div className="rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {(Object.keys(FORMS) as FormId[]).map((id) => {
                const item = FORMS[id];
                return <button key={id} type="button" onClick={() => setForm(id)} className="rounded-[18px] border p-4 text-left" style={{ borderColor: form === id ? `rgba(${item.color},0.30)` : "rgba(255,255,255,0.06)", background: form === id ? `rgba(${item.color},0.055)` : "rgba(0,0,0,0.10)" }}><div className="text-[10px] font-semibold text-white">{item.label}</div><div className="mt-2 font-mono text-[13px]" style={{ color: `rgb(${item.color})` }}>{item.example}</div></button>;
              })}
            </div>
            <div className="mt-4 rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ color: `rgba(${active.color},0.72)` }}>{active.label} lens</div>
              <div className="mt-2 font-mono text-[17px]" style={{ color: `rgb(${active.color})` }}>{active.formula}</div>
              <p className="mt-2 text-[11px] leading-5 text-slate-500">{active.foreground}</p>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/72">What each form foregrounds</div>
            <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Choose a form because of the information you already have or need next.</h2>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <FormCard label="Slope-intercept" formula="y = mx + b" text="Best when slope and y-intercept are known or when you want to graph from those two features." rgb={TEAL} />
            <FormCard label="Point-slope" formula="y − y₁ = m(x − x₁)" text="Best when you know a slope and any point, without first calculating the y-intercept." rgb={PINK} />
            <FormCard label="Standard" formula="Ax + By = C" text="Useful for symmetric algebra, intercepts, systems, and vertical lines such as x = 3." rgb={ACCENT} />
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(330px,0.9fr)]">
          <div className="rounded-[28px] border border-indigo-200/[0.12] bg-black/[0.20] p-5 backdrop-blur-2xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-300/72">Translation workbench</div>
                <h2 className="mt-1 text-[21px] font-semibold tracking-[-0.025em] text-white">Rewrite the line without changing it.</h2>
              </div>
              <button type="button" onClick={nextCase} className="rounded-xl border border-white/[0.07] px-3 py-2 text-[10px] font-semibold text-slate-500 hover:text-slate-300">Next translation</button>
            </div>

            <div className="mt-4 rounded-[20px] border border-white/[0.06] bg-black/[0.14] p-4 text-center">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">Given line</div>
              <div className="mt-2 font-mono text-[22px] text-white">{translation.given}</div>
              <div className="mt-3 text-[11px] text-indigo-200">Target: {translation.target}</div>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {translation.options.map((option) => (
                <button key={option} type="button" onClick={() => setAnswer(option)} className="rounded-[16px] border px-3 py-4 font-mono text-[11px]" style={{ borderColor: answer === option ? `rgba(${ACCENT},0.30)` : "rgba(255,255,255,0.06)", background: answer === option ? `rgba(${ACCENT},0.055)` : "rgba(0,0,0,0.10)", color: answer === option ? `rgb(${ACCENT})` : "rgb(100 116 139)" }}>{option}</button>
              ))}
            </div>

            {answer ? <div className={`mt-3 rounded-[16px] border px-4 py-3 text-[10px] leading-4 ${correct ? "border-emerald-300/[0.14] bg-emerald-400/[0.025] text-emerald-200" : "border-amber-300/[0.14] bg-amber-400/[0.025] text-amber-200"}`}>{correct ? translation.explanation : "That equation changes the relationship or uses the target form incorrectly. Preserve every solution while you rearrange."}</div> : null}
          </div>

          <div className="rounded-[28px] border border-amber-200/[0.10] bg-black/[0.18] p-5 backdrop-blur-2xl">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/72">Special cases</div>
            <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.025em] text-white">Horizontal and vertical lines expose the limits of the forms.</h2>
            <div className="mt-4 space-y-3">
              <SpecialCard title="Horizontal" equation="y = −2" text="Slope is 0. Slope-intercept form works perfectly: m = 0 and b = −2." rgb="96, 165, 250" />
              <SpecialCard title="Vertical" equation="x = 3" text="Slope is undefined. Slope-intercept and point-slope require a finite slope, but standard form handles x = 3 directly." rgb="251, 191, 36" />
            </div>
          </div>
        </section>

        <section id="line-forms-practice" className="scroll-mt-24 mt-4">
          <details className="group overflow-hidden rounded-[22px] border border-white/[0.09] bg-black/[0.18] backdrop-blur-2xl">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4"><span><span className="block text-[9px] font-semibold uppercase tracking-[0.13em] text-indigo-300/72">Transfer check</span><strong className="mt-1 block text-[15px] text-slate-200">Choose and translate line forms</strong></span><Sparkles size={16} className="text-indigo-300" /></summary>
            <div className="linear-assessment border-t border-white/[0.06] p-3 sm:p-4"><Assessment title="Line Forms & Special Cases check" questions={QUIZ} accentColor="indigo" /></div>
          </details>
        </section>

        <div className="mt-4 rounded-[18px] border border-indigo-200/[0.08] bg-indigo-400/[0.025] px-4 py-3 text-[11px] leading-5 text-slate-500"><strong className="text-indigo-200">Unit complete:</strong> you can now measure a linear rate, encode it as y = mx + b, construct its graph, and recognize equivalent line forms. Systems of Equations builds on this by asking where two linear relationships are true at the same time.</div>

        <LessonNavigation previous={previous} next={next} unitHref={unitHref} />
      </div>

      <style>{`.linear-assessment > div { border-radius: 18px !important; padding: 16px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; } .linear-assessment > div > div { min-height: 300px !important; }`}</style>
    </main>
  );
}

function FormCard({ label, formula, text, rgb }: { label: string; formula: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="text-[10px] font-semibold text-white">{label}</div><div className="mt-2 font-mono text-[14px]" style={{ color: `rgb(${rgb})` }}>{formula}</div><p className="mt-2 text-[10px] leading-4 text-slate-600">{text}</p></div>;
}

function SpecialCard({ title, equation, text, rgb }: { title: string; equation: string; text: string; rgb: string }) {
  return <div className="rounded-[18px] border border-white/[0.06] bg-black/[0.12] p-4"><div className="flex items-center justify-between gap-3"><strong className="text-[11px] text-white">{title}</strong><span className="font-mono text-[13px]" style={{ color: `rgb(${rgb})` }}>{equation}</span></div><p className="mt-2 text-[10px] leading-4 text-slate-600">{text}</p></div>;
}

function LessonNavigation({ previous, next, unitHref }: { previous?: LinearLessonNavItem; next?: LinearLessonNavItem; unitHref: string }) {
  return <nav className="mt-4 pb-8" aria-label="Graphing Linear Equations lesson navigation"><div className="mb-2 flex justify-end"><span className="font-mono text-[10px] text-slate-700">04 / 04</span></div><div className="grid gap-3 sm:grid-cols-2">{previous ? <NavCard item={previous} direction="previous" /> : <div className="hidden sm:block" aria-hidden="true" />}{next ? <NavCard item={next} direction="next" /> : <Link href={unitHref} className="flex min-h-[76px] items-center rounded-[18px] border border-indigo-300/[0.14] bg-indigo-400/[0.025] px-4"><span className="min-w-0 flex-1 text-right"><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">Unit complete</span><strong className="mt-1 block text-[14px] text-slate-200">Return to Graphing Linear Equations</strong></span><Check size={15} className="ml-3 text-indigo-300" /></Link>}</div></nav>;
}

function NavCard({ item, direction }: { item: LinearLessonNavItem; direction: "previous" | "next" }) {
  const left = direction === "previous";
  return <Link href={item.href} className="flex min-h-[76px] items-center gap-3 rounded-[18px] border border-indigo-300/[0.12] bg-indigo-400/[0.018] px-4 py-3">{left ? <ArrowLeft size={15} className="text-indigo-300" /> : null}<span className={`min-w-0 flex-1 ${left ? "" : "text-right"}`}><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-slate-600">{left ? "Previous lesson" : "Next lesson"}</span><strong className="mt-1 block text-[14px] text-slate-200">{item.label}</strong></span>{!left ? <ArrowRight size={15} className="text-indigo-300" /> : null}</Link>;
}
