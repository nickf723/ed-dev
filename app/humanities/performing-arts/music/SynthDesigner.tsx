"use client";
import React from 'react';
import { Settings, Sliders, Activity, Zap, Waves } from 'lucide-react';
import { SynthParams, OscillatorShape } from './_hooks/useAudioEngine';

interface Props {
  params: SynthParams;
  setParams: (p: SynthParams) => void;
  reverb: boolean;
  setReverb: (r: boolean) => void;
}

export default function SynthDesigner({ params, setParams, reverb, setReverb }: Props) {
  const update = (key: keyof SynthParams, value: any) => {
    setParams({ ...params, [key]: value });
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 w-full md:w-64 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase pb-2 border-b border-neutral-800">
            <Activity size={14} /> Sound Designer
        </div>

        {/* Waveform Selector */}
        <div>
            <label className="text-[10px] font-bold text-neutral-500 mb-1 flex items-center gap-2"><Waves size={10} /> OSCILLATOR</label>
            <div className="grid grid-cols-4 gap-1">
                {['sine', 'triangle', 'square', 'sawtooth'].map(wave => (
                    <button
                        key={wave}
                        onClick={() => update('wave', wave)}
                        className={`h-8 rounded flex items-center justify-center border transition-all ${params.wave === wave ? 'bg-amber-600 border-amber-500 text-white' : 'bg-neutral-800 border-neutral-700 text-neutral-500 hover:text-white'}`}
                        title={wave}
                    >
                        {wave === 'sine' && '∿'}
                        {wave === 'triangle' && 'Λ'}
                        {wave === 'square' && '∏'}
                        {wave === 'sawtooth' && 'N'}
                    </button>
                ))}
            </div>
        </div>

        {/* ADSR Sliders */}
        <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400">
                <span>ATTACK</span>
                <span>{params.attack.toFixed(2)}s</span>
            </div>
            <input type="range" min="0.01" max="2" step="0.01" value={params.attack} onChange={(e) => update('attack', parseFloat(e.target.value))} className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />

            <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400">
                <span>RELEASE</span>
                <span>{params.release.toFixed(2)}s</span>
            </div>
            <input type="range" min="0.1" max="5" step="0.1" value={params.release} onChange={(e) => update('release', parseFloat(e.target.value))} className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />
        </div>

        {/* Reverb Toggle */}
        <button 
            onClick={() => setReverb(!reverb)}
            className={`w-full py-2 rounded text-xs font-bold uppercase border transition-all flex items-center justify-center gap-2 ${reverb ? 'bg-blue-900/30 border-blue-500 text-blue-400' : 'bg-neutral-800 border-neutral-700 text-neutral-500'}`}
        >
            <Zap size={12} /> {reverb ? 'Reverb Active' : 'Dry Signal'}
        </button>
    </div>
  );
}