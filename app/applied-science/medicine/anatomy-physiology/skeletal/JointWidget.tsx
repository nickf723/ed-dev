"use client";

import { useState } from "react";
import { CircleDot, MoveHorizontal, Move3D, RotateCw, Settings, type LucideIcon } from "lucide-react";

const JOINTS: readonly {
  id: string;
  name: string;
  examples: string;
  motion: string;
  axes: string;
  constraint: string;
  icon: LucideIcon;
  rgb: string;
}[] = [
  {
    id: "hinge",
    name: "Hinge",
    examples: "elbow · interphalangeal joints · knee (modified hinge)",
    motion: "primarily flexion ↔ extension",
    axes: "mostly one rotational axis",
    constraint: "Bony geometry, capsule, ligaments, and surrounding muscle strongly constrain side-to-side motion.",
    icon: MoveHorizontal,
    rgb: "251,191,36",
  },
  {
    id: "ball",
    name: "Ball & socket",
    examples: "shoulder · hip",
    motion: "flex/extend · abduct/adduct · rotate · circumduct",
    axes: "three rotational axes",
    constraint: "The shoulder favors mobility; the hip gains more stability from a deeper socket and strong surrounding structures.",
    icon: Move3D,
    rgb: "34,211,238",
  },
  {
    id: "pivot",
    name: "Pivot",
    examples: "atlanto-axial joint · proximal radioulnar joint",
    motion: "rotation around a longitudinal axis",
    axes: "one rotational axis",
    constraint: "A ring-and-axis arrangement permits rotation while limiting translation and other angular motions.",
    icon: RotateCw,
    rgb: "167,139,250",
  },
  {
    id: "plane",
    name: "Plane / gliding",
    examples: "intercarpal joints · some vertebral facet joints",
    motion: "small gliding translations between surfaces",
    axes: "nonaxial or limited multiaxial glide",
    constraint: "Small individual motions can combine across several joints into useful regional flexibility.",
    icon: CircleDot,
    rgb: "94,234,212",
  },
] as const;

export default function JointWidget() {
  const [activeId, setActiveId] = useState(JOINTS[0].id);
  const active = JOINTS.find((joint) => joint.id === activeId) ?? JOINTS[0];
  const ActiveIcon = active.icon;

  return (
    <section className="overflow-hidden rounded-[24px] border border-amber-100/[0.10] bg-[#0d0b0a]/68 backdrop-blur-xl">
      <div className="grid gap-3 border-b border-white/[0.07] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/68"><Settings size={13} /> Synovial joint lab</div>
          <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">Joint shape permits some motions and constrains others.</h3>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.07em] text-stone-500">motion ≠ unlimited motion</span>
      </div>

      <div className="grid lg:grid-cols-[210px_minmax(0,1fr)]">
        <div className="grid grid-cols-2 gap-2 border-b border-white/[0.07] p-3 lg:grid-cols-1 lg:border-b-0 lg:border-r">
          {JOINTS.map((joint) => {
            const Icon = joint.icon;
            const selected = joint.id === active.id;
            return (
              <button
                key={joint.id}
                type="button"
                onClick={() => setActiveId(joint.id)}
                className="rounded-[15px] border px-3 py-3 text-left transition"
                style={{
                  borderColor: selected ? `rgba(${joint.rgb},0.30)` : "rgba(255,255,255,0.06)",
                  background: selected ? `rgba(${joint.rgb},0.055)` : "rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex items-center gap-2"><Icon size={14} style={{ color: `rgb(${joint.rgb})` }} /><strong className="text-[12px] text-white/86">{joint.name}</strong></div>
                <span className="mt-1.5 block text-[10px] leading-4 text-stone-500">{joint.axes}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-center">
            <div className="relative flex min-h-[150px] items-center justify-center overflow-hidden rounded-[20px] border border-white/[0.07] bg-black/[0.18]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.08),transparent_62%)]" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border" style={{ color: `rgb(${active.rgb})`, borderColor: `rgba(${active.rgb},0.32)`, background: `rgba(${active.rgb},0.055)` }}>
                <ActiveIcon size={34} />
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: `rgba(${active.rgb},0.70)` }}>{active.axes}</div>
              <h4 className="mt-1 text-[22px] font-semibold text-white">{active.name} joint</h4>
              <p className="mt-2 text-[13px] leading-6 text-stone-300/76">{active.motion}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[16px] border border-white/[0.07] bg-black/[0.14] p-3">
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.07em] text-stone-500">Anatomical examples</div>
              <p className="mt-2 text-[12px] leading-5 text-stone-300/74">{active.examples}</p>
            </div>
            <div className="rounded-[16px] border border-white/[0.07] bg-black/[0.14] p-3">
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.07em] text-stone-500">What constrains it</div>
              <p className="mt-2 text-[12px] leading-5 text-stone-300/74">{active.constraint}</p>
            </div>
          </div>

          <p className="mt-4 border-l-2 border-amber-200/35 pl-3 text-[11px] leading-5 text-stone-500">Joint classification describes typical motion. Real range of motion also depends on articular shape, capsule, ligaments, muscles, injury, age, and individual anatomy.</p>
        </div>
      </div>
    </section>
  );
}
