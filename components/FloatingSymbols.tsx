// components/FloatingSymbols.tsx
"use client";
import React from "react";

type FloatingSymbolsProps = {
  symbols: string[];
};

export default function FloatingSymbols({ symbols }: FloatingSymbolsProps) {
  // Use a stable key for each symbol, even if array order changes
  const getSymbolKey = (symbol: string, index: number) => `${symbol}-${index}`;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 select-none overflow-hidden"
    >
      {symbols.map((symbol, i) => (
        <span
          key={getSymbolKey(symbol, i)}
          className="floating-symbol font-mono text-[2.5rem] text-neutral-500/15 sm:text-[3rem] lg:text-[4rem]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${18 + Math.random() * 15}s`,
            transform: `scale(${0.8 + Math.random() * 0.8})`,
            filter: `blur(${Math.random() * 1.5}px)`,
          }}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}