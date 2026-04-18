"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Box, Combine, ArrowRight } from 'lucide-react';

export default function VolumeVisualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [resolution, setResolution] = useState(6); // Grid subdivisions (N)

    // Mathematical Surface: an upside-down paraboloid shifted up
    // f(x,y) = 4 - (x^2 + y^2) / 4
    const f = (x: number, y: number) => Math.max(0, 4 - (x * x + y * y) / 4);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let angleZ = Math.PI / 4; // Auto-rotation angle

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const cx = canvas.width / 2;
            const cy = canvas.height / 2 + 80;
            const scale = 25;
            
            const gridMin = -4;
            const gridMax = 4;
            const step = (gridMax - gridMin) / resolution;

            // 1. Generate all the 3D columns
            const blocks = [];
            let totalVolume = 0;

            for (let x = gridMin; x < gridMax; x += step) {
                for (let y = gridMin; y < gridMax; y += step) {
                    // Sample height at the center of the grid cell
                    const midX = x + step / 2;
                    const midY = y + step / 2;
                    const z = f(midX, midY);
                    
                    if (z > 0.1) {
                        blocks.push({ x: midX, y: midY, z, step });
                        totalVolume += (z * step * step);
                    }
                }
            }

            // 2. Isometric Projection Math
            const project = (px: number, py: number, pz: number) => {
                const rotX = px * Math.cos(angleZ) - py * Math.sin(angleZ);
                const rotY = px * Math.sin(angleZ) + py * Math.cos(angleZ);
                const tiltX = Math.PI / 6; // Isometric tilt
                
                const screenX = cx + rotX * scale;
                const screenY = cy + (rotY * Math.sin(tiltX) - pz * Math.cos(tiltX)) * scale;
                // Calculate distance from camera for depth sorting (Painter's Algorithm)
                const depth = rotY; 
                return { x: screenX, y: screenY, depth };
            };

            // 3. Sort blocks back-to-front
            blocks.sort((a, b) => {
                const projA = project(a.x, a.y, 0);
                const projB = project(b.x, b.y, 0);
                return projA.depth - projB.depth;
            });

            // 4. Draw Blocks
            blocks.forEach(block => {
                const hw = block.step / 2; // half-width
                
                // 4 top corners
                const t1 = project(block.x - hw, block.y - hw, block.z);
                const t2 = project(block.x + hw, block.y - hw, block.z);
                const t3 = project(block.x + hw, block.y + hw, block.z);
                const t4 = project(block.x - hw, block.y + hw, block.z);
                
                // 4 bottom corners
                const b1 = project(block.x - hw, block.y - hw, 0);
                const b2 = project(block.x + hw, block.y - hw, 0);
                const b3 = project(block.x + hw, block.y + hw, 0);
                const b4 = project(block.x - hw, block.y + hw, 0);

                const colorBase = Math.min(255, 100 + block.z * 30);
                
                // Top Face (Fuchsia)
                ctx.fillStyle = `rgba(217, 70, 239, 0.8)`;
                ctx.strokeStyle = `rgba(255, 255, 255, 0.3)`;
                ctx.beginPath();
                ctx.moveTo(t1.x, t1.y); ctx.lineTo(t2.x, t2.y); ctx.lineTo(t3.x, t3.y); ctx.lineTo(t4.x, t4.y);
                ctx.closePath();
                ctx.fill(); ctx.stroke();

                // Left Face (Darker Rose)
                ctx.fillStyle = `rgba(159, 18, 57, 0.9)`;
                ctx.beginPath();
                ctx.moveTo(b1.x, b1.y); ctx.lineTo(b4.x, b4.y); ctx.lineTo(t4.x, t4.y); ctx.lineTo(t1.x, t1.y);
                ctx.closePath();
                ctx.fill(); ctx.stroke();

                // Right Face (Medium Rose)
                ctx.fillStyle = `rgba(225, 29, 72, 0.9)`;
                ctx.beginPath();
                ctx.moveTo(b4.x, b4.y); ctx.lineTo(b3.x, b3.y); ctx.lineTo(t3.x, t3.y); ctx.lineTo(t4.x, t4.y);
                ctx.closePath();
                ctx.fill(); ctx.stroke();
            });

            // Update Volume Display HUD
            ctx.fillStyle = "#f43f5e"; // Rose 500
            ctx.font = "bold 14px monospace";
            ctx.fillText(`Est. Volume ≈ ${totalVolume.toFixed(2)} units³`, 20, 30);

            angleZ += 0.005;
            animId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animId);
    }, [resolution]);

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-fuchsia-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans">
            <div className="bg-fuchsia-950/30 border-b border-fuchsia-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-fuchsia-500/20 border border-fuchsia-500/30 rounded-lg">
                        <Combine size={18} className="text-fuchsia-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">3D Riemann Sums</h3>
                        <p className="text-[10px] text-fuchsia-300/60 font-mono uppercase tracking-widest">Discrete Volume Approximation</p>
                    </div>
                </div>
            </div>

            <div className="p-0 bg-black/60 border-b border-white/5 relative">
                <canvas ref={canvasRef} width={500} height={350} className="w-full h-[350px]" />
            </div>

            <div className="p-6">
                <div className="mb-2 flex justify-between items-end">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                        Grid Resolution (N = {resolution})
                    </label>
                    <span className="text-[10px] text-zinc-500 font-mono text-right">
                        Higher N approaches true volume
                    </span>
                </div>
                
                <input 
                    type="range" 
                    min="2" 
                    max="24" 
                    step="1"
                    value={resolution}
                    onChange={(e) => setResolution(parseInt(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                />
                
                <div className="mt-6 p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex items-start gap-3">
                    <ArrowRight className="text-fuchsia-400 shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        Notice how small values of N leave jagged, inaccurate gaps. As you drag the slider to the right, the discrete rectangular prisms shrink, seamlessly packing together to approach the true, smooth continuous surface of the mathematical function.
                    </p>
                </div>
            </div>
        </div>
    );
}