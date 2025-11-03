// components/FloatingSymbols.tsx
"use client";
import React, { useState, useEffect } from "react"; // Import hooks

type FloatingSymbolsProps = {
  symbols: string[];
};

// Define a type for our style object
type SymbolStyle = React.CSSProperties;

export default function FloatingSymbols({ symbols }: FloatingSymbolsProps) {
  // 1. Start with an empty array of styles
  const [styles, setStyles] = useState<SymbolStyle[]>([]);

  // 2. Use useEffect to generate styles *only on the client*
  useEffect(() => {
    const newStyles = symbols.map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${18 + Math.random() * 15}s`,
      transform: `scale(${0.8 + Math.random() * 0.8})`,
      filter: `blur(${Math.random() * 1.5}px)`,
    }));
    setStyles(newStyles);
  }, [symbols]); // Re-run if the symbols array ever changes

  // Use a stable key for each symbol
  const getSymbolKey = (symbol: string, index: number) => `${symbol}-${index}`;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 select-none overflow-hidden"
    >
      {/* 3. Map over the symbols, but use the style from our state.
           On the server, `styles[i]` will be undefined, so it renders
           with no inline style, preventing the mismatch.
      */}
      {symbols.map((symbol, i) => (
        <span
          key={getSymbolKey(symbol, i)}
          className="floating-symbol font-mono text-[2.5rem] text-neutral-500/15 sm:text-[3rem] lg:text-[4rem]"
          style={styles[i]} // Apply the client-generated style
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}