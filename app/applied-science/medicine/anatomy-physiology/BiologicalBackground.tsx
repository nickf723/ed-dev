import { ORGANIZATION_LEVELS } from "./anatomyModel";

const RINGS = ORGANIZATION_LEVELS.map((level, index) => ({
  id: level.id,
  radius: 34 + index * 34,
  opacity: 0.22 - index * 0.022,
}));

export default function BiologicalBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_26%,rgba(244,114,182,0.15),transparent_29%),radial-gradient(circle_at_78%_32%,rgba(34,211,238,0.11),transparent_32%),radial-gradient(circle_at_62%_82%,rgba(167,139,250,0.09),transparent_33%),linear-gradient(180deg,#10070c_0%,#080b12_48%,#04050a_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,207,232,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(251,207,232,0.026)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_88%)]" />

      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <filter
            id="anatomy-soft-glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <linearGradient id="anatomy-scan-band" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(244,114,182,0)" />
            <stop offset="0.5" stopColor="rgba(244,114,182,0.24)" />
            <stop offset="1" stopColor="rgba(244,114,182,0)" />
          </linearGradient>
          <radialGradient id="anatomy-tissue-fill">
            <stop offset="0" stopColor="rgba(244,114,182,0.11)" />
            <stop offset="0.72" stopColor="rgba(244,114,182,0.035)" />
            <stop offset="1" stopColor="rgba(244,114,182,0)" />
          </radialGradient>
        </defs>

        <g
          className="anatomy-level-rings"
          transform="translate(225 370)"
          fill="none"
        >
          {RINGS.map((ring, index) => (
            <circle
              key={ring.id}
              r={ring.radius}
              stroke={
                index % 2 === 0
                  ? "rgba(244,114,182,0.22)"
                  : "rgba(34,211,238,0.18)"
              }
              strokeWidth={index === RINGS.length - 1 ? 2 : 1.4}
              opacity={ring.opacity}
            />
          ))}
          <circle r="22" fill="rgba(244,114,182,0.12)" />
          <circle r="7" fill="rgba(251,207,232,0.26)" />
          <path d="M-210 0H210M0-210V210" stroke="rgba(251,207,232,0.06)" />
        </g>

        <g className="anatomy-figure" transform="translate(1180 84)">
          <ellipse
            cx="0"
            cy="78"
            rx="54"
            ry="64"
            fill="url(#anatomy-tissue-fill)"
            stroke="rgba(251,207,232,0.22)"
            strokeWidth="2"
          />
          <path
            d="M-28 138C-84 176-104 262-91 362L-73 526C-62 607-48 688-38 836H38C48 688 62 607 73 526L91 362C104 262 84 176 28 138Z"
            fill="url(#anatomy-tissue-fill)"
            stroke="rgba(251,207,232,0.18)"
            strokeWidth="2"
          />
          <path
            d="M-70 192L-204 330L-178 350L-59 261M70 192L204 330L178 350L59 261"
            fill="none"
            stroke="rgba(34,211,238,0.16)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M-45 520L-104 840M45 520L104 840"
            fill="none"
            stroke="rgba(34,211,238,0.16)"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            d="M0 144V520"
            stroke="rgba(251,191,36,0.23)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M-52 224C-87 240-80 330-26 352C-6 310-4 260-19 219C-30 216-41 218-52 224Z"
            fill="rgba(34,211,238,0.08)"
            stroke="rgba(34,211,238,0.22)"
          />
          <path
            d="M52 224C87 240 80 330 26 352C6 310 4 260 19 219C30 216 41 218 52 224Z"
            fill="rgba(34,211,238,0.08)"
            stroke="rgba(34,211,238,0.22)"
          />
          <path
            d="M0 278C-25 254-46 280-37 304C-27 330 0 345 0 345C0 345 27 330 37 304C46 280 25 254 0 278Z"
            fill="rgba(248,113,113,0.16)"
            stroke="rgba(248,113,113,0.34)"
          />
          <path
            d="M-34 378C2 351 57 365 66 404C43 439 9 452-39 438C-58 417-55 394-34 378Z"
            fill="rgba(251,191,36,0.07)"
            stroke="rgba(251,191,36,0.18)"
          />
          <path
            d="M-31 456C-50 499-37 541-12 563M31 456C50 499 37 541 12 563"
            fill="none"
            stroke="rgba(167,139,250,0.20)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <g fill="none" stroke="rgba(167,139,250,0.16)" strokeWidth="2">
            <path d="M0 154C-48 185-72 247-60 314C-48 375-25 433 0 493" />
            <path d="M0 154C48 185 72 247 60 314C48 375 25 433 0 493" />
            <path d="M0 164L-176 342M0 164L176 342M0 476L-94 824M0 476L94 824" />
          </g>
        </g>

        <g fill="none" strokeLinecap="round">
          <path
            d="M382 370C620 318 854 288 1118 302"
            stroke="rgba(244,114,182,0.11)"
            strokeWidth="3"
          />
          <path
            d="M375 432C654 474 872 480 1110 458"
            stroke="rgba(251,191,36,0.09)"
            strokeWidth="2"
          />
          <path
            d="M352 304C618 224 894 210 1132 242"
            stroke="rgba(34,211,238,0.09)"
            strokeWidth="2"
          />
          <path
            d="M350 500C640 598 876 620 1132 582"
            stroke="rgba(167,139,250,0.085)"
            strokeWidth="2"
          />
        </g>

        <rect
          x="-340"
          y="0"
          width="340"
          height="1000"
          fill="url(#anatomy-scan-band)"
          className="anatomy-scan-band"
        />
        <g filter="url(#anatomy-soft-glow)" opacity="0.28">
          <ellipse
            cx="1180"
            cy="362"
            rx="126"
            ry="96"
            fill="rgba(248,113,113,0.09)"
          />
          <circle cx="225" cy="370" r="84" fill="rgba(244,114,182,0.08)" />
        </g>
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,transparent_30%,rgba(2,3,8,0.30)_72%,rgba(2,3,8,0.68)_100%)]" />
      <style>{`
        @keyframes anatomyScanAcross {
          0% { transform: translateX(-80px); opacity: 0; }
          14% { opacity: .55; }
          86% { opacity: .55; }
          100% { transform: translateX(1900px); opacity: 0; }
        }
        @keyframes anatomyBreathe {
          0%, 100% { transform: translate(1180px, 84px) scale(1); opacity: .78; }
          50% { transform: translate(1180px, 84px) scale(1.008); opacity: .94; }
        }
        @keyframes anatomyScalePulse {
          0%, 100% { opacity: .58; }
          50% { opacity: .92; }
        }
        .anatomy-scan-band { animation: anatomyScanAcross 18s linear infinite; }
        .anatomy-figure { animation: anatomyBreathe 8s ease-in-out infinite; transform-origin: center; }
        .anatomy-level-rings { animation: anatomyScalePulse 9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .anatomy-scan-band, .anatomy-figure, .anatomy-level-rings { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
