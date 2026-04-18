"use client";
import React from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
    return (
        <div className={`relative inline-block ${className || ""}`}>
            {/* Base Text */}
            <span className="relative z-10">{text}</span>

            {/* Glitch Layer 1 (Red Shift) */}
            <span
                className="absolute top-0 left-[2px] -z-10 text-red-600 opacity-70 animate-glitch-1"
                aria-hidden="true"
            >
                {text}
            </span>

            {/* Glitch Layer 2 (Cyan/Green Shift) */}
            <span
                className="absolute top-0 -left-[2px] -z-10 text-emerald-400 opacity-70 animate-glitch-2"
                aria-hidden="true"
            >
                {text}
            </span>

            {/* Injected CSS for the slicing animation */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes glitch-1 {
                    0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
                    20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
                    40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
                    60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
                    80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
                    100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
                }
                @keyframes glitch-2 {
                    0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
                    20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
                    40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, -1px); }
                    60% { clip-path: inset(70% 0 10% 0); transform: translate(-1px, 2px); }
                    80% { clip-path: inset(20% 0 50% 0); transform: translate(2px, -1px); }
                    100% { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 1px); }
                }
                .animate-glitch-1 {
                    animation: glitch-1 2.5s infinite linear alternate-reverse;
                }
                .animate-glitch-2 {
                    animation: glitch-2 3s infinite linear alternate-reverse;
                }
            `}} />
        </div>
    );
}