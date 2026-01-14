"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, ChevronDown, Menu, X } from "lucide-react";
import XRayConsole from "@/components/XRayConsole";
import { NAVIGATION_DATA } from "@/lib/navigation";

// --- CONFIG ---
const getDomain = (path: string) => {
  if (path.startsWith("/formal-science")) return "formal";
  if (path.startsWith("/natural-science")) return "natural";
  if (path.startsWith("/social-science")) return "social";
  if (path.startsWith("/applied-science")) return "applied";
  if (path.startsWith("/humanities")) return "humanities";
  if (path.startsWith("/interdisciplines")) return "inter";
  if (path.startsWith("/skeleton")) return "meta";
  return "home";
};

const domainColors: Record<string, string> = {
  formal: "text-red-400 border-red-500/30 bg-red-500/10 shadow-[0_0_15px_rgba(248,113,113,0.1)]",
  natural: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.1)]",
  social: "text-violet-400 border-violet-500/30 bg-violet-500/10 shadow-[0_0_15px_rgba(167,139,250,0.1)]",
  applied: "text-orange-400 border-orange-500/30 bg-orange-500/10 shadow-[0_0_15px_rgba(251,146,60,0.1)]",
  humanities: "text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_15px_rgba(251,191,36,0.1)]",
  inter: "text-lime-400 border-lime-500/30 bg-lime-500/10 shadow-[0_0_15px_rgba(163,230,53,0.1)]",
  meta: "text-neutral-200 border-white/20 bg-white/5",
  home: "text-blue-400 border-blue-500/30 bg-blue-500/10",
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const domain = getDomain(pathname);
  
  return (
    <>
      {/* Mobile Trigger */}
      <button onClick={() => setIsOpen(!isOpen)} className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-black/50 border border-white/10 text-white backdrop-blur-md md:hidden">
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`fixed inset-y-0 left-0 z-40 w-72 flex flex-col bg-black/80 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        
        {/* BRAND */}
        <Link href="/" className="h-20 flex items-center gap-3 px-6 border-b border-white/5 hover:bg-white/5 transition-colors group">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-500 ${domainColors[domain].replace('text-', 'border-').split(' ')[0]} bg-white/5`}>
               <LayoutGrid size={16} className={domainColors[domain].split(" ")[0]} />
            </div>
            <div>
               <h1 className="text-sm font-black tracking-widest text-white group-hover:text-cyan-400 transition-colors">KNOWLEDGE</h1>
               <p className="text-[9px] font-mono text-neutral-500 tracking-widest">NETWRK v2.1</p>
            </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
           {NAVIGATION_DATA.map((section) => (
             <div key={section.title}>
               <h3 className="px-3 mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600">{section.title}</h3>
               <div className="space-y-0.5">
                 {section.items.map((item) => (
                   <NavItem key={item.href} item={item} currentPath={pathname} />
                 ))}
               </div>
             </div>
           ))}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-white/5 bg-black/20">
            <XRayConsole />
        </div>
      </aside>
    </>
  );
}

// --- SUB-COMPONENTS ---
function NavItem({ item, currentPath }: { item: any; currentPath: string }) {
    const isActive = currentPath === item.href || currentPath.startsWith(item.href + "/");
    const [expanded, setExpanded] = useState(isActive);
    const Icon = item.icon;
    
    // Auto-expand if active
    useEffect(() => { if (isActive) setExpanded(true); }, [isActive]);

    return (
        <div>
            <div className={`group flex items-center justify-between px-3 py-2.5 rounded-lg transition-all cursor-pointer ${isActive ? domainColors[item.domain] : "text-neutral-500 hover:text-neutral-200 hover:bg-white/5"}`}>
                <Link href={item.href} className="flex flex-1 items-center gap-3">
                    <Icon size={16} className={isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100 transition-opacity"} />
                    <span className="text-xs font-bold tracking-wide">{item.label}</span>
                </Link>
                {item.children && (
                    <button onClick={(e) => { e.preventDefault(); setExpanded(!expanded); }} className="p-1 hover:bg-black/20 rounded">
                        <ChevronDown size={12} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {expanded && item.children && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="ml-4 pl-3 border-l border-white/10 py-1 space-y-0.5">
                            {item.children.map((child: any) => (
                                <Link 
                                  key={child.href} 
                                  href={child.href}
                                  className={`block px-3 py-1.5 text-[11px] rounded transition-colors ${currentPath === child.href ? "text-white bg-white/10 font-medium" : "text-neutral-600 hover:text-neutral-300"}`}
                                >
                                    {child.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}