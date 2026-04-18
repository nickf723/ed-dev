"use client";
import React, { useState, useEffect } from 'react';
import { Activity, RotateCcw } from 'lucide-react';

export default function InteractiveWave() {
  const [isMounted, setIsMounted] = useState(false);
  const [amplitude, setAmplitude] = useState(50);
  const [frequency, setFrequency] = useState(2);
  const [phase, setPhase] = useState(0);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Don't animate until mounted

    let animationFrame: number;
    const animate = () => {
      setPhase((prev) => (prev + 2) % 360);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isMounted]);

  // Animate the phase shift automatically to make the wave "move"
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setPhase((prev) => (prev + 2) % 360);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Generate the SVG path for the sine wave
  const generateWavePath = () => {
    const width = 800;
    const height = 200;
    const centerY = height / 2;
    let path = `M 0 ${centerY}`;

    for (let x = 0; x <= width; x += 5) {
      // Normalize x to a 0-1 range, then multiply by frequency and Math.PI * 2
      const xNorm = x / width;
      const waveX = xNorm * frequency * Math.PI * 2;
      // Convert phase from degrees to radians
      const phaseRad = (phase * Math.PI) / 180;
      
      const y = centerY + Math.sin(waveX + phaseRad) * amplitude;
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  if (!isMounted) {
    return <div className="w-full h-64 bg-black/40 backdrop-blur-md rounded-3xl animate-pulse" />;
  }

  return (
    <div className="w-full bg-black/40 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
        
        {/* LEFT: Controls */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="flex items-center gap-2 text-indigo-400 mb-4">
            <Activity size={20} />
            <h3 className="font-bold uppercase tracking-widest text-sm">Wave Explorer</h3>
          </div>

          <div className="space-y-4">
            {/* Amplitude Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                <span>Amplitude (a)</span>
                <span className="text-indigo-300">{amplitude}</span>
              </div>
              <input 
                type="range" min="0" max="90" value={amplitude} 
                onChange={(e) => setAmplitude(Number(e.target.value))}
                className="w-full accent-indigo-500" 
              />
            </div>

            {/* Frequency Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                <span>Frequency (b)</span>
                <span className="text-indigo-300">{frequency}</span>
              </div>
              <input 
                type="range" min="0.5" max="10" step="0.5" value={frequency} 
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full accent-indigo-500" 
              />
            </div>
          </div>

          <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-xl font-mono text-center">
            <span className="text-slate-400">f(x) = </span>
            <span className="text-indigo-400 font-bold">{amplitude}</span>
            <span className="text-white"> sin(</span>
            <span className="text-indigo-400 font-bold">{frequency}</span>
            <span className="text-white">x)</span>
          </div>
        </div>

        {/* RIGHT: Visualizer */}
        <div className="w-full md:w-2/3 h-64 bg-[#020205] rounded-2xl border border-indigo-500/30 relative flex items-center justify-center overflow-hidden shadow-inner">
          {/* Axis Lines */}
          <div className="absolute left-0 right-0 h-px bg-indigo-500/30 top-1/2" />
          <div className="absolute top-0 bottom-0 w-px bg-indigo-500/30 left-1/2" />
          
          <svg viewBox="0 0 800 200" className="w-full h-full preserve-3d drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]">
            <path 
              d={generateWavePath()} 
              fill="none" 
              stroke="url(#wave-gradient)" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
        </div>

      </div>
    </div>
  );
}