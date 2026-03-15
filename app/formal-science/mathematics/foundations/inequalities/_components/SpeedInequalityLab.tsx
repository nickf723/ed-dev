"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Calculator, Zap } from 'lucide-react';
import { PokemonData, fetchRandomPokemon } from '@/app/humanities/gaming/video/pokemon/_components/PokeAPI';
import { PokeCard } from '@/app/humanities/gaming/video/pokemon/_components/PokeCard';

type AnimationState = 'idle' | 'dashA' | 'dashB' | 'clash';

export default function SpeedInequalityLab() {
    const [monA, setMonA] = useState<PokemonData | null>(null);
    const [monB, setMonB] = useState<PokemonData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Both sides get the choice scarf option!
    const [scarfA, setScarfA] = useState(false);
    const [scarfB, setScarfB] = useState(false);
    
    const [userChoice, setUserChoice] = useState<'<' | '>' | '=' | null>(null);
    const [feedback, setFeedback] = useState<{ text: string, correct: boolean } | null>(null);
    const [animState, setAnimState] = useState<AnimationState>('idle');

    const rollEncounter = useCallback(async () => {
        setIsLoading(true);
        setUserChoice(null);
        setFeedback(null);
        setScarfA(false);
        setScarfB(false);
        setAnimState('idle');

        const [p1, p2] = await Promise.all([fetchRandomPokemon(), fetchRandomPokemon()]);
        setMonA(p1);
        setMonB(p2);
        setIsLoading(false);
    }, []);

    useEffect(() => { rollEncounter(); }, [rollEncounter]);

    if (isLoading || !monA || !monB) {
        return (
            <div className="bg-zinc-950 border-2 border-zinc-800 rounded-xl h-[600px] flex flex-col items-center justify-center font-sans">
                <RefreshCw size={32} className="text-amber-500 animate-spin mb-4" />
                <div className="text-zinc-500 font-mono text-sm uppercase tracking-widest animate-pulse">Connecting to Global PC Network...</div>
            </div>
        );
    }

    const speedA = scarfA ? Math.floor(monA.stats.speed * 1.5) : monA.stats.speed;
    const speedB = scarfB ? Math.floor(monB.stats.speed * 1.5) : monB.stats.speed;

    const handleCheck = (operator: '<' | '>' | '=') => {
        setUserChoice(operator);
        
        let isCorrect = false;
        if (operator === '>' && speedA > speedB) isCorrect = true;
        if (operator === '<' && speedA < speedB) isCorrect = true;
        if (operator === '=' && speedA === speedB) isCorrect = true;

        if (isCorrect) {
            setFeedback({ text: "Correct! Priority calculated.", correct: true });
            
            // Trigger the appropriate animation!
            if (speedA > speedB) setAnimState('dashA');
            else if (speedB > speedA) setAnimState('dashB');
            else setAnimState('clash');

            // Reset animation after it finishes playing
            setTimeout(() => setAnimState('idle'), 1000);

        } else {
            setFeedback({ text: `Incorrect. ${speedA} is not ${operator} ${speedB}.`, correct: false });
            setAnimState('idle');
        }
    };

    return (
        <div className="bg-zinc-950 border-2 border-zinc-800 rounded-xl overflow-hidden font-sans">
            <div className="bg-zinc-900 border-b-2 border-zinc-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-widest text-xs">
                    <Calculator size={16} /> Initiative / Inequality Lab
                </div>
                <button onClick={rollEncounter} className="flex items-center gap-1 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-bold text-white transition-colors">
                    <RefreshCw size={14} /> Reroll Encounter
                </button>
            </div>

            <div className="p-6 md:p-8 overflow-hidden relative">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 relative z-10">
                    
                    {/* Pokémon A */}
                    <motion.div 
                        className="flex flex-col items-center w-full md:w-[40%] z-20"
                        animate={{ x: animState === 'dashA' ? [0, 300, 0] : animState === 'clash' ? [0, 150, 0] : 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <div className="w-full pointer-events-none mb-4">
                            {/* Passing the focusedStat prop! */}
                            <PokeCard pokemon={monA} focusedStat="speed" />
                        </div>
                        <button 
                            onClick={() => { setScarfA(!scarfA); setUserChoice(null); setFeedback(null); }}
                            className={`w-full flex items-center justify-center gap-1 px-3 py-2 rounded text-[10px] font-bold uppercase tracking-widest border transition-colors ${scarfA ? 'bg-sky-500/20 text-sky-400 border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300'}`}
                        >
                            <Zap size={12} className={scarfA ? "fill-sky-400" : ""} /> Scarf (x1.5)
                        </button>
                    </motion.div>

                    {/* The Operator Selector */}
                    <div className="flex flex-col items-center justify-center w-full md:w-[20%] z-10">
                        <div className="text-4xl font-black text-white mb-6 font-mono w-20 h-20 bg-zinc-900 border-2 border-zinc-800 rounded-xl flex items-center justify-center shadow-lg">
                            {userChoice || '?'}
                        </div>
                        <div className="flex flex-col gap-2">
                            {(['>', '=', '<'] as const).map(op => (
                                <button 
                                    key={op} onClick={() => handleCheck(op)}
                                    className="w-16 h-12 flex items-center justify-center bg-zinc-800 hover:bg-amber-600 hover:border-amber-500 hover:text-white text-zinc-400 text-xl font-bold rounded-lg transition-colors border border-zinc-700"
                                >
                                    {op}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Pokémon B */}
                    <motion.div 
                        className="flex flex-col items-center w-full md:w-[40%] z-20"
                        animate={{ x: animState === 'dashB' ? [0, -300, 0] : animState === 'clash' ? [0, -150, 0] : 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <div className="w-full pointer-events-none mb-4">
                            <PokeCard pokemon={monB} focusedStat="speed" />
                        </div>
                        <button 
                            onClick={() => { setScarfB(!scarfB); setUserChoice(null); setFeedback(null); }}
                            className={`w-full flex items-center justify-center gap-1 px-3 py-2 rounded text-[10px] font-bold uppercase tracking-widest border transition-colors ${scarfB ? 'bg-sky-500/20 text-sky-400 border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300'}`}
                        >
                            <Zap size={12} className={scarfB ? "fill-sky-400" : ""} /> Scarf (x1.5)
                        </button>
                    </motion.div>

                </div>

                {/* The Math Readout */}
                <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 relative z-30">
                    <div className="text-center font-mono text-lg text-zinc-300 mb-2 flex items-center justify-center gap-2">
                        <span className={scarfA ? "text-sky-400" : ""}>{scarfA ? `(${monA.stats.speed} × 1.5) = ${speedA}` : speedA}</span>
                        <span className="text-amber-500 font-black">{userChoice || '_'}</span>
                        <span className={scarfB ? "text-sky-400" : ""}>{scarfB ? `(${monB.stats.speed} × 1.5) = ${speedB}` : speedB}</span>
                    </div>
                    
                    {feedback && (
                        <div className={`text-center text-sm font-bold mt-4 p-3 rounded ${feedback.correct ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                            {feedback.text}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}