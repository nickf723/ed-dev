"use client";
import React, { useEffect, useRef } from 'react';

export default function GaltonBoardBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Board Config
    const rows = 14; 
    const pegSpacing = 40;
    const startX = width / 2;
    const startY = 60;
    
    // Bin Config
    const binCount = rows + 1;
    const bins: number[] = new Array(binCount).fill(0); 

    // Physics Config
    const gravity = 0.2;
    const friction = 0.99;
    const pegRadius = 3;
    const ballRadius = 4;
    
    interface Ball {
      x: number; y: number;
      vx: number; vy: number;
      settled: boolean;
      lastPegRow: number; // To prevent double hits on same peg
    }

    const balls: Ball[] = [];
    
    // Pegs Array (stored with row index)
    const pegs: {x: number, y: number, row: number}[] = [];

    // Initialize Pegs (Pyramid)
    for(let r = 0; r < rows; r++) {
      for(let c = 0; c <= r; c++) {
        // Offset X so row is centered
        const x = startX + (c * pegSpacing) - (r * pegSpacing / 2);
        const y = startY + r * 35;
        pegs.push({x, y, row: r});
      }
    }

    const animate = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      // Draw Pegs
      ctx.fillStyle = 'rgba(99, 102, 241, 0.2)'; // Indigo
      pegs.forEach(peg => {
        ctx.beginPath();
        ctx.arc(peg.x, peg.y, pegRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn Ball (Top Center)
      if (Math.random() > 0.6) {
         balls.push({ 
           x: startX + (Math.random() - 0.5), // Tiny jitter
           y: startY - 20, 
           vx: 0, 
           vy: 0, 
           settled: false,
           lastPegRow: -1
         });
      }

      // Update Balls
      balls.forEach((b, i) => {
        if (b.settled) return;

        b.vy += gravity;
        b.vx *= friction;
        b.x += b.vx;
        b.y += b.vy;

        // Peg Collision (The Logic)
        for (const p of pegs) {
          // Optimization: Only check pegs close by y-level
          if (Math.abs(b.y - p.y) > 10) continue;

          const dx = b.x - p.x;
          const dy = b.y - p.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          // Collision!
          if (dist < pegRadius + ballRadius) {
            // Only interact if we haven't hit this row yet (prevents getting stuck)
            if (b.lastPegRow !== p.row) {
                b.lastPegRow = p.row;
                
                // FORCE THE 50/50 DECISION
                // Instead of physical bounce, we apply a hard impulse left or right
                const direction = Math.random() > 0.5 ? 1 : -1;
                
                // Add horizontal velocity
                b.vx = direction * 1.5 + (Math.random() - 0.5) * 0.5; // + random noise
                
                // Reset vertical velocity (dampen the fall so it hits next row)
                b.vy = -1.5; 
                
                // Snap position out of peg to prevent clipping
                b.y = p.y - (pegRadius + ballRadius) - 1;
            }
          }
        }

        // Settling Logic (Bottom)
        const floorY = startY + rows * 35 + 50;
        if (b.y > floorY) {
            b.settled = true;
            // Calculate Bin
            const relativeX = b.x - (startX - (rows * pegSpacing / 2));
            const binIdx = Math.floor((relativeX + pegSpacing/2) / pegSpacing);
            
            if (binIdx >= 0 && binIdx < binCount) {
                bins[binIdx]++;
            }
            balls.splice(i, 1);
        }

        // Draw Ball
        ctx.fillStyle = '#818cf8';
        ctx.beginPath();
        ctx.arc(b.x, b.y, ballRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Histogram Bins
      const binWidth = pegSpacing - 4;
      const startBinX = startX - (rows * pegSpacing / 2);
      const floorY = startY + rows * 35 + 50;

      bins.forEach((count, i) => {
          const h = Math.min(count * 2, 200); 
          const x = startBinX + i * pegSpacing;
          const y = floorY;

          const gradient = ctx.createLinearGradient(x, y, x, y + h);
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)');
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(x - binWidth/2, y, binWidth, h);
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}