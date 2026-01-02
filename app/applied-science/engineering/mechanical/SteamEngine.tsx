"use client";
import { useState, useEffect, useRef } from "react";
import { Gauge, Flame, Wind } from "lucide-react";

export default function SteamEngine() {
  const [pressure, setPressure] = useState(20); // 0 to 100
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Animation state
  const timeRef = useRef(0);
  const particlesRef = useRef<{x: number, y: number, vx: number, vy: number, life: number}[]>([]);

  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      let animId: number;

      const draw = () => {
          const w = canvas.width;
          const h = canvas.height;
          timeRef.current += 0.05 + (pressure / 100) * 0.2; // Speed increases with pressure

          // Piston Motion (Sine wave)
          const pistonRange = 60;
          const pistonY = h/2 + Math.sin(timeRef.current) * pistonRange * -1; // -1 so peak is up

          // Clear
          ctx.clearRect(0, 0, w, h);

          // --- DRAW ENGINE ---
          // Cylinder
          ctx.fillStyle = "#44403c";
          ctx.fillRect(w/2 - 40, h/2 - pistonRange - 20, 80, pistonRange*2 + 40);
          
          // Piston Head
          ctx.fillStyle = "#d97706"; // Amber/Brass
          ctx.fillRect(w/2 - 35, pistonY - 15, 70, 30);
          // Connecting Rod
          ctx.strokeStyle = "#78350f"; ctx.lineWidth = 8;
          ctx.beginPath(); ctx.moveTo(w/2, pistonY + 15); ctx.lineTo(w/2, h - 30); ctx.stroke();
          
          // --- STEAM PARTICLE SYSTEM ---
          // Spawn steam at the top of the cycle
          if (Math.sin(timeRef.current) > 0.95 && pressure > 5) {
              for(let i=0; i < pressure/5; i++) {
                  particlesRef.current.push({
                      x: w/2 + (Math.random() - 0.5) * 40,
                      y: h/2 - pistonRange - 30,
                      vx: (Math.random() - 0.5) * 2 * (pressure/50),
                      vy: -2 - Math.random() * 3 * (pressure/50),
                      life: 1.0
                  });
              }
          }

          // Update & Draw Particles
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
          for (let i = particlesRef.current.length - 1; i >= 0; i--) {
              const p = particlesRef.current[i];
              p.x += p.vx;
              p.y += p.vy;
              p.life -= 0.02;
              
              ctx.beginPath();
              ctx.arc(p.x, p.y, 5 * p.life + (1-p.life)*10, 0, Math.PI*2);
              ctx.globalAlpha = p.life * 0.5;
              ctx.fill();

              if (p.life <= 0) particlesRef.current.splice(i, 1);
          }
          ctx.globalAlpha = 1;

          animId = requestAnimationFrame(draw);
      };

      draw();
      return () => cancelAnimationFrame(animId);
  }, [pressure]);

  return (
    <div className="bg-[#292524]/90 border border-amber-700/50 rounded-xl p-6 backdrop-blur-md shadow-[0_0_30px_rgba(180,83,9,0.2)] w-full max-w-md relative overflow-hidden">
        
        {/* Rivet details */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-amber-800 shadow-inner" />
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-800 shadow-inner" />
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-amber-800 shadow-inner" />
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-amber-800 shadow-inner" />

        <div className="flex justify-between items-center mb-4 relative z-20">
            <h3 className="font-bold text-amber-200 flex items-center gap-2 font-mono tracking-wider">
                <Gauge size={18} className="text-amber-500" /> STEAM_ENGINE
            </h3>
            <div className={`flex items-center gap-1 text-xs font-mono ${pressure > 80 ? "text-red-400 animate-pulse" : "text-amber-500/70"}`}>
                 <Wind size={14} /> {pressure} PSI
            </div>
        </div>

        {/* CANVAS */}
        <div className="relative w-full h-48 bg-[#1c1917]/50 border border-amber-900/50 rounded-lg mb-6 overflow-hidden">
             <canvas ref={canvasRef} width={300} height={192} className="w-full h-full" />
        </div>

        {/* CONTROLS */}
        <div className="space-y-2 relative z-20">
            <label className="text-[10px] font-bold text-amber-500/80 font-mono uppercase flex items-center gap-2">
                <Flame size={12} className={pressure > 80 ? "text-red-500" : ""} /> Boiler Pressure (Heat)
            </label>
            <div className="relative">
                <input 
                    type="range" min="0" max="100" 
                    value={pressure} onChange={(e) => setPressure(parseInt(e.target.value))}
                    className="w-full h-2 bg-stone-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-amber-200 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #f59e0b 0%, #ef4444 ${pressure}%, #44403c ${pressure}%, #44403c 100%)`
                    }}
                />
            </div>
        </div>

        <p className="mt-4 text-[10px] text-amber-200/50 text-center leading-relaxed font-mono">
            Converting thermal energy into mechanical work via expanding steam.
        </p>

    </div>
  );
}