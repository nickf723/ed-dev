"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import PianoRollBackground from "@/app/humanities/arts-aesthetics/music/harmony/PianoRollBackground";
import IntervalWidget from "@/app/humanities/arts-aesthetics/music/harmony/IntervalWidget";
import { motion } from "framer-motion";
import {
  Music, Activity, ListMusic, AlignVerticalJustifyCenter, Layers, ArrowRight, Mic2
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "The X-Axis: Melody",
    desc: "The linear succession of musical tones that the listener perceives as a single entity.",
    color: "text-rose-400",
    icon: Activity,
    items: [
      { 
        title: "Scale & Mode", 
        desc: "The ordered sequence of notes that defines a key (Major, Minor, Dorian, etc.).", 
        href: "/humanities/arts-aesthetics/music/scales", 
        Icon: Music, 
        className: "theme-humanities",
        subtitle: "The Palette" 
      },
      { 
        title: "Contour & Phrasing", 
        desc: "The shape of the melody line and how it breathes (sentences in sound).", 
        href: "/humanities/arts-aesthetics/music/phrasing", 
        Icon: Activity, 
        className: "theme-humanities",
        subtitle: "The Shape" 
      }
    ]
  },
  {
    name: "The Y-Axis: Harmony",
    desc: "The vertical aspect of music. Notes played simultaneously to create chords.",
    color: "text-amber-400",
    icon: AlignVerticalJustifyCenter,
    items: [
      { 
        title: "Chords & Triads", 
        desc: "Stacking intervals to create stability (Major) or tension (Diminished).", 
        href: "/humanities/arts-aesthetics/music/chords", 
        Icon: AlignVerticalJustifyCenter, 
        className: "theme-humanities",
        subtitle: "Vertical Structure" 
      },
      { 
        title: "Progression", 
        desc: "The movement from one chord to another, creating a narrative of tension and release.", 
        href: "/humanities/arts-aesthetics/music/progression", 
        Icon: ListMusic, 
        className: "theme-humanities",
        subtitle: "Harmonic Motion" 
      }
    ]
  },
  {
    name: "The Z-Axis: Texture",
    desc: "How the melodic, rhythmic, and harmonic materials are combined.",
    color: "text-violet-400",
    icon: Layers,
    items: [
      { 
        title: "Counterpoint", 
        desc: "The art of combining different melodic lines in a musical composition.", 
        href: "/humanities/arts-aesthetics/music/counterpoint", 
        Icon: Layers, 
        className: "theme-humanities",
        subtitle: "Polyphony" 
      }
    ]
  }
];

export default function HarmonyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Background */}
      <PianoRollBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Music Theory"
          title="Melody & Harmony"
          subtitle="Music is geometry in time. Melody moves horizontally (X-axis), while Harmony stacks vertically (Y-axis). Together, they create the coordinate system of emotion."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (8 cols) */}
          <div className="lg:col-span-9 space-y-10">
             {sectors.map((sector, idx) => (
              <section key={sector.name}>
                 <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="mb-4 flex items-center gap-3"
                 >
                    <sector.icon className={sector.color} size={20} />
                    <h2 className="text-lg font-bold text-white tracking-wide">{sector.name}</h2>
                    <div className="h-[1px] flex-1 bg-white/10"></div>
                 </motion.div>

                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                    {sector.items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
                        >
                            <TopicCard {...item} />
                        </motion.div>
                    ))}
                 </div>
              </section>
            ))}
          </div>

          {/* SIDEBAR (3 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* Interval Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <IntervalWidget />
            </motion.div>

            {/* Quote */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-rose-400 mb-2 flex items-center gap-2">
                    <Mic2 size={14} /> The Overtone Series
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Why does a major chord sound "happy" or stable? Because the notes (Root, 3rd, 5th) are the first few audible frequencies in nature's own harmonic series.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}