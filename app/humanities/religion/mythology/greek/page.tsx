import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Flame, Map, Sparkles, Sword, Globe } from 'lucide-react';
import GreekBackground from './_components/GreekBackground';
import HellenicCodex from './_components/HellenicCodex';

const PANTHEON_ROUTING = [
    {
        id: 'norse',
        title: 'Norse Mythology',
        description: 'Odin, Thor, and the looming inevitability of Ragnarök in the frozen north.',
        icon: Sword,
        color: 'sky',
        href: '#' 
    },
    {
        id: 'egyptian',
        title: 'Egyptian Mythology',
        description: 'Ra, Anubis, and the meticulous preservation of cosmic order along the Nile.',
        icon: Flame,
        color: 'yellow',
        href: '#'
    }
];

export default function GreekMythologyPage() {
    return (
        <main className="relative min-h-screen bg-[#0a0a0c] text-zinc-300 font-sans selection:bg-amber-500/30 overflow-x-hidden">
            
            <GreekBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-amber-900/30 pb-8 backdrop-blur-sm">
                    <Link href="/humanities/religion/mythology" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-400 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Ancient Mythology Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-amber-500/30 rounded-lg text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                            <BookOpen size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-500/50">
                            Mythos // The Mediterranean
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        HELLENIC <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">PANTHEON</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        The gods of ancient Greece were not perfect, omnibenevolent guardians. They were immensely powerful, terrifyingly petty, and deeply human. They loved, they held grudges, and they used humanity as pawns in their cosmic politics.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-12 lg:gap-20 mb-24">
                    
                    {/* TOP: THEORETICAL TEXT (Full width before the massive codex) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Sparkles className="text-amber-400" /> The Titanomachy
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                The Olympians were not the first rulers of the cosmos. Greek mythology is defined by generational violence. The primordial entity Uranus was overthrown by his son, the Titan Cronus. 
                            </p>
                            <p className="text-zinc-400 leading-relaxed font-light">
                                Fearing the same fate, Cronus swallowed his own children whole. Only Zeus escaped, eventually returning to free his siblings and wage a ten-year cosmic war—the Titanomachy—to banish the Titans to Tartarus and claim Mount Olympus.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Map className="text-cyan-400" /> Humanity as Pawns
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Unlike modern religions that center on morality and salvation, Greek mythology functioned on a system of reciprocity. You offered sacrifices to Poseidon not because he was "good," but so he wouldn't sink your merchant ship.
                            </p>
                            <div className="p-5 bg-black/40 border-l-4 border-amber-500 text-sm text-zinc-300 font-serif italic rounded-r-xl shadow-inner">
                                The epic narratives of Greece—like the Iliad and the Odyssey—are entirely driven by the gods playing favorites, gifting legendary artifacts to heroes, and punishing acts of "Hubris" (excessive human pride).
                            </div>
                        </section>
                    </div>

                    {/* BOTTOM: THE MASSIVE CODEX */}
                    <div className="w-full">
                        <HellenicCodex />
                    </div>

                </div>

                {/* ROUTING: OTHER PANTHEONS */}
                <div className="pt-16 border-t border-amber-900/30">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Globe className="text-amber-400" /> Comparative Mythos
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Travel to other ancient cradles of civilization to study their deities.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {PANTHEON_ROUTING.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'sky' ? 'hover:border-sky-500/50' :
                                'hover:border-yellow-500/50';
                                
                            const iconColor = 
                                topic.color === 'sky' ? 'text-sky-400' :
                                'text-yellow-400';

                            return (
                                <Link key={topic.id} href={topic.href} className={`bg-black/40 border border-amber-500/10 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 ${borderHover}`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 bg-amber-900/20 rounded-xl ${iconColor}`}>
                                            <Icon size={24} />
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-white mb-2 group-hover:text-white transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        {topic.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>

            </div>
        </main>
    );
}