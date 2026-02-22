"use client";
import React, { useState } from 'react';
import { Leaf, Bug, Wheat, ArrowRightLeft, Skull, ShieldAlert, Globe } from 'lucide-react';

export default function ExchangeLab() {
  const [category, setCategory] = useState<'crops' | 'livestock' | 'disease'>('crops');

  const exchangeData = {
    crops: {
      newWorld: ['Potatoes', 'Maize (Corn)', 'Tomatoes', 'Cacao (Chocolate)', 'Tobacco', 'Vanilla'],
      oldWorld: ['Wheat', 'Sugar Cane', 'Coffee', 'Rice', 'Apples', 'Citrus'],
      desc: 'The global diet was rewritten. The caloric density of New World potatoes fueled a massive population boom in Europe, while Old World sugar cane became the devastating cash crop of the Americas.'
    },
    livestock: {
      newWorld: ['Llamas', 'Alpacas', 'Turkeys', 'Guinea Pigs'],
      oldWorld: ['Horses', 'Cattle', 'Pigs', 'Sheep', 'Chickens'],
      desc: 'The Americas had almost no large beasts of burden. The introduction of the Old World horse completely transformed the hunting and warfare cultures of the Great Plains Native Americans.'
    },
    disease: {
      newWorld: ['Syphilis (Debated)'],
      oldWorld: ['Smallpox', 'Measles', 'Influenza', 'Malaria', 'Typhus'],
      desc: 'The Great Dying. Having evolved in isolation from Old World domesticated animals, Indigenous Americans had no immunity to zoonotic diseases. Up to 90% of the native population perished.'
    }
  };

  const activeData = exchangeData[category];

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-black/60 border-b border-neutral-800 gap-4">
            <div className="text-xs font-bold uppercase text-emerald-500 flex items-center gap-2 tracking-widest">
                <ArrowRightLeft size={14} /> The Columbian Exchange (1492)
            </div>
            
            <div className="flex gap-2 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
                <button onClick={() => setCategory('crops')} className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${category === 'crops' ? 'bg-emerald-600 text-white' : 'text-neutral-500 hover:text-white'}`}>
                    <Leaf size={12}/> Flora
                </button>
                <button onClick={() => setCategory('livestock')} className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${category === 'livestock' ? 'bg-amber-600 text-white' : 'text-neutral-500 hover:text-white'}`}>
                    <Wheat size={12}/> Fauna
                </button>
                <button onClick={() => setCategory('disease')} className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${category === 'disease' ? 'bg-red-600 text-white' : 'text-neutral-500 hover:text-white'}`}>
                    <Bug size={12}/> Pathogens
                </button>
            </div>
        </div>

        <div className="p-8 bg-[#030a06] relative overflow-hidden flex flex-col items-center">
            {/* Background Atlantic Ocean representation */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_100%)]" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl relative z-10">
                {/* NEW WORLD (Americas) */}
                <div className="flex flex-col bg-black/40 border border-neutral-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-emerald-400 font-black tracking-widest uppercase mb-6 text-center border-b border-emerald-900/50 pb-4">
                        The Americas<br/><span className="text-[10px] text-neutral-500 font-medium">Exports to Afro-Eurasia</span>
                    </h3>
                    <ul className="space-y-3">
                        {activeData.newWorld.map((item, i) => (
                            <li key={i} className="text-sm font-bold text-white bg-neutral-900/50 px-3 py-2 rounded flex items-center gap-3">
                                <ArrowRightLeft size={14} className="text-emerald-500 shrink-0"/> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* THE ATLANTIC CROSSING */}
                <div className="flex flex-col items-center justify-center text-center opacity-80 py-8 md:py-0">
                    <div className="w-full h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-amber-500/0 absolute top-1/2 -translate-y-1/2 hidden md:block" />
                    <div className="bg-[#030a06] p-4 rounded-full border border-neutral-800 relative z-10 animate-[pulse_2s_ease-in-out_infinite]">
                        {category === 'disease' ? <Skull size={32} className="text-red-500"/> : <Globe size={32} className="text-emerald-500"/>}
                    </div>
                </div>

                {/* OLD WORLD (Afro-Eurasia) */}
                <div className="flex flex-col bg-black/40 border border-neutral-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-amber-400 font-black tracking-widest uppercase mb-6 text-center border-b border-amber-900/50 pb-4">
                        Afro-Eurasia<br/><span className="text-[10px] text-neutral-500 font-medium">Exports to The Americas</span>
                    </h3>
                    <ul className="space-y-3">
                        {activeData.oldWorld.map((item, i) => (
                            <li key={i} className="text-sm font-bold text-white bg-neutral-900/50 px-3 py-2 rounded flex items-center gap-3">
                                <ArrowRightLeft size={14} className="text-amber-500 shrink-0"/> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Explanation Banner */}
            <div className="mt-8 max-w-4xl w-full bg-emerald-950/20 border border-emerald-900/50 p-5 rounded-xl flex gap-4 items-start">
                <ShieldAlert size={20} className={`shrink-0 mt-0.5 ${category === 'disease' ? 'text-red-500' : 'text-emerald-500'}`} />
                <p className="text-sm text-neutral-300 leading-relaxed">
                    {activeData.desc}
                </p>
            </div>
        </div>
    </div>
  );
}