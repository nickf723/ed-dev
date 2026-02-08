"use client";
import React, { useState } from 'react';
import { Play, RotateCcw, Waves, Mountain, Wind } from 'lucide-react';

export default function GeomorphologyLab() {
  const [timeline, setTimeline] = useState(0); // 0 to 100
  const [mode, setMode] = useState<'oxbow' | 'glacier'>('oxbow');

  return (
    <div className="w-full bg-white border border-stone-300 rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row h-[500px]">
      
      {/* SIDEBAR: CONTROLS */}
      <div className="w-full md:w-80 bg-stone-50 border-r border-stone-200 p-6 flex flex-col">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-6">Process Simulator</div>
          
          <div className="flex gap-2 mb-8">
              <button 
                onClick={() => { setMode('oxbow'); setTimeline(0); }}
                className={`flex-1 p-3 rounded-lg border text-center transition-all ${mode === 'oxbow' ? 'bg-blue-100 border-blue-400 text-blue-800 shadow-sm' : 'bg-white border-stone-200 text-stone-500 hover:border-blue-200'}`}
              >
                  <Waves size={20} className="mx-auto mb-1" />
                  <span className="text-xs font-bold uppercase">River Meander</span>
              </button>
              <button 
                onClick={() => { setMode('glacier'); setTimeline(0); }}
                className={`flex-1 p-3 rounded-lg border text-center transition-all ${mode === 'glacier' ? 'bg-cyan-100 border-cyan-400 text-cyan-800 shadow-sm' : 'bg-white border-stone-200 text-stone-500 hover:border-cyan-200'}`}
              >
                  <Mountain size={20} className="mx-auto mb-1" />
                  <span className="text-xs font-bold uppercase">Glaciation</span>
              </button>
          </div>

          <div className="mt-auto">
              <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-stone-700 uppercase">Timeline</span>
                  <span className="text-xs font-mono text-stone-500">T+{Math.floor(timeline * 100)} Years</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={timeline} 
                onChange={(e) => setTimeline(parseInt(e.target.value))}
                className="w-full accent-green-600 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="mt-4 text-xs text-stone-500 leading-relaxed italic">
                  {mode === 'oxbow' && timeline < 30 && "The river flows fast, creating a slight curve due to uneven erosion."}
                  {mode === 'oxbow' && timeline >= 30 && timeline < 70 && "Erosion on the outer bank exaggerates the curve. The neck narrows."}
                  {mode === 'oxbow' && timeline >= 70 && "The river cuts through the neck, abandoning the loop to form an Oxbow Lake."}
                  
                  {mode === 'glacier' && timeline < 30 && "A V-shaped river valley exists. Climate cools."}
                  {mode === 'glacier' && timeline >= 30 && timeline < 70 && "A massive glacier bulldozes the valley, widening the floor."}
                  {mode === 'glacier' && timeline >= 70 && "The ice retreats, leaving a deep U-shaped valley (Fjord/Trough)."}
              </p>
          </div>
      </div>

      {/* VISUALIZER */}
      <div className="flex-1 relative bg-[#eef2ff] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />

          {/* OXBOW ANIMATION */}
          {mode === 'oxbow' && (
              <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Ground */}
                  <rect x="0" y="0" width="400" height="300" fill="#dcfce7" />
                  
                  {/* River Path Calculation */}
                  {/* We use a bezier curve. 
                      Timeline modifies the control points to exaggerate the "S" shape.
                      At 100, we "cut" the loop.
                  */}
                  {timeline < 80 ? (
                      <path 
                        d={`M 0 150 C ${100 + timeline} ${50 - timeline}, ${300 - timeline} ${250 + timeline}, 400 150`}
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="20"
                        strokeLinecap="round"
                      />
                  ) : (
                      <>
                          {/* The New Straight Path */}
                          <path 
                            d="M 0 150 L 400 150"
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="20"
                          />
                          {/* The Abandoned Oxbow (Fading) */}
                          <path 
                            d="M 100 150 Q 200 350 300 150"
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="20"
                            opacity="0.6"
                          />
                      </>
                  )}
              </svg>
          )}

          {/* GLACIER ANIMATION */}
          {mode === 'glacier' && (
             <svg viewBox="0 0 400 300" className="w-full h-full">
                 <defs>
                     <linearGradient id="ice" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor="#e0f2fe" />
                         <stop offset="100%" stopColor="#bae6fd" />
                     </linearGradient>
                     <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor="#78716c" />
                         <stop offset="100%" stopColor="#57534e" />
                     </linearGradient>
                 </defs>

                 {/* Sky */}
                 <rect x="0" y="0" width="400" height="300" fill="#f0f9ff" />

                 {/* Mountains */}
                 {/* The Valley Shape changes from V to U based on Timeline */}
                 <path 
                    d={`M 0 300 L 0 100 L 100 50 L 200 ${200 - timeline} L 300 50 L 400 100 L 400 300 Z`}
                    fill="url(#ground)"
                 />
                 
                 {/* The Glacier (Ice) */}
                 {timeline > 20 && timeline < 80 && (
                     <path 
                        d="M 100 50 L 200 200 L 300 50"
                        fill="url(#ice)"
                        opacity={(timeline > 20 && timeline < 30) || (timeline > 70) ? 0.5 : 1}
                     />
                 )}

                 {/* U-Shape reveal */}
                 {timeline >= 80 && (
                     <path 
                        d="M 120 100 Q 200 250 280 100"
                        fill="#0ea5e9" // Water filling the fjord
                        opacity="0.5"
                     />
                 )}
             </svg>
          )}

      </div>
    </div>
  );
}