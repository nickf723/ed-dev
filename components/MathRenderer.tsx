"use client";
import React from 'react';
import 'katex/dist/katex.min.css'; // Import standard CSS
import { InlineMath, BlockMath } from 'react-katex';

export default function MathRenderer({ expression, block = false }: { expression: string, block?: boolean }) {
  // Strip the $$ delimiters if they exist in your data
  const cleanExp = expression.replace(/\$\$/g, '');

  if (block) {
    return <BlockMath math={cleanExp} />;
  }
  return <InlineMath math={cleanExp} />;
}