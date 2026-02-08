"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mountain, TrendingUp, Clock, Map } from 'lucide-react';

const TRAILS = {
  chautauqua: {
    name: "Chautauqua Loop",
    dist: "3.6 mi",
    gain: "860 ft",
    diff: "Moderate",
    color: "bg-green-500",
    profile: [0, 20, 40, 50, 45, 30, 10, 0] // Abstract elevation data
  },
  sanitas: {
    name: "Mt. Sanitas",
    dist: "3.1 mi",
    gain: "1,343 ft",
    diff: "Hard",
    color: "bg-orange-500",
    profile: [0, 30, 60, 80, 95, 100, 50, 0]
  },
  bear: {
    name: "Bear Peak",
    dist: "8.4 mi",
    gain: "2,900 ft",
    diff: "Extreme",
    color: "bg-red-600",
    profile: [0, 10, 20, 40, 70, 90, 100, 100, 50, 20, 0]
  }
};

export default function TrailMaster() {
  const [active, setActive] = useState<'chautauqua' | 'sanitas' | 'bear'>('chautauqua');
  const current = TRAILS[active];

  return (
    <div className="w-full bg-stone-900 border border-stone-700 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[350px]">
      
      {/* SIDEBAR */}
      <div className="w-full md:w-1/3 bg-stone-950 p-4 border-r border-stone-800 flex flex-col gap-2">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Map size={14} /> Trailhead Select
          </div>
          
          {(Object.keys(TRAILS) as Array<keyof typeof TRAILS>).map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`p-4 rounded-lg text-left transition-all border-l-4 ${active === key ? `bg-stone-800 border-${TRAILS[key].color.split('-')[1]}-500 text-white` : 'bg-transparent border-transparent text-stone-500 hover:text-stone-300'}`}
              >
                  <div className="font-bold text-sm">{TRAILS[key].name}</div>
                  <div className="text-[10px] opacity-70">{TRAILS[key].diff}</div>
              </button>
          ))}
      </div>

      {/* VISUALIZER */}
      <div className="flex-1 relative bg-stone-900 p-8 flex flex-col justify-between">
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-5 pointer-events-none invert" />

          {/* Header Stats */}
          <div className="flex justify-between items-start z-10 relative">
              <h2 className="text-3xl font-black text-white uppercase">{current.name}</h2>
              <div className="text-right">
                  <div className="flex items-center gap-2 text-stone-400 text-xs uppercase font-bold justify-end">
                      <TrendingUp size={14} /> Elevation Gain
                  </div>
                  <div className="text-2xl font-mono text-white">{current.gain}</div>
              </div>
          </div>

          {/* Graph Visualization */}
          <div className="h-32 w-full flex items-end gap-1 mt-8">
              {current.profile.map((h, i) => (
                  <motion.div 
                    key={active + i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className={`flex-1 rounded-t-sm ${current.color} opacity-80`}
                  />
              ))}
          </div>
          
          <div className="mt-4 flex justify-between text-xs text-stone-500 font-mono uppercase">
              <span>Trailhead (5,430 ft)</span>
              <span>Summit</span>
              <span>Return</span>
          </div>

      </div>
    </div>
  );
}