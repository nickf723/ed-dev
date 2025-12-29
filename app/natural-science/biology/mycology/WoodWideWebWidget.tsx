"use client";
import { useState, useEffect } from "react";
import { Share2, RefreshCw, TreePine, Sprout } from "lucide-react";

export default function WoodWideWebWidget() {
  const [sugar, setSugar] = useState(0); // Tree Resource
  const [nutrients, setNutrients] = useState(0); // Fungi Resource
  const [connected, setConnected] = useState(false);

  // Simulation Loop
  useEffect(() => {
      const interval = setInterval(() => {
          // Production
          const sugarProd = 1;
          const nutrientProd = 1;

          if (connected) {
              // Exchange: Tree gives Sugar, Gets Nutrients
              // Fungi gives Nutrients, Gets Sugar
              // Exchange is mutually beneficial (Multiplier effect)
              setSugar(s => Math.min(100, s + sugarProd - 0.5 + 1.5)); 
              setNutrients(n => Math.min(100, n + nutrientProd - 0.5 + 1.5));
          } else {
              // Slow independent growth
              setSugar(s => Math.min(100, s + sugarProd * 0.2));
              setNutrients(n => Math.min(100, n + nutrientProd * 0.2));
          }
      }, 100);
      return () => clearInterval(interval);
  }, [connected]);

  return (
    <div className="bg-stone-900/80 border border-stone-700 rounded-xl p-6 backdrop-blur-md">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-stone-200 flex items-center gap-2">
                <Share2 size={18} className="text-purple-400" /> Mycorrhizal Exchange
            </h3>
            <button 
                onClick={() => setConnected(!connected)}
                className={`text-[10px] font-bold px-3 py-1 rounded-full transition-all
                    ${connected ? "bg-purple-600 text-white" : "bg-stone-700 text-stone-400"}
                `}
            >
                {connected ? "CONNECTED" : "DISCONNECTED"}
            </button>
        </div>

        {/* GRAPHIC */}
        <div className="flex justify-between items-center mb-6 relative px-4">
            
            {/* Connection Line */}
            {connected && (
                <div className="absolute left-[20%] right-[20%] top-1/2 h-1 bg-purple-500/30 overflow-hidden rounded-full">
                    <div className="w-full h-full bg-purple-400/50 animate-pulse" />
                    {/* Particles moving both ways */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-white blur-[2px] animate-[slideRight_1s_linear_infinite]" />
                    <div className="absolute top-0 right-0 w-2 h-full bg-white blur-[2px] animate-[slideLeft_1s_linear_infinite]" />
                </div>
            )}

            {/* Tree Node */}
            <div className="relative z-10 flex flex-col items-center gap-2">
                <div className={`p-4 rounded-full border-2 transition-all duration-500 ${sugar > 80 ? "bg-emerald-500 border-emerald-300 shadow-[0_0_20px_emerald]" : "bg-emerald-900/50 border-emerald-700"}`}>
                    <TreePine size={32} className="text-white" />
                </div>
                <div className="text-xs font-mono text-emerald-400">TREE</div>
                <div className="w-16 h-1 bg-stone-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${sugar}%` }} />
                </div>
            </div>

            {/* Fungi Node */}
            <div className="relative z-10 flex flex-col items-center gap-2">
                <div className={`p-4 rounded-full border-2 transition-all duration-500 ${nutrients > 80 ? "bg-purple-500 border-purple-300 shadow-[0_0_20px_purple]" : "bg-purple-900/50 border-purple-700"}`}>
                    <Sprout size={32} className="text-white" />
                </div>
                <div className="text-xs font-mono text-purple-400">FUNGI</div>
                <div className="w-16 h-1 bg-stone-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: `${nutrients}%` }} />
                </div>
            </div>

        </div>

        <p className="text-xs text-stone-400 leading-relaxed text-center">
            Symbiosis: The tree provides <span className="text-emerald-400">Sugar</span> (Photosynthesis). The fungus provides <span className="text-purple-400">Nutrients</span> (Soil mining). Together, they thrive.
        </p>
    </div>
  );
}