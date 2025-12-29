"use client";
import { useState, useEffect, useRef } from "react";
import { RefreshCw, ShieldAlert, Biohazard, Plus } from "lucide-react";

export default function CulturePlateWidget() {
  const [colonies, setColonies] = useState<{x: number, y: number, r: number, maxR: number, color: string}[]>([]);
  const [discs, setDiscs] = useState<{x: number, y: number}[]>([]);
  
  // Growth Loop
  useEffect(() => {
      const interval = setInterval(() => {
          setColonies(prev => prev.map(c => {
              // Check antibiotic proximity
              let inhibited = false;
              for (const d of discs) {
                  const dist = Math.sqrt((c.x - d.x)**2 + (c.y - d.y)**2);
                  if (dist < 60) inhibited = true; // 60px zone of inhibition
              }

              if (inhibited || c.r >= c.maxR) return c;
              
              // Grow
              return { ...c, r: c.r + 0.5 };
          }));
      }, 50);
      return () => clearInterval(interval);
  }, [discs]);

  const addSwab = () => {
      const newCols: {x: number, y: number, r: number, maxR: number, color: string}[] = [];
      for(let i=0; i<5; i++) {
          newCols.push({
              x: Math.random() * 200, 
              y: Math.random() * 200,
              r: 0,
              maxR: 10 + Math.random() * 20,
              color: Math.random() > 0.5 ? "bg-yellow-200" : "bg-white" // Staph vs E.coli look
          });
      }
      setColonies(prev => [...prev, ...newCols]);
  };

  const addDisc = () => {
      // Add disc to random spot
      setDiscs(prev => [...prev, { x: 50 + Math.random() * 100, y: 50 + Math.random() * 100 }]);
  };

  const reset = () => { setColonies([]); setDiscs([]); };

  return (
    <div className="bg-neutral-900/80 border border-neutral-700 rounded-xl p-6 backdrop-blur-md">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lime-400 flex items-center gap-2 text-sm uppercase tracking-widest">
                <Biohazard size={16} /> Agar Plate
            </h3>
            <div className="flex gap-2">
                <button onClick={reset} className="text-neutral-500 hover:text-white"><RefreshCw size={14}/></button>
            </div>
        </div>

        {/* PETRI DISH VISUAL */}
        <div className="relative w-48 h-48 mx-auto bg-[#b45309]/30 rounded-full border-4 border-neutral-700 overflow-hidden shadow-inner mb-6 cursor-pointer" onClick={addSwab}>
            {/* Colonies */}
            {colonies.map((c, i) => (
                <div 
                    key={i}
                    className={`absolute rounded-full ${c.color} opacity-80 blur-[1px]`}
                    style={{ 
                        left: c.x, top: c.y, 
                        width: c.r * 2, height: c.r * 2,
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            ))}
            
            {/* Antibiotic Discs */}
            {discs.map((d, i) => (
                <div 
                    key={i}
                    className="absolute w-4 h-4 bg-white rounded-full flex items-center justify-center text-[6px] font-bold text-black border border-neutral-300 shadow-md z-10"
                    style={{ left: d.x, top: d.y, transform: 'translate(-50%, -50%)' }}
                >
                    ABX
                </div>
            ))}
            
            {/* Reflection */}
            <div className="absolute top-2 right-4 w-12 h-6 bg-white/10 rounded-full rotate-12 blur-sm pointer-events-none" />
        </div>

        <div className="grid grid-cols-2 gap-2">
            <button 
                onClick={addSwab}
                className="py-2 bg-neutral-800 hover:bg-neutral-700 rounded text-xs font-bold text-lime-400 border border-neutral-600 flex items-center justify-center gap-1"
            >
                <Plus size={12} /> SWAB
            </button>
            <button 
                onClick={addDisc}
                className="py-2 bg-neutral-800 hover:bg-neutral-700 rounded text-xs font-bold text-white border border-neutral-600 flex items-center justify-center gap-1"
            >
                <ShieldAlert size={12} /> ANTIBIOTIC
            </button>
        </div>
        <p className="text-[10px] text-neutral-500 text-center mt-3">
            Antibiotics create a "Zone of Inhibition" where bacteria cannot grow.
        </p>
    </div>
  );
}