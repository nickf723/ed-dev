"use client";
import { useState } from "react";
import { ArrowRightLeft, Thermometer, Ruler, Weight } from "lucide-react";

const CONVERSIONS = {
  Temperature: {
    units: ["Celsius", "Fahrenheit", "Kelvin"],
    convert: (val: number, from: string, to: string) => {
        let c = val;
        if (from === "Fahrenheit") c = (val - 32) * 5/9;
        if (from === "Kelvin") c = val - 273.15;
        
        if (to === "Fahrenheit") return c * 9/5 + 32;
        if (to === "Kelvin") return c + 273.15;
        return c;
    },
    icon: Thermometer,
    color: "text-orange-400"
  },
  Length: {
    units: ["Meters", "Feet", "Inches", "Light Years"],
    convert: (val: number, from: string, to: string) => {
        let m = val;
        if (from === "Feet") m = val / 3.28084;
        if (from === "Inches") m = val / 39.3701;
        if (from === "Light Years") m = val * 9.461e15;

        if (to === "Feet") return m * 3.28084;
        if (to === "Inches") return m * 39.3701;
        if (to === "Light Years") return m / 9.461e15;
        return m;
    },
    icon: Ruler,
    color: "text-cyan-400"
  }
};

export default function UnitConverter() {
  const [mode, setMode] = useState<"Temperature" | "Length">("Temperature");
  const [val, setVal] = useState(0);
  const [fromUnit, setFromUnit] = useState(CONVERSIONS[mode].units[0]);
  const [toUnit, setToUnit] = useState(CONVERSIONS[mode].units[1]);

  const result = CONVERSIONS[mode].convert(val, fromUnit, toUnit);
  const Icon = CONVERSIONS[mode].icon;

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <ArrowRightLeft size={14} className={CONVERSIONS[mode].color} /> Converter
        </h3>
        <div className="flex gap-1 bg-black/20 p-1 rounded-lg">
            {Object.keys(CONVERSIONS).map(m => {
              const key = m as keyof typeof CONVERSIONS;
              return (
                <button 
                    key={m} 
                    onClick={() => { setMode(key); setFromUnit(CONVERSIONS[key].units[0]); setToUnit(CONVERSIONS[key].units[1]); }}
                    className={`px-2 py-1 text-[9px] font-bold uppercase rounded transition-colors ${mode === m ? "bg-white/20 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
                >
                    {m}
                </button>
              );
            })}
        </div>
      </div>

      <div className="p-6">
          
          {/* Input Row */}
          <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                  <label className="block text-[9px] font-bold uppercase text-neutral-500 mb-1">Input</label>
                  <div className="flex items-center gap-2 bg-neutral-950 border border-white/10 rounded-lg p-2">
                      <input 
                        type="number" value={val} onChange={(e) => setVal(Number(e.target.value))}
                        className="bg-transparent w-full text-lg font-mono text-white focus:outline-none"
                      />
                      <select 
                        value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                        className="bg-transparent text-xs font-bold text-neutral-400 focus:outline-none text-right"
                      >
                          {CONVERSIONS[mode].units.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                  </div>
              </div>
              
              <div className="flex-1">
                  <label className="block text-[9px] font-bold uppercase text-neutral-500 mb-1">Result</label>
                  <div className="flex items-center gap-2 bg-neutral-800/50 border border-white/5 rounded-lg p-2">
                      <span className={`w-full text-lg font-mono ${CONVERSIONS[mode].color}`}>
                          {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      </span>
                      <select 
                        value={toUnit} onChange={(e) => setToUnit(e.target.value)}
                        className="bg-transparent text-xs font-bold text-neutral-400 focus:outline-none text-right"
                      >
                          {CONVERSIONS[mode].units.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                  </div>
              </div>
          </div>

          {/* Visual Slider (Tactile Feel) */}
          <div>
              <input 
                type="range" min="-100" max="100" value={val} onChange={(e) => setVal(Number(e.target.value))}
                className={`w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-current ${CONVERSIONS[mode].color}`}
              />
              <div className="flex justify-between text-[9px] text-neutral-600 font-mono mt-1">
                  <span>-100</span>
                  <span>0</span>
                  <span>+100</span>
              </div>
          </div>

      </div>
    </div>
  );
}