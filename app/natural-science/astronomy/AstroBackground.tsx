"use client";
import { useEffect, useRef } from "react";

export default function AstroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: w / 2, y: h / 2, active: false };

    // Stars
    const stars = Array.from({ length: 400 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      baseX: 0, 
      baseY: 0,
      size: Math.random() * 1.5,
      brightness: Math.random()
    }));
    // Init base positions
    stars.forEach(s => { s.baseX = s.x; s.baseY = s.y; });

    const animate = () => {
      // Deep Space Fade
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, w, h);

      // Mouse interaction (The Singularity)
      const mx = mouse.active ? mouse.x : w/2;
      const my = mouse.active ? mouse.y : h/2;

      // Draw Spacetime Grid (Subtle)
      ctx.strokeStyle = "rgba(124, 58, 237, 0.05)"; // Faint Purple
      ctx.lineWidth = 1;
      
      // Draw Stars with Lensing Effect
      stars.forEach(star => {
          // Distance from singularity
          const dx = star.baseX - mx;
          const dy = star.baseY - my;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          // Lensing Math: Stars get pushed AWAY/PULLED IN based on gravity
          // Let's simulate a "warp" where space stretches towards the center
          const warpFactor = Math.max(0, (300 - dist) / 300); // Effect radius 300px
          const pull = warpFactor * 50; // Max pull pixels

          const angle = Math.atan2(dy, dx);
          
          // Warped positions
          star.x = star.baseX - Math.cos(angle) * pull;
          star.y = star.baseY - Math.sin(angle) * pull;

          // Twinkle
          if (Math.random() > 0.99) star.brightness = Math.random();

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI*2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
          
          // If close to center, blue shift (brighter/blue)
          if (dist < 100) {
              ctx.fillStyle = `rgba(167, 139, 250, ${star.brightness + 0.5})`;
              ctx.shadowColor = "#8b5cf6";
              ctx.shadowBlur = 10;
          } else {
              ctx.shadowBlur = 0;
          }
          
          ctx.fill();
      });

      // Accretion Disk / Center Glow
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
      grad.addColorStop(0, "rgba(0,0,0,1)"); // Event Horizon
      grad.addColorStop(0.1, "rgba(124, 58, 237, 0.4)"); // Inner Ring
      grad.addColorStop(0.5, "rgba(0,0,0,0)"); // Fade
      
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(mx, my, 200, 0, Math.PI*2); ctx.fill();

      // Event Horizon Black Circle
      ctx.fillStyle = "#000";
      ctx.beginPath(); ctx.arc(mx, my, 10, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}