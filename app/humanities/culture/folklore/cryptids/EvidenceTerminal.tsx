"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileWarning, MapPin, Fingerprint, Lock, Siren } from 'lucide-react';
import { CRYPTID_DATA } from './cryptidData'; // Import the data

export default function EvidenceTerminal() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const current = activeId ? CRYPTID_DATA.find(c => c.id === activeId) : null;

  return (
    <div className="w-full bg-black border-2 border-green-900 rounded-lg overflow-hidden font-mono shadow-[0_0_20px_rgba(34,197,94,0.1)] flex flex-col md:flex-row h-[600px] relative">
      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-[url('/scanlines.png')] opacity-10 pointer-events-none z-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-900/10 pointer-events-none z-50" />

      {/* LEFT: FILE LIST */}
      <div className="w-full md:w-1/3 bg-[#051105] border-r border-green-900/50 flex flex-col">
          <div className="p-4 border-b border-green-900/30">
            <div className="text-xs font-bold text-green-700 uppercase flex items-center gap-2">
                <Lock size={12} /> Secure Database v9.2
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
              {CRYPTID_DATA.map((data) => (
                  <button
                    key={data.id}
                    onClick={() => setActiveId(data.id)}
                    className={`w-full text-left p-3 text-xs border-l-2 border-b border-green-900/30 hover:bg-green-900/20 transition-all group ${activeId === data.id ? 'bg-green-900/30 border-l-green-500 text-green-400' : 'border-l-transparent text-green-800'}`}
                  >
                      <div className="flex justify-between items-center">
                          <span className="font-bold group-hover:text-green-400">{data.code}</span>
                          {data.dangerLevel >= 4 && <Siren size={10} className="text-red-500 animate-pulse" />}
                      </div>
                      <div className="opacity-50 text-[10px] uppercase truncate">{data.name}</div>
                  </button>
              ))}
          </div>
          
          <div className="p-4 border-t border-green-900/30 text-[9px] text-green-900 text-center bg-[#020502]">
              UNAUTHORIZED ACCESS IS A FELONY
          </div>
      </div>

      {/* RIGHT: DATA DISPLAY */}
      <div className="flex-1 bg-black p-6 relative overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
              {current ? (
                  <motion.div 
                    key={current.code}
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                      {/* Header */}
                      <div className="border-b border-green-800 pb-4 mb-4 flex justify-between items-start">
                          <div>
                              <div className="text-2xl font-black text-green-500 uppercase">{current.name}</div>
                              <div className="text-xs text-green-700">{current.code}</div>
                          </div>
                          <div className="text-right">
                              <div className="text-[10px] text-green-800 font-bold uppercase mb-1">Threat Level</div>
                              <div className="flex gap-1 justify-end">
                                  {[1,2,3,4,5].map(lvl => (
                                      <div key={lvl} className={`w-2 h-4 rounded-sm ${lvl <= current.dangerLevel ? (current.dangerLevel >= 4 ? 'bg-red-500' : 'bg-green-500') : 'bg-green-900/20'}`} />
                                  ))}
                              </div>
                          </div>
                      </div>

                      {/* Image (Grainy Effect) */}
                      <div className="relative w-full h-56 bg-green-900/10 border border-green-800 overflow-hidden group">
                          <div 
                              className="absolute inset-0 bg-cover bg-center grayscale contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-1000"
                              style={{ backgroundImage: `url(${current.image})` }}
                          />
                          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-40 mix-blend-overlay" />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 text-[9px] text-green-600 font-mono text-center border-t border-green-900">
                              FIG A: SURVEILLANCE CAPTURE
                          </div>
                      </div>

                      {/* Data Grid */}
                      <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className="p-3 border border-green-900/50 bg-green-900/5">
                              <div className="text-green-800 uppercase font-bold mb-1 flex items-center gap-2"><MapPin size={10} /> Location</div>
                              <div className="text-green-400">{current.location}</div>
                          </div>
                          <div className="p-3 border border-green-900/50 bg-green-900/5">
                              <div className="text-green-800 uppercase font-bold mb-1 flex items-center gap-2"><Fingerprint size={10} /> Status</div>
                              <div className={`font-bold ${current.status === 'ACTIVE' ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                                  {current.status}
                              </div>
                          </div>
                      </div>

                      {/* Description */}
                      <div className="p-4 bg-green-900/5 border border-green-900/30 text-xs text-green-400 font-mono leading-relaxed relative">
                          <span className="bg-green-800 text-black px-1 mr-2 font-bold text-[10px]">SUMMARY</span>
                          {current.description}
                          {/* Decorative cursor */}
                          <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse align-middle" />
                      </div>
                      
                      {/* Frequency Hint */}
                      <div className="text-[10px] text-green-800 font-mono text-center pt-4">
                          // MONITORING FREQUENCY: {current.frequency} MHz //
                      </div>

                  </motion.div>
              ) : (
                  <div className="h-full flex flex-col items-center justify-center text-green-900 space-y-4">
                      <FileWarning size={64} className="opacity-50" />
                      <div className="text-sm font-bold uppercase tracking-widest animate-pulse">Select a Case File</div>
                  </div>
              )}
          </AnimatePresence>
      </div>
    </div>
  );
}