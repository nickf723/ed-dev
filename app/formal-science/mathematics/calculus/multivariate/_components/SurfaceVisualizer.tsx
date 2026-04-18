"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Box, RefreshCw, Layers } from 'lucide-react';

type SurfaceType = 'paraboloid' | 'saddle' | 'wave' | 'cone';

export default function SurfaceVisualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [surface, setSurface] = useState<SurfaceType>('saddle');

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let angleZ = 0; // Rotation around vertical axis
        const angleX = Math.PI / 4; // Tilt forward

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2 + 50;
            const scale = 25;

            ctx.lineWidth = 1;
            
            // Generate grid points
            const points: { x: number, y: number, z: number }[][] = [];
            for (let x = -5; x <= 5; x += 0.5) {
                const row = [];
                for (let y = -5; y <= 5; y += 0.5) {
                    let z = 0;
                    if (surface === 'paraboloid') z = (x*x + y*y) * 0.15;
                    if (surface === 'saddle') z = (x*x - y*y) * 0.15;
                    if (surface === 'wave') z = Math.sin(x) + Math.cos(y);
                    if (surface === 'cone') z = Math.sqrt(x*x + y*y);
                    row.push({ x, y, z });
                }
                points.push(row);
            }

            // Project and draw
            const project = (p: {x: number, y: number, z: number}) => {
                // Rotate around Z axis (which is vertical in math, but Y in screen space. Let's do standard math coordinates)
                const rotX = p.x * Math.cos(angleZ) - p.y * Math.sin(angleZ);
                const rotY = p.x * Math.sin(angleZ) + p.y * Math.cos(angleZ);
                
                // Tilt (Isometric projection approximation)
                const screenX = cx + (rotX - rotY) * Math.cos(angleX) * scale;
                const screenY = cy + (rotX + rotY) * Math.sin(angleX) * scale - (p.z * scale * 1.5);
                
                return { x: screenX, y: screenY, z: p.z };
            };

            // Draw wireframe (painter's algorithm rough approximation by drawing back-to-front rows)
            for (let i = 0; i < points.length - 1; i++) {
                for (let j = 0; j < points[i].length - 1; j++) {
                    const p1 = project(points[i][j]);
                    const p2 = project(points[i+1][j]);
                    const p3 = project(points[i][j+1]);

                    // Color based on height (Z)
                    const normalizedZ = (p1.z + 2) / 4; // roughly 0 to 1
                    const r = Math.floor(244 * normalizedZ);
                    const g = Math.floor(63 * (1 - normalizedZ));
                    const b = 94; // Rose to Amber gradient

                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.6)`;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p3.x, p3.y);
                    ctx.stroke();
                }
            }

            angleZ += 0.005;
            animId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animId);
    }, [surface]);

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-rose-500/20 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-rose-950/30 border-b border-rose-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-500/20 border border-rose-500/30 rounded-lg">
                        <Box size={18} className="text-rose-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Topology Visualizer</h3>
                        <p className="text-[10px] text-rose-300/60 font-mono uppercase tracking-widest">3D Isomorphic Projection</p>
                    </div>
                </div>
                <RefreshCw size={14} className="text-rose-500 animate-spin-slow" />
            </div>

            <div className="p-0 bg-black/40 border-b border-white/5 relative">
                <canvas ref={canvasRef} width={500} height={350} className="w-full h-[350px]" />
                
                {/* Overlay Math Label */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 border border-rose-500/30 rounded-md text-xs font-serif text-rose-200">
                    {surface === 'paraboloid' && 'f(x,y) = x² + y²'}
                    {surface === 'saddle' && 'f(x,y) = x² - y²'}
                    {surface === 'wave' && 'f(x,y) = sin(x) + cos(y)'}
                    {surface === 'cone' && 'f(x,y) = √(x² + y²)'}
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => setSurface('paraboloid')} className={`py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${surface === 'paraboloid' ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'}`}>
                        Paraboloid
                    </button>
                    <button onClick={() => setSurface('saddle')} className={`py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${surface === 'saddle' ? 'bg-rose-500/20 border-rose-500/50 text-rose-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'}`}>
                        Saddle Point
                    </button>
                    <button onClick={() => setSurface('wave')} className={`py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${surface === 'wave' ? 'bg-sky-500/20 border-sky-500/50 text-sky-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'}`}>
                        Sine Wave
                    </button>
                    <button onClick={() => setSurface('cone')} className={`py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${surface === 'cone' ? 'bg-green-500/20 border-green-500/50 text-green-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white'}`}>
                        Cone
                    </button>
                </div>
            </div>
        </div>
    );
}