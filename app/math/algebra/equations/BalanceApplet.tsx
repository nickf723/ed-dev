import { useState } from "react";
import { Plus, Minus, RefreshCcw } from "lucide-react";

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