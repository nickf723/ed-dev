import React from 'react';
import GlobalMediaCard from '@/app/_components/GlobalMediaCard';

export type PlanetData = {
    name: string;
    dome: string;
    gravityType: 'Spherical' | 'Cylindrical' | 'Flat' | 'Dynamic';
    imageUrl: string;
};

export function PlanetCard({ planet }: { planet: PlanetData }) {
    return (
        <GlobalMediaCard
            title={planet.name}
            subtitle={`Observatory: ${planet.dome}`}
            imageUrl={planet.imageUrl}
            altText={`Screenshot of ${planet.name}`}
            colorTheme="sky"
            aspectRatio="aspect-video"
        >
            <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-sky-500 font-bold uppercase tracking-widest text-[10px]">Gravity Vector</span>
                <span className="text-white font-mono text-xs">{planet.gravityType}</span>
            </div>
        </GlobalMediaCard>
    );
}

export type EntityData = {
    name: string;
    classification: 'Protagonist' | 'Companion' | 'Boss' | 'Hazard';
    role: string;
    imageUrl: string;
};

export function EntityCard({ entity }: { entity: EntityData }) {
    // Map classifications to colors
    const roleColors = {
        'Protagonist': 'emerald',
        'Companion': 'sky',
        'Boss': 'rose',
        'Hazard': 'amber'
    };
    const theme = roleColors[entity.classification];

    return (
        <GlobalMediaCard
            title={entity.name}
            subtitle={entity.classification}
            imageUrl={entity.imageUrl}
            altText={`Artwork of ${entity.name}`}
            colorTheme={theme}
            aspectRatio="aspect-square"
        >
            <div className="flex flex-col gap-1 pt-2">
                <span className={`text-${theme}-500 font-bold uppercase tracking-widest text-[10px]`}>Mechanical Role</span>
                <span className="text-neutral-300 font-light text-xs leading-snug">{entity.role}</span>
            </div>
        </GlobalMediaCard>
    );
}