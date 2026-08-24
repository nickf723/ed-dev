"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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
const PRACTICE = [
  { rule: "d = 12t + 5", input: 3, answer: 41, inputName: "hours", outputName: "distance" },
  { rule: "P = 7n + 2", input: 4, answer: 30, inputName: "notebooks", outputName: "price" },
  { rule: "T = 18m + 10", input: 2, answer: 46, inputName: "months", outputName: "total" },
] as const;

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
            <h2 className="mt-2 text-[25px] font-semibold tracking-[-0.035em] text-white">Sometimes we solve. Here, we vary.</h2>
            <p className="mt-3 text-[16px] leading-7 text-stone-300">In <M>{"x+3=10"}</M>, x is unknown because an equation asks for the value that makes it true. In <M>{"C=4h+6"}</M>, h can take many meaningful values.</p>
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
  const [prediction, setPrediction] = useState<number | null>(null);
  const cost = RATE * hours + START_FEE;
  const correctPrediction = prediction === cost;

  return (
    <section className="mt-8 rounded-[24px] border border-pink-200/[0.14] bg-[#120b1d]/70 p-4 backdrop-blur-2xl sm:p-6">
      <Stage>Do · Move the input</Stage>
      <h2 className="mt-2 text-[clamp(1.55rem,3.3vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">If the hours change, what must the cost do?</h2>
      <p className="mt-2 max-w-3xl text-[16px] leading-7 text-stone-300">Choose a value for h. The equation, table, and quantity bar all describe the same rental.</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <div className="rounded-[18px] border border-white/[0.08] bg-black/20 p-4">
          <label className="text-[14px] font-semibold text-stone-300">Hours rented, h</label>
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7 lg:grid-cols-4">
            {HOURS.map((value) => <button key={value} type="button" onClick={() => { setHours(value); setPrediction(null); }} aria-pressed={hours === value} className={`min-h-11 rounded-xl border font-mono text-[16px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300/70 ${hours === value ? "border-pink-200/35 bg-pink-300/[0.12] text-pink-100" : "border-white/[0.08] bg-black/15 text-stone-400 hover:text-white"}`}>{value}</button>)}
          </div>
          <div className="mt-5 text-[14px] text-stone-400">Before revealing the total, predict it:</div>
          <div className="mt-2 flex gap-2">
            <input type="number" value={prediction ?? ""} onChange={(event) => setPrediction(event.target.value === "" ? null : Number(event.target.value))} className="min-w-0 flex-1 rounded-xl border border-white/[0.10] bg-black/25 px-3 py-2.5 text-[16px] text-white outline-none focus:border-pink-300/45" aria-label="Predicted cost" placeholder="$" />
            <button type="button" onClick={() => setPrediction(cost)} className="rounded-xl border border-pink-200/20 bg-pink-300/[0.07] px-4 text-[13px] font-semibold text-pink-100">Reveal</button>
          </div>
          {prediction !== null ? <p className={`mt-3 text-[14px] leading-6 ${correctPrediction ? "text-emerald-200" : "text-amber-200"}`} aria-live="polite">{correctPrediction ? `Yes. 4(${hours}) + 6 = ${cost}.` : `Use the fixed rule: multiply ${hours} by 4, then add 6.`}</p> : null}
        </div>

        <div className="rounded-[18px] border border-white/[0.08] bg-black/20 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-[clamp(1.45rem,4vw,2.4rem)] text-white"><M>{`C=4(${hours})+6=${cost}`}</M></div>
            <div className="rounded-full border border-sky-200/15 bg-sky-300/[0.05] px-3 py-1.5 font-mono text-[13px] text-sky-100">({hours}, {cost})</div>
          </div>
          <div className="mt-5 overflow-hidden rounded-full border border-white/[0.08] bg-black/30" role="img" aria-label={`Total cost ${cost} dollars: ${RATE * hours} dollars from hours plus ${START_FEE} dollar starting fee`}>
            <div className="flex h-12" style={{ width: `${Math.max(34, (cost / 30) * 100)}%` }}>
              <div className="grid place-items-center bg-pink-400/45 text-[12px] font-semibold text-pink-50" style={{ flex: RATE * hours || 0.001 }}>{RATE * hours > 0 ? `$${RATE * hours} hours` : ""}</div>
              <div className="grid min-w-16 place-items-center bg-violet-400/45 text-[12px] font-semibold text-violet-50" style={{ flex: START_FEE }}>$6 start</div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-4 gap-1.5 sm:grid-cols-7">
            {HOURS.map((value) => { const output = RATE * value + START_FEE; return <button key={value} type="button" onClick={() => { setHours(value); setPrediction(null); }} className={`rounded-xl border px-2 py-2 text-center ${hours === value ? "border-sky-200/30 bg-sky-300/[0.08]" : "border-white/[0.06] bg-black/10"}`}><span className="block font-mono text-[12px] text-pink-200">h={value}</span><span className="mt-1 block font-mono text-[13px] font-semibold text-sky-100">C={output}</span></button>; })}
          </div>
          <p className="mt-4 text-[14px] leading-6 text-stone-400"><strong className="text-white">Notice:</strong> every extra hour adds $4. The $6 section never changes.</p>
        </div>
      </div>
    </section>
  );
}

function TransferPractice() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const problem = PRACTICE[index];
  const correct = Number(answer) === problem.answer;
  const nextProblem = useMemo(() => (index + 1) % PRACTICE.length, [index]);

  return (
    <section id="variable-practice" className="mt-8 scroll-mt-24 rounded-[24px] border border-emerald-200/[0.13] bg-[#071711]/70 p-4 backdrop-blur-2xl sm:p-6">
      <Stage tone="emerald">Check · Fresh context</Stage>
      <h2 className="mt-2 text-[clamp(1.55rem,3.3vw,2.3rem)] font-semibold tracking-[-0.04em] text-white">Can the relationship travel?</h2>
      <p className="mt-2 text-[16px] leading-7 text-stone-300">In the rule <span className="font-mono text-emerald-100">{problem.rule}</span>, {problem.inputName} is the changing input. Find the {problem.outputName} when the input is {problem.input}.</p>
      <div className="mt-4 flex max-w-xl gap-2">
        <input value={answer} onChange={(event) => { setAnswer(event.target.value); setChecked(false); }} inputMode="numeric" className="min-w-0 flex-1 rounded-xl border border-white/[0.10] bg-black/25 px-3 py-3 text-[16px] text-white outline-none focus:border-emerald-300/45" aria-label="Practice answer" placeholder="Enter the output" />
        <button type="button" onClick={() => setChecked(true)} className="rounded-xl bg-emerald-400/20 px-5 text-[14px] font-semibold text-emerald-100">Check</button>
      </div>
      {checked ? <div className={`mt-4 rounded-[16px] border p-4 text-[15px] leading-6 ${correct ? "border-emerald-200/20 bg-emerald-300/[0.05] text-emerald-100" : "border-amber-200/18 bg-amber-300/[0.04] text-amber-100"}`} aria-live="polite">{correct ? <><Check className="mr-2 inline" size={16} />Correct. You substituted the selected input into the unchanged rule.</> : <>Not yet. Replace the variable with {problem.input}, multiply first, and then add the constant.</>}</div> : null}
      <button type="button" onClick={() => { setIndex(nextProblem); setAnswer(""); setChecked(false); }} className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-stone-400 hover:text-white"><RefreshCcw size={14} />Try another generated case</button>
    </section>
  );
}

function Stage({ children, tone = "pink" }: { children: React.ReactNode; tone?: "pink" | "sky" | "amber" | "emerald" }) {
  const tones = { pink: "text-pink-300/80", sky: "text-sky-300/80", amber: "text-amber-300/80", emerald: "text-emerald-300/80" };
  return <div className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${tones[tone]}`}>{children}</div>;
}

function LessonNav({ previous, next, unitHref }: { previous?: NavItem; next?: NavItem; unitHref: string }) {
  return <nav aria-label="Lesson navigation" className="mt-8 grid gap-3 sm:grid-cols-3"><div>{previous ? <Link href={previous.href} className="flex min-h-16 items-center gap-3 rounded-[16px] border border-white/[0.08] bg-black/20 px-4 text-[13px] text-stone-300"><ArrowLeft size={15} />{previous.label}</Link> : null}</div><Link href={unitHref} className="flex min-h-16 items-center justify-center rounded-[16px] border border-white/[0.08] bg-black/20 px-4 text-[13px] font-semibold text-stone-300">Back to unit</Link><div>{next ? <Link href={next.href} className="flex min-h-16 items-center justify-end gap-3 rounded-[16px] border border-pink-200/[0.14] bg-pink-300/[0.04] px-4 text-right text-[13px] font-semibold text-pink-100">{next.label}<ArrowRight size={15} /></Link> : null}</div></nav>;
}
