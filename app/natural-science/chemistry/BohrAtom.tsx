"use client";
import { useEffect, useRef } from "react";
import { ChemicalElement, GROUP_COLORS } from "./chemistry-data";

export default function BohrAtom({ element }: { element: ChemicalElement }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let time = 0;

    // Parse color from Tailwind string (hacky extract or default to lime)
    // We'll just map group to hex for canvas
    const getHexColor = (group: string) => {
        if(group.includes("Alkali")) return "#f87171";
        if(group.includes("Transition")) return "#facc15";
        if(group.includes("Noble")) return "#c084fc";
        if(group.includes("Nonmetal")) return "#60a5fa";
        return "#84cc16"; // Default Lime
    };
    const atomColor = getHexColor(element.group);

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      const centerX = w / 2;
      const centerY = h / 2;

      // 1. Draw Nucleus
      ctx.shadowBlur = 15;
      ctx.shadowColor = atomColor;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Symbol Text
      ctx.fillStyle = "#000";
      ctx.font = "bold 8px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(element.symbol, centerX, centerY);

      // 2. Draw Shells & Electrons
      const shellCount = element.shells.length;
      const maxRadius = Math.min(w, h) / 2 - 10;
      const spacing = maxRadius / (shellCount + 1);

      element.shells.forEach((electronCount, i) => {
          const radius = spacing * (i + 2);
          const speed = 0.02 - (i * 0.002); // Outer shells slower
          
          // Draw Ring
          ctx.strokeStyle = "rgba(255,255,255,0.1)";
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI*2);
          ctx.stroke();

          // Draw Electrons
          ctx.fillStyle = atomColor;
          ctx.shadowBlur = 5;
          ctx.shadowColor = atomColor;
          
          for(let e = 0; e < electronCount; e++) {
              // Distribute evenly
              const offset = (Math.PI * 2 / electronCount) * e;
              const theta = time * speed + offset;
              const ex = centerX + Math.cos(theta) * radius;
              const ey = centerY + Math.sin(theta) * radius;

              ctx.beginPath();
              ctx.arc(ex, ey, 3, 0, Math.PI*2);
              ctx.fill();
          }
      });

      time++;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    
    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
         if(canvas) { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; }
    });
    resizeObserver.observe(canvas);

    return () => {
        cancelAnimationFrame(animId);
        resizeObserver.disconnect();
    };
  }, [element]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}