"use client";
import React, { useEffect, useRef } from 'react';

export default function ScaleStreamBackground() {
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
    const lanes = 12; // 12 semitones
    const laneHeight = height / lanes;
    
    interface Note {
      x: number;
      lane: number;
      speed: number;
      color: string;
      trail: {x: number, y: number}[];
    }

    const notes: Note[] = [];

    // Scale Patterns (Intervals from root)
    const majorScale = [0, 2, 4, 5, 7, 9, 11]; // W W H W W W H
    
    // Spawn notes that stick to the scale
    const spawnNote = () => {
       const scaleDegree = majorScale[Math.floor(Math.random() * majorScale.length)];
       // Random octave offset
       const lane = 11 - (scaleDegree + (Math.random() > 0.5 ? 0 : 0)); 
       
       notes.push({
         x: -50,
         lane: Math.max(0, Math.min(11, lane)),
         speed: 2 + Math.random() * 2,
         color: Math.random() > 0.5 ? '#2dd4bf' : '#f43f5e', // Teal or Rose
         trail: []
       });
    };

    const animate = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      // Draw Staff Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for(let i=0; i<=lanes; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * laneHeight);
        ctx.lineTo(width, i * laneHeight);
        ctx.stroke();
      }

      if (frame % 20 === 0) spawnNote();

      notes.forEach((n, i) => {
        n.x += n.speed;
        const y = n.lane * laneHeight + laneHeight/2;

        // Record trail
        if (frame % 5 === 0) {
            n.trail.push({x: n.x, y});
            if (n.trail.length > 20) n.trail.shift();
        }

        // Draw Trail
        if (n.trail.length > 1) {
            ctx.beginPath();
            ctx.strokeStyle = n.color;
            ctx.lineWidth = 2;
            ctx.moveTo(n.trail[0].x, n.trail[0].y);
            for(let j=1; j<n.trail.length; j++) {
                ctx.lineTo(n.trail[j].x, n.trail[j].y);
            }
            ctx.stroke();
        }

        // Draw Note Head
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Remove offscreen
        if (n.x > width) notes.splice(i, 1);
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