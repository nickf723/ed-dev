"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Equal,
  RefreshCcw,
  Scale,
  Sparkles,
} from "lucide-react";
import Assessment, { type AssessmentQuestion } from "@/app/_components/Assessment";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import LessonUtilityBar from "@/app/_components/LessonUtilityBar";
import FundamentalsLessonBackgroundV2 from "./FundamentalsLessonBackgroundV2";

export type EquationLessonKey = "one-step-equations" | "two-step-equations";

export type EquationLessonNavItem = {
  label: string;
  href: string;
};

type EquationLessonExperienceProps = {
  lesson: EquationLessonKey;
  breadcrumbs: readonly { label: string; href?: string }[];
  previous?: EquationLessonNavItem;
  next?: EquationLessonNavItem;
  unitHref: string;
};

type OperationChoice = {
  id: string;
  label: string;
  helpful: boolean;
  feedback: string;
};

type OneStepCase = {
  id: string;
  title: string;
  left: string;
  right: string;
  attachedOperation: string;
  inverseOperation: string;
  resultLeft: string;
  resultRight: string;
  solution: string;
  choices: readonly OperationChoice[];
  checkLines: readonly string[];
};

type TwoStepStage = {
  left: string;
  right: string;
  prompt: string;
  resultLeft: string;
  resultRight: string;
  choices: readonly OperationChoice[];
};

type TwoStepCase = {
  id: string;
  title: string;
  original: string;
  construction: readonly string[];
  stages: readonly TwoStepStage[];
  solution: string;
  checkLines: readonly string[];
};

const ONE_STEP_CASES: readonly OneStepCase[] = [
  {
    id: "addition",
    title: "Addition",
    left: "x + 6",
    right: "14",
    attachedOperation: "+ 6",
    inverseOperation: "− 6",
    resultLeft: "x",
    resultRight: "8",
    solution: "8",
    choices: [
      { id: "minus-six", label: "− 6", helpful: true, feedback: "Subtracting 6 undoes the +6 while preserving equality." },
      { id: "plus-six", label: "+ 6", helpful: false, feedback: "Adding 6 to both sides is legal, but it wraps x in even more addition instead of isolating it." },
      { id: "divide-six", label: "÷ 6", helpful: false, feedback: "Dividing both sides is legal here, but it does not undo the addition attached to x." },
    ],
    checkLines: ["x + 6 = 14", "8 + 6 = 14", "14 = 14"],
  },
  {
    id: "subtraction",
    title: "Subtraction",
    left: "x − 5",
    right: "12",
    attachedOperation: "− 5",
    inverseOperation: "+ 5",
    resultLeft: "x",
    resultRight: "17",
    solution: "17",
    choices: [
      { id: "plus-five", label: "+ 5", helpful: true, feedback: "Adding 5 cancels the −5 on the left and keeps both sides equal." },
      { id: "minus-five", label: "− 5", helpful: false, feedback: "Subtracting another 5 is balanced, but it moves x farther from being isolated." },
      { id: "times-five", label: "× 5", helpful: false, feedback: "Multiplying both sides preserves equality, but multiplication does not undo subtraction." },
    ],
    checkLines: ["x − 5 = 12", "17 − 5 = 12", "12 = 12"],
  },
  {
    id: "multiplication",
    title: "Multiplication",
    left: "4x",
    right: "28",
    attachedOperation: "× 4",
    inverseOperation: "÷ 4",
    resultLeft: "x",
    resultRight: "7",
    solution: "7",
    choices: [
      { id: "divide-four", label: "÷ 4", helpful: true, feedback: "Dividing by 4 cancels the coefficient and leaves x alone." },
      { id: "times-four", label: "× 4", helpful: false, feedback: "Multiplying by 4 is balanced, but it makes the coefficient larger instead of removing it." },
      { id: "minus-four", label: "− 4", helpful: false, feedback: "Subtraction cannot undo multiplication by 4." },
    ],
    checkLines: ["4x = 28", "4(7) = 28", "28 = 28"],
  },
  {
    id: "division",
    title: "Division",
    left: "x / 3",
    right: "6",
    attachedOperation: "÷ 3",
    inverseOperation: "× 3",
    resultLeft: "x",
    resultRight: "18",
    solution: "18",
    choices: [
      { id: "times-three", label: "× 3", helpful: true, feedback: "Multiplying by 3 undoes division by 3 on the left." },
      { id: "divide-three", label: "÷ 3", helpful: false, feedback: "Dividing again is balanced, but it adds another division layer instead of removing one." },
      { id: "plus-three", label: "+ 3", helpful: false, feedback: "Addition does not undo division by 3." },
    ],
    checkLines: ["x / 3 = 6", "18 / 3 = 6", "6 = 6"],
  },
] as const;

const TWO_STEP_CASES: readonly TwoStepCase[] = [
  {
    id: "plus",
    title: "Multiply, then add",
    original: "3x + 5 = 20",
    construction: ["x", "× 3 → 3x", "+ 5 → 3x + 5"],
    stages: [
      {
        left: "3x + 5",
        right: "20",
        prompt: "Remove the outer +5 layer.",
        resultLeft: "3x",
        resultRight: "15",
        choices: [
          { id: "minus-five", label: "− 5", helpful: true, feedback: "Subtracting 5 from both sides removes the outer addition cleanly." },
          { id: "plus-five", label: "+ 5", helpful: false, feedback: "Balanced, but it adds another outer layer instead of removing one." },
          { id: "divide-three-first", label: "÷ 3", helpful: false, feedback: "Dividing every term by 3 is legal, but it creates fractions: x + 5/3 = 20/3. The equation stays true, but the path gets messier." },
        ],
      },
      {
        left: "3x",
        right: "15",
        prompt: "Remove the remaining ×3 layer.",
        resultLeft: "x",
        resultRight: "5",
        choices: [
          { id: "divide-three", label: "÷ 3", helpful: true, feedback: "Dividing both sides by 3 cancels the coefficient and isolates x." },
          { id: "times-three", label: "× 3", helpful: false, feedback: "Balanced, but it strengthens the multiplication layer instead of undoing it." },
          { id: "minus-three", label: "− 3", helpful: false, feedback: "Subtraction cannot undo multiplication by 3." },
        ],
      },
    ],
    solution: "5",
    checkLines: ["3x + 5 = 20", "3(5) + 5 = 20", "15 + 5 = 20", "20 = 20"],
  },
  {
    id: "minus",
    title: "Multiply, then subtract",
    original: "4x − 7 = 21",
    construction: ["x", "× 4 → 4x", "− 7 → 4x − 7"],
    stages: [
      {
        left: "4x − 7",
        right: "21",
        prompt: "Remove the outer −7 layer.",
        resultLeft: "4x",
        resultRight: "28",
        choices: [
          { id: "plus-seven", label: "+ 7", helpful: true, feedback: "Adding 7 to both sides cancels the subtraction and leaves 4x = 28." },
          { id: "minus-seven", label: "− 7", helpful: false, feedback: "Balanced, but it doubles down on the subtraction instead of removing it." },
          { id: "divide-four-first", label: "÷ 4", helpful: false, feedback: "Legal if every term is divided, but it creates x − 7/4 = 21/4. That is equivalent, just less efficient." },
        ],
      },
      {
        left: "4x",
        right: "28",
        prompt: "Remove the remaining ×4 layer.",
        resultLeft: "x",
        resultRight: "7",
        choices: [
          { id: "divide-four", label: "÷ 4", helpful: true, feedback: "Dividing both sides by 4 isolates x." },
          { id: "times-four", label: "× 4", helpful: false, feedback: "Balanced, but it makes the coefficient larger." },
          { id: "plus-four", label: "+ 4", helpful: false, feedback: "Addition does not undo multiplication." },
        ],
      },
    ],
    solution: "7",
    checkLines: ["4x − 7 = 21", "4(7) − 7 = 21", "28 − 7 = 21", "21 = 21"],
  },
  {
    id: "negative",
    title: "Negative solution",
    original: "2x + 9 = 3",
    construction: ["x", "× 2 → 2x", "+ 9 → 2x + 9"],
    stages: [
      {
        left: "2x + 9",
        right: "3",
        prompt: "Remove the outer +9 layer.",
        resultLeft: "2x",
        resultRight: "−6",
        choices: [
          { id: "minus-nine", label: "− 9", helpful: true, feedback: "Subtracting 9 from both sides gives 2x = −6. A negative intermediate result is completely valid." },
          { id: "plus-nine", label: "+ 9", helpful: false, feedback: "Balanced, but it moves farther from isolation." },
          { id: "divide-two-first", label: "÷ 2", helpful: false, feedback: "Legal if applied to every term, but it creates x + 9/2 = 3/2 instead of simplifying the equation." },
        ],
      },
      {
        left: "2x",
        right: "−6",
        prompt: "Remove the remaining ×2 layer.",
        resultLeft: "x",
        resultRight: "−3",
        choices: [
          { id: "divide-two", label: "÷ 2", helpful: true, feedback: "Dividing both sides by 2 gives x = −3." },
          { id: "times-two", label: "× 2", helpful: false, feedback: "Balanced, but it moves away from isolation." },
          { id: "minus-two", label: "− 2", helpful: false, feedback: "Subtraction cannot cancel multiplication by 2." },
        ],
      },
    ],
    solution: "−3",
    checkLines: ["2x + 9 = 3", "2(−3) + 9 = 3", "−6 + 9 = 3", "3 = 3"],
  },
] as const;

const ONE_STEP_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "one-transfer-subtract",
    type: "short_answer",
    prompt: "Solve x − 8 = 11. Enter x.",
    acceptableAnswers: ["19", "x=19", "x = 19"],
    explanation: "Add 8 to both sides to undo the subtraction: x = 19.",
  },
  {
    id: "one-transfer-divide",
    type: "mcq",
    prompt: "What operation isolates x in 6x = 42?",
    options: ["Divide both sides by 6", "Subtract 6 from both sides", "Multiply both sides by 6"],
    correctAnswer: "Divide both sides by 6",
    explanation: "The inverse of multiplication by 6 is division by 6.",
  },
  {
    id: "one-shortcut",
    type: "tf",
    prompt: "In x + 4 = 9, changing +4 to −4 on the other side is shorthand for subtracting 4 from both sides.",
    correctAnswer: true,
    explanation: "The balance-preserving operation is the real reason the shorthand works.",
  },
];

const TWO_STEP_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "two-transfer",
    type: "short_answer",
    prompt: "Solve 5x + 4 = 29. Enter x.",
    acceptableAnswers: ["5", "x=5", "x = 5"],
    explanation: "Subtract 4 to get 5x = 25, then divide by 5.",
  },
  {
    id: "two-legal-route",
    type: "mcq",
    prompt: "For 3x + 5 = 20, what is true about dividing every term by 3 first?",
    options: ["It is illegal", "It is legal but creates fractions", "It changes the solution"],
    correctAnswer: "It is legal but creates fractions",
    explanation: "Dividing both sides, including every term, preserves equality. It is simply less convenient here.",
  },
  {
    id: "two-balance",
    type: "tf",
    prompt: "A solving step is valid only if it preserves equality; the cleanest-looking step is not automatically the only legal step.",
    correctAnswer: true,
    explanation: "Equality is the invariant. Strategy is about choosing among valid transformations that simplify the work.",
  },
];

export default function EquationLessonExperience(props: EquationLessonExperienceProps) {
  return props.lesson === "one-step-equations" ? (
    <OneStepLesson {...props} />
  ) : (
    <TwoStepLesson {...props} />
  );
}

function OneStepLesson({ breadcrumbs, previous, next, unitHref }: EquationLessonExperienceProps) {
  const accent = "34, 211, 238";
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const [checkStep, setCheckStep] = useState(0);
  const current = ONE_STEP_CASES[caseIndex];
  const choice = current.choices.find((item) => item.id === selectedOperation) ?? null;

  function chooseCase(index: number) {
    setCaseIndex(index);
    setSelectedOperation(null);
    setSolved(false);
    setCheckStep(0);
  }

  function reset() {
    chooseCase(caseIndex);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#03151b] text-stone-100">
      <FundamentalsLessonBackgroundV2 lesson="one-step-equations" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03),rgba(0,0,0,0.42))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow="Lesson 02 · One operation"
          icon={Scale}
          title={<span>Solving One-Step Equations</span>}
          subtitle="See every one-step equation as the same job: identify the single operation attached to x, undo it with its inverse, and mirror that operation on both sides."
          accentRgb={accent}
          titleClassName="font-mono text-[clamp(2.1rem,4.1vw,4.3rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f4fdff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <LessonUtilityBar practiceTargetId="fundamentals-practice" vocabulary accentRgb={accent} />

        <section className="mt-4 grid gap-4 rounded-[26px] border border-cyan-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/75">Learner question</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.05rem)] font-semibold tracking-[-0.035em] text-white">
              What operation is hiding x, and what operation undoes it?
            </h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-400">
              A one-step equation has exactly one operation between x and isolation. The equal sign is a promise that both sides have the same value, so any change must be mirrored.
            </p>
          </div>
          <div className="rounded-[18px] border border-cyan-200/[0.10] bg-cyan-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-300/68">The reusable rule</div>
            <div className="mt-2 font-mono text-[18px] text-cyan-100">operation ↔ inverse</div>
            <p className="mt-2 text-[11px] leading-5 text-stone-500">
              Apply the inverse operation to both sides. The operation on x cancels; equality survives.
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
          <div className="max-w-3xl">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/70">Inverse pairs</div>
            <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-white">Four surface forms, one pattern.</h2>
            <p className="mt-2 text-[12px] leading-5 text-stone-500">
              The arithmetic changes, but the solving logic does not. Find the attached operation and use its inverse.
            </p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <InverseCard expression="x + 6" attached="+ 6" inverse="− 6" result="x" />
            <InverseCard expression="x − 5" attached="− 5" inverse="+ 5" result="x" />
            <InverseCard expression="4x" attached="× 4" inverse="÷ 4" result="x" />
            <InverseCard expression="x / 3" attached="÷ 3" inverse="× 3" result="x" />
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-cyan-200/[0.13] bg-[#03131a]/58 p-5 backdrop-blur-2xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-300/75">Inverse workbench</div>
              <h2 className="mt-1 text-[21px] font-semibold text-white">Undo the operation, on both sides.</h2>
            </div>
            <button type="button" onClick={reset} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.07] px-3 py-2 text-[10px] font-semibold text-stone-500 hover:text-stone-300">
              <RefreshCcw size={13} /> Reset
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {ONE_STEP_CASES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => chooseCase(index)}
                className="rounded-xl border px-3 py-2 text-[10px] font-semibold"
                style={{
                  borderColor: index === caseIndex ? `rgba(${accent},0.30)` : "rgba(255,255,255,0.06)",
                  background: index === caseIndex ? `rgba(${accent},0.06)` : "rgba(0,0,0,0.10)",
                  color: index === caseIndex ? `rgb(${accent})` : "rgb(120 113 108)",
                }}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.18fr)_360px]">
            <div>
              <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.16] p-5 sm:p-6">
                <div className="grid grid-cols-[1fr_50px_1fr] items-start gap-3">
                  <MirrorSide label="Left side" expression={solved ? current.resultLeft : current.left} operation={!solved ? choice?.label : undefined} accent={accent} />
                  <div className="pt-10 text-center font-mono text-[40px] text-cyan-300">=</div>
                  <MirrorSide label="Right side" expression={solved ? current.resultRight : current.right} operation={!solved ? choice?.label : undefined} accent={accent} />
                </div>
                <div className="mt-4 rounded-[15px] border border-white/[0.05] bg-white/[0.012] p-3 text-center">
                  <span className="text-[10px] font-semibold text-stone-500">Attached to x: </span>
                  <span className="font-mono text-[13px] text-cyan-200">{current.attachedOperation}</span>
                  <span className="mx-2 text-stone-700">→</span>
                  <span className="text-[10px] font-semibold text-stone-500">inverse: </span>
                  <span className="font-mono text-[13px] text-emerald-300">{current.inverseOperation}</span>
                </div>
              </div>

              {choice && !solved ? (
                <FeedbackPanel choice={choice} accent={accent}>
                  {choice.helpful ? (
                    <button
                      type="button"
                      onClick={() => setSolved(true)}
                      className="rounded-xl border px-4 py-2 text-[10px] font-semibold"
                      style={{ borderColor: `rgba(${accent},0.24)`, background: `rgba(${accent},0.055)`, color: `rgb(${accent})` }}
                    >
                      Simplify both sides
                    </button>
                  ) : null}
                </FeedbackPanel>
              ) : null}
            </div>

            <div className="rounded-[22px] border border-white/[0.06] bg-black/[0.13] p-4">
              {!solved ? (
                <>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">Choose the inverse</div>
                  <h3 className="mt-2 text-[17px] font-semibold text-white">Which operation isolates x?</h3>
                  <p className="mt-2 text-[11px] leading-5 text-stone-500">Every option below is applied to both sides. The question is which one actually undoes the operation attached to x.</p>
                  <div className="mt-4 grid gap-2">
                    {current.choices.map((item) => (
                      <OperationButton key={item.id} item={item} selected={selectedOperation === item.id} accent={accent} onClick={() => setSelectedOperation(item.id)} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex min-h-[265px] flex-col justify-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/[0.20] bg-cyan-400/[0.05] text-cyan-300"><Check size={20} /></div>
                  <div className="mt-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">Variable isolated</div>
                  <div className="mt-2 font-mono text-[clamp(2.1rem,4vw,3.2rem)] font-semibold text-white">x = {current.solution}</div>
                  <p className="mt-3 text-[11px] leading-5 text-stone-500">The inverse operation removed the only layer around x. Now the original equation can verify the result.</p>
                </div>
              )}
            </div>
          </div>

          <VerificationBlock solved={solved} lines={current.checkLines} solution={current.solution} checkStep={checkStep} setCheckStep={setCheckStep} accent={accent} />
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[24px] border border-amber-200/[0.10] bg-black/[0.16] p-5 backdrop-blur-2xl">
            <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-amber-300/70">Shortcut vs reason</div>
            <h2 className="mt-1 text-[18px] font-semibold text-white">“Move it across and change the sign” is shorthand, not the rule.</h2>
            <p className="mt-3 text-[12px] leading-5 text-stone-400">
              In x + 6 = 14, the +6 does not teleport across the equal sign. We subtract 6 from both sides. The left-side +6 and −6 cancel, leaving x = 8.
            </p>
            <div className="mt-4 rounded-[16px] border border-white/[0.06] bg-black/[0.14] px-4 py-3 font-mono text-[14px] text-stone-300">x + 6 − 6 = 14 − 6</div>
          </div>
          <div className="rounded-[24px] border border-violet-200/[0.10] bg-black/[0.16] p-5 backdrop-blur-2xl">
            <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-violet-300/70">What stays invariant?</div>
            <h2 className="mt-1 text-[18px] font-semibold text-white">The equation may look different; its solution must stay the same.</h2>
            <p className="mt-3 text-[12px] leading-5 text-stone-400">
              Balanced operations create equivalent equations. A legal but unhelpful move can preserve the solution while making x harder to isolate.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <MiniVerdict label="Valid + useful" text="Subtract 6 from both sides." good />
              <MiniVerdict label="Valid + unhelpful" text="Add 6 to both sides." />
            </div>
          </div>
        </section>

        <AssessmentSection title="One-Step Equations check" questions={ONE_STEP_QUESTIONS} accent={accent} />
        <LessonNavigation previous={previous} next={next} unitHref={unitHref} currentStep="02" accent={accent} />
      </div>
      <AssessmentStyles />
    </main>
  );
}

function TwoStepLesson({ breadcrumbs, previous, next, unitHref }: EquationLessonExperienceProps) {
  const accent = "96, 165, 250";
  const [caseIndex, setCaseIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);
  const [checkStep, setCheckStep] = useState(0);
  const current = TWO_STEP_CASES[caseIndex];
  const solved = stage >= current.stages.length;
  const activeStage = solved ? null : current.stages[stage];
  const choice = activeStage?.choices.find((item) => item.id === selectedOperation) ?? null;
  const history = [current.original.split("=")[0].trim() + " = " + current.original.split("=")[1].trim()];
  for (let index = 0; index < Math.min(stage, current.stages.length); index += 1) {
    history.push(`${current.stages[index].resultLeft} = ${current.stages[index].resultRight}`);
  }

  function chooseCase(index: number) {
    setCaseIndex(index);
    setStage(0);
    setSelectedOperation(null);
    setCheckStep(0);
  }

  function applyHelpfulChoice() {
    if (!choice?.helpful) return;
    setStage((value) => Math.min(value + 1, current.stages.length));
    setSelectedOperation(null);
    setCheckStep(0);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#04111f] text-stone-100">
      <FundamentalsLessonBackgroundV2 lesson="two-step-equations" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03),rgba(0,0,0,0.44))]" />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-4 sm:px-6 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={breadcrumbs}
          eyebrow="Lesson 03 · Two layers"
          icon={Equal}
          title={<span>Solving Two-Step Equations</span>}
          subtitle="Read a two-step equation as a process built around x, then undo those layers with equivalent transformations until the variable is isolated."
          accentRgb={accent}
          titleClassName="font-mono text-[clamp(2.05rem,4vw,4.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.055em] text-[#f4f8ff]"
          iconClassName="rounded-[16px]"
          headerClassName="border-white/[0.12]"
        />

        <LessonUtilityBar practiceTargetId="fundamentals-practice" vocabulary accentRgb={accent} />

        <section className="mt-4 grid gap-4 rounded-[26px] border border-blue-200/[0.11] bg-black/[0.20] p-5 backdrop-blur-2xl lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300/75">Learner question</div>
            <h2 className="mt-2 max-w-4xl text-[clamp(1.5rem,2.6vw,2.05rem)] font-semibold tracking-[-0.035em] text-white">
              If x is hidden behind two operations, which layer should we undo first?
            </h2>
            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-stone-400">
              Equality is still the rule: every transformation must preserve both sides. The new challenge is strategy. We usually remove the outer layer first because it keeps the arithmetic simple.
            </p>
          </div>
          <div className="rounded-[18px] border border-blue-200/[0.10] bg-blue-400/[0.025] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-blue-300/68">Rule vs strategy</div>
            <div className="mt-2 font-mono text-[16px] text-blue-100">Rule: preserve equality</div>
            <div className="mt-1 font-mono text-[16px] text-violet-200">Strategy: simplify as you undo</div>
            <p className="mt-2 text-[11px] leading-5 text-stone-500">A different balanced route can still be valid even when it is not the cleanest route.</p>
          </div>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(330px,0.9fr)]">
          <div className="rounded-[28px] border border-white/[0.09] bg-black/[0.18] p-5 backdrop-blur-2xl">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300/70">How the equation was built</div>
            <h2 className="mt-1 text-[21px] font-semibold text-white">Operations wrap around x in layers.</h2>
            <p className="mt-2 text-[12px] leading-5 text-stone-500">For 3x + 5, multiplication happens to x first; addition is the outer layer that acts last.</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <LayerCard label="Start" value="x" />
              <LayerArrow text="× 3" />
              <LayerCard label="Inner layer" value="3x" />
              <LayerArrow text="+ 5" />
              <LayerCard label="Outer layer" value="3x + 5" />
            </div>
          </div>

          <div className="rounded-[28px] border border-violet-200/[0.10] bg-black/[0.18] p-5 backdrop-blur-2xl">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-300/70">Worked model</div>
            <h2 className="mt-1 text-[21px] font-semibold text-white">Undo the construction in reverse.</h2>
            <div className="mt-5 space-y-2">
              <WorkedLine index="01" equation="3x + 5 = 20" note="Start" />
              <WorkedLine index="02" equation="3x = 15" note="subtract 5 from both sides" />
              <WorkedLine index="03" equation="x = 5" note="divide both sides by 3" final />
            </div>
            <p className="mt-4 text-[11px] leading-5 text-stone-500">Reverse order is a useful default because it peels away the outer operation without disturbing the inner structure.</p>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-blue-200/[0.13] bg-[#061426]/60 p-5 backdrop-blur-2xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300/75">Layer workbench</div>
              <h2 className="mt-1 text-[21px] font-semibold text-white">Peel the equation back to x.</h2>
            </div>
            <button type="button" onClick={() => chooseCase(caseIndex)} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/[0.07] px-3 py-2 text-[10px] font-semibold text-stone-500 hover:text-stone-300">
              <RefreshCcw size={13} /> Reset
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {TWO_STEP_CASES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => chooseCase(index)}
                className="rounded-xl border px-3 py-2 text-[10px] font-semibold"
                style={{
                  borderColor: index === caseIndex ? `rgba(${accent},0.30)` : "rgba(255,255,255,0.06)",
                  background: index === caseIndex ? `rgba(${accent},0.06)` : "rgba(0,0,0,0.10)",
                  color: index === caseIndex ? `rgb(${accent})` : "rgb(120 113 108)",
                }}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="rounded-[24px] border border-white/[0.07] bg-black/[0.16] p-5">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">Equation history</div>
              <div className="mt-4 space-y-3">
                {history.map((line, index) => (
                  <div key={`${line}-${index}`} className="flex items-center gap-3 rounded-[16px] border border-white/[0.05] bg-white/[0.012] px-4 py-3">
                    <span className="font-mono text-[10px] text-blue-300/65">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-[clamp(1.05rem,2.2vw,1.45rem)] text-stone-200">{line}</span>
                    {index === history.length - 1 && solved ? <Check size={14} className="ml-auto text-emerald-300" /> : null}
                  </div>
                ))}
              </div>

              {!solved && activeStage && choice ? (
                <div className="mt-4 rounded-[16px] border px-4 py-3" style={{ borderColor: choice.helpful ? `rgba(${accent},0.24)` : "rgba(251,191,36,0.16)", background: choice.helpful ? `rgba(${accent},0.035)` : "rgba(251,191,36,0.025)" }}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-semibold" style={{ color: choice.helpful ? `rgb(${accent})` : "rgb(252 211 77)" }}>{choice.helpful ? "Balanced and simplifying" : "Balanced, but strategically awkward"}</span>
                    <span className="font-mono text-[14px] text-stone-300">both sides {choice.label}</span>
                  </div>
                  <p className="mt-2 text-[11px] leading-5 text-stone-500">{choice.feedback}</p>
                  {choice.helpful ? (
                    <button type="button" onClick={applyHelpfulChoice} className="mt-3 rounded-xl border px-4 py-2 text-[10px] font-semibold" style={{ borderColor: `rgba(${accent},0.24)`, background: `rgba(${accent},0.055)`, color: `rgb(${accent})` }}>
                      Apply and simplify
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="rounded-[22px] border border-white/[0.06] bg-black/[0.13] p-4">
              {!solved && activeStage ? (
                <>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">Layer {stage + 1} of {current.stages.length}</div>
                  <h3 className="mt-2 text-[17px] font-semibold text-white">{activeStage.prompt}</h3>
                  <p className="mt-2 text-[11px] leading-5 text-stone-500">Choose an operation to apply to the entire left side and the entire right side.</p>
                  <div className="mt-4 grid gap-2">
                    {activeStage.choices.map((item) => (
                      <OperationButton key={item.id} item={item} selected={selectedOperation === item.id} accent={accent} onClick={() => setSelectedOperation(item.id)} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex min-h-[280px] flex-col justify-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-300/[0.20] bg-blue-400/[0.05] text-blue-300"><Check size={20} /></div>
                  <div className="mt-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-600">Both layers removed</div>
                  <div className="mt-2 font-mono text-[clamp(2.1rem,4vw,3.2rem)] font-semibold text-white">x = {current.solution}</div>
                  <p className="mt-3 text-[11px] leading-5 text-stone-500">The solution came from equivalent equations, not from guessing. Verification comes next.</p>
                </div>
              )}
            </div>
          </div>

          <VerificationBlock solved={solved} lines={current.checkLines} solution={current.solution} checkStep={checkStep} setCheckStep={setCheckStep} accent={accent} />
        </section>

        <section className="mt-4 rounded-[28px] border border-violet-200/[0.10] bg-black/[0.17] p-5 backdrop-blur-2xl">
          <div className="max-w-3xl">
            <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-violet-300/70">Stress-test the strategy</div>
            <h2 className="mt-1 text-[20px] font-semibold text-white">A different first step can be legal without being pleasant.</h2>
            <p className="mt-2 text-[12px] leading-5 text-stone-500">For 3x + 5 = 20, both routes below preserve the same solution. The first route is preferred because it keeps the numbers simple.</p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <RouteCard label="Cleaner route" lines={["3x + 5 = 20", "3x = 15", "x = 5"]} note="Subtract 5, then divide by 3." good />
            <RouteCard label="Legal, messier route" lines={["3x + 5 = 20", "x + 5/3 = 20/3", "x = 5"]} note="Divide every term by 3 first. Equality survives, but fractions appear." />
          </div>
          <div className="mt-4 rounded-[16px] border border-blue-200/[0.08] bg-blue-400/[0.02] px-4 py-3 text-[11px] leading-5 text-stone-400">
            <strong className="text-blue-200">Generalize:</strong> preserving equality decides whether a move is valid. Choosing moves that reduce complexity decides whether a route is efficient.
          </div>
        </section>

        <AssessmentSection title="Two-Step Equations check" questions={TWO_STEP_QUESTIONS} accent={accent} />
        <LessonNavigation previous={previous} next={next} unitHref={unitHref} currentStep="03" accent={accent} />
      </div>
      <AssessmentStyles />
    </main>
  );
}

function InverseCard({ expression, attached, inverse, result }: { expression: string; attached: string; inverse: string; result: string }) {
  return (
    <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
      <div className="font-mono text-[20px] text-stone-200">{expression}</div>
      <div className="mt-4 flex items-center gap-2 text-[10px]">
        <span className="rounded-lg border border-white/[0.05] px-2 py-1 font-mono text-stone-500">{attached}</span>
        <span className="text-stone-700">undo with</span>
        <span className="rounded-lg border border-cyan-300/[0.16] bg-cyan-400/[0.035] px-2 py-1 font-mono text-cyan-200">{inverse}</span>
      </div>
      <div className="mt-3 font-mono text-[13px] text-emerald-300">→ {result}</div>
    </div>
  );
}

function MirrorSide({ label, expression, operation, accent }: { label: string; expression: string; operation?: string; accent: string }) {
  return (
    <div className="text-center">
      <div className="text-[8px] font-semibold uppercase tracking-[0.12em] text-stone-600">{label}</div>
      <div className="mt-2 flex min-h-[100px] items-center justify-center rounded-[18px] border border-white/[0.07] bg-white/[0.015] px-3 font-mono text-[clamp(1.35rem,3vw,2.15rem)] font-semibold text-white">{expression}</div>
      <div className="mx-auto mt-3 flex min-h-10 max-w-[170px] items-center justify-center rounded-xl border font-mono text-[17px]" style={{ borderColor: operation ? `rgba(${accent},0.24)` : "rgba(255,255,255,0.04)", background: operation ? `rgba(${accent},0.045)` : "rgba(0,0,0,0.10)", color: operation ? `rgb(${accent})` : "rgb(87 83 78)" }}>
        {operation ?? "same operation"}
      </div>
    </div>
  );
}

function OperationButton({ item, selected, accent, onClick }: { item: OperationChoice; selected: boolean; accent: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center justify-between rounded-[16px] border px-4 py-3 text-left" style={{ borderColor: selected ? `rgba(${accent},0.28)` : "rgba(255,255,255,0.06)", background: selected ? `rgba(${accent},0.055)` : "rgba(0,0,0,0.10)" }}>
      <span className="text-[10px] font-semibold text-stone-500">Apply to both sides</span>
      <span className="font-mono text-[18px]" style={{ color: selected ? `rgb(${accent})` : "rgb(168 162 158)" }}>{item.label}</span>
    </button>
  );
}

function FeedbackPanel({ choice, accent, children }: { choice: OperationChoice; accent: string; children?: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-[18px] border px-4 py-3" style={{ borderColor: choice.helpful ? `rgba(${accent},0.22)` : "rgba(251,191,36,0.16)", background: choice.helpful ? `rgba(${accent},0.035)` : "rgba(251,191,36,0.025)" }} aria-live="polite">
      <div className="text-[10px] font-semibold" style={{ color: choice.helpful ? `rgb(${accent})` : "rgb(252 211 77)" }}>{choice.helpful ? "Balanced and useful" : "Balanced, but not useful yet"}</div>
      <p className="mt-1 text-[11px] leading-5 text-stone-500">{choice.feedback}</p>
      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  );
}

function VerificationBlock({ solved, lines, solution, checkStep, setCheckStep, accent }: { solved: boolean; lines: readonly string[]; solution: string; checkStep: number; setCheckStep: React.Dispatch<React.SetStateAction<number>>; accent: string }) {
  return (
    <div className="mt-5 border-t border-white/[0.06] pt-5">
      <div className="text-[9px] font-semibold uppercase tracking-[0.13em]" style={{ color: `rgba(${accent},0.72)` }}>Verify in the original</div>
      {!solved ? (
        <p className="mt-2 text-[11px] text-stone-600">Solve first. Substitution checks the value you derived; it does not discover the value for you.</p>
      ) : (
        <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_290px]">
          <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
            <div className="space-y-2">
              {lines.slice(0, checkStep + 1).map((line, index) => (
                <div key={`${line}-${index}`} className="flex items-center gap-3 rounded-xl border border-white/[0.045] bg-white/[0.012] px-3 py-2.5 font-mono text-[14px] text-stone-300">
                  <span className="text-[9px]" style={{ color: index === lines.length - 1 ? "rgb(110 231 183)" : `rgba(${accent},0.72)` }}>{String(index + 1).padStart(2, "0")}</span>
                  <span>{line}</span>
                  {index === lines.length - 1 ? <Check size={14} className="ml-auto text-emerald-300" /> : null}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
            <h4 className="text-[14px] font-semibold text-white">{checkStep === 0 ? `Substitute x = ${solution}.` : checkStep < lines.length - 1 ? "Evaluate the left side." : "The original statement is true."}</h4>
            <p className="mt-2 text-[10px] leading-4 text-stone-500">{checkStep === lines.length - 1 ? `Both sides match, so x = ${solution} checks out.` : "Keep the original equation visible so the verification answers the exact statement you started with."}</p>
            {checkStep < lines.length - 1 ? (
              <button type="button" onClick={() => setCheckStep((value) => Math.min(value + 1, lines.length - 1))} className="mt-4 w-full rounded-xl border px-4 py-2.5 text-[10px] font-semibold" style={{ borderColor: `rgba(${accent},0.24)`, background: `rgba(${accent},0.05)`, color: `rgb(${accent})` }}>
                {checkStep === 0 ? `Substitute x = ${solution}` : "Evaluate"}
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

function MiniVerdict({ label, text, good = false }: { label: string; text: string; good?: boolean }) {
  return (
    <div className="rounded-[14px] border border-white/[0.05] bg-white/[0.012] p-3">
      <div className={`text-[9px] font-semibold uppercase tracking-[0.1em] ${good ? "text-emerald-300" : "text-amber-300"}`}>{label}</div>
      <p className="mt-1.5 text-[10px] leading-4 text-stone-500">{text}</p>
    </div>
  );
}

function LayerCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-h-[116px] min-w-0 flex-1 flex-col justify-center rounded-[18px] border border-white/[0.06] bg-white/[0.012] p-4 text-center">
      <div className="text-[8px] font-semibold uppercase tracking-[0.11em] text-stone-600">{label}</div>
      <div className="mt-2 font-mono text-[20px] text-stone-200">{value}</div>
    </div>
  );
}

function LayerArrow({ text }: { text: string }) {
  return (
    <div className="flex min-w-[62px] items-center justify-center font-mono text-[13px] text-blue-300 sm:flex-col">
      <span>{text}</span>
      <span className="ml-2 text-stone-700 sm:ml-0 sm:mt-1">→</span>
    </div>
  );
}

function WorkedLine({ index, equation, note, final = false }: { index: string; equation: string; note: string; final?: boolean }) {
  return (
    <div className="rounded-[15px] border border-white/[0.055] bg-white/[0.012] px-3 py-3">
      <div className="flex items-center gap-3">
        <span className={`font-mono text-[9px] ${final ? "text-emerald-300" : "text-violet-300/70"}`}>{index}</span>
        <span className="font-mono text-[15px] text-stone-200">{equation}</span>
      </div>
      <div className="mt-1.5 pl-7 text-[10px] leading-4 text-stone-600">{note}</div>
    </div>
  );
}

function RouteCard({ label, lines, note, good = false }: { label: string; lines: readonly string[]; note: string; good?: boolean }) {
  return (
    <div className="rounded-[20px] border border-white/[0.06] bg-black/[0.12] p-4">
      <div className={`text-[9px] font-semibold uppercase tracking-[0.12em] ${good ? "text-emerald-300" : "text-amber-300"}`}>{label}</div>
      <div className="mt-3 space-y-2">
        {lines.map((line) => <div key={line} className="rounded-xl border border-white/[0.045] bg-white/[0.012] px-3 py-2 font-mono text-[13px] text-stone-300">{line}</div>)}
      </div>
      <p className="mt-3 text-[10px] leading-4 text-stone-500">{note}</p>
    </div>
  );
}

function AssessmentSection({ title, questions, accent }: { title: string; questions: AssessmentQuestion[]; accent: string }) {
  return (
    <section id="fundamentals-practice" className="scroll-mt-24 mt-4">
      <details className="group overflow-hidden rounded-[22px] border border-white/[0.09] bg-black/[0.18] backdrop-blur-2xl">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
          <span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.13em]" style={{ color: `rgba(${accent},0.72)` }}>Transfer check</span>
            <strong className="mt-1 block text-[15px] text-stone-200">Fresh equations, same underlying idea</strong>
          </span>
          <Sparkles size={16} style={{ color: `rgb(${accent})` }} />
        </summary>
        <div className="fundamentals-assessment border-t border-white/[0.06] p-3 sm:p-4">
          <Assessment title={title} questions={questions} accentColor="cyan" />
        </div>
      </details>
    </section>
  );
}

function LessonNavigation({ previous, next, unitHref, currentStep, accent }: { previous?: EquationLessonNavItem; next?: EquationLessonNavItem; unitHref: string; currentStep: string; accent: string }) {
  return (
    <nav className="mt-4 pb-8" aria-label="Algebra Fundamentals lesson navigation">
      <div className="mb-2 flex justify-end"><span className="font-mono text-[10px] text-stone-700">{currentStep} / 05</span></div>
      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? <NavCard item={previous} direction="previous" accent={accent} /> : <div className="hidden sm:block" aria-hidden="true" />}
        {next ? <NavCard item={next} direction="next" accent={accent} /> : (
          <Link href={unitHref} className="group flex min-h-[76px] items-center rounded-[18px] border px-4" style={{ borderColor: `rgba(${accent},0.16)`, background: `rgba(${accent},0.035)` }}>
            <span className="min-w-0 flex-1 text-right"><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-stone-600">Unit complete</span><strong className="mt-1 block text-[14px] text-stone-200">Return to Algebra Fundamentals</strong></span><Check size={15} className="ml-3" style={{ color: `rgb(${accent})` }} />
          </Link>
        )}
      </div>
    </nav>
  );
}

function NavCard({ item, direction, accent }: { item: EquationLessonNavItem; direction: "previous" | "next"; accent: string }) {
  const isPrevious = direction === "previous";
  return (
    <Link href={item.href} className="group flex min-h-[76px] items-center gap-3 rounded-[18px] border px-4 py-3" style={{ borderColor: `rgba(${accent},0.14)`, background: `rgba(${accent},0.025)` }}>
      {isPrevious ? <ArrowLeft size={15} style={{ color: `rgb(${accent})` }} /> : null}
      <span className={`min-w-0 flex-1 ${isPrevious ? "" : "text-right"}`}><span className="block text-[9px] font-semibold uppercase tracking-[0.10em] text-stone-600">{isPrevious ? "Previous lesson" : "Next lesson"}</span><strong className="mt-1 block text-[14px] text-stone-200">{item.label}</strong></span>
      {!isPrevious ? <ArrowRight size={15} style={{ color: `rgb(${accent})` }} /> : null}
    </Link>
  );
}

function AssessmentStyles() {
  return (
    <style>{`
      .fundamentals-assessment > div { border-radius: 18px !important; padding: 16px !important; background: rgba(0,0,0,0.10) !important; box-shadow: none !important; }
      .fundamentals-assessment > div > div { min-height: 300px !important; }
      .fundamentals-assessment h3 { margin-bottom: 16px !important; font-size: 1.05rem !important; line-height: 1.45 !important; }
      .fundamentals-assessment button { padding-top: 10px !important; padding-bottom: 10px !important; }
    `}</style>
  );
}
