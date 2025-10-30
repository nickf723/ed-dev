"use client";
import React from "react";

/* ------------------------- IMAGES / DIAGRAMS ------------------------- */
export function LessonImage({ src, caption }: { src: string; caption?: string }) {
  return (
    <figure className="my-6">
      <img
        src={src}
        alt={caption || "Diagram"}
        className="rounded-lg mx-auto shadow-lg border border-neutral-800"
      />
      {caption && (
        <figcaption className="text-sm text-neutral-400 mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* --------------------------- VIDEO EMBED ----------------------------- */
export function LessonVideo({ url }: { url: string }) {
  return (
    <div className="aspect-video w-full my-6 overflow-hidden rounded-xl border border-neutral-800 shadow-md">
      <iframe
        src={url}
        title="Embedded video"
        className="w-full h-full"
        allowFullScreen
      />
    </div>
  );
}

/* --------------------------- APPLET EMBED ---------------------------- */
export function LessonApplet({ src }: { src: string }) {
  return (
    <div className="aspect-[4/3] w-full my-6 overflow-hidden rounded-xl border border-neutral-800 shadow-md">
      <iframe src={src} className="w-full h-full" allowFullScreen />
    </div>
  );
}

/* ------------------------ PRACTICE PROBLEMS -------------------------- */
export function PracticeProblem({ question, solution }: { question: string; solution?: string }) {
  return (
    <div className="bg-neutral-900/40 border border-neutral-800 rounded-lg p-4 mb-4">
      <p className="font-medium text-cyan-300 mb-2">{question}</p>
      {solution && (
        <p className="text-neutral-400">
          <span className="text-cyan-400 font-semibold">Solution:</span> {solution}
        </p>
      )}
    </div>
  );
}

/* --------------------------- RESOURCE LINKS -------------------------- */
export function ResourceLink({ title, url }: { title: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-neutral-900/50 hover:bg-neutral-800 transition border border-neutral-800 rounded-lg px-4 py-3 mt-2 text-cyan-300"
    >
      🔗 {title}
    </a>
  );
}
