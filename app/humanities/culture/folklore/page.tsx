"use client";
import Link from "next/link";
import ConstellationBackground from "./ConstellationBackground";
import ArchetypeCompass from "./ArchetypeCompass";
import { 
  Feather, Scroll, Map, ArrowRight, 
  Ghost, Skull, Sparkles 
} from "lucide-react";

export default function FolklorePage() {
  const modules = [
    { 
      title: "Cryptids & Beasts", 
      href: "/humanities/culture/folklore/cryptids", 
      icon: Ghost, 
      color: "text-emerald-400", 
      border: "hover:border-emerald-500/50",
      bg: "hover:bg-emerald-500/10",
      desc: "Creatures on the fringe of science. Bigfoot, Mothman, and the Loch Ness Monster." 
    },
    { 
      title: "Urban Legends", 
      href: "/humanities/culture/folklore/urban-legends", 
      icon: Skull, 
      color: "text-rose-400", 
      border: "hover:border-rose-500/50",
      bg: "hover:bg-rose-500/10",
      desc: "Modern folklore. Razor blades in candy, the hook-handed man, and Slender Man." 
    },
    { 
      title: "Fairy Tales", 
      href: "/humanities/culture/folklore/fairy-tales", 
      icon: Sparkles, 
      color: "text-amber-400", 
      border: "hover:border-amber-500/50",
      bg: "hover:bg-amber-500/10",
      desc: "Moral lessons disguised as magic. The Brothers Grimm vs. Disney." 
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#0f0518] text-slate-200 overflow-hidden font-sans selection:bg-purple-500/30">
      <ConstellationBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-purple-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/humanities/culture" className="p-2 bg-purple-500/10 border border-purple-500/30 rounded hover:bg-purple-500/20 transition-colors">
              <Feather className="text-purple-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400">
              Culture // Storytelling
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            FOLKLORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-200">&</span><br/>
            MYTHOLOGY
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-purple-500/50 pl-6">
            Before history was written, it was spoken. Folklore is the collective dream of humanity—a tapestry of heroes, monsters, and warnings that transcend borders and time.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY & MODULES */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* The Monomyth Card */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Map size={20} className="text-amber-400" /> The Hero's Journey
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Joseph Campbell discovered that almost all great myths follow the same structural pattern, known as the <strong>Monomyth</strong>.
              </p>
              

[Image of hero's journey cycle diagram]

              <div className="mt-4 space-y-2 text-xs font-mono">
                  <Step num="01" title="Departure" desc="The call to adventure. Leaving the known world." />
                  <Step num="02" title="Initiation" desc="Facing the abyss. Trials, death, and rebirth." />
                  <Step num="03" title="Return" desc="Coming home changed. Master of two worlds." />
              </div>
            </div>

            {/* Navigation Grid */}
            <div>
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Scroll size={14} /> The Archives
               </h3>
               <div className="grid grid-cols-1 gap-4">
                 {modules.map((m) => (
                   <Link 
                     key={m.title} 
                     href={m.href}
                     className={`group p-5 bg-black/40 border border-white/5 rounded-xl transition-all hover:-translate-y-1 ${m.border} ${m.bg}`}
                   >
                      <div className="flex items-start justify-between mb-3">
                         <m.icon className={m.color} size={24} />
                         <ArrowRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${m.color}`} />
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{m.title}</h4>
                      <p className="text-xs text-slate-400 leading-snug">{m.desc}</p>
                   </Link>
                 ))}
               </div>
            </div>

          </div>

          {/* RIGHT: THE LAB */}
          <div className="lg:col-span-7 space-y-8">
            <ArchetypeCompass />
            
            <div className="p-6 bg-purple-900/20 border border-purple-500/20 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <Ghost size={16} className="text-purple-400" /> Why do we need monsters?
               </h4>
               <p className="text-xs text-purple-200/80 leading-relaxed">
                  Monsters are not just scary stories; they are cultural technologies. 
                  <br/><br/>
                  The <strong>Wendigo</strong> (Algonquian) isn't just a beast; it's a warning against greed and cannibalism during harsh winters. 
                  The <strong>Boogeyman</strong> keeps children from wandering off into the dark.
                  Folklore transforms abstract dangers into concrete enemies we can visualize—and defeat.
               </p>
            </div>
            
            
          </div>

        </div>
      </div>
    </main>
  );
}

function Step({ num, title, desc }: any) {
    return (
        <div className="flex gap-4 items-center p-2 bg-black/20 rounded">
            <div className="text-amber-500 font-bold">{num}</div>
            <div>
                <div className="text-white font-bold">{title}</div>
                <div className="text-[10px] text-slate-500">{desc}</div>
            </div>
        </div>
    )
}