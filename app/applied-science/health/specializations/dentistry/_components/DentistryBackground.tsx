"use client";
import React, { useRef, useEffect } from 'react';

export default function DentistryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let time = 0;

    const hexRadius = 25;
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexHeight = 2 * hexRadius;
    const cols = Math.ceil(width / hexWidth) + 1;
    const rows = Math.ceil(height / (hexHeight * 0.75)) + 1;

    const drawHexagon = (x: number, y: number, radius: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
      }
      ctx.closePath();
    };

    const draw = () => {
      ctx.fillStyle = '#010a0a'; // Deepest mint-black
      ctx.fillRect(0, 0, width, height);

      // Shimmering Enamel Rods
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexWidth + (row % 2 ? hexWidth / 2 : 0);
          const y = row * hexHeight * 0.75;

          // Create a flowing wave of "mineralization" 
          const wave = Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 - time * 0.5);
          
          if (wave > 0.5) {
              const intensity = (wave - 0.5) * 2; // 0 to 1
              drawHexagon(x, y, hexRadius - 2);
              
              // Very clean, sterile teal/white glow
              ctx.fillStyle = `rgba(20, 184, 166, ${intensity * 0.05})`; // Teal-500
              ctx.fill();
              ctx.strokeStyle = `rgba(204, 253, 246, ${intensity * 0.2})`; // Light mint
              ctx.lineWidth = 1;
              ctx.stroke();
          }
        }
      }

      // Floating calcium/phosphate ions
      for(let i=0; i<10; i++) {
          const px = (Math.sin(time * 0.5 + i) * width/2) + width/2;
          const py = (Math.cos(time * 0.3 - i) * height/2) + height/2;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI*2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(time + i)*0.5 + 0.5})`;
          ctx.fill();
      }

      time += 0.02;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}