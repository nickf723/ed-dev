import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Radiation, ShieldAlert, Bone, Waves, Cloud } from 'lucide-react';
import XRayBackground from './_components/XRayBackground';
import XRayTubeSimulator from './_components/XRayTubeSimulator';
import VocabDrawer, { VocabWord } from '@/app/_components/ui/VocabDrawer';
import { M } from '@/app/_components/Math';

// We can define the specific terms locally, or import from your global registry!
const RADIOLOGY_VOCAB: VocabWord[] = [
    {
        term: "Bremsstrahlung",
        category: "Physics",
        pronunciation: "brem-shtrah-lung",
        definition: "German for 'braking radiation'. X-rays produced when high-speed electrons decelerate and change direction due to the electromagnetic interaction with an atomic nucleus."
    },
    {
        term: "Attenuation",
        category: "Physics",
        definition: "The reduction in intensity of an X-ray beam as it passes through matter, caused by absorption (Photoelectric effect) and scattering (Compton effect)."
    },
    {
        term: "Photoelectric Effect",
        category: "Interaction",
        definition: "An interaction where an X-ray photon is completely absorbed by an inner-shell electron, ejecting it. This is responsible for the white areas (bones) on a radiograph."
    },
    {
        term: "Compton Scatter",
        category: "Interaction",
        definition: "An interaction where an X-ray photon collides with an outer-shell electron, ejecting it and scattering the photon in a new direction with less energy. Creates 'fog' on the image."
    }
];

const RADIOLOGY_MODULES = [
    {
        id: 'safety',
        title: 'Radiation Safety & Dosimetry',
        description: 'Inverse Square Law, ALARA principles, and calculating sieverts (Sv) vs. grays (Gy).',
        icon: ShieldAlert,
        color: 'amber',
        href: '#' 
    },
    {
        id: 'ct',
        title: 'Computed Tomography (CT)',
        description: 'How a rotating X-ray tube and complex algorithms map 3D volumes of the human body.',
        icon: Activity,
        color: 'sky',
        href: '#'
    },
    {
        id: 'mri',
        title: 'MRI Physics',
        description: 'Leaving ionizing radiation behind. Magnetic spin, Larmor frequency, and T1/T2 relaxation times.',
        icon: Waves,
        color: 'purple',
        href: '#'
    }
];

export default function XRayPhysicsPage() {
    return (
        <main className="relative min-h-screen bg-[#030304] text-zinc-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
            
            <XRayBackground />
            <VocabDrawer vocabList={RADIOLOGY_VOCAB} themeColor="cyan" />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/applied-science/health" className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Health Sciences Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-cyan-500/30 rounded-lg text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                            <Radiation size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300/50">
                            Radiology // Diagnostic Imaging
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        X-RAY <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-zinc-400">PHYSICS</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        To look inside the human body without surgery, we exploit the electromagnetic spectrum. By accelerating electrons into a metal target at half the speed of light, we generate photons energetic enough to pass directly through human tissue.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Cloud className="text-cyan-400" /> Tube Dynamics
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                An X-Ray tube is essentially a massive vacuum tube. A wire filament (the Cathode) is heated until electrons boil off. A massive electrical voltage (<strong>kVp</strong>) is then applied, violently ripping those electrons across the vacuum and smashing them into a Tungsten target (the Anode).
                            </p>
                            
                            <div className="p-5 bg-black/40 border-l-4 border-cyan-500 text-sm text-zinc-300 font-serif italic rounded-r-xl shadow-inner mb-6">
                                Over 99% of this kinetic energy is converted instantly into heat. Less than 1% is converted into X-Ray photons via <strong>Bremsstrahlung</strong> interactions.
                            </div>
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Bone className="text-zinc-300" /> Attenuation (Image Creation)
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                An X-Ray image is just a map of shadows. As the beam passes through the patient, photons interact with tissues based on their density and atomic number. The intensity of the beam as it exits the patient is calculated by the Beer-Lambert law:
                            </p>
                            
                            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex justify-center text-xl text-white mb-6 shadow-inner">
                                <M display>{String.raw`I = I_0 e^{-\mu x}`}</M>
                            </div>

                            <p className="text-zinc-400 leading-relaxed font-light mt-4">
                                Bone has a high density and atomic number, causing a high attenuation coefficient (<M>{String.raw`\mu`}</M>). It absorbs photons (Photoelectric Effect), casting a white shadow on the detector. Air in the lungs absorbs nothing, turning the image black.
                            </p>
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LAB */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <XRayTubeSimulator />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: ADVANCED ROUTING */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Radiation className="text-cyan-400" /> Advanced Imaging Modalities
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Standard radiography is just a 2D shadow. Explore advanced medical imaging.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {RADIOLOGY_MODULES.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'amber' ? 'hover:border-amber-500/50' :
                                topic.color === 'sky' ? 'hover:border-sky-500/50' :
                                'hover:border-purple-500/50';
                                
                            const iconColor = 
                                topic.color === 'amber' ? 'text-amber-400' :
                                topic.color === 'sky' ? 'text-sky-400' :
                                'text-purple-400';

                            return (
                                <Link key={topic.id} href={topic.href} className={`bg-black/40 border border-white/5 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 ${borderHover}`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 bg-white/5 rounded-xl ${iconColor}`}>
                                            <Icon size={24} />
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-white mb-2 group-hover:text-white transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        {topic.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>

            </div>
        </main>
    );
}