// app/math/algebra/inequalities/InequalityComponents.tsx
"use client";
import React, { useState } from "react";
import {
  ChevronLeft, // 👈 Corrected
  ChevronRight, // 👈 Corrected
  ChevronLeftSquare, // 👈 Corrected
  ChevronRightSquare, // 👈 Corrected
  EqualNot, // 👈 Correct
  X, // 👈 Kept for quiz
  HelpCircle,
  Swords,
  ArrowRight,
} from "@/components/icons";

/* -------------------------------------- */
/* 1. SYMBOL EXPLAINER (Section 1 & 2)    */
/* -------------------------------------- */
export function InequalitySymbolExplainer() {
  const symbols = [
    {
      icon: ChevronLeft, // 👈 Corrected
      symbol: "<",
      name: "Less Than",
      ex: "x < 5",
      color: "text-cyan-300",
    },
    {
      icon: ChevronRight, // 👈 Corrected
      symbol: ">",
      name: "Greater Than",
      ex: "x > 5",
      color: "text-red-400",
    },
    {
      icon: ChevronLeftSquare, // 👈 Corrected
      symbol: "≤",
      name: "Less Than or Equal To",
      ex: "x ≤ 5",
      color: "text-cyan-300",
    },
    {
      icon: ChevronRightSquare, // 👈 Corrected
      symbol: "≥",
      name: "Greater Than or Equal To",
      ex: "x ≥ 5",
      color: "text-red-400",
    },
    {
      icon: EqualNot,
      symbol: "≠",
      name: "Not Equal To",
      ex: "x ≠ 5",
      color: "text-yellow-400",
    },
  ];
  return (
    <div className="my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {symbols.map((s) => (
        <div
          key={s.symbol}
          className="glass h-40 rounded-lg border border-neutral-800 p-4 
                     flex flex-col justify-between items-center text-center
                     transition-all hover:border-red-500/50 hover:scale-105"
        >
          <s.icon className={`h-10 w-10 ${s.color}`} />
          <div>
            <p className={`font-semibold ${s.color}`}>{s.name}</p>
            <code className="text-neutral-200 text-lg">{s.ex}</code>
          </div>
        </div>
      ))}
    </div>
  );
}
/* -------------------------------------- */
/* 3. NUMBER LINE TOOL (Section 3)        */
/* -------------------------------------- */
export function NumberLineTool() {
  const [isOpen, setIsOpen] = useState(true);
  const [isGreater, setIsGreater] = useState(true);

  const circleClass = isOpen
    ? "h-4 w-4 rounded-full border-2 border-white bg-black"
    : "h-4 w-4 rounded-full bg-white";
  const arrowDirection = isGreater ? "right-0" : "left-0";
  const arrowTransform = isGreater ? "" : "rotate-180";

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-4">
        Interactive: Number Line Visualization
      </h4>
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-3 py-1 rounded-md text-sm font-semibold
            ${
              isOpen
                ? "bg-neutral-700 text-white"
                : "bg-red-500 text-white"
            }`}
        >
          {isOpen ? "< or > (Open Circle)" : "≤ or ≥ (Closed Circle)"}
        </button>
        <button
          onClick={() => setIsGreater(!isGreater)}
          className={`px-3 py-1 rounded-md text-sm font-semibold
            ${
              isGreater
                ? "bg-neutral-700 text-white"
                : "bg-red-500 text-white"
            }`}
        >
          {isGreater ? "Greater Than" : "Less Than"}
        </button>
      </div>

      {/* Number Line */}
      <div className="w-full max-w-lg mx-auto px-4">
        <div className="relative h-1 bg-neutral-600">
          {/* Main Line */}
          {/* Arrow Highlight */}
          <div
            className={`absolute top-0 bottom-0 h-1 bg-red-400
            ${isGreater ? "left-1/2 right-0" : "right-1/2 left-0"}`}
          />
          {/* Arrowhead */}
          <ArrowRight
            className={`absolute -top-2.5 h-6 w-6 text-red-400 ${arrowDirection} ${arrowTransform}`}
          />
          {/* Circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className={circleClass} />
          </div>
          {/* Ticks */}
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white">
            0
          </span>
          <span className="absolute -bottom-6 right-0 -translate-x-1/2 text-white">
            5
          </span>
          <span className="absolute -bottom-6 left-0 -translate-x-1/2 text-white">
            -5
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------- */
/* 4. FLIP SIGN DEMO (Section 4)          */
/* -------------------------------------- */
export function FlipSignDemo() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="glass my-6 rounded-lg border border-red-500/30 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-2">
        Critical Rule: The Sign Flip
      </h4>
      <p className="text-center text-sm text-neutral-400 mb-4">
        Click "Solve" to see what happens when you divide by a negative.
      </p>
      <div className="text-center font-mono text-3xl p-4">
        {!isFlipped ? (
          <code className="text-white">-2x {`>`} 6</code>
        ) : (
          <div>
            <code className="text-neutral-500 line-through">-2x {`>`} 6</code>
            <br />
            <code className="text-red-400">x &lt; -3</code>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-2">
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="rounded-md bg-red-600 px-6 py-2 font-semibold text-white
                     transition hover:bg-red-500"
        >
          {isFlipped ? "Reset" : "Solve (÷ by -2)"}
        </button>
      </div>
      {isFlipped && (
        <p className="text-center text-lg font-semibold text-red-400 mt-4">
          🔥 The inequality sign flipped! 🔥
        </p>
      )}
    </div>
  );
}

/* -------------------------------------- */
/* 11. QUICK QUIZ (Section 11)            */
/* -------------------------------------- */
const quizQuestions = [
  {
    q: "x + 5 > 10",
    options: ["x > 5", "x < 5", "x > 15"],
    a: 0,
  },
  {
    q: "3x ≤ 12",
    options: ["x ≥ 4", "x ≤ 4", "x ≤ 36"],
    a: 1,
  },
  {
    q: "-4x < 8",
    options: ["x < -2", "x > -2", "x > 2"],
    a: 1, // The flip!
  },
];

export function InequalityArenaQuiz() {
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
      <div className="glass my-6 rounded-lg border-red-500/50 border-2 bg-red-900/20 p-6 shadow-xl text-center">
        <h4 className="text-2xl font-bold text-red-300 mb-2">
          Victory!
        </h4>
        <p className="text-xl text-neutral-200">
          You scored {score} out of {quizQuestions.length}
        </p>
        <button
          onClick={handleRestart}
          className="mt-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Rematch
        </button>
      </div>
    );
  }

  const question = quizQuestions[currentQ];

  return (
    <div className="glass my-6 rounded-lg border-red-500/50 border-2 bg-red-900/20 p-6 shadow-xl">
      <h4 className="text-lg font-semibold text-neutral-200 mb-4 flex justify-between">
        <span>
          <Swords className="inline h-5 w-5 mr-2 text-red-400" />
          The Inequality Arena: Bout {currentQ + 1}
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
        className="mt-6 w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-lg 
                   transition-colors disabled:bg-neutral-600 disabled:cursor-not-allowed"
      >
        {wasWrong ? "Try Again" : "Strike!"}
      </button>
    </div>
  );
}