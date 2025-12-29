"use client";
import { useEffect, useRef, useState } from "react";
import { Activity, Play, RefreshCw } from "lucide-react";

export default function FoodWebWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(true);
  
  // Params
  const [prey, setPrey] = useState(40);
  const [predators, setPredators] = useState(9);
  
  // History for graphing
  const history = useRef<{p: number, h: number}[]>([]);

  // Simulation Constants
  const alpha = 0.1; // Prey birth rate
  const beta = 0.02; // Predation rate
  const delta = 0.01; // Predator reproduction rate
  const gamma = 0.1; // Predator death rate

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
        // Lotka-Volterra Step (Euler integration)
        setPrey(H => {
            setPredators(P => {
                // dH/dt = alpha*H - beta*H*P
                // dP/dt = delta*H*P - gamma*P
                const newH = H + (alpha * H - beta * H * P);
                const newP = P + (delta * H * P - gamma * P);
                
                // Store history
                history.current.push({ p: newP, h: newH });
                if(history.current.length > 100) history.current.shift();
                
                return Math.max(0, newP);
            });
            return Math.max(0, H + (alpha * H - beta * H * predators)); // Note: using prev predator state approx
        });
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, predators]); // simplified dependency for demo

  // Draw Graph
  useEffect(() => {
      const canvas = canvasRef.current;
      if(!canvas) return;
      const ctx = canvas.getContext("2d");
      if(!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (history.current.length < 2) return;

      const maxVal = Math.max(...history.current.map(d => Math.max(d.p, d.h)), 50);
      const step = w / history.current.length;

      // Draw Prey Line (Green)
      ctx.beginPath();
      ctx.strokeStyle = "#a3e635"; // Lime
      ctx.lineWidth = 2;
      history.current.forEach((d, i) => {
          const x = i * step;
          const y = h - (d.h / maxVal) * (h - 20);
          if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      });
      ctx.stroke();

      // Draw Predator Line (Red)
      ctx.beginPath();
      ctx.strokeStyle = "#f87171"; // Red
      history.current.forEach((d, i) => {
          const x = i * step;
          const y = h - (d.p / maxVal) * (h - 20);
          if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      });
      ctx.stroke();

  }, [prey, predators]); // Re-draw on update

  return (
    <div className="bg-neutral-900/90 border border-stone-600 rounded-xl p-6 backdrop-blur-md">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-stone-300 flex items-center gap-2">
                <Activity size={18} className="text-lime-500" /> Trophic Dynamics
            </h3>
            <button onClick={() => { setPrey(40); setPredators(9); history.current = []; }} className="text-stone-500 hover:text-white">
                <RefreshCw size={14} />
            </button>
        </div>

        {/* Graph */}
        <div className="bg-black/40 rounded-lg border border-stone-800 mb-4 overflow-hidden relative h-32">
            <canvas ref={canvasRef} width={300} height={128} className="w-full h-full" />
            {/* Legend */}
            <div className="absolute top-2 right-2 text-[10px] font-mono flex flex-col gap-1">
                <span className="text-lime-400">PREY: {Math.round(prey)}</span>
                <span className="text-red-400">PREDATOR: {Math.round(predators)}</span>
            </div>
        </div>

        <div className="text-xs text-stone-500 leading-relaxed">
            The <strong>Lotka-Volterra</strong> model shows how populations oscillate. As prey increases, predators thrive. As predators overpopulate, prey collapses, causing predators to starve.
        </div>
    </div>
  );
}