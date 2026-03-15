"use client";
import React from 'react';

export default function JusticeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-zinc-950">
      
      {/* The Central Pillar (The Axis of Law) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-700/30 to-transparent -translate-x-1/2" />
      
      {/* The Balance Beam */}
      <div className="absolute top-[40%] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* The Scales (Rotating Geometric Wireframes) */}
      <div className="absolute top-[40%] left-[25%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] -translate-x-1/2 -translate-y-1/2 border border-zinc-800/40 rounded-full animate-[spin_90s_linear_infinite]" />
      <div className="absolute top-[40%] right-[25%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] translate-x-1/2 -translate-y-1/2 border border-zinc-800/40 border-dashed rounded-full animate-[spin_90s_linear_infinite_reverse]" />
      
      {/* Authoritative Ambient Glow */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-amber-950/10 blur-[120px] rounded-t-[100%]" />
    </div>
  );
}