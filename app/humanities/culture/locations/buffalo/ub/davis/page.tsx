"use client";
import React from 'react';
import Link from 'next/link';
import CleanRoomBackground from "./CleanRoomBackground";
import SmartGridMonitor from "./SmartGridMonitor";
import DavisHallUplink from "./DavisHallUplink"; // The new component
import { 
  ArrowLeft, Cpu, ShieldCheck, 
  Wind, Layers, Box, ExternalLink 
} from "lucide-react";

export default function DavisHallPage() {
  return (
    <main className="relative min-h-screen bg-[#f8fafc] text-slate-800 overflow-hidden font-sans selection:bg-amber-200">
      
      {/* 1. VISUAL ENGINE */}
      <CleanRoomBackground />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/humanities/culture/locations/buffalo/ub" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-amber-600 transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Campus
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm text-slate-600">
                <Cpu size={12} className="text-amber-500" /> Building 41
            </div>
        </div>

        {/* HERO */}
        <header className="mb-16">
            <div className="inline-block px-3 py-1 mb-4 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase rounded tracking-wide">
                School of Engineering & Applied Sciences
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-6">
                DAVIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-300">HALL</span>
            </h1>
            <p className="max-w-2xl text-xl text-slate-500 font-light leading-relaxed">
                The Glass Brain of North Campus. A LEED-Gold certified facility housing the future of nanotechnology, aerospace, and big data.
            </p>
        </header>

        {/* SECTION 1: THE SPECS */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
            <SpecCard icon={Box} label="Gross Sq Ft" value="147,000" />
            <SpecCard icon={ShieldCheck} label="Certification" value="LEED Gold" />
            <SpecCard icon={Wind} label="Clean Rooms" value="5,000 sq ft" />
            <SpecCard icon={Layers} label="Project Cost" value="$75 Million" />
        </section>

        

        {/* SECTION 2: COMMAND CENTER LAYOUT */}
        <section className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT: LIVE SIMULATION (2/3 Width) */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                            Smart Grid Research
                        </h2>
                        <div className="text-xs font-mono text-slate-400 animate-pulse">
                            LIVE SIMULATION
                        </div>
                    </div>
                    
                    <SmartGridMonitor />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <p>
                            Davis Hall isn't just a building; it's a living experiment. Sensors embedded in the walls monitor energy usage, vibration, and temperature in real-time.
                        </p>
                        <p>
                            It houses the <strong>Class 1000 Cleanroom</strong>, a vibration-dampened environment used for constructing sensors at the molecular level, critical for UB's nanotech curriculum.
                        </p>
                    </div>
                </div>

                {/* RIGHT: EXTERNAL RESOURCES (1/3 Width) */}
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4 h-8">
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                            External Uplink
                        </h2>
                    </div>
                    <div className="flex-1">
                        <DavisHallUplink />
                    </div>
                </div>

            </div>
        </section>

        {/* FOOTER */}
        <div className="border-t border-slate-200 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>// Architect: Perkins+Will</span>
                <span>// Opened: 2011</span>
            </div>
            <a 
                href="https://engineering.buffalo.edu/computer-science-engineering/information-for-faculty-and-staff/facilities/davis-hall.html" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-amber-600 uppercase hover:text-amber-800 transition-colors flex items-center gap-2"
            >
                View Official Facility Page <ExternalLink size={12} />
            </a>
        </div>

      </div>
    </main>
  );
}

function SpecCard({ icon: Icon, label, value }: any) {
    return (
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
            <div className="mb-4 text-slate-400 group-hover:text-amber-500 transition-colors">
                <Icon size={24} />
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">{label}</div>
            <div className="text-2xl font-black text-slate-900">{value}</div>
        </div>
    )
}