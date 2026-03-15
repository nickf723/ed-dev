import React from 'react';
import GlobalMediaCard from '@/app/_components/GlobalMediaCard';

export type GameData = {
    id: string;
    title: string;
    studio: string;
    year: number;
    description: string;
    imageUrl: string;
};

export function GameCard({ game }: { game: GameData }) {
    return (
        <GlobalMediaCard
            title={game.title}
            subtitle={game.studio}
            imageUrl={game.imageUrl}
            altText={`Cover art for ${game.title}`}
            colorTheme="indigo"
            aspectRatio="aspect-[3/4]" // Classic game box art ratio
        >
            <div className="flex flex-col gap-2 pt-2 border-t border-indigo-900/30">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 font-mono">Released</span>
                    <span className="text-zinc-300 font-bold">{game.year}</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                    {game.description}
                </p>
            </div>
        </GlobalMediaCard>
    );
}