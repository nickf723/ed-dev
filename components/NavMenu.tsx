"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";

type NavItemProps = {
  title: string;
  desc: string;
  href: string;
  Icon: LucideIcon;
  tags: string[];
  color: string; // Tailwind text color class (e.g. "text-cyan-400")
};

export default function NavMenu({ items }: { items: NavItemProps[] }) {
  const [hovered, setHovered] = useState<NavItemProps>(items[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[450px]">
      
      {/* LEFT: The List */}
      <div className="flex-1 flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            onMouseEnter={() => setHovered(item)}
            className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300
              ${hovered.title === item.title 
                ? "bg-white/10 border-white/20 translate-x-2" 
                : "bg-transparent border-transparent hover:bg-white/5 text-neutral-500"}
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg bg-white/5 ${hovered.title === item.title ? item.color : "text-neutral-600"}`}>
                 <item.Icon size={20} />
              </div>
              <div>
                <h3 className={`text-lg font-bold transition-colors ${hovered.title === item.title ? "text-white" : "text-neutral-400"}`}>
                    {item.title}
                </h3>
              </div>
            </div>
            
            {/* Arrow only shows on active item */}
            <ArrowRight 
                size={16} 
                className={`transition-all duration-300 ${hovered.title === item.title ? "opacity-100 translate-x-0 text-white" : "opacity-0 -translate-x-4"}`} 
            />
          </Link>
        ))}
      </div>

      {/* RIGHT: The Preview Pane (Hidden on mobile) */}
      <div className="hidden lg:block w-[450px]">
        <AnimatePresence mode="wait">
            <motion.div
                key={hovered.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="h-full rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 flex flex-col relative overflow-hidden"
            >
                {/* Ambient Background Glow */}
                <div className={`absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-gradient-to-br ${hovered.color.replace('text-', 'from-')}/20 to-transparent rounded-full blur-[80px] pointer-events-none`} />

                <div className="relative z-10 flex flex-col h-full">
                    <div className={`mb-6 p-4 w-fit rounded-2xl bg-white/5 border border-white/10 ${hovered.color}`}>
                        <hovered.Icon size={48} />
                    </div>
                    
                    <h2 className="text-3xl font-black text-white mb-4 tracking-tight">{hovered.title}</h2>
                    <p className="text-md text-neutral-400 leading-relaxed mb-8">
                        {hovered.desc}
                    </p>

                    <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-8">
                            {hovered.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-neutral-300 font-medium font-mono">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <Link 
                            href={hovered.href}
                            className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-neutral-200 transition-colors w-full justify-center"
                        >
                            Access Domain <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}