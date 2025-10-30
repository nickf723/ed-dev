"use client";
import React, { useState } from "react";
import {
  ChevronDown, ChevronUp, Eye, EyeOff, Lightbulb, Plus, Minus, RefreshCcw
} from "lucide-react";

/* ------------------------- IMAGES / DIAGRAMS ------------------------- */
// (This component is unchanged)
export function LessonImage({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  return (
    <figure className="my-6">
      <img
        src={src}
        alt={caption || "Diagram"}
        className="mx-auto rounded-lg border border-neutral-800 shadow-lg"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* --------------------------- VIDEO EMBED ----------------------------- */
// (This component is unchanged)
export function LessonVideo({ url }: { url: string }) {
  return (
    <div className="my-6 aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 shadow-md">
      <iframe
        src={url}
        title="Embedded video"
        className="h-full w-full"
        allowFullScreen
      />
    </div>
  );
}

/* --------------------------- CODED APPLET ---------------------------- */
// This is the new, self-contained applet you requested.
export function EvaluateApplet({
  expression,
  fn,
}: {
  expression: string;
  fn: (x: number) => number;
}) {
  const [value, setValue] = useState(0);
  const result = fn(value);

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="font-mono text-lg text-neutral-200 md:text-xl">
          Evaluate: <code className="text-cyan-300">{expression}</code>
        </div>
        <div className="font-mono text-lg md:text-xl">
          When: <code className="text-amber-300">x = {value}</code>
        </div>
      </div>

      <input
        type="range"
        min="-10"
        max="10"
        step="1"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value, 10))}
        className="w-full"
      />

      <div className="mt-6 border-t border-neutral-700 pt-4 text-center">
        <div className="text-sm uppercase tracking-wide text-neutral-400">
          Result
        </div>
        <div className="font-mono text-3xl font-bold text-green-300">
          {result}
        </div>
      </div>
    </div>
  );
}

/* ------------------------ CODED APPLET (Like Terms) ----------------------- */
const termProblems = [
  {
    problem: "5x + 3 + 2x + 7",
    terms: [
      { text: "5x", type: "x" },
      { text: " + 3", type: "const" },
      { text: " + 2x", type: "x" },
      { text: " + 7", type: "const" },
    ],
    solution: "7x + 10",
  },
  {
    problem: "4y - 2 + y + 9",
    terms: [
      { text: "4y", type: "y" },
      { text: " - 2", type: "const" },
      { text: " + y", type: "y" },
      { text: " + 9", type: "const" },
    ],
    solution: "5y + 7",
  },
  {
    problem: "3x + 2y - x + 5y",
    terms: [
      { text: "3x", type: "x" },
      { text: " + 2y", type: "y" },
      { text: " - x", type: "x" },
      { text: " + 5y", type: "y" },
    ],
    solution: "2x + 7y",
  },
];

export function LikeTermsApplet() {
  const [problemIndex, setProblemIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  const { problem, terms, solution } = termProblems[problemIndex];

  const handleTermClick = (type: string) => {
    if (solved) return;
    setSelectedType(type);
  };

  const nextProblem = () => {
    setSolved(false);
    setSelectedType(null);
    setProblemIndex((prev) => (prev + 1) % termProblems.length);
  };

  const getTermStyle = (type: string) => {
    if (solved) {
      if (type === "x") return "bg-cyan-500/30 text-cyan-300";
      if (type === "y") return "bg-fuchsia-500/30 text-fuchsia-300";
      if (type === "const") return "bg-amber-500/30 text-amber-300";
    }
    if (selectedType === type) {
      if (type === "x") return "bg-cyan-500/50 text-cyan-300 ring-2 ring-cyan-400";
      if (type === "y") return "bg-fuchsia-500/50 text-fuchsia-300 ring-2 ring-fuchsia-400";
      if (type === "const") return "bg-amber-500/50 text-amber-300 ring-2 ring-amber-400";
    }
    return "bg-neutral-800/60 hover:bg-neutral-700/60";
  };

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-center text-lg font-semibold text-neutral-200">
        Simplify the Expression:
      </h4>
      <div className="my-4 flex flex-wrap justify-center gap-2 rounded-lg bg-neutral-900 p-4">
        {terms.map((term, i) => (
          <button
            key={i}
            onClick={() => handleTermClick(term.type)}
            disabled={solved}
            className={`cursor-pointer rounded-md px-3 py-1 font-mono text-xl text-neutral-300 transition-all ${getTermStyle(
              term.type,
            )}`}
          >
            {term.text}
          </button>
        ))}
      </div>
      <p className="mb-4 text-center text-sm text-neutral-400">
        Click on the terms to group them.
      </p>

      {solved && (
        <div className="mt-4 text-center">
          <p className="text-neutral-300">Simplified:</p>
          <p className="font-mono text-3xl font-bold text-green-300">
            {solution}
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setSolved(true)}
          disabled={solved}
          className="rounded-md bg-green-600 px-4 py-2 font-semibold text-white transition
                     hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-neutral-600"
        >
          Simplify
        </button>
        <button
          onClick={nextProblem}
          className="rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white transition
                     hover:bg-cyan-500"
        >
          Next Problem
        </button>
      </div>
    </div>
  );
}

/* ------------------------ CODED APPLET (Balance Scale) ----------------------- */
export function BalanceApplet() {
  const [leftBlocks, setLeftBlocks] = useState(3);
  const [rightBlocks, setRightBlocks] = useState(5);
  const problem = { x: 1, left: 3, right: 5 }; // x + 3 = 5
  const solution = problem.right - problem.left; // 2

  const isBalanced = leftBlocks === rightBlocks;
  const isSolved = leftBlocks === 0 && rightBlocks === solution;

  const addBlock = () => {
    setLeftBlocks((n) => n + 1);
    setRightBlocks((n) => n + 1);
  };

  const removeBlock = () => {
    if (leftBlocks > 0) {
      setLeftBlocks((n) => n - 1);
      setRightBlocks((n) => n - 1);
    }
  };

  const reset = () => {
    setLeftBlocks(problem.left);
    setRightBlocks(problem.right);
  };

  const getTilt = () => {
    if (isBalanced) return "rotate-0";
    if (leftBlocks > rightBlocks) return "-rotate-3";
    return "rotate-3";
  };

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <div className="text-center">
        <h4 className="text-xl font-semibold text-neutral-200">The Balance Scale</h4>
        <p className="font-mono text-2xl text-amber-300">
          x + {problem.left} = {problem.right}
        </p>
      </div>

      {/* The Scale Visual */}
      <div className="my-8 flex min-h-32 flex-col items-center">
        {/* Scale Beam */}
        <div
          className={`flex w-full max-w-lg justify-between border-b-4 border-neutral-500 transition-transform duration-300 ${getTilt()}`}
        >
          {/* Left Pan */}
          <div className="flex -translate-y-4 flex-col items-center border-t-4 border-neutral-500 px-4 pt-4">
            <div className="flex h-24 flex-wrap items-end gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-cyan-600 font-mono text-2xl text-white">
                x
              </div>
              {Array.from({ length: leftBlocks }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-6 rounded bg-amber-500"
                />
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
                <div
                  key={i}
                  className="h-6 w-6 rounded bg-amber-500"
                />
              ))}
            </div>
            <span className="mt-2 font-mono text-xl text-neutral-200">
              {rightBlocks}
            </span>
          </div>
        </div>
        {/* Scale Base */}
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
        Notice how you must add or remove from <strong>both sides</strong> to keep
        the scale balanced.
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

/* ------------------------ PRACTICE PROBLEMS -------------------------- */
// This is the new PracticeProblem with a "Show Solution" toggle.
export function PracticeProblem({
  question,
  solution,
}: {
  question: string;
  solution?: string;
}) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="mb-4 rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
      <p className="mb-2 font-medium text-cyan-300">{question}</p>
      {solution && (
        <>
          <button
            onClick={() => setIsShown(!isShown)}
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium
                       text-neutral-400 transition-colors hover:text-cyan-200
                       data-[open=true]:text-cyan-300"
            data-open={isShown}
          >
            {isShown ? (
              <EyeOff size={14} />
            ) : (
              <Eye size={14} />
            )}
            {isShown ? "Hide Solution" : "Show Solution"}
          </button>
          {isShown && (
            <p className="mt-3 rounded-md border border-neutral-700 bg-neutral-900 p-3 text-neutral-300">
              <span className="font-semibold text-cyan-400">Solution:</span>{" "}
              {solution}
            </p>
          )}
        </>
      )}
    </div>
  );
}

/* ------------------------ STEP-BY-STEP SOLUTION -------------------------- */
// This is the new component for multi-step answers.
export function StepByStepSolution({
  title,
  steps,
}: {
  title: string;
  steps: string[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="my-4 rounded-lg border border-neutral-800 bg-neutral-900/40">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-left"
        aria-expanded={isExpanded}
      >
        <span className="flex items-center gap-2 font-medium text-amber-300">
          <Lightbulb size={16} />
          {title}
        </span>
        {isExpanded ? (
          <ChevronUp size={18} className="text-neutral-500" />
        ) : (
          <ChevronDown size={18} className="text-neutral-500" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-neutral-800 p-4 pb-6">
          <ol className="list-decimal space-y-3 pl-6 font-mono text-neutral-300">
            {steps.map((step, index) => (
              <li key={index} className="pl-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

/* --------------------------- RESOURCE LINKS -------------------------- */
// (This component is unchanged)
export function ResourceLink({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-neutral-800 bg-neutral-900/50 
                 px-4 py-3 text-cyan-300 transition hover:bg-neutral-800"
    >
      🔗 {title}
    </a>
  );
}