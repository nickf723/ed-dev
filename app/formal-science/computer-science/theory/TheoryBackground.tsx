"use client";
import React, { useEffect, useRef } from "react";

export function TheoryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // CONFIG
    const FONT_SIZE = 14;
    const ROW_HEIGHT = 24;
    const SYMBOLS = ["0", "1", "∅", "Γ", "Σ", "1", "0"]; // Turing alphabet mixed with binary
    
    // STATE
    const rows: { y: number, speed: number, offset: number, chars: string[] }[] = [];
    const numRows = Math.ceil(h / ROW_HEIGHT);
    const numCols = Math.ceil(w / (FONT_SIZE * 0.8)) + 5;

    // INITIALIZE ROWS (TAPES)
    function init() {
      rows.length = 0;
      for (let i = 0; i < numRows; i++) {
        const chars: string[] = [];
        for (let j = 0; j < numCols; j++) {
            chars.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
        }
        rows.push({
          y: i * ROW_HEIGHT,
          speed: (Math.random() - 0.5) * 2, // Left or Right drift
          offset: Math.random() * 100,
          chars
        });
      }
    }

    const animate = () => {
      // Clear with "phosphor fade" effect
      ctx.fillStyle = "rgba(10, 10, 15, 0.2)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.textBaseline = "middle";
      
      const centerX = w / 2;

      // DRAW THE "READ HEAD" (Vertical Scanner)
      ctx.fillStyle = "rgba(236, 72, 153, 0.1)"; // Pink glow
      ctx.fillRect(centerX - 10, 0, 20, h);
      ctx.strokeStyle = "rgba(236, 72, 153, 0.5)";
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, h);
      ctx.stroke();

      // DRAW TAPES
      rows.forEach((row, i) => {
        row.offset += row.speed;
        
        // Loop chars
        const charWidth = FONT_SIZE * 0.8;
        
        for (let j = 0; j < row.chars.length; j++) {
            // Calculate position with wrapping
            let x = (j * charWidth + row.offset) % (w + charWidth);
            if (x < -charWidth) x += w + charWidth;

            // CHECK INTERSECTION WITH READ HEAD
            const dist = Math.abs(x - centerX);
            const isReading = dist < 15;

            if (isReading) {
                // Active calculation state
                ctx.fillStyle = "#ec4899"; // Pink
                ctx.shadowBlur = 10;
                ctx.shadowColor = "#ec4899";
                
                // Randomly "Write" to tape (flip bit) occasionally
                if (Math.random() > 0.98) {
                    row.chars[j] = row.chars[j] === "0" ? "1" : "0";
                }
            } else {
                // Passive state
                ctx.fillStyle = "rgba(100, 116, 139, 0.3)"; // Slate Dim
                ctx.shadowBlur = 0;
            }

            ctx.fillText(row.chars[j], x, row.y + ROW_HEIGHT/2);
        }
      });

      requestAnimationFrame(animate);
    };

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("resize", resize);
    init();
    const frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 bg-[#0a0a0f]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0f_90%)]" />
    </div>
  );
}