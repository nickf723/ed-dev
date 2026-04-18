"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Network, Play, Pause, RotateCcw } from 'lucide-react';

export default function ChaosGame() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [verticesCount, setVerticesCount] = useState(3);
  const [speed, setSpeed] = useState(100); // points per frame
  const [pointCount, setPointCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentPoint = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);

  // Hydration safety
  useEffect(() => setIsMounted(true), []);

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = Math.min(cx, cy) - 30;

    // Draw the boundary polygon
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    for (let i = 0; i < verticesCount; i++) {
      const angle = (i * 2 * Math.PI) / verticesCount - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      
      // Draw glowing vertex nodes
      ctx.fillStyle = '#818cf8';
      ctx.beginPath(); ctx.arc(x, y, 4, 0, 2 * Math.PI); ctx.fill();
    }
    ctx.closePath();
    ctx.stroke();

    currentPoint.current = { x: cx, y: cy }; // Start in the center
    setPointCount(0);
    setIsPlaying(false);
  };

  // Re-draw boundary when vertices change
  useEffect(() => {
    if (isMounted) resetCanvas();
  }, [verticesCount, isMounted]);

  // The rendering engine
  useEffect(() => {
    if (!isPlaying || !isMounted) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = Math.min(cx, cy) - 30;

    const vertices = Array.from({ length: verticesCount }).map((_, i) => {
      const angle = (i * 2 * Math.PI) / verticesCount - Math.PI / 2;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    });

    const animate = () => {
      ctx.fillStyle = 'rgba(165, 180, 252, 0.6)'; // Soft indigo dot
      
      let newCount = 0;
      for (let i = 0; i < speed; i++) {
        // Chaos Math: Pick a random vertex and move 50% of the way there
        const target = vertices[Math.floor(Math.random() * vertices.length)];
        currentPoint.current.x += (target.x - currentPoint.current.x) * 0.5;
        currentPoint.current.y += (target.y - currentPoint.current.y) * 0.5;

        ctx.fillRect(currentPoint.current.x, currentPoint.current.y, 1.5, 1.5);
        newCount++;
      }
      
      setPointCount(prev => prev + newCount);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [isPlaying, speed, verticesCount, isMounted]);

  if (!isMounted) return <div className="w-full h-[400px] bg-black/40 backdrop-blur-md rounded-3xl animate-pulse" />;

  return (
    <div className="w-full h-full bg-black/40 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      {/* Header & Controls */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-indigo-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Network size={18} />
            <h3 className="font-bold uppercase tracking-widest text-sm">Chaos Game</h3>
          </div>
          <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Emergent Fractals</div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${isPlaying ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50 hover:bg-indigo-500/40'}`}
          >
            {isPlaying ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Run</>}
          </button>
          <button onClick={resetCanvas} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors border border-white/5">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row gap-8 flex-1">
        <div className="w-full md:w-1/3 flex flex-col justify-center space-y-6">
          
          <div className="p-4 bg-indigo-950/30 border-l-2 border-indigo-500 rounded-r-lg">
            <div className="text-xs text-indigo-200 font-mono flex justify-between">
              <span>Points Plotted:</span>
              <span className="font-bold text-indigo-400">{pointCount.toLocaleString()}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
              <span>Vertices (n)</span>
              <span className="text-indigo-300">{verticesCount}</span>
            </div>
            <input 
              type="range" min="3" max="6" value={verticesCount} 
              onChange={(e) => { setVerticesCount(Number(e.target.value)); setIsPlaying(false); }}
              className="w-full accent-indigo-500" 
            />
            <p className="text-[10px] text-slate-500 mt-2 leading-tight">
              Notice how n=3 forms a perfect Sierpiński triangle, while n=4 generates pure noise!
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
              <span>Simulation Speed</span>
            </div>
            <input 
              type="range" min="10" max="500" value={speed} 
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-indigo-500" 
            />
          </div>
        </div>

        <div className="flex-1 min-h-[300px] bg-[#020205] rounded-2xl border border-indigo-500/30 relative flex items-center justify-center overflow-hidden shadow-inner">
          <canvas 
            ref={canvasRef} 
            width={400} 
            height={300} 
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}