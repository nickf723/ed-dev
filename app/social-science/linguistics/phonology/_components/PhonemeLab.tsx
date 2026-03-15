"use client";
import React, { useState, useEffect } from 'react';
import { Mic2, Volume2, Waves, RefreshCw, Play } from 'lucide-react';

type DatamuseResponse = {
    word: string;
    tags?: string[];
};

// 1. THE ACOUSTIC REFERENCE DICTIONARY
// Maps ARPAbet symbols to recognizable English reference words for the TTS Engine.
const ARPABET_DICT: Record<string, { example: string, desc: string }> = {
    'AA': { example: 'father', desc: 'The "ah" sound' },
    'AE': { example: 'bat', desc: 'The short "a" sound' },
    'AH': { example: 'but', desc: 'The short "u" sound' },
    'AO': { example: 'caught', desc: 'The "aw" sound' },
    'AW': { example: 'cow', desc: 'The "ow" sound' },
    'AY': { example: 'bite', desc: 'The long "i" sound' },
    'B':  { example: 'bee', desc: 'The "b" consonant' },
    'CH': { example: 'cheese', desc: 'The "ch" sound' },
    'D':  { example: 'dog', desc: 'The "d" consonant' },
    'DH': { example: 'this', desc: 'The voiced "th" sound' },
    'EH': { example: 'bet', desc: 'The short "e" sound' },
    'ER': { example: 'bird', desc: 'The "er" sound' },
    'EY': { example: 'bait', desc: 'The long "a" sound' },
    'F':  { example: 'find', desc: 'The "f" consonant' },
    'G':  { example: 'go', desc: 'The hard "g" consonant' },
    'HH': { example: 'he', desc: 'The "h" consonant' },
    'IH': { example: 'bit', desc: 'The short "i" sound' },
    'IY': { example: 'beat', desc: 'The long "e" sound' },
    'JH': { example: 'judge', desc: 'The "j" sound' },
    'K':  { example: 'cat', desc: 'The hard "k" consonant' },
    'L':  { example: 'leg', desc: 'The "l" consonant' },
    'M':  { example: 'man', desc: 'The "m" consonant' },
    'N':  { example: 'no', desc: 'The "n" consonant' },
    'NG': { example: 'sing', desc: 'The "ng" sound' },
    'OW': { example: 'boat', desc: 'The long "o" sound' },
    'OY': { example: 'boy', desc: 'The "oy" sound' },
    'P':  { example: 'pen', desc: 'The "p" consonant' },
    'R':  { example: 'red', desc: 'The "r" consonant' },
    'S':  { example: 'sun', desc: 'The "s" consonant' },
    'SH': { example: 'she', desc: 'The "sh" sound' },
    'T':  { example: 'tea', desc: 'The "t" consonant' },
    'TH': { example: 'think', desc: 'The unvoiced "th" sound' },
    'UH': { example: 'book', desc: 'The short "oo" sound' },
    'UW': { example: 'boot', desc: 'The long "oo" sound' },
    'V':  { example: 'voice', desc: 'The "v" consonant' },
    'W':  { example: 'we', desc: 'The "w" consonant' },
    'Y':  { example: 'yes', desc: 'The "y" consonant' },
    'Z':  { example: 'zoo', desc: 'The "z" consonant' },
    'ZH': { example: 'measure', desc: 'The "zh" sound' }
};

export default function PhonemeLab() {
    const [inputWord, setInputWord] = useState('linguistics');
    const [phonemes, setPhonemes] = useState<string[]>([]);
    const [rhymes, setRhymes] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // --- AUDIO ENGINE ---
    const speakText = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop any currently playing audio
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9; // Slightly slower for clarity
            window.speechSynthesis.speak(utterance);
        }
    };

    const playPhoneme = (rawPhoneme: string) => {
        // Strip numbers (stress markers on vowels like AH0 -> AH)
        const basePhoneme = rawPhoneme.replace(/[0-9]/g, '');
        const ref = ARPABET_DICT[basePhoneme];
        
        if (ref) {
            speakText(`${ref.desc}, as in, ${ref.example}`);
        } else {
            speakText(basePhoneme); // Fallback
        }
    };

    const analyzeWord = async (word: string) => {
        if (!word.trim()) return;
        setIsLoading(true);
        setError('');
        
        try {
            const pronRes = await fetch(`https://api.datamuse.com/words?sp=${word}&md=r&max=1`);
            const pronData: DatamuseResponse[] = await pronRes.json();
            
            const rhymeRes = await fetch(`https://api.datamuse.com/words?rel_rhy=${word}&max=5`);
            const rhymeData: DatamuseResponse[] = await rhymeRes.json();

            if (pronData.length > 0 && pronData[0].tags) {
                const pronTag = pronData[0].tags.find(t => t.startsWith('pron:'));
                if (pronTag) {
                    const rawPhonemes = pronTag.replace('pron:', '').split(' ');
                    setPhonemes(rawPhonemes);
                } else {
                    setPhonemes([]);
                    setError('No pronunciation data found in the dictionary.');
                }
            } else {
                setPhonemes([]);
                setError('Word not recognized by the CMU Pronouncing Dictionary.');
            }

            setRhymes(rhymeData.map(r => r.word));
        } catch (err) {
            setError('Failed to connect to the Datamuse Lexicon.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { analyzeWord(inputWord); }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') analyzeWord(inputWord);
    };

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-orange-500/20 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-orange-950/30 border-b border-orange-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                        <Mic2 size={18} className="text-orange-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">ARPAbet Disassembler</h3>
                        <p className="text-[10px] text-orange-300/60 font-mono uppercase tracking-widest">Acoustic Engine Enabled</p>
                    </div>
                </div>
                {/* Full Word Audio Trigger */}
                <button 
                    onClick={() => speakText(inputWord)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors text-orange-400"
                    title="Speak full word"
                >
                    <Volume2 size={14} /> Listen
                </button>
            </div>

            <div className="p-6 md:p-8 space-y-8">
                {/* Input Field */}
                <div>
                    <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">
                        Target Lexeme
                    </label>
                    <div className="relative flex gap-2">
                        <input 
                            type="text" 
                            value={inputWord}
                            onChange={(e) => setInputWord(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-2xl font-serif text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                            placeholder="Enter a word..."
                        />
                        <button 
                            onClick={() => analyzeWord(inputWord)}
                            className="px-6 bg-orange-500/20 text-orange-400 hover:bg-orange-500/40 rounded-xl transition-colors border border-orange-500/50"
                        >
                            {isLoading ? <RefreshCw size={24} className="animate-spin" /> : <RefreshCw size={24} />}
                        </button>
                    </div>
                </div>

                {/* Phonemic Output */}
                <div className="bg-black/30 border border-white/5 rounded-xl p-6 min-h-[150px]">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 flex items-center justify-between border-b border-white/5 pb-3">
                        <span className="flex items-center gap-2"><Waves size={12} /> Phonetic Breakdown</span>
                        <span className="text-orange-500/50">Click blocks for acoustic reference</span>
                    </div>

                    {error ? (
                        <div className="text-red-400 text-sm font-mono">{error}</div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {phonemes.map((phoneme, i) => {
                                const isVowel = /[0-9]/.test(phoneme);
                                const basePhoneme = phoneme.replace(/[0-9]/g, '');
                                const refDesc = ARPABET_DICT[basePhoneme]?.example || 'unknown';

                                return (
                                    <button 
                                        key={i} 
                                        onClick={() => playPhoneme(phoneme)}
                                        className={`group relative px-4 py-2 rounded-lg font-mono text-lg font-bold border transition-all hover:scale-105 active:scale-95 flex items-center gap-2
                                            ${isVowel ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-300 hover:bg-fuchsia-500/30' : 'bg-orange-500/20 border-orange-500/50 text-orange-300 hover:bg-orange-500/30'}
                                        `}
                                    >
                                        {phoneme}
                                        <Play size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        {/* Hover Tooltip */}
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black border border-white/10 rounded text-[10px] font-sans font-normal text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap shadow-xl">
                                            As in "{refDesc}"
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Structural Rhymes */}
                {rhymes.length > 0 && !error && (
                    <div className="pt-4 border-t border-white/5">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
                            Phonetic Matches (Rhymes)
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {rhymes.map((rhyme, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => { setInputWord(rhyme); analyzeWord(rhyme); }}
                                    className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-sm text-zinc-300 transition-colors"
                                >
                                    {rhyme}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}