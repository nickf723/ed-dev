import { Sparkles, Skull, Sword, MountainSnow } from 'lucide-react';

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
        href: '/humanities/gaming/video/repository/super-mario/super-mario-galaxy',
        color: 'sky',
        icon: Sparkles,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/76/Super_Mario_Galaxy_box_cover.png' // Swapped to Wikimedia for your config!
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
        href: '/humanities/gaming/video/repository/team-cherry/hollow-knight',
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
        href: '/humanities/gaming/video/repository/fromsoftware/elden-ring',
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
        href: '/humanities/gaming/video/repository/extremely-ok-games/celeste',
        color: 'rose',
        icon: MountainSnow
    }
];