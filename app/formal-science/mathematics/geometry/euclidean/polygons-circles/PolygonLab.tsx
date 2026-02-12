"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Maximize, Circle, Info } from 'lucide-react';

export default function PolygonLab() {
  const [sides, setSides] = useState(3);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Geometry Math
  const angleSum = (sides - 2) * 180;
  const oneAngle = angleSum / sides;
  const name = sides === 3 ? "Triangle" 
             : sides === 4 ? "Quadrilateral"
             : sides === 5 ? "Pentagon"
             : sides === 6 ? "Hexagon"
             : sides === 7 ? "Heptagon"
             : sides === 8 ? "Octagon"
             : sides === 9 ? "Nonagon"
             : sides === 10 ? "Decagon"
             : sides > 10 && sides < 50 ? `${sides}-gon`
             : "Circle (Approximated)";

  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const radius = 120;

      ctx.clearRect(0, 0, width, height);

      // Draw The Polygon
      ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
          const theta = -Math.PI/2 + (i * 2 * Math.PI / sides); // Start at top
          const px = cx + radius * Math.cos(theta);
          const py = cy + radius * Math.sin(theta);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
      }
      // Fill
      ctx.fillStyle = sides > 50 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(168, 85, 247, 0.2)';
      ctx.fill();
      // Stroke
      ctx.strokeStyle = sides > 50 ? '#22c55e' : '#a855f7';
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Draw Center Radius lines (if low poly)
      if (sides < 12) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 1;
          for (let i = 0; i < sides; i++) {
              const theta = -Math.PI/2 + (i * 2 * Math.PI / sides);
              ctx.beginPath();
              ctx.moveTo(cx, cy);
              ctx.lineTo(cx + radius * Math.cos(theta), cy + radius * Math.sin(theta));
              ctx.stroke();
          }
      }

  }, [sides]);

  return (
    <div className="w-full bg-slate-900 border border-purple-500/30 rounded-xl p-8 shadow-2xl flex flex-col md:flex-row gap-8">
        
        {/* CONTROLS */}
        <div className="w-full md:w-80 space-y-8">
            <div className="pb-4 border-b border-slate-700">
                <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">Shape Shifter</div>
                <h3 className="text-3xl font-black text-white">{name}</h3>
            </div>

            <div>
                <label className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-4">
                    Side Count <span className="text-white text-lg">{sides}</span>
                </label>
                <input 
                    type="range" 
                    min="3" max="60" 
                    value={sides}
                    onChange={(e) => setSides(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
                    <span>3 (Triangle)</span>
                    <span>∞ (Circle)</span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase">Sum of Angles</span>
                    <span className="font-mono text-white font-bold text-lg">{angleSum}°</span>
                </div>
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase">One Angle</span>
                    <span className="font-mono text-white font-bold text-lg">{oneAngle.toFixed(1)}°</span>
                </div>
                {sides > 20 && (
                     <div className="p-3 bg-green-900/20 border border-green-500/30 rounded text-xs text-green-300 flex items-center gap-2 animate-in fade-in">
                         <Circle size={14} /> Approaching circular limit
                     </div>
                )}
            </div>
        </div>

        {/* VISUALIZER */}
        <div className="flex-1 bg-black/40 rounded-xl border border-slate-700 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-5 pointer-events-none invert" />
            
            <canvas ref={canvasRef} width={400} height={400} className="relative z-10 max-w-full max-h-full" />
            
            {/* Radius Label */}
            <div className="absolute bottom-4 right-4 text-xs font-mono text-slate-500">
                r = 120 units
            </div>
        </div>
    </div>
  );
}