"use client";
import { useEffect, useRef } from "react";

export default function HexMapBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // Hexagon Math
    const a = 2 * Math.PI / 6;
    const r = 30; // Radius
    const dy = r * Math.sin(a); // Vertical offset per row
    
    // State for "territory control" simulation
    const grid: {x: number, y: number, color: string, phase: number}[] = [];
    
    // Poli Sci Palette (Red/Blue/Purple/Grey)
    const palette = ["#1e1b4b", "#312e81", "#4c1d95", "#171717"]; 

    const initGrid = () => {
        grid.length = 0;
        let row = 0;
        for (let y = -r; y < h + r; y += r * 1.5) {
            let col = 0;
            for (let x = -r; x < w + r; x += r * Math.sqrt(3)) {
                const xOffset = (row % 2) * (r * Math.sqrt(3) / 2);
                const baseColor = palette[Math.floor(Math.random() * palette.length)];
                grid.push({
                    x: x + xOffset,
                    y: y,
                    color: baseColor,
                    phase: Math.random() * Math.PI * 2
                });
                col++;
            }
            row++;
        }
    };

    const drawHex = (x: number, y: number, color: string, opacity: number) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
        }
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.stroke();
    };

    const animate = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, w, h);

        grid.forEach(hex => {
            // Pulse opacity to simulate shifting influence
            const opacity = 0.2 + Math.sin(time + hex.phase) * 0.1;
            drawHex(hex.x, hex.y, hex.color, opacity);
        });

        time += 0.01;
        requestAnimationFrame(animate);
    };

    initGrid();
    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        initGrid();
    };

    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />
        <div className="hd-vignette" />
    </>
  );
}