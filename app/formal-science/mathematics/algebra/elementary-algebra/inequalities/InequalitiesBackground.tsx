"use client";
import { useEffect, useRef } from "react";

export default function InequalitiesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const laneHeight = 80;
    const skyColor = "rgba(14, 165, 233, 0.4)";
    const skyGlow = "rgba(14, 165, 233, 0.1)"; 

    // Define the specific types here for clarity
    type Direction = 'left' | 'right' | 'between';
    type LaneType = 'strict' | 'inclusive';

    const lanes: { 
        y: number; 
        pivot: number; 
        direction: Direction; // Use the type
        type: LaneType;       // Use the type
        speed: number;
        pivot2?: number; 
    }[] = [];

    // --- THE FIX IS HERE ---
    const generateLane = (y: number) => {
        // Explicitly type these variables so TS doesn't widen them to 'string'
        const type: LaneType = Math.random() > 0.5 ? 'strict' : 'inclusive';
        
        const direction: Direction = Math.random() > 0.3 
            ? (Math.random() > 0.5 ? 'left' : 'right') 
            : 'between';
        
        return {
            y,
            pivot: Math.random() * w,
            pivot2: direction === 'between' ? Math.random() * w : undefined,
            direction,
            type,
            speed: (Math.random() - 0.5) * 0.5
        };
    };

    const initLanes = () => {
        lanes.length = 0;
        const count = Math.ceil(h / laneHeight);
        for(let i=0; i<count; i++) {
            lanes.push(generateLane(i * laneHeight + laneHeight/2));
        }
    };

    const render = () => {
      ctx.fillStyle = "#0c1221"; 
      ctx.fillRect(0, 0, w, h);

      lanes.forEach(l => {
          l.pivot += l.speed;
          if (l.pivot2) l.pivot2 += l.speed;

          if (l.pivot > w + 200) l.pivot = -200;
          if (l.pivot < -200) l.pivot = w + 200;

          const cy = l.y;

          ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
          ctx.lineWidth = 1;
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.moveTo(0, cy);
          ctx.lineTo(w, cy);
          ctx.stroke();

          ctx.strokeStyle = skyColor;
          ctx.fillStyle = skyGlow;
          ctx.lineWidth = 4;
          
          let start = 0, end = w;
          
          if (l.direction === 'right') start = l.pivot;
          if (l.direction === 'left') end = l.pivot;
          if (l.direction === 'between') {
             // TS knows pivot2 exists if direction is 'between', but good to be safe
             const p2 = l.pivot2 ?? l.pivot; 
             start = Math.min(l.pivot, p2);
             end = Math.max(l.pivot, p2);
          }

          ctx.fillRect(start, cy - 10, end - start, 20);

          ctx.beginPath();
          ctx.moveTo(start, cy);
          ctx.lineTo(end, cy);
          ctx.stroke();

          const drawEndpoint = (x: number, isSolid: boolean) => {
              ctx.beginPath();
              ctx.arc(x, cy, 6, 0, Math.PI*2);
              ctx.fillStyle = isSolid ? "#0ea5e9" : "#0c1221"; 
              ctx.strokeStyle = "#0ea5e9";
              ctx.lineWidth = 2;
              ctx.fill();
              ctx.stroke();
          };

          const isSolid = l.type === 'inclusive';
          
          if (l.direction === 'right') drawEndpoint(l.pivot, isSolid);
          if (l.direction === 'left') drawEndpoint(l.pivot, isSolid);
          if (l.direction === 'between') {
              const p2 = l.pivot2 ?? l.pivot;
              drawEndpoint(Math.min(l.pivot, p2), isSolid);
              drawEndpoint(Math.max(l.pivot, p2), isSolid);
          }
      });

      requestAnimationFrame(render);
    };

    initLanes();
    const animId = requestAnimationFrame(render);
    
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
        initLanes();
    };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none" />;
}