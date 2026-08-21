"use client";

import { useState } from "react";
import { Brain, Footprints, Globe2, Skull, Wrench } from "lucide-react";
import { HOMININ_SPECIMENS } from "./anthropologyModel";

const ICONS = {
  footprints: Footprints,
  tool: Wrench,
  globe: Globe2,
  skull: Skull,
  brain: Brain,
} as const;

export default function SkullTimeline() {
  const [index, setIndex] = useState(0);
  const current = HOMININ_SPECIMENS[index];
  const FeatureIcon = ICONS[current.icon];

  return (
    <div className="bg-[#17100c]/46 overflow-hidden rounded-[24px] border border-amber-100/[0.12] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-[16px] backdrop-saturate-[1.08]">
      <div className="flex items-center justify-between border-b border-amber-100/[0.08] px-5 py-4">
        <h3 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-stone-300">
          <Skull size={15} className="text-amber-400" aria-hidden="true" />
          Hominin deep time
        </h3>
        <span className="font-mono text-[11px] text-stone-500">
          branching record
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <input
          type="range"
          min="0"
          max={HOMININ_SPECIMENS.length - 1}
          step="1"
          value={index}
          onChange={(event) => setIndex(Number(event.target.value))}
          className="w-full accent-amber-500"
          aria-label="Choose a hominin specimen in deep time"
        />
        <div className="mt-2 flex justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-stone-600">
          <span>older</span>
          <span>recent</span>
        </div>

        <div className="mt-5 min-h-[340px]" aria-live="polite">
          <h4 className="text-[20px] font-semibold tracking-[-0.03em] text-white">
            {current.name}
          </h4>
          <span className="mt-2 inline-block rounded-full border border-amber-400/25 bg-amber-400/[0.06] px-3 py-1 font-mono text-[11px] text-amber-200/80">
            {current.time}
          </span>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-[14px] border border-white/[0.07] bg-black/[0.12] p-3 backdrop-blur-[10px]">
              <Brain size={15} className="text-stone-500" aria-hidden="true" />
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-stone-600">
                Approx. cranial capacity
              </div>
              <strong className="mt-1 block text-[14px] text-stone-200">
                {current.brain}
              </strong>
            </div>
            <div className="rounded-[14px] border border-amber-100/[0.08] bg-amber-300/[0.025] p-3 backdrop-blur-[10px]">
              <FeatureIcon
                size={15}
                className="text-amber-400"
                aria-hidden="true"
              />
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-stone-600">
                Useful clue
              </div>
              <strong className="text-amber-100/88 mt-1 block text-[14px]">
                {current.clue}
              </strong>
            </div>
          </div>

          <p className="text-stone-300/72 mt-4 text-[13px] leading-6">
            {current.description}
          </p>
          <p className="mt-3 border-l border-amber-300/30 pl-3 text-[12px] leading-5 text-stone-500">
            This viewer samples a few well-known lineages. Human evolution
            contains overlapping branches, uncertain relationships, regional
            variation, and many additional hominin groups.
          </p>
        </div>
      </div>
    </div>
  );
}
