"use client";
import React from "react";
import { X, Globe, Activity, ShieldAlert, Skull, HeartHandshake, Swords, ScanLine, Dna, FileText } from "lucide-react";
import { ECOLOGY_MAP, RelationType } from "./zoology-data";
import { AnimalRecord } from "./useWikiZoo";

// Helper to get relation icon
const getRelationIcon = (type: RelationType) => {
    switch(type) {
        case 'PREDATES_ON': return <Skull size={12} className="text-red-400" />;
        case 'PREY_OF': return <ShieldAlert size={12} className="text-orange-400" />;
        case 'SYMBIOSIS_WITH': return <HeartHandshake size={12} className="text-emerald-400" />;
        case 'COMPETES_WITH': return <Swords size={12} className="text-yellow-400" />;
        default: return <Activity size={12} />;
    }
};

interface Props {
  animal: AnimalRecord;
  onClose: () => void;
  onSearchRelation: (query: string) => void; 
}

export default function ZoologyModal({ animal, onClose, onSearchRelation }: Props) {
  // Pull local metadata if it exists, replace spaces with underscores for lookup if needed
  const lookupKey = animal.title.replace(/ /g, "_");
  // Basic fallback lookup. In a real app, you'd want fuzzy matching or ID mapping.
  // We try to match by exact title or query key found in ECOLOGY_MAP keys.
  const meta = Object.entries(ECOLOGY_MAP).find(([k]) => k === lookupKey || k === animal.title)?.[1] || null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300 cursor-pointer" />

      {/* Card */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#0a0f0d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        
        {/* --- LEFT: VISUALS --- */}
        <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-black shrink-0">
             {animal.thumbnail ? (
                 <img src={animal.thumbnail} alt={animal.title} className="w-full h-full object-cover opacity-90" />
             ) : (
                 <div className="w-full h-full flex items-center justify-center text-stone-600 font-mono text-xs">NO VISUAL</div>
             )}
             <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                 <h2 className="text-3xl md:text-4xl font-black text-white">{animal.title}</h2>
                 <div className="text-emerald-500 font-mono text-xs flex items-center gap-2 mt-2">
                     <ScanLine size={12} /> ID: {animal.id}
                 </div>
             </div>
        </div>

        {/* --- RIGHT: DATA --- */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-neutral-900/50">
            
            {/* Header / Tags */}
            <div className="flex justify-between items-start mb-6">
                 <div className="flex flex-wrap gap-2">
                     {meta?.trophic && (
                         <span className="px-2 py-1 rounded bg-red-900/30 border border-red-500/30 text-[9px] font-bold uppercase text-red-400 tracking-wider">
                             {meta.trophic.replace('_', ' ')}
                         </span>
                     )}
                     {meta?.tags.map(tag => (
                         <span key={tag} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-bold uppercase text-stone-400 tracking-wider">
                             {tag}
                         </span>
                     ))}
                     {!meta && <span className="px-2 py-1 rounded bg-white/5 text-[9px] font-bold uppercase text-stone-500">Unclassified</span>}
                 </div>
                 <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors"><X className="text-stone-500 hover:text-white" size={20} /></button>
            </div>

            {/* Description */}
            <div className="prose prose-invert prose-sm max-w-none mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2 mb-3">
                    <FileText size={14} /> Abstract
                </h3>
                <p className="text-stone-300 leading-relaxed">
                    {animal.extract}
                </p>
            </div>

            {/* Network */}
            {meta?.relationships && meta.relationships.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                        <Activity size={14} className="text-emerald-500" /> Ecological Network
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        {meta.relationships.map((rel, i) => (
                            <button 
                                key={i}
                                onClick={() => onSearchRelation(rel.targetName)}
                                className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 rounded bg-black border border-white/10">
                                        {getRelationIcon(rel.type)}
                                    </div>
                                    <span className="text-xs font-bold text-stone-300 group-hover:text-white">
                                        {rel.targetName}
                                    </span>
                                </div>
                                <span className="text-[9px] font-mono uppercase text-stone-600 group-hover:text-emerald-500">
                                    {rel.type.replace(/_/g, ' ')}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Footer */}
            <div className="mt-auto pt-8 border-t border-white/5 flex gap-4">
                 <div className="text-[10px] text-stone-500">
                    STATUS: <span className="text-white font-bold">{animal.status || "UNKNOWN"}</span>
                 </div>
            </div>

        </div>
      </div>
    </div>
  );
}