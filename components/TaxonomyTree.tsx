"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sprout, Cat, Fish, Bug, Ghost } from "lucide-react";

// Simplified Tree Data
const TREE_DATA = {
  id: "life", label: "Life", icon: Sprout, color: "text-green-400",
  children: [
    {
      id: "eukarya", label: "Eukarya", desc: "Complex cells with a nucleus.",
      children: [
        {
          id: "animalia", label: "Animalia", desc: "Multicellular, heterotrophic.",
          children: [
            { id: "chordata", label: "Chordata", desc: "Vertebrates (mostly)." },
            { id: "arthropoda", label: "Arthropoda", desc: "Insects, spiders, crustaceans." },
          ]
        },
        {
          id: "plantae", label: "Plantae", desc: "Photosynthetic, cellulose walls.",
          children: [
            { id: "angiosperms", label: "Angiosperms", desc: "Flowering plants." },
            { id: "gymnosperms", label: "Gymnosperms", desc: "Conifers and cycads." },
          ]
        },
        { id: "fungi", label: "Fungi", desc: "Decomposers, chitin walls." },
      ]
    },
    {
      id: "bacteria", label: "Bacteria", desc: "Simple, single-celled prokaryotes.",
      children: [
        { id: "cyanobacteria", label: "Cyanobacteria", desc: "Blue-green algae." },
        { id: "firmicutes", label: "Firmicutes", desc: "Many gut bacteria." },
      ]
    },
    {
      id: "archaea", label: "Archaea", desc: "Extremophiles.",
      children: [] 
    }
  ]
};

export default function TaxonomyTree() {
  const [path, setPath] = useState<any[]>([TREE_DATA]);

  const currentLevel = path[path.length - 1];

  const drillDown = (node: any) => {
    if (node.children && node.children.length > 0) {
        setPath([...path, node]);
    }
  };

  const goUp = (index: number) => {
      setPath(path.slice(0, index + 1));
  };

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      {/* Header / Breadcrumbs */}
      <div className="border-b border-white/5 px-5 py-4">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300 mb-3">
          <Sprout size={14} className="text-emerald-400" /> Tree of Life
        </h3>
        
        <div className="flex flex-wrap items-center gap-1 text-[10px] font-mono">
            {path.map((node, i) => (
                <div key={node.id} className="flex items-center">
                    {i > 0 && <ChevronRight size={10} className="text-neutral-600 mx-1" />}
                    <button 
                        onClick={() => goUp(i)}
                        className={`hover:text-emerald-300 transition-colors ${i === path.length - 1 ? "text-emerald-400 font-bold" : "text-neutral-500"}`}
                    >
                        {node.label}
                    </button>
                </div>
            ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 min-h-[200px]">
         <AnimatePresence mode="popLayout">
             <motion.div 
                key={currentLevel.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid gap-2"
             >
                 {currentLevel.children?.map((child: any) => (
                     <button
                        key={child.id}
                        onClick={() => drillDown(child)}
                        disabled={!child.children || child.children.length === 0}
                        className={`group flex items-center justify-between w-full p-3 rounded-lg border border-white/5 bg-white/5 text-left transition-all
                            ${child.children?.length > 0 ? "hover:bg-emerald-900/20 hover:border-emerald-500/30 cursor-pointer" : "opacity-70 cursor-default"}
                        `}
                     >
                         <div>
                             <span className="text-sm font-bold text-neutral-200 group-hover:text-emerald-200 block">{child.label}</span>
                             <span className="text-[10px] text-neutral-500">{child.desc}</span>
                         </div>
                         {child.children?.length > 0 && (
                             <ChevronRight size={16} className="text-neutral-600 group-hover:text-emerald-400" />
                         )}
                     </button>
                 ))}
                 
                 {(!currentLevel.children || currentLevel.children.length === 0) && (
                     <div className="flex flex-col items-center justify-center h-32 text-neutral-500">
                         <Cat size={32} className="mb-2 opacity-20" />
                         <p className="text-xs">End of Branch</p>
                     </div>
                 )}
             </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
}