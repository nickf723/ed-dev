"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useMemex, MemexItem } from "@/lib/useMemex";
import { BookOpen, Scale, Image as ImageIcon, Box, Trash2, X, ChevronUp } from "lucide-react";
import { useState } from "react";

// Icons for different item types
const TYPE_ICONS = {
  term: BookOpen,
  axiom: Scale,
  image: ImageIcon,
  asset: Box,
};

export default function MemexDock() {
  const { items, removeItem, isOpen, setIsOpen, clearMemex } = useMemex();
  const [activeItem, setActiveItem] = useState<MemexItem | null>(null);

  if (items.length === 0 && !isOpen) return null; // Hide if empty

  return (
    <>
      {/* Toggle Button (Floating) */}
      <motion.button
        initial={{ y: 100 }} animate={{ y: 0 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-cyan-500 text-black shadow-lg hover:bg-cyan-400 transition-colors"
      >
        <span className="font-bold font-mono">{items.length}</span>
      </motion.button>

      {/* The Dock */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-900/90 border-t border-white/10 backdrop-blur-xl pb-6 pt-2 px-4 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4 px-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                    Memex Collection
                </h3>
                <div className="flex gap-4">
                    <button onClick={clearMemex} className="text-[10px] text-red-400 hover:text-red-300 uppercase flex items-center gap-1">
                        <Trash2 size={12} /> Clear
                    </button>
                    <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-white">
                        <ChevronUp size={16} className="rotate-180" />
                    </button>
                </div>
            </div>

            {/* Scrollable Strip */}
            <div className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
                {items.map((item) => {
                    const Icon = TYPE_ICONS[item.type];
                    return (
                        <motion.div
                            key={item.id}
                            layoutId={item.id}
                            onClick={() => setActiveItem(item)}
                            className="group relative flex-shrink-0 w-16 h-16 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 cursor-pointer flex flex-col items-center justify-center transition-all"
                        >
                            {item.type === "image" && item.content ? (
                                <img src={item.content} className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                            ) : (
                                <Icon className="text-neutral-400 group-hover:text-cyan-400 mb-1" size={20} />
                            )}
                            
                            {/* Badge */}
                            <div className="absolute -top-2 -right-2 bg-black border border-white/10 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <X size={10} className="text-red-400" onClick={(e) => { e.stopPropagation(); removeItem(item.id); }} />
                            </div>
                        </motion.div>
                    );
                })}
                
                {items.length === 0 && (
                    <div className="w-full text-center py-4 text-xs text-neutral-600 italic">
                        Your Memex is empty. Pin items from the library to collect them here.
                    </div>
                )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
          {activeItem && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm" onClick={() => setActiveItem(null)}>
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-neutral-900 border border-white/10 rounded-xl p-6 max-w-lg w-full shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                      <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-cyan-900/20 text-cyan-400">
                              {activeItem.type === "image" ? <ImageIcon /> : <BookOpen />}
                          </div>
                          <div>
                              <h2 className="text-xl font-bold text-white">{activeItem.title}</h2>
                              <span className="text-xs font-mono text-neutral-500 uppercase">{activeItem.type} • {new Date(activeItem.timestamp).toLocaleDateString()}</span>
                          </div>
                      </div>
                      
                      <div className="mt-6 bg-black/40 rounded-lg p-4 border border-white/5">
                          {activeItem.type === "image" ? (
                              <img src={activeItem.content} className="w-full rounded" />
                          ) : (
                              <p className="text-sm text-neutral-300 leading-relaxed font-serif">
                                  {activeItem.content}
                              </p>
                          )}
                      </div>
                  </motion.div>
              </div>
          )}
      </AnimatePresence>
    </>
  );
}