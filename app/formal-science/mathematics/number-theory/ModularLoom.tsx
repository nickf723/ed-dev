"use client";

import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

function gcd(a: number, b: number) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) [x, y] = [y, x % y];
  return x;
}

function mod(value: number, modulus: number) {
  return ((value % modulus) + modulus) % modulus;
}

function inverse(value: number, modulus: number) {
  for (let candidate = 1; candidate < modulus; candidate += 1) {
    if (mod(value * candidate, modulus) === 1) return candidate;
  }
  return null;
}

export default function ModularLoom() {
  const [modulus, setModulus] = useState(7);
  const [multiplier, setMultiplier] = useState(3);
  const [left, setLeft] = useState(17);
  const [right, setRight] = useState(29);

  const units = useMemo(() => Array.from({ length: modulus }, (_, value) => value).filter((value) => gcd(value, modulus) === 1), [modulus]);
  const multiplierResidue = mod(multiplier, modulus);
  const multiplierInverse = inverse(multiplierResidue, modulus);
  const permutation = gcd(multiplierResidue, modulus) === 1;
  const size = 320;
  const center = 160;
  const radius = 112;
  const nodes = Array.from({ length: modulus }, (_, value) => {
    const theta = -Math.PI / 2 + (value / modulus) * Math.PI * 2;
    return { value, x: center + Math.cos(theta) * radius, y: center + Math.sin(theta) * radius };
  });

  return (
    <section className="overflow-hidden rounded-[30px] border border-violet-200/[0.10] bg-[#0a0717]/74 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-4 sm:px-5">
        <div><div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/66">Residue-class loom</div><p className="mt-1 text-[10px] text-slate-600">Multiplication modulo n becomes a map among finitely many residue classes.</p></div>
        <button type="button" onClick={() => { setModulus(7); setMultiplier(3); setLeft(17); setRight(29); }} className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.018] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-300"><RefreshCw size={11} /> reset</button>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[330px_minmax(0,1fr)]">
        <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.13] p-4">
          <Control label="Modulus n" value={modulus} min={2} max={16} onChange={(value) => { setModulus(value); setMultiplier((current) => Math.min(current, value - 1)); }} rgb="167, 139, 250" />
          <div className="mt-5"><Control label="Multiplier a" value={multiplier} min={1} max={Math.max(1, modulus - 1)} onChange={setMultiplier} rgb="45, 212, 191" /></div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Metric label="gcd(a,n)" value={String(gcd(multiplierResidue, modulus))} rgb="250, 204, 21" />
            <Metric label="Euler φ(n)" value={String(units.length)} rgb="244, 114, 182" />
          </div>
          <div className="mt-4 rounded-[15px] border border-white/[0.06] bg-white/[0.012] p-3 text-[9px] leading-4 text-slate-600">
            {permutation ? `Multiplication by ${multiplierResidue} permutes all residue classes because gcd(${multiplierResidue}, ${modulus}) = 1. Its inverse is ${multiplierInverse} mod ${modulus}.` : `Multiplication by ${multiplierResidue} collapses different residue classes together because gcd(${multiplierResidue}, ${modulus}) > 1, so no multiplicative inverse exists.`}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(300px,0.95fr)_minmax(280px,1.05fr)]">
          <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.13] p-3">
            <svg viewBox={`0 0 ${size} ${size}`} className="h-auto w-full" role="img" aria-label={`Multiplication by ${multiplierResidue} modulo ${modulus}`}>
              <defs>
                <marker id="residue-arrow" viewBox="0 0 8 8" refX="6.3" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="rgba(167,139,250,0.50)" /></marker>
              </defs>
              <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" />
              {nodes.map((source) => {
                const targetValue = mod(source.value * multiplierResidue, modulus);
                const target = nodes[targetValue];
                if (source.value === targetValue) return <circle key={`loop-${source.value}`} cx={source.x} cy={source.y} r="21" fill="none" stroke="rgba(167,139,250,0.18)" strokeWidth="1.5" />;
                return <line key={`edge-${source.value}`} x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke="rgba(167,139,250,0.22)" strokeWidth="1.4" markerEnd="url(#residue-arrow)" />;
              })}
              {nodes.map((node) => <g key={node.value}><circle cx={node.x} cy={node.y} r="15" fill={units.includes(node.value) ? "rgba(45,212,191,0.12)" : "rgba(255,255,255,0.035)"} stroke={units.includes(node.value) ? "rgba(45,212,191,0.34)" : "rgba(255,255,255,0.10)"} /><text x={node.x} y={node.y + 3} textAnchor="middle" fill={units.includes(node.value) ? "rgba(153,246,228,0.82)" : "rgba(148,163,184,0.62)"} fontSize="9" fontFamily="monospace">{node.value}</text></g>)}
              <text x={center} y={center - 4} textAnchor="middle" fill="rgba(196,181,253,0.70)" fontSize="10" fontFamily="monospace">x ↦ {multiplierResidue}x</text>
              <text x={center} y={center + 12} textAnchor="middle" fill="rgba(100,116,139,0.68)" fontSize="8" fontFamily="monospace">mod {modulus}</text>
            </svg>
            <div className="border-t border-white/[0.05] px-2 pt-2 font-mono text-[7px] uppercase tracking-[0.08em] text-slate-700">green residues are units · arrows show multiplication by a</div>
          </div>

          <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.13] p-4">
            <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-600">Congruence calculator</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <NumberInput label="x" value={left} onChange={setLeft} />
              <NumberInput label="y" value={right} onChange={setRight} />
            </div>
            <div className="mt-4 grid gap-2">
              <Operation label="x mod n" expression={`${left} ≡ ${mod(left, modulus)} (mod ${modulus})`} />
              <Operation label="y mod n" expression={`${right} ≡ ${mod(right, modulus)} (mod ${modulus})`} />
              <Operation label="addition" expression={`${left} + ${right} ≡ ${mod(left + right, modulus)} (mod ${modulus})`} />
              <Operation label="multiplication" expression={`${left}·${right} ≡ ${mod(left * right, modulus)} (mod ${modulus})`} />
            </div>
            <p className="mt-4 border-t border-white/[0.055] pt-3 text-[9px] leading-4 text-slate-700">Congruence modulo n is compatible with addition and multiplication: values can be replaced by congruent representatives without changing the residue of a sum or product.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Control({ label, value, min, max, onChange, rgb }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void; rgb: string }) {
  return <div><div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">{label}</span><strong className="font-mono text-[11px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</strong></div><input aria-label={label} type="range" min={min} max={max} step="1" value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-violet-400" /></div>;
}

function Metric({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[14px] border px-3 py-3" style={{ borderColor: `rgba(${rgb},0.12)`, background: `rgba(${rgb},0.022)` }}><div className="font-mono text-[7px] uppercase tracking-[0.08em] text-slate-700">{label}</div><strong className="mt-1 block font-mono text-[15px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</strong></div>;
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label className="rounded-[14px] border border-white/[0.07] bg-black/[0.12] p-3"><span className="font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">{label}</span><input type="number" value={value} onChange={(event) => onChange(Math.max(-9999, Math.min(9999, Number(event.target.value) || 0)))} className="mt-1 w-full bg-transparent font-mono text-[15px] text-white/80 outline-none" /></label>;
}

function Operation({ label, expression }: { label: string; expression: string }) {
  return <div className="rounded-[13px] border border-white/[0.055] bg-white/[0.012] px-3 py-2.5"><div className="font-mono text-[6px] uppercase tracking-[0.09em] text-slate-800">{label}</div><div className="mt-1 font-mono text-[9px] text-violet-100/68">{expression}</div></div>;
}
