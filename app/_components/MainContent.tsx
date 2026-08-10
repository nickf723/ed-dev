"use client";

export default function MainContent({
  children,
  isCollapsed,
}: {
  children: React.ReactNode;
  isCollapsed: boolean;
}) {
  return (
    <main
      className={`
        relative min-h-screen w-full flex flex-col
        bg-neutral-950 text-slate-200 antialiased selection:bg-cyan-500/30 selection:text-cyan-100
        transition-[padding] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${isCollapsed ? "md:pl-20" : "md:pl-72"}
        pl-0
      `}
    >
      <div className="flex-1 relative z-0 w-full h-full">{children}</div>
    </main>
  );
}
