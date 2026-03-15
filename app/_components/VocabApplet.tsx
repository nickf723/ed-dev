"use client";
import React, { useState, useEffect } from 'react';
import { BookOpen, Search, EyeOff, Eye, Library, Tags, ArrowRight } from 'lucide-react';

export type VocabTerm = {
    id: string;
    word: string;
    definition: string;
    domain: string;
    tags: string[];
    relatedTerms?: string[];
    isAdult: boolean;
};

interface VocabAppletProps {
    currentDomain: string;
    localTerms: VocabTerm[];
    parentTerms?: VocabTerm[];
}

export default function VocabApplet({ currentDomain, localTerms, parentTerms = [] }: VocabAppletProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTag, setActiveTag] = useState<string>('All');
    const [includeParents, setIncludeParents] = useState(false);
    
    // Default to true, but we will check localStorage on mount
    const [hideAdult, setHideAdult] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    // 1. PERSISTENT STATE: Load and save Safe Mode preferences
    useEffect(() => {
        setIsMounted(true);
        const savedSafeMode = localStorage.getItem('vocab_safe_mode');
        if (savedSafeMode !== null) {
            setHideAdult(savedSafeMode === 'true');
        }
    }, []);

    const toggleSafeMode = () => {
        const newState = !hideAdult;
        setHideAdult(newState);
        localStorage.setItem('vocab_safe_mode', String(newState));
    };

    // 2. DATA COMPILATION
    const activeTerms = includeParents ? [...localTerms, ...parentTerms] : localTerms;

    // Extract unique tags from the currently active terms
    const allTags = ['All', ...Array.from(new Set(activeTerms.flatMap(t => t.tags)))].sort();

    // 3. FILTERING ENGINE
    const filteredTerms = activeTerms.filter(term => {
        const matchesSearch = term.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              term.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAdultFilter = hideAdult ? !term.isAdult : true;
        const matchesTag = activeTag === 'All' ? true : term.tags.includes(activeTag);
        
        return matchesSearch && matchesAdultFilter && matchesTag;
    });

    const sortedTerms = [...filteredTerms].sort((a, b) => a.word.localeCompare(b.word));

    // Prevent hydration mismatch by not rendering the adult-filtered content until mounted
    if (!isMounted) return null;

    return (
        <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl overflow-hidden font-sans my-8 shadow-xl">
            
            {/* APPLET HEADER */}
            <div className="p-6 bg-black border-b border-neutral-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-950/30 text-indigo-500 rounded-xl border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white tracking-tight">{currentDomain} Lexicon</h3>
                            <div className="text-xs text-neutral-500 font-mono uppercase tracking-widest mt-1">
                                {filteredTerms.length} / {activeTerms.length} Terms Indexed
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 flex-1 md:flex-none md:min-w-[280px] focus-within:border-indigo-500/50 transition-colors">
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

                {/* CONTROLS & TAG RIBBON */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    
                    {/* Tag Filters */}
                    <div className="flex flex-wrap gap-2">
                        <Tags size={14} className="text-neutral-600 mr-1 self-center" />
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${
                                    activeTag === tag 
                                        ? 'bg-white text-black' 
                                        : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Toggles */}
                    <div className="flex gap-2 w-full lg:w-auto">
                        {parentTerms.length > 0 && (
                            <button 
                                onClick={() => setIncludeParents(!includeParents)}
                                className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
                                    includeParents 
                                        ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(79,70,229,0.4)]' 
                                        : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
                                }`}
                            >
                                <Library size={14} />
                                {includeParents ? 'Hide Parents' : 'Show Parents'}
                            </button>
                        )}

                        <button 
                            onClick={toggleSafeMode}
                            className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
                                hideAdult 
                                    ? 'bg-emerald-950/30 text-emerald-500 border border-emerald-500/30' 
                                    : 'bg-rose-950/30 text-rose-500 border border-rose-500/30'
                            }`}
                        >
                            {hideAdult ? <EyeOff size={14} /> : <Eye size={14} />}
                            {hideAdult ? 'Safe Mode' : 'Unrestricted'}
                        </button>
                    </div>
                </div>
            </div>

            {/* TERMS DISPLAY */}
            <div className="max-h-[500px] overflow-y-auto p-6 space-y-6 hidden-scrollbar">
                {sortedTerms.length === 0 ? (
                    <div className="text-center text-neutral-500 py-12 flex flex-col items-center">
                        <Search size={32} className="mb-4 opacity-20" />
                        <span className="text-sm">No terminology matches your current filters.</span>
                    </div>
                ) : (
                    sortedTerms.map(term => (
                        <div key={term.id} className="group relative pl-4 border-l-2 border-neutral-800 hover:border-indigo-500 transition-colors">
                            <div className="flex flex-wrap items-baseline gap-3 mb-2">
                                <h4 className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors">
                                    {term.word}
                                </h4>
                                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                                    {term.domain}
                                </span>
                                {term.isAdult && (
                                    <span className="text-[9px] font-bold bg-rose-950/80 text-rose-400 px-1.5 py-0.5 rounded uppercase tracking-widest border border-rose-500/30">
                                        Mature
                                    </span>
                                )}
                            </div>
                            
                            <p className="text-sm text-neutral-300 leading-relaxed font-light mb-3">
                                {term.definition}
                            </p>

                            {/* Cross-Referencing Footer */}
                            {(term.tags.length > 0 || term.relatedTerms) && (
                                <div className="flex flex-wrap items-center gap-4 mt-2">
                                    {term.tags.length > 0 && (
                                        <div className="flex gap-1.5">
                                            {term.tags.map(tag => (
                                                <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 bg-neutral-900 px-1.5 py-0.5 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-indigo-400/70">
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