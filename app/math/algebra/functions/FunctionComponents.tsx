// app/math/algebra/functions/FunctionComponents.tsx
"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  X,
  Database,
  Waypoints,
  ScanLine,
  Factory,
  HelpCircle,
} from "@/components/icons";

/* -------------------------------------- */
/* 1. FUNCTION MACHINE (Section 1 & 2)    */
/* -------------------------------------- */
export function FunctionMachineWidget() {
  const [input, setInput] = useState<number | string>(3);
  const [output, setOutput] = useState<number | null>(7);
  const [rule, setRule] = useState("2x + 1");
  const [isProcessing, setIsProcessing] = useState(false);

  const processInput = () => {
    setIsProcessing(true);
    setOutput(null);
    const x = Number(input);
    let result: number;
    // This is a simple parser. A real implementation would use a math library.
    if (rule === "2x + 1") {
      result = 2 * x + 1;
    } else if (rule === "x²") {
      result = x * x;
    } else {
      result = x + 3;
    }

    setTimeout(() => {
      setOutput(result);
      setIsProcessing(false);
    }, 1000); // Simulate processing time
  };

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-4">
        Interactive: The Function Machine
      </h4>
      <div className="flex justify-center items-center gap-4">
        {/* Input */}
        <div className="flex flex-col items-center">
          <label className="text-sm text-neutral-400">INPUT (x)</label>
          <input
            type="number"
            value={input}
            onChange={(e) => {
              setInput(e.target.value === "" ? "" : Number(e.target.value));
              setOutput(null);
            }}
            className="w-20 rounded-md border border-neutral-700 bg-neutral-900
                       p-2 text-center font-mono text-xl text-white
                       focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <ArrowRight className="h-8 w-8 text-neutral-500 mt-4" />

        {/* Machine */}
        <div
          className={`relative w-32 h-20 rounded-lg bg-neutral-900 border border-neutral-700
                      flex items-center justify-center font-mono text-pink-400 text-lg
                      ${
                        isProcessing
                          ? "animate-pulse border-pink-500"
                          : "border-pink-500/50"
                      }`}
        >
          {isProcessing ? (
            <div className="w-4 h-4 bg-pink-500 rounded-full animate-ping" />
          ) : (
            `f(x) = ${rule}`
          )}
        </div>

        <ArrowRight className="h-8 w-8 text-neutral-500 mt-4" />

        {/* Output */}
        <div className="flex flex-col items-center">
          <label className="text-sm text-neutral-400">OUTPUT (f(x))</label>
          <div
            className="w-20 h-12 rounded-md bg-neutral-900 p-2 text-center 
                       font-mono text-xl text-green-300 font-bold
                       flex items-center justify-center"
          >
            {output}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={processInput}
          disabled={isProcessing}
          className="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white
                     transition hover:bg-blue-500
                     disabled:cursor-not-allowed disabled:bg-neutral-600"
        >
          Run Machine
        </button>
        <select
          value={rule}
          onChange={(e) => {
            setRule(e.target.value);
            setOutput(null);
          }}
          className="rounded-md border border-neutral-700 bg-neutral-800 p-2
                     text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
        >
          <option>2x + 1</option>
          <option>x²</option>
          <option>x + 3</option>
        </select>
      </div>
    </div>
  );
}

/* -------------------------------------- */
/* 5. MAPPING DIAGRAM (Section 5)         */
/* -------------------------------------- */
export function MappingDiagram() {
  const [isFunction, setIsFunction] = useState(true);

  const goodMap = {
    inputs: [1, 2, 3, 4],
    outputs: ["A", "B", "C"],
  };
  const badMap = {
    inputs: [1, 2, 3],
    outputs: ["A", "B", "C", "D"],
  };

  const map = isFunction ? goodMap : badMap;

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-4">
        Interactive: The "One Output" Rule
      </h4>
      {/* Toggle */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsFunction(!isFunction)}
          className="relative flex items-center rounded-full bg-neutral-900 border border-neutral-700 p-1"
        >
          <span
            className={`relative z-10 px-4 py-1 rounded-full text-sm font-medium transition-colors
            ${isFunction ? "text-green-300" : "text-neutral-400"}`}
          >
            ✅ Is a Function
          </span>
          <span
            className={`relative z-10 px-4 py-1 rounded-full text-sm font-medium transition-colors
            ${!isFunction ? "text-red-300" : "text-neutral-400"}`}
          >
            ❌ Not a Function
          </span>
          {/* Sliding background */}
          <span
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-neutral-700/50
            transition-transform duration-300 ease-out-cubic
            ${
              !isFunction
                ? "translate-x-[calc(100%-4px)]"
                : "translate-x-[4px]"
            }`}
          />
        </button>
      </div>
      {/* Visualizer */}
      <div className="flex justify-around items-center h-48 relative">
        {/* SVG lines would go here */}
        {/* Inputs (Domain) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-neutral-400">INPUT (Domain)</label>
          {map.inputs.map((i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-lg bg-blue-900 border border-blue-600
                         flex items-center justify-center font-mono text-white text-lg"
            >
              {i}
            </div>
          ))}
        </div>
        {/* Outputs (Range) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-neutral-400">OUTPUT (Range)</label>
          {map.outputs.map((o) => (
            <div
              key={o}
              className="w-12 h-12 rounded-lg bg-pink-900 border border-pink-600
                         flex items-center justify-center font-mono text-white text-lg"
            >
              {o}
            </div>
          ))}
        </div>
        {/* Placeholder for lines */}
        <p className="absolute text-neutral-500 text-sm">
          (Line mapping placeholder)
        </p>
      </div>
      <p className="text-center text-sm text-neutral-400 mt-2">
        {isFunction
          ? "Each input has exactly one output. (It's okay for two inputs to share an output!)"
          : "The input '2' has two different outputs, so this is NOT a function."}
      </p>
    </div>
  );
}

/* -------------------------------------- */
/* 6. VERTICAL LINE TEST (Section 6)      */
/* -------------------------------------- */
export function VerticalLineTest() {
  const [isFunction, setIsFunction] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  const path = isFunction
    ? "M 0 60 Q 50 10, 100 60 T 200 60" // A parabola (function)
    : "M 100 0 A 60 60 0 1 0 100 120 A 60 60 0 1 0 100 0"; // A circle (not a function)

  return (
    <div className="glass my-6 rounded-lg border border-neutral-800 p-6 shadow-md">
      <h4 className="text-lg font-semibold text-neutral-200 text-center mb-4">
        Interactive: The Vertical Line Test
      </h4>
      {/* Graph Area */}
      <div className="relative w-full max-w-sm h-36 mx-auto bg-neutral-900/50 rounded-lg overflow-hidden">
        <svg
          viewBox="0 0 200 120"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d={path}
            stroke={isFunction ? "#3b82f6" : "#ec4899"}
            strokeWidth="3"
            fill="none"
          />
        </svg>
        {/* The Scanning Line */}
        {isScanning && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-yellow-300 shadow-lg"
            style={{
              animation: "scan 3s linear infinite",
            }}
          />
        )}
      </div>
      {/* Controls */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setIsFunction(!isFunction)}
          className="rounded-md bg-neutral-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Toggle Graph
        </button>
        <button
          onClick={() => setIsScanning(!isScanning)}
          className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white"
        >
          {isScanning ? "Stop Scan" : "Start Scan"}
        </button>
      </div>
      <p className="text-center text-sm text-neutral-400 mt-4">
        If the scanning line hits the graph more than once, it's{" "}
        <strong>not a function</strong>.
      </p>
    </div>
  );
}

/* -------------------------------------- */
/* 12. FUNCTION FACTORY QUIZ (Section 12) */
/* -------------------------------------- */
const quizQuestions = [
  {
    q: "f(x) = x + 5. What is f(3)?",
    options: ["3", "5", "8"],
    a: 2,
  },
  {
    q: "f(x) = 3x - 1. What is f(2)?",
    options: ["5", "6", "2"],
    a: 0,
  },
  {
    q: "f(x) = x². What is f(4)?",
    options: ["8", "16", "4"],
    a: 1,
  },
];

export function FunctionFactoryQuiz() {
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
      <div className="glass my-6 rounded-lg border-pink-500/50 border-2 bg-pink-900/20 p-6 shadow-xl text-center">
        <h4 className="text-2xl font-bold text-pink-300 mb-2">
          Production Run Complete!
        </h4>
        <p className="text-xl text-neutral-200">
          You scored {score} out of {quizQuestions.length}
        </p>
        <button
          onClick={handleRestart}
          className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          New Shift
        </button>
      </div>
    );
  }

  const question = quizQuestions[currentQ];

  return (
    <div className="glass my-6 rounded-lg border-pink-500/50 border-2 bg-pink-900/20 p-6 shadow-xl">
      <h4 className="text-lg font-semibold text-neutral-200 mb-4 flex justify-between">
        <span>
          <Factory className="inline h-5 w-5 mr-2 text-pink-400" />
          Function Factory: Order {currentQ + 1}
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
        className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg 
                   transition-colors disabled:bg-neutral-600 disabled:cursor-not-allowed"
      >
        {wasWrong ? "Try Again" : "Build It!"}
      </button>
    </div>
  );
}