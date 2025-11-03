// app/math/algebra/variables/VariableComponents.tsx
"use client";
import React, { useState } from "react";
// 🌀 Using the "detective" theme icons
import { Check, X, RefreshCw, HelpCircle, Shuffle } from "lucide-react";

/* -------------------------------------- */
/* 1. WHAT IS A VARIABLE (Section 1)      */
/* This component is already functional.  */
/* -------------------------------------- */
export function WhatIsVariableExplainer() {
  const [value, setValue] = useState(2);
  const examples = [2, 10, -4];

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md text-center">
      <h4 className="text-lg font-semibold text-neutral-200 mb-4">
        Interactive: The "x" Treasure Chest
      </h4>
      <p className="text-neutral-400 text-sm mb-4">
        Hover over the buttons to see what 'x' can be!
      </p>
      <div className="flex justify-center gap-4 mb-4">
        {examples.map((ex) => (
          <button
            key={ex}
            onMouseEnter={() => setValue(ex)}
            className="px-4 py-2 rounded-lg bg-neutral-800 text-white font-mono
                       hover:bg-indigo-500 hover:scale-105 transition-all"
          >
            x = {ex}
          </button>
        ))}
      </div>
      <div className="font-mono text-2xl p-4 rounded-lg bg-neutral-900/50 w-full max-w-sm mx-auto">
        <code className="text-cyan-300">
          2x + 3 ={" "}
          <span className="text-yellow-300 font-bold">
            {2 * value + 3}
          </span>
        </code>
        <p className="text-sm text-neutral-300 mt-3 font-sans">
          The expression <strong>changes</strong> based on the "mystery" value of{" "}
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
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-neutral-200 text-center">
          Mini-Activity: Valid or Not?
        </h4>
        <button
          onClick={() => setRevealed(null)}
          className="text-xs text-neutral-400 hover:text-cyan-300 flex items-center gap-1"
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
            className={`flex justify-between items-center w-full p-3 rounded-lg
                      border transition-all
                      ${
                        revealed === index
                          ? item.valid
                            ? "bg-green-900/40 border-green-700"
                            : "bg-red-900/40 border-red-700"
                          : "bg-neutral-900/50 border-neutral-700 hover:bg-neutral-800/50"
                      }`}
          >
            <code className="font-mono text-xl text-white">{item.name}</code>
            {revealed === index ? (
              // Show the answer
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-300 italic">
                  {item.reason}
                </span>
                {item.valid ? (
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                ) : (
                  <X className="h-5 w-5 text-red-400 flex-shrink-0" />
                )}
              </div>
            ) : (
              // Show the prompt
              <span className="text-sm font-semibold text-neutral-400">
                Valid?
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="text-center text-sm text-neutral-400 mt-4">
        Click an item to check if it's a valid name.
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

  const calculate = () => {
    try {
      setResult(fn(val));
    } catch (e) {
      setResult(null);
    }
  };

  // Update result in real-time as slider moves
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value, 10);
    setVal(newVal);
    try {
      setResult(fn(newVal));
    } catch (e) {
      setResult(null);
    }
  };

  // 🌀 Tweaked to be slider-first per your plan, with input box sync
  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="font-mono text-lg text-neutral-200 md:text-xl">
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
                } catch (e) {
                  setResult(null);
                }
              }}
              className="w-16 rounded-md border border-neutral-700 bg-neutral-900
                         p-1 text-center font-mono text-amber-300
                         focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
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

      <div className="mt-6 border-t border-neutral-700 pt-4 text-center">
        <div className="text-sm uppercase tracking-wide text-neutral-400">
          Result
        </div>
        <div className="font-mono text-3xl font-bold text-green-300">
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

type SortStatus = "unclassified" | "const" | "var" | "wrong";

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
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-neutral-200">
          Mini-Game: Constant vs. Variable
        </h4>
        <button
          onClick={resetSorter}
          className="text-xs text-neutral-400 hover:text-cyan-300 flex items-center gap-1"
        >
          <RefreshCw size={12} />
          Reset
        </button>
      </div>

      {/* Drop Zones */}
      <div className="flex gap-4">
        <div className="flex-1 rounded-lg border-2 border-teal-500 bg-neutral-900/50 p-4 min-h-24">
          <h5 className="text-center font-semibold text-teal-300">
            Constants (Fixed)
          </h5>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {constants.map((item) => (
              <span
                key={item.id}
                className="px-3 py-1 bg-teal-800 rounded-md font-mono text-white"
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1 rounded-lg border-2 border-indigo-500 bg-neutral-900/50 p-4 min-h-24">
          <h5 className="text-center font-semibold text-indigo-300">
            Variables (Can Change)
          </h5>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {variables.map((item) => (
              <span
                key={item.id}
                className="px-3 py-1 bg-indigo-800 rounded-md font-mono text-white"
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Unclassified Items */}
      <div className="my-4 border-t border-neutral-700 pt-4">
        <h5 className="text-center text-sm text-neutral-400 mb-3">
          Click a tile to classify it:
        </h5>
        <div className="flex flex-wrap justify-center gap-3">
          {unclassified.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClassify(item.id, "const")}
              className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md 
                         font-mono text-xl text-white transition-all"
            >
              {item.text}
            </button>
          ))}
          {/* Show the 'wrong' item temporarily */}
          {wrong && (
            <div
              className="px-4 py-2 bg-red-600 rounded-md font-mono text-xl text-white
                         animate-shake" // You'd add an 'animate-shake' keyframe to globals.css
            >
              {wrong.text}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() =>
            unclassified.length > 0 &&
            handleClassify(unclassified[0].id, "const")
          }
          className="px-4 py-2 rounded-md bg-teal-800 hover:bg-teal-700 text-teal-200"
        >
          Classify as Constant
        </button>
        <button
          onClick={() =>
            unclassified.length > 0 &&
            handleClassify(unclassified[0].id, "var")
          }
          className="px-4 py-2 rounded-md bg-indigo-800 hover:bg-indigo-700 text-indigo-200"
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
      <div className="glass my-6 rounded-lg border-indigo-500/50 border-2 bg-indigo-900/20 p-6 shadow-xl text-center">
        <h4 className="text-2xl font-bold text-indigo-300 mb-2">
          Mystery Solved!
        </h4>
        <p className="text-xl text-neutral-200">
          You scored {score} out of {quizQuestions.length}
        </p>
        <button
          onClick={handleRestart}
          className="mt-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const question = quizQuestions[currentQ];

  return (
    <div className="glass my-6 rounded-lg border-indigo-500/50 border-2 bg-indigo-900/20 p-6 shadow-xl">
      <h4 className="text-lg font-semibold text-neutral-200 mb-4 flex justify-between">
        <span>
          <HelpCircle className="inline h-5 w-5 mr-2 text-indigo-300" />
          Detective Quiz: Question {currentQ + 1}
        </span>
        <span className="text-neutral-400">
          {score} / {quizQuestions.length}
        </span>
      </h4>
      <p className="text-xl text-neutral-200 mb-6">{question.q}</p>
      <div className="space-y-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => {
              setSelected(i);
              setWasWrong(false);
            }}
            className={`block w-full text-left p-4 rounded-lg border
                      transition-all font-mono
                      ${
                        selected === i
                          ? wasWrong
                            ? "bg-red-900/50 border-red-400 ring-2 ring-red-400"
                            : "bg-cyan-900/50 border-cyan-400 ring-2 ring-cyan-400"
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
        className="mt-6 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg 
                   transition-colors disabled:bg-neutral-600 disabled:cursor-not-allowed"
      >
        {wasWrong ? "Try Again" : "Submit"}
      </button>
    </div>
  );
}