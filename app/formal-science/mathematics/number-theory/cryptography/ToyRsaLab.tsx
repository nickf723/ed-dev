"use client";

import { useMemo, useState } from "react";
import { KeyRound, LockKeyhole, UnlockKeyhole } from "lucide-react";

const PRIMES = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43] as const;

function gcd(a: number, b: number) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) [x, y] = [y, x % y];
  return x;
}

function extendedGcd(a: number, b: number): [number, number, number] {
  if (b === 0) return [a, 1, 0];
  const [g, x1, y1] = extendedGcd(b, a % b);
  return [g, y1, x1 - Math.floor(a / b) * y1];
}

function inverse(value: number, modulus: number) {
  const [g, x] = extendedGcd(value, modulus);
  if (Math.abs(g) !== 1) return null;
  return ((x % modulus) + modulus) % modulus;
}

function powMod(base: number, exponent: number, modulus: number) {
  let result = 1;
  let value = base % modulus;
  let power = exponent;
  while (power > 0) {
    if (power % 2 === 1) result = (result * value) % modulus;
    value = (value * value) % modulus;
    power = Math.floor(power / 2);
  }
  return result;
}

export default function ToyRsaLab() {
  const [p, setP] = useState(17);
  const [q, setQ] = useState(23);
  const [message, setMessage] = useState(42);

  const model = useMemo(() => {
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    const eCandidates = [3, 5, 7, 11, 17, 257];
    const e = eCandidates.find((candidate) => candidate < phi && gcd(candidate, phi) === 1) ?? 3;
    const d = inverse(e, phi) ?? 1;
    const normalizedMessage = Math.max(0, Math.min(n - 1, Math.trunc(message)));
    const ciphertext = powMod(normalizedMessage, e, n);
    const recovered = powMod(ciphertext, d, n);
    return { n, phi, e, d, normalizedMessage, ciphertext, recovered };
  }, [message, p, q]);

  return (
    <section className="overflow-hidden rounded-[30px] border border-cyan-200/[0.10] bg-[#06121a]/74 backdrop-blur-xl">
      <div className="grid gap-4 border-b border-white/[0.07] px-4 py-4 sm:px-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
        <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/66"><KeyRound size={13} /> Toy RSA arithmetic lab</div><p className="mt-1 text-[10px] text-slate-600">Tiny primes make the modular arithmetic visible. This is an educational model, not secure encryption.</p></div>
        <div className="rounded-[14px] border border-amber-200/[0.10] bg-amber-200/[0.025] px-3 py-2 text-[9px] leading-4 text-amber-100/56">Real RSA uses very large keys, standardized padding/encoding, side-channel-resistant implementations, and vetted cryptographic libraries. Never copy this toy construction into a real security system.</div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[330px_minmax(0,1fr)]">
        <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.13] p-4">
          <div className="grid grid-cols-2 gap-2">
            <PrimeSelect label="Prime p" value={p} other={q} onChange={setP} />
            <PrimeSelect label="Prime q" value={q} other={p} onChange={setQ} />
          </div>
          <label className="mt-4 block"><span className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">Message integer m</span><input type="number" min="0" max={model.n - 1} value={message} onChange={(event) => setMessage(Number(event.target.value) || 0)} className="mt-2 w-full rounded-[14px] border border-white/[0.07] bg-black/[0.16] px-3 py-3 font-mono text-[18px] text-white/80 outline-none focus:border-cyan-300/25" /></label>
          <p className="mt-2 text-[8px] leading-4 text-slate-700">For this toy, the message is one integer from 0 through n−1. Real systems encode structured messages and use randomized padding schemes.</p>
        </div>

        <div>
          <div className="grid gap-2 sm:grid-cols-4">
            <Metric label="n = pq" value={String(model.n)} rgb="56, 189, 248" />
            <Metric label="φ(n)" value={String(model.phi)} rgb="52, 211, 153" />
            <Metric label="public e" value={String(model.e)} rgb="250, 204, 21" />
            <Metric label="private d" value={String(model.d)} rgb="244, 114, 182" />
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <Stage icon={UnlockKeyhole} label="Plaintext representative" value={`m = ${model.normalizedMessage}`} formula={`0 ≤ m < ${model.n}`} rgb="148, 163, 184" />
            <Stage icon={LockKeyhole} label="Public operation" value={`c = ${model.ciphertext}`} formula={`c ≡ m^${model.e} (mod ${model.n})`} rgb="56, 189, 248" />
            <Stage icon={UnlockKeyhole} label="Private operation" value={`m' = ${model.recovered}`} formula={`m' ≡ c^${model.d} (mod ${model.n})`} rgb="244, 114, 182" />
          </div>

          <div className="mt-4 rounded-[18px] border border-white/[0.07] bg-black/[0.13] p-4">
            <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.11em] text-slate-600">Key relation in this toy</div>
            <div className="mt-2 font-mono text-[11px] text-cyan-100/66">e·d ≡ {model.e}·{model.d} ≡ {(model.e * model.d) % model.phi} ≡ 1 (mod φ(n))</div>
            <p className="mt-3 text-[9px] leading-4 text-slate-700">Because e is chosen coprime to φ(n), it has a multiplicative inverse d modulo φ(n). The correctness of textbook RSA follows from modular arithmetic, with details depending on whether the message is coprime to n.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrimeSelect({ label, value, other, onChange }: { label: string; value: number; other: number; onChange: (value: number) => void }) {
  return <label className="rounded-[14px] border border-white/[0.07] bg-black/[0.12] p-3"><span className="font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">{label}</span><select value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-1 w-full bg-transparent font-mono text-[14px] text-white/80 outline-none">{PRIMES.filter((prime) => prime !== other).map((prime) => <option key={prime} value={prime} className="bg-slate-950">{prime}</option>)}</select></label>;
}

function Metric({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[14px] border px-3 py-3" style={{ borderColor: `rgba(${rgb},0.12)`, background: `rgba(${rgb},0.022)` }}><div className="font-mono text-[7px] uppercase tracking-[0.08em] text-slate-700">{label}</div><strong className="mt-1 block font-mono text-[14px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</strong></div>;
}

function Stage({ icon: Icon, label, value, formula, rgb }: { icon: typeof LockKeyhole; label: string; value: string; formula: string; rgb: string }) {
  return <div className="rounded-[18px] border p-4" style={{ borderColor: `rgba(${rgb},0.12)`, background: `rgba(${rgb},0.022)` }}><Icon size={16} style={{ color: `rgba(${rgb},0.72)` }} /><div className="mt-4 font-mono text-[7px] uppercase tracking-[0.09em] text-slate-700">{label}</div><strong className="mt-1 block font-mono text-[15px] text-white/80">{value}</strong><div className="mt-2 font-mono text-[8px] leading-4" style={{ color: `rgba(${rgb},0.56)` }}>{formula}</div></div>;
}
