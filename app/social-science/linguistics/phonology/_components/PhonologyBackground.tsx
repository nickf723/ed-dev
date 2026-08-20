const WAVE = [
  50,45,57,36,66,28,72,33,61,42,54,47,59,38,68,30,73,35,63,44,52,48,55,41,64,34,69,39,58,46,51,49,
] as const;

const BANDS = [
  { top: 24, left: 8, width: 22, opacity: 0.07 },
  { top: 31, left: 25, width: 34, opacity: 0.055 },
  { top: 38, left: 13, width: 46, opacity: 0.045 },
  { top: 47, left: 38, width: 28, opacity: 0.065 },
  { top: 57, left: 18, width: 56, opacity: 0.038 },
  { top: 66, left: 46, width: 38, opacity: 0.05 },
] as const;

export default function PhonologyBackground() {
  const points = WAVE.map((value, index) => `${(index / (WAVE.length - 1)) * 100},${value}`).join(" ");

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#090506]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(251,146,60,0.085),transparent_28%),radial-gradient(circle_at_78%_70%,rgba(244,114,182,0.065),transparent_31%),linear-gradient(180deg,#120708_0%,#090506_54%,#040203_100%)]" />

      <div className="absolute left-[6%] top-[11%] h-[28%] w-[62%] opacity-65">
        <div className="mb-3 flex items-center gap-3 font-mono text-[7px] uppercase tracking-[0.14em] text-orange-100/14"><span>continuous pressure signal</span><span className="h-px flex-1 bg-gradient-to-r from-orange-100/[0.06] to-transparent" /></div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.035)" strokeWidth="0.3" />
          <polyline points={points} fill="none" stroke="rgba(251,146,60,0.12)" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div className="absolute left-[13%] top-[45%] h-[30%] w-[58%] rounded-[28px] border border-fuchsia-100/[0.025] bg-black/[0.025] opacity-65">
        <div className="absolute left-4 top-3 font-mono text-[7px] uppercase tracking-[0.14em] text-fuchsia-100/13">frequency × time representation</div>
        {BANDS.map((band, index) => <span key={index} className="absolute h-[7px] rounded-full blur-[1px]" style={{ top: `${band.top}%`, left: `${band.left}%`, width: `${band.width}%`, background: `rgba(244,114,182,${band.opacity})` }} />)}
        {[19,37,59,78].map((left) => <div key={left} className="absolute bottom-[12%] top-[18%] w-px bg-white/[0.025]" style={{ left: `${left}%` }} />)}
      </div>

      <div className="absolute right-[7%] top-[16%] w-[300px] opacity-55">
        <div className="font-mono text-[7px] uppercase tracking-[0.14em] text-cyan-100/14">analysis layers</div>
        <div className="mt-3 space-y-2">
          {[
            ["articulation", "gesture / place / manner / voicing"],
            ["acoustics", "timing / spectrum / periodicity"],
            ["perception", "listener categorization"],
            ["phonology", "contrast / pattern / context"],
          ].map(([label, detail], index) => <div key={label} className="grid grid-cols-[28px_minmax(0,1fr)] gap-2 border-b border-cyan-100/[0.03] pb-2"><span className="font-mono text-[7px] text-cyan-100/12">0{index + 1}</span><span><strong className="block font-mono text-[7px] uppercase tracking-[0.10em] text-cyan-100/14">{label}</strong><span className="mt-1 block font-mono text-[6px] uppercase tracking-[0.08em] text-slate-100/9">{detail}</span></span></div>)}
        </div>
      </div>

      <div className="absolute bottom-[8%] right-[7%] flex w-[420px] gap-2 opacity-55">
        {["segment", "segment", "boundary", "segment", "context"].map((label, index) => <div key={`${label}-${index}`} className="flex-1 border border-orange-100/[0.035] bg-orange-200/[0.012] px-2 py-2 text-center font-mono text-[6px] uppercase tracking-[0.08em] text-orange-100/11">{label}</div>)}
      </div>

      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(251,146,60,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(244,114,182,0.055)_1px,transparent_1px)] [background-size:46px_46px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_27%,rgba(4,2,3,0.78)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#090506] via-[#090506]/84 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-[#040203] via-[#040203]/90 to-transparent" />
    </div>
  );
}
