"use client";
import { useEffect, useState } from 'react';
import { NOTES } from '../_assets/musicTheoryDB';

export function useMidi(onNoteOn: (note: string) => void, onNoteOff: (note: string) => void) {
  const [midiAccess, setMidiAccess] = useState<MIDIAccess | null>(null);
  const [inputName, setInputName] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.requestMIDIAccess) return;

    navigator.requestMIDIAccess().then((access) => {
      setMidiAccess(access);
      
      // Auto-select first input
      const inputs = Array.from(access.inputs.values());
      if (inputs.length > 0) {
        setInputName(inputs[0].name || "Generic MIDI");
        inputs[0].onmidimessage = (msg) => handleMidiMessage(msg);
      }

      // Listen for connection changes
      access.onstatechange = (e: any) => {
          if (e.port.type === 'input' && e.port.state === 'connected') {
              setInputName(e.port.name);
              e.port.onmidimessage = handleMidiMessage;
          }
      };
    });
  }, []);

  const handleMidiMessage = (msg: MIDIMessageEvent) => {
    if (!msg.data) return;
    const [command, note, velocity] = msg.data;
    
    // MIDI Note Number to Note Name (e.g. 60 -> C4)
    // MIDI 0 = C-1. C3 is usually 48. C4 is 60.
    const noteNameIndex = note % 12;
    const octave = Math.floor(note / 12) - 1; // Standard MIDI octave offset
    const noteFull = `${NOTES[noteNameIndex]}${octave}`;

    // Note On (144)
    if (command === 144 && velocity > 0) {
        onNoteOn(noteFull);
    }
    // Note Off (128) or Note On with 0 velocity
    if (command === 128 || (command === 144 && velocity === 0)) {
        onNoteOff(noteFull);
    }
  };

  return { inputName };
}