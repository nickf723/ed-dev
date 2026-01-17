"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Search, ShoppingBag, Carrot, ScanBarcode, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMarket } from "./useMarket";

// Wrap contents in a separate component to handle SearchParams in Next.js 13+ safely
function MarketContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || "";
  const initialAisle = (searchParams.get('aisle') as 'PRODUCE' | 'PACKAGED') || 'PRODUCE';
  
  const [aisle, setAisle] = useState<'PRODUCE' | 'PACKAGED'>(initialAisle);
  const [query, setQuery] = useState(initialSearch);
  const { items, loading } = useMarket(aisle, query);

  // Sync state if URL params change (e.g. deep link from recipe)
  useEffect(() => {
    if (searchParams.get('search')) setQuery(searchParams.get('search')!);
    if (searchParams.get('aisle')) setAisle(searchParams.get('aisle') as any);
  }, [searchParams]);

  return (
    <>
      <header className="mb-8 flex flex-col xl:flex-row justify-between items-end gap-6 border-b border-white/5 pb-6">
          <div>
              <Link href="/humanities/culinary-arts" className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 hover:text-white flex items-center gap-2 mb-4">
                  <ArrowLeft size={10} /> Culinary Hub
              </Link>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-2">THE MARKET</h1>
              <div className="flex gap-4 text-xs font-mono text-stone-500">
                  <span className="flex items-center gap-1"><Zap size={12} className="text-yellow-500"/> LIVE INVENTORY</span>
                  <span>OPEN 24/7</span>
              </div>
          </div>
          <div className="flex p-1 rounded-lg bg-white/5 border border-white/5">
              <button onClick={() => setAisle('PRODUCE')} className={`flex items-center gap-2 px-6 py-3 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${aisle === 'PRODUCE' ? 'bg-emerald-600 text-white shadow-lg' : 'text-stone-500 hover:text-white'}`}>
                  <Carrot size={14} /> Aisle 1: Produce
              </button>
              <button onClick={() => setAisle('PACKAGED')} className={`flex items-center gap-2 px-6 py-3 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${aisle === 'PACKAGED' ? 'bg-pink-600 text-white shadow-lg' : 'text-stone-500 hover:text-white'}`}>
                  <ShoppingBag size={14} /> Aisle 2: Packaged
              </button>
          </div>
      </header>

      <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
          <input type="text" placeholder={aisle === 'PRODUCE' ? "SEARCH INGREDIENTS..." : "SEARCH PRODUCTS..."} value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm font-mono text-white focus:outline-none focus:border-white/30 transition-all" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading ? ([...Array(10)].map((_, i) => <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-xl" />)) : (
              items.map((item) => (
                  <div key={item.id} className="group relative aspect-[3/4] bg-[#151515] border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all cursor-pointer">
                      <div className="absolute inset-0 p-8 flex items-center justify-center">
                          <img src={item.image} className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500" />
                          
                      </div>
                      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
                          <div className="text-[10px] font-mono text-stone-500 uppercase mb-1">{item.type === 'PACKAGED' ? item.brand : 'RAW INGREDIENT'}</div>
                          <h3 className="text-sm font-bold text-white leading-tight mb-2 line-clamp-2">{item.name}</h3>
                          {item.type === 'PACKAGED' && (
                              <div className="flex justify-between items-center border-t border-white/10 pt-2">
                                  <div className="text-[10px] text-stone-400">{item.calories} KCAL</div>
                                  <div className={`px-1.5 py-0.5 rounded text-[10px] font-black ${item.grade === 'A' ? 'bg-green-500 text-black' : 'bg-stone-700 text-white'}`}>{item.grade}</div>
                              </div>
                          )}
                          {item.type === 'RAW' && (
                              <div className="flex items-center gap-2 text-[9px] font-bold text-emerald-500 uppercase tracking-widest border-t border-white/10 pt-2">
                                  <ScanBarcode size={10} /> Fresh Stock
                              </div>
                          )}
                      </div>
                  </div>
              ))
          )}
      </div>
      {!loading && items.length === 0 && <div className="py-20 text-center text-stone-600 font-mono uppercase tracking-widest">Out of Stock</div>}
    </>
  );
}

export default function MarketPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-stone-200 font-sans pl-0 md:pl-80 p-6 md:p-12 relative overflow-hidden">
        <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none" />
        <Suspense fallback={<div className="text-white">Loading Market...</div>}>
            <MarketContent />
        </Suspense>
    </main>
  );
}