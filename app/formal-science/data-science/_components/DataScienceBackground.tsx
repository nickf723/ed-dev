"use client";

import { useEffect, useRef } from "react";

type Datum = {
  a: number;
  b: number;
  group: 0 | 1 | 2;
};

const DATA: readonly Datum[] = Array.from({ length: 54 }, (_, index) => {
  const group = (index % 3) as 0 | 1 | 2;
  const baseX = group === 0 ? 0.28 : group === 1 ? 0.57 : 0.74;
  const baseY = group === 0 ? 0.65 : group === 1 ? 0.30 : 0.63;
  return {
    a: Math.max(0.05, Math.min(0.95, baseX + ((((index * 37) % 19) - 9) / 78))),
    b: Math.max(0.05, Math.min(0.95, baseY + ((((index * 53) % 23) - 11) / 82))),
    group,
  };
});

const GROUP_RGB = ["34,211,238", "167,139,250", "244,114,182"] as const;

export default function DataScienceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const drawingContext = canvasElement.getContext("2d");
    if (!drawingContext) return;

    const canvas: HTMLCanvasElement = canvasElement;
    const context: CanvasRenderingContext2D = drawingContext;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;
    let paused = document.hidden;

    function resize() {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      ratio = Math.min(window.devicePixelRatio || 1, width < 900 ? 1.05 : 1.4);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(52);
    }

    function onVisibility() {
      paused = document.hidden;
      if (!paused && !reducedMotion) frame = requestAnimationFrame(loop);
    }

    function loop(now: number) {
      if (paused) return;
      draw(now / 1000);
      frame = requestAnimationFrame(loop);
    }

    function draw(time: number) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      drawBase(context, width, height);
      drawWorkbench(context, width, height, reducedMotion ? 52 : time);
      drawAuditScan(context, width, height, reducedMotion ? 52 : time);
      drawVignette(context, width, height);
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reducedMotion) frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-x-0 top-0 h-[17%] bg-gradient-to-b from-[#03070c]/86 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#03070c]/82 to-transparent" />
    </div>
  );
}

function drawBase(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#03070c");
  gradient.addColorStop(0.48, "#06111a");
  gradient.addColorStop(1, "#050612");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.save();
  context.strokeStyle = "rgba(148,163,184,0.025)";
  context.lineWidth = 1;
  for (let x = 0; x < width; x += 62) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = 0; y < height; y += 62) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
  context.restore();
}

function drawWorkbench(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const top = height * 0.24;
  const bottom = height * 0.82;
  const fieldHeight = bottom - top;
  const margin = width < 900 ? width * 0.04 : width * 0.06;
  const available = width - margin * 2;
  const gap = Math.max(18, available * 0.018);
  const leftW = available * 0.27;
  const centerW = available * 0.30;
  const rightW = available - leftW - centerW - gap * 2;
  const leftX = margin;
  const centerX = leftX + leftW + gap;
  const rightX = centerX + centerW + gap;

  drawPanelFrame(context, leftX, top, leftW, fieldHeight, "RAW TABLE", "records / missingness / types", "34,211,238");
  drawPanelFrame(context, centerX, top, centerW, fieldHeight, "FEATURE SPACE", "transform / scale / compare", "167,139,250");
  drawPanelFrame(context, rightX, top, rightW, fieldHeight, "MODEL VIEW", "fit / evaluate / residual", "244,114,182");

  drawRawTable(context, leftX, top, leftW, fieldHeight, time);
  drawFeatureSpace(context, centerX, top, centerW, fieldHeight, time);
  drawModelView(context, rightX, top, rightW, fieldHeight, time);
  drawTransformConnectors(context, leftX, leftW, centerX, centerW, rightX, top, fieldHeight, time);
}

function drawPanelFrame(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  label: string,
  note: string,
  rgb: string,
) {
  context.save();
  context.fillStyle = "rgba(2,6,12,0.18)";
  context.strokeStyle = `rgba(${rgb},0.12)`;
  context.lineWidth = 1;
  context.beginPath();
  context.roundRect(x, y, width, height, 16);
  context.fill();
  context.stroke();
  context.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = `rgba(${rgb},0.34)`;
  context.fillText(label, x + 14, y + 22);
  context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(148,163,184,0.20)";
  context.fillText(note, x + 14, y + 39);
  context.restore();
}

function drawRawTable(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, time: number) {
  const innerX = x + 14;
  const innerY = y + 58;
  const innerW = width - 28;
  const innerH = height - 76;
  const cols = width < 260 ? 4 : 5;
  const rows = 10;
  const cellW = innerW / cols;
  const cellH = innerH / rows;

  context.save();
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  const headers = ["id", "x₁", "x₂", "group", "flag"];
  for (let col = 0; col < cols; col += 1) {
    const cx = innerX + col * cellW;
    context.fillStyle = "rgba(34,211,238,0.055)";
    context.fillRect(cx + 1, innerY, cellW - 2, cellH - 2);
    context.fillStyle = "rgba(165,243,252,0.30)";
    context.fillText(headers[col] ?? `c${col + 1}`, cx + 5, innerY + cellH * 0.64);
  }

  for (let row = 1; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cx = innerX + col * cellW;
      const cy = innerY + row * cellH;
      const missing = (row * 7 + col * 11) % 17 === 0;
      const flagged = col === cols - 1 && row % 4 === 0;
      context.fillStyle = missing
        ? "rgba(248,113,113,0.07)"
        : flagged
          ? "rgba(251,191,36,0.055)"
          : "rgba(148,163,184,0.022)";
      context.fillRect(cx + 1, cy + 1, cellW - 2, cellH - 2);
      context.strokeStyle = "rgba(148,163,184,0.04)";
      context.strokeRect(cx + 1, cy + 1, cellW - 2, cellH - 2);

      if (missing) {
        context.fillStyle = "rgba(248,113,113,0.32)";
        context.fillText("NA", cx + 5, cy + cellH * 0.64);
      } else if (col === 0) {
        context.fillStyle = "rgba(148,163,184,0.22)";
        context.fillText(String(1000 + row), cx + 5, cy + cellH * 0.64);
      } else if (flagged) {
        context.fillStyle = "rgba(251,191,36,0.28)";
        context.fillText("!", cx + 5, cy + cellH * 0.64);
      } else {
        const value = ((row * 19 + col * 13) % 97) / 10;
        context.fillStyle = "rgba(203,213,225,0.20)";
        context.fillText(value.toFixed(1), cx + 5, cy + cellH * 0.64);
      }
    }
  }

  const cursor = 1 + Math.floor(((Math.sin(time * 0.035) + 1) / 2) * (rows - 2));
  context.strokeStyle = "rgba(34,211,238,0.18)";
  context.lineWidth = 1;
  context.strokeRect(innerX + 1, innerY + cursor * cellH + 1, innerW - 2, cellH - 2);
  context.restore();
}

function drawFeatureSpace(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, time: number) {
  const pad = 34;
  const plotX = x + pad;
  const plotY = y + 66;
  const plotW = width - pad * 1.45;
  const plotH = height - 104;

  context.save();
  context.strokeStyle = "rgba(203,213,225,0.10)";
  context.beginPath();
  context.moveTo(plotX, plotY);
  context.lineTo(plotX, plotY + plotH);
  context.lineTo(plotX + plotW, plotY + plotH);
  context.stroke();

  context.globalCompositeOperation = "lighter";
  DATA.forEach((datum, index) => {
    const px = plotX + datum.a * plotW;
    const py = plotY + (1 - datum.b) * plotH;
    const rgb = GROUP_RGB[datum.group];
    const alpha = 0.28 + (index % 4) * 0.025;
    context.fillStyle = `rgba(${rgb},${alpha})`;
    context.beginPath();
    context.arc(px, py, 2.1 + (index % 3) * 0.35, 0, Math.PI * 2);
    context.fill();
  });

  const centers = [
    { x: 0.28, y: 0.65, rgb: GROUP_RGB[0] },
    { x: 0.57, y: 0.30, rgb: GROUP_RGB[1] },
    { x: 0.74, y: 0.63, rgb: GROUP_RGB[2] },
  ] as const;
  centers.forEach((center, index) => {
    const pulse = 0.72 + Math.sin(time * 0.38 + index * 1.8) * 0.09;
    const px = plotX + center.x * plotW;
    const py = plotY + (1 - center.y) * plotH;
    context.strokeStyle = `rgba(${center.rgb},${0.30 * pulse})`;
    context.lineWidth = 1.2;
    context.beginPath();
    context.arc(px, py, 11, 0, Math.PI * 2);
    context.stroke();
    context.beginPath();
    context.moveTo(px - 5, py);
    context.lineTo(px + 5, py);
    context.moveTo(px, py - 5);
    context.lineTo(px, py + 5);
    context.stroke();
  });
  context.restore();

  context.save();
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(148,163,184,0.20)";
  context.fillText("scaled feature x₁", plotX + plotW - 78, plotY + plotH + 20);
  context.save();
  context.translate(plotX - 18, plotY + 82);
  context.rotate(-Math.PI / 2);
  context.fillText("scaled feature x₂", 0, 0);
  context.restore();
  context.restore();
}

function drawModelView(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, time: number) {
  const pad = 32;
  const plotX = x + pad;
  const plotY = y + 66;
  const plotW = width - pad * 1.45;
  const plotH = height - 104;

  context.save();
  context.beginPath();
  context.rect(plotX, plotY, plotW, plotH);
  context.clip();

  const tilesX = Math.max(8, Math.floor(plotW / 36));
  const tilesY = Math.max(7, Math.floor(plotH / 34));
  for (let row = 0; row < tilesY; row += 1) {
    for (let col = 0; col < tilesX; col += 1) {
      const fx = (col + 0.5) / tilesX;
      const fy = 1 - (row + 0.5) / tilesY;
      const group = nearestCenter(fx, fy);
      const rgb = GROUP_RGB[group];
      context.fillStyle = `rgba(${rgb},0.025)`;
      context.fillRect(plotX + col * (plotW / tilesX), plotY + row * (plotH / tilesY), plotW / tilesX + 1, plotH / tilesY + 1);
    }
  }

  context.strokeStyle = "rgba(226,232,240,0.08)";
  context.setLineDash([4, 6]);
  context.beginPath();
  context.moveTo(plotX + plotW * 0.43, plotY);
  context.bezierCurveTo(plotX + plotW * 0.34, plotY + plotH * 0.32, plotX + plotW * 0.46, plotY + plotH * 0.64, plotX + plotW * 0.38, plotY + plotH);
  context.moveTo(plotX + plotW * 0.68, plotY);
  context.bezierCurveTo(plotX + plotW * 0.73, plotY + plotH * 0.28, plotX + plotW * 0.64, plotY + plotH * 0.63, plotX + plotW * 0.70, plotY + plotH);
  context.stroke();
  context.setLineDash([]);

  DATA.slice(0, 30).forEach((datum, index) => {
    const wobble = Math.sin(time * 0.014 + index * 0.33) * 0.0015;
    const px = plotX + (datum.a + wobble) * plotW;
    const py = plotY + (1 - datum.b) * plotH;
    context.fillStyle = `rgba(${GROUP_RGB[datum.group]},0.30)`;
    context.beginPath();
    context.arc(px, py, 1.9, 0, Math.PI * 2);
    context.fill();
  });
  context.restore();

  context.save();
  context.strokeStyle = "rgba(203,213,225,0.10)";
  context.strokeRect(plotX, plotY, plotW, plotH);
  const barY = y + height - 24;
  context.fillStyle = "rgba(148,163,184,0.08)";
  context.fillRect(plotX, barY, plotW, 5);
  context.fillStyle = "rgba(94,234,212,0.24)";
  context.fillRect(plotX, barY, plotW * 0.78, 5);
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(148,163,184,0.22)";
  context.fillText("held-out evaluation cue", plotX, barY - 7);
  context.restore();
}

function drawTransformConnectors(
  context: CanvasRenderingContext2D,
  leftX: number,
  leftW: number,
  centerX: number,
  centerW: number,
  rightX: number,
  top: number,
  fieldHeight: number,
  time: number,
) {
  const y = top + fieldHeight * 0.52;
  const firstA = leftX + leftW;
  const firstB = centerX;
  const secondA = centerX + centerW;
  const secondB = rightX;

  context.save();
  context.strokeStyle = "rgba(148,163,184,0.12)";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(firstA + 4, y);
  context.lineTo(firstB - 4, y);
  context.moveTo(secondA + 4, y);
  context.lineTo(secondB - 4, y);
  context.stroke();

  const progress = (time * 0.025) % 1;
  const x1 = firstA + 4 + (firstB - firstA - 8) * progress;
  const x2 = secondA + 4 + (secondB - secondA - 8) * ((progress + 0.47) % 1);
  drawPacket(context, x1, y, "34,211,238");
  drawPacket(context, x2, y, "167,139,250");
  context.restore();
}

function drawPacket(context: CanvasRenderingContext2D, x: number, y: number, rgb: string) {
  const glow = context.createRadialGradient(x, y, 0, x, y, 11);
  glow.addColorStop(0, `rgba(${rgb},0.52)`);
  glow.addColorStop(1, `rgba(${rgb},0)`);
  context.fillStyle = glow;
  context.fillRect(x - 12, y - 12, 24, 24);
  context.fillStyle = `rgba(${rgb},0.72)`;
  context.beginPath();
  context.arc(x, y, 2.1, 0, Math.PI * 2);
  context.fill();
}

function drawAuditScan(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const progress = (Math.sin(time * 0.028) + 1) / 2;
  const x = width * (0.05 + progress * 0.90);
  const top = height * 0.20;
  const bottom = height * 0.86;
  const gradient = context.createLinearGradient(x - 34, 0, x + 34, 0);
  gradient.addColorStop(0, "rgba(226,232,240,0)");
  gradient.addColorStop(0.47, "rgba(226,232,240,0.018)");
  gradient.addColorStop(0.5, "rgba(226,232,240,0.12)");
  gradient.addColorStop(0.53, "rgba(226,232,240,0.018)");
  gradient.addColorStop(1, "rgba(226,232,240,0)");
  context.fillStyle = gradient;
  context.fillRect(x - 34, top, 68, bottom - top);
  context.strokeStyle = "rgba(226,232,240,0.16)";
  context.beginPath();
  context.moveTo(x, top);
  context.lineTo(x, bottom);
  context.stroke();
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(203,213,225,0.24)";
  context.fillText("AUDIT", x + 6, top + 13);
}

function nearestCenter(x: number, y: number): 0 | 1 | 2 {
  const centers = [
    { x: 0.28, y: 0.65 },
    { x: 0.57, y: 0.30 },
    { x: 0.74, y: 0.63 },
  ] as const;
  let best: 0 | 1 | 2 = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  centers.forEach((center, index) => {
    const dx = x - center.x;
    const dy = y - center.y;
    const distance = dx * dx + dy * dy;
    if (distance < bestDistance) {
      bestDistance = distance;
      best = index as 0 | 1 | 2;
    }
  });
  return best;
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(width * 0.55, height * 0.52, Math.min(width, height) * 0.23, width * 0.55, height * 0.52, Math.max(width, height) * 0.78);
  vignette.addColorStop(0, "rgba(2,6,12,0)");
  vignette.addColorStop(1, "rgba(2,4,8,0.66)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}
