"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Binary, FileText, Activity } from "lucide-react";

export default function EntropyWidget() {
  const [text, setText] = useState("Information");
  const [stats, setStats] = useState({ length: 0, bits: 0, entropy: 0 });

  useEffect(() => {
    const length = text.length;
    const bits = length * 8; // Standard ASCII/UTF-8 approx

    // Calculate Shannon Entropy
    // H(X) = - sum(p(x) * log2(p(x)))
    const freqs: Record<string, number> = {};
    for (const char of text) {
        freqs[char] = (freqs[char] || 0) + 1;
    }
    
    let entropy = 0;
    for (const char in freqs) {
        const p = freqs[char] / length;
        entropy -= p * Math.log2(p);
    }

    setStats({
        length,
        bits,
        entropy: isNaN(entropy) ? 0 : entropy
    });
  }, [text]);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Activity size={14} className="text-cyan-400" /> Information Content
        </h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Input */}
        <div>
            <label className="text-[10px] font-mono uppercase text-neutral-500 mb-2 block">Signal Input</label>
            <input 
                type="text" 
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm font-mono text-cyan-300 focus:border-cyan-500 focus:outline-none transition-colors"
            />
        </div>

        {/* Meters */}
        <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 text-neutral-400 mb-1">
                    <FileText size={12} />
                    <span className="text-[10px] font-bold uppercase">Length</span>
                </div>
                <div className="text-xl font-mono font-bold text-white">{stats.length} <span className="text-xs text-neutral-600">chars</span></div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 text-neutral-400 mb-1">
                    <Binary size={12} />
                    <span className="text-[10px] font-bold uppercase">Raw Data</span>
                </div>
                <div className="text-xl font-mono font-bold text-white">{stats.bits} <span className="text-xs text-neutral-600">bits</span></div>
            </div>
        </div>

        {/* Entropy Visualizer */}
        <div>
            <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-bold uppercase text-cyan-400">Shannon Entropy</span>
                <span className="text-xs font-mono text-cyan-300">{stats.entropy.toFixed(2)} bits/symbol</span>
            </div>
            <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.entropy / 8) * 100}%` }} // Max entropy for byte is 8
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                />
            </div>
            <p className="mt-2 text-[10px] text-neutral-500 leading-relaxed">
                Higher entropy means more unpredictability and "information density." Low entropy implies redundancy.
            </p>
        </div>
      </div>
    </div>
  );
}