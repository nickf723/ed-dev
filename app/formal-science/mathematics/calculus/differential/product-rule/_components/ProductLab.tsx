"use client";
import React, { useState } from 'react';
import { Layers, X, Plus } from 'lucide-react';
import { M } from '@/components/Math';

export default function ProductLab() {
  const [u, setU] = useState(4); // Function f(x)
  const [v, setV] = useState(3); // Function g(x)
  const [du, setDu] = useState(1); // Change in f
  const [dv, setDv] = useState(0.8); // Change in g

  // SVG Scaling
  const scale = 40;
  const originX = 50;
  const originY = 350;

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-yellow-500 flex items-center gap-2">
                <Layers size={14} /> The Geometric Proof
            </div>
            <div className="flex gap-2">
                 <div className="flex items-center gap-2 px-3 py-1 rounded bg-yellow-900/20 border border-yellow-500/30 text-[10px] font-bold uppercase text-yellow-400">
                    Area = u · v
                 </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* VISUALIZER */}
            <div className="bg-black/20 relative h-[400px]">
                 <svg viewBox="0 0 600 400" className="w-full h-full">
                    {/* Main Area (u * v) */}
                    <rect 
                        x={originX} 
                        y={originY - v * scale} 
                        width={u * scale} 
                        height={v * scale} 
                        fill="rgba(59, 130, 246, 0.2)" 
                        stroke="#3b82f6" 
                        strokeWidth="2"
                    />
                    <text x={originX + (u*scale)/2} y={originY - (v*scale)/2} fill="#3b82f6" fontSize="14" fontWeight="bold" textAnchor="middle">u · v</text>

                    {/* Right Strip (v * du) */}
                    <rect 
                        x={originX + u * scale} 
                        y={originY - v * scale} 
                        width={du * scale} 
                        height={v * scale} 
                        fill="rgba(34, 197, 94, 0.2)" 
                        stroke="#22c55e" 
                        strokeWidth="2"
                        strokeDasharray="4"
                    />
                    <text x={originX + u*scale + (du*scale)/2} y={originY - (v*scale)/2} fill="#22c55e" fontSize="12" fontWeight="bold" textAnchor="middle" style={{writingMode: 'vertical-rl'}}>v · du</text>

                    {/* Top Strip (u * dv) */}
                    <rect 
                        x={originX} 
                        y={originY - (v * scale) - (dv * scale)} 
                        width={u * scale} 
                        height={dv * scale} 
                        fill="rgba(234, 179, 8, 0.2)" 
                        stroke="#eab308" 
                        strokeWidth="2"
                        strokeDasharray="4"
                    />
                    <text x={originX + (u*scale)/2} y={originY - v*scale - (dv*scale)/2 + 5} fill="#eab308" fontSize="12" fontWeight="bold" textAnchor="middle">u · dv</text>

                    {/* Corner Piece (du * dv) - The tiny part we ignore */}
                    <rect 
                        x={originX + u * scale} 
                        y={originY - (v * scale) - (dv * scale)} 
                        width={du * scale} 
                        height={dv * scale} 
                        fill="rgba(255, 255, 255, 0.1)" 
                        stroke="#fff" 
                        strokeWidth="1"
                        strokeDasharray="2"
                    />
                 </svg>
            </div>

            {/* CONTROLS */}
            <div className="p-8 border-l border-neutral-800 flex flex-col justify-center gap-6 bg-neutral-900/30">
                <div>
                    <h3 className="text-white font-bold mb-2">Why isn't it just f'g'?</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                        When both sides of a rectangle grow, you get <strong>three</strong> new areas.
                        <br/>
                        However, the white corner piece (<M>du \cdot dv</M>) is so tiny compared to the strips that it vanishes to zero.
                    </p>
                </div>

                {/* Math Breakdown */}
                <div className="grid grid-cols-1 gap-4 text-center">
                    <div className="bg-black/40 p-3 rounded-xl border border-neutral-800">
                        <div className="text-[10px] uppercase font-bold text-yellow-500 mb-1">Change in Area</div>
                        <M display>{`d(uv) = u \\cdot dv + v \\cdot du`}</M>
                    </div>
                </div>

                {/* Sliders */}
                <div className="space-y-4 pt-4 border-t border-neutral-800">
                    <div>
                        <div className="flex justify-between text-[10px] uppercase font-bold text-neutral-500 mb-1">
                            <span>Change in u (du)</span>
                            <span className="text-green-400">{du.toFixed(1)}</span>
                        </div>
                        <input type="range" min="0.1" max="2" step="0.1" value={du} onChange={e => setDu(parseFloat(e.target.value))} className="w-full h-1 bg-neutral-700 rounded accent-green-500"/>
                    </div>
                    <div>
                        <div className="flex justify-between text-[10px] uppercase font-bold text-neutral-500 mb-1">
                            <span>Change in v (dv)</span>
                            <span className="text-yellow-400">{dv.toFixed(1)}</span>
                        </div>
                        <input type="range" min="0.1" max="2" step="0.1" value={dv} onChange={e => setDv(parseFloat(e.target.value))} className="w-full h-1 bg-neutral-700 rounded accent-yellow-500"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}