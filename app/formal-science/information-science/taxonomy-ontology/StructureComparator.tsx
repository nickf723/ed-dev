"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderTree, Network, GitCommit, ArrowRight } from 'lucide-react';

export default function StructureComparator() {
  const [mode, setMode] = useState<'taxonomy' | 'ontology'>('taxonomy');

  return (
    <div className="w-full bg-slate-900/90 border border-indigo-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col h-[500px]">
      {/* Header */}
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            {mode === 'taxonomy' ? <FolderTree className="text-indigo-400" size={16} /> : <Network className="text-amber-400" size={16} />}
            {mode === 'taxonomy' ? 'Taxonomy Viewer' : 'Ontology Visualizer'}
        </h3>
        <div className="flex bg-slate-800 rounded p-1">
            <button 
                onClick={() => setMode('taxonomy')}
                className={`px-3 py-1 text-[10px] font-bold uppercase rounded transition-colors ${mode === 'taxonomy' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
                Tree
            </button>
            <button 
                onClick={() => setMode('ontology')}
                className={`px-3 py-1 text-[10px] font-bold uppercase rounded transition-colors ${mode === 'ontology' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'}`}
            >
                Graph
            </button>
        </div>
      </div>

      {/* Visualizer Area */}
      <div className="flex-1 relative bg-[url('/grid-pattern.svg')] bg-slate-950 overflow-hidden">
        
        {/* TAXONOMY VIEW (Rigid Tree) */}
        {mode === 'taxonomy' && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <div className="space-y-4">
                    <TaxonomyNode label="Entity" depth={0} color="bg-slate-700" />
                    <div className="pl-8 border-l-2 border-white/10 space-y-4">
                        <TaxonomyNode label="Living Thing" depth={1} color="bg-indigo-900" />
                        <div className="pl-8 border-l-2 border-white/10 space-y-4">
                            <TaxonomyNode label="Animal" depth={2} color="bg-indigo-700" />
                            <div className="pl-8 border-l-2 border-white/10 space-y-2">
                                <TaxonomyNode label="Mammal" depth={3} color="bg-indigo-500" />
                                <TaxonomyNode label="Reptile" depth={3} color="bg-indigo-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        )}

        {/* ONTOLOGY VIEW (Semantic Web) */}
        {mode === 'ontology' && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0"
            >
                {/* Nodes positioned absolutely */}
                <OntologyNode x={50} y={50} label="Cat" color="bg-amber-500 text-black" />
                <OntologyNode x={20} y={20} label="Mammal" color="bg-indigo-600" />
                <OntologyNode x={80} y={30} label="Milk" color="bg-slate-600" />
                <OntologyNode x={50} y={80} label="Fur" color="bg-slate-600" />
                <OntologyNode x={20} y={80} label="Mouse" color="bg-amber-500 text-black" />

                {/* SVG Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <Connection x1="50%" y1="50%" x2="20%" y2="20%" label="is_a" />
                    <Connection x1="20%" y1="20%" x2="80%" y2="30%" label="produces" />
                    <Connection x1="50%" y1="50%" x2="80%" y2="30%" label="drinks" />
                    <Connection x1="50%" y1="50%" x2="50%" y2="80%" label="has_part" />
                    <Connection x1="50%" y1="50%" x2="20%" y2="80%" label="eats" />
                </svg>
            </motion.div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-slate-900 border-t border-white/5 text-center">
        <p className="text-xs text-slate-400">
            {mode === 'taxonomy' 
                ? "A strict hierarchy. Each item has one parent. Good for filing systems." 
                : "A web of meaning. Items define each other through relationships (Triples). Good for AI."}
        </p>
      </div>
    </div>
  );
}

function TaxonomyNode({ label, depth, color }: any) {
    return (
        <div className={`px-4 py-2 rounded-lg ${color} text-white text-xs font-bold border border-white/10 w-32 text-center`}>
            {label}
        </div>
    )
}

function OntologyNode({ x, y, label, color }: any) {
    return (
        <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className={`absolute px-4 py-2 rounded-full ${color} text-white text-xs font-bold border border-white/10 z-10 -translate-x-1/2 -translate-y-1/2 shadow-xl`}
            style={{ left: `${x}%`, top: `${y}%` }}
        >
            {label}
        </motion.div>
    )
}

function Connection({ x1, y1, x2, y2, label }: any) {
    return (
        <g>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <text x="0" y="0" fontSize="10" fill="rgba(251, 191, 36, 0.8)" textAnchor="middle">
                <textPath href={`#path-${label}`} startOffset="50%">{label}</textPath>
            </text>
            <path id={`path-${label}`} d={`M ${x1} ${y1} L ${x2} ${y2}`} fill="transparent" /> {/* Invisible path for text alignment hack, simplified here */}
        </g>
    )
}
// Note: SVG TextPath dynamic coords in React is tricky without explicit path definitions. 
// For simplicity in this demo, we'll replace the SVG text with absolute divs for labels.