"use client";
import React, { useEffect, useRef } from "react";

interface Props {
  activeId: string;
}

const THEMES: Record<string, { r: number; g: number; b: number; shape: string; count: number; speed: number }> = {
  astronomy: { r: 168, g: 85, b: 247, shape: "circle", count: 150, speed: 0.3 },
  "earth-science": { r: 59, g: 130, b: 246, shape: "triangle", count: 80, speed: 0.4 },
  biology: { r: 34, g: 197, b: 94, shape: "ring", count: 45, speed: 0.6 },
  chemistry: { r: 250, g: 204, b: 21, shape: "hexagon", count: 60, speed: 0.8 },
  physics: { r: 239, g: 68, b: 68, shape: "square", count: 75, speed: 1.0 },
};

class Particle {
  x = Math.random() * 2000;
  y = Math.random() * 2000;
  vx = Math.random() - 0.5;
  vy = Math.random() - 0.5;
  size = Math.random() * 3 + 2;
  angle = Math.random() * Math.PI * 2;
  spin = (Math.random() - 0.5) * 0.02;

  update(canvasWidth: number, canvasHeight: number, speedMultiplier: number) {
    this.x += this.vx * speedMultiplier;
    this.y += this.vy * speedMultiplier;
    this.angle += this.spin;

    if (this.x < -50) this.x = canvasWidth + 50;
    if (this.x > canvasWidth + 50) this.x = -50;
    if (this.y < -50) this.y = canvasHeight + 50;
    if (this.y > canvasHeight + 50) this.y = -50;
  }
}

export function NaturalScienceBackground({ activeId }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeThemeRef = useRef(THEMES[activeId] || THEMES.biology);

  useEffect(() => {
    activeThemeRef.current = THEMES[activeId] || THEMES.biology;
  }, [activeId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let isHidden = document.hidden;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const handleVisibility = () => {
      isHidden = document.hidden;
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    handleResize();

    const actors = Array.from({ length: 150 }, () => new Particle());

    const drawPolygon = (x: number, y: number, radius: number, sides: number, rotation: number) => {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = rotation + (i * 2 * Math.PI) / sides;
        ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
      }
      ctx.closePath();
    };

    const render = () => {
      if (!isHidden) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const theme = activeThemeRef.current;
        const actorCount = reducedMotion.matches ? Math.min(theme.count, 24) : theme.count;
        const speed = reducedMotion.matches ? theme.speed * 0.12 : theme.speed;

        ctx.fillStyle = `rgba(${theme.r}, ${theme.g}, ${theme.b}, 0.72)`;
        ctx.strokeStyle = `rgba(${theme.r}, ${theme.g}, ${theme.b}, 0.90)`;
        ctx.lineWidth = 1.6;

        for (let i = 0; i < actorCount; i++) {
          const actor = actors[i];
          actor.update(canvas.width, canvas.height, speed);

          if (theme.shape === "circle") {
            ctx.beginPath();
            ctx.arc(actor.x, actor.y, actor.size, 0, Math.PI * 2);
            ctx.fill();
          } else if (theme.shape === "ring") {
            ctx.beginPath();
            ctx.arc(actor.x, actor.y, actor.size * 2, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(actor.x, actor.y, actor.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
          } else if (theme.shape === "square") {
            ctx.save();
            ctx.translate(actor.x, actor.y);
            ctx.rotate(actor.angle);
            ctx.strokeRect(-actor.size, -actor.size, actor.size * 2, actor.size * 2);
            ctx.restore();
          } else if (theme.shape === "hexagon") {
            drawPolygon(actor.x, actor.y, actor.size * 1.5, 6, actor.angle);
            ctx.stroke();
          } else if (theme.shape === "triangle") {
            drawPolygon(actor.x, actor.y, actor.size * 1.5, 3, actor.angle);
            ctx.fill();
          }
        }

        if (theme.shape === "square" && !reducedMotion.matches) {
          ctx.lineWidth = 0.5;
          for (let i = 0; i < actorCount; i++) {
            for (let j = i + 1; j < actorCount; j++) {
              const dx = actors[i].x - actors[j].x;
              const dy = actors[i].y - actors[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${theme.r}, ${theme.g}, ${theme.b}, ${0.5 * (1 - distance / 120)})`;
                ctx.moveTo(actors[i].x, actors[i].y);
                ctx.lineTo(actors[j].x, actors[j].y);
                ctx.stroke();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const currentTheme = THEMES[activeId] || THEMES.biology;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 transition-colors duration-1000">
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at 52% 46%, rgba(${currentTheme.r},${currentTheme.g},${currentTheme.b}, 0.24) 0%, rgba(${currentTheme.r},${currentTheme.g},${currentTheme.b}, 0.06) 34%, rgba(0,0,0,0.97) 78%)`,
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-90 mix-blend-screen" />
    </div>
  );
}
