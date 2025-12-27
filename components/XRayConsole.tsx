"use client";
import { useState, useEffect } from "react";
import { Scan, Layers, Activity } from "lucide-react";

export default function XRayConsole() {
  const [active, setActive] = useState(false);
  const [domCount, setDomCount] = useState(0);

  // Manual Style Injection
  useEffect(() => {
    const styleId = "x-ray-styles";
    let styleTag = document.getElementById(styleId);

    if (active) {
        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = styleId;
            styleTag.innerHTML = `
                *:not(html):not(body):not(script):not(style) {
                    outline: 1px dashed rgba(0, 255, 255, 0.3) !important;
                    background: rgba(0, 255, 255, 0.02) !important;
                }
                *:not(html):not(body):hover {
                    outline: 1px solid rgba(255, 0, 255, 0.8) !important;
                    background: rgba(255, 0, 255, 0.05) !important;
                    cursor: crosshair !important;
                }
            `;
            document.head.appendChild(styleTag);
        }
    } else {
        if (styleTag) {
            styleTag.remove();
        }
    }

    return () => {
        // Cleanup on unmount
        const tag = document.getElementById(styleId);
        if (tag) tag.remove();
    }
  }, [active]);

  useEffect(() => {
    setDomCount(document.getElementsByTagName("*").length);
  }, []);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Scan size={14} className="text-emerald-400" /> Structure Scan
        </h3>
        <Activity size={14} className="text-neutral-600" />
      </div>

      <div className="p-6">
        <button
            onClick={() => setActive(!active)}
            className={`w-full py-4 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all duration-300
                ${active 
                    ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]" 
                    : "bg-neutral-900 border-neutral-700 text-neutral-500 hover:border-neutral-500 hover:text-neutral-300"}
            `}
        >
            <Layers size={24} />
            <span className="text-xs font-bold uppercase tracking-widest">
                {active ? "X-Ray Online" : "Enable X-Ray"}
            </span>
        </button>

        <div className="mt-6 space-y-3">
            <div className="flex justify-between text-[10px] font-mono text-neutral-500 border-b border-white/5 pb-2">
                <span>DOM_NODES</span>
                <span className="text-white">{domCount}</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-neutral-500 border-b border-white/5 pb-2">
                <span>RENDER_MODE</span>
                <span className="text-emerald-400">CSR</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-neutral-500 pb-2">
                <span>STATUS</span>
                <span className="text-white">OPTIMAL</span>
            </div>
        </div>
      </div>
    </div>
  );
}