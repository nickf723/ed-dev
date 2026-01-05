"use client";
import { useEffect, useRef } from "react";

export default function TcgBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // Strict null check for canvas
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    // Strict null check for context
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    class Card {
        x: number; y: number; z: number;
        rotX: number; rotY: number; rotZ: number;
        dRotX: number; dRotY: number; dRotZ: number;
        vy: number;
        width: number; height: number;
        isFoil: boolean;

        constructor() {
            this.x = Math.random() * w;
            this.y = h + 100 + Math.random() * h;
            this.z = Math.random() * 2 + 0.5;
            this.width = 40 * this.z;
            this.height = 56 * this.z;
            
            this.rotX = Math.random() * Math.PI * 2;
            this.rotY = Math.random() * Math.PI * 2;
            this.rotZ = Math.random() * Math.PI * 2;
            
            this.dRotX = (Math.random() - 0.5) * 0.02;
            this.dRotY = (Math.random() - 0.5) * 0.02;
            this.dRotZ = (Math.random() - 0.5) * 0.01;
            
            this.vy = -0.5 - Math.random() * 0.5;
            this.isFoil = Math.random() > 0.8;
        }

        update() {
            this.y += this.vy;
            this.rotX += this.dRotX;
            this.rotY += this.dRotY;
            this.rotZ += this.dRotZ;

            if (this.y < -100) {
                this.y = h + 100;
                this.x = Math.random() * w;
            }
        }

        draw(time: number, context: CanvasRenderingContext2D) {
            context.save();
            context.translate(this.x, this.y);
            context.scale(Math.cos(this.rotY), Math.cos(this.rotX));
            context.rotate(this.rotZ);

            // Card Back
            context.fillStyle = "#1e1b4b"; 
            context.fillRect(-this.width/2, -this.height/2, this.width, this.height);
            
            // Border
            context.lineWidth = 2 * this.z;
            context.strokeStyle = "#4c1d95";
            context.strokeRect(-this.width/2, -this.height/2, this.width, this.height);

            // Foil Effect
            if (this.isFoil) {
                const grad = context.createLinearGradient(
                    -this.width, -this.height, this.width, this.height
                );
                const offset = (time * 0.002) % 1;
                grad.addColorStop(Math.max(0, offset - 0.2), "transparent");
                grad.addColorStop(offset, "rgba(255, 255, 255, 0.4)");
                grad.addColorStop(Math.min(1, offset + 0.2), "transparent");
                
                context.fillStyle = grad;
                context.fillRect(-this.width/2, -this.height/2, this.width, this.height);
            }

            // Design
            context.beginPath();
            context.arc(0, 0, this.width * 0.3, 0, Math.PI*2);
            context.strokeStyle = "rgba(255,255,255,0.1)";
            context.stroke();

            context.restore();
        }
    }

    const cards = Array.from({ length: 30 }, () => new Card());
    let time = 0;

    const animate = () => {
      // Re-check ctx inside the loop just to be safe for TS, though closure usually handles it
      if (!ctx) return;

      ctx.fillStyle = "#0f0720"; 
      ctx.fillRect(0, 0, w, h);
      time++;

      cards.forEach(c => {
          c.update();
          c.draw(time, ctx);
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { 
        if (!canvas) return;
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
    };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}