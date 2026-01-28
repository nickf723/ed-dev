"use client";
import React, { useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, DollarSign } from "lucide-react";

export function DeckAnalytics() {
  const { scanner } = useAppStore();
  const cards = scanner.history;

  // 1. CALCULATE TOTAL VALUE
  const totalValue = useMemo(() => {
    return cards.reduce((sum, card) => sum + (card.price || 0), 0).toFixed(2);
  }, [cards]);

  // 2. CALCULATE MANA CURVE
  const manaCurve = useMemo(() => {
    const distribution = Array(8).fill(0); // Buckets for 0-7+ mana
    cards.forEach(card => {
      const cost = Math.min(Math.floor(card.cmc), 7); // Cap at 7
      distribution[cost]++;
    });
    return distribution.map((count, cost) => ({
      cost: cost === 7 ? "7+" : cost.toString(),
      count: count
    }));
  }, [cards]);

  if (cards.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* METRIC 1: COLLECTION VALUE */}
      <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-950/10 backdrop-blur-md flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-1">
            Collection Value
          </div>
          <div className="text-3xl font-black text-emerald-400">
            ${totalValue}
          </div>
        </div>
        <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <DollarSign size={20} className="text-emerald-500" />
        </div>
      </div>

      {/* METRIC 2: AVERAGE CMC */}
      <div className="p-6 rounded-xl border border-purple-500/20 bg-purple-950/10 backdrop-blur-md flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-purple-600 mb-1">
            Avg. Mana Cost
          </div>
          <div className="text-3xl font-black text-purple-400">
             {(cards.reduce((a, b) => a + b.cmc, 0) / cards.length || 0).toFixed(1)}
          </div>
        </div>
        <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20">
            <TrendingUp size={20} className="text-purple-500" />
        </div>
      </div>

      {/* CHART: MANA CURVE */}
      <div className="lg:col-span-3 h-64 p-4 rounded-xl border border-white/5 bg-black/40 backdrop-blur-md">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
            Mana Curve Distribution
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={manaCurve}>
            <XAxis 
                dataKey="cost" 
                stroke="#475569" 
                tick={{fill: '#475569', fontSize: 10}} 
                tickLine={false}
                axisLine={false}
            />
            <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#fff' }}
                itemStyle={{ color: '#22d3ee' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {manaCurve.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#22d3ee" : "#0891b2"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}