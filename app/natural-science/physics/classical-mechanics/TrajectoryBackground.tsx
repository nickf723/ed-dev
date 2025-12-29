"use client";
import { useEffect, useRef } from "react";

export default function TrajectoryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    // State
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let dragCurrent = { x: 0, y: 0 };

    type Projectile = { x: number; y: number; vx: number; vy: number; trail: {x: number, y: number}[] };
    const projectiles: Projectile[] = [];

    const animate = () => {
      // Blueprint Blue Background
      ctx.fillStyle = "#0f172a"; // Slate-900
      ctx.fillRect(0, 0, w, h);
      
      // Draw Grid (Blueprint style)
      ctx.strokeStyle = "rgba(148, 163, 184, 0.1)";
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      ctx.beginPath();
      for(let x=0; x<=w; x+=gridSize) { ctx.moveTo(x,0); ctx.lineTo(x,h); }
      for(let y=0; y<=h; y+=gridSize) { ctx.moveTo(0,y); ctx.lineTo(w,y); }
      ctx.stroke();

      // Update & Draw Projectiles
      ctx.lineWidth = 2;
      for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        
        // Physics Step
        p.vy += 0.5; // Gravity
        p.x += p.vx;
        p.y += p.vy;
        
        // Add to trail (limit length for performance)
        p.trail.push({x: p.x, y: p.y});
        if(p.trail.length > 50) p.trail.shift();

        // Draw Trail
        ctx.beginPath();
        ctx.strokeStyle = "rgba(251, 146, 60, 0.6)"; // Orange trail
        for(let j=0; j<p.trail.length-1; j++) {
            ctx.moveTo(p.trail[j].x, p.trail[j].y);
            ctx.lineTo(p.trail[j+1].x, p.trail[j+1].y);
        }
        ctx.stroke();

        // Draw Head
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI*2);
        ctx.fillStyle = "#fb923c"; // Orange-400
        ctx.fill();

        // Remove if out of bounds (below screen)
        if (p.y > h + 50) projectiles.splice(i, 1);
      }

      // Draw Slingshot Line (Aiming)
      if (isDragging) {
         ctx.beginPath();
         ctx.moveTo(dragStart.x, dragStart.y);
         ctx.lineTo(dragCurrent.x, dragCurrent.y);
         ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
         ctx.setLineDash([5, 5]);
         ctx.stroke();
         ctx.setLineDash([]);
         
         // Predict Trajectory (Optional visual flair)
         ctx.beginPath();
         ctx.arc(dragStart.x, dragStart.y, 10, 0, Math.PI*2);
         ctx.strokeStyle = "#fff";
         ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleMouseDown = (e: MouseEvent) => {
        isDragging = true;
        dragStart = { x: e.clientX, y: e.clientY };
        dragCurrent = { x: e.clientX, y: e.clientY };
    };
    const handleMouseMove = (e: MouseEvent) => {
        if(isDragging) dragCurrent = { x: e.clientX, y: e.clientY };
    };
    const handleMouseUp = () => {
        if (!isDragging) return;
        isDragging = false;
        
        // Calculate Velocity based on pull distance
        const vx = (dragStart.x - dragCurrent.x) * 0.15;
        const vy = (dragStart.y - dragCurrent.y) * 0.15;
        
        projectiles.push({
            x: dragStart.x,
            y: dragStart.y,
            vx, vy,
            trail: []
        });
    };
    
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-auto cursor-crosshair" />;
}