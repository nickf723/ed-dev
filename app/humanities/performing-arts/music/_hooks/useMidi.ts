"use client";
import { useEffect, useRef, useState } from 'react';
import { NOTES } from '../_assets/musicTheoryDB';

export function useMidi(onNoteOn: (note: string) => void, onNoteOff: (note: string) => void) {
  const [midiStatus, setMidiStatus] = useState<string>("Searching...");
  const [deviceName, setDeviceName] = useState<string | null>(null);

  // REFS: Keep track of the *latest* callback functions
  const onNoteOnRef = useRef(onNoteOn);
  const onNoteOffRef = useRef(onNoteOff);

  // Update refs whenever the parent component updates
  useEffect(() => {
    onNoteOnRef.current = onNoteOn;
    onNoteOffRef.current = onNoteOff;
  });

  useEffect(() => {
    if (!navigator.requestMIDIAccess) {
      setMidiStatus("Not Supported");
      return;
    }

    const handleMidiMessage = (msg: MIDIMessageEvent) => {
      if (!msg.data) return;
      const [command, note, velocity] = msg.data;
      
      // Convert MIDI number to Note Name (60 = C4)
      const noteNameIndex = note % 12;
      const octave = Math.floor(note / 12) - 1;
      const noteFull = `${NOTES[noteNameIndex]}${octave}`;

      // Call the REF, which always points to the latest logic
      if (command === 144 && velocity > 0) {
          onNoteOnRef.current(noteFull);
      }
      if (command === 128 || (command === 144 && velocity === 0)) {
          onNoteOffRef.current(noteFull);
      }
    };

    navigator.requestMIDIAccess().then((access) => {
      const connectFirstInput = () => {
        const inputs = Array.from(access.inputs.values());
        if (inputs.length > 0) {
          const input = inputs[0];
          setDeviceName(input.name || "MIDI Device");
          setMidiStatus("Connected");
          input.onmidimessage = handleMidiMessage;
        } else {
          setDeviceName(null);
          setMidiStatus("No Device");
        }
      };

      connectFirstInput();
      access.onstatechange = () => connectFirstInput();
    }, () => setMidiStatus("Access Denied"));
  }, []);

  return { midiStatus, deviceName };
}