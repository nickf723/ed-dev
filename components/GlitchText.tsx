"use client";
import React, { useState, useEffect } from 'react';

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function GlitchText({ text, className }: { text: string, className?: string }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const scramble = () => {
      let iterations = 0;
      clearInterval(interval);
      
      interval = setInterval(() => {
        setDisplay(prev => 
          text.split("")
            .map((char, index) => {
              if(index < iterations) return text[index];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if(iterations >= text.length) clearInterval(interval);
        iterations += 1 / 3;
      }, 30);
    };

    // Scramble on mount and randomly every few seconds
    scramble();
    const randomTrigger = setInterval(() => {
        if(Math.random() > 0.9) scramble();
    }, 2000);

    return () => {
        clearInterval(interval);
        clearInterval(randomTrigger);
    };
  }, [text]);

  return <span className={className}>{display}</span>;
}