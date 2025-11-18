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
import { VariableShortAnimation } from "@/components/VariableComponents"; // <--- NEW IMPORT

export default function Home() {

  return (
    <main className="topic-page theme-variables-expressions flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl text-center">
         {/* The VariableShortAnimation contains its own PageHeader now */}
        <VariableShortAnimation /> 
      </div>
    </main>
  );
}