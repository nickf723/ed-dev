// app/stage/page.tsx
"use client";

import {
  Pi,
  BookText,
  Atom,
  Handshake,
  Hammer,
  Palette,
  Link,
  Wrench,
  BookOpen,
  Binary,
} from "@/components/icons";
import TopicCard from "@/components/TopicCard";
import { Skull, Theater } from "lucide-react";
import { VariableShortAnimation2 } from "@/components/VariableComponents"; // <--- NEW IMPORT

export default function Home() {

  return (
    <main className="topic-page theme-variables-expressions flex min-h-screen items-center justify-center px-6 py-12">
      <div className="video-short-container border-4 border-whiter/20 bg-neutral-950/90 shadow-2xl">
        <VariableShortAnimation2 /> 
      </div>
    </main>
  );
}