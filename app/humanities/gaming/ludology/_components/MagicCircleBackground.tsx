"use client";
import React from 'react';

export default function MagicCircleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      {/* The Magic Circle Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-rose-900/20 shadow-[0_0_100px_rgba(159,18,57,0.05)] animate-[spin_60s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-rose-500/10 border-dashed animate-[spin_40s_linear_infinite_reverse]" />
      
      {/* Deep Space Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#050505_70%)]" />
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vh] bg-rose-900/10 blur-[120px] rounded-full" />
    </div>
  );
}