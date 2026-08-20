const INCOMING = [18, 24, 30, 36, 42, 48] as const;
const ARCS = [18, 28, 38, 48, 58, 68] as const;

export default function DiffractionBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#040515]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(167,139,250,0.09),transparent_28%),radial-gradient(circle_at_18%_72%,rgba(34,211,238,0.055),transparent_31%),linear-gradient(180deg,#070822_0%,#040515_54%,#02020a_100%)]" />

      <div className="absolute inset-[10%_5%_9%_6%] opacity-58">
        <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="h-full w-full">
          {INCOMING.map((x) => <line key={x} x1={x * 8} y1="95" x2={x * 8} y2="505" stroke="rgba(34,211,238,0.055)" strokeWidth="1.2" />)}

          <line x1="410" y1="70" x2="410" y2="258" stroke="rgba(226,232,240,0.075)" strokeWidth="5" />
          <line x1="410" y1="342" x2="410" y2="530" stroke="rgba(226,232,240,0.075)" strokeWidth="5" />
          <line x1="410" y1="258" x2="410" y2="342" stroke="rgba(167,139,250,0.02)" />

          {ARCS.map((radius, index) => (
            <path key={radius} d={`M412 300 A${radius * 4.2} ${radius * 2.8} 0 0 1 ${412 + radius * 4.0} ${300 - radius * 2.1}`} fill="none" stroke={`rgba(167,139,250,${0.035 + index * 0.008})`} strokeWidth="1.2" />
          ))}
          {ARCS.map((radius, index) => (
            <path key={`b-${radius}`} d={`M412 300 A${radius * 4.2} ${radius * 2.8} 0 0 0 ${412 + radius * 4.0} ${300 + radius * 2.1}`} fill="none" stroke={`rgba(167,139,250,${0.035 + index * 0.008})`} strokeWidth="1.2" />
          ))}

          <line x1="900" y1="78" x2="900" y2="522" stroke="rgba(250,204,21,0.06)" strokeWidth="2" />
          {[230,260,280,300,320,340,370].map((y, index) => <line key={y} x1={900 - [16,28,46,72,46,28,16][index]} x2={900 + [16,28,46,72,46,28,16][index]} y1={y} y2={y} stroke={`rgba(250,204,21,${0.025 + [16,28,46,72,46,28,16][index] / 900})`} strokeWidth="2" />)}
        </svg>
      </div>

      <div className="absolute right-[7%] top-[14%] w-[300px] rounded-[28px] border border-violet-100/[0.035] bg-black/[0.03] p-5 opacity-50">
        <div className="font-mono text-[7px] uppercase tracking-[0.14em] text-violet-100/14">geometry controls</div>
        <div className="mt-4 space-y-3">
          {['wave scale','opening scale','far-field pattern','angular spread'].map((label, index) => <div key={label} className="grid grid-cols-[28px_minmax(0,1fr)] gap-2 border-b border-violet-100/[0.03] pb-2"><span className="font-mono text-[7px] text-violet-100/11">0{index + 1}</span><span className="font-mono text-[7px] uppercase tracking-[0.10em] text-slate-100/10">{label}</span></div>)}
        </div>
      </div>

      <div className="absolute bottom-[8%] left-[8%] flex w-[360px] items-center gap-3 font-mono text-[7px] uppercase tracking-[0.13em] text-cyan-100/12"><span>plane wave</span><span className="h-px flex-1 bg-gradient-to-r from-cyan-100/[0.055] via-violet-100/[0.05] to-amber-100/[0.04]" /><span>pattern</span></div>

      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(167,139,250,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] [background-size:46px_46px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_26%,rgba(2,2,10,0.78)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#040515] via-[#040515]/84 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-[#02020a] via-[#02020a]/90 to-transparent" />
    </div>
  );
}
