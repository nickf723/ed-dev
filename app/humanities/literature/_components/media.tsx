import React from 'react';
import GlobalMediaCard from '@/app/_components/GlobalMediaCard';

export type BookData = {
    id: string;
    title: string;
    author: string;
    publicationYear: number;
    genre: string;
    description: string;
    imageUrl: string;
    path: string;
};

export function BookCard({ book }: { book: BookData }) {
    return (
        <GlobalMediaCard
            title={book.title}
            subtitle={book.author}
            imageUrl={book.imageUrl}
            altText={`Cover of ${book.title}`}
            colorTheme="amber"
            aspectRatio="aspect-[2/3]" // Classic book cover ratio!
        >
            <div className="flex flex-col gap-2 pt-2 border-t border-amber-900/30">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-500 font-serif italic">Published</span>
                    <span className="text-stone-300 font-mono">{book.publicationYear}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-500 font-serif italic">Form</span>
                    <span className="text-amber-500/80 font-bold uppercase tracking-widest text-[9px]">{book.genre}</span>
                </div>
                <p className="text-xs text-stone-400 mt-2 line-clamp-3 leading-relaxed">
                    {book.description}
                </p>
            </div>
        </GlobalMediaCard>
    );
}