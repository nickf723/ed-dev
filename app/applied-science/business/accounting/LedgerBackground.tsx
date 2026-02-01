"use client";
import React, { useEffect, useRef } from 'react';

export default function LedgerBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    // Configuration
    const columns = Math.floor(width / 100);
    const drops: number[] = Array(columns).fill(1); // Y positions for matrix rain effect
    
    const animate = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'; // Deep fade for trail
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#059669'; // Emerald-600
      ctx.font = '10px monospace';

      for (let i = 0; i < drops.length; i++) {
        // Random "Transaction Value"
        const text = (Math.random() * 1000).toFixed(2);
        
        // Draw text
        const x = i * 100;
        const y = drops[i] * 14; // Line height

        // Highlight random entries
        if (Math.random() > 0.98) {
            ctx.fillStyle = '#34d399'; // Bright Emerald
            ctx.fillText(text, x, y);
            ctx.fillStyle = '#059669'; // Reset
        } else {
            ctx.fillText(text, x, y);
        }

        // Reset drop to top randomly
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Draw Static Grid Lines (The "Ledger")
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 100) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }

      frame++;
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