"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, AlertCircle, Clock, MapPin } from 'lucide-react';

const LINES = {
  red: {
    name: "Red Line",
    color: "bg-red-600",
    stops: ["Alewife", "Harvard", "Kendall/MIT", "Park St", "South Station"],
    status: "Delays (Signal Issues)",
    wait: "12 min"
  },
  green: {
    name: "Green Line",
    color: "bg-green-600",
    stops: ["Lechmere", "North Station", "Gov Center", "Park St", "Copley", "Fenway"],
    status: "On Time",
    wait: "4 min"
  },
  orange: {
    name: "Orange Line",
    color: "bg-orange-500",
    stops: ["Oak Grove", "North Station", "Downtown Crossing", "Back Bay", "Forest Hills"],
    status: "Moderate Traffic",
    wait: "7 min"
  },
  blue: {
    name: "Blue Line",
    color: "bg-blue-500",
    stops: ["Wonderland", "Airport", "Aquarium", "State", "Gov Center"],
    status: "On Time",
    wait: "5 min"
  }
};

export default function MBTAStatusBoard() {
  const [active, setActive] = useState<'red' | 'green' | 'orange' | 'blue'>('green');
  const current = LINES[active];

  return (
    <div className="w-full bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[350px]">
      
      {/* LEFT: LINE SELECTOR */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-zinc-700 bg-zinc-950 p-4 flex flex-col gap-2">
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center font-serif font-bold text-white bg-black">T</div>
              System Status
          </div>
          
          {(Object.keys(LINES) as Array<keyof typeof LINES>).map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`p-3 rounded-lg flex items-center justify-between transition-all border ${active === key ? 'bg-zinc-800 border-zinc-600' : 'bg-transparent border-transparent hover:bg-zinc-900'}`}
              >
                  <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${LINES[key].color}`} />
                      <span className="font-bold text-white text-sm">{LINES[key].name}</span>
                  </div>
                  {LINES[key].status.includes("Delays") && <AlertCircle size={14} className="text-red-500" />}
              </button>
          ))}
      </div>

      {/* RIGHT: INFO DISPLAY */}
      <div className="flex-1 relative bg-zinc-900 p-8 flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/MBTA_Logo.svg/1024px-MBTA_Logo.svg.png')] bg-contain bg-no-repeat bg-right-top" />

          <AnimatePresence mode="wait">
              <motion.div 
                key={active}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                  <div className="flex justify-between items-start mb-6">
                      <div>
                          <h2 className={`text-3xl font-black uppercase mb-1 text-transparent bg-clip-text bg-gradient-to-r ${active === 'red' ? 'from-red-500 to-red-300' : active === 'green' ? 'from-green-500 to-green-300' : active === 'orange' ? 'from-orange-500 to-orange-300' : 'from-blue-500 to-blue-300'}`}>
                              {current.name}
                          </h2>
                          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                              <Train size={12} /> Inbound to Downtown
                          </div>
                      </div>
                      <div className="text-right">
                          <div className="text-[10px] font-bold text-zinc-500 uppercase">Next Train</div>
                          <div className="text-2xl font-mono text-white flex items-center justify-end gap-2">
                              <Clock size={18} className="text-zinc-600" /> {current.wait}
                          </div>
                      </div>
                  </div>

                  <div className="space-y-3">
                      <div className="text-[10px] font-bold text-zinc-500 uppercase">Key Stops</div>
                      <div className="flex flex-wrap gap-2">
                          {current.stops.map(stop => (
                              <span key={stop} className="px-3 py-1 rounded-full border border-zinc-700 bg-zinc-950 text-xs text-zinc-300 flex items-center gap-1">
                                  <MapPin size={10} className="text-zinc-500" /> {stop}
                              </span>
                          ))}
                      </div>
                  </div>

                  <div className="mt-8 p-3 rounded bg-zinc-950 border border-zinc-800 flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${current.status === 'On Time' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                      <span className="text-sm font-bold text-zinc-300 uppercase tracking-wide">
                          Status: {current.status}
                      </span>
                  </div>
              </motion.div>
          </AnimatePresence>
      </div>

    </div>
  );
}