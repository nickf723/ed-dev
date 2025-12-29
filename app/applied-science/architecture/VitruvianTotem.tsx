"use client";
import { useState } from "react";
import { Settings, Eye, ShieldCheck, Ruler, Palette, Columns4 } from "lucide-react";

export default function VitruvianTotem() {
  const [activeState, setActiveState] = useState<{ [key: string]: boolean }>({
    firmitas: false,
    utilitas: false,
    venustas: false,
  });

  const toggle = (key: string) => {
    setActiveState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-slate-900/60 border border-sky-500/30 rounded-2xl p-8 backdrop-blur-md h-full flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2 font-serif tracking-wide">The Vitruvian Triad</h3>
        <p className="text-sm text-slate-400 mb-8">
            The three principles of good architecture, as defined by Vitruvius in *De architectura* (c. 30 BC).
        </p>

        {/* 3D STACK CONTAINER */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 perspective-[1000px]">
            
            {/* BLOCK 1: FIRMITAS (Strength) */}
            <TumblingBlock
                isFlipped={activeState.firmitas}
                onClick={() => toggle("firmitas")}
                frontIcon={Columns4}
                frontTitle="FIRMITAS"
                frontSubtitle="(Strength)"
                backIcon={ShieldCheck}
                backTitle="STRUCTURAL INTEGRITY"
                backDesc="The building must stand robustly and remain in good condition."
                colorTheme="sky"
            />

            {/* BLOCK 2: UTILITAS (Utility) */}
            <TumblingBlock
                isFlipped={activeState.utilitas}
                onClick={() => toggle("utilitas")}
                frontIcon={Settings}
                frontTitle="UTILITAS"
                frontSubtitle="(Utility)"
                backIcon={Ruler}
                backTitle="FUNCTIONALITY"
                backDesc="The design must serve its intended purpose efficiently for its users."
                colorTheme="amber"
            />

            {/* BLOCK 3: VENUSTAS (Beauty) */}
            <TumblingBlock
                isFlipped={activeState.venustas}
                onClick={() => toggle("venustas")}
                frontIcon={Eye}
                frontTitle="VENUSTAS"
                frontSubtitle="(Beauty)"
                backIcon={Palette}
                backTitle="AESTHETICS"
                backDesc="The arrangement must be harmonious, delighting the eye and mind."
                colorTheme="rose"
            />
            
        </div>
        <p className="text-[10px] text-slate-500 text-center mt-6 font-mono uppercase">
            Click blocks to reveal principles
        </p>
    </div>
  );
}

// Helper Component for the 3D Block
function TumblingBlock({ isFlipped, onClick, frontIcon: FIcon, frontTitle, frontSubtitle, backIcon: BIcon, backTitle, backDesc, colorTheme }: { colorTheme: "sky" | "amber" | "rose"; [key: string]: any }) {
    const colors = {
        sky: { bg: "bg-sky-900/50", border: "border-sky-500", text: "text-sky-400" },
        amber: { bg: "bg-amber-900/50", border: "border-amber-500", text: "text-amber-400" },
        rose: { bg: "bg-rose-900/50", border: "border-rose-500", text: "text-rose-400" },
    }[colorTheme];

    return (
        <div 
            onClick={onClick}
            className="w-full h-24 relative cursor-pointer group transform-style-3d transition-transform duration-700 ease-in-out"
            style={{ transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)" }}
        >
            {/* FRONT FACE */}
            <div className={`absolute inset-0 backface-hidden ${colors.bg} border ${colors.border} rounded-xl flex items-center px-6 gap-4 shadow-lg group-hover:brightness-110 transition-all`}>
                <div className={`p-3 rounded-lg bg-black/30 ${colors.text}`}>
                    <FIcon size={24} />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white tracking-widest">{frontTitle}</h4>
                    <span className={`text-xs font-mono ${colors.text}`}>{frontSubtitle}</span>
                </div>
            </div>

            {/* BACK FACE */}
            <div 
                className={`absolute inset-0 backface-hidden bg-slate-800 border border-white/20 rounded-xl flex items-center px-6 gap-4 shadow-lg rotate-x-180`}
            >
                <div className="p-3 rounded-lg bg-black/30 text-white">
                    <BIcon size={24} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">{backTitle}</h4>
                    <p className="text-xs text-slate-400 leading-tight mt-1">{backDesc}</p>
                </div>
            </div>
        </div>
    );
}