"use client";
import React, { useEffect, useRef } from 'react';

export default function GroupingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Emerald, Rose, and Sky colors to match our Pokémon starters
    const colors = ["#10b981", "#f43f5e", "#0ea5e9"]; 

    // Create "Sets" (Clusters)
    const clusters = Array.from({ length: 15 }, () => {
      const numElements = Math.floor(Math.random() * 4) + 2; // 2 to 5 dots per set
      const radius = numElements * 12 + 10;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        elements: Array.from({ length: numElements }, () => ({
           offsetX: (Math.random() - 0.5) * (radius * 0.8),
           offsetY: (Math.random() - 0.5) * (radius * 0.8),
        })),
        rotation: 0,
        vRot: (Math.random() - 0.5) * 0.02
      };
    });

    const animate = () => {
      ctx.fillStyle = "#0a0f14"; 
      ctx.fillRect(0, 0, w, h);

      clusters.forEach(cluster => {
        cluster.x += cluster.vx;
        cluster.y += cluster.vy;
        cluster.rotation += cluster.vRot;

        // Screen wrap
        if (cluster.x < -100) cluster.x = w + 100;
        if (cluster.x > w + 100) cluster.x = -100;
        if (cluster.y < -100) cluster.y = h + 100;
        if (cluster.y > h + 100) cluster.y = -100;

        ctx.save();
        ctx.translate(cluster.x, cluster.y);
        ctx.rotate(cluster.rotation);

        // Draw the Set boundary (dashed circle)
        ctx.beginPath();
        ctx.arc(0, 0, cluster.radius, 0, Math.PI * 2);
        ctx.strokeStyle = cluster.color;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.globalAlpha = 0.2;
        ctx.stroke();

        // Draw the elements inside the Set
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = cluster.color;
        cluster.elements.forEach(el => {
            ctx.beginPath();
            ctx.arc(el.offsetX, el.offsetY, 4, 0, Math.PI * 2);
            ctx.fill();
        });

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
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f14]/40 via-transparent to-[#0a0f14] opacity-90" />
    </div>
  );
}