"use client";
import React, { useEffect, useRef } from 'react';

export default function CircuitBoardBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Configuration
    const gridSize = 30; // Distance between grid points
    const traceCount = 40;
    const pulseCount = 15;
    
    // Arrays to hold static paths and active pulses
    const traces: { points: {x: number, y: number}[] }[] = [];
    const pulses: { traceIndex: number, progress: number, speed: number }[] = [];

    // 1. Generate Random Circuit Traces (Manhattan Geometry)
    const initTraces = () => {
      traces.length = 0;
      for (let i = 0; i < traceCount; i++) {
        let x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
        let y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
        const points = [{x, y}];
        
        // Walk random path
        const steps = Math.floor(Math.random() * 5) + 3;
        for (let j = 0; j < steps; j++) {
          const dir = Math.floor(Math.random() * 4); // 0: Up, 1: Right, 2: Down, 3: Left
          const len = (Math.floor(Math.random() * 3) + 1) * gridSize;
          
          if (dir === 0) y -= len;
          if (dir === 1) x += len;
          if (dir === 2) y += len;
          if (dir === 3) x -= len;
          
          points.push({x, y});
        }
        traces.push({ points });
      }
    };

    // 2. Initialize Pulses
    const initPulses = () => {
      pulses.length = 0;
      for (let i = 0; i < pulseCount; i++) {
        pulses.push({
          traceIndex: Math.floor(Math.random() * traces.length),
          progress: Math.random(), // Start somewhere along the line
          speed: Math.random() * 0.005 + 0.002
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = '#0a0a0a'; // Almost black
      ctx.fillRect(0, 0, width, height);

      // Draw Static Traces (Dim)
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      traces.forEach(trace => {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.05)'; // Faint Yellow
        ctx.moveTo(trace.points[0].x, trace.points[0].y);
        for (let i = 1; i < trace.points.length; i++) {
          ctx.lineTo(trace.points[i].x, trace.points[i].y);
        }
        ctx.stroke();

        // Draw Terminal Pads (Circles)
        ctx.fillStyle = 'rgba(234, 179, 8, 0.1)';
        ctx.beginPath();
        ctx.arc(trace.points[0].x, trace.points[0].y, 3, 0, Math.PI * 2);
        ctx.arc(trace.points[trace.points.length-1].x, trace.points[trace.points.length-1].y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Pulses (Bright)
      pulses.forEach(p => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.traceIndex = Math.floor(Math.random() * traces.length); // Hop to new wire
        }

        // Calculate Position along the multi-segment path
        const trace = traces[p.traceIndex];
        const totalPoints = trace.points.length;
        const indexFloat = p.progress * (totalPoints - 1);
        const currentIndex = Math.floor(indexFloat);
        const nextIndex = Math.min(currentIndex + 1, totalPoints - 1);
        const subProgress = indexFloat - currentIndex;

        const p1 = trace.points[currentIndex];
        const p2 = trace.points[nextIndex];

        const curX = p1.x + (p2.x - p1.x) * subProgress;
        const curY = p1.y + (p2.y - p1.y) * subProgress;

        // Draw Electron Head
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#fbbf24'; // Amber-400
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(curX, curY, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    initTraces();
    initPulses();
    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initTraces();
    };
    window.addEventListener('resize', handleResize);
    animate();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}