"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScanEye, EyeOff, LayoutTemplate } from 'lucide-react';

export default function SemanticScanner() {
  const [xray, setXray] = useState(false);

  return (
    <div className="w-full bg-slate-900/90 border border-orange-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      {/* Header Controls */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
        <div className="flex items-center gap-2">
            <LayoutTemplate className="text-orange-400" size={18} />
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">Structure Scanner</h3>
        </div>
        <button 
            onClick={() => setXray(!xray)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${xray ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-white/10 text-slate-400 hover:bg-white/20'}`}
        >
            {xray ? <ScanEye size={14} /> : <EyeOff size={14} />} 
            {xray ? 'X-Ray Active' : 'Visual Mode'}
        </button>
      </div>

      {/* The "Website" Preview */}
      <div className="p-8 h-[400px] bg-slate-950/50 relative flex flex-col gap-4">
        
        {/* Header */}
        <SemanticBlock tag="header" color="border-orange-500" bg="bg-orange-500/10" xray={xray} label="Header">
            <div className="flex items-center justify-between opacity-50">
                <div className="w-8 h-8 rounded-full bg-white/20" />
                <div className="h-4 w-32 bg-white/10 rounded" />
            </div>
        </SemanticBlock>

        <div className="flex flex-1 gap-4">
            {/* Main Content */}
            <div className="flex-[3] flex flex-col gap-4">
                <SemanticBlock tag="main" color="border-sky-500" bg="bg-sky-500/10" xray={xray} label="Main Content">
                    <SemanticBlock tag="article" color="border-emerald-500" bg="bg-emerald-500/10" xray={xray} label="Article">
                        <div className="space-y-3 opacity-50 p-2">
                            <div className="h-6 w-3/4 bg-white/20 rounded" />
                            <div className="h-3 w-full bg-white/10 rounded" />
                            <div className="h-3 w-full bg-white/10 rounded" />
                            <div className="h-3 w-2/3 bg-white/10 rounded" />
                        </div>
                    </SemanticBlock>
                </SemanticBlock>
            </div>

            {/* Sidebar */}
            <div className="flex-1">
                <SemanticBlock tag="aside" color="border-purple-500" bg="bg-purple-500/10" xray={xray} label="Sidebar">
                    <div className="space-y-4 opacity-50 p-2">
                        <div className="h-20 w-full bg-white/10 rounded" />
                        <div className="h-20 w-full bg-white/10 rounded" />
                    </div>
                </SemanticBlock>
            </div>
        </div>

        {/* Footer */}
        <SemanticBlock tag="footer" color="border-slate-500" bg="bg-slate-500/10" xray={xray} label="Footer">
            <div className="flex justify-center opacity-50">
                 <div className="h-3 w-40 bg-white/10 rounded" />
            </div>
        </SemanticBlock>

      </div>
    </div>
  );
}

function SemanticBlock({ tag, color, bg, xray, children, label }: any) {
    return (
        <motion.div 
            layout
            className={`relative rounded-lg border-2 border-dashed p-4 flex flex-col justify-center transition-all duration-300 ${xray ? `${color} ${bg}` : 'border-transparent bg-slate-800'}`}
        >
            {/* The Tag Label (Only visible in X-Ray) */}
            <div className={`absolute -top-3 left-4 px-2 bg-slate-900 border ${color} text-[10px] font-mono font-bold text-white transition-opacity duration-300 ${xray ? 'opacity-100' : 'opacity-0'}`}>
                &lt;{tag}&gt;
            </div>

            {/* The Visual Label (Only visible in Visual Mode) */}
            <div className={`absolute inset-0 flex items-center justify-center text-slate-500 font-bold uppercase tracking-widest pointer-events-none transition-opacity duration-300 ${xray ? 'opacity-0' : 'opacity-20'}`}>
                {label}
            </div>

            {children}
        </motion.div>
    )
}