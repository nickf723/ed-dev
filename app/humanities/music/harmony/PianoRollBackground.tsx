"use client";

import { useEffect, useRef } from "react";

export default function PianoRollBackground() {
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

    const curve = (
      start: [number, number],
      controlA: [number, number],
      controlB: [number, number],
      end: [number, number],
      color: string,
      lineWidth = 1.2,
    ) => {
      ctx.beginPath();
      ctx.moveTo(start[0], start[1]);
      ctx.bezierCurveTo(controlA[0], controlA[1], controlB[0], controlB[1], end[0], end[1]);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const note = (x: number, y: number, color: string, filled = true) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-0.18);
      ctx.beginPath();
      ctx.ellipse(0, 0, 7.5, 5.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = filled ? color : "rgba(0,0,0,0)";
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.3;
      if (filled) ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);

      const background = ctx.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, "#080309");
      background.addColorStop(0.5, "#0d0611");
      background.addColorStop(1, "#06050a");
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      const staffLeft = Math.max(30, width * 0.04);
      const staffRight = width - Math.max(30, width * 0.04);
      const trebleCenter = height * 0.34;
      const bassCenter = height * 0.67;
      const spacing = Math.max(11, Math.min(17, height * 0.017));

      // Grand-staff architecture. It reads as notation even when frozen.
      [trebleCenter, bassCenter].forEach((center) => {
        for (let lineIndex = -2; lineIndex <= 2; lineIndex += 1) {
          const y = center + lineIndex * spacing;
          ctx.beginPath();
          ctx.moveTo(staffLeft, y);
          ctx.lineTo(staffRight, y);
          ctx.strokeStyle = "rgba(255,255,255,0.07)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      const columns = [0.17, 0.38, 0.59, 0.8].map((ratio) => width * ratio);
      columns.forEach((x, index) => {
        ctx.beginPath();
        ctx.moveTo(x, trebleCenter - spacing * 4.3);
        ctx.lineTo(x, bassCenter + spacing * 4.3);
        ctx.strokeStyle = index === 3 ? "rgba(244,114,182,0.12)" : "rgba(255,255,255,0.035)";
        ctx.lineWidth = index === 3 ? 1.4 : 1;
        ctx.stroke();

        ctx.fillStyle = "rgba(167,139,250,0.32)";
        ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText(["I", "IV", "V", "I"][index], x - 4, bassCenter + spacing * 5.8);
      });

      // Three calm voice-leading paths. These are ambient notation, not a second interactive widget.
      const voices = [
        {
          ys: [trebleCenter + spacing * 0.3, trebleCenter - spacing * 0.5, trebleCenter + spacing * 0.15, trebleCenter - spacing * 0.1],
          color: "rgba(244,114,182,0.26)",
        },
        {
          ys: [trebleCenter + spacing * 2.1, trebleCenter + spacing * 1.5, trebleCenter + spacing * 2.3, trebleCenter + spacing * 1.9],
          color: "rgba(167,139,250,0.24)",
        },
        {
          ys: [bassCenter - spacing * 0.4, bassCenter + spacing * 0.4, bassCenter - spacing * 0.1, bassCenter - spacing * 0.35],
          color: "rgba(45,212,191,0.20)",
        },
      ];

      voices.forEach((voice) => {
        for (let index = 0; index < columns.length - 1; index += 1) {
          const x1 = columns[index];
          const x2 = columns[index + 1];
          const y1 = voice.ys[index];
          const y2 = voice.ys[index + 1];
          curve(
            [x1, y1],
            [x1 + (x2 - x1) * 0.38, y1],
            [x1 + (x2 - x1) * 0.62, y2],
            [x2, y2],
            voice.color,
            1.3,
          );
        }
        voice.ys.forEach((y, index) => note(columns[index], y, voice.color.replace(/0\.\d+\)/, "0.48)")));
      });

      // A few score annotations make this a rehearsal surface rather than a generic graph.
      ctx.font = "italic 12px Georgia, serif";
      ctx.fillStyle = "rgba(251,191,36,0.24)";
      ctx.fillText("dolce", staffLeft + 20, trebleCenter - spacing * 4.2);
      ctx.fillText("legato", width * 0.52, bassCenter + spacing * 4.7);

      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = "rgba(244,114,182,0.22)";
      ctx.fillText("COMMON TONE", width * 0.28, trebleCenter - spacing * 2.8);
      ctx.fillStyle = "rgba(45,212,191,0.18)";
      ctx.fillText("STEPWISE BASS", width * 0.62, bassCenter + spacing * 3.8);

      // One slow playhead is the only dominant motion.
      const travel = staffRight - staffLeft;
      const playhead = staffLeft + ((frame * 0.22) % Math.max(travel, 1));
      const beam = ctx.createLinearGradient(playhead - 24, 0, playhead + 24, 0);
      beam.addColorStop(0, "rgba(244,114,182,0)");
      beam.addColorStop(0.5, "rgba(244,114,182,0.08)");
      beam.addColorStop(1, "rgba(244,114,182,0)");
      ctx.fillStyle = beam;
      ctx.fillRect(playhead - 24, trebleCenter - spacing * 5, 48, bassCenter - trebleCenter + spacing * 10);
      ctx.beginPath();
      ctx.moveTo(playhead, trebleCenter - spacing * 5);
      ctx.lineTo(playhead, bassCenter + spacing * 5);
      ctx.strokeStyle = "rgba(244,114,182,0.14)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const vignette = ctx.createRadialGradient(width * 0.5, height * 0.46, height * 0.12, width * 0.5, height * 0.5, Math.max(width, height) * 0.76);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.68)");
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
