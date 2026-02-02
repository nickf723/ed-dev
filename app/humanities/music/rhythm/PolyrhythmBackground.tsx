"use client";
import React, { useEffect, useRef } from 'react';

export default function PolyrhythmBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Configuration for "3 against 4"
    const rings = [
      { divisions: 4, radius: 100, speed: 0.01, color: '#2dd4bf' }, // Teal (4/4)
      { divisions: 3, radius: 180, speed: 0.0133, color: '#f43f5e' }, // Rose (3/4)
      { divisions: 5, radius: 260, speed: 0.008, color: '#818cf8' },  // Indigo (5/4)
    ];

    let frame = 0;

    const animate = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      rings.forEach((ring, i) => {
        // Draw Track
        ctx.beginPath();
        ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Calculate Angle (Clockwise)
        // We sync them so they all hit -PI/2 (Top) at frame 0
        const angle = -Math.PI / 2 + (frame * ring.speed);
        
        const x = centerX + Math.cos(angle) * ring.radius;
        const y = centerY + Math.sin(angle) * ring.radius;

        // Check for "Beat" (Crossing Top)
        // Normalize angle to 0-2PI
        const normalizedAngle = (angle + Math.PI/2) % (Math.PI * 2);
        const isBeat = normalizedAngle < 0.1; // Approximate "hit" window

        // Draw Orbiter
        ctx.beginPath();
        ctx.arc(x, y, isBeat ? 8 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isBeat ? '#fff' : ring.color;
        ctx.shadowBlur = isBeat ? 20 : 0;
        ctx.shadowColor = ring.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw Beat Markers on Ring (Subdivision)
        /* Visual embellishment: Draw static dots where the beats land */
      });

      // Draw Center Downbeat Pulse
      /* Sync logic for visual effect */

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