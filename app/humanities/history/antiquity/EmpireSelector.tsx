"use client";
import { useState } from "react";
import { Landmark, Pyramid, Scale, Scroll, Crown } from "lucide-react";

const empires = [
    {
        id: "sumer",
        name: "Sumeria",
        region: "Mesopotamia",
        dates: "c. 4500 – 1900 BC",
        icon: Scroll,
        color: "text-amber-500",
        wonder: "Ziggurat of Ur",
        tech: "Cuneiform Writing",
        desc: "The cradle of civilization. Inventors of the wheel, writing, and the first city-states between the Tigris and Euphrates."
    },
    {
        id: "egypt",
        name: "Ancient Egypt",
        region: "Nile Valley",
        dates: "c. 3100 – 30 BC",
        icon: Pyramid,
        color: "text-yellow-500",
        wonder: "Great Pyramid",
        tech: "Papyrus / Medicine",
        desc: "A civilization of eternal stability. Known for monumental architecture, complex religion, and a Pharaonic god-king."
    },
    {
        id: "greece",
        name: "Classical Greece",
        region: "Mediterranean",
        dates: "c. 800 – 146 BC",
        icon: Landmark,
        color: "text-sky-400",
        wonder: "The Parthenon",
        tech: "Democracy / Logic",
        desc: "The birthplace of Western philosophy, democracy, and drama. A collection of independent city-states like Athens and Sparta."
    },
    {
        id: "rome",
        name: "Roman Empire",
        region: "Europe/Africa/Asia",
        dates: "c. 27 BC – 476 AD",
        icon: Crown,
        color: "text-red-500",
        wonder: "The Colosseum",
        tech: "Concrete / Roads",
        desc: "The great organizer. A military and engineering powerhouse that connected the known world through law and infrastructure."
    }
];

export default function EmpireSelector() {
  const [activeId, setActiveId] = useState("sumer");
  const current = empires.find(e => e.id === activeId) || empires[0];

  return (
    <div className="bg-[#1e293b]/80 border border-slate-600 rounded-xl p-6 backdrop-blur-md shadow-2xl">
        
        {/* TAB HEADER */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-white/10">
            {empires.map((emp) => (
                <button
                    key={emp.id}
                    onClick={() => setActiveId(emp.id)}
                    className={`
                        px-4 py-2 rounded-t-lg text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap
                        ${activeId === emp.id 
                            ? `bg-white/10 text-white border-b-2 ${emp.color.replace('text', 'border')}` 
                            : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                        }
                    `}
                >
                    {emp.name}
                </button>
            ))}
        </div>

        {/* CONTENT CARD */}
        <div className="flex flex-col md:flex-row gap-6 animate-fadeIn">
            
            {/* Visual Icon */}
            <div className={`
                w-24 h-24 flex-shrink-0 rounded-full border-4 border-white/10 flex items-center justify-center 
                bg-gradient-to-br from-white/5 to-black/40 shadow-inner
            `}>
                <current.icon size={48} className={current.color} />
            </div>

            {/* Stats */}
            <div className="flex-1 space-y-4">
                <div>
                    <h2 className={`text-3xl font-black font-serif text-white`}>{current.name}</h2>
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">{current.dates} // {current.region}</div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-slate-600 pl-4">
                    {current.desc}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-black/20 p-3 rounded border border-white/5">
                        <div className="text-[10px] text-slate-500 font-bold mb-1">KEY WONDER</div>
                        <div className={`text-sm font-serif ${current.color}`}>{current.wonder}</div>
                    </div>
                    <div className="bg-black/20 p-3 rounded border border-white/5">
                        <div className="text-[10px] text-slate-500 font-bold mb-1">CONTRIBUTION</div>
                        <div className="text-sm font-serif text-white">{current.tech}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}