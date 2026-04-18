"use client";
import React, { useState } from 'react';
import { Zap, Waves, Skull, Shield, Flame, Hammer, Eye, Moon, Crown, Swords } from 'lucide-react';

type Tab = 'olympians' | 'titans' | 'artifacts';

const CODEX_DATA = {
    olympians: [
        { name: 'Zeus', title: 'King of the Gods', domain: 'Sky, Thunder, Justice', icon: Zap, color: 'amber', relations: 'Son of Cronus | Consort to Hera' },
        { name: 'Poseidon', title: 'Earth-Shaker', domain: 'The Sea, Earthquakes, Horses', icon: Waves, color: 'cyan', relations: 'Brother to Zeus | Rival to Athena' },
        { name: 'Hades', title: 'The Unseen One', domain: 'The Underworld, Wealth', icon: Skull, color: 'zinc', relations: 'Brother to Zeus | Consort to Persephone' },
        { name: 'Athena', title: 'The Strategist', domain: 'Wisdom, Warfare, Handicraft', icon: Shield, color: 'emerald', relations: 'Daughter of Zeus (Born from his head)' },
        { name: 'Ares', title: 'The Blood-Soaked', domain: 'War, Bloodlust, Courage', icon: Swords, color: 'rose', relations: 'Son of Zeus & Hera | Lover to Aphrodite' },
        { name: 'Hephaestus', title: 'The Celestial Artificer', domain: 'Fire, Forges, Sculpture', icon: Hammer, color: 'orange', relations: 'Son of Hera | Husband to Aphrodite' },
        { name: 'Artemis', title: 'The Huntress', domain: 'Hunting, Wilderness, Moon', icon: Moon, color: 'sky', relations: 'Daughter of Zeus & Leto | Twin sister to Apollo' },
        { name: 'Apollo', title: 'The Radiant One', domain: 'Sun, Music, Prophecy', icon: Flame, color: 'yellow', relations: 'Son of Zeus & Leto | Twin brother to Artemis' },
        { name: 'Demeter', title: 'The Earth Mother', domain: 'Agriculture, Fertility, Seasons', icon: Crown, color: 'green', relations: 'Sister to Zeus | Mother to Persephone' },
        { name: 'Hermes', title: 'The Divine Messenger', domain: 'Travel, Commerce, Thieves', icon: Eye, color: 'lime', relations: 'Son of Zeus & Maia' },
        { name: 'Aphrodite', title: 'Goddess of Love', domain: 'Love, Beauty, Desire', icon: Flame, color: 'pink', relations: 'Born from sea foam | Wife to Hephaestus' },
        { name: 'Dionysus', title: 'The Liberator', domain: 'Wine, Festivity, Madness', icon: Crown, color: 'purple', relations: 'Son of Zeus & Semele' },
        { name: 'Hestia', title: 'The Hearth Keeper', domain: 'Hearth, Home, Family', icon: Shield, color: 'red', relations: 'Sister to Zeus | Virgin goddess' }
    ],
    titans: [
        { name: 'Cronus', title: 'Titan of Time', domain: 'Time, Harvest, Destructive Forces', icon: Crown, color: 'purple', relations: 'Father of the first Olympians | Overthrown by Zeus' },
        { name: 'Prometheus', title: 'The Forethinker', domain: 'Foresight, Fire, Human Creation', icon: Flame, color: 'orange', relations: 'Brother to Atlas | Punished by Zeus' },
        { name: 'Atlas', title: 'The Bearer of Heavens', domain: 'Astronomy, Endurance', icon: Eye, color: 'sky', relations: 'General of the Titans | Condemned to hold up the sky' },
        { name: 'Rhea', title: 'Mother of Gods', domain: 'Fertility, Motherhood, Generation', icon: Crown, color: 'pink', relations: 'Wife to Cronus | Mother of the first Olympians' },
        { name: 'Oceanus', title: 'Titan of the Ocean', domain: 'Water, Rivers, Seas', icon: Waves, color: 'cyan', relations: 'Husband to Tethys | Father of river gods' },
        { name: 'Hyperion', title: 'The Light-Bringer', domain: 'Light, Observation, Wisdom', icon: Flame, color: 'yellow', relations: 'Father of Helios, Selene, and Eos' },
        { name: 'Mnemosyne', title: 'Goddess of Memory', domain: 'Memory, Language, Poetry', icon: Eye, color: 'emerald', relations: 'Mother of the Muses | Consort to Zeus' },
        { name: 'Themis', title: 'Goddess of Divine Law', domain: 'Justice, Order, Customs', icon: Shield, color: 'lime', relations: 'Mother of the Fates | Consort to Zeus' },
        { name: 'Coeus', title: 'Titan of Intellect', domain: 'Intelligence, Inquiry, the North', icon: Eye, color: 'blue', relations: 'Father of Leto | Husband to Phoebe' },
        { name: 'Phoebe', title: 'Titaness of the Moon', domain: 'Prophecy, the Moon, Intuition', icon: Moon, color: 'indigo', relations: 'Mother of Leto | Consort to Coeus' },
        { name: 'Tethys', title: 'Goddess of Fresh Water', domain: 'Fresh Water, Nursing, Fertility', icon: Waves, color: 'teal', relations: 'Wife to Oceanus | Mother of river gods' },
        { name: 'Iapetus', title: 'Father of Mortals', domain: 'Mortality, Craftsmanship, Mortals', icon: Hammer, color: 'amber', relations: 'Father of Prometheus, Epimetheus, Atlas, and Menoetius' },
        { name: 'Epimetheus', title: 'The Afterthinker', domain: 'Afterthought, Creation of Animals', icon: Hammer, color: 'red', relations: 'Brother to Prometheus | Husband to Pandora' },
        { name: 'Menoetius', title: 'The Ruiner', domain: 'Violence, Rash Action, Blame', icon: Swords, color: 'zinc', relations: 'Brother to Prometheus | Struck down by Zeus' }
    ],
    artifacts: [
        { name: 'The Master Bolt', owner: 'Zeus', type: 'Weapon of Mass Destruction', desc: 'Forged by the Cyclopes. The most powerful weapon ever created, capable of shearing the tops off mountains.', color: 'amber' },
        { name: 'Helm of Darkness', owner: 'Hades', type: 'Divine Armor', desc: 'Allows the wearer to become perfectly invisible to all gods, mortals, and entities. Induces absolute terror.', color: 'zinc' },
        { name: 'Aegis', owner: 'Athena / Zeus', type: 'Legendary Shield', desc: 'A shield bearing the severed head of the Gorgon Medusa. Its gaze paralyzes enemies with fear.', color: 'emerald' },
        { name: 'The Trident', owner: 'Poseidon', type: 'Elemental Conduit', desc: 'Used to control the seas, summon storms, and shatter the earth to cause massive earthquakes.', color: 'cyan' }
    ]
};

export default function HellenicCodex() {
    const [activeTab, setActiveTab] = useState<Tab>('olympians');

    return (
        <div className="w-full bg-[#0a0a0c]/90 backdrop-blur-xl border border-amber-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans">
            
            {/* Header / Tabs */}
            <div className="bg-amber-950/30 border-b border-amber-500/20 p-5">
                <div className="flex gap-2 overflow-x-auto custom-scrollbar">
                    <button onClick={() => setActiveTab('olympians')} className={`px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${activeTab === 'olympians' ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'bg-black/50 border-white/5 text-zinc-500 hover:text-zinc-300'}`}>
                        Olympians
                    </button>
                    <button onClick={() => setActiveTab('titans')} className={`px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${activeTab === 'titans' ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' : 'bg-black/50 border-white/5 text-zinc-500 hover:text-zinc-300'}`}>
                        The Titans
                    </button>
                    <button onClick={() => setActiveTab('artifacts')} className={`px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${activeTab === 'artifacts' ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' : 'bg-black/50 border-white/5 text-zinc-500 hover:text-zinc-300'}`}>
                        Legendary Artifacts
                    </button>
                </div>
            </div>

            <div className="p-6 md:p-8">
                {/* Entities Grid (Olympians & Titans) */}
                {(activeTab === 'olympians' || activeTab === 'titans') && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {CODEX_DATA[activeTab].map((entity, i) => {
                            const Icon = entity.icon;
                            return (
                                <div key={i} className={`p-5 rounded-xl border border-${entity.color}-500/30 bg-${entity.color}-950/10 flex flex-col md:flex-row items-start gap-4 transition-transform hover:-translate-y-1`}>
                                    <div className={`p-4 rounded-lg bg-black/60 shadow-inner text-${entity.color}-400 border border-white/5 shrink-0`}>
                                        <Icon size={32} />
                                    </div>
                                    <div className="w-full">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-xl font-bold text-white tracking-wide">{entity.name}</h4>
                                            <span className={`text-[9px] font-mono px-2 py-1 rounded bg-${entity.color}-500/20 text-${entity.color}-300 uppercase tracking-widest border border-${entity.color}-500/30`}>
                                                {entity.title}
                                            </span>
                                        </div>
                                        <div className="text-xs text-zinc-400 mb-3 font-light">
                                            <strong className="text-zinc-500">DOMAIN:</strong> {entity.domain}
                                        </div>
                                        <div className="pt-3 border-t border-white/10 text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                                            <span className="text-zinc-600">Relations //</span> {entity.relations}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Artifacts Grid */}
                {activeTab === 'artifacts' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {CODEX_DATA.artifacts.map((artifact, i) => (
                            <div key={i} className={`relative p-6 rounded-xl border border-${artifact.color}-500/30 bg-black/60 overflow-hidden group`}>
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-${artifact.color}-500/10 blur-[50px] rounded-full group-hover:bg-${artifact.color}-500/20 transition-colors`} />
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className={`text-xl font-bold text-${artifact.color}-400 mb-1`}>{artifact.name}</h4>
                                            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                                                Wielder: <span className="text-white">{artifact.owner}</span>
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-bold px-2 py-1 bg-zinc-900 border border-zinc-700 text-zinc-400 rounded uppercase tracking-widest">
                                            {artifact.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-zinc-400 leading-relaxed font-light">
                                        {artifact.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}