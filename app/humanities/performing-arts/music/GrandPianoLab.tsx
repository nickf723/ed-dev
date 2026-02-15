"use client";
import React, { useState, useEffect } from 'react';
import { Power, Cable, DownloadCloud } from 'lucide-react';

import { useAudioEngine } from './_hooks/useAudioEngine';
import { useRhythmEngine } from './_hooks/useRhythmEngine';
import { useMidi } from './_hooks/useMidi';
import { NOTES, FORMULAS } from './_assets/musicTheoryDB';

// Sub Components
import PianoKeyboard from './PianoKeyboard';
import Oscilloscope from './Oscilloscope';
import SheetMusic from './SheetMusic';
import ParticleVisualizer from './ParticleVisualizer';
import TheoryPanel from './_components/TheoryPanel';
import RhythmPanel from './_components/RhythmPanel';
import AcousticsPanel from './_components/AcousticsPanel';

const START_OCTAVE = 3;
const OCTAVE_COUNT = 3;

export default function GrandPianoLab() {
  // --- 1. HOOKS ---
  const audio = useAudioEngine();
  
  const playNote = (noteFull: string) => {
      if (!activeKeys.includes(noteFull)) {
          setActiveKeys(p => [...p, noteFull]);
          audio.triggerAttack(noteFull); 
          if (trainerMode) {
              setAttempts(a => a + 1);
              if (noteFull === targetNote) handleCorrectHit();
          }
      }
  };

  const stopNote = (noteFull: string) => {
      setActiveKeys(p => p.filter(k => k !== noteFull));
      audio.triggerRelease(noteFull);
  };

  const rhythm = useRhythmEngine(audio.audioCtx, audio.masterGain, playNote);
  const { midiStatus, deviceName } = useMidi(playNote, stopNote);

  // --- 2. STATE ---
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  
  // Theory State
  const [root, setRoot] = useState("C");
  const [mode, setMode] = useState<'scale' | 'chord'>('scale');
  const [selectedType, setSelectedType] = useState("Major");
  const [chordStyle, setChordStyle] = useState<'block' | 'arp'>('block'); // RESTORED!

  // Visual State
  const [showLabels, setShowLabels] = useState(true);
  const [showColor, setShowColor] = useState(true);
  const [focusMode, setFocusMode] = useState(false);

  // Trainer State
  const [trainerMode, setTrainerMode] = useState(false);
  const [targetNote, setTargetNote] = useState("C4");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState(false);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  // --- 3. LOGIC ---
  const getTheoryNotes = () => {
      const rootIndex = NOTES.indexOf(root);
      const formula = mode === 'scale' 
        ? FORMULAS.scales[selectedType as keyof typeof FORMULAS.scales] 
        : FORMULAS.chords[selectedType as keyof typeof FORMULAS.chords];
      
      return (formula || []).map((interval, i) => {
          const absoluteRoot = rootIndex + (START_OCTAVE * 12);
          const targetSemitone = absoluteRoot + interval;
          const noteIndex = targetSemitone % 12;
          const octave = Math.floor(targetSemitone / 12);
          const noteName = NOTES[noteIndex];
          return { note: noteName, interval: i, full: `${noteName}${octave}` };
      });
  };
  const theoryNotes = getTheoryNotes();

  // Reset keys when theory changes
  useEffect(() => {
      audio.stopAll();
      setActiveKeys([]);
  }, [root, mode, selectedType]);

  const handleCorrectHit = () => {
      setScore(s => s + 1);
      setFeedback(true);
      setTimeout(() => setFeedback(false), 200);
      const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      const octaves = [3, 4];
      const newNote = notes[Math.floor(Math.random() * notes.length)] + octaves[Math.floor(Math.random() * octaves.length)];
      setTargetNote(newNote);
  };

  // Restored Demo Logic
  const runDemo = async () => {
      if (isPlayingDemo) return;
      setIsPlayingDemo(true);
      
      const sequence = theoryNotes.map(n => n.full);
      const beatMs = 60000 / rhythm.bpm;
      const arpMs = beatMs / 2;

      if (mode === 'chord' && chordStyle === 'block') {
          sequence.forEach(playNote);
          await new Promise(r => setTimeout(r, beatMs * 2));
          sequence.forEach(stopNote);
      } else {
          // Arpeggio (Chord or Scale)
          for(const n of sequence) {
              playNote(n);
              await new Promise(r => setTimeout(r, arpMs));
              if (mode === 'scale') stopNote(n);
          }
          if (mode === 'chord') {
               await new Promise(r => setTimeout(r, beatMs));
               sequence.forEach(stopNote);
          }
      }
      setIsPlayingDemo(false);
  };

  // --- 4. RENDER ---
  return (
    <div className="w-full bg-[#121212] border-t-8 border-t-amber-900 border-x border-b border-neutral-800 rounded-xl shadow-2xl flex flex-col relative overflow-hidden">
        
        {/* BG VISUALS */}
        <div className="absolute inset-0 pointer-events-none z-0">
            <ParticleVisualizer activeKeys={activeKeys} />
        </div>

        {/* HEADER */}
        <div className="relative z-50 p-6 flex flex-col gap-6 bg-gradient-to-b from-black/95 to-transparent">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-white/10 pb-6">
                <div className="flex items-center gap-4">
                    <button onClick={audio.resume} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 transition-all ${audio.isReady ? 'bg-amber-600 border-amber-400 text-white' : 'bg-red-900 border-red-700 text-red-200 animate-pulse'}`}>
                        <Power size={24} />
                    </button>
                    <div>
                        <h2 className="text-3xl font-black text-white font-serif tracking-wide leading-none">STEINWAY <span className="text-amber-500">PRO</span></h2>
                        <div className="flex items-center gap-3 mt-1">
                             <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${deviceName ? 'bg-green-900/30 border-green-500 text-green-400' : 'bg-neutral-800 border-neutral-700 text-neutral-500'}`}>
                                <Cable size={10} /> {deviceName || "NO MIDI"}
                            </div>
                            <div className="text-[9px] font-bold uppercase text-neutral-500">
                                MODE: <span className={audio.currentPatch.engine === 'sampler' ? "text-amber-500" : "text-blue-400"}>{audio.currentPatch.engine}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {!audio.samplesLoaded && (
                        <button onClick={audio.loadSamples} className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 rounded-full transition-all text-xs font-bold text-neutral-300 uppercase">
                            <DownloadCloud size={16} /> {audio.loadingProgress > 0 ? `Loading ${audio.loadingProgress}%` : "Load Samples"}
                        </button>
                    )}
                    <Oscilloscope audioCtx={audio.audioCtx} sourceNode={audio.masterGain} />
                </div>
            </div>

            {/* PANELS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <TheoryPanel 
                    root={root} setRoot={setRoot}
                    mode={mode} setMode={setMode}
                    selectedType={selectedType} setSelectedType={setSelectedType}
                    chordStyle={chordStyle} setChordStyle={setChordStyle}
                    isPlaying={isPlayingDemo} onPlay={runDemo}
                />
                
                <RhythmPanel 
                    bpm={rhythm.bpm} setBpm={rhythm.setBpm}
                    metronomeOn={rhythm.metronomeOn} toggleMetronome={() => rhythm.setMetronomeOn(!rhythm.metronomeOn)}
                    trainerMode={trainerMode} toggleTrainer={() => setTrainerMode(!trainerMode)}
                />

                <AcousticsPanel 
                    audio={audio}
                    showLabels={showLabels} toggleLabels={() => setShowLabels(!showLabels)}
                    showIntervals={showColor} toggleIntervals={() => setShowColor(!showColor)}
                    focusMode={focusMode} toggleFocus={() => setFocusMode(!focusMode)}
                />
            </div>
        </div>

        {/* DISPLAY */}
        <div className="relative z-10 flex justify-center items-center min-h-[180px] py-4">
            {trainerMode ? (
                <div className="flex items-center gap-10 animate-in zoom-in duration-300">
                     <div className="bg-[#ffebd4] p-4 rounded shadow-2xl rotate-1"><SheetMusic targetNote={targetNote} isCorrect={feedback} /></div>
                     <div className="flex flex-col gap-4">
                         <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 text-center min-w-[120px]">
                             <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Score</div>
                             <div className="text-4xl font-black text-amber-500">{score}</div>
                         </div>
                         <div className="text-center">
                             <div className="text-xs font-bold text-neutral-400 uppercase mb-1">Target</div>
                             <div className="text-2xl font-black text-white">{targetNote}</div>
                         </div>
                     </div>
                </div>
            ) : (
                <div className="text-center opacity-30 pointer-events-none">
                    <p className="text-sm font-medium text-neutral-400">
                        {audio.currentPatch.engine === 'sampler' ? "Steinway Grand Piano Mode" : "Synthesizer Mode"}
                    </p>
                </div>
            )}
        </div>

        {/* PIANO */}
        <div className="relative z-20 w-full bg-[#050505] p-1 rounded border-t-4 border-amber-900 shadow-2xl overflow-x-auto">
             <div className="min-w-[800px] flex justify-center">
                 <PianoKeyboard 
                    range={{ start: START_OCTAVE, count: OCTAVE_COUNT }}
                    activeKeys={activeKeys}
                    highlightedKeys={trainerMode ? [] : theoryNotes}
                    onNoteStart={playNote}
                    onNoteEnd={stopNote}
                    showLabels={showLabels}
                    showIntervals={showColor}
                    focusMode={focusMode}
                 />
             </div>
        </div>
    </div>
  );
}