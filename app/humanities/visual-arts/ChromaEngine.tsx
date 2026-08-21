"use client";

import { useMemo, useState } from "react";
import { Palette, RotateCcw } from "lucide-react";
import { getHarmonyHues, type HueRelationship } from "./visualArtsModel";

const MODE_NOTE: Record<HueRelationship, string> = {
  complementary:
    "Two hues opposite one another on this color wheel. The geometry creates strong hue separation; perceived contrast still depends on lightness, saturation, area, and context.",
  analogous:
    "Neighboring hues. Because their hue angles are close, they often produce smaller chromatic jumps, but value and saturation can still create strong contrast.",
  triadic:
    "Three evenly spaced hue angles. Equal spacing describes the wheel geometry; it does not guarantee a balanced composition.",
  split:
    "A base hue paired with the two neighbors of its complement. This keeps broad hue separation while introducing an additional relationship.",
};

export default function ChromaEngine() {
  const [hue, setHue] = useState(18);
  const [saturation, setSaturation] = useState(72);
  const [lightness, setLightness] = useState(54);
  const [mode, setMode] = useState<HueRelationship>("complementary");

  const hues = useMemo(() => getHarmonyHues(hue, mode), [hue, mode]);

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0c0908]/80 shadow-[0_24px_85px_rgba(0,0,0,0.24)]">
      <div className="border-b border-white/[0.07] p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-rose-200/65">
              <Palette size={13} /> Hue relationships
            </div>
            <h3 className="mt-2 text-[19px] font-semibold text-white">
              The wheel measures hue distance. Context creates the effect.
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setHue(18);
              setSaturation(72);
              setLightness(54);
              setMode("complementary");
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-stone-500 hover:text-white"
            aria-label="Reset color lab"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="p-4 sm:p-5">
          <div
            className="grid min-h-[250px] overflow-hidden rounded-[18px] border border-white/[0.07]"
            style={{
              gridTemplateColumns: `repeat(${hues.length}, minmax(0,1fr))`,
            }}
          >
            {hues.map((rawHue, index) => {
              return (
                <div
                  key={`${rawHue}-${index}`}
                  className="relative flex items-end p-3 transition-colors duration-300"
                  style={{
                    background: `hsl(${rawHue} ${saturation}% ${lightness}%)`,
                  }}
                >
                  <span className="rounded-full bg-black/35 px-2 py-1 font-mono text-[10px] text-white/85 backdrop-blur-sm">
                    {rawHue}°
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-5 space-y-4">
            <Slider
              label="Hue"
              value={hue}
              min={0}
              max={359}
              suffix="°"
              onChange={setHue}
              track="linear-gradient(90deg,#f44,#ff4,#4f4,#4ff,#44f,#f4f,#f44)"
            />
            <Slider
              label="Saturation"
              value={saturation}
              min={0}
              max={100}
              suffix="%"
              onChange={setSaturation}
              track={`linear-gradient(90deg,hsl(${hue} 0% ${lightness}%),hsl(${hue} 100% ${lightness}%))`}
            />
            <Slider
              label="Lightness"
              value={lightness}
              min={12}
              max={88}
              suffix="%"
              onChange={setLightness}
              track={`linear-gradient(90deg,hsl(${hue} ${saturation}% 8%),hsl(${hue} ${saturation}% 50%),hsl(${hue} ${saturation}% 94%))`}
            />
          </div>
        </div>

        <aside className="border-t border-white/[0.07] p-4 sm:p-5 lg:sticky lg:top-[172px] lg:self-start lg:border-l lg:border-t-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.07em] text-stone-500">
            Relationship
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(
              [
                "complementary",
                "analogous",
                "triadic",
                "split",
              ] as HueRelationship[]
            ).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`rounded-[11px] border px-2 py-2.5 text-[11px] capitalize transition ${mode === item ? "border-rose-200/[0.2] bg-rose-300/[0.045] text-rose-100" : "border-white/[0.06] bg-white/[0.012] text-stone-500 hover:text-stone-300"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-[14px] border border-white/[0.06] bg-black/[0.18] p-3.5">
            <div className="font-mono text-[10px] uppercase tracking-[0.07em] text-stone-500">
              What the geometry tells you
            </div>
            <p className="mt-2 text-[12px] leading-5 text-stone-400">
              {MODE_NOTE[mode]}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
  track,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (value: number) => void;
  track: string;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.07em] text-stone-500">
        <span>{label}</span>
        <span>
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2.5 w-full cursor-pointer appearance-none rounded-full"
        style={{ background: track }}
      />
    </label>
  );
}
