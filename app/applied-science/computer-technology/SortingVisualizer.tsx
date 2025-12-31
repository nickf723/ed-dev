"use client";
import { useState, useEffect, useRef } from "react";
import { RefreshCw, Play, BarChart3 } from "lucide-react";

export default function SortingVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null); // Visual highlight
  const [compareIndex, setCompareIndex] = useState<number | null>(null); // Visual highlight

  const count = 30;

  // Generate random array
  const reset = () => {
      const arr = Array.from({ length: count }, () => Math.floor(Math.random() * 100) + 5);
      setArray(arr);
      setSorting(false);
      setPivotIndex(null);
      setCompareIndex(null);
  };

  useEffect(() => { reset(); }, []);

  // Bubble Sort (Async for visual delay)
  const bubbleSort = async () => {
      setSorting(true);
      const arr = [...array];
      const len = arr.length;
      
      for (let i = 0; i < len; i++) {
          for (let j = 0; j < len - i - 1; j++) {
              if (!sorting) return; // Break if reset (imperfect but functional for simple demo)
              
              setPivotIndex(j);
              setCompareIndex(j + 1);
              
              if (arr[j] > arr[j + 1]) {
                  // Swap
                  let temp = arr[j];
                  arr[j] = arr[j + 1];
                  arr[j + 1] = temp;
                  setArray([...arr]);
              }
              // Delay
              await new Promise(r => setTimeout(r, 20));
          }
      }
      setPivotIndex(null);
      setCompareIndex(null);
      setSorting(false);
  };

  return (
    <div className="bg-black/80 border border-green-500/30 rounded-xl p-6 backdrop-blur-md shadow-[0_0_30px_rgba(34,197,94,0.1)] flex flex-col h-full">
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-green-400 flex items-center gap-2 font-mono tracking-widest text-sm">
                <BarChart3 size={16} /> ALGORITHM_VISUALIZER
            </h3>
            <div className="text-[10px] font-mono text-green-500/50">BUBBLE_SORT.EXE</div>
        </div>

        {/* VISUALIZER */}
        <div className="flex-1 flex items-end gap-1 mb-6 border-b border-green-500/20 pb-1 h-32">
            {array.map((val, i) => {
                let color = "bg-green-500/40";
                if (i === pivotIndex) color = "bg-white"; // Active
                if (i === compareIndex) color = "bg-cyan-400"; // Comparing
                
                return (
                    <div 
                        key={i} 
                        className={`flex-1 rounded-t-sm transition-all duration-75 ${color}`}
                        style={{ height: `${val}%` }}
                    />
                );
            })}
        </div>

        {/* CONTROLS */}
        <div className="flex gap-2">
            <button 
                onClick={bubbleSort}
                disabled={sorting}
                className="flex-1 py-3 bg-green-500/10 border border-green-500/50 text-green-400 font-mono text-xs font-bold rounded hover:bg-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
            >
                <Play size={14} /> EXECUTE
            </button>
            <button 
                onClick={reset}
                className="px-4 py-3 bg-black border border-white/20 text-white/50 hover:text-white hover:border-white transition-colors rounded"
            >
                <RefreshCw size={14} />
            </button>
        </div>

    </div>
  );
}