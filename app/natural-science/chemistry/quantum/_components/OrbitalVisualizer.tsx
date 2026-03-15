"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Orbit, RefreshCw } from 'lucide-react';

type OrbitalType = '1s' | '2s' | '2px' | '2py';

export default function OrbitalVisualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [orbital, setOrbital] = useState<OrbitalType>('1s');

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const particles: { x: number, y: number, alpha: number, life: number }[] = [];
        const maxParticles = 2000;

        const render = () => {
            // Fade effect to create trailing probability clouds
            ctx.fillStyle = 'rgba(9, 9, 11, 0.2)'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // Add new particles based on orbital probability density
            for (let i = 0; i < 20; i++) {
                if (particles.length < maxParticles) {
                    let r = 0, theta = 0;

                    // Simplified Probability Distribution Functions
                    if (orbital === '1s') {
                        // Dense near center, fading out spherically
                        r = (Math.random() * Math.random()) * 80;
                        theta = Math.random() * Math.PI * 2;
                    } else if (orbital === '2s') {
                        // Node in the middle (empty space), then an outer ring
                        r = Math.random() > 0.5 ? (Math.random() * 30) : 70 + (Math.random() * 40);
                        theta = Math.random() * Math.PI * 2;
                    } else if (orbital === '2px') {
                        // Dumbbell along X axis
                        const lobe = Math.random() > 0.5 ? 1 : -1;
                        r = Math.random() * 90;
                        // Skew angle towards 0 or 180 degrees
                        theta = (Math.random() * 1.5 - 0.75) + (lobe === -1 ? Math.PI : 0);
                    } else if (orbital === '2py') {
                        // Dumbbell along Y axis
                        const lobe = Math.random() > 0.5 ? 1 : -1;
                        r = Math.random() * 90;
                        // Skew angle towards 90 or 270 degrees
                        theta = (Math.random() * 1.5 - 0.75) + (lobe === -1 ? Math.PI / 2 : (Math.PI * 3) / 2);
                    }

                    particles.push({
                        x: cx + r * Math.cos(theta),
                        y: cy + r * Math.sin(theta),
                        alpha: Math.random() * 0.8 + 0.2,
                        life: Math.random() * 50 + 50
                    });
                }
            }

            // Draw and age particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha * (p.life / 100)})`; // Cyan-400
                ctx.fill();

                p.life -= 1;
                if (p.life <= 0) particles.splice(i, 1);
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [orbital]);

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-zinc-900 border-b border-white/5 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                        <Orbit size={18} className="text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Probability Density</h3>
                        <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Wave Function Visualizer</p>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col items-center">
                <div className="relative w-full max-w-sm aspect-square bg-black/50 border border-white/5 rounded-full mb-8 overflow-hidden flex items-center justify-center shadow-inner">
                    <canvas ref={canvasRef} width={400} height={400} className="w-full h-full" />
                    {/* Crosshairs */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                        <div className="w-full h-px bg-cyan-500" />
                        <div className="absolute h-full w-px bg-cyan-500" />
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
                    {(['1s', '2s', '2px', '2py'] as OrbitalType[]).map(orb => (
                        <button
                            key={orb}
                            onClick={() => setOrbital(orb)}
                            className={`py-2 rounded-lg text-xs font-bold font-mono transition-all border ${orbital === orb ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-white'}`}
                        >
                            {orb}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}