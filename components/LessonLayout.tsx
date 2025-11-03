// components/LessonLayout.tsx
"use client";
import React from "react";

export default function LessonLayout({
  title,
  subtitle,
  children,
  aside,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`relative min-h-screen w-full overflow-x-hidden px-6 py-20 
                  text-neutral-200 md:px-16 lg:py-28 ${className || ""}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-slate-950 to-black" />

      {/* 🔥 NEW FLUID ANIMATIONS 🔥
        These two blobs replace the old static/zen-blob glows.
        They automatically use the CSS variables from the active theme.
      */}
      <div
        className="animated-blob animate-blob-1 -top-1/4 -left-1/4 h-3/5 w-3/5"
        style={{
          background: "var(--color-primary-glow)",
        }}
      />
      <div
        className="animated-blob animate-blob-2 -bottom-1/4 -right-1/4 h-3/5 w-3/5"
        style={{
          background: "var(--color-secondary-glow)",
        }}
      />

      {/* Header */}
      <header className="mb-12 text-center">
        <h1
          className="mb-4 text-5xl font-bold text-transparent md:text-6xl"
          style={{
            background:
              "linear-gradient(to right, var(--color-text-title), var(--color-text-header))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text", // For Safari
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

      {/* Content Grid */}
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

        {/* Aside */}
        {aside && (
          <aside className="hidden md:block">
            <div className="sticky top-24 space-y-6">{aside}</div>
          </aside>
        )}
      </div>
    </main>
  );
}