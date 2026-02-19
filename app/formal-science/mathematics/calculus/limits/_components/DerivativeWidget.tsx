import { useState } from "react";
import { Spline } from "lucide-react";

export default function DerivativeWidget() {
  const [xVal, setXVal] = useState(2); 
  const f = (x: number) => 0.2 * x * x;
  const df = (x: number) => 0.4 * x;
  const width = 300; const height = 150; const scale = 30; 
  const originX = width / 2; const originY = height - 20;
  const currentX = xVal; const currentY = -f(currentX); const slope = -df(currentX);   
  const x1 = currentX - 3; const y1 = currentY - 3 * slope;
  const x2 = currentX + 3; const y2 = currentY + 3 * slope;

  return (
    <div className="w-full bg-neutral-900/60 border border-red-500/30 rounded-2xl p-6 backdrop-blur-md shadow-xl">
      <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-red-400">
              <Spline size={16} />
              <h3 className="text-xs font-bold uppercase tracking-widest">Slope Visualizer</h3>
          </div>
          <div className="text-[10px] font-mono text-neutral-500">f(x) = 0.2x²</div>
      </div>
      <div className="relative h-32 w-full bg-black/40 rounded-xl border border-white/5 overflow-hidden mb-4">
          <svg className="absolute inset-0 w-full h-full overflow-visible">
              <line x1="0" y1={originY} x2={width} y2={originY} stroke="#333" strokeWidth="1" />
              <line x1={originX} y1="0" x2={originX} y2={height} stroke="#333" strokeWidth="1" />
              <path d={`M ${Array.from({length: width}, (_, i) => {
                    const x = (i - originX) / scale; return `${i},${-f(x) * scale + originY}`;
                }).join(" L ")}`} fill="none" stroke="#525252" strokeWidth="2" />
              <line x1={x1 * scale + originX} y1={y1 * scale + originY} x2={x2 * scale + originX} y2={y2 * scale + originY} stroke="#f87171" strokeWidth="2" />
              <circle cx={currentX * scale + originX} cy={currentY * scale + originY} r="4" fill="white" />
          </svg>
      </div>
      <div className="flex items-center gap-4">
          <input type="range" min="-4" max="4" step="0.1" value={xVal} onChange={(e) => setXVal(parseFloat(e.target.value))} className="w-full accent-red-500 h-1 bg-white/10 rounded appearance-none cursor-pointer" />
          <div className="text-xs font-mono text-red-300 w-16 text-right">m = {df(xVal).toFixed(1)}</div>
      </div>
    </div>
  );
}