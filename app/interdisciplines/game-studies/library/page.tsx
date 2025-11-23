"use client";
import PageHeader from "@/components/PageHeader";
import GameBrowser from "@/components/GameBrowser";
import LudologyBackground from "@/components/LudologyBackground";

export default function GameLibraryPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      <LudologyBackground />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        <PageHeader
          eyebrow="Game Studies"
          title="The Ludarium"
          subtitle="An archive of interactive systems. Select a game to learn its rules, analyze its mechanics, and understand why it's fun."
        />
        <div className="mt-8">
            <GameBrowser />
        </div>
      </div>
    </main>
  );
}