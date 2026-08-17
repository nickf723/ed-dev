import type { CSSProperties, ReactNode } from "react";
import WorldDirector from "./WorldDirector";

export default function SceneFrame({
  background,
  header,
  children,
  initialScene = null,
  className = "",
  maxWidthClassName = "max-w-[1600px]",
  headerBackground = "rgba(2,4,14,0.62)",
  style,
}: {
  background: ReactNode;
  header: ReactNode;
  children: ReactNode;
  initialScene?: string | null;
  className?: string;
  maxWidthClassName?: string;
  headerBackground?: string;
  style?: CSSProperties;
}) {
  return (
    <WorldDirector initialScene={initialScene}>
      <main className={`relative min-h-screen overflow-x-hidden ${className}`} style={style}>
        {background}
        <div
          className={`relative z-10 mx-auto w-full ${maxWidthClassName} px-4 pb-16 sm:px-6 xl:px-8`}
        >
          <div
            className="sticky top-0 z-40 -mx-4 border-b border-white/[0.08] px-4 pb-3 pt-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:-mx-6 sm:px-6 xl:-mx-8 xl:px-8"
            style={{ background: headerBackground }}
          >
            {header}
          </div>
          {children}
        </div>
      </main>
    </WorldDirector>
  );
}
