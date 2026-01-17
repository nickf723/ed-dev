"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChefHat, List, AlignLeft, PlayCircle, ShoppingCart } from "lucide-react";
import { MealRecord } from "./useCulinary";

interface Props {
  mealId: string;
  fetchDetails: (id: string) => Promise<MealRecord | null>;
  onClose: () => void;
}

export default function RecipeModal({ mealId, fetchDetails, onClose }: Props) {
  const [recipe, setRecipe] = useState<MealRecord | null>(null);

  useEffect(() => { fetchDetails(mealId).then(setRecipe); }, [mealId]);

  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-stone-950/90 backdrop-blur-sm cursor-pointer" />
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#1c1917] border border-orange-500/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        
        <div className="w-full md:w-1/3 relative bg-black shrink-0">
             <img src={recipe.thumbnail} alt={recipe.name} className="w-full h-full object-cover opacity-90" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] to-transparent" />
             <div className="absolute bottom-0 left-0 p-8">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold uppercase tracking-widest mb-3">
                     <ChefHat size={12} /> {recipe.area} Cuisine
                 </div>
                 <h2 className="text-3xl font-black text-white leading-none mb-2">{recipe.name}</h2>
             </div>
        </div>

        <div className="flex-1 p-8 md:p-10 overflow-y-auto custom-scrollbar bg-[#292524]">
            <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-4">
                 <button onClick={onClose} className="ml-auto p-2 hover:bg-white/5 rounded-full"><X className="text-stone-500 hover:text-white" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-4 flex items-center gap-2"><List size={14} /> Mise En Place</h3>
                    <ul className="space-y-2">
                        {recipe.ingredients?.map((ing, i) => (
                            <li key={i} className="flex justify-between items-center text-sm py-2 border-b border-white/5 group">
                                <Link href={`/humanities/culinary-arts/market?search=${ing.item}&aisle=PRODUCE`} className="flex items-center gap-2 text-stone-300 hover:text-emerald-400 transition-colors">
                                    <ShoppingCart size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /> {ing.item}
                                </Link>
                                <span className="font-mono text-stone-500 text-xs">{ing.measure}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-4 flex items-center gap-2"><AlignLeft size={14} /> Execution</h3>
                    <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">{recipe.instructions}</p>
                    {recipe.youtube && (
                        <a href={recipe.youtube} target="_blank" className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded bg-red-600/20 text-red-400 border border-red-600/30 text-xs font-bold uppercase tracking-widest hover:bg-red-600/30 transition-colors">
                            <PlayCircle size={14} /> Watch Technique
                        </a>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}