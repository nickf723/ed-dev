"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Divide, ArrowRight, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { M } from "@/components/Math";

const PROBLEMS = [
  {
    id: 1,
    integral: "\\int 2x \\cos(x^2) dx",
    options: [
        { u: "x^2", du: "2x dx", correct: true },
        { u: "\\cos(x^2)", du: "-\\sin(x^2) \\cdot 2x dx", correct: false },
        { u: "2x", du: "2 dx", correct: false }
    ],
    transformed: "\\int \\cos(u) du"
  },
  {
    id: 2,
    integral: "\\int e^{3x} dx",
    options: [
        { u: "e^{3x}", du: "3e^{3x} dx", correct: false },
        { u: "3x", du: "3 dx", correct: true },
        { u: "x", du: "1 dx", correct: false }
    ],
    transformed: "\\frac{1}{3} \\int e^u du"
  },
  {
    id: 3,
    integral: "\\int \\frac{(\\ln x)^2}{x} dx",
    options: [
        { u: "x", du: "1 dx", correct: false },
        { u: "(\\ln x)^2", du: "2\\frac{\\ln x}{x} dx", correct: false },
        { u: "\\ln x", du: "\\frac{1}{x} dx", correct: true }
    ],
    transformed: "\\int u^2 du"
  }
];

export default function USubstitutionWidget() {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  const current = PROBLEMS[index];

  const handleGuess = (isCorrect: boolean) => {
    if (isCorrect) {
        setStatus("correct");
    } else {
        setStatus("wrong");
        setTimeout(() => setStatus("idle"), 1000);
    }
  };

  const nextProblem = () => {
      setIndex((prev) => (prev + 1) % PROBLEMS.length);
      setStatus("idle");
  };

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Divide size={14} className="text-indigo-400" /> Pattern Matcher
        </h3>
        <span className="text-[10px] font-mono text-neutral-600">Level {index + 1}</span>
      </div>

      <div className="p-6 space-y-6">
        
        {/* The Problem Display */}
        <div className="flex items-center justify-center min-h-[100px] rounded-xl border border-indigo-500/20 bg-indigo-950/20 relative overflow-hidden">
            <AnimatePresence mode="wait">
                {status === "correct" ? (
                    <motion.div 
                        key="transformed"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="text-2xl text-green-400 font-bold"
                    >
                        <M>{current.transformed}</M>
                    </motion.div>
                ) : (
                    <motion.div
                        key="original"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-2xl text-white font-bold"
                    >
                        <M>{current.integral}</M>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Status Overlay */}
            {status === "wrong" && (
                <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center animate-pulse">
                    <XCircle size={40} className="text-red-500" />
                </div>
            )}
        </div>

        {/* Instructions */}
        <p className="text-center text-[11px] text-neutral-400">
            Choose the best <strong>u</strong> to simplify the integral.
        </p>

        {/* Options */}
        <div className="space-y-2">
            {current.options.map((opt, i) => (
                <button
                    key={i}
                    onClick={() => handleGuess(opt.correct)}
                    disabled={status === "correct"}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-all
                        ${status === "correct" && opt.correct 
                            ? "bg-green-500/20 border-green-500/50 text-green-200" 
                            : "bg-white/5 border-white/5 text-neutral-300 hover:bg-white/10 hover:border-indigo-500/30"}
                    `}
                >
                    <span className="font-mono"><M>{`u = ${opt.u}`}</M></span>
                    <span className="text-[10px] text-neutral-500 font-mono"><M>{`du = ${opt.du}`}</M></span>
                </button>
            ))}
        </div>

        {/* Next Button */}
        {status === "correct" && (
            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={nextProblem}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-indigo-500 transition-colors"
            >
                Next Problem <ArrowRight size={14} />
            </motion.button>
        )}

      </div>
    </div>
  );
}