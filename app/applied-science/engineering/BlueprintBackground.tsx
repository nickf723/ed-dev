"use client";
import React, { useEffect, useRef } from 'react';

export default function BlueprintBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    // Grid Configuration
    const spacing = 80;
    const points: { x: number; y: number; originX: number; originY: number; stress: number }[] = [];

    // Initialize Grid Points
    for (let x = 0; x < width + spacing; x += spacing) {
      for (let y = 0; y < height + spacing; y += spacing) {
        // Hexagonal offset for truss look
        const offsetX = (Math.floor(y / spacing) % 2) * (spacing / 2);
        points.push({
          x: x + offsetX,
          y: y,
          originX: x + offsetX,
          originY: y,
          stress: 0 // 0 to 1
        });
      }
    }

    const animate = () => {
      ctx.fillStyle = '#0f172a'; // Slate-900
      ctx.fillRect(0, 0, width, height);

      // Mouse/Wave interaction simulation
      const time = frame * 0.02;
      
      points.forEach(p => {
        // Simulate subtle structural vibration
        const noise = Math.sin(p.originX * 0.01 + time) * Math.cos(p.originY * 0.01 + time);
        p.x = p.originX + noise * 5;
        p.y = p.originY + noise * 5;
        
        // Stress waves traveling diagonally
        const wave = Math.sin((p.x + p.y) * 0.005 - frame * 0.05);
        p.stress = wave > 0.8 ? (wave - 0.8) * 5 : 0; // Peak stress only
      });

      // Draw Trusses
      ctx.lineWidth = 1;
      
      points.forEach((p, i) => {
        // Connect to neighbors to form triangles
        // Simplified neighbor finding based on grid index would be faster, 
        // but distance check creates "organic" failure modes visually.
        points.forEach((p2, j) => {
          if (i === j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = dx*dx + dy*dy;

          if (dist < spacing * spacing * 1.5) { // Connect neighbors
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Color based on stress
            // Base: Faint Violet. Stress: Bright Cyan/White
            const stressLevel = Math.max(p.stress, p2.stress);
            if (stressLevel > 0.1) {
                ctx.strokeStyle = `rgba(56, 189, 248, ${stressLevel * 0.5})`; // Sky-400
            } else {
                ctx.strokeStyle = 'rgba(139, 92, 246, 0.05)'; // Violet base
            }
            ctx.stroke();
          }
        });

        // Draw Nodes (Joints)
        if (p.stress > 0.1) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#38bdf8';
            ctx.fill();
        }
      });

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