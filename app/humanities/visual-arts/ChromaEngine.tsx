"use client";
import { useState } from "react";
import { Palette, RefreshCw, Zap } from "lucide-react";

export default function ChromaEngine() {
  const [hue, setHue] = useState(200);
  const [mode, setMode] = useState<"complementary" | "analogous" | "triadic">("complementary");

  // Helper to generate HSL string
  const hsl = (h: number, s: number, l: number) => `hsl(${h % 360}, ${s}%, ${l}%)`;

  // Calculate Palette
  const getPalette = () => {
      const base = hue;
      switch (mode) {
          case "complementary":
              return [base, base + 180];
          case "analogous":
              return [base - 30, base, base + 30];
          case "triadic":
              return [base, base + 120, base + 240];
          default:
              return [base];
      }
  };

  const palette = getPalette();

  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white flex items-center gap-2 font-sans tracking-widest text-sm">
                <Palette size={16} /> CHROMA ENGINE
            </h3>
            <div className="flex gap-1">
                {["complementary", "analogous", "triadic"].map((m) => (
                    <button
                        key={m}
                        onClick={() => setMode(m as any)}
                        className={`w-6 h-6 rounded-full border border-white/20 transition-all ${mode === m ? "bg-white scale-110" : "bg-transparent hover:bg-white/20"}`}
                        title={m}
                    />
                ))}
            </div>
        </div>

        {/* VISUALIZER */}
        <div className="flex h-32 w-full rounded-lg overflow-hidden border border-white/10 mb-6 shadow-inner">
            {palette.map((h, i) => (
                <div 
                    key={i} 
                    className="flex-1 transition-colors duration-300 relative group"
                    style={{ backgroundColor: hsl(h, 70, 50) }}
                >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <span className="text-white font-mono text-xs font-bold drop-shadow-md">
                            {Math.round(h % 360)}°
                        </span>
                    </div>
                </div>
            ))}
        </div>

        {/* CONTROLS */}
        <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-neutral-500">
                <span>0° (RED)</span>
                <span>180° (CYAN)</span>
                <span>360°</span>
            </div>
            <input 
                type="range" min="0" max="360" 
                value={hue} 
                onChange={(e) => setHue(parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                    background: "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)"
                }}
            />
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-neutral-400 font-serif italic">
                {mode === "complementary" && "Opposites attract. High contrast, high impact."}
                {mode === "analogous" && "Neighbors on the wheel. Harmonious and serene."}
                {mode === "triadic" && "Evenly spaced. Vibrant and balanced."}
            </p>
        </div>
    </div>
  );
}