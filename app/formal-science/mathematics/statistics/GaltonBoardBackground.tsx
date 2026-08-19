"use client";

import { useEffect, useRef } from "react";

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  lastPegRow: number;
};

type Peg = { x: number; y: number; row: number };

export default function GaltonBoardBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let frame = 0;
    let pegs: Peg[] = [];
    let balls: Ball[] = [];
    const rows = 12;
    const bins = new Array<number>(rows + 1).fill(0);
    const pegSpacing = 34;
    const rowSpacing = 30;
    const pegRadius = 2.3;
    const ballRadius = 3.1;

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const centerX = width * 0.68;
      const top = Math.max(78, height * 0.13);
      pegs = [];
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column <= row; column += 1) {
          pegs.push({
            x: centerX + column * pegSpacing - (row * pegSpacing) / 2,
            y: top + row * rowSpacing,
            row,
          });
        }
      }
      balls = [];
      bins.fill(0);
    };

    const render = () => {
      const centerX = width * 0.68;
      const top = Math.max(78, height * 0.13);
      const floorY = Math.min(height - 70, top + rows * rowSpacing + 42);
      const leftBinCenter = centerX - (rows * pegSpacing) / 2;

      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      const halo = ctx.createRadialGradient(centerX, top + rows * rowSpacing * 0.52, 0, centerX, top + rows * rowSpacing * 0.52, 340);
      halo.addColorStop(0, "rgba(99,102,241,0.10)");
      halo.addColorStop(1, "rgba(2,6,23,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(129,140,248,0.22)";
      for (const peg of pegs) {
        ctx.beginPath();
        ctx.arc(peg.x, peg.y, pegRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (frame % 11 === 0 && balls.length < 90) {
        balls.push({
          x: centerX,
          y: top - 18,
          vx: (Math.random() - 0.5) * 0.16,
          vy: 0,
          lastPegRow: -1,
        });
      }

      const survivors: Ball[] = [];
      for (const ball of balls) {
        ball.vy += 0.12;
        ball.vx *= 0.992;
        ball.x += ball.vx;
        ball.y += ball.vy;

        for (const peg of pegs) {
          if (peg.row === ball.lastPegRow || Math.abs(ball.y - peg.y) > 8) continue;
          const dx = ball.x - peg.x;
          const dy = ball.y - peg.y;
          const distanceSquared = dx * dx + dy * dy;
          const collisionRadius = pegRadius + ballRadius;
          if (distanceSquared < collisionRadius * collisionRadius) {
            ball.lastPegRow = peg.row;
            ball.vx = (Math.random() < 0.5 ? -1 : 1) * (0.72 + Math.random() * 0.22);
            ball.vy = 0.24;
            ball.y = peg.y + collisionRadius + 0.5;
            break;
          }
        }

        if (ball.y >= floorY) {
          const relative = ball.x - leftBinCenter;
          const index = Math.round(relative / pegSpacing);
          if (index >= 0 && index < bins.length) bins[index] += 1;
        } else {
          survivors.push(ball);
          ctx.fillStyle = "rgba(165,180,252,0.72)";
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      balls = survivors;

      const maxBin = Math.max(1, ...bins);
      const availableHeight = Math.min(170, Math.max(70, height - floorY - 28));
      const binWidth = pegSpacing - 5;
      for (let index = 0; index < bins.length; index += 1) {
        const barHeight = (bins[index] / maxBin) * availableHeight;
        const x = leftBinCenter + index * pegSpacing - binWidth / 2;
        const y = floorY + 10;
        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, "rgba(129,140,248,0.50)");
        gradient.addColorStop(1, "rgba(129,140,248,0.03)");
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, binWidth, barHeight);
      }

      frame += 1;
      frameId = requestAnimationFrame(render);
    };

    layout();
    window.addEventListener("resize", layout);
    frameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", layout);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-90" />;
}
