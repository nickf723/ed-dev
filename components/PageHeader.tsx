"use client";
import React from "react";
import { motion } from "framer-motion";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  eyebrow?: string;
};

export default function PageHeader({ title, subtitle, eyebrow }: PageHeaderProps) {
  return (
    <section className="relative mx-auto mb-12 mt-8 w-full max-w-7xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-0">
        
        {/* --- ANGLED BANNER (Left) --- */}
        <div className="relative z-10 flex-shrink-0 md:w-[45%] lg:w-[40%]">
          {/* The Angled Shape Background */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-neutral-900 to-neutral-800 border border-white/10 shadow-2xl"
            style={{
              clipPath: "polygon(0 0, 100% 0, 92% 100%, 0% 100%)", // The "Cut"
              borderRight: "none" // Hide border on cut side for cleaner look
            }}
          />
          
          {/* Accent Line on the cut */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-[2px] bg-cyan-500/50"
            style={{
               right: "8%", // Matches the 92% clip-path roughly
               transform: "skewX(-12deg)", // Match the angle
               transformOrigin: "bottom"
            }}
          />

          {/* Content Container */}
          <div className="relative z-20 flex h-full flex-col justify-center px-8 py-8 pr-16">
            {eyebrow && (
              <span className="mb-2 inline-block font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
                // {eyebrow}
              </span>
            )}
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
          </div>
        </div>

        {/* --- DESCRIPTION AREA (Right) --- */}
        <div className="flex flex-1 items-center md:-ml-8 md:pl-16">
          <div className="glass border-l-0 relative z-0 w-full rounded-r-2xl rounded-l-none border border-white/5 bg-white/5 px-8 py-6 backdrop-blur-md">
             <p className="text-lg leading-relaxed text-neutral-300 font-light">
               {subtitle}
             </p>
          </div>
        </div>

      </div>
    </section>
  );
}