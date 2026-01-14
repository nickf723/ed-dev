"use client";
import React from "react";
import Link from "next/link";
import { ATLA_WIKI, getElementIcon } from "../avatar-wiki-data";
import { Users } from "lucide-react";

export default function AvatarCharactersPage() {
  const data = ATLA_WIKI;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <header className="mb-8">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-4">
              <Users size={12} /> Database Section
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Character Roster</h1>
          <p className="text-stone-400">Key figures documented in the archive.</p>
      </header>

      {/* Character Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.characters.map(char => {
              const theme = data.elementColors[char.element as keyof typeof data.elementColors];
              return (
                  // In the future, this Link will go to `/avatar/characters/${char.id}`
                  <Link 
                      key={char.id}
                      href={`/humanities/performing-arts/tv-film/repository/avatar/characters/${char.id}`}
                      className={`
                          group p-5 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer
                          ${theme}
                      `}
                  >
                      <div className="flex justify-between items-start mb-3">
                          <div>
                              <h2 className="text-xl font-bold text-white group-hover:underline decoration-2 underline-offset-4">
                                  {char.name}
                              </h2>
                              <div className="text-xs font-mono opacity-80 uppercase tracking-wide mt-1">
                                  {char.role}
                              </div>
                          </div>
                          <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm">
                              {getElementIcon(char.element)}
                          </div>
                      </div>
                      <p className="text-sm opacity-90 leading-relaxed">
                          {char.desc}
                      </p>
                  </Link>
              )
          })}
      </div>
    </div>
  );
}