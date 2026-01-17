"use client";
import React, { useState } from "react";
import Link from "next/link";
import { GRIMOIRE_CONFIG, GrimoireTab, STATIC_PAGES } from "./halloween-data";
import GrimoireBackground from "./GrimoireBackground";
import { useGrimoire, MonsterRecord } from "./useGrimoire";
import { ArrowLeft, BookOpen, Skull } from "lucide-react";

export default function HalloweenPage() {
  const [activeTab, setActiveTab] = useState<GrimoireTab>('ORIGINS');
  const [selectedMonster, setSelectedMonster] = useState<MonsterRecord | null>(null);
  const { data: monsterData, loading } = useGrimoire();

  const config = GRIMOIRE_CONFIG[activeTab];
  const TabIcon = config.icon;
  const staticPage = STATIC_PAGES[activeTab as keyof typeof STATIC_PAGES];

  return (
    <main className="min-h-screen bg-[#080202] text-orange-100/80 font-serif pl-0 md:pl-80 relative overflow-hidden selection:bg-red-900/50">
      
      {/* 1. ATMOSPHERIC ENGINE */}
      <GrimoireBackground />
      {/* Texture Overlay (Parchment grain) */}
      <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER: THE ANCIENT TOME */}
        <header className="mb-12 text-center">
            <Link href="/humanities/culture/folklore" className="inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-red-800 hover:text-red-500 transition-colors mb-6">
                <ArrowLeft size={10} /> Return to Folklore
            </Link>
            <div className="inline-block relative">
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-600 via-orange-800 to-black tracking-tighter mb-2 filter drop-shadow-[0_2px_10px_rgba(220,38,38,0.5)] font-serif">
                    LIBER SAMHAIN
                </h1>
                <div className="text-center text-red-900/60 font-sans text-xs uppercase tracking-[0.5em] mt-2 border-t border-b border-red-900/30 py-2 mx-auto max-w-md">
                    The Grimoire of the Hallowed Eve
                </div>
            </div>
        </header>

        {/* BOOKMARK TABS */}
        <div className="flex justify-center gap-4 mb-12 border-b-2 border-red-900/30 pb-1">
            {Object.entries(GRIMOIRE_CONFIG).map(([key, cfg]) => {
                const Icon = cfg.icon;
                const isActive = activeTab === key;
                return (
                    <button
                        key={key}
                        onClick={() => { setActiveTab(key as GrimoireTab); setSelectedMonster(null); }}
                        className={`
                            group flex flex-col items-center gap-2 px-6 py-4 rounded-t-lg border-t-2 border-x-2 transition-all duration-500 relative top-[2px]
                            ${isActive 
                                ? `bg-[#1a0505] border-red-900/60 ${cfg.color} shadow-[0_-5px_20px_rgba(0,0,0,0.5)]` 
                                : "bg-[#0a0202] border-red-900/10 text-red-900/50 hover:text-red-700 hover:border-red-900/30"}
                        `}
                    >
                        <Icon size={24} className={isActive ? 'animate-pulse' : ''} />
                        <span className="text-xs font-sans font-bold uppercase tracking-widest">{cfg.label}</span>
                    </button>
                )
            })}
        </div>

        {/* THE BOOK CONTENT (Pages) */}
        <div className="flex-1 max-w-5xl mx-auto w-full bg-[#1a0505] border-2 border-red-900/30 p-8 md:p-16 rounded-b-lg rounded-tr-lg shadow-2xl relative overflow-hidden min-h-[50vh]">
            {/* Inner Glow & Texture */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 mix-blend-multiply pointer-events-none" />

            {/* --- RENDER CHAPTERS --- */}
            
            {/* CHAPTER 1 & 3: ORIGINS / RITUALS (Static Text) */}
            {staticPage && (
                <div className="animate-in fade-in duration-700">
                    <div className="flex items-center gap-4 mb-8 opacity-60">
                        <TabIcon size={32} className={config.color} />
                        <div className={`text-xs font-sans uppercase tracking-[0.3em] ${config.color}`}>Chapter: {config.label}</div>
                    </div>
                    <h2 className="text-5xl font-bold text-red-100/90 mb-2">{staticPage.title}</h2>
                    <h3 className="text-xl text-red-700 font-sans italic mb-12">{staticPage.Subtitle}</h3>
                    
                    <div className="prose prose-invert prose-lg max-w-none prose-p:text-orange-100/70 prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-red-200/80">
                        {staticPage.content.map((paragraph, idx) => (
                            <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-red-400">$1</strong>') }} />
                        ))}
                    </div>
                    <div className="mt-16 flex justify-center opacity-30">
                        <BookOpen size={24} />
                    </div>
                </div>
            )}

            {/* CHAPTER 2: BESTIARY (API Data) */}
            {activeTab === 'BESTIARY' && !selectedMonster && (
                <div className="animate-in fade-in duration-700">
                    <div className="flex items-center gap-4 mb-12 opacity-60">
                        <TabIcon size={32} className={config.color} />
                        <div className={`text-xs font-sans uppercase tracking-[0.3em] ${config.color}`}>Chapter: {config.label}</div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-64 text-red-800 animate-pulse font-sans uppercase tracking-widest">
                            <Skull className="animate-bounce mr-4" /> Summoning Entities...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {monsterData.map((monster) => {
                                const MIcon = monster.icon;
                                return (
                                    <button 
                                        key={monster.id}
                                        onClick={() => setSelectedMonster(monster)}
                                        className="group relative aspect-[3/4] rounded-lg border-4 border-[#2a0a0a] bg-[#0a0202] overflow-hidden hover:border-red-900/60 transition-all duration-500 shadow-lg hover:shadow-red-900/20 hover:scale-[1.02]"
                                    >
                                        {/* Grimoire Image Filter */}
                                        {monster.thumbnail ? (
                                            <img src={monster.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-700 filter sepia brightness-75 contrast-125 group-hover:sepia-0 mix-blend-luminosity" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center opacity-20"><Skull size={64} /></div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0505] via-[#1a0505]/50 to-transparent" />
                                        
                                        <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center z-10">
                                            <MIcon size={32} className="text-red-800 mb-4 opacity-80 group-hover:text-red-500 group-hover:opacity-100 transition-all" />
                                            <h3 className="text-2xl font-bold text-red-100 mb-1 font-serif">{monster.title}</h3>
                                            <div className="w-12 h-1 bg-red-900/50 group-hover:w-24 transition-all duration-500" />
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* BESTIARY: SINGLE PAGE VIEW */}
            {selectedMonster && (
                <div className="animate-in slide-in-from-right duration-500 relative">
                    <button onClick={() => setSelectedMonster(null)} className="absolute top-0 left-0 flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-red-800 hover:text-red-500">
                        <ArrowLeft size={12} /> Close Entry
                    </button>

                    <div className="mt-16 flex flex-col md:flex-row gap-12 items-start">
                        {/* Portrait */}
                        <div className="w-full md:w-1/3 aspect-[3/4] relative rounded-lg border-4 border-[#2a0a0a] overflow-hidden shadow-2xl">
                             {selectedMonster.thumbnail ? (
                                 <img src={selectedMonster.thumbnail} className="w-full h-full object-cover filter sepia brightness-75 contrast-125" />
                             ) : (
                                 <div className="w-full h-full bg-[#0a0202] flex items-center justify-center opacity-20"><Skull size={64} /></div>
                             )}
                             <div className="absolute inset-0 ring-inset ring-4 ring-black/50" />
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                            <h2 className="text-5xl font-bold text-red-100 mb-2">{selectedMonster.title}</h2>
                            <h3 className="text-xl text-red-800 font-sans italic mb-8">Classification: {selectedMonster.wikiTitle}</h3>
                            <div className="prose prose-invert prose-lg prose-p:text-orange-100/70 prose-p:leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-red-700 first-letter:mr-3 first-letter:float-left font-serif">
                                <p>{selectedMonster.extract}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>

      </div>
    </main>
  );
}