"use client";
import React, { useState } from 'react';
import { Monitor, Zap, Box, Layers, AlertTriangle } from 'lucide-react';

const FEATURES = [
  { id: 'poly', label: 'High Poly Models', cost: 4.5, icon: Box },
  { id: 'res', label: '4K Resolution', cost: 6.2, icon: Monitor },
  { id: 'rtx', label: 'Ray Tracing', cost: 8.5, icon: Zap },
  { id: 'shadows', label: 'Soft Shadows', cost: 2.1, icon: Layers },
  { id: 'physics', label: 'Particle Physics', cost: 3.0, icon: Box },
];

export default function FrameBudget() {
  const [active, setActive] = useState<string[]>([]);

  const toggle = (id: string) => {
      setActive(prev => 
          prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      );
  };

  const baseCost = 2.0; // Engine overhead
  const currentCost = baseCost + active.reduce((sum, id) => sum + (FEATURES.find(f => f.id === id)?.cost || 0), 0);
  const budget = 16.6; // 60 FPS
  const fps = Math.floor(1000 / currentCost);
  const isLagging = currentCost > budget;

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-md border border-purple-500/30 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.2)] flex flex-col md:flex-row h-[450px]">
      
      {/* LEFT: CONTROLS */}
      <div className="w-full md:w-1/3 bg-slate-950 p-6 border-r border-slate-800">
          <div className="flex items-center gap-2 text-purple-400 font-bold uppercase tracking-widest text-xs mb-6">
              <Zap size={14} /> Graphics Settings
          </div>
          
          <div className="space-y-3">
              {FEATURES.map(f => {
                  const isActive = active.includes(f.id);
                  return (
                      <button
                        key={f.id}
                        onClick={() => toggle(f.id)}
                        className={`w-full flex items-center justify-between p-3 rounded border transition-all ${isActive ? 'bg-purple-900/40 border-purple-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                      >
                          <div className="flex items-center gap-3">
                              <f.icon size={16} />
                              <span className="text-sm font-bold">{f.label}</span>
                          </div>
                          <span className="text-xs font-mono opacity-70">+{f.cost}ms</span>
                      </button>
                  )
              })}
          </div>
      </div>

      {/* RIGHT: VISUALIZER */}
      <div className="flex-1 p-8 relative flex flex-col justify-center bg-slate-900">
          {/* Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />

          {/* FPS Counter */}
          <div className="absolute top-6 right-6 font-mono text-right">
              <div className={`text-6xl font-black tracking-tighter ${isLagging ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                  {fps}
              </div>
              <div className="text-xs text-slate-500 uppercase font-bold">Frames Per Second</div>
          </div>

          {/* The Bar */}
          <div className="mb-2 flex justify-between text-xs font-bold uppercase text-slate-400">
              <span>Frame Time</span>
              <span>Target: 16.6ms</span>
          </div>
          
          <div className="h-12 bg-slate-800 rounded-lg overflow-hidden border border-slate-700 relative mb-4">
              {/* Threshold Line */}
              <div className="absolute top-0 bottom-0 left-[calc((16.6/30)*100%)] w-0.5 bg-white z-10 opacity-50" />
              
              {/* Fill */}
              <div 
                className={`h-full transition-all duration-300 ${isLagging ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${(currentCost / 30) * 100}%` }}
              />
          </div>
          
          <div className="text-right font-mono text-xl text-white mb-8">
              {currentCost.toFixed(1)} ms
          </div>

          {/* Status Message */}
          <div className={`p-4 rounded border flex items-center gap-3 ${isLagging ? 'bg-red-900/20 border-red-500/50 text-red-200' : 'bg-green-900/20 border-green-500/50 text-green-200'}`}>
              {isLagging ? <AlertTriangle size={20} /> : <Monitor size={20} />}
              <div className="text-sm font-bold">
                  {isLagging ? "FRAME DROP DETECTED. Reduce settings." : "PERFORMANCE OPTIMAL. Gameplay smooth."}
              </div>
          </div>

      </div>
    </div>
  );
}