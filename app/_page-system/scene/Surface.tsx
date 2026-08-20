import type { CSSProperties, ReactNode } from "react";

export type SurfaceVariant = "solid" | "glass" | "ghost" | "open";

const VARIANT_CLASSES: Record<SurfaceVariant, string> = {
  solid:
    "border-white/[0.13] bg-[#050813]/[0.84] shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-[30px] backdrop-saturate-[1.10] backdrop-contrast-[1.04]",
  glass:
    "border-white/[0.11] bg-[#050813]/[0.42] shadow-[0_26px_90px_rgba(0,0,0,0.24)] backdrop-blur-[24px] backdrop-saturate-[1.12] backdrop-contrast-[1.04]",
  ghost:
    "border-white/[0.09] bg-black/[0.16] shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur-[14px] backdrop-saturate-[1.06] backdrop-contrast-[1.03]",
  open: "border-transparent bg-transparent shadow-none backdrop-blur-0",
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
