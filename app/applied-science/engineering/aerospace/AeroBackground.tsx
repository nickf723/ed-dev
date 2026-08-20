const ALTITUDE_LINES = [18, 32, 48, 66, 82] as const;

export default function AeroBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#03101c]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(125,211,252,0.09),transparent_28%),radial-gradient(circle_at_18%_72%,rgba(251,146,60,0.055),transparent_30%),linear-gradient(180deg,#061828_0%,#03101c_50%,#020711_100%)]" />

      <div className="absolute inset-[8%_5%_10%_6%] opacity-60">
        {ALTITUDE_LINES.map((top, index) => (
          <div key={top} className="absolute left-0 right-0 border-t border-sky-100/[0.045]" style={{ top: `${top}%` }}>
            <span className="absolute -top-4 left-0 font-mono text-[7px] uppercase tracking-[0.13em] text-sky-100/14">band 0{index + 1}</span>
          </div>
        ))}

        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M30 470 C180 390 300 355 438 338 C600 318 742 249 958 104" fill="none" stroke="rgba(125,211,252,0.10)" strokeWidth="1.5" strokeDasharray="7 8" />
          <path d="M45 510 C206 460 380 450 558 408 C720 370 825 298 954 222" fill="none" stroke="rgba(251,146,60,0.075)" strokeWidth="1.1" />
          <circle cx="438" cy="338" r="5" fill="rgba(125,211,252,0.18)" />
          <circle cx="558" cy="408" r="4" fill="rgba(251,146,60,0.16)" />
          <path d="M438 338 h74" stroke="rgba(226,232,240,0.065)" />
          <path d="M558 408 v-72" stroke="rgba(226,232,240,0.055)" />
        </svg>
      </div>

      <div className="absolute right-[8%] top-[12%] w-[330px] rounded-[28px] border border-sky-100/[0.035] bg-black/[0.035] p-5 opacity-52">
        <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-sky-100/18">flight state</div>
        <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
          {['airspeed','angle','lift / weight','drag / thrust','stability','margin'].map((label, index) => (
            <div key={label} className="border-b border-sky-100/[0.035] pb-1.5 font-mono text-[7px] uppercase tracking-[0.10em] text-slate-100/12"><span className="mr-2 text-sky-100/10">0{index + 1}</span>{label}</div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[8%] left-[7%] w-[290px] opacity-45">
        <div className="flex items-center gap-3 font-mono text-[7px] uppercase tracking-[0.13em] text-orange-100/14"><span>atmosphere</span><span className="h-px flex-1 bg-gradient-to-r from-orange-100/[0.07] to-transparent" /></div>
        <div className="mt-3 flex items-center gap-3 font-mono text-[7px] uppercase tracking-[0.13em] text-violet-100/14"><span>orbit</span><span className="h-px flex-1 bg-gradient-to-r from-violet-100/[0.07] to-transparent" /></div>
      </div>

      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(186,230,253,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(186,230,253,0.09)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_26%,rgba(1,5,10,0.76)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#03101c] via-[#03101c]/82 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-[#020711] via-[#020711]/90 to-transparent" />
    </div>
  );
}
