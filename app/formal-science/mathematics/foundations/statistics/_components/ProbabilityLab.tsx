"use client";
import React, { useState } from 'react';
import { RotateCw, BarChart2, Trash2, Circle, Dices, Disc } from 'lucide-react';

type Mode = 'spinner' | 'coin' | 'die';

export default function ProbabilityLab() {
    const [mode, setMode] = useState<Mode>('spinner');
    const [isAnimating, setIsAnimating] = useState(false);
    
    // Independent Result Trackers
    const [spinnerData, setSpinnerData] = useState({ red: 0, blue: 0, green: 0, yellow: 0 });
    const [coinData, setCoinData] = useState({ heads: 0, tails: 0 });
    const [dieData, setDieData] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });

    // Animation States
    const [rotation, setRotation] = useState(0); // Spinner
    const [coinRotY, setCoinRotY] = useState(0); // Coin
    const [currentDie, setCurrentDie] = useState(1); // Die
    const [dieShake, setDieShake] = useState(false);

    // Run Simulation
    const simulate = (times: number) => {
        if (isAnimating) return;

        if (times === 1) {
            setIsAnimating(true);

            if (mode === 'spinner') {
                const r = Math.random();
                let winner = 'red'; let targetAngle = 0;
                
                // SVG slices start at 3 o'clock (0deg). 
                // Red(0-90), Yellow(90-180), Green(180-270), Blue(270-360)
                // To put a slice at 12 o'clock, we subtract its center from 360.
                if (r < 0.25) { winner = 'red'; targetAngle = 360 - 45; } // 315
                else if (r < 0.5) { winner = 'yellow'; targetAngle = 360 - 135; } // 225
                else if (r < 0.75) { winner = 'green'; targetAngle = 360 - 225; } // 135
                else { winner = 'blue'; targetAngle = 360 - 315; } // 45

                const extraSpins = 360 * 5; // 5 full rotations for dramatic effect
                setRotation(prev => prev + extraSpins + targetAngle - (prev % 360));

                setTimeout(() => {
                    setSpinnerData(prev => ({ ...prev, [winner]: prev[winner as keyof typeof prev] + 1 }));
                    setIsAnimating(false);
                }, 2000);
            } 
            else if (mode === 'coin') {
                const isHeads = Math.random() > 0.5;
                const extraFlips = 180 * 10; // 5 full rotations
                const targetRot = isHeads ? 0 : 180;
                
                setCoinRotY(prev => prev + extraFlips + targetRot - (prev % 360));

                setTimeout(() => {
                    setCoinData(prev => ({ ...prev, [isHeads ? 'heads' : 'tails']: prev[isHeads ? 'heads' : 'tails'] + 1 }));
                    setIsAnimating(false);
                }, 1500);
            }
            else if (mode === 'die') {
                setDieShake(true);
                // Rapidly cycle numbers
                let cycle = 0;
                const interval = setInterval(() => {
                    setCurrentDie(Math.floor(Math.random() * 6) + 1);
                    cycle++;
                    if (cycle > 15) {
                        clearInterval(interval);
                        const finalResult = Math.floor(Math.random() * 6) + 1;
                        setCurrentDie(finalResult);
                        setDieData(prev => ({ ...prev, [finalResult]: prev[finalResult as keyof typeof prev] + 1 }));
                        setDieShake(false);
                        setIsAnimating(false);
                    }
                }, 100);
            }
        } else {
            // Instant calculate for +10 or +100
            if (mode === 'spinner') {
                const newResults = { ...spinnerData };
                for(let i=0; i<times; i++) {
                    const r = Math.random();
                    if (r < 0.25) newResults.red++;
                    else if (r < 0.5) newResults.yellow++;
                    else if (r < 0.75) newResults.green++;
                    else newResults.blue++;
                }
                setSpinnerData(newResults);
            } else if (mode === 'coin') {
                const newResults = { ...coinData };
                for(let i=0; i<times; i++) {
                    Math.random() > 0.5 ? newResults.heads++ : newResults.tails++;
                }
                setCoinData(newResults);
            } else if (mode === 'die') {
                const newResults = { ...dieData };
                for(let i=0; i<times; i++) {
                    const r = Math.floor(Math.random() * 6) + 1;
                    newResults[r as keyof typeof newResults]++;
                }
                setDieData(newResults);
            }
        }
    };

    const clearData = () => {
        if (mode === 'spinner') setSpinnerData({ red: 0, blue: 0, green: 0, yellow: 0 });
        if (mode === 'coin') setCoinData({ heads: 0, tails: 0 });
        if (mode === 'die') setDieData({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    };

    // Calculate Active Dashboard Variables
    let activeData: { label: string, count: number, color: string, expected: number }[] = [];
    let totalSpins = 0;

    if (mode === 'spinner') {
        totalSpins = spinnerData.red + spinnerData.blue + spinnerData.green + spinnerData.yellow;
        activeData = [
            { label: 'Red', count: spinnerData.red, color: '#f43f5e', expected: 25 },
            { label: 'Blue', count: spinnerData.blue, color: '#3b82f6', expected: 25 },
            { label: 'Green', count: spinnerData.green, color: '#10b981', expected: 25 },
            { label: 'Yellow', count: spinnerData.yellow, color: '#f59e0b', expected: 25 }
        ];
    } else if (mode === 'coin') {
        totalSpins = coinData.heads + coinData.tails;
        activeData = [
            { label: 'Heads', count: coinData.heads, color: '#fbbf24', expected: 50 },
            { label: 'Tails', count: coinData.tails, color: '#94a3b8', expected: 50 }
        ];
    } else if (mode === 'die') {
        totalSpins = Object.values(dieData).reduce((a,b) => a+b, 0);
        activeData = [1,2,3,4,5,6].map(num => ({
            label: `Roll ${num}`, count: dieData[num as keyof typeof dieData], color: '#c084fc', expected: 16.66
        }));
    }

    return (
        <div className="w-full flex flex-col items-center">
            
            {/* LAB TABS */}
            <div className="flex bg-black/40 border border-white/5 p-1 rounded-2xl mb-8">
                <button onClick={() => setMode('spinner')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === 'spinner' ? 'bg-indigo-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>
                    <Disc size={16} /> Spinner
                </button>
                <button onClick={() => setMode('coin')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === 'coin' ? 'bg-amber-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}>
                    <Circle size={16} /> Coin Flip
                </button>
                <button onClick={() => setMode('die')} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === 'die' ? 'bg-fuchsia-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}>
                    <Dices size={16} /> Die Roll
                </button>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center p-4">
                
                {/* LEFT: THE VISUALIZER */}
                <div className="w-full md:w-1/2 flex flex-col items-center gap-8 h-full min-h-[300px] justify-center">
                    
                    {/* SPINNER RENDER */}
                    {mode === 'spinner' && (
                        <div className="relative w-48 h-48 sm:w-64 sm:h-64 drop-shadow-[0_0_20px_rgba(129,140,248,0.2)]">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 text-white drop-shadow-md text-2xl">▼</div>
                            <svg viewBox="0 0 100 100" className="w-full h-full rounded-full border-4 border-zinc-800"
                                style={{ transform: `rotate(${rotation}deg)`, transition: isAnimating ? 'transform 2s cubic-bezier(0.1, 0.9, 0.2, 1)' : 'none' }}>
                                <path d="M 50 50 L 100 50 A 50 50 0 0 1 50 100 Z" fill="#f59e0b" /> {/* Yellow 90-180 */}
                                <path d="M 50 50 L 50 100 A 50 50 0 0 1 0 50 Z" fill="#10b981" /> {/* Green 180-270 */}
                                <path d="M 50 50 L 0 50 A 50 50 0 0 1 50 0 Z" fill="#3b82f6" /> {/* Blue 270-360 */}
                                <path d="M 50 50 L 50 0 A 50 50 0 0 1 100 50 Z" fill="#f43f5e" /> {/* Red 0-90 */}
                            </svg>
                            <div className="absolute inset-0 m-auto w-8 h-8 bg-zinc-900 rounded-full border-2 border-zinc-700" />
                        </div>
                    )}

                    {/* COIN RENDER */}
                    {mode === 'coin' && (
                        <div style={{ perspective: '1000px' }} className="w-48 h-48 sm:w-64 sm:h-64 drop-shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                            <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', transform: `rotateY(${coinRotY}deg)`, transition: isAnimating ? 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none' }}>
                                {/* Heads */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 to-amber-300 rounded-full border-[8px] border-amber-700 flex items-center justify-center backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                                    <span className="text-6xl font-black text-amber-800">H</span>
                                </div>
                                {/* Tails */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-slate-400 to-slate-200 rounded-full border-[8px] border-slate-500 flex items-center justify-center backface-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                    <span className="text-6xl font-black text-slate-600">T</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DIE RENDER */}
                    {mode === 'die' && (
                        <div className={`w-32 h-32 sm:w-40 sm:h-40 bg-zinc-100 rounded-3xl drop-shadow-[0_10px_20px_rgba(192,132,252,0.3)] flex items-center justify-center border-b-8 border-zinc-300 transition-transform ${dieShake ? 'animate-[pulse_0.1s_ease-in-out_infinite]' : ''}`}>
                            <span className="text-7xl font-black text-zinc-900">{currentDie}</span>
                        </div>
                    )}

                    {/* CONTROLS */}
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        <button onClick={() => simulate(1)} disabled={isAnimating} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-full transition-colors">
                            <RotateCw size={18} /> Simulate 1
                        </button>
                        <button onClick={() => simulate(10)} disabled={isAnimating} className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
                            +10
                        </button>
                        <button onClick={() => simulate(100)} disabled={isAnimating} className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
                            +100
                        </button>
                        <button onClick={clearData} disabled={isAnimating || totalSpins === 0} className="flex items-center gap-2 bg-rose-500/20 text-rose-400 hover:bg-rose-500/40 font-bold px-4 py-3 rounded-full transition-colors">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                {/* RIGHT: DATA DASHBOARD */}
                <div className="w-full md:w-1/2 bg-black/40 p-6 rounded-3xl border border-white/5 shadow-inner flex flex-col h-full min-h-[400px]">
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                        <h3 className="font-bold text-indigo-400 uppercase tracking-widest text-sm flex items-center gap-2">
                            <BarChart2 size={18} /> Experimental Data
                        </h3>
                        <div className="text-white font-bold bg-white/5 px-3 py-1 rounded-lg">Trials: {totalSpins}</div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-5">
                        {activeData.map(item => {
                            const percentage = totalSpins > 0 ? (item.count / totalSpins) * 100 : 0;
                            return (
                                <div key={item.label} className="relative w-full">
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span className="text-white uppercase tracking-wider">{item.label}</span>
                                        <span className="text-zinc-400 font-mono">{item.count} hits <span className="text-white ml-2">({percentage.toFixed(1)}%)</span></span>
                                    </div>
                                    <div className="w-full h-5 bg-black rounded-full overflow-hidden relative border border-white/5">
                                        <div 
                                            className="h-full rounded-full transition-all duration-500 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]"
                                            style={{ width: `${percentage}%`, backgroundColor: item.color }}
                                        />
                                        <div 
                                            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_white] z-10"
                                            style={{ left: `${item.expected}%`, opacity: totalSpins > 0 ? 0.9 : 0 }}
                                            title={`Theoretical Expected (${item.expected}%)`}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    
                    <div className="mt-8 p-4 bg-indigo-900/20 border border-indigo-500/20 rounded-xl text-xs text-indigo-200 text-center leading-relaxed font-medium">
                        Notice the glowing white vertical lines. That is the <strong>Theoretical Expected Probability</strong>. As you run more trials, the Law of Large Numbers dictates that your actual data will slowly align with those lines!
                    </div>
                </div>

            </div>
        </div>
    );
}