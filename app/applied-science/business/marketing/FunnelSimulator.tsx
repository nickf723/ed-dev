"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Users, DollarSign } from 'lucide-react';

export default function FunnelSimulator() {
  const [traffic, setTraffic] = useState(10000);
  const [ctr, setCtr] = useState(5); // Click Through Rate
  const [interest, setInterest] = useState(20); // Interest/Engagement
  const [conversion, setConversion] = useState(3); // Final Sale

  // Calculate funnel steps
  const visitors = Math.floor(traffic * (ctr / 100));
  const leads = Math.floor(visitors * (interest / 100));
  const customers = Math.floor(leads * (conversion / 100));
  const revenue = customers * 50; // $50 AOV

  return (
    <div className="w-full p-6 bg-slate-900/80 border border-rose-500/20 rounded-2xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Filter className="text-rose-400" size={18} /> The Conversion Funnel
        </h3>
        <div className="px-3 py-1 bg-rose-500/10 rounded-full border border-rose-500/30 flex items-center gap-2">
            <DollarSign size={12} className="text-rose-400" />
            <span className="text-xs font-mono font-bold text-white">${revenue.toLocaleString()}</span>
        </div>
      </div>

      {/* The Visual Funnel */}
      <div className="flex flex-col items-center gap-1 mb-8">
        <FunnelStage width="100%" label="Impressions" count={traffic} color="bg-slate-700" />
        <FunnelStage width="70%" label="Clicks (Traffic)" count={visitors} color="bg-rose-900/60" />
        <FunnelStage width="45%" label="Leads (Interest)" count={leads} color="bg-rose-600/60" />
        <FunnelStage width="20%" label="Sales (Action)" count={customers} color="bg-rose-500" isFinal />
      </div>

      {/* Controls */}
      <div className="space-y-4 bg-black/20 p-4 rounded-xl">
        <Control label="Ad Reach (Impressions)" value={traffic} max={50000} onChange={setTraffic} unit="" />
        <Control label="Click-Through Rate (%)" value={ctr} max={20} onChange={setCtr} unit="%" />
        <Control label="Landing Page Conv. (%)" value={interest} max={100} onChange={setInterest} unit="%" />
        <Control label="Checkout Conv. (%)" value={conversion} max={20} onChange={setConversion} unit="%" />
      </div>
    </div>
  );
}

function FunnelStage({ width, label, count, color, isFinal = false }: any) {
    return (
        <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: width }}
            className={`h-12 relative ${color} rounded-sm flex items-center justify-center text-center backdrop-blur-sm border border-white/5`}
        >
            <div className="leading-tight">
                <div className="text-[9px] uppercase tracking-widest text-white/60">{label}</div>
                <div className={`text-sm font-black ${isFinal ? 'text-white' : 'text-slate-200'}`}>
                    {count.toLocaleString()}
                </div>
            </div>
        </motion.div>
    )
}

function Control({ label, value, max, onChange, unit }: any) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                <span>{label}</span>
                <span>{value.toLocaleString()}{unit}</span>
            </div>
            <input 
                type="range" min="0" max={max} value={value} 
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
        </div>
    )
}