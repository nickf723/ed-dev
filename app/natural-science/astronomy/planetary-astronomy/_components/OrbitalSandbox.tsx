"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Orbit, RefreshCw, Rocket, Activity, Info } from 'lucide-react';

export default function OrbitalSandbox() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [starMass, setStarMass] = useState(5000);
    const [initialVelocity, setInitialVelocity] = useState(4.5);
    const [isSimulating, setIsSimulating] = useState(false);
    
    // Physics State Refs to avoid infinite re-renders during requestAnimationFrame
    const physicsRef = useRef({
        planet: { x: 0, y: -150, vx: initialVelocity, vy: 0 },
        trail: [] as {x: number, y: number}[],
        crashed: false,
        escaped: false
    });

    const G = 1; // Simplified Gravitational Constant

    const resetSimulation = () => {
        physicsRef.current = {
            planet: { x: 0, y: -150, vx: initialVelocity, vy: 0 },
            trail: [],
            crashed: false,
            escaped: false
        };
        setIsSimulating(false);
    };

    // Update initial velocity in physics ref when slider changes (if not running)
    useEffect(() => {
        if (!isSimulating) {
            physicsRef.current.planet.vx = initialVelocity;
        }
    }, [initialVelocity, isSimulating]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            const state = physicsRef.current;

            if (isSimulating && !state.crashed && !state.escaped) {
                // Physics Integration (Verlet/Euler approximation)
                const dx = -state.planet.x; // Star is at (0,0)
                const dy = -state.planet.y;
                const distSq = dx*dx + dy*dy;
                const dist = Math.sqrt(distSq);

                if (dist < 20) {
                    state.crashed = true;
                } else if (dist > 800) {
                    state.escaped = true;
                } else {
                    // F = G * (m1*m2) / r^2. Acceleration a = F/m2 = G * m1 / r^2
                    const force = (G * starMass) / distSq;
                    const ax = force * (dx / dist);
                    const ay = force * (dy / dist);

                    state.planet.vx += ax;
                    state.planet.vy += ay;
                    state.planet.x += state.planet.vx;
                    state.planet.y += state.planet.vy;

                    // Save trail (throttle to avoid massive arrays)
                    if (Math.random() > 0.5) {
                        state.trail.push({ x: state.planet.x, y: state.planet.y });
                    }
                    if (state.trail.length > 400) state.trail.shift();
                }
            }

            // Draw Trail
            if (state.trail.length > 0) {
                ctx.beginPath();
                ctx.moveTo(cx + state.trail[0].x, cy + state.trail[0].y);
                for (let i = 1; i < state.trail.length; i++) {
                    ctx.lineTo(cx + state.trail[i].x, cy + state.trail[i].y);
                }
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Draw Star
            const starRadius = Math.max(15, starMass / 300);
            ctx.beginPath();
            ctx.arc(cx, cy, starRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#fef08a'; // Yellow-200
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#eab308'; // Yellow-500
            ctx.fill();
            ctx.shadowBlur = 0; // Reset

            // Draw Planet
            if (!state.crashed) {
                ctx.beginPath();
                ctx.arc(cx + state.planet.x, cy + state.planet.y, 6, 0, Math.PI * 2);
                ctx.fillStyle = '#38bdf8'; // Sky-400
                ctx.fill();
            }

            // Draw Status Text
            if (state.crashed) {
                ctx.fillStyle = '#ef4444'; ctx.font = 'bold 24px sans-serif'; ctx.textAlign = 'center';
                ctx.fillText('CATASTROPHIC IMPACT', cx, cy - starRadius - 20);
            } else if (state.escaped) {
                ctx.fillStyle = '#a8a29e'; ctx.font = 'bold 24px sans-serif'; ctx.textAlign = 'center';
                ctx.fillText('ORBIT ESCAPED (ROGUE PLANET)', cx, 50);
            }

            animId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animId);
    }, [isSimulating, starMass]);

    return (
        <div className="w-full bg-[#050508]/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] font-sans">
            
            {/* Minimalist Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <Orbit size={20} className="text-sky-400" />
                    <h3 className="text-white font-medium tracking-wide">N-Body Gravity Simulator</h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                    <Activity size={14} /> LIVE TELEMETRY
                </div>
            </div>

            {/* Massive Canvas Area */}
            <div className="relative w-full h-[400px] md:h-[500px] bg-black cursor-crosshair">
                <canvas ref={canvasRef} width={800} height={500} className="w-full h-full object-cover" />
                
                {!isSimulating && physicsRef.current.trail.length === 0 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 pointer-events-none opacity-50">
                        <Rocket size={48} className="text-zinc-600" />
                        <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">Awaiting Launch Sequence</span>
                    </div>
                )}
            </div>

            {/* Mission Control Panel */}
            <div className="bg-zinc-950 p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-white/5">
                
                {/* Sliders */}
                <div className="md:col-span-8 space-y-6">
                    <div>
                        <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2 uppercase tracking-widest">
                            <span>Central Star Mass</span>
                            <span className="text-yellow-400">{starMass.toLocaleString()} M</span>
                        </div>
                        <input 
                            type="range" min="1000" max="10000" step="100"
                            value={starMass} onChange={(e) => setStarMass(Number(e.target.value))}
                            disabled={isSimulating}
                            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400 disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2 uppercase tracking-widest">
                            <span>Orbital Injection Velocity</span>
                            <span className="text-sky-400">{initialVelocity.toFixed(1)} km/s</span>
                        </div>
                        <input 
                            type="range" min="1" max="10" step="0.1"
                            value={initialVelocity} onChange={(e) => setInitialVelocity(Number(e.target.value))}
                            disabled={isSimulating}
                            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-400 disabled:opacity-50"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="md:col-span-4 flex flex-col justify-center gap-3">
                    {!isSimulating ? (
                        <button 
                            onClick={() => setIsSimulating(true)}
                            className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-black font-black uppercase tracking-widest text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                        >
                            Initiate Orbit
                        </button>
                    ) : (
                        <button 
                            onClick={resetSimulation}
                            className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold uppercase tracking-widest text-sm rounded-xl transition-all flex justify-center items-center gap-2"
                        >
                            <RefreshCw size={16} /> Reset Engine
                        </button>
                    )}
                    
                    <div className="text-[10px] text-zinc-500 font-mono leading-relaxed mt-2 flex items-start gap-2">
                        <Info size={12} className="shrink-0 mt-0.5" />
                        Too slow, and gravity wins (crash). Too fast, and momentum wins (escape). Find the perfect balance for a stable ellipse.
                    </div>
                </div>

            </div>
        </div>
    );
}