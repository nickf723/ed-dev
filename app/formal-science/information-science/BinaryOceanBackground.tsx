"use client";

import { useEffect, useRef } from "react";

type Packet = { lane: number; offset: number; bit: 0 | 1 };

const PACKETS: Packet[] = Array.from({ length: 72 }, (_, index) => ({
  lane: index % 9,
  offset: ((index * 37) % 97) / 97,
  bit: index % 3 === 0 || index % 7 === 0 ? 1 : 0,
}));

const RECORDS = [
  { code: "A17", title: "FIELD NOTE", tags: ["place", "date", "author"] },
  { code: "B04", title: "IMAGE SET", tags: ["subject", "rights", "format"] },
  { code: "C29", title: "DATA TABLE", tags: ["schema", "units", "source"] },
  { code: "D11", title: "ARTICLE", tags: ["title", "topic", "citation"] },
  { code: "E08", title: "AUDIO", tags: ["speaker", "language", "duration"] },
] as const;

export default function BinaryOceanBackground() {
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
      draw(43);
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
      drawGround(context, width, height);
      drawSignalSea(context, width, height, reducedMotion ? 43 : time);
      drawRepresentationGate(context, width, height);
      drawIndexShelves(context, width, height);
      drawQueryPath(context, width, height, reducedMotion ? 43 : time);
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
      <div className="absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-[#06111a]/92 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-[#06111a]/90 to-transparent" />
    </div>
  );
}

function drawGround(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#06111a");
  gradient.addColorStop(0.46, "#081826");
  gradient.addColorStop(1, "#0b1020");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(width * 0.58, height * 0.46, 0, width * 0.58, height * 0.46, Math.max(width, height) * 0.56);
  glow.addColorStop(0, "rgba(34,211,238,0.045)");
  glow.addColorStop(0.58, "rgba(99,102,241,0.014)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawSignalSea(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const left = width * 0.03;
  const right = width * (width < 900 ? 0.62 : 0.48);
  const top = height * 0.20;
  const bottom = height * 0.78;
  const seaWidth = right - left;
  const laneHeight = (bottom - top) / 9;

  context.font = `${width < 700 ? 9 : 11}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  context.textAlign = "center";

  for (let lane = 0; lane < 9; lane += 1) {
    const y = top + laneHeight * (lane + 0.5);
    const phase = lane * 0.7;
    context.strokeStyle = lane % 2 === 0 ? "rgba(34,211,238,0.075)" : "rgba(129,140,248,0.055)";
    context.lineWidth = 1;
    context.beginPath();
    for (let step = 0; step <= 60; step += 1) {
      const t = step / 60;
      const x = left + seaWidth * t;
      const waveY = y + Math.sin(t * Math.PI * 3 + phase) * laneHeight * 0.08;
      if (step === 0) context.moveTo(x, waveY);
      else context.lineTo(x, waveY);
    }
    context.stroke();
  }

  PACKETS.forEach((packet, index) => {
    const yBase = top + laneHeight * (packet.lane + 0.5);
    const drift = ((packet.offset + time * 0.006) % 1);
    const x = left + seaWidth * drift;
    const y = yBase + Math.sin(drift * Math.PI * 3 + packet.lane * 0.7) * laneHeight * 0.08;
    const alpha = 0.13 + ((index % 5) * 0.018);
    context.fillStyle = packet.bit === 1 ? `rgba(103,232,249,${alpha})` : `rgba(165,180,252,${alpha * 0.82})`;
    context.fillText(String(packet.bit), x, y + 3);
  });

  if (width >= 760) {
    context.textAlign = "left";
    context.fillStyle = "rgba(103,232,249,0.22)";
    context.fillText("RAW SIGNAL / ENCODED STREAM", left + 8, top - 18);
    context.fillStyle = "rgba(148,163,184,0.16)";
    context.fillText("symbols travel; meaning depends on representation + context", left + 8, top - 3);
  }
}

function drawRepresentationGate(context: CanvasRenderingContext2D, width: number, height: number) {
  const x = width * (width < 900 ? 0.64 : 0.50);
  const top = height * 0.22;
  const bottom = height * 0.76;
  const gateW = width < 700 ? 34 : 52;

  context.fillStyle = "rgba(6,17,26,0.46)";
  context.strokeStyle = "rgba(103,232,249,0.14)";
  context.fillRect(x - gateW / 2, top, gateW, bottom - top);
  context.strokeRect(x - gateW / 2, top, gateW, bottom - top);

  const slots = 8;
  for (let i = 0; i < slots; i += 1) {
    const y = top + ((i + 0.5) / slots) * (bottom - top);
    context.strokeStyle = i % 2 === 0 ? "rgba(103,232,249,0.18)" : "rgba(129,140,248,0.13)";
    context.beginPath();
    context.moveTo(x - gateW * 0.32, y);
    context.lineTo(x + gateW * 0.32, y);
    context.stroke();
  }

  context.save();
  context.translate(x, (top + bottom) / 2);
  context.rotate(-Math.PI / 2);
  context.textAlign = "center";
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(165,243,252,0.27)";
  context.fillText("REPRESENTATION / SCHEMA / METADATA", 0, 3);
  context.restore();
}

function drawIndexShelves(context: CanvasRenderingContext2D, width: number, height: number) {
  const left = width * (width < 900 ? 0.70 : 0.57);
  const right = width * 0.95;
  const top = height * 0.23;
  const shelfW = right - left;
  const recordH = Math.min(72, height * 0.075);

  if (width < 620) {
    context.strokeStyle = "rgba(103,232,249,0.08)";
    context.strokeRect(left, top, shelfW, height * 0.48);
    return;
  }

  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.textAlign = "left";
  RECORDS.forEach((record, index) => {
    const y = top + index * (recordH + 9);
    context.fillStyle = "rgba(7,14,25,0.34)";
    context.strokeStyle = index === 2 ? "rgba(103,232,249,0.20)" : "rgba(148,163,184,0.08)";
    context.fillRect(left, y, shelfW, recordH);
    context.strokeRect(left, y, shelfW, recordH);

    context.fillStyle = index === 2 ? "rgba(103,232,249,0.34)" : "rgba(165,180,252,0.20)";
    context.fillText(record.code, left + 10, y + 17);
    context.fillStyle = "rgba(226,232,240,0.24)";
    context.fillText(record.title, left + 48, y + 17);

    record.tags.forEach((tag, tagIndex) => {
      const tx = left + 10 + tagIndex * Math.min(92, shelfW * 0.24);
      context.fillStyle = "rgba(15,23,42,0.40)";
      context.strokeStyle = "rgba(103,232,249,0.075)";
      context.fillRect(tx, y + 29, Math.min(78, shelfW * 0.21), 20);
      context.strokeRect(tx, y + 29, Math.min(78, shelfW * 0.21), 20);
      context.fillStyle = "rgba(148,163,184,0.18)";
      context.fillText(tag, tx + 6, y + 43);
    });
  });

  context.fillStyle = "rgba(103,232,249,0.22)";
  context.fillText("INDEXED RECORDS / DESCRIPTIVE LAYERS", left + 6, top - 17);
}

function drawQueryPath(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const source = { x: width * 0.92, y: height * 0.16 };
  const gate = { x: width * (width < 900 ? 0.64 : 0.50), y: height * 0.43 };
  const target = { x: width * (width < 900 ? 0.77 : 0.66), y: height * 0.23 + 2 * (Math.min(72, height * 0.075) + 9) + 30 };

  context.strokeStyle = "rgba(251,191,36,0.08)";
  context.setLineDash([4, 9]);
  context.beginPath();
  context.moveTo(source.x, source.y);
  context.bezierCurveTo(width * 0.80, height * 0.18, gate.x + 90, gate.y - 80, gate.x, gate.y);
  context.bezierCurveTo(gate.x + 80, gate.y + 22, target.x - 40, target.y - 10, target.x, target.y);
  context.stroke();
  context.setLineDash([]);

  const t = (Math.sin(time * 0.035) + 1) / 2;
  const a = quadraticBezier(source, { x: width * 0.74, y: height * 0.20 }, gate, Math.min(1, t * 2));
  const b = quadraticBezier(gate, { x: gate.x + 130, y: target.y - 38 }, target, Math.max(0, t * 2 - 1));
  const point = t < 0.5 ? a : b;
  const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, 26);
  glow.addColorStop(0, "rgba(251,191,36,0.28)");
  glow.addColorStop(1, "rgba(251,191,36,0)");
  context.fillStyle = glow;
  context.beginPath();
  context.arc(point.x, point.y, 26, 0, Math.PI * 2);
  context.fill();

  if (width >= 760) {
    context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
    context.textAlign = "right";
    context.fillStyle = "rgba(253,230,138,0.22)";
    context.fillText("QUERY / RELEVANCE", source.x, source.y - 10);
  }
}

function quadraticBezier(a: { x: number; y: number }, c: { x: number; y: number }, b: { x: number; y: number }, t: number) {
  const u = 1 - t;
  return {
    x: u * u * a.x + 2 * u * t * c.x + t * t * b.x,
    y: u * u * a.y + 2 * u * t * c.y + t * t * b.y,
  };
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createRadialGradient(width * 0.56, height * 0.48, Math.min(width, height) * 0.18, width * 0.56, height * 0.48, Math.max(width, height) * 0.76);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.74, "rgba(3,7,18,0.14)");
  gradient.addColorStop(1, "rgba(3,7,18,0.62)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}
