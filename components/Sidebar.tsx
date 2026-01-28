"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, ChevronDown, Menu, X, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
// Assuming these exist based on your snippet, otherwise remove/mock
import XRayConsole from "@/components/XRayConsole"; 
import { NAVIGATION_DATA } from "@/lib/navigation";
import { useSidebar } from "./SidebarContext";

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
  // Mobile Overlay State
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  // Desktop Collapsed State (Persist this in local storage in a real app)
  const { isCollapsed, toggleSidebar } = useSidebar();
  
  const domain = getDomain(pathname);
  const activeTheme = domainColors[domain];

  // Close mobile menu on route change
  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* MOBILE TRIGGER (Visible only on small screens) */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)} 
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-black/50 border border-white/10 text-white backdrop-blur-md md:hidden"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* MOBILE OVERLAY BACKDROP */}
      {isMobileOpen && (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside 
        className={`
            fixed inset-y-0 left-0 z-40 flex flex-col bg-black/90 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ease-in-out
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            ${isCollapsed ? "w-20" : "w-72"}
        `}
        
      >
        
        {/* HEADER / BRAND */}
        <div className="h-20 flex items-center border-b border-white/5 relative">
            <Link href="/" className={`flex items-center gap-3 px-6 w-full h-full hover:bg-white/5 transition-colors group ${isCollapsed ? "justify-center px-0" : ""}`}>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-500 ${activeTheme.replace('text-', 'border-').split(' ')[0]} bg-white/5`}>
                    <LayoutGrid size={16} className={activeTheme.split(" ")[0]} />
                </div>
                
                {/* Text hides when collapsed */}
                <div className={`transition-opacity duration-200 ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
                    <h1 className="text-sm font-black tracking-widest text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">KNOWLEDGE</h1>
                    <p className="text-[9px] font-mono text-neutral-500 tracking-widest whitespace-nowrap">NETWRK v2.1</p>
                </div>
            </Link>

            {/* DESKTOP COLLAPSE TOGGLE (Hidden on mobile) */}
            <button 
                onClick={toggleSidebar}
                className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black border border-white/20 rounded-full items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-all z-50"
            >
                {isCollapsed ? <PanelLeftOpen size={12} /> : <PanelLeftClose size={12} />}
            </button>
        </div>

        {/* NAVIGATION SCROLL AREA */}
        <nav className={`flex-1 overflow-y-auto py-6 space-y-8 scrollbar-thin scrollbar-thumb-white/10 ${isCollapsed ? "px-2" : "px-3"}`}>
           {NAVIGATION_DATA.map((section) => (
             <div key={section.title} className={isCollapsed ? "text-center" : ""}>
               {/* Section Title */}
               <h3 className={`mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600 transition-opacity duration-300 ${isCollapsed ? "opacity-0 h-0 overflow-hidden" : "px-3"}`}>
                   {section.title}
               </h3>
               
               {/* Divider for collapsed mode to separate sections visually */}
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

        {/* FOOTER */}
        <div className={`p-4 border-t border-white/5 bg-black/20 transition-all ${isCollapsed ? "flex justify-center p-2" : ""}`}>
            {isCollapsed ? (
                // Minimized Footer Icon
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
            ) : (
                // Full Console
                <XRayConsole />
            )}
        </div>
        {/* KEYBOARD SHORTCUT HINT */}
        {!isCollapsed && (
            <div className="mt-auto p-4 border-t border-white/5">
                <button 
                    // We can also make this button clickable to open the menu manually if we want
                    onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-400 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors group"
                >
                    <span className="flex items-center gap-2">
                        <Search size={12} />
                        <span className="font-mono text-[10px] uppercase">Search</span>
                    </span>
                    <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-black px-1.5 font-mono text-[10px] font-medium text-slate-500 group-hover:text-cyan-500 group-hover:border-cyan-500/30">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </button>
            </div>
        )}
      </aside>
    </>
  );
}

// --- SUB-COMPONENT: NAV ITEM ---
function NavItem({ item, currentPath, isCollapsed, domainColors }: { item: any; currentPath: string; isCollapsed: boolean; domainColors: any }) {
    const isActive = currentPath === item.href || currentPath.startsWith(item.href + "/");
    const [expanded, setExpanded] = useState(isActive);
    const Icon = item.icon;
    
    // Auto-expand/collapse behaviors
    useEffect(() => { 
        if (isActive) setExpanded(true); 
        if (isCollapsed) setExpanded(false); // Collapse sub-menus when sidebar shrinks
    }, [isActive, isCollapsed]);

    // Handle Click
    const handleClick = (e: any) => {
        if(item.children && !isCollapsed) {
            e.preventDefault();
            setExpanded(!expanded);
        }
    };

    return (
        <div className="relative group">
            <Link 
                href={item.href} 
                onClick={handleClick}
                title={isCollapsed ? item.label : ""} // Tooltip behavior for collapsed state
                className={`
                    flex items-center justify-between rounded-lg transition-all cursor-pointer relative
                    ${isCollapsed ? "p-3 justify-center" : "px-3 py-2.5"}
                    ${isActive ? domainColors[item.domain] : "text-neutral-500 hover:text-neutral-200 hover:bg-white/5"}
                `}
            >
                <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3 flex-1"}`}>
                    <Icon size={isCollapsed ? 20 : 16} className={isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100 transition-opacity"} />
                    
                    {/* Label (Hidden when collapsed) */}
                    <span className={`text-xs font-bold tracking-wide transition-all duration-300 ${isCollapsed ? "w-0 overflow-hidden opacity-0 absolute" : "w-auto opacity-100 relative"}`}>
                        {item.label}
                    </span>
                </div>

                {/* Dropdown Arrow (Hidden when collapsed) */}
                {item.children && !isCollapsed && (
                    <ChevronDown size={12} className={`transition-transform duration-300 opacity-50 ${expanded ? "rotate-180" : ""}`} />
                )}
                
                {/* Active Indicator Dot (Collapsed Mode) */}
                {isActive && isCollapsed && (
                    <div className="absolute right-1 top-1 w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_5px_currentColor]" />
                )}
            </Link>

            {/* SUB-MENU (Only visible when NOT collapsed) */}
            <AnimatePresence>
                {expanded && item.children && !isCollapsed && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: "auto", opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }} 
                        className="overflow-hidden"
                    >
                        <div className="ml-4 pl-3 border-l border-white/10 py-1 space-y-0.5 mt-1">
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