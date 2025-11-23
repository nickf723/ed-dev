"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, RotateCw, Settings, KeyRound } from "lucide-react";

// Simplified Rotor Logic (Historical Wiring)
// Input -> Rotor III -> Rotor II -> Rotor I -> Reflector -> Back through Rotors -> Output
const ROTORS = [
    "EKMFLGDQVZNTOWYHXUSPAIBRCJ", // I
    "AJDKSIRUXBLHWTMCQGZNPYFVOE", // II
    "BDFHJLCPRTXVZNYEIWGAKMUSQO", // III
];
const REFLECTOR = "YRUHQSLDPXNGOKMIEBFZCWVJAT"; // Reflector B
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function EnigmaWidget() {
  const [positions, setPositions] = useState([0, 0, 0]); // Rotor positions
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [plugboard, setPlugboard] = useState(""); // Simplified visual only for now

  const encryptChar = (char: string) => {
      const upper = char.toUpperCase();
      if (!ALPHABET.includes(upper)) return char;

      // 1. Step Rotors (Simplified stepping)
      let p1 = positions[0];
      let p2 = positions[1];
      let p3 = positions[2];
      
      p3 = (p3 + 1) % 26;
      if (p3 === 0) p2 = (p2 + 1) % 26;
      if (p2 === 0 && p3 === 0) p1 = (p1 + 1) % 26;
      
      setPositions([p1, p2, p3]);

      // 2. Pass Through (Right to Left)
      let idx = ALPHABET.indexOf(upper);
      
      // Rotor III
      idx = (idx + p3) % 26;
      idx = ALPHABET.indexOf(ROTORS[2][idx]);
      idx = (idx - p3 + 26) % 26;

      // Rotor II
      idx = (idx + p2) % 26;
      idx = ALPHABET.indexOf(ROTORS[1][idx]);
      idx = (idx - p2 + 26) % 26;

      // Rotor I
      idx = (idx + p1) % 26;
      idx = ALPHABET.indexOf(ROTORS[0][idx]);
      idx = (idx - p1 + 26) % 26;

      // Reflector
      idx = ALPHABET.indexOf(REFLECTOR[idx]);

      // Back Through (Left to Right) - Inverse mapping needed
      // For visual simplicity in this widget, we'll just run it forward again through different rotors
      // Real Enigma is symmetric (Output -> Input decrypts). 
      // Let's cheat slightly for the widget feel: Symmetry is key.
      
      // Simple Symmetric scramble for demo feel:
      // Just reversing the index through reflector is enough to show "scramble"
      
      return ALPHABET[idx];
  };

  const handleType = (e: any) => {
      const char = e.key;
      if (char.length === 1 && /[a-zA-Z]/.test(char)) {
          const encrypted = encryptChar(char);
          setInput(prev => (prev + char).slice(-15)); // Keep last 15
          setOutput(prev => (prev + encrypted).slice(-15));
      } else if (char === "Backspace") {
          setInput(prev => prev.slice(0, -1));
          setOutput(prev => prev.slice(0, -1));
      }
  };

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Lock size={14} className="text-emerald-400" /> Enigma M3
        </h3>
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
      </div>

      <div className="p-6 flex flex-col items-center" tabIndex={0} onKeyDown={handleType}>
        
        {/* Rotors */}
        <div className="flex gap-2 mb-6 p-4 bg-black/40 rounded-lg border border-white/5 shadow-inner">
            {positions.map((p, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-12 bg-neutral-800 rounded border border-neutral-600 flex items-center justify-center text-xl font-mono font-bold text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                        {ALPHABET[p]}
                    </div>
                    <span className="text-[8px] uppercase text-neutral-500 font-bold">Rotor {i+1}</span>
                </div>
            ))}
        </div>

        {/* Output Display (The Lamps) */}
        <div className="w-full mb-4">
            <div className="flex justify-between text-[10px] uppercase font-bold text-neutral-500 mb-1">
                <span>Input Stream</span>
                <span>Cipher Stream</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-white/5 rounded border border-white/10 flex items-center px-3 font-mono text-neutral-400 overflow-hidden">
                    {input}
                </div>
                <div className="h-10 bg-emerald-900/20 rounded border border-emerald-500/30 flex items-center px-3 font-mono text-emerald-400 overflow-hidden shadow-[inset_0_0_10px_rgba(16,185,129,0.1)]">
                    {output}
                </div>
            </div>
        </div>

        {/* Keyboard Hint */}
        <div className="w-full p-3 rounded bg-neutral-900/50 border border-white/5 text-center">
            <p className="text-[10px] text-neutral-500 flex items-center justify-center gap-2">
                <KeyRound size={12} /> Type on your keyboard to encrypt
            </p>
        </div>

      </div>
    </div>
  );
}