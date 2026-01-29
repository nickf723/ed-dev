import React from "react";
import { cn } from "@/lib/utils";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  action?: React.ReactNode;
}

export function Panel({ children, className, title, action, ...props }: PanelProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/5 bg-neutral-900/50 backdrop-blur-md transition-all hover:border-white/10",
        className
      )} 
      {...props}
    >
      {/* Optional Header */}
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 bg-white/5">
          {title && (
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {title}
            </h3>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      
      {/* Content Area */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}