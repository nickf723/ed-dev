import React from 'react';
import { ArrowLeft, ShieldAlert, Activity, Zap } from 'lucide-react';
import Link from 'next/link';
import CardiologyBackground from '../../_components/CardiologyBackground';
import CommotioLab from '../_components/CommotioLab';
import { M } from '@/components/Math';

export default function CommotioCordisPage() {
  return (
    <main className="relative min-h-screen bg-black font-sans text-neutral-300 selection:bg-red-900/30">
      <CardiologyBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link href="/applied-science/health/specializations/cardiology" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> BACK TO CARDIOLOGY
        </Link>

        <header className="mb-16">
            <div className="flex items-center gap-3 text-red-500 mb-4 font-mono text-sm tracking-widest uppercase">
                <span className="w-8 h-px bg-red-500"></span>
                Clinical Case Study 01
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                COMMOTIO CORDIS
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
                In early 2023, the world watched an elite athlete take a routine hit to the chest and immediately collapse into sudden cardiac arrest. 
                This is the terrifying physics of <span className="text-white font-bold">Commotio Cordis</span>.
            </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
            
            <h3>The Anatomy of the Impact</h3>
            <p>
                Commotio Cordis does not happen because the impact damages the heart muscle or breaks the ribs. The heart is structurally unharmed. 
                Instead, it is a catastrophic short-circuit of the heart's electrical grid.
            </p>
            <p>
                For this to occur, the blunt force trauma (like a football helmet, a baseball, or a hockey puck) must happen directly over the left ventricle during an incredibly specific fraction of a second: <strong>The upswing of the T-Wave.</strong>
            </p>

            

            <div className="not-prose my-16">
                <CommotioLab />
                <div className="text-center text-xs text-neutral-500 mt-4 italic max-w-lg mx-auto leading-relaxed">
                    Adjust the slider to simulate an impact. Notice how the heart can absorb the blow during the QRS complex, but flatlines if hit during the vulnerable window.
                </div>
            </div>

            <h3>The Vulnerable Window</h3>
            <p>
                During the T-Wave, the heart's muscle cells are repolarizing (resetting their electrical charges to prepare for the next beat). During a tiny window lasting just <M>{`\\Delta t \\approx 20 \\text{ ms}`}</M>, the cells are in a state of chaotic instability—some are ready to fire, while others are still resetting.
            </p>
            <p>
                If a physical impact sends a mechanical shockwave through the chest at this exact millisecond, the mechanical energy converts into electrical energy (a phenomenon known as mechanoelectric coupling). This sparks a premature electrical impulse.
            </p>

            <h3>Ventricular Fibrillation (V-Fib)</h3>
            <p>
                That premature spark throws the entire synchronized system into chaos. Instead of a coordinated "Lub-Dub" squeeze, the ventricles begin to quiver like a bag of worms. This is <strong>Ventricular Fibrillation</strong>.
            </p>
            
            

[Image of ventricular fibrillation ECG trace]


            <ul className="space-y-4 text-neutral-400 list-none pl-0 my-8">
                <li className="flex items-start gap-4 bg-neutral-900/30 p-4 rounded-xl border border-neutral-800">
                    <Activity className="text-red-500 shrink-0 mt-1" />
                    <div>
                        <strong className="text-white block mb-1">Zero Cardiac Output</strong>
                        Because the heart is just quivering, no blood is being pushed out to the body. The brain loses oxygen in seconds, resulting in immediate collapse.
                    </div>
                </li>
            </ul>

            <h3>The Chain of Survival</h3>
            <p>
                The athlete survived and returned to professional sports purely because of the immediate, flawless execution of the Chain of Survival by the medical staff on the field.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-12">
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Activity size={64}/></div>
                    <h4 className="text-white font-bold mb-2 z-10 relative">1. High-Quality CPR</h4>
                    <p className="text-sm text-neutral-400 z-10 relative">
                        CPR does not restart the heart. CPR manually squeezes the heart between the sternum and the spine, forcing blood to the brain to keep the tissue alive until the electrical system can be fixed.
                    </p>
                </div>
                
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={64}/></div>
                    <h4 className="text-white font-bold mb-2 z-10 relative">2. Defibrillation (AED)</h4>
                    <p className="text-sm text-neutral-400 z-10 relative">
                        The AED is the "Ctrl-Alt-Delete" of the heart. It delivers a massive electrical shock (often upwards of 200 Joules) that momentarily stops <em>all</em> electrical activity, hoping the heart's natural pacemaker (the SA Node) will wake up and take control again.
                    </p>
                </div>
            </div>

        </article>

      </div>
    </main>
  );
}