"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Timer, Trophy, ArrowRight, Play, RefreshCw } from 'lucide-react';

// Hardcoded iconic IDs to keep the game lightning fast
const POKEMON_ROSTER = [
    { id: 25, name: 'Pikachu', color: 'amber' },
    { id: 1, name: 'Bulbasaur', color: 'emerald' },
    { id: 4, name: 'Charmander', color: 'rose' },
    { id: 7, name: 'Squirtle', color: 'sky' },
    { id: 94, name: 'Gengar', color: 'purple' },
    { id: 133, name: 'Eevee', color: 'orange' },
    { id: 143, name: 'Snorlax', color: 'teal' },
    { id: 175, name: 'Togepi', color: 'red' },
    { id: 258, name: 'Mudkip', color: 'blue' }
];

export default function PokemonGroupingLab() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    
    // Game State
    const [activePokemon, setActivePokemon] = useState(POKEMON_ROSTER[0]);
    const [totalSwarm, setTotalSwarm] = useState(12);
    const [groupCount, setGroupCount] = useState(3);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

    const inputRef = useRef<HTMLInputElement>(null);

    const generateProblem = () => {
        const randomPokemon = POKEMON_ROSTER[Math.floor(Math.random() * POKEMON_ROSTER.length)];
        
        // Generate friendly K-6 math (totals between 4 and 36, highly divisible)
        const groups = Math.floor(Math.random() * 5) + 2; // 2 to 6 groups
        const perGroup = Math.floor(Math.random() * 5) + 2; // 2 to 6 per group
        
        setActivePokemon(randomPokemon);
        setTotalSwarm(groups * perGroup);
        setGroupCount(groups);
        setAnswer('');
        setFeedback('idle');
    };

    const startGame = () => {
        setIsPlaying(true);
        setScore(0);
        setTimeLeft(60);
        generateProblem();
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0 && isPlaying) {
            setIsPlaying(false);
            if (score > highScore) setHighScore(score);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, timeLeft, score, highScore]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isPlaying) return;

        const correctAnswer = totalSwarm / groupCount;
        if (parseInt(answer) === correctAnswer) {
            setFeedback('correct');
            setScore(s => s + 1);
            setTimeout(() => generateProblem(), 400); // Brief pause to show correct state
        } else {
            setFeedback('wrong');
            setAnswer('');
        }
    };

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-rose-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans">
            {/* Header */}
            <div className="bg-rose-950/30 border-b border-rose-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-500/20 border border-rose-500/30 rounded-lg">
                        <Gamepad2 size={18} className="text-rose-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Swarm Speed Lab</h3>
                        <p className="text-[10px] text-rose-300/60 font-mono uppercase tracking-widest">Sets & Arrays</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-zinc-400 font-mono text-sm">
                        <Timer size={16} className={timeLeft <= 10 && isPlaying ? "text-red-500 animate-pulse" : ""} />
                        <span className={timeLeft <= 10 && isPlaying ? "text-red-500" : ""}>0:{timeLeft.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-400 font-mono text-sm">
                        <Trophy size={16} />
                        <span>{score}</span>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col items-center min-h-[400px] relative">
                
                {!isPlaying && timeLeft === 60 ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10 p-6 text-center">
                        <div className="w-24 h-24 bg-[url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png')] bg-contain bg-no-repeat bg-center mb-4 animate-bounce" />
                        <h2 className="text-2xl font-black text-white mb-2">A Wild Swarm Appeared!</h2>
                        <p className="text-zinc-400 text-sm max-w-sm mb-8">
                            A group of Pokémon is attacking the math lab! Quickly divide them into equal sets to catch them. You have 60 seconds.
                        </p>
                        <button 
                            onClick={startGame}
                            className="flex items-center gap-2 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:scale-105"
                        >
                            <Play size={20} /> Start Challenge
                        </button>
                    </div>
                ) : !isPlaying && timeLeft === 0 ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 p-6 text-center animate-in fade-in">
                        <h2 className="text-3xl font-black text-white mb-2">Time's Up!</h2>
                        <p className="text-rose-400 font-mono text-lg mb-2">Final Score: {score}</p>
                        <p className="text-zinc-500 font-mono text-xs mb-8">High Score: {highScore}</p>
                        <button 
                            onClick={startGame}
                            className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold uppercase tracking-widest rounded-xl transition-all"
                        >
                            <RefreshCw size={16} /> Play Again
                        </button>
                    </div>
                ) : null}

                {/* The Visual Swarm */}
                <div className={`w-full max-w-lg bg-black/40 border border-white/5 rounded-xl p-6 mb-8 flex flex-wrap justify-center content-center gap-2 min-h-[200px] transition-all duration-300 ${feedback === 'correct' ? 'border-emerald-500/50 bg-emerald-950/20 scale-105' : feedback === 'wrong' ? 'border-red-500/50 bg-red-950/20' : ''}`}>
                    {Array.from({ length: totalSwarm }).map((_, i) => (
                        <div 
                            key={i}
                            className={`w-12 h-12 bg-contain bg-no-repeat bg-center transition-all ${feedback === 'correct' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                            style={{ 
                                backgroundImage: `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${activePokemon.id}.png')`,
                                transitionDelay: `${i * 10}ms`
                            }}
                        />
                    ))}
                </div>

                {/* The Math Prompt */}
                <div className="w-full max-w-lg flex flex-col md:flex-row items-center gap-4 bg-zinc-900 border border-zinc-800 p-2 rounded-2xl shadow-inner">
                    <div className="flex-1 text-center md:text-left px-4">
                        <div className="text-zinc-400 font-medium">
                            Divide the <span className={`text-${activePokemon.color}-400 font-bold`}>{totalSwarm} {activePokemon.name}s</span> into <span className="text-white font-bold">{groupCount}</span> equal groups.
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-1">
                            How many in each group?
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
                        <input 
                            ref={inputRef}
                            type="number"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            disabled={!isPlaying}
                            className="w-24 bg-black border-2 border-zinc-700 focus:border-rose-500 rounded-xl px-4 py-3 text-2xl font-black text-center text-white outline-none transition-colors"
                            placeholder="?"
                            autoFocus
                        />
                        <button 
                            type="submit"
                            disabled={!isPlaying || !answer}
                            className="px-6 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:hover:bg-rose-500 text-white rounded-xl transition-colors flex items-center justify-center"
                        >
                            <ArrowRight size={24} />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}