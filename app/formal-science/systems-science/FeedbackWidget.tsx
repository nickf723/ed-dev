"use client";

import { useMemo, useState } from "react";
import { Activity, ArrowRight, Gauge, RefreshCcw, TrendingUp } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type LoopKey = "reinforcing" | "balancing";

const WIDTH = 100;
const HEIGHT = 54;

export default function FeedbackWidget() {
  const [loop, setLoop] = useState<LoopKey>("balancing");
  const [strength, setStrength] = useState(22);
  const [target, setTarget] = useState(70);
  const [delay, setDelay] = useState(2);

  const series = useMemo(() => simulate(loop, strength / 100, target, delay), [loop, strength, target, delay]);
  const last = series[series.length - 1];
  const path = series.map((value, index) => `${(index / (series.length - 1)) * WIDTH},${HEIGHT - (Math.max(0, Math.min(120, value)) / 120) * HEIGHT}`).join(" L ");

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-rose-100/[0.12]" style={{ background: "rgba(15,8,11,0.24)" }}>
      <div className="grid border-b border-rose-100/[0.08] lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-rose-200/60"><Activity size={14} /> Feedback bench · discrete teaching model</div>
          <h3 className="mt-2 text-[clamp(1.7rem,2.8vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Does the loop amplify deviation or push state back toward a reference?</h3>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400/72">Compare one reinforcing recurrence with one balancing controller. They are intentionally simple so the sign of the feedback is visible. Real systems can contain several loops, nonlinear responses, changing targets, saturation, noise, and delays at the same time.</p>
        </div>
        <div className="border-t border-rose-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[12px] lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">Selected loop</span>
          <strong className="mt-2 flex items-center gap-2 text-[17px] text-white">{loop === "reinforcing" ? <TrendingUp size={17} className="text-orange-300" /> : <RefreshCcw size={17} className="text-emerald-300" />}{loop === "reinforcing" ? "Reinforcing" : "Balancing"}</strong>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">{loop === "reinforcing" ? "Current state influences change in the same direction." : "Difference from a reference influences change that reduces the difference."}</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 xl:grid-cols-[270px_minmax(0,1fr)] sm:p-5">
        <div>
          <div className="grid grid-cols-2 gap-2">
            <LoopButton selected={loop === "reinforcing"} onClick={() => setLoop("reinforcing")} label="Reinforcing" symbol="R" rgb="251,146,60" />
            <LoopButton selected={loop === "balancing"} onClick={() => setLoop("balancing")} label="Balancing" symbol="B" rgb="52,211,153" />
          </div>
          <div className="mt-5 space-y-5 border-t border-white/[0.07] pt-5">
            <Control label={loop === "reinforcing" ? "Growth strength" : "Correction gain"} value={strength} min={4} max={45} suffix="%" onChange={setStrength} />
            {loop === "balancing" ? <Control label="Reference level" value={target} min={30} max={100} suffix="" onChange={setTarget} /> : null}
            <Control label="Response delay" value={delay} min={0} max={6} suffix=" steps" onChange={setDelay} />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_270px]">
          <div className="relative min-h-[310px] overflow-hidden border border-white/[0.07] bg-black/[0.07] p-4 backdrop-blur-[10px]">
            <div className="flex items-center justify-between gap-3"><span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">State over 24 updates</span><span className="font-mono text-[12px] text-white/72">x₍₂₄₎ = {last.toFixed(1)}</span></div>
            <div className="relative mt-4 h-[230px] border-l border-b border-white/[0.10]">
              {[25, 50, 75, 100].map((mark) => <div key={mark} className="absolute inset-x-0 border-t border-white/[0.045]" style={{ bottom: `${(mark / 120) * 100}%` }}><span className="absolute -left-8 -top-2 font-mono text-[10px] text-slate-600">{mark}</span></div>)}
              {loop === "balancing" ? <div className="absolute inset-x-0 border-t border-dashed border-emerald-300/24" style={{ bottom: `${(target / 120) * 100}%` }}><span className="absolute right-1 -top-4 font-mono text-[10px] text-emerald-200/48">reference {target}</span></div> : null}
              <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none"><path d={`M ${path}`} fill="none" stroke={loop === "reinforcing" ? "rgba(251,146,60,0.75)" : "rgba(52,211,153,0.75)"} strokeWidth="1" vectorEffect="non-scaling-stroke" /></svg>
            </div>
          </div>

          <div className="space-y-3">
            <Formula title="Update rule" rgb={loop === "reinforcing" ? "251,146,60" : "52,211,153"}>{loop === "reinforcing" ? "x(t+1) = x(t) + g·x(t−τ)" : "x(t+1) = x(t) + k·[r − x(t−τ)]"}</Formula>
            <Formula title="What the delay changes" rgb="251,191,36">{delay === 0 ? "Response uses the current observed state." : `Response uses state from ${delay} update${delay === 1 ? "" : "s"} earlier.`}</Formula>
            <Formula title="Interpretation" rgb="192,132,252">{loop === "reinforcing" ? "Positive feedback can drive growth or decline away from the current level. It does not mean the outcome is beneficial." : delay >= 4 && strength >= 28 ? "Strong delayed correction can overshoot and oscillate rather than settle smoothly." : "Negative feedback can reduce deviation from a reference. It does not guarantee perfect stability."}</Formula>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function simulate(loop: LoopKey, strength: number, target: number, delay: number) {
  const values = [25];
  for (let step = 0; step < 24; step += 1) {
    const current = values[values.length - 1];
    const delayedIndex = Math.max(0, values.length - 1 - delay);
    const delayed = values[delayedIndex];
    const next = loop === "reinforcing" ? current + strength * delayed : current + strength * (target - delayed);
    values.push(Math.max(-20, Math.min(140, next)));
  }
  return values;
}

function LoopButton({ selected, onClick, label, symbol, rgb }: { selected: boolean; onClick: () => void; label: string; symbol: string; rgb: string }) {
  return <button type="button" onClick={onClick} className="border px-3 py-3 text-left transition" style={{ borderColor: selected ? `rgba(${rgb},0.35)` : "rgba(255,255,255,0.07)", background: selected ? `rgba(${rgb},0.07)` : "rgba(0,0,0,0.055)" }}><span className="flex h-8 w-8 items-center justify-center rounded-full border font-serif text-[14px]" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.28)` }}>{symbol}</span><strong className="mt-2 block text-[12px] text-white/84">{label}</strong></button>;
}

function Control({ label, value, min, max, suffix, onChange }: { label: string; value: number; min: number; max: number; suffix: string; onChange: (value: number) => void }) {
  return <label className="block"><span className="flex items-center justify-between gap-3 text-[12px] text-slate-400"><span>{label}</span><strong className="font-mono text-rose-200/72">{value}{suffix}</strong></span><input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-2 w-full accent-rose-400" /></label>;
}

function Formula({ title, rgb, children }: { title: string; rgb: string; children: React.ReactNode }) {
  return <div className="border-l-2 bg-black/[0.055] px-3 py-3" style={{ borderColor: `rgba(${rgb},0.35)` }}><span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.07em] text-slate-600"><Gauge size={12} /> {title}</span><p className="mt-2 text-[12px] leading-5 text-slate-400/76">{children}</p></div>;
}
