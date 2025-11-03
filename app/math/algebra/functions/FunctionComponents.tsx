// app/math/algebra/functions/FunctionComponents.tsx
"use client";
import React, { useState } from "react";
import {
  Minus,
  Plus,
  RefreshCcw,
  ArrowRight,
  Check,
  X,
  Database,
  Waypoints,
  ScanLine,
  Factory,
  HelpCircle,
  Network,
  CheckSquare
} from "@/components/icons";

/* -------------------------------------- */
/* 1. FUNCTION MACHINE (Section 1 & 2)    */
/* -------------------------------------- */
export function FunctionMachineWidget() {
  const [input, setInput] = useState<number | string>(3);
  const [output, setOutput] = useState<number | null>(7);
  const [rule, setRule] = useState("2x + 1");
  const [isProcessing, setIsProcessing] = useState(false);

  const processInput = () => {
    setIsProcessing(true);
    setOutput(null);
    const x = Number(input);
    let result: number;
    // This is a simple parser. A real implementation would use a math library.
    if (rule === "2x + 1") {
      result = 2 * x + 1;
    } else if (rule === "x²") {
      result = x * x;
    } else {
      result = x + 3;
    }

    setTimeout(() => {
      setOutput(result);
      setIsProcessing(false);
    }, 1000); // Simulate processing time
  };

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-4">
        Interactive: The Function Machine
      </h4>
      <div className="flex justify-center items-center gap-4">
        {/* Input */}
        <div className="flex flex-col items-center">
          <label className="text-sm text-neutral-400">INPUT (x)</label>
          <input
            type="number"
            value={input}
            onChange={(e) => {
              setInput(e.target.value === "" ? "" : Number(e.target.value));
              setOutput(null);
            }}
            className="w-20 rounded-md border border-neutral-700 bg-neutral-900
                       p-2 text-center font-mono text-xl text-white
                       focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <ArrowRight className="h-8 w-8 text-neutral-500 mt-4" />

        {/* Machine */}
        <div
          className={`relative w-32 h-20 rounded-lg bg-neutral-900 border border-neutral-700
                      flex items-center justify-center font-mono text-pink-400 text-lg
                      ${
                        isProcessing
                          ? "animate-pulse border-pink-500"
                          : ""
                      }`}
        >
          {isProcessing ? (
            <div className="w-4 h-4 bg-pink-500 rounded-full animate-ping" />
          ) : (
            `f(x) = ${rule}`
          )}
        </div>

        <ArrowRight className="h-8 w-8 text-neutral-500 mt-4" />

        {/* Output */}
        <div className="flex flex-col items-center">
          <label className="text-sm text-neutral-400">OUTPUT (f(x))</label>
          <div
            className="w-20 h-12 rounded-md bg-neutral-900 p-2 text-center 
                       font-mono text-xl text-green-300 font-bold
                       flex items-center justify-center"
          >
            {output}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={processInput}
          disabled={isProcessing}
          className="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white
                     transition hover:bg-blue-500
                     disabled:cursor-not-allowed disabled:bg-neutral-600"
        >
          Run Machine
        </button>
        <select
          value={rule}
          onChange={(e) => {
            setRule(e.target.value);
            setOutput(null);
          }}
          className="rounded-md border border-neutral-700 bg-neutral-800 p-2
                     text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
        >
          <option>2x + 1</option>
          <option>x²</option>
          <option>x + 3</option>
        </select>
      </div>
    </div>
  );
}

/* -------------------------------------- */
/* 5. MAPPING DIAGRAM (Section 5)         */
/* -------------------------------------- */
export function MappingDiagram() {
  const [isFunction, setIsFunction] = useState(true);

  const goodMap = {
    inputs: [1, 2, 3, 4],
    outputs: ["A", "B", "C"],
    links: [
      { from: 1, to: "A" },
      { from: 2, to: "B" },
      { from: 3, to: "B" }, // This is OK
      { from: 4, to: "C" },
    ],
  };
  const badMap = {
    inputs: [1, 2, 3],
    outputs: ["A", "B", "C", "D"],
    links: [
      { from: 1, to: "A" },
      { from: 2, to: "B" },
      { from: 2, to: "C" }, // NOT OK
      { from: 3, to: "D" },
    ],
  };

  const map = isFunction ? goodMap : badMap;

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-4">
        Interactive: Mapping Diagram
      </h4>
      {/* Toggle */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsFunction(!isFunction)}
          className="relative flex items-center rounded-full bg-neutral-900 border border-neutral-700 p-1"
        >
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              isFunction ? "text-green-300" : "text-neutral-400"
            }`}
          >
            ✅ Is a Function
          </span>
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              !isFunction ? "text-red-300" : "text-neutral-400"
            }`}
          >
            ❌ Not a Function
          </span>
          <span
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-neutral-700/50
            transition-transform duration-300 ${
              !isFunction ? "translate-x-full" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      {/* Visualizer */}
      <div className="flex justify-around items-center h-48 relative">
        {/* SVG lines would go here */}
        {/* Inputs (Domain) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-neutral-400">INPUT (Domain)</label>
          {map.inputs.map((i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-lg bg-blue-900 border border-blue-600
                         flex items-center justify-center font-mono text-white text-lg"
            >
              {i}
            </div>
          ))}
        </div>
        {/* Outputs (Range) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-neutral-400">OUTPUT (Range)</label>
          {map.outputs.map((o) => (
            <div
              key={o}
              className="w-12 h-12 rounded-lg bg-pink-900 border border-pink-600
                         flex items-center justify-center font-mono text-white text-lg"
            >
              {o}
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-sm text-neutral-400 mt-2">
        {isFunction
          ? "Each input has exactly one output. (It's okay for two inputs to share an output!)"
          : "The input '2' has two different outputs ('B' and 'C'), so this is NOT a function."}
      </p>
    </div>
  );
}

/* -------------------------------------- */
/* 6. VERTICAL LINE TEST (Section 6)      */
/* -------------------------------------- */
export function VerticalLineTest() {
  const [isFunction, setIsFunction] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  const path = isFunction
    ? "M 0 60 Q 50 10, 100 60 T 200 60" // A parabola (function)
    : "M 100 0 A 60 60 0 1 0 100 120 A 60 60 0 1 0 100 0"; // A circle (not a function)

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-4">
        Interactive: The Vertical Line Test
      </h4>
      {/* Graph Area */}
      <div className="relative w-full max-w-sm h-36 mx-auto bg-neutral-900/50 rounded-lg overflow-hidden">
        <svg
          viewBox="0 0 200 120"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d={path}
            stroke={isFunction ? "#3b82f6" : "#ec4899"}
            strokeWidth="3"
            fill="none"
          />
        </svg>
        {/* The Scanning Line */}
        {isScanning && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-yellow-300 shadow-lg"
            style={{
              animation: "scan 3s linear infinite",
            }}
          />
        )}
      </div>
      {/* Controls */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setIsFunction(!isFunction)}
          className="rounded-md bg-neutral-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Toggle Graph
        </button>
        <button
          onClick={() => setIsScanning(!isScanning)}
          className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white"
        >
          {isScanning ? "Stop Scan" : "Start Scan"}
        </button>
      </div>
      <p className="text-center text-sm text-neutral-400 mt-4">
        If the scanning line hits the graph more than once, it's{" "}
        <strong>not a function</strong>.
      </p>
    </div>
  );
}

/* -------------------------------------- */
/* 12. FUNCTION FACTORY QUIZ (Section 12) */
/* -------------------------------------- */
const quizQuestions = [
  {
    q: "f(x) = x + 5. What is f(3)?",
    options: ["3", "5", "8"],
    a: 2,
  },
  {
    q: "f(x) = 3x - 1. What is f(2)?",
    options: ["5", "6", "2"],
    a: 0,
  },
  {
    q: "f(x) = x². What is f(4)?",
    options: ["8", "16", "4"],
    a: 1,
  },
];

export function FunctionFactoryQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [wasWrong, setWasWrong] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    if (selected === quizQuestions[currentQ].a) {
      setScore(score + 1);
      setWasWrong(false);
      setSelected(null);
      if (currentQ < quizQuestions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setIsFinished(true);
      }
    } else {
      setWasWrong(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setIsFinished(false);
    setWasWrong(false);
  };

  if (isFinished) {
    return (
      <div className="glass my-6 rounded-lg border-pink-500/50 border-2 bg-pink-900/20 p-6 shadow-xl text-center">
        <h4 className="text-2xl font-bold text-pink-300 mb-2">
          Production Run Complete!
        </h4>
        <p className="text-xl text-neutral-200">
          You scored {score} out of {quizQuestions.length}
        </p>
        <button
          onClick={handleRestart}
          className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          New Shift
        </button>
      </div>
    );
  }

  const question = quizQuestions[currentQ];

  return (
    <div className="glass my-6 rounded-lg border-pink-500/50 border-2 bg-pink-900/20 p-6 shadow-xl">
      <h4 className="text-lg font-semibold text-neutral-200 mb-4 flex justify-between">
        <span>
          <Factory className="inline h-5 w-5 mr-2 text-pink-400" />
          Function Factory: Order {currentQ + 1}
        </span>
        <span className="text-neutral-400">
          {score} / {quizQuestions.length}
        </span>
      </h4>
      <p className="text-3xl text-center font-mono text-white mb-6">
        {question.q}
      </p>
      <div className="space-y-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => {
              setSelected(i);
              setWasWrong(false);
            }}
            className={`block w-full text-left p-4 rounded-lg border
                      transition-all font-mono text-lg
                      ${
                        selected === i
                          ? wasWrong
                            ? "bg-red-900/50 border-red-400 ring-2 ring-red-400 animate-shake"
                            : "bg-green-900/50 border-green-400 ring-2 ring-green-400"
                          : "bg-neutral-900/50 border-neutral-700 hover:bg-neutral-800/50"
                      }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={selected === null}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg 
                   transition-colors disabled:bg-neutral-600 disabled:cursor-not-allowed"
      >
        {wasWrong ? "Try Again" : "Build It!"}
      </button>
    </div>
  );
}


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
  const [expanded, setExpanded] = useState<string | null>(null);

  const types = [
    {
      icon: Network,
      name: "Linear",
      example: "2x + 1 = 7",
      def: "Has one variable (like x) raised to the power of 1. Has one solution.",
      color: "text-cyan-300",
    },
    {
      icon: CheckSquare,
      name: "Identity",
      example: "x + 1 = x + 1",
      def: "An equation that is *always* true, no matter what value x is.",
      color: "text-green-300",
    },
    {
      icon: X,
      name: "No-Solution",
      example: "x + 2 = x + 3",
      def: "An equation that is *never* true. There is no value for x that can make it balance.",
      color: "text-red-300",
    },
  ];

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-4">
        Types of Equations
      </h4>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        {types.map((type) => (
          <div
            key={type.name}
            className={`rounded-lg border border-neutral-700 bg-neutral-900/40 p-4 w-full
                      transition-all duration-300 ${
                        expanded === type.name
                          ? "ring-2 ring-yellow-400"
                          : "opacity-70 hover:opacity-100"
                      }`}
            onClick={() =>
              setExpanded(expanded === type.name ? null : type.name)
            }
          >
            <div className="flex items-center gap-3">
              <type.icon className={`h-6 w-6 ${type.color}`} />
              <div>
                <h5 className={`text-lg font-semibold ${type.color}`}>
                  {type.name}
                </h5>
              </div>
            </div>
            <code className="block my-3 text-center text-lg text-neutral-200">
              {type.example}
            </code>
            {expanded === type.name && (
              <p className="text-sm text-neutral-300 mt-2">{type.def}</p>
            )}
          </div>
        ))}
      </div>
      <p className="col-span-full text-center text-sm text-neutral-400 mt-4">
        Click a type to see its definition.
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