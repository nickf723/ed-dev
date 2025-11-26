"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Minus, Plus } from "lucide-react";

export default function SupplyDemandWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State: Shifts in the curves (0 = neutral)
  const [demandShift, setDemandShift] = useState(0);
  const [supplyShift, setSupplyShift] = useState(0);
  
  // Calculate Equilibrium
  // Demand: P = 100 - Q + dShift
  // Supply: P = Q + sShift
  // Equil: 100 - Q + d = Q + s  =>  2Q = 100 + d - s  => Q = 50 + (d-s)/2
  const qEq = 50 + (demandShift - supplyShift) / 2;
  const pEq = qEq + supplyShift;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const padding = 20;
    
    const draw = () => {
        ctx.clearRect(0, 0, w, h);
        
        // Grid / Axis
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, h - padding); // Y-axis (Price)
        ctx.lineTo(w - padding, h - padding); // X-axis (Quantity)
        ctx.stroke();
        
        // Scaling factors
        const scaleX = (w - 2*padding) / 100;
        const scaleY = (h - 2*padding) / 100;
        
        const mapX = (q: number) => padding + q * scaleX;
        const mapY = (p: number) => h - padding - p * scaleY;

        // Draw Demand (Red)
        // P = 100 - Q + shift
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(mapX(0), mapY(100 + demandShift));
        ctx.lineTo(mapX(100), mapY(0 + demandShift));
        ctx.stroke();

        // Draw Supply (Blue)
        // P = Q + shift
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(mapX(0), mapY(0 + supplyShift));
        ctx.lineTo(mapX(100), mapY(100 + supplyShift));
        ctx.stroke();

        // Draw Equilibrium Point
        const eqX = mapX(qEq);
        const eqY = mapY(pEq);
        
        if (eqX > padding && eqX < w - padding && eqY > padding && eqY < h - padding) {
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(eqX, eqY, 6, 0, Math.PI * 2);
            ctx.fill();
            
            // Dotted lines to axis
            ctx.setLineDash([4, 4]);
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 1;
            
            ctx.beginPath();
            ctx.moveTo(eqX, eqY);
            ctx.lineTo(padding, eqY); // To Price axis
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(eqX, eqY);
            ctx.lineTo(eqX, h - padding); // To Qty axis
            ctx.stroke();
            ctx.setLineDash([]);
        }
    };

    draw();
  }, [demandShift, supplyShift]);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <TrendingUp size={14} className="text-emerald-400" /> Market Forces
        </h3>
        <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="text-red-400">D</span>
            <span className="text-neutral-600">vs</span>
            <span className="text-blue-400">S</span>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* Graph */}
        <div className="relative mb-6 bg-black/40 rounded border border-white/5 shadow-inner">
            <canvas ref={canvasRef} width={240} height={180} className="w-[240px] h-[180px]" />
            <div className="absolute left-1 top-1 text-[8px] text-neutral-500 font-bold uppercase">Price</div>
            <div className="absolute right-1 bottom-1 text-[8px] text-neutral-500 font-bold uppercase">Qty</div>
        </div>

        {/* Controls */}
        <div className="w-full space-y-4">
            {/* Demand Control */}
            <div>
                <div className="flex justify-between text-[10px] font-bold text-neutral-400 mb-1">
                    <span>Demand (Consumer Interest)</span>
                    <span className={demandShift > 0 ? "text-green-400" : demandShift < 0 ? "text-red-400" : "text-neutral-500"}>
                        {demandShift > 0 ? "+" : ""}{demandShift}
                    </span>
                </div>
                <input 
                    type="range" min="-30" max="30" step="1"
                    value={demandShift}
                    onChange={(e) => setDemandShift(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
            </div>

            {/* Supply Control */}
            <div>
                <div className="flex justify-between text-[10px] font-bold text-neutral-400 mb-1">
                    <span>Supply (Production Cost)</span>
                    <span className={supplyShift > 0 ? "text-red-400" : supplyShift < 0 ? "text-green-400" : "text-neutral-500"}>
                        {supplyShift > 0 ? "-" : ""}{-supplyShift}
                    </span>
                </div>
                <input 
                    type="range" min="-30" max="30" step="1"
                    value={-supplyShift} // Inverted logic for UI: Right = More Supply (Lower cost)
                    onChange={(e) => setSupplyShift(-Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
            </div>
        </div>

        {/* Result Panel */}
        <div className="mt-6 w-full grid grid-cols-2 gap-2">
            <div className="bg-neutral-950/50 p-2 rounded border border-white/5 text-center">
                <span className="text-[9px] text-neutral-500 uppercase block">Price</span>
                <span className="text-lg font-bold text-white">${pEq.toFixed(0)}</span>
            </div>
            <div className="bg-neutral-950/50 p-2 rounded border border-white/5 text-center">
                <span className="text-[9px] text-neutral-500 uppercase block">Units Sold</span>
                <span className="text-lg font-bold text-white">{qEq.toFixed(0)}k</span>
            </div>
        </div>

      </div>
    </div>
  );
}