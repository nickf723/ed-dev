// app/math/algebra/variables/VariableComponents.tsx
"use client";
import React, { useMemo, useState } from "react";

/*
  Variables: reusable components for intuition-first teaching flow.
  Keep styling minimal and consistent; use Tailwind utility classes
  already present in the codebase (glass cards, neutral palette).
*/

/* ----------------------------- CORE DEFINITION ----------------------------- */
export function CoreDefinition({
  title,
  definition,
  example,
}: {
  title: string;
  definition: string;
  example?: string;
}) {
  return (
    <div className="my-6 applet-card">
      <div className="applet-header">Definition</div>
      <h3 className="mt-1 text-lg font-semibold text-neutral-100">{title}</h3>
      <p className="mt-2 text-neutral-300">{definition}</p>
      {example && (
        <p className="mt-3 text-sm text-neutral-400">
          <span className="font-medium text-cyan-300">Example:</span> {example}
        </p>
      )}
    </div>
  );
}

/* -------------------------------- SLIDER APPLET ---------------------------- */
export function SliderApplet({
  variableName,
  min,
  max,
  formula,
  liveText,
}: {
  variableName: string;
  min: number;
  max: number;
  formula?: string;
  liveText?: string;
}) {
  const [v, setV] = useState<number>(Math.round((min + max) / 2));
  return (
    <div className="my-6 applet-card">
      <div className="mb-3 flex items-center justify-between">
        <div className="applet-header">Intuition Builder</div>
        {formula && (
          <div className="font-mono text-sm text-cyan-300">{formula}</div>
        )}
      </div>
      <div className="mb-4 flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          value={v}
          onChange={(e) => setV(parseInt(e.target.value, 10))}
          className="w-full"
        />
        <input
          type="number"
          value={v}
          onChange={(e) => setV(parseInt(e.target.value || "0", 10))}
          className="w-20 rounded-md border border-neutral-700 bg-neutral-900 p-1 text-center font-mono text-amber-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="h-3 flex-1 rounded bg-neutral-800">
          <div
            className="h-3 rounded bg-cyan-500"
            style={{ width: `${((v - min) / (max - min)) * 100}%` }}
          />
        </div>
        <div className="font-mono text-cyan-200">
          {variableName} = <span className="text-amber-300">{v}</span>
        </div>
      </div>
      {liveText && (
        <p className="mt-3 text-sm text-neutral-400">{liveText}</p>
      )}
    </div>
  );
}

/* -------------------------------- DYNAMIC LABEL ---------------------------- */
export function DynamicLabel({
  prefix = "",
  variableName,
  value,
}: {
  prefix?: string;
  variableName: string;
  value: number;
}) {
  return (
    <div className="rounded-md border border-neutral-800 bg-neutral-900/60 px-3 py-2 font-mono text-cyan-200">
      {prefix && <span className="text-neutral-400">{prefix} </span>}
      {variableName} = <span className="text-amber-300">{value}</span>
    </div>
  );
}

/* -------------------------------- VALUE SWAP DEMO ------------------------- */
export function ValueSwapDemo({
  variable = "x",
  visual = "cupFill",
  range = [0, 10],
  caption,
}: {
  variable?: string;
  visual?: "cupFill" | "barLength";
  range?: [number, number];
  caption?: string;
}) {
  const [v, setV] = useState<number>(range[0]);
  const pct = useMemo(() => {
    const [min, max] = range;
    return ((v - min) / (max - min)) * 100;
  }, [v, range]);
  return (
    <div className="my-6 applet-card">
      <div className="mb-3 flex items-center justify-between">
        <div className="applet-header">Seeing Change</div>
        <DynamicLabel variableName={variable} value={v} />
      </div>
      <div className="mb-4">
        {visual === "cupFill" ? (
          <div className="mx-auto h-40 w-24 rounded-b-2xl border border-neutral-700 bg-neutral-950 p-1">
            <div
              className="h-full w-full rounded-b-xl bg-cyan-500/30"
              style={{ height: `${pct}%`, marginTop: `${100 - pct}%` }}
            />
          </div>
        ) : (
          <div className="h-4 w-full rounded bg-neutral-800">
            <div className="h-4 rounded bg-cyan-500" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>
      <input
        type="range"
        min={range[0]}
        max={range[1]}
        value={v}
        onChange={(e) => setV(parseInt(e.target.value, 10))}
        className="w-full"
      />
      {caption && <p className="mt-3 text-sm text-neutral-400">{caption}</p>}
    </div>
  );
}

/* -------------------------------- NOTATION CARD --------------------------- */
export function NotationCard({
  symbol,
  meaning,
  relatedSymbols = [],
  example,
}: {
  symbol: string;
  meaning: string;
  relatedSymbols?: string[];
  example?: string;
}) {
  return (
    <div className="applet-card p-4">
      <div className="flex items-center justify-between">
        <code className="rounded bg-neutral-800 px-2 py-1 font-mono text-cyan-200">{symbol}</code>
        {relatedSymbols.length > 0 && (
          <div className="text-xs text-neutral-400">
            Related: {relatedSymbols.join(", ")}
          </div>
        )}
      </div>
      <p className="mt-3 text-neutral-300">{meaning}</p>
      {example && (
        <p className="mt-2 text-sm text-neutral-400">
          <span className="font-medium text-cyan-300">Example:</span> {example}
        </p>
      )}
    </div>
  );
}

/* ------------------------------ EXPRESSION PLAYGROUND --------------------- */
export function ExpressionPlayground({
  blocks,
  computeMode = false,
  liveValue,
  showOutput = true,
}: {
  blocks: string[];
  computeMode?: boolean;
  liveValue?: { x?: number };
  showOutput?: boolean;
}) {
  const [tokens, setTokens] = useState<string[]>(blocks);
  const exprStr = useMemo(() => {
    // Insert implicit multiplication: e.g., 2 x -> 2*x
    const out: string[] = [];
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      const prev = out[out.length - 1];
      const isNum = /^\d+(\.\d+)?$/.test(t);
      const isVar = /^[a-zA-Z]$/.test(t);
      if (i > 0 && (isNum || isVar) && prev && /[\dx)]$/.test(prev)) {
        out.push("*");
      }
      out.push(t);
    }
    return out.join(" ");
  }, [tokens]);

  const computed = useMemo(() => {
    if (!computeMode || !showOutput) return null;
    try {
      const x = liveValue?.x ?? 0;
      // eslint-disable-next-line no-new-func
      const fn = new Function("x", `return (${exprStr});`);
      const val = fn(x);
      return Number.isFinite(val) ? val : null;
    } catch {
      return null;
    }
  }, [computeMode, exprStr, liveValue, showOutput]);

  return (
    <div className="my-6 applet-card">
      <div className="applet-header">Expression Builder</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {tokens.map((t, i) => (
          <button
            key={`${t}-${i}`}
            onClick={() =>
              setTokens((prev) => prev.filter((_, idx) => idx !== i))
            }
            className="rounded border border-neutral-700 bg-neutral-900 px-2 py-1 font-mono text-cyan-200 hover:border-cyan-500/50"
            title="Click to remove"
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded border border-neutral-800 bg-neutral-950 p-3 font-mono text-cyan-300">
        {exprStr || "/* add tokens */"}
      </div>
      {showOutput && (
        <div className="mt-4 border-t border-neutral-800 pt-3">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Output
          </div>
          <div className="mt-1 font-mono text-emerald-300">
            {computeMode ? (computed ?? "—") : "(computation off)"}
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------- GRAPH EXPLORER -------------------------- */
export function GraphExplorer({
  equation = "y = 2x + 3",
  rangeX = [-5, 5],
  variableName = "x",
  highlightMode = "tracePoint",
}: {
  equation?: string;
  rangeX?: [number, number];
  variableName?: string;
  highlightMode?: "tracePoint" | "none";
}) {
  const [x, setX] = useState<number>(0);

  // Parse a simple linear equation: y = ax + b
  const { a, b } = useMemo(() => {
    const m = equation
      .replace(/\s+/g, "")
      .match(/^y=([+-]?(?:\d+\.?\d*)?)x([+-]\d+\.?\d*)?$/i);
    const A = m && m[1] !== undefined && m[1] !== "" ? parseFloat(m[1]) : 1;
    const B = m && m[2] ? parseFloat(m[2].replace(/\s/g, "")) : 0;
    return { a: A, b: B };
  }, [equation]);

  const width = 480;
  const height = 260;
  const padding = 32;
  const [xmin, xmax] = rangeX;
  const ymin = a * xmin + b;
  const ymax = a * xmax + b;
  const yRange = [Math.min(ymin, ymax), Math.max(ymin, ymax)];
  const [yminV, ymaxV] = yRange[0] === yRange[1] ? [-10, 10] : yRange;

  const sx = (vx: number) =>
    padding + ((vx - xmin) / (xmax - xmin)) * (width - 2 * padding);
  const sy = (vy: number) =>
    height - (padding + ((vy - yminV) / (ymaxV - yminV)) * (height - 2 * padding));

  const x1 = xmin;
  const y1 = a * x1 + b;
  const x2 = xmax;
  const y2 = a * x2 + b;

  const yAtX = a * x + b;

  return (
    <div className="my-6 applet-card">
      <div className="mb-3 flex items-center justify-between">
        <div className="applet-header">Graph Explorer</div>
        <div className="font-mono text-sm text-cyan-300">{equation}</div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="mx-auto block w-full h-auto">
        {/* Axes */}
        <line x1={padding} y1={sy(0)} x2={width - padding} y2={sy(0)} stroke="#475569" />
        <line x1={sx(0)} y1={padding} x2={sx(0)} y2={height - padding} stroke="#475569" />
        {/* Line */}
        <line x1={sx(x1)} y1={sy(y1)} x2={sx(x2)} y2={sy(y2)} stroke="#06b6d4" strokeWidth={2} />
        {/* Trace point */}
        {highlightMode === "tracePoint" && (
          <g>
            <circle cx={sx(x)} cy={sy(yAtX)} r={4} fill="#34d399" />
          </g>
        )}
      </svg>
      <div className="mt-3 flex items-center justify-between">
        <div className="font-mono text-cyan-200">
          {variableName} = <span className="text-amber-300">{x}</span>
          <span className="ml-3 text-neutral-400">y = {yAtX.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min={xmin}
          max={xmax}
          step={0.1}
          value={x}
          onChange={(e) => setX(parseFloat(e.target.value))}
          className="w-48"
        />
      </div>
    </div>
  );
}

/* -------------------------------- TABLE MAPPER ---------------------------- */
export function TableMapper({
  inputs,
  fn,
}: {
  inputs: number[];
  fn: (x: number) => number;
}) {
  return (
    <div className="my-6 overflow-x-auto applet-card p-4">
      <table className="w-full text-left text-sm">
        <thead className="text-neutral-400">
          <tr>
            <th className="px-3 py-2 font-medium">x</th>
            <th className="px-3 py-2 font-medium">y</th>
          </tr>
        </thead>
        <tbody className="text-neutral-200">
          {inputs.map((x) => (
            <tr key={x} className="border-t border-neutral-800">
              <td className="px-3 py-2 font-mono text-cyan-200">{x}</td>
              <td className="px-3 py-2 font-mono text-emerald-300">{fn(x)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* --------------------------------- RECAP LIST ----------------------------- */
export function RecapList({ items }: { items: string[] }) {
  return (
    <div className="my-6 applet-card">
      <div className="applet-header">Recap</div>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-300">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------ CHECK YOUR INTUITION ---------------------- */
export function CheckYourIntuition({
  questions,
}: {
  questions: { prompt: string; options: string[]; correct: number }[];
}) {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  return (
    <div className="my-6 applet-card">
      <div className="applet-header">Check Your Intuition</div>
      <div className="mt-3 space-y-4">
        {questions.map((q, qi) => {
          const sel = answers[qi] ?? null;
          const isCorrect = sel !== null && sel === q.correct;
          const isWrong = sel !== null && sel !== q.correct;
          return (
            <div key={qi} className="rounded-md border border-neutral-800 p-3">
              <div className="text-neutral-200">{q.prompt}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {q.options.map((op, oi) => (
                  <button
                    key={oi}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [qi]: oi }))
                    }
                    className={`rounded px-3 py-1 text-sm transition-colors ${
                      sel === oi
                        ? "border border-cyan-500/50 bg-neutral-900 text-cyan-200"
                        : "border border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700"
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
              {isCorrect && (
                <div className="mt-2 text-sm font-mono text-emerald-300">
                  Correct!
                </div>
              )}
              {isWrong && (
                <div className="mt-2 text-sm font-mono text-rose-300">
                  Not quite — try again.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------ EVALUATE APPLET --------------------------- */
export function EvaluateApplet({
  expression,
  fn,
}: {
  expression: string;
  fn: (x: number) => number;
}) {
  const [val, setVal] = useState(0);
  const result = useMemo(() => {
    try {
      return fn(val);
    } catch {
      return null;
    }
  }, [fn, val]);

  return (
    <div className="my-6 applet-card">
      <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="font-mono text-lg text-cyan-200 md:text-xl">
          Evaluate: <code className="text-cyan-300">{expression}</code>
        </div>
        <div className="flex items-center gap-2 font-mono text-lg md:text-xl">
          When: <span className="text-amber-300">x</span> =
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(parseInt(e.target.value || "0", 10))}
            className="w-16 rounded-md border border-neutral-700 bg-neutral-900 p-1 text-center font-mono text-amber-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
        </div>
      </div>

      <input
        type="range"
        min={-10}
        max={10}
        step={1}
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value, 10))}
        className="w-full"
      />

      <div className="mt-6 border-t border-cyan-500/30 pt-4 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.32em] text-teal-200">
          Result
        </div>
        <div className="font-mono text-3xl font-bold text-emerald-300">
          {result === null ? "—" : result}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- CONSTANT vs VARIABLE ------------------------ */
export function ConstantVsVariableSorter() {
  const initial = [
    { id: 1, text: "5", type: "const" as const },
    { id: 2, text: "x", type: "var" as const },
    { id: 3, text: "y", type: "var" as const },
    { id: 4, text: "-10", type: "const" as const },
    { id: 5, text: "a", type: "var" as const },
    { id: 6, text: "2.5", type: "const" as const },
  ];
  type ItemStatus = 'unclassified' | 'const' | 'var' | 'wrong';
  const [items, setItems] = useState(
    initial.map((item) => ({ ...item, status: 'unclassified' as ItemStatus }))
  );

  const classify = (id: number, type: "const" | "var") => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        if (it.type === type) return { ...it, status: type };
        return { ...it, status: "wrong" as const };
      })
    );
    // Auto reset wrong state after a moment
    setTimeout(() =>
      setItems((prev) => prev.map((it) => (it.status === "wrong" ? { ...it, status: "unclassified" as const } : it))),
    800);
  };

  const reset = () =>
    setItems(initial.map((it) => ({ ...it, status: "unclassified" as const })));

  const Section = ({
    title,
    list,
  }: {
    title: string;
    list: { id: number; text: string; status: string }[];
  }) => (
    <div className="flex-1 rounded-md border border-neutral-800 bg-neutral-950 p-3">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
        {title}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {list.map((it) => (
          <span
            key={it.id}
            className={`rounded border px-2 py-1 font-mono ${
              it.status === "wrong"
                ? "border-rose-500/40 bg-rose-500/10 text-rose-300"
                : "border-neutral-700 bg-neutral-900 text-cyan-200"
            }`}
          >
            {it.text}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="my-6 applet-card">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-neutral-100">
          Click to classify: constant vs variable
        </h4>
        <button
          onClick={reset}
          className="rounded border border-neutral-700 bg-neutral-900 px-3 py-1 text-sm text-neutral-300 hover:border-cyan-500/50 hover:text-cyan-200"
        >
          Reset
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Section title="Unclassified" list={items.filter((i) => i.status === "unclassified")} />
        <Section title="Constants" list={items.filter((i) => i.status === "const")} />
        <Section title="Variables" list={items.filter((i) => i.status === "var")} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items
          .filter((i) => i.status === "unclassified")
          .map((i) => (
            <div key={i.id} className="flex items-center gap-2">
              <button
                onClick={() => classify(i.id, "const")}
                className="rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm text-neutral-300 hover:border-cyan-500/50 hover:text-cyan-200"
              >
                {i.text} → const
              </button>
              <button
                onClick={() => classify(i.id, "var")}
                className="rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm text-neutral-300 hover:border-cyan-500/50 hover:text-cyan-200"
              >
                {i.text} → var
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
