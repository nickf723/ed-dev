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

// CONFIG MUST MATCH PIANO KEYBOARD EXACTLY
const START_OCTAVE = 3;
const OCTAVE_COUNT = 3;
const WHITE_KEY_WIDTH = 40; // Pixels (Matches PianoKeyboard.tsx)
const TOTAL_WIDTH = (OCTAVE_COUNT * 7) * WHITE_KEY_WIDTH; // 7 white keys per octave

// Offset from left edge of white key to center of black key (in pixels)
// C=0, C#=26, D=40, D#=66, E=80, F=120...
const KEY_OFFSETS = {
    "C": 20, "C#": 26, 
    "D": 60, "D#": 66, 
    "E": 100, 
    "F": 140, "F#": 146, 
    "G": 180, "G#": 186, 
    "A": 220, "A#": 226, 
    "B": 260
};

export default function ParticleVisualizer({ activeKeys }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const requestRef = useRef<number>(0);

  const getNoteX = (noteFull: string) => {
      const note = noteFull.slice(0, -1);
      const oct = parseInt(noteFull.slice(-1));
      
      const octaveOffset = (oct - START_OCTAVE) * (7 * WHITE_KEY_WIDTH);
      const keyCenter = KEY_OFFSETS[note as keyof typeof KEY_OFFSETS] || 0;
      
      return octaveOffset + keyCenter;
  };

  const getNoteColor = (note: string) => {
    const noteName = note.slice(0, -1);
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const hue = (notes.indexOf(noteName) / 12) * 360; 
    return `hsla(${hue}, 80%, 60%,`; 
  };

  useEffect(() => {
    if (!canvasRef.current || activeKeys.length === 0) return;
    const canvas = canvasRef.current;
    
    activeKeys.forEach(key => {
        if (particles.current.length > 300) return;

        const xPos = getNoteX(key);

        // Bounds check
        if (xPos < 0 || xPos > TOTAL_WIDTH) return;

        const colorPrefix = getNoteColor(key);
        
        for (let i = 0; i < 8; i++) {
            particles.current.push({
                x: xPos,
                y: canvas.height - 20,
                vx: (Math.random() - 0.5) * 8, 
                vy: -(Math.random() * 8 + 5),   
                life: 1.0,
                color: colorPrefix,
                size: Math.random() * 4 + 2
            });
        }
    });

  }, [activeKeys]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // HARD LOCK SIZE to match Piano
    canvas.width = TOTAL_WIDTH;
    canvas.height = 400; // Fixed height

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.current.length - 1; i >= 0; i--) {
            const p = particles.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2; 
            p.life -= 0.02;

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

    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Center the canvas inside the container, matching the PianoKeyboard centering
  return (
      <div className="w-full h-full flex justify-center overflow-hidden">
        <canvas 
            ref={canvasRef} 
            className="block"
            style={{ width: `${TOTAL_WIDTH}px`, height: '100%', opacity: 0.8 }}
        />
      </div>
  );
}