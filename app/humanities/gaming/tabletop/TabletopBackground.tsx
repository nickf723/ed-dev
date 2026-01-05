"use client";
import { useEffect, useRef } from "react";

export default function TabletopBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Hexagon math
    const a = 2 * Math.PI / 6;
    const r = 40; // Radius

    const drawHex = (x: number, y: number, color: string, stroke: string) => {
        ctx.beginPath();
        for (var i = 0; i < 6; i++) {
            ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
        }
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = stroke;
        ctx.stroke();
    };

    class HexTile {
        x: number; y: number; type: number; opacity: number; targetOpacity: number;
        constructor(x: number, y: number) {
            this.x = x; this.y = y;
            this.type = Math.floor(Math.random() * 4); // 0: Void, 1: Forest, 2: Water, 3: Mountain
            this.opacity = 0;
            this.targetOpacity = Math.random() * 0.1;
        }
        update() {
            // Pulse opacity
            if (Math.random() > 0.99) {
                this.targetOpacity = Math.random() * 0.15;
            }
            this.opacity += (this.targetOpacity - this.opacity) * 0.02;
        }
        draw() {
            let color = "#000";
            if (this.type === 1) color = `rgba(22, 101, 52, ${this.opacity})`; // Green
            if (this.type === 2) color = `rgba(30, 64, 175, ${this.opacity})`; // Blue
            if (this.type === 3) color = `rgba(120, 53, 15, ${this.opacity})`; // Brown
            
            drawHex(this.x, this.y, color, `rgba(255,255,255,${this.opacity * 0.5})`);
        }
    }

    const grid: HexTile[] = [];
    
    // Create Hex Grid
    const init = () => {
        grid.length = 0;
        const cols = Math.ceil(w / (r * 3)); // Approximate cols
        const rows = Math.ceil(h / (r * Math.sqrt(3))); // Approximate rows
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // Offset every other row
                const x = col * r * 3 + (row % 2) * r * 1.5;
                const y = row * r * Math.sqrt(3) * 0.86; // Tweak vertical spacing
                grid.push(new HexTile(x, y));
            }
        }
    };

    const animate = () => {
      ctx.fillStyle = "#02040a"; // Darkest Blue/Black
      ctx.fillRect(0, 0, w, h);

      grid.forEach(t => {
          t.update();
          t.draw();
      });

      requestAnimationFrame(animate);
    };

    init();
    const animId = requestAnimationFrame(animate);
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
        init();
    };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}