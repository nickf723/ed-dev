"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Check, AlertTriangle, Play } from 'lucide-react';

export default function ExpressionSolverLab() {
  const [level, setLevel] = useState(0);
  const [error, setError] = useState(false);
  
  // The Levels. Each 'step' is the substring that MUST be clicked next.
  const levels = [
    {
      equation: "3 + 4 × 2",
      steps: [
        { target: "4 × 2", result: "8", full: "3 + 8" },
        { target: "3 + 8", result: "11", full: "11" }
      ],
      hint: "Multiply before you Add."
    },
    {
      equation: "10 - 2 + 5",
      steps: [
        { target: "10 - 2", result: "8", full: "8 + 5" },
        { target: "8 + 5", result: "13", full: "13" }
      ],
      hint: "Add/Sub are equal! Go Left to Right."
    },
    {
      equation: "(2 + 3) × 4",
      steps: [
        { target: "2 + 3", result: "5", full: "5 × 4" },
        { target: "5 × 4", result: "20", full: "20" }
      ],
      hint: "Parentheses always come first."
    },
    {
      equation: "6² ÷ 9 + 1",
      steps: [
        { target: "6²", result: "36", full: "36 ÷ 9 + 1" },
        { target: "36 ÷ 9", result: "4", full: "4 + 1" },
        { target: "4 + 1", result: "5", full: "5" }
      ],
      hint: "Exponents, then Divide, then Add."
    }
  ];

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [displayEq, setDisplayEq] = useState(levels[0].equation);

  // Reset when level changes
  useEffect(() => {
    setCurrentStepIdx(0);
    setDisplayEq(levels[level].equation);
    setError(false);
  }, [level]);

  // Handle User Click
  // We parse the string to make clickable zones. 
  // Simplified for this demo: We render specific distinct parts based on the logic.
  
  const currentLevelData = levels[level];
  const nextRequired = currentLevelData.steps[currentStepIdx];
  const isComplete = currentStepIdx >= currentLevelData.steps.length;

  const handlePartClick = (partStr: string) => {
    if (isComplete) return;

    // Normalize for comparison (remove spaces)
    const clicked = partStr.replace(/\s/g, '');
    const needed = nextRequired.target.replace(/\s/g, '');

    if (clicked === needed) {
      // Success
      setDisplayEq(nextRequired.full);
      setCurrentStepIdx(s => s + 1);
      setError(false);
    } else {
      // Fail
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  // Parser helper to split the equation into clickable chunks
  // This is a naive splitter for demonstration. In a real app, use an AST parser.
  const getChunks = () => {
    if (isComplete) return [{ text: displayEq, id: 'final' }];
    
    // Hardcoded chunks for the specific levels to ensure the demo works smoothly
    // Level 0: "3 + ", "4 x 2"
    if (level === 0 && currentStepIdx === 0) return [{text:"3 + ", id:"wrong"}, {text:"4 × 2", id:"right"}];
    if (level === 0 && currentStepIdx === 1) return [{text:"3 + 8", id:"right"}];

    // Level 1: "10 - 2", " + 5"
    if (level === 1 && currentStepIdx === 0) return [{text:"10 - 2", id:"right"}, {text:" + 5", id:"wrong"}];
    if (level === 1 && currentStepIdx === 1) return [{text:"8 + 5", id:"right"}];

    // Level 2: "(2 + 3)", " × 4"
    if (level === 2 && currentStepIdx === 0) return [{text:"2 + 3", id:"right", wrapper:"()"}, {text:" × 4", id:"wrong"}];
    if (level === 2 && currentStepIdx === 1) return [{text:"5 × 4", id:"right"}];

    // Level 3: "6²", " ÷ 9", " + 1"
    if (level === 3 && currentStepIdx === 0) return [{text:"6²", id:"right"}, {text:" ÷ 9", id:"wrong"}, {text:" + 1", id:"wrong"}];
    if (level === 3 && currentStepIdx === 1) return [{text:"36 ÷ 9", id:"right"}, {text:" + 1", id:"wrong"}];
    if (level === 3 && currentStepIdx === 2) return [{text:"4 + 1", id:"right"}];

    return [{ text: displayEq, id: 'unknown' }];
  };

  return (
    <div className="w-full bg-slate-900/90 border border-orange-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col min-h-[400px]">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <RefreshCw className="text-orange-400" size={16} /> Operation Deconstructor
        </h3>
        <div className="flex gap-2">
            {[0, 1, 2, 3].map(l => (
                <button 
                    key={l} onClick={() => setLevel(l)}
                    className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-all ${level === l ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-500'}`}
                >
                    {l+1}
                </button>
            ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        
        {/* Instruction */}
        {!isComplete && (
            <div className="absolute top-6 text-slate-400 text-xs uppercase tracking-widest font-bold">
                Click the next step
            </div>
        )}

        {/* The Expression */}
        <div className="flex gap-2 text-3xl md:text-5xl font-black text-white font-mono bg-black/40 p-6 rounded-2xl border border-white/10 shadow-2xl">
            {getChunks().map((chunk, i) => (
                <motion.button
                    key={i + chunk.text} // Re-render on text change
                    onClick={() => handlePartClick(chunk.text)}
                    whileHover={!isComplete ? { scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' } : {}}
                    whileTap={!isComplete ? { scale: 0.95 } : {}}
                    animate={error && chunk.id === 'wrong' ? { x: [0, -5, 5, -5, 5, 0], color: '#ef4444' } : { color: '#ffffff' }}
                    className={`rounded px-2 transition-colors ${chunk.wrapper ? 'border border-dashed border-slate-600' : ''}`}
                >
                    {chunk.wrapper ? `(${chunk.text})` : chunk.text}
                </motion.button>
            ))}
        </div>

        {/* Hint / Success Message */}
        <div className="mt-8 h-8 text-center">
            {isComplete ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-500/30">
                    <Check size={18} /> Solved Correctly!
                </motion.div>
            ) : (
                <div className={`text-sm font-medium transition-colors ${error ? 'text-red-400 animate-pulse' : 'text-orange-400'}`}>
                    {error ? "Incorrect Order! Try Again." : currentLevelData.hint}
                </div>
            )}
        </div>

      </div>
      
      {/* Footer Progress */}
      <div className="h-1 w-full bg-slate-800">
          <motion.div 
            className="h-full bg-orange-500"
            animate={{ width: `${(currentStepIdx / currentLevelData.steps.length) * 100}%` }}
          />
      </div>
    </div>
  );
}