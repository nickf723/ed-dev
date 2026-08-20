"use client";

import { useState } from "react";
import { CheckCircle2, MoveRight } from "lucide-react";

type TokenId = "pin" | "spin" | "bin";
type Bucket = "p" | "b";

type Token = {
  id: TokenId;
  word: string;
  realization: string;
  context: string;
};

const TOKENS: readonly Token[] = [
  { id: "pin", word: "pin", realization: "[pʰ]", context: "word-initial before a stressed vowel in many English varieties" },
  { id: "spin", word: "spin", realization: "[p]", context: "after /s/ in the same onset in many English varieties" },
  { id: "bin", word: "bin", realization: "[b]", context: "voiced bilabial stop" },
] as const;

export default function PhonologyPractice() {
  const [assignments, setAssignments] = useState<Record<TokenId, Bucket | null>>({ pin: null, spin: null, bin: null });
  const [selected, setSelected] = useState<TokenId | null>(null);
  const [checked, setChecked] = useState(false);

  const complete = Object.values(assignments).every(Boolean);
  const correct = assignments.pin === "p" && assignments.spin === "p" && assignments.bin === "b";

  function assign(id: TokenId, bucket: Bucket) {
    setAssignments((current) => ({ ...current, [id]: bucket }));
    setSelected(null);
    setChecked(false);
  }

  function drop(bucket: Bucket, event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain") as TokenId;
    if (TOKENS.some((token) => token.id === id)) assign(id, bucket);
  }

  return (
    <div className="overflow-hidden rounded-[26px] border border-fuchsia-100/[0.10] bg-[#10070b]/74 backdrop-blur-xl">
      <div className="border-b border-white/[0.07] p-5 sm:p-6">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-fuchsia-200/60">Application · broad vs. narrow analysis</div>
        <h3 className="mt-2 text-[clamp(1.55rem,2.7vw,2.35rem)] font-semibold tracking-[-0.04em] text-white">Group the three consonant realizations into broad phoneme categories.</h3>
        <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400/72">Drag a token into a category, or select a token and then click a category. The illustrative aspiration pattern is common in English but can vary by dialect, speaker, and speaking style.</p>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:p-6 lg:items-start">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.07em] text-slate-500">Speech tokens</div>
          <div className="mt-3 space-y-2">
            {TOKENS.map((token) => {
              const assigned = assignments[token.id];
              const active = selected === token.id;
              return (
                <button
                  key={token.id}
                  type="button"
                  draggable
                  onDragStart={(event) => event.dataTransfer.setData("text/plain", token.id)}
                  onClick={() => setSelected(token.id)}
                  className={`grid w-full grid-cols-[70px_70px_minmax(0,1fr)_64px] items-center gap-2 rounded-[15px] border p-3 text-left transition ${active ? "border-fuchsia-200/[0.28] bg-fuchsia-300/[0.04]" : "border-white/[0.06] bg-black/[0.05]"}`}
                >
                  <strong className="text-[16px] text-white">{token.word}</strong>
                  <span className="font-mono text-[18px] text-fuchsia-100/82">{token.realization}</span>
                  <span className="text-[11px] leading-4 text-slate-500">{token.context}</span>
                  <span className="text-right font-mono text-[10px] uppercase text-slate-500">{assigned ? `/${assigned}/` : "unfiled"}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] leading-5 text-slate-500">The square brackets mark illustrative phonetic realizations. The slash categories on the right are the broader phonological analysis you are building.</p>
        </div>

        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            <BucketCard bucket="p" label="Broad /p/ category" selected={selected} onAssign={assign} onDrop={drop} assigned={TOKENS.filter((token) => assignments[token.id] === "p")} rgb="251,146,60" />
            <BucketCard bucket="b" label="Broad /b/ category" selected={selected} onAssign={assign} onDrop={drop} assigned={TOKENS.filter((token) => assignments[token.id] === "b")} rgb="244,114,182" />
          </div>

          <button type="button" onClick={() => setChecked(true)} disabled={!complete} className="mt-4 min-h-[44px] rounded-[14px] border border-fuchsia-200/[0.18] bg-fuchsia-300/[0.04] px-5 text-[12px] font-semibold text-fuchsia-100 transition disabled:opacity-35">Check grouping</button>

          {checked ? (
            <div className={`mt-4 rounded-[16px] border p-4 ${correct ? "border-emerald-300/[0.16] bg-emerald-300/[0.025]" : "border-amber-300/[0.14] bg-amber-300/[0.02]"}`}>
              <div className="flex items-center gap-2"><CheckCircle2 size={14} className={correct ? "text-emerald-300" : "text-amber-300/65"} /><strong className={`text-[12px] ${correct ? "text-emerald-200" : "text-amber-100/82"}`}>{correct ? "The grouping captures the English contrast" : "The broad categories need another pass"}</strong></div>
              <p className="mt-2 text-[12px] leading-5 text-slate-400/72">{correct ? "[pʰ] and [p] can be treated as context-conditioned realizations of broad /p/ in this English example, while /p/ and /b/ contrast because changing between them can distinguish words such as pin and bin." : "Ask whether the phonetic difference creates a different word category or is predictable from the surrounding context. Compare pin with bin, then pin with spin."}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function BucketCard({ bucket, label, selected, onAssign, onDrop, assigned, rgb }: { bucket: Bucket; label: string; selected: TokenId | null; onAssign: (id: TokenId, bucket: Bucket) => void; onDrop: (bucket: Bucket, event: React.DragEvent<HTMLDivElement>) => void; assigned: readonly Token[]; rgb: string }) {
  return (
    <div onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDrop(bucket, event)} className="min-h-[190px] rounded-[18px] border p-4" style={{ borderColor: `rgba(${rgb},0.18)`, background: `rgba(${rgb},0.025)` }}>
      <div className="flex items-center justify-between gap-2"><strong className="text-[13px]" style={{ color: `rgb(${rgb})` }}>{label}</strong>{selected ? <button type="button" onClick={() => onAssign(selected, bucket)} className="flex items-center gap-1 rounded-full border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.05em]" style={{ borderColor: `rgba(${rgb},0.24)`, color: `rgb(${rgb})` }}>place here <MoveRight size={10} /></button> : null}</div>
      <div className="mt-4 space-y-2">{assigned.length ? assigned.map((token) => <div key={token.id} className="rounded-[11px] border border-white/[0.06] bg-black/[0.09] px-3 py-2"><span className="font-mono text-[14px] text-white/82">{token.realization}</span><span className="ml-2 text-[11px] text-slate-500">{token.word}</span></div>) : <div className="rounded-[11px] border border-dashed border-white/[0.06] px-3 py-5 text-center text-[10px] text-slate-600">drop or place tokens here</div>}</div>
    </div>
  );
}
