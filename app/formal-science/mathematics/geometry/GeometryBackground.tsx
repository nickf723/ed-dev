"use client";
import { useEffect, useRef } from "react";

export default function GeometryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const circles: {x: number, y: number, r: number, maxR: number, growth: number, color: string}[] = [];
    const maxCircles = 15;
    // Geometry Palette (Blue, Cyan, Violet)
    const colors = ["rgba(17, 0, 255, 0.1)", "rgba(0, 173, 204, 0.1)", "rgba(162, 0, 255, 0.1)"];

    const initCircle = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0,
      maxR: Math.random() * 200 + 100,
      growth: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)]
    });

    for(let i=0; i<maxCircles; i++) circles.push(initCircle());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Draw construct lines (faint grid)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;

      circles.forEach((c, i) => {
        c.r += c.growth;
        
        // Draw Circle
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.strokeStyle = c.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Reset
        if (c.r > c.maxR) {
           circles[i] = initCircle();
        }
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50 mix-blend-screen" />
        <div className="hd-vignette" />
    </>
  );
}