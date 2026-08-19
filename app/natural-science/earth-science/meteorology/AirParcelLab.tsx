"use client";

import { useMemo, useState } from "react";
import { Cloud, CloudRain, Thermometer, Wind } from "lucide-react";

export default function AirParcelLab() {
  const [surfaceTemp, setSurfaceTemp] = useState(24);
  const [dewPoint, setDewPoint] = useState(14);
  const [altitude, setAltitude] = useState(1.2);

  const lcl = Math.max(0, (surfaceTemp - dewPoint) / 8);
  const parcelTemp = useMemo(() => {
    const dryLift = Math.min(altitude, lcl);
    const moistLift = Math.max(0, altitude - lcl);
    return surfaceTemp - dryLift * 9.8 - moistLift * 6;
  }, [surfaceTemp, altitude, lcl]);
  const parcelDewPoint = dewPoint - Math.min(altitude, lcl) * 2;
  const saturated = altitude >= lcl;

  return (
    <section className="overflow-hidden rounded-[30px] border border-sky-200/[0.12] bg-black/[0.18] backdrop-blur-xl">
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-sky-200/62"><Wind size={13} /> Rising-air parcel lab</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.2vw,3rem)] font-semibold tracking-[-0.047em] text-white">Lift air until cooling brings it to saturation.</h2>
          <p className="mt-2 max-w-3xl text-[12px] leading-6 text-slate-400">Rising air expands as pressure falls and therefore cools. Before saturation, this lab uses a dry-adiabatic approximation of 9.8°C/km; after the estimated cloud base, it uses a simplified 6°C/km moist rate.</p>
        </div>
        <div className="border-t border-white/[0.07] p-5 lg:border-l lg:border-t-0">
          <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">Approximate cloud base</div>
          <div className="mt-2 text-[36px] font-semibold tracking-[-0.06em] text-sky-200">{lcl.toFixed(2)} km</div>
          <p className="mt-1 text-[9px] leading-4 text-slate-600">Estimated lifting condensation level using a simple temperature–dew-point spread rule.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="border-b border-white/[0.07] p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <Slider label="Surface temperature" value={surfaceTemp} min={5} max={35} suffix="°C" onChange={setSurfaceTemp} />
          <Slider label="Surface dew point" value={dewPoint} min={-5} max={28} suffix="°C" onChange={setDewPoint} />
          <Slider label="Parcel altitude" value={altitude} min={0} max={4} step={0.1} suffix=" km" onChange={setAltitude} />
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className={`flex h-12 w-12 items-center justify-center rounded-full border ${saturated ? "border-cyan-200/25 bg-cyan-200/[0.05] text-cyan-100" : "border-amber-200/20 bg-amber-200/[0.04] text-amber-100"}`}>
              {saturated ? <CloudRain size={19} /> : <Cloud size={19} />}
            </span>
            <div><div className="font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">Parcel state</div><h3 className="mt-1 text-[18px] font-semibold text-white">{saturated ? "Saturated / cloud-forming" : "Unsaturated"}</h3></div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <Readout icon={Thermometer} label="Parcel temperature" value={`${parcelTemp.toFixed(1)}°C`} />
            <Readout icon={Cloud} label="Parcel dew point" value={`${parcelDewPoint.toFixed(1)}°C`} />
          </div>

          <div className="mt-5 h-52 rounded-[18px] border border-white/[0.06] bg-[linear-gradient(to_top,rgba(14,165,233,0.12),rgba(15,23,42,0.12))] p-4">
            <div className="relative h-full border-l border-white/[0.08]">
              <div className="absolute inset-x-0 border-t border-dashed border-cyan-200/25" style={{ bottom: `${Math.min(100, (lcl / 4) * 100)}%` }}><span className="absolute -top-4 left-2 font-mono text-[7px] uppercase text-cyan-200/50">LCL</span></div>
              <div className="absolute left-[-6px] flex h-3 w-3 items-center justify-center rounded-full border border-white/20 bg-sky-300 transition-[bottom] duration-300" style={{ bottom: `calc(${Math.min(100, (altitude / 4) * 100)}% - 6px)` }} />
            </div>
          </div>

          <p className="mt-4 text-[9px] leading-4 text-slate-600">This is a conceptual parcel model. Real atmospheric profiles vary with pressure, humidity, entrainment, stability, phase changes, and environmental temperature.</p>
        </div>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, step = 1, suffix, onChange }: { label: string; value: number; min: number; max: number; step?: number; suffix: string; onChange: (value: number) => void }) {
  return <div className="border-b border-white/[0.06] py-5 first:pt-0 last:border-b-0 last:pb-0"><div className="flex items-center justify-between gap-3"><span className="text-[11px] font-semibold text-white/82">{label}</span><span className="font-mono text-[11px] text-sky-200/68">{value}{suffix}</span></div><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-4 w-full accent-sky-400" /><div className="mt-1 flex justify-between font-mono text-[7px] text-slate-700"><span>{min}{suffix}</span><span>{max}{suffix}</span></div></div>;
}

function Readout({ icon: Icon, label, value }: { icon: typeof Thermometer; label: string; value: string }) {
  return <div className="rounded-[14px] border border-white/[0.06] bg-black/[0.10] p-3"><Icon size={12} className="text-sky-200/50" /><div className="mt-2 font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">{label}</div><strong className="mt-1 block text-[13px] text-white/82">{value}</strong></div>;
}
