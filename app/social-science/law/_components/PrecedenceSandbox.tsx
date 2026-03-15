"use client";
import React, { useState } from 'react';
import { Landmark, Scale, Gavel, ArrowDown } from 'lucide-react';

type CourtLevel = 'SUPREME' | 'APPELLATE' | 'DISTRICT';

export default function PrecedenceSandbox() {
    const [activeCourt, setActiveCourt] = useState<CourtLevel>('SUPREME');

    // ------------------------------------------------------------------------
    // TAILWIND BEST PRACTICE:
    // Define exact, complete class strings so the compiler can find them!
    // ------------------------------------------------------------------------
    const courtData = {
        SUPREME: {
            title: "Supreme Court",
            jurisdiction: "National / Final Appellate",
            role: "The highest court. Hears appeals on constitutional questions. Its rulings establish binding precedent (Stare Decisis) for all other courts in the nation.",
            icon: Landmark,
            theme: {
                activeBox: "bg-amber-950/40 border-amber-500/50 shadow-lg shadow-amber-500/20",
                textHero: "text-amber-500",
                textMuted: "text-amber-400",
                iconBox: "bg-amber-950/30 text-amber-400",
                indicator: "bg-amber-500"
            }
        },
        APPELLATE: {
            title: "Circuit Courts of Appeal",
            jurisdiction: "Regional Circuits (e.g., 9th Circuit)",
            role: "Reviews decisions from District Courts for errors of law. Their rulings are binding on all District Courts within their specific geographic circuit.",
            icon: Scale,
            theme: {
                activeBox: "bg-sky-950/40 border-sky-500/50 shadow-lg shadow-sky-500/20",
                textHero: "text-sky-500",
                textMuted: "text-sky-400",
                iconBox: "bg-sky-950/30 text-sky-400",
                indicator: "bg-sky-500"
            }
        },
        DISTRICT: {
            title: "District Courts (Trial)",
            jurisdiction: "Local Districts",
            role: "The starting point for federal cases. They establish the facts of a case through trials and juries. They must follow the precedent set by higher courts.",
            icon: Gavel,
            theme: {
                activeBox: "bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-500/20",
                textHero: "text-emerald-500",
                textMuted: "text-emerald-400",
                iconBox: "bg-emerald-950/30 text-emerald-400",
                indicator: "bg-emerald-500"
            }
        }
    };

    const ActiveIcon = courtData[activeCourt].icon;
    const activeTheme = courtData[activeCourt].theme;

    return (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl font-sans my-12">
            <div className="mb-8 border-b border-zinc-800 pb-4">
                <h3 className="text-xl font-black text-white">Jurisdictional Hierarchy</h3>
                <p className="text-xs text-zinc-400 font-mono mt-1">Interactive Sandbox: Flow of Precedent</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                
                {/* LEFT: The Flowchart */}
                <div className="flex flex-col items-center gap-2 w-full md:w-1/3 shrink-0">
                    {(['SUPREME', 'APPELLATE', 'DISTRICT'] as CourtLevel[]).map((level, index) => {
                        const levelData = courtData[level];
                        const isActive = activeCourt === level;
                        
                        return (
                            <React.Fragment key={level}>
                                <button
                                    onClick={() => setActiveCourt(level)}
                                    className={`w-full p-4 rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-2
                                        ${isActive 
                                            ? levelData.theme.activeBox 
                                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600 text-zinc-500 hover:text-zinc-300'
                                        }`}
                                >
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? levelData.theme.textMuted : ''}`}>
                                        {levelData.title}
                                    </span>
                                </button>
                                
                                {/* The Precedent Arrows */}
                                {index < 2 && (
                                    <div className={`flex flex-col items-center justify-center h-8 transition-colors ${
                                        (activeCourt === 'SUPREME' && index === 0) || (activeCourt === 'APPELLATE' && index === 1) || activeCourt === 'SUPREME' 
                                            ? 'text-amber-500/50' 
                                            : 'text-zinc-800'
                                    }`}>
                                        <div className="w-px h-full bg-current" />
                                        <ArrowDown size={12} className="-mt-1" />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* RIGHT: Active Court Intel */}
                <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-6 min-h-[250px] relative overflow-hidden group">
                    <div className={`absolute top-0 left-0 w-1 h-full transition-colors ${activeTheme.indicator}`} />
                    
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <div className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${activeTheme.textHero}`}>
                                Selected Tier
                            </div>
                            <h4 className="text-2xl font-black text-white">{courtData[activeCourt].title}</h4>
                            <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-bold">
                                Jurisdiction: {courtData[activeCourt].jurisdiction}
                            </div>
                        </div>
                        <div className={`p-3 rounded-lg ${activeTheme.iconBox}`}>
                            <ActiveIcon size={24} />
                        </div>
                    </div>

                    <p className="text-sm text-zinc-300 leading-relaxed font-light">
                        {courtData[activeCourt].role}
                    </p>

                    <div className="mt-8 pt-4 border-t border-zinc-800/50 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${activeTheme.indicator}`} />
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                            Binding Authority Active
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}