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
import { Skull } from "lucide-react";

export default function Home() {


  return (
    <main className="topic-page theme-variables-expressions flex min-h-screen items-center justify-center px-6 py-12">
      <div className="glass w-full max-w-5xl border border-neutral-800/60 p-10 text-center shadow-2xl">
        <div className="flex justify-center mb-4">
        </div>
        <h1 className="text-4xl font-bold text-cyan-400">Stage</h1>
        <p className="mt-2 text-neutral-300 italic">Recording Studio</p>
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        </div>
      </div>
    </main>
  );
}