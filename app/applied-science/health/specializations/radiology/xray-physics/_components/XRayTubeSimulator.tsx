"use client";
import React, { useState } from 'react';
import { Activity, Zap, Sun, AlertTriangle } from 'lucide-react';

export default function XRayTubeSimulator() {
    // kVp controls beam energy (Penetration / Contrast)
    // Range: 50kVp (High Contrast, Low Penetration) to 120kVp (Low Contrast, High Penetration)
    const [kvp, setKvp] = useState(70); 
    
    // mAs controls beam quantity (Exposure / Density)
    // Range: 1mAs (Underexposed/Noisy) to 100mAs (Overexposed/Dark)
    const [mas, setMas] = useState(10);

    // --- PHYSICS CALCULATIONS FOR UI ---
    
    // Image Density (Overall darkness). Driven primarily by mAs, but kVp has a massive exponential effect (15% rule).
    const exposureFactor = (mas / 10) * Math.pow((kvp / 70), 2);
    
    // Base brightness of the background (air/soft tissue)
    let bgBrightness = 255 - (exposureFactor * 100);
    bgBrightness = Math.max(0, Math.min(255, bgBrightness)); // Clamp 0-255

    // Contrast logic (Difference between bone and tissue). 
    // Low kVp = High photoelectric absorption in bone = High Contrast (Bone stays white)
    // High kVp = Lots of Compton scatter = Low Contrast (Bone turns gray)
    const boneAbsorption = Math.max(0.1, 1 - (kvp - 50) / 100); 
    const boneBrightness = bgBrightness + (255 - bgBrightness) * boneAbsorption;

    // Noise/Quantum Mottle (Low photon count means a grainy image)
    const noiseOpacity = Math.max(0, 1 - (mas / 20));

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans select-none flex flex-col md:flex-row">
            
            {/* LEFT: Control Console */}
            <div className="w-full md:w-1/3 p-6 bg-black/40 border-b md:border-b-0 md:border-r border-white/5 flex flex-col gap-8">
                <div>
                    <div className="flex items-center gap-2 text-cyan-400 mb-1">
                        <Zap size={18} />
                        <h3 className="font-bold tracking-wide">Tube Potential</h3>
                    </div>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-4">kVp (Beam Quality)</p>
                    
                    <div className="flex justify-between text-xs font-mono text-white mb-2">
                        <span>50 kVp</span>
                        <span className="text-cyan-400 font-bold">{kvp} kVp</span>
                        <span>120 kVp</span>
                    </div>
                    <input 
                        type="range" min="50" max="120" step="1" value={kvp} onChange={(e) => setKvp(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                    <div className="flex justify-between text-[9px] text-zinc-500 mt-2 uppercase tracking-widest">
                        <span>High Contrast</span>
                        <span>Low Contrast</span>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2 text-amber-400 mb-1">
                        <Activity size={18} />
                        <h3 className="font-bold tracking-wide">Tube Current</h3>
                    </div>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-4">mAs (Beam Quantity)</p>
                    
                    <div className="flex justify-between text-xs font-mono text-white mb-2">
                        <span>1 mAs</span>
                        <span className="text-amber-400 font-bold">{mas} mAs</span>
                        <span>100 mAs</span>
                    </div>
                    <input 
                        type="range" min="1" max="100" step="1" value={mas} onChange={(e) => setMas(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                    <div className="flex justify-between text-[9px] text-zinc-500 mt-2 uppercase tracking-widest">
                        <span>Underexposed (Noisy)</span>
                        <span>Overexposed (Dark)</span>
                    </div>
                </div>

                <div className="mt-auto p-4 bg-red-950/20 border border-red-500/20 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        <strong>ALARA Principle:</strong> As Low As Reasonably Achievable. Higher mAs increases patient radiation dose linearly.
                    </p>
                </div>
            </div>

            {/* RIGHT: Physics & Output View */}
            <div className="w-full md:w-2/3 flex flex-col">
                
                {/* Top: The X-Ray Tube Diagram */}
                <div className="h-48 border-b border-white/5 bg-[#050508] relative overflow-hidden flex flex-col items-center justify-center p-4">
                    <div className="absolute top-2 left-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Vacuum Tube Dynamics</div>
                    
                    <div className="relative w-full max-w-sm h-full flex items-center justify-between mt-4">
                        {/* Cathode (-) */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-12 bg-zinc-800 border-2 border-zinc-600 rounded-l-full relative flex items-center justify-center">
                                <div className="w-2 h-6 bg-amber-500 animate-pulse rounded-full shadow-[0_0_10px_#f59e0b]" />
                            </div>
                            <span className="text-[10px] font-mono text-amber-400">Cathode (-)</span>
                        </div>

                        {/* Electron Stream */}
                        <div className="flex-1 h-8 relative flex items-center overflow-hidden mx-2">
                            {/* Visualizing electron flow speed based on kVp */}
                            <div 
                                className="absolute w-[200%] h-[2px] bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,#38bdf8_10px,#38bdf8_20px)]"
                                style={{ animation: `slide ${150 - kvp}ms linear infinite` }}
                            />
                        </div>

                        {/* Anode Target (+) */}
                        <div className="flex flex-col items-center gap-2">
                            {/* Angled Tungsten Target */}
                            <div className="w-12 h-16 bg-zinc-800 border-2 border-zinc-600 rounded-r flex items-center justify-start overflow-hidden relative">
                                <div className="absolute w-16 h-24 bg-zinc-300 -rotate-12 translate-x-2 shadow-inner border-l-4 border-cyan-400" />
                            </div>
                            <span className="text-[10px] font-mono text-cyan-400">Anode (+)</span>
                        </div>
                    </div>

                    {/* Photon Spray hitting patient */}
                    <div className="absolute bottom-0 left-1/2 w-32 h-16 bg-gradient-to-b from-cyan-400/40 to-transparent -translate-x-1/2" style={{ opacity: mas / 100 }} />
                </div>

                {/* Bottom: The Digital Radiograph */}
                <div className="flex-1 bg-black p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                        <Sun size={14} className="text-zinc-500" />
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Detector Output</span>
                    </div>

                    {/* The Radiograph Viewport */}
                    <div 
                        className="relative w-64 h-64 rounded-xl border-4 border-zinc-900 shadow-2xl overflow-hidden flex items-center justify-center"
                        style={{ backgroundColor: `rgb(${bgBrightness}, ${bgBrightness}, ${bgBrightness})` }}
                    >
                        {/* Simulated Bone */}
                        <div 
                            className="w-16 h-48 rounded-[40px] blur-[1px] shadow-inner"
                            style={{ backgroundColor: `rgb(${boneBrightness}, ${boneBrightness}, ${boneBrightness})` }}
                        />
                        {/* Simulated Joint */}
                        <div 
                            className="absolute top-8 w-20 h-16 rounded-[30px] blur-[1px] shadow-inner"
                            style={{ backgroundColor: `rgb(${boneBrightness}, ${boneBrightness}, ${boneBrightness})` }}
                        />

                        {/* Quantum Mottle (Noise) Overlay */}
                        <div 
                            className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat opacity-[var(--noise)] mix-blend-overlay pointer-events-none"
                            style={{ '--noise': noiseOpacity } as any}
                        />
                    </div>

                    {/* Diagnostics overlay */}
                    <div className="absolute bottom-4 right-4 text-right z-20">
                        <div className="text-xs font-mono text-white font-bold drop-shadow-md">EXP Index: {Math.round(exposureFactor * 100)}</div>
                        <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                            {exposureFactor < 0.3 ? 'Underexposed' : exposureFactor > 3 ? 'Overexposed' : 'Optimal'}
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes slide {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
            `}} />
        </div>
    );
}