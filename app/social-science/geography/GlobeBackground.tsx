"use client";
import React, { useEffect, useRef } from 'react';

export default function GlobeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Urban Data Points (Lat/Long projected to 3D Sphere)
    const urbanCenters = Array.from({ length: 400 }, () => ({
      phi: Math.random() * Math.PI * 2,
      theta: Math.random() * Math.PI,
      pulse: Math.random() * Math.PI
    }));

    const animate = (time: number) => {
      ctx.fillStyle = '#020617'; // Dark Slate
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.35;
      const rotation = time * 0.0002;

      // Draw Atmospheric Glow
      const grad = ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius * 1.5);
      grad.addColorStop(0, 'rgba(14, 165, 233, 0.05)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render Sphere Projection
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.stroke();

      urbanCenters.forEach(point => {
        // Rotate points
        const phi = point.phi + rotation;
        const theta = point.theta;

        // 3D to 2D Projection
        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.cos(theta);
        const z = radius * Math.sin(theta) * Math.sin(phi);

        // Only draw points on the front hemisphere
        if (z > 0) {
          const screenX = centerX + x;
          const screenY = centerY + y;
          const scale = z / radius;
          
          const pulse = (Math.sin(time * 0.002 + point.pulse) + 1) / 2;
          ctx.beginPath();
          ctx.arc(screenX, screenY, 2 * scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${0.2 + pulse * 0.5})`; // Sky-400
          ctx.fill();
          
          // Data Link Lines
          ctx.beginPath();
          ctx.moveTo(screenX, screenY);
          ctx.lineTo(centerX, centerY);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.05 * scale})`;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}