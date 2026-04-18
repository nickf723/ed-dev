"use client";
import GameBrowser from "@/app/interdisciplines/game-studies/library/GameBrowser";
import LudologyBackground from "@/app/interdisciplines/game-studies/LudologyBackground";

export default function GameLibraryPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      <LudologyBackground />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">

        <div className="mt-8">
            <GameBrowser />
        </div>
      </div>
    </main>
  );
}