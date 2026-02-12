"use client";
import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, Move } from 'lucide-react';

export default function AnglePlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initial Triangle Vertices (Relative percentages to container)
  const [points, setPoints] = useState([
    { x: 50, y: 20 }, // Top
    { x: 20, y: 80 }, // Bottom Left
    { x: 80, y: 80 }  // Bottom Right
  ]);
  
  const [angles, setAngles] = useState([60, 60, 60]);
  const [dragging, setDragging] = useState<number | null>(null);

  // Geometry Math Helpers
  const dist = (p1: any, p2: any) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  
  // Law of Cosines to find angles
  const calculateAngles = (pts: any[]) => {
    const a = dist(pts[1], pts[2]); // Side opposite p0
    const b = dist(pts[0], pts[2]); // Side opposite p1
    const c = dist(pts[0], pts[1]); // Side opposite p2

    const A = Math.acos((b*b + c*c - a*a) / (2*b*c)) * (180 / Math.PI);
    const B = Math.acos((a*a + c*c - b*b) / (2*a*c)) * (180 / Math.PI);
    const C = 180 - A - B; // Ensure sum is exactly 180 to avoid float errors

    return [A, B, C].map(val => Math.round(val));
  };

  useEffect(() => {
    setAngles(calculateAngles(points));
  }, [points]);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragging === null || !containerRef.current) return;
    
    // Get mouse/touch pos relative to container
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    // Constrain to box
    const clampedX = Math.max(5, Math.min(95, x));
    const clampedY = Math.max(5, Math.min(95, y));

    setPoints(prev => {
        const newPts = [...prev];
        newPts[dragging] = { x: clampedX, y: clampedY };
        return newPts;
    });
  };

  const stopDrag = () => setDragging(null);

  return (
    <div 
        className="w-full bg-slate-900 border border-blue-500/30 rounded-xl p-6 shadow-2xl select-none"
        onMouseMove={handleDrag}
        onMouseUp={stopDrag}
        onTouchMove={handleDrag}
        onTouchEnd={stopDrag}
    >
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest">Angle Inspector</h3>
            <div className="flex gap-4 font-mono text-sm text-blue-300">
                <span>∠A: {angles[0]}°</span>
                <span>∠B: {angles[1]}°</span>
                <span>∠C: {angles[2]}°</span>
                <span className="text-white font-bold border-l border-slate-600 pl-4">Σ: 180°</span>
            </div>
        </div>

        {/* Drawing Area */}
        <div 
            ref={containerRef}
            className="relative w-full h-80 bg-[#1e293b] rounded-lg border border-slate-700 overflow-hidden cursor-crosshair shadow-inner"
        >
             {/* Grid BG */}
             <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-5 pointer-events-none invert" />

            {/* The SVG Triangle */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <polygon 
                    points={`${points[0].x}%,${points[0].y}% ${points[1].x}%,${points[1].y}% ${points[2].x}%,${points[2].y}%`}
                    fill="rgba(59, 130, 246, 0.2)"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>

            {/* Draggable Vertices */}
            {points.map((p, i) => (
                <div
                    key={i}
                    onMouseDown={() => setDragging(i)}
                    onTouchStart={() => setDragging(i)}
                    className="absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center rounded-full bg-blue-600 border-2 border-white shadow-lg cursor-move hover:scale-110 transition-transform z-10"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                    <span className="text-[10px] font-bold text-white">{String.fromCharCode(65+i)}</span>
                </div>
            ))}
            
            {/* Angle Arcs (Simplified visuals) */}
            {points.map((p, i) => (
                <div 
                    key={`label-${i}`}
                    className="absolute text-xs font-bold text-blue-200 pointer-events-none bg-black/50 px-1 rounded"
                    style={{ 
                        left: `${p.x + (i===1 ? -6 : i===2 ? 2 : 0)}%`, 
                        top: `${p.y + (i===0 ? -6 : 4)}%` 
                    }}
                >
                    {angles[i]}°
                </div>
            ))}
        </div>
        
        <div className="mt-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <Move size={12} /> Drag the points to reshape
        </div>
    </div>
  );
}