"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RefreshCw, Triangle } from "lucide-react";

export default function ChaosGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [points, setPoints] = useState(0);
  
  // State refs for animation loop
  const requestRef = useRef<number | null>(null);
  const dotRef = useRef({ x: 150, y: 150 }); // Current dot position
  
  // Triangle Vertices (Fixed)
  const vertices = [
      { x: 150, y: 20 },   // Top
      { x: 20, y: 280 },   // Left
      { x: 280, y: 280 }   // Right
  ];

  const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw 50 dots per frame for speed
      ctx.fillStyle = "#f59e0b"; // Gold dots
      for(let i=0; i<50; i++) {
          // 1. Pick random vertex
          const v = vertices[Math.floor(Math.random() * 3)];
          
          // 2. Move halfway
          dotRef.current.x = (dotRef.current.x + v.x) / 2;
          dotRef.current.y = (dotRef.current.y + v.y) / 2;

          // 3. Draw
          ctx.fillRect(dotRef.current.x, dotRef.current.y, 1, 1);
      }
      setPoints(p => p + 50);

      if (isRunning) {
        requestRef.current = requestAnimationFrame(draw);
      }
  };

  useEffect(() => {
      if (isRunning) {
          requestRef.current = requestAnimationFrame(draw);
      } else {
          cancelAnimationFrame(requestRef.current!);
      }
      return () => cancelAnimationFrame(requestRef.current!);
  }, [isRunning]);

  const reset = () => {
      setIsRunning(false);
      setPoints(0);
      const canvas = canvasRef.current;
      if (canvas) {
          const ctx = canvas.getContext("2d");
          ctx?.clearRect(0, 0, 300, 300);
          
          // Redraw vertices
          ctx!.fillStyle = "#171717";
          vertices.forEach(v => {
            ctx!.beginPath();
            ctx!.arc(v.x, v.y, 3, 0, Math.PI*2);
            ctx!.fill();
          });
      }
      dotRef.current = { x: 150, y: 150 }; // Reset start
  };

  // Initial draw of vertices
  useEffect(() => { reset(); }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xl max-w-sm w-full">
        
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 font-serif tracking-wider">
                <Triangle size={18} className="text-amber-500 fill-amber-500" /> THE CHAOS GAME
            </h3>
            <span className="text-xs font-mono text-slate-400">Iterated Function</span>
        </div>

        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Rule: Start anywhere. Pick a random corner. Move halfway there. Draw a dot. Repeat.
            <br/><span className="text-amber-600 font-bold">Watch order emerge from randomness.</span>
        </p>

        {/* CANVAS */}
        <div className="relative w-full aspect-square bg-slate-50 rounded border border-slate-100 mb-4 flex items-center justify-center">
            <canvas ref={canvasRef} width={300} height={300} className="w-full h-full" />
            
            {points === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-300 text-xs font-mono">
                    READY TO COMPUTE
                </div>
            )}
        </div>

        <div className="flex justify-between items-center text-xs font-mono text-slate-500 mb-4">
            <span>ITERATIONS: {points.toLocaleString()}</span>
        </div>

        {/* CONTROLS */}
        <div className="flex gap-2">
            <button 
                onClick={() => setIsRunning(!isRunning)}
                className={`flex-1 py-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-colors
                    ${isRunning ? "bg-slate-100 text-slate-600 border border-slate-200" : "bg-black text-white hover:bg-slate-800"}
                `}
            >
                {isRunning ? <><Pause size={14}/> PAUSE</> : <><Play size={14}/> START</>}
            </button>
            <button 
                onClick={reset}
                className="px-4 py-3 rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors"
            >
                <RefreshCw size={14} />
            </button>
        </div>

    </div>
  );
}