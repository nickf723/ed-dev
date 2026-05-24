"use client";
import React, { useState, useEffect } from 'react';
import { Shapes, Magnet } from 'lucide-react';

export default function AngleExplorer() {
    const [rawAngle, setRawAngle] = useState(45);
    const [snapEnabled, setSnapEnabled] = useState(true);

    // Magnetic Snapping Logic
    let displayAngle = rawAngle;
    if (snapEnabled) {
        const snapPoints = [0, 90, 180, 270, 360];
        for (let point of snapPoints) {
            if (Math.abs(rawAngle - point) <= 8) {
                displayAngle = point;
                break;
            }
        }
    }

    // Determine Angle Classification
    let classification = "";
    let color = "";
    let description = "";

    if (displayAngle === 0) {
        classification = "Zero Angle"; color = "text-zinc-500"; description = "The lines overlap perfectly. No opening.";
    } else if (displayAngle > 0 && displayAngle < 90) {
        classification = "Acute Angle"; color = "text-emerald-400"; description = "Small and sharp. Less than 90°.";
    } else if (displayAngle === 90) {
        classification = "Right Angle"; color = "text-amber-400"; description = "A perfect square corner. Exactly 90°.";
    } else if (displayAngle > 90 && displayAngle < 180) {
        classification = "Obtuse Angle"; color = "text-cyan-400"; description = "Wide and leaned back. Between 90° and 180°.";
    } else if (displayAngle === 180) {
        classification = "Straight Angle"; color = "text-rose-400"; description = "A perfectly flat line. Exactly 180°.";
    } else if (displayAngle > 180 && displayAngle < 360) {
        classification = "Reflex Angle"; color = "text-fuchsia-400"; description = "Bent completely backward. Greater than 180°.";
    } else if (displayAngle === 360) {
        classification = "Full Rotation"; color = "text-indigo-400"; description = "A complete circle. Exactly 360°.";
    }

    // SVG Math coordinates
    const cx = 150; // Center X
    const cy = 150; // Center Y
    const radius = 100;
    
    // Calculate the end point of the moving arm (remember SVG y is inverted)
    const endX = cx + radius * Math.cos((-displayAngle * Math.PI) / 180);
    const endY = cy + radius * Math.sin((-displayAngle * Math.PI) / 180);

    // Determine if we need the large arc flag for SVG paths
    const largeArcFlag = displayAngle > 180 ? 1 : 0;

    return (
        <div className="w-full flex flex-col items-center bg-black/40 border border-emerald-500/20 rounded-3xl overflow-hidden backdrop-blur-md">
            
            {/* Header */}
            <div className="w-full p-4 border-b border-emerald-500/20 bg-black/50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-xs">
                    <Shapes size={16} /> Angle Explorer
                </div>
                <button 
                    onClick={() => setSnapEnabled(!snapEnabled)}
                    className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all ${snapEnabled ? 'bg-amber-500/20 text-amber-400 border-amber-500/50' : 'bg-white/5 text-zinc-500 border-white/10'}`}
                >
                    <Magnet size={12} /> {snapEnabled ? "Snap: ON" : "Snap: OFF"}
                </button>
            </div>

            {/* Interactive Visualization Area */}
            <div className="relative w-full p-8 flex flex-col md:flex-row items-center justify-center gap-12">
                
                {/* SVG Drawing Canvas */}
                <div className="relative w-[300px] h-[200px] flex items-center justify-center overflow-visible">
                    <svg width="300" height="300" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible">
                        
                        {/* The Arc (or Square for Right Angle) */}
                        {displayAngle === 90 ? (
                            // Draw Right Angle Square
                            <path 
                                d={`M ${cx + 20} ${cy} L ${cx + 20} ${cy - 20} L ${cx} ${cy - 20}`}
                                fill="none"
                                stroke="#fbbf24" // Amber-400
                                strokeWidth="2"
                            />
                        ) : displayAngle > 0 ? (
                            // Draw Standard Arc
                            <path 
                                d={`M ${cx + 30} ${cy} A 30 30 0 ${largeArcFlag} 0 ${cx + 30 * Math.cos((-displayAngle * Math.PI) / 180)} ${cy + 30 * Math.sin((-displayAngle * Math.PI) / 180)}`}
                                fill="none"
                                stroke="#34d399" // Emerald-400
                                strokeWidth="2"
                                className="transition-all duration-100"
                            />
                        ) : null}

                        {/* Baseline (Fixed) */}
                        <line x1={cx} y1={cy} x2={cx + radius} y2={cy} stroke="#52525b" strokeWidth="4" strokeLinecap="round" />
                        
                        {/* Moving Arm */}
                        <line x1={cx} y1={cy} x2={endX} y2={endY} stroke="#f4f4f5" strokeWidth="4" strokeLinecap="round" />
                        
                        {/* Center Vertex Dot */}
                        <circle cx={cx} cy={cy} r="6" fill="#10b981" />
                    </svg>

                    {/* Floating Degree Readout */}
                    <div className="absolute top-0 right-0 bg-black/80 px-3 py-1 rounded-lg border border-white/10 font-mono text-xl font-bold text-white shadow-lg backdrop-blur-sm">
                        {displayAngle}°
                    </div>
                </div>

                {/* Classification Readout */}
                <div className="w-full md:w-64 flex flex-col">
                    <div className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-1">Classification</div>
                    <div className={`text-3xl font-black mb-2 ${color}`}>
                        {classification}
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed min-h-[40px]">
                        {description}
                    </p>
                    
                    {/* The Control Slider */}
                    <div className="mt-8">
                        <input 
                            type="range" 
                            min="0" 
                            max="360" 
                            value={rawAngle} 
                            onChange={(e) => setRawAngle(Number(e.target.value))}
                            className="w-full accent-emerald-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] font-mono text-zinc-600 mt-2 font-bold">
                            <span>0°</span>
                            <span>90°</span>
                            <span>180°</span>
                            <span>270°</span>
                            <span>360°</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}