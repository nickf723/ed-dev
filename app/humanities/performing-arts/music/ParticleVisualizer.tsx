"use client";
import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

interface VisualizerProps {
  activeKeys: string[];
}

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function ParticleVisualizer({ activeKeys }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const requestRef = useRef<number>(0);

  // Helper: Get color based on note
  const getNoteColor = (note: string) => {
    const noteName = note.slice(0, -1); // "C#4" -> "C#"
    const idx = NOTES.indexOf(noteName);
    // Cycle through a vibrant palette
    const hue = (idx / 12) * 360; 
    return `hsla(${hue}, 80%, 60%,`; 
  };

  // 1. SPAWN PARTICLES ON KEY PRESS
  useEffect(() => {
    if (!canvasRef.current || activeKeys.length === 0) return;
    
    const canvas = canvasRef.current;
    
    activeKeys.forEach(key => {
        // Only spawn if we don't have too many already (performance)
        if (particles.current.length > 300) return;

        const colorPrefix = getNoteColor(key);
        
        // Spawn a burst
        for (let i = 0; i < 8; i++) {
            particles.current.push({
                x: canvas.width / 2,
                y: canvas.height - 20, // Start at bottom center
                vx: (Math.random() - 0.5) * 10,
                vy: -(Math.random() * 5 + 5), // Shoot up
                life: 1.0,
                color: colorPrefix,
                size: Math.random() * 4 + 2
            });
        }
    });

  }, [activeKeys]);

  // 2. ANIMATION LOOP
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle Resize Safely
    const resize = () => {
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }
    };
    window.addEventListener('resize', resize);
    resize(); // Init size

    const animate = () => {
        // Fade out trail
        ctx.fillStyle = 'rgba(18, 18, 18, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update Particles
        for (let i = particles.current.length - 1; i >= 0; i--) {
            const p = particles.current[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2; // Gravity
            p.life -= 0.02; // Decay

            if (p.life <= 0) {
                particles.current.splice(i, 1);
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                ctx.fillStyle = `${p.color} ${p.life})`;
                ctx.fill();
            }
        }

        requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
        style={{ opacity: 0.8 }}
    />
  );
}