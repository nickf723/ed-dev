"use client";
import { useEffect, useRef } from "react";

export type DomainKey = 
  | "geology" | "geography" | "mineralogy" 
  | "hydrology" | "meteorology" | "climatology";

// 1. CONFIGURATION
const CONFIG: Record<DomainKey, { 
    color: { r: number, g: number, b: number }, 
    physics: 'solid' | 'fluid' | 'gas' | 'crystal',
    renderShape: 'dot' | 'diamond' | 'grid' | 'cloud'
}> = {
  geology:     { color: { r: 16, g: 185, b: 129 }, physics: 'solid',  renderShape: 'dot' }, // Emerald
  geography:   { color: { r: 217, g: 119, b: 6 },  physics: 'solid',  renderShape: 'grid' }, // Amber
  mineralogy:  { color: { r: 216, g: 180, b: 254 },physics: 'crystal',renderShape: 'diamond' }, // Lavender
  hydrology:   { color: { r: 59, g: 130, b: 246 }, physics: 'fluid',  renderShape: 'dot' }, // Blue
  meteorology: { color: { r: 14, g: 165, b: 233 }, physics: 'gas',    renderShape: 'cloud' }, // Sky
  climatology: { color: { r: 239, g: 68, b: 68 },  physics: 'gas',    renderShape: 'dot' }, // Red
};

export default function GlobeBackground({ domain }: { domain: DomainKey }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Mutable state for smooth transitions
  const stateRef = useRef({
    rotation: 0,
    currentR: CONFIG.geology.color.r,
    currentG: CONFIG.geology.color.g,
    currentB: CONFIG.geology.color.b,
    wavePhase: 0,
    pulse: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    // --- GENERATE POINTS ---
    const points: {x: number, y: number, z: number, originalY: number, phaseOffset: number }[] = [];
    const numPoints = domain === 'geography' ? 800 : 1500; // Fewer points for grid mode to save perf
    const phi = Math.PI * (3 - Math.sqrt(5)); 
    
    for (let i = 0; i < numPoints; i++) {
        const y = 1 - (i / (numPoints - 1)) * 2; 
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i; 
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        points.push({ x, y, z, originalY: y, phaseOffset: Math.random() * Math.PI });
    }

    let animId: number;

    const render = () => {
      // CLEAR
      ctx.fillStyle = "#020408"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const baseScale = Math.min(w, h) * 0.35; 

      // --- INTERPOLATE STATE ---
      const config = CONFIG[domain];
      const lerp = 0.05;

      stateRef.current.currentR += (config.color.r - stateRef.current.currentR) * lerp;
      stateRef.current.currentG += (config.color.g - stateRef.current.currentG) * lerp;
      stateRef.current.currentB += (config.color.b - stateRef.current.currentB) * lerp;
      
      // Update Physics Time
      const speed = config.physics === 'gas' ? 0.003 : 0.001;
      stateRef.current.rotation += speed;
      stateRef.current.wavePhase += 0.02;
      stateRef.current.pulse += 0.05;

      const { currentR, currentG, currentB, rotation, wavePhase, pulse } = stateRef.current;
      const cssColor = `rgb(${Math.round(currentR)}, ${Math.round(currentG)}, ${Math.round(currentB)})`;
      
      // --- DRAW LOOP ---
      ctx.fillStyle = cssColor;
      ctx.strokeStyle = cssColor;

      // GEOGRAPHY: Draw Lat/Long Grid Lines logic (Simplified)
      if (config.renderShape === 'grid') {
         ctx.lineWidth = 0.5;
         ctx.globalAlpha = 0.1;
         ctx.beginPath();
         // Just a placeholder visual for grid - real sphere grid is complex math, 
         // sticking to point cloud for stability but connecting neighbors would be next step.
      }

      points.forEach((p, i) => {
         let modX = p.x;
         let modY = p.y;
         let modZ = p.z;

         // --- PHYSICS MODIFIERS ---
         if (config.physics === 'fluid') {
            // Waving motion
            const wave = Math.sin(p.originalY * 10 + wavePhase) * 0.05;
            modX += p.x * wave; modY += p.y * wave; modZ += p.z * wave;
         }
         else if (config.physics === 'gas') {
            // Expansion & Chaos
            const chaos = Math.sin(wavePhase * 2 + p.phaseOffset) * 0.02;
            const expansion = 1.1 + chaos;
            modX *= expansion; modY *= expansion; modZ *= expansion;
         }
         else if (config.physics === 'crystal') {
            // Rigid, sharp rotation ticks instead of smooth flow?
            // Or just static stability.
         }

         // Rotate Y
         const x1 = modX * Math.cos(rotation) - modZ * Math.sin(rotation);
         const z1 = modX * Math.sin(rotation) + modZ * Math.cos(rotation);
         const y1 = modY;

         // Project
         const scale = baseScale;
         const px = cx + x1 * scale;
         const py = cy + y1 * scale;
         
         const isFront = z1 > 0;
         const alpha = isFront ? 0.8 : 0.1;
         
         ctx.globalAlpha = alpha;

         // --- RENDER SHAPES ---
         
         if (config.renderShape === 'diamond') {
             // MINERALOGY: Draw rotating diamonds
             const size = isFront ? 3 : 1;
             ctx.save();
             ctx.translate(px, py);
             ctx.rotate(rotation * 2 + p.phaseOffset); // Sparkle spin
             ctx.beginPath();
             ctx.moveTo(0, -size);
             ctx.lineTo(size, 0);
             ctx.lineTo(0, size);
             ctx.lineTo(-size, 0);
             ctx.closePath();
             ctx.fill();
             ctx.restore();
         } 
         else if (config.renderShape === 'grid') {
             // GEOGRAPHY: Draw small crosses instead of dots to look like map markers
             const size = isFront ? 2 : 0.5;
             ctx.beginPath();
             ctx.moveTo(px - size, py); ctx.lineTo(px + size, py);
             ctx.moveTo(px, py - size); ctx.lineTo(px, py + size);
             ctx.stroke();
         }
         else if (config.renderShape === 'cloud') {
             // METEOROLOGY: Soft, larger circles
             const size = isFront ? 4 : 2;
             ctx.beginPath();
             ctx.arc(px, py, size, 0, Math.PI * 2);
             ctx.fill();
         }
         else {
             // DEFAULT (DOT)
             const size = isFront ? 1.5 : 0.5;
             ctx.beginPath();
             ctx.arc(px, py, size, 0, Math.PI * 2);
             ctx.fill();
         }
      });

      // --- POST-PROCESSING ---
      // Climatology Heat Haze
      if (domain === 'climatology') {
          const pulsate = Math.sin(pulse) * 0.1 + 0.1;
          ctx.globalCompositeOperation = "screen";
          ctx.fillStyle = "rgba(239, 68, 68, 0.1)";
          ctx.beginPath();
          ctx.arc(cx, cy, baseScale * (1 + pulsate), 0, Math.PI*2);
          ctx.fill();
          ctx.globalCompositeOperation = "source-over";
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [domain]); 

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none" />;
}