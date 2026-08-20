const STAFF_LINES = [24, 32, 40, 48, 56] as const;

export default function PerformanceBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#090604]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(251,146,60,0.085),transparent_28%),radial-gradient(circle_at_78%_68%,rgba(244,114,182,0.065),transparent_31%),linear-gradient(180deg,#100905_0%,#090604_52%,#040303_100%)]" />

      <div className="absolute left-[6%] top-[12%] h-[58%] w-[62%] rotate-[-2deg] opacity-55">
        {STAFF_LINES.map((top) => <div key={top} className="absolute left-0 right-0 h-px bg-amber-100/[0.055]" style={{ top: `${top}%` }} />)}
        {[14,28,43,61,79].map((left, index) => (
          <div key={left} className="absolute h-[54px] w-[28px]" style={{ left: `${left}%`, top: `${26 + (index % 3) * 9}%` }}>
            <span className="absolute bottom-0 left-0 h-5 w-5 rounded-full border border-amber-100/[0.07] bg-amber-200/[0.018]" />
            <span className="absolute bottom-4 left-[18px] h-10 w-px bg-amber-100/[0.065]" />
          </div>
        ))}
        <div className="absolute left-[10%] right-[4%] top-[72%] h-px bg-gradient-to-r from-orange-100/[0.08] via-pink-100/[0.07] to-transparent" />
      </div>

      <div className="absolute right-[8%] top-[14%] h-[54%] w-[28%] rounded-[36px] border border-orange-100/[0.035] bg-black/[0.035] opacity-58">
        <div className="absolute inset-x-[14%] top-[14%] h-[58%]">
          {[0,1,2,3,4].map((index) => (
            <div key={index} className="absolute bottom-0 w-[14%] rounded-t-[5px] border border-pink-100/[0.045] bg-pink-200/[0.015]" style={{ left: `${index * 20}%`, height: `${34 + [10,28,52,35,16][index]}%` }} />
          ))}
        </div>
        <div className="absolute bottom-[16%] left-[13%] right-[13%] flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.13em] text-orange-100/14"><span>attack</span><span className="h-px flex-1 bg-orange-100/[0.05]" /><span>release</span></div>
      </div>

      <div className="absolute bottom-[8%] left-[10%] right-[10%] h-[16%] opacity-48">
        <div className="absolute left-[10%] right-[10%] top-1/2 h-px bg-white/[0.035]" />
        {[12,31,52,72,88].map((left, index) => <span key={left} className="absolute top-[44%] h-3 w-3 rounded-full border border-orange-100/[0.055] bg-orange-200/[0.018]" style={{ left: `${left}%` }}><span className="absolute left-1/2 top-4 whitespace-nowrap -translate-x-1/2 font-mono text-[7px] uppercase tracking-[0.10em] text-slate-100/10">{['cue','breath','peak','release','listen'][index]}</span></span>)}
      </div>

      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(251,146,60,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.07)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_27%,rgba(4,3,3,0.76)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#090604] via-[#090604]/84 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-[#040303] via-[#040303]/90 to-transparent" />
    </div>
  );
}
