"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import {
  ContentP,
  ContentSubhead,
  LessonImage,
  LessonVideo,
  InternalLink,
  ExternalLink
} from "@/components/LessonBlocks";
import {
  Play,
  Link as LinkIcon
} from "@/components/icons";
import { ImageIcon } from "lucide-react";

export default function MultimediaGalleryPage() {
  return (
    <main className="topic-page theme-skeleton lg:px-16">
      <FloatingSymbols symbols={["JPG", "MP4", "SVG"]} />
      <PageHeader
        eyebrow="Skeleton"
        title="Multimedia Gallery"
        subtitle="Components for visual storytelling and navigation."
      />

      <div className="w-full max-w-4xl mx-auto text-left space-y-12 pb-24">
        
        {/* Images Section */}
        <section>
          <h2 className="text-xl font-bold text-pink-400 border-b border-pink-500/30 pb-2 mb-6 flex items-center gap-2">
            <ImageIcon size={20} /> 1. Images & Diagrams
          </h2>
          <ContentP>
            The <strong>LessonImage</strong> component handles captioning, borders, and optional background colors for transparent SVGs.
          </ContentP>
          
          <LessonImage 
            src="/public/file.svg" // Placeholder path
            caption="Figure 1: A standard diagram with a transparent background."
            bgColor="#1a1a1a"
          />
        </section>

        {/* Video Section */}
        <section>
          <h2 className="text-xl font-bold text-pink-400 border-b border-pink-500/30 pb-2 mb-6 flex items-center gap-2">
            <Play size={20} /> 2. Video Embeds
          </h2>
          <ContentP>
            The <strong>LessonVideo</strong> component creates a responsive 16:9 wrapper for iframes.
          </ContentP>
          
          {/* Using a placeholder color block to represent video since we don't have a real URL */}
          <div className="my-6 aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 shadow-md bg-black flex items-center justify-center group cursor-pointer">
             <Play size={48} className="text-neutral-700 group-hover:text-pink-500 transition-colors" />
             <span className="sr-only">Video Placeholder</span>
          </div>
          <p className="text-xs text-center text-neutral-500">(Use the LessonVideo component with a valid src URL)</p>
        </section>

        {/* Navigation Section */}
        <section>
          <h2 className="text-xl font-bold text-pink-400 border-b border-pink-500/30 pb-2 mb-6 flex items-center gap-2">
            <LinkIcon size={20} /> 3. Navigation Links
          </h2>
          <ContentSubhead title="Internal vs External" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <InternalLink title="Go to Component Gallery" href="/skeleton/component-gallery" />
            <ExternalLink title="Read Documentation (External)" url="https://nextjs.org" />
          </div>
        </section>

      </div>
    </main>
  );
}