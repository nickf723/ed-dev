"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Radio } from 'lucide-react';
import { CRYPTID_DATA } from './cryptidData'; // Dynamic data

export default function CryptidFrequencyTuner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [freq, setFreq] = useState(50.0);
  const [signalStrength, setSignalStrength] = useState(0);
  const [message, setMessage] = useState("SCANNING...");

  useEffect(() => {
    // Find closest cryptid signal
    let bestMatch = null;
    let maxStrength = 0;

    for (const c of CRYPTID_DATA) {
        const dist = Math.abs(c.frequency - freq);
        if (dist < 3) { // 3MHz range
            const strength = 1 - (dist / 3);
            if (strength > maxStrength) {
                maxStrength = strength;
                bestMatch = c;
            }
        }
    }
    
    setSignalStrength(maxStrength);

    if (maxStrength > 0.85 && bestMatch) {
        setMessage(`SIGNAL LOCKED: ${bestMatch.name.toUpperCase()}`);
    } else if (maxStrength > 0.1) {
        setMessage("DECODING SIGNAL...");
    } else {
        setMessage("STATIC...");
    }
  }, [freq]);

  // Visualizer Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let time = 0;

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      for (let x = 0; x < width; x++) {
        let amplitude = 20;
        if (signalStrength > 0) {
            // Signal Pattern
            const noise = (Math.random() - 0.5) * amplitude * (1 - signalStrength);
            const wave = Math.sin(x * 0.1 + time) * amplitude * signalStrength * 1.5;
            // Add interference spikes based on danger level if we wanted!
            ctx.lineTo(x, height / 2 + noise + wave);
        } else {
            // Static
            ctx.lineTo(x, height / 2 + (Math.random() - 0.5) * 40);
        }
      }

      ctx.strokeStyle = signalStrength > 0.85 ? '#ef4444' : '#22c55e';
      ctx.lineWidth = signalStrength > 0.85 ? 3 : 1;
      ctx.stroke();
      time += 0.2;
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [signalStrength]);

  return (
    <div className="bg-black border border-green-900/50 rounded-xl p-6 shadow-[0_0_30px_rgba(0,255,0,0.05)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/scanlines.png')] opacity-10 pointer-events-none" />

        <div className="flex justify-between items-center mb-4 border-b border-green-900/50 pb-2">
            <div className="flex items-center gap-2 text-green-500 font-bold uppercase tracking-widest text-xs">
                <Radio size={14} className="animate-pulse" /> EVP Recorder
            </div>
            <div className={`font-mono text-xs font-bold ${signalStrength > 0.85 ? 'text-red-500 animate-pulse' : 'text-green-700'}`}>
                {message}
            </div>
        </div>

        <div className="relative h-24 bg-green-900/10 border border-green-900/50 rounded mb-6 overflow-hidden">
            <canvas ref={canvasRef} width={600} height={96} className="w-full h-full" />
            {signalStrength > 0.85 && (
                 <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none" />
            )}
        </div>

        <div className="relative pt-6">
            <input 
                type="range" min="0" max="120" step="0.1"
                value={freq} onChange={(e) => setFreq(parseFloat(e.target.value))}
                className="w-full h-8 bg-transparent appearance-none cursor-pointer relative z-10"
                style={{ backgroundImage: 'linear-gradient(to right, #052e16 0%, #052e16 100%)' }}
            />
            <div className="absolute top-0 left-0 right-0 h-4 flex justify-between px-1 pointer-events-none">
                {Array.from({length: 25}).map((_, i) => (
                    <div key={i} className={`w-px ${i % 4 === 0 ? 'h-3 bg-green-500' : 'h-1 bg-green-800'}`} />
                ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-mono text-green-600">
                <span>00.0 MHz</span>
                <span className="text-white font-bold text-lg">{freq.toFixed(1)}</span>
                <span>120.0 MHz</span>
            </div>
        </div>
    </div>
  );
}