"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, RefreshCw, ShieldAlert } from "lucide-react";
import Image from "next/image";

type CardData = {
  name: string;
  mana_cost: string;
  type_line: string;
  oracle_text: string;
  colors: string[];
  cmc: number;
  image_uris?: { normal: string };
  flavor_text?: string;
};

export default function MtgCardFetcher() {
  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRandom = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://api.scryfall.com/cards/random");
      if (!res.ok) throw new Error("Scryfall request failed");
      const data = await res.json();
      setCard(data);
    } catch (e) {
      console.error("Failed to fetch card", e);
      setError("The card catalog is unavailable right now.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => { void fetchRandom(); }, []);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Search size={14} className="text-amber-400" /> Scryfall Database
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center gap-6">
        
        {/* Card Display */}
        <div className="relative w-[250px] aspect-[2.5/3.5] rounded-xl bg-black/40 border border-white/10 flex items-center justify-center shadow-2xl">
            {loading ? (
                <RefreshCw size={32} className="text-neutral-600 animate-spin" />
            ) : card?.image_uris?.normal ? (
                <motion.div
                    key={card.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative h-full w-full overflow-hidden rounded-lg"
                >
                    <Image
                        src={card.image_uris.normal}
                        alt={card.name}
                        fill
                        sizes="250px"
                        className="object-cover"
                    />
                </motion.div>
            ) : (
                <div className="text-center p-4">
                    <ShieldAlert size={32} className="mx-auto mb-2 text-red-400" />
                    <span className="text-xs text-neutral-500">No Image Data</span>
                </div>
            )}
        </div>

        {/* Data Analysis Panel */}
        {card && (
            <div className="w-full bg-neutral-950/50 rounded-lg border border-white/5 p-4 space-y-3">
                <div className="flex justify-between items-baseline">
                    <h4 className="text-sm font-bold text-white">{card.name}</h4>
                    <span className="font-mono text-xs text-amber-400">{card.mana_cost || "No Cost"}</span>
                </div>
                <div className="h-[1px] bg-white/5" />
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="text-neutral-500">Type</div>
                    <div className="text-neutral-300 text-right truncate">{card.type_line}</div>
                    <div className="text-neutral-500">CMC (Cost)</div>
                    <div className="text-neutral-300 text-right">{card.cmc}</div>
                    <div className="text-neutral-500">Colors</div>
                    <div className="text-neutral-300 text-right">{card.colors?.join(", ") || "Colorless"}</div>
                </div>
            </div>
        )}

        {error ? <p role="alert" className="text-center text-xs text-red-300">{error}</p> : null}

        {/* Controls */}
        <button 
            type="button"
            onClick={() => void fetchRandom()}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
        >
            <RefreshCw size={14} /> Fetch Random Artifact
        </button>

      </div>
    </div>
  );
}
