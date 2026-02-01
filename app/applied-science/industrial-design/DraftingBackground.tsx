"use client";
import React, { useEffect, useRef } from 'react';

export default function DraftingBackground() {
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
    const gridSize = 40;
    const sketchSpeed = 2;
    const agents: SketchAgent[] = [];

    class SketchAgent {
      x: number; y: number;
      targetX: number; targetY: number;
      path: { x: number; y: number }[] = [];
      phase: 'drawing' | 'holding' | 'erasing' = 'drawing';
      timer: number = 0;
      color: string;

      constructor() {
        // Start somewhere on the grid
        this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
        this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
        this.targetX = this.x;
        this.targetY = this.y;
        this.color = Math.random() > 0.8 ? '#fb923c' : '#52525b'; // Orange-400 or Zinc-600
        this.pickNewTarget();
      }

      pickNewTarget() {
        // Isometric-ish movement (diagonal or straight)
        const dir = Math.floor(Math.random() * 4);
        const dist = Math.floor(Math.random() * 3 + 1) * gridSize;
        
        if (dir === 0) this.targetX += dist;
        else if (dir === 1) this.targetX -= dist;
        else if (dir === 2) this.targetY += dist;
        else if (dir === 3) this.targetY -= dist;

        // Keep bounds
        if (this.targetX < 0 || this.targetX > width) this.targetX = this.x;
        if (this.targetY < 0 || this.targetY > height) this.targetY = this.y;
      }

      update() {
        if (this.phase === 'drawing') {
          const dx = this.targetX - this.x;
          const dy = this.targetY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < sketchSpeed) {
            this.x = this.targetX;
            this.y = this.targetY;
            this.path.push({ x: this.x, y: this.y });
            
            if (this.path.length > 5) {
              this.phase = 'holding';
              this.timer = 100;
            } else {
              this.pickNewTarget();
            }
          } else {
            this.x += (dx / dist) * sketchSpeed;
            this.y += (dy / dist) * sketchSpeed;
            if (frame % 5 === 0) this.path.push({ x: this.x, y: this.y });
          }
        } else if (this.phase === 'holding') {
          this.timer--;
          if (this.timer <= 0) this.phase = 'erasing';
        } else if (this.phase === 'erasing') {
          this.path.shift(); // Remove oldest points
          if (this.path.length === 0) {
            this.phase = 'drawing';
            this.path = [];
            this.pickNewTarget();
          }
        }
      }

      draw() {
        if (this.path.length < 2) return;
        ctx!.beginPath();
        ctx!.moveTo(this.path[0].x, this.path[0].y);
        for (let i = 1; i < this.path.length; i++) {
          ctx!.lineTo(this.path[i].x, this.path[i].y);
        }
        ctx!.strokeStyle = this.color;
        ctx!.lineWidth = 2;
        ctx!.stroke();

        // Draw "Joint" points
        ctx!.fillStyle = '#fff';
        this.path.forEach((p, i) => {
            if (i % 10 === 0) ctx!.fillRect(p.x - 1, p.y - 1, 2, 2);
        });
      }
    }

    // Init agents
    for (let i = 0; i < 8; i++) agents.push(new SketchAgent());

    const animate = () => {
      ctx.fillStyle = '#0f172a'; // Slate-900 background
      ctx.fillRect(0, 0, width, height);

      // Draw faint Isometric Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      agents.forEach(agent => {
        agent.update();
        agent.draw();
      });

      frame++;
      requestAnimationFrame(animate);
    };

    animate();
    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}