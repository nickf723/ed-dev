"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, RotateCcw, Activity } from 'lucide-react';

export default function BiomechanicsLab() {
  const [angle, setAngle] = useState(45);
  const [force, setForce] = useState(60);
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 });
  const [isFlying, setIsFlying] = useState(false);
  const [status, setStatus] = useState<'idle' | 'hit' | 'miss'>('idle');

  // Physics loop
  useEffect(() => {
    let animationId: number;
    let t = 0;

    if (isFlying) {
      const animate = () => {
        t += 0.15;
        
        // Projectile Formulas
        // x = v0 * cos(theta) * t
        // y = v0 * sin(theta) * t - 0.5 * g * t^2
        const rad = (angle * Math.PI) / 180;
        const v0 = force * 1.5;
        const g = 9.8;

        const x = v0 * Math.cos(rad) * t;
        const y = (v0 * Math.sin(rad) * t) - (0.5 * g * t * t);

        if (y < 0 || x > 300) { // Hit ground or went off screen
            setIsFlying(false);
            // Target is roughly at x=220 to x=260
            if (x > 220 && x < 260) setStatus('hit');
            else setStatus('miss');
        } else {
            setBallPos({ x, y });
            animationId = requestAnimationFrame(animate);
        }
      };
      animationId = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationId);
  }, [isFlying, angle, force]);

  const handleLaunch = () => {
    setBallPos({ x: 0, y: 0 });
    setStatus('idle');
    setIsFlying(true);
  };

  return (
    <div className="w-full bg-slate-900/90 border border-emerald-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Activity className="text-emerald-400" size={16} /> Ballistics Lab
        </h3>
        <div className={`px-3 py-1 rounded text-[10px] font-bold uppercase ${status === 'hit' ? 'bg-emerald-500 text-black' : status === 'miss' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
            {status === 'idle' ? 'Ready' : status === 'hit' ? 'GOAL!' : 'Miss'}
        </div>
      </div>

      <div className="p-6">
        
        {/* SIMULATION AREA */}
        <div className="relative h-48 w-full bg-[url('/grid-pattern.svg')] bg-slate-950 rounded-xl border border-white/10 mb-6 overflow-hidden">
            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/50" />
            
            {/* Target */}
            <div className="absolute bottom-1 right-12 w-10 h-2 bg-orange-500 shadow-[0_0_15px_orange]" />
            <div className="absolute bottom-4 right-[60px] text-[10px] text-orange-400 font-bold uppercase">Target</div>

            {/* Ball */}
            <motion.div 
                className="absolute bottom-1 left-4 w-4 h-4 bg-white rounded-full shadow-lg z-10"
                style={{ 
                    transform: `translate(${ballPos.x}px, ${-ballPos.y}px)` 
                }}
            />

            {/* Trajectory Guide (Hint) */}
            {!isFlying && (
                <div 
                    className="absolute bottom-3 left-6 w-16 h-0.5 bg-white/20 origin-left"
                    style={{ transform: `rotate(-${angle}deg)` }}
                />
            )}
        </div>

        {/* CONTROLS */}
        <div className="grid grid-cols-2 gap-4">
            <Control label="Launch Angle" value={angle} min={0} max={90} onChange={setAngle} unit="°" />
            <Control label="Force (Power)" value={force} min={0} max={100} onChange={setForce} unit="N" />
        </div>

        <button 
            onClick={handleLaunch}
            disabled={isFlying}
            className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isFlying ? 'Calculating Physics...' : 'Kick'}
        </button>

      </div>
    </div>
  );
}

function Control({ label, value, min, max, onChange, unit }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                <span>{label}</span>
                <span>{value}{unit}</span>
            </div>
            <input 
                type="range" min={min} max={max} value={value} 
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
        </div>
    )
}