"use client";
import { useSidebar } from "./SidebarContext";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

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
      {/* The "Canvas" Layer
        - Ensures children fill vertical space (flex-1)
        - Isolates stacking contexts (relative z-0) so fixed backgrounds inside pages 
          don't accidentally cover the sidebar.
      */}
      <div className="flex-1 relative z-0 w-full h-full">
        {children}
      </div>

      {/* Optional: Global Footer or watermark could go here */}
    </main>
  );
}