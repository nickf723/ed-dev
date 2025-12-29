"use client";
import { useEffect, useRef } from "react";

export default function LaserBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: w / 2, y: h / 2 };

    // Floating Glass Spheres
    const spheres = Array.from({ length: 8 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 40 + Math.random() * 60,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      ior: 1.5 // Index of Refraction (Glass)
    }));

    const maxBounces = 10;

    // Helper: Normalize Vector
    const normalize = (v: { x: number, y: number }) => {
      const mag = Math.sqrt(v.x * v.x + v.y * v.y);
      return { x: v.x / mag, y: v.y / mag };
    };

    const animate = () => {
      // Dark Laboratory Floor
      ctx.fillStyle = "#020617"; // Slate-950
      ctx.fillRect(0, 0, w, h);

      // 1. Move Spheres
      spheres.forEach(s => {
          s.x += s.vx; s.y += s.vy;
          if(s.x < 0 || s.x > w) s.vx *= -1;
          if(s.y < 0 || s.y > h) s.vy *= -1;
          
          // Draw Sphere (Glassy look)
          const g = ctx.createRadialGradient(s.x - s.r*0.3, s.y - s.r*0.3, 0, s.x, s.y, s.r);
          g.addColorStop(0, "rgba(255,255,255,0.1)");
          g.addColorStop(0.5, "rgba(255,255,255,0.05)");
          g.addColorStop(1, "rgba(255,255,255,0.2)"); // Rim
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
          ctx.fill();
      });

      // 2. Cast Laser Beam
      // Start from mouse, shooting RIGHT (initially)
      // Actually, let's shoot towards center or just static direction
      let ray = { x: mouse.x, y: mouse.y, dx: 1, dy: 0.5 };
      ray = { ...ray, ...normalize({x: Math.cos(Date.now()*0.001), y: Math.sin(Date.now()*0.001)}) }; // Rotating source
      
      ctx.beginPath();
      ctx.moveTo(ray.x, ray.y);
      ctx.strokeStyle = "#4ade80"; // Green Laser (532nm)
      ctx.shadowColor = "#4ade80";
      ctx.shadowBlur = 15;
      ctx.lineWidth = 3;

      let currentX = ray.x;
      let currentY = ray.y;
      let dirX = ray.dx;
      let dirY = ray.dy;

      // Ray Marching Loop
      for (let b = 0; b < maxBounces; b++) {
          let minDist = 10000;
          let hitObj: (typeof spheres)[0] | null = null;
          let hitX = currentX + dirX * 2000; // Default: off screen
          let hitY = currentY + dirY * 2000;

          // Check Wall Collisions
          // (Simplified: just bounce off screen edges for visual flair)
          // Mathematical intersection logic omitted for brevity in favor of "Orbital" check below
          
          // Check Sphere Intersections
          spheres.forEach(s => {
              // Vector from current ray start to sphere center
              const ex = s.x - currentX;
              const ey = s.y - currentY;
              // Project sphere center onto ray direction
              const a = ex * dirX + ey * dirY;
              if (a > 0) { // Forward only
                   const nearestX = currentX + dirX * a;
                   const nearestY = currentY + dirY * a;
                   const distToCenter = Math.sqrt((s.x - nearestX)**2 + (s.y - nearestY)**2);
                   
                   if (distToCenter < s.r) {
                       // We hit! Calculate exact hit point (geometry)
                       const depth = Math.sqrt(s.r*s.r - distToCenter*distToCenter);
                       const distToHit = a - depth;
                       
                       if (distToHit < minDist && distToHit > 1) { // >1 prevents self-intersection
                           minDist = distToHit;
                           hitX = currentX + dirX * distToHit;
                           hitY = currentY + dirY * distToHit;
                           hitObj = s;
                       }
                   }
              }
          });

          // Draw Segment
          ctx.lineTo(hitX, hitY);
          
          // Interaction (Refract/Reflect)
          if (hitObj !== null) {
               // Calculate Normal
               const nx = (hitX - hitObj!.x) / hitObj!.r;
               const ny = (hitY - hitObj!.y) / hitObj!.r;
               
               // Simple Reflection for visual effect (Refraction is harder to make look good in 2D without back-face)
               // R = I - 2(N.I)N
               const dot = dirX * nx + dirY * ny;
               dirX = dirX - 2 * dot * nx;
               dirY = dirY - 2 * dot * ny;
               
               // Move slightly off surface
               currentX = hitX + dirX;
               currentY = hitY + dirY;
          } else {
              break; // Hit nothing (went off screen)
          }
      }
      
      ctx.stroke();
      
      // Draw Source
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI*2);
      ctx.fillStyle = "#fff";
      ctx.fill();

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
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