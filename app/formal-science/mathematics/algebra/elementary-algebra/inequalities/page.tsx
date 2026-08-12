"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Disc,
  MoveHorizontal,
  SlidersHorizontal,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import InequalitiesBackground from "./_components/InequalitiesBackground";

type Relation = "<" | "≤" | ">" | "≥";
type NumberExampleId = "strict" | "inclusive" | "negative";

type NumberExample = {
  id: NumberExampleId;
  label: string;
  a: number;
  c: number;
  r: number;
  relation: Relation;
  note: string;
};

type IntegratedChild = {
  id: string;
  label: string;
  href: string;
  description: string;
  status?: "active" | "placeholder";
};

type PracticeQuestion = {
  prompt: string;
  choices: readonly string[];
  correctIndex: number;
  explanation: string;
};

const COEFFICIENTS = [-3, -2, -1, 1, 2, 3] as const;
const RELATIONS: readonly Relation[] = ["<", "≤", ">", "≥"];
const NUMBER_MIN = -10;
const NUMBER_MAX = 10;

const LESSON_STAGES = [
  { id: "introduce", label: "Introduce", hint: "Meet the idea" },
  { id: "show", label: "Show", hint: "See the region" },
  { id: "explain", label: "Explain", hint: "Name the parts" },
  { id: "try", label: "Try", hint: "Change a case" },
  { id: "practice", label: "Practice", hint: "Check yourself" },
  { id: "extend", label: "Extend", hint: "Go one layer deeper" },
] as const;

const NUMBER_EXAMPLES: readonly NumberExample[] = [
  {
    id: "strict",
    label: "Strict boundary",
    a: 1,
    c: 0,
    r: 3,
    relation: "<",
    note: "Values smaller than 3 work, but 3 itself does not.",
  },
  {
    id: "inclusive",
    label: "Include the boundary",
    a: 1,
    c: 0,
    r: -2,
    relation: "≥",
    note: "The equality bar includes −2 in the solution set.",
  },
  {
    id: "negative",
    label: "Reverse the order",
    a: -2,
    c: 0,
    r: 6,
    relation: "<",
    note: "Dividing by a negative reverses the order when x is isolated.",
  },
] as const;

const PRACTICE_QUESTIONS: readonly PracticeQuestion[] = [
  {
    prompt: "Which number-line description matches x ≤ −2?",
    choices: [
      "Shade left of −2 and close the endpoint",
      "Shade left of −2 and leave the endpoint open",
      "Shade right of −2 and close the endpoint",
    ],
    correctIndex: 0,
    explanation: "≤ means values less than −2 plus the boundary itself, so the region goes left and the endpoint is closed.",
  },
  {
    prompt: "Solve −2x < 6.",
    choices: ["x < −3", "x > −3", "x > 3"],
    correctIndex: 1,
    explanation: "Dividing both sides by −2 gives −3, and division by a negative reverses < into >.",
  },
  {
    prompt: "Does x = 4 satisfy x > 1?",
    choices: ["Yes", "No"],
    correctIndex: 0,
    explanation: "Substitution gives 4 > 1, which is true, so 4 belongs to the solution region.",
  },
] as const;

const SYSTEMS_CHILD: IntegratedChild = {
  id: "formal.mathematics.algebra.elementary-algebra.inequalities.systems",
  label: "Systems of Inequalities",
  href: "/formal-science/mathematics/algebra/elementary-algebra/inequalities/systems",
  description: "Combine multiple inequality regions and keep only the points satisfying every required constraint.",
};

export default function InequalitiesPage() {
  const [stageIndex, setStageIndex] = useState(0);
  const [introProbe, setIntroProbe] = useState(2);
  const [activeExample, setActiveExample] = useState<NumberExampleId | null>("strict");
  const [coefficient, setCoefficient] = useState(1);
  const [constant, setConstant] = useState(0);
  const [rightSide, setRightSide] = useState(3);
  const [relation, setRelation] = useState<Relation>("<");
  const [probe, setProbe] = useState(0);

  const solution = useMemo(
    () => solveLinearInequality(coefficient, constant, rightSide, relation),
    [coefficient, constant, rightSide, relation],
  );
  const probePasses = compare(coefficient * probe + constant, rightSide, relation);
  const introSolution = useMemo(() => solveLinearInequality(1, 0, 3, "<"), []);
  const introPasses = compare(introProbe, 3, "<");
  const currentStage = LESSON_STAGES[stageIndex];

  const applyExample = (id: NumberExampleId) => {
    const example = NUMBER_EXAMPLES.find((item) => item.id === id) ?? NUMBER_EXAMPLES[0];
    setActiveExample(id);
    setCoefficient(example.a);
    setConstant(example.c);
    setRightSide(example.r);
    setRelation(example.relation);
    setProbe(0);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#071426] text-slate-100 selection:bg-sky-400/25">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.14]">
        <InequalitiesBackground />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(14,165,233,0.07),transparent_30%),linear-gradient(to_bottom,rgba(7,20,38,0.42),rgba(3,8,18,0.94))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1220px] px-4 py-5 sm:px-6 xl:px-8">
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
          subtitle="Learn to read an inequality as a region of allowed values, then test and build those regions yourself."
          accentRgb="14, 165, 233"
          titleClassName="font-mono text-[clamp(2.6rem,4.8vw,5.05rem)] font-semibold uppercase leading-[0.85] tracking-[-0.058em] text-[#f5fbff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-sky-300/[0.12]"
          aside={
            <div className="rounded-full border border-sky-300/[0.12] bg-black/25 px-4 py-2 font-mono text-[12px] text-sky-200/80 backdrop-blur-md">
              {currentStage.label} · {stageIndex + 1}/{LESSON_STAGES.length}
            </div>
          }
        />

        <LessonFlowRail current={stageIndex} onSelect={setStageIndex} />

        <section className="mt-4 rounded-[28px] border border-sky-200/[0.11] bg-[#06111e]/88 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-7">
          <StageHeading number={stageIndex + 1} label={currentStage.label} hint={currentStage.hint} />

          {stageIndex === 0 ? (
            <IntroduceStage probe={introProbe} onProbe={setIntroProbe} passes={introPasses} />
          ) : null}

          {stageIndex === 1 ? (
            <ShowStage solution={introSolution} probe={introProbe} passes={introPasses} />
          ) : null}

          {stageIndex === 2 ? <ExplainStage /> : null}

          {stageIndex === 3 ? (
            <TryStage
              activeExample={activeExample}
              coefficient={coefficient}
              constant={constant}
              rightSide={rightSide}
              relation={relation}
              probe={probe}
              solution={solution}
              probePasses={probePasses}
              onExample={applyExample}
              onProbe={setProbe}
              onCoefficient={(value) => { setActiveExample(null); setCoefficient(value); }}
              onConstant={(value) => { setActiveExample(null); setConstant(value); }}
              onRightSide={(value) => { setActiveExample(null); setRightSide(value); }}
              onRelation={(value) => { setActiveExample(null); setRelation(value); }}
            />
          ) : null}

          {stageIndex === 4 ? <PracticeDeck /> : null}

          {stageIndex === 5 ? <ExtendStage child={SYSTEMS_CHILD} /> : null}

          <FlowControls
            stageIndex={stageIndex}
            stageCount={LESSON_STAGES.length}
            onPrevious={() => setStageIndex((current) => Math.max(0, current - 1))}
            onNext={() => setStageIndex((current) => Math.min(LESSON_STAGES.length - 1, current + 1))}
          />
        </section>

        <div className="mt-4 pb-10">
          <Link
            href="/formal-science/mathematics/algebra/elementary-algebra"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-black/[0.18] px-3 py-2 text-[10px] font-semibold text-slate-500 transition-colors hover:text-slate-300"
          >
            <ArrowLeft size={12} /> Integrated Algebra map
          </Link>
        </div>
      </div>
    </main>
  );
}

function LessonFlowRail({ current, onSelect }: { current: number; onSelect: (index: number) => void }) {
  return (
    <nav aria-label="Lesson flow" className="mt-4 overflow-x-auto rounded-[20px] border border-white/[0.06] bg-black/[0.20] p-2 backdrop-blur-md">
      <div className="grid min-w-[680px] grid-cols-6 gap-1.5">
        {LESSON_STAGES.map((stage, index) => {
          const active = index === current;
          const visited = index < current;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onSelect(index)}
              className={`rounded-[14px] border px-3 py-2.5 text-left transition-colors ${
                active
                  ? "border-sky-300/[0.26] bg-sky-400/[0.07]"
                  : visited
                    ? "border-white/[0.06] bg-white/[0.018] hover:bg-white/[0.03]"
                    : "border-transparent bg-transparent hover:border-white/[0.05] hover:bg-white/[0.018]"
              }`}
            >
              <span className={`font-mono text-[9px] ${active ? "text-sky-300" : "text-slate-600"}`}>0{index + 1}</span>
              <strong className={`mt-0.5 block text-[11px] ${active ? "text-white" : "text-slate-400"}`}>{stage.label}</strong>
              <span className="mt-0.5 block text-[9px] text-slate-600">{stage.hint}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function StageHeading({ number, label, hint }: { number: number; label: string; hint: string }) {
  return (
    <div className="mb-6 flex items-start gap-3 border-b border-white/[0.055] pb-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sky-300/[0.16] bg-sky-400/[0.04] font-mono text-[11px] text-sky-300">0{number}</span>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-300/70">{label}</div>
        <h2 className="mt-1 text-[24px] font-semibold tracking-[-0.025em] text-white">{hint}</h2>
      </div>
    </div>
  );
}

function IntroduceStage({ probe, onProbe, passes }: { probe: number; onProbe: (value: number) => void; passes: boolean }) {
  return (
    <div className="mx-auto max-w-3xl py-4 sm:py-8">
      <div className="text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">A tiny puzzle</div>
        <div className="mt-4 font-mono text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-[-0.05em] text-white">x &lt; 3</div>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-slate-400">Which of these values make the statement true?</p>
      </div>

      <div className="mx-auto mt-7 grid max-w-xl grid-cols-3 gap-3">
        {[2, 3, 4].map((value) => {
          const selected = probe === value;
          const works = value < 3;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onProbe(value)}
              className={`rounded-[18px] border px-4 py-5 text-center transition-all ${
                selected
                  ? works
                    ? "border-emerald-300/[0.30] bg-emerald-400/[0.06]"
                    : "border-rose-300/[0.26] bg-rose-400/[0.05]"
                  : "border-white/[0.06] bg-white/[0.012] hover:border-white/[0.12] hover:bg-white/[0.025]"
              }`}
            >
              <span className="font-mono text-[24px] text-white">x = {value}</span>
              {selected ? (
                <span className={`mt-2 block text-[10px] font-semibold uppercase tracking-[0.1em] ${works ? "text-emerald-300" : "text-rose-300"}`}>
                  {works ? "true" : "false"}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className={`mx-auto mt-6 max-w-xl rounded-[18px] border p-4 ${passes ? "border-emerald-300/[0.14] bg-emerald-400/[0.025]" : "border-rose-300/[0.12] bg-rose-400/[0.02]"}`}>
        <div className="flex items-center gap-2">
          {passes ? <Check size={15} className="text-emerald-300" /> : <X size={15} className="text-rose-300" />}
          <strong className="text-[13px] text-slate-200">{probe} {passes ? "works" : "does not work"}</strong>
        </div>
        <p className="mt-1.5 text-[12px] leading-5 text-slate-500">
          {passes ? `${probe} is smaller than 3, so ${probe} < 3 is true.` : probe === 3 ? "3 is the boundary. A strict < does not include the boundary itself." : `${probe} is larger than 3, so ${probe} < 3 is false.`}
        </p>
      </div>

      <p className="mx-auto mt-7 max-w-2xl text-center text-[16px] leading-7 text-slate-300">
        The important surprise: <strong className="text-white">there is not one answer.</strong> Every number smaller than 3 works. An inequality describes a whole region of values.
      </p>
    </div>
  );
}

function ShowStage({ solution, probe, passes }: { solution: ReturnType<typeof solveLinearInequality>; probe: number; passes: boolean }) {
  return (
    <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.7fr)]">
      <NumberLinePanel solution={solution} probe={probe} probePasses={passes} />
      <div className="grid gap-3">
        <div className="rounded-[18px] border border-sky-300/[0.12] bg-sky-400/[0.025] p-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-300/70">The blue part is the answer</div>
          <p className="mt-2 text-[13px] leading-6 text-slate-400">Everything left of 3 makes x &lt; 3 true. Instead of listing infinitely many answers, the number line shows the entire solution region at once.</p>
        </div>
        <Readout label="Boundary" value="3 is where equality would happen" rgb="14, 165, 233" />
        <Readout label="Direction" value="< points us toward smaller values" rgb="99, 102, 241" />
        <Readout label="Endpoint" value="open circle: 3 is not included" rgb="251, 191, 36" />
      </div>
    </div>
  );
}

function ExplainStage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3 md:grid-cols-3">
        <ConceptFact icon={Target} label="Boundary" text="The value where equality would hold." rgb="14, 165, 233" />
        <ConceptFact icon={MoveHorizontal} label="Direction" text="Which side of the boundary contains valid values." rgb="99, 102, 241" />
        <ConceptFact icon={Disc} label="Inclusion" text="Whether the boundary itself belongs to the region." rgb="251, 191, 36" />
      </div>

      <BoundaryReference />

      <details className="group rounded-[18px] border border-white/[0.055] bg-black/[0.15]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5">
          <span className="text-[12px] font-semibold text-slate-400">One more representation: interval notation</span>
          <span className="text-[10px] text-slate-600 group-open:hidden">optional reference</span>
        </summary>
        <div className="grid gap-3 border-t border-white/[0.05] p-4 sm:grid-cols-2">
          <div className="rounded-[15px] border border-white/[0.05] bg-white/[0.012] p-3">
            <div className="font-mono text-[17px] text-sky-200">x &lt; 3 ↔ (−∞, 3)</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">A parenthesis matches an open endpoint: 3 is excluded.</p>
          </div>
          <div className="rounded-[15px] border border-white/[0.05] bg-white/[0.012] p-3">
            <div className="font-mono text-[17px] text-amber-200">x ≤ 3 ↔ (−∞, 3]</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">A bracket at 3 matches a closed endpoint: 3 is included.</p>
          </div>
        </div>
      </details>
    </div>
  );
}

function TryStage({
  activeExample,
  coefficient,
  constant,
  rightSide,
  relation,
  probe,
  solution,
  probePasses,
  onExample,
  onProbe,
  onCoefficient,
  onConstant,
  onRightSide,
  onRelation,
}: {
  activeExample: NumberExampleId | null;
  coefficient: number;
  constant: number;
  rightSide: number;
  relation: Relation;
  probe: number;
  solution: ReturnType<typeof solveLinearInequality>;
  probePasses: boolean;
  onExample: (id: NumberExampleId) => void;
  onProbe: (value: number) => void;
  onCoefficient: (value: number) => void;
  onConstant: (value: number) => void;
  onRightSide: (value: number) => void;
  onRelation: (value: Relation) => void;
}) {
  return (
    <div className="grid gap-5">
      <div>
        <p className="text-[13px] leading-6 text-slate-400">Start with a curated case. Watch the region change, then test a value against it.</p>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {NUMBER_EXAMPLES.map((example, index) => (
            <ExampleButton
              key={example.id}
              active={activeExample === example.id}
              number={index + 1}
              label={example.label}
              equation={`${formatLinearExpression(example.a, example.c)} ${example.relation} ${example.r}`}
              note={example.note}
              onClick={() => onExample(example.id)}
            />
          ))}
        </div>
      </div>

      <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.28fr)_minmax(300px,0.72fr)]">
        <div className="grid gap-3">
          <div className="rounded-[18px] border border-white/[0.055] bg-black/[0.15] px-4 py-3">
            <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-600">Original statement</div>
            <div className="mt-1 font-mono text-[19px] text-slate-200">{formatLinearExpression(coefficient, constant)} {relation} {rightSide}</div>
            <div className="mt-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-600">After isolating x</div>
            <div className="mt-1 font-mono text-[24px] text-sky-200">x {solution.relation} {formatNumber(solution.boundary)}</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">{relationMeaning(solution.relation)}</p>
          </div>
          <NumberLinePanel solution={solution} probe={probe} probePasses={probePasses} />
        </div>

        <CaseTester
          coefficient={coefficient}
          constant={constant}
          rightSide={rightSide}
          relation={relation}
          probe={probe}
          solution={solution}
          passes={probePasses}
          onProbe={onProbe}
        />
      </div>

      {coefficient < 0 ? (
        <div className="rounded-[16px] border border-rose-300/[0.12] bg-rose-400/[0.025] p-3.5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-rose-300/75">Notice the reversal</div>
          <p className="mt-1.5 text-[12px] leading-5 text-slate-400">Dividing by {coefficient} reverses the order, so the original {relation} becomes {solution.relation} after x is isolated. We explain why in the final stage.</p>
        </div>
      ) : null}

      <details className="group rounded-[18px] border border-white/[0.055] bg-black/[0.14]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5">
          <span className="flex items-center gap-2 text-[12px] font-semibold text-slate-400"><SlidersHorizontal size={14} className="text-sky-300/70" /> Build your own inequality</span>
          <span className="text-[10px] text-slate-600 group-open:hidden">optional sandbox</span>
        </summary>
        <div className="grid gap-3 border-t border-white/[0.05] p-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[15px] border border-white/[0.045] bg-white/[0.012] p-3">
            <div className="text-[10px] font-semibold text-slate-400">Coefficient of x</div>
            <div className="mt-2 grid grid-cols-6 gap-1.5">
              {COEFFICIENTS.map((value) => (
                <button key={value} type="button" onClick={() => onCoefficient(value)} className={`h-9 rounded-lg border font-mono text-[11px] ${coefficient === value ? "border-sky-300/[0.30] bg-sky-400/[0.07] text-sky-200" : "border-white/[0.045] bg-black/[0.14] text-slate-500"}`}>{value}</button>
              ))}
            </div>
          </div>
          <SliderControl label="Constant" value={constant} min={-5} max={5} step={1} rgb="99, 102, 241" onChange={onConstant} />
          <SliderControl label="Right side" value={rightSide} min={-5} max={8} step={1} rgb="251, 191, 36" onChange={onRightSide} />
          <RelationPicker value={relation} onChange={onRelation} />
        </div>
      </details>
    </div>
  );
}

function PracticeDeck() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const question = PRACTICE_QUESTIONS[questionIndex];
  const selected = answers[questionIndex];
  const answered = selected !== undefined;
  const correct = answered && selected === question.correctIndex;
  const finished = questionIndex === PRACTICE_QUESTIONS.length - 1 && answered;

  const choose = (index: number) => {
    if (answered) return;
    setAnswers((current) => ({ ...current, [questionIndex]: index }));
  };

  return (
    <div className="mx-auto max-w-3xl py-2 sm:py-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Quick check</div>
          <div className="mt-1 text-[12px] text-slate-600">Question {questionIndex + 1} of {PRACTICE_QUESTIONS.length}</div>
        </div>
        <div className="flex gap-1.5">
          {PRACTICE_QUESTIONS.map((_, index) => (
            <span key={index} className={`h-2 w-8 rounded-full ${answers[index] !== undefined ? "bg-sky-300/50" : index === questionIndex ? "bg-sky-300/25" : "bg-white/[0.06]"}`} />
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-[22px] border border-white/[0.06] bg-black/[0.16] p-5 sm:p-6">
        <h3 className="text-[22px] font-semibold leading-8 text-white">{question.prompt}</h3>
        <div className="mt-5 grid gap-2.5">
          {question.choices.map((choice, index) => {
            const isSelected = selected === index;
            const isCorrectChoice = question.correctIndex === index;
            const stateClass = !answered
              ? "border-white/[0.06] bg-white/[0.012] hover:border-sky-300/[0.18] hover:bg-sky-400/[0.025]"
              : isCorrectChoice
                ? "border-emerald-300/[0.25] bg-emerald-400/[0.045]"
                : isSelected
                  ? "border-rose-300/[0.22] bg-rose-400/[0.035]"
                  : "border-white/[0.04] bg-black/[0.08] opacity-55";
            return (
              <button key={choice} type="button" onClick={() => choose(index)} className={`rounded-[16px] border px-4 py-3 text-left text-[13px] text-slate-300 transition-colors ${stateClass}`}>
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] font-mono text-[10px] text-slate-500">{String.fromCharCode(65 + index)}</span>
                  {choice}
                </span>
              </button>
            );
          })}
        </div>

        {answered ? (
          <div className={`mt-5 rounded-[16px] border p-4 ${correct ? "border-emerald-300/[0.15] bg-emerald-400/[0.025]" : "border-amber-300/[0.14] bg-amber-400/[0.02]"}`}>
            <div className="flex items-center gap-2">
              {correct ? <Check size={15} className="text-emerald-300" /> : <Target size={15} className="text-amber-300" />}
              <strong className="text-[13px] text-slate-200">{correct ? "Yes — that matches the model." : "Not quite. Compare it with the rule."}</strong>
            </div>
            <p className="mt-2 text-[12px] leading-5 text-slate-500">{question.explanation}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex justify-end">
        {!finished && answered ? (
          <button type="button" onClick={() => setQuestionIndex((current) => Math.min(PRACTICE_QUESTIONS.length - 1, current + 1))} className="inline-flex items-center gap-2 rounded-full border border-sky-300/[0.18] bg-sky-400/[0.04] px-4 py-2 text-[11px] font-semibold text-sky-200 hover:bg-sky-400/[0.07]">
            Next question <ArrowRight size={12} />
          </button>
        ) : null}
        {finished ? (
          <div className="rounded-full border border-emerald-300/[0.14] bg-emerald-400/[0.025] px-4 py-2 text-[11px] text-emerald-200/80">Practice complete · boundary, reversal, and membership checked</div>
        ) : null}
      </div>
    </div>
  );
}

function ExtendStage({ child }: { child: IntegratedChild }) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[22px] border border-rose-200/[0.09] bg-black/[0.18] p-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-rose-300/70">Why negatives reverse order</div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[15px] border border-white/[0.045] bg-white/[0.012] px-3 py-3 font-mono text-[18px] text-slate-300">2 &lt; 5</div>
            <div className="rounded-[15px] border border-rose-300/[0.10] bg-rose-400/[0.025] px-3 py-3 font-mono text-[18px] text-rose-200">−2 &gt; −5</div>
          </div>
          <p className="mt-4 text-[13px] leading-6 text-slate-400">Multiplying by a negative reflects the number line through zero. Left and right swap, so the order relation must reverse too.</p>
        </div>

        <div className="rounded-[22px] border border-indigo-200/[0.09] bg-black/[0.18] p-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-indigo-300/70">More than one boundary</div>
          <div className="mt-4 grid gap-3">
            <CompoundCard label="AND" subtitle="intersection" expression="−2 < x ≤ 5" explanation="Keep only the overlap satisfying both boundaries." rgb="14, 165, 233" variant="and" />
            <CompoundCard label="OR" subtitle="union" expression="x < −3 or x > 4" explanation="Keep either allowed region, even when they are separated." rgb="129, 140, 248" variant="or" />
          </div>
        </div>
      </div>

      <Link href={child.href} className="group rounded-[22px] border border-indigo-300/[0.16] bg-indigo-400/[0.035] p-5 transition-colors hover:border-indigo-300/[0.26] hover:bg-indigo-400/[0.055]">
        <div className="flex items-center justify-between gap-5">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-indigo-300/65">Next idea</div>
            <h3 className="mt-1 text-[22px] font-semibold text-white">{child.label}</h3>
            <p className="mt-2 max-w-3xl text-[12px] leading-5 text-slate-500">{child.description}</p>
          </div>
          <ArrowRight size={20} className="shrink-0 text-indigo-300 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </div>
  );
}

function FlowControls({ stageIndex, stageCount, onPrevious, onNext }: { stageIndex: number; stageCount: number; onPrevious: () => void; onNext: () => void }) {
  return (
    <div className="mt-7 flex items-center justify-between gap-3 border-t border-white/[0.055] pt-4">
      <button type="button" onClick={onPrevious} disabled={stageIndex === 0} className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] px-4 py-2 text-[11px] font-semibold text-slate-500 transition-colors hover:text-slate-300 disabled:cursor-default disabled:opacity-25">
        <ArrowLeft size={12} /> Previous
      </button>
      {stageIndex < stageCount - 1 ? (
        <button type="button" onClick={onNext} className="inline-flex items-center gap-2 rounded-full border border-sky-300/[0.18] bg-sky-400/[0.04] px-4 py-2 text-[11px] font-semibold text-sky-200 transition-colors hover:bg-sky-400/[0.07]">
          Continue <ArrowRight size={12} />
        </button>
      ) : (
        <span className="text-[10px] text-slate-600">You reached the extension point.</span>
      )}
    </div>
  );
}

function BoundaryReference() {
  const rows: readonly { symbol: Relation; reading: string; endpoint: "open" | "closed"; direction: "left" | "right" }[] = [
    { symbol: "<", reading: "less than", endpoint: "open", direction: "left" },
    { symbol: "≤", reading: "less than or equal", endpoint: "closed", direction: "left" },
    { symbol: ">", reading: "greater than", endpoint: "open", direction: "right" },
    { symbol: "≥", reading: "greater than or equal", endpoint: "closed", direction: "right" },
  ];

  return (
    <div>
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Read the symbol</div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((row) => (
          <div key={row.symbol} className="rounded-[17px] border border-white/[0.05] bg-black/[0.14] p-3.5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[27px] text-sky-200">{row.symbol}</span>
              <span className="font-mono text-[10px] text-indigo-300/75">{row.direction === "left" ? "← left" : "right →"}</span>
            </div>
            <strong className="mt-2 block text-[12px] text-slate-300">{row.reading}</strong>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500">
              <span className={`h-3.5 w-3.5 rounded-full border-2 border-sky-300 ${row.endpoint === "closed" ? "bg-sky-300" : "bg-[#071426]"}`} />
              {row.endpoint} endpoint
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseTester({ coefficient, constant, rightSide, relation, probe, solution, passes, onProbe }: { coefficient: number; constant: number; rightSide: number; relation: Relation; probe: number; solution: ReturnType<typeof solveLinearInequality>; passes: boolean; onProbe: (value: number) => void }) {
  const leftValue = coefficient * probe + constant;
  const quickValues = Array.from(new Set([0, 4, Math.round(solution.boundary)]));

  return (
    <div className="rounded-[20px] border border-emerald-200/[0.09] bg-black/[0.17] p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300/70">Test one value</div>
      <p className="mt-1 text-[11px] leading-5 text-slate-600">Substitute a candidate. True means it belongs to the region.</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {quickValues.map((value) => (
          <button key={value} type="button" onClick={() => onProbe(value)} className={`rounded-lg border px-3 py-2 font-mono text-[11px] ${probe === value ? "border-emerald-300/[0.28] bg-emerald-400/[0.06] text-emerald-200" : "border-white/[0.05] bg-black/[0.15] text-slate-500"}`}>x = {value}</button>
        ))}
      </div>

      <div className="mt-3 grid gap-2">
        <TestRow label="Original" value={`${formatLinearExpression(coefficient, constant)} ${relation} ${rightSide}`} />
        <TestRow label="Substitute" value={`${formatSubstitutedExpression(coefficient, constant, probe)} ${relation} ${rightSide}`} />
        <TestRow label="Compare" value={`${formatNumber(leftValue)} ${relation} ${rightSide}`} />
      </div>

      <div className={`mt-3 rounded-[15px] border p-3.5 ${passes ? "border-emerald-300/[0.18] bg-emerald-400/[0.04]" : "border-rose-300/[0.16] bg-rose-400/[0.035]"}`}>
        <div className="flex items-center gap-2">
          {passes ? <Check size={15} className="text-emerald-300" /> : <X size={15} className="text-rose-300" />}
          <strong className={`text-[13px] ${passes ? "text-emerald-200" : "text-rose-200"}`}>{passes ? "True" : "False"}</strong>
        </div>
        <p className="mt-1 text-[11px] leading-5 text-slate-500">x = {probe} {passes ? "is" : "is not"} in x {solution.relation} {formatNumber(solution.boundary)}.</p>
      </div>
    </div>
  );
}

function TestRow({ label, value }: { label: string; value: string }) {
  return <div className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-3 rounded-xl border border-white/[0.045] bg-black/[0.14] px-3 py-2.5"><span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-600">{label}</span><span className="font-mono text-[12px] text-slate-300">{value}</span></div>;
}

function ConceptFact({ icon: Icon, label, text, rgb }: { icon: LucideIcon; label: string; text: string; rgb: string }) {
  return <div className="grid grid-cols-[42px_minmax(0,1fr)] items-center gap-3 rounded-[17px] border border-white/[0.05] bg-black/[0.14] p-3.5"><span className="flex h-10 w-10 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.16)`, background: `rgba(${rgb},0.035)` }}><Icon size={16} /></span><span><strong className="block text-[12px] font-semibold text-slate-300">{label}</strong><span className="mt-0.5 block text-[10px] leading-4 text-slate-600">{text}</span></span></div>;
}

function ExampleButton({ active, number, label, equation, note, onClick }: { active: boolean; number: number; label: string; equation: string; note: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`rounded-[16px] border p-3.5 text-left transition-colors ${active ? "border-sky-300/[0.28] bg-sky-400/[0.06]" : "border-white/[0.045] bg-black/[0.14] hover:border-white/[0.09]"}`}><div className="flex items-center gap-2"><span className="font-mono text-[9px] text-slate-600">0{number}</span><strong className="text-[12px] text-slate-200">{label}</strong></div><div className="mt-2 font-mono text-[14px] text-sky-300">{equation}</div><p className="mt-1.5 text-[10px] leading-4 text-slate-600">{note}</p></button>;
}

function SliderControl({ label, value, min, max, step, rgb, onChange }: { label: string; value: number; min: number; max: number; step: number; rgb: string; onChange: (value: number) => void }) {
  return <label className="block rounded-[15px] border border-white/[0.045] bg-white/[0.012] p-3"><span className="flex items-center justify-between gap-2"><span className="text-[10px] font-semibold text-slate-400">{label}</span><span className="rounded-md px-2 py-1 font-mono text-[10px]" style={{ color: `rgb(${rgb})`, background: `rgba(${rgb},0.06)` }}>{formatNumber(value)}</span></span><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/[0.07] accent-sky-400" /></label>;
}

function RelationPicker({ value, onChange }: { value: Relation; onChange: (value: Relation) => void }) {
  return <div className="rounded-[15px] border border-white/[0.045] bg-white/[0.012] p-3"><div className="text-[10px] font-semibold text-slate-400">Relation</div><div className="mt-2 grid grid-cols-4 gap-1.5">{RELATIONS.map((item) => <button key={item} type="button" onClick={() => onChange(item)} className={`h-9 rounded-lg border font-mono text-[14px] ${value === item ? "border-sky-300/[0.28] bg-sky-400/[0.07] text-sky-200" : "border-white/[0.045] bg-black/[0.14] text-slate-500"}`}>{item}</button>)}</div></div>;
}

function NumberLinePanel({ solution, probe, probePasses }: { solution: ReturnType<typeof solveLinearInequality>; probe?: number; probePasses?: boolean }) {
  const width = 760;
  const height = 270;
  const left = 52;
  const right = width - 52;
  const y = 142;
  const xFor = (value: number) => left + ((value - NUMBER_MIN) / (NUMBER_MAX - NUMBER_MIN)) * (right - left);
  const boundaryX = xFor(clamp(solution.boundary, NUMBER_MIN, NUMBER_MAX));
  const hasProbe = probe !== undefined && probePasses !== undefined;
  const probeX = hasProbe ? xFor(clamp(probe, NUMBER_MIN, NUMBER_MAX)) : 0;

  return <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[20px] border border-sky-200/[0.10] bg-[#051321]/82 p-4"><div className="pointer-events-none absolute left-4 top-4 z-10"><div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Solution region</div><div className="mt-1 font-mono text-[12px] text-sky-300/80">x {solution.relation} {formatNumber(solution.boundary)}</div></div><svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[820px]" aria-label="Number line showing the inequality solution"><line x1={left} y1={y} x2={right} y2={y} stroke="#64748b" strokeWidth="2" />{Array.from({ length: 21 }, (_, index) => NUMBER_MIN + index).map((value) => { const x = xFor(value); return <g key={value}><line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="rgba(148,163,184,0.40)" />{value % 2 === 0 ? <text x={x} y={y + 28} fill="rgba(148,163,184,0.50)" fontSize="10" textAnchor="middle">{value}</text> : null}</g>; })}<line x1={solution.greater ? boundaryX : left} y1={y} x2={solution.greater ? right : boundaryX} y2={y} stroke="#38bdf8" strokeWidth="10" strokeLinecap="round" opacity="0.62" /><circle cx={boundaryX} cy={y} r="10" fill={solution.inclusive ? "#38bdf8" : "#051321"} stroke="#38bdf8" strokeWidth="4" />{hasProbe ? <><line x1={probeX} y1={y - 52} x2={probeX} y2={y - 18} stroke={probePasses ? "#34d399" : "#fb7185"} strokeWidth="2" strokeDasharray="4 4" /><circle cx={probeX} cy={y - 60} r="7" fill={probePasses ? "#34d399" : "#fb7185"} /><text x={probeX} y={y - 78} fill={probePasses ? "#6ee7b7" : "#fda4af"} fontSize="11" textAnchor="middle">x = {probe}</text></> : null}</svg></div>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[15px] border border-white/[0.045] bg-white/[0.012] px-3.5 py-3"><div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-600">{label}</div><div className="mt-1 text-[11px] font-medium" style={{ color: `rgba(${rgb},0.82)` }}>{value}</div></div>;
}

function CompoundCard({ label, subtitle, expression, explanation, rgb, variant }: { label: string; subtitle: string; expression: string; explanation: string; rgb: string; variant: "and" | "or" }) {
  return <div className="rounded-[17px] border p-3.5" style={{ borderColor: `rgba(${rgb},0.14)`, background: `rgba(${rgb},0.025)` }}><div className="flex items-center justify-between gap-3"><strong className="text-[14px] text-white">{label}</strong><span className="text-[9px] font-semibold uppercase tracking-[0.1em]" style={{ color: `rgba(${rgb},0.68)` }}>{subtitle}</span></div><MiniCompoundLine variant={variant} rgb={rgb} /><div className="mt-3 font-mono text-[12px]" style={{ color: `rgba(${rgb},0.82)` }}>{expression}</div><p className="mt-2 text-[11px] leading-5 text-slate-500">{explanation}</p></div>;
}

function MiniCompoundLine({ variant, rgb }: { variant: "and" | "or"; rgb: string }) {
  return <div className="relative mt-3 h-11 overflow-hidden rounded-xl border border-white/[0.04] bg-black/[0.14]"><div className="absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 bg-white/[0.12]" />{variant === "and" ? <><div className="absolute left-[28%] right-[28%] top-1/2 h-2 -translate-y-1/2 rounded-full" style={{ background: `rgba(${rgb},0.55)` }} /><div className="absolute left-[28%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-[#080b1b]" style={{ borderColor: `rgb(${rgb})` }} /><div className="absolute right-[28%] top-1/2 h-3.5 w-3.5 translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `rgb(${rgb})` }} /></> : <><div className="absolute left-0 right-[72%] top-1/2 h-2 -translate-y-1/2 rounded-full" style={{ background: `rgba(${rgb},0.55)` }} /><div className="absolute left-[28%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-[#080b1b]" style={{ borderColor: `rgb(${rgb})` }} /><div className="absolute left-[72%] right-0 top-1/2 h-2 -translate-y-1/2 rounded-full" style={{ background: `rgba(${rgb},0.55)` }} /><div className="absolute left-[72%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-[#080b1b]" style={{ borderColor: `rgb(${rgb})` }} /></>}</div>;
}

function solveLinearInequality(a: number, c: number, r: number, relation: Relation) {
  const boundary = (r - c) / a;
  const normalizedRelation = a < 0 ? flipRelation(relation) : relation;
  const greater = isGreaterRelation(normalizedRelation);
  const inclusive = isInclusive(normalizedRelation);
  return { boundary, relation: normalizedRelation, greater, inclusive };
}

function flipRelation(relation: Relation): Relation { if (relation === "<") return ">"; if (relation === "≤") return "≥"; if (relation === ">") return "<"; return "≤"; }
function isGreaterRelation(relation: Relation) { return relation === ">" || relation === "≥"; }
function isInclusive(relation: Relation) { return relation === "≤" || relation === "≥"; }
function compare(left: number, right: number, relation: Relation) { if (relation === "<") return left < right; if (relation === "≤") return left <= right; if (relation === ">") return left > right; return left >= right; }
function relationMeaning(relation: Relation) { if (relation === "<") return "Keep values below the boundary; do not include the boundary itself."; if (relation === "≤") return "Keep values below the boundary and include the boundary."; if (relation === ">") return "Keep values above the boundary; do not include the boundary itself."; return "Keep values above the boundary and include the boundary."; }
function formatLinearExpression(a: number, c: number) { const ax = a === 1 ? "x" : a === -1 ? "−x" : `${a}x`; if (c === 0) return ax; return `${ax} ${c > 0 ? "+" : "−"} ${Math.abs(c)}`; }
function formatSubstitutedExpression(a: number, c: number, x: number) { const ax = a === 1 ? `${x}` : a === -1 ? `−(${x})` : `${a}(${x})`; if (c === 0) return ax; return `${ax} ${c > 0 ? "+" : "−"} ${Math.abs(c)}`; }
function formatNumber(value: number) { if (Number.isInteger(value)) return String(value); return Number(value.toFixed(2)).toString(); }
function clamp(value: number, min: number, max: number) { return Math.max(min, Math.min(max, value)); }
