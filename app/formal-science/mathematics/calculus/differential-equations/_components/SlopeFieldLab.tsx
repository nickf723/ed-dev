"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Waves, MousePointerClick, RefreshCw, Activity } from 'lucide-react';

type Equation = 'exponential' | 'logistic' | 'saddle' | 'wave';

export default function SlopeFieldLab() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [equation, setEquation] = useState<Equation>('saddle');
    const [curves, setCurves] = useState<{points: {x: number, y: number}[], color: string}[]>([]);

    // Define dy/dx = f(x,y)
    const getDerivative = (x: number, y: number, eq: Equation) => {
        switch (eq) {
            case 'exponential': return y * 0.5; // dy/dx = 0.5y
            case 'logistic': return y * (1 - y / 4); // dy/dx = y(1 - y/4)
            case 'saddle': return x - y; // dy/dx = x - y
            case 'wave': return Math.sin(x) * Math.cos(y); // dy/dx = sin(x)cos(y)
            default: return 0;
        }
    };

    // Colors for dropped trajectories
    const COLORS = ['#f472b6', '#2dd4bf', '#fbbf24', '#a78bfa', '#38bdf8'];

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        
        // Convert screen to math coordinates (Domain: -5 to 5, Range: -5 to 5)
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;
        const startX = ((screenX / canvas.width) * 10) - 5;
        const startY = -(((screenY / canvas.height) * 10) - 5);

        // Euler's Method for Numerical Integration
        const step = 0.05;
        const newCurve: { x: number; y: number; }[] = [];
        
        // Trace Forward
        let cx = startX;
        let cy = startY;
        for (let i = 0; i < 200; i++) {
            newCurve.push({ x: cx, y: cy });
            const dy = getDerivative(cx, cy, equation);
            cx += step;
            cy += dy * step;
            if (cx > 5 || cx < -5 || cy > 5 || cy < -5) break;
        }

        // Trace Backward
        cx = startX;
        cy = startY;
        const backwardCurve: { x: number; y: number; }[] = [];
        for (let i = 0; i < 200; i++) {
            backwardCurve.unshift({ x: cx, y: cy });
            const dy = getDerivative(cx, cy, equation);
            cx -= step;
            cy -= dy * step;
            if (cx > 5 || cx < -5 || cy > 5 || cy < -5) break;
        }

        setCurves(prev => [...prev, {
            points: [...backwardCurve, ...newCurve],
            color: COLORS[prev.length % COLORS.length]
        }]);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 1. Draw Slope Field
            ctx.lineWidth = 1.5;
            for (let x = -4.5; x <= 4.5; x += 0.5) {
                for (let y = -4.5; y <= 4.5; y += 0.5) {
                    const slope = getDerivative(x, y, equation);
                    const angle = Math.atan(slope);
                    const len = 10; // line segment length
                    
                    const screenX = ((x + 5) / 10) * canvas.width;
                    const screenY = ((-y + 5) / 10) * canvas.height;

                    ctx.beginPath();
                    ctx.moveTo(screenX - Math.cos(angle) * (len/2), screenY + Math.sin(angle) * (len/2)); // +sin because Y is inverted on canvas
                    ctx.lineTo(screenX + Math.cos(angle) * (len/2), screenY - Math.sin(angle) * (len/2));
                    ctx.strokeStyle = `rgba(45, 212, 191, 0.3)`; // Teal
                    ctx.stroke();
                }
            }

            // 2. Draw Solution Curves
            curves.forEach(curve => {
                ctx.beginPath();
                curve.points.forEach((pt, i) => {
                    const screenX = ((pt.x + 5) / 10) * canvas.width;
                    const screenY = ((-pt.y + 5) / 10) * canvas.height;
                    if (i === 0) ctx.moveTo(screenX, screenY);
                    else ctx.lineTo(screenX, screenY);
                });
                ctx.strokeStyle = curve.color;
                ctx.lineWidth = 3;
                ctx.shadowBlur = 10;
                ctx.shadowColor = curve.color;
                ctx.stroke();
                ctx.shadowBlur = 0; // reset
            });
        };

        render();
    }, [equation, curves]);

    const handleEquationChange = (eq: Equation) => {
        setEquation(eq);
        setCurves([]); // Clear curves when changing the river
    };

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-teal-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans">
            <div className="bg-teal-950/30 border-b border-teal-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-500/20 border border-teal-500/30 rounded-lg">
                        <Waves size={18} className="text-teal-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Slope Field Integrator</h3>
                        <p className="text-[10px] text-teal-300/60 font-mono uppercase tracking-widest">Euler's Method Approximation</p>
                    </div>
                </div>
                <button onClick={() => setCurves([])} className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-500 transition-colors">
                    <RefreshCw size={14} />
                </button>
            </div>

            <div className="p-0 bg-black/60 relative cursor-crosshair border-b border-white/5">
                <canvas 
                    ref={canvasRef} width={600} height={400} 
                    className="w-full h-[400px]" 
                    onClick={handleCanvasClick}
                />
                
                {curves.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/80 border border-pink-500/30 px-4 py-2 rounded-lg flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-widest shadow-xl animate-pulse">
                            <MousePointerClick size={16} /> Click to drop an Initial Value
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    <button onClick={() => handleEquationChange('saddle')} className={`py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${equation === 'saddle' ? 'bg-teal-500/20 border-teal-500/50 text-teal-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'}`}>
                        Saddle (x - y)
                    </button>
                    <button onClick={() => handleEquationChange('exponential')} className={`py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${equation === 'exponential' ? 'bg-teal-500/20 border-teal-500/50 text-teal-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'}`}>
                        Growth (0.5y)
                    </button>
                    <button onClick={() => handleEquationChange('logistic')} className={`py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${equation === 'logistic' ? 'bg-teal-500/20 border-teal-500/50 text-teal-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'}`}>
                        Logistic (Limit)
                    </button>
                    <button onClick={() => handleEquationChange('wave')} className={`py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${equation === 'wave' ? 'bg-teal-500/20 border-teal-500/50 text-teal-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'}`}>
                        Sine Flow
                    </button>
                </div>
                
                <div className="p-4 bg-zinc-900/50 rounded-xl flex items-start gap-3 border border-white/5">
                    <Activity className="text-pink-400 shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        <strong>Initial Value Problem:</strong> The teal lines represent the derivative <span className="font-mono text-teal-300">dy/dx</span>. Click anywhere to set an initial condition <span className="font-mono text-pink-300">(x₀, y₀)</span>. The engine will instantly integrate the mathematical flow to reveal the singular destiny of that specific particle.
                    </p>
                </div>
            </div>
        </div>
    );
}