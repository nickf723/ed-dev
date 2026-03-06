"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Network, FastForward, Turtle } from 'lucide-react';

type Node = { id: number; x: number; y: number; r: number; c: number };
type Edge = { u: number; v: number };
type Step = {
  current: number | null;
  visited: Set<number>;
  frontier: Set<number>;
  edgeTree: Edge[];
};

export default function TraversalLab() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [adjacencyList, setAdjacencyList] = useState<Map<number, number[]>>(new Map());
  
  const [algorithm, setAlgorithm] = useState<'BFS' | 'DFS'>('BFS');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(300); // Default to a much slower speed

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate a strict Grid Graph
  const generateGraph = useCallback(() => {
    const cols = 16;
    const rows = 8;
    const spacing = 40;
    const offsetX = 100;
    const offsetY = 60;

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    const adj = new Map<number, number[]>();

    // 1. Plot the Grid
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const id = r * cols + c;
        newNodes.push({ 
            id, 
            r, c,
            x: offsetX + c * spacing, 
            y: offsetY + r * spacing 
        });
        adj.set(id, []);
      }
    }

    // 2. Connect the Grid (Constant Edge Lengths)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const id = r * cols + c;
        
        // Connect Right
        if (c < cols - 1) {
            // Optional: Remove a few random edges (10%) to create a slight maze effect
            if (Math.random() > 0.1) {
                const rightId = r * cols + (c + 1);
                newEdges.push({ u: id, v: rightId });
                adj.get(id)!.push(rightId);
                adj.get(rightId)!.push(id);
            }
        }
        // Connect Down
        if (r < rows - 1) {
            if (Math.random() > 0.1) {
                const downId = (r + 1) * cols + c;
                newEdges.push({ u: id, v: downId });
                adj.get(id)!.push(downId);
                adj.get(downId)!.push(id);
            }
        }
      }
    }

    // 3. Shuffle the adjacency list! 
    // If we don't do this, DFS will just go in a boring straight line forever. 
    // Shuffling makes the snake twist and turn organically.
    for (let i = 0; i < newNodes.length; i++) {
        adj.get(i)!.sort(() => Math.random() - 0.5);
    }

    setNodes(newNodes);
    setEdges(newEdges);
    setAdjacencyList(adj);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, []);

  // Compute the steps
  useEffect(() => {
    if (nodes.length === 0) return;

    // Start roughly in the middle-left of the grid to watch it expand
    const startNode = Math.floor(8 / 2) * 16 + 2; 
    
    const computedSteps: Step[] = [];
    const visited = new Set<number>();
    const frontier = new Set<number>();
    const edgeTree: Edge[] = [];
    
    computedSteps.push({
      current: null,
      visited: new Set(),
      frontier: new Set([startNode]),
      edgeTree: []
    });

    if (algorithm === 'BFS') {
      const queue: { node: number, parent: number | null }[] = [{ node: startNode, parent: null }];
      frontier.add(startNode);

      while (queue.length > 0) {
        const { node: curr, parent } = queue.shift()!;
        
        frontier.delete(curr);
        visited.add(curr);
        if (parent !== null) edgeTree.push({ u: parent, v: curr });

        computedSteps.push({
          current: curr,
          visited: new Set(visited),
          frontier: new Set(frontier),
          edgeTree: [...edgeTree]
        });

        const neighbors = adjacencyList.get(curr)!;
        for (let i = neighbors.length - 1; i >= 0; i--) {
            const neighbor = neighbors[i];
            if (!visited.has(neighbor) && !frontier.has(neighbor)) {
                queue.push({ node: neighbor, parent: curr });
                frontier.add(neighbor);
            }
        }
      }
    } else {
      // DFS
      const stack: { node: number, parent: number | null }[] = [{ node: startNode, parent: null }];
      
      while (stack.length > 0) {
        const { node: curr, parent } = stack.pop()!;
        
        if (!visited.has(curr)) {
          visited.add(curr);
          if (parent !== null) edgeTree.push({ u: parent, v: curr });

          computedSteps.push({
            current: curr,
            visited: new Set(visited),
            frontier: new Set(stack.map(s => s.node).filter(n => !visited.has(n))),
            edgeTree: [...edgeTree]
          });

          const neighbors = adjacencyList.get(curr)!;
          for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
              stack.push({ node: neighbor, parent: curr });
            }
          }
        }
      }
    }

    computedSteps.push({
      current: null,
      visited: new Set(visited),
      frontier: new Set(),
      edgeTree: [...edgeTree]
    });

    setSteps(computedSteps);
    setCurrentStepIdx(0);
  }, [nodes, adjacencyList, algorithm]);

  // Initial mount
  useEffect(() => { generateGraph(); }, [generateGraph]);

  // Playback Loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, steps.length, speed]);

  const currentFrame = steps[currentStepIdx] || { current: null, visited: new Set(), frontier: new Set(), edgeTree: [] };

  const theme = algorithm === 'BFS' ? {
      primary: '#0ea5e9',
      secondary: 'rgba(14, 165, 233, 0.2)',
      active: '#38bdf8',
      bg: 'bg-sky-950/20'
  } : {
      primary: '#f43f5e',
      secondary: 'rgba(244, 63, 94, 0.2)',
      active: '#fb7185',
      bg: 'bg-rose-950/20'
  };

  const cycleSpeed = () => {
      if (speed === 300) setSpeed(100);
      else if (speed === 100) setSpeed(25);
      else setSpeed(300);
  };

  return (
    <div className="my-12 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50 shadow-2xl font-sans">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-black/80 border-b border-neutral-800 gap-4">
            <div className="flex items-center gap-4">
                <div className="flex gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
                    <button 
                        onClick={() => { setAlgorithm('BFS'); setIsPlaying(false); }} 
                        className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-widest transition-colors ${algorithm === 'BFS' ? 'bg-sky-600 text-white' : 'text-neutral-500 hover:text-white'}`}
                    >
                        BFS (Ripple)
                    </button>
                    <button 
                        onClick={() => { setAlgorithm('DFS'); setIsPlaying(false); }} 
                        className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-widest transition-colors ${algorithm === 'DFS' ? 'bg-rose-600 text-white' : 'text-neutral-500 hover:text-white'}`}
                    >
                        DFS (Snake)
                    </button>
                </div>
                <button onClick={generateGraph} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold uppercase">
                    <Network size={16}/> Reseed Maze
                </button>
            </div>
            
            <div className="flex items-center gap-2">
                <button onClick={() => setCurrentStepIdx(0)} className="p-2 text-neutral-400 hover:text-white transition-colors"><RotateCcw size={16}/></button>
                <button onClick={() => setIsPlaying(!isPlaying)} className={`p-2 rounded-full flex items-center justify-center transition-colors ${isPlaying ? 'bg-amber-500 text-black' : 'bg-white text-black'}`}>
                    {isPlaying ? <Pause size={16} className="fill-current"/> : <Play size={16} className="fill-current ml-0.5"/>}
                </button>
                <button onClick={cycleSpeed} className="p-2 text-neutral-400 hover:text-white transition-colors flex items-center gap-1 w-20 justify-center">
                    {speed === 300 ? <Turtle size={16} /> : <FastForward size={16} />}
                    <span className="text-[10px] font-mono">{speed}ms</span>
                </button>
            </div>
        </div>

        <div className="bg-[#020202] relative p-0 flex justify-center items-center w-full overflow-hidden border-b border-neutral-800 h-[450px]">
             <svg viewBox="0 0 800 450" className="w-full h-full">
                {/* 1. Base Grid Edges */}
                {edges.map((edge, i) => (
                    <line 
                        key={`base-${i}`}
                        x1={nodes[edge.u].x} y1={nodes[edge.u].y}
                        x2={nodes[edge.v].x} y2={nodes[edge.v].y}
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth="2"
                    />
                ))}

                {/* 2. Traversal Path */}
                {currentFrame.edgeTree.map((edge, i) => (
                    <line 
                        key={`tree-${i}`}
                        x1={nodes[edge.u].x} y1={nodes[edge.u].y}
                        x2={nodes[edge.v].x} y2={nodes[edge.v].y}
                        stroke={theme.primary}
                        strokeWidth="4"
                        className="transition-all duration-300 drop-shadow-[0_0_8px_currentColor]"
                    />
                ))}

                {/* 3. Grid Nodes */}
                {nodes.map(node => {
                    const isVisited = currentFrame.visited.has(node.id);
                    const isFrontier = currentFrame.frontier.has(node.id);
                    const isCurrent = currentFrame.current === node.id;

                    let fill = '#111';
                    let stroke = '#222';
                    let radius = 6;
                    let strokeWidth = 2;

                    if (isCurrent) {
                        fill = '#fff'; stroke = theme.active; radius = 10; strokeWidth = 3;
                    } else if (isFrontier) {
                        fill = theme.secondary; stroke = theme.primary; radius = 8;
                    } else if (isVisited) {
                        fill = theme.primary; stroke = theme.primary; radius = 6;
                    }

                    return (
                        <g key={`node-${node.id}`} className="transition-all duration-300 ease-out">
                            {isCurrent && (
                                <circle cx={node.x} cy={node.y} r={24} fill="none" stroke={theme.active} strokeWidth="2" className="animate-ping opacity-50" />
                            )}
                            <circle cx={node.x} cy={node.y} r={radius} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
                        </g>
                    );
                })}
             </svg>
        </div>

        <div className={`p-6 flex flex-col justify-center gap-4 ${theme.bg}`}>
            <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-neutral-500">START</span>
                <input 
                    type="range" min="0" max={Math.max(0, steps.length - 1)} step="1" 
                    value={currentStepIdx} 
                    onChange={e => { setCurrentStepIdx(parseInt(e.target.value)); setIsPlaying(false); }}
                    className="flex-1 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: theme.primary }}
                />
                <span className="text-[10px] font-mono text-neutral-500">END</span>
            </div>

            <div className="flex justify-between items-center text-xs font-mono uppercase">
                <div className="flex gap-6">
                    <span className="text-white"><strong style={{color: theme.primary}}>{currentFrame.visited.size}</strong> Explored</span>
                    <span className="text-white"><strong style={{color: theme.active}}>{currentFrame.frontier.size}</strong> Discovered</span>
                </div>
                <div className="text-neutral-500">Step {currentStepIdx} / {steps.length - 1}</div>
            </div>
        </div>
    </div>
  );
}