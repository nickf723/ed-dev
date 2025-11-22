"use client";
import { useEffect, useRef } from "react";

export default function BlueprintBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animationFrameId: number;
    
    let offset = 0;
    const speed = 0.5;
    
    // Configuration
    const gridSize = 40; // Base width of vertical columns
    
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      // 1. Background (Deep Blueprint)
      ctx.fillStyle = "#020617"; // Slate-950
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2; // Horizon line
      
      // 2. Horizon Line (Glowing)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.5)"; // Cyan-500
      ctx.lineWidth = 2;
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.stroke();
      
      ctx.lineWidth = 1;

      // 3. Floor Lines (Horizontal) - Perspective Effect
      // We start slightly below the horizon to avoid the Z=0 infinite loop issue
      ctx.beginPath();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.15)"; 
      
      let y = cy + 5; 
      while (y < h) {
         const dist = y - cy;
         // Parallax: Lines move slower near horizon
         // We add (offset % 20) scaled by distance to create movement
         const moveY = y + (offset % 40) * (dist / h); 
         
         if (moveY < h) {
            ctx.moveTo(0, moveY);
            ctx.lineTo(w, moveY);
         }
         
         // SAFETY FIX: Ensure we always increment by at least 2 pixels
         // The (dist * 0.15) creates the exponential spacing (perspective)
         y += Math.max(2, dist * 0.15); 
      }
      ctx.stroke();

      // 4. Ceiling Lines (Mirror of Floor)
      ctx.beginPath();
      y = cy - 5;
      while (y > 0) {
         const dist = cy - y;
         const moveY = y - (offset % 40) * (dist / h);
         
         if (moveY > 0) {
            ctx.moveTo(0, moveY);
            ctx.lineTo(w, moveY);
         }
         
         // SAFETY FIX
         y -= Math.max(2, dist * 0.15);
      }
      ctx.stroke();

      // 5. Vertical Fanning Lines (Vanishing Point)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.05)";
      // We draw extra lines off-screen so they don't "pop" in when moving
      for (let x = -w; x < w * 2; x += gridSize * 3) {
          // Floor vertical
          ctx.moveTo(x, h);
          ctx.lineTo(cx, cy);
          // Ceiling vertical
          ctx.moveTo(x, 0);
          ctx.lineTo(cx, cy);
      }
      ctx.stroke();

      offset += speed;
      animationFrameId = requestAnimationFrame(draw);
    };

    // Start loop
    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    
    // Cleanup: Properly cancels the ongoing loop
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}