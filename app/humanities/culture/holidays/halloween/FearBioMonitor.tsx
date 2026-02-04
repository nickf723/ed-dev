"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Activity, Eye, AlertOctagon } from 'lucide-react';

export default function FearBioMonitor() {
  const [bpm, setBpm] = useState(65);
  const [status, setStatus] = useState("CALM");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Ramp up heart rate over time
  useEffect(() => {
    const interval = setInterval(() => {
        setBpm(prev => {
            const next = prev + (Math.random() > 0.4 ? 1 : -0.5);
            return Math.min(180, Math.max(60, next));
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      if (bpm > 120) setStatus("CRITICAL STRESS");
      else if (bpm > 90) setStatus("ELEVATED");
      else setStatus("NORMAL");
  }, [bpm]);

  // ECG Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let x = 0;
    const height = canvas.height;
    ctx.strokeStyle = bpm > 110 ? '#ef4444' : '#22c55e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height/2);

    const animate = () => {
        // Fade out old line
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, height);

        // Draw new blip
        const speed = bpm / 20; 
        x += speed;
        if (x > canvas.width) {
            x = 0;
            ctx.moveTo(0, height/2);
            ctx.beginPath();
        }

        // Heartbeat shape
        let y = height / 2;
        if (x % 100 < 10) {
            y = height / 2 + (Math.random() - 0.5) * 50; // The Spike
        }

        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Update color based on fear
        ctx.strokeStyle = bpm > 110 ? '#ef4444' : (bpm > 90 ? '#f59e0b' : '#22c55e');

        requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [bpm]);

  return (
    <div className="fixed top-24 right-6 z-50 w-48 bg-black/90 border border-red-900/50 rounded-lg p-3 shadow-[0_0_20px_rgba(255,0,0,0.2)] backdrop-blur-md hidden md:block">
        <div className="flex justify-between items-center mb-2">
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <Activity size={10} /> Bio-Feedback
            </div>
            <div className={`w-2 h-2 rounded-full ${bpm > 100 ? 'bg-red-500 animate-ping' : 'bg-green-500'}`} />
        </div>

        <div className="flex items-end gap-2 mb-2">
            <div className={`text-3xl font-black font-mono ${bpm > 110 ? 'text-red-500' : 'text-slate-200'}`}>
                {Math.floor(bpm)}
            </div>
            <div className="text-xs text-slate-500 mb-1">BPM</div>
        </div>

        <div className="relative h-12 bg-black border border-white/10 rounded overflow-hidden mb-2">
            <canvas ref={canvasRef} width={200} height={48} className="w-full h-full" />
        </div>

        <div className={`text-[9px] font-bold text-center border p-1 rounded ${bpm > 110 ? 'border-red-500 text-red-500 bg-red-900/20 animate-pulse' : 'border-slate-800 text-slate-500'}`}>
            SUBJECT STATUS: {status}
        </div>
        
        {bpm > 100 && (
             <div className="mt-2 text-[9px] text-red-600 uppercase text-center flex justify-center items-center gap-1 animate-pulse">
                <Eye size={10} /> You are being watched
             </div>
        )}
    </div>
  );
}