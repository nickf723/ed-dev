"use client";
import React, { useState } from 'react';
import { BookA, X, Volume2, Search } from 'lucide-react';

export type VocabWord = {
    term: string;
    category: string; // Part of Speech (e.g., noun, verb)
    definition: string;
    pronunciation?: string; // e.g., "kuh-myoo-ni-kay-shun"
};

interface VocabDrawerProps {
    vocabList: VocabWord[];
    themeColor?: string; // e.g., 'violet', 'sky', 'emerald'
}

export default function VocabDrawer({ vocabList, themeColor = 'violet' }: VocabDrawerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Fallback Tailwind color mapping
    const themeBg = `bg-${themeColor}-500`;
    const themeText = `text-${themeColor}-400`;
    const themeBorder = `border-${themeColor}-500/30`;
    const themeHover = `hover:bg-${themeColor}-500/20`;

    // Filter vocab based on search
    const filteredVocab = vocabList.filter(v => 
        v.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
        v.definition.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Reusing our TTS Engine!
    const speakWord = (word: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    if (!vocabList || vocabList.length === 0) return null;

    return (
        <>
            {/* THE FLOATING TRIGGER BUTTON (Right Side) */}
            <button 
                onClick={() => setIsOpen(true)}
                className={`fixed top-24 right-0 z-40 flex items-center gap-2 pl-3 pr-4 py-3 bg-black/80 backdrop-blur-md border-y border-l border-white/10 rounded-l-2xl shadow-2xl transition-all hover:pr-6 group ${!isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className={`p-1.5 rounded-lg bg-white/5 ${themeText}`}>
                    <BookA size={18} />
                </div>
                <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors">Lesson Vocab</span>
                    <span className="text-[9px] font-mono text-zinc-500">{vocabList.length} Terms</span>
                </div>
            </button>

            {/* NON-BLOCKING OVERLAY (Optional: lets them read the page while open) */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* THE SLIDING DRAWER */}
            <div className={`
                fixed inset-y-0 right-0 z-50 w-full sm:w-80 md:w-96 bg-[#0a0a0c]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                
                {/* Drawer Header */}
                <div className="p-6 border-b border-white/5 shrink-0">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-white/5 border ${themeBorder} ${themeText}`}>
                                <BookA size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold tracking-wide">Glossary</h3>
                                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Active Lesson Terms</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input 
                            type="text"
                            placeholder="Search terms..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                        />
                    </div>
                </div>

                {/* Vocabulary List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                    {filteredVocab.length > 0 ? (
                        filteredVocab.map((item, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors group">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h4 className={`text-lg font-bold text-white group-hover:${themeText} transition-colors`}>
                                            {item.term}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 bg-black/50 px-2 py-0.5 rounded border border-white/5">
                                                {item.category}
                                            </span>
                                            {item.pronunciation && (
                                                <span className="text-xs text-zinc-600 italic">/{item.pronunciation}/</span>
                                            )}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => speakWord(item.term)}
                                        className={`p-2 rounded-lg bg-black/50 text-zinc-400 border border-white/5 ${themeHover} hover:text-white transition-colors`}
                                        title="Listen to pronunciation"
                                    >
                                        <Volume2 size={16} />
                                    </button>
                                </div>
                                <p className="text-sm text-zinc-400 leading-relaxed font-light mt-3">
                                    {item.definition}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-zinc-600 text-sm mt-10 font-mono">
                            No terms found matching "{searchQuery}"
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}