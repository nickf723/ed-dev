"use client";

import { useMemo, useState } from "react";
import { KeyRound, RotateCcw, Settings2 } from "lucide-react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ROTORS = [
  "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
  "AJDKSIRUXBLHWTMCQGZNPYFVOE",
  "BDFHJLCPRTXVZNYEIWGAKMUSQO",
] as const;
const REFLECTOR = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

function mod(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

function forwardRotor(index: number, wiring: string, position: number) {
  const shifted = mod(index + position, 26);
  const wired = ALPHABET.indexOf(wiring[shifted]);
  return mod(wired - position, 26);
}

function reverseRotor(index: number, wiring: string, position: number) {
  const shifted = mod(index + position, 26);
  const wired = wiring.indexOf(ALPHABET[shifted]);
  return mod(wired - position, 26);
}

function stepPositions(start: readonly [number, number, number], step: number): [number, number, number] {
  const total = start[2] + step;
  const right = mod(total, 26);
  const middleTurns = Math.floor(total / 26);
  const middleTotal = start[1] + middleTurns;
  const middle = mod(middleTotal, 26);
  const left = mod(start[0] + Math.floor(middleTotal / 26), 26);
  return [left, middle, right];
}

function transformLetter(letter: string, positions: readonly [number, number, number]) {
  let index = ALPHABET.indexOf(letter);
  if (index < 0) return letter;

  index = forwardRotor(index, ROTORS[2], positions[2]);
  index = forwardRotor(index, ROTORS[1], positions[1]);
  index = forwardRotor(index, ROTORS[0], positions[0]);
  index = ALPHABET.indexOf(REFLECTOR[index]);
  index = reverseRotor(index, ROTORS[0], positions[0]);
  index = reverseRotor(index, ROTORS[1], positions[1]);
  index = reverseRotor(index, ROTORS[2], positions[2]);

  return ALPHABET[index];
}

function transformText(text: string, start: readonly [number, number, number]) {
  let letterStep = 0;
  return text
    .toUpperCase()
    .split("")
    .map((character) => {
      if (!ALPHABET.includes(character)) return character;
      const positions = stepPositions(start, letterStep + 1);
      letterStep += 1;
      return transformLetter(character, positions);
    })
    .join("");
}

export default function EnigmaWidget() {
  const [start, setStart] = useState<[number, number, number]>([0, 0, 0]);
  const [input, setInput] = useState("HELLO");
  const output = useMemo(() => transformText(input, start), [input, start]);

  function setRotor(index: number, value: number) {
    setStart((current) => {
      const next: [number, number, number] = [...current];
      next[index] = value;
      return next;
    });
  }

  return (
    <section className="overflow-hidden rounded-[26px] border border-emerald-200/[0.11] bg-black/[0.17] backdrop-blur-xl">
      <div className="border-b border-white/[0.07] px-5 py-4">
        <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-emerald-200/58"><KeyRound size={13} /> Rotor cipher toy</div>
        <h3 className="mt-1 text-[18px] font-semibold tracking-[-0.035em] text-white">Keyed substitution changes as the rotors step.</h3>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-3 gap-2">
          {start.map((position, index) => (
            <label key={index} className="rounded-[14px] border border-white/[0.06] bg-black/[0.10] p-3">
              <span className="font-mono text-[7px] uppercase tracking-[0.09em] text-slate-700">Rotor {index + 1} start</span>
              <select value={position} onChange={(event) => setRotor(index, Number(event.target.value))} className="mt-2 w-full rounded-[9px] border border-white/[0.08] bg-[#0b1210] px-2 py-2 font-mono text-[11px] text-emerald-100/74 outline-none">
                {ALPHABET.split("").map((letter, letterIndex) => <option key={letter} value={letterIndex}>{letter}</option>)}
              </select>
            </label>
          ))}
        </div>

        <label className="mt-4 block">
          <span className="font-mono text-[8px] uppercase tracking-[0.10em] text-slate-600">Plaintext</span>
          <input value={input} maxLength={32} onChange={(event) => setInput(event.target.value.replace(/[^a-zA-Z\s]/g, ""))} className="mt-2 w-full rounded-[13px] border border-white/[0.08] bg-black/[0.14] px-4 py-3 font-mono text-[12px] uppercase text-white/82 outline-none focus:border-emerald-200/[0.26]" />
        </label>

        <div className="mt-4 rounded-[15px] border border-emerald-200/[0.10] bg-emerald-200/[0.02] px-4 py-3">
          <div className="font-mono text-[8px] uppercase tracking-[0.10em] text-emerald-200/42">Ciphertext</div>
          <div className="mt-1 min-h-6 break-all font-mono text-[15px] font-semibold tracking-[0.10em] text-emerald-100/78">{output || "—"}</div>
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-[15px] border border-white/[0.06] bg-black/[0.10] p-4">
          <Settings2 size={13} className="mt-0.5 shrink-0 text-slate-600" />
          <p className="text-[9px] leading-4 text-slate-600">This is a historically inspired rotor-cipher model, not an exact Enigma simulation. It uses real rotor/reflector wirings but simplified odometer stepping and omits ring settings, plugboard wiring, turnover notches, and the historical operating procedure.</p>
        </div>

        <button type="button" onClick={() => { setStart([0, 0, 0]); setInput("HELLO"); }} className="mt-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.09em] text-slate-600 transition hover:text-slate-400"><RotateCcw size={11} /> Reset toy</button>
      </div>
    </section>
  );
}
