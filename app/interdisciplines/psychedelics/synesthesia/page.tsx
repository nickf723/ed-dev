"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import SynesthesiaBackground from "@/components/SynesthesiaBackground";
import SensoryMapperWidget from "@/components/SensoryMapperWidget";
import { motion } from "framer-motion";
import {
  Eye, Music, Brain, Palette, Sparkles, Type, Network, Mic2, Activity
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Forms of Synesthesia",
    desc: "The many ways the wires can cross.",
    color: "text-fuchsia-400",
    icon: Sparkles,
    items: [
      { 
        title: "Grapheme-Color", 
        desc: "Letters and numbers have inherent colors. 'A' might always be red, '7' always green.", 
        href: "/interdisciplines/psychedelics/synesthesia/grapheme-color", 
        Icon: Type, 
        className: "theme-psychedelics",
        subtitle: "Text → Color" 
      },
      { 
        title: "Chromesthesia", 
        desc: "Sound-to-Color. Seeing moving shapes and colors when listening to music.", 
        href: "/interdisciplines/psychedelics/synesthesia/chromesthesia", 
        Icon: Music, 
        className: "theme-psychedelics",
        subtitle: "Sound → Sight" 
      }
    ]
  },
  {
    name: "Neurological Basis",
    desc: "What is happening in the brain?",
    color: "text-cyan-400",
    icon: Brain,
    items: [
      { 
        title: "Cross-Activation", 
        desc: "The theory that adjacent brain regions (like visual word form & color center) have excess connections.", 
        href: "/interdisciplines/psychedelics/synesthesia/neurology", 
        Icon: Network, 
        className: "theme-biology", // Cross-link
        subtitle: "Hyperconnectivity" 
      },
      { 
        title: "Disinhibited Feedback", 
        desc: "Normally inhibited pathways are opened (often induced by psychedelics like LSD).", 
        href: "/interdisciplines/psychedelics/synesthesia/disinhibition", 
        Icon: Activity, 
        className: "theme-psychedelics",
        subtitle: "Chemical" 
      }
    ]
  },
  {
    name: "Art & Culture",
    desc: "Seeing the world differently.",
    color: "text-yellow-400",
    icon: Palette,
    items: [
      { 
        title: "Famous Synesthetes", 
        desc: "Vladimir Nabokov, Wassily Kandinsky, Pharrell Williams, Hans Zimmer.", 
        href: "/interdisciplines/psychedelics/synesthesia/famous-figures", 
        Icon: Eye, 
        className: "theme-humanities", // Cross-link
        subtitle: "Creativity" 
      }
    ]
  }
];

export default function SynesthesiaPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Background */}
      <SynesthesiaBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Phenomenology"
          title="Synesthesia"
          subtitle="A perceptual phenomenon in which stimulation of one sensory or cognitive pathway leads to involuntary experiences in a second pathway. It is not a hallucination, but a consistent cross-wiring of reality."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (8 cols) */}
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
            
            {/* Interactive Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <SensoryMapperWidget />
            </motion.div>

            {/* Quote */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-fuchsia-400 mb-2 flex items-center gap-2">
                    <Mic2 size={14} /> Kandinsky
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    "The sound of colors is so definite that it would be hard to find anyone who would express bright yellow with base notes, or dark lake with the treble."
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}