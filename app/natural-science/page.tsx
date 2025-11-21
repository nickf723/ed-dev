"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import CosmicBackground from "@/components/CosmicBackground";
import ScaleSlider from "@/components/ScaleSlider";
import { motion } from "framer-motion";
import {
  Atom,
  FlaskConical,
  Dna,
  Earth,
  Orbit,
  Zap,
  Waves,
  Flame,
  Microscope,
  Telescope
} from "@/components/icons";

// --- DATA: Disciplines with Scale Tags ---
// Scales: quantum, micro, macro, planetary, cosmic
const sectors = [
  {
    name: "The Physical Fabric",
    desc: "The fundamental rules of matter, energy, space, and time.",
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
        desc: "The study of celestial bodies and the universe.", 
        href: "/natural-science/astronomy", 
        Icon: Telescope, 
        className: "theme-astronomy", 
        subtitle: "The Cosmos" 
      },
      {
        id: "relativity",
        scales: ["cosmic"],
        title: "Relativity",
        desc: "Gravity as the curvature of spacetime.",
        href: "/natural-science/physics/relativity",
        Icon: Orbit,
        className: "theme-relativity",
        subtitle: "Spacetime"
      },
      {
        id: "quantum-mech",
        scales: ["quantum"],
        title: "Quantum Mechanics",
        desc: "Physics at the atomic and subatomic scale.",
        href: "/natural-science/physics/quantum-mechanics",
        Icon: Waves,
        className: "theme-quantum-mechanics",
        subtitle: "Subatomic"
      }
    ]
  },
  {
    name: "Matter & Earth",
    desc: "The composition of substances and the planet we inhabit.",
    color: "text-emerald-400",
    icon: Earth,
    items: [
      { 
        id: "chemistry", 
        scales: ["atomic", "micro"], 
        title: "Chemistry", 
        desc: "The study of substances and their transformations.", 
        href: "/natural-science/chemistry", 
        Icon: FlaskConical, 
        className: "theme-chemistry", 
        subtitle: "Reactions & Bonds" 
      },
      { 
        id: "earth-science", 
        scales: ["macro", "planetary"], 
        title: "Earth Science", 
        desc: "The study of the Earth's physical constitution.", 
        href: "/natural-science/earth-science", 
        Icon: Earth, 
        className: "theme-earth-science", 
        subtitle: "Planetary Systems" 
      },
      {
        id: "thermodynamics",
        scales: ["macro", "micro"],
        title: "Thermodynamics",
        desc: "Heat, work, and energy transfer systems.",
        href: "/natural-science/physics/thermodynamics",
        Icon: Flame,
        className: "theme-thermodynamics",
        subtitle: "Energy Systems"
      }
    ]
  },
  {
    name: "Life & Complexity",
    desc: "The study of living organisms and biological systems.",
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
      },
      {
        id: "microbiology",
        scales: ["micro"],
        title: "Microbiology", // Conceptual link for demo
        desc: "The study of microscopic organisms.",
        href: "/natural-science/biology", // linking to main bio page for now
        Icon: Microscope,
        className: "theme-biology",
        subtitle: "Cellular Life"
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
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-16">
      
      <CosmicBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-12">
        
        <PageHeader
          eyebrow="Domain 02"
          title="Natural Sciences"
          subtitle="The systematic study of the physical universe. From the strange rules of the quantum realm to the majestic expansion of the cosmos, we use observation and evidence to decode reality."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* MAIN CONTENT (8 cols) */}
          <div className="lg:col-span-8 space-y-16">
            {sectors.map((sector, idx) => (
              <section key={sector.name}>
                 <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="mb-6"
                 >
                    <div className="flex items-center gap-3 mb-2">
                        <sector.icon className={sector.color} size={24} />
                        <h2 className="text-xl font-bold text-white tracking-wide">{sector.name}</h2>
                    </div>
                    <p className="text-sm text-neutral-400 border-l-2 border-white/10 pl-4 ml-1">
                        {sector.desc}
                    </p>
                 </motion.div>

                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {sector.items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
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

          {/* SIDEBAR (4 cols) */}
          <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-8 h-fit pt-4">
            
            {/* Scale Slider Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <ScaleSlider activeScale={activeScale} setActiveScale={setActiveScale} />
            </motion.div>

            {/* Method Box */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-5"
            >
                <h4 className="text-sm font-bold text-neutral-200 mb-2 flex items-center gap-2">
                    <FlaskConical size={16} className="text-emerald-500"/> The Scientific Method
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                    Natural science relies on <strong>Inductive Reasoning</strong>. We observe the world, form hypotheses, and test them with experiments to build theories that predict future events.
                </p>
            </motion.div>

          </div>

        </div>
      </div>
    </main>
  );
}