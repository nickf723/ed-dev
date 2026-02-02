"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Shield, Zap, Activity, Globe } from 'lucide-react';
import Link from 'next/link';

export default function DisciplineExplorer() {
  const [filter, setFilter] = useState('All');

  const sports = [
    { id: 'football', name: 'Football (NFL)', category: 'Team', popularity: 'High', intensity: 'Extreme', icon: Shield, href: '/humanities/sports/repository/football' },
    { id: 'soccer', name: 'Soccer', category: 'Team', popularity: 'Very High', intensity: 'High', icon: Globe, href: '/humanities/sports/repository/soccer' },
    { id: 'basketball', name: 'Basketball', category: 'Team', popularity: 'High', intensity: 'High', icon: Zap, href: '/humanities/sports/repository/basketball' },
    { id: 'tennis', name: 'Tennis', category: 'Individual', popularity: 'Med', intensity: 'High', icon: Activity, href: '/humanities/sports/repository/tennis' },
    { id: 'f1', name: 'Formula 1', category: 'Racing', popularity: 'High', intensity: 'Extreme', icon: Trophy, href: '/humanities/sports/repository/f1' },
  ];

  const filtered = filter === 'All' ? sports : sports.filter(s => s.category === filter);

  return (
    <div className="w-full bg-slate-900/90 border border-emerald-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Trophy className="text-emerald-400" size={16} /> Discipline Database
        </h3>
        <div className="flex gap-2">
            {['All', 'Team', 'Individual', 'Racing'].map(f => (
                <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors ${filter === f ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                    {f}
                </button>
            ))}
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
            {filtered.map((s) => (
                <Link key={s.id} href={s.href} className="block">
                    <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="group relative p-4 bg-slate-950 border border-white/10 rounded-xl hover:border-emerald-500/50 hover:bg-emerald-900/10 transition-all cursor-pointer overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors text-slate-400">
                                <s.icon size={20} />
                            </div>
                            <div className="text-[9px] uppercase font-bold text-slate-500 border border-white/5 px-2 py-1 rounded">
                                {s.category}
                            </div>
                        </div>
                        
                        <h4 className="text-lg font-black text-white mb-2 group-hover:text-emerald-300">{s.name}</h4>
                        
                        <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                            <div className="flex items-center gap-1">
                                <Globe size={10} /> <span>Pop: <span className="text-white">{s.popularity}</span></span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Activity size={10} /> <span>Int: <span className="text-white">{s.intensity}</span></span>
                            </div>
                        </div>

                        {/* Hover effect accent */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </motion.div>
                </Link>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}