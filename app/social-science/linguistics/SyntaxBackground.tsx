"use client";

import React, { useEffect, useRef } from 'react';

/**
 * SyntaxBackground Component
 * * Visualizes the "Generative" nature of language by cascading linguistic tokens
 * (Phonemes, Morphemes, and Syntax fragments) that react to mouse proximity.
 */
export default function SyntaxBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles: Token[] = [];
    const mouse = { x: -1000, y: -1000 };

    // Linguistic symbols across different layers of analysis
    const tokens = [
      "ə", "θ", "ŋ", "æ", // Phonemes
      "-ing", "-ed", "pre-", "un-", // Morphemes
      "NP", "VP", "S", "DET", // Syntactic Categories
      "λ", "→", "∅", "Σ" // Formal Logic/Semantics
    ];

    class Token {
      x: number;
      y: number;
      text: string;
      fontSize: number;
      speed: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.text = tokens[Math.floor(Math.random() * tokens.length)];
        this.fontSize = Math.random() * 14 + 10;
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.4 + 0.1;
        // Themed lime/indigo palette for Linguistics
        this.color = Math.random() > 0.5 ? '163, 230, 53' : '129, 140, 248'; 
      }

      update() {
        this.y -= this.speed; // Floating upwards like an evolving thought
        
        // Mouse avoidance (Cognitive Disturbance)
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.x += dx * force * 0.05;
          this.y += dy * force * 0.05;
        }

        if (this.y < -50) {
          this.y = height + 50;
          this.x = Math.random() * width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.font = `bold ${this.fontSize}px font-mono`;
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);
      }
    }

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = Array.from({ length: 60 }, () => new Token());
    };

    const animate = () => {
      ctx.fillStyle = '#020617'; // Deep Slate background
      ctx.fillRect(0, 0, width, height);

      // Background Grid (The Semantic Ledger)
      ctx.strokeStyle = 'rgba(163, 230, 53, 0.03)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += 100) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 100) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    init();
    animate();

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}