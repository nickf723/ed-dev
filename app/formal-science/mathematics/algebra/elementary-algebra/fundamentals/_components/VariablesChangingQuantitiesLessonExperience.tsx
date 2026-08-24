"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, RefreshCcw, Variable } from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import { M } from "@/app/_components/Math";
import FundamentalsLessonBackgroundV2 from "./FundamentalsLessonBackgroundV2";

type NavItem = { label: string; href: string };
type Props = {
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: NavItem;
  next?: NavItem;
  unitHref: string;
  showVocabulary?: boolean;
};

const ACCENT = "244, 114, 182";
const HOURS = [0, 1, 2, 3, 4, 5, 6] as const;
const RATE = 4;
const START_FEE = 6;

export default function VariablesChangingQuantitiesLessonExperience({
  breadcrumbs,
  previous,
  next,
  unitHref,
  showVocabulary = true,
}: Props) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#100713] text-stone-100 selection:bg-pink-400/25">
      <FundamentalsLessonBackgroundV2 lesson="variables-changing-quantities" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(0,0,0,0.62))]" />
      <div className="relative z-10 mx-auto w-full max-w-[1050px] px-4 py-4 sm:px-6 xl:py-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow="Lesson 01 · Changing quantities"
          icon={Variable}
          title={<span>Variables as Changing Quantities</span>}
          subtitle="Change one input, follow it through a fixed rule, and watch the output respond."
          accentRgb={ACCENT}
          titleClassName="font-mono text-[clamp(2.05rem,4.1vw,4rem)] font-semibold uppercase leading-[0.9] tracking-[-0.055em] text-[#fff4fb]"
          metadataTextClassName="text-[11px]"
          iconClassName="rounded-[16px]"
          headerClassName="border-pink-200/[0.13]"
        />
        <LessonUtilityBar practiceTargetId="variable-practice" vocabulary={showVocabulary} accentRgb={ACCENT} labelClassName="text-[11px]" />

        <section className="mt-4 overflow-hidden rounded-[24px] border border-pink-200/[0.14] bg-[#170b18]/68 p-4 backdrop-blur-2xl sm:p-6">
          <div className="grid gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
            <div>
              <Stage>Invite · What may change?</Stage>
              <h2 className="mt-2 text-[clamp(1.65rem,3.5vw,2.55rem)] font-semibold tracking-[-0.04em] text-white">A bike rental starts at $6, then adds $4 each hour.</h2>
              <p className="mt-3 max-w-xl text-[16px] leading-7 text-stone-300">The hourly cost can change because the number of hours can change. The relationship between them does not.</p>
              <div className="mt-4 rounded-[18px] border border-pink-200/[0.12] bg-black/20 px-4 py-4 text-center text-[clamp(1.8rem,5vw,3.4rem)] text-pink-100">
                <M>{"C=4h+6"}</M>
              </div>
            </div>
            <div className="rounded-[20px] border border-white/[0.08] bg-black/20 p-4">
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-[15px]">
                <span className="font-mono text-pink-200">h</span><span><strong className="text-white">changes</strong> — hours rented</span>
                <span className="font-mono text-sky-200">C</span><span><strong className="text-white">responds</strong> — total cost</span>
                <span className="font-mono text-amber-200">4</span><span><strong className="text-white">stays fixed</strong> — dollars per hour</span>
                <span className="font-mono text-violet-200">6</span><span><strong className="text-white">stays fixed</strong> — starting fee</span>
              </div>
            </div>
          </div>
        </section>

        <QuantityWorkbench />

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[22px] border border-sky-200/[0.12] bg-[#07131b]/68 p-5 backdrop-blur-2xl">
            <Stage tone="sky">Name · The reusable relationship</Stage>
            <h2 className="mt-2 text-[25px] font-semibold tracking-[-0.035em] text-white">A variable names a quantity allowed to vary.</h2>
            <p className="mt-3 text-[16px] leading-7 text-stone-300">An expression is the fixed rule. Substitution chooses one allowed value for the variable and produces one corresponding output.</p>
            <div className="mt-4 rounded-[16px] border border-white/[0.07] bg-black/20 p-4 text-center text-[20px] text-sky-100"><M>{"h\\;\\longmapsto\\;4h+6\\;\\longmapsto\\;C"}</M></div>
          </div>
          <div className="rounded-[22px] border border-amber-200/[0.12] bg-[#1a1206]/68 p-5 backdrop-blur-2xl">
            <Stage tone="amber">Boundary · Variable does not mean mystery</Stage>
            <h2 className="mt-2 text-[25px] font-semibold tracking-[-0.035em] text-white">The letter is a placeholder. The situation tells us its job.</h2>
            <div className="mt-4 space-y-4 text-[16px] leading-7 text-stone-300">
              <p><M>{"C=4h+6"}</M></p>
              <p>Here, <strong className="text-pink-100">h is an input placeholder</strong>. We may choose a known value such as 2 hours, substitute it, and find the matching cost. Different allowed inputs produce different outputs.</p>
              <p><M>{"x+7=10"}</M></p>
              <p>Here, <strong className="text-amber-100">x is an unidentified-value placeholder</strong>. One value must make the statement true. We can identify it by solving: <M>{"x=3"}</M>.</p>
            </div>
          </div>
        </section>

        <TransferPractice />
        <section className="mt-8 rounded-[22px] border border-pink-200/[0.12] bg-black/25 p-5 backdrop-blur-2xl">
          <Stage>Conclude · Keep the invariant</Stage>
          <h2 className="mt-2 text-[25px] font-semibold text-white">The values move. The relationship stays.</h2>
          <p className="mt-2 max-w-3xl text-[16px] leading-7 text-stone-300">Next, you will inspect the internal grammar of expressions—terms, coefficients, variables, exponents, and constants—so you can tell which parts may combine.</p>
        </section>
        <LessonNav previous={previous} next={next} unitHref={unitHref} />
      </div>
    </main>
  );
}

function QuantityWorkbench() {
  const [hours, setHours] = useState(2);
  const [prediction, setPrediction] = useState("");
  const [revealedHours, setRevealedHours] = useState<readonly number[]>([]);
  const cost = RATE * hours + START_FEE;
  const revealed = revealedHours.includes(hours);
  const attempted = revealed && prediction !== "";
  const correctPrediction = attempted && Number(prediction) === cost;

  function chooseHours(value: number) {
    setHours(value);
    setPrediction("");
  }

  function checkPrediction() {
    if (prediction === "") return;
    setRevealedHours((current) =>
      current.includes(hours) ? current : [...current, hours]
    );
  }

  return (
    <section className="mt-8 rounded-[24px] border border-pink-200/[0.14] bg-[#120b1d]/70 p-4 backdrop-blur-2xl sm:p-6">
      <Stage>Do · Move the input</Stage>
      <h2 className="mt-2 text-[clamp(1.55rem,3.3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">If the hours change, what must the cost do?</h2>
      <p className="mt-2 max-w-3xl text-[16px] leading-7 text-stone-300">Choose a value for h. The equation, table, and quantity bar all describe the same rental.</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <div className="rounded-[18px] border border-white/[0.08] bg-black/20 p-4">
          <label className="text-[14px] font-semibold text-stone-300">Hours rented, h</label>
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7 lg:grid-cols-4">
            {HOURS.map((value) => <button key={value} type="button" onClick={() => chooseHours(value)} aria-pressed={hours === value} className={`min-h-11 rounded-xl border font-mono text-[16px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/70 ${hours === value ? "border-pink-200/35 bg-pink-300/[0.12] text-pink-100" : "border-white/[0.08] bg-black/15 text-stone-400 hover:text-white"}`}>{value}</button>)}
          </div>
          <div className="mt-5 text-[14px] text-stone-400">Before revealing the total, predict it:</div>
          <div className="mt-2 flex gap-2">
            <input type="number" value={prediction} onChange={(event) => { setPrediction(event.target.value); if (revealed) setRevealedHours((current) => current.filter((value) => value !== hours)); }} onKeyDown={(event) => { if (event.key === "Enter") checkPrediction(); }} className="min-w-0 flex-1 rounded-xl border border-white/[0.10] bg-black/25 px-3 py-2.5 text-[16px] text-white outline-none focus:border-pink-300/45" aria-label="Predicted cost" placeholder="$" />
            <button type="button" onClick={checkPrediction} disabled={prediction === ""} className="rounded-xl border border-pink-200/20 bg-pink-300/[0.07] px-4 text-[13px] font-semibold text-pink-100 disabled:cursor-not-allowed disabled:opacity-45">Check</button>
          </div>
          <div className="mt-3 min-h-[52px]" aria-live="polite">{attempted ? <p className={`text-[14px] leading-6 ${correctPrediction ? "text-emerald-200" : "text-amber-200"}`}>{correctPrediction ? `Yes. 4(${hours}) + 6 = ${cost}.` : `The model reveals ${cost}. Multiply ${hours} by 4, then add the fixed 6.`}</p> : <p className="text-[14px] leading-6 text-stone-500">Commit a prediction to reveal every connected representation.</p>}</div>
        </div>

        <div className="rounded-[18px] border border-white/[0.08] bg-black/20 p-4">
          <div className="grid min-h-[58px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="text-[clamp(1.35rem,4vw,2.25rem)] text-white"><M>{revealed ? `C=4(${hours})+6=${cost}` : `C=4(${hours})+6=\,?`}</M></div>
            <div className="min-w-[84px] rounded-full border border-sky-200/15 bg-sky-300/[0.05] px-3 py-1.5 text-center font-mono text-[13px] text-sky-100">({hours}, {revealed ? cost : "?"})</div>
          </div>
          <div className="mt-5 grid min-h-[250px] grid-cols-[96px_minmax(0,1fr)] items-end gap-4 rounded-[18px] border border-white/[0.08] bg-black/22 p-4" role="img" aria-label={revealed ? `Total cost ${cost} dollars: ${RATE * hours} dollars accumulated above the fixed ${START_FEE} dollar starting fee` : `Cost model hidden until a prediction is checked. The fixed ${START_FEE} dollar starting fee remains visible.`}>
            <div className="relative h-[210px] overflow-hidden rounded-[14px] border border-white/[0.09] bg-black/30">
              <div className="absolute inset-x-0 bottom-0 grid h-[50px] place-items-center border-t border-violet-100/20 bg-violet-400/45 px-1 text-center text-[12px] font-semibold text-violet-50">$6 start</div>
              <div className={`absolute inset-x-0 bottom-[50px] grid place-items-center overflow-hidden border-t border-pink-100/20 bg-pink-400/45 px-1 text-center text-[12px] font-semibold text-pink-50 transition-[height,opacity] duration-500 ${revealed ? "opacity-100" : "opacity-0"}`} style={{ height: revealed ? `${hours * 24}px` : "0px" }}>{hours > 0 ? `$${RATE * hours} hours` : ""}</div>
            </div>
            <div className="self-center">
              <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-stone-500">Accumulation</div>
              <p className="mt-2 min-h-[72px] text-[15px] leading-6 text-stone-300">{revealed ? <>Each hour adds another <strong className="text-pink-100">$4 layer</strong> above the anchored <strong className="text-violet-100">$6 starting fee</strong>.</> : <>The <strong className="text-violet-100">$6 starting fee</strong> is anchored. Check your prediction to build the hourly cost above it.</>}</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-4 gap-1.5 sm:grid-cols-7">
            {HOURS.map((value) => { const output = RATE * value + START_FEE; const valueRevealed = revealedHours.includes(value); return <button key={value} type="button" onClick={() => chooseHours(value)} className={`min-h-[58px] rounded-xl border px-2 py-2 text-center ${hours === value ? "border-sky-200/30 bg-sky-300/[0.08]" : "border-white/[0.06] bg-black/10"}`}><span className="block font-mono text-[12px] text-pink-200">h={value}</span><span className="mt-1 block font-mono text-[13px] font-semibold text-sky-100">C={valueRevealed ? output : "?"}</span></button>; })}
          </div>
          <p className="mt-4 min-h-[48px] text-[14px] leading-6 text-stone-400"><strong className="text-white">Notice:</strong> revealed pairs remain in the table so the pattern grows from your own predictions.</p>
        </div>
      </div>
    </section>
  );
}

function TransferPractice() {
  const [evaluation, setEvaluation] = useState("");
  const [evaluationChecked, setEvaluationChecked] = useState(false);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [checkedChoices, setCheckedChoices] = useState<readonly string[]>([]);

  function selectChoice(id: string, value: string) {
    setChoices((current) => ({ ...current, [id]: value }));
    setCheckedChoices((current) => current.filter((item) => item !== id));
  }

  function checkChoice(id: string) {
    if (!choices[id]) return;
    setCheckedChoices((current) => current.includes(id) ? current : [...current, id]);
  }

  return (
    <section id="variable-practice" className="mt-8 scroll-mt-24 rounded-[24px] border border-emerald-200/[0.13] bg-[#071711]/70 p-4 backdrop-blur-2xl sm:p-6">
      <Stage tone="emerald">Check · Fresh context</Stage>
      <h2 className="mt-2 text-[clamp(1.55rem,3.3vw,2.3rem)] font-semibold tracking-[-0.04em] text-white">Can the relationship travel?</h2>
      <p className="mt-2 max-w-3xl text-[16px] leading-7 text-stone-300">Use a number, interpret a part, identify a variable’s role, and choose a model. Each task asks you to show the idea in a different way.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <article className="flex min-h-[292px] flex-col rounded-[18px] border border-white/[0.08] bg-black/20 p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300/75">Calculate · Enter a value</div>
          <div className="mt-3 min-h-[72px] text-[16px] leading-7 text-stone-200">A delivery rule is <M>{"d=12t+5"}</M>. Find <M>{"d"}</M> when <M>{"t=3"}</M>.</div>
          <div className="mt-auto flex gap-2 pt-4">
            <input value={evaluation} onChange={(event) => { setEvaluation(event.target.value); setEvaluationChecked(false); }} onKeyDown={(event) => { if (event.key === "Enter" && evaluation) setEvaluationChecked(true); }} inputMode="numeric" className="min-w-0 flex-1 rounded-xl border border-white/[0.10] bg-black/25 px-3 py-3 text-[16px] text-white outline-none focus:border-emerald-300/45" aria-label="Calculated delivery distance" placeholder="Output" />
            <button type="button" onClick={() => setEvaluationChecked(true)} disabled={!evaluation} className="rounded-xl bg-emerald-400/20 px-4 text-[14px] font-semibold text-emerald-100 disabled:opacity-45">Check</button>
          </div>
          <Feedback visible={evaluationChecked} correct={Number(evaluation) === 41} correctText="12 groups of 3 make 36; the fixed 5 makes 41." retryText="Replace t with 3, multiply, and then add the fixed 5." />
        </article>

        <ChoiceQuestion id="interpret" label="Interpret · Choose a meaning" prompt={<>A notebook shop uses <M>{"P=7n+2"}</M>. What does the <M>{"2"}</M> represent?</>} options={[{ value: "fixed", label: "$2 charged no matter how many notebooks are bought" }, { value: "rate", label: "$2 for each notebook" }, { value: "count", label: "The number of notebooks" }]} answer="fixed" selected={choices.interpret} checked={checkedChoices.includes("interpret")} onSelect={selectChoice} onCheck={checkChoice} correctText="The constant does not depend on n, so it is a fixed charge." />

        <ChoiceQuestion id="role" label="Classify · Identify the placeholder" prompt={<>In <M>{"P=7n+2"}</M>, what job does <M>{"n"}</M> have?</>} options={[{ value: "input", label: "A chosen input: the number of notebooks" }, { value: "unknown", label: "One unidentified value that makes an equation true" }, { value: "constant", label: "A value that must stay fixed" }]} answer="input" selected={choices.role} checked={checkedChoices.includes("role")} onSelect={selectChoice} onCheck={checkChoice} correctText="n can take different chosen values, and P responds to each one." />

        <ChoiceQuestion id="model" label="Model · Choose a rule" prompt={<>A club charges <strong className="text-violet-100">$8 to join</strong> and <strong className="text-pink-100">$3 per visit</strong>. Which rule gives total cost <M>{"C"}</M> after <M>{"v"}</M> visits?</>} options={[{ value: "correct", label: <M key="correct">{"C=3v+8"}</M> }, { value: "swapped", label: <M key="swapped">{"C=8v+3"}</M> }, { value: "missing", label: <M key="missing">{"C=3v"}</M> }]} answer="correct" selected={choices.model} checked={checkedChoices.includes("model")} onSelect={selectChoice} onCheck={checkChoice} correctText="The $3 rate changes with v; the $8 joining fee remains fixed." />
      </div>
      <p className="mt-4 text-[13px] leading-6 text-stone-500">Released Regents items will enter the course only after their notation and prerequisite ideas have been taught. This opening lesson stays inside its own learning boundary.</p>
      <button type="button" onClick={() => { setEvaluation(""); setEvaluationChecked(false); setChoices({}); setCheckedChoices([]); }} className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-stone-400 hover:text-white"><RefreshCcw size={14} />Reset assessment</button>
    </section>
  );
}

type ChoiceOption = { value: string; label: React.ReactNode };

function ChoiceQuestion({ id, label, prompt, options, answer, selected, checked, onSelect, onCheck, correctText }: { id: string; label: string; prompt: React.ReactNode; options: readonly ChoiceOption[]; answer: string; selected?: string; checked: boolean; onSelect: (id: string, value: string) => void; onCheck: (id: string) => void; correctText: string }) {
  return <article className="flex min-h-[292px] flex-col rounded-[18px] border border-white/[0.08] bg-black/20 p-4">
    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300/75">{label}</div>
    <div className="mt-3 min-h-[72px] text-[16px] leading-7 text-stone-200">{prompt}</div>
    <div className="mt-3 grid gap-2" role="radiogroup" aria-label={label}>
      {options.map((option) => <button key={option.value} type="button" role="radio" aria-checked={selected === option.value} onClick={() => onSelect(id, option.value)} className={`min-h-11 rounded-xl border px-3 py-2 text-left text-[14px] leading-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 ${selected === option.value ? "border-emerald-200/30 bg-emerald-300/[0.08] text-emerald-50" : "border-white/[0.08] bg-black/15 text-stone-300 hover:border-white/[0.15]"}`}>{option.label}</button>)}
    </div>
    <button type="button" onClick={() => onCheck(id)} disabled={!selected} className="mt-3 min-h-11 rounded-xl bg-emerald-400/20 px-4 text-[14px] font-semibold text-emerald-100 disabled:opacity-45">Check choice</button>
    <Feedback visible={checked} correct={selected === answer} correctText={correctText} retryText="Try the choice that keeps changing and fixed quantities in their correct roles." />
  </article>;
}

function Feedback({ visible, correct, correctText, retryText }: { visible: boolean; correct: boolean; correctText: string; retryText: string }) {
  return <div className="mt-3 min-h-[52px]" aria-live="polite">{visible ? <p className={`text-[14px] leading-6 ${correct ? "text-emerald-100" : "text-amber-100"}`}>{correct ? <><Check className="mr-2 inline" size={15} />{correctText}</> : retryText}</p> : null}</div>;
}

function Stage({ children, tone = "pink" }: { children: React.ReactNode; tone?: "pink" | "sky" | "amber" | "emerald" }) {
  const tones = { pink: "text-pink-300/80", sky: "text-sky-300/80", amber: "text-amber-300/80", emerald: "text-emerald-300/80" };
  return <div className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${tones[tone]}`}>{children}</div>;
}

function LessonNav({ previous, next, unitHref }: { previous?: NavItem; next?: NavItem; unitHref: string }) {
  return <nav aria-label="Lesson navigation" className="mt-8 grid gap-3 sm:grid-cols-3"><div>{previous ? <Link href={previous.href} className="flex min-h-16 items-center gap-3 rounded-[16px] border border-white/[0.08] bg-black/20 px-4 text-[13px] text-stone-300"><ArrowLeft size={15} />{previous.label}</Link> : null}</div><Link href={unitHref} className="flex min-h-16 items-center justify-center rounded-[16px] border border-white/[0.08] bg-black/20 px-4 text-[13px] font-semibold text-stone-300">Back to unit</Link><div>{next ? <Link href={next.href} className="flex min-h-16 items-center justify-end gap-3 rounded-[16px] border border-pink-200/[0.14] bg-pink-300/[0.04] px-4 text-right text-[13px] font-semibold text-pink-100">{next.label}<ArrowRight size={15} /></Link> : null}</div></nav>;
}
