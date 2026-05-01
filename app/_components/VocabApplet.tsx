"use client";
import React, { useState, useEffect } from 'react';
import { BookOpen, Search, EyeOff, Eye, Library, Tags, ArrowRight, XCircle } from 'lucide-react';

export type VocabTerm = {
    id: string;
    word: string;
    definition: string;
    domain: string;
    tags: string[];
    relatedTerms?: string[];
    isAdult: boolean;
};

// --- THEME DICTIONARY ---
type ThemeColor = 'indigo' | 'rose' | 'cyan' | 'amber' | 'emerald' | 'purple' | 'blue';

const THEMES: Record<ThemeColor, { text: string; textMuted: string; bgSubtle: string; border: string; borderHover: string; borderFocus: string; btnActive: string; iconGlow: string }> = {
    indigo: { text: 'text-indigo-400', textMuted: 'text-indigo-400/70', bgSubtle: 'bg-indigo-950/30', border: 'border-indigo-500/20', borderHover: 'hover:border-indigo-500', borderFocus: 'focus-within:border-indigo-500/50', btnActive: 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(79,70,229,0.4)]', iconGlow: 'shadow-[0_0_15px_rgba(99,102,241,0.15)]' },
    rose:   { text: 'text-rose-400', textMuted: 'text-rose-400/70', bgSubtle: 'bg-rose-950/30', border: 'border-rose-500/20', borderHover: 'hover:border-rose-500', borderFocus: 'focus-within:border-rose-500/50', btnActive: 'bg-rose-600 text-white shadow-[0_0_10px_rgba(225,29,72,0.4)]', iconGlow: 'shadow-[0_0_15px_rgba(244,63,94,0.15)]' },
    cyan:   { text: 'text-cyan-400', textMuted: 'text-cyan-400/70', bgSubtle: 'bg-cyan-950/30', border: 'border-cyan-500/20', borderHover: 'hover:border-cyan-500', borderFocus: 'focus-within:border-cyan-500/50', btnActive: 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(8,145,178,0.4)]', iconGlow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]' },
    amber:  { text: 'text-amber-400', textMuted: 'text-amber-400/70', bgSubtle: 'bg-amber-950/30', border: 'border-amber-500/20', borderHover: 'hover:border-amber-500', borderFocus: 'focus-within:border-amber-500/50', btnActive: 'bg-amber-600 text-white shadow-[0_0_10px_rgba(217,119,6,0.4)]', iconGlow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]' },
    emerald:{ text: 'text-emerald-400', textMuted: 'text-emerald-400/70', bgSubtle: 'bg-emerald-950/30', border: 'border-emerald-500/20', borderHover: 'hover:border-emerald-500', borderFocus: 'focus-within:border-emerald-500/50', btnActive: 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(5,150,105,0.4)]', iconGlow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]' },
    purple: { text: 'text-purple-400', textMuted: 'text-purple-400/70', bgSubtle: 'bg-purple-950/30', border: 'border-purple-500/20', borderHover: 'hover:border-purple-500', borderFocus: 'focus-within:border-purple-500/50', btnActive: 'bg-purple-600 text-white shadow-[0_0_10px_rgba(126,34,206,0.4)]', iconGlow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)]' },
    blue:   { text: 'text-blue-400', textMuted: 'text-blue-400/70', bgSubtle: 'bg-blue-950/30', border: 'border-blue-500/20', borderHover: 'hover:border-blue-500', borderFocus: 'focus-within:border-blue-500/50', btnActive: 'bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.4)]', iconGlow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)]' },
};

interface VocabAppletProps {
    currentDomain: string;
    localTerms: VocabTerm[];
    parentTerms?: VocabTerm[];
    accentColor?: ThemeColor; // NEW: Optional theme prop
}

export default function VocabApplet({ currentDomain, localTerms, parentTerms = [], accentColor = 'indigo' }: VocabAppletProps) {
    const theme = THEMES[accentColor]; // Load the active theme
    
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTag, setActiveTag] = useState<string>('All Tags');
    const [includeParents, setIncludeParents] = useState(false);
    const [hideAdult, setHideAdult] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedSafeMode = localStorage.getItem('vocab_safe_mode');
        if (savedSafeMode !== null) setHideAdult(savedSafeMode === 'true');
    }, []);



    const activeTerms = includeParents ? [...localTerms, ...parentTerms] : localTerms;
    const allTags = ['All Tags', ...Array.from(new Set(activeTerms.flatMap(t => t.tags)))].sort();

    const filteredTerms = activeTerms.filter(term => {
        const matchesSearch = term.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              term.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAdultFilter = hideAdult ? !term.isAdult : true;
        const matchesTag = activeTag === 'All Tags' ? true : term.tags.includes(activeTag);
        return matchesSearch && matchesAdultFilter && matchesTag;
    });

    const sortedTerms = [...filteredTerms].sort((a, b) => a.word.localeCompare(b.word));

    const resetFilters = () => {
        setSearchTerm(''); setActiveTag('All Tags');
    };

    if (!isMounted) return null;

    return (
        <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl overflow-hidden font-sans shadow-xl">
            
            {/* APPLET HEADER */}
            <div className="p-6 bg-black border-b border-neutral-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                    <div className="flex items-center gap-4">
                        {/* THEMED: Icon Box */}
                        <div className={`p-3 rounded-xl border ${theme.bgSubtle} ${theme.text} ${theme.border} ${theme.iconGlow}`}>
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white tracking-tight">{currentDomain} Lexicon</h3>
                            <div className="text-xs text-neutral-500 font-mono uppercase tracking-widest mt-1">
                                {filteredTerms.length} / {activeTerms.length} Terms Indexed
                            </div>
                        </div>
                    </div>

                    {/* THEMED: Search Bar Focus */}
                    <div className={`flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 flex-1 md:flex-none md:min-w-[280px] transition-colors ${theme.borderFocus}`}>
                        <Search size={16} className="text-neutral-500" />
                        <input 
                            type="text" 
                            placeholder="Search definitions..." 
                            className="bg-transparent border-none text-sm text-white focus:outline-none w-full placeholder:text-neutral-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    
                    {/* THEMED: Tag Dropdown Focus */}
                    <div className={`flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 transition-colors w-full md:w-auto ${theme.borderFocus}`}>
                        <Tags size={14} className="text-neutral-500" />
                        <select 
                            value={activeTag}
                            onChange={(e) => setActiveTag(e.target.value)}
                            className="bg-transparent text-xs font-bold uppercase tracking-widest text-neutral-300 outline-none w-full md:w-48 cursor-pointer"
                        >
                            {allTags.map(tag => (
                                <option key={tag} value={tag} className="bg-neutral-900 text-neutral-300">{tag}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        {parentTerms.length > 0 && (
                            <button 
                                onClick={() => setIncludeParents(!includeParents)}
                                // THEMED: Active Button State
                                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
                                    includeParents 
                                        ? theme.btnActive
                                        : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
                                }`}
                            >
                                <Library size={14} /> {includeParents ? 'Hide Parents' : 'Show Parents'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* TERMS DISPLAY */}
            <div className="max-h-[400px] overflow-y-auto p-6 space-y-6 hidden-scrollbar">
                {sortedTerms.length === 0 ? (
                    <div className="text-center text-neutral-500 py-12 flex flex-col items-center">
                        <Search size={32} className="mb-4 opacity-20" />
                        <span className="text-sm mb-4">No terminology matches your current filters.</span>
                        <button onClick={resetFilters} className="flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors text-white">
                            <XCircle size={14} /> Clear Filters
                        </button>
                    </div>
                ) : (
                    sortedTerms.map(term => (
                        // THEMED: Left Border & Text Hover
                        <div key={term.id} className={`group relative pl-4 border-l-2 border-neutral-800 transition-colors ${theme.borderHover}`}>
                            <div className="flex flex-wrap items-baseline gap-3 mb-2">
                                <h4 className={`text-lg font-black text-white transition-colors group-hover:${theme.text.split('-')[1]}-400`}>
                                    {term.word}
                                </h4>
                                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{term.domain}</span>
                                {term.isAdult && (
                                    <span className="text-[9px] font-bold bg-rose-950/80 text-rose-400 px-1.5 py-0.5 rounded uppercase tracking-widest border border-rose-500/30">Mature</span>
                                )}
                            </div>
                            
                            <p className="text-sm text-neutral-300 leading-relaxed font-light mb-3">{term.definition}</p>

                            {(term.tags.length > 0 || term.relatedTerms) && (
                                <div className="flex flex-wrap items-center gap-4 mt-2">
                                    {term.tags.length > 0 && (
                                        <div className="flex gap-1.5">
                                            {term.tags.map(tag => (
                                                <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 bg-neutral-900 px-1.5 py-0.5 rounded">{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                                        // THEMED: Arrow Text
                                        <div className={`flex items-center gap-1.5 text-[10px] font-mono ${theme.textMuted}`}>
                                            <ArrowRight size={12} />
                                            <span>See also: {term.relatedTerms.join(', ')}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}