"use client";
import PageHeader from "@/components/PageHeader";
import PennyCanGame from "@/app/humanities/arts-aesthetics/film/television/cougar-town/PennyCanGame";
import WineGlassWidget from "@/app/humanities/arts-aesthetics/film/television/cougar-town/WineGlassWidget";
import { motion } from "framer-motion";
import { Wine, Users, MapPin, Film } from "lucide-react";

export default function CougarTownPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* Background: A warm Florida sunset gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-orange-900/20 to-neutral-950" />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Case Study: Sitcom Evolution"
          title="Cougar Town"
          subtitle="A masterclass in 'retooling.' Starting as a show about dating, it evolved into a surreal, warm-hearted ensemble comedy about a group of codependent friends who drink wine in a cul-de-sac."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 space-y-10">
             
             {/* Analysis Section */}
             <section className="glass p-8 rounded-2xl border border-pink-500/20 bg-pink-950/10">
                 <div className="flex items-center gap-3 mb-6">
                    <Film className="text-pink-400" size={24} />
                    <h2 className="text-2xl font-bold text-white">The Pivot</h2>
                 </div>
                 <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                    Midway through Season 1, creator Bill Lawrence (<em>Scrubs</em>) realized the "cougar" premise wasn't working. He abandoned the dating plots and focused entirely on the weird, specific chemistry of the cast.
                 </p>
                 <p className="text-sm text-neutral-300 leading-relaxed">
                    The show became famous for its <strong>Title Cards</strong>, which openly mocked the show's terrible name every week (e.g., "It's Okay to Watch a Show Called Cougar Town").
                 </p>
             </section>

             {/* The Meta-Verse */}
             <section className="glass p-8 rounded-2xl border border-cyan-500/20 bg-cyan-950/10">
                 <div className="flex items-center gap-3 mb-6">
                    <MapPin className="text-cyan-400" size={24} />
                    <h2 className="text-2xl font-bold text-white">The Abed Connection</h2>
                 </div>
                 <p className="text-sm text-neutral-300 leading-relaxed">
                    Abed Nadir from <em>Community</em> was obsessed with the show. In a legendary crossover, Abed appeared in the background of a <em>Cougar Town</em> scene, fulfilling a prophecy he made on his own show.
                 </p>
             </section>

          </div>

          {/* SIDEBAR */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* Interactive Penny Can */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
               <PennyCanGame />
            </motion.div>

            {/* Wine Glass History */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <WineGlassWidget />
            </motion.div>

          </div>

        </div>
      </div>
    </main>
  );
}