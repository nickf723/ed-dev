// app/math/algebra/equations/EquationComponents.tsx
"use client";

import React, { useState } from "react";
import {
  Plus,
  Minus,
  RefreshCcw,
  Check,
  X,
  Scale,
  FileText,
  HelpCircle,
  CheckSquare,
  GanttChartSquare,
  Network,
  ArrowRight,
} from "lucide-react";

/* -------------------------------------- */
/* 1. BALANCE APPLET (Moved here)         */
/* -------------------------------------- */
export function BalanceApplet() {
  const [leftBlocks, setLeftBlocks] = useState(3);
  const [rightBlocks, setRightBlocks] = useState(5);
  const problem = { x: 1, left: 3, right: 5 }; // x + 3 = 5
  const solution = problem.right - problem.left; // 2
  const isSolved = leftBlocks === 0 && rightBlocks === solution;

  const getTilt = () => {
    const leftWeight = solution + leftBlocks;
    const rightWeight = rightBlocks;
    if (leftWeight === rightWeight) return "rotate-0";
    if (leftWeight > rightWeight) return "-rotate-3";
    return "rotate-3";
  };

  const addBlock = () => {
    setLeftBlocks((n) => n + 1);
    setRightBlocks((n) => n + 1);
  };

  const removeBlock = () => {
    if (leftBlocks > 0) {
      setLeftBlocks((n) => n - 1);
      if (rightBlocks > 0) {
        setRightBlocks((n) => n - 1);
      }
    }
  };

  const reset = () => {
    setLeftBlocks(problem.left);
    setRightBlocks(problem.right);
  };

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <div className="text-center">
        <h4 className="text-xl font-semibold text-neutral-200">
          The Balance Scale
        </h4>
        <p className="font-mono text-2xl text-yellow-300">
          x + {problem.left} = {problem.right}
        </p>
      </div>
      <div className="my-8 flex min-h-32 flex-col items-center">
        <div
          className={`flex w-full max-w-lg justify-between border-b-4 border-neutral-500 transition-transform duration-300 ${getTilt()}`}
        >
          {/* Left Pan */}
          <div className="flex -translate-y-4 flex-col items-center border-t-4 border-neutral-500 px-4 pt-4">
            <div className="flex h-24 flex-wrap items-end gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-indigo-600 font-mono text-2xl text-white">
                x
              </div>
              {Array.from({ length: leftBlocks }).map((_, i) => (
                <div key={i} className="h-6 w-6 rounded bg-yellow-500" />
              ))}
            </div>
            <span className="mt-2 font-mono text-xl text-neutral-200">
              x + {leftBlocks}
            </span>
          </div>
          {/* Right Pan */}
          <div className="flex -translate-y-4 flex-col items-center border-t-4 border-neutral-500 px-4 pt-4">
            <div className="flex h-24 flex-wrap items-end gap-2">
              {Array.from({ length: rightBlocks }).map((_, i) => (
                <div key={i} className="h-6 w-6 rounded bg-yellow-500" />
              ))}
            </div>
            <span className="mt-2 font-mono text-xl text-neutral-200">
              {rightBlocks}
            </span>
          </div>
        </div>
        <div className="h-12 w-4 border-x-4 border-b-4 border-neutral-500" />
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 border-t border-neutral-700 pt-6">
        <button
          onClick={removeBlock}
          disabled={leftBlocks === 0}
          className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 font-semibold text-white 
                     transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-neutral-600"
        >
          <Minus size={16} /> Remove 1
        </button>
        <button
          onClick={addBlock}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white 
                     transition hover:bg-blue-500"
        >
          <Plus size={16} /> Add 1
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-md bg-neutral-600 px-3 py-2 text-white 
                     transition hover:bg-neutral-500"
        >
          <RefreshCcw size={16} />
        </button>
      </div>
      <p className="mt-4 text-center text-sm text-neutral-400">
        Notice how you must add or remove from
        <strong> both sides</strong> to keep the scale balanced.
      </p>

      {isSolved && (
        <div className="mt-6 text-center">
          <p className="text-2xl font-bold text-green-300">
            Solved! x = {solution}
          </p>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------- */
/* 2. COMPONENT FLIP CARDS (Section 2)    */
/* -------------------------------------- */
function FlipCard({
  term,
  example,
  definition,
}: {
  term: string;
  example: string;
  definition: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="[perspective:1000px] h-36"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative h-full w-full cursor-pointer rounded-lg shadow-xl transition-transform duration-500 [transform-style:preserve-3d]
        ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
      >
        {/* Front */}
        <div className="glass absolute inset-0 [backface-visibility:hidden]">
          <div className="flex h-full flex-col items-center justify-center p-4 text-center">
            <div className="text-xl font-semibold text-yellow-400">
              {term}
            </div>
            <div className="font-mono text-lg text-neutral-300">{example}</div>
          </div>
        </div>
        {/* Back */}
        <div className="glass absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex h-full items-center justify-center p-4 text-center">
            <p className="text-sm text-neutral-300">{definition}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EquationComponentFlipCards() {
  const components = [
    {
      name: "Left Side",
      example: "3x + 2",
      def: "The expression on the left of the equals sign.",
    },
    {
      name: "Right Side",
      example: "11",
      def: "The expression on the right of the equals sign.",
    },
    {
      name: "Equality Sign",
      example: "=",
      def: "The 'fulcrum' stating both sides are balanced.",
    },
    {
      name: "Solution",
      example: "x = 3",
      def: "The value of the variable that makes the equation true.",
    },
  ];

  return (
    <div className="my-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {components.map((c) => (
        <FlipCard
          key={c.name}
          term={c.name}
          example={c.example}
          definition={c.def}
        />
      ))}
      <p className="col-span-full text-center text-sm text-neutral-400 -mt-2">
        Click a card to flip it for the definition.
      </p>
    </div>
  );
}

/* -------------------------------------- */
/* 4. ONE-STEP SOLVER (Section 4)         */
/* -------------------------------------- */
const oneStepProblems = [
  { id: 1, eq: "x - 3 = 7", op: "+ 3", solution: "x = 10" },
  { id: 2, eq: "2x = 10", op: "÷ 2", solution: "x = 5" },
  { id: 3, eq: "x / 5 = 3", op: "× 5", solution: "x = 15" },
  { id: 4, eq: "x + 4 = 9", op: "- 4", solution: "x = 5" },
];

export function OneStepSolverWidget() {
  const [index, setIndex] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const problem = oneStepProblems[index];
  const ops = ["+ 3", "- 4", "× 5", "÷ 2"]; // Distractors

  const handleOpClick = (op: string) => {
    if (op === problem.op) {
      setIsSolved(true);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 800);
    }
  };

  const nextProblem = () => {
    setIsSolved(false);
    setFeedback(null);
    setIndex((i) => (i + 1) % oneStepProblems.length);
  };

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-2">
        Try It Yourself: One-Step Solver
      </h4>
      <p className="text-center text-sm text-neutral-400 mb-4">
        Click the correct operation to isolate <code>x</code>.
      </p>
      <div
        className={`text-center font-mono text-3xl text-white mb-6 p-3 rounded-lg 
                    ${isSolved ? "bg-green-900/50" : "bg-neutral-900/50"} 
                    ${feedback === "wrong" ? "animate-shake bg-red-900/50" : ""}`}
      >
        {isSolved ? problem.solution : problem.eq}
      </div>

      {!isSolved ? (
        <div className="flex flex-wrap justify-center gap-3">
          {ops.map((op) => (
            <button
              key={op}
              onClick={() => handleOpClick(op)}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-mono"
            >
              {op}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg font-semibold text-green-300 mb-4">
            Correct!
          </p>
          <button
            onClick={nextProblem}
            className="rounded-md bg-yellow-600 px-6 py-2 font-semibold text-white
                       transition hover:bg-yellow-500"
          >
            Next Problem
          </button>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------- */
/* 6. CHECK SOLUTION (Section 6)          */
/* -------------------------------------- */
export function CheckSolutionWidget() {
  const [val, setVal] = useState("");
  const [status, setStatus] = useState<"pending" | "correct" | "wrong">(
    "pending",
  );
  const [result, setResult] = useState(0);

  const checkSolution = () => {
    const numVal = Number(val || 0);
    const res = 2 * numVal + 3;
    setResult(res);
    if (res === 9) {
      setStatus("correct");
    } else {
      setStatus("wrong");
    }
  };

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-4">
        Interactive: Check Your Solution
      </h4>
      <p className="text-center font-mono text-3xl text-white">2x + 3 = 9</p>
      <div className="flex justify-center items-center gap-2 my-4">
        <label htmlFor="xValCheck" className="font-mono text-xl text-neutral-300">
          Substitute: x =
        </label>
        <input
          type="number"
          id="xValCheck"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            setStatus("pending");
          }}
          className="w-20 rounded-md border border-neutral-700 bg-neutral-900
                     p-2 text-center font-mono text-xl text-yellow-300
                     focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={checkSolution}
          className="rounded-md bg-yellow-600 px-6 py-2 font-semibold text-white
                     transition hover:bg-yellow-500"
        >
          Check
        </button>
      </div>
      {status === "correct" && (
        <div className="mt-4 text-center font-mono text-2xl text-green-300">
          2(3) + 3 = 9 <br /> 6 + 3 = 9 <br /> 9 = 9{" "}
          <Check className="inline" />
        </div>
      )}
      {status === "wrong" && val !== "" && (
        <div className="mt-4 text-center font-mono text-2xl text-red-300">
          2({val}) + 3 = 9 <br /> {result} = 9 <X className="inline" />
        </div>
      )}
    </div>
  );
}

/* -------------------------------------- */
/* 7. WORD PROBLEMS (Section 7)           */
/* -------------------------------------- */
export function WordProblemConverter() {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const solution = "3x+2=11";

  const checkAnswer = () => {
    if (answer.replace(/\s/g, "") === solution) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      // You could add a 'wrong' shake animation here
    }
  };

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-4">
        Interactive: Story Mode
      </h4>
      <p className="text-center text-lg text-neutral-300 italic mb-4">
        "Three candies and two dollars equals eleven dollars. Let 'x' be the
        cost of one candy."
      </p>
      <p className="text-center text-sm text-neutral-400 mb-4">
        Write the equation:
      </p>
      <div className="flex justify-center gap-2">
        <input
          type="text"
          placeholder="e.g., 5x + 1 = 10"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className={`w-full max-w-sm rounded-md border bg-neutral-900
                     p-3 text-center font-mono text-white
                     focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400
                     ${
                       isCorrect
                         ? "border-green-500"
                         : "border-neutral-700"
                     }`}
        />
        <button
          onClick={checkAnswer}
          className="rounded-md bg-yellow-600 px-4 py-2 font-semibold text-white
                     transition hover:bg-yellow-500"
        >
          Check
        </button>
      </div>
      {isCorrect && (
        <p className="text-center text-lg text-green-300 mt-3">
          Correct! <Check className="inline" />
        </p>
      )}
    </div>
  );
}

/* -------------------------------------- */
/* 8. EQUATION TYPES (Section 8)          */
/* -------------------------------------- */
export function EquationTypesExplainer() {
  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-4">
        Types of Equations (Placeholder)
      </h4>
      <p className="text-center text-sm text-neutral-400">
        (Placeholder: Expandable cards for Linear, Quadratic, Identity, and
        No-Solution.)
      </p>
    </div>
  );
}

/* -------------------------------------- */
/* 11. QUICK QUIZ (Section 11)            */
/* -------------------------------------- */
export function BalanceQuiz() {
  return (
    <div className="glass my-6 rounded-lg border-yellow-500/50 border-2 bg-yellow-900/20 p-6 shadow-xl text-center">
      <h4 className="text-2xl font-bold text-yellow-300 mb-2">
        ⚖️ Quick Quiz: Balance the Scales!
      </h4>
      <p className="text-neutral-300 mb-4">
        (Placeholder: A timer-based game to solve equations by dragging
        weights.)
      </p>
      <button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
        Start Challenge
      </button>
    </div>
  );
}