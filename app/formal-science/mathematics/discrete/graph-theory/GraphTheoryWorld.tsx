import {
  CAMPUS_EDGES,
  CAMPUS_VERTEX_BY_ID,
  CAMPUS_VERTICES,
} from "./graphTheoryNetwork";

export default function GraphTheoryWorld() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#02080a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_73%_27%,rgba(16,185,129,0.13),transparent_34%),radial-gradient(circle_at_22%_76%,rgba(34,211,238,0.08),transparent_31%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:52px_52px]" />

      <svg
        viewBox="0 0 1000 560"
        className="absolute -right-[15vw] top-[8vh] h-[78vh] w-[92vw] min-w-[980px] opacity-40"
      >
        {CAMPUS_EDGES.map((edge) => {
          const source = CAMPUS_VERTEX_BY_ID.get(edge.source);
          const target = CAMPUS_VERTEX_BY_ID.get(edge.target);
          if (!source || !target) return null;
          return (
            <line
              key={edge.id}
              x1={source.x * 10}
              y1={source.y * 5.6}
              x2={target.x * 10}
              y2={target.y * 5.6}
              stroke="rgba(94,234,212,0.28)"
              strokeWidth="3"
            />
          );
        })}
        {CAMPUS_VERTICES.map((vertex) => (
          <g
            key={vertex.id}
            transform={`translate(${vertex.x * 10} ${vertex.y * 5.6})`}
          >
            <circle
              r="19"
              fill="#031014"
              stroke="rgba(103,232,249,0.52)"
              strokeWidth="3"
            />
            <text
              textAnchor="middle"
              dominantBaseline="central"
              fill="rgba(207,250,254,0.82)"
              fontSize="14"
              fontWeight="700"
            >
              {vertex.symbol}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute -left-[18vw] bottom-[9vh] h-[42vw] min-h-[520px] w-[42vw] min-w-[520px] rounded-full border border-cyan-200/[0.07]" />
      <div className="absolute -left-[11vw] bottom-[16vh] h-[28vw] min-h-[360px] w-[28vw] min-w-[360px] rounded-full border border-emerald-200/[0.06]" />
      <div className="absolute inset-y-0 left-[12%] w-px bg-gradient-to-b from-transparent via-cyan-200/20 to-transparent shadow-[0_0_55px_rgba(103,232,249,0.2)] motion-safe:animate-pulse motion-reduce:hidden" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,10,0.7)_0%,transparent_30%,transparent_76%,rgba(2,8,10,0.35)_100%)]" />
    </div>
  );
}
