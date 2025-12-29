"use client";
import { useState, useEffect } from "react";
import { Play, RefreshCw, Activity, GitFork } from "lucide-react";

type Critter = { id: number; speed: number; x: number; active: boolean };

export default function EvoWidget() {
  const [generation, setGeneration] = useState(1);
  const [population, setPopulation] = useState<Critter[]>([]);
  const [avgSpeed, setAvgSpeed] = useState(0);

  // Initialize
  useEffect(() => {
    spawnGen(1);
  }, []);

  const spawnGen = (gen: number, parents?: Critter[]) => {
    const newPop: Critter[] = [];
    const count = 10;

    for (let i = 0; i < count; i++) {
        let speed = 0;
        if (parents && parents.length > 0) {
            // Inherit from random parent + Mutation
            const parent = parents[Math.floor(Math.random() * parents.length)];
            speed = parent.speed + (Math.random() - 0.4) * 2; // Slight bias towards faster
        } else {
            // Gen 1 Random
            speed = 1 + Math.random() * 4;
        }
        // Clamp
        speed = Math.max(1, Math.min(10, speed));
        
        newPop.push({
            id: gen * 100 + i,
            speed,
            x: 0,
            active: true
        });
    }
    
    setPopulation(newPop);
    setGeneration(gen);
    
    // Calc stats
    const avg = newPop.reduce((acc, c) => acc + c.speed, 0) / count;
    setAvgSpeed(avg);
  };

  // Run Simulation Loop
  useEffect(() => {
      const interval = setInterval(() => {
          setPopulation(prev => {
              // Move critters
              const next = prev.map(c => ({
                  ...c,
                  x: c.x + c.speed,
                  active: c.x < 100 // "Die" if they hit the wall (or act as finish line)
              }));
              
              // If all finished/dead, stop or wait? 
              // Visual only: keep looping x from 0-100 for display
              return next.map(c => ({
                  ...c,
                  x: c.x > 100 ? 0 : c.x // Loop for visual
              }));
          });
      }, 50);
      return () => clearInterval(interval);
  }, []);

  const nextGeneration = () => {
      // Selection: Only fastest 50% survive to reproduce
      const sorted = [...population].sort((a, b) => b.speed - a.speed);
      const survivors = sorted.slice(0, population.length / 2);
      spawnGen(generation + 1, survivors);
  };

  return (
    <div className="bg-neutral-900/80 border border-white/10 rounded-xl p-6 backdrop-blur-md">
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-emerald-400">
                <GitFork size={20} />
                <h3 className="font-bold text-sm uppercase tracking-widest">Natural Selection</h3>
            </div>
            <div className="text-[10px] font-mono text-neutral-500">
                GEN: {generation} // AVG SPD: {avgSpeed.toFixed(1)}
            </div>
        </div>

        {/* Visualization Area */}
        <div className="space-y-2 mb-6 border-l border-white/10 pl-2 h-32 overflow-hidden relative bg-black/20 rounded">
            {population.map(c => (
                <div key={c.id} className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                        className="absolute top-0 bottom-0 w-2 rounded-full bg-emerald-500 shadow-[0_0_5px_lime]"
                        style={{ left: `${c.x}%` }}
                    />
                </div>
            ))}
            {/* Finish Line */}
            <div className="absolute top-0 bottom-0 right-0 w-px bg-red-500/30 dashed" />
        </div>

        <button 
            onClick={nextGeneration}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold text-black flex items-center justify-center gap-2 transition-all"
        >
            <RefreshCw size={16} /> EVOLVE NEXT GEN
        </button>
        <p className="text-[10px] text-neutral-500 text-center mt-3">
            Selects the fastest 50% to breed. Watch average speed increase.
        </p>
    </div>
  );
}