"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import Rule30Background from "@/components/Rule30Background";
import LogicGateWidget from "@/components/LogicGateWidget";
import { motion } from "framer-motion";
import {
  Terminal, BrainCog, Network, Lock, Database, Zap, Server, Shield
} from "@/components/icons"; 
// Note: Using your icon mapping file + direct imports if needed
import { Code, Cpu, LayoutTemplate } from "lucide-react";


const sectors = [
  {
    name: "Theoretical Foundation",
    desc: "The mathematical logic and algorithms that make computation possible.",
    color: "text-green-400",
    icon: Terminal,
    items: [
      { 
        title: "Algorithms & Complexity", 
        desc: "The study of efficient problem-solving. Big O, P vs NP, and Computability.", 
        href: "/formal-science/computer-science/algorithms-complexity", 
        Icon: Terminal, 
        className: "theme-computer-science", 
        subtitle: "The Recipe" 
      },
      { 
        title: "Artificial Intelligence", 
        desc: "Designing agents that perceive, learn, and act. From Logic to Neural Nets.", 
        href: "/formal-science/computer-science/artificial-intelligence", 
        Icon: BrainCog, 
        className: "theme-computer-science", 
        subtitle: "Synthetic Mind" 
      }
    ]
  },
  {
    name: "Systems & Infrastructure",
    desc: "The architecture of machines and the networks that connect them.",
    color: "text-blue-400",
    icon: Server,
    items: [
      { 
        title: "Systems & Architecture", 
        desc: "How hardware executes software. OS, Compilers, and Memory management.", 
        href: "/formal-science/computer-science/systems", 
        Icon: Cpu, 
        className: "theme-computer-science", 
        subtitle: "The Machine" 
      },
      { 
        title: "Networks & Distributed", 
        desc: "Protocols for communication. The Internet, Cloud, and Blockchain.", 
        href: "/formal-science/computer-science/networking", 
        Icon: Network, 
        className: "theme-computer-science", 
        subtitle: "The Web" 
      }
    ]
  },
  {
    name: "Engineering & Defense",
    desc: "Building robust software and protecting it from adversaries.",
    color: "text-purple-400",
    icon: Shield,
    items: [
      { 
        title: "Software Engineering", 
        desc: "The discipline of designing, building, and maintaining large-scale software.", 
        href: "/formal-science/computer-science/software-engineering", 
        Icon: Code, 
        className: "theme-computer-science", 
        subtitle: "Construction" 
      },
      { 
        title: "Security & Cryptography", 
        desc: "Protecting data integrity and privacy. Encryption and secure protocol design.", 
        href: "/formal-science/computer-science/security-cryptography", 
        Icon: Lock, 
        className: "theme-computer-science", 
        subtitle: "Defense" 
      }
    ]
  }
];

export default function ComputerSciencePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Background */}
      <Rule30Background />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Formal Science"
          title="Computer Science"
          subtitle="The study of computation, automation, and information. We build abstract machines out of logic and electricity to extend the capabilities of the human mind."
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

                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            
            {/* Logic Gate Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <LogicGateWidget />
            </motion.div>

            {/* Quote Box */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-green-500 mb-2 flex items-center gap-2">
                    <LayoutTemplate size={14} /> Abstraction
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Computer Science is the art of building layers. Logic gates build CPUs. CPUs run kernels. Kernels run operating systems. We stand on a tower of abstractions.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}