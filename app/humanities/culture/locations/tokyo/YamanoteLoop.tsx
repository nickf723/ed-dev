"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, Zap, ShoppingBag, Briefcase, Landmark, Coffee } from 'lucide-react';

const STATIONS = [
  { 
    id: "shinjuku", 
    name: "Shinjuku", 
    color: "text-purple-400", 
    icon: Zap,
    vibe: "Neon Chaos",
    desc: "The world's busiest station. Skyscrapers, government towers, and the neon madness of Kabukicho." 
  },
  { 
    id: "shibuya", 
    name: "Shibuya", 
    color: "text-pink-400", 
    icon: ShoppingBag,
    vibe: "Youth Culture",
    desc: "Home of the famous Scramble Crossing and Hachiko. The epicenter of fashion and nightlife." 
  },
  { 
    id: "harajuku", 
    name: "Harajuku", 
    color: "text-yellow-400", 
    icon: Coffee,
    vibe: "Kawaii & Crepes",
    desc: "Takeshita Street's wild fashion meets the serene forest of Meiji Shrine." 
  },
  { 
    id: "tokyo", 
    name: "Tokyo", 
    color: "text-red-400", 
    icon: Briefcase,
    vibe: "Imperial Hub",
    desc: "The red brick station facade. Gateway to the Imperial Palace and the Bullet Trains (Shinkansen)." 
  },
  { 
    id: "akihabara", 
    name: "Akihabara", 
    color: "text-cyan-400", 
    icon: Zap,
    vibe: "Electric Town",
    desc: "Otaku mecca. Electronics, maid cafes, anime figures, and retro gaming galore." 
  },
  { 
    id: "ueno", 
    name: "Ueno", 
    color: "text-green-400", 
    icon: Landmark,
    vibe: "Arts & Culture",
    desc: "Museums, the Zoo (Pandas!), and cherry blossoms in the park. Old Tokyo atmosphere." 
  }
];

export default function YamanoteLoop() {
  const [active, setActive] = useState(STATIONS[0]);
  const [rotation, setRotation] = useState(0);

  // Auto-rotate visually, but allow manual override via clicking
  useEffect(() => {
    const interval = setInterval(() => {
        setRotation(r => r + 0.5); // Slow spin
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-900/80 border border-slate-700 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.1)] flex flex-col md:flex-row h-[400px] backdrop-blur-sm">
      
      {/* LEFT: THE LOOP VISUALIZER */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-black">
          {/* Scanlines Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,3px_100%]" />
          
          <div className="relative w-64 h-64">
              {/* The Green Line Ring */}
              <div className="absolute inset-0 border-4 border-green-500/30 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }}>
                  {/* Train Blip */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-8 bg-green-400 blur-md rounded-full" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-2 h-4 bg-white rounded-full" />
              </div>

              {/* Station Dots */}
              {STATIONS.map((s, i) => {
                  const angle = (i / STATIONS.length) * 2 * Math.PI - (Math.PI / 2);
                  const x = 128 + 128 * Math.cos(angle);
                  const y = 128 + 128 * Math.sin(angle);
                  
                  return (
                      <button
                        key={s.id}
                        onClick={() => setActive(s)}
                        className={`absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 transition-all duration-300 z-20 ${active.id === s.id ? 'bg-white border-green-400 scale-150 shadow-[0_0_15px_white]' : 'bg-black border-slate-500 hover:border-green-400'}`}
                        style={{ left: x, top: y }}
                      />
                  )
              })}

              {/* Center Hologram */}
              <div className="absolute inset-0 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                      <motion.div 
                        key={active.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center"
                      >
                          <div className={`text-6xl mb-2 ${active.color} drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]`}>
                              <active.icon size={64} strokeWidth={1} />
                          </div>
                          <div className="text-4xl font-black text-white uppercase tracking-tighter">JY</div>
                      </motion.div>
                  </AnimatePresence>
              </div>
          </div>
      </div>

      {/* RIGHT: DATA TERMINAL */}
      <div className="w-full md:w-80 border-l border-slate-700 bg-slate-950 p-6 flex flex-col justify-between relative">
          <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Train size={12} /> JR Yamanote Line
          </div>

          <div>
              <h2 className="text-4xl font-black text-white uppercase mb-2 leading-none">{active.name}</h2>
              <div className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase mb-6 bg-white/10 ${active.color}`}>
                  {active.vibe}
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-mono">
                  {active.desc}
              </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800">
              <div className="flex justify-between text-xs font-mono text-slate-500 uppercase">
                  <span>Loop Time</span>
                  <span>60 Mins</span>
              </div>
              <div className="flex justify-between text-xs font-mono text-slate-500 uppercase mt-1">
                  <span>Status</span>
                  <span className="text-green-500 animate-pulse">Normal Ops</span>
              </div>
          </div>
      </div>

    </div>
  );
}