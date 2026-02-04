"use client";
import React, { useState, useEffect } from 'react';
import { Wind, Thermometer, Navigation, CloudRain } from 'lucide-react';

export default function ChicagoLiveDash() {
  const [windSpeed, setWindSpeed] = useState(15);
  
  // Simulate wind gusts
  useEffect(() => {
    const interval = setInterval(() => {
        setWindSpeed(Math.floor(Math.random() * 10) + 12);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        
        {/* WIND GAUGE */}
        <div className="p-4 bg-slate-900/80 border border-sky-500/30 rounded-xl backdrop-blur-md flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-sky-500/5 group-hover:bg-sky-500/10 transition-colors" />
            <Wind className="text-sky-400 mb-2" size={20} />
            <div className="text-2xl font-black text-white">{windSpeed} <span className="text-xs font-normal text-sky-400">MPH</span></div>
            <div className="text-[10px] uppercase font-bold text-slate-500 mt-1">Off The Lake</div>
        </div>

        {/* TEMP GAUGE */}
        <div className="p-4 bg-slate-900/80 border border-white/10 rounded-xl backdrop-blur-md flex flex-col items-center justify-center">
            <Thermometer className="text-red-400 mb-2" size={20} />
            <div className="text-2xl font-black text-white">42° <span className="text-xs font-normal text-slate-400">F</span></div>
            <div className="text-[10px] uppercase font-bold text-slate-500 mt-1">Real Feel: 34°</div>
        </div>

        {/* DIRECTION */}
        <div className="p-4 bg-slate-900/80 border border-white/10 rounded-xl backdrop-blur-md flex flex-col items-center justify-center">
            <Navigation className="text-slate-300 mb-2 rotate-45" size={20} />
            <div className="text-2xl font-black text-white">NE</div>
            <div className="text-[10px] uppercase font-bold text-slate-500 mt-1">Wind Direction</div>
        </div>

        {/* STATUS */}
        <div className="p-4 bg-slate-900/80 border border-white/10 rounded-xl backdrop-blur-md flex flex-col items-center justify-center">
            <CloudRain className="text-slate-400 mb-2" size={20} />
            <div className="text-lg font-black text-white uppercase">Overcast</div>
            <div className="text-[10px] uppercase font-bold text-slate-500 mt-1">Visibility: 8mi</div>
        </div>

    </div>
  );
}