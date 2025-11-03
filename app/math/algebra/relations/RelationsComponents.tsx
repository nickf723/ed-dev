"use client";

import React, { useMemo, useState } from "react";
// 1. UPDATED: Import new icons
import {
  TrendingDown,
  TrendingUp,
  Minus,
  Move,
  Dot,
  Table,
} from "@/components/icons";

/* -------------------------------------------------- */
/* 1. Coordinate Plane Explorer (Unchanged)           */
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
              className={`flex h-28 flex-col items-center justify-center rounded-lg border text-center text-sm font-medium transition-colors ${
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
            className={`rounded-full px-4 py-1 text-xs font-semibold transition-colors ${
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
/* 2. NEW: Interactive Plotter (Replaces Checklist)   */
/* -------------------------------------------------- */
const PLOT_POINTS = [
  {
    label: "A (-3, 2)",
    x: -3,
    y: 2,
    steps: "Start at Origin (0,0) → Go Left 3 → Go Up 2",
    color: "bg-teal-400",
  },
  {
    label: "B (1, -4)",
    x: 1,
    y: -4,
    steps: "Start at Origin (0,0) → Go Right 1 → Go Down 4",
    color: "bg-fuchsia-400",
  },
  {
    label: "C (4, 3)",
    x: 4,
    y: 3,
    steps: "Start at Origin (0,0) → Go Right 4 → Go Up 3",
    color: "bg-amber-400",
  },
];

// Helper to convert (x,y) to (left, top) percentage
// Grid is from -5 to 5 on both axes
const getPosition = (x: number, y: number) => {
  const left = ((x - -5) / (5 - -5)) * 100;
  const top = ((y - 5) / (-5 - 5)) * 100;
  return { left: `${left}%`, top: `${top}%` };
};

export function InteractivePlotter() {
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(PLOT_POINTS[0].steps);

  const togglePoint = (point: (typeof PLOT_POINTS)[0]) => {
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(point.label)) {
        next.delete(point.label);
      } else {
        next.add(point.label);
      }
      return next;
    });
    setCurrentStep(point.steps);
  };

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6">
      <h4 className="text-lg font-semibold text-neutral-100">
        Interactive Plotter
      </h4>
      <p className="text-sm text-neutral-400">
        Click the buttons to see how each point is plotted from the Origin.
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Graph */}
        <div className="relative aspect-square md:col-span-2 rounded-lg bg-neutral-900/50 p-4">
          {/* Axes */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-neutral-600" />
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-neutral-600" />
          {/* Origin Label */}
          <span className="absolute left-1/2 top-1/2 -translate-y-4 -translate-x-4 text-xs text-neutral-500">
            (0,0)
          </span>
          {/* Plotted Points */}
          {PLOT_POINTS.map((point) => (
            <div
              key={point.label}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-1 transition-all duration-300 ${
                visible.has(point.label)
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-0"
              }`}
              style={getPosition(point.x, point.y)}
            >
              <div
                className={`h-3 w-3 rounded-full ${point.color} ring-2 ring-black`}
              />
              <span
                className={`absolute left-1/2 top-1/2 -translate-y-6 text-sm font-semibold ${point.color.replace(
                  "bg",
                  "text",
                )}`}
              >
                {point.label}
              </span>
            </div>
          ))}
        </div>
        {/* Controls */}
        <div className="flex flex-col gap-3">
          {PLOT_POINTS.map((point) => (
            <button
              key={point.label}
              onClick={() => togglePoint(point)}
              className={`rounded-md border p-3 text-left transition-colors ${
                visible.has(point.label)
                  ? `${point.color.replace(
                      "bg",
                      "border",
                    )}/50 ${point.color.replace("bg", "bg")}/20`
                  : "border-neutral-700 bg-neutral-800/40 hover:bg-neutral-700/50"
              }`}
            >
              <span
                className={`font-semibold ${point.color.replace("bg", "text")}`}
              >
                {visible.has(point.label) ? "Hide" : "Show"} Point{" "}
                {point.label}
              </span>
            </button>
          ))}
          <div className="mt-4 rounded-md border border-neutral-700 bg-neutral-900 p-3 text-sm text-neutral-300">
            <span className="font-semibold text-teal-300">Instructions:</span>
            <p>{currentStep}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------- */
/* 3. NEW: Table to Graph                             */
/* -------------------------------------------------- */
const tablePoints = [
  { x: -2, y: -5 },
  { x: -1, y: -3 },
  { x: 0, y: -1 },
  { x: 1, y: 1 },
  { x: 2, y: 3 },
];

export function TableToGraph() {
  const [showGraph, setShowGraph] = useState(false);

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6">
      <h4 className="text-lg font-semibold text-neutral-100">
        From Table to Graph
      </h4>
      <p className="text-sm text-neutral-400">
        A table of values is just a list of ordered pairs. Let's plot the
        relation <code>y = 2x - 1</code>.
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr className="bg-neutral-800/50">
                <th className="border border-neutral-700 p-3 text-sm font-semibold text-teal-300">
                  x (Input)
                </th>
                <th className="border border-neutral-700 p-3 text-sm font-semibold text-fuchsia-300">
                  y (Output)
                </th>
                <th className="border border-neutral-700 p-3 text-sm font-semibold text-neutral-400">
                  Point (x, y)
                </th>
              </tr>
            </thead>
            <tbody>
              {tablePoints.map((point) => (
                <tr key={point.x} className="bg-neutral-900/40">
                  <td className="border border-neutral-700 p-3 text-center font-mono text-teal-300">
                    {point.x}
                  </td>
                  <td className="border border-neutral-700 p-3 text-center font-mono text-fuchsia-300">
                    {point.y}
                  </td>
                  <td className="border border-neutral-700 p-3 text-center font-mono text-neutral-400">
                    ({point.x}, {point.y})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => setShowGraph(!showGraph)}
            className="mt-4 w-full rounded-md bg-teal-600 px-4 py-2 font-semibold text-white transition hover:bg-teal-500"
          >
            {showGraph ? "Hide Graph" : "Plot these Points"}
          </button>
        </div>
        {/* Graph */}
        <div className="relative aspect-square rounded-lg bg-neutral-900/50 p-4">
          {/* Axes */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-neutral-600" />
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-neutral-600" />
          {/* Plotted Points */}
          {tablePoints.map((point) => (
            <div
              key={point.x}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${
                showGraph ? "opacity-100" : "opacity-0"
              }`}
              style={getPosition(point.x, point.y)}
            >
              <Dot className="h-4 w-4 text-teal-300" />
            </div>
          ))}
          {/* Connecting Line (SVG) */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 overflow-visible"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 0 L 100 100"
              stroke="#5eead4"
              strokeWidth="2"
              strokeDasharray="4"
              className={`transition-all duration-1000 ${
                showGraph ? "opacity-50" : "opacity-0"
              }`}
              style={{
                transform: "scale(0.8) translate(10px, 10px)", // Scale/translate to match points
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------- */
/* 4. UPGRADED: Graph Story Match                     */
/* -------------------------------------------------- */
const SCENARIOS = [
  {
    label: "A car cruising at a constant speed.",
    answer: "Horizontal line",
  },
  {
    label: "The height of a ball thrown into the air.",
    answer: "Increasing, then Decreasing",
  },
  {
    label: "A hot drink cooling down to room temperature.",
    answer: "Decreasing line",
  },
];

// 2. UPDATED: Choices are now visual
const GRAPH_CHOICES = [
  { name: "Increasing line", icon: TrendingUp },
  { name: "Decreasing line", icon: TrendingDown },
  { name: "Horizontal line", icon: Minus },
  { name: "Increasing, then Decreasing", icon: Move }, // Placeholder icon
];

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

      <div className="space-y-4">
        {SCENARIOS.map((scenario) => (
          <div
            key={scenario.label}
            className="rounded-md border border-neutral-700 bg-neutral-900/40 p-4"
          >
            <p className="text-sm font-semibold text-neutral-200">
              {scenario.label}
            </p>
            {/* 3. UPDATED: Replaced <select> with buttons */}
            <div className="mt-3 flex flex-wrap gap-3">
              {GRAPH_CHOICES.map((choice) => (
                <button
                  key={choice.name}
                  onClick={() =>
                    setChoices((prev) => ({
                      ...prev,
                      [scenario.label]: choice.name,
                    }))
                  }
                  className={`flex items-center gap-2 rounded-lg border p-3 text-sm transition-all ${
                    choices[scenario.label] === choice.name
                      ? "border-teal-400/70 bg-teal-400/20 text-teal-200 ring-2 ring-teal-400"
                      : "border-neutral-700 bg-neutral-800/40 text-neutral-300 hover:bg-neutral-700/50"
                  }`}
                >
                  <choice.icon className="h-5 w-5" />
                  <span>{choice.name}</span>
                </button>
              ))}
            </div>
            {checked && (
              <p
                className={`mt-3 text-sm font-medium ${
                  choices[scenario.label] === scenario.answer
                    ? "text-teal-300"
                    : "text-rose-300"
                }`}
              >
                {choices[scenario.label] === scenario.answer
                  ? "Great match!"
                  : `Not quite. ${
                      scenario.answer === "Horizontal line"
                        ? "Think about what 'constant' speed means for the graph."
                        : scenario.answer === "Decreasing line"
                        ? "The temperature is going down, so the line should fall."
                        : "The ball goes up, then comes down."
                    }`}
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
/* 5. Slope & Intercept Playground (Unchanged)        */
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
          Equation:{" "}
          <code className="text-teal-300">
            y = {slope.toFixed(1)}x + {intercept.toFixed(1)}
          </code>
        </p>
        <p>{describeSlope(slope)}</p>
        <p>{interceptDescription}</p>
      </div>
    </div>
  );
}