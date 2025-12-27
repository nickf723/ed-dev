"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import WaveformBackground from "@/app/humanities/music/WaveformBackground";
import CircleOfFifths from "@/app/humanities/music/CircleOfFifths";
import { motion } from "framer-motion";
import {
  Music, Mic2, Radio, Disc, Speaker, Volume2, FileAudio, Sliders
} from "lucide-react";

// --- DATA ---
const sectors = [
  {
    name: "Elements of Music",
    desc: "The building blocks of sound and composition.",
    color: "text-rose-400",
    icon: Music,
    items: [
      { 
        title: "Rhythm & Meter", 
        desc: "The organization of time in music. Tempo, time signatures, and polyrhythms.", 
        href: "/humanities/arts-aesthetics/music/rhythm", 
        Icon: Clock, // Need to import or map
        className: "theme-humanities",
        subtitle: "Time" 
      },
      { 
        title: "Melody & Harmony", 
        desc: "The arrangement of pitch. Scales, intervals, chords, and counterpoint.", 
        href: "/humanities/music/harmony", 
        Icon: Music, 
        className: "theme-humanities",
        subtitle: "Pitch" 
      }
    ]
  },
  {
    name: "Sonic Physics",
    desc: "The science of acoustics and sound production.",
    color: "text-amber-400",
    icon: Speaker,
    items: [
      { 
        title: "Acoustics", 
        desc: "The physics of vibration, resonance, and wave propagation.", 
        href: "/humanities/arts-aesthetics/music/acoustics", 
        Icon: Volume2, 
        className: "theme-physics", // Cross-discipline link!
        subtitle: "Physics" 
      },
      { 
        title: "Timbre & Texture", 
        desc: "The 'color' of sound. Overtones, envelopes, and orchestration.", 
        href: "/humanities/arts-aesthetics/music/timbre", 
        Icon: Sliders, 
        className: "theme-humanities",
        subtitle: "Color" 
      }
    ]
  },
  {
    name: "History & Genre",
    desc: "The evolution of musical expression across cultures.",
    color: "text-orange-400",
    icon: Disc,
    items: [
      { 
        title: "Music History", 
        desc: "From Gregorian Chant to Modernism. The timeline of western art music.", 
        href: "/humanities/arts-aesthetics/music/history", 
        Icon: FileAudio, 
        className: "theme-humanities",
        subtitle: "Heritage" 
      },
      { 
        title: "Ethnomusicology", 
        desc: "The study of music in its social and cultural context globally.", 
        href: "/humanities/arts-aesthetics/music/ethnomusicology", 
        Icon: Globe, // Need import
        className: "theme-anthropology", // Cross-discipline link!
        subtitle: "Culture" 
      }
    ]
  }
];

// Helper for missing icons
import { Clock, Globe } from "lucide-react";

export default function MusicTheoryPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Waveform Background */}
      <WaveformBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Arts & Aesthetics"
          title="Music & Theory"
          subtitle="The organized movement of sound through time. We explore the mathematical relationships between frequencies that evoke emotion, drive movement, and tell stories without words."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (9 cols) */}
          <div className="lg:col-span-9 space-y-10">
             {sectors.map((sector, idx) => (
              <section key={sector.name}>
                 <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="mb-4 flex items-center gap-3"
                 >
                    <sector.icon className={sector.color} size={20} />
                    <h2 className="text-lg font-bold text-white tracking-wide">{sector.name}</h2>
                    <div className="h-[1px] flex-1 bg-white/10"></div>
                 </motion.div>

                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sector.items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
                        >
                            <TopicCard {...item} />
                        </motion.div>
                    ))}
                 </div>
              </section>
            ))}
          </div>

          {/* SIDEBAR (3 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* Circle of Fifths Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <CircleOfFifths />
            </motion.div>

            {/* Quote Box */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="rounded-lg border border-rose-500/20 bg-rose-950/10 p-4 backdrop-blur-md"
            >
                <div className="flex items-start gap-3">
                    <Mic2 size={18} className="text-rose-400 shrink-0 mt-1"/>
                    <div>
                        <h4 className="text-xs font-bold uppercase text-rose-400 mb-1">
                            Pythagoras
                        </h4>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                            "There is geometry in the humming of the strings, there is music in the spacing of the spheres."
                        </p>
                    </div>
                </div>
            </motion.div>

          </div>

        </div>
      </div>
    </main>
  );
}