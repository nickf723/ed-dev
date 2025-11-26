"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Gavel } from "lucide-react";

const PARTIES = [
  { id: "soc", label: "Socialists", seats: 25, color: "bg-red-500" },
  { id: "lib", label: "Liberals", seats: 35, color: "bg-yellow-400" },
  { id: "grn", label: "Greens", seats: 15, color: "bg-green-500" },
  { id: "con", label: "Conservatives", seats: 40, color: "bg-blue-600" },
  { id: "pop", label: "Populists", seats: 10, color: "bg-purple-600" },
];

export default function ParliamentWidget() {
  // Generate seating chart (arch)
  const totalSeats = PARTIES.reduce((acc, p) => acc + p.seats, 0);
  const majority = Math.floor(totalSeats / 2) + 1;
  const radius = 100;
  
  // Create dot array based on party distribution
  const dots: { x: number, y: number, color: string, party: string }[] = [];
  let currentAngle = Math.PI; // Start left (180 deg)
  const step = Math.PI / (totalSeats - 1);

  PARTIES.forEach(party => {
      for (let i = 0; i < party.seats; i++) {
          // Simple arch logic
          const x = 120 + radius * Math.cos(currentAngle);
          const y = 120 + radius * Math.sin(currentAngle);
          
          dots.push({ x, y, color: party.color, party: party.label });
          currentAngle -= step;
      }
  });

  const [hoveredParty, setHoveredParty] = useState<string | null>(null);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Users size={14} className="text-blue-400" /> Parliament
        </h3>
        <span className="text-[9px] font-mono text-neutral-500">Maj: {majority}</span>
      </div>

      <div className="p-6 flex flex-col items-center relative">
        
        {/* The Hemicycle */}
        <div className="relative w-[240px] h-[140px]">
            {dots.map((dot, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ 
                        scale: hoveredParty && dot.party !== hoveredParty ? 0.5 : 1,
                        opacity: hoveredParty && dot.party !== hoveredParty ? 0.3 : 1
                    }}
                    transition={{ delay: i * 0.002 }}
                    className={`absolute w-3 h-3 rounded-full shadow-sm ${dot.color}`}
                    style={{ left: dot.x, top: dot.y }}
                />
            ))}
            
            {/* Podium */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-8 bg-neutral-800 border border-neutral-600 rounded-t-lg flex items-center justify-center">
                <Gavel size={14} className="text-neutral-400" />
            </div>
        </div>

        {/* Legend / Controls */}
        <div className="grid grid-cols-3 gap-2 w-full mt-4">
            {PARTIES.map(p => (
                <button 
                    key={p.id}
                    onMouseEnter={() => setHoveredParty(p.label)}
                    onMouseLeave={() => setHoveredParty(null)}
                    className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/5"
                >
                    <div className={`w-2 h-2 rounded-full ${p.color}`} />
                    <div className="text-left">
                        <span className="block text-[9px] font-bold text-neutral-300 leading-none">{p.label}</span>
                        <span className="text-[8px] text-neutral-500 font-mono">{p.seats}</span>
                    </div>
                </button>
            ))}
        </div>

      </div>
    </div>
  );
}