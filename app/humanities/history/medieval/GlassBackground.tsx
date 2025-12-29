"use client";
import { useEffect, useRef } from "react";

export default function GlassBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: w / 2, y: h / 2 };

    // Voronoi Sites
    const siteCount = 150;
    const sites = Array.from({ length: siteCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      color: Math.random() > 0.6 
        ? `hsl(${340 + Math.random() * 40}, 70%, 40%)` // Ruby/Crimson
        : Math.random() > 0.5 
            ? `hsl(${200 + Math.random() * 40}, 70%, 40%)` // Sapphire
            : `hsl(${40 + Math.random() * 20}, 80%, 40%)` // Gold/Amber
    }));

    // We can't do real-time Voronoi calc per pixel in JS easily for full screen.
    // Optimization: Pre-calculate the polygons or just draw "Shards" (Triangles/Polygons)
    // Let's draw a Delaunay-ish mesh or simple polygons for performance and style.
    
    // Simpler Approach: "Mosaic Tiles"
    // Just draw many random shapes.
    
    // Better Approach: Pre-render the Voronoi to an offscreen canvas? No, we need dynamic lighting.
    // Let's use a grid of points and draw triangles between neighbors.

    const draw = () => {
      // Background: Lead / Iron
      ctx.fillStyle = "#171717"; 
      ctx.fillRect(0, 0, w, h);

      // We will loop through sites and draw a "Cell" for each.
      // Since true Voronoi is hard, we'll fake it with circles that overlap to fill gaps? No.
      // Let's stick to a simple geometric mesh.
      
      // Let's just draw the sites as large polygons.
      sites.forEach(site => {
          // Distance to mouse determines "Lit" state
          const dx = site.x - mouse.x;
          const dy = site.y - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const light = Math.max(0.1, 1 - dist / 400); // 0.1 to 1.0

          // Draw a diamond/shard shape
          ctx.beginPath();
          const size = 60;
          ctx.moveTo(site.x, site.y - size);
          ctx.lineTo(site.x + size, site.y);
          ctx.lineTo(site.x, site.y + size);
          ctx.lineTo(site.x - size, site.y);
          ctx.closePath();

          // Fill with light effect
          ctx.fillStyle = site.color;
          ctx.globalAlpha = light; // Brightness
          ctx.fill();
          
          // Lead borders (The Came)
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 3;
          ctx.globalAlpha = 1;
          ctx.stroke();
      });
    };

    const animate = () => {
        draw();
        requestAnimationFrame(animate);
    }
    
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