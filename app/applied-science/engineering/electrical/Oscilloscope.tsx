"use client";
import { useState, useEffect, useRef } from "react";
import { Activity, Zap, Radio, Settings2 } from "lucide-react";

export default function Oscilloscope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Controls
  const [waveType, setWaveType] = useState<"sine" | "square" | "saw">("sine");
  const [amplitude, setAmplitude] = useState(50); // Voltage
  const [frequency, setFrequency] = useState(5);  // Hertz
  const [time, setTime] = useState(0);

  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      let animId: number;

      const draw = () => {
          const w = canvas.width;
          const h = canvas.height;
          const centerY = h / 2;

          // Screen Clear (Phosphor fade)
          ctx.fillStyle = "rgba(0, 20, 0, 0.2)";
          ctx.fillRect(0, 0, w, h);

          // Grid Lines
          ctx.strokeStyle = "rgba(0, 255, 0, 0.1)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let x = 0; x <= w; x += 20) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
          for (let y = 0; y <= h; y += 20) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
          ctx.stroke();

          // Draw Wave
          ctx.strokeStyle = "#4ade80"; // Phosphor Green
          ctx.lineWidth = 2;
          ctx.shadowBlur = 5;
          ctx.shadowColor = "#4ade80";
          ctx.beginPath();

          for (let x = 0; x < w; x++) {
              // Time offset moves the wave
              const t = x * 0.02 + time;
              let y = 0;

              // Waveform Logic
              if (waveType === 'sine') {
                  y = Math.sin(t * frequency * 0.2) * amplitude;
              } else if (waveType === 'square') {
                  y = Math.sin(t * frequency * 0.2) > 0 ? amplitude : -amplitude;
              } else if (waveType === 'saw') {
                  // Sawtooth approx
                  y = ((t * frequency * 0.1) % 1) * amplitude * 2 - amplitude;
              }

              ctx.lineTo(x, centerY + y);
          }
          ctx.stroke();
          ctx.shadowBlur = 0;

          setTime(prev => prev + 0.1);
          animId = requestAnimationFrame(draw);
      };

      draw();
      return () => cancelAnimationFrame(animId);
  }, [waveType, amplitude, frequency, time]); // Re-bind on state change? Better to use refs for anim loop but this works for simple

  return (
    <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6 shadow-2xl w-full max-w-md relative overflow-hidden">
        
        {/* CRT Overlay Effect */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-10" />

        <div className="flex justify-between items-center mb-4 relative z-20">
            <h3 className="font-bold text-green-400 flex items-center gap-2 font-mono tracking-wider">
                <Activity size={18} /> OSCILLOSCOPE
            </h3>
            <div className="flex gap-2">
                 <button onClick={() => setWaveType("sine")} className={`p-1 rounded ${waveType === 'sine' ? 'bg-green-500 text-black' : 'text-green-500 border border-green-500/30'}`}><Activity size={14}/></button>
                 <button onClick={() => setWaveType("square")} className={`p-1 rounded ${waveType === 'square' ? 'bg-green-500 text-black' : 'text-green-500 border border-green-500/30'}`}><Zap size={14}/></button>
                 <button onClick={() => setWaveType("saw")} className={`p-1 rounded ${waveType === 'saw' ? 'bg-green-500 text-black' : 'text-green-500 border border-green-500/30'}`}><Radio size={14}/></button>
            </div>
        </div>

        {/* SCREEN */}
        <canvas 
            ref={canvasRef} 
            width={300} height={150}
            className="w-full bg-black rounded border border-green-500/50 mb-6 relative z-0"
        />

        {/* CONTROLS */}
        <div className="grid grid-cols-2 gap-6 relative z-20">
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-green-500/80 font-mono uppercase flex justify-between">
                    <span>Voltage (Amp)</span>
                    <span>{amplitude}V</span>
                </label>
                <input 
                    type="range" min="10" max="70" 
                    value={amplitude} onChange={(e) => setAmplitude(parseInt(e.target.value))}
                    className="w-full h-1 bg-green-900 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-400"
                />
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-bold text-green-500/80 font-mono uppercase flex justify-between">
                    <span>Frequency (Hz)</span>
                    <span>{frequency}Hz</span>
                </label>
                <input 
                    type="range" min="1" max="20" 
                    value={frequency} onChange={(e) => setFrequency(parseInt(e.target.value))}
                    className="w-full h-1 bg-green-900 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-400"
                />
            </div>
        </div>

    </div>
  );
}