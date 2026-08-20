"use client";

import { useMemo, useState } from "react";
import { BrainCircuit, RotateCcw } from "lucide-react";

const STIMULI = ["A", "7", "M"] as const;
const ROUND_TWO = ["M", "A", "7"] as const;
const COLORS = [
  { id: "red", label: "Red", rgb: "248,113,113" },
  { id: "orange", label: "Orange", rgb: "251,146,60" },
  { id: "yellow", label: "Yellow", rgb: "250,204,21" },
  { id: "green", label: "Green", rgb: "74,222,128" },
  { id: "blue", label: "Blue", rgb: "96,165,250" },
  { id: "violet", label: "Violet", rgb: "192,132,252" },
] as const;

type Stimulus = (typeof STIMULI)[number];
type ColorId = (typeof COLORS)[number]["id"];
type Answers = Partial<Record<Stimulus, ColorId>>;

export default function SensoryMapperWidget() {
  const [round, setRound] = useState<1 | 2 | 3>(1);
  const [index, setIndex] = useState(0);
  const [first, setFirst] = useState<Answers>({});
  const [second, setSecond] = useState<Answers>({});

  const sequence = round === 2 ? ROUND_TWO : STIMULI;
  const stimulus = sequence[Math.min(index, sequence.length - 1)];
  const matches = useMemo(() => STIMULI.filter((item) => first[item] && first[item] === second[item]).length, [first, second]);

  function choose(color: ColorId) {
    if (round === 3) return;
    const current = stimulus;
    if (round === 1) setFirst((answers) => ({ ...answers, [current]: color }));
    else setSecond((answers) => ({ ...answers, [current]: color }));

    if (index < sequence.length - 1) {
      setIndex((value) => value + 1);
      return;
    }
    if (round === 1) {
      setRound(2);
      setIndex(0);
    } else {
      setRound(3);
      setIndex(0);
    }
  }

  function reset() {
    setRound(1);
    setIndex(0);
    setFirst({});
    setSecond({});
  }

  return (
    <section className="overflow-hidden rounded-[24px] border border-fuchsia-100/[0.10] bg-[#100815]/68 backdrop-blur-xl">
      <div className="grid gap-3 border-b border-white/[0.07] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-fuchsia-200/68"><BrainCircuit size={13} /> Consistency experiment</div>
          <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">Would the same inducer evoke the same concurrent again?</h3>
        </div>
        <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-400 hover:text-white"><RotateCcw size={11} /> reset</button>
      </div>

      {round < 3 ? (
        <div className="grid gap-5 p-4 lg:grid-cols-[220px_minmax(0,1fr)] sm:p-5 lg:items-center">
          <div className="flex min-h-[220px] items-center justify-center rounded-[22px] border border-white/[0.07] bg-black/[0.20]">
            <span className="text-[96px] font-semibold leading-none text-white">{stimulus}</span>
          </div>
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-slate-500">Round {round} · item {index + 1} / {sequence.length}</span>
              <span className="text-[11px] text-slate-500">choose the first color that fits</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
              {COLORS.map((color) => (
                <button key={color.id} type="button" onClick={() => choose(color.id)} className="rounded-[14px] border border-white/[0.07] bg-black/[0.12] p-2 text-center transition hover:-translate-y-0.5" aria-label={`Choose ${color.label} for ${stimulus}`}>
                  <span className="mx-auto block h-10 w-10 rounded-full border border-white/20" style={{ background: `rgb(${color.rgb})` }} />
                  <span className="mt-2 block text-[10px] text-slate-400">{color.label}</span>
                </button>
              ))}
            </div>
            <p className="mt-5 border-l-2 border-fuchsia-300/30 pl-3 text-[12px] leading-6 text-slate-400">Round 2 repeats the same graphemes in a different order without showing your first choices. This toy demonstrates consistency measurement; it is not a test or diagnosis of synesthesia.</p>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
            <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.16] p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.07em] text-slate-500">Repeated matches</div>
              <div className="mt-2 text-[56px] font-semibold leading-none text-fuchsia-200">{matches}/{STIMULI.length}</div>
              <p className="mt-3 text-[12px] leading-5 text-slate-400">A high score here only means your choices matched across two immediate rounds. Memory, preference, learned associations, and chance can all contribute.</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {STIMULI.map((item) => <Comparison key={item} stimulus={item} first={first[item]} second={second[item]} />)}
            </div>
          </div>
          <div className="mt-4 rounded-[16px] border border-fuchsia-200/[0.10] bg-fuchsia-300/[0.025] p-4">
            <strong className="text-[12px] text-fuchsia-100/82">Why researchers repeat the task</strong>
            <p className="mt-2 text-[12px] leading-6 text-slate-400">Many forms of developmental synesthesia are described as relatively stable inducer–concurrent associations, such as a grapheme reliably evoking a particular color. Consistency is useful evidence, but researchers also consider automaticity, phenomenology, task design, development, and alternative explanations.</p>
          </div>
        </div>
      )}
    </section>
  );
}

function Comparison({ stimulus, first, second }: { stimulus: Stimulus; first?: ColorId; second?: ColorId }) {
  const firstColor = COLORS.find((color) => color.id === first);
  const secondColor = COLORS.find((color) => color.id === second);
  const match = Boolean(first && second && first === second);
  return (
    <div className="rounded-[17px] border border-white/[0.07] bg-black/[0.12] p-4">
      <div className="flex items-center justify-between gap-3"><strong className="text-[24px] text-white">{stimulus}</strong><span className={`font-mono text-[9px] uppercase tracking-[0.06em] ${match ? "text-emerald-300" : "text-amber-300"}`}>{match ? "match" : "changed"}</span></div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Swatch label="round 1" rgb={firstColor?.rgb} />
        <Swatch label="round 2" rgb={secondColor?.rgb} />
      </div>
    </div>
  );
}

function Swatch({ label, rgb }: { label: string; rgb?: string }) {
  return <div><span className="block h-10 rounded-[10px] border border-white/[0.08]" style={{ background: rgb ? `rgb(${rgb})` : "rgba(255,255,255,0.04)" }} /><span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.05em] text-slate-500">{label}</span></div>;
}
