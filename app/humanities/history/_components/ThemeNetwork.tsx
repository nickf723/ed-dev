"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
    Swords, Coins, Palette, Crown, 
    FlaskConical, Stethoscope, Leaf, 
    Lightbulb, Building2
} from 'lucide-react';

// A much larger, circular ontology mapping 9 distinct themes
const NODES = [
  { id: 'politics', title: 'Power & Politics', x: 300, y: 50, icon: <Crown size={24}/>, connections: ['military', 'economics', 'philosophy'] },
  { id: 'military', title: 'Military & Conflict', x: 500, y: 150, icon: <Swords size={24}/>, connections: ['politics', 'science', 'economics'] },
  { id: 'economics', title: 'Trade & Economics', x: 550, y: 350, icon: <Coins size={24}/>, connections: ['politics', 'environment', 'science'] },
  { id: 'science', title: 'Science & Tech', x: 450, y: 500, icon: <FlaskConical size={24}/>, connections: ['military', 'economics', 'medicine', 'philosophy'] },
  { id: 'medicine', title: 'Medicine & Health', x: 150, y: 500, icon: <Stethoscope size={24}/>, connections: ['science', 'environment'] },
  { id: 'environment', title: 'Environment & Climate', x: 50, y: 350, icon: <Leaf size={24}/>, connections: ['economics', 'medicine', 'culture'] },
  { id: 'culture', title: 'Culture & Religion', x: 100, y: 150, icon: <Palette size={24}/>, connections: ['environment', 'art', 'philosophy'] },
  { id: 'art', title: 'Art & Architecture', x: 200, y: 80, icon: <Building2 size={24}/>, connections: ['culture', 'politics', 'philosophy'] },
  
  // The central node connecting the abstract concepts
  { id: 'philosophy', title: 'Philosophy & Ideas', x: 300, y: 280, icon: <Lightbulb size={24}/>, connections: ['politics', 'science', 'culture', 'art'] }
];

export default function ThemeNetwork() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[600px] bg-black/40 border border-neutral-800 rounded-2xl flex items-center justify-center p-4 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* SVG Canvas has been expanded to 600x600 to fit the web */}
      <svg viewBox="0 0 600 600" className="absolute w-full h-full max-w-[600px] max-h-[600px]">
        {/* Draw Connections */}
        {NODES.map(node => (
          node.connections.map(targetId => {
            const target = NODES.find(n => n.id === targetId);
            if (!target) return null;
            
            // Highlight the line if EITHER connected node is hovered
            const isHighlighted = activeNode === node.id || activeNode === target.id;
            
            return (
              <line 
                key={`${node.id}-${target.id}`}
                x1={node.x} y1={node.y} x2={target.x} y2={target.y}
                stroke={isHighlighted ? '#818cf8' : 'rgba(99, 102, 241, 0.15)'}
                strokeWidth={isHighlighted ? 3 : 1}
                className="transition-all duration-300"
              />
            );
          })
        ))}
      </svg>

      {/* HTML Overlay for Nodes */}
      <div className="relative w-full max-w-[600px] h-full max-h-[600px]">
        {NODES.map((node) => {
          const isActive = activeNode === node.id;
          
          // Determine if this node is connected to the currently active node
          const isConnected = activeNode && (
              node.connections.includes(activeNode) || 
              NODES.find(n => n.id === activeNode)?.connections.includes(node.id)
          );

          // Dim nodes that aren't connected to the active one
          const isDimmed = activeNode && !isActive && !isConnected;

          return (
            <Link 
              href={`/humanities/history/theme/${node.id}`}
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-3 transition-opacity duration-300 ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
              style={{ left: `${(node.x / 600) * 100}%`, top: `${(node.y / 600) * 100}%` }}
            >
              <div className={`
                w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-300 backdrop-blur-md
                ${isActive 
                    ? 'bg-indigo-600 border-indigo-400 text-white scale-110 shadow-[0_0_30px_rgba(99,102,241,0.6)] z-30' 
                    : isConnected 
                        ? 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300 z-20'
                        : 'bg-black/80 border-neutral-700 text-neutral-400 hover:border-indigo-500/50 z-10'
                }
              `}>
                {node.icon}
              </div>
              
              <div className={`
                absolute top-[70px] whitespace-nowrap text-xs font-bold uppercase tracking-widest transition-colors duration-300 bg-black/50 px-2 py-1 rounded
                ${isActive ? 'text-indigo-300 border border-indigo-500/30' : 'text-neutral-500 border border-transparent'}
              `}>
                {node.title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}