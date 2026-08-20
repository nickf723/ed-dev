export default function MechatronicsBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#040709]" aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.17] [background-image:linear-gradient(rgba(34,211,238,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.10)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(251,146,60,0.10),transparent_30%),linear-gradient(to_bottom,rgba(4,7,9,0.08),rgba(4,7,9,0.82))]" />

      <svg className="absolute inset-0 h-full w-full opacity-[0.24]" viewBox="0 0 1600 1000" preserveAspectRatio="none">
        <g fill="none" strokeLinecap="round">
          <path d="M0 180 H260 V310 H520" stroke="rgba(34,211,238,0.34)" strokeWidth="1.2" />
          <path d="M1600 220 H1350 V360 H1120" stroke="rgba(251,146,60,0.30)" strokeWidth="1.2" />
          <path d="M0 760 H310 V650 H520" stroke="rgba(251,146,60,0.25)" strokeWidth="1.1" />
          <path d="M1600 820 H1310 V700 H1090" stroke="rgba(34,211,238,0.26)" strokeWidth="1.1" />
          <circle cx="800" cy="505" r="205" stroke="rgba(255,255,255,0.055)" strokeWidth="1" strokeDasharray="8 14" />
          <circle cx="800" cy="505" r="286" stroke="rgba(34,211,238,0.08)" strokeWidth="1" />
          <path d="M610 505 A190 190 0 0 1 800 315" stroke="rgba(34,211,238,0.20)" strokeWidth="1.2" />
          <path d="M990 505 A190 190 0 0 1 800 695" stroke="rgba(251,146,60,0.20)" strokeWidth="1.2" />
        </g>
        <g fill="rgba(34,211,238,0.32)">
          <circle cx="260" cy="180" r="3" /><circle cx="260" cy="310" r="3" /><circle cx="520" cy="310" r="3" />
          <circle cx="1310" cy="700" r="3" /><circle cx="1090" cy="700" r="3" />
        </g>
        <g fill="rgba(251,146,60,0.30)">
          <circle cx="1350" cy="220" r="3" /><circle cx="1350" cy="360" r="3" /><circle cx="1120" cy="360" r="3" />
          <circle cx="310" cy="760" r="3" /><circle cx="310" cy="650" r="3" />
        </g>
      </svg>

      <div className="absolute left-[7%] top-[17%] font-mono text-[8px] uppercase tracking-[0.14em] text-cyan-200/16">sensor bus</div>
      <div className="absolute right-[8%] top-[25%] font-mono text-[8px] uppercase tracking-[0.14em] text-orange-200/14">actuator path</div>
      <div className="absolute bottom-[14%] left-[10%] font-mono text-[8px] uppercase tracking-[0.14em] text-orange-200/12">load transfer</div>
    </div>
  );
}
