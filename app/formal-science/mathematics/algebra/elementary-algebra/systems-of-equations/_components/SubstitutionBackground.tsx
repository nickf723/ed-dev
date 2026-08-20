export default function SubstitutionBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#120804]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.10),transparent_28%),radial-gradient(circle_at_82%_32%,rgba(249,115,22,0.10),transparent_30%),radial-gradient(circle_at_52%_86%,rgba(52,211,153,0.045),transparent_30%)]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id="substitution-grid" width="54" height="54" patternUnits="userSpaceOnUse">
            <path d="M54 0H0V54" fill="none" stroke="rgba(255,255,255,0.028)" strokeWidth="1" />
          </pattern>
          <marker id="sub-arrow-cyan" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="rgba(34,211,238,0.22)" />
          </marker>
          <marker id="sub-arrow-orange" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="rgba(249,115,22,0.20)" />
          </marker>
        </defs>

        <rect width="1600" height="1000" fill="url(#substitution-grid)" />

        <g opacity="0.72">
          <path d="M120 220 C 260 145, 360 145, 500 220" fill="none" stroke="rgba(34,211,238,0.11)" strokeWidth="2" markerEnd="url(#sub-arrow-cyan)" />
          <rect x="92" y="196" width="76" height="48" rx="13" fill="rgba(34,211,238,0.018)" stroke="rgba(34,211,238,0.10)" />
          <text x="130" y="227" textAnchor="middle" fill="rgba(165,243,252,0.22)" fontFamily="monospace" fontSize="18">y</text>
          <rect x="506" y="190" width="142" height="60" rx="15" fill="rgba(34,211,238,0.018)" stroke="rgba(34,211,238,0.09)" />
          <text x="577" y="227" textAnchor="middle" fill="rgba(165,243,252,0.20)" fontFamily="monospace" fontSize="17">x + 1</text>
          <text x="312" y="155" textAnchor="middle" fill="rgba(148,163,184,0.10)" fontFamily="monospace" fontSize="12">equal value · alternate form</text>
        </g>

        <g opacity="0.68">
          <rect x="965" y="240" width="430" height="84" rx="20" fill="rgba(0,0,0,0.05)" stroke="rgba(249,115,22,0.075)" />
          <text x="1006" y="291" fill="rgba(226,232,240,0.12)" fontFamily="monospace" fontSize="19">2x +</text>
          <rect x="1085" y="257" width="64" height="48" rx="12" fill="rgba(249,115,22,0.025)" stroke="rgba(249,115,22,0.12)" />
          <text x="1117" y="288" textAnchor="middle" fill="rgba(254,215,170,0.23)" fontFamily="monospace" fontSize="18">y</text>
          <text x="1166" y="291" fill="rgba(226,232,240,0.12)" fontFamily="monospace" fontSize="19">= 7</text>
          <path d="M1117 344 C 1117 400, 1045 418, 1018 470" fill="none" stroke="rgba(249,115,22,0.10)" strokeWidth="2" markerEnd="url(#sub-arrow-orange)" />
          <rect x="915" y="486" width="498" height="88" rx="22" fill="rgba(0,0,0,0.05)" stroke="rgba(52,211,153,0.065)" />
          <text x="958" y="540" fill="rgba(226,232,240,0.105)" fontFamily="monospace" fontSize="19">2x +</text>
          <rect x="1037" y="506" width="126" height="50" rx="13" fill="rgba(52,211,153,0.020)" stroke="rgba(52,211,153,0.095)" />
          <text x="1100" y="538" textAnchor="middle" fill="rgba(167,243,208,0.19)" fontFamily="monospace" fontSize="17">(x + 1)</text>
          <text x="1180" y="540" fill="rgba(226,232,240,0.105)" fontFamily="monospace" fontSize="19">= 7</text>
        </g>

        <g opacity="0.48">
          <path d="M180 720 H 520" stroke="rgba(255,255,255,0.055)" strokeWidth="1" strokeDasharray="7 11" />
          <path d="M1080 760 H 1430" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="7 11" />
          <circle cx="342" cy="720" r="58" fill="none" stroke="rgba(34,211,238,0.055)" />
          <circle cx="1260" cy="760" r="72" fill="none" stroke="rgba(249,115,22,0.05)" />
          <text x="342" y="726" textAnchor="middle" fill="rgba(148,163,184,0.11)" fontFamily="monospace" fontSize="13">same value</text>
          <text x="1260" y="766" textAnchor="middle" fill="rgba(148,163,184,0.10)" fontFamily="monospace" fontSize="13">new form</text>
        </g>
      </svg>

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(12,6,4,0.04),rgba(5,4,8,0.30)_46%,rgba(3,4,9,0.72))]" />
    </div>
  );
}
