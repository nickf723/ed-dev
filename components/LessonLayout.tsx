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
      {/* 👇 UPDATED: Uses CSS variables */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary-glow),_transparent_60%)]" />
      <div
        className="zen-blob absolute ... bg-[radial-gradient(ellipse_at_center,var(--color-secondary-glow),_transparent_70%)] ..."
        style={{ animationDuration: "25s" }}
      />
      
      {/* Header */}
      <header className="mb-12 text-center">
        {/* 👇 UPDATED: Uses CSS variables */}
        <h1 
          className="mb-4 text-5xl font-bold text-transparent md:text-6xl"
          style={{ 
            background: "linear-gradient(to right, var(--color-text-title), var(--color-text-header))",
            backgroundClip: "text",
          }}
        >
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