"use client";
import { useState } from "react";
import { TrendingUp, DollarSign, Package } from "lucide-react";

export default function SupplyDemand() {
  // Shifts: -50 to 50
  const [demandShift, setDemandShift] = useState(0);
  const [supplyShift, setSupplyShift] = useState(0);

  // Graph Constants
  const size = 200;
  const padding = 20;
  
  // Calculate Lines
  // Demand: y = -x + b (starts high left, goes low right)
  // Supply: y = x + b (starts low left, goes high right)
  
  // Base Intercepts (visual coordinates, 0,0 is top left)
  // Higher value = lower on screen visually
  const baseD = 100; // Y-intercept for Demand
  const baseS = 100; // Y-intercept for Supply
  
  // Shifts move the lines.
  // Increase Demand (Right shift) -> Line moves UP visually (lower Y value) or Right
  // Increase Supply (Right shift) -> Line moves DOWN visually (lower Y value? No, Supply shift right means more Q for same P, effectively lower price)
  
  // Let's model simply:
  // Demand Y = -X + 200 + shiftD (Inverted Y axis means shiftD should reduce Y to move "Up/Right")
  // Actually simpler: 
  // Demand: P = 100 - Q + D_Shift
  // Supply: P = 0 + Q - S_Shift
  // Equilibrium: 100 - Q + D = Q - S => 2Q = 100 + D + S => Q = (100 + D + S)/2
  // P = Q - S
  
  const Q_eq = (100 + demandShift + supplyShift) / 2;
  const P_eq = Q_eq - supplyShift; // Visual Price (0 is bottom)
  
  // Convert to SVG coords (0,0 is top-left)
  // Let X be 0-200 (Q)
  // Let Y be 200-0 (P)
  
  const graphQ = Q_eq + 50; // Center it a bit
  const graphP = 200 - (P_eq + 50); // Invert Y

  return (
    <div className="bg-[#0f172a]/90 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl max-w-sm w-full">
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-emerald-100 flex items-center gap-2 font-serif tracking-wider">
                <TrendingUp size={18} className="text-emerald-500" /> MARKET MAKER
            </h3>
            <span className="text-xs font-mono text-emerald-500 uppercase">Equilibrium</span>
        </div>

        {/* GRAPH VISUALIZER */}
        <div className="relative h-48 w-full bg-black/40 border-l border-b border-slate-500 mb-6">
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                {/* Demand Line (Blue) - Downward */}
                {/* Visual approximation: starts at (0, 0-shift) goes to (200, 200-shift) */}
                <line 
                    x1="0" y1={50 - demandShift} 
                    x2="200" y2={250 - demandShift} 
                    stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"
                />
                <text x="10" y={200 - (200 - (250 - demandShift))} fill="#3b82f6" fontSize="10" fontWeight="bold">D</text>

                {/* Supply Line (Red) - Upward */}
                <line 
                    x1="0" y1={250 + supplyShift} 
                    x2="200" y2={50 + supplyShift} 
                    stroke="#ef4444" strokeWidth="3" strokeLinecap="round"
                />
                <text x="10" y={250 + supplyShift} fill="#ef4444" fontSize="10" fontWeight="bold">S</text>

                {/* Equilibrium Point */}
                <circle cx={graphQ} cy={graphP} r="4" fill="#fbbf24" stroke="white" strokeWidth="2" />
                
                {/* Dotted Tracers */}
                <line x1={graphQ} y1={graphP} x2={graphQ} y2="200" stroke="#fbbf24" strokeDasharray="4" strokeWidth="1" opacity="0.5" />
                <line x1="0" y1={graphP} x2={graphQ} y2={graphP} stroke="#fbbf24" strokeDasharray="4" strokeWidth="1" opacity="0.5" />
            </svg>
            
            {/* Axis Labels */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-mono text-slate-400">PRICE ($)</div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-400">QUANTITY (Q)</div>
        </div>

        {/* CONTROLS */}
        <div className="space-y-4">
            
            {/* DEMAND CONTROL */}
            <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                <div className="flex justify-between text-xs text-blue-300 font-bold mb-1">
                    <span>DEMAND</span>
                    <span>{demandShift > 0 ? "+" : ""}{demandShift}</span>
                </div>
                <input 
                    type="range" min="-50" max="50" 
                    value={demandShift} onChange={(e) => setDemandShift(parseInt(e.target.value))}
                    className="w-full h-1 bg-blue-900 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                />
                <div className="flex justify-between text-[8px] text-blue-500/60 mt-1 uppercase">
                    <span>Less Desire</span>
                    <span>More Desire</span>
                </div>
            </div>

            {/* SUPPLY CONTROL */}
            <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                <div className="flex justify-between text-xs text-red-300 font-bold mb-1">
                    <span>SUPPLY</span>
                    <span>{supplyShift > 0 ? "+" : ""}{supplyShift}</span>
                </div>
                <input 
                    type="range" min="-50" max="50" 
                    value={supplyShift} onChange={(e) => setSupplyShift(parseInt(e.target.value))}
                    className="w-full h-1 bg-red-900 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500"
                />
                 <div className="flex justify-between text-[8px] text-red-500/60 mt-1 uppercase">
                    <span>More Scarcity</span>
                    <span>Abundance</span>
                </div>
            </div>
        </div>

        {/* RESULTS */}
        <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-2 bg-black/20 rounded border border-white/5">
                <div className="text-[10px] text-slate-500 font-mono">PRICE</div>
                <div className={`text-xl font-bold ${(200-graphP) > 100 ? "text-emerald-400" : "text-rose-400"}`}>
                    ${Math.round(200 - graphP)}
                </div>
            </div>
            <div className="text-center p-2 bg-black/20 rounded border border-white/5">
                <div className="text-[10px] text-slate-500 font-mono">QUANTITY</div>
                <div className="text-xl font-bold text-white">
                    {Math.round(graphQ)} <span className="text-xs font-normal text-slate-600">units</span>
                </div>
            </div>
        </div>

    </div>
  );
}