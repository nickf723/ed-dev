"use client";
import React, { useState } from 'react';
import { ScanLine, Magnet, Waves } from 'lucide-react';

export default function ImagingLab() {
  const [modality, setModality] = useState<'xray' | 'mri' | 'ultrasound'>('xray');

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-black/80 border-b border-neutral-800 gap-4">
            <div className="text-xs font-bold uppercase text-white flex items-center gap-2 tracking-widest">
                <ScanLine size={14} /> The Modality Matrix
            </div>
            
            <div className="flex gap-2 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
                <button onClick={() => setModality('xray')} className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${modality === 'xray' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}>
                    <Magnet size={12}/> X-Ray
                </button>
                <button onClick={() => setModality('mri')} className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${modality === 'mri' ? 'bg-indigo-600 text-white' : 'text-neutral-500 hover:text-white'}`}>
                    <Magnet size={12}/> MRI
                </button>
                <button onClick={() => setModality('ultrasound')} className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${modality === 'ultrasound' ? 'bg-cyan-600 text-white' : 'text-neutral-500 hover:text-white'}`}>
                    <Waves size={12}/> Ultrasound
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* VISUALIZER */}
            <div className="bg-[#050505] relative p-8 flex justify-center items-center min-h-[350px] overflow-hidden">
                 
                 {/* X-RAY VIEW (Focuses on dense bone, dark tissue) */}
                 {modality === 'xray' && (
                     <svg viewBox="0 0 200 300" className="w-full max-w-[200px] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-in fade-in zoom-in-95 duration-500">
                         {/* Soft Tissue Ghost */}
                         <path d="M 50 20 C 20 50, 40 150, 60 280 C 100 290, 100 290, 140 280 C 160 150, 180 50, 150 20 Z" fill="rgba(255, 255, 255, 0.05)" />
                         {/* Dense Bone (Femur/Tibia concept) */}
                         <path d="M 80 30 C 80 10, 120 10, 120 30 L 110 130 C 130 140, 130 160, 110 170 L 120 270 C 120 290, 80 290, 80 270 L 90 170 C 70 160, 70 140, 90 130 Z" fill="#fff" opacity="0.9" />
                         {/* Joint Space */}
                         <circle cx="100" cy="150" r="15" fill="#050505" />
                     </svg>
                 )}

                 {/* MRI VIEW (Focuses on soft tissue, water gradients, brain-like folds) */}
                 {modality === 'mri' && (
                     <svg viewBox="0 0 200 300" className="w-full max-w-[200px] animate-in fade-in zoom-in-95 duration-500">
                         {/* Detailed Soft Tissue Layers */}
                         <path d="M 50 20 C 20 50, 40 150, 60 280 C 100 290, 100 290, 140 280 C 160 150, 180 50, 150 20 Z" fill="url(#mriGrad1)" />
                         <path d="M 70 40 C 40 80, 60 150, 80 260 C 100 270, 100 270, 120 260 C 140 150, 160 80, 130 40 Z" fill="url(#mriGrad2)" opacity="0.8" />
                         {/* Water/Fluid Highlight (Ligaments/Cartilage) */}
                         <ellipse cx="100" cy="150" rx="30" ry="20" fill="#a5b4fc" opacity="0.6" filter="blur(2px)" />
                         
                         <defs>
                             <linearGradient id="mriGrad1" x1="0" y1="0" x2="1" y2="1">
                                 <stop offset="0%" stopColor="#1e1b4b" />
                                 <stop offset="100%" stopColor="#312e81" />
                             </linearGradient>
                             <linearGradient id="mriGrad2" x1="1" y1="0" x2="0" y2="1">
                                 <stop offset="0%" stopColor="#4338ca" />
                                 <stop offset="100%" stopColor="#e0e7ff" />
                             </linearGradient>
                         </defs>
                     </svg>
                 )}

                 {/* ULTRASOUND VIEW (Grainy, cone-shaped echo sweep) */}
                 {modality === 'ultrasound' && (
                     <div className="relative w-full h-full flex justify-center items-start pt-10 animate-in fade-in zoom-in-95 duration-500">
                         {/* Transducer origin */}
                         <div className="absolute top-8 w-16 h-4 bg-neutral-300 rounded-full z-20"></div>
                         
                         {/* The Echo Cone */}
                         <svg viewBox="0 0 200 300" className="w-full max-w-[250px] relative z-10" preserveAspectRatio="none">
                             {/* Cone clipping path */}
                             <clipPath id="coneClip">
                                 <polygon points="80,0 120,0 200,300 0,300" />
                             </clipPath>
                             
                             <g clipPath="url(#coneClip)">
                                 {/* Grainy background simulation */}
                                 <rect width="200" height="300" fill="#082f49" />
                                 <circle cx="100" cy="150" r="40" fill="#0ea5e9" opacity="0.3" filter="blur(8px)" />
                                 <circle cx="120" cy="120" r="15" fill="#000" opacity="0.6" filter="blur(4px)" /> {/* Fluid cyst/vessel */}
                                 <path d="M 0 200 Q 100 180 200 220" stroke="#bae6fd" strokeWidth="8" fill="none" opacity="0.5" filter="blur(3px)" /> {/* Fascia layer */}
                             </g>
                         </svg>
                     </div>
                 )}
            </div>

            {/* DATA PANEL */}
            <div className="p-8 border-l border-neutral-800 flex flex-col justify-center gap-6 bg-neutral-900/30">
                
                {modality === 'xray' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2">
                        <h4 className="text-white font-black mb-2 text-2xl tracking-tight">Radiography (X-Ray)</h4>
                        <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4 border-b border-neutral-800 pb-2">Physics: Electromagnetic Attenuation</div>
                        <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                            Shoots high-energy photons through the body. Dense materials (like calcium in bones) absorb the photons, casting a bright white "shadow" on the film behind the patient. 
                        </p>
                        <ul className="text-xs text-neutral-500 space-y-1 font-mono">
                            <li><strong className="text-white">Best for:</strong> Fractures, lung pneumonia, dental cavities.</li>
                            <li><strong className="text-white">Drawback:</strong> Uses ionizing radiation. Poor soft-tissue contrast.</li>
                        </ul>
                    </div>
                )}

                {modality === 'mri' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2">
                        <h4 className="text-indigo-400 font-black mb-2 text-2xl tracking-tight">Magnetic Resonance</h4>
                        <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-4 border-b border-neutral-800 pb-2">Physics: Proton Spin Alignment</div>
                        <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                            Uses a massive superconducting magnet to force the hydrogen protons in your body's water to align. It then knocks them over with a radio wave and listens to the "echo" as they stand back up.
                        </p>
                        <ul className="text-xs text-indigo-300/70 space-y-1 font-mono">
                            <li><strong className="text-indigo-200">Best for:</strong> Brain tissue, spinal cords, torn ligaments, tumors.</li>
                            <li><strong className="text-indigo-200">Drawback:</strong> Extremely expensive, slow, and dangerous if you have metal implants.</li>
                        </ul>
                    </div>
                )}

                {modality === 'ultrasound' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2">
                        <h4 className="text-cyan-400 font-black mb-2 text-2xl tracking-tight">Sonography</h4>
                        <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-4 border-b border-neutral-800 pb-2">Physics: High-Frequency Acoustics</div>
                        <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                            Functions exactly like submarine sonar. A crystal in the wand vibrates, sending sound waves into the body. The machine calculates depth based on how long the echoes take to bounce back.
                        </p>
                        <ul className="text-xs text-cyan-300/70 space-y-1 font-mono">
                            <li><strong className="text-cyan-200">Best for:</strong> Real-time moving organs (heart), fluid cysts, fetal development.</li>
                            <li><strong className="text-cyan-200">Drawback:</strong> Cannot penetrate bone or air (lungs).</li>
                        </ul>
                    </div>
                )}

            </div>
        </div>
    </div>
  );
}