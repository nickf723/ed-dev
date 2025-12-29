"use client";
import { useState } from "react";
import { Compass, Sword, Home, Trophy, Skull } from "lucide-react";

const steps = [
    { id: 1, act: "Departure", label: "Ordinary World", icon: Home, desc: "The hero is introduced in their normal surroundings." },
    { id: 2, act: "Departure", label: "Call to Adventure", icon: Compass, desc: "Something shakes up the situation. The hero must face change." },
    { id: 3, act: "Departure", label: "Refusal of Call", icon: Skull, desc: "The hero fears the unknown and tries to turn away." },
    { id: 4, act: "Departure", label: "Meeting the Mentor", icon: Trophy, desc: "The hero meets a seasoned traveler who gives training or equipment." },
    { id: 5, act: "Departure", label: "Crossing Threshold", icon: Compass, desc: "The hero commits to leaving the Ordinary World." },
    { id: 6, act: "Initiation", label: "Tests, Allies, Enemies", icon: Sword, desc: "The hero explores the Special World, faces trials, and makes friends." },
    { id: 7, act: "Initiation", label: "Approach", icon: Compass, desc: "Preparation for the major challenge in the Special World." },
    { id: 8, act: "Initiation", label: "The Ordeal", icon: Skull, desc: "The central crisis. The hero faces their greatest fear and tastes death." },
    { id: 9, act: "Initiation", label: "Reward", icon: Trophy, desc: "The hero seizes the sword/elixir having survived the ordeal." },
    { id: 10, act: "Return", label: "The Road Back", icon: Compass, desc: "The hero is driven to complete the adventure and return home." },
    { id: 11, act: "Return", label: "Resurrection", icon: Skull, desc: "The final exam. A severe test where the hero is purified." },
    { id: 12, act: "Return", label: "Return with Elixir", icon: Home, desc: "The hero returns home changed, bearing the treasure/wisdom." },
];

export default function HeroJourney() {
  const [activeStep, setActiveStep] = useState(0); // Index 0-11
  const current = steps[activeStep];

  return (
    <div className="bg-[#271c19]/90 border border-amber-900/50 rounded-xl p-6 backdrop-blur-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-amber-100 font-serif tracking-wide">The Hero's Journey</h3>
            <span className="text-xs font-mono text-amber-600 uppercase">Monomyth</span>
        </div>

        {/* CIRCULAR NAVIGATOR */}
        <div className="relative h-48 w-full mb-6 flex items-center justify-center">
            {/* The Circle Track */}
            <div className="absolute w-40 h-40 rounded-full border-2 border-amber-900/30 border-dashed" />
            
            {/* Center Info */}
            <div className="absolute text-center w-32">
                <div className="text-[10px] font-bold text-amber-600 uppercase mb-1">{current.act}</div>
                <div className="text-2xl text-amber-500"><current.icon className="mx-auto" /></div>
            </div>

            {/* The Dots */}
            {steps.map((step, i) => {
                const angle = (i / 12) * 2 * Math.PI - Math.PI / 2; // Start at top
                const r = 80; // Radius
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                
                return (
                    <button
                        key={step.id}
                        onClick={() => setActiveStep(i)}
                        className={`absolute w-4 h-4 rounded-full border transition-all duration-300
                            ${activeStep === i 
                                ? "bg-amber-500 border-amber-200 scale-150 shadow-[0_0_10px_orange]" 
                                : "bg-[#1c1917] border-amber-900/50 hover:bg-amber-900"
                            }
                        `}
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                        title={step.label}
                    />
                );
            })}
        </div>

        {/* TEXT CONTENT */}
        <div className="text-center animate-fadeIn min-h-[100px]">
            <div className="text-xs font-mono text-stone-500 mb-2">STEP {current.id}: {current.label}</div>
            <p className="text-sm text-stone-300 leading-relaxed italic font-serif">
                "{current.desc}"
            </p>
        </div>
    </div>
  );
}