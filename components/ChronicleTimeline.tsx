"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CHRONICLE_DATA, Era } from "@/lib/chronicle-db";
import { Star, Globe, Sprout, Users, Cpu } from "lucide-react";

const ERA_ICONS = {
  "Cosmos": Star,
  "Earth": Globe,
  "Life": Sprout,
  "Humanity": Users,
  "Modern": Cpu,
};

export default function ChronicleTimeline() {
  const [activeEra, setActiveEra] = useState<Era>("Cosmos");

  // Smooth scroll to section
  const scrollToEra = (era: Era) => {
    setActiveEra(era);
    const el = document.getElementById(`era-${era}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="flex gap-8 relative">
      
      {/* MAIN TIMELINE FEED */}
      <div className="flex-1 space-y-24 pl-4 border-l border-white/10 relative">
        {CHRONICLE_DATA.map((event, index) => {
            const Icon = ERA_ICONS[event.category];
            
            return (
                <motion.div
                    id={`era-${event.category}`} // Anchor for navigation
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[21px] top-0 h-3 w-3 rounded-full border-2 border-neutral-900 ${event.color.replace("text", "bg")} z-10`} />
                    
                    {/* Date Label */}
                    <span className={`absolute -top-8 left-0 text-xs font-mono font-bold ${event.color} opacity-80`}>
                        {event.yearLabel}
                    </span>

                    {/* Card */}
                    <div className="group p-6 rounded-2xl border border-white/5 bg-neutral-900/40 hover:bg-neutral-900/80 hover:border-white/20 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg bg-white/5 ${event.color}`}>
                                <Icon size={18} />
                            </div>
                            <h3 className="text-xl font-bold text-white">{event.title}</h3>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            {event.desc}
                        </p>
                    </div>
                </motion.div>
            );
        })}
        
        {/* End of History (Future) */}
        <div className="relative pb-20 opacity-50">
             <div className="absolute -left-[21px] top-0 h-3 w-3 rounded-full border-2 border-neutral-900 bg-white z-10 animate-pulse" />
             <span className="absolute -top-8 left-0 text-xs font-mono font-bold text-white">Future...</span>
        </div>
      </div>

      {/* ERA NAVIGATOR (Sticky Sidebar) */}
      <div className="hidden lg:block w-48 sticky top-24 h-fit">
          <div className="flex flex-col gap-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2 px-2">
                  Jump to Era
              </h4>
              {(["Cosmos", "Earth", "Life", "Humanity", "Modern"] as Era[]).map((era) => {
                  const Icon = ERA_ICONS[era];
                  const isActive = activeEra === era;
                  return (
                      <button
                        key={era}
                        onClick={() => scrollToEra(era)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all
                            ${isActive ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"}
                        `}
                      >
                          <Icon size={14} />
                          {era}
                      </button>
                  );
              })}
          </div>
      </div>

    </div>
  );
}