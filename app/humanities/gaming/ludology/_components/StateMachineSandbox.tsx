"use client";
import React, { useState } from 'react';
import { Play, Pause, RefreshCcw, Skull, Trophy, ArrowRight } from 'lucide-react';

type GameState = 'IDLE' | 'PLAYING' | 'VICTORY' | 'DEFEAT';

export default function StateMachineSandbox() {
  const [gameState, setGameState] = useState<GameState>('IDLE');

  const transitions = {
    IDLE: [{ label: 'Start Game', target: 'PLAYING', icon: Play, color: 'text-emerald-400', bg: 'bg-emerald-950/50', border: 'border-emerald-500/30' }],
    PLAYING: [
      { label: 'Pause', target: 'IDLE', icon: Pause, color: 'text-amber-400', bg: 'bg-amber-950/50', border: 'border-amber-500/30' },
      { label: 'Win', target: 'VICTORY', icon: Trophy, color: 'text-sky-400', bg: 'bg-sky-950/50', border: 'border-sky-500/30' },
      { label: 'Lose', target: 'DEFEAT', icon: Skull, color: 'text-rose-400', bg: 'bg-rose-950/50', border: 'border-rose-500/30' }
    ],
    VICTORY: [{ label: 'Play Again', target: 'IDLE', icon: RefreshCcw, color: 'text-emerald-400', bg: 'bg-emerald-950/50', border: 'border-emerald-500/30' }],
    DEFEAT: [{ label: 'Respawn', target: 'IDLE', icon: RefreshCcw, color: 'text-emerald-400', bg: 'bg-emerald-950/50', border: 'border-emerald-500/30' }]
  };

  return (
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md font-sans my-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6 border-b border-neutral-800 pb-4">
        <div>
          <h3 className="text-xl font-black text-white">State Machine Architecture</h3>
          <p className="text-xs text-neutral-400 font-mono mt-1">Interactive Sandbox: Transition Logic</p>
        </div>
        <div className="px-3 py-1 bg-black rounded-lg border border-neutral-800 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
          Current State: <span className="text-white font-bold">{gameState}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-8">
        
        {/* Current State Node */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full bg-black border-2 border-rose-500 flex items-center justify-center shadow-[0_0_30px_rgba(159,18,57,0.3)]">
            <span className="text-sm font-black text-rose-400 uppercase tracking-widest">{gameState}</span>
          </div>
          <span className="text-[10px] text-neutral-500 font-mono uppercase">Active Node</span>
        </div>

        <ArrowRight className="text-neutral-700 hidden md:block" size={32} />

        {/* Available Transitions */}
        <div className="flex flex-col gap-3 min-w-[200px]">
          <span className="text-[10px] text-neutral-500 font-mono uppercase text-center mb-2">Available Actions</span>
          {transitions[gameState].map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.target}
                onClick={() => setGameState(action.target as GameState)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all hover:scale-105 ${action.bg} ${action.border} ${action.color}`}
              >
                <span className="text-xs font-bold uppercase tracking-widest">{action.label}</span>
                <Icon size={16} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}