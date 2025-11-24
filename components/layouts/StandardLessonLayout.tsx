import React, { ReactNode } from "react";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";

type StandardLessonLayoutProps = {
  // Metadata
  eyebrow: string;
  title: string;
  subtitle: string;
  symbols: string[];
  theme?: string;
  
  // Content Slots
  children: ReactNode;      // The main lesson content
  aside?: ReactNode;        // The sidebar content (optional)
};

export default function StandardLessonLayout({
  eyebrow,
  title,
  subtitle,
  symbols,
  theme = "theme-formal", // Default theme class
  children,
  aside,
}: StandardLessonLayoutProps) {
  return (
    <main className={`topic-page ${theme} lg:px-16 min-h-screen`}>
      
      {/* 1. Consistent Background Layer */}
      <FloatingSymbols symbols={symbols} />
      
      {/* 2. Consistent Header Area */}
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
      />

      {/* 3. Standardized Grid Architecture */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 pb-24">
        
        {/* Main Content Column (Span 2) */}
        <article className="lg:col-span-2 text-left space-y-8">
          {children}
        </article>

        {/* Sidebar Column (Span 1) - Sticky by default for better UX */}
        {aside && (
          <aside className="lg:col-span-1 text-left lg:sticky lg:top-24 h-min space-y-8">
            {aside}
          </aside>
        )}
      </div>
    </main>
  );
}