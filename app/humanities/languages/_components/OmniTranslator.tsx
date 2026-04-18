"use client";
import React, { useState } from 'react';
import { Languages, ArrowRightLeft, Globe2, RefreshCw, Layers } from 'lucide-react';

const SYNTAX_EXAMPLES = {
    english: { name: 'English', family: 'Germanic', syntax: 'S-V-O', blocks: [{t: 'I', type: 'S'}, {t: 'eat', type: 'V'}, {t: 'the apple', type: 'O'}] },
    japanese: { name: 'Japanese', family: 'Japonic', syntax: 'S-O-V', blocks: [{t: '私は (I)', type: 'S'}, {t: 'りんごを (apple)', type: 'O'}, {t: '食べる (eat)', type: 'V'}] },
    irish: { name: 'Irish (Gaelic)', family: 'Celtic', syntax: 'V-S-O', blocks: [{t: 'Itheann (eat)', type: 'V'}, {t: 'mé (I)', type: 'S'}, {t: 'an t-úll (apple)', type: 'O'}] },
    arabic: { name: 'Arabic (Classical)', family: 'Semitic', syntax: 'V-S-O', blocks: [{t: 'آكل (eat)', type: 'V'}, {t: 'أنا (I)', type: 'S'}, {t: 'التفاحة (apple)', type: 'O'}] }
};

export default function OmniTranslator() {
    // API State
    const [inputText, setInputText] = useState('');
    const [targetLang, setTargetLang] = useState('es'); // Default Spanish
    const [translation, setTranslation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Syntax State
    const [activeSyntax, setActiveSyntax] = useState<keyof typeof SYNTAX_EXAMPLES>('english');

    const handleTranslate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        
        setIsLoading(true);
        try {
            // Using the free MyMemory Translation API
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=en|${targetLang}`);
            const data = await res.json();
            if (data.responseData?.translatedText) {
                setTranslation(data.responseData.translatedText);
            } else {
                setTranslation("Translation error.");
            }
        } catch (error) {
            setTranslation("Network error connecting to lexicon.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-violet-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans">
            <div className="bg-violet-950/30 border-b border-violet-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-violet-500/20 border border-violet-500/30 rounded-lg">
                        <Globe2 size={18} className="text-violet-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Omni-Lingual Engine</h3>
                        <p className="text-[10px] text-violet-300/60 font-mono uppercase tracking-widest">Live API & Syntax Mapper</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row">
                {/* LEFT: Live Translation API */}
                <div className="w-full md:w-1/2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/5">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <ArrowRightLeft size={14} className="text-violet-400"/> MyMemory API Translation
                    </div>
                    
                    <form onSubmit={handleTranslate} className="space-y-4">
                        <textarea 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Enter English text..."
                            className="w-full h-24 bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 resize-none"
                        />
                        
                        <div className="flex gap-2">
                            <select 
                                value={targetLang}
                                onChange={(e) => setTargetLang(e.target.value)}
                                className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-zinc-300 focus:outline-none focus:border-violet-500 flex-1"
                            >
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="it">Italian</option>
                                <option value="ja">Japanese</option>
                                <option value="ar">Arabic</option>
                                <option value="ru">Russian</option>
                            </select>
                            <button 
                                type="submit" 
                                disabled={isLoading || !inputText}
                                className="px-6 py-2 bg-violet-500/20 hover:bg-violet-500/30 disabled:opacity-50 border border-violet-500/50 rounded-lg text-violet-300 font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center"
                            >
                                {isLoading ? <RefreshCw size={16} className="animate-spin" /> : 'Translate'}
                            </button>
                        </div>
                    </form>

                    {translation && (
                        <div className="mt-6 p-4 bg-zinc-900/50 border border-violet-500/30 rounded-xl">
                            <div className="text-[10px] font-mono text-violet-400 uppercase tracking-widest mb-2">Output</div>
                            <div className="text-lg text-white font-medium">{translation}</div>
                        </div>
                    )}
                </div>

                {/* RIGHT: Structural Grammar Sandbox */}
                <div className="w-full md:w-1/2 p-6 md:p-8 bg-black/40">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Layers size={14} className="text-amber-400"/> Structural Syntax Reordering
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {(Object.keys(SYNTAX_EXAMPLES) as Array<keyof typeof SYNTAX_EXAMPLES>).map((langKey) => (
                            <button
                                key={langKey}
                                onClick={() => setActiveSyntax(langKey)}
                                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all border
                                    ${activeSyntax === langKey 
                                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' 
                                        : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                {SYNTAX_EXAMPLES[langKey].name}
                            </button>
                        ))}
                    </div>

                    <div className="bg-zinc-900/80 border border-white/5 rounded-xl p-6 min-h-[160px] flex flex-col justify-center">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xs text-zinc-400 font-mono">Family: {SYNTAX_EXAMPLES[activeSyntax].family}</span>
                            <span className="text-xs font-bold px-2 py-1 bg-white/10 rounded text-amber-400 tracking-widest">{SYNTAX_EXAMPLES[activeSyntax].syntax}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 justify-center">
                            {SYNTAX_EXAMPLES[activeSyntax].blocks.map((block, i) => {
                                // Color code based on Subject, Verb, Object
                                const colorClass = 
                                    block.type === 'S' ? 'bg-sky-500/20 border-sky-500/50 text-sky-300' :
                                    block.type === 'V' ? 'bg-rose-500/20 border-rose-500/50 text-rose-300' :
                                    'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
                                
                                return (
                                    <div key={`${activeSyntax}-${i}`} className={`px-4 py-3 rounded-lg border font-medium text-lg flex flex-col items-center gap-1 animate-in zoom-in duration-300 ${colorClass}`}>
                                        <span>{block.t}</span>
                                        <span className="text-[10px] font-black uppercase opacity-60">{block.type === 'S' ? 'Subject' : block.type === 'V' ? 'Verb' : 'Object'}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}