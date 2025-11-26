"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { glossaryTerms } from "@/lib/glossary-db";
import { AXIOM_LIBRARY } from "@/lib/axiom-db";
import { ASSET_LIBRARY } from "@/lib/asset-db";
import { Share2, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";

// Combine data sources into nodes
const NODES = [
  ...Object.keys(glossaryTerms).map(k => ({ id: k, group: "term", label: k, r: 4 })),
  ...AXIOM_LIBRARY.map(a => ({ id: a.id, group: "axiom", label: a.title, r: 8 })),
  ...ASSET_LIBRARY.map(a => ({ id: a.id, group: "asset", label: a.title, r: 6 })),
];

// Generate random links for demo (In production, you'd map these real relationships)
const LINKS = NODES.flatMap((node, i) => {
    // Connect to 1-2 random other nodes to simulate "dense knowledge"
    if (i % 2 === 0 && i < NODES.length - 1) {
        return [{ source: node.id, target: NODES[i + 1].id }];
    }
    return [];
});

export default function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let h = (canvas.height = 500);

    // Simulation State
    const nodes = NODES.map(n => ({ 
        ...n, 
        x: Math.random() * w, 
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
    }));

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Physics Update
      nodes.forEach(node => {
          node.x += node.vx;
          node.y += node.vy;

          // Bounce bounds
          if (node.x < 0 || node.x > w) node.vx *= -1;
          if (node.y < 0 || node.y > h) node.vy *= -1;
          
          // Mouse interaction (fake repulsion if hovered)
          // ... (simplified for brevity)
      });

      // Draw Links
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      LINKS.forEach(link => {
          const s = nodes.find(n => n.id === link.source);
          const t = nodes.find(n => n.id === link.target);
          if (s && t) {
              ctx.moveTo(s.x, s.y);
              ctx.lineTo(t.x, t.y);
          }
      });
      ctx.stroke();

      // Draw Nodes
      nodes.forEach(node => {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
          
          if (node.group === "axiom") ctx.fillStyle = "#a78bfa"; // Violet
          else if (node.group === "asset") ctx.fillStyle = "#f472b6"; // Pink
          else ctx.fillStyle = "#22d3ee"; // Cyan
          
          ctx.fill();
          
          // Glow
          ctx.shadowBlur = 10;
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    
    const handleResize = () => {
        if (canvas.parentElement) {
            w = canvas.width = canvas.parentElement.clientWidth;
            h = canvas.height = 500;
        }
    };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl h-[500px] relative flex flex-col">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center z-10 bg-neutral-900/50">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Share2 size={14} className="text-cyan-400" /> Knowledge Graph
        </h3>
        <div className="flex gap-2">
            <span className="flex items-center gap-1 text-[9px] uppercase text-neutral-500"><div className="w-2 h-2 rounded-full bg-violet-400"/> Law</span>
            <span className="flex items-center gap-1 text-[9px] uppercase text-neutral-500"><div className="w-2 h-2 rounded-full bg-pink-400"/> Asset</span>
            <span className="flex items-center gap-1 text-[9px] uppercase text-neutral-500"><div className="w-2 h-2 rounded-full bg-cyan-400"/> Term</span>
        </div>
      </div>

      <div className="relative flex-1 bg-black/20">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          
          {/* Floating HUD */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"><ZoomIn size={16}/></button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"><ZoomOut size={16}/></button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"><RefreshCw size={16}/></button>
          </div>
      </div>
    </div>
  );
}