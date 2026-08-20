const CELLS = [
  [12, 18, 9, 0], [28, 11, 6, 1], [43, 24, 8, 2], [62, 15, 7, 0], [78, 29, 10, 1],
  [19, 47, 7, 2], [36, 39, 9, 0], [54, 52, 6, 1], [71, 44, 8, 2], [88, 55, 7, 0],
  [8, 71, 6, 1], [26, 65, 8, 2], [46, 76, 10, 0], [65, 69, 7, 1], [82, 81, 9, 2],
] as const;

export default function MicrobiologyBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#020807]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(163,230,53,0.075),transparent_28%),radial-gradient(circle_at_77%_68%,rgba(34,211,238,0.07),transparent_30%),linear-gradient(180deg,#04100d_0%,#020807_58%,#010403_100%)]" />

      <div className="absolute left-[7%] top-[12%] h-[58vw] max-h-[760px] w-[58vw] max-w-[760px] rounded-full border border-lime-100/[0.045] bg-[radial-gradient(circle_at_38%_34%,rgba(217,249,157,0.025),transparent_14%),radial-gradient(circle_at_center,rgba(77,124,15,0.06),rgba(2,8,7,0.02)_66%,transparent_72%)] shadow-[inset_0_0_120px_rgba(163,230,53,0.025)]">
        <div className="absolute inset-[8%] rounded-full border border-lime-100/[0.035]" />
        {CELLS.map(([x, y, size, kind], index) => (
          <span
            key={index}
            className={`absolute border ${kind === 0 ? "rounded-full border-lime-200/[0.10] bg-lime-300/[0.025]" : kind === 1 ? "rounded-[999px] border-cyan-200/[0.09] bg-cyan-300/[0.022] rotate-[28deg]" : "rounded-[42%] border-emerald-200/[0.09] bg-emerald-300/[0.02] rotate-[-18deg]"}`}
            style={{ left: `${x}%`, top: `${y}%`, width: `${size * 2}px`, height: kind === 1 ? `${size}px` : `${size * 2}px` }}
          />
        ))}
      </div>

      <div className="absolute right-[8%] top-[14%] w-[310px] space-y-3 opacity-45">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-100/[0.12] to-transparent" />
        {['inoculum','lag','growth','resource limit','stationary'].map((label, index) => (
          <div key={label} className="grid grid-cols-[32px_minmax(0,1fr)] items-center gap-3 font-mono text-[8px] uppercase tracking-[0.14em] text-cyan-100/18"><span>0{index + 1}</span><span className="border-b border-cyan-100/[0.035] pb-1">{label}</span></div>
        ))}
      </div>

      <div className="absolute bottom-[9%] right-[7%] h-[28%] w-[44%] opacity-55">
        <svg viewBox="0 0 600 220" className="h-full w-full">
          <path d="M20 190 C90 188 120 182 155 160 C200 130 215 72 275 54 C340 34 420 38 575 38" fill="none" stroke="rgba(163,230,53,0.10)" strokeWidth="2" />
          <path d="M20 190 H575" stroke="rgba(255,255,255,0.035)" />
          <path d="M20 32 V190" stroke="rgba(255,255,255,0.035)" />
          {[130,240,350,460].map((x) => <path key={x} d={`M${x} 32 V190`} stroke="rgba(34,211,238,0.025)" strokeDasharray="3 6" />)}
        </svg>
      </div>

      <div className="absolute inset-0 opacity-[0.09] [background-image:radial-gradient(circle,rgba(226,232,240,0.16)_0.7px,transparent_0.8px)] [background-size:25px_25px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_24%,rgba(1,4,3,0.76)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#020807] via-[#020807]/82 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-[#010403] via-[#010403]/90 to-transparent" />
    </div>
  );
}
