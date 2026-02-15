"use client";
import React from 'react';

interface PianoKeyboardProps {
  range: { start: number; count: number };
  activeKeys: string[];
  highlightedKeys: { note: string; interval: number }[];
  onNoteStart: (note: string) => void;
  onNoteEnd: (note: string) => void;
  showLabels: boolean;
  showIntervals: boolean;
  focusMode: boolean;
}

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function PianoKeyboard({
  range, activeKeys, highlightedKeys, onNoteStart, onNoteEnd, 
  showLabels, showIntervals, focusMode
}: PianoKeyboardProps) {
  
  const renderKeys = () => {
    const whiteKeys: React.ReactNode[] = [];
    const blackKeys: React.ReactNode[] = [];
    let whiteKeyCount = 0;

    for (let oct = range.start; oct < range.start + range.count; oct++) {
      NOTES.forEach((noteName) => {
        const noteFull = `${noteName}${oct}`;
        const isBlack = noteName.includes("#");
        const isActive = activeKeys.includes(noteFull);
        
        const theoryMatch = highlightedKeys.find(k => k.note === noteName);
        const isHighlighted = !!theoryMatch;
        const intervalIdx = theoryMatch ? theoryMatch.interval : -1;

        const getDotColor = (idx: number) => {
            if (idx === 0) return 'bg-amber-500'; 
            if (idx === 2) return 'bg-blue-500';
            if (idx === 4) return 'bg-red-500';
            return 'bg-amber-200';
        };

        const getKeyColor = (black: boolean) => {
            // 1. PRESSED STATE
            if (isActive) return black ? 'bg-amber-600' : 'bg-amber-100';
            
            // 2. FOCUS MODE (Dim others)
            if (focusMode && !isHighlighted) return black ? 'bg-black opacity-20' : 'bg-neutral-200 opacity-30';
            
            // 3. HIGHLIGHTED STATE (The Fix)
            if (isHighlighted) {
                 if (black) return 'bg-neutral-800 border-b-4 border-amber-600'; // Make black keys pop
                 if (showIntervals && intervalIdx === 0) return 'bg-amber-50';
            }

            // 4. DEFAULT
            return black ? 'bg-black from-neutral-800 to-black' : 'bg-white';
        };

        if (!isBlack) {
          whiteKeys.push(
            <div 
              key={noteFull}
              onMouseDown={() => onNoteStart(noteFull)}
              onMouseUp={() => onNoteEnd(noteFull)}
              onMouseLeave={() => onNoteEnd(noteFull)}
              className={`
                relative w-10 h-48 border-x border-b border-neutral-300 rounded-b-[4px] 
                flex flex-col justify-end items-center pb-3 cursor-pointer select-none z-10
                transition-all duration-75 active:scale-y-[0.99] active:origin-top
                ${getKeyColor(false)}
                ${isActive ? 'shadow-inner' : 'shadow-sm'}
              `}
            >
              {isHighlighted && !isActive && <div className={`absolute bottom-8 w-2 h-2 rounded-full ${getDotColor(intervalIdx)}`} />}
              {showLabels && <span className="text-[10px] font-bold text-neutral-400 font-sans">{noteName}</span>}
            </div>
          );
          whiteKeyCount++;
        } else {
          const leftPos = (whiteKeyCount * 40) - 14; 
          blackKeys.push(
            <div 
              key={noteFull}
              style={{ left: `${leftPos}px` }}
              className="absolute top-0 pointer-events-auto z-20"
            >
               <div 
                  onMouseDown={() => onNoteStart(noteFull)}
                  onMouseUp={() => onNoteEnd(noteFull)}
                  onMouseLeave={() => onNoteEnd(noteFull)}
                  className={`
                      w-7 h-28 rounded-b-[3px] border-x border-b border-black cursor-pointer 
                      transition-all duration-75 active:scale-y-[0.99] active:origin-top
                      ${getKeyColor(true)}
                      ${isActive ? 'bg-gradient-to-b' : 'bg-gradient-to-br shadow-lg'}
                  `}
              >
                   {/* Bright dot for black keys */}
                   {isHighlighted && !isActive && <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ring-1 ring-black ${getDotColor(intervalIdx)}`} />}
              </div>
            </div>
          );
        }
      });
    }

    return (
      <div className="relative flex pl-1 py-1 bg-[#050505] rounded overflow-x-auto min-w-min">
        <div className="absolute top-0 left-0 right-0 h-3 bg-red-950/50 z-0 shadow-inner" />
        <div className="relative z-10 pt-2 pb-1 flex">
            {whiteKeys}
            <div className="absolute top-2 left-0 h-full w-full pointer-events-none pl-1">
                {blackKeys}
            </div>
        </div>
      </div>
    );
  };

  return renderKeys();
}