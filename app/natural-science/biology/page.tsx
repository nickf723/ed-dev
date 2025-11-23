"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import DnaBackground from "@/components/DnaBackground";
import CellInspector from "@/components/CellInspector";
import { motion } from "framer-motion";
import {
  Dna, Microscope, Sprout, Globe, Fingerprint, GitFork, Bug, Flower
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Life's Code",
    desc: "The storage and transmission of biological information.",
    color: "text-lime-400",
    icon: Dna,
    items: [
      { 
        title: "Genetics", 
        desc: "Heredity, genes, and DNA. How traits are passed from parents to offspring.", 
        href: "/natural-science/biology/genetics", 
        Icon: Dna, 
        className: "theme-biology",
        subtitle: "Inheritance" 
      },
      { 
        title: "Molecular Biology", 
        desc: "The interactions between DNA, RNA, and protein biosynthesis.", 
        href: "/natural-science/biology/molecular", 
        Icon: Fingerprint, 
        className: "theme-biology",
        subtitle: "Central Dogma" 
      }
    ]
  },
  {
    name: "The Unit of Life",
    desc: "Structure and function at the microscopic scale.",
    color: "text-teal-400",
    icon: Microscope,
    items: [
      { 
        title: "Cell Biology", 
        desc: "The study of the cell as the fundamental unit of life.", 
        href: "/natural-science/biology/cell-biology", 
        Icon: Microscope, 
        className: "theme-biology",
        subtitle: "Structure" 
      },
      { 
        title: "Microbiology", 
        desc: "The study of microscopic organisms: bacteria, viruses, and fungi.", 
        href: "/natural-science/biology/microbiology", 
        Icon: Bug, 
        className: "theme-biology",
        subtitle: "Microbes" 
      }
    ]
  },
  {
    name: "Systems & Change",
    desc: "How life adapts and interacts over time.",
    color: "text-emerald-400",
    icon: Globe,
    items: [
      { 
        title: "Evolution", 
        desc: "Change in the heritable characteristics of biological populations over generations.", 
        href: "/natural-science/biology/evolution", 
        Icon: GitFork, 
        className: "theme-biology",
        subtitle: "Adaptation" 
      },
      { 
        title: "Ecology", 
        desc: "The interactions among organisms and their environment.", 
        href: "/natural-science/biology/ecology", 
        Icon: Sprout, 
        className: "theme-biology",
        subtitle: "Interconnection" 
      },
      {
        title: "Botany",
        desc: "The scientific study of plants, including physiology, structure, and ecology.",
        href: "/natural-science/biology/botany",
        Icon: Flower,
        className: "theme-biology",
        subtitle: "Plant Life"
      }
    ]
  }
];

export default function BiologyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. DNA Background */}
      <DnaBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Natural Science"
          title="Biology"
          subtitle="The study of life. From the twisting ladders of DNA to the complex webs of global ecosystems, we examine the machinery that makes matter come alive."
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
            
            {/* Cell Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <CellInspector />
            </motion.div>

            {/* Evolution Quote */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-emerald-400 mb-2 flex items-center gap-2">
                    <GitFork size={14} /> Darwin's Insight
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    "Endless forms most beautiful and most wonderful have been, and are being, evolved." Biology is the only science where history (ancestry) matters as much as physics.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}