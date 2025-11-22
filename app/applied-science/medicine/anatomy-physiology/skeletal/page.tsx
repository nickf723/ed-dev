"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import XRayBackground from "@/components/XRayBackground";
import JointWidget from "@/components/JointWidget";
import { motion } from "framer-motion";
import {
  Bone, Shield, Activity, Hammer, Divide
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "The Axial Skeleton",
    desc: "The central core. Protection for vital organs (Brain, Heart, Lungs).",
    color: "text-amber-200",
    icon: Shield,
    items: [
      { 
        title: "The Skull", 
        desc: "22 bones fused together to protect the brain and form the face.", 
        href: "/applied-science/medicine/anatomy-physiology/skeletal/skull", 
        Icon: Bone, 
        className: "theme-medicine",
        subtitle: "Cranial Vault" 
      },
      { 
        title: "Vertebral Column", 
        desc: "33 vertebrae providing support, protection for the spinal cord, and flexibility.", 
        href: "/applied-science/medicine/anatomy-physiology/skeletal/spine", 
        Icon: Activity, 
        className: "theme-medicine",
        subtitle: "The Spine" 
      }
    ]
  },
  {
    name: "The Appendicular Skeleton",
    desc: "The limbs and girdles. Built for movement, leverage, and interaction.",
    color: "text-blue-300",
    icon: Hammer,
    items: [
      { 
        title: "Upper Limb", 
        desc: "Humerus, Radius, Ulna, and the intricate bones of the hand for manipulation.", 
        href: "/applied-science/medicine/anatomy-physiology/skeletal/upper-limb", 
        Icon: Bone, 
        className: "theme-medicine",
        subtitle: "Manipulation" 
      },
      { 
        title: "Lower Limb", 
        desc: "Femur, Tibia, Fibula. Massive bones designed for weight bearing and locomotion.", 
        href: "/applied-science/medicine/anatomy-physiology/skeletal/lower-limb", 
        Icon: Bone, 
        className: "theme-medicine",
        subtitle: "Locomotion" 
      }
    ]
  },
  {
    name: "Physiology & Microstructure",
    desc: "Bone is living tissue. How it grows, repairs, and stores minerals.",
    color: "text-red-300",
    icon: Divide, // Represents cellular division/structure
    items: [
      { 
        title: "Bone Remodeling", 
        desc: "The cycle of Osteoblasts (builders) and Osteoclasts (recyclers).", 
        href: "/applied-science/medicine/anatomy-physiology/skeletal/remodeling", 
        Icon: Activity, 
        className: "theme-medicine",
        subtitle: "Metabolism" 
      }
    ]
  }
];

export default function SkeletalSystemPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. X-Ray Background */}
      <XRayBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Anatomy & Physiology"
          title="The Skeletal System"
          subtitle="The biological chassis. 206 bones act as levers for muscles, armor for organs, and warehouses for minerals. It is engineering at its most elegant."
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
            
            {/* Joint Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <JointWidget />
            </motion.div>

            {/* Wolff's Law Box */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-blue-200 mb-2 flex items-center gap-2">
                    <Hammer size={14} /> Wolff's Law
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    "Form follows function." Bones will adapt to the loads under which they are placed. If loading increases, the bone will remodel itself over time to become stronger.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}