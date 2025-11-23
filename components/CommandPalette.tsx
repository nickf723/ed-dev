"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Hash, Gamepad2, BookOpen, X } from "lucide-react";
import { glossaryTerms } from "@/lib/glossary-db";

// --- INDEXING ---
// In a real app, this might be dynamic. Here we manually index key routes.
const PAGES = [
  { title: "Home", href: "/", icon: FileText, type: "Page" },
  { title: "Formal Science", href: "/formal-science", icon: Hash, type: "Domain" },
  { title: "Natural Science", href: "/natural-science", icon: FileText, type: "Domain" },
  { title: "Social Science", href: "/social-science", icon: FileText, type: "Domain" },
  { title: "Applied Science", href: "/applied-science", icon: FileText, type: "Domain" },
  { title: "Humanities", href: "/humanities", icon: BookOpen, type: "Domain" },
  { title: "Interdisciplines", href: "/interdisciplines", icon: FileText, type: "Domain" },
  { title: "Magic: The Gathering", href: "/interdisciplines/game-studies/library/magic-the-gathering", icon: Gamepad2, type: "Game" },
  { title: "Game Studies", href: "/interdisciplines/game-studies", icon: Gamepad2, type: "Interdiscipline" },
  { title: "The Arcade", href: "/arcade", icon: Gamepad2, type: "Hub" },
  { title: "The Library", href: "/library", icon: BookOpen, type: "Hub" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Keyboard Shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Filter Logic
  const filteredPages = PAGES.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
  
  const filteredTerms = Object.keys(glossaryTerms).filter(t => 
    t.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5); // Limit to 5 terms to keep UI clean

  const handleSelect = (href: string) => {
      setOpen(false);
      router.push(href);
      setQuery("");
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-xl flex flex-col gap-2 bg-[#1a1614] border border-white/10 rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/10"
          >
            
            {/* Input */}
            <div className="flex items-center px-4 py-4 border-b border-white/5 gap-3">
                <Search className="text-neutral-500 w-5 h-5" />
                <input 
                    className="flex-1 bg-transparent text-lg text-white placeholder-neutral-500 outline-none border-none focus:ring-0"
                    placeholder="Search for knowledge..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
                <button onClick={() => setOpen(false)} className="text-neutral-500 hover:text-white"><X size={18} /></button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
                
                {filteredPages.length > 0 && (
                    <div className="mb-4">
                        <span className="px-3 text-[10px] font-bold uppercase text-neutral-500 mb-2 block">Navigation</span>
                        {filteredPages.map((page) => (
                            <button
                                key={page.href}
                                onClick={() => handleSelect(page.href)}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-neutral-300 hover:text-white transition-colors group"
                            >
                                <page.icon size={16} className="text-neutral-500 group-hover:text-cyan-400" />
                                <span className="text-sm">{page.title}</span>
                                <span className="ml-auto text-[10px] text-neutral-600 uppercase border border-white/5 px-1.5 rounded">{page.type}</span>
                            </button>
                        ))}
                    </div>
                )}

                {filteredTerms.length > 0 && (
                    <div>
                        <span className="px-3 text-[10px] font-bold uppercase text-neutral-500 mb-2 block">Glossary</span>
                        {filteredTerms.map((term) => (
                            <button
                                key={term}
                                onClick={() => handleSelect(`/glossary#${term}`)} // Anchor link assumption
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-neutral-300 hover:text-white transition-colors group"
                            >
                                <Hash size={16} className="text-neutral-500 group-hover:text-amber-400" />
                                <span className="text-sm">{term}</span>
                                <span className="ml-auto text-[10px] text-neutral-600 uppercase border border-white/5 px-1.5 rounded">Def</span>
                            </button>
                        ))}
                    </div>
                )}

                {filteredPages.length === 0 && filteredTerms.length === 0 && (
                    <div className="p-8 text-center text-neutral-500">
                        No results found for "{query}"
                    </div>
                )}

            </div>
            
            {/* Footer */}
            <div className="px-4 py-2 bg-white/5 border-t border-white/5 flex justify-between items-center text-[10px] text-neutral-500">
                <span>Navigate with arrows</span>
                <div className="flex gap-2">
                    <span className="bg-black/30 px-1.5 rounded">Esc</span> to close
                </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}