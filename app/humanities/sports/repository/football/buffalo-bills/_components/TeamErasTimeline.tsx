"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, TrendingUp, Snowflake, Skull } from 'lucide-react';

export default function TeamErasTimeline() {
  const [eraId, setEraId] = useState('process');

  const eras = {
    'glory': {
        title: "The K-Gun Era",
        years: "1986 - 1996",
        record: "112-70 (.615)",
        coach: "Marv Levy",
        desc: "The golden age. Led by the Hall of Fame quartet (Kelly, Thomas, Smith, Reed), the Bills pioneered the 'No-Huddle' offense and became the only team in history to reach 4 consecutive Super Bowls.",
        stats: { sb: 4, playoffs: 8, proBowlers: 28 },
        color: "bg-blue-600",
        icon: Trophy
    },
    'drought': {
        title: "The Drought",
        years: "2000 - 2017",
        record: "112-176 (.389)",
        coach: "Various (9)",
        desc: "The dark ages. For 17 seasons, the Bills failed to make the playoffs—the longest active drought in North American sports at the time. Defined by quarterback instability and heartbreak.",
        stats: { sb: 0, playoffs: 0, proBowlers: 12 },
        color: "bg-slate-600",
        icon: Skull
    },
    'process': {
        title: "The Process",
        years: "2018 - Present",
        record: "73-35 (.676)",
        coach: "Sean McDermott",
        desc: "The resurrection. GM Brandon Beane and HC Sean McDermott rebuilt the culture. They drafted Josh Allen in 2018, transforming the franchise into a perennial Super Bowl contender.",
        stats: { sb: 0, playoffs: 6, proBowlers: 15 },
        color: "bg-red-600",
        icon: TrendingUp
    }
  };

  const current = eras[eraId as keyof typeof eras];
  const Icon = current.icon;

  return (
    <div className="w-full bg-slate-900/90 border border-blue-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      {/* Timeline Nav */}
      <div className="flex border-b border-white/5">
        {Object.entries(eras).map(([key, data]) => (
            <button 
                key={key}
                onClick={() => setEraId(key)}
                className={`flex-1 py-4 text-[10px] uppercase font-bold tracking-wider transition-colors relative ${eraId === key ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
                {data.years}
                {eraId === key && <motion.div layoutId="underline" className={`absolute bottom-0 left-0 right-0 h-1 ${data.color}`} />}
            </button>
        ))}
      </div>

      <div className="p-8">
         <AnimatePresence mode="wait">
            <motion.div 
                key={eraId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                {/* Info Column */}
                <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${current.color} text-white`}>
                            <Icon size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white italic">{current.title}</h3>
                            <div className="text-xs text-slate-400 font-mono">HC: {current.coach}</div>
                        </div>
                    </div>
                    
                    <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-white/10 pl-4">
                        {current.desc}
                    </p>

                    <div className="flex gap-4 pt-4">
                        <Badge label="Record" value={current.record} />
                        <Badge label="Playoff Berths" value={current.stats.playoffs} />
                        {current.stats.sb > 0 && <Badge label="Super Bowls" value={current.stats.sb} highlight />}
                    </div>
                </div>

                {/* Visual / Roster Column */}
                <div className="bg-black/20 rounded-xl p-4 border border-white/5 flex flex-col justify-center items-center">
                    {eraId === 'glory' && (
                        <div className="text-center space-y-2">
                            <div className="text-xs font-bold text-blue-400 uppercase">The Hall of Famers</div>
                            <div className="font-black text-white text-lg">KELLY . THOMAS</div>
                            <div className="font-black text-white text-lg">SMITH . REED</div>
                        </div>
                    )}
                    {eraId === 'drought' && (
                        <div className="text-center space-y-2 opacity-50">
                            <div className="text-xs font-bold text-slate-500 uppercase">The Revolving Door</div>
                            <div className="text-xs text-slate-400">Losman . Edwards . Fitzpatrick</div>
                            <div className="text-xs text-slate-400">Manuel . Taylor . Peterman</div>
                        </div>
                    )}
                    {eraId === 'process' && (
                        <div className="text-center space-y-2">
                            <div className="text-xs font-bold text-red-400 uppercase">The Franchise</div>
                            <div className="w-16 h-16 bg-white/10 rounded-full mx-auto flex items-center justify-center border-2 border-red-500 text-2xl font-black text-white">
                                17
                            </div>
                            <div className="font-black text-white">JOSH ALLEN</div>
                        </div>
                    )}
                </div>
            </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
}

function Badge({ label, value, highlight }: any) {
    return (
        <div>
            <div className="text-[9px] uppercase font-bold text-slate-500">{label}</div>
            <div className={`text-lg font-mono font-bold ${highlight ? 'text-yellow-400' : 'text-white'}`}>{value}</div>
        </div>
    )
}