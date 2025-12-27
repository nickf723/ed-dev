"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import SystemsBackground from "@/app/formal-science/systems-science/SystemsBackground";
import FeedbackWidget from "@/app/formal-science/systems-science/FeedbackWidget";
import { motion } from "framer-motion";
import {
  Network,
  Waves,
  RefreshCcw,
  Sigma,
  GitMerge,
  Target,
  Globe
} from "@/components/icons";
import { Activity } from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Core Theory",
    desc: "The search for universal principles that apply to all complex entities.",
    color: "text-purple-400",
    icon: Globe,
    items: [
      { 
        title: "General Systems Theory", 
        desc: "The transdisciplinary study of the abstract organization of phenomena, independent of their substance.", 
        href: "/formal-science/systems-science/general-systems-theory", 
        Icon: Network, 
        className: "theme-systems-science",
        subtitle: "The Universal Framework" 
      },
      { 
        title: "System Dynamics", 
        desc: "Modeling complex systems by mapping stocks, flows, and causal loops over time.", 
        href: "/formal-science/systems-science/system-dynamics", 
        Icon: Sigma, 
        className: "theme-systems-science",
        subtitle: "Stocks & Flows" 
      }
    ]
  },
  {
    name: "Control & Communication",
    desc: "How systems regulate themselves and process information.",
    color: "text-cyan-400",
    icon: RefreshCcw,
    items: [
      { 
        title: "Cybernetics", 
        desc: "The science of communications and automatic control systems in both machines and living things.", 
        href: "/formal-science/systems-science/cybernetics-control", 
        Icon: Target, 
        className: "theme-systems-science",
        subtitle: "Regulation" 
      }
    ]
  },
  {
    name: "Chaos & Emergence",
    desc: "Where order arises from unpredictability.",
    color: "text-blue-400",
    icon: Waves,
    items: [
      { 
        title: "Complexity & Chaos", 
        desc: "Studying how small changes in initial conditions can result in vast differences in outcome (The Butterfly Effect).", 
        href: "/formal-science/systems-science/complexity-chaos", 
        Icon: Activity, 
        className: "theme-systems-science",
        subtitle: "Non-Linearity" 
      },
      { 
        title: "Network Science", 
        desc: "The study of complex networks such as telecommunication networks, computer networks, and social networks.", 
        href: "/formal-science/systems-science/network-science", 
        Icon: GitMerge, 
        className: "theme-systems-science",
        subtitle: "Topology" 
      }
    ]
  }
];

export default function SystemsSciencePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Lorenz Attractor Background */}
      <SystemsBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Formal Science"
          title="Systems Science"
          subtitle="The study of wholes. While other sciences dissect reality into parts, Systems Science studies how those parts interact to create complex, emergent behaviors like life, markets, and weather."
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
            
            {/* Feedback Loops Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <FeedbackWidget />
            </motion.div>

            {/* Emergence Quote */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="rounded-lg border border-purple-500/20 bg-purple-950/10 p-4 backdrop-blur-md"
            >
                <div className="flex items-start gap-3">
                    <Waves size={18} className="text-purple-400 shrink-0 mt-1"/>
                    <div>
                        <h4 className="text-xs font-bold uppercase text-purple-400 mb-1">
                            Emergence
                        </h4>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                            "The whole is greater than the sum of its parts." Wetness is not a property of a water molecule, but of the system of molecules.
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