import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ElementType;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, ...props }, ref) => {
    return (
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
            <Icon size={16} />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:cursor-not-allowed disabled:opacity-50",
            Icon && "pl-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {/* Decorative corner glow */}
        <div className="absolute bottom-0 right-0 h-2 w-2 border-r border-b border-white/10 group-focus-within:border-cyan-500/50 transition-colors" />
      </div>
    );
  }
);
Input.displayName = "Input";