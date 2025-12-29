"use client";
import { useEffect, useRef } from "react";

export type EarthLayer = "lithosphere" | "atmosphere" | "hydrosphere";

export default function GlobeBackground({ layer }: { layer: EarthLayer }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    let rotation = 0;
    let mouse = { x: w / 2, y: h / 2 };
    let isDragging = false;
    let lastX = 0;

    // Generate Sphere Points
    const points: {x: number, y: number, z: number, lat: number, lon: number}[] = [];
    const numPoints = 1200;
    
    // Fibonacci Sphere Algorithm for even distribution
    const phi = Math.PI * (3 - Math.sqrt(5)); 
    for (let i = 0; i < numPoints; i++) {
        const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
        const radius = Math.sqrt(1 - y * y); // radius at y
        const theta = phi * i; 

        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        
        points.push({ x, y, z, lat: Math.asin(y), lon: Math.atan2(z, x) });
    }

    // Atmosphere Particles (Clouds)
    const clouds = Array.from({ length: 100 }, () => ({
        lat: (Math.random() - 0.5) * Math.PI,
        lon: Math.random() * Math.PI * 2,
        r: 1.2 + Math.random() * 0.1, // Higher altitude
        speed: 0.002 + Math.random() * 0.005
    }));

    const animate = () => {
      ctx.fillStyle = "#020408"; // Deep space black/blue
      ctx.fillRect(0, 0, w, h);
      
      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) * 0.35; // Globe size

      // Auto rotate if not dragging
      if (!isDragging) rotation += 0.002;

      // --- DRAW GLOBE ---
      points.forEach(p => {
          // 1. Rotate around Y axis
          const x1 = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
          const z1 = p.x * Math.sin(rotation) + p.z * Math.cos(rotation);
          const y1 = p.y; // No X-axis rotation for simplicity right now

          // 2. Project to 2D
          // Simple orthographic projection
          const px = cx + x1 * scale;
          const py = cy + y1 * scale;
          
          // 3. Occlusion (Back-face culling / dimming)
          const alpha = z1 > 0 ? 1 : 0.1; // Bright front, dim back
          const size = z1 > 0 ? 1.5 : 1;

          // 4. Color logic based on Layer
          let color = "rgba(255, 255, 255, 0.5)";
          
          if (layer === "lithosphere") {
              // Tectonic/Land look: Emerald/Brown
              color = z1 > 0 ? "#10b981" : "#064e3b"; // Emerald-500
          } else if (layer === "atmosphere") {
              // Sky look: Cyan/White
              color = z1 > 0 ? "#bae6fd" : "#0c4a6e"; // Sky-200
          } else if (layer === "hydrosphere") {
              // Ocean look: Deep Blue
              color = z1 > 0 ? "#3b82f6" : "#1e3a8a"; // Blue-500
          }

          ctx.fillStyle = color;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI*2);
          ctx.fill();
      });

      // --- DRAW ATMOSPHERE LAYER (If active) ---
      if (layer === "atmosphere") {
          clouds.forEach(c => {
              c.lon += c.speed; // Move clouds
              
              // Spherical to Cartesian
              const cx3 = Math.cos(c.lat) * Math.cos(c.lon);
              const cy3 = Math.sin(c.lat);
              const cz3 = Math.cos(c.lat) * Math.sin(c.lon);

              // Rotate
              const x1 = cx3 * Math.cos(rotation) - cz3 * Math.sin(rotation);
              const z1 = cx3 * Math.sin(rotation) + cz3 * Math.cos(rotation);
              
              if (z1 > -0.2) { // Show slightly behind horizon
                  const px = cx + x1 * scale * c.r;
                  const py = cy + cy3 * scale * c.r;
                  
                  ctx.fillStyle = "rgba(255,255,255,0.3)";
                  ctx.beginPath();
                  ctx.arc(px, py, 4, 0, Math.PI*2);
                  ctx.fill();
              }
          });
      }
      
      // --- DRAW TECTONIC LINES (If Lithosphere) ---
      if (layer === "lithosphere") {
          // Visual flair: Connect random nearby points to simulate structure
          // (Omitted for perf, keeping it point-cloud based for now)
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleMouseDown = (e: MouseEvent) => {
        isDragging = true;
        lastX = e.clientX;
    };
    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        if (isDragging) {
            const dx = e.clientX - lastX;
            rotation += dx * 0.005;
            lastX = e.clientX;
        }
    };
    const handleMouseUp = () => isDragging = false;
    
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, [layer]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-auto cursor-grab active:cursor-grabbing" />;
}