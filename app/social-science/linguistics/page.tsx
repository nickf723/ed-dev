"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import SyntaxBackground from "@/app/social-science/linguistics/SyntaxBackground";
import GrammarWidget from "@/app/social-science/linguistics/GrammarWidget";
import { motion } from "framer-motion";
import {
  Speech, BookText, Network, BrainCog, Terminal, Languages, Mic, Code2
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "The Signal: Sound",
    desc: "The physical production and perception of language.",
    color: "text-lime-400",
    icon: Mic,
    items: [
      { 
        title: "Phonetics & Phonology", 
        desc: "The study of speech sounds (phones) and their cognitive organization (phonemes).", 
        href: "/social-science/linguistics/phonology-phonetics", 
        Icon: Speech, 
        className: "theme-linguistics",
        subtitle: "Articulation" 
      }
    ]
  },
  {
    name: "The Code: Structure",
    desc: "The rules that govern how words and sentences are built.",
    color: "text-yellow-400",
    icon: Code2,
    items: [
      { 
        title: "Syntax", 
        desc: "The study of sentence structure. How words combine to form grammatical phrases.", 
        href: "/social-science/linguistics/syntax-semantics", 
        Icon: Network, 
        className: "theme-linguistics",
        subtitle: "Grammar" 
      },
      { 
        title: "Morphology", 
        desc: "The study of the internal structure of words (roots, prefixes, suffixes).", 
        href: "/social-science/linguistics/morphology", // New link
        Icon: BookText, 
        className: "theme-linguistics",
        subtitle: "Word Formation" 
      }
    ]
  },
  {
    name: "The Meaning: Context",
    desc: "How language conveys information and social identity.",
    color: "text-emerald-400",
    icon: Languages,
    items: [
      { 
        title: "Semantics & Pragmatics", 
        desc: "The study of literal meaning vs. meaning in context (implied meaning).", 
        href: "/social-science/linguistics/semantics", // New link logic
        Icon: BrainCog, 
        className: "theme-linguistics",
        subtitle: "Interpretation" 
      },
      { 
        title: "Sociolinguistics", 
        desc: "How language varies based on region, class, gender, and social situation.", 
        href: "/social-science/linguistics/sociolinguistics", 
        Icon: Languages, 
        className: "theme-sociology", // Cross-discipline theme
        subtitle: "Society" 
      }
    ]
  },
  {
    name: "The Machine: Application",
    desc: "Teaching computers to understand human language.",
    color: "text-cyan-400",
    icon: Terminal,
    items: [
      { 
        title: "Computational Linguistics", 
        desc: "Natural Language Processing (NLP), machine translation, and speech recognition.", 
        href: "/social-science/linguistics/computational-linguistics", 
        Icon: Terminal, 
        className: "theme-computer-science", // Cross-discipline theme
        subtitle: "AI & NLP" 
      }
    ]
  }
];

export default function LinguisticsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Syntax Tree Background */}
      <SyntaxBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Social Science"
          title="Linguistics"
          subtitle="The scientific study of language. It bridges the gap between the biological structure of the brain (Natural Science) and the complex web of human culture (Humanities)."
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
            
            {/* Grammar Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <GrammarWidget />
            </motion.div>

            {/* Chomsky Quote */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-lime-400 mb-2 flex items-center gap-2">
                    <BrainCog size={14} /> Innateness
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Noam Chomsky argued that the ability to learn language is hard-wired into the human brain (Universal Grammar), not just learned from the environment.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}