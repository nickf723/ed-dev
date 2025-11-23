"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Circle, Disc, Divide, Hash } from "lucide-react";

const SHAPES = [
  { 
    id: "sphere", 
    name: "Sphere / Cube", 
    icon: Circle, 
    V: 8, E: 12, F: 6, 
    chi: 2, 
    genus: 0,
    desc: "Any shape that can be inflated into a ball (Cube, Tetrahedron)."
  },
  { 
    id: "torus", 
    name: "Torus / Donut", 
    icon: Disc, 
    V: 16, E: 32, F: 16, // Minimal triangulation
    chi: 0, 
    genus: 1,
    desc: "A shape with one hole. The classic coffee cup example."
  },
  { 
    id: "disk", 
    name: "Disk / Plane", 
    icon: Box, 
    V: 4, E: 4, F: 1, 
    chi: 1, 
    genus: 0,
    desc: "A surface with a boundary (edge). Like a sheet of paper."
  },
];

export default function EulerWidget() {
  const [active, setActive] = useState(SHAPES[0]);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Hash size={14} className="text-violet-400" /> Euler Characteristic
        </h3>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Formula Display */}
        <div className="flex items-center justify-center gap-3 text-2xl font-mono font-bold text-white bg-violet-950/30 p-4 rounded-xl border border-violet-500/20">
            <div className="flex flex-col items-center">
                <span className="text-violet-400">{active.V}</span>
                <span className="text-[8px] text-neutral-500 uppercase">Verts</span>
            </div>
            <span className="text-neutral-600">-</span>
            <div className="flex flex-col items-center">
                <span className="text-violet-400">{active.E}</span>
                <span className="text-[8px] text-neutral-500 uppercase">Edges</span>
            </div>
            <span className="text-neutral-600">+</span>
            <div className="flex flex-col items-center">
                <span className="text-violet-400">{active.F}</span>
                <span className="text-[8px] text-neutral-500 uppercase">Faces</span>
            </div>
            <span className="text-neutral-400">=</span>
            <motion.div 
                key={active.chi}
                initial={{ scale: 1.5, color: "#fff" }}
                animate={{ scale: 1, color: "#8b5cf6" }}
                className="flex flex-col items-center"
            >
                <span>{active.chi}</span>
                <span className="text-[8px] text-neutral-500 uppercase">Chi (χ)</span>
            </motion.div>
        </div>

        {/* Genus Info */}
        <div className="flex justify-between items-center px-2 text-xs text-neutral-400">
            <span>Genus (Holes):</span>
            <span className="font-bold text-white">{active.genus}</span>
        </div>

        {/* Shape Selector */}
        <div className="space-y-2">
            {SHAPES.map((s) => (
                <button
                    key={s.id}
                    onClick={() => setActive(s)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-xs text-left
                        ${active.id === s.id 
                            ? "bg-violet-600/20 border-violet-500/50 text-white" 
                            : "bg-transparent border-transparent text-neutral-500 hover:bg-white/5 hover:text-neutral-300"}
                    `}
                >
                    <s.icon size={16} className={active.id === s.id ? "text-violet-400" : "text-neutral-600"} />
                    <div>
                        <span className="block font-bold">{s.name}</span>
                        <span className="block text-[10px] opacity-60 font-normal mt-0.5">{s.desc}</span>
                    </div>
                </button>
            ))}
        </div>

      </div>
      
      <div className="bg-neutral-950/50 px-5 py-3 border-t border-white/5">
        <p className="text-[10px] text-neutral-500 leading-relaxed">
            <strong>Topology Fact:</strong> No matter how you triangulate a sphere (cube, pyramid, soccer ball), V - E + F will <em>always</em> equal 2.
        </p>
      </div>
    </div>
  );
}