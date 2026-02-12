"use client";
import React, { useState } from 'react';
import { GripVertical, CheckCircle, RotateCcw, AlertCircle } from 'lucide-react';

// The "Game" Data
const PROBLEM = {
  given: ["AD ≅ CD", "BD bisects ∠ADC"],
  prove: "ΔABD ≅ ΔCBD",
  steps: [
    { id: 1, statement: "AD ≅ CD", reason: "Given" },
    { id: 2, statement: "BD bisects ∠ADC", reason: "Given" },
    { id: 3, statement: "∠ADB ≅ ∠CDB", reason: "Definition of Bisector" },
    { id: 4, statement: "BD ≅ BD", reason: "Reflexive Property" },
    { id: 5, statement: "ΔABD ≅ ΔCBD", reason: "SAS Congruence" }
  ]
};

// Shuffle only the reasons for the user to solve
const CHOICES = [
  "Reflexive Property",
  "SAS Congruence",
  "Definition of Bisector",
  "SSS Congruence", // Distractor
  "Vertical Angles" // Distractor
];

export default function ProofBuilder() {
  const [slots, setSlots] = useState<string[]>(Array(5).fill(null));
  const [isCorrect, setIsCorrect] = useState(false);

  // Hardcoded for demo: Slot 2 -> Bisector, Slot 3 -> Reflexive, Slot 4 -> SAS
  // Note: Slots 0 and 1 are "Given" and pre-filled visually or logic-wise
  
  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const reason = e.dataTransfer.getData("text");
    const newSlots = [...slots];
    newSlots[index] = reason;
    setSlots(newSlots);
    checkWin(newSlots);
  };

  const checkWin = (currentSlots: string[]) => {
      // Simple validation logic
      if (
          currentSlots[2] === "Definition of Bisector" &&
          currentSlots[3] === "Reflexive Property" &&
          currentSlots[4] === "SAS Congruence"
      ) {
          setIsCorrect(true);
      }
  };

  const reset = () => {
      setSlots(Array(5).fill(null));
      setIsCorrect(false);
  };

  return (
    <div className="w-full bg-slate-900 border border-blue-500/30 rounded-xl p-8 shadow-2xl flex flex-col lg:flex-row gap-8">
        
        {/* LEFT: VISUAL REFERENCE */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
                {/* SVG of Adjacent Triangles (Kite shape) */}
                <svg width="200" height="200" viewBox="0 0 200 200" className="stroke-white stroke-2 fill-none">
                    {/* Triangle ABD (Left) */}
                    <path d="M100 20 L20 100 L100 180 Z" className={isCorrect ? "fill-green-500/20 stroke-green-400" : ""} />
                    {/* Triangle CBD (Right) */}
                    <path d="M100 20 L180 100 L100 180 Z" className={isCorrect ? "fill-green-500/20 stroke-green-400" : ""} />
                    {/* Shared Side BD */}
                    <line x1="100" y1="20" x2="100" y2="180" strokeDasharray="5,5" stroke="cyan" />
                    
                    {/* Labels */}
                    <text x="95" y="15" fill="white" fontSize="12" textAnchor="middle">D</text>
                    <text x="10" y="105" fill="white" fontSize="12">A</text>
                    <text x="190" y="105" fill="white" fontSize="12">C</text>
                    <text x="95" y="195" fill="white" fontSize="12" textAnchor="middle">B</text>
                    
                    {/* Tick Marks (Given) */}
                    <line x1="55" y1="55" x2="65" y2="65" stroke="yellow" strokeWidth="2" /> {/* AD */}
                    <line x1="135" y1="55" x2="145" y2="65" stroke="yellow" strokeWidth="2" /> {/* CD */}
                </svg>
            </div>
            
            <div className="text-sm text-slate-300 space-y-2 w-full">
                <div className="font-bold text-blue-400 uppercase text-xs tracking-widest">Given:</div>
                <ul className="list-disc list-inside font-mono text-xs">
                    {PROBLEM.given.map((g, i) => <li key={i}>{g}</li>)}
                </ul>
                <div className="font-bold text-blue-400 uppercase text-xs tracking-widest mt-4">Prove:</div>
                <div className="font-mono text-xs">{PROBLEM.prove}</div>
            </div>
        </div>

        {/* RIGHT: PROOF TABLE */}
        <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white uppercase">Proof Logic</h3>
                <button onClick={reset} className="p-2 hover:bg-white/10 rounded-full transition-colors"><RotateCcw size={16} /></button>
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-2 gap-px bg-slate-700 border border-slate-700 rounded-lg overflow-hidden mb-8">
                <div className="bg-slate-800 p-3 text-xs font-bold uppercase text-slate-400">Statements</div>
                <div className="bg-slate-800 p-3 text-xs font-bold uppercase text-slate-400">Reasons</div>

                {PROBLEM.steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        {/* Statement Column */}
                        <div className="bg-slate-900/80 p-3 text-sm font-mono text-white flex items-center border-b border-slate-800/50">
                            {index + 1}. {step.statement}
                        </div>
                        
                        {/* Reason Column (Drop Zone) */}
                        <div 
                            className={`p-2 border-b border-slate-800/50 transition-colors ${index < 2 ? 'bg-slate-900/50' : 'bg-slate-900 hover:bg-slate-800'}`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, index)}
                        >
                            {index < 2 ? (
                                <span className="text-slate-500 italic text-sm p-1">Given</span>
                            ) : slots[index] ? (
                                <div className={`px-3 py-2 rounded text-sm font-bold shadow-sm ${isCorrect ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
                                    {slots[index]}
                                </div>
                            ) : (
                                <div className="h-8 border-2 border-dashed border-slate-700 rounded flex items-center justify-center text-xs text-slate-600">
                                    Drop Reason Here
                                </div>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </div>

            {/* Draggable Bank */}
            {!isCorrect && (
                <div className="flex flex-wrap gap-3 p-4 bg-black/20 rounded-xl border border-white/5">
                    {CHOICES.map((choice) => (
                        <div
                            key={choice}
                            draggable
                            onDragStart={(e) => e.dataTransfer.setData("text", choice)}
                            className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-600 hover:border-blue-400 rounded cursor-grab active:cursor-grabbing text-sm text-slate-200 font-medium shadow-lg transition-all hover:-translate-y-1"
                        >
                            <GripVertical size={12} className="text-slate-500" />
                            {choice}
                        </div>
                    ))}
                </div>
            )}

            {isCorrect && (
                <div className="p-4 bg-green-900/20 border border-green-500/50 rounded-xl flex items-center gap-4 animate-in zoom-in">
                    <CheckCircle size={32} className="text-green-400" />
                    <div>
                        <div className="font-bold text-green-400 uppercase">Q.E.D. (Proven)</div>
                        <div className="text-xs text-green-200">Logic chain verified. The triangles are congruent.</div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}