"use client";

import { useEffect, useRef } from "react";

export default function PropositionalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let animationId = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const roundedBox = (x: number, y: number, w: number, h: number, radius: number, fill: string, stroke: string) => {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, radius);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const draw = () => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);

      const background = ctx.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, "#040208");
      background.addColorStop(0.55, "#08040f");
      background.addColorStop(1, "#030206");
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      const boardLeft = Math.max(24, width * 0.055);
      const boardRight = width - Math.max(24, width * 0.055);
      const boardTop = Math.max(130, height * 0.19);
      const boardBottom = height - Math.max(70, height * 0.09);
      const boardWidth = boardRight - boardLeft;
      const boardHeight = boardBottom - boardTop;

      // Sparse evaluation grid, fixed in place.
      ctx.strokeStyle = "rgba(168,85,247,0.045)";
      ctx.lineWidth = 1;
      for (let x = boardLeft; x <= boardRight; x += 72) {
        ctx.beginPath();
        ctx.moveTo(x, boardTop);
        ctx.lineTo(x, boardBottom);
        ctx.stroke();
      }
      for (let y = boardTop; y <= boardBottom; y += 72) {
        ctx.beginPath();
        ctx.moveTo(boardLeft, y);
        ctx.lineTo(boardRight, y);
        ctx.stroke();
      }

      const stateX = boardLeft + boardWidth * 0.12;
      const gateX = boardLeft + boardWidth * 0.48;
      const outputX = boardLeft + boardWidth * 0.78;
      const rowGap = Math.min(92, boardHeight * 0.19);
      const startY = boardTop + boardHeight * 0.2;
      const states = [
        ["T", "T"],
        ["T", "F"],
        ["F", "T"],
        ["F", "F"],
      ] as const;
      const operators = ["∧", "∨", "→", "↔"] as const;

      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = "rgba(216,180,254,0.38)";
      ctx.fillText("INPUT STATES", stateX - 46, boardTop + 18);
      ctx.fillText("CONNECTIVES", gateX - 42, boardTop + 18);
      ctx.fillText("EVALUATION", outputX - 38, boardTop + 18);

      states.forEach((state, rowIndex) => {
        const y = startY + rowIndex * rowGap;
        const selectedTone = rowIndex % 2 === 0 ? "rgba(192,132,252,0.12)" : "rgba(96,165,250,0.08)";

        roundedBox(stateX - 44, y - 22, 88, 44, 12, "rgba(0,0,0,0.34)", "rgba(255,255,255,0.07)");
        ctx.font = "600 13px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillStyle = state[0] === "T" ? "rgba(216,180,254,0.58)" : "rgba(148,163,184,0.32)";
        ctx.fillText(`P ${state[0]}`, stateX - 32, y + 4);
        ctx.fillStyle = state[1] === "T" ? "rgba(216,180,254,0.58)" : "rgba(148,163,184,0.32)";
        ctx.fillText(`Q ${state[1]}`, stateX + 8, y + 4);

        // Connection rail.
        ctx.beginPath();
        ctx.moveTo(stateX + 46, y);
        ctx.lineTo(outputX - 68, y);
        ctx.strokeStyle = "rgba(168,85,247,0.10)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        operators.forEach((operator, index) => {
          const x = gateX - 76 + index * 50;
          roundedBox(x - 16, y - 16, 32, 32, 9, selectedTone, "rgba(192,132,252,0.12)");
          ctx.font = "600 15px Georgia, serif";
          ctx.fillStyle = "rgba(233,213,255,0.45)";
          ctx.fillText(operator, x - 5, y + 5);
        });

        const p = state[0] === "T";
        const q = state[1] === "T";
        const results = [p && q, p || q, !p || q, p === q];
        const trueCount = results.filter(Boolean).length;
        roundedBox(outputX - 54, y - 18, 108, 36, 10, "rgba(0,0,0,0.3)", "rgba(255,255,255,0.06)");
        ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillStyle = "rgba(196,181,253,0.42)";
        ctx.fillText(`${trueCount}/4 true`, outputX - 28, y + 3);
      });

      // One slow evaluation sweep. Nothing else races or flashes.
      const sweepRange = boardRight - boardLeft;
      const sweepX = boardLeft + ((frame * 0.18) % Math.max(1, sweepRange));
      const beam = ctx.createLinearGradient(sweepX - 42, 0, sweepX + 42, 0);
      beam.addColorStop(0, "rgba(168,85,247,0)");
      beam.addColorStop(0.5, "rgba(168,85,247,0.055)");
      beam.addColorStop(1, "rgba(168,85,247,0)");
      ctx.fillStyle = beam;
      ctx.fillRect(sweepX - 42, boardTop, 84, boardHeight);

      const vignette = ctx.createRadialGradient(width * 0.5, height * 0.48, height * 0.16, width * 0.5, height * 0.5, Math.max(width, height) * 0.74);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.72)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}
