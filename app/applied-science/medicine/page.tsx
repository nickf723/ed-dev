"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import PulseBackground from "@/app/applied-science/medicine/PulseBackground";
import AnatomyWidget from "@/app/applied-science/medicine/AnatomyWidget";
import { motion } from "framer-motion";
import {
  Syringe, Dna, Beaker, BrainCog, HeartPulse, Microscope, Activity, Stethoscope
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Foundations of the Body",
    desc: "Understanding the structure and function of the human machine.",
    color: "text-red-400",
    icon: HeartPulse,
    items: [
      { 
        title: "Anatomy & Physiology", 
        desc: "The map of the body. How structures (bones, organs) support functions (movement, digestion).", 
        href: "/applied-science/medicine/anatomy-physiology", 
        Icon: Activity, 
        className: "theme-medicine",
        subtitle: "Structure" 
      },
      { 
        title: "Pathology", 
        desc: "The study of disease. How systems fail and the mechanisms of injury.", 
        href: "/applied-science/medicine/pathology", 
        Icon: Microscope, 
        className: "theme-medicine",
        subtitle: "Disease" 
      }
    ]
  },
  {
    name: "Therapeutics & Intervention",
    desc: "The tools and techniques used to restore health.",
    color: "text-teal-400",
    icon: Stethoscope,
    items: [
      { 
        title: "Pharmacology", 
        desc: "The chemistry of healing. How drugs interact with biological systems.", 
        href: "/applied-science/medicine/pharmacology", 
        Icon: Beaker, 
        className: "theme-medicine",
        subtitle: "Chemistry" 
      },
      { 
        title: "Surgery & Procedure", 
        desc: "Direct physical intervention to repair or remove damaged tissues.", 
        href: "/applied-science/medicine/surgery", 
        Icon: Syringe, 
        className: "theme-medicine",
        subtitle: "Intervention" 
      }
    ]
  },
  {
    name: "Frontiers of Health",
    desc: "Pushing the boundaries of biology with technology.",
    color: "text-blue-400",
    icon: Dna,
    items: [
      { 
        title: "Biotechnology", 
        desc: "Engineering biological systems for medical diagnostics and therapies.", 
        href: "/applied-science/medicine/biotechnology", 
        Icon: Dna, 
        className: "theme-medicine",
        subtitle: "Engineering Life" 
      },
      { 
        title: "Neuroscience", 
        desc: "The final frontier. Mapping the brain and treating cognitive disorders.", 
        href: "/applied-science/medicine/neuroscience", 
        Icon: BrainCog, 
        className: "theme-medicine",
        subtitle: "The Mind" 
      }
    ]
  }
];

export default function MedicinePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Pulse Background */}
      <PulseBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Applied Science"
          title="Medicine"
          subtitle="The maintenance of the human machine. We combine deep biological knowledge with chemical and mechanical intervention to diagnose, treat, and prevent disease."
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
            
            {/* Anatomy Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <AnatomyWidget />
            </motion.div>

            {/* Hippocratic Oath Box */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-teal-400 mb-2 flex items-center gap-2">
                    <Activity size={14} /> Primum Non Nocere
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    "First, do no harm." The guiding principle of medicine is to weigh the risk of intervention against the benefit of the cure.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}