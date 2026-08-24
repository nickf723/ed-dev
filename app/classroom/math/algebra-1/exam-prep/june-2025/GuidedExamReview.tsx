"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Lightbulb, RotateCcw } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import { M } from "@/app/_components/Math";
import {
  JUNE_2025_EXAM_URL,
  JUNE_2025_GUIDED_ITEMS,
  JUNE_2025_SCORING_URL,
  type GuidedExamItem,
} from "../_data/june-2025";

export default function GuidedExamReview() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<readonly number[]>([]);
  const [hinted, setHinted] = useState<readonly number[]>([]);
  const item = JUNE_2025_GUIDED_ITEMS[index];
  const selected = answers[item.number];
  const isChecked = checked.includes(item.number);
  const isCorrect = selected === item.answer;
  const completed = useMemo(() => checked.length, [checked]);

  function selectAnswer(value: string) {
    setAnswers((current) => ({ ...current, [item.number]: value }));
    setChecked((current) => current.filter((number) => number !== item.number));
  }

  function checkAnswer() {
    if (!selected) return;
    setChecked((current) => current.includes(item.number) ? current : [...current, item.number]);
  }

  function showHint() {
    setHinted((current) => current.includes(item.number) ? current : [...current, item.number]);
  }

  function move(nextIndex: number) {
    setIndex(nextIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#090713] text-stone-100 selection:bg-violet-400/25">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_82%_15%,rgba(168,85,247,0.19),transparent_30%),radial-gradient(circle_at_12%_75%,rgba(244,63,94,0.11),transparent_31%),linear-gradient(to_bottom,#120a1d,#08070d)]" />
      <div className="pointer-events-none fixed inset-0 opacity-25 [background-image:linear-gradient(rgba(216,180,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,113,133,0.018)_1px,transparent_1px)] [background-size:100%_44px,72px_100%]" />
      <div className="relative z-10 mx-auto w-full max-w-[1140px] px-4 py-5 sm:px-6">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Classroom", href: "/classroom" },
            { label: "Math", href: "/classroom/math" },
            { label: "Algebra I", href: "/classroom/math/algebra-1" },
            { label: "Exam Prep", href: "/classroom/math/algebra-1/exam-prep" },
            { label: "June 2025" },
          ]}
          eyebrow="Guided Regents Review · Pilot"
          icon={Lightbulb}
          title={<span>June 2025 Algebra I</span>}
          subtitle="Attempt each released item, uncover the decisive clue, and turn the worked answer into a reusable strategy."
          accentRgb="192, 132, 252"
          titleClassName="font-mono text-[clamp(2.2rem,4.8vw,4.7rem)] font-semibold uppercase leading-[0.9] tracking-[-0.055em] text-violet-50"
          metadataTextClassName="text-[11px]"
          iconClassName="rounded-[16px]"
          headerClassName="border-violet-200/[0.14]"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[16px] border border-white/[0.08] bg-black/22 px-4 py-3 text-[12px] backdrop-blur-xl">
          <div className="text-stone-400">Pilot progress: <strong className="text-white">{completed} of {JUNE_2025_GUIDED_ITEMS.length}</strong> walkthroughs opened</div>
          <div className="flex flex-wrap gap-3">
            <a href={JUNE_2025_EXAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-violet-200"><ExternalLink size={13} />Official exam</a>
            <a href={JUNE_2025_SCORING_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-violet-200"><ExternalLink size={13} />NYSED scoring key</a>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[210px_minmax(0,1fr)]">
          <aside className="h-fit rounded-[20px] border border-white/[0.08] bg-black/22 p-3 backdrop-blur-2xl lg:sticky lg:top-20">
            <div className="px-2 pb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">Guided items</div>
            <div className="grid grid-cols-4 gap-2 lg:grid-cols-1">
              {JUNE_2025_GUIDED_ITEMS.map((candidate, candidateIndex) => {
                const candidateChecked = checked.includes(candidate.number);
                const candidateCorrect = answers[candidate.number] === candidate.answer;
                return <button key={candidate.number} type="button" onClick={() => move(candidateIndex)} aria-current={candidateIndex === index ? "step" : undefined} className={`min-h-12 rounded-xl border px-3 text-left text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 ${candidateIndex === index ? "border-violet-200/30 bg-violet-300/[0.10] text-white" : "border-white/[0.07] bg-black/10 text-stone-400"}`}>
                  <span className="font-mono font-semibold">Q{candidate.number}</span>
                  <span className={`ml-2 ${candidateChecked ? candidateCorrect ? "text-emerald-300" : "text-amber-300" : "text-stone-600"}`}>{candidateChecked ? candidateCorrect ? "✓" : "review" : "open"}</span>
                </button>;
              })}
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-violet-400/70 transition-[width]" style={{ width: `${(completed / JUNE_2025_GUIDED_ITEMS.length) * 100}%` }} /></div>
          </aside>

          <section className="rounded-[24px] border border-violet-200/[0.14] bg-[#140d1c]/76 p-4 backdrop-blur-2xl sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-300/80">Part I · Question {item.number} · Exam page {item.sourcePage}</div>
                <h2 className="mt-2 text-[clamp(1.55rem,3.4vw,2.4rem)] font-semibold tracking-[-0.04em] text-white">{item.skill}</h2>
              </div>
              <span className="rounded-full border border-sky-200/15 bg-sky-300/[0.05] px-3 py-1.5 font-mono text-[12px] text-sky-100">{item.standard}</span>
            </div>

            <div className="mt-5 rounded-[18px] border border-white/[0.08] bg-black/22 p-4 sm:p-5">
              <p className="text-[16px] leading-7 text-stone-200">{item.prompt}</p>
              {item.displayMath ? <div className="mt-4 overflow-x-auto rounded-[14px] border border-white/[0.07] bg-black/25 p-4 text-center text-[clamp(1.2rem,3vw,1.8rem)] text-violet-100"><M>{item.displayMath}</M></div> : null}
              {item.table ? <div className="mt-4 overflow-hidden rounded-[14px] border border-white/[0.08]">
                {item.table.map((row, rowIndex) => <div key={row.join("-")} className={`grid grid-cols-2 ${rowIndex === 0 ? "bg-violet-300/[0.10] font-semibold text-violet-100" : "bg-black/20 text-stone-200"}`}>{row.map((cell) => <div key={cell} className="border-r border-white/[0.07] px-4 py-2.5 text-center text-[14px] last:border-r-0">{cell}</div>)}</div>)}
              </div> : null}
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label={`Question ${item.number} answer choices`}>
              {item.options.map((option) => <button key={option.id} type="button" role="radio" aria-checked={selected === option.id} onClick={() => selectAnswer(option.id)} className={`min-h-[58px] rounded-[14px] border px-4 py-3 text-left text-[14px] leading-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 ${selected === option.id ? "border-violet-200/35 bg-violet-300/[0.10] text-white" : "border-white/[0.08] bg-black/16 text-stone-300 hover:border-white/[0.15]"}`}><span className="mr-3 font-mono text-violet-300">{option.id}</span>{option.math ? <M>{option.math}</M> : option.label}</button>)}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={showHint} className="min-h-11 rounded-xl border border-amber-200/18 bg-amber-300/[0.05] px-4 text-[14px] font-semibold text-amber-100">{hinted.includes(item.number) ? "Hint open" : "Show one hint"}</button>
              <button type="button" onClick={checkAnswer} disabled={!selected} className="min-h-11 rounded-xl bg-violet-400/20 px-4 text-[14px] font-semibold text-violet-100 disabled:cursor-not-allowed disabled:opacity-45">Check and explain</button>
            </div>

            <div className="mt-4 min-h-[68px]" aria-live="polite">
              {hinted.includes(item.number) && !isChecked ? <div className="rounded-[14px] border border-amber-200/14 bg-amber-300/[0.04] p-4 text-[14px] leading-6 text-amber-100"><Lightbulb className="mr-2 inline" size={15} />{item.hint}</div> : null}
            </div>

            {isChecked ? <div className={`rounded-[18px] border p-5 ${isCorrect ? "border-emerald-200/18 bg-emerald-300/[0.045]" : "border-amber-200/18 bg-amber-300/[0.045]"}`}>
              <div className={`font-semibold ${isCorrect ? "text-emerald-100" : "text-amber-100"}`}>{isCorrect ? <><Check className="mr-2 inline" size={17} />Correct—now make the strategy reusable.</> : <>Your first answer was {selected}. Follow the reasoning before trying again.</>}</div>
              <ol className="mt-4 space-y-3">
                {item.reasoning.map((step, stepIndex) => <li key={step} className="grid grid-cols-[28px_1fr] gap-3 text-[15px] leading-6 text-stone-200"><span className="grid h-7 w-7 place-items-center rounded-full border border-violet-200/20 bg-violet-300/[0.07] font-mono text-[12px] text-violet-200">{stepIndex + 1}</span><span>{step}</span></li>)}
              </ol>
              <IntuitionLab key={item.number} item={item} />
              <div className="mt-5 rounded-[14px] border border-sky-200/12 bg-sky-300/[0.04] p-4 text-[14px] leading-6 text-sky-100"><strong>Carry forward:</strong> {item.takeaway}</div>
              <Link href={item.reviewHref} className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-violet-200">Review the connected lesson <ArrowRight size={14} /></Link>
            </div> : null}

            <nav aria-label="Guided exam question navigation" className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t border-white/[0.08] pt-5">
              <button type="button" onClick={() => move(Math.max(0, index - 1))} disabled={index === 0} className="inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-stone-400 disabled:opacity-30"><ArrowLeft size={14} />Previous</button>
              <button type="button" onClick={() => { setAnswers({}); setChecked([]); setHinted([]); }} className="inline-flex min-h-11 items-center gap-2 text-[12px] font-semibold text-stone-500"><RotateCcw size={13} />Reset</button>
              <button type="button" onClick={() => move(Math.min(JUNE_2025_GUIDED_ITEMS.length - 1, index + 1))} disabled={index === JUNE_2025_GUIDED_ITEMS.length - 1} className="inline-flex min-h-11 items-center justify-end gap-2 text-[13px] font-semibold text-violet-200 disabled:opacity-30">Next <ArrowRight size={14} /></button>
            </nav>
          </section>
        </div>

        <p className="mt-5 text-[12px] leading-5 text-stone-500">Pilot scope: six guided items from the 35-question June 2025 examination. Short prompts may be transcribed while longer items are faithfully restated; hints, interactions, and explanations are independently authored. NYSED’s released exam and scoring materials remain the source of record.</p>
      </div>
    </main>
  );
}

function IntuitionLab({ item }: { item: GuidedExamItem }) {
  const [stage, setStage] = useState(0);

  if (item.number === 3) {
    return <LabFrame title="Watch what repeats">
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => setStage(0)} aria-pressed={stage === 0} className={`rounded-[14px] border p-3 text-left ${stage === 0 ? "border-sky-200/25 bg-sky-300/[0.07]" : "border-white/[0.07] bg-black/15"}`}>
          <div className="text-[12px] font-semibold text-sky-200">Fixed amount: +5</div>
          <div className="mt-3 flex items-end gap-1.5">{[100, 105, 110, 115].map((value) => <div key={value} className="grid flex-1 place-items-end rounded-t bg-sky-400/25 pb-1 text-[10px] text-sky-100" style={{ height: `${value - 52}px` }}>{value}</div>)}</div>
        </button>
        <button type="button" onClick={() => setStage(1)} aria-pressed={stage === 1} className={`rounded-[14px] border p-3 text-left ${stage === 1 ? "border-pink-200/25 bg-pink-300/[0.07]" : "border-white/[0.07] bg-black/15"}`}>
          <div className="text-[12px] font-semibold text-pink-200">Fixed percent: ×1.05</div>
          <div className="mt-3 flex items-end gap-1.5">{[100, 105, 110.25, 115.76].map((value) => <div key={value} className="grid flex-1 place-items-end rounded-t bg-pink-400/25 pb-1 text-[10px] text-pink-100" style={{ height: `${value - 52}px` }}>{value}</div>)}</div>
        </button>
      </div>
      <p className="mt-3 min-h-[44px] text-[13px] leading-5 text-stone-300">{stage === 0 ? "Equal additions create equal vertical steps." : "The same percent acts on a changing total, so the additions themselves grow."}</p>
    </LabFrame>;
  }

  if (item.number === 5) {
    const secondPass = stage > 0;
    return <LabFrame title="Run two filters">
      <div className="grid gap-2 sm:grid-cols-2">
        {["6x^3+3x^2-2x", "2x^3+x^2+4x"].map((expression) => <div key={expression} className={`rounded-[14px] border p-4 text-center text-[17px] ${secondPass && expression.startsWith("6") ? "border-white/[0.05] bg-black/10 text-stone-600" : "border-violet-200/16 bg-violet-300/[0.04] text-violet-100"}`}><M>{expression}</M></div>)}
      </div>
      <button type="button" onClick={() => setStage((current) => current ? 0 : 1)} className="mt-3 min-h-11 rounded-xl border border-violet-200/18 bg-violet-300/[0.06] px-4 text-[13px] font-semibold text-violet-100">{secondPass ? "Reset filters" : "Now require leading coefficient 2"}</button>
      <p className="mt-3 min-h-[44px] text-[13px] leading-5 text-stone-300">{secondPass ? "Both survivors have degree 3; the second filter selects the one whose x³ term begins with 2." : "The degree filter keeps both expressions because each has greatest exponent 3."}</p>
    </LabFrame>;
  }

  if (item.number === 6) {
    const distributed = stage > 0;
    return <LabFrame title="Push the subtraction through">
      <div className="rounded-[14px] border border-white/[0.08] bg-black/20 p-4 text-center text-[clamp(1rem,3vw,1.45rem)] text-violet-100"><M>{distributed ? "-3x^2+9-7x^2+5x-4" : "(-3x^2+9)-(7x^2-5x+4)"}</M></div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[12px]">
        {["7x² → −7x²", "−5x → +5x", "+4 → −4"].map((change) => <div key={change} className={`rounded-xl border px-2 py-3 ${distributed ? "border-pink-200/18 bg-pink-300/[0.05] text-pink-100" : "border-white/[0.06] text-stone-600"}`}>{change}</div>)}
      </div>
      <button type="button" onClick={() => setStage((current) => current ? 0 : 1)} className="mt-3 min-h-11 rounded-xl border border-violet-200/18 bg-violet-300/[0.06] px-4 text-[13px] font-semibold text-violet-100">{distributed ? "Restore parentheses" : "Distribute the negative"}</button>
    </LabFrame>;
  }

  if (item.number === 7) {
    const rateStage = Math.min(stage, 2);
    return <LabFrame title="Build the rate from two changes">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
        <PointCard label="Week 4" value="12 in" />
        <ArrowRight className="text-violet-300" />
        <PointCard label="Week 12" value="60 in" />
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <button type="button" onClick={() => setStage(1)} className={`rounded-xl border p-3 text-[13px] ${rateStage >= 1 ? "border-pink-200/20 bg-pink-300/[0.05] text-pink-100" : "border-white/[0.07] text-stone-400"}`}>Output change: 60 − 12 = 48 inches</button>
        <button type="button" onClick={() => setStage(2)} className={`rounded-xl border p-3 text-[13px] ${rateStage >= 2 ? "border-sky-200/20 bg-sky-300/[0.05] text-sky-100" : "border-white/[0.07] text-stone-400"}`}>Input change: 12 − 4 = 8 weeks</button>
      </div>
      <div className={`mt-3 min-h-[54px] rounded-xl border p-3 text-center text-[16px] transition-opacity ${rateStage >= 2 ? "border-emerald-200/18 bg-emerald-300/[0.05] text-emerald-100 opacity-100" : "border-white/[0.05] text-stone-600 opacity-55"}`}>{rateStage >= 2 ? <M>{"\\frac{48\\text{ inches}}{8\\text{ weeks}}=6\\text{ inches per week}"}</M> : "Reveal both changes to form the rate."}</div>
    </LabFrame>;
  }

  if (item.number === 8) {
    const states = ["x^2+5x=3x+3", "x^2+2x=3", "x^2+2x-3=0"];
    return <LabFrame title="Keep both sides synchronized">
      <div className="rounded-[14px] border border-white/[0.08] bg-black/20 p-4 text-center text-[clamp(1rem,3vw,1.5rem)] text-violet-100"><M>{states[Math.min(stage, 2)]}</M></div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => setStage(1)} className={`min-h-11 rounded-xl border text-[13px] ${stage >= 1 ? "border-pink-200/20 bg-pink-300/[0.05] text-pink-100" : "border-white/[0.07] text-stone-400"}`}>Subtract 3x from both sides</button>
        <button type="button" onClick={() => setStage(2)} className={`min-h-11 rounded-xl border text-[13px] ${stage >= 2 ? "border-sky-200/20 bg-sky-300/[0.05] text-sky-100" : "border-white/[0.07] text-stone-400"}`}>Subtract 3 from both sides</button>
      </div>
      <p className="mt-3 min-h-[44px] text-[13px] leading-5 text-stone-300">The terms do not “jump” across the equals sign. Each state comes from the same subtraction on both sides.</p>
    </LabFrame>;
  }

  return <LabFrame title="Assemble one relationship at a time">
    <div className="grid gap-2 sm:grid-cols-3">
      {[{ label: "Jack", math: "x" }, { label: "Tim", math: "7x-4" }, { label: "Together", math: "(7x-4)+x=44" }].map((part, partIndex) => <button key={part.label} type="button" onClick={() => setStage(partIndex + 1)} className={`rounded-[14px] border p-3 text-left ${stage > partIndex ? "border-violet-200/20 bg-violet-300/[0.06]" : "border-white/[0.07] bg-black/15"}`}><span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">{part.label}</span><span className={`mt-2 block text-[17px] ${stage > partIndex ? "text-violet-100" : "text-stone-600"}`}><M>{stage > partIndex ? part.math : "?"}</M></span></button>)}
    </div>
    <p className="mt-3 min-h-[44px] text-[13px] leading-5 text-stone-300">Name each quantity before combining them. The final equation should preserve all three statements from the situation.</p>
  </LabFrame>;
}

function LabFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="mt-5 rounded-[16px] border border-violet-200/[0.13] bg-black/20 p-4">
    <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-300/75">Intuition lab · {title}</div>
    {children}
  </div>;
}

function PointCard({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[14px] border border-white/[0.08] bg-black/20 p-3"><div className="text-[11px] uppercase tracking-[0.12em] text-stone-500">{label}</div><div className="mt-1 font-mono text-[18px] font-semibold text-white">{value}</div></div>;
}
