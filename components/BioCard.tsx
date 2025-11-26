"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PANTHEON } from "@/lib/people-db";
import { AXIOM_LIBRARY } from "@/lib/axiom-db";
import { User, Scale, Calendar, Swords } from "lucide-react";

// Reuse the Axiom Card for the preview!
import { AxiomCard } from "@/components/AxiomExplorer"; 

export default function BioCard({ personId }: { personId: string }) {
  const person = PANTHEON.find(p => p.id === personId);
  const [activeTab, setActiveTab] = useState<"bio" | "work">("bio");

  if (!person) return null;

  // Hydrate relations
  const relatedAxioms = AXIOM_LIBRARY.filter(a => person.axioms?.includes(a.id));

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl max-w-md">
      
      {/* Header / Portrait Area */}
      <div className="relative h-32 bg-gradient-to-br from-neutral-800 to-black p-6 flex items-end">
          <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')]" />
          <div className="relative z-10">
              <h2 className="text-2xl font-black text-white">{person.name}</h2>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span>{person.dates}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{person.role}</span>
              </div>
          </div>
          {/* Zone Badge */}
          <div className="absolute top-4 right-4 px-2 py-1 rounded border border-white/10 bg-white/5 text-[9px] font-bold uppercase tracking-widest text-neutral-400">
              {person.zone}
          </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5">
          <button 
            onClick={() => setActiveTab("bio")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === "bio" ? "text-white bg-white/5" : "text-neutral-500 hover:text-neutral-300"}`}
          >
              Biography
          </button>
          <button 
            onClick={() => setActiveTab("work")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === "work" ? "text-white bg-white/5" : "text-neutral-500 hover:text-neutral-300"}`}
          >
              Great Works ({relatedAxioms.length})
          </button>
      </div>

      {/* Content */}
      <div className="p-6 min-h-[200px]">
          <AnimatePresence mode="wait">
              {activeTab === "bio" ? (
                  <motion.div 
                    key="bio"
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                  >
                      <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                          {person.bio}
                      </p>
                      
                      {/* Rivals Section */}
                      {person.rivals && (
                          <div className="bg-red-900/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-3">
                              <Swords size={16} className="text-red-400" />
                              <div>
                                  <span className="text-[10px] font-bold uppercase text-red-300 block">Ideological Rival</span>
                                  {/* In a real app, this would link to the rival's card */}
                                  <span className="text-xs font-bold text-white">{person.rivals.map(r => r.toUpperCase()).join(", ")}</span>
                              </div>
                          </div>
                      )}
                  </motion.div>
              ) : (
                  <motion.div 
                    key="work"
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    className="space-y-4"
                  >
                      {relatedAxioms.length > 0 ? (
                          relatedAxioms.map(axiom => (
                              <div key={axiom.id} className="scale-90 origin-top-left -mb-4">
                                  {/* Reuse your existing interactive calculator! */}
                                  <AxiomCard axiom={axiom} />
                              </div>
                          ))
                      ) : (
                          <div className="text-center text-neutral-500 text-xs py-8 italic">
                              No interactive modules archived.
                          </div>
                      )}
                  </motion.div>
              )}
          </AnimatePresence>
      </div>

    </div>
  );
}