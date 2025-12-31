"use client";
import { useEffect, useRef } from "react";

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // Grid config
    const gridSize = 30;
    const cols = Math.ceil(w / gridSize);
    const rows = Math.ceil(h / gridSize);

    // Paths (Traces)
    type Trace = { x: number; y: number; dir: 'h'|'v'; len: number; color: string };
    const traces: Trace[] = [];

    // Initialize Traces
    for(let i=0; i<100; i++) {
        traces.push({
            x: Math.floor(Math.random() * cols) * gridSize,
            y: Math.floor(Math.random() * rows) * gridSize,
            dir: Math.random() > 0.5 ? 'h' : 'v',
            len: gridSize * (2 + Math.floor(Math.random() * 5)),
            color: Math.random() > 0.5 ? "#06b6d4" : "#22c55e" // Cyan or Green
        });
    }

    // Data Packets
    type Packet = { traceIndex: number; progress: number; speed: number };
    const packets: Packet[] = [];

    const animate = () => {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);
      time++;

      // Spawn packets randomly
      if(Math.random() > 0.9) {
          packets.push({ 
              traceIndex: Math.floor(Math.random() * traces.length), 
              progress: 0, 
              speed: 0.02 + Math.random() * 0.03 
          });
      }

      // Draw Traces (Dim)
      ctx.lineWidth = 2;
      traces.forEach(t => {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
          ctx.beginPath();
          ctx.moveTo(t.x, t.y);
          if (t.dir === 'h') ctx.lineTo(t.x + t.len, t.y);
          else ctx.lineTo(t.x, t.y + t.len);
          ctx.stroke();
          
          // Nodes at ends
          ctx.fillStyle = "rgba(255,255,255,0.05)";
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2, 0, Math.PI*2);
          ctx.fill();
          const ex = t.dir === 'h' ? t.x + t.len : t.x;
          const ey = t.dir === 'h' ? t.y : t.y + t.len;
          ctx.beginPath(); ctx.arc(ex, ey, 2, 0, Math.PI*2); ctx.fill();
      });

      // Draw Packets (Bright)
      for (let i = packets.length - 1; i >= 0; i--) {
          const p = packets[i];
          const t = traces[p.traceIndex];
          
          p.progress += p.speed;
          if (p.progress >= 1) {
              packets.splice(i, 1);
              continue;
          }

          const curX = t.dir === 'h' ? t.x + t.len * p.progress : t.x;
          const curY = t.dir === 'h' ? t.y : t.y + t.len * p.progress;

          ctx.shadowBlur = 10;
          ctx.shadowColor = t.color;
          ctx.fillStyle = t.color;
          
          ctx.beginPath();
          ctx.arc(curX, curY, 2.5, 0, Math.PI*2);
          ctx.fill();
          
          ctx.shadowBlur = 0;
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}