"use client";

import { useState } from "react";
import { Circle, Grid3X3, LayoutTemplate, X } from "lucide-react";

type Overlay = "none" | "thirds" | "golden";

const NOTES: Record<Overlay, { label: string; text: string }> = {
  none: {
    label: "No guide",
    text: "Start with the image itself. A composition does not need to follow a named proportion or grid to be coherent.",
  },
  thirds: {
    label: "Thirds grid",
    text: "A 3×3 grid is a practical framing aid. It can help compare centered, edge-weighted, and off-center arrangements without prescribing one correct placement.",
  },
  golden: {
    label: "Golden rectangle",
    text: "The golden ratio is one proportional system artists and designers may use. Treat it as a construction option, not a universal law of beauty or visual attention.",
  },
};

export default function GoldenRatioComposer() {
  const [overlay, setOverlay] = useState<Overlay>("thirds");
  const [focalX, setFocalX] = useState(64);
  const [focalY, setFocalY] = useState(38);

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0c0908]/80 shadow-[0_24px_85px_rgba(0,0,0,0.24)]">
      <div className="grid lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-b border-white/[0.07] p-4 lg:border-b-0 lg:border-r sm:p-5">
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.09em] text-orange-200/65"><LayoutTemplate size={13} /> Composition guides</div>
          <h3 className="mt-2 text-[19px] font-semibold text-white">Compare frameworks, not formulas.</h3>
          <div className="mt-4 space-y-2">
            <GuideButton active={overlay === "none"} icon={X} label="None" onClick={() => setOverlay("none")} rgb="148,163,184" />
            <GuideButton active={overlay === "thirds"} icon={Grid3X3} label="Thirds" onClick={() => setOverlay("thirds")} rgb="96,165,250" />
            <GuideButton active={overlay === "golden"} icon={Circle} label="Golden ratio" onClick={() => setOverlay("golden")} rgb="250,204,21" />
          </div>
          <div className="mt-4 rounded-[14px] border border-white/[0.06] bg-black/[0.18] p-3">
            <div className="font-mono text-[8px] uppercase tracking-[0.07em] text-stone-500">{NOTES[overlay].label}</div>
            <p className="mt-2 text-[11px] leading-5 text-stone-400">{NOTES[overlay].text}</p>
          </div>
        </aside>

        <div className="relative min-h-[400px] overflow-hidden bg-[radial-gradient(circle_at_25%_18%,rgba(244,63,94,0.18),transparent_35%),radial-gradient(circle_at_74%_72%,rgba(59,130,246,0.18),transparent_36%),linear-gradient(145deg,#171012,#09090c)]">
          <div className="absolute left-[12%] top-[18%] h-[58%] w-[26%] -rotate-6 rounded-[46%_54%_40%_60%] bg-rose-500/35 blur-[2px]" />
          <div className="absolute bottom-[15%] right-[8%] h-[16%] w-[58%] rotate-[-10deg] rounded-full bg-blue-400/28 blur-[1px]" />
          <div className="absolute left-[40%] top-[15%] h-[54%] w-[12%] rotate-[18deg] bg-amber-300/12" />

          <button
            type="button"
            aria-label="Move focal point"
            className="absolute z-20 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white/15 shadow-[0_0_24px_rgba(255,255,255,0.35)] backdrop-blur-sm"
            style={{ left: `${focalX}%`, top: `${focalY}%` }}
            onClick={() => {
              setFocalX((current) => current > 50 ? 34 : 66);
              setFocalY((current) => current > 50 ? 35 : 65);
            }}
          />

          {overlay === "thirds" ? (
            <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }, (_, index) => <div key={index} className="border border-blue-200/[0.19]" />)}
            </div>
          ) : null}

          {overlay === "golden" ? (
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-55" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x="0" y="0" width="61.8" height="100" fill="none" stroke="rgba(250,204,21,0.45)" strokeWidth="0.35" />
              <rect x="61.8" y="0" width="38.2" height="61.8" fill="none" stroke="rgba(250,204,21,0.35)" strokeWidth="0.35" />
              <path d="M0 100 Q0 0 61.8 0 Q100 0 100 38.2 Q100 61.8 76.4 61.8 Q61.8 61.8 61.8 47.2" fill="none" stroke="rgba(250,204,21,0.72)" strokeWidth="0.65" />
            </svg>
          ) : null}

          <div className="absolute inset-x-4 bottom-4 rounded-[13px] border border-white/[0.08] bg-black/35 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.06em] text-white/55"><span>click the focal marker to move it</span><span>x {focalX} · y {focalY}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuideButton({ active, icon: Icon, label, onClick, rgb }: { active: boolean; icon: typeof Circle; label: string; onClick: () => void; rgb: string }) {
  return <button type="button" onClick={onClick} className="flex w-full items-center gap-3 rounded-[13px] border px-3 py-3 text-left transition" style={{ borderColor: `rgba(${rgb},${active ? 0.30 : 0.09})`, background: active ? `rgba(${rgb},0.055)` : "rgba(255,255,255,0.012)", color: active ? `rgb(${rgb})` : "rgb(168,162,158)" }}><Icon size={15} /><span className="text-[11px] font-medium">{label}</span></button>;
}
