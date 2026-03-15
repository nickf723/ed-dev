import React, { ReactNode } from 'react';
import Image from 'next/image';

interface GlobalMediaCardProps {
    imageUrl: string;
    altText: string;
    title: string;
    subtitle?: string;
    colorTheme?: string; 
    aspectRatio?: string; // NEW: Controls the shape of the image container!
    children?: ReactNode; 
}

export default function GlobalMediaCard({ 
    imageUrl, altText, title, subtitle, colorTheme = 'sky', aspectRatio = 'aspect-video', children 
}: GlobalMediaCardProps) {
    return (
        <div className={`group flex flex-col relative bg-neutral-900/40 border border-neutral-800 hover:border-${colorTheme}-500/50 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 shadow-lg h-full`}>
            
            {/* The Shape-Controlled Image Header */}
            <div className={`relative w-full ${aspectRatio} bg-black overflow-hidden border-b border-neutral-800 shrink-0`}>
                <div className={`absolute inset-0 bg-gradient-to-tr from-${colorTheme}-900/20 to-transparent z-0`} />
                
                {/* object-cover and object-top ensure heads aren't chopped off in portraits */}
                <Image 
                    src={imageUrl} 
                    alt={altText}
                    fill
                    className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 z-10"
                />
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-black text-white tracking-tight mb-1">{title}</h3>
                {subtitle && (
                    <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
                        {subtitle}
                    </div>
                )}

                {children && (
                    <div className="pt-4 border-t border-neutral-800/50 space-y-2 mt-auto">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}