"use client";
import React, { useEffect, useRef } from 'react';

export default function FractionsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Friendly, vibrant citrus/pizza colors
    const colors = ["#f97316", "#3b82f6", "#eab308", "#10b981", "#d946ef"]; 

    // Generate random fractions (e.g., 1/2, 3/4, 2/3, 1/4)
    const items = Array.from({ length: 25 }, () => {
      const den = Math.floor(Math.random() * 4) + 2; // Denominators 2 to 5
      const num = Math.floor(Math.random() * den) + 1; // Numerator 1 to den
      
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 60 + 30, // 30px to 90px
        num: num,
        den: den,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.005 // Very slow spin
      };
    });

    const animate = () => {
      // Deep warm background 
      ctx.fillStyle = "#0f0e17"; 
      ctx.fillRect(0, 0, w, h);

      items.forEach(item => {
        item.x += item.vx;
        item.y += item.vy;
        item.rotation += item.vRot;

        // Wrap around screen seamlessly
        if (item.x < -100) item.x = w + 100;
        if (item.x > w + 100) item.x = -100;
        if (item.y < -100) item.y = h + 100;
        if (item.y > h + 100) item.y = -100;

        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);

        // Draw Base Circle (The Whole)
        ctx.beginPath();
        ctx.arc(0, 0, item.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.015)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw the Fraction Slices
        const sliceAngle = (Math.PI * 2) / item.den;
        ctx.fillStyle = item.color;
        ctx.globalAlpha = 0.12; // Soft glowing opacity

        for (let i = 0; i < item.num; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, item.radius, i * sliceAngle, (i + 1) * sliceAngle);
          ctx.closePath();
          ctx.fill();
          
          // Draw subtle lines between slices
          ctx.strokeStyle = "rgba(15, 14, 23, 0.5)"; // Match background color for gap effect
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0e17]/40 via-transparent to-[#0f0e17] opacity-90" />
    </div>
  );
}