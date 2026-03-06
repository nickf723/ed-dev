import { Gamepad2, Skull, Sparkles, Sword, MountainSnow } from 'lucide-react';

export type GameRecord = {
    id: string;
    title: string;
    genre: string;
    platform: string;
    releaseYear: number;
    developer: string;
    summary: string;
    status: 'Completed' | 'Playing' | 'Backlog';
    rating: number; // Out of 10
    href: string;
    color: string;
    icon: any;
    imageUrl?: string;
};

export const GAMES_DB: GameRecord[] = [
    {
        id: 'super-mario-galaxy',
        title: 'Super Mario Galaxy',
        genre: 'Platformer',
        platform: 'Nintendo Wii',
        releaseYear: 2007,
        developer: 'Nintendo EAD',
        summary: 'A gravity-defying masterpiece that redefined 3D platforming through spherical level design.',
        status: 'Completed',
        rating: 10,
        href: '/humanities/gaming/video/platformers/super-mario-galaxy',
        color: 'sky',
        icon: Sparkles,
        imageUrl: 'https://static.wikitide.net/allthetropeswiki/4/46/SMG1_Cover_1467.png'
    },
    {
        id: 'hollow-knight',
        title: 'Hollow Knight',
        genre: 'Metroidvania',
        platform: 'Multiplatform',
        releaseYear: 2017,
        developer: 'Team Cherry',
        summary: 'A hauntingly beautiful descent into a ruined insect kingdom with razor-sharp combat.',
        status: 'Completed',
        rating: 9.5,
        href: '/humanities/gaming/video/metroidvanias/hollow-knight',
        color: 'indigo',
        icon: Skull
    },
    {
        id: 'elden-ring',
        title: 'Elden Ring',
        genre: 'Action RPG',
        platform: 'Multiplatform',
        releaseYear: 2022,
        developer: 'FromSoftware',
        summary: 'An unparalleled open-world translation of the punishing, intricate Soulsborne formula.',
        status: 'Playing',
        rating: 10,
        href: '/humanities/gaming/video/rpgs/elden-ring',
        color: 'amber',
        icon: Sword
    },
    {
        id: 'celeste',
        title: 'Celeste',
        genre: 'Platformer',
        platform: 'Multiplatform',
        releaseYear: 2018,
        developer: 'Extremely OK Games',
        summary: 'A grueling, hyper-tight platformer that doubles as a profound narrative about overcoming anxiety.',
        status: 'Backlog',
        rating: 9,
        href: '/humanities/gaming/video/platformers/celeste',
        color: 'rose',
        icon: MountainSnow
    }
];