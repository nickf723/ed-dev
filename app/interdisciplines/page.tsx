"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import SynthesisBackground from "@/components/SynthesisBackground";
import FusionReactor from "@/components/FusionReactor";
import { motion } from "framer-motion";
import {
  Dna, Cpu, Brain, Rocket, Atom, FlaskConical, Globe, Leaf, Network
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Natural Synthesis",
    desc: "Where physical and biological systems merge.",
    color: "text-lime-400",
    icon: Leaf,
    items: [
      { 
        id: "biochemistry", 
        title: "Biochemistry", 
        desc: "The chemical processes within and related to living organisms.", 
        href: "/interdisciplines/biochemistry", 
        Icon: FlaskConical, 
        className: "theme-chemistry", // Inherits chem colors
        subtitle: "Life + Chemistry" 
      },
      { 
        id: "biophysics", 
        title: "Biophysics", 
        desc: "Applying theories and methods of physics to biological systems.", 
        href: "/interdisciplines/biophysics", 
        Icon: Atom, 
        className: "theme-physics", // Inherits physics colors
        subtitle: "Life + Physics" 
      }
    ]
  },
  {
    name: "Technological Fusion",
    desc: "The bridge between biology, intelligence, and engineering.",
    color: "text-cyan-400",
    icon: Network,
    items: [
      { 
        id: "bioengineering", 
        title: "Bioengineering", 
        desc: "The application of engineering principles to biology and medicine.", 
        href: "/interdisciplines/bioengineering", 
        Icon: Dna, 
        className: "theme-applied-science",
        subtitle: "Bio + Tech" 
      },
      { 
        id: "cognitive-science", 
        title: "Cognitive Science", 
        desc: "The interdisciplinary study of mind and intelligence.", 
        href: "/interdisciplines/cognitive-science", 
        Icon: Brain, 
        className: "theme-psychology",
        subtitle: "Mind + Machine" 
      }
    ]
  },
  {
    name: "Cosmic & Global",
    desc: "Large scale integration of space, time, and society.",
    color: "text-purple-400",
    icon: Globe,
    items: [
      { 
        id: "astrophysics", 
        title: "Astrophysics", 
        desc: "Using physics and chemistry to explain the birth and death of stars.", 
        href: "/interdisciplines/astrophysics", 
        Icon: Rocket, 
        className: "theme-astronomy",
        subtitle: "Space + Physics" 
      },
      { 
        id: "geophysics", 
        title: "Geophysics", 
        desc: "The physics of the Earth and its environment in space.", 
        href: "/interdisciplines/geophysics", 
        Icon: Globe, 
        className: "theme-earth-science",
        subtitle: "Earth + Physics" 
      }
    ]
  }
];

export default function InterdisciplinesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Synthesis Background */}
      <SynthesisBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Domain 06"
          title="Interdisciplines"
          subtitle="The edges of the map. Real-world problems rarely fit into neat categories. These fields exist at the intersection of domains, weaving distinct threads of knowledge into new fabrics of understanding."
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

                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            
            {/* Fusion Reactor Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <FusionReactor />
            </motion.div>

            {/* "The Edge" Box */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="rounded-lg border border-lime-500/20 bg-lime-950/10 p-4 backdrop-blur-md"
            >
                <div className="flex items-start gap-3">
                    <Network size={18} className="text-lime-400 shrink-0 mt-1"/>
                    <div>
                        <h4 className="text-xs font-bold uppercase text-lime-400 mb-1">
                            Emergence
                        </h4>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                            New properties appear when systems interact. Water is wet, but hydrogen and oxygen are not. Interdisciplines study these emergent properties.
                        </p>
                    </div>
                </div>
            </motion.div>

          </div>

        </div>
      </div>
    </main>
  );
}