"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type MidiStatus =
  | "unsupported"
  | "idle"
  | "requesting"
  | "connected"
  | "no_devices"
  | "permission_denied"
  | "error";

export function midiToNoteName(midi: number): string {
  const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const name = names[midi % 12] ?? "C";
  const octave = Math.floor(midi / 12) - 1;
  return `${name}${octave}`;
}

type NoteHandler = (noteFull: string, velocity?: number) => void;

export function useMidi(onNoteOn: NoteHandler, onNoteOff: NoteHandler) {
  const [midiStatus, setMidiStatus] = useState<MidiStatus>("idle");
  const [deviceName, setDeviceName] = useState<string>("");

  const accessRef = useRef<MIDIAccess | null>(null);
  const inputRef = useRef<MIDIInput | null>(null);

  // sustain pedal support (CC64)
  const sustainRef = useRef<boolean>(false);
  const sustainedNotesRef = useRef<Set<string>>(new Set());

  const supported = useMemo(() => {
    return typeof navigator !== "undefined" && "requestMIDIAccess" in navigator;
  }, []);

  function clearInput() {
    if (inputRef.current) inputRef.current.onmidimessage = null;
    inputRef.current = null;
    setDeviceName("");
  }

  function bindFirstAvailableInput() {
    const access = accessRef.current;
    if (!access) return;

    const first = access.inputs.values().next().value as MIDIInput | undefined;

    if (!first) {
      clearInput();
      setMidiStatus("no_devices");
      return;
    }

    // unbind old
    clearInput();

    inputRef.current = first;
    setDeviceName(first.name || "MIDI Device");
    setMidiStatus("connected");

    first.onmidimessage = (msg) => {
      if (!msg.data) return;
      const data = new Uint8Array(msg.data);
      const status = data[0] ?? 0;
      const type = status & 0xf0;

      // NOTE ON (0x90): [status, note, velocity]
      if (type === 0x90) {
        const note = data[1] ?? 0;
        const vel = data[2] ?? 0;

        const noteName = midiToNoteName(note);

        // velocity 0 => treat as NOTE OFF
        if (vel === 0) {
          if (sustainRef.current) {
            sustainedNotesRef.current.add(noteName);
          } else {
            onNoteOff(noteName, vel);
          }
          return;
        }

        onNoteOn(noteName, vel);
        return;
      }

      // NOTE OFF (0x80): [status, note, velocity]
      if (type === 0x80) {
        const note = data[1] ?? 0;
        const vel = data[2] ?? 0;
        const noteName = midiToNoteName(note);

        if (sustainRef.current) {
          sustainedNotesRef.current.add(noteName);
        } else {
          onNoteOff(noteName, vel);
        }
        return;
      }

      // CONTROL CHANGE (0xB0): sustain pedal CC64
      if (type === 0xb0) {
        const cc = data[1] ?? 0;
        const value = data[2] ?? 0;

        // Sustain pedal
        if (cc === 64) {
          const down = value >= 64;
          sustainRef.current = down;

          // pedal released -> release any notes we were holding
          if (!down && sustainedNotesRef.current.size > 0) {
            for (const n of sustainedNotesRef.current) onNoteOff(n);
            sustainedNotesRef.current.clear();
          }
        }
      }
    };
  }

  useEffect(() => {
    if (!supported) {
      setMidiStatus("unsupported");
      return;
    }

    let cancelled = false;

    async function init() {
      setMidiStatus("requesting");

      try {
        const access = await (navigator as any).requestMIDIAccess({ sysex: false });
        if (cancelled) return;

        accessRef.current = access;

        // initial bind
        bindFirstAvailableInput();

        // hot-plug support
        access.onstatechange = () => {
          // if current input disappears, rebind; if none, show no_devices
          const stillThere =
            inputRef.current && access.inputs.has(inputRef.current.id);

          if (!stillThere) bindFirstAvailableInput();
        };
      } catch (e) {
        if (cancelled) return;
        setMidiStatus("permission_denied");
      }
    }

    init();

    return () => {
      cancelled = true;
      clearInput();
      if (accessRef.current) accessRef.current.onstatechange = null;
      accessRef.current = null;
    };
    // IMPORTANT: only on mount; handlers are from current render anyway
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supported]);

  return { midiStatus, deviceName };
}