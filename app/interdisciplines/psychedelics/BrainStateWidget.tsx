"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, Network } from "lucide-react";

const NETWORK_COLORS = ["#f87171", "#60a5fa", "#4ade80"] as const;

export default function BrainStateWidget() {
  const [mixing, setMixing] = useState(38);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = 84;
    const nodes = Array.from({ length: 12 }, (_, index) => {
      const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        group: index % 3,
      };
    });

    ctx.clearRect(0, 0, w, h);
    const crossWeight = mixing / 100;
    const withinWeight = 1 - crossWeight * 0.55;

    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (i >= j) return;
        const sameGroup = a.group === b.group;
        const visible = sameGroup ? ((i + j) % 2 === 0 || withinWeight > 0.65) : ((i * 7 + j * 3) % 10) / 10 < crossWeight;
        if (!visible) return;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineWidth = sameGroup ? 1.5 : 1;
        ctx.strokeStyle = sameGroup
          ? `rgba(226,232,240,${0.10 + withinWeight * 0.18})`
          : `rgba(217,70,239,${0.08 + crossWeight * 0.34})`;
        ctx.stroke();
      });
    });

    nodes.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = NETWORK_COLORS[node.group];
      ctx.fill();
      ctx.beginPath();
      ctx.arc(node.x, node.y, 9, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.stroke();
    });
  }, [mixing]);

  const withinLabel = mixing < 35 ? "strong" : mixing < 70 ? "moderate" : "weaker";
  const crossLabel = mixing < 35 ? "limited" : mixing < 70 ? "moderate" : "strong";

  return (
    <section className="overflow-hidden rounded-[24px] border border-fuchsia-100/[0.10] bg-[#100815]/66 backdrop-blur-xl">
      <div className="grid gap-3 border-b border-white/[0.07] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-fuchsia-200/68"><Brain size={13} /> Network organization model</div>
          <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">What changes when a network becomes less segregated?</h3>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.07em] text-slate-500">toy graph · not brain telemetry</span>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[280px_minmax(0,1fr)] sm:p-5">
        <div className="relative mx-auto flex h-[260px] w-full max-w-[280px] items-center justify-center rounded-[22px] border border-white/[0.07] bg-black/[0.20]">
          <canvas ref={canvasRef} width={260} height={260} className="h-[260px] w-[260px]" aria-label="Toy graph with three networks and adjustable cross-network connections" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="rounded-full border border-white/[0.07] bg-black/55 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-400 backdrop-blur-sm">network graph</span>
          </div>
        </div>

        <div>
          <label className="block rounded-[18px] border border-white/[0.07] bg-black/[0.14] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-[13px] font-semibold text-white"><Network size={15} className="text-fuchsia-200" /> Cross-network mixing</span>
              <span className="font-mono text-[12px] text-fuchsia-100">{mixing}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={mixing}
              onChange={(event) => setMixing(Number(event.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-fuchsia-400"
              aria-label="Cross-network mixing in toy graph"
            />
            <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.05em] text-slate-500"><span>more segregated</span><span>more mixed</span></div>
          </label>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Readout label="Within-network emphasis" value={withinLabel} rgb="96,165,250" />
            <Readout label="Cross-network emphasis" value={crossLabel} rgb="217,70,239" />
          </div>

          <div className="mt-4 border-l-2 border-fuchsia-300/32 pl-3">
            <strong className="text-[12px] text-fuchsia-100/80">Model boundary</strong>
            <p className="mt-2 text-[12px] leading-6 text-slate-400">This slider only changes a graph. It does not simulate a sober brain, a psychedelic state, the default mode network, or a particular compound. Human neuroimaging research measures several kinds of connectivity and network organization, and translating those measurements into subjective experience remains an active research problem.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[15px] border border-white/[0.06] bg-black/[0.14] p-3"><div className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-500">{label}</div><strong className="mt-1 block text-[14px] capitalize" style={{ color: `rgba(${rgb},0.84)` }}>{value}</strong></div>;
}
