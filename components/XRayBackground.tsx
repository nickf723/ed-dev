"use client";
import { useEffect, useRef } from "react";

export default function XRayBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const bones: BoneShape[] = [];
    const count = 15;

    class BoneShape {
      x: number;
      y: number;
      width: number;
      height: number;
      angle: number;
      vAngle: number;
      vy: number;
      type: "femur" | "rib" | "vertebra";
      opacity: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.angle = Math.random() * Math.PI * 2;
        this.vAngle = (Math.random() - 0.5) * 0.01;
        this.vy = (Math.random() * 0.5 + 0.2) * -1; // Float up
        this.opacity = Math.random() * 0.15 + 0.05;
        this.type = Math.random() > 0.6 ? "femur" : Math.random() > 0.5 ? "rib" : "vertebra";
        this.width = Math.random() * 20 + 10;
        this.height = Math.random() * 100 + 50;
      }

      update() {
        this.y += this.vy;
        this.angle += this.vAngle;
        if (this.y < -150) {
            this.y = h + 150;
            this.x = Math.random() * w;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        ctx.fillStyle = "rgba(200, 220, 255, 1)"; // Bone white/blue
        ctx.globalAlpha = this.opacity;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(200, 220, 255, 0.5)";
        
        ctx.beginPath();
        if (this.type === "femur") {
            // Long bone shape
            ctx.roundRect(-10, -this.height/2, 20, this.height, 10);
            // Ends (Epiphysis)
            ctx.arc(0, -this.height/2, 20, 0, Math.PI*2);
            ctx.arc(0, this.height/2, 22, 0, Math.PI*2);
        } else if (this.type === "rib") {
            // Curved rib
            ctx.ellipse(0, 0, 60, 40, 0, Math.PI, Math.PI*2);
            ctx.lineWidth = 15;
            ctx.strokeStyle = "rgba(200, 220, 255, 1)";
            ctx.stroke();
        } else {
            // Vertebra (boxy)
            ctx.rect(-20, -20, 40, 40);
            // Processes
            ctx.rect(-30, -10, 60, 20);
            ctx.rect(-10, -30, 20, 60);
        }
        ctx.fill();
        
        ctx.restore();
      }
    }

    for(let i=0; i<count; i++) bones.push(new BoneShape());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      // Dark Blue/Black X-Ray background
      ctx.fillStyle = "#050a14"; 
      ctx.fillRect(0, 0, w, h);

      bones.forEach(b => {
        b.update();
        b.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();
    
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
        <div className="hd-vignette" />
        <div className="hd-scanlines opacity-10" />
        {/* Invert filter for a "Negative" X-Ray look option? No, positive is cooler. */}
    </>
  );
}