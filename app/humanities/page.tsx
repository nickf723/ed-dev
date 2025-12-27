"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import GlyphBackground from "@/app/humanities/GlyphBackground";
import InquiryWidget from "@/app/humanities/InquiryWidget";
import { motion } from "framer-motion";
import {
  Lightbulb, Scale, Hourglass, ScrollText, Palette, BookOpen, Library, Feather
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Philosophy & Thought",
    desc: "The critical study of the fundamental nature of reality, reason, and values.",
    color: "text-amber-400",
    icon: Lightbulb,
    items: [
      { 
        id: "philosophy", 
        mode: "reason", 
        title: "Philosophy", 
        desc: "The pursuit of wisdom through logical reasoning.", 
        href: "/humanities/philosophy", 
        Icon: Lightbulb, 
        className: "theme-humanities", 
        subtitle: "The Search for Truth" 
      },
      { 
        id: "religion", 
        mode: "belief",
        title: "Religion & Spirituality", 
        desc: "Systems of faith and worship that explore the divine and sacred.", 
        href: "/humanities/religion",
        Icon: Feather,
        className: "theme-humanities",
        subtitle: "Belief Systems" 
      },
    ]
  },
  {
    name: "History & Memory",
    desc: "The study of past events and the preservation of human experience.",
    color: "text-yellow-600",
    icon: Hourglass,
    items: [
      { 
        id: "history", 
        mode: "memory", 
        title: "History", 
        desc: "The systematic record and interpretation of past human activity.", 
        href: "/humanities/history", 
        Icon: Hourglass, 
        className: "theme-humanities", 
        subtitle: "The Record" 
      },
    ]
  },
  {
    name: "Arts & Literature",
    desc: "Creative expression and the written word.",
    color: "text-orange-400",
    icon: Palette,
    items: [
      { 
        id: "literature", 
        mode: "expression", 
        title: "Literature", 
        desc: "Written works of superior or lasting artistic merit.", 
        href: "/humanities/literature", 
        Icon: BookOpen, 
        className: "theme-humanities",
        subtitle: "Storytelling" 
      },
      { 
        id: "arts", 
        mode: "expression", 
        title: "Arts & Aesthetics", 
        desc: "The study of beauty, taste, and creative production.", 
        href: "/humanities/arts-aesthetics", 
        Icon: Palette, 
        className: "theme-humanities",
        subtitle: "Visual Culture" 
      },
      {
        id: "music",
        mode: "expression",
        title: "Music",
        desc: "The art of arranging sounds in time through melody, harmony, and rhythm.",
        href: "/humanities/music",
        Icon: ScrollText,
        className: "theme-humanities",
        subtitle: "Sound"
      },
      {
        id: "language",
        mode: "expression",
        title: "Languages",
        desc: "The system of communication through spoken or written words.",
        href: "/humanities/languages",
        Icon: Library,
        className: "theme-humanities",
        subtitle: "Communication"
      }
    ]
  }
];

export default function HumanitiesPage() {
  const [activeMode, setActiveMode] = useState<string | null>(null);

  const getVariant = (mode: string) => {
    if (!activeMode) return "default";
    return activeMode === mode ? "highlighted" : "dimmed";
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Glyph Background */}
      <GlyphBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Domain 05"
          title="Humanities"
          subtitle="The study of the human condition. Through philosophy, history, and art, we explore who we are, where we came from, and what it means to be alive."
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
                                variant={getVariant(item.mode)}
                            />
                        </motion.div>
                    ))}
                 </div>
              </section>
            ))}
          </div>

          {/* SIDEBAR (3 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* Modes of Inquiry Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <InquiryWidget activeMode={activeMode} setActiveMode={setActiveMode} />
            </motion.div>

            {/* Quote Box */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="rounded-lg border border-amber-500/20 bg-amber-950/10 p-4 backdrop-blur-md"
            >
                <div className="flex items-start gap-3">
                    <Library size={18} className="text-amber-400 shrink-0 mt-1"/>
                    <div>
                        <h4 className="text-xs font-bold uppercase text-amber-400 mb-1">
                            Subjectivity
                        </h4>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                            Unlike sciences which seek objective laws, humanities often embrace subjective interpretation and the complexity of individual experience.
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