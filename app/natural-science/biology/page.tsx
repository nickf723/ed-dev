"use client";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import LifeBackground from "@/app/natural-science/biology/LifeBackground";
import CellInspector from "@/app/natural-science/biology/CellInspector";
import TaxonomyTree from "@/app/natural-science/biology/TaxonomyTree";
import EvoWidget from "@/app/natural-science/biology/EvoWidget";
import { motion } from "framer-motion";
import {
  Dna, Microscope, Sprout, Globe, Fingerprint, GitFork, Bug, Flower,
  Binary, Activity, Layers, ArrowDown
} from "lucide-react";

// --- SECTOR DATA ---
const biologicalScales = [
  {
    id: "basis",
    title: "The Molecular Basis",
    subtitle: "Life's Operating System",
    desc: "The fundamental machinery of life. How information is stored in DNA, transcribed by RNA, and executed by cells.",
    color: "text-lime-400",
    border: "border-lime-500/20",
    icon: Binary,
    widget: <CellInspector />,
    topics: [
      { 
        title: "Genetics", 
        desc: "The study of heredity and the variation of inherited characteristics.", 
        href: "/natural-science/biology/genetics", 
        Icon: Dna, 
        className: "theme-lime",
        subtitle: "The Code" 
      },
      { 
        title: "Molecular Biology", 
        desc: "Molecular basis of biological activity in and between cells.", 
        href: "/natural-science/biology/molecular", 
        Icon: Fingerprint, 
        className: "theme-lime",
        subtitle: "The Chemistry" 
      },
      { 
        title: "Cytology", 
        desc: "The study of cell structure, function, and chemistry.", 
        href: "/natural-science/biology/cytology", 
        Icon: Microscope, 
        className: "theme-lime",
        subtitle: "The Unit" 
      }
    ]
  },
  {
    id: "evolution",
    title: "The Evolutionary Process",
    subtitle: "The Engine of Change",
    desc: "Life is not static. Through mutation, selection, and drift, organisms adapt to their environments over vast timescales.",
    color: "text-amber-400",
    border: "border-amber-500/20",
    icon: GitFork,
    widget: <EvoWidget />,
    topics: [
      { 
        title: "Evolutionary Biology", 
        desc: "The processes that generated the diversity of life on Earth.", 
        href: "/natural-science/biology/evolution", 
        Icon: Activity, 
        className: "theme-amber",
        subtitle: "Adaptation" 
      }
    ]
  },
  {
    id: "diversity",
    title: "Biodiversity",
    subtitle: "Endless Forms Most Beautiful",
    desc: "The branching tree of life. From microscopic bacteria to giant sequoias and complex animals.",
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    icon: Layers,
    widget: <TaxonomyTree />,
    topics: [
      { 
        title: "Microbiology", 
        desc: "Bacteria, viruses, archaea, and protozoa.", 
        href: "/natural-science/biology/microbiology", 
        Icon: Microscope, 
        className: "theme-emerald",
        subtitle: "The Invisible" 
      },
      {
        title: "Botany",
        desc: "The biology of plants, from algae to angiosperms.",
        href: "/natural-science/biology/botany",
        Icon: Flower,
        className: "theme-emerald",
        subtitle: "The Producers"
      },
      {
        title: "Mycology",
        desc: "The study of fungi, yeasts, and molds.",
        href: "/natural-science/biology/mycology",
        Icon: Sprout, 
        className: "theme-emerald",
        subtitle: "The Decomposers"
      },
      {
        title: "Zoology",
        desc: "The study of the animal kingdom, including physiology and behavior.",
        href: "/natural-science/biology/zoology",
        Icon: Bug,
        className: "theme-emerald",
        subtitle: "The Consumers"
      }
    ]
  },
  {
    id: "ecology",
    title: "Planetary Ecology",
    subtitle: "The Web of Life",
    desc: "Life does not exist in isolation. Ecology studies the interactions between organisms and their physical environment.",
    color: "text-cyan-400",
    border: "border-cyan-500/20",
    icon: Globe,
    widget: null, // Ecology is the widget itself (the macro view)
    topics: [
      { 
        title: "Ecology", 
        desc: "Ecosystems, biomes, and the biosphere.", 
        href: "/natural-science/biology/ecology", 
        Icon: Globe, 
        className: "theme-cyan",
        subtitle: "Global Systems" 
      }
    ]
  }
];

export default function BiologyPage() {
  return (
    <main className="relative min-h-screen bg-[#051005] text-white overflow-hidden selection:bg-lime-500/30 font-sans">
      
      {/* 1. VISUAL ENGINE */}
      <LifeBackground />
      
      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none z-0" />

      {/* 2. CONTENT CONTAINER */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        <PageHeader
          eyebrow="Natural Science // Domain 05"
          title="Biology"
          subtitle="The science of life. From the molecular machinery of cells to the complex interactions of global ecosystems."
        />

        {/* 3. NAVIGATION SECTORS */}
        <div className="mt-16 space-y-24">
            
            {biologicalScales.map((scale, idx) => (
                <section key={scale.id} className="relative">
                    
                    {/* Visual Connector Line */}
                    {idx !== biologicalScales.length - 1 && (
                        <div className="absolute left-8 top-16 bottom-[-96px] w-px bg-gradient-to-b from-white/20 to-transparent border-l border-dashed border-white/10 hidden lg:block" />
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* LEFT: HEADER & WIDGET */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md ${scale.color}`}>
                                    <scale.icon size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{scale.title}</h2>
                                    <div className={`text-xs font-mono uppercase tracking-widest mb-2 ${scale.color}`}>
                                        {scale.subtitle}
                                    </div>
                                    <p className="text-sm text-neutral-400 leading-relaxed">
                                        {scale.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Embedded Interactive Widget */}
                            {scale.widget && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5 }}
                                    className="relative"
                                >
                                    {/* Connection Line to Widget */}
                                    <div className="absolute -left-4 top-8 w-4 h-px bg-white/10 hidden lg:block" />
                                    {scale.widget}
                                </motion.div>
                            )}
                        </div>

                        {/* RIGHT: TOPIC GRID */}
                        <div className="lg:col-span-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {scale.topics.map((topic, i) => (
                                    <motion.div
                                        key={topic.title}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: i * 0.1 }}
                                    >
                                        <TopicCard {...topic} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>
            ))}

        </div>

        {/* FOOTER */}
        <div className="mt-32 border-t border-white/10 pt-12 text-center">
            <p className="text-neutral-500 text-sm flex items-center justify-center gap-2">
                <Sprout size={16} /> "Life finds a way."
            </p>
        </div>

      </div>
    </main>
  );
}