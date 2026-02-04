"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrainFront } from 'lucide-react';

export default function ChicagoTransitMap() {
  // Mock Data for "Next Arrivals"
  const [arrivals, setArrivals] = useState([
    { line: 'Red', dest: 'Howard', time: 2 },
    { line: 'Blue', dest: 'O\'Hare', time: 5 },
    { line: 'Brown', dest: 'Kimball', time: 8 },
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setArrivals(prev => prev.map(t => ({
        ...t,
        time: t.time <= 0 ? Math.floor(Math.random() * 12) + 2 : t.time - 1
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-900/90 border border-slate-700 rounded-2xl overflow-hidden flex flex-col md:flex-row h-[300px]">
      
      {/* LEFT: THE MAP (Abstract Loop) */}
      <div className="relative flex-1 bg-[#0f172a] p-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')]" />
        
        <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* The Loop Structure */}
            <path d="M 100 80 L 300 80 L 300 220 L 100 220 Z" fill="none" stroke="#334155" strokeWidth="12" />
            
            {/* Red Line (Through) */}
            <motion.path 
                d="M 120 300 L 120 0" 
                fill="none" stroke="#dc2626" strokeWidth="4" 
                strokeDasharray="10 10"
            />
            {/* Train Red */}
            <motion.circle r="6" fill="#dc2626" stroke="white" strokeWidth="2">
                <animateMotion dur="8s" repeatCount="indefinite" path="M 120 300 L 120 0" />
            </motion.circle>

            {/* Blue Line (Curve) */}
            <motion.path 
                d="M 0 150 L 150 150 Q 200 150 200 100 L 200 0" 
                fill="none" stroke="#3b82f6" strokeWidth="4" 
            />
            {/* Train Blue */}
            <motion.circle r="6" fill="#3b82f6" stroke="white" strokeWidth="2">
                <animateMotion dur="12s" repeatCount="indefinite" path="M 0 150 L 150 150 Q 200 150 200 100 L 200 0" />
            </motion.circle>

            {/* Brown Line (The Loop) */}
            <motion.path 
                d="M 100 80 L 300 80 L 300 220 L 100 220 Z" 
                fill="none" stroke="#92400e" strokeWidth="4"
            />
            {/* Train Brown */}
            <motion.circle r="6" fill="#92400e" stroke="white" strokeWidth="2">
                <animateMotion dur="15s" repeatCount="indefinite" path="M 100 80 L 300 80 L 300 220 L 100 220 Z" />
            </motion.circle>

            {/* Station Markers */}
            <rect x="90" y="70" width="20" height="20" fill="#1e293b" stroke="white" rx="4" />
            <rect x="290" y="70" width="20" height="20" fill="#1e293b" stroke="white" rx="4" />
            <rect x="290" y="210" width="20" height="20" fill="#1e293b" stroke="white" rx="4" />
            <rect x="90" y="210" width="20" height="20" fill="#1e293b" stroke="white" rx="4" />
        </svg>

        <div className="absolute bottom-2 right-2 text-[9px] font-mono text-slate-500 bg-black/50 px-2 py-1 rounded">
            CTA TRACKER /// LIVE
        </div>
      </div>

      {/* RIGHT: THE BOARD */}
      <div className="w-full md:w-48 bg-black/40 border-l border-slate-700 p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <TrainFront size={14} /> Arrivals
          </div>
          <div className="space-y-2">
              {arrivals.map((t) => (
                  <div key={t.line} className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5">
                      <div>
                          <div className={`text-xs font-bold ${t.line === 'Red' ? 'text-red-500' : t.line === 'Blue' ? 'text-blue-400' : 'text-amber-700'}`}>
                              {t.line} Line
                          </div>
                          <div className="text-[10px] text-slate-400">{t.dest}</div>
                      </div>
                      <div className="text-xl font-mono font-bold text-white">
                          {t.time}<span className="text-[10px] text-slate-500 ml-0.5">m</span>
                      </div>
                  </div>
              ))}
          </div>
          <div className="mt-auto pt-4 border-t border-white/10 text-[9px] text-slate-500 text-center">
              Data: Chicago Transit API
          </div>
      </div>

    </div>
  );
}