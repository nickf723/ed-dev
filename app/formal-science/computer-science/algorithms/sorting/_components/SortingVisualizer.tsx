"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Play, RefreshCw, SquareTerminal, Zap, FastForward, Activity } from 'lucide-react';

const ARRAY_SIZE = 40;
const SPEED_MS = 20;

export default function SortingVisualizer() {
    const [array, setArray] = useState<number[]>([]);
    const [isSorting, setIsSorting] = useState(false);
    
    const [comparing, setComparing] = useState<number[]>([]);
    const [swapping, setSwapping] = useState<number[]>([]);
    const [sorted, setSorted] = useState<number[]>([]);
    const [pivot, setPivot] = useState<number | null>(null);
    
    const sortingRef = useRef(false);

    const generateArray = () => {
        if (isSorting) return;
        const newArr = Array.from({ length: ARRAY_SIZE }).map(() => Math.floor(Math.random() * 80) + 10);
        setArray(newArr);
        setComparing([]);
        setSwapping([]);
        setSorted([]);
        setPivot(null);
    };

    useEffect(() => { generateArray(); }, []);

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const finishSort = (arr: number[]) => {
        if (!sortingRef.current) return;
        setComparing([]);
        setSwapping([]);
        setPivot(null);
        setSorted(arr.map((_, i) => i));
        setIsSorting(false);
    };

    // ==========================================
    // O(n^2) ALGORITHMS
    // ==========================================

    const bubbleSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        sortingRef.current = true;
        let arr = [...array];
        let sortedIndices: number[] = [];

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (!sortingRef.current) return;
                setComparing([j, j + 1]);
                await sleep(SPEED_MS);

                if (arr[j] > arr[j + 1]) {
                    setSwapping([j, j + 1]);
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    setArray([...arr]);
                    await sleep(SPEED_MS);
                }
            }
            sortedIndices.push(arr.length - 1 - i);
            setSorted([...sortedIndices]);
        }
        finishSort(arr);
    };

    const insertionSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        sortingRef.current = true;
        let arr = [...array];
        let sortedIndices: number[] = [0];

        for (let i = 1; i < arr.length; i++) {
            let current = arr[i];
            let j = i - 1;
            setComparing([i]);
            await sleep(SPEED_MS);

            while (j >= 0 && arr[j] > current) {
                if (!sortingRef.current) return;
                setSwapping([j, j + 1]);
                arr[j + 1] = arr[j];
                setArray([...arr]);
                await sleep(SPEED_MS);
                j--;
            }
            arr[j + 1] = current;
            setArray([...arr]);
            sortedIndices.push(i);
            setSorted([...sortedIndices]);
        }
        finishSort(arr);
    };

    const selectionSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        sortingRef.current = true;
        let arr = [...array];
        let sortedIndices: number[] = [];

        for (let i = 0; i < arr.length; i++) {
            let minIdx = i;
            setPivot(minIdx); // Use pivot color to highlight current minimum
            
            for (let j = i + 1; j < arr.length; j++) {
                if (!sortingRef.current) return;
                setComparing([j, minIdx]);
                await sleep(SPEED_MS);
                
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                    setPivot(minIdx);
                }
            }
            
            if (minIdx !== i) {
                setSwapping([i, minIdx]);
                let temp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = temp;
                setArray([...arr]);
                await sleep(SPEED_MS * 2);
            }
            sortedIndices.push(i);
            setSorted([...sortedIndices]);
        }
        finishSort(arr);
    };

    // ==========================================
    // O(n log n) ALGORITHMS
    // ==========================================

    const partition = async (arr: number[], low: number, high: number) => {
        let pivotVal = arr[high];
        setPivot(high);
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (!sortingRef.current) return i + 1;
            setComparing([j, high]);
            await sleep(SPEED_MS);

            if (arr[j] < pivotVal) {
                i++;
                setSwapping([i, j]);
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                setArray([...arr]);
                await sleep(SPEED_MS);
            }
        }
        setSwapping([i + 1, high]);
        let temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        setArray([...arr]);
        await sleep(SPEED_MS);
        return i + 1;
    };

    const quickSortRecursive = async (arr: number[], low: number, high: number) => {
        if (low < high) {
            let pi = await partition(arr, low, high);
            if (!sortingRef.current) return;
            setSorted(prev => [...prev, pi]);
            await quickSortRecursive(arr, low, pi - 1);
            await quickSortRecursive(arr, pi + 1, high);
        } else if (low === high) {
            setSorted(prev => [...prev, low]);
        }
    };

    const runQuickSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        sortingRef.current = true;
        let arr = [...array];
        await quickSortRecursive(arr, 0, arr.length - 1);
        finishSort(arr);
    };

    const merge = async (arr: number[], l: number, m: number, r: number) => {
        let n1 = m - l + 1;
        let n2 = r - m;
        let L = new Array(n1);
        let R = new Array(n2);

        for (let i = 0; i < n1; i++) L[i] = arr[l + i];
        for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

        let i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
            if (!sortingRef.current) return;
            setComparing([l + i, m + 1 + j]);
            await sleep(SPEED_MS);

            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            setSwapping([k]);
            setArray([...arr]);
            await sleep(SPEED_MS);
            k++;
        }

        while (i < n1) {
            if (!sortingRef.current) return;
            arr[k] = L[i];
            setSwapping([k]);
            setArray([...arr]);
            await sleep(SPEED_MS);
            i++; k++;
        }

        while (j < n2) {
            if (!sortingRef.current) return;
            arr[k] = R[j];
            setSwapping([k]);
            setArray([...arr]);
            await sleep(SPEED_MS);
            j++; k++;
        }
    };

    const mergeSortRecursive = async (arr: number[], l: number, r: number) => {
        if (l >= r) return;
        let m = l + Math.floor((r - l) / 2);
        if (!sortingRef.current) return;
        
        await mergeSortRecursive(arr, l, m);
        await mergeSortRecursive(arr, m + 1, r);
        await merge(arr, l, m, r);
    };

    const runMergeSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        sortingRef.current = true;
        let arr = [...array];
        await mergeSortRecursive(arr, 0, arr.length - 1);
        finishSort(arr);
    };

    const handleReset = () => {
        sortingRef.current = false;
        setIsSorting(false);
        generateArray();
    };

    return (
        <div className="w-full bg-zinc-950/80 backdrop-blur-xl border border-indigo-500/20 rounded-2xl overflow-hidden shadow-2xl font-sans">
            <div className="bg-indigo-950/30 border-b border-indigo-500/20 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/20 border border-indigo-500/30 rounded-lg">
                        <SquareTerminal size={18} className="text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wide">Sorting Visualizer</h3>
                        <p className="text-[10px] text-indigo-300/60 font-mono uppercase tracking-widest">Efficiency Comparison</p>
                    </div>
                </div>
                <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-400 font-bold text-[10px] uppercase tracking-widest transition-colors"
                >
                    <RefreshCw size={12} /> Reset Data
                </button>
            </div>

            <div className="p-6 flex flex-col items-center">
                {/* Visual Array Canvas */}
                <div className="w-full h-[250px] bg-black/50 border border-white/10 rounded-xl mb-6 p-4 flex items-end justify-center gap-[2px] shadow-inner">
                    {array.map((val, idx) => {
                        let bgColor = 'bg-zinc-600';
                        if (idx === pivot) bgColor = 'bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]';
                        else if (sorted.includes(idx)) bgColor = 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
                        else if (swapping.includes(idx)) bgColor = 'bg-rose-500';
                        else if (comparing.includes(idx)) bgColor = 'bg-amber-400';

                        return (
                            <div 
                                key={idx}
                                className={`w-full rounded-t-sm transition-all duration-75 ${bgColor}`}
                                style={{ height: `${val}%` }}
                            />
                        );
                    })}
                </div>

                {/* Diagnostics */}
                <div className="flex flex-wrap justify-center gap-4 mb-6 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-fuchsia-500 rounded-sm"/> Pivot / Min</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-400 rounded-sm"/> Comparing</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-rose-500 rounded-sm"/> Swapping / Merging</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm"/> Sorted</div>
                </div>

                {/* Control Board */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
                    {/* O(n^2) Tier */}
                    <button onClick={bubbleSort} disabled={isSorting || sorted.length === array.length} className="flex justify-center items-center gap-2 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 disabled:opacity-50 border border-indigo-500/30 rounded-lg text-indigo-300 font-bold text-[11px] uppercase tracking-widest transition-colors">
                        <Play size={14} /> Bubble
                    </button>
                    <button onClick={insertionSort} disabled={isSorting || sorted.length === array.length} className="flex justify-center items-center gap-2 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 disabled:opacity-50 border border-indigo-500/30 rounded-lg text-indigo-300 font-bold text-[11px] uppercase tracking-widest transition-colors">
                        <Activity size={14} /> Insertion
                    </button>
                    <button onClick={selectionSort} disabled={isSorting || sorted.length === array.length} className="col-span-2 md:col-span-1 flex justify-center items-center gap-2 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 disabled:opacity-50 border border-indigo-500/30 rounded-lg text-indigo-300 font-bold text-[11px] uppercase tracking-widest transition-colors">
                        <Play size={14} /> Selection
                    </button>

                    {/* O(n log n) Tier */}
                    <button onClick={runQuickSort} disabled={isSorting || sorted.length === array.length} className="col-span-2 md:col-span-1 flex justify-center items-center gap-2 py-3 bg-sky-500/20 hover:bg-sky-500/30 disabled:opacity-50 border border-sky-500/50 rounded-xl text-sky-300 font-bold text-xs uppercase tracking-widest transition-colors shadow-[0_0_15px_rgba(14,165,233,0.15)] mt-2">
                        <Zap size={14} /> Quick Sort
                    </button>
                    <button onClick={runMergeSort} disabled={isSorting || sorted.length === array.length} className="col-span-2 flex justify-center items-center gap-2 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 disabled:opacity-50 border border-emerald-500/50 rounded-xl text-emerald-300 font-bold text-xs uppercase tracking-widest transition-colors shadow-[0_0_15px_rgba(16,185,129,0.15)] mt-2">
                        <FastForward size={14} /> Merge Sort
                    </button>
                </div>
            </div>
        </div>
    );
}