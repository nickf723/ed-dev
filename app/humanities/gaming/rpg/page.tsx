"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import RpgBackground from "./RpgBackground";
import StatRadar from "./StatRadar";
import SpellPicker from "./SpellPicker";
import StatPointBuy from "./StatPointBuy";
import { useDnD, ClassDetail, Spell } from "./useDnD";
import { RPG_CLASSES, StatLabel, SKILL_MAP } from "./rpg-data";
import { ArrowLeft, Shield, Swords, Zap, Crown, Ghost, Eye, Scroll, CheckCircle2, Circle } from "lucide-react";

type Step = 'IDENTITY' | 'STATS' | 'SPELLS' | 'REVIEW';

const getMod = (score: number) => Math.floor((score - 10) / 2);
const fmtMod = (score: number) => {
    const m = getMod(score);
    return m >= 0 ? `+${m}` : `${m}`;
};

export default function Charactermancer() {
  const { classes, races, getClassDetail, getClassSpells, getRaceDetail, getClassFeatures } = useDnD();
  
  // STATE
  const [step, setStep] = useState<Step>('IDENTITY');
  const [charName, setCharName] = useState("Hooty McOwlface");
  const [level, setLevel] = useState(8); 
  const [selectedRace, setSelectedRace] = useState("Owlin"); 
  const [selectedClassIndex, setSelectedClassIndex] = useState("");
  
  // FETCHED DATA
  const [classDetail, setClassDetail] = useState<ClassDetail | null>(null);
  const [raceDetail, setRaceDetail] = useState<any>(null);
  const [classFeatures, setClassFeatures] = useState<any[]>([]);
  const [availableSpells, setAvailableSpells] = useState<Spell[]>([]);
  
  // USER DATA
  const [stats, setStats] = useState<Record<StatLabel, number>>({ STR: 10, DEX: 16, CON: 14, INT: 12, WIS: 14, CHA: 10 });
  const [knownSpells, setKnownSpells] = useState<string[]>([]);

  // CALCULATED VALUES
  const profBonus = Math.ceil(level / 4) + 1;
  const armorClass = 10 + getMod(stats.DEX); 
  const initiative = fmtMod(stats.DEX);
  const speed = raceDetail?.speed || 30;
  
  // Passive Perception = 10 + Wis Mod + (Prof if applicable)
  // For demo, we assume proficiency if class is Druid/Ranger/Rogue, otherwise just raw stat
  const isWisClass = ['druid', 'ranger', 'rogue', 'cleric'].includes(selectedClassIndex);
  const passivePerception = 10 + getMod(stats.WIS) + (isWisClass ? profBonus : 0);

  // EFFECTS
  useEffect(() => {
    if (selectedClassIndex) {
        getClassDetail(selectedClassIndex).then(setClassDetail);
        getClassSpells(selectedClassIndex).then(setAvailableSpells);
        // Fetch features based on level
        getClassFeatures(selectedClassIndex, level).then(setClassFeatures);
    }
  }, [selectedClassIndex, level]); // Re-run when level changes!

  useEffect(() => {
      const r = races.find(r => r.name === selectedRace);
      if(r) getRaceDetail(r.index).then(setRaceDetail);
  }, [selectedRace, races]);

  const handleStatChange = (stat: StatLabel, delta: number) => {
      setStats(prev => ({ ...prev, [stat]: prev[stat] + delta }));
  };

  const toggleSpell = (spell: Spell) => {
      if (knownSpells.includes(spell.name)) {
          setKnownSpells(prev => prev.filter(s => s !== spell.name));
      } else {
          setKnownSpells(prev => [...prev, spell.name]);
      }
  };

  const visualClass = RPG_CLASSES.find(c => c.id === selectedClassIndex) || RPG_CLASSES[0];

  return (
    <main className="min-h-screen bg-[#0f0e13] text-stone-300 font-serif pl-0 md:pl-80 relative overflow-hidden selection:bg-amber-900/50 flex flex-col">
      <RpgBackground />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_120%)] pointer-events-none" />

      {/* HEADER */}
      <header className="relative z-20 p-6 md:p-12 pb-0 flex justify-between items-start">
            <div>
                <Link href="/humanities/gaming" className="inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-amber-600 hover:text-amber-400 transition-colors mb-4">
                    <ArrowLeft size={10} /> Gaming Hall
                </Link>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2 font-serif flex items-center gap-4">
                    CHARACTERMANCER
                </h1>
            </div>
      </header>

      <div className="relative z-10 p-6 md:p-12 flex-1 flex flex-col xl:flex-row gap-8 overflow-hidden">
          
          {/* LEFT PANEL: BUILDER */}
          <div className="w-full xl:w-1/3 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
              
              {/* LEVEL SLIDER */}
              <div className="bg-black/40 border border-white/10 p-4 rounded-lg flex items-center gap-6">
                  <div className="text-xs font-sans font-bold uppercase text-stone-500">Level</div>
                  <input 
                    type="range" min="1" max="20" 
                    value={level} onChange={(e) => setLevel(parseInt(e.target.value))}
                    className="flex-1 accent-amber-600 h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-2xl font-black text-white font-mono w-8 text-center">{level}</div>
              </div>

              {/* TABS */}
              <div className="flex gap-2 border-b border-white/10 pb-4">
                  {['IDENTITY', 'STATS', 'SPELLS'].map((s) => (
                      <button key={s} onClick={() => setStep(s as Step)} className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-widest transition-all ${step === s ? 'bg-amber-900/40 text-white' : 'text-stone-600 hover:text-stone-400'}`}>
                          {s}
                      </button>
                  ))}
              </div>

              {/* STEPS */}
              {step === 'IDENTITY' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
                      <input type="text" value={charName} onChange={(e) => setCharName(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded p-4 text-xl font-bold text-white focus:border-amber-500/50 outline-none font-serif" placeholder="Character Name" />
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2 h-96 overflow-y-auto custom-scrollbar border border-white/5 rounded p-2">
                              <div className="text-[10px] font-sans uppercase text-stone-500 mb-2">Race</div>
                              {races.map(r => (
                                  <button key={r.index} onClick={() => setSelectedRace(r.name)} className={`w-full text-left px-3 py-2 rounded text-sm ${selectedRace === r.name ? 'bg-amber-900/40 text-white' : 'text-stone-400 hover:bg-white/5'}`}>{r.name}</button>
                              ))}
                          </div>
                          <div className="space-y-2 h-96 overflow-y-auto custom-scrollbar border border-white/5 rounded p-2">
                              <div className="text-[10px] font-sans uppercase text-stone-500 mb-2">Class</div>
                              {classes.map(c => (
                                  <button key={c.index} onClick={() => setSelectedClassIndex(c.index)} className={`w-full text-left px-3 py-2 rounded text-sm ${selectedClassIndex === c.index ? 'bg-blue-950/40 text-white' : 'text-stone-400 hover:bg-white/5'}`}>{c.name}</button>
                              ))}
                          </div>
                      </div>
                  </div>
              )}

              {step === 'STATS' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
                      <div className="bg-black/20 rounded-xl border border-white/5 p-4 flex items-center justify-center">
                          <div className="w-full aspect-square max-w-[250px]">
                              <StatRadar rpgClass={{...visualClass, stats: stats}} />
                          </div>
                      </div>
                      <StatPointBuy stats={stats} pointsRemaining={99} onUpdate={handleStatChange} />
                  </div>
              )}

              {step === 'SPELLS' && (
                  <div className="animate-in fade-in slide-in-from-left-4 h-full flex flex-col">
                      <SpellPicker 
                         spells={availableSpells} knownSpells={knownSpells} 
                         onToggle={toggleSpell} maxSpells={level + getMod(stats.INT)} 
                      />
                  </div>
              )}
          </div>

          {/* RIGHT PANEL: THE OFFICIAL SHEET */}
          <div className="w-full xl:w-2/3 animate-in slide-in-from-right-8 duration-700">
              <div className="bg-[#e7e5e4] text-stone-900 rounded-lg p-1 shadow-2xl h-full flex flex-col">
                  <div className="border-4 border-stone-900 h-full rounded p-6 md:p-8 flex flex-col relative bg-[url('/noise.svg')] opacity-95 overflow-y-auto custom-scrollbar">
                      
                      {/* HEADER */}
                      <div className="flex flex-col md:flex-row justify-between items-start border-b-4 border-stone-800 pb-4 mb-6 gap-4">
                          <div className="flex-1">
                              <input 
                                value={charName} onChange={(e) => setCharName(e.target.value)}
                                className="text-4xl font-black font-serif uppercase tracking-tighter bg-transparent border-b border-stone-400 w-full focus:outline-none"
                              />
                              <div className="grid grid-cols-3 gap-4 mt-2 text-xs font-sans font-bold uppercase tracking-widest text-stone-600">
                                  <span>{selectedRace}</span>
                                  <span>{classDetail?.name} {level}</span>
                                  <span>{charName.includes('Owlin') ? 'Strixhaven' : 'Background?'}</span>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="text-center p-2 border-2 border-stone-800 rounded">
                                  <div className="text-[10px] font-bold uppercase">Proficiency</div>
                                  <div className="text-2xl font-black">+{profBonus}</div>
                              </div>
                              <div className="text-center p-2 border-2 border-stone-800 rounded">
                                  <div className="text-[10px] font-bold uppercase">Inspiration</div>
                                  <div className="text-2xl font-black opacity-20">O</div>
                              </div>
                          </div>
                      </div>

                      {/* MAIN GRID */}
                      <div className="flex flex-col md:flex-row gap-6">
                          
                          {/* COL 1: STATS & SKILLS */}
                          <div className="w-full md:w-1/3 space-y-6">
                              {/* ATTRIBUTES */}
                              <div className="space-y-2">
                                  {Object.entries(stats).map(([k, v]) => (
                                      <div key={k} className="flex items-center gap-2">
                                          <div className="w-16 h-16 border-2 border-stone-800 rounded flex flex-col items-center justify-center bg-white relative">
                                              <span className="text-[10px] font-bold uppercase absolute top-1">{k}</span>
                                              <span className="text-xl font-black">{getMod(v) >= 0 ? `+${getMod(v)}` : getMod(v)}</span>
                                              <div className="absolute -bottom-2 bg-stone-900 text-white text-[10px] px-2 rounded-full font-bold">{v}</div>
                                          </div>
                                          {/* SAVING THROW */}
                                          <div className="flex-1 flex items-center gap-2 border-b border-stone-300 pb-1">
                                              {/* Check proficiency logic: usually matches class details */}
                                              <div className={`w-3 h-3 rounded-full border border-stone-900 ${classDetail?.saving_throws.find(s => s.name === k) ? 'bg-stone-900' : ''}`} />
                                              <span className="text-xs font-bold">
                                                  {/* Save = Mod + (Prof if proficient) */}
                                                  {classDetail?.saving_throws.find(s => s.name === k) ? `+${getMod(v) + profBonus}` : fmtMod(v)}
                                              </span>
                                              <span className="text-[10px] uppercase text-stone-500">Save</span>
                                          </div>
                                      </div>
                                  ))}
                              </div>

                              {/* SKILLS */}
                              <div className="border-2 border-stone-800 rounded p-4 bg-white/50">
                                  <h3 className="text-xs font-black uppercase mb-3 border-b border-stone-400">Skills</h3>
                                  <div className="space-y-1">
                                      {Object.entries(SKILL_MAP).map(([skill, stat]) => {
                                          const mod = getMod(stats[stat]);
                                          // Mock Proficiency: Add prof if it feels "right" for the class just for demo visuals
                                          // In a real app, this would be user-selectable
                                          const isProf = ['Stealth', 'Perception'].includes(skill) && (selectedClassIndex === 'rogue' || selectedRace === 'Owlin');
                                          const final = mod + (isProf ? profBonus : 0);
                                          
                                          return (
                                              <div key={skill} className="flex items-center gap-2 text-xs">
                                                  <div className={`w-2 h-2 rounded-full border border-stone-600 ${isProf ? 'bg-stone-900' : ''}`} />
                                                  <span className="font-mono text-stone-500 w-6 text-right">{final >= 0 ? `+${final}` : final}</span>
                                                  <span className={`flex-1 ${isProf ? 'font-bold' : 'text-stone-600'}`}>{skill} <span className="text-[8px] text-stone-400">({stat})</span></span>
                                              </div>
                                          )
                                      })}
                                  </div>
                              </div>
                          </div>

                          {/* COL 2: COMBAT & FEATURES */}
                          <div className="flex-1 flex flex-col gap-6">
                              
                              {/* VITALS ROW */}
                              <div className="flex gap-4">
                                  <div className="flex-1 p-2 border-2 border-stone-800 rounded text-center bg-white">
                                      <div className="text-[10px] font-bold text-stone-500 uppercase">Armor Class</div>
                                      <div className="text-3xl font-black flex justify-center items-center gap-2"><Shield size={24} /> {armorClass}</div>
                                  </div>
                                  <div className="flex-1 p-2 border-2 border-stone-800 rounded text-center bg-white">
                                      <div className="text-[10px] font-bold text-stone-500 uppercase">Initiative</div>
                                      <div className="text-3xl font-black flex justify-center items-center gap-2"><Zap size={24} /> {initiative}</div>
                                  </div>
                                  <div className="flex-1 p-2 border-2 border-stone-800 rounded text-center bg-white">
                                      <div className="text-[10px] font-bold text-stone-500 uppercase">Speed</div>
                                      <div className="text-3xl font-black flex justify-center items-center gap-2"><Ghost size={24} /> {speed}</div>
                                  </div>
                              </div>

                              <div className="p-2 border-2 border-stone-800 rounded bg-white flex justify-between items-center px-6">
                                  <div className="text-xs font-bold uppercase text-stone-500">Passive Perception (Wis)</div>
                                  <div className="text-2xl font-black flex items-center gap-2"><Eye size={20} /> {passivePerception}</div>
                              </div>

                              {/* HP & HIT DICE */}
                              <div className="flex gap-4">
                                  <div className="w-1/2 border-2 border-stone-800 rounded p-2 bg-stone-100">
                                      <div className="text-[9px] font-bold uppercase text-stone-500">Hit Point Maximum</div>
                                      <div className="text-center py-4 text-3xl font-black text-stone-800">
                                          {classDetail?.hit_die ? (classDetail.hit_die + getMod(stats.CON)) + ((classDetail.hit_die/2 + 1 + getMod(stats.CON)) * (level - 1)) : 10}
                                      </div>
                                  </div>
                                  <div className="w-1/2 border-2 border-stone-800 rounded p-2 bg-stone-100">
                                      <div className="text-[9px] font-bold uppercase text-stone-500">Hit Dice</div>
                                      <div className="text-center py-4 text-3xl font-black text-stone-800">
                                          {level}d{classDetail?.hit_die}
                                      </div>
                                  </div>
                              </div>

                              {/* FEATURES & TRAITS (The Auto-Filled Goodness) */}
                              <div className="flex-1 border-2 border-stone-800 rounded p-4 bg-white/80 overflow-y-auto max-h-96 custom-scrollbar">
                                  <h3 className="text-xs font-black uppercase mb-3 border-b border-stone-400 flex items-center gap-2">
                                      <Scroll size={14} /> Features & Traits
                                  </h3>
                                  
                                  <div className="space-y-4">
                                      {/* Racial Traits */}
                                      {raceDetail?.traits?.map((t: any) => (
                                          <div key={t.index}>
                                              <div className="font-bold text-sm text-stone-900">{t.name}</div>
                                              <div className="text-xs text-stone-600">Racial Trait</div>
                                          </div>
                                      ))}
                                      {selectedRace === 'Owlin' && (
                                          <div>
                                              <div className="font-bold text-sm text-stone-900">Silent Feathers</div>
                                              <div className="text-xs text-stone-600">Proficiency in Stealth skill.</div>
                                          </div>
                                      )}

                                      {/* Class Features from API */}
                                      {classFeatures.map((f: any) => (
                                          <div key={f.index}>
                                              <div className="font-bold text-sm text-stone-900 flex justify-between">
                                                  {f.name}
                                                  <span className="text-[9px] bg-stone-200 px-1 rounded text-stone-500">Lvl {f.level}</span>
                                              </div>
                                              {/* Simple Description (API usually provides raw text arrays) */}
                                              <div className="text-xs text-stone-600 line-clamp-3 hover:line-clamp-none">
                                                  {f.desc?.[0] || "Class Feature"}
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                              </div>

                          </div>
                      </div>

                      {/* SPELL LIST (Bottom) */}
                      {knownSpells.length > 0 && (
                          <div className="mt-6 pt-4 border-t-2 border-stone-800">
                              <h3 className="text-xs font-black uppercase mb-3">Prepared Spells</h3>
                              <div className="flex flex-wrap gap-2">
                                  {knownSpells.map(s => (
                                      <span key={s} className="px-2 py-1 bg-stone-100 border border-stone-300 rounded text-xs font-bold text-stone-700">
                                          {s}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      )}

                  </div>
              </div>
          </div>

      </div>
    </main>
  );
}