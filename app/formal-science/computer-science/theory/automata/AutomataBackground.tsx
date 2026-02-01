"use client";
import React, { useEffect, useRef } from "react";

export function AutomataBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // CONFIG
    const STATE_COUNT = 15;
    const CONNECTION_CHANCE = 0.3;
    const SPEED = 2;

    // DATA
    const states: { x: number, y: number, id: string }[] = [];
    const transitions: { from: number, to: number }[] = [];
    const tokens: { fromIdx: number, toIdx: number, progress: number }[] = [];

    // 1. GENERATE STATES
    function init() {
      states.length = 0;
      transitions.length = 0;
      
      for (let i = 0; i < STATE_COUNT; i++) {
        states.push({
          x: Math.random() * w * 0.8 + w * 0.1, // Keep away from extreme edges
          y: Math.random() * h * 0.8 + h * 0.1,
          id: `q${i}`
        });
      }

      // 2. GENERATE TRANSITIONS (Edges)
      for (let i = 0; i < STATE_COUNT; i++) {
        for (let j = 0; j < STATE_COUNT; j++) {
            if (i === j) continue; // No self-loops for visual clarity
            
            // Connect close nodes
            const dx = states[i].x - states[j].x;
            const dy = states[i].y - states[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < 200 && Math.random() < CONNECTION_CHANCE) {
                transitions.push({ from: i, to: j });
            }
        }
      }
    }

    // 3. SPAWN TOKENS
    function spawnToken() {
        if (transitions.length === 0) return;
        const t = transitions[Math.floor(Math.random() * transitions.length)];
        tokens.push({ fromIdx: t.from, toIdx: t.to, progress: 0 });
    }

    const animate = () => {
      // Clear
      ctx.fillStyle = "#020617"; // Slate 950
      ctx.fillRect(0, 0, w, h);

      // DRAW TRANSITIONS (Lines)
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(148, 163, 184, 0.1)"; // Slate 400 dim
      
      transitions.forEach(t => {
          const s1 = states[t.from];
          const s2 = states[t.to];
          
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.stroke();
          
          // Draw Arrowhead (Midpoint)
          const midX = (s1.x + s2.x) / 2;
          const midY = (s1.y + s2.y) / 2;
          ctx.fillStyle = "rgba(148, 163, 184, 0.2)";
          ctx.beginPath();
          ctx.arc(midX, midY, 2, 0, Math.PI * 2);
          ctx.fill();
      });

      // DRAW STATES (Circles)
      states.forEach(s => {
          ctx.beginPath();
          ctx.arc(s.x, s.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = "#1e293b"; // Slate 800
          ctx.fill();
          ctx.strokeStyle = "#475569"; // Slate 600
          ctx.stroke();
          
          // Label
          ctx.fillStyle = "#64748b";
          ctx.font = "10px monospace";
          ctx.fillText(s.id, s.x - 6, s.y - 12);
      });

      // UPDATE & DRAW TOKENS
      if (Math.random() > 0.95) spawnToken();

      for (let i = tokens.length - 1; i >= 0; i--) {
          const tok = tokens[i];
          tok.progress += SPEED;
          
          const s1 = states[tok.fromIdx];
          const s2 = states[tok.toIdx];
          
          const dx = s2.x - s1.x;
          const dy = s2.y - s1.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          if (tok.progress >= dist) {
              tokens.splice(i, 1); // Arrived
              continue;
          }

          const ratio = tok.progress / dist;
          const px = s1.x + dx * ratio;
          const py = s1.y + dy * ratio;

          // Draw "Data Packet"
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#38bdf8"; // Sky Blue
          ctx.fillStyle = "#38bdf8";
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
      }

      requestAnimationFrame(animate);
    };

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", resize);
    init();
    const frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 bg-[#020617]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)]" />
    </div>
  );
}