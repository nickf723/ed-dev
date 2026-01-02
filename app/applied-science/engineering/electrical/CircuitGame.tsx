"use client";
import { useState, useEffect } from "react";
import { 
  Zap, Lightbulb, RotateCcw, Play, Lock, 
  ArrowRight, ArrowDown, CornerUpRight, CornerUpLeft, 
  CornerDownRight, CornerDownLeft, Minus, MoreVertical 
} from "lucide-react";

type ItemType = "empty" | "wall" | "battery" | "bulb" | "wire_h" | "wire_v" | "corner_tr" | "corner_tl" | "corner_br" | "corner_bl";
type Cell = { type: ItemType; powered: boolean; locked: boolean };

const GRID_SIZE = 6;
// Simple level: Battery top-left, Bulb bottom-right, wall in middle
const INITIAL_GRID: ItemType[][] = [
    ["battery", "empty", "empty", "empty", "empty", "empty"],
    ["empty", "empty", "wall", "empty", "empty", "empty"],
    ["empty", "empty", "wall", "empty", "empty", "empty"],
    ["empty", "empty", "wall", "empty", "empty", "empty"],
    ["empty", "empty", "wall", "empty", "empty", "empty"],
    ["empty", "empty", "empty", "empty", "empty", "bulb"],
];

export default function CircuitGame() {
  const [grid, setGrid] = useState<Cell[]>([]);
  const [selectedTool, setSelectedTool] = useState<ItemType>("wire_h");
  const [isRunning, setIsRunning] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => { resetLevel(); }, []);

  const resetLevel = () => {
    const newGrid: Cell[] = [];
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const type = INITIAL_GRID[y][x];
            newGrid.push({ 
                type, 
                powered: type === 'battery', 
                locked: type === 'battery' || type === 'bulb' || type === 'wall' 
            });
        }
    }
    setGrid(newGrid);
    setIsRunning(false);
    setWon(false);
  };

  // --- SIMULATION (BFS FLOOD FILL) ---
  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    const nextGrid = [...grid];
    
    // Clear previous power
    nextGrid.forEach(c => { if (c.type !== 'battery') c.powered = false; });
    setWon(false);

    const queue = [nextGrid.findIndex(c => c.type === 'battery')];
    const visited = new Set(queue);

    const interval = setInterval(() => {
        if (queue.length === 0) {
            clearInterval(interval);
            setIsRunning(false);
            return;
        }

        const currIdx = queue.shift()!;
        const currCell = nextGrid[currIdx];
        const cx = currIdx % GRID_SIZE;
        const cy = Math.floor(currIdx / GRID_SIZE);

        // Check 4 directions
        const neighbors = [
            { idx: currIdx - 1, x: cx - 1, y: cy, dir: 'left' },
            { idx: currIdx + 1, x: cx + 1, y: cy, dir: 'right' },
            { idx: currIdx - GRID_SIZE, x: cx, y: cy - 1, dir: 'up' },
            { idx: currIdx + GRID_SIZE, x: cx, y: cy + 1, dir: 'down' }
        ];

        let foundBulb = false;

        neighbors.forEach(n => {
            if (n.x >= 0 && n.x < GRID_SIZE && n.y >= 0 && n.y < GRID_SIZE) {
                const neighborCell = nextGrid[n.idx];
                // Check connectivity in both directions
                if (canConnect(currCell.type, n.dir as any) && canConnect(neighborCell.type, opposite(n.dir) as any)) {
                    if (!visited.has(n.idx)) {
                        neighborCell.powered = true;
                        visited.add(n.idx);
                        queue.push(n.idx);
                        if (neighborCell.type === 'bulb') foundBulb = true;
                    }
                }
            }
        });

        setGrid([...nextGrid]);

        if (foundBulb) {
            setWon(true);
            clearInterval(interval);
            setIsRunning(false);
        }
    }, 150);
  };

  const opposite = (dir: string) => {
      if (dir === 'left') return 'right';
      if (dir === 'right') return 'left';
      if (dir === 'up') return 'down';
      return 'up';
  };

  const canConnect = (type: ItemType, dir: 'left'|'right'|'up'|'down') => {
      if (type === 'wall' || type === 'empty') return false;
      if (type === 'battery' || type === 'bulb') return true;
      if (type === 'wire_h') return dir === 'left' || dir === 'right';
      if (type === 'wire_v') return dir === 'up' || dir === 'down';
      if (type === 'corner_tr') return dir === 'up' || dir === 'right';
      if (type === 'corner_tl') return dir === 'up' || dir === 'left';
      if (type === 'corner_br') return dir === 'down' || dir === 'right';
      if (type === 'corner_bl') return dir === 'down' || dir === 'left';
      return false;
  };

  const handleCellClick = (idx: number) => {
      if (grid[idx].locked || isRunning) return;
      const newGrid = [...grid];
      newGrid[idx].type = newGrid[idx].type === selectedTool ? 'empty' : selectedTool;
      newGrid[idx].powered = false; 
      setGrid(newGrid);
  };

  // --- RENDERING ---
  // Render Game Board Cell (CSS Art for smooth scaling)
  const renderCell = (type: ItemType, powered: boolean) => {
      const wireColor = powered ? "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" : "bg-slate-700";
      switch(type) {
          case 'battery': return <div className="w-full h-full bg-green-600 flex items-center justify-center border-2 border-green-400 rounded"><Zap size={20} className="text-white fill-white"/></div>;
          case 'bulb': return <div className="w-full h-full flex items-center justify-center bg-slate-800 rounded border border-slate-600"><Lightbulb size={24} className={powered ? "text-yellow-400 fill-yellow-400 animate-pulse" : "text-slate-600"} /></div>;
          case 'wall': return <div className="w-full h-full bg-slate-900 flex items-center justify-center border border-slate-700"><Lock size={12} className="text-slate-700"/></div>;
          case 'wire_h': return <div className={`w-full h-1.5 ${wireColor} transition-colors`} />;
          case 'wire_v': return <div className={`h-full w-1.5 ${wireColor} transition-colors`} />;
          case 'corner_br': return <div className="relative w-full h-full"><div className={`absolute bottom-0 right-1/2 w-1.5 h-1/2 ${wireColor}`}/><div className={`absolute top-1/2 right-0 w-1/2 h-1.5 ${wireColor}`}/></div>;
          case 'corner_bl': return <div className="relative w-full h-full"><div className={`absolute bottom-0 left-1/2 w-1.5 h-1/2 ${wireColor}`}/><div className={`absolute top-1/2 left-0 w-1/2 h-1.5 ${wireColor}`}/></div>;
          case 'corner_tr': return <div className="relative w-full h-full"><div className={`absolute top-0 right-1/2 w-1.5 h-1/2 ${wireColor}`}/><div className={`absolute top-1/2 right-0 w-1/2 h-1.5 ${wireColor}`}/></div>;
          case 'corner_tl': return <div className="relative w-full h-full"><div className={`absolute top-0 left-1/2 w-1.5 h-1/2 ${wireColor}`}/><div className={`absolute top-1/2 left-0 w-1/2 h-1.5 ${wireColor}`}/></div>;
          default: return null;
      }
  };

  // Tool Icons for Buttons (Lucide Icons for clarity)
  const getToolIcon = (tool: ItemType) => {
      switch(tool) {
          case 'wire_h': return <Minus size={20} />;
          case 'wire_v': return <MoreVertical size={20} />;
          case 'corner_tl': return <CornerUpLeft size={20} />;
          case 'corner_tr': return <CornerUpRight size={20} />;
          case 'corner_bl': return <CornerDownLeft size={20} />;
          case 'corner_br': return <CornerDownRight size={20} />;
          default: return <Minus />;
      }
  };

  return (
    <div className="bg-slate-900 border border-cyan-500/30 rounded-xl p-6 shadow-2xl w-full max-w-md relative">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-cyan-400 flex items-center gap-2 font-mono tracking-wider text-sm">
                <Zap size={16} /> ELECTRIC_BOX
            </h3>
            {won && <span className="text-xs font-bold text-yellow-400 animate-bounce">CIRCUIT COMPLETE!</span>}
        </div>

        {/* GAME GRID */}
        <div className="aspect-square bg-black/40 p-2 rounded-lg border border-slate-700 mb-4 mx-auto w-full grid grid-cols-6 grid-rows-6 gap-1">
            {grid.map((cell, i) => (
                <div 
                    key={i} 
                    onClick={() => handleCellClick(i)}
                    className={`
                        flex items-center justify-center rounded-sm transition-colors border border-white/5
                        ${cell.type === 'empty' ? 'hover:bg-white/5 cursor-pointer' : ''}
                        ${cell.locked ? 'cursor-not-allowed bg-black/20' : 'cursor-pointer'}
                    `}
                >
                    {renderCell(cell.type, cell.powered)}
                </div>
            ))}
        </div>

        {/* TOOLBAR */}
        <div className="grid grid-cols-6 gap-1 mb-4">
            {(['wire_h', 'wire_v', 'corner_tl', 'corner_tr', 'corner_bl', 'corner_br'] as ItemType[]).map(tool => (
                <button
                    key={tool}
                    onClick={() => setSelectedTool(tool)}
                    className={`
                        h-10 rounded flex items-center justify-center transition-all
                        ${selectedTool === tool ? "bg-cyan-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}
                    `}
                >
                    {getToolIcon(tool)}
                </button>
            ))}
        </div>

        {/* CONTROLS */}
        <div className="flex gap-2">
            <button 
                onClick={runSimulation}
                disabled={isRunning || won}
                className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-black font-bold font-mono rounded flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs"
            >
                <Play size={14} fill="currentColor" /> POWER ON
            </button>
            <button 
                onClick={resetLevel}
                className="px-4 bg-slate-800 hover:bg-slate-700 text-white rounded flex items-center justify-center transition-colors"
            >
                <RotateCcw size={16} />
            </button>
        </div>
    </div>
  );
}