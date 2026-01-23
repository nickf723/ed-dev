"use client";
import { useEffect, useRef } from "react";

// Actual code snippets to rain down
const CODE_SNIPPETS = [
  "function initStack() { return []; }",
  "if (memory.isFull()) { throw Overflow; }",
  "class Node<T> { next: Node<T> | null; }",
  "while (process.alive) { tick(); }",
  "const data = await fetch('/api/kernel');",
  "import { Component } from '@sys/core';",
  "let i = 0; for(; i < len; i++) { process(i); }",
  "try { execute(); } catch (e) { log(e); }",
  "interface Module { id: string; loaded: bool; }",
  "// TODO: Optimize this recursive call",
  "export default function Main() { return <App />; }",
  "gcc -o output main.c -Wall",
  "SELECT * FROM users WHERE status = 'active';",
  "sudo systemctl restart nginx",
];

interface CodeDrop {
  x: number;
  y: number;
  speed: number;
  text: string;
  opacity: number;
  fontSize: number;
}

export default function FundamentalsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Configuration
    const columnWidth = 150; // Approximate width so text doesn't overlap too badly
    const cols = Math.ceil(w / columnWidth);
    const drops: CodeDrop[] = [];

    // Initialize drops, one per column interval with random start times/speeds
    for (let i = 0; i < cols; i++) {
        drops.push({
            x: i * columnWidth + (Math.random() * 20), // Slight horizontal jitter
            y: Math.random() * -h, // Start off-screen top randomly
            speed: Math.random() * 2 + 1,
            text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
            opacity: Math.random() * 0.4 + 0.1, // Range 0.1 to 0.5
            fontSize: Math.floor(Math.random() * 4) + 10 // 10px to 14px
        });
    }

    const render = () => {
      // Fade effect trail. Using a very slight opacity black rectangle
      // over the previous frame creates the trail effect.
      ctx.fillStyle = "rgba(10, 10, 10, 0.1)"; 
      ctx.fillRect(0, 0, w, h);

      drops.forEach(drop => {
          // Set style for this drop
          ctx.fillStyle = `rgba(34, 197, 94, ${drop.opacity})`; // Tailwind green-500 color
          ctx.font = `${drop.fontSize}px monospace`;
          
          // Draw text
          ctx.fillText(drop.text, drop.x, drop.y);

          // Move down
          drop.y += drop.speed;

          // Reset if off-screen bottom
          if (drop.y > h + 50) {
              drop.y = -20;
              drop.speed = Math.random() * 2 + 1;
              // Pick new text and opacity for variety
              drop.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
              drop.opacity = Math.random() * 0.4 + 0.1;
          }
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    
    const handleResize = () => {
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight;
        // Optional: Recalculate columns on resize, but just letting them flow is usually fine.
    };
    window.addEventListener("resize", handleResize);
    
    return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-[#0a0a0a]" />;
}