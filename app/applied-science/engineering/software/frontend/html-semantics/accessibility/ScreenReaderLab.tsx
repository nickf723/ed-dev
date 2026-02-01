"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ear, Play, AlertOctagon, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ScreenReaderLab() {
  const [mode, setMode] = useState<'bad' | 'good'>('bad');
  const [logs, setLogs] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState(false);

  // Logic to generate the "Screen Reader Output"
  const handleInteraction = (action: string) => {
    let announcement = "";
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 2 });

    if (mode === 'bad') {
      if (action === 'focus') announcement = "group"; // Divs are generic containers
      if (action === 'click') announcement = "clickable"; // Sometimes readers guess, often they say nothing specific
    } else {
      if (action === 'focus') announcement = "Button, Play Media, group"; // Semantic role + Label
      if (action === 'click') announcement = "pressed, Play Media"; // State change
    }
    
    setLogs(prev => [`[${timestamp}] SR_OUTPUT: "${announcement}"`, ...prev.slice(0, 4)]);
  };

  return (
    <div className="w-full bg-slate-900/90 border border-yellow-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-black/20 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Ear className="text-yellow-400" size={16} /> Virtual Screen Reader
        </h3>
        <div className="flex bg-slate-800 rounded p-1">
            <button 
                onClick={() => { setMode('bad'); setLogs([]); }}
                className={`px-3 py-1 text-[10px] font-bold uppercase rounded transition-colors ${mode === 'bad' ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
                Div Soup
            </button>
            <button 
                onClick={() => { setMode('good'); setLogs([]); }}
                className={`px-3 py-1 text-[10px] font-bold uppercase rounded transition-colors ${mode === 'good' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
                Semantic HTML
            </button>
        </div>
      </div>

      <div className="p-8 flex flex-col md:flex-row gap-8">
        {/* The Component Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[url('/grid-pattern.svg')] bg-slate-950 border border-white/5 rounded-xl">
           <p className="text-[10px] text-slate-500 uppercase font-bold mb-4">Interact with element below:</p>
           
           {/* THE ELEMENT */}
           {mode === 'bad' ? (
             <div 
                className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleInteraction('click')}
                onMouseEnter={() => handleInteraction('focus')} // Divs don't receive keyboard focus naturally!
             >
                <Play fill="white" className="text-white ml-1" />
             </div>
           ) : (
             <button
                className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 focus:ring-4 focus:ring-yellow-400 focus:outline-none transition-all"
                onClick={() => handleInteraction('click')}
                onFocus={() => { setIsFocus(true); handleInteraction('focus'); }}
                onBlur={() => setIsFocus(false)}
                aria-label="Play Media"
             >
                <Play fill="white" className="text-white ml-1" />
             </button>
           )}

           <div className="mt-6 text-xs font-mono text-slate-400 text-center">
             {mode === 'bad' ? (
               <span className="text-red-400">&lt;div onClick="..."&gt;</span>
             ) : (
               <span className="text-emerald-400">&lt;button aria-label="Play"&gt;</span>
             )}
           </div>
        </div>

        {/* The "Voice" Output Log */}
        <div className="flex-1 bg-black rounded-xl border border-white/10 p-4 font-mono text-xs overflow-hidden flex flex-col">
            <div className="text-slate-500 border-b border-white/10 pb-2 mb-2 flex justify-between">
                <span>NVDA_LOG_STREAM</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"/>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"/>
                    <div className="w-2 h-2 rounded-full bg-green-500"/>
                </div>
            </div>
            <div className="space-y-2 flex-1">
                {logs.length === 0 && <span className="text-slate-700 italic">// Waiting for focus event...</span>}
                {logs.map((log, i) => (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }}
                        key={i} 
                        className={i === 0 ? 'text-yellow-400 font-bold' : 'text-slate-500'}
                    >
                        {log}
                    </motion.div>
                ))}
            </div>
        </div>
      </div>

      <div className={`p-3 text-[10px] text-center font-bold uppercase transition-colors ${mode === 'bad' ? 'bg-red-900/20 text-red-400' : 'bg-emerald-900/20 text-emerald-400'}`}>
        {mode === 'bad' ? (
            <span className="flex items-center justify-center gap-2"><AlertOctagon size={12}/> Warning: Element not reachable via Keyboard (Tab)</span>
        ) : (
            <span className="flex items-center justify-center gap-2"><CheckCircle2 size={12}/> Success: Keyboard Focusable & Label Announced</span>
        )}
      </div>
    </div>
  );
}