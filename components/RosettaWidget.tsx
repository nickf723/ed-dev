"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, PenTool, Mic, Hand, Languages } from "lucide-react";

const PHRASES = [
  {
    id: "hello",
    label: "Hello",
    translations: [
      { lang: "Spanish", script: "Hola", native: "Hola", type: "Latin (Phonetic)", pronunciation: "/ˈo.la/" },
      { lang: "Japanese", script: "こんにちは", native: "Konnichiwa", type: "Hiragana (Syllabic)", pronunciation: "/kon.ni.t͡ɕi.wa/" },
      { lang: "Arabic", script: "مرحبا", native: "Marhaban", type: "Abjad (Consonantal)", pronunciation: "/mar.ħa.ban/" },
      { lang: "Mandarin", script: "你好", native: "Nǐ hǎo", type: "Logographic (Meaning)", pronunciation: "/ni˨˩ xɑʊ˨˩˦/" },
      { lang: "ASL", script: "👋 (Salute)", native: "Hand Wave / Salute", type: "Visual-Spatial", pronunciation: "Dominant B-hand from forehead" },
    ]
  },
  {
    id: "peace",
    label: "Peace",
    translations: [
      { lang: "Russian", script: "Мир", native: "Mir", type: "Cyrillic", pronunciation: "/mʲir/" },
      { lang: "Hebrew", script: "שלום", native: "Shalom", type: "Abjad", pronunciation: "/ʃaˈlom/" },
      { lang: "Hindi", script: "शांति", native: "Shanti", type: "Devanagari", pronunciation: "/ʃɑːn.t̪ɪ/" },
      { lang: "Korean", script: "평화", native: "Pyeonghwa", type: "Hangul (Featural)", pronunciation: "/pʰjʌŋ.ɦwa/" },
      { lang: "ASL", script: "✌️ (Twist)", native: "Clasped Hands twist", type: "Visual-Spatial", pronunciation: "Hands clasp then smooth out" },
    ]
  }
];

export default function RosettaWidget() {
  const [activePhrase, setActivePhrase] = useState(PHRASES[0]);
  const [activeLang, setActiveLang] = useState(0);

  const currentTrans = activePhrase.translations[activeLang];

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Languages size={14} className="text-pink-400" /> The Rosetta Stone
        </h3>
        <div className="flex gap-2">
            {PHRASES.map(p => (
                <button
                    key={p.id}
                    onClick={() => { setActivePhrase(p); setActiveLang(0); }}
                    className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${activePhrase.id === p.id ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
                >
                    {p.label}
                </button>
            ))}
        </div>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* Main Display */}
        <div className="relative w-full h-32 mb-6 flex items-center justify-center bg-black/40 rounded-xl border border-white/5 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentTrans.lang + activePhrase.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500 mb-2">
                        {currentTrans.script}
                    </h2>
                    <p className="text-sm font-mono text-pink-400">{currentTrans.native}</p>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Selector Tabs */}
        <div className="flex gap-2 mb-6 w-full justify-center">
            {activePhrase.translations.map((t, i) => (
                <button 
                    key={t.lang}
                    onClick={() => setActiveLang(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === activeLang ? "bg-pink-500 scale-125" : "bg-neutral-700 hover:bg-neutral-500"}`}
                />
            ))}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-neutral-950/50 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                    <PenTool size={12} className="text-neutral-500" />
                    <span className="text-[10px] font-bold uppercase text-neutral-400">System</span>
                </div>
                <p className="text-xs text-neutral-200">{currentTrans.type}</p>
            </div>
            <div className="bg-neutral-950/50 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                    {currentTrans.lang === "ASL" ? <Hand size={12} className="text-neutral-500"/> : <Mic size={12} className="text-neutral-500" />}
                    <span className="text-[10px] font-bold uppercase text-neutral-400">
                        {currentTrans.lang === "ASL" ? "Sign" : "IPA"}
                    </span>
                </div>
                <p className="text-xs text-neutral-200 font-mono">{currentTrans.pronunciation}</p>
            </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
            <Globe size={12} className="text-pink-400" />
            <span className="text-[10px] font-bold text-pink-300 uppercase tracking-widest">{currentTrans.lang}</span>
        </div>

      </div>
    </div>
  );
}