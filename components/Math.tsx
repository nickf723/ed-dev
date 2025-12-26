import React from "react";

export function M({ children }: { children: string }) {
    function renderMath(children: string): string | TrustedHTML {
        try {
            if (typeof window !== "undefined" && (window as any).MathJax) {
                const output = (window as any).MathJax.tex2svg(children);
                return output.innerHTML;
            }
            return children;
        } catch {
            return children;
        }
    }

  return (
    <span
      className="math-renderer"
      dangerouslySetInnerHTML={{ __html: renderMath(children) }}
    />
  );
}