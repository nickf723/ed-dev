// components/VariableComponents.tsx
"use client";
import React, { useState } from "react";
import { M } from "@/components/Math";
import PageHeader from "@/components/PageHeader";
import {
  AppletContainer,
  ContentP,
} from "@/components/LessonBlocks";
import { Check, ChevronRight, X as XIcon, Variable as VariableIcon, Equal as EqualIcon, Replace } from "@/components/icons";

/**
 * Applet for evaluating a simple expression with one variable, 'x'.
 */
export function EvaluateApplet({
  expression,
  fn,
}: {
  expression: string;
  fn: (x: number) => number;
}) {
  const [inputValue, setInputValue] = useState("5");
  const [result, setResult] = useState<number | string>(() =>
    fn(Number("5"))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(inputValue);
    if (isNaN(num)) {
      setResult("Invalid input");
    } else {
      setResult(fn(num));
    }
  };

  return (
    <AppletContainer title="Interactive Evaluator">
      <ContentP>
        Evaluate the expression <M>{expression}</M> for any value of <M>x</M>.
      </ContentP>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col items-center gap-3 sm:flex-row"
      >
        <label htmlFor="x-input" className="flex items-center gap-2">
          <span className="font-mono text-lg text-neutral-300">
            If <M>x =</M>
          </span>
          <input
            id="x-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-24 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            placeholder="e.g., 5"
          />
        </label>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-cyan-500"
        >
          <ChevronRight size={16} />
          Evaluate
        </button>
      </form>
      <div className="mt-4 rounded-lg bg-neutral-800 p-4 text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          Result
        </span>
        <p className="font-mono text-3xl font-bold text-cyan-300">
          <M>{String(result)}</M>
        </p>
      </div>
    </AppletContainer>
  );
}

/**
 * Applet for visually demonstrating substitution of a variable in an expression.
 */
export function VariableBoxApplet() {
  const [inputValue, setInputValue] = useState("4");
  const [isSubstituted, setIsSubstituted] = useState(false);
  const [result, setResult] = useState<number | string>(() =>
    2 * Number("4") + 5
  );

  const expression = "2x + 5";
  const fn = (x: number) => 2 * x + 5;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsSubstituted(false);
    
    // Live calculation for preview
    const num = Number(e.target.value);
    if (!isNaN(num) && e.target.value !== '') {
        setResult(fn(num));
    } else if (e.target.value === '') {
        setResult('?');
    } else {
        setResult("Invalid");
    }
  };

  const handleSubstitute = () => {
    const num = Number(inputValue);
    if (isNaN(num) || inputValue === '') {
      setResult("Invalid");
      setIsSubstituted(false);
      return;
    }
    
    setResult(fn(num));
    setIsSubstituted(true);
  };

  const handleReset = () => {
    setInputValue("4");
    setIsSubstituted(false);
    setResult(fn(4));
  }

  const substitutedExpression = `2(${inputValue}) + 5`;
  const finalResult = String(result);

  return (
    <AppletContainer title="Variable Box Visualizer">
      <ContentP>
        Watch the variable <M>x</M> be replaced (substituted) by a number in the expression <M>{expression}</M>.
      </ContentP>
      
      <div className="flex flex-col items-center justify-center my-6 p-6 rounded-xl border border-neutral-700 bg-neutral-900/50">
        
        /* Expression Row */
        <div className="flex items-center space-x-2 text-3xl font-bold">
          <span className="text-neutral-100">2</span>
          
          /* Variable Box / Substituted Value */
          <div className="w-16 h-16 relative flex items-center justify-center transition-all duration-700 ease-out">
            <div className={`absolute inset-0 rounded-lg border-2 flex items-center justify-center transition-all duration-500 ease-out ${
                isSubstituted ? 'bg-cyan-600/30 border-cyan-500 scale-100 rotate-0' : 'bg-amber-600/30 border-amber-500 scale-105 rotate-3'
            }`}>
                 {isSubstituted ? (
                     <M>{inputValue}</M>
                 ) : (
                    <VariableIcon className="w-8 h-8 text-amber-300" />
                 )}
            </div>
          </div>
          
          <span className="text-neutral-100">+ 5</span>
          <span className="text-neutral-500"><M>=</M></span>
          <span className="text-cyan-300">
            <M>{isSubstituted ? finalResult : '?'}</M>
          </span>
        </div>
        
        /* Input/Control Row */
        <div className="mt-6 flex flex-col items-center gap-3 w-full max-w-sm">
          <div className="flex items-center gap-2 w-full">
            <label htmlFor="box-input" className="shrink-0 font-mono text-lg text-neutral-300">
              Set <M>x =</M>
            </label>
            <input
              id="box-input"
              type="number"
              value={inputValue}
              onChange={handleInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubstitute();
                }
              }}
              className="flex-1 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-neutral-100 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              placeholder="e.g., 5"
            />
          </div>
          <div className="flex space-x-3 w-full">
            <button
              onClick={handleSubstitute}
              disabled={inputValue === '' || isNaN(Number(inputValue)) || isSubstituted}
              className="flex-1 flex items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Replace size={16} />
              Substitute
            </button>
            <button
              onClick={handleReset}
              className="flex-none rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 font-semibold text-neutral-300 transition-colors hover:bg-neutral-700"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      
      /* Step-by-Step Visualization */
      {isSubstituted && (
        <div className="mt-4 p-4 border border-green-800/40 bg-green-900/20 rounded-lg">
          <p className="font-semibold text-green-300 mb-2">Step-by-Step:</p>
          <ol className="list-decimal pl-5 text-neutral-300 space-y-1">
            <li>Replace <M>x</M> with <M>{inputValue}</M>: <M>{substitutedExpression}</M></li>
            <li>Calculate multiplication: <M>{`${2 * Number(inputValue)} + 5`}</M></li>
            <li>Calculate addition: <M>{finalResult}</M></li>
          </ol>
        </div>
      )}
    </AppletContainer>
  );
}

/**
 * A simple multiple-choice quiz for the variables page.
 */
const quizQuestions = [
  {
    question: "In the expression 7y + 4, what is the variable?",
    options: ["7", "y", "4", "+"],
    correctAnswer: "y",
  },
  {
    question: "What is the value of 3x - 1 if you substitute x = 5?",
    options: ["14", "7", "15", "4"],
    correctAnswer: "14",
  },
  {
    question:
      "Which of these is an 'equation', not just an 'expression'?",
    options: ["5x", "5x - 10", "5x = 10", "10 - 5"],
    correctAnswer: "5x = 10",
  },
];

export function VariableQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const question = quizQuestions[currentQuestionIndex];

  const handleSelect = (option: string) => {
    if (isCorrect) return; // Don't allow changing answer after correct
    setSelectedAnswer(option);
  };

  const checkAnswer = () => {
    if (selectedAnswer === question.correctAnswer) {
      setFeedback("Correct!");
      setIsCorrect(true);
    } else {
      setFeedback("Not quite. Try again!");
      setIsCorrect(false);
    }
  };

  const nextQuestion = () => {
    setFeedback("");
    setSelectedAnswer(null);
    setIsCorrect(false);
    setCurrentQuestionIndex(
      (prev) => (prev + 1) % quizQuestions.length
    );
  };

  return (
    <AppletContainer title="Quick Quiz">
      <ContentP>{question.question}</ContentP>
      <div className="my-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`rounded-md border p-3 text-left font-medium transition-all
              ${
                selectedAnswer === option
                  ? "border-cyan-500 bg-cyan-900/40 text-cyan-300"
                  : "border-neutral-700 bg-neutral-900/30 hover:bg-neutral-800"
              }
              ${
                isCorrect && selectedAnswer === option
                  ? "!border-green-500 !bg-green-900/40 !text-green-300"
                  : ""
              }
              ${
                !isCorrect &&
                feedback &&
                selectedAnswer === option
                  ? "!border-red-500 !bg-red-900/40 !text-red-300"
                  : ""
              }
            `}
          >
            <M>{option}</M>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={checkAnswer}
          disabled={!selectedAnswer || isCorrect}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check size={16} />
          Check Answer
        </button>
        <button
          onClick={nextQuestion}
          className="flex-1 rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 font-semibold text-neutral-300 transition-colors hover:bg-neutral-700 sm:flex-none"
        >
          Next Question
        </button>
      </div>
      {feedback && (
        <p
          className={`mt-3 rounded-md p-3 text-center text-sm font-medium ${
            isCorrect
              ? "bg-green-900/50 text-green-300"
              : "bg-red-900/50 text-red-300"
          }`}
        >
          {feedback}
        </p>
      )}
    </AppletContainer>
  );
}

// --------------------------------------------------------
// NEON VOCAB EVOLUTION SHORT (Square, C4 style)
// --------------------------------------------------------

type DiagramRole =
  | "variable"
  | "coefficient"
  | "exponent"
  | "operator"
  | "constant"
  | "equals"
  | "rhs";

type DiagramToken = {
  math: string;
  role: DiagramRole;
  order: number; // when this token becomes eligible to appear
};

type EvolutionStep = {
  id: number;
  term: string;
  accent: "amber" | "orange" | "cyan" | "green" | "indigo";
  definition: string;
  maxOrderRevealed: number;
  focusRoles: DiagramRole[];
};

// Full expression structure (always in this order visually)
const BASE_TOKENS: DiagramToken[] = [
  { math: "5", role: "coefficient", order: 2 },
  { math: "x", role: "variable", order: 1 },
  { math: "^{2}", role: "exponent", order: 3 },
  { math: "+", role: "operator", order: 4 },
  { math: "10", role: "constant", order: 4 },
  { math: "=", role: "equals", order: 5 },
  { math: "35", role: "rhs", order: 5 },
];

// The evolving vocab timeline
const VARIABLE_TO_EQUATION_STEPS: EvolutionStep[] = [
  {
    id: 1,
    term: "VARIABLE",
    accent: "amber",
    definition: "A symbol that can stand for different numbers.",
    maxOrderRevealed: 1, // only x
    focusRoles: ["variable"],
  },
  {
    id: 2,
    term: "COEFFICIENT",
    accent: "orange",
    definition: "The number multiplied by the variable, forming a term.",
    maxOrderRevealed: 2, // 5 and x
    focusRoles: ["coefficient", "variable"],
  },
  {
    id: 3,
    term: "EXPONENT",
    accent: "cyan",
    definition: "Shows repeated multiplication of the base term.",
    maxOrderRevealed: 3, // 5x^2
    focusRoles: ["exponent", "variable", "coefficient"],
  },
  {
    id: 4,
    term: "EXPRESSION",
    accent: "green",
    definition:
      "A mathematical phrase made from terms, numbers, and operations.",
    maxOrderRevealed: 4, // 5x^2 + 10
    focusRoles: ["operator", "constant"],
  },
  {
    id: 5,
    term: "EQUATION",
    accent: "indigo",
    definition:
      "Two expressions set equal with an equals sign – something we can solve.",
    maxOrderRevealed: 5, // 5x^2 + 10 = 35
    focusRoles: ["equals", "rhs"],
  },
];

// Accent utilities – tweak to match your global theme if you’d like
function getAccentRing(step: EvolutionStep) {
  switch (step.accent) {
    case "amber":
      return "ring-amber-400/60 shadow-[0_0_35px_rgba(251,191,36,0.7)]";
    case "orange":
      return "ring-orange-400/60 shadow-[0_0_35px_rgba(249,115,22,0.7)]";
    case "cyan":
      return "ring-cyan-400/60 shadow-[0_0_35px_rgba(34,211,238,0.7)]";
    case "green":
      return "ring-emerald-400/60 shadow-[0_0_35px_rgba(52,211,153,0.7)]";
    case "indigo":
      return "ring-indigo-400/60 shadow-[0_0_35px_rgba(129,140,248,0.7)]";
    default:
      return "ring-cyan-400/40";
  }
}

function getRoleBaseColor(role: DiagramRole) {
  if (role === "variable") return "text-amber-300";
  if (role === "coefficient") return "text-orange-300";
  if (role === "exponent") return "text-cyan-300";
  if (role === "constant") return "text-emerald-300";
  if (role === "operator") return "text-neutral-300";
  if (role === "equals") return "text-indigo-300";
  if (role === "rhs") return "text-indigo-200";
  return "text-neutral-300";
}

// Expression row with “neon typing” reveal
function NeonExpressionRow({ stepIndex }: { stepIndex: number }) {
  const step = VARIABLE_TO_EQUATION_STEPS[stepIndex];

  return (
    <div className="flex items-center justify-center font-mono text-6xl sm:text-7xl font-extrabold min-h-[2.6em]">
      {BASE_TOKENS.map((token, tokenIndex) => {
        const isVisible = token.order <= step.maxOrderRevealed;
        const isFocus = step.focusRoles.includes(token.role);

        const baseColor = getRoleBaseColor(token.role);
        const focusGlow = isFocus ? "text-white text-glow-current" : "";
        const underlineForExpression =
          step.id >= 4 && token.order <= 4 ? "border-b-2 border-emerald-400/60" : "";
        const underlineForEquation =
          step.id === 5 ? "border-b-2 border-indigo-400/70" : "";

        const underlineClass =
          step.id === 5 ? underlineForEquation : underlineForExpression;

        // Typing-like stagger: earlier tokens come in first, later ones lag
        const delayMs = 90 * tokenIndex;

        return (
          <span
            key={tokenIndex}
            className={`
              inline-block px-1 sm:px-1.5
              transition-all duration-500 ease-out
              ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90"}
              ${baseColor} ${focusGlow} ${underlineClass}
            `}
            style={{ transitionDelay: `${delayMs}ms` }}
          >
            <M>{token.math}</M>
          </span>
        );
      })}
    </div>
  );
}

// Little persistent “hierarchy tiles” in the bottom of the square
function HierarchyTile({
  label,
  example,
  active,
}: {
  label: string;
  example: string;
  active: boolean;
}) {
  return (
    <div
      className={`
        glass rounded-xl border border-neutral-700/80 px-4 py-3 text-center
        transition-all duration-400
        ${active ? "bg-neutral-800/80 shadow-lg text-glow-current" : "bg-neutral-900/40 opacity-70"}
      `}
    >
      <p className="text-xs font-semibold tracking-[0.2em] text-neutral-300">
        {label}
      </p>
      <p className="mt-1 text-xs text-neutral-400">
        Example:{" "}
        <span className="font-mono text-base text-neutral-100">
          <M>{example}</M>
        </span>
      </p>
    </div>
  );
}

/**
 * Main exported square animation for the Variables → Equation short.
 * This assumes it sits in a themed page (glass, background, etc.).
 * It will always render in a square aspect, scaling with width.
 */
export function VariableVocabSquareShort() {
  const [stepIndex, setStepIndex] = useState(0);
  const step = VARIABLE_TO_EQUATION_STEPS[stepIndex];

  const goNext = () => {
    setStepIndex((prev) =>
      prev === VARIABLE_TO_EQUATION_STEPS.length - 1 ? 0 : prev + 1
    );
  };

  const accentRing = getAccentRing(step);

  return (
    <div className="w-full flex items-center justify-center">
      {/* Square canvas that scales with width/height of container */}
      <div className="aspect-square w-full max-w-[720px] glass relative overflow-hidden border border-neutral-800/70 rounded-3xl bg-neutral-950/70">
        {/* Soft ambient glow, inherits page theme but tinted by accent */}
        <div className="pointer-events-none absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent" />
        <div className="pointer-events-none absolute -inset-32 opacity-30 blur-3xl bg-conic from-cyan-500/20 via-emerald-400/10 via-indigo-400/20 to-cyan-500/20" />

        {/* Content stack */}
        <div className="relative z-10 flex h-full flex-col items-center px-6 py-6 sm:px-8 sm:py-8 gap-4 sm:gap-5">
          {/* Top header term */}
          <div
            className={`
              glass relative rounded-2xl px-5 py-3 text-center
              ring-2 ${accentRing}
              transition-all duration-500
            `}
          >
            <p className="text-[0.65rem] sm:text-xs tracking-[0.25em] text-neutral-300 uppercase mb-1">
              BUILDING ALGEBRA
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-glow-current">
              {step.term}
            </p>
          </div>

          {/* Main expression area */}
          <div className="flex-1 flex items-center justify-center w-full">
            <NeonExpressionRow stepIndex={stepIndex} />
          </div>

          {/* Definition box */}
          <div
            className={`
              glass w-full rounded-2xl px-5 py-4 text-center text-sm sm:text-base
              border border-neutral-700/80
              transition-all duration-500
            `}
          >
            <p className="text-neutral-300">{step.definition}</p>
          </div>

          {/* Persistent hierarchy row */}
          <div className="grid grid-cols-3 gap-2 w-full text-[0.7rem] sm:text-xs">
            <HierarchyTile
              label="TERM"
              example="5x^{2}, 10"
              active={step.id === 2 || step.id === 3}
            />
            <HierarchyTile
              label="EXPRESSION"
              example="5x^{2} + 10"
              active={step.id === 4}
            />
            <HierarchyTile
              label="EQUATION"
              example="5x^{2} + 10 = 35"
              active={step.id === 5}
            />
          </div>

          {/* Progress + Next button */}
          <div className="w-full flex flex-col items-center gap-2 mt-1">
            <div className="flex gap-1.5">
              {VARIABLE_TO_EQUATION_STEPS.map((s, i) => (
                <div
                  key={s.id}
                  className={`
                    h-1.5 w-7 rounded-full transition-all duration-300
                    ${i === stepIndex ? "bg-cyan-400" : "bg-neutral-700"}
                  `}
                />
              ))}
            </div>
            <button
              onClick={goNext}
              className="
                mt-1 inline-flex w-full items-center justify-center gap-2
                rounded-xl bg-cyan-600 px-4 py-3 text-sm sm:text-base
                font-semibold text-white hover:bg-cyan-500
                transition-colors
              "
            >
              {stepIndex === VARIABLE_TO_EQUATION_STEPS.length - 1
                ? "Start Over (VARIABLE)"
                : `Next Concept: ${VARIABLE_TO_EQUATION_STEPS[stepIndex + 1].term}`}
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


