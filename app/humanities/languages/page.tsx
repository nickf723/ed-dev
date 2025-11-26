"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import GlyphBackground from "@/components/GlyphBackground"; // NEW BACKGROUND
import RosettaWidget from "@/components/RosettaWidget";     // NEW WIDGET
import { motion } from "framer-motion";
import {
  Globe, BookOpen, PenTool, Mic, Ear, Hand, MessageSquare, Sparkles
} from "@/components/icons"; // Ensure these are exported in icons.ts

// --- DATA SECTORS ---
const sectors = [
  {
    name: "Acquisition & Input",
    desc: "How we absorb new tongues. Listening, reading, and immersion.",
    color: "text-emerald-400",
    icon: Ear,
    items: [
      {
        title: "Immersion Strategy",
        desc: "Learning by doing. Comprehensible input and the natural approach.",
        href: "/humanities/languages/immersion",
        Icon: Globe,
        className: "theme-languages",
        subtitle: "Input"
      },
      {
        title: "Reading & Literacy",
        desc: "Decoding scripts. From alphabets to logograms.",
        href: "/humanities/languages/literacy",
        Icon: BookOpen,
        className: "theme-languages",
        subtitle: "Decoding"
      }
    ]
  },
  {
    name: "Production & Output",
    desc: "Speaking your mind. Pronunciation, writing, and signing.",
    color: "text-pink-400",
    icon: Mic,
    items: [
      {
        title: "Phonetics & Speech",
        desc: "Mastering the sounds of the world (IPA). Accent reduction and flow.",
        href: "/humanities/languages/phonetics",
        Icon: Mic,
        className: "theme-languages",
        subtitle: "Sound"
      },
      {
        title: "Sign Language (ASL)",
        desc: "Visual-spatial communication. Grammar without words.",
        href: "/humanities/languages/sign-language",
        Icon: Hand,
        className: "theme-languages",
        subtitle: "Visual"
      }
    ]
  },
  {
    name: "Structure & Logic",
    desc: "The rules of the game. Grammar, syntax, and morphology.",
    color: "text-amber-400",
    icon: PenTool,
    items: [
      {
        title: "Grammar Patterns",
        desc: "Understanding sentence structure without memorizing rulebooks.",
        href: "/humanities/languages/grammar",
        Icon: PenTool,
        className: "theme-languages",
        subtitle: "Syntax"
      },
      {
        title: "Conversation",
        desc: "Pragmatics and social usage. How to actually talk to people.",
        href: "/humanities/languages/conversation",
        Icon: MessageSquare,
        className: "theme-languages",
        subtitle: "Social"
      }
    ]
  }
];

export default function LanguagesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. VISUAL ENGINE: The Tower of Babel */}
      <GlyphBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Humanities"
          title="World Languages"
          subtitle="The keys to the human experience. Learning a language is not just learning words, but learning a new way to think, see, and connect with the world."
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
            
            {/* WIDGET: Rosetta Stone */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <RosettaWidget />
            </motion.div>

            {/* WIDGET: Quote Box */}
            <div className="rounded-xl border border-pink-500/20 bg-pink-950/10 p-5 backdrop-blur-md">
                <div className="flex flex-col gap-3">
                    <Sparkles size={20} className="text-pink-400"/>
                    <p className="text-xs text-neutral-300 leading-relaxed italic">
                        "To have another language is to possess a second soul."
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-pink-500 text-right">
                        — Charlemagne
                    </p>
                </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}