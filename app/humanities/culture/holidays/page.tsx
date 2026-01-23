"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SeasonBackground from "./SeasonBackground";
// Importing your new data structure
import { HOLIDAYS, SEASONS, Season } from "./holidays-data"; 
import { useWikiCulture } from ".././_lib/useWikiCulture"; 
import { ArrowLeft, CalendarDays, MapPin, MousePointer2, Clock, Loader2, BookOpen, ExternalLink } from "lucide-react";

// HELPER: Map Wiki Titles to your Local IDs to ensure perfect merging
// (Wiki Title) -> (Local ID)
const WIKI_TO_LOCAL_MAP: Record<string, string> = {
    "New Year's Eve": "nye",
    "Martin Luther King Jr. Day": "mlk",
    "Super Bowl": "superbowl",
    "Valentine's Day": "valentines",
    "Saint Patrick's Day": "stpatricks",
    "Easter": "easter",
    "Mother's Day": "mothers",
    "Memorial Day": "memorial",
    "Pride Month": "junepride", // Wiki might return "Gay pride" or "LGBT Pride Month" depending on redirect
    "LGBT Pride Month": "junepride",
    "Father's Day": "fathers",
    "Independence Day (United States)": "july4",
    "Labor Day": "laborday",
    "Back to school": "backtoschool",
    "Indigenous Peoples' Day": "indigenous",
    "Halloween": "halloween",
    "Thanksgiving (United States)": "thanksgiving",
    "Black Friday (shopping)": "blackfriday",
    "Christmas and holiday season": "christmas"
};

export default function HolidaysPage() {
  // 1. FETCH WIKI DATA
  const { data: wikiData, loading } = useWikiCulture("US_HOLIDAYS");
  
  const [currentSeason, setCurrentSeason] = useState<Season>("WINTER");
  const [nextHolidayId, setNextHolidayId] = useState<string>("valentines"); // Default

  // 2. DETERMINE NEXT HOLIDAY (Simple Logic)
  useEffect(() => {
    // In a real app, parse dates. For now, we hardcode the "Next Up" experience.
    setNextHolidayId("valentines"); 
  }, []);

  const activeTheme = SEASONS[currentSeason];

  return (
    <main className={`min-h-screen bg-gradient-to-br ${activeTheme.bg} text-stone-200 font-sans relative overflow-hidden transition-colors duration-1000`}>
      
      <SeasonBackground season={currentSeason} />
      
      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-12">
            <Link href="/humanities/culture" className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors mb-6 ${activeTheme.color}`}>
                <ArrowLeft size={10} /> Modern Culture
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 flex items-center gap-4">
                        THE YEAR <CalendarDays className={`opacity-50 transition-colors duration-700 ${activeTheme.color}`} size={48} />
                    </h1>
                    <div className="flex items-center gap-2 text-stone-500 text-xs font-mono uppercase tracking-widest">
                        <MousePointer2 size={12} className="animate-bounce" /> Hover to shift seasons
                    </div>
                </div>

                {/* NEXT EVENT CARD */}
                {HOLIDAYS.find(h => h.id === nextHolidayId) && (
                    <div className="w-full md:w-auto p-4 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md animate-in slide-in-from-right fade-in duration-700">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2 flex items-center gap-2">
                            <Clock size={12} className={activeTheme.color} /> Incoming Event
                        </div>
                        <div className="flex items-center gap-4">
                            <div className={`text-xl font-black text-white`}>
                                {HOLIDAYS.find(h => h.id === nextHolidayId)?.name}
                            </div>
                            <div className="h-8 w-px bg-white/10" />
                            <div className="text-right">
                                <div className="text-xs font-bold text-stone-400">
                                    {HOLIDAYS.find(h => h.id === nextHolidayId)?.date}
                                </div>
                                <div className={`text-[10px] uppercase ${activeTheme.color}`}>Approaching</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>

        {/* LOADING INDICATOR (Subtle) */}
        {loading && (
            <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur rounded-full border border-white/10 text-[9px] font-mono uppercase text-stone-400">
                <Loader2 size={10} className="animate-spin" /> Syncing Wiki Data...
            </div>
        )}

        {/* FULL CHRONOLOGICAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 pb-20">
            {HOLIDAYS.map((localHoliday) => {
                // 3. MERGE LOGIC
                // Try to find the matching Wiki Record for this holiday
                const wikiRecord = wikiData.find(w => 
                    WIKI_TO_LOCAL_MAP[w.title] === localHoliday.id || 
                    w.title.includes(localHoliday.name) // Fallback fuzzy match
                );

                const Icon = localHoliday.icon;
                const cardTheme = SEASONS[localHoliday.season as Season];
                const isNext = localHoliday.id === nextHolidayId;
                
                return (
                    <Link 
                        key={localHoliday.id}
                        href={localHoliday.href || "#"}
                        onMouseEnter={() => setCurrentSeason(localHoliday.season as Season)}
                        className={`
                            group relative p-8 rounded-2xl bg-black/40 border backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col
                            ${isNext ? 'border-white ring-1 ring-white/50' : `${cardTheme.accent} border-opacity-20 hover:border-opacity-100`}
                        `}
                    >
                        {isNext && (
                            <div className="absolute -top-3 left-8 px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg z-20">
                                Up Next
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-xl bg-black/50 border border-white/10 shadow-inner transition-colors duration-500 ${cardTheme.color}`}>
                                <Icon size={32} />
                            </div>
                            <div className="text-right">
                                <div className={`text-2xl font-black text-white`}>
                                    {localHoliday.date}
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                                    {localHoliday.season}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="text-3xl font-black text-white leading-none line-clamp-2">
                                {localHoliday.name}
                            </h2>
                            {/* If we have a dedicated page, show an arrow icon hint */}
                            <ExternalLink size={16} className="opacity-0 group-hover:opacity-50 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
                        </div>
                        
                        {/* 4. SMART VISUALS */}
                        {/* Priority: Wiki Thumbnail -> Stock Photo (VisualMedia) */}
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-6 bg-black/50 border border-white/5 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all">
                            {wikiRecord?.thumbnail ? (
                                // Option A: Wiki Image (High Accuracy)
                                <img
                                    src={wikiRecord.thumbnail ?? undefined}
                                    alt={localHoliday.name}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                                />
                            ) : (
                                // Option B: Placeholder visual
                                <div className="w-full h-full bg-gradient-to-br from-black/40 to-black/20 flex items-center justify-center text-sm text-stone-400">
                                    Visual Synth
                                </div>
                            )}

                            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-[10px] font-bold uppercase text-white drop-shadow-md">
                                <MapPin size={10} className={cardTheme.color} /> {wikiRecord ? "Wiki Archive" : "Visual Synth"}
                            </div>
                        </div>

                        <div className="mt-auto">
                            {wikiRecord ? (
                                // Show Wiki Extract if available
                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase text-stone-500">
                                        <BookOpen size={10} /> Encyclopedia Extract
                                    </div>
                                    <p className="text-stone-300 leading-relaxed text-sm line-clamp-3 group-hover:line-clamp-none transition-all">
                                        {wikiRecord.extract}
                                    </p>
                                </div>
                            ) : (
                                // Show Local Description if loading or no match
                                <p className="text-stone-300 leading-relaxed text-sm line-clamp-3 group-hover:line-clamp-none transition-all">
                                    {localHoliday.desc}
                                </p>
                            )}
                        </div>
                    </Link>
                );
            })}
        </div>

      </div>
    </main>
  );
}