"use client";

import { useMemo, useState } from "react";
import { Activity, Binary, FileText, Gauge, Sigma } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";
import { measureSymbolStream } from "./informationScienceModel";

export default function EntropyWidget() {
  const [text, setText] = useState("BANANA_BANDANA");
  const stats = useMemo(() => measureSymbolStream(text), [text]);

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[28px] border-cyan-100/[0.12]"
      style={{ background: "rgba(5,16,26,0.24)" }}
    >
      <div className="grid border-b border-cyan-100/[0.08] lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="p-5">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-200/60"><Sigma size={14} /> Symbol entropy bench</div>
          <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.035em] text-white">How unpredictable is the next observed symbol in this sample?</h3>
          <p className="mt-2 text-[13px] leading-6 text-slate-400/72">The widget estimates Shannon entropy from the empirical character frequencies in the text you enter. It is a property of this observed distribution, not a universal “meaning score.”</p>
        </div>
        <div className="border-t border-cyan-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[12px] lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">Model boundary</span>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">Short samples give unstable frequency estimates. Real compression also depends on sequence structure, coding overhead, dictionaries, context, and the chosen model, not only single-symbol frequencies.</p>
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_300px] sm:p-5">
        <div>
          <label className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500" htmlFor="entropy-signal">Observed symbol stream</label>
          <textarea
            id="entropy-signal"
            value={text}
            onChange={(event) => setText(event.target.value.slice(0, 160))}
            rows={3}
            spellCheck={false}
            className="mt-2 w-full resize-none border border-cyan-100/[0.10] bg-black/[0.18] px-3 py-3 font-mono text-[14px] leading-6 text-cyan-100/82 outline-none transition focus:border-cyan-300/35"
          />

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Readout icon={FileText} label="Symbols" value={String(stats.count)} />
            <Readout icon={Binary} label="UTF-8 storage" value={`${stats.utf8Bits} bits`} />
            <Readout icon={Activity} label="Alphabet seen" value={String(stats.unique)} />
            <Readout icon={Gauge} label="Empirical H" value={`${stats.entropy.toFixed(2)} bits/symbol`} />
          </div>

          <div className="mt-4 border-y border-white/[0.07] py-3">
            <div className="flex items-end justify-between gap-3"><span className="text-[12px] text-slate-400">Entropy relative to the maximum for the observed alphabet</span><strong className="font-mono text-[13px] text-cyan-200/75">{stats.maxEntropy > 0 ? `${Math.round((stats.entropy / stats.maxEntropy) * 100)}%` : "0%"}</strong></div>
            <div className="mt-2 h-2 overflow-hidden bg-white/[0.055]"><div className="h-full bg-gradient-to-r from-cyan-400/65 to-violet-400/65 transition-[width] duration-300" style={{ width: `${stats.maxEntropy > 0 ? Math.min(100, (stats.entropy / stats.maxEntropy) * 100) : 0}%` }} /></div>
          </div>
        </div>

        <div className="border border-white/[0.07] bg-black/[0.06] p-4 backdrop-blur-[10px]">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-200/52">Observed frequencies</div>
          <div className="mt-3 max-h-[250px] space-y-2 overflow-auto pr-1">
            {stats.frequencies.length === 0 ? <p className="text-[12px] text-slate-600">Enter a signal to measure it.</p> : stats.frequencies.map(({ symbol, count, probability }) => (
              <div key={symbol} className="grid grid-cols-[36px_34px_minmax(0,1fr)_48px] items-center gap-2">
                <code className="text-[12px] text-white/78">{visibleSymbol(symbol)}</code>
                <span className="font-mono text-[11px] text-slate-500">{count}×</span>
                <span className="h-1.5 bg-white/[0.045]"><span className="block h-full bg-cyan-300/45" style={{ width: `${probability * 100}%` }} /></span>
                <span className="text-right font-mono text-[11px] text-slate-500">{(probability * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-l-2 border-violet-300/20 pl-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-slate-600">Idealized total at this model</span>
            <p className="mt-1 text-[13px] text-slate-400"><strong className="text-violet-200/70">{stats.empiricalBits.toFixed(1)} bits</strong> = H × observed symbol count.</p>
            <p className="mt-1 text-[11px] leading-5 text-slate-600">That number is a theoretical frequency-model quantity, not the actual size of a compressed file.</p>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function visibleSymbol(symbol: string) {
  if (symbol === " ") return "␠";
  if (symbol === "\n") return "↵";
  if (symbol === "\t") return "⇥";
  return symbol;
}

function Readout({ icon: Icon, label, value }: { icon: typeof Activity; label: string; value: string }) {
  return (
    <div className="border-l-2 border-cyan-300/18 bg-black/[0.055] px-3 py-3">
      <span className="flex items-center gap-2 text-[11px] text-slate-500"><Icon size={12} /> {label}</span>
      <strong className="mt-1 block font-mono text-[13px] text-white/76">{value}</strong>
    </div>
  );
}
