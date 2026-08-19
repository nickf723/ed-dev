"use client";

const POINTS = Array.from({ length: 81 }, (_, index) => ({
  x: (index % 9) * 12.5,
  y: Math.floor(index / 9) * 12.5,
  accent: (index * 7 + 3) % 11 === 0,
}));

export default function DiophantineBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#07050a]">
      <div className="absolute -left-[10%] top-[-15%] h-[58vw] w-[58vw] rounded-full bg-rose-900/[0.10] blur-[150px]" />
      <div className="absolute -bottom-[20%] -right-[10%] h-[52vw] w-[52vw] rounded-full bg-amber-900/[0.08] blur-[150px]" />

      <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(251,113,133,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(251,113,133,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute inset-[6%] opacity-25">
        {POINTS.map((point, index) => (
          <span
            key={index}
            className={`absolute h-1.5 w-1.5 rounded-full ${point.accent ? "bg-amber-200/45 shadow-[0_0_10px_rgba(251,191,36,0.18)]" : "bg-rose-200/16"}`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          />
        ))}
      </div>

      <div className="absolute left-[10%] top-[22%] select-none font-serif text-[10vw] italic text-rose-200/[0.018]">
        ax + by = c
      </div>
      <div className="absolute bottom-[10%] right-[8%] select-none font-mono text-[7vw] text-amber-200/[0.015]">
        (x,y) ∈ ℤ²
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,5,10,0.42)_58%,rgba(7,5,10,0.95)_100%)]" />
    </div>
  );
}
