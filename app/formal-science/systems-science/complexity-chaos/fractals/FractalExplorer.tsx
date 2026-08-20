"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MousePointer2, Snowflake } from "lucide-react";

const SIZE = 220;
const MAX_ITER = 72;
const X_MIN = -2.2;
const X_MAX = 0.8;
const Y_MIN = -1.5;
const Y_MAX = 1.5;

export default function FractalExplorer() {
  const mandelbrotRef = useRef<HTMLCanvasElement>(null);
  const juliaRef = useRef<HTMLCanvasElement>(null);
  const [c, setC] = useState({ real: -0.745, imag: 0.113 });

  useEffect(() => {
    const canvas = mandelbrotRef.current;
    if (!canvas) return;
    renderMandelbrot(canvas);
  }, []);

  useEffect(() => {
    const canvas = juliaRef.current;
    if (!canvas) return;
    renderJulia(canvas, c.real, c.imag);
  }, [c]);

  const membership = useMemo(() => escapes(0, 0, c.real, c.imag, MAX_ITER) === MAX_ITER, [c]);
  const dotLeft = ((c.real - X_MIN) / (X_MAX - X_MIN)) * 100;
  const dotTop = ((Y_MAX - c.imag) / (Y_MAX - Y_MIN)) * 100;

  function chooseFromPlane(event: React.MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;
    setC({
      real: X_MIN + nx * (X_MAX - X_MIN),
      imag: Y_MAX - ny * (Y_MAX - Y_MIN),
    });
  }

  return (
    <section className="overflow-hidden rounded-[24px] border border-blue-100/[0.10] bg-[#060913]/72 backdrop-blur-xl">
      <div className="grid gap-3 border-b border-white/[0.07] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-blue-200/68"><Snowflake size={13} /> Quadratic iteration explorer</div>
          <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">Choose c in parameter space. Watch one Julia set change.</h3>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-500">zₙ₊₁ = zₙ² + c</span>
      </div>

      <div className="grid gap-5 p-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_280px] sm:p-5">
        <div>
          <div className="mb-2 flex items-center justify-between gap-3"><strong className="text-[13px] text-white">Mandelbrot parameter plane</strong><span className="font-mono text-[9px] text-slate-500">vary c · start z₀ = 0</span></div>
          <button type="button" onClick={chooseFromPlane} className="relative block w-full overflow-hidden rounded-[18px] border border-white/[0.07] bg-black/[0.20] text-left" aria-label="Choose a complex parameter c from the Mandelbrot plane">
            <canvas ref={mandelbrotRef} width={SIZE} height={SIZE} className="aspect-square h-auto w-full [image-rendering:auto]" />
            <span className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-fuchsia-400 shadow-[0_0_14px_rgba(217,70,239,0.75)]" style={{ left: `${Math.max(0, Math.min(100, dotLeft))}%`, top: `${Math.max(0, Math.min(100, dotTop))}%` }} />
            <span className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-black/55 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.05em] text-white/60 backdrop-blur-sm"><MousePointer2 size={10} /> click parameter</span>
          </button>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3"><strong className="text-[13px] text-white">Julia set for selected c</strong><span className="font-mono text-[9px] text-slate-500">fix c · vary z₀</span></div>
          <div className="relative overflow-hidden rounded-[18px] border border-white/[0.07] bg-black/[0.20]">
            <canvas ref={juliaRef} width={SIZE} height={SIZE} className="aspect-square h-auto w-full [image-rendering:auto]" />
            <div className="absolute bottom-2 right-2 rounded-full border border-white/[0.07] bg-black/55 px-2.5 py-1.5 font-mono text-[9px] text-white/65 backdrop-blur-sm">c = {c.real.toFixed(3)} {c.imag >= 0 ? "+" : "−"} {Math.abs(c.imag).toFixed(3)}i</div>
          </div>
        </div>

        <aside className="xl:sticky xl:top-[172px] xl:self-start">
          <div className="rounded-[17px] border border-white/[0.07] bg-black/[0.12] p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-500">Selected parameter</div>
            <strong className="mt-2 block font-mono text-[16px] text-blue-100/86">{c.real.toFixed(4)} {c.imag >= 0 ? "+" : "−"} {Math.abs(c.imag).toFixed(4)}i</strong>
            <span className={`mt-2 inline-block rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.05em] ${membership ? "border-emerald-300/[0.16] text-emerald-300" : "border-amber-300/[0.16] text-amber-300"}`}>{membership ? "c appears inside M" : "critical orbit escapes"}</span>
          </div>

          <Control label="Re(c)" value={c.real} min={X_MIN} max={X_MAX} step={0.005} onChange={(real) => setC((current) => ({ ...current, real }))} />
          <Control label="Im(c)" value={c.imag} min={Y_MIN} max={Y_MAX} step={0.005} onChange={(imag) => setC((current) => ({ ...current, imag }))} />

          <div className="mt-4 border-l-2 border-blue-300/30 pl-3">
            <strong className="text-[11px] text-blue-100/80">Same iteration, different question</strong>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">The Mandelbrot set marks c values for which the critical orbit starting at z₀ = 0 remains bounded under this quadratic iteration. A Julia set instead fixes c and asks which starting z₀ values remain bounded.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Control({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void }) {
  return <label className="mt-3 block rounded-[14px] border border-white/[0.06] bg-black/[0.10] p-3"><div className="flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.05em] text-slate-500"><span>{label}</span><span className="text-blue-100/72">{value.toFixed(3)}</span></div><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-blue-400" aria-label={label} /></label>;
}

function renderMandelbrot(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const image = ctx.createImageData(SIZE, SIZE);
  for (let py = 0; py < SIZE; py++) {
    const imag = Y_MAX - (py / (SIZE - 1)) * (Y_MAX - Y_MIN);
    for (let px = 0; px < SIZE; px++) {
      const real = X_MIN + (px / (SIZE - 1)) * (X_MAX - X_MIN);
      const iter = escapes(0, 0, real, imag, MAX_ITER);
      paint(image.data, (py * SIZE + px) * 4, iter, MAX_ITER, "blue");
    }
  }
  ctx.putImageData(image, 0, 0);
}

function renderJulia(canvas: HTMLCanvasElement, cReal: number, cImag: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const image = ctx.createImageData(SIZE, SIZE);
  for (let py = 0; py < SIZE; py++) {
    const imag = 1.6 - (py / (SIZE - 1)) * 3.2;
    for (let px = 0; px < SIZE; px++) {
      const real = -1.6 + (px / (SIZE - 1)) * 3.2;
      const iter = escapes(real, imag, cReal, cImag, MAX_ITER);
      paint(image.data, (py * SIZE + px) * 4, iter, MAX_ITER, "violet");
    }
  }
  ctx.putImageData(image, 0, 0);
}

function escapes(zReal: number, zImag: number, cReal: number, cImag: number, maxIter: number) {
  let zr = zReal;
  let zi = zImag;
  for (let iter = 0; iter < maxIter; iter++) {
    if (zr * zr + zi * zi > 4) return iter;
    const nextReal = zr * zr - zi * zi + cReal;
    zi = 2 * zr * zi + cImag;
    zr = nextReal;
  }
  return maxIter;
}

function paint(data: Uint8ClampedArray, index: number, iter: number, maxIter: number, palette: "blue" | "violet") {
  if (iter === maxIter) {
    data[index] = 4;
    data[index + 1] = 7;
    data[index + 2] = 12;
    data[index + 3] = 255;
    return;
  }
  const t = iter / maxIter;
  if (palette === "blue") {
    data[index] = 24 + Math.round(55 * t);
    data[index + 1] = 70 + Math.round(145 * t);
    data[index + 2] = 105 + Math.round(150 * t);
  } else {
    data[index] = 65 + Math.round(165 * t);
    data[index + 1] = 35 + Math.round(95 * t);
    data[index + 2] = 95 + Math.round(155 * t);
  }
  data[index + 3] = 255;
}
