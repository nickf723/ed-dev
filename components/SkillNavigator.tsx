"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { getNeighborhood, SkillNode } from "@/lib/curriculum-db";
import { ArrowUp, ArrowDown, Circle, CheckCircle, Lock } from "lucide-react";

export default function SkillNavigator({ currentNodeId }: { currentNodeId: string }) {
  const data = getNeighborhood(currentNodeId);
  if (!data) return <div className="p-4 text-red-500">Node Not Found</div>;

  const { node, parents, children } = data;

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. PREREQUISITES (Upstream) */}
      {parents.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
            <ArrowUp size={12} /> Foundations
          </h4>
          {parents.map(parent => (
            <SkillLink key={parent.id} node={parent} status="mastered" />
          ))}
        </div>
      )}

      {/* 2. CURRENT NODE (Active) */}
      <div className="relative p-4 rounded-xl border border-cyan-500/50 bg-cyan-950/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-12 rounded-full bg-cyan-500" />
        <h3 className="text-lg font-bold text-white mb-1">{node.title}</h3>
        <p className="text-xs text-cyan-200/70">{node.desc}</p>
        <div className="mt-3 flex gap-2">
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                ACTIVE MODULE
            </span>
        </div>
      </div>

      {/* 3. UNLOCKS (Downstream) */}
      {children.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
            <ArrowDown size={12} /> Unlocks
          </h4>
          {children.map(child => (
            <SkillLink key={child.id} node={child} status="locked" />
          ))}
        </div>
      )}

    </div>
  );
}

// --- Helper: Mini Card ---
function SkillLink({ node, status }: { node: SkillNode, status: "mastered" | "locked" }) {
    const isMastered = status === "mastered";
    
    return (
        <Link 
            href={node.href}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all group
                ${isMastered 
                    ? "bg-neutral-900/50 border-green-500/20 hover:bg-green-950/30 hover:border-green-500/50" 
                    : "bg-neutral-900/30 border-white/5 hover:bg-white/5 hover:border-white/10"}
            `}
        >
            <div className={`shrink-0 ${isMastered ? "text-green-500" : "text-neutral-600"}`}>
                {isMastered ? <CheckCircle size={16} /> : <Lock size={16} />}
            </div>
            
            <div>
                <span className={`block text-sm font-bold transition-colors ${isMastered ? "text-neutral-200 group-hover:text-green-300" : "text-neutral-500 group-hover:text-neutral-300"}`}>
                    {node.title}
                </span>
                <span className="text-[10px] text-neutral-600 group-hover:text-neutral-500">
                    {node.category}
                </span>
            </div>
        </Link>
    )
}