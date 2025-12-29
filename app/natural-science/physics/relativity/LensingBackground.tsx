"use client";
import { useEffect, useRef } from "react";

export default function LensingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: w / 2, y: h / 2 };

    // Starfield
    const starCount = 800;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.5,
      color: Math.random() > 0.9 ? "#fbbf24" : "#fff" // Some gold stars
    }));

    // Black Hole Parameters
    const radius = 60; // Event Horizon size
    const lensStrength = 4000; // Gravity strength

    const animate = () => {
      // Deep Space Background
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      // 1. Draw Accretion Disk Glow (Behind)
      const g = ctx.createRadialGradient(mouse.x, mouse.y, radius * 0.8, mouse.x, mouse.y, radius * 4);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(0.1, "rgba(245, 158, 11, 0.8)"); // Amber ring
      g.addColorStop(0.4, "rgba(180, 83, 9, 0.2)"); // Dark Orange
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // 2. Draw Lensed Stars
      stars.forEach(s => {
          const dx = s.x - mouse.x;
          const dy = s.y - mouse.y;
          const distSq = dx*dx + dy*dy;
          const dist = Math.sqrt(distSq);

          // Lensing Math: Shift apparent position away from mass
          // Shift amount is inversely proportional to distance (1/r)
          // We limit the shift to avoid stars shooting off to infinity at the center
          let lx = s.x;
          let ly = s.y;

          if (dist > radius) {
              const shift = lensStrength / dist;
              const angle = Math.atan2(dy, dx);
              lx = s.x + Math.cos(angle) * shift;
              ly = s.y + Math.sin(angle) * shift;
          } else {
              // Inside Event Horizon: Swallowed (Don't draw, or draw warped inward)
              return; 
          }

          ctx.beginPath();
          ctx.arc(lx, ly, s.size, 0, Math.PI*2);
          ctx.fillStyle = s.color;
          ctx.fill();
      });

      // 3. Draw The Void (Event Horizon)
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI*2);
      ctx.fillStyle = "#000"; // Absolute black
      ctx.fill();
      
      // Photon Sphere Ring (Thin white outline)
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
        // Add some "drag" to the black hole movement for mass feeling
        mouse.x += (e.clientX - mouse.x) * 0.1; 
        mouse.y += (e.clientY - mouse.y) * 0.1;
    };
    // Note: We use a simpler direct mapping for responsiveness in this demo
    const handleMoveDirect = (e: MouseEvent) => {
         mouse.x = e.clientX;
         mouse.y = e.clientY;
    }
    
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };

    window.addEventListener("mousemove", handleMoveDirect);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousemove", handleMoveDirect);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}