"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Binary,
  Atom,
  Handshake,
  Hammer,
  Palette,
  Link as LinkIcon,
  BookOpen,
  Skull,
  Theater,
  Wrench,
  Calculator,
  Key,
  Terminal,
  Network,
  Sigma,
  Search,
} from "@/components/icons"; // Ensure these exports exist in your icons.ts or lucide-react
import { LayoutGrid } from "lucide-react";

// Define the domain mapping for theming
const getDomain = (path: string) => {
  if (path.startsWith("/formal-science")) return "formal";
  if (path.startsWith("/natural-science")) return "natural";
  if (path.startsWith("/social-science")) return "social";
  if (path.startsWith("/applied-science")) return "applied";
  if (path.startsWith("/humanities")) return "humanities";
  if (path.startsWith("/interdisciplines")) return "inter";
  if (path.startsWith("/glossary")) return "meta";
  if (path.startsWith("/skeleton")) return "meta";
  if (path.startsWith("/dev-playground")) return "meta";
  if (path.startsWith("/stage")) return "meta";
  return "home";
};

// Theme colors for each domain (matching your themes.css variables roughly)
const domainColors: Record<string, string> = {
  formal: "text-red-400 border-red-500/30 bg-red-500/10",
  natural: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  social: "text-violet-400 border-violet-500/30 bg-violet-500/10",
  applied: "text-orange-400 border-orange-500/30 bg-orange-500/10",
  humanities: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  inter: "text-lime-400 border-lime-500/30 bg-lime-500/10",
  meta: "text-neutral-200 border-white/20 bg-white/5",
  home: "text-blue-400 border-blue-500/30 bg-blue-500/10",
};

// Hover colors (text only)
const hoverColors: Record<string, string> = {
  formal: "hover:text-red-300",
  natural: "hover:text-cyan-300",
  social: "hover:text-violet-300",
  applied: "hover:text-orange-300",
  humanities: "hover:text-amber-300",
  inter: "hover:text-lime-300",
  meta: "hover:text-white",
  home: "hover:text-blue-300",
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const domain = getDomain(pathname);
  
  // Auto-collapse functionality or persistent state could go here
  // For now, we keep simple local state for sub-menus
  
  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 rounded-lg border border-neutral-800 bg-neutral-950/80 p-2 text-neutral-400 backdrop-blur-md md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[var(--sidebar-width)] flex-col border-r border-white/5 bg-neutral-950/90 backdrop-blur-xl transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo / Header area */}
        <div className="flex h-20 items-center px-6 border-b border-white/5">
           <div className="flex items-center gap-3">
             <div className={`flex h-8 w-8 items-center justify-center rounded-lg border bg-opacity-20 ${domainColors[domain].replace('text-', 'border-')}`}>
                <LayoutGrid size={18} className={domainColors[domain].split(" ")[0]} />
             </div>
             <div>
                <h1 className="text-sm font-bold tracking-wider text-white">KNOWLEDGE</h1>
                <p className="text-[10px] font-mono text-neutral-500">NETWORK v2.0</p>
             </div>
           </div>
        </div>

        {/* Scrollable Nav Area */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-8 scroll-bar">
          
          {/* CORE DOMAINS */}
          <Section title="Domains">
            <NavItem href="/formal-science" icon={Binary} label="Formal Science" domain="formal" currentPath={pathname}>
               <SubLink href="/formal-science/mathematics" label="Mathematics" currentPath={pathname} />
               <SubLink href="/formal-science/logic" label="Logic" currentPath={pathname} />
               <SubLink href="/formal-science/computer-science" label="Computer Science" currentPath={pathname} />
               <SubLink href="/formal-science/systems-science" label="Systems Science" currentPath={pathname} />
            </NavItem>

            <NavItem href="/natural-science" icon={Atom} label="Natural Science" domain="natural" currentPath={pathname}>
               <SubLink href="/natural-science/physics" label="Physics" currentPath={pathname} />
               <SubLink href="/natural-science/chemistry" label="Chemistry" currentPath={pathname} />
               <SubLink href="/natural-science/biology" label="Biology" currentPath={pathname} />
               <SubLink href="/natural-science/astronomy" label="Astronomy" currentPath={pathname} />
               <SubLink href="/natural-science/earth-science" label="Earth Science" currentPath={pathname} />
            </NavItem>

            <NavItem href="/social-science" icon={Handshake} label="Social Science" domain="social" currentPath={pathname}>
               <SubLink href="/social-science/psychology" label="Psychology" currentPath={pathname} />
               <SubLink href="/social-science/sociology" label="Sociology" currentPath={pathname} />
               <SubLink href="/social-science/economics" label="Economics" currentPath={pathname} />
               <SubLink href="/social-science/political-science" label="Political Science" currentPath={pathname} />
            </NavItem>

            <NavItem href="/applied-science" icon={Hammer} label="Applied Science" domain="applied" currentPath={pathname}>
               <SubLink href="/applied-science/engineering" label="Engineering" currentPath={pathname} />
               <SubLink href="/applied-science/medicine" label="Medicine" currentPath={pathname} />
               <SubLink href="/applied-science/computer-technology" label="Technology" currentPath={pathname} />
            </NavItem>

            <NavItem href="/humanities" icon={Palette} label="Humanities" domain="humanities" currentPath={pathname}>
               <SubLink href="/humanities/philosophy" label="Philosophy" currentPath={pathname} />
               <SubLink href="/humanities/history" label="History" currentPath={pathname} />
               <SubLink href="/humanities/literature" label="Literature" currentPath={pathname} />
               <SubLink href="/humanities/arts-aesthetics" label="Arts" currentPath={pathname} />
            </NavItem>

            <NavItem href="/interdisciplines" icon={LinkIcon} label="Interdisciplines" domain="inter" currentPath={pathname} />
          </Section>

          {/* SYSTEM TOOLS */}
          <Section title="System">
             <NavItem href="/glossary" icon={BookOpen} label="Glossary" domain="meta" currentPath={pathname} />
             <NavItem href="/skeleton" icon={Skull} label="Skeleton" domain="meta" currentPath={pathname} />
             <NavItem href="/dev-playground" icon={Wrench} label="Playground" domain="meta" currentPath={pathname} />
             <NavItem href="/stage" icon={Theater} label="Stage" domain="meta" currentPath={pathname} />
          </Section>
        </nav>
        
        {/* Footer Status */}
        <div className="p-4 border-t border-white/5">
            <div className="rounded-lg bg-white/5 p-3 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full animate-pulse ${domainColors[domain].split(" ")[0].replace("text-", "bg-")}`} />
                <div className="flex-1">
                    <p className="text-[10px] uppercase font-bold text-neutral-400">Status</p>
                    <p className="text-xs font-mono text-neutral-300">CONNECTED</p>
                </div>
                <span className="text-[10px] font-mono text-neutral-600">0.14s</span>
            </div>
        </div>

      </aside>
    </>
  );
}

// --- Helper Components ---

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <h3 className="px-4 text-[10px] font-bold uppercase tracking-widest text-neutral-600">{title}</h3>
            <div className="space-y-0.5">{children}</div>
        </div>
    );
}

function NavItem({ href, icon: Icon, label, domain, currentPath, children }: any) {
    const isActive = currentPath === href || currentPath.startsWith(href + "/");
    const [expanded, setExpanded] = useState(isActive);
    
    // Auto-expand if active
    useEffect(() => {
        if (isActive) setExpanded(true);
    }, [isActive]);

    const activeClass = isActive ? domainColors[domain] : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200";

    return (
        <div>
            <div className={`group flex items-center justify-between px-3 py-2 rounded-lg transition-all cursor-pointer mx-2 ${activeClass}`}>
                <Link href={href} className="flex flex-1 items-center gap-3">
                    <Icon size={16} className={isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"} />
                    <span className="text-sm font-medium">{label}</span>
                </Link>
                {children && (
                    <button onClick={(e) => { e.preventDefault(); setExpanded(!expanded); }} className="p-1 rounded hover:bg-black/20">
                        <ChevronDown size={14} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
                    </button>
                )}
            </div>
            
            <AnimatePresence>
                {expanded && children && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-10 pr-2 space-y-0.5"
                    >
                        <div className="py-1 border-l border-white/10 space-y-0.5">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function SubLink({ href, label, currentPath }: { href: string; label: string; currentPath: string }) {
    const isActive = currentPath === href;
    const domain = getDomain(href);
    
    return (
        <Link 
            href={href} 
            className={`block pl-4 py-1.5 text-xs border-l-2 transition-colors
                ${isActive 
                    ? `border-current ${domainColors[domain].split(" ")[0]} font-semibold` 
                    : "border-transparent text-neutral-500 hover:text-neutral-300"}
            `}
        >
            {label}
        </Link>
    );
}