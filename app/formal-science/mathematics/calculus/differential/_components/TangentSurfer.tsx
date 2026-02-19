"use client";
import React, { useState, useRef } from 'react';
import { TrendingUp, Move } from 'lucide-react';

export default function TangentSurfer() {
  const [xVal, setXVal] = useState(2); // Initial X
  const svgRef = useRef<SVGSVGElement>(null);

  // Math: f(x) = sin(x) + 0.2x^2
  // Derivative: f'(x) = cos(x) + 0.4x
  const f = (x: number) => Math.sin(x) + 0.2 * x * x;
  const df = (x: number) => Math.cos(x) + 0.4 * x;

  // Coordinate System
  const width = 800;
  const height = 300;
  const scaleX = 80; // pixels per unit
  const scaleY = 40; // pixels per unit
  const offsetX = width / 2; // Center X origin
  const offsetY = height - 50; // Move X axis down

  const toSvgX = (x: number) => offsetX + x * scaleX;
  const toSvgY = (y: number) => offsetY - y * scaleY;
  const fromSvgX = (px: number) => (px - offsetX) / scaleX;

  // User Interaction
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    // Clamp between -4 and 4
    const mathX = Math.max(-4, Math.min(4, fromSvgX(mouseX)));
    setXVal(mathX);
  };

  // Generate Curve Path
  const generatePath = () => {
    let d = "";
    for (let x = -4.5; x <= 4.5; x += 0.1) {
      const px = toSvgX(x);
      const py = toSvgY(f(x));
      d += x === -4.5 ? `M ${px} ${py}` : ` L ${px} ${py}`;
    }
    return d;
  };

  // Calculate Tangent Line
  const slope = df(xVal);
  const yVal = f(xVal);
  // Tangent line length
  const lineLen = 1.5; 
  // Point 1
  const x1 = xVal - lineLen;
  const y1 = yVal - lineLen * slope;
  // Point 2
  const x2 = xVal + lineLen;
  const y2 = yVal + lineLen * slope;

  return (
    <div 
        className="relative w-full h-[300px] bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden group cursor-crosshair shadow-2xl"
        onMouseMove={handleMouseMove}
    >
        {/* INFO HUD */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none select-none">
            <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                <TrendingUp size={14} /> Tangent Surfer
            </div>
            <div className="bg-black/80 backdrop-blur border border-neutral-800 p-3 rounded-lg font-mono text-xs">
                <div className="text-neutral-500 mb-1">Current Position</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <span>x : <span className="text-white">{xVal.toFixed(2)}</span></span>
                    <span>y : <span className="text-white">{yVal.toFixed(2)}</span></span>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-800 text-red-400 font-bold">
                    Slope (f') : {slope.toFixed(3)}
                </div>
            </div>
        </div>

        <div className="absolute top-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-neutral-500 uppercase flex items-center gap-2">
            <Move size={12} /> Move Cursor to Surf
        </div>

        <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            {/* Grid */}
            <line x1="0" y1={offsetY} x2={width} y2={offsetY} stroke="#333" strokeWidth="1" />
            <line x1={offsetX} y1="0" x2={offsetX} y2={height} stroke="#333" strokeWidth="1" />

            {/* Function Curve */}
            <path d={generatePath()} fill="none" stroke="#555" strokeWidth="3" />

            {/* Tangent Line */}
            <line 
                x1={toSvgX(x1)} y1={toSvgY(y1)} 
                x2={toSvgX(x2)} y2={toSvgY(y2)} 
                stroke="#ef4444" strokeWidth="2" 
                strokeLinecap="round"
            />

            {/* Point of Tangency */}
            <circle cx={toSvgX(xVal)} cy={toSvgY(yVal)} r="6" fill="#ef4444" className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"/>
            
            {/* Vertical Dashed Guide */}
            <line 
                x1={toSvgX(xVal)} y1={toSvgY(yVal)} 
                x2={toSvgX(xVal)} y2={offsetY} 
                stroke="#ef4444" strokeWidth="1" strokeDasharray="4" opacity="0.5" 
            />
        </svg>
    </div>
  );
}