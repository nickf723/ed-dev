"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import BlueprintBackground from "@/components/BlueprintBackground"; 
import ThemeController from "@/components/ThemeController";
import {
  LockKeyholeOpen,
  Zap,
  Ghost,
  Sparkle,
  ScanLine,
} from "@/components/icons";
import { motion } from "framer-motion";
import { BoxSelect } from "lucide-react";

// --- DATA ---
const experiments = [
  {
    title: "Neon Pulse",
    desc: "High-contrast glowing borders for emphasis.",
    href: "#",
    Icon: Zap,
    className: "card-neon-pulse"
  },
  {
    title: "Gradient Border",
    desc: "Animated RGB gradient rotating around the card.",
    href: "#",
    Icon: BoxSelect,
    className: "card-gradient-border"
  },
  {
    title: "Holographic",
    desc: "Simulated iridescent foil effect on hover.",
    href: "#",
    Icon: Sparkle,
    className: "card-holographic"
  },
  {
    title: "Glass Frost",
    desc: "Heavy blur and noise texture for a frosted look.",
    href: "#",
    Icon: Ghost,
    className: "card-frost"
  },
  {
    title: "Data Stream",
    desc: "CRT scanline animation for retro terminals.",
    href: "#",
    Icon: ScanLine,
    className: "card-data-stream"
  },
  {
    title: "Glitch Text",
    desc: "RGB split animation for errors or tech themes.",
    href: "#",
    Icon: LockKeyholeOpen,
    className: "effect-glitch"
  },
];

export default function DevPlaygroundPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Background */}
      <BlueprintBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="System Lab"
          title="Dev Playground"
          subtitle="The Construct. A testing ground for experimental UI components, animations, and layout patterns before they are deployed to the main network."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT: Component Showcase (8 cols) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Card Experiments */}
            <section>
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                    <BoxSelect className="text-cyan-400" size={24} />
                    <h2 className="text-xl font-bold text-white tracking-wide">Card Variants</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {experiments.map((card, i) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <TopicCard {...card} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Button Lab */}
            <section>
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                    <Zap className="text-yellow-400" size={24} />
                    <h2 className="text-xl font-bold text-white tracking-wide">Button Dynamics</h2>
                </div>
                <div className="flex flex-wrap gap-6 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <button className="btn-neon">Neon Action</button>
                    <button className="btn-cyber">Cyber Press</button>
                    <button className="btn-glass">Glass Click</button>
                    <button className="btn-shimmer">Shimmer</button>
                </div>
            </section>

          </div>

          {/* SIDEBAR: Controls (4 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* Theme Injector */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <ThemeController />
            </motion.div>

            {/* Debug Info Box */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40 font-mono text-xs text-neutral-500">
                <p className="mb-2 text-neutral-300 font-bold">// SYSTEM STATUS</p>
                <p>RENDER: CLIENT_SIDE</p>
                <p>ANIMATION: FRAMER_MOTION</p>
                <p>CSS_VARS: ACTIVE</p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}