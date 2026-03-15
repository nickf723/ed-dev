import React from 'react';
import GlobalMediaCard from '@/app/_components/GlobalMediaCard';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
// ---------------------------------------------------------
// THE PLAYER DISPLAYER
// ---------------------------------------------------------
export type PlayerData = {
    id: string;
    name: string;
    position: string;
    number: number;
    hometown: string;
    college: string;
    imageUrl: string;
    link?: string;
    path?: string; // For internal linking to a player profile page in the future
};

export function PlayerCard({ player }: { player: PlayerData }) {
    return (
        <GlobalMediaCard
            title={player.name}
            subtitle={`Franchise ${player.position}`}
            imageUrl={player.imageUrl}
            altText={`Photo of ${player.name}`}
            colorTheme="blue" 
            aspectRatio="aspect-square" // Forces a perfect square, regardless of original image size!
        >
            <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Number</span>
                <span className="text-white font-black font-mono">#{player.number}</span>
            </div>
            <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Hometown</span>
                <span className="text-slate-300 font-medium text-xs">{player.hometown}</span>
            </div>
            <div className="flex justify-between items-center text-sm mb-4">
                <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">College</span>
                <span className="text-slate-300 font-medium text-xs">{player.college}</span>
            </div>

            {/* NEW: Action Button Array */}
            {(player.path || player.link) && (
                <div className="flex gap-2 pt-3 border-t border-white/5 mt-auto">
                    {player.path && (
                        <Link 
                            href={player.path}
                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors"
                        >
                            Profile <ArrowRight size={12} />
                        </Link>
                    )}
                    {player.link && (
                        <a 
                            href={player.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                            title="View External Profile"
                        >
                            <ExternalLink size={14} />
                        </a>
                    )}
                </div>
            )}
        </GlobalMediaCard>
    );
}

// ---------------------------------------------------------
// THE STADIUM VISUALIZER
// ---------------------------------------------------------
export type StadiumData = {
    name: string;
    location: string;
    capacity: number;
    surface: string;
    imageUrl: string;
};

export function StadiumCard({ stadium }: { stadium: StadiumData }) {
    return (
        <GlobalMediaCard
            title={stadium.name}
            subtitle={stadium.location}
            imageUrl={stadium.imageUrl}
            altText={`Photo of ${stadium.name}`}
            colorTheme="red" // Contrast with the blue page
        >
            <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Capacity</span>
                <span className="text-white font-black font-mono">{stadium.capacity.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Surface</span>
                <span className="text-slate-300 font-medium text-xs">{stadium.surface}</span>
            </div>
        </GlobalMediaCard>
    );
}