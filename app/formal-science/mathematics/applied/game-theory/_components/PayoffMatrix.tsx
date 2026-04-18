"use client";
import React, { useState } from 'react';
import { Swords, Handshake, RotateCcw, AlertTriangle } from 'lucide-react';

export default function PayoffMatrix() {
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [lastMove, setLastMove] = useState<{p1: string, p2: string, p1Earned: number, p2Earned: number} | null>(null);

  // Classic Prisoner's Dilemma Payoffs (P1, P2)
  const payoffs = {
    'CC': [3, 3], // Mutual Cooperation
    'CD': [0, 5], // P1 Cooperates (Sucker), P2 Defects (Temptation)
    'DC': [5, 0], // P1 Defects (Temptation), P2 Cooperates (Sucker)
    'DD': [1, 1], // Mutual Defection (Nash Equilibrium)
  };

  const playRound = (p1Choice: 'C' | 'D') => {
    // Opponent acts randomly for this simulation
    const p2Choice = Math.random() > 0.5 ? 'C' : 'D';
    const key = `${p1Choice}${p2Choice}` as keyof typeof payoffs;
    
    const [p1Earned, p2Earned] = payoffs[key];
    
    setP1Score(s => s + p1Earned);
    setP2Score(s => s + p2Earned);
    setLastMove({ p1: p1Choice, p2: p2Choice, p1Earned, p2Earned });
  };

  const reset = () => {
    setP1Score(0); setP2Score(0); setLastMove(null);
  };

  const getCellClass = (p1: string, p2: string) => {
    const isActive = lastMove?.p1 === p1 && lastMove?.p2 === p2;
    return `flex flex-col items-center justify-center p-4 border rounded-xl transition-all duration-300 ${
      isActive 
        ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-105 z-10' 
        : 'bg-black/40 border-white/10 opacity-70'
    }`;
  };

  return (
    <div className="w-full h-full bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden font-mono flex flex-col">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      <div className="relative z-10 flex justify-between items-center mb-8 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-1">
            <Swords size={18} />
            <h3 className="font-bold uppercase tracking-widest text-sm">The Prisoner's Dilemma</h3>
          </div>
          <div className="text-[10px] text-slate-500 tracking-widest uppercase">Payoff Matrix Simulator</div>
        </div>
        <button onClick={reset} className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-slate-400 transition-colors">
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-12 flex-1 items-center">
        
        {/* MATRIX BOARD */}
        <div className="relative w-full lg:w-3/5 aspect-square max-w-md mx-auto">
          {/* Labels */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400 tracking-widest uppercase">Opponent</div>
          <div className="absolute top-1/2 -left-12 -translate-y-1/2 -rotate-90 text-xs font-bold text-amber-400 tracking-widest uppercase">You</div>
          
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full pt-4 pl-4">
            {/* CC */}
            <div className={getCellClass('C', 'C')}>
              <span className="text-[10px] text-slate-500 mb-2 uppercase tracking-widest">Mutual Reward</span>
              <div className="text-2xl font-black text-white">+3, +3</div>
            </div>
            {/* CD */}
            <div className={getCellClass('C', 'D')}>
              <span className="text-[10px] text-slate-500 mb-2 uppercase tracking-widest text-center">Opponent Betrays</span>
              <div className="text-2xl font-black text-white"><span className="text-amber-400">0</span>, 5</div>
            </div>
            {/* DC */}
            <div className={getCellClass('D', 'C')}>
              <span className="text-[10px] text-slate-500 mb-2 uppercase tracking-widest text-center">You Betray</span>
              <div className="text-2xl font-black text-white"><span className="text-amber-400">5</span>, 0</div>
            </div>
            {/* DD */}
            <div className={getCellClass('D', 'D')}>
              <span className="text-[10px] text-slate-500 mb-2 uppercase tracking-widest">Nash Equilibrium</span>
              <div className="text-2xl font-black text-white">+1, +1</div>
            </div>
          </div>
        </div>

        {/* CONTROLS & SCORE */}
        <div className="w-full lg:w-2/5 flex flex-col gap-8">
          <div className="flex gap-4">
            <div className="flex-1 p-4 bg-amber-950/30 border-l-2 border-amber-500 rounded-r-xl">
              <div className="text-[10px] text-amber-500/80 uppercase tracking-widest mb-1">Your Score</div>
              <div className="text-4xl font-black text-amber-400">{p1Score}</div>
            </div>
            <div className="flex-1 p-4 bg-slate-900/50 border-l-2 border-slate-500 rounded-r-xl">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Opponent Score</div>
              <div className="text-4xl font-black text-white">{p2Score}</div>
            </div>
          </div>

          <div className="space-y-4 mt-auto">
            <div className="text-xs text-center text-slate-400 uppercase tracking-widest mb-2">Make Your Move</div>
            <button 
              onClick={() => playRound('C')}
              className="w-full flex items-center justify-center gap-3 p-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              <Handshake size={18} /> Cooperate
            </button>
            <button 
              onClick={() => playRound('D')}
              className="w-full flex items-center justify-center gap-3 p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              <AlertTriangle size={18} /> Defect (Betray)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}