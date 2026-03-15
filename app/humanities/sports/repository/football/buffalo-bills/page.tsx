"use client";
import Link from "next/link";
import HighmarkSnowBackground from "./_components/HighmarkSnowBackground";
import TeamErasTimeline from "./_components/TeamErasTimeline";
import { 
  Shield, Users, Flame, Skull 
} from "lucide-react";

// Import our new media factory components!
import { PlayerCard, StadiumCard, PlayerData, StadiumData } from "./_components/media";

export default function BuffaloBillsPage() {
  
  // MOCK DATA (In the future, fetch this from your database!)
  const joshAllen: PlayerData = { 
      id: '17', 
      name: 'Josh Allen', 
      position: 'Quarterback', 
      number: 17, 
      hometown: 'Firebaugh, CA', 
      college: 'Wyoming', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Josh_Allen_SEPT2021_%28cropped2%29.jpg/960px-Josh_Allen_SEPT2021_%28cropped2%29.jpg',
      link: 'https://www.nfl.com/players/josh-allen/',
      path: '/humanities/sports/repository/football/buffalo-bills/players/josh-allen'
  };
  
  const highmarkStadium: StadiumData = { 
      name: 'Highmark Stadium', 
      location: 'Orchard Park, NY', 
      capacity: 71608, 
      surface: 'A-Turf Titan 50', 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Highmark_Stadium%2C_autumn_2022.jpg' 
  };

  return (
    <main className="relative min-h-screen bg-[#00338D] text-slate-200 overflow-hidden font-sans selection:bg-red-600/30">
      
      <HighmarkSnowBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00338D]/50 to-[#001e52] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* HERO SECTION */}
        <header className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Link href="/humanities/sports/repository/football" className="p-2 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition-colors shadow-lg">
                <Shield className="text-white" size={20} />
              </Link>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/70">
                AFC East // Franchise
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl">
              BUFFALO <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">BILLS</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
             <StatBox label="Est." value="1960" />
             <StatBox label="Titles" value="2 (AFL)" />
             <StatBox label="Stadium" value="Highmark" />
          </div>
        </header>

        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          
          {/* LEFT: IDENTITY & ASSETS */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* The Mafia Card */}
            <div className="p-6 bg-[#C60C30]/90 border border-white/10 rounded-2xl shadow-xl backdrop-blur-md">
               <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                   <Users size={20} /> Bills Mafia
               </h3>
               <p className="text-xs text-white/90 leading-relaxed font-medium">
                   More than a fanbase. A community known for extreme loyalty, massive charitable donations to Oishei Children's Hospital, and smashing folding tables in the parking lot.
               </p>
            </div>

            {/* Injected Media Factory Components */}
            <div className="space-y-6">
                <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 border-b border-white/10 pb-2">Franchise Assets</h3>
                <StadiumCard stadium={highmarkStadium} />
                <PlayerCard player={joshAllen} />
            </div>

          </div>

          {/* RIGHT: HISTORY */}
          <div className="lg:col-span-8 space-y-8">
            <TeamErasTimeline />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FactCard 
                    icon={Flame} 
                    title="The Comeback" 
                    desc="1993 Wild Card vs Oilers. Down 35-3, backup QB Frank Reich led the greatest comeback in NFL history (41-38)." 
                />
                <FactCard 
                    icon={Skull} 
                    title="Wide Right" 
                    desc="Super Bowl XXV. The closest the Bills ever came. Scott Norwood's 47-yard kick sailed wide right as time expired." 
                />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function StatBox({ label, value }: { label: string, value: string }) {
    return (
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-center backdrop-blur-sm shadow-md">
            <div className="text-[9px] uppercase font-bold text-slate-400">{label}</div>
            <div className="text-lg font-black text-white">{value}</div>
        </div>
    )
}

function FactCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="p-4 bg-black/40 border border-white/5 rounded-xl flex gap-4 items-start shadow-md hover:bg-black/50 transition-colors cursor-default">
            <div className="p-2 bg-white/10 rounded-lg text-white shrink-0">
                <Icon size={20} />
            </div>
            <div>
                <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                <p className="text-xs text-slate-400 leading-snug">{desc}</p>
            </div>
        </div>
    )
}