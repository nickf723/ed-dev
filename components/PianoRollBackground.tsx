"use client";
import { useEffect, useRef } from "react";

export default function PianoRollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const keyWidth = w / 12; // 12 semitones approx width scaling
    const notes: Note[] = [];
    
    // Harmonic Palette (Rose, Amber, Violet, Teal)
    const colors = ["#fb7185", "#fbbf24", "#a78bfa", "#2dd4bf"];

    class Note {
      x: number;
      y: number;
      width: number;
      length: number;
      speed: number;
      color: string;
      opacity: number;

      constructor() {
        // Snap to "lanes"
        const lane = Math.floor(Math.random() * 20); // 20 lanes
        this.width = Math.random() * 20 + 10;
        this.x = (w / 20) * lane + (w/40); 
        this.y = -200 - Math.random() * 500; // Start above screen
        this.length = Math.random() * 100 + 20;
        this.speed = Math.random() * 0.5 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.y += this.speed;
        // Reset if off screen
        if (this.y > h) {
            this.y = -200 - Math.random() * 200;
            const lane = Math.floor(Math.random() * 20);
            this.x = (w / 20) * lane + (w/40);
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.length, 4);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Init notes
    for(let i=0; i<40; i++) notes.push(new Note());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Draw "Lanes" (subtle background grid)
      ctx.strokeStyle = "rgba(255,255,255,0.02)";
      ctx.lineWidth = 1;
      for(let i=0; i<20; i++) {
          const x = (w/20) * i;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
      }

      notes.forEach(n => {
        n.update();
        n.draw();
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />
        <div className="hd-vignette" />
        <div className="hd-scanlines opacity-10" />
    </>
  );
}