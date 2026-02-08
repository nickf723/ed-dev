"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, User, Users, AlertTriangle, ArrowRight } from 'lucide-react';

const SCENARIOS = [
  {
    id: 1,
    title: "The Trolley Problem",
    desc: "A runaway trolley is heading down a track where it will kill 5 workers. You can pull a lever to switch it to another track where it will kill 1 worker.",
    action: "Pull the Lever?",
    choices: [
        { label: "Do Nothing (Kill 5)", value: "deontology", feedback: "Deontology: You refused to actively kill. You adhered to the rule 'Do not kill', even if the consequence was worse." },
        { label: "Pull Lever (Kill 1)", value: "utilitarian", feedback: "Utilitarianism: You chose the outcome that saved the most lives (5 > 1). The ends justified the means." }
    ]
  },
  {
    id: 2,
    title: "The Transplant Surgeon",
    desc: "You have 5 patients dying of organ failure. A healthy traveler walks in. You could kill him and harvest his organs to save the 5.",
    action: "Harvest the Organs?",
    choices: [
        { label: "Do Nothing (5 Die)", value: "deontology", feedback: "Deontology: Correct. Using a human being as a mere 'means to an end' violates their rights, regardless of the outcome." },
        { label: "Kill Him (Save 5)", value: "utilitarian", feedback: "Extreme Utilitarianism: Mathematically consistent (5 > 1), but most people recoil. This exposes the 'flaw' in pure consequentialism." }
    ]
  }
];

export default function TrolleySimulator() {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const scenario = SCENARIOS[step];

  const handleChoice = (feedback: string) => {
      setResult(feedback);
  };

  const next = () => {
      setResult(null);
      setStep((prev) => (prev + 1) % SCENARIOS.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[400px]">
      
      {/* VISUALIZER (Left) */}
      <div className="w-full md:w-1/2 bg-slate-900 p-8 flex flex-col items-center justify-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
          
          <Train size={64} className="mb-8 text-amber-500 animate-bounce" />
          
          <div className="flex gap-12 w-full justify-center relative">
              {/* Track 1 */}
              <div className="flex flex-col items-center gap-2">
                  <div className="h-24 w-2 bg-slate-700 rounded-full" />
                  <div className="flex -space-x-2">
                      <Users size={24} className="text-red-500" />
                      <span className="text-xs font-bold bg-red-900 px-1 rounded">5</span>
                  </div>
              </div>

              {/* Track 2 */}
              <div className="flex flex-col items-center gap-2">
                   <div className="h-24 w-2 bg-slate-700 rounded-full rotate-12 origin-top" />
                   <div className="flex -space-x-2 translate-x-4">
                      <User size={24} className="text-yellow-500" />
                      <span className="text-xs font-bold bg-yellow-900 px-1 rounded">1</span>
                  </div>
              </div>
          </div>
          
          <div className="mt-8 text-center">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Scenario {step + 1}</div>
              <h3 className="text-2xl font-black uppercase">{scenario.title}</h3>
          </div>
      </div>

      {/* CONTROLS (Right) */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-stone-50">
          <AnimatePresence mode="wait">
              {!result ? (
                  <motion.div 
                    key="question"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                      <p className="text-stone-700 text-lg leading-relaxed font-serif">
                          {scenario.desc}
                      </p>
                      <h4 className="font-bold text-stone-900 uppercase tracking-wide flex items-center gap-2">
                          <AlertTriangle size={18} className="text-amber-600" /> {scenario.action}
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                          {scenario.choices.map((c, i) => (
                              <button
                                key={i}
                                onClick={() => handleChoice(c.feedback)}
                                className="p-4 bg-white border border-stone-300 rounded-lg shadow-sm hover:border-amber-500 hover:shadow-md transition-all text-left font-bold text-stone-700"
                              >
                                  {c.label}
                              </button>
                          ))}
                      </div>
                  </motion.div>
              ) : (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 text-center"
                  >
                      <div className="p-6 bg-slate-100 border-l-4 border-slate-800 text-left rounded-r-lg">
                          <p className="text-stone-800 leading-relaxed font-serif">
                              {result}
                          </p>
                      </div>
                      <button 
                        onClick={next}
                        className="px-8 py-3 bg-slate-900 text-white font-bold uppercase rounded-full hover:bg-slate-700 transition-colors flex items-center gap-2 mx-auto"
                      >
                          Next Experiment <ArrowRight size={16} />
                      </button>
                  </motion.div>
              )}
          </AnimatePresence>
      </div>

    </div>
  );
}