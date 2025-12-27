"use client";
import { useEffect, useRef, useState } from "react";
import { RotateCcw, Trophy } from "lucide-react";

export default function PennyCanGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Click & Drag to Toss");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = 300);
    let h = (canvas.height = 250);
    
    let penny = { x: 50, y: h - 50, vx: 0, vy: 0, radius: 8, dragging: false, airborne: false };
    let can = { x: w - 60, y: h - 40, width: 40, height: 60 };
    
    let dragStart = { x: 0, y: 0 };

    const reset = () => {
        penny.x = 50;
        penny.y = h - 50;
        penny.vx = 0;
        penny.vy = 0;
        penny.airborne = false;
        penny.dragging = false;
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw Floor
      ctx.fillStyle = "#333";
      ctx.fillRect(0, h - 20, w, 20);

      // Draw Can
      ctx.fillStyle = "#94a3b8"; // Slate can
      ctx.fillRect(can.x, can.y, can.width, can.height);
      // Can Opening
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.ellipse(can.x + can.width/2, can.y, can.width/2, 5, 0, 0, Math.PI*2);
      ctx.fill();

      // Physics
      if (penny.airborne) {
          penny.x += penny.vx;
          penny.y += penny.vy;
          penny.vy += 0.5; // Gravity

          // Bounce Floor
          if (penny.y > h - 20 - penny.radius) {
              penny.y = h - 20 - penny.radius;
              penny.vy *= -0.6;
              penny.vx *= 0.8;
              
              if (Math.abs(penny.vy) < 1) penny.airborne = false;
          }
          
          // Check Win (Simple AABB-ish logic)
          if (Math.abs(penny.x - (can.x + can.width/2)) < 15 && Math.abs(penny.y - can.y) < 10 && penny.vy > 0) {
              setScore(s => s + 1);
              setMessage("PENNY CAN!");
              reset();
          }
      }

      // Draw Drag Line
      if (penny.dragging) {
          ctx.beginPath();
          ctx.moveTo(penny.x, penny.y);
          ctx.lineTo(dragStart.x, dragStart.y); // Visual is reversed for "pull back" feel
          ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
          ctx.lineWidth = 2;
          ctx.stroke();
      }

      // Draw Penny
      ctx.beginPath();
      ctx.arc(penny.x, penny.y, penny.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#d97706"; // Copper
      ctx.fill();
      ctx.strokeStyle = "#fcd34d";
      ctx.lineWidth = 2;
      ctx.stroke();

      requestAnimationFrame(animate);
    };
    
    const animId = requestAnimationFrame(animate);
    
    // Event Handlers
    const onDown = (e: any) => {
        if (penny.airborne) return;
        const rect = canvas.getBoundingClientRect();
        dragStart = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        penny.dragging = true;
    };
    
    const onUp = (e: any) => {
        if (!penny.dragging) return;
        const rect = canvas.getBoundingClientRect();
        const releaseX = e.clientX - rect.left;
        const releaseY = e.clientY - rect.top;
        
        // Power = Distance dragged backwards
        penny.vx = (penny.x - releaseX) * 0.15;
        penny.vy = (penny.y - releaseY) * 0.15;
        penny.airborne = true;
        penny.dragging = false;
        setMessage("...");
    };

    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
        window.removeEventListener("mouseup", onUp);
        cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Trophy size={14} className="text-amber-500" /> Penny Can Simulator
        </h3>
        <span className="text-2xl font-black text-amber-500">{score}</span>
      </div>
      <div className="relative bg-black/50">
         <div className="absolute top-4 left-0 w-full text-center font-bold text-white text-shadow-lg z-10 pointer-events-none">
             {message}
         </div>
         <canvas ref={canvasRef} className="w-full cursor-crosshair" />
      </div>
      <div className="p-3 text-[10px] text-neutral-500 text-center border-t border-white/5">
          Aim for the can. Rules: 1 point in. 0 points out.
      </div>
    </div>
  );
}