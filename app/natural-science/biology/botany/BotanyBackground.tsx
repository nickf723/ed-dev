const VEINS = [
  [50, 82, 50, 18],
  [50, 28, 30, 14], [50, 34, 72, 20], [50, 42, 26, 31], [50, 48, 76, 36], [50, 56, 22, 51], [50, 62, 79, 55], [50, 70, 30, 69], [50, 73, 68, 72],
  [30, 14, 19, 10], [30, 14, 25, 25], [72, 20, 84, 15], [72, 20, 79, 31], [26, 31, 14, 29], [26, 31, 20, 43], [76, 36, 88, 34], [76, 36, 83, 48],
] as const;

export default function BotanyBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#020704]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_16%,rgba(74,222,128,0.08),transparent_29%),radial-gradient(circle_at_78%_72%,rgba(34,211,238,0.055),transparent_32%),linear-gradient(180deg,#041009_0%,#020704_56%,#010402_100%)]" />

      <div className="absolute left-[7%] top-[8%] h-[74%] w-[58%] opacity-55">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <path d="M50 88 C18 76 12 43 29 17 C39 3 58 5 72 18 C92 36 84 67 50 88 Z" fill="rgba(74,222,128,0.018)" stroke="rgba(134,239,172,0.055)" strokeWidth="0.45" />
          {VEINS.map(([x1,y1,x2,y2], index) => <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke={index === 0 ? "rgba(134,239,172,0.12)" : "rgba(110,231,183,0.07)"} strokeWidth={index === 0 ? 0.7 : 0.38} />)}
        </svg>
      </div>

      <div className="absolute right-[10%] top-[15%] h-[58%] w-[24%] rounded-[40px] border border-emerald-100/[0.035] bg-black/[0.035] opacity-55">
        <div className="absolute bottom-[8%] left-1/2 h-[76%] w-[6px] -translate-x-1/2 rounded-full bg-gradient-to-t from-cyan-300/[0.04] via-emerald-300/[0.07] to-lime-200/[0.045]" />
        {[24,39,54,69].map((top, index) => <div key={top} className="absolute left-[22%] right-[22%] h-px bg-white/[0.035]" style={{ top: `${top}%` }}><span className="absolute -top-2 left-0 font-mono text-[7px] uppercase tracking-[0.12em] text-emerald-100/12">{['root','xylem','leaf','air'][index]}</span></div>)}
        <div className="absolute bottom-[10%] left-[18%] right-[18%] h-[18%] border-t border-cyan-100/[0.045] [background-image:linear-gradient(165deg,transparent_46%,rgba(34,211,238,0.04)_47%,rgba(34,211,238,0.04)_49%,transparent_50%)] [background-size:26px_18px]" />
      </div>

      <div className="absolute bottom-[7%] left-[8%] right-[8%] h-[18%] opacity-40">
        {[0,1,2,3,4].map((index) => <div key={index} className="absolute left-0 right-0 rounded-[50%] border-t border-amber-100/[0.035]" style={{ top: `${index * 18}%`, transform: `translateX(${index % 2 === 0 ? 0 : 2}%)` }} />)}
      </div>

      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,rgba(226,232,240,0.13)_0.7px,transparent_0.8px)] [background-size:28px_28px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_24%,rgba(1,4,2,0.77)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#020704] via-[#020704]/84 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-[#010402] via-[#010402]/90 to-transparent" />
    </div>
  );
}
