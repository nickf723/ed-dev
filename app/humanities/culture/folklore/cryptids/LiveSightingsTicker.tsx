"use client";
import React from 'react';
import { motion } from 'framer-motion';

const REPORTS = [
    "REPORT #8922: Strange vocalizations heard near Bluff Creek, CA. Sounded like 'whoops'...",
    "REPORT #8923: Large winged shape blocking moonlight on I-77, West Virginia...",
    "REPORT #8924: Unidentified submerged object detected in Lake Champlain, 40ft long...",
    "REPORT #8925: Bipedal canine sighted in Wisconsin, smell of sulfur reported...",
    "REPORT #8926: Livestock mutilated in Puerto Rico, puncture wounds visible...",
];

export default function LiveSightingsTicker() {
  return (
    <div className="w-full bg-green-900/20 border-y border-green-500/20 py-2 overflow-hidden flex items-center relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10" />
        
        <div className="px-4 text-[10px] font-bold text-green-500 uppercase tracking-widest border-r border-green-500/20 z-20 bg-black">
            Live Feed
        </div>

        <motion.div 
            className="flex gap-8 whitespace-nowrap pl-4"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        >
            {[...REPORTS, ...REPORTS].map((rep, i) => (
                <div key={i} className="text-xs font-mono text-green-400/80 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    {rep}
                </div>
            ))}
        </motion.div>
    </div>
  );
}