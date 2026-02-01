"use client";
import React, { useEffect, useRef } from 'react';

export default function EventLoopBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Configuration
    const stackRadius = 60;
    const queueRadius = 250;
    
    interface Task {
      angle: number;
      speed: number;
      radius: number;
      state: 'queue' | 'processing' | 'done';
      size: number;
    }

    const tasks: Task[] = [];

    // Initialize Tasks
    for(let i=0; i<30; i++) {
      tasks.push({
        angle: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.01,
        radius: queueRadius + (Math.random() * 40 - 20),
        state: 'queue',
        size: Math.random() * 3 + 2
      });
    }

    const animate = () => {
      ctx.fillStyle = '#0f172a'; // Slate-900 (Dark background)
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw Connection Lines (The "Thread")
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.05)'; // Faint Yellow
      ctx.lineWidth = 1;
      tasks.forEach(task => {
        if (task.state === 'queue') {
            const x = centerX + Math.cos(task.angle) * task.radius;
            const y = centerY + Math.sin(task.angle) * task.radius;
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw Central "Call Stack"
      ctx.beginPath();
      ctx.arc(centerX, centerY, stackRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(250, 204, 21, 0.1)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.5)';
      ctx.stroke();

      // Update and Draw Tasks
      tasks.forEach(task => {
        // Queue Orbit Logic
        if (task.state === 'queue') {
          task.angle += task.speed;
          
          // Randomly pull task into stack
          if (Math.random() > 0.995) task.state = 'processing';

          const x = centerX + Math.cos(task.angle) * task.radius;
          const y = centerY + Math.sin(task.angle) * task.radius;

          ctx.beginPath();
          ctx.arc(x, y, task.size, 0, Math.PI * 2);
          ctx.fillStyle = '#facc15'; // Yellow-400
          ctx.fill();
        } 
        // Processing Logic (Move to center)
        else if (task.state === 'processing') {
            task.radius -= 5; // Suck into center
            
            const x = centerX + Math.cos(task.angle) * task.radius;
            const y = centerY + Math.sin(task.angle) * task.radius;

            ctx.beginPath();
            ctx.arc(x, y, task.size, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff'; // White (hot)
            ctx.fill();

            // Task "Finished"
            if (task.radius <= stackRadius) {
                task.state = 'queue';
                task.radius = queueRadius; // Reset
            }
        }
      });

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