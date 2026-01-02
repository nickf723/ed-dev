"use client";
import Link from "next/link";
import LogicBackground from "@/app/formal-science/computer-science/hardware/circuits/LogicBackground";
import FullAdder from "@/app/formal-science/computer-science/hardware/circuits/FullAdder";
import { 
  ArrowLeft, CircuitBoard, GitCommit, Split, 
  ToggleRight, Binary, Cpu
} from "lucide-react";

// Content Blocks
const TOPICS = [
  {
    id: "bool", title: "Boolean Algebra", icon: Binary,
    text: "The math of True/False. Developed by George Boole in 1847, it reduces logical thought to algebraic equations ($A \\cdot B = C$).",
    side: "left"
  },
  {
    id: "gates", title: "Logic Gates", icon: Split,
    text: "Physical devices that implement Boolean functions. Transistors arranged to perform AND, OR, NOT operations.",
    side: "right"
  },
  {
    id: "combinational", title: "Combinational Logic", icon: GitCommit,
    text: "Circuits where output depends only on current input. Adders, Multiplexers (MUX), and Decoders.",
    side: "left"
  },
  {
    id: "sequential", title: "Sequential Logic", icon: ToggleRight,
    text: "Circuits with memory. Flip-flops and Latches use 'feedback' loops to store state ($Q_{next} = f(Input, Q_{current})$).",
    side: "right"
  }
];

export default function DigitalLogicPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0a09] text-zinc-300 overflow-hidden font-sans selection:bg-green-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <LogicBackground />
      
      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#0c0a09]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/formal-science/computer-science/hardware" className="flex items-center gap-2 text-xs font-mono text-green-600 hover:text-green-500 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Hardware
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-zinc-900 border border-green-500/30 rounded">
                    <CircuitBoard size={18} className="text-green-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-sans">
                    DIGITAL_LOGIC
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            The Language of 0 and 1
         </div>
      </header>

      <div className="relative z-10 container mx-auto p-6 md:p-8">
            
            {/* INTRO HERO */}
            <div className="max-w-4xl mx-auto mb-16 text-center">
                 <h2 className="text-4xl font-bold text-white mb-4">From Philosophy to Physics</h2>
                 <p className="text-zinc-400 font-mono text-sm leading-relaxed max-w-2xl mx-auto">
                    Digital logic is the abstraction layer that sits between the raw physics of electricity and the intelligent behavior of software. It builds complex decisions out of the simplest possible parts.
                 </p>
            </div>

            {/* THE "BUS" LAYOUT */}
            <div className="relative max-w-5xl mx-auto">
                
                {/* Central Bus Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-zinc-800 -translate-x-1/2 hidden md:block">
                     <div className="absolute inset-0 bg-green-500/20 blur-sm" />
                </div>

                <div className="space-y-12 md:space-y-24">
                    
                    {/* WIDGET SECTION (Centered) */}
                    <div className="relative z-10 flex justify-center">
                        <FullAdder />
                    </div>

                    {/* TOPIC NODES */}
                    {TOPICS.map((topic, i) => (
                        <div key={topic.id} className={`flex items-center ${topic.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8 md:gap-0 relative`}>
                            
                            {/* Connector Line (Desktop Only) */}
                            <div className={`hidden md:block absolute top-1/2 w-1/2 h-px bg-zinc-700 ${topic.side === 'left' ? 'right-0' : 'left-0'}`}>
                                <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-black border-2 border-green-500 rounded-full ${topic.side === 'left' ? '-left-1.5' : '-right-1.5'}`} />
                                <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-600 rounded-full ${topic.side === 'left' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`} />
                            </div>

                            {/* Content Card */}
                            <div className={`w-full md:w-[45%] bg-[#1c1917] border border-zinc-800 p-6 rounded-xl hover:border-green-500/50 transition-colors group relative z-10`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-black rounded border border-zinc-800 group-hover:border-green-500/30 transition-colors">
                                        <topic.icon className="text-green-500" size={20} />
                                    </div>
                                    <h3 className="font-bold text-white text-lg font-mono">{topic.title}</h3>
                                </div>
                                <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                                    {topic.text}
                                </p>
                                
                                {/* Diagram Tags based on Topic */}
                                {topic.id === "gates" && <div className="mt-4 text-[10px] text-zinc-500">

[Image of logic gate symbols]
</div>}
                                {topic.id === "combinational" && <div className="mt-4 text-[10px] text-zinc-500">

[Image of full adder circuit diagram]
</div>}
                                {topic.id === "bool" && <div className="mt-4 text-[10px] text-zinc-500"></div>}

                            </div>

                            {/* Empty space for the other side */}
                            <div className="w-full md:w-[45%]" />

                        </div>
                    ))}

                </div>

            </div>

      </div>
    </main>
  );
}