"use client";

export type FundamentalsLessonKey =
  | "expressions-variables"
  | "equality-equations"
  | "algebraic-properties"
  | "number-systems";

export default function FundamentalsLessonBackgroundV2({
  lesson,
}: {
  lesson: FundamentalsLessonKey;
}) {
  if (lesson === "expressions-variables") return <ExpressionField />;
  if (lesson === "equality-equations") return <EqualityField />;
  if (lesson === "algebraic-properties") return <PropertyField />;
  return <NumberField />;
}

function ExpressionField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(52,211,153,0.18),transparent_28%),radial-gradient(circle_at_82%_78%,rgba(34,211,238,0.10),transparent_32%),linear-gradient(to_bottom,rgba(3,25,18,0.18),rgba(1,10,8,0.82))]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(52,211,153,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.028)_1px,transparent_1px)] [background-size:64px_64px]" />
      <svg viewBox="0 0 1200 800" className="absolute inset-0 h-full w-full opacity-70">
        <g className="fund-bg-float-a">
          <path d="M180 160 C330 120 360 270 510 230" fill="none" stroke="rgba(52,211,153,0.14)" strokeWidth="2" />
          <circle cx="180" cy="160" r="8" fill="rgba(52,211,153,0.42)" />
          <circle cx="510" cy="230" r="8" fill="rgba(34,211,238,0.34)" />
          <text x="145" y="140" fill="rgba(167,243,208,0.24)" fontSize="32" fontFamily="monospace">3x²</text>
          <text x="480" y="215" fill="rgba(165,243,252,0.20)" fontSize="30" fontFamily="monospace">−2x</text>
        </g>
        <g className="fund-bg-float-b">
          <path d="M720 560 C820 440 920 610 1060 500" fill="none" stroke="rgba(96,165,250,0.10)" strokeWidth="2" />
          <text x="690" y="590" fill="rgba(147,197,253,0.18)" fontSize="34" fontFamily="monospace">+5</text>
          <text x="1010" y="480" fill="rgba(167,243,208,0.16)" fontSize="42" fontFamily="monospace">x</text>
        </g>
        <text x="40" y="620" fill="rgba(52,211,153,0.055)" fontSize="260" fontFamily="monospace">&#123;</text>
        <text x="1080" y="270" fill="rgba(52,211,153,0.055)" fontSize="260" fontFamily="monospace">&#125;</text>
      </svg>
      <BackgroundAnimationStyles />
    </div>
  );
}

function EqualityField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_18%_78%,rgba(244,114,182,0.08),transparent_30%),linear-gradient(to_bottom,rgba(3,21,27,0.16),rgba(1,9,14,0.84))]" />
      <svg viewBox="0 0 1200 800" className="absolute inset-0 h-full w-full opacity-70">
        <g className="fund-balance">
          <line x1="300" y1="370" x2="900" y2="370" stroke="rgba(103,232,249,0.16)" strokeWidth="4" strokeLinecap="round" />
          <line x1="600" y1="370" x2="600" y2="610" stroke="rgba(103,232,249,0.10)" strokeWidth="3" />
          <path d="M530 610 L670 610 L600 520 Z" fill="rgba(34,211,238,0.035)" stroke="rgba(103,232,249,0.10)" />
          <circle cx="350" cy="310" r="70" fill="rgba(34,211,238,0.025)" stroke="rgba(103,232,249,0.12)" />
          <circle cx="850" cy="310" r="70" fill="rgba(244,114,182,0.022)" stroke="rgba(244,114,182,0.10)" />
          <text x="285" y="322" fill="rgba(165,243,252,0.18)" fontSize="34" fontFamily="monospace">2x+6</text>
          <text x="822" y="322" fill="rgba(251,207,232,0.17)" fontSize="34" fontFamily="monospace">14</text>
        </g>
        <text className="fund-equals-pulse" x="548" y="260" fill="rgba(110,231,183,0.11)" fontSize="150" fontFamily="monospace">=</text>
        <line x1="0" y1="650" x2="1200" y2="650" stroke="rgba(34,211,238,0.045)" />
      </svg>
      <BackgroundAnimationStyles />
    </div>
  );
}

function PropertyField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(129,140,248,0.20),transparent_30%),radial-gradient(circle_at_15%_80%,rgba(192,132,252,0.10),transparent_30%),linear-gradient(to_bottom,rgba(9,9,29,0.20),rgba(3,3,13,0.86))]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(135deg,rgba(129,140,248,0.035)_1px,transparent_1px),linear-gradient(45deg,rgba(192,132,252,0.022)_1px,transparent_1px)] [background-size:76px_76px]" />
      <svg viewBox="0 0 1200 800" className="absolute inset-0 h-full w-full opacity-70">
        <g className="fund-rewrite-left">
          <rect x="170" y="220" width="250" height="100" rx="22" fill="rgba(129,140,248,0.025)" stroke="rgba(165,180,252,0.11)" />
          <text x="215" y="282" fill="rgba(199,210,254,0.18)" fontSize="34" fontFamily="monospace">a(b+c)</text>
        </g>
        <g className="fund-rewrite-right">
          <rect x="780" y="470" width="250" height="100" rx="22" fill="rgba(192,132,252,0.025)" stroke="rgba(216,180,254,0.10)" />
          <text x="822" y="532" fill="rgba(233,213,255,0.17)" fontSize="34" fontFamily="monospace">ab+ac</text>
        </g>
        <path d="M430 280 C590 150 700 490 770 520" fill="none" stroke="rgba(129,140,248,0.12)" strokeWidth="3" strokeDasharray="10 12" className="fund-dash" />
        <text x="545" y="395" fill="rgba(165,180,252,0.10)" fontSize="90" fontFamily="monospace">↔</text>
      </svg>
      <BackgroundAnimationStyles />
    </div>
  );
}

function NumberField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_40%,rgba(251,191,36,0.15),transparent_31%),radial-gradient(circle_at_16%_82%,rgba(163,230,53,0.07),transparent_28%),linear-gradient(to_bottom,rgba(23,18,5,0.16),rgba(9,7,2,0.86))]" />
      <svg viewBox="0 0 1200 800" className="absolute inset-0 h-full w-full opacity-70">
        <g className="fund-rings">
          <ellipse cx="600" cy="360" rx="450" ry="260" fill="none" stroke="rgba(52,211,153,0.11)" strokeWidth="2" />
          <ellipse cx="535" cy="370" rx="315" ry="190" fill="none" stroke="rgba(96,165,250,0.11)" strokeWidth="2" />
          <ellipse cx="465" cy="380" rx="210" ry="128" fill="none" stroke="rgba(34,211,238,0.11)" strokeWidth="2" />
          <ellipse cx="410" cy="386" rx="118" ry="70" fill="none" stroke="rgba(163,230,53,0.12)" strokeWidth="2" />
        </g>
        <line x1="120" y1="680" x2="1080" y2="680" stroke="rgba(251,191,36,0.13)" strokeWidth="2" />
        {Array.from({ length: 17 }, (_, index) => (
          <line key={index} x1={120 + index * 60} y1="670" x2={120 + index * 60} y2="690" stroke="rgba(251,191,36,0.10)" />
        ))}
        <g className="fund-number-drift">
          <circle cx="380" cy="680" r="7" fill="rgba(163,230,53,0.45)" />
          <circle cx="620" cy="680" r="7" fill="rgba(96,165,250,0.42)" />
          <circle cx="820" cy="680" r="7" fill="rgba(192,132,252,0.42)" />
        </g>
        <text x="900" y="270" fill="rgba(251,191,36,0.08)" fontSize="80" fontFamily="serif">π</text>
        <text x="180" y="510" fill="rgba(165,243,252,0.07)" fontSize="64" fontFamily="monospace">ℤ</text>
        <text x="710" y="190" fill="rgba(110,231,183,0.07)" fontSize="64" fontFamily="monospace">ℝ</text>
      </svg>
      <BackgroundAnimationStyles />
    </div>
  );
}

function BackgroundAnimationStyles() {
  return (
    <style>{`
      @keyframes fund-float-a { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(26px,-18px,0); } }
      @keyframes fund-float-b { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(-24px,20px,0); } }
      @keyframes fund-balance { 0%,100% { transform: rotate(-0.45deg); transform-origin: 600px 370px; } 50% { transform: rotate(0.45deg); transform-origin: 600px 370px; } }
      @keyframes fund-pulse { 0%,100% { opacity: .45; transform: scale(1); transform-origin: 600px 220px; } 50% { opacity: .8; transform: scale(1.05); transform-origin: 600px 220px; } }
      @keyframes fund-rewrite-left { 0%,100% { transform: translateX(0); } 50% { transform: translateX(28px); } }
      @keyframes fund-rewrite-right { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-28px); } }
      @keyframes fund-dash { to { stroke-dashoffset: -44; } }
      @keyframes fund-rings { 0%,100% { transform: scale(1); transform-origin: 600px 360px; } 50% { transform: scale(1.025); transform-origin: 600px 360px; } }
      @keyframes fund-number-drift { 0%,100% { transform: translateX(-18px); } 50% { transform: translateX(18px); } }
      .fund-bg-float-a { animation: fund-float-a 12s ease-in-out infinite; }
      .fund-bg-float-b { animation: fund-float-b 15s ease-in-out infinite; }
      .fund-balance { animation: fund-balance 7s ease-in-out infinite; }
      .fund-equals-pulse { animation: fund-pulse 5s ease-in-out infinite; }
      .fund-rewrite-left { animation: fund-rewrite-left 9s ease-in-out infinite; }
      .fund-rewrite-right { animation: fund-rewrite-right 9s ease-in-out infinite; }
      .fund-dash { animation: fund-dash 9s linear infinite; }
      .fund-rings { animation: fund-rings 10s ease-in-out infinite; }
      .fund-number-drift { animation: fund-number-drift 12s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .fund-bg-float-a,.fund-bg-float-b,.fund-balance,.fund-equals-pulse,.fund-rewrite-left,.fund-rewrite-right,.fund-dash,.fund-rings,.fund-number-drift { animation: none !important; }
      }
    `}</style>
  );
}
