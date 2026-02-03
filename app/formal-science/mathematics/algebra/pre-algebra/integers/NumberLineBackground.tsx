"use client";
import React, { useEffect, useRef } from 'react';

export default function NumberLineBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Particle {
      x: number; y: number;
      val: 1 | -1;
      speed: number;
      radius: number;
    }

    const particles: Particle[] = [];

    const spawn = () => {
        const val = Math.random() > 0.5 ? 1 : -1;
        particles.push({
            x: val === 1 ? -20 : width + 20, // Positives start left, Negatives start right (visual conflict)
            y: Math.random() * height,
            val,
            speed: (Math.random() * 2 + 1) * val, // Direction based on value
            radius: Math.random() * 4 + 2
        });
    };

    const animate = () => {
      ctx.fillStyle = '#0f172a'; // Slate-900
      ctx.fillRect(0, 0, width, height);

      // Draw Zero Line (Center)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.moveTo(width/2, 0);
      ctx.lineTo(width/2, height);
      ctx.stroke();

      if (Math.random() > 0.9) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speed;

        // Draw
        ctx.fillStyle = p.val === 1 ? '#2dd4bf' : '#f43f5e'; // Teal vs Rose
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Collision Logic (Zero Pairs)
        for (let j = particles.length - 1; j > i; j--) {
            const other = particles[j];
            if (p.val !== other.val) { // Opposites attract/destroy
                const dx = p.x - other.x;
                const dy = p.y - other.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < p.radius + other.radius) {
                    // Annihilation Visual
                    ctx.fillStyle = '#fff';
                    ctx.beginPath();
                    ctx.arc((p.x+other.x)/2, (p.y+other.y)/2, 10, 0, Math.PI*2);
                    ctx.fill();
                    
                    // Destroy both
                    particles.splice(j, 1);
                    particles.splice(i, 1);
                    break;
                }
            }
        }
        
        // Remove off screen
        if (p.x < -50 || p.x > width + 50) {
             // Only remove if it traveled across screen
        }
      }

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