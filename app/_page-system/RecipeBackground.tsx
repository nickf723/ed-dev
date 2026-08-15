import type { PageRecipe } from "@/lib/page-system/schema";

export default function RecipeBackground({
  recipe,
  preview,
  motion,
}: {
  recipe: PageRecipe;
  preview: boolean;
  motion: boolean;
}) {
  const position = preview ? "absolute" : "fixed";
  const alpha = recipe.theme.backgroundStrength;

  if (recipe.theme.family === "history") {
    return (
      <div className={`pointer-events-none ${position} inset-0 z-0 overflow-hidden`} aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 16% 20%, rgba(217,119,6,${0.20 * alpha}), transparent 32%), radial-gradient(circle at 84% 76%, rgba(129,140,248,${0.12 * alpha}), transparent 34%), linear-gradient(180deg,#0b0805 0%,#070503 48%,#030303 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-55"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,158,11,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.028) 1px, transparent 1px)",
            backgroundSize: "68px 68px",
            maskImage: "radial-gradient(circle at center, black, transparent 82%)",
          }}
        />
        <div
          className={`absolute -left-[18%] top-[12%] h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] rounded-[45%] blur-[95px] ${motion ? "animate-[spin_48s_linear_infinite]" : ""}`}
          style={{
            background: `conic-gradient(from 20deg, transparent, rgba(217,119,6,${0.12 * alpha}), transparent 42%, rgba(16,185,129,${0.055 * alpha}), transparent 78%)`,
          }}
        />
        <svg viewBox="0 0 1200 760" className="absolute inset-0 h-full w-full opacity-60" preserveAspectRatio="none">
          <path d="M-80 170 C180 65 320 270 560 150 S930 40 1290 200" fill="none" stroke={`rgba(245,158,11,${0.11 * alpha})`} strokeWidth="2" />
          <path d="M-60 500 C210 390 360 650 620 500 S980 390 1280 550" fill="none" stroke={`rgba(16,185,129,${0.07 * alpha})`} strokeWidth="1.6" strokeDasharray="5 10" />
          <path d="M120 650 L340 410 L570 590 L820 330 L1080 530" fill="none" stroke={`rgba(129,140,248,${0.07 * alpha})`} strokeWidth="1.3" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_52%,rgba(0,0,0,0.34)_100%)]" />
      </div>
    );
  }

  return (
    <div className={`pointer-events-none ${position} inset-0 z-0 overflow-hidden`} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 18% 22%, rgba(56,189,248,${0.22 * alpha}), transparent 34%), radial-gradient(circle at 80% 24%, rgba(167,139,250,${0.18 * alpha}), transparent 36%), linear-gradient(180deg,#050b13 0%,#03070d 52%,#020305 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.045) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
          maskImage: "radial-gradient(circle at center, black, transparent 84%)",
        }}
      />
      <div
        className={`absolute -right-[16%] top-[3%] h-[70vw] w-[70vw] max-h-[940px] max-w-[940px] rounded-[43%] blur-[105px] ${motion ? "animate-[spin_42s_linear_infinite_reverse]" : ""}`}
        style={{
          background: `conic-gradient(from 210deg, transparent, rgba(167,139,250,${0.13 * alpha}), transparent 42%, rgba(56,189,248,${0.08 * alpha}), transparent 78%)`,
        }}
      />
      <svg viewBox="0 0 1200 760" className="absolute inset-0 h-full w-full opacity-60" preserveAspectRatio="none">
        <circle cx="600" cy="340" r="170" fill="none" stroke={`rgba(56,189,248,${0.09 * alpha})`} />
        <circle cx="600" cy="340" r="260" fill="none" stroke={`rgba(167,139,250,${0.055 * alpha})`} strokeDasharray="4 12" />
        <path d="M-20 510 C180 390 360 640 570 500 S940 380 1220 540" fill="none" stroke={`rgba(96,165,250,${0.10 * alpha})`} strokeWidth="2" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.30)_100%)]" />
    </div>
  );
}
