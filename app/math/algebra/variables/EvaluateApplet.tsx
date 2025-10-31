import { useState } from "react";

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