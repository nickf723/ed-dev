import { useState } from "react";

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
