"use client";

import { useEffect, useRef } from "react";

export default function DigBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
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

    const line = (points: Array<[number, number]>, stroke: string, lineWidth = 1) => {
      if (points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i][0], points[i][1]);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const artifact = (x: number, y: number, label: string, tone: string) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = tone;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,248,235,0.55)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "rgba(244, 236, 220, 0.55)";
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillText(label, x + 9, y + 3);
    };

    const draw = () => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);

      const horizon = Math.max(150, height * 0.2);
      const trenchTop = Math.max(270, height * 0.39);
      const trenchBottom = height + 30;

      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#090806");
      sky.addColorStop(0.46, "#15100b");
      sky.addColorStop(1, "#080706");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      // Field grid and datum line, inherited from the parent excavation language.
      ctx.strokeStyle = "rgba(245, 190, 95, 0.085)";
      ctx.lineWidth = 1;
      for (let x = 30; x < width; x += 92) {
        ctx.beginPath();
        ctx.moveTo(x, horizon);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = horizon; y < height; y += 92) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.setLineDash([8, 7]);
      line(
        [
          [0, trenchTop - 24],
          [width, trenchTop - 24],
        ],
        "rgba(251, 191, 36, 0.28)",
      );
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(251, 191, 36, 0.38)";
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillText("SITE DATUM", 24, trenchTop - 33);

      // Open trench profile. Interfaces intentionally undulate so they read as deposits, not stacked cards.
      const profile = [
        {
          color: "#3a3025",
          points: [
            [0, trenchTop],
            [width * 0.2, trenchTop + 8],
            [width * 0.42, trenchTop - 4],
            [width * 0.67, trenchTop + 14],
            [width, trenchTop + 3],
          ] as Array<[number, number]>,
        },
        {
          color: "#5b3923",
          points: [
            [0, trenchTop + 112],
            [width * 0.18, trenchTop + 124],
            [width * 0.38, trenchTop + 103],
            [width * 0.63, trenchTop + 135],
            [width, trenchTop + 116],
          ] as Array<[number, number]>,
        },
        {
          color: "#3c332f",
          points: [
            [0, trenchTop + 232],
            [width * 0.24, trenchTop + 214],
            [width * 0.47, trenchTop + 248],
            [width * 0.72, trenchTop + 224],
            [width, trenchTop + 244],
          ] as Array<[number, number]>,
        },
      ];

      const boundaries = [
        profile[0].points,
        profile[1].points,
        profile[2].points,
        [
          [0, trenchBottom],
          [width, trenchBottom],
        ] as Array<[number, number]>,
      ];

      for (let i = 0; i < 3; i += 1) {
        const top = boundaries[i];
        const bottom = boundaries[i + 1];
        ctx.beginPath();
        ctx.moveTo(top[0][0], top[0][1]);
        for (let p = 1; p < top.length; p += 1) ctx.lineTo(top[p][0], top[p][1]);
        for (let p = bottom.length - 1; p >= 0; p -= 1) ctx.lineTo(bottom[p][0], bottom[p][1]);
        ctx.closePath();
        ctx.fillStyle = profile[i].color;
        ctx.fill();
        line(top, "rgba(255,239,213,0.16)", 1.2);
      }

      // A cut feature interrupts earlier deposits. The shape teaches context without any fake date labels.
      const featureX = width * 0.73;
      ctx.beginPath();
      ctx.moveTo(featureX - 78, trenchTop + 2);
      ctx.bezierCurveTo(featureX - 70, trenchTop + 92, featureX - 52, trenchTop + 165, featureX - 22, trenchTop + 222);
      ctx.bezierCurveTo(featureX + 28, trenchTop + 245, featureX + 72, trenchTop + 154, featureX + 82, trenchTop + 8);
      ctx.closePath();
      ctx.fillStyle = "rgba(34, 28, 24, 0.92)";
      ctx.fill();
      ctx.strokeStyle = "rgba(251, 191, 36, 0.34)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.fillStyle = "rgba(251, 191, 36, 0.48)";
      ctx.fillText("CUT / FILL", featureX - 31, trenchTop + 70);

      // Posthole and compact feature markers.
      ctx.beginPath();
      ctx.ellipse(width * 0.26, trenchTop + 174, 18, 54, 0.08, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(27, 23, 20, 0.9)";
      ctx.fill();
      ctx.strokeStyle = "rgba(244, 236, 220, 0.25)";
      ctx.stroke();

      artifact(width * 0.34, trenchTop + 79, "A17", "#c9793f");
      artifact(width * 0.52, trenchTop + 165, "A23", "#b8aa91");
      artifact(width * 0.61, trenchTop + 274, "A31", "#9da28d");
      artifact(width * 0.78, trenchTop + 148, "S04", "#d5bd75");

      // Profile annotations and sample tags.
      const labels = [
        ["CONTEXT 101", trenchTop + 52],
        ["CONTEXT 117", trenchTop + 155],
        ["CONTEXT 126", trenchTop + 270],
      ] as const;
      labels.forEach(([label, y]) => {
        ctx.fillStyle = "rgba(241, 227, 205, 0.42)";
        ctx.fillText(label, 26, y);
      });

      // North arrow and scale bar stay quiet but readable in the open world.
      ctx.save();
      ctx.translate(width - 72, horizon + 54);
      ctx.strokeStyle = "rgba(245, 190, 95, 0.5)";
      ctx.fillStyle = "rgba(245, 190, 95, 0.58)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.lineTo(0, -20);
      ctx.lineTo(-5, -10);
      ctx.moveTo(0, -20);
      ctx.lineTo(5, -10);
      ctx.stroke();
      ctx.fillText("N", -3, -28);
      ctx.restore();

      const scaleY = height - 42;
      ctx.fillStyle = "rgba(241, 227, 205, 0.42)";
      ctx.fillText("1 m", width - 118, scaleY - 8);
      for (let i = 0; i < 4; i += 1) {
        ctx.fillStyle = i % 2 === 0 ? "rgba(241,227,205,0.5)" : "rgba(20,16,13,0.72)";
        ctx.fillRect(width - 134 + i * 24, scaleY, 24, 7);
      }

      // One slow raking light. Motion is deliberately subtle so it never competes with the foreground lab.
      const sweep = ((frame * 0.12) % (width + 360)) - 180;
      const light = ctx.createLinearGradient(sweep - 150, 0, sweep + 150, 0);
      light.addColorStop(0, "rgba(255, 220, 160, 0)");
      light.addColorStop(0.5, "rgba(255, 220, 160, 0.035)");
      light.addColorStop(1, "rgba(255, 220, 160, 0)");
      ctx.fillStyle = light;
      ctx.fillRect(0, horizon, width, height - horizon);

      const vignette = ctx.createRadialGradient(width * 0.5, height * 0.48, height * 0.18, width * 0.5, height * 0.5, Math.max(width, height) * 0.78);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.62)");
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
