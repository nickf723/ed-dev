const TRACES = [
  { d: "M80 470 C175 452 270 405 360 320 C445 240 520 130 650 54", opacity: 0.10 },
  { d: "M72 500 C195 492 298 454 392 360 C476 276 548 164 650 72", opacity: 0.07 },
  { d: "M90 420 C196 397 296 352 392 274 C485 198 550 118 638 58", opacity: 0.055 },
] as const;

export default function PowerBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#090501]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(249,115,22,0.09),transparent_27%),radial-gradient(circle_at_78%_72%,rgba(251,191,36,0.055),transparent_30%),linear-gradient(180deg,#100803_0%,#090501_52%,#040201_100%)]" />

      <div className="absolute left-[5%] top-[9%] h-[72%] w-[62%] opacity-65">
        <svg viewBox="0 0 720 540" className="h-full w-full">
          <line x1="70" y1="500" x2="680" y2="500" stroke="rgba(255,255,255,0.035)" />
          <line x1="120" y1="40" x2="120" y2="520" stroke="rgba(255,255,255,0.035)" />
          {TRACES.map((trace, index) => <path key={index} d={trace.d} fill="none" stroke={`rgba(249,115,22,${trace.opacity})`} strokeWidth="1.4" />)}
          <line x1="335" y1="378" x2="472" y2="238" stroke="rgba(251,191,36,0.10)" strokeWidth="1.2" strokeDasharray="5 7" />
          <circle cx="400" cy="311" r="5" fill="rgba(251,191,36,0.11)" />
          <line x1="260" y1="410" x2="485" y2="244" stroke="rgba(251,146,60,0.055)" />
        </svg>
      </div>

      <div className="absolute right-[8%] top-[17%] w-[310px] rounded-[28px] border border-orange-100/[0.035] bg-black/[0.03] p-5 opacity-50">
        <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-orange-100/16">slope evidence</div>
        <div className="mt-4 space-y-3">
          {['function','point','secant width','measured slope','candidate rule'].map((label, index) => <div key={label} className="grid grid-cols-[28px_minmax(0,1fr)] items-center gap-2"><span className="font-mono text-[7px] text-orange-100/12">0{index + 1}</span><span className="border-b border-orange-100/[0.035] pb-1 font-mono text-[7px] uppercase tracking-[0.09em] text-slate-100/11">{label}</span></div>)}
        </div>
      </div>

      <div className="absolute bottom-[8%] right-[7%] flex w-[340px] items-center gap-3 font-mono text-[7px] uppercase tracking-[0.13em] text-amber-100/12"><span>wide secant</span><span className="h-px flex-1 bg-gradient-to-r from-amber-100/[0.06] to-transparent" /><span>tangent limit</span></div>

      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(251,146,60,0.065)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.065)_1px,transparent_1px)] [background-size:46px_46px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_27%,rgba(4,2,1,0.77)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#090501] via-[#090501]/84 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-[#040201] via-[#040201]/90 to-transparent" />
    </div>
  );
}
