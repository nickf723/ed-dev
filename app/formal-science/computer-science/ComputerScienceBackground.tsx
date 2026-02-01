"use client";
import React, { useEffect, useRef } from "react";

export function ComputerScienceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // CONFIG
    const GRID_SIZE = 40;
    const PATH_COUNT = 30;
    const PULSE_SPEED = 4;
    
    // STATE
    const paths: { points: {x: number, y: number}[], color: string }[] = [];
    const pulses: { pathIndex: number, progress: number }[] = [];

    // 1. GENERATE CIRCUIT PATHS (Manhattan Geometry)
    function initPaths() {
      paths.length = 0;
      for (let i = 0; i < PATH_COUNT; i++) {
        let x = Math.floor(Math.random() * (w / GRID_SIZE)) * GRID_SIZE;
        let y = Math.floor(Math.random() * (h / GRID_SIZE)) * GRID_SIZE;
        const points = [{x, y}];
        
        // Walk random steps
        const steps = Math.floor(Math.random() * 10) + 5;
        for (let j = 0; j < steps; j++) {
          if (Math.random() > 0.5) {
             x += (Math.random() > 0.5 ? 1 : -1) * GRID_SIZE;
          } else {
             y += (Math.random() > 0.5 ? 1 : -1) * GRID_SIZE;
          }
          points.push({x, y});
        }
        
        paths.push({ 
            points, 
            color: Math.random() > 0.8 ? "#10b981" : "#0f172a" // Mostly dark, some emerald
        });
      }
    }

    // 2. SPAWN DATA PULSES
    function spawnPulse() {
        if (Math.random() > 0.05) return; // Rare spawn
        pulses.push({
            pathIndex: Math.floor(Math.random() * paths.length),
            progress: 0
        });
    }

    const animate = () => {
      // Clear with heavy trail for "CRT Monitor" ghosting
      ctx.fillStyle = "rgba(0, 5, 16, 0.1)"; 
      ctx.fillRect(0, 0, w, h);

      // DRAW STATIC PATHS (Dim)
      ctx.lineWidth = 2;
      paths.forEach(p => {
        ctx.strokeStyle = "rgba(16, 185, 129, 0.05)"; // Very faint green
        ctx.beginPath();
        ctx.moveTo(p.points[0].x, p.points[0].y);
        for (let i = 1; i < p.points.length; i++) {
            ctx.lineTo(p.points[i].x, p.points[i].y);
        }
        ctx.stroke();
        
        // Draw Nodes (Joints)
        ctx.fillStyle = "rgba(16, 185, 129, 0.1)";
        p.points.forEach(pt => {
            ctx.fillRect(pt.x - 2, pt.y - 2, 4, 4);
        });
      });

      // DRAW PULSES (Bright Data Packets)
      spawnPulse();
      
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        const path = paths[pulse.pathIndex];
        
        pulse.progress += PULSE_SPEED;
        
        // Calculate current position along the segment
        let dist = pulse.progress;
        let currentPoint = path.points[0];
        
        // Find which segment we are on
        let segmentFound = false;
        
        for (let j = 0; j < path.points.length - 1; j++) {
            const p1 = path.points[j];
            const p2 = path.points[j+1];
            const segLen = Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
            
            if (dist <= segLen) {
                // We are on this segment
                const ratio = dist / segLen;
                const px = p1.x + (p2.x - p1.x) * ratio;
                const py = p1.y + (p2.y - p1.y) * ratio;
                
                // Draw Head
                ctx.shadowBlur = 10;
                ctx.shadowColor = "#00ffcc";
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(px - 3, py - 3, 6, 6);
                ctx.shadowBlur = 0;
                
                segmentFound = true;
                break;
            } else {
                dist -= segLen;
            }
        }
        
        if (!segmentFound) {
            pulses.splice(i, 1); // Remove if finished
        }
      }

      requestAnimationFrame(animate);
    };

    const resize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        initPaths();
    };

    window.addEventListener("resize", resize);
    initPaths();
    const frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 bg-[#020617]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none" />
    </div>
  );
}