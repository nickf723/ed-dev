"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ZONES, NODES, ROUTES, MapNode, MapZone } from "@/lib/atlas-db";
import { Map as MapIcon, Navigation, Radar, ExternalLink, X } from "lucide-react";

export default function NexusAtlas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredZone, setHoveredZone] = useState<MapZone | null>(null);
  const [hoveredNode, setHoveredNode] = useState<MapNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);

  const activeNode = selectedNode || hoveredNode;
  const activeZone = activeNode ? ZONES.find(z => z.id === activeNode.zone) : hoveredZone;

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl h-[650px] flex relative">
      
      {/* THE MAP LAYER (Main) */}
      <div 
        className="relative flex-1 h-full bg-[#050505] overflow-hidden cursor-crosshair" 
        ref={containerRef}
        onClick={() => setSelectedNode(null)} // Click empty space to deselect
      >
          
          {/* 1. Zones (Background Blobs) */}
          {ZONES.map(zone => {
              const isActive = activeZone?.id === zone.id;
              return (
                  <div
                    key={zone.id}
                    className="absolute rounded-full blur-3xl transition-all duration-700 pointer-events-none"
                    style={{
                        left: `${zone.x}%`,
                        top: `${zone.y}%`,
                        width: `${zone.r * 2.5}%`,
                        height: `${zone.r * 2.5}%`,
                        transform: "translate(-50%, -50%)",
                        backgroundColor: zone.color,
                        opacity: isActive ? 0.25 : 0.08,
                    }}
                  />
              );
          })}

          {/* 2. Grid Lines */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
          />

          {/* 3. Connections (SVG Layer) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {ROUTES.map((route, i) => {
                  const s = NODES.find(n => n.id === route.source);
                  const t = NODES.find(n => n.id === route.target);
                  if (!s || !t) return null;

                  const isRelated = activeNode && (activeNode.id === s.id || activeNode.id === t.id);
                  
                  return (
                      <motion.line 
                        key={i}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: isRelated ? 0.8 : 0.15 }}
                        x1={`${s.x}%`} y1={`${s.y}%`}
                        x2={`${t.x}%`} y2={`${t.y}%`}
                        stroke={isRelated ? "#fff" : "rgba(255,255,255,0.5)"}
                        strokeWidth={isRelated ? 2 : 1}
                        strokeDasharray={route.type === "weak" ? "4 4" : "0"}
                      />
                  )
              })}
          </svg>

          {/* 4. Interactive Nodes */}
          {NODES.map(node => {
              const zone = ZONES.find(z => z.id === node.zone);
              const isHovered = hoveredNode?.id === node.id;
              const isSelected = selectedNode?.id === node.id;
              
              return (
                  <button
                    key={node.id}
                    onClick={(e) => { e.stopPropagation(); setSelectedNode(node); }}
                    onMouseEnter={() => { setHoveredNode(node); }}
                    onMouseLeave={() => { setHoveredNode(null); }}
                    className="absolute z-20 flex flex-col items-center justify-center group outline-none"
                    style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
                  >
                      {/* Orbit Ring */}
                      {(isHovered || isSelected) && (
                          <motion.div 
                            layoutId="orbit"
                            className="absolute w-12 h-12 rounded-full border border-white/30"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                      )}

                      {/* The Dot */}
                      <div className={`rounded-full border-2 transition-all duration-300 shadow-lg z-10 relative
                          ${node.size === "hub" ? "w-4 h-4" : "w-2 h-2"}
                          ${isSelected ? "bg-white border-white scale-125" : "bg-neutral-900 border-neutral-500 group-hover:border-white"}
                      `} 
                      style={{ borderColor: isSelected ? "#fff" : zone?.color }}
                      />
                      
                      {/* Label */}
                      <span className={`absolute top-full mt-3 px-2 py-1 rounded bg-black/70 border border-white/10 backdrop-blur text-[9px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300
                          ${node.size === "hub" || isHovered || isSelected ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
                          ${isSelected ? "text-white border-white/30" : "text-neutral-400"}
                      `}>
                          {node.label}
                      </span>
                  </button>
              );
          })}

          {/* HUD: Map Controls (Visual Only for now) */}
          <div className="absolute top-6 left-6 pointer-events-none">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white">
                <MapIcon size={16} className="text-cyan-400" /> Nexus Atlas
              </h3>
              <p className="text-xs text-neutral-500 mt-1 font-mono">SECTOR VIEW [LIVE]</p>
          </div>

      </div>

      {/* THE SCANNER (Sidebar) */}
      <div className="w-80 border-l border-white/10 bg-neutral-950/50 backdrop-blur-xl flex flex-col">
          
          {/* Scanner Header */}
          <div className="p-6 border-b border-white/5 bg-white/5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <Radar size={14} className={activeZone ? "text-green-400 animate-pulse" : "text-neutral-600"} />
                  Sensor Data
              </h4>
          </div>

          {/* Dynamic Content */}
          <div className="flex-1 p-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                  {activeNode ? (
                      <motion.div 
                        key={activeNode.id}
                        initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                        className="space-y-6"
                      >
                          <div>
                              <span className="text-[10px] font-bold uppercase text-cyan-500 mb-1 block">Node Identification</span>
                              <h2 className="text-3xl font-black text-white leading-none mb-2">{activeNode.label}</h2>
                              <span className="text-xs font-mono text-neutral-500 border border-neutral-800 px-2 py-0.5 rounded">
                                  SECTOR: {activeNode.zone.toUpperCase()}
                              </span>
                          </div>

                          <div>
                              <span className="text-[10px] font-bold uppercase text-neutral-500 mb-2 block">Description</span>
                              <p className="text-sm text-neutral-300 leading-relaxed border-l-2 border-white/10 pl-3">
                                  {activeNode.desc}
                              </p>
                          </div>

                          <div>
                              <span className="text-[10px] font-bold uppercase text-neutral-500 mb-2 block">Status</span>
                              <div className="grid grid-cols-2 gap-2">
                                  <div className="bg-neutral-900/50 p-2 rounded border border-white/5 text-center">
                                      <span className="block text-white font-bold text-lg">100%</span>
                                      <span className="text-[9px] text-neutral-500 uppercase">Integrity</span>
                                  </div>
                                  <div className="bg-neutral-900/50 p-2 rounded border border-white/5 text-center">
                                      <span className="block text-white font-bold text-lg">
                                          {ROUTES.filter(r => r.source === activeNode.id || r.target === activeNode.id).length}
                                      </span>
                                      <span className="text-[9px] text-neutral-500 uppercase">Links</span>
                                  </div>
                              </div>
                          </div>

                          {/* The Warp Button */}
                          <Link 
                            href={activeNode.href}
                            className="group flex items-center justify-center gap-2 w-full py-4 bg-white text-black rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-cyan-400 transition-colors"
                          >
                              Initialize Link <Navigation size={14} className="group-hover:translate-x-1 transition-transform" />
                          </Link>

                      </motion.div>
                  ) : activeZone ? (
                      <motion.div 
                        key={activeZone.id}
                        initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                        className="space-y-4 text-center mt-10"
                      >
                          <div className="w-16 h-16 rounded-full mx-auto mb-4 opacity-20" style={{ backgroundColor: activeZone.color }} />
                          <h2 className="text-2xl font-bold text-white">{activeZone.label}</h2>
                          <p className="text-sm text-neutral-400">{activeZone.desc}</p>
                          <p className="text-xs text-neutral-600 font-mono mt-4">Select a node for detailed telemetry.</p>
                      </motion.div>
                  ) : (
                      <motion.div 
                        key="idle"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-full text-neutral-600 space-y-4"
                      >
                          <div className="w-12 h-12 border-2 border-dashed border-neutral-800 rounded-full animate-spin-slow" />
                          <p className="text-xs uppercase tracking-widest">Scanning Sector...</p>
                      </motion.div>
                  )}
              </AnimatePresence>
          </div>

      </div>

    </div>
  );
}