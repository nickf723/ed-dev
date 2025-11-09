// components/Math.tsx
"use client";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

/**
 * Renders inline math notation.
 * Example: <M>a + b = c</M>
 */
export function M({ children }: { children: string }) {
  return <InlineMath math={children} />;
}

/**
 * Renders block-level math notation.
 * Example: <M block>a^2 + b^2 = c^2</M>
 */
export function MBlock({ children }: { children: string }) {
  return <BlockMath math={children} />;
}