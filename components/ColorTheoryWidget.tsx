"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Paintbrush } from "lucide-react";

type Scheme = "complementary" | "analogous" | "triadic";

export default function ColorTheoryWidget() {
  const [hue, setHue] = useState(0);
  const [scheme, setScheme] = useState<Scheme>("complementary");

  // Generate swatches based on scheme
  const getSwatches = () => {
    const s = 60; // Saturation
    const l = 60; // Lightness
    
    switch (scheme) {
        case "complementary":
            return [
                { h: hue, label: "Base" },
                { h: (hue + 180) % 360, label: "Complement" }
            ];
        case "analogous":
            return [
                { h: (hue - 30 + 360) % 360, label: "-30°" },
                { h: hue, label: "Base" },
                { h: (hue + 30) % 360, label: "+30°" }
            ];
        case "triadic":
            return [
                { h: hue, label: "Base" },
                { h: (hue + 120) % 360, label: "+120°" },
                { h: (hue + 240) % 360, label: "+240°" }
            ];
    }
  };

  const swatches = getSwatches();

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Palette size={14} className="text-pink-400" /> Color Harmony
        </h3>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Swatch Display */}
        <div className="flex h-24 w-full overflow-hidden rounded-xl border border-white/10">
            {swatches.map((swatch, i) => (
                <div 
                    key={i}
                    className="flex-1 flex items-end justify-center pb-2 transition-colors duration-200"
                    style={{ backgroundColor: `hsl(${swatch.h}, 70%, 60%)` }}
                >
                    <span className="text-[9px] font-mono font-bold uppercase text-black/50 bg-white/20 px-1 rounded backdrop-blur-sm">
                        {swatch.label}
                    </span>
                </div>
            ))}
        </div>

        {/* Hue Slider */}
        <div>
            <div className="flex justify-between text-[10px] font-bold uppercase text-neutral-500 mb-2">
                <span>Hue</span>
                <span style={{ color: `hsl(${hue}, 70%, 60%)` }}>{hue}°</span>
            </div>
            <input 
                type="range" 
                min="0" max="360" 
                value={hue} 
                onChange={(e) => setHue(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                    background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)"
                }}
            />
        </div>

        {/* Scheme Selector */}
        <div className="flex bg-neutral-950 rounded-lg p-1 border border-white/5">
            {(["complementary", "analogous", "triadic"] as Scheme[]).map((s) => (
                <button
                    key={s}
                    onClick={() => setScheme(s)}
                    className={`flex-1 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all
                        ${scheme === s 
                            ? "bg-white/10 text-white shadow" 
                            : "text-neutral-500 hover:text-neutral-300"}
                    `}
                >
                    {s.slice(0, 4)}
                </button>
            ))}
        </div>
        
        <p className="text-[10px] text-neutral-500 leading-relaxed border-t border-white/5 pt-4">
            {scheme === 'complementary' && "Opposite colors create high contrast and high impact."}
            {scheme === 'analogous' && "Colors next to each other create serene and comfortable designs."}
            {scheme === 'triadic' && "Evenly spaced colors create vibrant yet balanced harmonies."}
        </p>

      </div>
    </div>
  );
}