"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ZapOff, Lightbulb, RefreshCw } from 'lucide-react';

export default function OhmsLawLab() {
  const [voltage, setVoltage] = useState(12); // Volts
  const [resistance, setResistance] = useState(100); // Ohms
  const [tripped, setTripped] = useState(false);

  // V = I * R  =>  I = V / R
  const current = tripped ? 0 : voltage / resistance;
  const amps = current.toFixed(3);
  
  // Power (Watts) determines brightness: P = V * I
  const power = tripped ? 0 : voltage * current;
  
  // Logic: Trip breaker if Amps > 0.5 (Safety limit simulation)
  const SAFETY_LIMIT = 0.5;

  const checkSafety = (v: number, r: number) => {
    if ((v / r) > SAFETY_LIMIT) {
      setTripped(true);
    }
  };

  const handleVoltage = (val: number) => {
    if (tripped) return;
    setVoltage(val);
    checkSafety(val, resistance);
  };

  const handleResistance = (val: number) => {
    if (tripped) return;
    setResistance(val);
    checkSafety(voltage, val);
  };

  const resetBreaker = () => {
    setVoltage(12);
    setResistance(100);
    setTripped(false);
  };

  return (
    <div className={`w-full p-6 border rounded-2xl backdrop-blur-md transition-colors duration-300 ${tripped ? 'bg-red-950/20 border-red-500/50' : 'bg-slate-900/80 border-amber-500/20'}`}>
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-white flex items-center gap-2">
          {tripped ? <ZapOff className="text-red-500" /> : <Zap className="text-amber-400" />} 
          Circuit Lab
        </h3>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${tripped ? 'bg-red-500 text-white border-red-500 animate-pulse' : 'bg-slate-800 text-slate-400 border-white/10'}`}>
          {tripped ? 'BREAKER TRIPPED' : 'SYSTEM NOMINAL'}
        </div>
      </div>

      {/* Visualizer: The Lightbulb */}
      <div className="flex justify-center mb-8 relative">
        {/* Glow Halo */}
        <motion.div 
          animate={{ 
            opacity: Math.min(1, power * 2),
            scale: 1 + Math.min(0.5, power)
          }}
          className="absolute w-24 h-24 bg-amber-400/30 rounded-full blur-2xl"
        />
        
        <Lightbulb 
            size={80} 
            className={`transition-colors duration-100 relative z-10 ${tripped ? 'text-slate-700' : 'text-slate-500'}`}
            style={{ 
                color: tripped ? '#334155' : `rgba(251, 191, 36, ${0.2 + (power * 3)})`, // Dynamic amber glow
                filter: tripped ? 'none' : `drop-shadow(0 0 ${power * 20}px #fbbf24)`
            }}
        />
        
        {tripped && (
             <div className="absolute inset-0 flex items-center justify-center z-20">
                 <span className="text-4xl font-black text-red-500 rotate-12 drop-shadow-lg">POP!</span>
             </div>
        )}
      </div>

      {/* Stats Display */}
      <div className="grid grid-cols-3 gap-2 mb-8 text-center">
        <div className="p-2 bg-black/40 rounded border border-white/5">
            <div className="text-[10px] text-slate-500 uppercase">Current</div>
            <div className={`text-lg font-mono ${tripped ? 'text-red-500' : 'text-amber-400'}`}>{amps} A</div>
        </div>
        <div className="p-2 bg-black/40 rounded border border-white/5">
            <div className="text-[10px] text-slate-500 uppercase">Power</div>
            <div className="text-lg font-mono text-white">{power.toFixed(2)} W</div>
        </div>
        <div className="p-2 bg-black/40 rounded border border-white/5">
            <div className="text-[10px] text-slate-500 uppercase">Limit</div>
            <div className="text-lg font-mono text-slate-400">{SAFETY_LIMIT} A</div>
        </div>
      </div>

      {/* Controls */}
      {tripped ? (
        <button 
            onClick={resetBreaker}
            className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold uppercase rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
            <RefreshCw size={18} /> Reset Breaker
        </button>
      ) : (
        <div className="space-y-6 bg-black/20 p-4 rounded-xl">
            <Control 
                label="Voltage (V)" value={voltage} min={0} max={24} step={0.5} 
                onChange={handleVoltage} color="accent-amber-500" 
            />
            <Control 
                label="Resistance (Ω)" value={resistance} min={10} max={500} step={10} 
                onChange={handleResistance} color="accent-blue-500" 
            />
        </div>
      )}
    </div>
  );
}

function Control({ label, value, min, max, step, onChange, color }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <input 
        type="range" min={min} max={max} step={step} value={value} 
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer ${color}`}
      />
    </div>
  )
}