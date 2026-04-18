"use client";
import React, { useEffect, useRef } from "react";

interface Props {
  activeId: string;
}

// 1. THE DICTIONARY (Pure Data)
const THEMES: Record<string, { r: number, g: number, b: number, shape: string, count: number, speed: number }> = {
  "astronomy": { r: 255, g: 255, b: 255, shape: "circle", count: 150, speed: 0.3 },
  "biology": { r: 16, g: 185, b: 129, shape: "ring", count: 45, speed: 0.6 },
  "physics": { r: 59, g: 130, b: 246, shape: "square", count: 75, speed: 1.0 },
  "chemistry": { r: 6, g: 182, b: 212, shape: "hexagon", count: 60, speed: 0.8 },
  "earth-science": { r: 249, g: 115, b: 22, shape: "triangle", count: 80, speed: 0.4 },
};

// 2. THE PARTICLE CLASS
class Particle {
  x: number = Math.random() * 2000;
  y: number = Math.random() * 2000;
  vx: number = (Math.random() - 0.5);
  vy: number = (Math.random() - 0.5);
  size: number = Math.random() * 3 + 2;
  angle: number = Math.random() * Math.PI * 2;
  spin: number = (Math.random() - 0.5) * 0.02;

  update(canvasWidth: number, canvasHeight: number, speedMultiplier: number) {
    // Move
    this.x += this.vx * speedMultiplier;
    this.y += this.vy * speedMultiplier;
    this.angle += this.spin;

    // Screen Wrap
    if (this.x < -50) this.x = canvasWidth + 50;
    if (this.x > canvasWidth + 50) this.x = -50;
    if (this.y < -50) this.y = canvasHeight + 50;
    if (this.y > canvasHeight + 50) this.y = -50;
  }
}

export function NaturalScienceBackground({ activeId }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // The "God Ref" - React updates this, the Canvas reads it. Never causes a re-render.
  const activeThemeRef = useRef(THEMES[activeId] || THEMES["biology"]);

  // Update the God Ref whenever the prop changes
  useEffect(() => {
    activeThemeRef.current = THEMES[activeId] || THEMES["biology"];
  }, [activeId]);

  // The Isolated Animation Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;

    // Handle Resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Spawn 150 permanent actors
    const actors = Array.from({ length: 150 }, () => new Particle());

    // Polygon drawing helper
    const drawPolygon = (x: number, y: number, radius: number, sides: number, rotation: number) => {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const a = rotation + (i * 2 * Math.PI) / sides;
        ctx.lineTo(x + radius * Math.cos(a), y + radius * Math.sin(a));
      }
      ctx.closePath();
    };

    // The Master Loop
    const render = () => {
      // 1. Wipe the screen
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 2. Grab the current theme rules
      const theme = activeThemeRef.current;

      // 3. Set global styles for this frame
      ctx.fillStyle = `rgba(${theme.r}, ${theme.g}, ${theme.b}, 0.6)`;
      ctx.strokeStyle = `rgba(${theme.r}, ${theme.g}, ${theme.b}, 0.8)`;
      ctx.lineWidth = 1.5;

      // 4. Update and Draw exactly the number of actors the theme requests
      for (let i = 0; i < theme.count; i++) {
        const actor = actors[i];
        actor.update(canvas.width, canvas.height, theme.speed);

        // Draw based on shape
        if (theme.shape === "circle") {
          ctx.beginPath();
          ctx.arc(actor.x, actor.y, actor.size, 0, Math.PI * 2);
          ctx.fill();
        } 
        else if (theme.shape === "ring") {
          ctx.beginPath();
          ctx.arc(actor.x, actor.y, actor.size * 2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(actor.x, actor.y, actor.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } 
        else if (theme.shape === "square") {
          ctx.save();
          ctx.translate(actor.x, actor.y);
          ctx.rotate(actor.angle);
          ctx.strokeRect(-actor.size, -actor.size, actor.size * 2, actor.size * 2);
          ctx.restore();
        } 
        else if (theme.shape === "hexagon") {
          drawPolygon(actor.x, actor.y, actor.size * 1.5, 6, actor.angle);
          ctx.stroke();
        } 
        else if (theme.shape === "triangle") {
          drawPolygon(actor.x, actor.y, actor.size * 1.5, 3, actor.angle);
          ctx.fill();
        }
      }

      // Physics Mode: Draw connecting lines if close enough
      if (theme.shape === "square") {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < theme.count; i++) {
          for (let j = i + 1; j < theme.count; j++) {
            const dx = actors[i].x - actors[j].x;
            const dy = actors[i].y - actors[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 120) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${theme.r}, ${theme.g}, ${theme.b}, ${0.4 * (1 - dist / 120)})`;
              ctx.moveTo(actors[i].x, actors[i].y);
              ctx.lineTo(actors[j].x, actors[j].y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Ignite the engine
    render();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // <-- Empty array! This effect ONLY runs once on mount.

  // Safely grab current theme for the CSS background fallback
  const currentTheme = THEMES[activeId] || THEMES["biology"];

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none transition-colors duration-1000">
      {/* The Ambient Glow */}
      <div 
        className="absolute inset-0 transition-colors duration-1000"
        style={{ background: `radial-gradient(circle at center, rgba(${currentTheme.r},${currentTheme.g},${currentTheme.b}, 0.15) 0%, rgba(0,0,0,1) 100%)` }} 
      />
      
      {/* The Particle Engine */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-80 mix-blend-screen"
      />
    </div>
  );
}