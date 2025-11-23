"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import InkblotBackground from "@/components/InkblotBackground";
import MaslowWidget from "@/components/MaslowWidget";
import { motion } from "framer-motion";
import {
  Brain, Heart, Users, Microscope, Activity, Zap, Smile, Frown
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Biological Foundations",
    desc: "The hardware of the mind. Brain structure and neurochemistry.",
    color: "text-violet-400",
    icon: Brain,
    items: [
      { 
        title: "Biopsychology", 
        desc: "How the brain and neurotransmitters influence thought and behavior.", 
        href: "/social-science/psychology/biopsychology", 
        Icon: Microscope, 
        className: "theme-psychology",
        subtitle: "Neuroscience" 
      },
      { 
        title: "Sensation & Perception", 
        desc: "How we receive and interpret information from the outside world.", 
        href: "/social-science/psychology/sensation-perception", 
        Icon: Zap, 
        className: "theme-psychology",
        subtitle: "Input" 
      }
    ]
  },
  {
    name: "Cognition & Emotion",
    desc: "The software of the mind. Thinking, feeling, and remembering.",
    color: "text-pink-400",
    icon: Heart,
    items: [
      { 
        title: "Cognitive Psychology", 
        desc: "The study of mental processes: memory, problem-solving, and language.", 
        href: "/social-science/psychology/cognitive", 
        Icon: Activity, 
        className: "theme-cognitive-science", // Cross-link
        subtitle: "Processing" 
      },
      { 
        title: "Emotion & Motivation", 
        desc: "The driving forces behind our actions and our subjective experiences.", 
        href: "/social-science/psychology/emotion", 
        Icon: Heart, 
        className: "theme-psychology",
        subtitle: "Feeling" 
      }
    ]
  },
  {
    name: "Person & Society",
    desc: "The individual in the social web.",
    color: "text-fuchsia-400",
    icon: Users,
    items: [
      { 
        title: "Developmental Psych", 
        desc: "How we grow and change from infancy to old age.", 
        href: "/social-science/psychology/developmental", 
        Icon: Smile, 
        className: "theme-psychology",
        subtitle: "Growth" 
      },
      { 
        title: "Clinical Psychology", 
        desc: "Diagnosing and treating mental illness and psychological distress.", 
        href: "/social-science/psychology/clinical", 
        Icon: Frown, 
        className: "theme-medicine", // Cross-link
        subtitle: "Healing" 
      }
    ]
  }
];

export default function PsychologyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Inkblot Background */}
      <InkblotBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Social Science"
          title="Psychology"
          subtitle="The scientific study of the mind and behavior. From the firing of neurons to the dynamics of crowds, we explore the complex inner universe that defines who we are."
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
            
            {/* Maslow Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <MaslowWidget />
            </motion.div>

            {/* Quote Box */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-violet-400 mb-2 flex items-center gap-2">
                    <Brain size={14} /> The Unconscious
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    "The mind is like an iceberg, it floats with one-seventh of its bulk above water." — Sigmund Freud. Much of what drives us happens beneath our awareness.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}