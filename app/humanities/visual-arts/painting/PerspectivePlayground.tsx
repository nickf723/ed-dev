"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Move, Box, Maximize } from 'lucide-react';

export default function PerspectivePlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [vp, setVp] = useState({ x: 300, y: 200 }); // Vanishing Point

  const handleMouseMove = (e: React.MouseEvent) => {
      if(!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setVp({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
      });
  };

  // Generate 8 boxes around the center
  const boxes = [
      { x: 50, y: 50, w: 60, h: 60, color: 'bg-red-500' },
      { x: 270, y: 50, w: 60, h: 60, color: 'bg-blue-500' },
      { x: 490, y: 50, w: 60, h: 60, color: 'bg-green-500' },
      { x: 50, y: 290, w: 60, h: 60, color: 'bg-yellow-500' },
      { x: 490, y: 290, w: 60, h: 60, color: 'bg-purple-500' },
  ];

  return (
    <div className="w-full bg-white border border-stone-300 rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row h-[500px]">
      
      {/* SIDEBAR */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-stone-200 p-6 bg-stone-50 flex flex-col justify-between">
          <div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Maximize size={16} /> Perspective Lab
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-4">Creating Depth</h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                  In <strong>One-Point Perspective</strong>, all parallel lines that recede into the distance converge at a single spot on the horizon: the <strong>Vanishing Point</strong>.
              </p>
              <div className="p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-700 font-medium">
                  <Move size={12} className="inline mr-1" /> Move your mouse over the canvas to shift the Vanishing Point.
              </div>
          </div>
          <div className="text-[10px] text-stone-400 font-mono">
              TECHNIQUE: BRUNELLESCHI (1415)
          </div>
      </div>

      {/* CANVAS */}
      <div 
        ref={containerRef}
        className="flex-1 relative bg-stone-100 cursor-crosshair overflow-hidden"
        onMouseMove={handleMouseMove}
      >
          {/* Horizon Line */}
          <div 
            className="absolute left-0 right-0 h-px bg-stone-300 pointer-events-none"
            style={{ top: vp.y }}
          />
          <div 
            className="absolute top-0 bottom-0 w-px bg-stone-300 pointer-events-none"
            style={{ left: vp.x }}
          />

          {/* Vanishing Point Marker */}
          <div 
             className="absolute w-3 h-3 bg-black rounded-full -ml-1.5 -mt-1.5 pointer-events-none z-50 border-2 border-white"
             style={{ left: vp.x, top: vp.y }}
          />

          {/* Render Boxes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {boxes.map((b, i) => {
                  // Calculate corners
                  const corners = [
                      { x: b.x, y: b.y },
                      { x: b.x + b.w, y: b.y },
                      { x: b.x + b.w, y: b.y + b.h },
                      { x: b.x, y: b.y + b.h }
                  ];

                  return (
                      <g key={i}>
                          {/* Perspective Lines (Rays) */}
                          {corners.map((c, j) => (
                              <line 
                                key={j}
                                x1={c.x} y1={c.y} 
                                x2={vp.x} y2={vp.y} 
                                stroke="rgba(0,0,0,0.1)" strokeWidth="1" 
                              />
                          ))}
                          
                          {/* The "Sides" (Polygons connecting face to VP) - Simplified visual */}
                          <path 
                             d={`M ${b.x} ${b.y} L ${b.x+b.w} ${b.y} L ${vp.x} ${vp.y} Z`} 
                             fill="rgba(0,0,0,0.05)"
                          />
                      </g>
                  );
              })}
          </svg>

          {/* The Front Faces (Static 2D) */}
          {boxes.map((b, i) => (
              <div 
                key={i}
                className={`absolute border-2 border-black/80 shadow-sm ${b.color}`}
                style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
              >
                  <div className="absolute inset-0 bg-white opacity-20" />
              </div>
          ))}

      </div>
    </div>
  );
}