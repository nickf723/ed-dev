"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import CosmicBackground from "@/components/CosmicBackground";
import ScaleSlider from "@/components/ScaleSlider";
import { motion } from "framer-motion";
import {
  Atom, FlaskConical, Dna, Earth, Orbit, Zap, Waves, Flame, Microscope, Telescope
} from "@/components/icons";

// --- DATA: Disciplines ---
const sectors = [
  {
    name: "The Physical Fabric",
    desc: "Fundamental laws of matter, energy, space, and time.",
    color: "text-indigo-400",
    icon: Zap,
    items: [
      { 
        id: "physics", 
        scales: ["quantum", "macro", "cosmic"], 
        title: "Physics", 
        desc: "The study of matter, motion, and energy.", 
        href: "/natural-science/physics", 
        Icon: Atom, 
        className: "theme-physics", 
        subtitle: "Fundamental Laws" 
      },
      { 
        id: "astronomy", 
        scales: ["planetary", "cosmic"], 
        title: "Astronomy", 
        desc: "Celestial bodies and the cosmos.", 
        href: "/natural-science/astronomy", 
        Icon: Telescope, 
        className: "theme-astronomy", 
        subtitle: "The Cosmos" 
      },
      {
        id: "relativity",
        scales: ["cosmic"],
        title: "Relativity",
        desc: "Gravity as spacetime curvature.",
        href: "/natural-science/physics/relativity",
        Icon: Orbit,
        className: "theme-relativity", 
        subtitle: "Spacetime"
      },
      {
        id: "quantum-mech",
        scales: ["quantum"],
        title: "Quantum Mechanics",
        desc: "Physics at the atomic scale.",
        href: "/natural-science/physics/quantum-mechanics",
        Icon: Waves,
        className: "theme-quantum-mechanics",
        subtitle: "Subatomic"
      },
      {
        id: "thermodynamics",
        scales: ["macro", "micro"],
        title: "Thermodynamics",
        desc: "Heat, work, and entropy.",
        href: "/natural-science/physics/thermodynamics",
        Icon: Flame,
        className: "theme-thermodynamics",
        subtitle: "Energy Systems"
      }
    ]
  },
  {
    name: "Matter & Earth",
    desc: "Substances and our planetary home.",
    color: "text-emerald-400",
    icon: Earth,
    items: [
      { 
        id: "chemistry", 
        scales: ["atomic", "micro"], 
        title: "Chemistry", 
        desc: "Substances and transformations.", 
        href: "/natural-science/chemistry", 
        Icon: FlaskConical, 
        className: "theme-chemistry", 
        subtitle: "Reactions" 
      },
      { 
        id: "earth-science", 
        scales: ["macro", "planetary"], 
        title: "Earth Science", 
        desc: "The physical constitution of Earth.", 
        href: "/natural-science/earth-science", 
        Icon: Earth, 
        className: "theme-earth-science", 
        subtitle: "Planetary" 
      }
    ]
  },
  {
    name: "Life",
    desc: "Living organisms and ecosystems.",
    color: "text-teal-400",
    icon: Dna,
    items: [
      { 
        id: "biology", 
        scales: ["micro", "macro"], 
        title: "Biology", 
        desc: "The scientific study of life.", 
        href: "/natural-science/biology", 
        Icon: Dna, 
        className: "theme-biology", 
        subtitle: "Living Systems" 
      }
    ]
  }
];

export default function NaturalSciencePage() {
  const [activeScale, setActiveScale] = useState<string | null>(null);

  const getVariant = (itemScales: string[]) => {
    if (!activeScale) return "default";
    if (itemScales.includes(activeScale)) return "highlighted";
    return "dimmed";
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      <CosmicBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        {/* Compact Header */}
        <PageHeader
          eyebrow="Domain 02"
          title="Natural Sciences"
          subtitle="From quantum foam to galactic clusters: we observe, hypothesize, and test to understand the physical universe."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (8 cols) */}
          {/* Reduced gap-y to bring sections closer */}
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

                 {/* Denser Grid: gap-4 instead of gap-6 */}
                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sector.items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
                        >
                            <TopicCard 
                                {...item} 
                                variant={getVariant(item.scales)}
                            />
                        </motion.div>
                    ))}
                 </div>
              </section>
            ))}
          </div>

          {/* SIDEBAR (3 cols) - Made it narrower to give content more room */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <ScaleSlider activeScale={activeScale} setActiveScale={setActiveScale} />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="rounded-lg border border-emerald-500/20 bg-emerald-950/10 p-4 backdrop-blur-md"
            >
                <div className="flex items-start gap-3">
                    <FlaskConical size={18} className="text-emerald-400 shrink-0 mt-1"/>
                    <div>
                        <h4 className="text-xs font-bold uppercase text-emerald-400 mb-1">
                            Methodology
                        </h4>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                            Observation ➔ Hypothesis ➔ Experiment ➔ Theory.
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