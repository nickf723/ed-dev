"use client";
import React, { useRef, useEffect } from 'react';

export default function PropositionalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let time = 0;

    const cellSize = 60; // Size of our truth table blocks

    const draw = () => {
      ctx.fillStyle = '#030108'; // Pitch black with a hint of purple
      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize) + 2;

      // The scrolling offset to make it look like an infinite table
      const scrollSpeed = 30; // Pixels per second
      const offsetY = (time * scrollSpeed) % cellSize;
      const absoluteOffsetIndex = Math.floor((time * scrollSpeed) / cellSize);

      ctx.lineWidth = 1;

      for (let x = 0; x < cols; x++) {
        // Create a binary alternating pattern. 
        // Column 0 alternates every 1 block, Col 1 every 2, Col 2 every 4...
        // We use modulo to cap it so it creates repeating geometric cascades.
        const frequency = Math.pow(2, (x % 4) + 1);

        for (let y = -1; y < rows; y++) {
          const px = x * cellSize;
          const py = y * cellSize - offsetY;

          // Calculate the absolute row index in the infinite table
          const absoluteRow = y + absoluteOffsetIndex;

          // Evaluate if this specific cell is "True" or "False" based on binary counting
          const isTrue = Math.floor(absoluteRow / frequency) % 2 === 0;

          if (isTrue) {
              // Fill "True" cells with faint, structured purple
              ctx.fillStyle = `rgba(168, 85, 247, ${0.02 + (x % 3) * 0.01})`;
              ctx.fillRect(px + 2, py + 2, cellSize - 4, cellSize - 4);
              
              // Randomly spark a "True" cell to simulate processing
              if (Math.random() < 0.0005) {
                  ctx.fillStyle = 'rgba(192, 132, 252, 0.3)'; // Brighter purple flash
                  ctx.fillRect(px + 2, py + 2, cellSize - 4, cellSize - 4);
              }
          }

          // Draw the strict grid framework of the truth table
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
          ctx.strokeRect(px, py, cellSize, cellSize);
        }
      }

      // Add a faint vertical highlight to simulate a "reading" cursor
      const cursorX = Math.floor((Math.sin(time * 0.5) + 1) / 2 * cols) * cellSize;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(cursorX, 0, cellSize, height);

      time += 0.016; // roughly 60fps
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}