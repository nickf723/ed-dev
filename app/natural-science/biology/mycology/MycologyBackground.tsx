const NODES = [
  [10, 72], [17, 60], [23, 66], [29, 50], [35, 58], [40, 42], [47, 49], [53, 35], [60, 43], [67, 29],
  [73, 38], [81, 24], [88, 31], [31, 78], [43, 70], [55, 78], [68, 68], [79, 76],
] as const;

const EDGES = [
  [0,1],[1,2],[1,3],[2,4],[3,4],[3,5],[4,6],[5,6],[5,7],[6,8],[7,8],[7,9],[8,10],[9,10],[9,11],[10,12],
  [2,13],[4,13],[13,14],[6,14],[14,15],[8,15],[15,16],[10,16],[16,17],[12,17],
] as const;

export default function MycologyBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#07050a]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(192,132,252,0.08),transparent_30%),radial-gradient(circle_at_76%_70%,rgba(74,222,128,0.07),transparent_32%),linear-gradient(180deg,#0a0710_0%,#07050a_52%,#030304_100%)]" />

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-[5%_3%_4%_3%] h-[91%] w-[94%] opacity-55">
        <defs>
          <linearGradient id="myco-thread" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(192,132,252,0.10)" />
            <stop offset="52%" stopColor="rgba(167,139,250,0.13)" />
            <stop offset="100%" stopColor="rgba(74,222,128,0.10)" />
          </linearGradient>
        </defs>
        {EDGES.map(([a, b], index) => {
          const [x1, y1] = NODES[a];
          const [x2, y2] = NODES[b];
          const cx = (x1 + x2) / 2 + ((index % 3) - 1) * 2;
          const cy = (y1 + y2) / 2 - 2 - (index % 2) * 2;
          return <path key={index} d={`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`} fill="none" stroke="url(#myco-thread)" strokeWidth="0.32" vectorEffect="non-scaling-stroke" />;
        })}
        {NODES.map(([x, y], index) => <circle key={index} cx={x} cy={y} r={index % 4 === 0 ? 0.55 : 0.32} fill={index % 3 === 0 ? "rgba(74,222,128,0.14)" : "rgba(216,180,254,0.13)"} />)}
      </svg>

      <div className="absolute left-[8%] bottom-[9%] w-[310px] rounded-[28px] border border-purple-100/[0.035] bg-black/[0.04] p-5 opacity-50">
        <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-purple-100/18">mycelial scale</div>
        <div className="mt-3 space-y-2">
          {['hyphal tip','branch','network','substrate interface'].map((label, index) => <div key={label} className="grid grid-cols-[28px_minmax(0,1fr)] items-center gap-2"><span className="font-mono text-[8px] text-emerald-100/14">0{index + 1}</span><span className="h-px bg-gradient-to-r from-purple-100/[0.08] to-transparent" /><span className="col-start-2 font-mono text-[7px] uppercase tracking-[0.10em] text-slate-100/12">{label}</span></div>)}
        </div>
      </div>

      <div className="absolute right-[8%] top-[18%] h-[240px] w-[240px] rounded-full border border-emerald-100/[0.035] bg-[radial-gradient(circle_at_44%_45%,rgba(74,222,128,0.035),transparent_48%)] opacity-50">
        {Array.from({ length: 18 }, (_, index) => <span key={index} className="absolute rounded-full border border-emerald-100/[0.045] bg-emerald-200/[0.012]" style={{ left: `${12 + ((index * 29) % 76)}%`, top: `${10 + ((index * 43) % 78)}%`, width: `${3 + (index % 3)}px`, height: `${3 + (index % 3)}px` }} />)}
      </div>

      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,rgba(226,232,240,0.13)_0.7px,transparent_0.8px)] [background-size:28px_28px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(3,3,4,0.76)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#07050a] via-[#07050a]/84 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-[#030304] via-[#030304]/90 to-transparent" />
    </div>
  );
}
