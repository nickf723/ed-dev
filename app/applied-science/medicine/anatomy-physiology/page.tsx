"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import BiologicalBackground from "@/app/applied-science/medicine/anatomy-physiology/BiologicalBackground";
import SystemScanner from "@/app/applied-science/medicine/anatomy-physiology/SystemScanner";
import { motion } from "framer-motion";
import {
  Microscope, Activity, Heart, Bone, Brain, Wind, Droplet, Zap
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Structural Organization",
    desc: "The hierarchy of biological complexity.",
    color: "text-rose-400",
    icon: Microscope,
    items: [
      { 
        title: "Cells & Tissues", 
        desc: "The basic units of life. Epithelial, Connective, Muscle, and Nervous tissues.", 
        href: "/applied-science/medicine/anatomy-physiology/cells-tissues", 
        Icon: Microscope, 
        className: "theme-medicine",
        subtitle: "Microscopic" 
      },
      { 
        title: "Homeostasis", 
        desc: "The body's ability to maintain a stable internal environment despite external changes.", 
        href: "/applied-science/medicine/anatomy-physiology/homeostasis", 
        Icon: Activity, 
        className: "theme-medicine",
        subtitle: "Balance" 
      }
    ]
  },
  {
    name: "Support & Movement",
    desc: "How the body maintains form and navigates space.",
    color: "text-amber-400",
    icon: Bone,
    items: [
      { 
        title: "Skeletal System", 
        desc: "Bones, cartilage, and joints. Framework, protection, and mineral storage.", 
        href: "/applied-science/medicine/anatomy-physiology/skeletal", 
        Icon: Bone, 
        className: "theme-medicine",
        subtitle: "Framework" 
      },
      { 
        title: "Muscular System", 
        desc: "Skeletal, smooth, and cardiac muscles. Movement, posture, and heat production.", 
        href: "/applied-science/medicine/anatomy-physiology/muscular", 
        Icon: Activity, 
        className: "theme-medicine",
        subtitle: "Motor" 
      }
    ]
  },
  {
    name: "Transport & Control",
    desc: "Circulating resources and processing information.",
    color: "text-teal-400",
    icon: Heart,
    items: [
      { 
        title: "Cardiovascular", 
        desc: "The heart and blood vessels. Transporting oxygen, nutrients, and waste.", 
        href: "/applied-science/medicine/anatomy-physiology/cardiovascular", 
        Icon: Heart, 
        className: "theme-medicine",
        subtitle: "Transport" 
      },
      { 
        title: "Nervous System", 
        desc: "The brain, spinal cord, and nerves. Fast-acting control and communication.", 
        href: "/applied-science/medicine/anatomy-physiology/nervous", 
        Icon: Brain, 
        className: "theme-medicine",
        subtitle: "Command" 
      }
    ]
  }
];

export default function AnatomyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Biological Background */}
      <BiologicalBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Medicine"
          title="Anatomy & Physiology"
          subtitle="The study of the structure (Anatomy) and function (Physiology) of the human body. It explains how the biological machine is built and how it keeps running."
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
            
            {/* System Scanner Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <SystemScanner />
            </motion.div>

            {/* Function Quote */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-rose-400 mb-2 flex items-center gap-2">
                    <Zap size={14} /> Function follows Form
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    A fundamental principle of biology. The shape of a structure (like a heart valve) is directly related to its specific job.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}