"use client";
import React, { useState, useCallback } from 'react';
import { ScatterChart, Play, RefreshCw, Crosshair, MapPin } from 'lucide-react';

type Point = { x: number; y: number; centroidId: number | null };
type Centroid = { id: number; x: number; y: number; color: string };

const COLORS = ['#06b6d4', '#8b5cf6', '#f59e0b']; // Cyan, Violet, Amber

export default function KMeansLab() {
    const [points, setPoints] = useState<Point[]>([]);
    const [centroids, setCentroids] = useState<Centroid[]>([]);
    const [step, setStep] = useState<'generate' | 'init' | 'assign' | 'update'>('generate');

    // 1. Generate Random Data
    const generateData = useCallback(() => {
        const newPoints = Array.from({ length: 60 }).map(() => ({
            x: Math.random() * 90 + 5, // Keep within 5-95% bounds
            y: Math.random() * 90 + 5,
            centroidId: null
        }));
        setPoints(newPoints);
        setCentroids([]);
        setStep('init');
    }, []);

    // 2. Initialize k Centroids
    const initCentroids = () => {
        const k = 3;
        const newCentroids = Array.from({ length: k }).map((_, i) => ({
            id: i,
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            color: COLORS[i]
        }));
        setCentroids(newCentroids);
        // Reset points
        setPoints(pts => pts.map(p => ({ ...p, centroidId: null })));
        setStep('assign');
    };

    // 3. Assign Points to Nearest Centroid
    const assignPoints = () => {
        setPoints(pts => pts.map(p => {
            let minDist = Infinity;
            let closestId = null;
            centroids.forEach(c => {
                const dist = Math.sqrt(Math.pow(p.x - c.x, 2) + Math.pow(p.y - c.y, 2));
                if (dist < minDist) {
                    minDist = dist;
                    closestId = c.id;
                }
            });
            return { ...p, centroidId: closestId };
        }));
        setStep('update');
    };

    // 4. Update Centroid Positions to Mean
    const updateCentroids = () => {
        setCentroids(cents => cents.map(c => {
            const assignedPts = points.filter(p => p.centroidId === c.id);
            if (assignedPts.length === 0) return c; // Don't move if empty
            
            const avgX = assignedPts.reduce((sum, p) => sum + p.x, 0) / assignedPts.length;
            const avgY = assignedPts.reduce((sum, p) => sum + p.y, 0) / assignedPts.length;
            return { ...c, x: avgX, y: avgY };
        }));
        setStep('assign');
    };

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-cyan-950/30 border-b border-cyan-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                        <ScatterChart size={18} className="text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">K-Means Clustering</h3>
                        <p className="text-[10px] text-cyan-300/60 font-mono uppercase tracking-widest">Unsupervised Learning</p>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col items-center">
                {/* Visual Sandbox */}
                <div className="w-full max-w-lg aspect-square bg-zinc-900 border border-zinc-800 rounded-xl relative overflow-hidden mb-6 shadow-inner">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                        {/* Draw connection lines first so they are underneath */}
                        {points.map((p, i) => {
                            if (p.centroidId === null) return null;
                            const c = centroids.find(cent => cent.id === p.centroidId);
                            if (!c) return null;
                            return (
                                <line 
                                    key={`line-${i}`} x1={p.x} y1={p.y} x2={c.x} y2={c.y} 
                                    stroke={c.color} strokeWidth="0.2" className="opacity-40 transition-all duration-500"
                                />
                            );
                        })}

                        {/* Draw Points */}
                        {points.map((p, i) => (
                            <circle 
                                key={`pt-${i}`} cx={p.x} cy={p.y} r="1"
                                fill={p.centroidId !== null ? centroids.find(c => c.id === p.centroidId)?.color : '#52525b'}
                                className="transition-colors duration-500"
                            />
                        ))}

                        {/* Draw Centroids */}
                        {centroids.map(c => (
                            <g key={`cent-${c.id}`} style={{ transform: `translate(${c.x}px, ${c.y}px)`, transition: 'all 0.5s ease-in-out' }}>
                                <circle cx="0" cy="0" r="3" fill="none" stroke={c.color} strokeWidth="0.5" className="animate-ping opacity-50" />
                                <circle cx="0" cy="0" r="2" fill={c.color} />
                                <path d="M -3 0 L 3 0 M 0 -3 L 0 3" stroke="#fff" strokeWidth="0.5" />
                            </g>
                        ))}
                    </svg>
                    
                    {points.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-600 font-mono text-xs uppercase tracking-widest">
                            Awaiting Data Generation...
                        </div>
                    )}
                </div>

                {/* Control Panel */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                    {step === 'generate' || points.length === 0 ? (
                        <button onClick={generateData} className="col-span-2 flex justify-center items-center gap-2 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-xl text-cyan-300 font-bold text-sm uppercase tracking-widest transition-colors">
                            <RefreshCw size={16} /> Generate Raw Data
                        </button>
                    ) : step === 'init' ? (
                        <button onClick={initCentroids} className="col-span-2 flex justify-center items-center gap-2 py-3 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/50 rounded-xl text-indigo-300 font-bold text-sm uppercase tracking-widest transition-colors">
                            <Crosshair size={16} /> Drop Centroids (k=3)
                        </button>
                    ) : (
                        <>
                            <button 
                                onClick={assignPoints} disabled={step !== 'assign'}
                                className={`flex justify-center items-center gap-2 py-3 border rounded-xl font-bold text-xs uppercase tracking-widest transition-colors ${step === 'assign' ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}
                            >
                                <MapPin size={14} /> 1. Assign Points
                            </button>
                            <button 
                                onClick={updateCentroids} disabled={step !== 'update'}
                                className={`flex justify-center items-center gap-2 py-3 border rounded-xl font-bold text-xs uppercase tracking-widest transition-colors ${step === 'update' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}
                            >
                                <Play size={14} /> 2. Move Centroids
                            </button>
                            <button onClick={generateData} className="col-span-2 mt-2 flex justify-center items-center gap-2 py-2 text-zinc-500 hover:text-zinc-300 font-mono text-xs uppercase tracking-widest transition-colors">
                                <RefreshCw size={12} /> Reset Environment
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}