"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, ChevronDown, Menu, X, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import XRayConsole from "@/app/_components/XRayConsole"; 
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);  
  const domain = getDomain(pathname);
  const activeTheme = domainColors[domain];

  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  return (
    <>
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)} 
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-black/50 border border-white/10 text-white backdrop-blur-md md:hidden"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isMobileOpen && (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside 
        className={`
            fixed inset-y-0 left-0 z-40 flex flex-col bg-black/90 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ease-in-out
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            ${isCollapsed ? "w-20" : "w-72"}
        `}
      >
        <div className="h-20 flex items-center border-b border-white/5 relative">
            <Link href="/" className={`flex items-center gap-3 px-6 w-full h-full hover:bg-white/5 transition-colors group ${isCollapsed ? "justify-center px-0" : ""}`}>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-500 ${activeTheme.replace('text-', 'border-').split(' ')[0]} bg-white/5`}>
                    <LayoutGrid size={16} className={activeTheme.split(" ")[0]} />
                </div>
                
                <div className={`transition-opacity duration-200 ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
                    <h1 className="text-sm font-black tracking-widest text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">KNOWLEDGE</h1>
                    <p className="text-[9px] font-mono text-neutral-500 tracking-widest whitespace-nowrap">NETWRK v2.1</p>
                </div>
            </Link>

            <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black border border-white/20 rounded-full items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-all z-50"
            >
                {isCollapsed ? <PanelLeftOpen size={12} /> : <PanelLeftClose size={12} />}
            </button>
        </div>

        <nav className={`flex-1 overflow-y-auto py-6 space-y-8 scrollbar-thin scrollbar-thumb-white/10 ${isCollapsed ? "px-2" : "px-3"}`}>
           {NAVIGATION_DATA.map((section) => (
             <div key={section.title} className={isCollapsed ? "text-center" : ""}>
               <h3 className={`mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 transition-opacity duration-300 ${isCollapsed ? "opacity-0 h-0 overflow-hidden" : "px-3"}`}>
                   {section.title}
               </h3>
               
               {isCollapsed && <div className="h-px w-8 bg-white/5 mx-auto mb-4" />}

               <div className="space-y-1">
                 {section.items.map((item) => (
                   <NavItem 
                        key={item.href} 
                        item={item} 
                        currentPath={pathname} 
                        isCollapsed={isCollapsed}
                        domainColors={domainColors}
                   />
                 ))}
               </div>
             </div>
           ))}
        </nav>

        <div className={`p-4 border-t border-white/5 bg-black/20 transition-all ${isCollapsed ? "flex justify-center p-2" : ""}`}>
            {isCollapsed ? (
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
            ) : (
                <XRayConsole />
            )}
        </div>
      </aside>
    </>
  );
}

// --- SUB-COMPONENT: RECURSIVE NAV ITEM ---
function NavItem({ 
    item, 
    currentPath, 
    isCollapsed, 
    domainColors, 
    depth = 0, 
    parentDomain 
}: { 
    item: any; 
    currentPath: string; 
    isCollapsed: boolean; 
    domainColors: any;
    depth?: number;
    parentDomain?: string;
}) {
    // Determine the domain for coloring (inherit from parent if not defined)
    const itemDomain = item.domain || parentDomain || getDomain(item.href);
    
    // Check if exact match OR if a child path is active (to keep folders open)
    const isExactMatch = currentPath === item.href;
    const isChildActive = currentPath.startsWith(item.href + "/") && currentPath !== item.href;
    const isActive = isExactMatch || isChildActive;
    
    const [expanded, setExpanded] = useState(isActive);
    const Icon = item.icon;
    const isTopLevel = depth === 0;
    
    // Auto-expand/collapse behaviors
    useEffect(() => { 
        if (isActive) setExpanded(true); 
        if (isCollapsed) setExpanded(false); 
    }, [isActive, isCollapsed]);

    const handleClick = () => {
        // Toggle the folder open/close state. 
        // No e.preventDefault() here! We still want the <Link> to navigate to its href.
        if(item.children && item.children.length > 0 && !isCollapsed) {
            setExpanded(!expanded);
        }
    };

    // Styling differentiates Top-Level hubs from deeply nested subjects
    let containerStyle = "";
    if (isTopLevel) {
        containerStyle = `flex items-center justify-between rounded-lg transition-all cursor-pointer relative 
        ${isCollapsed ? "p-3 justify-center" : "px-3 py-2.5"}
        ${isActive ? domainColors[itemDomain] : "text-neutral-500 hover:text-neutral-200 hover:bg-white/5"}`;
    } else {
        containerStyle = `flex items-center justify-between rounded transition-all cursor-pointer relative
        ${isCollapsed ? "justify-center p-2" : "px-3 py-1.5 text-[11px]"}
        ${isExactMatch ? "text-white bg-white/10 font-medium" : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"}`;
    }

    return (
        <div className="relative group">
            <Link 
                href={item.href} 
                onClick={handleClick}
                title={isCollapsed ? item.label : ""}
                className={containerStyle}
            >
                <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3 flex-1"}`}>
                    {/* Deeply nested items might not have icons */}
                    {Icon && (
                        <Icon size={isCollapsed ? 20 : (isTopLevel ? 16 : 14)} className={isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100 transition-opacity"} />
                    )}
                    
                    <span className={`font-bold tracking-wide transition-all duration-300 ${isCollapsed ? "w-0 overflow-hidden opacity-0 absolute" : "w-auto opacity-100 relative"} ${isTopLevel ? "text-xs" : "text-[11px]"}`}>
                        {item.label}
                    </span>
                </div>

                {item.children && item.children.length > 0 && !isCollapsed && (
                    <ChevronDown size={12} className={`transition-transform duration-300 opacity-50 ${expanded ? "rotate-180" : ""}`} />
                )}
                
                {isActive && isCollapsed && isTopLevel && (
                    <div className="absolute right-1 top-1 w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_5px_currentColor]" />
                )}
            </Link>

            {/* INFINITE RECURSION SUB-MENU */}
            <AnimatePresence>
                {expanded && item.children && item.children.length > 0 && !isCollapsed && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: "auto", opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }} 
                        className="overflow-hidden"
                    >
                        <div className={`${isTopLevel ? "ml-4 pl-3 border-l border-white/10" : "ml-2 pl-2 border-l border-white/5"} py-1 space-y-0.5 mt-1`}>
                            {item.children.map((child: any) => (
                                <NavItem 
                                    key={child.href} 
                                    item={child} 
                                    currentPath={currentPath} 
                                    isCollapsed={isCollapsed}
                                    domainColors={domainColors}
                                    depth={depth + 1}
                                    parentDomain={itemDomain}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}