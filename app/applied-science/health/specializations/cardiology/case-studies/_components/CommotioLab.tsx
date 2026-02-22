"use client";
import React, { useState, useEffect } from 'react';
import { Activity, Zap, ShieldAlert, HeartCrack } from 'lucide-react';
import { M } from '@/components/Math';

export default function CommotioLab() {
  const [impactTime, setImpactTime] = useState(30); // 0-100 scale
  const [rhythm, setRhythm] = useState<'normal' | 'vfib'>('normal');
  const [hasImpacted, setHasImpacted] = useState(false);
  const [vfibOffset, setVfibOffset] = useState(0);

  // The "Vulnerable Window" is on the upswing/peak of the T-Wave (roughly 60-65 on our scale)
  const windowStart = 60;
  const windowEnd = 66;

  // Animate the V-Fib so it looks like chaotic fibrillation
  useEffect(() => {
    if (rhythm !== 'vfib') return;
    let frame: number;
    const animate = () => {
        setVfibOffset(prev => prev + 1);
        frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [rhythm]);

  const handleImpact = () => {
      setHasImpacted(true);
      if (impactTime >= windowStart && impactTime <= windowEnd) {
          setRhythm('vfib');
      } else {
          // Heart absorbs the hit, rhythm stays normal
          setTimeout(() => setHasImpacted(false), 1000);
      }
  };

  const handleAED = () => {
      setRhythm('normal');
      setHasImpacted(false);
  };

  // Generate Normal ECG Path
  const generateNormalECG = () => {
    return `
      M 0 70 L 10 70 Q 15 50 20 70 L 25 70 L 28 75 
      L 32 10 L 36 85 L 39 70 L 50 70 
      Q 62 30 70 70 L 100 70
    `;
  };

  // Generate Chaotic V-Fib Path
  const generateVFib = () => {
      let d = `M 0 70 `;
      for(let x = 5; x <= 100; x += 5) {
          // Random chaotic noise
          const y = 70 + (Math.sin(x + vfibOffset) * 20) + (Math.cos((x * 2) - vfibOffset) * 15) + (Math.random() * 10 - 5);
          d += `L ${x} ${Math.max(10, Math.min(90, y))} `;
      }
      return d;
  };

  const isInWindow = impactTime >= windowStart && impactTime <= windowEnd;

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-neutral-800">
            <div className="text-xs font-bold uppercase text-red-500 flex items-center gap-2">
                <ShieldAlert size={14} /> The Commotio Cordis Phenomenon
            </div>
            {rhythm === 'vfib' && (
                <div className="px-3 py-1 rounded bg-red-900/40 border border-red-500 text-[10px] font-bold uppercase text-white animate-pulse">
                    CARDIAC ARREST
                </div>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* VISUALIZER */}
            <div className="bg-black/40 relative p-8 flex flex-col justify-center overflow-hidden">
                 <svg viewBox="0 0 100 100" className={`w-full h-48 overflow-visible relative z-10 ${rhythm === 'normal' ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]'}`}>
                    
                    {/* The Vulnerable Window Highlight */}
                    {rhythm === 'normal' && (
                        <rect x={windowStart} y="0" width={windowEnd - windowStart} height="100" fill="rgba(239, 68, 68, 0.2)" />
                    )}

                    {/* The Trace */}
                    <path 
                        d={rhythm === 'normal' ? generateNormalECG() : generateVFib()} 
                        fill="none" 
                        stroke={rhythm === 'normal' ? "#3b82f6" : "#ef4444"} 
                        strokeWidth="2" 
                        strokeLinecap="round" strokeLinejoin="round" 
                        className="transition-all duration-300"
                    />
                    
                    {/* Impact Target Line */}
                    {rhythm === 'normal' && !hasImpacted && (
                        <>
                            <line x1={impactTime} y1="0" x2={impactTime} y2="100" stroke="#fff" strokeWidth="1" strokeDasharray="2" />
                            <polygon points={`${impactTime - 4},-10 ${impactTime + 4},-10 ${impactTime},0`} fill="#fff" />
                        </>
                    )}
                 </svg>

                 {/* Impact Flash Effect */}
                 {hasImpacted && rhythm === 'normal' && (
                     <div className="absolute inset-0 bg-white opacity-0 animate-[flash_0.5s_ease-out]" />
                 )}
            </div>

            {/* CONTROLS & DATA */}
            <div className="p-8 border-l border-neutral-800 flex flex-col justify-center gap-6 bg-neutral-900/30">
                
                <div className={`p-4 rounded-xl border transition-colors ${rhythm === 'vfib' ? 'bg-red-950/40 border-red-500' : 'bg-black/40 border-neutral-800'}`}>
                    <div className="text-[10px] uppercase font-bold text-neutral-500 mb-2">Patient Status</div>
                    {rhythm === 'normal' ? (
                        <div className="text-xl font-mono text-blue-400 font-bold flex items-center gap-2">
                            <Activity size={20}/> Normal Sinus Rhythm
                        </div>
                    ) : (
                        <div className="text-xl font-mono text-red-500 font-bold flex items-center gap-2">
                            <HeartCrack size={20} className="animate-pulse"/> Ventricular Fibrillation
                        </div>
                    )}
                </div>

                {rhythm === 'normal' ? (
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-[10px] uppercase font-bold mb-2">
                                <span className="text-neutral-500">Impact Timing</span>
                                <span className={isInWindow ? "text-red-500" : "text-white"}>
                                    {isInWindow ? "CRITICAL WINDOW" : "Safe Zone"}
                                </span>
                            </div>
                            <input 
                                type="range" min="0" max="100" step="1" 
                                value={impactTime} onChange={e => setImpactTime(parseInt(e.target.value))}
                                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isInWindow ? 'bg-red-900 accent-red-500' : 'bg-neutral-800 accent-white'}`}
                                disabled={hasImpacted}
                            />
                        </div>
                        <button 
                            onClick={handleImpact}
                            disabled={hasImpacted}
                            className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-neutral-700 transition-colors disabled:opacity-50"
                        >
                            Simulate Impact
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                        <p className="text-xs text-red-400 leading-relaxed">
                            The heart's electrical grid has crashed. The ventricles are quivering helplessly. Blood is no longer pumping to the brain.
                        </p>
                        <button 
                            onClick={handleAED}
                            className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-black uppercase tracking-widest rounded-lg border-2 border-yellow-300 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] flex items-center justify-center gap-2"
                        >
                            <Zap size={18}/> Deliver AED Shock
                        </button>
                    </div>
                )}
            </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
            @keyframes flash {
                0% { opacity: 0.8; }
                100% { opacity: 0; }
            }
        `}} />
    </div>
  );
}