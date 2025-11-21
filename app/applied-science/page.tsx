"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import CircuitBackground from "@/components/CircuitBackground";
import TechStackWidget from "@/components/TechStackWidget";
import { motion } from "framer-motion";
import {
  Hammer, Cpu, Stethoscope, Microscope, Monitor, HardHat, Pickaxe, HeartPulse
} from "lucide-react";

// --- DATA ---
// Stacks: hardware, software, wetware
const sectors = [
  {
    name: "Constructing Reality",
    desc: "Building the physical infrastructure of civilization.",
    color: "text-orange-400",
    icon: HardHat,
    items: [
      { 
        id: "engineering", 
        stack: "hardware", 
        title: "Engineering", 
        desc: "The application of math and science to design complex structures and machines.", 
        href: "/applied-science/engineering", 
        Icon: Hammer, 
        className: "theme-applied-science", // Using generic theme for now or create theme-engineering
        subtitle: "Design & Build" 
      },
      { 
        id: "materials", 
        stack: "hardware", 
        title: "Materials Science", 
        desc: "Discovering and designing new materials with specific properties.", 
        href: "/applied-science/materials-science", 
        Icon: Pickaxe, 
        className: "theme-chemistry", // Borrowing chem theme as it fits
        subtitle: "Matter Design" 
      }
    ]
  },
  {
    name: "Computing & Intelligence",
    desc: "Processing information and simulating reality.",
    color: "text-sky-400",
    icon: Monitor,
    items: [
      { 
        id: "computer-tech", 
        stack: "software", 
        title: "Computer Technology", 
        desc: "The development of hardware and software to process information.", 
        href: "/applied-science/computer-technology", 
        Icon: Cpu, 
        className: "theme-computer-science", 
        subtitle: "Digital Systems" 
      }
    ]
  },
  {
    name: "Health & Augmentation",
    desc: "Healing, repairing, and enhancing biological systems.",
    color: "text-emerald-400",
    icon: HeartPulse,
    items: [
      { 
        id: "medicine", 
        stack: "wetware", 
        title: "Medicine", 
        desc: "The science and practice of caring for the patient.", 
        href: "/applied-science/medicine", 
        Icon: Stethoscope, 
        className: "theme-biology", // Borrowing bio theme
        subtitle: "Human Health" 
      }
    ]
  }
];

export default function AppliedSciencePage() {
  const [activeStack, setActiveStack] = useState<string | null>(null);

  const getVariant = (stack: string) => {
    if (!activeStack) return "default";
    return activeStack === stack ? "highlighted" : "dimmed";
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Circuit Background */}
      <CircuitBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Domain 04"
          title="Applied Sciences"
          subtitle="Knowledge in action. We take the laws of physics, the logic of code, and the patterns of biology to build tools, cure diseases, and engineer the future."
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
                            <TopicCard 
                                {...item} 
                                variant={getVariant(item.stack)}
                            />
                        </motion.div>
                    ))}
                 </div>
              </section>
            ))}
          </div>

          {/* SIDEBAR (3 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* Tech Stack Filter */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <TechStackWidget activeStack={activeStack} setActiveStack={setActiveStack} />
            </motion.div>

            {/* "The Goal" Box */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="rounded-lg border border-orange-500/20 bg-orange-950/10 p-4 backdrop-blur-md"
            >
                <div className="flex items-start gap-3">
                    <HardHat size={18} className="text-orange-400 shrink-0 mt-1"/>
                    <div>
                        <h4 className="text-xs font-bold uppercase text-orange-400 mb-1">
                            The Goal: Utility
                        </h4>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                            Unlike pure science which seeks to <em>know</em>, applied science seeks to <em>do</em>. It is judged by effectiveness, not just truth.
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