"use client";
import React, { useState } from 'react';
import { Library, Zap, Sun, Skull, Book, Shield, Waves, Flame, Eye, Feather } from 'lucide-react';

type Culture = 'greek' | 'norse' | 'egyptian';

const PANTHEONS = {
    greek: {
        name: 'Hellenic (Greek)',
        color: 'amber',
        desc: 'Based in the Mediterranean. Gods are deeply human, prone to jealousy, passion, and politics.',
        gods: [
            { name: 'Zeus', title: 'King of Olympus', domain: 'Sky, Thunder, Law', icon: Zap, color: 'amber' },
            { name: 'Athena', title: 'The Strategist', domain: 'Wisdom, Warfare, Crafts', icon: Shield, color: 'emerald' },
            { name: 'Hades', title: 'The Unseen One', domain: 'The Underworld, Wealth', icon: Skull, color: 'zinc' },
            { name: 'Poseidon', title: 'Earth-Shaker', domain: 'The Sea, Earthquakes, Horses', icon: Waves, color: 'sky' }
        ]
    },
    norse: {
        name: 'Nordic (Norse)',
        color: 'sky',
        desc: 'Forged in harsh winters. Gods are mortal, fated to die at Ragnarök. Heavy emphasis on bravery and fate.',
        gods: [
            { name: 'Odin', title: 'The All-Father', domain: 'Wisdom, War, Poetry, Death', icon: Eye, color: 'indigo' },
            { name: 'Thor', title: 'The Protector', domain: 'Thunder, Strength, Humanity', icon: Zap, color: 'sky' },
            { name: 'Freyja', title: 'Lady of Fólkvangr', domain: 'Love, Beauty, War, Seidr (Magic)', icon: Flame, color: 'rose' },
            { name: 'Loki', title: 'The Trickster', domain: 'Mischief, Chaos, Change', icon: Book, color: 'emerald' }
        ]
    },
    egyptian: {
        name: 'Kemetic (Egyptian)',
        color: 'yellow',
        desc: 'Centered around the reliable flooding of the Nile. Heavy focus on Ma\'at (cosmic order), life after death, and the Sun.',
        gods: [
            { name: 'Ra', title: 'The Sun God', domain: 'Sun, Order, Kingship', icon: Sun, color: 'yellow' },
            { name: 'Anubis', title: 'Guide of Souls', domain: 'Embalming, Funerals, Afterlife', icon: Skull, color: 'zinc' },
            { name: 'Thoth', title: 'The Scribe', domain: 'Writing, Magic, Wisdom, Moon', icon: Feather, color: 'cyan' },
            { name: 'Isis', title: 'Mother of Gods', domain: 'Magic, Healing, Protection', icon: Shield, color: 'fuchsia' }
        ]
    }
};

export default function PantheonDatabase() {
    const [active, setActive] = useState<Culture>('greek');
    const currentData = PANTHEONS[active];

    return (
        <div className="w-full bg-[#0a0f16]/90 backdrop-blur-xl border border-indigo-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans">
            
            {/* Header / Tabs */}
            <div className="bg-indigo-950/30 border-b border-indigo-500/20 p-5">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg">
                        <Library size={18} className="text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Pantheon Archive</h3>
                        <p className="text-[10px] text-indigo-300/60 font-mono uppercase tracking-widest">Comparative Mythology Database</p>
                    </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                    {(Object.keys(PANTHEONS) as Culture[]).map((culture) => (
                        <button
                            key={culture}
                            onClick={() => setActive(culture)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border whitespace-nowrap
                                ${active === culture 
                                    ? `bg-${PANTHEONS[culture].color}-500/20 border-${PANTHEONS[culture].color}-500/50 text-${PANTHEONS[culture].color}-400` 
                                    : 'bg-black/50 border-white/5 text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            {PANTHEONS[culture].name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 md:p-8">
                <div className="mb-8">
                    <p className="text-sm text-zinc-400 leading-relaxed font-light border-l-2 border-indigo-500/30 pl-4">
                        {currentData.desc}
                    </p>
                </div>

                {/* God Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentData.gods.map((god, i) => {
                        const Icon = god.icon;
                        // Tailwind color mapping safety
                        const borderColor = `border-${god.color}-500/30`;
                        const bgColor = `bg-${god.color}-950/20`;
                        const iconColor = `text-${god.color}-400`;

                        return (
                            <div key={i} className={`p-4 rounded-xl border ${borderColor} ${bgColor} flex items-start gap-4 transition-transform hover:-translate-y-1`}>
                                <div className={`p-3 rounded-lg bg-black/50 shadow-inner ${iconColor} border border-white/5`}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white tracking-wide">{god.name}</h4>
                                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">{god.title}</div>
                                    <div className="text-xs text-zinc-400 leading-relaxed">
                                        <span className="text-zinc-600 font-bold">DOMAIN //</span> {god.domain}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}