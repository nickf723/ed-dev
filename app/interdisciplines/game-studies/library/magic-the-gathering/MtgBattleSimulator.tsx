"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, RotateCw, Plus, Trash2, Swords } from "lucide-react";

// Basic Card Type
type PlayCard = {
  id: string; // Unique instance ID
  name: string;
  image_uri: string;
  tapped: boolean;
};

export default function MtgBattleSimulator() {
  const [searchQuery, setSearchQuery] = useState("");
  const [myBoard, setMyBoard] = useState<PlayCard[]>([]);
  const [myLife, setMyLife] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Add card to board
  const summonCard = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError("");
    try {
        const res = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(searchQuery)}`);
        if (!res.ok) throw new Error("Card not found");
        const data = await res.json();
        
        if (data.image_uris) {
            const newCard: PlayCard = {
                id: crypto.randomUUID(),
                name: data.name,
                image_uri: data.image_uris.normal,
                tapped: false
            };
            setMyBoard((board) => [...board, newCard]);
            setSearchQuery("");
        } else {
            setError("That card does not have a standard front image.");
        }
    } catch (e) {
        console.error("Summon fizzled", e);
        setError("No close card match was found. Try another name.");
    } finally {
        setLoading(false);
    }
  };

  const toggleTap = (id: string) => {
      setMyBoard(board => board.map(c => c.id === id ? { ...c, tapped: !c.tapped } : c));
  };

  const removeCard = (id: string) => {
      setMyBoard(board => board.filter(c => c.id !== id));
  };

  const untapAll = () => {
      setMyBoard(board => board.map(c => ({ ...c, tapped: false })));
  };

  return (
    <div className="w-full rounded-xl border border-white/10 bg-[#1a1614] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header / HUD */}
        <div className="h-16 bg-neutral-900/90 border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-md z-20">
            <div className="flex items-center gap-6">
                {/* Life Counter */}
                <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                    <Heart size={16} className="text-red-500 fill-red-500" />
                    <button type="button" aria-label="Lose one life" onClick={() => setMyLife(l => l-1)} className="text-neutral-500 hover:text-white font-bold px-2">−</button>
                    <span className="text-xl font-black text-white w-8 text-center" aria-live="polite">{myLife}</span>
                    <button type="button" aria-label="Gain one life" onClick={() => setMyLife(l => l+1)} className="text-neutral-500 hover:text-white font-bold px-2">+</button>
                </div>
                {/* Phase Action */}
                <button 
                    type="button"
                    onClick={untapAll}
                    className="flex items-center gap-2 text-xs font-bold uppercase text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                    <RotateCw size={14} /> Untap All
                </button>
            </div>

            {/* Summoner Search */}
            <form className="flex items-center gap-2" onSubmit={(event) => { event.preventDefault(); void summonCard(); }}>
                <div className="relative">
                    <label htmlFor="mtg-battlefield-card" className="sr-only">Card name</label>
                    <input 
                        id="mtg-battlefield-card"
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Card name (for example, Llanowar Elves)"
                        className="bg-black/40 border border-white/10 rounded-lg pl-3 pr-10 py-1.5 text-sm text-white focus:border-amber-500 focus:outline-none w-64"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        {loading ? <div className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" /> : null}
                    </div>
                </div>
                <button 
                    type="submit"
                    disabled={loading || !searchQuery.trim()}
                    aria-label="Add card to battlefield"
                    className="bg-amber-600 hover:bg-amber-500 text-white p-1.5 rounded-lg transition-colors"
                >
                    <Plus size={16} />
                </button>
            </form>
        </div>

        {error ? <p role="alert" className="border-b border-red-300/10 bg-red-950/30 px-6 py-2 text-xs text-red-200">{error}</p> : null}

        {/* The Battlefield (Mat) */}
        <div className="relative h-[500px] w-full overflow-y-auto overflow-x-hidden bg-[radial-gradient(circle_at_18%_20%,rgba(22,163,74,0.26),transparent_32%),radial-gradient(circle_at_82%_72%,rgba(180,83,9,0.22),transparent_34%),linear-gradient(145deg,#142019,#171311)] p-8">
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-0 pointer-events-none" />
            
            {/* Card Grid */}
            <div className="relative z-10 flex flex-wrap gap-4 content-start">
                <AnimatePresence>
                    {myBoard.map((card) => (
                        <motion.div
                            key={card.id}
                            layout
                            initial={{ scale: 0, y: 50, opacity: 0 }}
                            animate={{ 
                                scale: 1, y: 0, opacity: 1,
                                rotate: card.tapped ? 90 : 0 
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                            className="relative group w-[140px] aspect-[2.5/3.5] rounded-lg shadow-xl origin-center"
                        >
                            <button
                                type="button"
                                onClick={() => toggleTap(card.id)}
                                aria-label={`${card.tapped ? "Untap" : "Tap"} ${card.name}`}
                                className="relative h-full w-full overflow-hidden rounded-lg border border-black"
                            >
                                <Image
                                    src={card.image_uri}
                                    alt={card.name}
                                    fill
                                    sizes="140px"
                                    className="object-cover"
                                    draggable={false}
                                />
                            </button>
                            
                            {/* Hover Actions */}
                            {!card.tapped && (
                                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity scale-90">
                                    <button 
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); removeCard(card.id); }}
                                        aria-label={`Remove ${card.name}`}
                                        className="bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            )}

                            {/* Tap Indicator */}
                            {card.tapped && (
                                <div className="absolute inset-0 bg-black/20 pointer-events-none rounded-lg" />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {myBoard.length === 0 && (
                    <div className="w-full h-[300px] flex flex-col items-center justify-center text-white/20 border-2 border-dashed border-white/10 rounded-xl">
                        <Swords size={48} className="mb-4" />
                        <p className="uppercase font-bold tracking-widest">Battlefield Empty</p>
                        <p className="text-xs mt-2">Use the search bar to summon permanents.</p>
                    </div>
                )}
            </div>
        </div>

    </div>
  );
}
