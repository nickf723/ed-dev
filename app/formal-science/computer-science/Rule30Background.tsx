"use client";
import { useEffect, useRef } from "react";

export default function Rule30Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const cellSize = 4; // Size of each "bit"
    const cols = Math.ceil(w / cellSize);
    const rows = Math.ceil(h / cellSize);
    
    // Current row state (0 or 1)
    let currentRow = new Array(cols).fill(0);
    currentRow[Math.floor(cols / 2)] = 1; // Start with single seed in middle

    let currentRowIndex = 0;
    
    // The Rule 30 Map: [left, center, right] -> new_center
    // 111->0, 110->0, 101->0, 100->1, 011->1, 010->1, 001->1, 000->0
    const calculateState = (l: number, c: number, r: number) => {
        if (l===1 && c===1 && r===1) return 0;
        if (l===1 && c===1 && r===0) return 0;
        if (l===1 && c===0 && r===1) return 0;
        if (l===1 && c===0 && r===0) return 1;
        if (l===0 && c===1 && r===1) return 1;
        if (l===0 && c===1 && r===0) return 1;
        if (l===0 && c===0 && r===1) return 1;
        if (l===0 && c===0 && r===0) return 0;
        return 0;
    };

    const drawRow = (row: number[], yIndex: number) => {
        row.forEach((cell, xIndex) => {
            if (cell === 1) {
                // Cyber Green
                ctx.fillStyle = "rgba(34, 197, 94, 0.15)"; 
                ctx.fillRect(xIndex * cellSize, yIndex * cellSize, cellSize, cellSize);
            }
        });
    };

    const animate = () => {
        // Instead of clearing, we just draw the next row
        // But if we reach bottom, we might want to reset or scroll.
        // For simplicity/performance, let's just fill once and stop, 
        // or scroll up. Scrolling up is expensive in canvas.
        // Let's just redraw the whole frame each time with an offset for "scroll" effect
        
        // ACTUALLY: Generating per frame is fast enough for this resolution.
        // Let's generate a grid buffer.
    };
    
    // Better approach for background: 
    // Pre-calculate a grid large enough, then render it.
    // Or just render row by row until full?
    
    // Let's do a static render that regenerates on resize for performance.
    // Rule 30 is static for a given seed anyway.
    
    const renderStatic = () => {
        ctx.clearRect(0, 0, w, h);
        
        let state = new Array(cols).fill(0);
        state[Math.floor(cols / 2)] = 1;

        for (let y = 0; y < rows; y++) {
            drawRow(state, y);
            
            const nextState = new Array(cols).fill(0);
            for (let x = 0; x < cols; x++) {
                const l = state[(x - 1 + cols) % cols];
                const c = state[x];
                const r = state[(x + 1 + cols) % cols];
                nextState[x] = calculateState(l, c, r);
            }
            state = nextState;
        }
    };

    renderStatic();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      renderStatic();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />
        <div className="hd-vignette" />
        {/* Digital noise overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]" 
             style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')", backgroundSize: "4px 4px" }} 
        />
    </>
  );
}