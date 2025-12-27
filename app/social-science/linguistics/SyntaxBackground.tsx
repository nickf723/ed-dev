"use client";
import { useEffect, useRef } from "react";

export default function SyntaxBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    // Linguistics Palette (Lime / Yellow / Emerald)
    const colors = ["#84cc16", "#a3e635", "#facc15", "#10b981"];
    
    const trees: Tree[] = [];
    const maxTrees = 15;

    class Tree {
      x: number;
      y: number;
      branches: {x: number, y: number, parentX: number, parentY: number, life: number}[];
      color: string;
      active: boolean;
      age: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = h + 50; // Grow from bottom
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.active = true;
        this.age = 0;
        this.branches = [];
        
        // Trunk
        this.grow(this.x, this.y, -Math.PI / 2, 100, 0);
      }
      
      grow(x: number, y: number, angle: number, length: number, depth: number) {
          if (depth > 4) return; // Recursion limit
          
          const endX = x + Math.cos(angle) * length;
          const endY = y + Math.sin(angle) * length;
          
          this.branches.push({
              x: endX, y: endY, parentX: x, parentY: y, life: 0
          });

          // Split
          const splitAngle = 0.4 + Math.random() * 0.4;
          const lenMod = 0.7 + Math.random() * 0.1;
          
          // Branch Left
          this.grow(endX, endY, angle - splitAngle, length * lenMod, depth + 1);
          // Branch Right
          this.grow(endX, endY, angle + splitAngle, length * lenMod, depth + 1);
      }

      update() {
          this.age++;
          if (this.age > 300) { // Die after a while
              this.active = false;
          }
      }

      draw() {
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 1.5;
          
          this.branches.forEach((b, i) => {
              // Animate drawing "growth" based on index roughly
              const start = i * 5;
              if (this.age > start) {
                  // Fade in/out
                  let alpha = Math.min(1, (this.age - start) / 20);
                  if (this.age > 250) alpha *= (300 - this.age) / 50;
                  
                  ctx.globalAlpha = alpha * 0.4;
                  ctx.beginPath();
                  ctx.moveTo(b.parentX, b.parentY);
                  ctx.lineTo(b.x, b.y);
                  ctx.stroke();
                  
                  // Node dot
                  ctx.fillStyle = this.color;
                  ctx.beginPath();
                  ctx.arc(b.x, b.y, 2, 0, Math.PI*2);
                  ctx.fill();
              }
          });
          ctx.globalAlpha = 1;
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Spawn
      if (trees.length < maxTrees && Math.random() > 0.97) {
          trees.push(new Tree());
      }

      // Update & Draw
      for (let i = trees.length - 1; i >= 0; i--) {
          const t = trees[i];
          t.update();
          t.draw();
          if (!t.active) trees.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen" />
        <div className="hd-vignette" />
    </>
  );
}