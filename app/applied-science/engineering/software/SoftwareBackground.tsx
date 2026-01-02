"use client";
import { useEffect, useRef } from "react";

export default function SoftwareBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Config
    const spacing = 40;
    const speed = 1;
    
    // State
    type Branch = { id: number; color: string; lane: number; active: boolean };
    type Commit = { x: number; y: number; color: string; branchId: number; parents: {x: number, y: number}[] };
    
    const branches: Branch[] = [
        { id: 0, color: "#22c55e", lane: 0, active: true }, // Main (Green)
    ];
    const commits: Commit[] = [];
    
    let tick = 0;
    let offsetY = 0;

    const colors = ["#3b82f6", "#a855f7", "#eab308", "#ef4444"]; // Blue, Purple, Yellow, Red

    const animate = () => {
      // Dark IDE Background
      ctx.fillStyle = "#1e1e1e"; 
      ctx.fillRect(0, 0, w, h);

      offsetY += speed;

      // Spawn Commits
      if (tick % 30 === 0) {
          // Maybe spawn new branch?
          if (branches.length < 4 && Math.random() > 0.95) {
              const source = branches.find(b => b.active);
              if (source) {
                  branches.push({
                      id: branches.length,
                      color: colors[branches.length - 1],
                      lane: branches.length,
                      active: true
                  });
              }
          }

          // Maybe merge branch?
          if (branches.length > 1 && Math.random() > 0.95) {
              const activeBranches = branches.filter(b => b.active && b.id !== 0);
              if (activeBranches.length > 0) {
                  const b = activeBranches[Math.floor(Math.random() * activeBranches.length)];
                  // Create merge commit on Main
                  commits.push({
                      x: w/2, // Main lane
                      y: h + 20,
                      color: branches[0].color,
                      branchId: 0,
                      parents: [
                          {x: w/2, y: h + 20 + spacing}, // Prev main
                          {x: w/2 + b.lane * 30, y: h + 20 + spacing} // Merged branch
                      ]
                  });
                  b.active = false; // Kill branch
              }
          } else {
              // Regular Commit
              const active = branches.filter(b => b.active);
              if (active.length > 0) {
                  const b = active[Math.floor(Math.random() * active.length)];
                  const x = w/2 + (b.id === 0 ? 0 : b.lane * 30 * (b.id % 2 === 0 ? 1 : -1));
                  
                  commits.push({
                      x: x,
                      y: h + 20,
                      color: b.color,
                      branchId: b.id,
                      parents: [{x: x, y: h + 20 + spacing}]
                  });
              }
          }
      }

      // Draw Lines (Connections)
      ctx.lineWidth = 2;
      commits.forEach(c => {
          c.y -= speed;
          c.parents.forEach(p => {
              p.y -= speed; // Update parent ref position purely for drawing logic visualization
              
              ctx.strokeStyle = c.color;
              ctx.beginPath();
              
              // Bezier curve for smooth branching
              ctx.moveTo(c.x, c.y);
              ctx.bezierCurveTo(c.x, c.y + 20, p.x, p.y - 20, p.x, p.y);
              
              ctx.stroke();
          });
      });

      // Draw Dots
      commits.forEach((c, i) => {
          if (c.y < -50) {
              commits.splice(i, 1);
              return;
          }
          ctx.fillStyle = "#1e1e1e"; // Cutout center
          ctx.beginPath(); ctx.arc(c.x, c.y, 6, 0, Math.PI*2); ctx.fill();
          
          ctx.fillStyle = c.color;
          ctx.beginPath(); ctx.arc(c.x, c.y, 4, 0, Math.PI*2); ctx.fill();
      });

      tick++;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}