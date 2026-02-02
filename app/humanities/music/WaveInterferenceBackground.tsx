"use client";
import React, { useEffect, useRef } from 'react';

export default function WaveInterferenceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    const waves = [
      { freq: 0.01, amp: 50, speed: 0.02, color: 'rgba(251, 191, 36, 0.2)' }, // Base tone
      { freq: 0.015, amp: 40, speed: 0.03, color: 'rgba(251, 191, 36, 0.2)' }, // Fifth (3:2 ratio approx)
      { freq: 0.02, amp: 30, speed: 0.04, color: 'rgba(251, 191, 36, 0.2)' }  // Octave (2:1 ratio)
    ];

    const animate = () => {
      ctx.fillStyle = '#020617'; // Slate-950
      ctx.fillRect(0, 0, width, height);

      const centerY = height / 2;

      // Draw individual harmonic components
      waves.forEach(w => {
        ctx.beginPath();
        ctx.strokeStyle = w.color;
        ctx.lineWidth = 1;
        for(let x=0; x<width; x++) {
          const y = centerY + Math.sin(x * w.freq + frame * w.speed) * w.amp;
          if (x===0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Draw the "Sum" Wave (The Resulting Sound)
      ctx.beginPath();
      ctx.strokeStyle = '#fbbf24'; // Amber-400
      ctx.lineWidth = 2;
      for(let x=0; x<width; x++) {
        let y = centerY;
        // Sum the waves
        waves.forEach(w => {
            y += Math.sin(x * w.freq + frame * w.speed) * w.amp;
        });
        
        if (x===0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw "Nodes" where amplitude is zero (Silence points)
      ctx.fillStyle = '#fff';
      /* Visual embellishment: simplified logic to finding zero crossings could go here */

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