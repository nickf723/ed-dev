import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css"; // Ensure CSS is imported!

export function M({ children, display = false }: { children: string, display?: boolean }) {
  const html = katex.renderToString(children, {
    throwOnError: false,
    displayMode: display, 
    globalGroup: true,
  });

  return (
    <span
      className={display ? "katex-block my-4 block text-center" : "katex-inline"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}