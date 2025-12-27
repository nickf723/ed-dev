"use client";

import { motion } from "framer-motion";

export default function AxiomBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#030303] pointer-events-none">
      
      {/* 1. The Immutable Grid (Bedrock) */}
      <div className="absolute inset-0 opacity-20" 
           style={{ 
             backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
             backgroundSize: '100px 100px'
           }} 
      />
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: `linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)`,
             backgroundSize: '20px 20px'
           }} 
      />

      {/* 2. Floating Truth Values (T/F) */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
            key={i}
            initial={{ 
                opacity: 0, 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight 
            }}
            animate={{ 
                opacity: [0, 0.3, 0], 
                y: "+=50" 
            }}
            transition={{ 
                duration: Math.random() * 5 + 5, 
                repeat: Infinity, 
                delay: Math.random() * 5 
            }}
            className="absolute text-[10px] font-mono font-bold text-red-500/40 select-none"
        >
            {Math.random() > 0.5 ? "TRUE" : "FALSE"}
        </motion.div>
      ))}

      {/* 3. The Central Pillar (Gradient Glow) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 blur-[120px] rounded-full mix-blend-screen" />
      
    </div>
  );
}