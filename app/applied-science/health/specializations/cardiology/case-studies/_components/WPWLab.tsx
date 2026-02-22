"use client";
import React, { useState } from 'react';
import { Zap, Activity, Repeat, Scissors } from 'lucide-react';

export default function WPWLab() {
  const [state, setState] = useState<'normal' | 'wpw' | 'svt'>('normal');

  // SVG Mapping for the Circuit
  const width = 300;
  const height = 400;

  // Nodes
  const saNode = { x: 100, y: 80 };
  const avNode = { x: 150, y: 200 };
  const ventricles = { x: 150, y: 320 };
  const bundleOfKent = { x: 220, y: 140 }; // The Rogue Wire bypass

  // ECG Generators
  const generateNormalECG = () => "M 0 50 L 20 50 Q 25 35 30 50 L 40 50 L 45 60 L 50 10 L 55 75 L 60 50 L 70 50 Q 80 30 90 50 L 150 50 L 170 50 Q 175 35 180 50 L 190 50 L 195 60 L 200 10 L 205 75 L 210 50 L 220 50 Q 230 30 240 50 L 300 50";
  
  // Notice the "slurred" upstroke (Delta wave) before the main spike
  const generateWPWECG = () => "M 0 50 L 20 50 Q 25 35 30 50 L 35 50 Q 45 40 50 10 L 55 75 L 60 50 L 70 50 Q 80 30 90 50 L 150 50 L 170 50 Q 175 35 180 50 L 185 50 Q 195 40 200 10 L 205 75 L 210 50 L 220 50 Q 230 30 240 50 L 300 50";
  
  // Rapid, narrow, infinite loop
  const generateSVTECG = () => "M 0 50 L 10 50 L 15 10 L 20 75 L 25 50 Q 35 30 45 50 L 55 50 L 60 10 L 65 75 L 70 50 Q 80 30 90 50 L 100 50 L 105 10 L 110 75 L 115 50 Q 125 30 135 50 L 145 50 L 150 10 L 155 75 L 160 50 Q 170 30 180 50 L 190 50 L 195 10 L 200 75 L 205 50 Q 215 30 225 50 L 235 50 L 240 10 L 245 75 L 250 50 Q 260 30 270 50 L 300 50";

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-yellow-500 flex items-center gap-2">
                <Zap size={14} /> The Circuit Board
            </div>
            
            <div className="flex gap-2">
                <button onClick={() => setState('normal')} className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors ${state === 'normal' ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-500 hover:text-white'}`}>Normal</button>
                <button onClick={() => setState('wpw')} className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors ${state === 'wpw' ? 'bg-yellow-600 text-white' : 'bg-neutral-800 text-neutral-500 hover:text-white'}`}>WPW</button>
                <button onClick={() => setState('svt')} className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors ${state === 'svt' ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-500 hover:text-white'}`}>SVT Loop</button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* LEFT: HEART WIRING DIAGRAM */}
            <div className="bg-black/20 relative p-8 flex justify-center items-center border-b md:border-b-0 md:border-r border-neutral-800">
                 <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[200px] h-auto drop-shadow-2xl">
                    
                    {/* Heart Outline */}
                    <path d="M 150 50 C 50 50, 20 150, 100 350 C 150 400, 150 400, 150 400 C 150 400, 150 400, 200 350 C 280 150, 250 50, 150 50 Z" fill="rgba(239, 68, 68, 0.05)" stroke="#3f1616" strokeWidth="4" />
                    
                    {/* Normal Pathway (SA -> AV -> Ventricles) */}
                    <path d={`M ${saNode.x} ${saNode.y} Q 120 140 ${avNode.x} ${avNode.y}`} fill="none" stroke={state === 'normal' ? "#3b82f6" : "#444"} strokeWidth="4" className={state === 'normal' ? 'animate-[pulse_1s_ease-out_infinite]' : ''} />
                    <path d={`M ${avNode.x} ${avNode.y} L ${ventricles.x} ${ventricles.y}`} fill="none" stroke={state === 'normal' ? "#3b82f6" : "#444"} strokeWidth="4" />
                    
                    {/* The Rogue Wire (Bundle of Kent) */}
                    {(state === 'wpw' || state === 'svt') && (
                        <path 
                            d={`M ${saNode.x} ${saNode.y} Q 250 80 ${ventricles.x} ${ventricles.y}`} 
                            fill="none" 
                            stroke="#eab308" 
                            strokeWidth="4" 
                            strokeDasharray="8 4"
                            className={state === 'wpw' ? 'animate-[pulse_1s_ease-out_infinite]' : ''}
                        />
                    )}

                    {/* SVT Re-entry Loop */}
                    {state === 'svt' && (
                        <path 
                            d={`M ${avNode.x} ${avNode.y} L ${ventricles.x} ${ventricles.y} Q 250 80 ${saNode.x} ${saNode.y} Q 120 140 ${avNode.x} ${avNode.y}`} 
                            fill="none" 
                            stroke="#ef4444" 
                            strokeWidth="6" 
                            className="animate-[spin_0.3s_linear_infinite]"
                            style={{ transformOrigin: '150px 200px' }}
                        />
                    )}

                    {/* Nodes */}
                    <circle cx={saNode.x} cy={saNode.y} r="12" fill={state !== 'svt' ? "#3b82f6" : "#ef4444"} />
                    <circle cx={avNode.x} cy={avNode.y} r="16" fill="#3b82f6" />
                    <text x={avNode.x + 25} y={avNode.y + 5} fill="#666" fontSize="14" fontWeight="bold">AV GATE</text>
                 </svg>
            </div>

            {/* RIGHT: ECG & DATA */}
            <div className="bg-neutral-900/30 flex flex-col justify-between">
                
                {/* ECG Trace */}
                <div className="relative h-48 bg-black/40 p-4 overflow-hidden border-b border-neutral-800">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                    <svg viewBox="0 0 300 100" className={`w-full h-full relative z-10 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] ${state === 'svt' ? 'animate-[slide_0.5s_linear_infinite]' : ''}`}>
                        <path 
                            d={state === 'normal' ? generateNormalECG() : state === 'wpw' ? generateWPWECG() : generateSVTECG()} 
                            fill="none" 
                            stroke={state === 'svt' ? "#ef4444" : state === 'wpw' ? "#eab308" : "#3b82f6"} 
                            strokeWidth="2.5" 
                            strokeLinejoin="round" 
                            className="transition-all duration-300"
                        />
                    </svg>
                </div>

                {/* Explanation Panel */}
                <div className="p-6">
                    {state === 'normal' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2">
                            <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2"><Activity size={16}/> Normal Pathway</h4>
                            <p className="text-sm text-neutral-400">The SA Node fires. The signal travels to the AV Node, which intentionally <strong>pauses</strong> the current. This gives the heart time to fill before the ventricles squeeze.</p>
                        </div>
                    )}
                    
                    {state === 'wpw' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2">
                            <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2"><Zap size={16}/> The Delta Wave</h4>
                            <p className="text-sm text-neutral-400">The signal takes the rogue wire, bypassing the AV gate. The ventricles start contracting too early, creating a slurred, ramping upstroke on the ECG known as the <strong>Delta Wave</strong>.</p>
                        </div>
                    )}

                    {state === 'svt' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2">
                            <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2"><Repeat size={16} className="animate-spin"/> Re-Entry Tachycardia</h4>
                            <p className="text-sm text-neutral-400">Disaster. The signal travels down the normal path, but shoots <em>backwards</em> up the rogue wire. It gets trapped in a 200+ BPM infinite loop. The heart is beating too fast to fill with blood.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
            @keyframes slide {
                from { transform: translateX(0); }
                to { transform: translateX(-150px); }
            }
        `}} />
    </div>
  );
}