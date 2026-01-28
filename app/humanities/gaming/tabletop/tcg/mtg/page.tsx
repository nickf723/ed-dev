"use client";
import Link from "next/link";
import MtgBackground from "@/app/humanities/gaming/tabletop/tcg/mtg/MtgBackground";
import CommanderTable from "@/app/humanities/gaming/tabletop/tcg/mtg/components/CommanderTable";
import { DeckAnalytics } from "@/components/viz/DeckAnalytics";
import { ArrowLeft, Flame } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useEffect } from "react";

export default function MtgPage() {

      const { scanner, addCard, clearHistory } = useAppStore();

      // THE FETCH LOGIC MOVES HERE
      // We need to fetch the FULL data when an ID is scanned
      useEffect(() => {

         const fetchCard = async () => {
            try {
            const res = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent}`);
            const data = await res.json();
            
            // Transform API data into our "Rich Card" format
            const newCard = {
                  id: data.id,
                  name: data.name,
                  cmc: data.cmc || 0,
                  price: parseFloat(data.prices?.usd || "0"),
                  image: data.image_uris?.normal || data.card_faces?.[0]?.image_uris?.normal,
                  type: data.type_line
            };
            
            addCard(newCard); // Store the full object!
            } catch (e) {
            console.error("Failed to fetch card details", e);
            }
         };

         fetchCard();
      }, [addCard]);



  return (
    <main className="relative min-h-screen bg-[#0c0a09] text-[#e7e5e4] overflow-hidden font-serif selection:bg-[#fbbf24]/30">
      <div className="absolute inset-0 bg-radial-gradient from-[#1c1917] to-[#0c0a09] z-0" />
      <MtgBackground />
      
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-[#b45309]/30 bg-[#0c0a09]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/humanities/gaming/tabletop/tcg" className="flex items-center gap-2 text-xs font-mono text-[#fbbf24] hover:text-white transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> TCG Library
             </Link>
             <div className="h-4 w-px bg-[#b45309]/50" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-[#292524] border border-[#fbbf24] rounded-full shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                    <Flame size={18} className="text-[#fbbf24]" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight font-serif uppercase">
                    The Planeswalker Engine
                 </h1>
             </div>
         </div>
      </header>

      <div className="relative z-10 container mx-auto p-4 md:p-6 lg:p-8">
            <CommanderTable />
            <div className="mt-8 text-center text-xs font-mono text-zinc-500">
                <p>Supports Deck Import • Life Tracking • Token Generation • Library Search</p>
            </div>
      </div>
    </main>
  );
}