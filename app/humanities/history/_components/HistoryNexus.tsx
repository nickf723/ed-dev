"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

const THEMES = ['War & Conflict', 'Religion & Myth', 'Science & Tech', 'Art & Culture', 'Politics & Power', 'Daily Life'];

export default function HistoryNexus() {
  return (
    <div className="min-h-screen pt-24 px-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        <div className="mb-12">
            <h1 className="text-4xl font-black text-white mb-4">Historical Themes</h1>
            <p className="text-stone-400 max-w-2xl">Analyze history through the lens of specific human endeavors, ignoring the constraints of time periods.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {THEMES.map((theme, i) => (
                <div key={theme} className="h-64 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all p-8 flex flex-col justify-between cursor-pointer group hover:-translate-y-2 hover:shadow-2xl">
                    <div className="flex justify-between items-start">
                        <div className="text-4xl font-black text-stone-700 group-hover:text-stone-500 transition-colors">
                            0{i+1}
                        </div>
                        <ArrowRight className="text-stone-600 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                    
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-3">{theme}</h3>
                        <div className="h-0.5 w-12 bg-rose-500 group-hover:w-full transition-all duration-500 ease-out" />
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}