"use client";

import { useState } from "react";
import { Activity, Thermometer } from "lucide-react";
import ThermoField from "./ThermoField";

export default function ThermoAtmosphere() {
  const [energy, setEnergy] = useState(0.58);

  const state =
    energy < 0.34
      ? { label: "cool ensemble", note: "slower typical microscopic motion", rgb: "56, 189, 248" }
      : energy < 0.7
        ? { label: "warm ensemble", note: "moderate microscopic agitation", rgb: "251, 146, 60" }
        : { label: "hot ensemble", note: "faster typical microscopic motion", rgb: "248, 113, 113" };

  return (
    <>
      <ThermoField mode="overview" intensity={1.28} energyLevel={energy} />

      <div className="fixed bottom-5 right-5 z-20 hidden w-[270px] rounded-[20px] border border-white/[0.09] bg-[#09080e]/58 p-4 shadow-[0_20px_65px_rgba(0,0,0,0.28)] backdrop-blur-2xl xl:block">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              <Thermometer size={12} /> Microscopic agitation
            </div>
            <strong className="mt-1 block text-[12px]" style={{ color: `rgb(${state.rgb})` }}>
              {state.label}
            </strong>
          </div>
          <Activity size={15} style={{ color: `rgba(${state.rgb},0.72)` }} />
        </div>

        <input
          aria-label="Microscopic agitation"
          type="range"
          min="0.08"
          max="1"
          step="0.01"
          value={energy}
          onChange={(event) => setEnergy(Number(event.target.value))}
          className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-orange-400"
        />

        <div className="mt-2 flex justify-between font-mono text-[8px] uppercase tracking-[0.09em] text-slate-700">
          <span>cooler</span>
          <span>hotter</span>
        </div>
        <p className="mt-3 text-[9px] leading-4 text-slate-600">{state.note}. Move the pointer through the field to perturb nearby particles.</p>
      </div>
    </>
  );
}
