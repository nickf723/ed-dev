"use client";
import Link from "next/link";
import HardwareBackground from "@/app/formal-science/computer-science/hardware/HardwareBackground";
import CpuSimulator from "@/app/formal-science/computer-science/hardware/CpuSimulator";
import { 
  ArrowLeft, Cpu, CircuitBoard, Microchip, 
  MemoryStick, HardDrive, ArrowUpRight
} from "lucide-react";

// --- NAVIGATION CHIPS ---
const CHIPS = [
  {
    id: "architecture", title: "Architecture", icon: Cpu,
    label: "ARCH-86", pins: 16,
    desc: "CPU design, Instruction Sets (ISA), and the Von Neumann bottleneck."
  },
  {
    id: "circuits", title: "Digital Logic", icon: CircuitBoard,
    label: "LOGIC-74", pins: 14,
    desc: "Boolean algebra, Logic Gates (AND/OR), and flip-flops."
  },
  {
    id: "memory", title: "Memory", icon: MemoryStick,
    label: "MEM-DDR", pins: 8,
    desc: "The hierarchy: Registers -> Cache -> RAM -> Disk."
  },
  {
    id: "embedded", title: "Embedded", icon: Microchip,
    label: "IOT-ESP", pins: 12,
    desc: "Microcontrollers and Systems on Chip (SoC)."
  }
];

export default function HardwarePage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-zinc-300 overflow-hidden font-sans selection:bg-amber-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <HardwareBackground />
      
      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/formal-science/computer-science" className="flex items-center gap-2 text-xs font-mono text-amber-500 hover:text-white transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Computer Science
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-zinc-900 border border-amber-500/30 rounded">
                    <CircuitBoard size={18} className="text-amber-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-sans">
                    HARDWARE
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            The Physical Layer
         </div>
      </header>

      {/* 3. MOTHERBOARD LAYOUT */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* LEFT: THE CHIP ARRAY (Navigation) */}
                <div className="lg:col-span-7 space-y-8">
                    
                    {/* CPU SOCKET (Hero) */}
                    <div className="relative group">
                        {/* Socket frame */}
                        <div className="absolute -inset-1 bg-zinc-800 rounded-sm" />
                        <div className="relative bg-[#171717] border-4 border-zinc-700 rounded-sm p-8 shadow-2xl flex flex-col justify-between min-h-[200px]">
                             {/* Locking Lever */}
                             <div className="absolute -right-6 top-10 w-2 h-24 bg-zinc-400 rounded-full shadow-lg border border-zinc-500" />
                             
                             <div>
                                <div className="text-amber-500 font-mono text-xs mb-2">INTEL 4004 // 1971</div>
                                <h2 className="text-3xl font-bold text-white mb-4 font-mono">Silicon Soul</h2>
                                <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                                    Hardware is where logic meets physics. It is the study of how we trap lightning in rocks (silicon) and teach it to think.
                                </p>
                             </div>

                             <div className="mt-6 flex gap-4">
                                <div className="text-[10px] text-zinc-600 font-mono">
                                    TRANSISTOR_COUNT: 54,000,000,000
                                </div>
                             </div>

                             {/* Gold Pins Corner */}
                             <div className="absolute bottom-2 right-2 w-8 h-8 grid grid-cols-4 gap-0.5 opacity-50">
                                {Array.from({length:16}).map((_,i) => <div key={i} className="bg-amber-500 w-1 h-1 rounded-full"/>)}
                             </div>
                        </div>
                    </div>

                    

                    {/* DIP CHIPS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {CHIPS.map((chip) => (
                            <Link 
                                key={chip.id} 
                                href={`/formal-science/computer-science/hardware/${chip.id}`}
                                className="relative group block"
                            >
                                {/* Chip Legs */}
                                <div className="absolute -left-1 top-4 bottom-4 w-1 flex flex-col justify-between py-1">
                                    {Array.from({length: chip.pins/2}).map((_, i) => <div key={i} className="h-2 w-3 -ml-2 bg-zinc-400 rounded-sm border border-zinc-600 shadow-sm" />)}
                                </div>
                                <div className="absolute -right-1 top-4 bottom-4 w-1 flex flex-col justify-between py-1">
                                    {Array.from({length: chip.pins/2}).map((_, i) => <div key={i} className="h-2 w-3 -mr-2 bg-zinc-400 rounded-sm border border-zinc-600 shadow-sm" />)}
                                </div>

                                {/* Chip Body */}
                                <div className="bg-[#0f0f0f] border-2 border-zinc-800 rounded-sm p-5 shadow-xl transition-all duration-300 group-hover:bg-[#151515] group-hover:border-zinc-600 group-hover:-translate-y-1">
                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-[#0a0a0a] rounded-b-full border-b border-zinc-800" />
                                    
                                    <div className="mt-4 flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <chip.icon className="text-zinc-500 group-hover:text-amber-500 transition-colors" size={20} />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-zinc-600 font-mono tracking-widest">{chip.label}</span>
                                                <h3 className="font-bold text-zinc-200 text-sm font-mono">{chip.title}</h3>
                                            </div>
                                        </div>
                                        <ArrowUpRight size={14} className="text-zinc-700 group-hover:text-amber-500 transition-colors" />
                                    </div>
                                    <p className="text-xs text-zinc-500 leading-relaxed font-mono">
                                        {chip.desc}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-8 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <CpuSimulator />

                    {/* MOORE'S LAW CARD */}
                    <div className="bg-[#171717] border border-zinc-800 rounded p-6 w-full font-mono relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Microchip size={16} className="text-amber-500" /> Moore's Law
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                            "The number of transistors in a dense integrated circuit doubles about every two years."
                        </p>
                        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 w-[80%] animate-pulse" />
                        </div>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}