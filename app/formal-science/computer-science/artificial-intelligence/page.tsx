"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import { ContentP, CollapsibleTopic } from "@/components/LessonBlocks";
import { BrainCog, Network, Binary, Scale, } from "@/components/icons";
import React, { useState } from "react";
import { Code } from "lucide-react";

// --- Comparative Data ---
const symbolicAI = {
    name: "Symbolic AI (GOFAI)",
    desc: "Good Old-Fashioned AI. Uses explicit rules and logic representations.",
    features: ["Explicit Rules", "Human-Readable", "Logic-Based", "Brittle"],
    color: "text-blue-400",
    bg: "bg-blue-500"
};

const connectionistAI = {
    name: "Connectionist AI (Neural Nets)",
    desc: "Modeled after the brain. Learns patterns from data via weights.",
    features: ["Implicit Patterns", "Black Box", "Data-Driven", "Robust"],
    color: "text-purple-400",
    bg: "bg-purple-500"
};

export default function AIPage() {
  const [activeSide, setActiveSide] = useState<'A' | 'B'>('A');

  return (
    <main className="topic-page theme-computer-science lg:px-16">
      <FloatingSymbols symbols={["01", "∑", "ƒ(x)", "AI"]} />
      <PageHeader
        eyebrow="Computer Science"
        title="Artificial Intelligence"
        subtitle="The theory and development of computer systems able to perform tasks that normally require human intelligence."
      />

      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 text-left">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8">
            
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Scale className="text-cyan-400" /> Paradigms of Intelligence
                </h2>
                <p className="text-neutral-400 mb-8">
                    Historically, AI research has been divided into two main camps. Understanding the difference is key to understanding modern Machine Learning.
                </p>

                {/* Comparative Component */}
                <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/30 shadow-2xl">
                    {/* Side A: Symbolic */}
                    <div className="p-8 border-b md:border-b-0 md:border-r border-neutral-800 bg-gradient-to-br from-blue-900/10 to-transparent hover:bg-blue-900/20 transition-colors">
                        <div className="mb-4 p-3 bg-blue-900/30 rounded-xl w-fit text-blue-300"><Code size={24}/></div>
                        <h3 className={`text-xl font-bold ${symbolicAI.color} mb-2`}>{symbolicAI.name}</h3>
                        <p className="text-sm text-neutral-300 mb-6 h-10">{symbolicAI.desc}</p>
                        <ul className="space-y-2">
                            {symbolicAI.features.map(f => (
                                <li key={f} className="flex items-center gap-3 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                                    <div className={`h-1.5 w-1.5 rounded-full ${symbolicAI.bg}`}></div> {f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Side B: Connectionist */}
                    <div className="p-8 bg-gradient-to-bl from-purple-900/10 to-transparent hover:bg-purple-900/20 transition-colors relative">
                        <div className="mb-4 p-3 bg-purple-900/30 rounded-xl w-fit text-purple-300"><Network size={24}/></div>
                        <h3 className={`text-xl font-bold ${connectionistAI.color} mb-2`}>{connectionistAI.name}</h3>
                        <p className="text-sm text-neutral-300 mb-6 h-10">{connectionistAI.desc}</p>
                        <ul className="space-y-2">
                            {connectionistAI.features.map(f => (
                                <li key={f} className="flex items-center gap-3 text-xs font-mono text-neutral-400 uppercase tracking-wider">
                                    <div className={`h-1.5 w-1.5 rounded-full ${connectionistAI.bg}`}></div> {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <CollapsibleTopic title="Modern Era: Deep Learning" icon={BrainCog}>
                <ContentP>
                    Today, Connectionism dominates in the form of Deep Learning. However, many researchers argue that a hybrid approach (Neuro-Symbolic AI) is the future—combining the robustness of neural networks with the reasoning capability of symbolic logic.
                </ContentP>
            </CollapsibleTopic>

        </div>

        {/* Sidebar / Dashboard Widgets */}
        <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-24 h-fit">
            
            {/* Context Widget */}
            <div className="glass p-1 rounded-2xl border border-cyan-900/20 bg-gradient-to-b from-neutral-900/80 to-neutral-950/80">
                <div className="p-4 border-b border-white/5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                        <Binary size={16} /> AI Subfields
                    </h3>
                </div>
                <div className="p-2 flex flex-col gap-1">
                    {["Machine Learning", "Computer Vision", "NLP", "Robotics", "Expert Systems"].map((item) => (
                        <div key={item} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 transition-colors cursor-default">
                            <span className="text-sm font-medium text-neutral-400">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </main>
  );
}