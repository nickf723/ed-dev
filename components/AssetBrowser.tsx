"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSET_LIBRARY, AssetEntry, AssetType } from "@/lib/asset-db";
import { Search, Box, Activity, Map, FileImage, X, Maximize2 } from "lucide-react";

// --- COMPONENT IMPORTS ---
// We dynamically map the strings in the DB to these imports
import CellInspector from "@/components/CellInspector";
import PendulumWidget from "@/components/PendulumWidget";
import PoliticalCompassWidget from "@/components/PoliticalCompassWidget";
import ParliamentWidget from "@/components/ParliamentWidget";
import SupplyDemandWidget from "@/components/SupplyDemandWidget";
import MaslowWidget from "@/components/MaslowWidget";
import TechStackWidget from "@/components/TechStackWidget";
import RosettaWidget from "@/components/RosettaWidget";
import MoleculeViewer from "@/components/MoleculeViewer";
// For "Backgrounds" used as widgets, we might need a wrapper to contain them
import DnaBackground from "@/components/DnaBackground"; 
import OrbitalBackground from "@/components/OrbitalBackground";

// Helper to render the component by key
const AssetRenderer = ({ assetKey }: { assetKey: string }) => {
    switch (assetKey) {
        case "CellInspector": return <CellInspector />;
        case "PendulumWidget": return <PendulumWidget />;
        case "PoliticalCompassWidget": return <PoliticalCompassWidget />;
        case "ParliamentWidget": return <ParliamentWidget />;
        case "SupplyDemandWidget": return <SupplyDemandWidget />;
        case "MaslowWidget": return <MaslowWidget />;
        case "TechStackWidget": return <TechStackWidget activeStack={null} setActiveStack={() => {}} />;
        case "RosettaWidget": return <RosettaWidget />;
        case "MoleculeViewer": return <MoleculeViewer />;
        // Backgrounds need containment style
        case "DnaBackground": return <div className="relative w-full h-64 overflow-hidden rounded-xl bg-black"><DnaBackground /></div>;
        case "OrbitalBackground": return <div className="relative w-full h-64 overflow-hidden rounded-xl bg-black"><OrbitalBackground /></div>;
        default: return <div className="p-4 text-red-500">Component Not Found</div>;
    }
};

const TYPE_ICONS = {
    "Simulation": Activity,
    "3D Model": Box,
    "Diagram": FileImage,
    "Map": Map
};

export default function AssetBrowser() {
  const [filter, setFilter] = useState<AssetType | "All">("All");
  const [selectedAsset, setSelectedAsset] = useState<AssetEntry | null>(null);

  const filteredAssets = filter === "All" 
    ? ASSET_LIBRARY 
    : ASSET_LIBRARY.filter(a => a.type === filter);

  return (
    <div className="w-full">
        
        {/* Filter Bar */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {["All", "Simulation", "3D Model", "Diagram", "Map"].map((type) => (
                <button
                    key={type}
                    onClick={() => setFilter(type as any)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border
                        ${filter === type 
                            ? "bg-white text-black border-white" 
                            : "bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10"}
                    `}
                >
                    {type}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
                {filteredAssets.map((asset) => {
                    const Icon = TYPE_ICONS[asset.type as keyof typeof TYPE_ICONS] || Box;
                    return (
                        <motion.div
                            key={asset.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={() => setSelectedAsset(asset)}
                            className="group cursor-pointer rounded-xl border border-white/10 bg-neutral-900/40 hover:bg-neutral-800/60 hover:border-white/20 transition-all overflow-hidden"
                        >
                            {/* Preview Area (Static or Mini) */}
                            <div className="h-40 w-full bg-white/5 flex items-center justify-center border-b border-white/5 relative overflow-hidden">
                                <Icon className="text-white/20 group-hover:text-white/40 transition-colors transform group-hover:scale-110 duration-500" size={48} />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="absolute bottom-3 right-3 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                    <Maximize2 size={10} /> Inspect
                                </span>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{asset.title}</h3>
                                    <span className="text-[9px] font-mono text-neutral-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                                        {asset.type}
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                                    {asset.desc}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
            {selectedAsset && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                    onClick={() => setSelectedAsset(null)}
                >
                    <motion.div 
                        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                            <div>
                                <h2 className="text-xl font-bold text-white">{selectedAsset.title}</h2>
                                <span className="text-xs text-cyan-400 font-mono">{selectedAsset.discipline} // {selectedAsset.type}</span>
                            </div>
                            <button onClick={() => setSelectedAsset(null)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content Container */}
                        <div className="flex-1 overflow-y-auto p-8 bg-[url('/grid.svg')] bg-center bg-fixed">
                            <div className="mx-auto max-w-2xl">
                                <AssetRenderer assetKey={selectedAsset.componentKey} />
                            </div>
                            <div className="mt-8 max-w-2xl mx-auto text-center">
                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    {selectedAsset.desc}
                                </p>
                            </div>
                        </div>
                        
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

    </div>
  );
}