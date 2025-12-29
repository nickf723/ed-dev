"use client";
import { useEffect, useRef } from "react";

export default function HeatBackground({ temperature }: { temperature: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: w / 2, y: h / 2 };

    // Particle System representing Ideal Gas molecules
    const particleCount = 150;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      baseSpeed: 0.5 + Math.random(), // Intrinsic property
      size: 2 + Math.random() * 3,
    }));

    const animate = () => {
      // Clear with trail for motion blur feel
      ctx.fillStyle = "rgba(10, 5, 5, 0.2)";
      ctx.fillRect(0, 0, w, h);

      // Global Speed Multiplier based on Temperature Prop (0 to 1)
      // 0 = Frozen (0.1x), 1 = Plasma (5x)
      const energyLevel = 0.1 + temperature * 5;

      particles.forEach((p) => {
        // 1. Move
        p.x += p.vx * energyLevel;
        p.y += p.vy * energyLevel;

        // 2. Wall Collision (Elastic)
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // 3. Mouse Interaction (Heat Injection)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
           // Push away and heat up slightly (add chaos)
           const force = (150 - dist) / 150;
           p.vx -= (dx / dist) * force * 0.5;
           p.vy -= (dy / dist) * force * 0.5;
        }

        // 4. Color Mapping based on Kinetic Energy (Speed)
        // Map 0..1 temp to Blue..Red
        const speed = Math.abs(p.vx * energyLevel) + Math.abs(p.vy * energyLevel);
        
        let color;
        if (temperature < 0.3) {
            // Cold: Blue/Cyan
            color = `rgba(56, 189, 248, ${0.4 + speed * 0.1})`; 
        } else if (temperature < 0.7) {
            // Warm: Orange/Yellow
            color = `rgba(251, 146, 60, ${0.4 + speed * 0.1})`;
        } else {
            // Hot: Red/White
            const whiteHot = Math.min(255, speed * 20);
            color = `rgb(255, ${200 - whiteHot}, ${200 - whiteHot})`;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Connections (Molecular bonds forming/breaking)
        // Only draw connections if cold (crystal lattice) or randomly if dense
        if (temperature < 0.2) {
             particles.forEach(p2 => {
                 const d2 = Math.sqrt((p.x-p2.x)**2 + (p.y-p2.y)**2);
                 if (d2 < 60) {
                     ctx.beginPath();
                     ctx.moveTo(p.x, p.y);
                     ctx.lineTo(p2.x, p2.y);
                     ctx.strokeStyle = `rgba(56, 189, 248, ${0.1})`;
                     ctx.stroke();
                 }
             });
        }
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };
    const handleResize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, [temperature]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}