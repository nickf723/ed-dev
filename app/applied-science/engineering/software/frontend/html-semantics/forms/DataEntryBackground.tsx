"use client";
import React, { useEffect, useRef } from 'react';

export default function DataEntryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    // "Ghost Inputs" scattered on screen
    interface InputField {
      x: number; y: number; w: number; h: number;
      type: 'text' | 'checkbox' | 'button';
      text: string;
      cursorPos: number;
      active: number; // 0 to 1
    }

    const inputs: InputField[] = [];
    const gridCols = Math.floor(width / 250);
    const gridRows = Math.floor(height / 100);

    // Initialize grid of inputs
    for(let r = 0; r < gridRows; r++) {
      for(let c = 0; c < gridCols; c++) {
        if (Math.random() > 0.6) continue; // Sparse grid
        inputs.push({
          x: c * 250 + (Math.random() * 50),
          y: r * 100 + (Math.random() * 20),
          w: Math.random() > 0.8 ? 20 : 180, // Small for checkbox, wide for text
          h: 30,
          type: Math.random() > 0.8 ? 'checkbox' : 'text',
          text: '',
          cursorPos: 0,
          active: 0
        });
      }
    }

    const animate = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      inputs.forEach(input => {
        // Randomly activate
        if (input.active <= 0 && Math.random() > 0.995) {
            input.active = 1;
            input.text = '';
            input.cursorPos = 0;
        }

        // Decay activity
        if (input.active > 0) input.active -= 0.005;

        // "Typing" animation
        if (input.active > 0.5 && input.type === 'text' && frame % 5 === 0) {
            if (input.text.length < 15) input.text += '|'; 
        }

        // Draw Input Box
        ctx.strokeStyle = input.active > 0 
            ? `rgba(249, 115, 22, ${input.active})` // Active Orange
            : 'rgba(255, 255, 255, 0.05)'; // Dormant
        
        ctx.lineWidth = 1;
        
        if (input.type === 'checkbox') {
            ctx.strokeRect(input.x, input.y, 20, 20);
            if (input.active > 0.5) {
                ctx.fillStyle = `rgba(249, 115, 22, ${input.active})`;
                ctx.fillRect(input.x + 4, input.y + 4, 12, 12);
            }
        } else {
            ctx.strokeRect(input.x, input.y, input.w, input.h);
            // Draw Text
            ctx.fillStyle = `rgba(249, 115, 22, ${input.active})`;
            ctx.font = '12px monospace';
            ctx.fillText(input.text, input.x + 8, input.y + 20);
            
            // Draw Label Placeholder
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fillRect(input.x, input.y - 8, 40, 4);
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