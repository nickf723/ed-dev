"use client";

import { useState } from "react";
import { Circle, Disc3, Infinity, ScanLine, Waves } from "lucide-react";

type SurfaceId = "sphere" | "torus" | "double-torus" | "disk" | "annulus" | "mobius";

type Surface = {
  id: SurfaceId;
  label: string;
  family: string;
  genus: string;
  boundary: number;
  orientable: boolean;
  euler: string;
  invariant: string;
  rgb: string;
};

const SURFACES: readonly Surface[] = [
  { id: "sphere", label: "Sphere", family: "closed orientable", genus: "0", boundary: 0, orientable: true, euler: "χ = 2", invariant: "No handles and no boundary. A cube surface can be continuously deformed into the same topological type.", rgb: "34, 211, 238" },
  { id: "torus", label: "Torus", family: "closed orientable", genus: "1", boundary: 0, orientable: true, euler: "χ = 0", invariant: "One handle. Loops around the hole cannot be continuously shrunk to a point while staying on the surface.", rgb: "167, 139, 250" },
  { id: "double-torus", label: "Double torus", family: "closed orientable", genus: "2", boundary: 0, orientable: true, euler: "χ = −2", invariant: "Two handles. Increasing genus creates new independent ways for loops to wind around the surface.", rgb: "244, 114, 182" },
  { id: "disk", label: "Disk", family: "surface with boundary", genus: "0", boundary: 1, orientable: true, euler: "χ = 1", invariant: "No handles, but one boundary component. A disk is not homeomorphic to a sphere because boundary is preserved.", rgb: "52, 211, 153" },
  { id: "annulus", label: "Annulus", family: "surface with boundary", genus: "0", boundary: 2, orientable: true, euler: "χ = 0", invariant: "Two boundary components. Its central opening is not a torus handle; boundary and genus are different invariants.", rgb: "250, 204, 21" },
  { id: "mobius", label: "Möbius strip", family: "non-orientable", genus: "crosscap 1", boundary: 1, orientable: false, euler: "χ = 0", invariant: "One boundary component and no consistent global choice of clockwise versus counterclockwise orientation.", rgb: "251, 146, 60" },
];

export default function TopologyLab() {
  const [activeId, setActiveId] = useState<SurfaceId>("torus");
  const active = SURFACES.find((surface) => surface.id === activeId) ?? SURFACES[0];

  return (
    <section className="overflow-hidden rounded-[30px] border border-violet-200/[0.10] bg-[#07030e]/68 shadow-[0_28px_100px_rgba(0,0,0,0.30)] backdrop-blur-xl">
      <div className="grid gap-4 border-b border-white/[0.07] px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-violet-200/64"><ScanLine size={13} /> Surface passport</div>
          <h2 className="mt-2 text-[clamp(1.9rem,3.5vw,3.2rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Classify a surface by what deformation cannot erase.</h2>
        </div>
        <p className="text-[12px] leading-6 text-slate-400">Stretching and bending can destroy lengths and angles, but they cannot casually change connectedness, boundary structure, orientability, or the number of handles. Those durable properties become topological fingerprints.</p>
      </div>

      <div className="grid xl:grid-cols-[330px_minmax(0,1fr)]">
        <div className="border-b border-white/[0.07] p-4 xl:border-b-0 xl:border-r sm:p-5">
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {SURFACES.map((surface) => {
              const selected = surface.id === active.id;
              return (
                <button
                  key={surface.id}
                  type="button"
                  onClick={() => setActiveId(surface.id)}
                  className="group flex min-h-[62px] items-center gap-3 rounded-[16px] border px-3 py-2.5 text-left transition"
                  style={{ borderColor: selected ? `rgba(${surface.rgb},0.30)` : "rgba(255,255,255,0.06)", background: selected ? `rgba(${surface.rgb},0.065)` : "rgba(255,255,255,0.012)" }}
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${surface.rgb})`, boxShadow: selected ? `0 0 16px rgba(${surface.rgb},0.30)` : "none" }} />
                  <span className="min-w-0 flex-1"><strong className="block text-[11px] text-white/84">{surface.label}</strong><span className="mt-0.5 block font-mono text-[7px] uppercase tracking-[0.09em] text-slate-600">{surface.family}</span></span>
                  <span className="font-mono text-[8px]" style={{ color: `rgba(${surface.rgb},0.62)` }}>{surface.euler}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-6 lg:p-7">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-start">
            <div>
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: `rgba(${active.rgb},0.68)` }}>{active.family}</div>
              <h3 className="mt-1 text-[clamp(2rem,3.5vw,3.3rem)] font-semibold tracking-[-0.052em] text-white">{active.label}</h3>
              <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-400">{active.invariant}</p>

              <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                <PassportCell label="Genus / type" value={active.genus} rgb={active.rgb} />
                <PassportCell label="Boundary" value={String(active.boundary)} rgb={active.rgb} />
                <PassportCell label="Orientable" value={active.orientable ? "yes" : "no"} rgb={active.rgb} />
                <PassportCell label="Euler char." value={active.euler.replace("χ = ", "")} rgb={active.rgb} />
              </div>

              <div className="mt-6 rounded-[18px] border border-white/[0.06] bg-black/[0.13] p-4">
                <div className="flex items-center gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-600"><Waves size={12} /> Homeomorphism rule</div>
                <p className="mt-2 text-[11px] leading-5 text-slate-500">If two surfaces are homeomorphic, every topological invariant must agree. Matching a short passport does not prove homeomorphism by itself, but a mismatch immediately proves the surfaces are different topological types.</p>
              </div>
            </div>

            <SurfaceSketch surface={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PassportCell({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return (
    <div className="rounded-[14px] border px-3 py-3" style={{ borderColor: `rgba(${rgb},0.12)`, background: `rgba(${rgb},0.022)` }}>
      <div className="font-mono text-[7px] font-semibold uppercase tracking-[0.11em] text-slate-600">{label}</div>
      <strong className="mt-1 block font-mono text-[12px]" style={{ color: `rgba(${rgb},0.82)` }}>{value}</strong>
    </div>
  );
}

function SurfaceSketch({ surface }: { surface: Surface }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/[0.07] bg-black/[0.18] p-3">
      <svg viewBox="0 0 300 240" className="h-auto w-full" role="img" aria-label={`${surface.label} schematic`}>
        <defs><radialGradient id={`topology-glow-${surface.id}`}><stop offset="0%" stopColor={`rgba(${surface.rgb},0.16)`} /><stop offset="100%" stopColor="rgba(0,0,0,0)" /></radialGradient></defs>
        <rect width="300" height="240" rx="20" fill={`url(#topology-glow-${surface.id})`} />
        <g fill="none" stroke={`rgba(${surface.rgb},0.74)`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {surface.id === "sphere" ? <SphereSketch /> : null}
          {surface.id === "torus" ? <TorusSketch /> : null}
          {surface.id === "double-torus" ? <DoubleTorusSketch /> : null}
          {surface.id === "disk" ? <DiskSketch /> : null}
          {surface.id === "annulus" ? <AnnulusSketch /> : null}
          {surface.id === "mobius" ? <MobiusSketch /> : null}
        </g>
      </svg>
      <div className="border-t border-white/[0.05] px-2 py-2 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">schematic only · topology ignores rigid shape</div>
    </div>
  );
}

function SphereSketch() { return <><circle cx="150" cy="118" r="74" /><ellipse cx="150" cy="118" rx="74" ry="24" opacity="0.45" /><path d="M150 44 C119 78 119 158 150 192 C181 158 181 78 150 44" opacity="0.45" /></>; }
function TorusSketch() { return <><ellipse cx="150" cy="120" rx="92" ry="58" /><ellipse cx="150" cy="120" rx="38" ry="20" /><path d="M60 120 C92 82 208 82 240 120" opacity="0.35" /><path d="M60 120 C92 158 208 158 240 120" opacity="0.35" /></>; }
function DoubleTorusSketch() { return <><path d="M38 122 C58 55 126 61 150 112 C174 61 242 55 262 122 C242 189 174 183 150 132 C126 183 58 189 38 122 Z" /><ellipse cx="96" cy="122" rx="24" ry="14" /><ellipse cx="204" cy="122" rx="24" ry="14" /></>; }
function DiskSketch() { return <><circle cx="150" cy="120" r="76" fill="rgba(255,255,255,0.025)" /><circle cx="150" cy="120" r="4" fill="currentColor" stroke="none" /></>; }
function AnnulusSketch() { return <><circle cx="150" cy="120" r="80" /><circle cx="150" cy="120" r="36" /><path d="M70 120 H114 M186 120 H230" opacity="0.35" /></>; }
function MobiusSketch() { return <><path d="M62 136 C90 54 210 54 238 136 C210 190 90 190 62 136 Z" /><path d="M78 110 C116 164 184 164 222 110" opacity="0.55" /><path d="M78 162 C116 108 184 108 222 162" opacity="0.55" /></>; }
