"use client";
import React from "react";

export default function LessonLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen w-full text-neutral-200 px-6 md:px-16 py-20 lg:py-28 overflow-x-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-slate-950 to-black" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.12),_transparent_60%)]" />

      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-neutral-400 text-lg max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </header>

      {/* Content Area — multi-column responsive */}
      <article className="max-w-6xl mx-auto grid md:grid-cols-[2fr_1fr] gap-12">
        <div className="prose prose-invert prose-lg max-w-none space-y-12 leading-relaxed">
          {children}
        </div>

        {/* Optional right column for diagrams, summary, tips */}
        <aside className="hidden md:block text-sm text-neutral-400 space-y-4">
          <div className="sticky top-24">
            <p className="text-cyan-300 font-semibold mb-2">Quick Facts 💡</p>
            <ul className="space-y-2">
              <li>Variables can change value.</li>
              <li>They make equations flexible.</li>
              <li>Usually represented by letters.</li>
              <li>Examples: x, y, r, n, t</li>
            </ul>
          </div>
        </aside>
      </article>
    </main>
  );
}
