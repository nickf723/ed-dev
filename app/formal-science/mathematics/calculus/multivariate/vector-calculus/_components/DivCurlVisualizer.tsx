"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Wind, RotateCcw, Target, Shrink } from 'lucide-react';

type FieldType = 'source' | 'sink' | 'vortex' | 'uniform';

export default function DivCurlVisualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [fieldType, setFieldType] = useState<FieldType>('vortex');

    // Define the vector field math: F(x,y) = <P(x,y), Q(x,y)>
    const getVector = (x: number, y: number, type: FieldType) => {
        switch (type) {
            case 'source': return { dx: x * 0.5, dy: y * 0.5 };  // Positive Divergence
            case 'sink': return { dx: -x * 0.5, dy: -y * 0.5 }; // Negative Divergence
            case 'vortex': return { dx: -y * 0.5, dy: x * 0.5 };  // Positive Curl
            case 'uniform': return { dx: 2, dy: 1 };            // Zero Div, Zero Curl
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let sensorRotation = 0;
        let sensorScale = 1;
        let scalePhase = 0;

        const drawArrow = (x: number, y: number, dx: number, dy: number) => {
            const mag = Math.sqrt(dx*dx + dy*dy);
            if (mag < 0.1) return;
            const angle = Math.atan2(dy, dx);
            const len = Math.min(mag * 5, 20); // Cap visual length

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(len, 0);
            ctx.lineTo(len - 4, -3);
            ctx.moveTo(len, 0);
            ctx.lineTo(len - 4, 3);
            ctx.strokeStyle = `rgba(56, 189, 248, ${Math.min(mag * 0.3, 0.6)})`; // Sky-400
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // 1. Draw Vector Field
            const spacing = 30;
            for (let x = 15; x < canvas.width; x += spacing) {
                for (let y = 15; y < canvas.height; y += spacing) {
                    // Math coordinates (-10 to 10)
                    const mx = (x - cx) / 15;
                    const my = (y - cy) / 15;
                    const { dx, dy } = getVector(mx, my, fieldType);
                    drawArrow(x, y, dx, dy);
                }
            }

            // 2. Animate "Paddlewheel" Sensor in the center
            const { dx, dy } = getVector(1, 1, fieldType); // Sample field properties

            if (fieldType === 'vortex') {
                sensorRotation += 0.05; // Spin!
                sensorScale = 1;
            } else if (fieldType === 'source') {
                scalePhase += 0.05;
                sensorScale = 1 + Math.sin(scalePhase) * 0.3; // Expand/contract
            } else if (fieldType === 'sink') {
                scalePhase -= 0.05;
                sensorScale = 1 + Math.sin(scalePhase) * 0.3; // Expand/contract backwards
            } else {
                sensorRotation = 0;
                sensorScale = 1;
            }

            // Draw Sensor
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(sensorRotation);
            ctx.scale(sensorScale, sensorScale);
            
            // Paddlewheel Cross
            ctx.beginPath();
            ctx.moveTo(-15, 0); ctx.lineTo(15, 0);
            ctx.moveTo(0, -15); ctx.lineTo(0, 15);
            ctx.strokeStyle = '#10b981'; // Emerald-500
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Sensor Core
            ctx.beginPath();
            ctx.arc(0, 0, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#0f172a'; // Slate-900
            ctx.fill();
            ctx.stroke();
            
            ctx.restore();

            animId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animId);
    }, [fieldType]);

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-sky-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans">
            <div className="bg-sky-950/30 border-b border-sky-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-sky-500/20 border border-sky-500/30 rounded-lg">
                        <Wind size={18} className="text-sky-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Divergence & Curl</h3>
                        <p className="text-[10px] text-sky-300/60 font-mono uppercase tracking-widest">Vector Field Analysis</p>
                    </div>
                </div>
            </div>

            <div className="p-0 bg-black/60 border-b border-white/5 relative">
                <canvas ref={canvasRef} width={500} height={350} className="w-full h-[350px]" />
                
                {/* Mathematical Equation Overlay */}
                <div className="absolute top-4 left-4 px-3 py-2 bg-black/80 border border-emerald-500/30 rounded-lg font-mono text-emerald-400 shadow-xl">
                    {fieldType === 'source' && (
                        <div className="text-xs space-y-1">
                            <div><span className="text-sky-400">F(x,y)</span> = ⟨x, y⟩</div>
                            <div>div <span className="text-sky-400">F</span> = 2  (Expands)</div>
                            <div>curl <span className="text-sky-400">F</span> = 0 (No spin)</div>
                        </div>
                    )}
                    {fieldType === 'sink' && (
                        <div className="text-xs space-y-1">
                            <div><span className="text-sky-400">F(x,y)</span> = ⟨-x, -y⟩</div>
                            <div>div <span className="text-sky-400">F</span> = -2 (Compresses)</div>
                            <div>curl <span className="text-sky-400">F</span> = 0  (No spin)</div>
                        </div>
                    )}
                    {fieldType === 'vortex' && (
                        <div className="text-xs space-y-1">
                            <div><span className="text-sky-400">F(x,y)</span> = ⟨-y, x⟩</div>
                            <div>div <span className="text-sky-400">F</span> = 0  (No expansion)</div>
                            <div>curl <span className="text-sky-400">F</span> = 2  (Spins!)</div>
                        </div>
                    )}
                    {fieldType === 'uniform' && (
                        <div className="text-xs space-y-1">
                            <div><span className="text-sky-400">F(x,y)</span> = ⟨2, 1⟩</div>
                            <div>div <span className="text-sky-400">F</span> = 0</div>
                            <div>curl <span className="text-sky-400">F</span> = 0</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button onClick={() => setFieldType('vortex')} className={`flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${fieldType === 'vortex' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'}`}>
                        <RotateCcw size={12} /> Vortex
                    </button>
                    <button onClick={() => setFieldType('source')} className={`flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${fieldType === 'source' ? 'bg-sky-500/20 border-sky-500/50 text-sky-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'}`}>
                        <Target size={12} /> Source
                    </button>
                    <button onClick={() => setFieldType('sink')} className={`flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${fieldType === 'sink' ? 'bg-rose-500/20 border-rose-500/50 text-rose-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'}`}>
                        <Shrink size={12} /> Sink
                    </button>
                    <button onClick={() => setFieldType('uniform')} className={`flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${fieldType === 'uniform' ? 'bg-zinc-700/50 border-zinc-500/50 text-zinc-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'}`}>
                        <Wind size={12} /> Uniform
                    </button>
                </div>
            </div>
        </div>
    );
}