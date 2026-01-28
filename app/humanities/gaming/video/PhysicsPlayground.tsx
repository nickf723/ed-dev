"use client";
import React, { useEffect, useRef, useState } from "react";
import { RefreshCw, ArrowUp, ArrowDown, Activity } from "lucide-react";

export default function PhysicsPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Physics Parameters
  const [gravity, setGravity] = useState(0.5);
  const [jumpForce, setJumpForce] = useState(12);
  const [friction, setFriction] = useState(0.85);

  const playerRef = useRef({ x: 150, y: 100, vy: 0, grounded: false });

  const jump = () => {
    if (playerRef.current.grounded) {
        playerRef.current.vy = -jumpForce;
        playerRef.current.grounded = false;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      // CLEAR
      ctx.fillStyle = "#1e1b4b"; // Dark Indigo
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const p = playerRef.current;
      const floorY = canvas.height - 40;

      // PHYSICS UPDATE
      p.vy += gravity;
      p.y += p.vy;

      // COLLISION
      if (p.y + 20 > floorY) {
          p.y = floorY - 20;
          p.vy = 0;
          p.grounded = true;
      } else {
          p.grounded = false;
      }

      // DRAW FLOOR
      ctx.fillStyle = "#4c1d95"; // Violet
      ctx.fillRect(0, floorY, canvas.width, 40);
      
      // DRAW PLAYER
      ctx.fillStyle = "#22d3ee"; // Cyan
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#22d3ee";
      ctx.fillRect(p.x, p.y, 20, 20);
      ctx.shadowBlur = 0;

      // DRAW TRAIL
      ctx.fillStyle = "rgba(34, 211, 238, 0.2)";
      ctx.fillRect(p.x, p.y - p.vy * 2, 20, 20);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [gravity, jumpForce]);

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl bg-black/40 border border-purple-500/30 backdrop-blur-md">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-2">
                <Activity size={16} /> Game Loop Engine
            </h3>
            <button 
                onClick={jump}
                className="px-4 py-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase rounded transition-colors shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            >
                JUMP (Space)
            </button>
        </div>

        <canvas 
            ref={canvasRef} 
            width={300} 
            height={200} 
            className="w-full rounded-lg border border-purple-900/50 cursor-pointer"
            onClick={jump}
        />

        {/* CONTROLS */}
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <div className="flex justify-between text-[10px] uppercase text-purple-300">
                    <span>Gravity</span>
                    <span>{gravity.toFixed(1)}</span>
                </div>
                <input 
                    type="range" min="0.1" max="2.0" step="0.1" 
                    value={gravity} onChange={(e) => setGravity(parseFloat(e.target.value))}
                    className="w-full h-1 bg-purple-900 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
                />
            </div>
            <div className="space-y-1">
                <div className="flex justify-between text-[10px] uppercase text-purple-300">
                    <span>Jump Force</span>
                    <span>{jumpForce}</span>
                </div>
                <input 
                    type="range" min="5" max="25" step="1" 
                    value={jumpForce} onChange={(e) => setJumpForce(parseFloat(e.target.value))}
                    className="w-full h-1 bg-purple-900 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
                />
            </div>
        </div>
    </div>
  );
}