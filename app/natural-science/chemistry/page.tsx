"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import OrbitalBackground from "@/app/natural-science/chemistry/OrbitalBackground"; // Keeping the atomic theme
import MoleculeViewer from "@/app/natural-science/chemistry/MoleculeViewer";
import PeriodicTable from "@/app/natural-science/chemistry/PeriodicTable"; // New integration
import { motion } from "framer-motion";
import {
  Atom, FlaskConical, Box, Layers, Scale, Zap, Microscope, Beaker
} from "lucide-react";

// --- DATA SECTORS ---
const sectors = [
  {
    name: "Structure of Matter",
    desc: "The fundamental building blocks. From subatomic particles to complex macromolecules.",
    color: "text-lime-400",
    icon: Layers,
    items: [
      { 
        title: "Periodic Table", 
        desc: "The master key to chemistry. Trends, families, and electron configurations.", 
        href: "/natural-science/chemistry/periodic-table", 
        Icon: Layers, 
        className: "theme-chemistry",
        subtitle: "The Elements" 
      },
      { 
        title: "Atomic Structure", 
        desc: "Protons, Neutrons, Electrons, and the Quantum Mechanical Model.", 
        href: "/natural-science/chemistry/atomic-structure", 
        Icon: Atom, 
        className: "theme-chemistry",
        subtitle: "Quantum Realm" 
      },
      { 
        title: "Bonding & Geometry", 
        desc: "Ionic, Covalent, and Metallic bonds. VSEPR theory and molecular shapes.", 
        href: "/natural-science/chemistry/bonding", 
        Icon: Box, 
        className: "theme-chemistry",
        subtitle: "Connections" 
      }
    ]
  },
  {
    name: "Reactions & Stoichiometry",
    desc: "The math of change. Balancing equations and calculating yields.",
    color: "text-orange-400",
    icon: Scale,
    items: [
      { 
        title: "Stoichiometry", 
        desc: "Calculating mass, moles, and particles in chemical reactions.", 
        href: "/natural-science/chemistry/stoichiometry", 
        Icon: Scale, 
        className: "theme-chemistry",
        subtitle: "Chemical Math" 
      },
      { 
        title: "Chemical Kinetics", 
        desc: "Reaction rates, collision theory, and catalysts.", 
        href: "/natural-science/chemistry/kinetics", 
        Icon: Zap, 
        className: "theme-chemistry",
        subtitle: "Speed of Change" 
      },
      { 
        title: "Virtual Lab: Titration", 
        desc: "Interactive simulation for determining concentration.", 
        href: "/natural-science/chemistry/titration-lab", 
        Icon: FlaskConical, 
        className: "theme-chemistry",
        subtitle: "Interactive" 
      }
    ]
  }
];

export default function ChemistryPage() {
  const [selectedElement, setSelectedElement] = useState<any>(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Visual Engine: Orbital Background matches the atomic theme perfectly */}
      <OrbitalBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Natural Science"
          title="Chemistry"
          subtitle="The central science. It bridges physics and biology, explaining how the inanimate building blocks of the universe combine to form the complexity of life."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (9 Cols) */}
          <div className="lg:col-span-9 space-y-12">
            
            {/* FEATURE: Mini Periodic Table Explorer */}
            <section>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                >
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                            <Layers className="text-lime-400" size={20} /> 
                            Element Explorer
                        </h2>
                        {selectedElement && (
                            <span className="text-xs font-mono text-lime-300">
                                Selected: {selectedElement.name} ({selectedElement.symbol})
                            </span>
                        )}
                    </div>
                    {/* We embed the PeriodicTable component directly as a hero widget */}
                    <PeriodicTable onSelect={setSelectedElement} />
                </motion.div>
            </section>

            {/* DOMAIN SECTORS */}
            {sectors.map((sector, idx) => (
              <section key={sector.name}>
                 <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="mb-6 flex items-center gap-3"
                 >
                    <sector.icon className={sector.color} size={24} />
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-wide">{sector.name}</h2>
                        <p className="text-xs text-neutral-500">{sector.desc}</p>
                    </div>
                    <div className="h-[1px] flex-1 bg-white/10 ml-4"></div>
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

          {/* SIDEBAR (3 Cols) */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* WIDGET 1: Molecule Viewer */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <MoleculeViewer />
            </motion.div>

            {/* WIDGET 2: Fact/Quote Box */}
            <div className="rounded-xl border border-lime-500/20 bg-lime-950/10 p-5 backdrop-blur-md">
                <div className="flex flex-col gap-3">
                    <Beaker size={20} className="text-lime-400"/>
                    <p className="text-xs text-neutral-300 leading-relaxed italic">
                        "The meeting of two personalities is like the contact of two chemical substances: if there is any reaction, both are transformed."
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-lime-500 text-right">
                        — Carl Jung
                    </p>
                </div>
            </div>

            {/* WIDGET 3: Quick Reference */}
            <div className="rounded-xl border border-white/10 bg-neutral-900/50 p-4">
                <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wider">Standard Conditions</h4>
                <ul className="space-y-2 text-[10px] font-mono text-neutral-400">
                    <li className="flex justify-between">
                        <span>Temp (STP)</span>
                        <span className="text-lime-300">273.15 K</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Pressure</span>
                        <span className="text-lime-300">1 atm</span>
                    </li>
                    <li className="flex justify-between">
                        <span>1 Mole gas</span>
                        <span className="text-lime-300">22.4 L</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Avogadro No.</span>
                        <span className="text-lime-300">6.022e23</span>
                    </li>
                </ul>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}