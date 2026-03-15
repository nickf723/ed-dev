"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Rocket, RefreshCw, Crosshair } from 'lucide-react';

export default function OrbitalLauncher() {
  const [power, setPower] = useState(15);
  const [angle, setAngle] = useState(45);
  const [status, setStatus] = useState<'aiming' | 'flying' | 'landed' | 'lost'>('aiming');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Game State Refs (for animation loop)
  const projRef = useRef({ x: 100, y: 300, vx: 0, vy: 0 });
  
  // Planet Data
  const PLANET = { x: 600, y: 200, r: 40, mass: 2000 };
  const START = { x: 100, y: 300 };

  const fire = () => {
      if (status === 'flying') return;
      
      const rad = (angle * Math.PI) / 180;
      projRef.current = {
          x: START.x,
          y: START.y,
          vx: Math.cos(rad) * power,
          vy: -Math.sin(rad) * power // Negative is up in canvas
      };
      setStatus('flying');
  };

  const reset = () => {
      setStatus('aiming');
      projRef.current = { x: START.x, y: START.y, vx: 0, vy: 0 };
  };

  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let animId: number;

      const loop = () => {
          // Clear
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw Start Platform
          ctx.fillStyle = '#64748b';
          ctx.fillRect(50, 310, 100, 10);

          // Draw Target Planet
          ctx.beginPath();
          ctx.arc(PLANET.x, PLANET.y, PLANET.r, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981'; // Emerald
          ctx.fill();
          
          // Planet Gravity Well (Visual ring)
          ctx.beginPath();
          ctx.arc(PLANET.x, PLANET.y, PLANET.r + 50, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
          ctx.setLineDash([5, 5]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw Projectile (Mario)
          ctx.beginPath();
          ctx.arc(projRef.current.x, projRef.current.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444'; // Red
          ctx.fill();

          if (status === 'flying') {
              // Physics Step
              const p = projRef.current;
              
              // 1. Vector to Planet Center
              const dx = PLANET.x - p.x;
              const dy = PLANET.y - p.y;
              const dist = Math.sqrt(dx*dx + dy*dy);

              // 2. Gravity Force (F = G * M / r^2)
              // We clamp min distance to avoid division by zero super-acceleration
              const force = PLANET.mass / Math.max(dist * dist, 100); 
              
              // 3. Apply Acceleration
              const ax = (dx / dist) * force;
              const ay = (dy / dist) * force;
              
              p.vx += ax;
              p.vy += ay;
              p.x += p.vx;
              p.y += p.vy;

              // 4. Collision Detection
              if (dist < PLANET.r + 8) {
                  setStatus('landed');
              } else if (p.x > canvas.width || p.y > canvas.height || p.x < 0 || p.y < 0) {
                  setStatus('lost');
              }
          }

          animId = requestAnimationFrame(loop);
      };

      loop();
      return () => cancelAnimationFrame(animId);
  }, [status, power, angle]);

  return (
    <div className="w-full bg-slate-900 border border-indigo-500/30 rounded-xl p-6 shadow-2xl flex flex-col md:flex-row gap-6">
        
        {/* CONTROLS */}
        <div className="w-full md:w-64 space-y-6">
            <div className="text-center pb-4 border-b border-slate-700">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Launch Star Control</div>
                <div className="text-2xl font-black text-white">Orbital Calc</div>
            </div>

            <div>
                <label className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                    Launch Angle <span className="text-white">{angle}°</span>
                </label>
                <input 
                    type="range" min="0" max="90" value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    disabled={status === 'flying'}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
            </div>

            <div>
                <label className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                    Star Power <span className="text-white">{power}%</span>
                </label>
                <input 
                    type="range" min="5" max="25" value={power}
                    onChange={(e) => setPower(Number(e.target.value))}
                    disabled={status === 'flying'}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
            </div>

            <button 
                onClick={fire}
                disabled={status === 'flying'}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black uppercase rounded shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Rocket size={18} /> Launch
            </button>

            {status !== 'aiming' && (
                <button 
                    onClick={reset}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold uppercase rounded text-xs flex items-center justify-center gap-2"
                >
                    <RefreshCw size={12} /> Reset Calculation
                </button>
            )}
        </div>

        {/* CANVAS */}
        <div className="flex-1 bg-black rounded-xl border border-slate-700 relative overflow-hidden">
            <canvas 
                ref={canvasRef} 
                width={800} 
                height={400} 
                className="w-full h-full object-contain"
            />
            
            {/* Overlay Message */}
            {status === 'landed' && (
                <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 backdrop-blur-sm animate-in zoom-in">
                    <div className="bg-green-600 text-white px-6 py-3 rounded-full font-black uppercase shadow-xl border-2 border-white">
                        Trajectory Confirmed!
                    </div>
                </div>
            )}
            {status === 'lost' && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 backdrop-blur-sm animate-in zoom-in">
                    <div className="bg-red-600 text-white px-6 py-3 rounded-full font-black uppercase shadow-xl border-2 border-white">
                        Drifted into Void
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}