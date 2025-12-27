"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import BinaryOceanBackground from "@/app/formal-science/information-science/BinaryOceanBackground";
import EntropyWidget from "@/app/formal-science/information-science/EntropyWidget";
import { motion } from "framer-motion";
import {
  Binary, Database, ChartScatter, Lock, Server, Radio, Eye, FileText
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Foundations & Theory",
    desc: "The mathematical properties of symbols, signals, and transmission.",
    color: "text-cyan-400",
    icon: Binary,
    items: [
      {
        title: "Information Theory",
        desc: "Quantifying information (Entropy) and the limits of compression and transmission.",
        href: "/formal-science/information-science/information-theory",
        Icon: Binary,
        className: "theme-information-science",
        subtitle: "The Bit"
      },
      {
        title: "Semiotics & Encoding",
        desc: "How meaning is constructed and represented through signs and symbols.",
        href: "/formal-science/information-science/semiotics",
        Icon: FileText,
        className: "theme-information-science", // Borrowing theme
        subtitle: "Representation"
      }
    ]
  },
  {
    name: "Storage & Retrieval",
    desc: "Organizing vast amounts of data for efficient access.",
    color: "text-blue-400",
    icon: Database,
    items: [
      {
        title: "Information Retrieval",
        desc: "The science of search engines: Indexing, querying, and ranking relevance.",
        href: "/formal-science/information-science/information-retrieval",
        Icon: Search, // Assuming Search icon needs import or use Database
        className: "theme-information-science",
        subtitle: "Search Systems"
      },
      {
        title: "InfoSec",
        desc: "Protecting the confidentiality, integrity, and availability of information assets.",
        href: "/formal-science/information-science/information-security",
        Icon: Lock,
        className: "theme-information-science",
        subtitle: "Defense"
      }
    ]
  },
  {
    name: "Human-Information Interaction",
    desc: "Making data understandable and actionable for people.",
    color: "text-purple-400",
    icon: Eye,
    items: [
      {
        title: "Data Visualization",
        desc: "Translating abstract information into graphical representations.",
        href: "/formal-science/information-science/data-visualization",
        Icon: ChartScatter,
        className: "theme-information-science",
        subtitle: "Visual Analytics"
      }
    ]
  }
];

// Helper for Search Icon since I missed it in imports above
import { Search } from "lucide-react";

export default function InformationSciencePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Background */}
      <BinaryOceanBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Formal Science"
          title="Information Science"
          subtitle="The study of the lifecycle of information: creation, organization, management, retrieval, and dissemination. It connects the math of data to the human need for meaning."
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
            
            {/* Entropy Calculator */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <EntropyWidget />
            </motion.div>

            {/* DIKW Pyramid Widget */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="rounded-xl border border-cyan-500/20 bg-cyan-950/10 p-4 backdrop-blur-md"
            >
                <h4 className="text-xs font-bold uppercase text-cyan-400 mb-4 flex items-center gap-2">
                    <Server size={14} /> The DIKW Hierarchy
                </h4>
                
                <div className="flex flex-col gap-1 items-center">
                   {/* Wisdom */}
                   <div className="w-[40%] h-6 bg-cyan-500/90 rounded-t-sm flex items-center justify-center text-[9px] font-bold text-black">WISDOM</div>
                   {/* Knowledge */}
                   <div className="w-[60%] h-6 bg-cyan-600/80 flex items-center justify-center text-[9px] font-bold text-white">KNOWLEDGE</div>
                   {/* Information */}
                   <div className="w-[80%] h-6 bg-cyan-700/70 flex items-center justify-center text-[9px] font-bold text-white">INFORMATION</div>
                   {/* Data */}
                   <div className="w-full h-6 bg-cyan-800/60 rounded-b-sm flex items-center justify-center text-[9px] font-bold text-white">DATA</div>
                </div>

                <p className="text-[10px] text-neutral-400 leading-relaxed mt-4 text-center">
                    Data is raw facts. Information is data in context. Knowledge is actionable information. Wisdom is applied knowledge.
                </p>
            </motion.div>

          </div>

        </div>
      </div>
    </main>
  );
}