"use client";
import { useEffect, useRef } from "react";

export default function LogicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    // Logic Symbols
    const symbols = ["∀", "∃", "∄", "∴", "∵", "⇒", "⇔", "∧", "∨", "¬", "⊕", "⊤", "⊥"];
    
    const streams: Stream[] = [];
    const streamCount = 40;
    
    // Logic Palette (Cyan/Blue/Slate)
    const colors = ["#22d3ee", "#38bdf8", "#94a3b8"]; 

    class Stream {
      x: number;
      y: number;
      speed: number;
      symbols: { char: string; opacity: number }[];
      color: string;
      fontSize: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.speed = Math.random() * 1 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.fontSize = Math.random() * 14 + 10;
        this.symbols = [];
        
        const length = Math.floor(Math.random() * 10 + 5);
        for(let i=0; i<length; i++) {
            this.symbols.push({
                char: symbols[Math.floor(Math.random() * symbols.length)],
                opacity: (1 - i/length) // Fade tail
            });
        }
      }

      update() {
        this.x += this.speed;
        
        // Reset if off screen
        if (this.x > w + 100) {
            this.x = -100;
            this.y = Math.random() * h;
        }
        
        // Randomly flip a symbol (Truth value change)
        if(Math.random() > 0.95) {
             const idx = Math.floor(Math.random() * this.symbols.length);
             this.symbols[idx].char = symbols[Math.floor(Math.random() * symbols.length)];
        }
      }

      draw() {
        if (!ctx) return;
        ctx.font = `${this.fontSize}px "Geist Mono", monospace`;
        ctx.textBaseline = "middle";
        
        this.symbols.forEach((s, i) => {
            const posX = this.x - (i * this.fontSize * 1.2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = s.opacity * 0.5;
            ctx.fillText(s.char, posX, this.y);
        });
        ctx.globalAlpha = 1;
      }
    }

    for(let i=0; i<streamCount; i++) streams.push(new Stream());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      streams.forEach(s => {
        s.update();
        s.draw();
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
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30" />
        <div className="hd-vignette" />
        {/* Subtle grid overlay for structure */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
             style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
        />
    </>
  );
}