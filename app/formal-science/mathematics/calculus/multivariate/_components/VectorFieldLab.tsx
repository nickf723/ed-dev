"use client";
import React, { useEffect, useRef, useState } from 'react';
import { MousePointerClick, RefreshCw, Navigation, Zap } from 'lucide-react';

export default function VectorFieldLab() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [particles, setParticles] = useState<{x: number, y: number, life: number}[]>([]);
    
    // We are graphing f(x,y) = sin(x) * sin(y)
    // The gradient (partial derivatives) is ∇f = <cos(x)sin(y), sin(x)cos(y)>
    const getGradient = (x: number, y: number) => {
        return {
            dx: Math.cos(x) * Math.sin(y),
            dy: Math.sin(x) * Math.cos(y)
        };
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        
        // Convert screen coordinates to math coordinates (domain -5 to 5)
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;
        const mathX = ((screenX / canvas.width) * 10) - 5;
        const mathY = -(((screenY / canvas.height) * 10) - 5); // Invert Y for math

        setParticles(prev => [...prev, { x: mathX, y: mathY, life: 150 }]);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;

        const drawArrow = (x: number, y: number, angle: number, magnitude: number) => {
            const length = magnitude * 15; // Scale for visibility
            if (length < 2) return; // Don't draw tiny arrows at the peaks/valleys
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(length, 0);
            ctx.lineTo(length - 3, -2);
            ctx.moveTo(length, 0);
            ctx.lineTo(length - 3, 2);
            ctx.strokeStyle = `rgba(244, 63, 94, ${Math.min(magnitude, 0.5)})`; // Rose-500, opacity by strength
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 1. Draw Vector Field Grid
            for (let mx = -4.5; mx <= 4.5; mx += 0.5) {
                for (let my = -4.5; my <= 4.5; my += 0.5) {
                    const grad = getGradient(mx, my);
                    const magnitude = Math.sqrt(grad.dx*grad.dx + grad.dy*grad.dy);
                    const angle = Math.atan2(-grad.dy, grad.dx); // -dy because canvas Y is inverted
                    
                    const screenX = ((mx + 5) / 10) * canvas.width;
                    const screenY = ((-my + 5) / 10) * canvas.height;
                    
                    drawArrow(screenX, screenY, angle, magnitude);
                }
            }

            // 2. Update and Draw Particles (Gradient Ascent)
            setParticles(prev => prev.map(p => {
                if (p.life <= 0) return p;
                
                const grad = getGradient(p.x, p.y);
                const learningRate = 0.05; // Step size
                
                // Move particle IN the direction of the gradient to find the peak
                const nextX = p.x + (grad.dx * learningRate);
                const nextY = p.y + (grad.dy * learningRate);

                const screenX = ((p.x + 5) / 10) * canvas.width;
                const screenY = ((-p.y + 5) / 10) * canvas.height;

                ctx.beginPath();
                ctx.arc(screenX, screenY, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#10b981'; // Emerald-500
                ctx.fill();
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#10b981';

                return { x: nextX, y: nextY, life: p.life - 1 };
            }).filter(p => p.life > 0));

            animId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animId);
    }, []);

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-rose-500/20 rounded-2xl overflow-hidden shadow-2xl mt-8">
            <div className="bg-rose-950/30 border-b border-rose-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                        <Navigation size={18} className="text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Vector Field Simulator</h3>
                        <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">f(x,y) = sin(x)sin(y)</p>
                    </div>
                </div>
                <button 
                    onClick={() => setParticles([])}
                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-400 font-bold text-[10px] uppercase tracking-widest transition-colors"
                >
                    <RefreshCw size={12} /> Clear Particles
                </button>
            </div>

            <div className="p-0 bg-black/60 relative cursor-crosshair">
                <canvas 
                    ref={canvasRef} 
                    width={500} 
                    height={350} 
                    className="w-full h-[350px]"
                    onClick={handleCanvasClick}
                />
                
                {particles.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/80 border border-emerald-500/30 px-4 py-2 rounded-lg flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                            <MousePointerClick size={16} /> Click to drop tracer
                        </div>
                    </div>
                )}
            </div>

            <div className="p-5 border-t border-white/5 bg-zinc-900/50">
                <div className="flex items-start gap-3">
                    <Zap className="text-amber-400 shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        <strong>Gradient Ascent:</strong> You are looking down at a 2D map of a bumpy 3D surface. The red arrows are the Gradient (<span className="font-mono text-rose-300">∇f</span>), pointing toward the steepest uphill incline. Drop a green particle to watch it follow the math to the nearest local maximum!
                    </p>
                </div>
            </div>
        </div>
    );
}