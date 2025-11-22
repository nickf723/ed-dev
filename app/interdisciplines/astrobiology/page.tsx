"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import StardustBackground from "@/components/StardustBackground";
import DrakeWidget from "@/components/DrakeWidget";
import { motion } from "framer-motion";
import {
  Rocket, Dna, Globe, Microscope, Radio, Search, Sprout, FlaskConical
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Cosmic Origins",
    desc: "How life arises from inert matter.",
    color: "text-lime-400",
    icon: Sprout,
    items: [
      { 
        title: "Abiogenesis", 
        desc: "The natural process by which life has arisen from non-living matter, such as simple organic compounds.", 
        href: "/interdisciplines/astrobiology/abiogenesis", 
        Icon: FlaskConical, 
        className: "theme-biochemistry", // Using biochem theme
        subtitle: "The Spark" 
      },
      { 
        title: "Panspermia", 
        desc: "The hypothesis that life exists throughout the Universe, distributed by space dust, meteoroids, and asteroids.", 
        href: "/interdisciplines/astrobiology/panspermia", 
        Icon: Rocket, 
        className: "theme-astrophysics", // Using astrophysics theme
        subtitle: "The Seed" 
      }
    ]
  },
  {
    name: "Habitability",
    desc: "The conditions required to sustain life.",
    color: "text-cyan-400",
    icon: Globe,
    items: [
      { 
        title: "Exoplanets", 
        desc: "Planets outside our solar system. Identifying the 'Goldilocks Zone' where water can exist as liquid.", 
        href: "/interdisciplines/astrobiology/exoplanets", 
        Icon: Globe, 
        className: "theme-astronomy",
        subtitle: "New Worlds" 
      },
      { 
        title: "Extremophiles", 
        desc: "Organisms that thrive in extreme environments (heat, acid, pressure) on Earth, acting as models for alien life.", 
        href: "/interdisciplines/astrobiology/extremophiles", 
        Icon: Microscope, 
        className: "theme-biology",
        subtitle: "Survivors" 
      }
    ]
  },
  {
    name: "The Search (SETI)",
    desc: "Listening for signals and looking for markers.",
    color: "text-purple-400",
    icon: Radio,
    items: [
      { 
        title: "Biosignatures", 
        desc: "Chemical clues in a planet's atmosphere (like Oxygen + Methane) that indicate biological activity.", 
        href: "/interdisciplines/astrobiology/biosignatures", 
        Icon: Dna, 
        className: "theme-chemistry",
        subtitle: "Chemical Signs" 
      },
      { 
        title: "Technosignatures", 
        desc: "Evidence of advanced technology, such as radio signals, Dyson spheres, or industrial pollutants.", 
        href: "/interdisciplines/astrobiology/technosignatures", 
        Icon: Radio, 
        className: "theme-computer-science",
        subtitle: "Digital Signs" 
      }
    ]
  }
];

export default function AstrobiologyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Stardust Background */}
      <StardustBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Interdiscipline"
          title="Astrobiology"
          subtitle="The study of life in the universe. It combines astronomy, biology, and geology to answer the ultimate question: Are we alone, or is the cosmos teeming with life?"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (9 cols) */}
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
            
            {/* Drake Equation Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <DrakeWidget />
            </motion.div>

            {/* Quote */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-cyan-400 mb-2 flex items-center gap-2">
                    <Search size={14} /> The Fermi Paradox
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    "Where is everybody?" If the universe is so old and so vast, and life is probable, why haven't we seen any evidence of it yet?
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}