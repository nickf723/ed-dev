"use client";
import { useEffect, useRef } from "react";

export default function HomomorphismBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    // Group G (Source): Cyclic group of order 12
    const nG = 12;
    // Group H (Target): Cyclic group of order 6 (Homomorphism phi(x) = x mod 6)
    // This implies a "2-to-1" mapping (Kernel has size 2)
    const nH = 6;
    
    let time = 0;
    let activeIndex = 0; // The element currently "operating"

    const render = () => {
      time += 0.01;
      
      // Clear with "Void" Violet
      ctx.fillStyle = "#05020c"; 
      ctx.fillRect(0, 0, w, h);

      const cy = h / 2;
      const cx1 = w * 0.25; // Source Center
      const cx2 = w * 0.75; // Target Center
      const r = 150;

      // 1. Draw Source Group G (Violet)
      const nodesG: {x: number, y: number}[] = [];
      for(let i=0; i<nG; i++) {
          const theta = (i / nG) * Math.PI * 2 - Math.PI/2;
          nodesG.push({
              x: cx1 + Math.cos(theta) * r,
              y: cy + Math.sin(theta) * r
          });
      }

      // 2. Draw Target Group H (Cyan)
      const nodesH: {x: number, y: number}[] = [];
      for(let i=0; i<nH; i++) {
          const theta = (i / nH) * Math.PI * 2 - Math.PI/2;
          nodesH.push({
              x: cx2 + Math.cos(theta) * (r * 0.8), // Slightly smaller
              y: cy + Math.sin(theta) * (r * 0.8)
          });
      }

      // 3. Animate Operation
      // We cycle through elements 'a' acting on 'b'
      // Let's visualize a simple rotation generator g=1 moving around
      const currentIdx = Math.floor(time) % nG;
      const nextIdx = (currentIdx + 1) % nG;
      const percent = time % 1;

      // Draw Group G static structure
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)"; // Violet
      ctx.lineWidth = 1;
      ctx.beginPath();
      nodesG.forEach((p, i) => {
          const next = nodesG[(i+1)%nG];
          ctx.moveTo(p.x, p.y); ctx.lineTo(next.x, next.y);
      });
      ctx.stroke();

      // Draw Group H static structure
      ctx.strokeStyle = "rgba(6, 182, 212, 0.1)"; // Cyan
      ctx.beginPath();
      nodesH.forEach((p, i) => {
          const next = nodesH[(i+1)%nH];
          ctx.moveTo(p.x, p.y); ctx.lineTo(next.x, next.y);
      });
      ctx.stroke();

      // 4. VISUALIZE THE MAP (The Laser Streams)
      // Map every node in G to H
      // phi(i) = i % nH
      nodesG.forEach((pG, i) => {
          const targetIdx = i % nH;
          const pH = nodesH[targetIdx];

          // Draw faint mapping line
          ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
          ctx.beginPath();
          ctx.moveTo(pG.x, pG.y);
          ctx.lineTo(pH.x, pH.y);
          ctx.stroke();
      });

      // 5. ANIMATE THE "PULSE" (The Structure Preservation)
      // Source Action: Moving from current to next
      const pG1 = nodesG[currentIdx];
      const pG2 = nodesG[nextIdx];
      
      // Interpolated Position in G
      const ixG = pG1.x + (pG2.x - pG1.x) * percent;
      const iyG = pG1.y + (pG2.y - pG1.y) * percent;

      // Target Action: The Map forces H to move too
      const targetIdx1 = currentIdx % nH;
      const targetIdx2 = nextIdx % nH;
      const pH1 = nodesH[targetIdx1];
      const pH2 = nodesH[targetIdx2];

      // Interpolated Position in H
      const ixH = pH1.x + (pH2.x - pH1.x) * percent;
      const iyH = pH1.y + (pH2.y - pH1.y) * percent;

      // Draw The "Event"
      // Source Dot
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#8b5cf6";
      ctx.fillStyle = "#8b5cf6";
      ctx.beginPath(); ctx.arc(ixG, iyG, 6, 0, Math.PI*2); ctx.fill();

      // Target Dot
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#06b6d4";
      ctx.fillStyle = "#06b6d4";
      ctx.beginPath(); ctx.arc(ixH, iyH, 6, 0, Math.PI*2); ctx.fill();
      ctx.shadowBlur = 0;

      // The Transmission Beam (Connecting the two active points)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(ixG, iyG);
      ctx.lineTo(ixH, iyH);
      ctx.stroke();
      ctx.setLineDash([]);

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none" />;
}