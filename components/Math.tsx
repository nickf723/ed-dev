import React from "react";
import katex from "katex";

export function M({ children }: { children: string }) {
  // Render LaTeX to an HTML string
  const html = katex.renderToString(children, {
    throwOnError: false, // Prevents crashing on invalid LaTeX
    displayMode: false,  // Renders inline (use 'true' for block/centered math)
    globalGroup: true,   // Allows defining macros globally if needed
  });

  return (
    <span
      className="katex-renderer"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}