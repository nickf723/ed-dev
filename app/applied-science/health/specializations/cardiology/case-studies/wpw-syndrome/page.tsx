import React from 'react';
import { ArrowLeft, Zap, HeartPulse, Scissors } from 'lucide-react';
import Link from 'next/link';
import CardiologyBackground from '../../_components/CardiologyBackground';
import WPWLab from '../_components/WPWLab';

export default function WPWSyndromePage() {
  return (
    <main className="relative min-h-screen bg-[#020000] font-sans text-neutral-300 selection:bg-yellow-900/30">
      <CardiologyBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 lg:py-24">
        <Link href="/applied-science/health/specializations/cardiology" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-500 hover:text-white mb-12 transition-colors uppercase">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Cardiology
        </Link>

        <header className="mb-16">
            <div className="flex items-center gap-3 text-yellow-500 mb-4 font-mono text-sm tracking-widest uppercase font-bold">
                <span className="w-8 h-px bg-yellow-500"></span>
                Clinical Case Study 02
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                W.P.W. SYNDROME
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed font-light">
                The heart is a pump controlled by a precise electrical grid. But what happens when you are born with an extra, unauthorized wire connecting the top floor to the bottom floor? 
                Welcome to <strong className="text-white font-semibold">Wolff-Parkinson-White Syndrome</strong>.
            </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
            
            <h3>The Gatekeeper: The AV Node</h3>
            <p>
                In a normal heart, an electrical spark starts at the top (the SA Node) and tells the upper chambers to squeeze. 
            </p>
            <p>
                Before that spark can travel to the powerful bottom chambers (the ventricles), it hits a tollbooth called the <strong>AV Node</strong>. The AV Node forces the electrical signal to pause for about 0.1 seconds. This delay is critical—it gives the blood time to drain from the top to the bottom before the bottom squeezes.
            </p>

            

            <h3>The Rogue Wire: Bundle of Kent</h3>
            <p>
                About 1 in 1,000 people are born with an accessory pathway called the <strong>Bundle of Kent</strong>. This is a rogue electrical wire that completely bypasses the AV Node tollbooth. 
            </p>
            <p>
                Because there is no delay, the electrical signal races down the rogue wire and prematurely shocks the ventricles into squeezing early. 
            </p>

            <div className="not-prose my-16">
                <WPWLab />
            </div>

            

[Image of Delta wave on ECG]


            <h3>The Signature: The Delta Wave</h3>
            <p>
                When a cardiologist looks at the ECG of someone with WPW, they don't see the normal, sharp spike of a heartbeat. Because the ventricle is being activated early via the rogue wire, the ECG shows a "slurred" ramping upstroke leading into the spike. 
            </p>
            <p>
                This slow ramp is called the <strong>Delta Wave</strong>, and it is the absolute hallmark of WPW Syndrome.
            </p>

            <h3>The Danger: Infinite Feedback Loops</h3>
            <p>
                Having a Delta Wave isn't deadly on its own. The real danger of WPW is when the signal travels down the normal AV Node pathway, hits the bottom of the heart, and then travels <em>backwards</em> up the rogue wire. 
            </p>
            <p>
                This creates a closed electrical circuit. The signal spins in an infinite loop, causing the heart to beat at terrifying speeds (often over 200 beats per minute). This is called <strong>Supraventricular Tachycardia (SVT)</strong>. At 200+ BPM, the heart is fluttering so fast it can't actually fill with blood, causing blood pressure to crash.
            </p>

            <div className="my-12 p-8 bg-neutral-900/50 border-l-4 border-yellow-500 rounded-r-xl not-prose">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Scissors size={20} className="text-yellow-500"/> The Fix: Radiofrequency Ablation
                </h4>
                <p className="text-sm text-neutral-400">
                    If medication fails, the ultimate cure for WPW is surprisingly literal. An electrophysiologist threads a catheter through a vein in the leg up into the heart, locates the exact location of the rogue Bundle of Kent, and uses radiofrequency heat to burn the wire and destroy it. The circuit is cut, and the patient is cured instantly.
                </p>
            </div>

        </article>

      </div>
    </main>
  );
}