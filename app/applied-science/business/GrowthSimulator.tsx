"use client";
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, PieChart, RefreshCw } from 'lucide-react';

export default function GrowthSimulator() {
  const [allocation, setAllocation] = useState({
    marketing: 30, // Short term boost
    rd: 30,        // Long term exponential
    ops: 40        // Stability/Linear
  });

  // Calculate curve based on inputs
  const points = useMemo(() => {
    let revenue = 100;
    const data = [];
    for (let i = 0; i < 20; i++) { // 20 Quarters
      // Logic: 
      // Marketing gives diminishing returns
      // R&D gives exponential returns later
      // Ops reduces decay
      const growth = 
        (allocation.marketing * 0.05 * Math.max(0, 1 - i * 0.05)) + // Short term
        (allocation.rd * 0.005 * i) + // Long term
        (allocation.ops * 0.02); // Constant
      
      revenue *= (1 + growth / 100);
      data.push(revenue);
    }
    return data;
  }, [allocation]);

  const maxVal = Math.max(...points);

  return (
    <div className="w-full p-6 bg-slate-900/80 border border-emerald-500/20 rounded-2xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-white flex items-center gap-2">
          <TrendingUp className="text-emerald-400" size={18} /> Projection Engine
        </h3>
        <div className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
          Q1 - Q20
        </div>
      </div>

      {/* The Graph */}
      <div className="relative h-40 w-full flex items-end justify-between gap-1 mb-8 overflow-hidden">
        {points.map((val, i) => (
          <div key={i} className="relative w-full group flex flex-col justify-end h-full">
             <motion.div 
               initial={false}
               animate={{ height: `${(val / maxVal) * 100}%` }}
               className="bg-emerald-500/30 border-t-2 border-emerald-400 rounded-t-sm transition-all duration-500 hover:bg-emerald-500/50"
             >
             </motion.div>
             {/* Tooltip */}
             <div className="absolute bottom-0 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] bg-black text-white px-1 rounded">${Math.round(val)}k</span>
             </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <Control 
          label="Marketing (Short Term)" 
          value={allocation.marketing} 
          onChange={(v) => setAllocation({...allocation, marketing: v})} 
          color="accent-emerald-400"
        />
        <Control 
          label="R&D (Long Term Innovation)" 
          value={allocation.rd} 
          onChange={(v) => setAllocation({...allocation, rd: v})} 
          color="accent-blue-400"
        />
        <Control 
          label="Operations (Stability)" 
          value={allocation.ops} 
          onChange={(v) => setAllocation({...allocation, ops: v})} 
          color="accent-slate-400"
        />
      </div>
    </div>
  );
}

function Control({ label, value, onChange, color }: { label: string, value: number, onChange: (n: number) => void, color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <input 
        type="range" min="0" max="100" value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer ${color}`}
      />
    </div>
  )
}