"use client";
import React, { useState, useEffect } from 'react';
import { Zap, Activity, Cpu, Server } from 'lucide-react';

export default function SmartGridMonitor() {
  const [load, setLoad] = useState([45, 62, 30, 88]); // Load for 4 sectors

  // Simulate fluctuating power load
  useEffect(() => {
    const interval = setInterval(() => {
        setLoad(prev => prev.map(v => {
            const change = Math.floor(Math.random() * 10) - 5;
            return Math.max(10, Math.min(100, v + change));
        }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row h-[400px]">
      
      {/* LEFT: VISUALIZER */}
      <div className="flex-1 relative bg-slate-50 p-8 flex items-center justify-center">
          {/* Central Hub */}
          <div className="relative z-10 w-24 h-24 bg-white border-4 border-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <Cpu size={40} className="text-slate-700" />
              <div className="absolute -bottom-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core Logic</div>
          </div>

          {/* Satellites */}
          {load.map((val, i) => {
              const angle = (i * 90) * (Math.PI / 180);
              const r = 120;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              
              return (
                  <div key={i} className="absolute" style={{ transform: `translate(${x}px, ${y}px)` }}>
                      {/* Connection Line */}
                      <div 
                        className="absolute top-1/2 left-1/2 h-1 bg-slate-300 origin-left -z-10"
                        style={{ 
                            width: r, 
                            transform: `translate(${-x}px, ${-y}px) rotate(${i * 90}deg) scaleX(-1)`, // Reverse rotate to point to center
                        }} 
                      />
                      
                      {/* Node */}
                      <div className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center shadow-sm transition-colors duration-500 ${val > 80 ? 'bg-red-50 border-red-500' : 'bg-white border-blue-500'}`}>
                          <Server size={16} className={val > 80 ? 'text-red-500' : 'text-blue-500'} />
                          <div className="text-xs font-mono font-bold mt-1">{val}%</div>
                      </div>
                  </div>
              )
          })}
      </div>

      {/* RIGHT: DATA FEED */}
      <div className="w-full md:w-64 bg-slate-100 border-l border-slate-200 p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-6 text-xs font-bold text-amber-600 uppercase tracking-widest">
              <Zap size={14} /> Smart Grid Uplink
          </div>

          <div className="space-y-4">
              {load.map((val, i) => (
                  <div key={i}>
                      <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mb-1">
                          <span>Sector 0{i+1}</span>
                          <span className={val > 80 ? 'text-red-500' : 'text-slate-700'}>{val > 80 ? 'OVERLOAD' : 'NOMINAL'}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${val > 80 ? 'bg-red-500' : 'bg-blue-500'}`}
                            style={{ width: `${val}%` }} 
                          />
                      </div>
                  </div>
              ))}
          </div>

          <div className="mt-auto p-3 bg-white border border-slate-200 rounded text-[10px] text-slate-500 font-mono leading-relaxed">
              &gt; SYSTEM: DAVIS_HALL_MAIN<br/>
              &gt; LEED_STATUS: GOLD<br/>
              &gt; SENSORS: ACTIVE
          </div>
      </div>

    </div>
  );
}