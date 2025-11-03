"use client";

import React, { useMemo, useState } from "react";

/* -------------------------------------------------- */
/* 1. Coordinate Plane Explorer                       */
/* -------------------------------------------------- */
type QuadrantKey = "I" | "II" | "III" | "IV" | "Axes";

const QUADRANT_INFO: Record<QuadrantKey, { title: string; description: string }>
  = {
    I: {
      title: "Quadrant I",
      description:
        "Both x and y are positive here (x > 0, y > 0). You'll find points like (2, 3).",
    },
    II: {
      title: "Quadrant II",
      description:
        "x is negative, but y is positive (x < 0, y > 0). Points such as (-4, 5) live here.",
    },
    III: {
      title: "Quadrant III",
      description:
        "Both coordinates are negative (x < 0, y < 0). Think of (-2, -6).",
    },
    IV: {
      title: "Quadrant IV",
      description:
        "x is positive, y is negative (x > 0, y < 0). Points like (3, -1) fall here.",
    },
    Axes: {
      title: "On the Axes",
      description:
        "Any point with x = 0 or y = 0 lies on an axis. The origin (0, 0) is where both meet.",
    },
  };

export function CoordinatePlaneExplorer() {
  const [selected, setSelected] = useState<QuadrantKey>("I");
  const orderedCells: QuadrantKey[] = ["II", "I", "III", "IV"];

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-lg">
      <h4 className="text-lg font-semibold text-neutral-200">
        Coordinate Plane Explorer
      </h4>
      <p className="text-sm text-neutral-400">
        Tap a region to remember which sign patterns belong to each quadrant.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {orderedCells.map((cell) => {
          const isActive = cell === selected;
          return (
            <button
              key={cell}
              type="button"
              onClick={() => setSelected(cell)}
              className={`flex h-28 flex-col items-center justify-center rounded-lg border text-center text-sm font-medium transition-colors
                ${
                  isActive
                    ? "border-teal-400/70 bg-teal-400/20 text-teal-200"
                    : "border-neutral-700 bg-neutral-900/40 text-neutral-300 hover:border-teal-400/60 hover:text-teal-200"
                }`}
            >
              <span className="text-2xl font-bold">{cell}</span>
              <span className="mt-1 text-xs opacity-80">
                {cell === "II"
                  ? "(x < 0, y > 0)"
                  : cell === "III"
                  ? "(x < 0, y < 0)"
                  : cell === "IV"
                  ? "(x > 0, y < 0)"
                  : "(x > 0, y > 0)"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {(["I", "II", "III", "IV", "Axes"] as QuadrantKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setSelected(key)}
            className={`rounded-full px-4 py-1 text-xs font-semibold transition-colors
              ${
                selected === key
                  ? "bg-teal-500/80 text-black"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700/80"
              }`}
          >
            {key === "Axes" ? "Axes" : `Quadrant ${key}`}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-md border border-neutral-700 bg-neutral-900/40 p-4">
        <h5 className="text-sm font-semibold text-teal-300">
          {QUADRANT_INFO[selected].title}
        </h5>
        <p className="text-sm text-neutral-300">
          {QUADRANT_INFO[selected].description}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------- */
/* 2. Relation Type Checker                           */
/* -------------------------------------------------- */
type RelationExample = {
  name: string;
  pairs: string[];
  isFunction: boolean;
  reason: string;
};

const RELATION_EXAMPLES: RelationExample[] = [
  {
    name: "Table A",
    pairs: ["(1, 3)", "(2, 5)", "(3, 7)", "(4, 9)"],
    isFunction: true,
    reason: "Each x-value is used only once, so it passes the vertical line test.",
  },
  {
    name: "Table B",
    pairs: ["(1, 4)", "(1, 6)", "(2, 8)", "(3, 8)"],
    isFunction: false,
    reason: "x = 1 is paired with two different y-values.",
  },
  {
    name: "Table C",
    pairs: ["(-2, -3)", "(0, 1)", "(2, -3)", "(4, -3)"],
    isFunction: true,
    reason: "Repeated y-values are okay; every x still has only one output.",
  },
];

export function RelationTypeChecker() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  return (
    <div className="my-6 space-y-4">
      {RELATION_EXAMPLES.map((example) => {
        const isShown = revealed[example.name];
        return (
          <div
            key={example.name}
            className="glass rounded-lg border border-neutral-800 p-4"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h5 className="text-sm font-semibold text-sky-300">{example.name}</h5>
                <p className="font-mono text-base text-neutral-200">
                  {example.pairs.join(", ")}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setRevealed((prev) => ({
                    ...prev,
                    [example.name]: !prev[example.name],
                  }))
                }
                className="rounded-md border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-200 transition hover:bg-sky-500/20"
              >
                {isShown ? "Hide Answer" : "Is this a function?"}
              </button>
            </div>
            {isShown && (
              <div className="mt-3 rounded-md border border-neutral-700 bg-neutral-900/60 p-3 text-sm text-neutral-200">
                <p>
                  <strong>{example.isFunction ? "Yes" : "No"}.</strong>{" "}
                  {example.reason}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------- */
/* 3. Mapping Diagram Visual                          */
/* -------------------------------------------------- */
type MappingPair = {
  input: number;
  output: number;
};

type MappingDataset = {
  name: string;
  pairs: MappingPair[];
};

const mappingSets: MappingDataset[] = [
  {
    name: "Double It",
    pairs: [
      { input: -2, output: -4 },
      { input: -1, output: -2 },
      { input: 0, output: 0 },
      { input: 2, output: 4 },
    ],
  },
  {
    name: "Square Then Subtract",
    pairs: [
      { input: -2, output: 2 },
      { input: -1, output: 0 },
      { input: 1, output: 0 },
      { input: 3, output: 8 },
    ],
  },
];

export function MappingDiagram() {
  const [index, setIndex] = useState(0);
  const active = mappingSets[index];

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-neutral-100">
            Mapping Diagram
          </h4>
          <p className="text-sm text-neutral-400">
            Watch how each input connects to exactly one output in a function.
          </p>
        </div>
        <div className="flex gap-2">
          {mappingSets.map((set, i) => (
            <button
              key={set.name}
              type="button"
              onClick={() => setIndex(i)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors
                ${
                  i === index
                    ? "bg-fuchsia-500/80 text-black"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                }`}
            >
              {set.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="space-y-2">
          {active.pairs.map((pair, pairIndex) => (
            <div
              key={`input-${pairIndex}`}
              className="rounded-md border border-neutral-700 bg-neutral-900/40 px-4 py-2 text-center text-sm text-neutral-200"
            >
              {pair.input}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          {active.pairs.map((pair, pairIndex) => (
            <div key={`arrow-${pairIndex}`} className="relative h-12 w-20">
              <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-gradient-to-r from-sky-500/20 to-sky-400/80" />
              <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-sky-400/80" />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {active.pairs.map((pair, pairIndex) => (
            <div
              key={`output-${pairIndex}`}
              className="rounded-md border border-neutral-700 bg-neutral-900/40 px-4 py-2 text-center text-sm text-neutral-200"
            >
              {pair.output}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------- */
/* 4. Story to Graph Match                            */
/* -------------------------------------------------- */
const SCENARIOS = [
  {
    label: "Jogging pace increases steadily",
    answer: "Increasing line",
  },
  {
    label: "Water tank draining at a constant rate",
    answer: "Decreasing line",
  },
  {
    label: "Parking meter that stays full",
    answer: "Horizontal line",
  },
];

const GRAPH_CHOICES = ["Increasing line", "Decreasing line", "Horizontal line"];

export function GraphStoryMatch() {
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const score = useMemo(
    () =>
      SCENARIOS.filter((scenario) => choices[scenario.label] === scenario.answer)
        .length,
    [choices]
  );

  const allAnswered = SCENARIOS.every((scenario) => choices[scenario.label]);

  return (
    <div className="glass my-6 space-y-4 rounded-lg border border-neutral-800 p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-neutral-100">
            Story → Graph Match
          </h4>
          <p className="text-sm text-neutral-400">
            Choose the graph shape that best represents each situation.
          </p>
        </div>
        <button
          type="button"
          disabled={!allAnswered}
          onClick={() => setChecked(true)}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
            allAnswered
              ? "bg-teal-500/80 text-black hover:bg-teal-400"
              : "bg-neutral-800 text-neutral-500"
          }`}
        >
          Check answers
        </button>
      </div>

      <div className="space-y-3">
        {SCENARIOS.map((scenario) => (
          <div
            key={scenario.label}
            className="rounded-md border border-neutral-700 bg-neutral-900/40 p-4"
          >
            <p className="text-sm font-semibold text-neutral-200">
              {scenario.label}
            </p>
            <select
              className="mt-2 w-full rounded-md border border-neutral-700 bg-neutral-950/70 px-3 py-2 text-sm text-neutral-100"
              value={choices[scenario.label] ?? ""}
              onChange={(event) =>
                setChoices((prev) => ({
                  ...prev,
                  [scenario.label]: event.target.value,
                }))
              }
            >
              <option value="" disabled>
                Select a graph type
              </option>
              {GRAPH_CHOICES.map((choice) => (
                <option key={choice} value={choice}>
                  {choice}
                </option>
              ))}
            </select>
            {checked && (
              <p
                className={`mt-2 text-sm font-medium ${
                  choices[scenario.label] === scenario.answer
                    ? "text-teal-300"
                    : "text-rose-300"
                }`}
              >
                {choices[scenario.label] === scenario.answer
                  ? "Great match!"
                  : `Try again — think about whether the line should slope up, down, or stay flat.`}
              </p>
            )}
          </div>
        ))}
      </div>

      {checked && (
        <div className="rounded-md border border-neutral-700 bg-neutral-900/60 p-4 text-sm text-neutral-200">
          You matched {score} out of {SCENARIOS.length} stories correctly.
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------- */
/* 5. Plotting Checklist                              */
/* -------------------------------------------------- */
const PLOT_POINTS = [
  { label: "Plot point A (−3, 2)", coordinate: "A" },
  { label: "Plot point B (1, −4)", coordinate: "B" },
  { label: "Plot point C (4, 3)", coordinate: "C" },
];

export function PlottingChecklist() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const allDone = PLOT_POINTS.every((point) => completed[point.coordinate]);

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6">
      <h4 className="text-lg font-semibold text-neutral-100">Plotting Checklist</h4>
      <p className="text-sm text-neutral-400">
        Imagine plotting each point on graph paper. Check off each item as you
        picture it on the coordinate plane.
      </p>
      <ul className="mt-4 space-y-3">
        {PLOT_POINTS.map((point) => (
          <li key={point.coordinate} className="flex items-start gap-3">
            <input
              type="checkbox"
              id={`plot-${point.coordinate}`}
              checked={Boolean(completed[point.coordinate])}
              onChange={(event) =>
                setCompleted((prev) => ({
                  ...prev,
                  [point.coordinate]: event.target.checked,
                }))
              }
              className="mt-1 h-5 w-5 rounded border border-neutral-700 bg-neutral-900 text-teal-400 focus:ring-teal-400"
            />
            <label
              htmlFor={`plot-${point.coordinate}`}
              className="text-sm text-neutral-300"
            >
              {point.label}
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-md border border-neutral-700 bg-neutral-900/50 p-3 text-sm text-neutral-200">
        {allDone
          ? "Awesome! Those points build the skeleton of a graph."
          : "Keep going — plot each point carefully before drawing the line."}
      </div>
    </div>
  );
}

/* -------------------------------------------------- */
/* 6. Slope & Intercept Playground                     */
/* -------------------------------------------------- */
function describeSlope(slope: number) {
  if (slope > 0) return "Positive slope → the line rises as x increases.";
  if (slope < 0) return "Negative slope → the line falls as x increases.";
  return "Zero slope → this is a flat, horizontal line.";
}

export function SlopeInterceptPlayground() {
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(0);

  const interceptDescription = useMemo(() => {
    if (intercept === 0) {
      return "The line crosses the origin (0, 0).";
    }
    if (intercept > 0) {
      return `The line crosses the y-axis above the origin at (0, ${intercept}).`;
    }
    return `The line crosses the y-axis below the origin at (0, ${intercept}).`;
  }, [intercept]);

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6">
      <h4 className="text-lg font-semibold text-neutral-100">
        Slope &amp; Intercept Playground
      </h4>
      <p className="text-sm text-neutral-400">
        Adjust the sliders to explore the equation y = mx + b.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-neutral-200">
          <span className="flex items-center justify-between">
            <span>Slope (m)</span>
            <span className="font-mono">{slope.toFixed(1)}</span>
          </span>
          <input
            type="range"
            min={-5}
            max={5}
            step={0.5}
            value={slope}
            onChange={(event) => setSlope(Number(event.target.value))}
            className="accent-teal-400"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-neutral-200">
          <span className="flex items-center justify-between">
            <span>y-intercept (b)</span>
            <span className="font-mono">{intercept.toFixed(1)}</span>
          </span>
          <input
            type="range"
            min={-5}
            max={5}
            step={0.5}
            value={intercept}
            onChange={(event) => setIntercept(Number(event.target.value))}
            className="accent-fuchsia-400"
          />
        </label>
      </div>

      <div className="mt-6 space-y-3 rounded-md border border-neutral-700 bg-neutral-900/50 p-4 text-sm text-neutral-200">
        <p>
          Equation: <code className="text-teal-300">y = {slope.toFixed(1)}x + {intercept.toFixed(1)}</code>
        </p>
        <p>{describeSlope(slope)}</p>
        <p>{interceptDescription}</p>
      </div>
    </div>
  );
}