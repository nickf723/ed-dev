import type { CSSProperties, ReactNode } from "react";

export type SurfaceVariant = "solid" | "glass" | "ghost" | "open";

const VARIANT_CLASSES: Record<SurfaceVariant, string> = {
  solid:
    "border-white/[0.13] bg-[#050813]/[0.90] shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl",
  glass:
    "border-white/[0.11] bg-[#050813]/[0.54] shadow-[0_26px_90px_rgba(0,0,0,0.26)] backdrop-blur-xl",
  ghost:
    "border-white/[0.09] bg-black/[0.18] shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-md",
  open: "border-transparent bg-transparent shadow-none",
};

export default function Surface({
  children,
  variant = "glass",
  className = "",
  style,
}: {
  children: ReactNode;
  variant?: SurfaceVariant;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`border ${VARIANT_CLASSES[variant]} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
