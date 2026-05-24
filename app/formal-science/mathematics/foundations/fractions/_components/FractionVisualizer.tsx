"use client";
import React, { useState } from 'react';
import { PieChart } from 'lucide-react';

export default function FractionVisualizer() {
    const [denominator, setDenominator] = useState(4);
    const [numerator, setNumerator] = useState(3);

    // Ensure numerator doesn't exceed denominator when denominator shrinks
    if (numerator > denominator) {
        setNumerator(denominator);
    }

    // Helper to draw a pie slice in SVG
    const getSlicePath = (index: number, total: number) => {
        if (total === 1) return "M 50,50 m -40,0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0"; // Full circle

        const startAngle = (index / total) * Math.PI * 2 - Math.PI / 2;
        const endAngle = ((index + 1) / total) * Math.PI * 2 - Math.PI / 2;

        const startX = 50 + 40 * Math.cos(startAngle);
        const startY = 50 + 40 * Math.sin(startAngle);
        const endX = 50 + 40 * Math.cos(endAngle);
        const endY = 50 + 40 * Math.sin(endAngle);

        const largeArcFlag = (1 / total) > 0.5 ? 1 : 0;

        return `M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
    };

    return (
        <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center p-4">
            
            {/* LEFT: The Interactive Controls */}
            <div className="w-full md:w-1/2 space-y-8 bg-black/30 p-6 rounded-3xl border border-white/5">
                
                {/* Numerator Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-bold tracking-widest uppercase">
                        <span className="text-orange-400">Numerator (Top)</span>
                        <span className="text-white bg-orange-500/20 px-3 py-1 rounded-lg">{numerator}</span>
                    </div>
                    <input 
                        type="range" min="0" max={denominator} step="1" 
                        value={numerator} onChange={(e) => setNumerator(Number(e.target.value))}
                        className="w-full accent-orange-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                    <p className="text-xs text-zinc-400 font-medium">How many slices you get to eat.</p>
                </div>

                <div className="h-px w-full bg-white/10" />

                {/* Denominator Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-bold tracking-widest uppercase">
                        <span className="text-blue-400">Denominator (Bottom)</span>
                        <span className="text-white bg-blue-500/20 px-3 py-1 rounded-lg">{denominator}</span>
                    </div>
                    <input 
                        type="range" min="1" max="12" step="1" 
                        value={denominator} onChange={(e) => setDenominator(Number(e.target.value))}
                        className="w-full accent-blue-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                    <p className="text-xs text-zinc-400 font-medium">How many total slices the pizza is cut into.</p>
                </div>

            </div>

            {/* RIGHT: The Visual Pie Chart */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-6 drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform transition-transform duration-300">
                        {/* Background Base */}
                        <circle cx="50" cy="50" r="40" fill="#1f1e29" stroke="#3f3e49" strokeWidth="1" />
                        
                        {/* The Slices */}
                        {Array.from({ length: denominator }).map((_, i) => (
                            <path 
                                key={i}
                                d={getSlicePath(i, denominator)}
                                fill={i < numerator ? '#f97316' : 'transparent'} // Orange filled, or transparent
                                stroke="#0f0e17" // Background color for gap lines
                                strokeWidth="1.5"
                                className="transition-all duration-300 ease-in-out"
                            />
                        ))}
                    </svg>
                    
                    {/* Center hole to make it look slightly like a donut/modern chart */}
                    <div className="absolute inset-0 m-auto w-12 h-12 bg-[#0f0e17] rounded-full border border-white/5" />
                </div>

                {/* The Math Readout */}
                <div className="flex items-center gap-6 text-3xl font-black text-white">
                    <div className="flex flex-col items-center">
                        <span className="text-orange-400">{numerator}</span>
                        <div className="h-1 w-8 bg-white/20 rounded-full my-1" />
                        <span className="text-blue-400">{denominator}</span>
                    </div>
                    <span className="text-zinc-500">=</span>
                    <span className="text-zinc-300">{Math.round((numerator / denominator) * 100)}%</span>
                </div>
            </div>

        </div>
    );
}