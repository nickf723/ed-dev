// app/math/algebra/expressions/ExpressionComponents.tsx
"use client";

import React, { useState } from "react";

// Placeholder for Section 1: Interactive Overview
export function ExpressionTermHighlighter() {
  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md text-center">
      <h4 className="text-lg font-semibold text-neutral-200">
        Interactive: Expression vs. Equation
      </h4>
      <p className="text-neutral-400 text-sm mb-4">
        Hover to see definitions, click the toggle. (Placeholder)
      </p>
      <div className="flex justify-center gap-4 font-mono text-xl">
        <code className="p-2 rounded-md bg-neutral-900 text-cyan-300 hover:ring-2 ring-cyan-400 transition-all cursor-pointer">
          3x + 2
        </code>
        <code className="p-2 rounded-md bg-neutral-900 text-amber-300 hover:ring-2 ring-amber-400 transition-all cursor-pointer">
          3x + 2 = 11
        </code>
      </div>
    </div>
  );
}

// Placeholder for Section 2: Components of an Expression
export function ComponentFlipCards() {
  const components = [
    { name: "Constant", example: "5" },
    { name: "Variable", example: "x" },
    { name: "Term", example: "3x" },
    { name: "Coefficient", example: "3 in 3x" },
  ];
  return (
    <div className="my-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {components.map((c) => (
        <div
          key={c.name}
          className="glass h-32 rounded-lg border border-neutral-800 p-4 
                     flex flex-col justify-center items-center text-center
                     cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="text-lg font-semibold text-yellow-400">{c.name}</div>
          <div className="font-mono text-neutral-300">{c.example}</div>
        </div>
      ))}
      <p className="col-span-full text-center text-sm text-neutral-400">
        (Placeholder: These will be flip cards. Click to see definition)
      </p>
    </div>
  );
}

// Placeholder for Section 3: Types of Expressions
export function TypesFlowchart() {
  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-4">
        Types of Expressions (Flowchart Placeholder)
      </h4>
      <ul className="list-disc pl-5 text-neutral-300">
        <li>
          <strong>Monomial (1 term):</strong> <code>3x</code>
        </li>
        <li>
          <strong>Binomial (2 terms):</strong> <code>3x + 2</code>
        </li>
        <li>
          <strong>Polynomial (3+ terms):</strong> <code>3x² + 2x + 1</code>
        </li>
      </ul>
    </div>
  );
}

// Placeholder for Section 6: Expression Builder Game
export function ExpressionBuilderGame() {
  return (
    <div className="glass my-6 rounded-lg border-yellow-500/50 border-2 bg-yellow-900/20 p-6 shadow-xl text-center">
      <h4 className="text-2xl font-bold text-yellow-300 mb-2">
        ⚙️ Expression Builder Game
      </h4>
      <p className="text-neutral-300 mb-4">
        (Placeholder: Combine tiles of constants, variables, and operators to
        create valid expressions.)
      </p>
      <div className="flex justify-center gap-2 p-4 bg-neutral-900/50 rounded-lg h-24 items-center">
        <span className="px-3 py-2 bg-blue-600 rounded-md font-mono">3x</span>
        <span className="px-3 py-2 bg-gray-600 rounded-md font-mono">+</span>
        <span className="px-3 py-2 bg-green-600 rounded-md font-mono">2</span>
      </div>
    </div>
  );
}

// Placeholder for Section 10: Assessment Widget
export function AssessmentWidget() {
  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-4">
        Section Assessment (Placeholder)
      </h4>
      <p className="text-neutral-400 text-center">
        10 randomized interactive questions will appear here.
      </p>
      <button className="w-full mt-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
        Start Assessment
      </button>
    </div>
  );
}

// 🧩 NEW: Moved LikeTermsApplet here
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
      if (type === "x")
        return "bg-cyan-500/50 text-cyan-300 ring-2 ring-cyan-400";
      if (type === "y")
        return "bg-fuchsia-500/50 text-fuchsia-300 ring-2 ring-fuchsia-400";
      if (type === "const")
        return "bg-amber-500/50 text-amber-300 ring-2 ring-amber-400";
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