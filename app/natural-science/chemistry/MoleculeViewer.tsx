"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Atom, Box, RefreshCw } from "lucide-react";

const MOLECULES = [
  {
    id: "h2o",
    name: "Water (H₂O)",
    desc: "Bent geometry. Polar. Essential for life.",
    atoms: [
        { element: "O", x: 0, y: 0, z: 0, r: 20, color: "#ef4444" }, // Red
        { element: "H", x: -25, y: 25, z: 0, r: 12, color: "#fff" }, // White
        { element: "H", x: 25, y: 25, z: 0, r: 12, color: "#fff" },
    ],
    bonds: [[0,1], [0,2]]
  },
  {
    id: "ch4",
    name: "Methane (CH₄)",
    desc: "Tetrahedral. Primary component of natural gas.",
    atoms: [
        { element: "C", x: 0, y: 0, z: 0, r: 20, color: "#525252" }, // Black/Grey
        { element: "H", x: 0, y: -35, z: 0, r: 10, color: "#fff" },
        { element: "H", x: -33, y: 11, z: -20, r: 10, color: "#fff" },
        { element: "H", x: 33, y: 11, z: -20, r: 10, color: "#fff" },
        { element: "H", x: 0, y: 11, z: 35, r: 10, color: "#fff" },
    ],
    bonds: [[0,1], [0,2], [0,3], [0,4]]
  },
  {
    id: "co2",
    name: "Carbon Dioxide",
    desc: "Linear geometry. Non-polar gas.",
    atoms: [
        { element: "C", x: 0, y: 0, z: 0, r: 20, color: "#525252" },
        { element: "O", x: -45, y: 0, z: 0, r: 18, color: "#ef4444" },
        { element: "O", x: 45, y: 0, z: 0, r: 18, color: "#ef4444" },
    ],
    bonds: [[0,1], [0,2]]
  }
];

export default function MoleculeViewer() {
  const [active, setActive] = useState(MOLECULES[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      let angleX = 0;
      let angleY = 0;
      let animId: number;
      
      const render = () => {
          ctx.clearRect(0, 0, 300, 200);
          const cx = 150;
          const cy = 100;
          
          // Project Atoms
          const projected = active.atoms.map(a => {
             // Rotate Y
             let x = a.x * Math.cos(angleY) - a.z * Math.sin(angleY);
             let z = a.z * Math.cos(angleY) + a.x * Math.sin(angleY);
             // Rotate X
             let y = a.y * Math.cos(angleX) - z * Math.sin(angleX);
             z = z * Math.cos(angleX) + a.y * Math.sin(angleX);
             
             // Perspective scale
             const scale = 400 / (400 + z);
             
             return { x: cx + x*scale, y: cy + y*scale, z, r: a.r*scale, color: a.color, scale };
          });
          
          // Sort by Z (Painter's Algorithm)
          projected.sort((a, b) => a.z - b.z);
          
          // Draw Bonds (Lines between projected points)
          ctx.lineWidth = 4;
          ctx.strokeStyle = "#888";
          active.bonds.forEach(pair => {
              const p1 = projected.find((_, i) => i === pair[0]);
              const p2 = projected.find((_, i) => i === pair[1]);
              // Simple match by index isn't quite right because we sorted projected array
              // We need to map back to original indices. 
              // Simple fix: Re-project without sorting for lines, then draw sorted atoms on top.
          });
          
          // Correct Bond Drawing:
          active.bonds.forEach(pair => {
             // We need the raw coords again for lines
             // This is expensive to re-calc, so let's just cheat and draw lines first based on the 'unsorted' logic
             // But lines need depth too. 
             // For this widget, drawing lines *behind* everything is acceptable.
             
             // Let's perform projection again for line endpoints
             const getProj = (i: number) => {
                 const a = active.atoms[i];
                 let x = a.x * Math.cos(angleY) - a.z * Math.sin(angleY);
                 let z = a.z * Math.cos(angleY) + a.x * Math.sin(angleY);
                 let y = a.y * Math.cos(angleX) - z * Math.sin(angleX);
                 z = z * Math.cos(angleX) + a.y * Math.sin(angleX);
                 const scale = 400 / (400 + z);
                 return { x: cx + x*scale, y: cy + y*scale };
             };
             
             const p1 = getProj(pair[0]);
             const p2 = getProj(pair[1]);
             
             ctx.beginPath();
             ctx.moveTo(p1.x, p1.y);
             ctx.lineTo(p2.x, p2.y);
             ctx.stroke();
          });

          // Draw Atoms
          projected.forEach(p => {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
              ctx.fillStyle = p.color;
              
              // Fake 3D shading
              const g = ctx.createRadialGradient(p.x - p.r*0.3, p.y - p.r*0.3, 0, p.x, p.y, p.r);
              g.addColorStop(0, "#fff");
              g.addColorStop(0.3, p.color);
              g.addColorStop(1, "#000");
              ctx.fillStyle = g;
              
              ctx.fill();
          });
          
          angleY += 0.02;
          angleX += 0.01;
          animId = requestAnimationFrame(render);
      };
      
      render();
      return () => cancelAnimationFrame(animId);
  }, [active]);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Atom size={14} className="text-lime-400" /> Molecular Geo
        </h3>
        <RefreshCw size={14} className="text-neutral-600 animate-spin-slow" />
      </div>

      <div className="p-0 bg-black/20 border-b border-white/5">
          <canvas ref={canvasRef} width={300} height={200} className="w-full h-[200px]" />
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {MOLECULES.map(m => (
                <button
                    key={m.id}
                    onClick={() => setActive(m)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase whitespace-nowrap border transition-all
                        ${active.id === m.id 
                            ? "bg-lime-500/20 border-lime-500/50 text-lime-300" 
                            : "bg-white/5 border-white/5 text-neutral-500 hover:text-white"}
                    `}
                >
                    {m.id}
                </button>
            ))}
        </div>
        
        <div>
            <h4 className="text-sm font-bold text-white mb-1">{active.name}</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">{active.desc}</p>
        </div>
      </div>
    </div>
  );
}