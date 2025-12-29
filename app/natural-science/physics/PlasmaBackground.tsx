"use client";
import { useEffect, useRef } from "react";

export default function PlasmaBackground({ timeScale }: { timeScale: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let t = 0;

    // Particles for the "Plasma"
    const count = 50;
    const particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: (Math.random() * 200 + 100) * .75,
      color: i % 2 === 0 ? "#ff0000af" : i % 3 === 0 ? "#00ff00af" : "#0000ffaf", // Red, Green, Blue
    }));

    const animate = () => {
      // Clear with trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, w, h);

      // Use "screen" or "lighter" for that glowing neon look
      ctx.globalCompositeOperation = "screen";

      t += 0.01 * timeScale; // Controlled by the Reality Distortion slider

      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx * timeScale;
        p.y += p.vy * timeScale;

        // Wall bounce
        if (p.x < -p.radius) p.x = w + p.radius;
        if (p.x > w + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = h + p.radius;
        if (p.y > h + p.radius) p.y = -p.radius;

        // Draw Gradient Blob
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        g.addColorStop(0, p.color);
        g.addColorStop(1, "transparent");

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Reset composite for next frame
      ctx.globalCompositeOperation = "source-over";
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
  }, [timeScale]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />;
}