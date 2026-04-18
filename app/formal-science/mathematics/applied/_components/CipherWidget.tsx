"use client";
import React, { useState } from 'react';
import { Lock, Unlock, KeyRound, Terminal } from 'lucide-react';

export default function CipherWidget() {
  const [message, setMessage] = useState("HELLO WORLD");
  const [shift, setShift] = useState(3);

  // The Caesar Cipher Algorithm
  const encrypt = (text: string, shiftValue: number) => {
    return text.toUpperCase().replace(/[A-Z]/g, (char) => {
      const code = char.charCodeAt(0);
      return String.fromCharCode(((code - 65 + shiftValue) % 26) + 65);
    });
  };

  const encryptedMessage = encrypt(message, shift);

  return (
    <div className="w-full h-full bg-black/40 backdrop-blur-md border border-cyan-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col font-mono">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      {/* Header */}
      <div className="relative z-10 flex justify-between items-center mb-8 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <Lock size={18} />
            <h3 className="font-bold uppercase tracking-widest text-sm">Cryptography Lab</h3>
          </div>
          <div className="text-[10px] text-slate-500 tracking-widest uppercase">Caesar Cipher Protocol</div>
        </div>
        <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400">
          <Terminal size={18} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 flex-1">
        {/* LEFT: Controls */}
        <div className="w-full md:w-1/3 flex flex-col justify-center space-y-6">
          
          <div>
            <label className="text-xs font-mono text-slate-400 mb-2 block uppercase tracking-widest">Input Data (Plaintext)</label>
            <input 
              type="text" 
              maxLength={20}
              value={message}
              onChange={(e) => setMessage(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
              className="w-full bg-cyan-950/30 border border-cyan-500/30 rounded-lg p-3 text-white outline-none focus:border-cyan-400 transition-colors uppercase"
              placeholder="ENTER TEXT..."
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-2 uppercase tracking-widest">
              <span className="flex items-center gap-1"><KeyRound size={12}/> Shift Key (k)</span>
              <span className="text-cyan-300 font-bold">+{shift}</span>
            </div>
            <input 
              type="range" min="1" max="25" value={shift} 
              onChange={(e) => setShift(Number(e.target.value))}
              className="w-full accent-cyan-500" 
            />
            <p className="text-[10px] text-slate-500 mt-2 leading-tight">
              Shifts every letter in the alphabet by {shift} positions. Used by Julius Caesar for military commands.
            </p>
          </div>
        </div>

        {/* RIGHT: Visualizer */}
        <div className="flex-1 min-h-[200px] bg-[#020617] rounded-2xl border border-cyan-500/30 relative flex flex-col p-6 shadow-inner justify-center">
          
          <div className="absolute top-4 left-4 text-[10px] text-cyan-500/50 uppercase tracking-widest">Output Data (Ciphertext)</div>
          
          {/* Decrypted Visual */}
          <div className="flex justify-center items-center gap-1 opacity-50 mb-6">
            {message.padEnd(10, ' ').split('').map((char, i) => (
              <div key={`p-${i}`} className="w-8 h-10 flex items-center justify-center border border-white/10 rounded bg-white/5 text-lg font-bold text-slate-400">
                {char.trim() === '' ? '-' : char.toUpperCase()}
              </div>
            ))}
          </div>

          {/* Flow Arrows */}
          <div className="flex justify-center items-center gap-2 mb-6 text-cyan-500/40">
             {Array(5).fill(0).map((_, i) => <div key={i} className="w-1 h-3 rounded-full bg-cyan-500/20 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />)}
          </div>

          {/* Encrypted Visual */}
          <div className="flex justify-center items-center gap-1">
            {encryptedMessage.padEnd(10, ' ').split('').map((char, i) => (
              <div key={`c-${i}`} className="w-10 h-14 flex items-center justify-center border-2 border-cyan-500/50 rounded-lg bg-cyan-950/50 text-2xl font-black text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                {char.trim() === '' ? '-' : char}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}