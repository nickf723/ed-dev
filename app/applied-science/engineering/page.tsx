"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import BlueprintBackground from "@/app/applied-science/engineering/BlueprintBackground"; 
import TechStackWidget from "@/app/applied-science/engineering/TechStackWidget";       
import { motion } from "framer-motion";
import {
  Wrench, Zap, Hammer, CircuitBoard, Building2, Ruler
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Infrastructure & Mechanics",
    desc: "The physical foundation of civilization. Moving mass and managing forces.",
    color: "text-orange-400",
    icon: Hammer,
    items: [
      {
        title: "Civil & Structural",
        desc: "Designing the built environment: bridges, roads, dams, and skylines.",
        href: "/applied-science/engineering/civil-structural",
        Icon: Building2,
        className: "theme-engineering",
        subtitle: "Built World",
        stack: "hardware"
      },
      {
        title: "Mechanical Engineering",
        desc: "The study of kinetic energy, thermodynamics, and complex machinery.",
        href: "/applied-science/engineering/mechanical",
        Icon: Wrench,
        className: "theme-engineering",
        subtitle: "Kinetic Systems",
        stack: "hardware"
      }
    ]
  },
  {
    name: "Power & Logic",
    desc: "The nervous system of modern society. Energy and information flow.",
    color: "text-cyan-400",
    icon: Zap,
    items: [
      {
        title: "Electrical & Electronics",
        desc: "Circuits, power grids, and the manipulation of electrons.",
        href: "/applied-science/engineering/electrical",
        Icon: Zap,
        className: "theme-engineering",
        subtitle: "Power & Signals",
        stack: "hardware"
      },
      {
        title: "Software Engineering",
        desc: "Building the digital brains and logic that control physical systems.",
        href: "/applied-science/engineering/software",
        Icon: CircuitBoard,
        className: "theme-engineering",
        subtitle: "Digital Logic",
        stack: "software"
      }
    ]
  }
];

export default function EngineeringPage() {
  const [activeStack, setActiveStack] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Blueprint Grid */}
      <BlueprintBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Applied Science"
          title="Engineering"
          subtitle="The application of scientific principles to design, build, and maintain the complex systems that power our civilization. We turn theory into reality."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (9 Cols) */}
          <div className="lg:col-span-9 space-y-12">
            {sectors.map((sector, idx) => (
              <section key={sector.name}>
                 {/* Sector Header */}
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

                 {/* Card Grid */}
                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                    {sector.items.map((item, i) => {
                        // Highlight logic based on sidebar widget
                        const isDimmed = activeStack && item.stack !== activeStack;
                        
                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
                                animate={{ 
                                    opacity: isDimmed ? 0.3 : 1, 
                                    scale: isDimmed ? 0.98 : 1,
                                    filter: isDimmed ? "grayscale(100%)" : "grayscale(0%)"
                                }}
                            >
                                <TopicCard 
                                    {...item} 
                                    variant={isDimmed ? "dimmed" : "default"} 
                                />
                            </motion.div>
                        )
                    })}
                 </div>
              </section>
            ))}
          </div>

          {/* SIDEBAR (3 Cols) */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* WIDGET: Tech Stack Hierarchy */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <TechStackWidget activeStack={activeStack} setActiveStack={setActiveStack} />
            </motion.div>

            {/* Quote Box */}
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/10 p-5 backdrop-blur-md">
                <div className="flex flex-col gap-3">
                    <Ruler size={20} className="text-cyan-400"/>
                    <p className="text-xs text-neutral-300 leading-relaxed italic">
                        "Scientists study the world as it is, engineers create the world that never has been."
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-500 text-right">
                        — Theodore von Kármán
                    </p>
                </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}