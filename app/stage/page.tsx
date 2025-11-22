"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import StudioBackground from "@/components/StudioBackground";
import DirectorControls from "@/components/DirectorControls";
import { VariableVocabSquareShort } from "@/components/VariableComponents";
import { motion } from "framer-motion";
import { Clapperboard } from "lucide-react";

type ViewMode = "mobile" | "desktop" | "square";

export default function StagePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("square");
  const [showSafeZone, setShowSafeZone] = useState(false);

  // Dimensions for different modes
  const dimensions = {
    mobile: "max-w-[400px] aspect-[9/16]", // TikTok style
    square: "max-w-[600px] aspect-square",  // Instagram style
    desktop: "max-w-[900px] aspect-video",  // YouTube style
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Background */}
      <StudioBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Production Studio"
          title="The Stage"
          subtitle="A specialized environment for recording, reviewing, and presenting educational shorts. Frame your content and check it against platform constraints."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN VIEWPORT (8 cols) */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center min-h-[60vh]">
             
             {/* The "Camera" Frame */}
             <motion.div 
                layout
                className={`relative w-full ${dimensions[viewMode]} transition-all duration-500 ease-in-out border-4 border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden rounded-xl group`}
             >
                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/50">
                    {/* Ideally, you would swap this component out for whatever 
                        lesson you are currently recording. 
                    */}
                    <VariableVocabSquareShort />
                </div>

                {/* Safe Zone Overlay (TikTok/Reels UI Simulation) */}
                {showSafeZone && viewMode === 'mobile' && (
                    <div className="absolute inset-0 pointer-events-none border-[20px] border-red-500/10 z-50">
                        {/* Right sidebar icons area */}
                        <div className="absolute right-2 bottom-20 w-12 h-48 bg-red-500/20 rounded-lg flex flex-col items-center justify-center text-[8px] text-red-200 uppercase font-bold">
                            UI
                        </div>
                        {/* Bottom caption area */}
                        <div className="absolute left-2 right-16 bottom-4 h-24 bg-red-500/20 rounded-lg flex items-center justify-center text-[8px] text-red-200 uppercase font-bold">
                            Caption & Audio
                        </div>
                        {/* Top Search area */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-4 w-32 h-8 bg-red-500/20 rounded-full" />
                    </div>
                )}

                {/* REC Indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-red-500/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    REC
                </div>

             </motion.div>

             <p className="mt-6 text-neutral-500 text-xs font-mono">
                CURRENT_SCENE: VARIABLE_VOCAB_01
             </p>
          </div>

          {/* SIDEBAR: Controls (4 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-6 h-fit pt-2">
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <DirectorControls 
                  viewMode={viewMode} 
                  setViewMode={setViewMode} 
                  showSafeZone={showSafeZone} 
                  setShowSafeZone={setShowSafeZone} 
               />
            </motion.div>

            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-neutral-400 mb-2 flex items-center gap-2">
                    <Clapperboard size={14} /> Production Notes
                </h4>
                <ul className="space-y-2">
                    <li className="text-[11px] text-neutral-500 leading-relaxed">
                        • Keep motion swift (300-500ms).
                    </li>
                    <li className="text-[11px] text-neutral-500 leading-relaxed">
                        • Ensure contrast meets WCAG AA.
                    </li>
                    <li className="text-[11px] text-neutral-500 leading-relaxed">
                        • Avoid placing text in UI safe zones.
                    </li>
                </ul>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}