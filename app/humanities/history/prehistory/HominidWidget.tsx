"use client";
import { useState } from "react";
import { M } from "@/components/Math";
import { Flame, Brain, Hammer, Footprints } from "lucide-react";

const species = [
    {
        name: "Australopithecus",
        time: "4 - 2 MYA",
        brain: "400-500 cc",
        tool: "Oldowan (Choppers)",
        feat: "Bipedalism",
        desc: "The 'Southern Ape'. Walked upright but retained ape-like features. Used unmodified stones.",
        icon: Footprints
    },
    {
        name: "Homo erectus",
        time: "2 MYA - 100k",
        brain: "850-1100 cc",
        tool: "Acheulean (Handaxes)",
        feat: "Control of Fire",
        desc: "The first global traveler. Migrated out of Africa. Mastered fire to cook food, fueling brain growth.",
        icon: Flame
    },
    {
        name: "Homo neanderthalensis",
        time: "400k - 40k",
        brain: "1200-1450 cc",
        tool: "Mousterian (Flakes)",
        feat: "Burial / Clothing",
        desc: "Stocky and robust. Adapted for the Ice Age. Evidence of ritual burial suggests symbolic thought.",
        icon: Hammer
    },
    {
        name: "Homo sapiens",
        time: "300k - Present",
        brain: "1350 cc",
        tool: "Composite Tools",
        feat: "Art & Language",
        desc: "The 'Wise Man'. Complex language, abstract art, and the cognitive revolution.",
        icon: Brain
    }
];

export default function HominidWidget() {
  const [step, setStep] = useState(0);
  const current = species[step];

  return (
    <div className="bg-[#1c1917]/90 border border-stone-600 rounded-xl p-6 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        
        <div className="flex justify-between items-center mb-6 border-b border-stone-700 pb-4">
            <h3 className="font-bold text-stone-200 font-serif text-xl tracking-wide">Evolutionary Path</h3>
            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">{current.time}</span>
        </div>

        {/* INTERACTIVE SLIDER */}
        <div className="relative mb-8 px-2">
            <div className="h-1 bg-stone-700 rounded-full w-full absolute top-1/2 -translate-y-1/2" />
            <input 
                type="range" min="0" max="3" step="1"
                value={step} onChange={(e) => setStep(parseInt(e.target.value))}
                className="relative z-10 w-full h-6 bg-transparent appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-stone-900"
            />
            <div className="flex justify-between text-[10px] text-stone-600 font-mono mt-2 uppercase">
                <span>Lucy</span>
                <span>Erectus</span>
                <span>Neander</span>
                <span>Sapiens</span>
            </div>
        </div>

        {/* INFO CARD */}
        <div className="flex gap-6 animate-fadeIn">
            {/* Left: Icon/Visual */}
            <div className="flex-shrink-0 w-20 h-20 bg-stone-800 rounded-full flex items-center justify-center border-2 border-stone-600 shadow-inner">
                <current.icon size={40} className="text-amber-600" />
            </div>

            {/* Right: Data */}
            <div className="flex-1">
                <h2 className="text-2xl font-black text-amber-500 mb-1">{current.name}</h2>
                <div className="flex gap-3 text-xs font-mono text-stone-400 mb-3">
                    <span className="bg-black/30 px-2 py-1 rounded border border-stone-700"><span className="text-stone-500">BRAIN:</span> {current.brain}</span>
                    <span className="bg-black/30 px-2 py-1 rounded border border-stone-700"><span className="text-stone-500">TOOL:</span> {current.tool}</span>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed">
                    {current.desc}
                </p>
                <div className="mt-3 text-xs text-amber-700 font-bold uppercase tracking-widest flex items-center gap-2">
                    KEY TRAIT: <span className="text-amber-500">{current.feat}</span>
                </div>
            </div>
        </div>

    </div>
  );
}