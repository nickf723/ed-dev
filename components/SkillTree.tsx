"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SKILL_TREE, SkillNode } from "@/lib/skill-db";
import { Lock, Check, Star } from "lucide-react";

export default function SkillTree() {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const updateSize = () => {
        if (containerRef.current) {
            setDimensions({
                w: containerRef.current.clientWidth,
                h: containerRef.current.clientHeight
            });
        }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Helper to convert % coordinates to pixels
  const getPos = (node: SkillNode) => ({
      x: (node.x / 100) * dimensions.w,
      y: (node.y / 100) * dimensions.h
  });

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl h-[600px] flex flex-col">
      
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center bg-neutral-900/50 z-10">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Star size={14} className="text-amber-400" /> Knowledge Constellation
        </h3>
        <div className="flex gap-4 text-[9px] uppercase font-bold text-neutral-500">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-white"/> Mastered</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"/> Available</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-neutral-700"/> Locked</span>
        </div>
      </div>

      <div className="relative flex-1 bg-[url('/grid.svg')] bg-center bg-fixed" ref={containerRef}>
          {dimensions.w > 0 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Draw Connections */}
                  {SKILL_TREE.map(node => {
                      const start = getPos(node);
                      return node.parents.map(parentId => {
                          const parent = SKILL_TREE.find(n => n.id === parentId);
                          if (!parent) return null;
                          const end = getPos(parent);
                          
                          const isActive = node.status !== "locked";
                          const color = isActive ? "rgba(6, 182, 212, 0.5)" : "rgba(255, 255, 255, 0.05)";
                          
                          return (
                              <line 
                                key={`${node.id}-${parentId}`}
                                x1={start.x} y1={start.y}
                                x2={end.x} y2={end.y}
                                stroke={color}
                                strokeWidth={isActive ? 2 : 1}
                                strokeDasharray={isActive ? "0" : "4 4"}
                              />
                          );
                      });
                  })}
              </svg>
          )}

          {/* Draw Nodes */}
          {SKILL_TREE.map(node => {
              const isMastered = node.status === "mastered";
              const isAvailable = node.status === "available";
              const isLocked = node.status === "locked";

              return (
                  <motion.button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    whileHover={{ scale: 1.1 }}
                    className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-2 flex items-center justify-center transition-all shadow-xl z-10
                        ${isMastered ? "bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]" : ""}
                        ${isAvailable ? "bg-neutral-900 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-pulse-slow" : ""}
                        ${isLocked ? "bg-neutral-950 border-neutral-800 text-neutral-700 grayscale" : ""}
                    `}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                      {isMastered && <Check size={20} strokeWidth={3} />}
                      {isAvailable && <Star size={20} fill="currentColor" />}
                      {isLocked && <Lock size={16} />}
                      
                      {/* Label */}
                      <span className={`absolute top-full mt-2 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap px-2 py-1 rounded bg-black/50 backdrop-blur border border-white/10
                          ${isLocked ? "text-neutral-600" : "text-white"}
                      `}>
                          {node.title}
                      </span>
                  </motion.button>
              );
          })}
      </div>

      {/* Details Panel (Slide up) */}
      {selectedNode && (
          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-neutral-900/95 border-t border-white/10 p-6 backdrop-blur-xl z-20"
          >
              <div className="flex justify-between items-start">
                  <div>
                      <h2 className="text-xl font-bold text-white mb-1">{selectedNode.title}</h2>
                      <span className="text-xs text-cyan-400 font-mono uppercase">{selectedNode.category} // {selectedNode.status}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedNode(null)}
                    className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-xs font-bold text-white"
                  >
                      Close
                  </button>
              </div>
              
              <div className="mt-4 flex gap-4">
                  {selectedNode.status === "available" && (
                      <button className="flex-1 py-3 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest text-xs">
                          Begin Module
                      </button>
                  )}
                  {selectedNode.status === "mastered" && (
                      <button className="flex-1 py-3 rounded bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-widest text-xs">
                          Review Material
                      </button>
                  )}
                  {selectedNode.status === "locked" && (
                      <div className="flex-1 py-3 rounded border border-dashed border-neutral-700 text-neutral-500 text-center font-bold text-xs uppercase">
                          Prerequisites Incomplete
                      </div>
                  )}
              </div>
          </motion.div>
      )}

    </div>
  );
}