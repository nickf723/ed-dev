// app/math/algebra/variables/VariableComponents.tsx
"use client";
import React, { useState } from "react";
// 🌀 Using the "detective" theme icons
import { Check, X, RefreshCw, HelpCircle } from "lucide-react";

/* -------------------------------------- */
/* 1. WHAT IS A VARIABLE (Section 1)      */
/* This component is already functional.  */
/* -------------------------------------- */
export function WhatIsVariableExplainer() {
  const [value, setValue] = useState(2);
  const examples = [2, 10, -4];

  return (
      <div className="glass detective-card my-6 p-6 text-center">
        <h4 className="mb-4 text-lg font-semibold text-neutral-100">
          Interactive: The “x” Treasure Chest
        </h4>
        <p className="mb-4 text-sm text-neutral-300">
          Hover over the buttons to see what ‘x’ can be!
      </p>
      <div className="mb-4 flex justify-center gap-3">
        {examples.map((ex) => (
          <button
            key={ex}
            onMouseEnter={() => setValue(ex)}
            className="detective-chip px-4"
          >
            x = {ex}
          </button>
        ))}
      </div>
      <div className="detective-readout font-mono text-2xl">
        <code className="text-cyan-300">
          2x + 3 ={" "}
          <span className="text-yellow-300 font-bold">
            {2 * value + 3}
          </span>
        </code>
        <p className="text-sm text-neutral-300 mt-3 font-sans">
          The expression <strong>changes</strong> based on the “mystery” value of{" "}
          <code>x</code>.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------- */
/* 3. NAMING VARIABLES (Section 3)        */
/* 🌀 Now with tap-to-reveal logic     */
/* -------------------------------------- */
export function ValidOrNotGame() {
  const items = [
    { name: "x", valid: true, reason: "Common single-letter variable." },
    { name: "7x", valid: false, reason: "Can't start with a number." },
    { name: "total", valid: true, reason: "Descriptive words are great!" },
    { name: "my variable", valid: false, reason: "No spaces allowed." },
    { name: "_count", valid: true, reason: "Underscores are fine." },
  ];
  const [revealed, setRevealed] = useState<number | null>(null);

  return (
    <div className="glass detective-card my-6 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-neutral-100">
          Mini-Activity: Valid or Not?
        </h4>
        <button
          onClick={() => setRevealed(null)}
          className="detective-reset flex items-center gap-1"
        >
          <RefreshCw size={12} />
          Reset
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <button
            key={item.name}
            onClick={() => setRevealed(index)}
            className={`detective-case-button ${
              revealed === index
                ? item.valid
                  ? "is-correct"
                  : "is-incorrect"
                : ""
            }`}
          >
            <code className="font-mono text-xl text-cyan-200">{item.name}</code>
            {revealed === index ? (
              // Show the answer
              <div className="flex items-center gap-2 text-right">
                <span className="text-sm italic text-neutral-200">
                  {item.reason}
                </span>
                {item.valid ? (
                  <Check className="h-5 w-5 flex-shrink-0 text-emerald-300" />
                ) : (
                  <X className="h-5 w-5 flex-shrink-0 text-rose-300" />
                )}
              </div>
            ) : (
              // Show the prompt
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">
                Valid?
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-neutral-300">
        Click an item to check if it’s a valid name.
      </p>
    </div>
  );
}

/* -------------------------------------- */
/* 5. EVALUATE APPLET (Section 5)         */
/* This was moved here and is functional. */
/* -------------------------------------- */
export function EvaluateApplet({
  expression,
  fn,
}: {
  expression: string;
  fn: (x: number) => number;
}) {
  const [val, setVal] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  // Update result in real-time as slider moves
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value, 10);
    setVal(newVal);
      try {
        setResult(fn(newVal));
      } catch {
        setResult(null);
      }
    };

  // 🌀 Tweaked to be slider-first per your plan, with input box sync
  return (
    <div className="glass detective-card my-6 p-6">
      <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="font-mono text-lg text-cyan-200 md:text-xl">
          Evaluate: <code className="text-cyan-300">{expression}</code>
        </div>
        <div className="flex items-center gap-2 font-mono text-lg md:text-xl">
          When:{" "}
          <code className="text-amber-300">
            x =
            <input
              type="number"
              value={val}
              onChange={(e) => {
                const num = parseInt(e.target.value, 10) || 0;
                setVal(num);
                try {
                  setResult(fn(num));
                } catch {
                  setResult(null);
                }
              }}
              className="w-16 rounded-md border border-neutral-700 bg-neutral-900
                         p-1 text-center font-mono text-amber-300
                         focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </code>
        </div>
      </div>

      <input
        type="range"
        min="-10"
        max="10"
        step="1"
        value={val}
        onChange={handleSliderChange}
        className="w-full"
      />

      <div className="mt-6 border-t border-cyan-500/30 pt-4 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-200">
          Result
        </div>
        <div className="font-mono text-3xl font-bold text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">
          {result === null ? fn(val) : result}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------- */
/* 6. CONSTANT vs. VARIABLE (Section 6)   */
/* 🌀 Now a functional click-to-classify */
/* -------------------------------------- */
const initialSorterItems = [
  { id: 1, text: "5", type: "const" },
  { id: 2, text: "x", type: "var" },
  { id: 3, text: "y", type: "var" },
  { id: 4, text: "-10", type: "const" },
  { id: 5, text: "a", type: "var" },
  { id: 6, text: "2.5", type: "const" },
];

export function ConstantVsVariableSorter() {
  const [items, setItems] = useState(
    initialSorterItems.map((item) => ({ ...item, status: "unclassified" })),
  );

  const handleClassify = (id: number, type: "const" | "var") => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) return item;
        if (item.type === type) {
          return { ...item, status: type }; // Correct!
        }
        // Wrong! Flash red.
        setTimeout(() => {
          setItems((prev) =>
            prev.map((i) =>
              i.id === id ? { ...i, status: "unclassified" } : i,
            ),
          );
        }, 800);
        return { ...item, status: "wrong" };
      }),
    );
  };

  const resetSorter = () => {
    setItems(
      initialSorterItems.map((item) => ({ ...item, status: "unclassified" })),
    );
  };

  const unclassified = items.filter((i) => i.status === "unclassified");
  const constants = items.filter((i) => i.status === "const");
  const variables = items.filter((i) => i.status === "var");
  const wrong = items.find((i) => i.status === "wrong");

  return (
    <div className="glass detective-card my-6 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-neutral-100">
          Mini-Game: Constant vs. Variable
        </h4>
        <button
          onClick={resetSorter}
          className="detective-reset flex items-center gap-1"
        >
          <RefreshCw size={12} />
          Reset
        </button>
      </div>

      {/* Drop Zones */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="casefile-dropzone casefile-dropzone--constants">
          <h5 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
            Constants (Fixed)
          </h5>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {constants.map((item) => (
              <span
                key={item.id}
                className="detective-chip detective-chip--constant"
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>
        <div className="casefile-dropzone casefile-dropzone--variables">
          <h5 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.25em] text-sky-200">
            Variables (Can Change)
          </h5>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {variables.map((item) => (
              <span
                key={item.id}
                className="detective-chip detective-chip--variable"
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Unclassified Items */}
      <div className="my-4 border-t border-cyan-500/30 pt-4">
        <h5 className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.28em] text-neutral-200">
          Click a tile to classify it:
        </h5>
        <div className="flex flex-wrap justify-center gap-3">
          {unclassified.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClassify(item.id, "const")}
              className="detective-chip detective-chip--neutral"
            >
              {item.text}
            </button>
          ))}
          {/* Show the 'wrong' item temporarily */}
          {wrong && (
            <div
              className="detective-chip detective-chip--neutral animate-detective-shake"
            >
              {wrong.text}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={() =>
            unclassified.length > 0 &&
            handleClassify(unclassified[0].id, "const")
          }
          className="detective-action"
        >
          Classify as Constant
        </button>
        <button
          onClick={() =>
            unclassified.length > 0 &&
            handleClassify(unclassified[0].id, "var")
          }
          className="detective-action detective-action--alt"
        >
          Classify as Variable
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------- */
/* 10. INTERACTIVE QUIZ (Section 10)      */
/* 🌀 Now a functional quiz             */
/* -------------------------------------- */
const quizQuestions = [
  {
    q: "In 5x + 2, what is the variable?",
    options: ["5", "x", "2"],
    a: 1,
  },
  {
    q: "In 8y - 3, what is the constant?",
    options: ["8", "y", "3"], // Simplified for clarity
    a: 2,
  },
  {
    q: "Which of these is NOT a valid variable name?",
    options: ["_total", "9lives", "time"],
    a: 1,
  },
];

export function VariableQuiz() {
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
      // Move to next question
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
      <div className="glass detective-card detective-card--quiz my-6 p-6 text-center">
        <h4 className="mb-2 text-2xl font-bold text-cyan-200">
          Mystery Solved!
        </h4>
        <p className="text-xl text-neutral-100">
          You scored {score} out of {quizQuestions.length}
        </p>
        <button
          onClick={handleRestart}
          className="detective-action mt-6"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const question = quizQuestions[currentQ];

  return (
    <div className="glass detective-card detective-card--quiz my-6 p-6">
      <h4 className="mb-4 flex justify-between text-lg font-semibold text-neutral-100">
        <span>
          <HelpCircle className="mr-2 inline h-5 w-5 text-cyan-300" />
          Detective Quiz: Question {currentQ + 1}
        </span>
        <span className="detective-score">
          {score} / {quizQuestions.length}
        </span>
      </h4>
      <p className="mb-6 text-xl text-neutral-100">{question.q}</p>
      <div className="space-y-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => {
              setSelected(i);
              setWasWrong(false);
            }}
            className={`detective-option ${
              selected === i
                ? wasWrong
                  ? "is-wrong"
                  : "is-selected"
                : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={selected === null}
        className="detective-action mt-6 w-full"
      >
        {wasWrong ? "Try Again" : "Submit"}
      </button>
    </div>
  );
}