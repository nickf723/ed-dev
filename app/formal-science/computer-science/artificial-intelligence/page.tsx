"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import NeuralNetworkBackground from "@/app/formal-science/computer-science/artificial-intelligence/NeuralNetworkBackground";
import PerceptronWidget from "@/app/formal-science/computer-science/artificial-intelligence/PerceptronWidget";
import { motion } from "framer-motion";
import {
  Brain, Bot, Sparkles, Network, Search, MessageSquare, Cpu, Terminal
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Foundations & Symbolic AI",
    desc: "GOFAI (Good Old-Fashioned AI). Logic, Search, and Planning.",
    color: "text-cyan-400",
    icon: Terminal,
    items: [
      { 
        title: "Search & Planning", 
        desc: "Navigating problem spaces (Chess, Pathfinding). A*, Minimax, and Heuristics.", 
        href: "/formal-science/computer-science/artificial-intelligence/search", 
        Icon: Search, 
        className: "theme-artificial-intelligence",
        subtitle: "Problem Solving" 
      },
      { 
        title: "Knowledge Representation", 
        desc: "Encoding information about the world so machines can reason with it (Ontologies).", 
        href: "/formal-science/computer-science/artificial-intelligence/knowledge-rep", 
        Icon: Network, 
        className: "theme-artificial-intelligence",
        subtitle: "Logic" 
      }
    ]
  },
  {
    name: "Machine Learning",
    desc: "Systems that improve with experience without being explicitly programmed.",
    color: "text-violet-400",
    icon: Brain,
    items: [
      { 
        title: "Neural Networks", 
        desc: "Layered mathematical models inspired by the biological brain. Deep Learning.", 
        href: "/formal-science/computer-science/artificial-intelligence/neural-networks", 
        Icon: Brain, 
        className: "theme-artificial-intelligence",
        subtitle: "Deep Learning" 
      },
      { 
        title: "Reinforcement Learning", 
        desc: "Learning by trial and error using rewards and punishments.", 
        href: "/formal-science/computer-science/artificial-intelligence/reinforcement-learning", 
        Icon: Cpu, 
        className: "theme-artificial-intelligence",
        subtitle: "Agents" 
      }
    ]
  },
  {
    name: "Applications & Frontiers",
    desc: "AI interacting with the real human world.",
    color: "text-pink-400",
    icon: Bot,
    items: [
      { 
        title: "Natural Language (NLP)", 
        desc: "Understanding and generating human language. Transformers and LLMs.", 
        href: "/formal-science/computer-science/artificial-intelligence/nlp", 
        Icon: MessageSquare, 
        className: "theme-artificial-intelligence",
        subtitle: "Communication" 
      },
      { 
        title: "Generative AI", 
        desc: "Creating new content (Images, Code, Audio) from learned patterns.", 
        href: "/formal-science/computer-science/artificial-intelligence/generative", 
        Icon: Sparkles, 
        className: "theme-artificial-intelligence",
        subtitle: "Creativity" 
      }
    ]
  }
];

export default function AIPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Background */}
      <NeuralNetworkBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Computer Science"
          title="Artificial Intelligence"
          subtitle="The quest to synthesize cognition. From the rigid logic of expert systems to the fluid intuition of neural networks, we are building mirrors of our own minds."
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
            
            {/* Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <PerceptronWidget />
            </motion.div>

            {/* Quote Box */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-violet-400 mb-2 flex items-center gap-2">
                    <Bot size={14} /> The Black Box
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Unlike traditional code where we write the rules, deep learning systems write their own rules based on data. This makes them powerful but often uninterpretable.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}