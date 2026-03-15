"use client";
import React, { useState } from 'react';
import { Play, Delete, Piano } from 'lucide-react';

// The updated dictionary uses rough English spellings to force the TTS to isolate sounds.
export const ARPABET_DICT: Record<string, { desc: string, tts: string, type: 'vowel' | 'consonant' }> = {
    'AA': { desc: 'ah', tts: 'ah', type: 'vowel' },
    'AE': { desc: 'bat', tts: 'aa', type: 'vowel' },
    'AH': { desc: 'but', tts: 'uh', type: 'vowel' },
    'AO': { desc: 'caught', tts: 'aw', type: 'vowel' },
    'AW': { desc: 'cow', tts: 'ow', type: 'vowel' },
    'AY': { desc: 'bite', tts: 'eye', type: 'vowel' },
    'EH': { desc: 'bet', tts: 'eh', type: 'vowel' },
    'ER': { desc: 'bird', tts: 'err', type: 'vowel' },
    'EY': { desc: 'bait', tts: 'ay', type: 'vowel' },
    'IH': { desc: 'bit', tts: 'ih', type: 'vowel' },
    'IY': { desc: 'beat', tts: 'ee', type: 'vowel' },
    'OW': { desc: 'boat', tts: 'oh', type: 'vowel' },
    'OY': { desc: 'boy', tts: 'oy', type: 'vowel' },
    'UH': { desc: 'book', tts: 'ooh', type: 'vowel' },
    'UW': { desc: 'boot', tts: 'ooo', type: 'vowel' },
    
    'B':  { desc: 'bee', tts: 'buh', type: 'consonant' },
    'CH': { desc: 'cheese', tts: 'chuh', type: 'consonant' },
    'D':  { desc: 'dog', tts: 'duh', type: 'consonant' },
    'DH': { desc: 'this', tts: 'thuh', type: 'consonant' },
    'F':  { desc: 'find', tts: 'fuh', type: 'consonant' },
    'G':  { desc: 'go', tts: 'guh', type: 'consonant' },
    'HH': { desc: 'he', tts: 'huh', type: 'consonant' },
    'JH': { desc: 'judge', tts: 'juh', type: 'consonant' },
    'K':  { desc: 'cat', tts: 'kuh', type: 'consonant' },
    'L':  { desc: 'leg', tts: 'luh', type: 'consonant' },
    'M':  { desc: 'man', tts: 'muh', type: 'consonant' },
    'N':  { desc: 'no', tts: 'nuh', type: 'consonant' },
    'NG': { desc: 'sing', tts: 'ng', type: 'consonant' },
    'P':  { desc: 'pen', tts: 'puh', type: 'consonant' },
    'R':  { desc: 'red', tts: 'ruh', type: 'consonant' },
    'S':  { desc: 'sun', tts: 'sss', type: 'consonant' },
    'SH': { desc: 'she', tts: 'shh', type: 'consonant' },
    'T':  { desc: 'tea', tts: 'tuh', type: 'consonant' },
    'TH': { desc: 'think', tts: 'th', type: 'consonant' },
    'V':  { desc: 'voice', tts: 'vuh', type: 'consonant' },
    'W':  { desc: 'we', tts: 'wuh', type: 'consonant' },
    'Y':  { desc: 'yes', tts: 'yuh', type: 'consonant' },
    'Z':  { desc: 'zoo', tts: 'zuh', type: 'consonant' },
    'ZH': { desc: 'measure', tts: 'zh', type: 'consonant' }
};

export const speakPhoneme = (rawPhoneme: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    const basePhoneme = rawPhoneme.replace(/[0-9]/g, '');
    const ref = ARPABET_DICT[basePhoneme];
    
    // We send our hacked, phonetic approximation to the TTS engine
    const utterance = new SpeechSynthesisUtterance(ref ? ref.tts : basePhoneme);
    utterance.rate = 0.8; 
    window.speechSynthesis.speak(utterance);
};

export default function PhonemeSoundboard() {
    const [tape, setTape] = useState<string[]>([]);
    const vowels = Object.keys(ARPABET_DICT).filter(k => ARPABET_DICT[k].type === 'vowel');
    const consonants = Object.keys(ARPABET_DICT).filter(k => ARPABET_DICT[k].type === 'consonant');

    const addToTape = (p: string) => {
        setTape(prev => [...prev, p]);
        speakPhoneme(p);
    };

    const playSequence = () => {
        if (!('speechSynthesis' in window) || tape.length === 0) return;
        window.speechSynthesis.cancel();
        
        // Assemble the phonetic approximations into one smooth string
        const sequenceString = tape.map(p => {
            const base = p.replace(/[0-9]/g, '');
            return ARPABET_DICT[base]?.tts || base;
        }).join('');
        
        const utterance = new SpeechSynthesisUtterance(sequenceString);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-fuchsia-500/20 rounded-2xl overflow-hidden shadow-2xl mt-12">
            <div className="bg-fuchsia-950/30 border-b border-fuchsia-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-fuchsia-500/20 border border-fuchsia-500/30 rounded-lg">
                        <Piano size={18} className="text-fuchsia-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Phonetic Synthesizer</h3>
                        <p className="text-[10px] text-fuchsia-300/60 font-mono uppercase tracking-widest">Construct Lexemes</p>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
                
                {/* THE TAPE (Output) */}
                <div className="bg-black/50 border border-white/10 rounded-xl p-6 flex flex-col items-center min-h-[140px]">
                    <div className="flex flex-wrap gap-2 mb-6 min-h-[44px]">
                        {tape.map((p, i) => (
                            <div key={i} className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white font-mono font-bold">
                                {p}
                            </div>
                        ))}
                        {tape.length === 0 && <span className="text-zinc-600 font-mono mt-3">Sequence empty. Select sounds below.</span>}
                    </div>

                    <div className="flex gap-4">
                        <button 
                            onClick={playSequence} disabled={tape.length === 0}
                            className="flex items-center gap-2 px-6 py-2 bg-fuchsia-500/20 text-fuchsia-400 hover:bg-fuchsia-500/40 disabled:opacity-50 border border-fuchsia-500/50 rounded-lg font-bold uppercase text-xs tracking-widest transition-colors"
                        >
                            <Play size={14} /> Play Sequence
                        </button>
                        <button 
                            onClick={() => setTape([])} disabled={tape.length === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-zinc-500 hover:bg-zinc-800 disabled:opacity-50 border border-zinc-800 rounded-lg text-xs uppercase tracking-widest transition-colors"
                        >
                            <Delete size={14} /> Clear
                        </button>
                    </div>
                </div>

                {/* THE BOARD (Inputs) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-[10px] font-mono text-fuchsia-500 uppercase tracking-widest mb-3 border-b border-fuchsia-500/20 pb-2">Vowels</h4>
                        <div className="flex flex-wrap gap-2">
                            {vowels.map(v => (
                                <button 
                                    key={v} onClick={() => addToTape(v)} title={`Like in "${ARPABET_DICT[v].desc}"`}
                                    className="w-12 h-10 bg-fuchsia-500/10 hover:bg-fuchsia-500/30 border border-fuchsia-500/30 rounded text-fuchsia-300 font-mono font-bold transition-transform active:scale-95 flex items-center justify-center"
                                >
                                    {v}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-mono text-orange-500 uppercase tracking-widest mb-3 border-b border-orange-500/20 pb-2">Consonants</h4>
                        <div className="flex flex-wrap gap-2">
                            {consonants.map(c => (
                                <button 
                                    key={c} onClick={() => addToTape(c)} title={`Like in "${ARPABET_DICT[c].desc}"`}
                                    className="w-12 h-10 bg-orange-500/10 hover:bg-orange-500/30 border border-orange-500/30 rounded text-orange-300 font-mono font-bold transition-transform active:scale-95 flex items-center justify-center"
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}