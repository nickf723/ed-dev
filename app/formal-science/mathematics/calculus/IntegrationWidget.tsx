import { useState } from "react";
import { AreaChart } from "lucide-react";

export default function IntegrationWidget() {
  const [rects, setRects] = useState(4); 
  const f = (x: number) => -(Math.pow(x - 2, 2)) + 5;
  const width = 300; const height = 150; const scaleX = width / 5; const scaleY = height / 6;
  const dx = 4 / rects;
  const totalArea = Array.from({length: rects}, (_, i) => f(i * dx) * dx).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full bg-neutral-900/60 border border-red-500/30 rounded-2xl p-6 backdrop-blur-md shadow-xl">
      <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-red-400">
              <AreaChart size={16} />
              <h3 className="text-xs font-bold uppercase tracking-widest">Riemann Sums</h3>
          </div>
          <div className="text-[10px] font-mono text-neutral-500">n = {rects}</div>
      </div>
      <div className="relative h-32 w-full bg-black/40 rounded-xl border border-white/5 overflow-hidden mb-4 flex items-end px-4">
          <svg className="absolute inset-0 w-full h-full overflow-visible">
             {Array.from({length: rects}).map((_, i) => (
                 <rect key={i} x={(i * dx) * scaleX} y={height - f(i * dx) * scaleY} width={dx * scaleX - 1} height={f(i * dx) * scaleY} fill="rgba(248, 113, 113, 0.2)" stroke="rgba(248, 113, 113, 0.5)" />
             ))}
             <path d={`M ${Array.from({length: 100}, (_, i) => { const x = (i / 100) * 5; return `${x * scaleX},${height - (f(x) * scaleY)}`; }).join(" L ")}`} fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
          </svg>
      </div>
      <input type="range" min="2" max="50" step="1" value={rects} onChange={(e) => setRects(parseInt(e.target.value))} className="w-full accent-red-500 h-1 bg-white/10 rounded appearance-none cursor-pointer" />
    </div>
  );
}