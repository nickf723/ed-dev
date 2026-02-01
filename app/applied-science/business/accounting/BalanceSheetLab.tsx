"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

export default function BalanceSheetLab() {
  const [assets, setAssets] = useState(10000);
  const [liabilities, setLiabilities] = useState(4000);
  const [equity, setEquity] = useState(6000);

  const totalClaims = liabilities + equity;
  const isBalanced = Math.abs(assets - totalClaims) < 100; // Tolerance

  return (
    <div className="w-full p-6 bg-slate-900/90 border border-emerald-500/20 rounded-2xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Scale className="text-emerald-400" size={18} /> The Accounting Equation
        </h3>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${isBalanced ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-rose-500/10 border-rose-500/50 text-rose-400'}`}>
          {isBalanced ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
          {isBalanced ? 'Books Balanced' : 'Unbalanced'}
        </div>
      </div>

      {/* Visualizer */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 h-40">
        {/* Left Side: Assets */}
        <div className="flex-1 flex flex-col justify-end">
          <motion.div 
            animate={{ height: `${Math.min(100, assets / 200)}%` }}
            className="w-full bg-emerald-500 rounded-t-lg relative group"
          >
            <div className="absolute inset-0 flex items-center justify-center text-emerald-950 font-bold text-xs">ASSETS</div>
          </motion.div>
          <div className="text-center text-xs text-slate-400 mt-2 font-mono">${assets.toLocaleString()}</div>
        </div>

        <div className="flex items-center justify-center text-slate-500 font-black text-xl">=</div>

        {/* Right Side: Liab + Equity */}
        <div className="flex-1 flex flex-col justify-end">
          <div className="w-full h-full flex flex-col justify-end">
            <motion.div 
              animate={{ height: `${Math.min(100, liabilities / 200)}%` }}
              className="w-full bg-rose-400 rounded-t-lg relative border-b border-black/20"
            >
               <div className="absolute inset-0 flex items-center justify-center text-rose-950 font-bold text-[10px]">LIABILITIES</div>
            </motion.div>
            <motion.div 
              animate={{ height: `${Math.min(100, equity / 200)}%` }}
              className="w-full bg-blue-400 relative"
            >
               <div className="absolute inset-0 flex items-center justify-center text-blue-950 font-bold text-[10px]">EQUITY</div>
            </motion.div>
          </div>
          <div className="text-center text-xs text-slate-400 mt-2 font-mono">${totalClaims.toLocaleString()}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4 bg-black/20 p-4 rounded-xl">
        <Control label="Total Assets (Resources)" value={assets} onChange={setAssets} color="accent-emerald-500" />
        <Control label="Liabilities (Debt)" value={liabilities} onChange={setLiabilities} color="accent-rose-500" />
        <Control label="Equity (Ownership)" value={equity} onChange={setEquity} color="accent-blue-500" />
      </div>
    </div>
  );
}

function Control({ label, value, onChange, color }: { label: string, value: number, onChange: (n: number) => void, color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
        <span>{label}</span>
        <span>${value.toLocaleString()}</span>
      </div>
      <input 
        type="range" min="0" max="20000" step="100" value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer ${color}`}
      />
    </div>
  )
}