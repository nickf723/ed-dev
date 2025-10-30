// components/LessonLayout.tsx
"use client";
import React from "react";

export default function LessonLayout({
  title,
  subtitle,
  children,
  aside, // 👈 ADDED: Optional prop for sidebar content
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  aside?: React.ReactNode; // 👈 ADDED: Type for the prop
}) {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden px-6 py-20 text-neutral-200 md:px-16 lg:py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-slate-950 to-black" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.12),_transparent_60%)]" />
      <div
        className="zen-blob absolute left-1/4 top-0 -z-10 h-3/5 w-1/3 animate-zen-float rounded-full 
                   bg-[radial-gradient(ellipse_at_center,_rgba(0,255,255,0.5),_transparent_70%)] 
                   blur-3xl"
        style={{ animationDuration: "25s" }}
      />
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-neutral-400">
            {subtitle}
          </p>
        )}
      </header>

      {/* NEW Content Grid: 
        It's now a single column by default, or two columns if an `aside` is provided.
      */}
      <div
        className={`mx-auto max-w-7xl ${
          aside ? "grid gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]" : ""
        }`}
      >
        {/* Main content area */}
        <article
          className={`prose prose-invert max-w-none space-y-8 ${
            !aside ? "mx-auto max-w-4xl" : "" // Center and constrain width if no aside
          }`}
        >
          {children}
        </article>

        {/* NEW Aside: 
          This block only renders if you pass an `aside` prop to the layout.
        */}
        {aside && (
          <aside className="hidden md:block">
            <div className="sticky top-24 space-y-6">{aside}</div>
          </aside>
        )}
      </div>
    </main>
  );
}