// app/math/algebra/expressions/ExpressionComponents.tsx
"use client";

import React, { useState } from "react";
// Import icons needed for our new components
import {
  RefreshCw,
  Target,
  FileText,
  HelpCircle,
  Package,
  PackagePlus,
  Network,
} from "lucide-react";

/* -------------------------------------- */
/* 1. INTERACTIVE OVERVIEW (Section 1)    */
/* -------------------------------------- */
export function ExpressionTermHighlighter() {
  const [isEquation, setIsEquation] = useState(false);

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md text-center">
      <h4 className="text-lg font-semibold text-neutral-200">
        Interactive: Expression vs. Equation
      </h4>
      <p className="text-neutral-400 text-sm mb-6">
        Click the toggle to see the difference.
      </p>

      {/* Toggle Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsEquation(!isEquation)}
          className="relative flex items-center rounded-full bg-neutral-900 border border-neutral-700 p-1"
        >
          <span
            className={`relative z-10 px-4 py-1 rounded-full text-sm font-medium transition-colors
            ${!isEquation ? "text-cyan-300" : "text-neutral-400"}`}
          >
            Expression
          </span>
          <span
            className={`relative z-10 px-4 py-1 rounded-full text-sm font-medium transition-colors
            ${isEquation ? "text-amber-300" : "text-neutral-400"}`}
          >
            Equation
          </span>
          {/* Sliding background */}
          <span
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-neutral-700/50
            transition-transform duration-300 ease-out-cubic
            ${
              isEquation
                ? "translate-x-[calc(100%-4px)]"
                : "translate-x-[4px]"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="font-mono text-2xl p-4 rounded-lg bg-neutral-900/50 w-full max-w-sm mx-auto">
        {isEquation ? (
          <>
            <code className="text-amber-300">3x + 2 = 11</code>
            <p className="text-sm text-neutral-300 mt-3 font-sans">
              This is an <strong>equation</strong>. It's a full "sentence"
              stating that two things are equal. You can{" "}
              <strong>solve</strong> it.
            </p>
          </>
        ) : (
          <>
            <code className="text-cyan-300">3x + 2</code>
            <p className="text-sm text-neutral-300 mt-3 font-sans">
              This is an <strong>expression</strong>. It's a "phrase" that
              represents a value. You can <strong>simplify</strong> or{" "}
              <strong>evaluate</strong> it.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------- */
/* 2. COMPONENT FLIP CARDS (Section 2)    */
/* -------------------------------------- */
// Single Flip Card Component
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
        {/* Front of card */}
        <div className="glass absolute inset-0 [backface-visibility:hidden]">
          <div className="flex h-full flex-col items-center justify-center p-4 text-center">
            <div className="text-xl font-semibold text-yellow-400">
              {term}
            </div>
            <div className="font-mono text-lg text-neutral-300">{example}</div>
          </div>
        </div>
        {/* Back of card */}
        <div className="glass absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex h-full items-center justify-center p-4 text-center">
            <p className="text-sm text-neutral-300">{definition}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Component for Section 2
export function ComponentFlipCards() {
  const components = [
    {
      name: "Constant",
      example: "5",
      def: "A fixed value; a number on its own.",
    },
    {
      name: "Variable",
      example: "x",
      def: "A symbol (like a letter) that stands for an unknown or changing value.",
    },
    {
      name: "Term",
      example: "3x",
      def: "A single piece of an expression, either a number or variable, or a product of them.",
    },
    {
      name: "Coefficient",
      example: "3 in 3x",
      def: "The number that is multiplied by a variable.",
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
/* 3. TYPES FLOWCHART (Section 3)         */
/* -------------------------------------- */
export function TypesFlowchart() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const types = [
    {
      icon: Package,
      name: "Monomial",
      terms: "1 term",
      example: "3x²",
      def: "A single term made of numbers and variables.",
    },
    {
      icon: PackagePlus,
      name: "Binomial",
      terms: "2 terms",
      example: "3x² + 2",
      def: "Two terms joined by addition or subtraction.",
    },
    {
      icon: Network,
      name: "Polynomial",
      terms: "2 or more terms",
      example: "3x² + 2x + 1",
      def: 'The general name for expressions with one or more terms (poly = "many").',
    },
  ];

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-4">
        Types of Expressions
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
              <type.icon className="h-6 w-6 text-yellow-400" />
              <div>
                <h5 className="text-lg font-semibold text-yellow-300">
                  {type.name}
                </h5>
                <p className="text-sm text-neutral-400">{type.terms}</p>
              </div>
            </div>
            <code className="block my-3 text-center text-lg text-cyan-300">
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
/* 4. EXPRESSION BUILDER (Section 6)      */
/* -------------------------------------- */
// A simple builder to demonstrate the concept
export function ExpressionBuilderGame() {
  const tiles = [
    { id: 1, text: "5x", type: "x" },
    { id: 2, text: "+ 3", type: "const" },
    { id: 3, text: "- 2x", type: "x" },
    { id: 4, text: "+ 7y", type: "y" },
  ];
  const [built, setBuilt] = useState<{ id: number; text: string }[]>([]);

  const addToBuilder = (tile: { id: number; text: string }) => {
    if (!built.find((t) => t.id === tile.id)) {
      setBuilt([...built, tile]);
    }
  };

  const resetBuilder = () => setBuilt([]);

  return (
    <div className="glass my-6 rounded-lg border-yellow-500/50 border-2 bg-yellow-900/20 p-6 shadow-xl">
      <h4 className="text-2xl font-bold text-yellow-300 mb-2 text-center">
        ⚙️ Expression Builder
      </h4>
      <p className="text-neutral-300 mb-4 text-center">
        Click the tiles below to build an expression.
      </p>

      {/* Builder Box */}
      <div className="flex flex-wrap gap-2 p-4 bg-neutral-900/50 rounded-lg min-h-24 items-center border border-neutral-700">
        {built.length === 0 && (
          <p className="text-neutral-500">Click tiles to add them here...</p>
        )}
        {built.map((tile) => (
          <span
            key={tile.id}
            className="px-3 py-1 bg-neutral-700 rounded-md font-mono text-lg text-white"
          >
            {tile.text}
          </span>
        ))}
        {built.length > 0 && (
          <button
            onClick={resetBuilder}
            className="p-1 text-neutral-400 hover:text-red-400"
          >
            <RefreshCw size={16} />
          </button>
        )}
      </div>

      {/* Tile Bank */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => addToBuilder(tile)}
            disabled={!!built.find((t) => t.id === tile.id)}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-md font-mono text-white
                       disabled:bg-neutral-600 disabled:opacity-50 transition"
          >
            {tile.text}
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------- */
/* 5. ASSESSMENT WIDGET (Section 10)      */
/* -------------------------------------- */
const quizQuestions = [
  {
    q: "In the term 7y, what is the coefficient?",
    options: ["7", "y", "7y"],
    a: 0, // index of correct answer
  },
  {
    q: "Which of these are *like terms* with 3x²?",
    options: ["3x", "x²", "3"],
    a: 1,
  },
  {
    q: "Evaluate 4a - 1 when a = 2.",
    options: ["7", "41", "1"],
    a: 0,
  },
];

export function AssessmentWidget() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;

    if (selected === quizQuestions[currentQ].a) {
      setScore(score + 1);
    }

    setSelected(null);
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md text-center">
        <h4 className="text-2xl font-bold text-yellow-300 mb-2">
          Quiz Complete!
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
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 mb-4">
        <HelpCircle className="inline h-5 w-5 mr-2 text-yellow-400" />
        Question {currentQ + 1} of {quizQuestions.length}
      </h4>
      <p className="text-xl text-neutral-200 mb-6">{question.q}</p>
      <div className="space-y-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`block w-full text-left p-4 rounded-lg border
                      transition-all font-mono
                      ${
                        selected === i
                          ? "bg-cyan-900/50 border-cyan-400 ring-2 ring-cyan-400"
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
        Submit
      </button>
    </div>
  );
}

/* -------------------------------------- */
/* 6. LIKE TERMS APPLET (Section 5)       */
/* (Moved from its own file)              */
/* -------------------------------------- */
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

  const { terms, solution } = termProblems[problemIndex];

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
    const colors = {
      x: "border-cyan-400 text-cyan-300 bg-cyan-900/50",
      y: "border-fuchsia-400 text-fuchsia-300 bg-fuchsia-900/50",
      const: "border-amber-400 text-amber-300 bg-amber-900/50",
    }[type];

    if (solved) {
      return `border-2 ${colors}`;
    }
    if (selectedType === type) {
      return `border-2 ring-2 ring-white/100 ${colors}`;
    }
    return "border border-neutral-700 bg-neutral-800/60 hover:bg-neutral-700/60";
  };

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-center text-lg font-semibold text-neutral-200">
        Interactive: Combine Like Terms
      </h4>
      <p className="mb-4 text-center text-sm text-neutral-400">
        Click on the terms to group them.
      </p>
      <div className="my-4 flex flex-wrap justify-center gap-2 rounded-lg bg-neutral-900/50 p-4 border border-neutral-700">
        {terms.map((term, i) => (
          <button
            key={i}
            onClick={() => handleTermClick(term.type)}
            disabled={solved}
            className={`cursor-pointer rounded-md px-3 py-1 font-mono text-xl text-neutral-300 
                        transition-all ${getTermStyle(term.type)}`}
          >
            {term.text}
          </button>
        ))}
      </div>

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