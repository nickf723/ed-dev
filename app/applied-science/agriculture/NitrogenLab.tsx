"use client";
import { useState } from "react";
import { Sprout, Wheat, Leaf, RefreshCw, AlertTriangle } from "lucide-react";

type Crop = "corn" | "soy" | "fallow";

export default function NitrogenLab() {
  const [nitrogen, setNitrogen] = useState(100);
  const [yieldTotal, setYieldTotal] = useState(0);
  const [season, setSeason] = useState(1);
  const [history, setHistory] = useState<Crop[]>([]);

  const plant = (crop: Crop) => {
      let nChange = 0;
      let yChange = 0;

      if (crop === "corn") {
          if (nitrogen < 30) return; // Cannot plant
          nChange = -30;
          yChange = 100;
      } else if (crop === "soy") {
          nChange = 20;
          yChange = 50;
      } else if (crop === "fallow") {
          nChange = 10;
          yChange = 0;
      }

      setNitrogen(prev => Math.min(120, prev + nChange)); // Max 120
      setYieldTotal(prev => prev + yChange);
      setSeason(prev => prev + 1);
      setHistory(prev => [crop, ...prev].slice(0, 5));
  };

  const reset = () => {
      setNitrogen(100);
      setYieldTotal(0);
      setSeason(1);
      setHistory([]);
  };

  return (
    <div className="bg-[#2e2315]/90 border border-green-700/50 rounded-xl p-6 backdrop-blur-md shadow-2xl w-full max-w-md font-sans">
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-green-400 flex items-center gap-2 tracking-wider text-sm">
                <Sprout size={16} /> AGRI_MANAGER
            </h3>
            <div className="text-[10px] text-amber-500 font-mono">SEASON {season}</div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-black/30 p-3 rounded border border-white/5 relative overflow-hidden">
                <div className="text-[10px] text-zinc-400 uppercase font-bold mb-1">Soil Nitrogen</div>
                <div className={`text-2xl font-mono font-bold ${nitrogen < 30 ? "text-red-500 animate-pulse" : "text-green-400"}`}>
                    {nitrogen}%
                </div>
                {/* Bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-green-500 transition-all duration-500" style={{ width: `${(nitrogen/120)*100}%` }} />
            </div>
            <div className="bg-black/30 p-3 rounded border border-white/5">
                <div className="text-[10px] text-zinc-400 uppercase font-bold mb-1">Total Yield</div>
                <div className="text-2xl font-mono font-bold text-amber-400">
                    {yieldTotal}
                </div>
            </div>
        </div>

        {/* SOIL PLOT VISUAL */}
        <div className="h-24 bg-[#3f2e18] rounded-lg border-b-4 border-[#281d0f] mb-6 flex items-end justify-center relative overflow-hidden shadow-inner">
             {/* Render history as plants */}
             <div className="flex gap-4 items-end mb-2">
                 {history.length === 0 && <span className="text-white/20 text-xs">READY TO PLANT</span>}
                 {history.slice(0,1).map((c, i) => (
                     <div key={i} className="flex flex-col items-center animate-in slide-in-from-bottom duration-500">
                        {c === "corn" && <Wheat size={48} className="text-yellow-500" />}
                        {c === "soy" && <Sprout size={40} className="text-green-500" />}
                        {c === "fallow" && <div className="text-white/20 text-xs font-mono mb-2">RESTING</div>}
                     </div>
                 ))}
             </div>
             {/* Soil texture overlay */}
             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none" />
        </div>

        {/* CONTROLS */}
        <div className="grid grid-cols-3 gap-2 mb-4">
            <button 
                onClick={() => plant("corn")}
                disabled={nitrogen < 30}
                className="py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded flex flex-col items-center justify-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                <Wheat size={18} />
                <span className="text-[10px]">CORN</span>
                <span className="text-[9px] opacity-70">-30 N</span>
            </button>
            <button 
                onClick={() => plant("soy")}
                className="py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded flex flex-col items-center justify-center gap-1 transition-colors"
            >
                <Sprout size={18} />
                <span className="text-[10px]">SOY</span>
                <span className="text-[9px] opacity-70">+20 N</span>
            </button>
            <button 
                onClick={() => plant("fallow")}
                className="py-3 bg-stone-700 hover:bg-stone-600 text-white font-bold rounded flex flex-col items-center justify-center gap-1 transition-colors"
            >
                <Leaf size={18} />
                <span className="text-[10px]">FALLOW</span>
                <span className="text-[9px] opacity-70">+10 N</span>
            </button>
        </div>

        <button onClick={reset} className="w-full py-2 flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors">
            <RefreshCw size={12} /> RESET FIELD
        </button>

    </div>
  );
}