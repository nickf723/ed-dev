"use client";
import PageHeader from "@/components/PageHeader";
import AtlasBackground from "@/app/formal-science/mathematics/geometry/topology/manifolds/AtlasBackground";
import GluingWidget from "@/app/formal-science/mathematics/geometry/topology/manifolds/GluingWidget";
import { motion } from "framer-motion";
import {
  CollapsibleTopic,
  ContentP,
  ExampleBlock,
} from "@/components/LessonBlocks";
import { M } from "@/components/Math";
import { Globe, Map, Maximize } from "lucide-react";

export default function ManifoldsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      {/* 1. Background */}
      <AtlasBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Topology"
          title="Manifolds"
          subtitle="A manifold is a space that looks 'flat' when you zoom in close enough. It allows us to use simple Euclidean calculus to study complex, curved shapes like spheres, spacetime, and phase spaces."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* MAIN CONTENT (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
             
             <CollapsibleTopic title="1. Locally Euclidean" icon={Globe} startOpen={true}>
                <ContentP>
                    Imagine standing in a large field. The ground looks flat, but you know the Earth is round. This is the essence of a manifold.
                </ContentP>
                <ContentP>
                    Mathematically, an <strong>n-dimensional manifold</strong> is a space <M>M</M> where every point has a neighborhood that is topologically equivalent (homeomorphic) to Euclidean space <M>{"\\mathbb{R}^n"}</M>.
                </ContentP>
                <ExampleBlock>
                    <p><strong>The Circle (<M>S^1</M>):</strong> If you take a small piece of a circle and straighten it out, it looks like a line segment (<M>{"\\mathbb{R}^1"}</M>).</p>
                    <p><strong>The Sphere (<M>S^2</M>):</strong> Any small patch of the Earth's surface looks like a flat 2D plane map (<M>{"\\mathbb{R}^2"}</M>).</p>
                </ExampleBlock>
             </CollapsibleTopic>

             <CollapsibleTopic title="2. Charts & Atlases" icon={Map}>
                <ContentP>
                    To describe a manifold completely, we use a collection of maps called an <strong>Atlas</strong>.
                </ContentP>
                <ul className="list-disc pl-5 text-sm text-neutral-300 space-y-2 mt-2">
                    <li><strong>Chart:</strong> A single map (coordinate system) that covers part of the manifold.</li>
                    <li><strong>Atlas:</strong> A collection of charts that covers the <em>entire</em> manifold.</li>
                    <li><strong>Transition Map:</strong> The rule for translating coordinates where two charts overlap (like flipping a page in an atlas).</li>
                </ul>
             </CollapsibleTopic>

             <CollapsibleTopic title="3. Construction by Gluing" icon={Maximize}>
                <ContentP>
                    We can build complex manifolds by taking a simple flat shape (like a square) and gluing its edges together. This is called a <strong>Quotient Space</strong>.
                </ContentP>
                <ContentP>
                    The widget on the right demonstrates this process. By identifying the top edge with the bottom edge, a square becomes a cylinder. Identifying the ends of the cylinder creates a Torus.
                </ContentP>
             </CollapsibleTopic>

          </div>

          {/* SIDEBAR (4 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-6 h-fit pt-2">
            
            {/* Gluing Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
               <GluingWidget />
            </motion.div>

            {/* Info Box */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-indigo-400 mb-2 flex items-center gap-2">
                    <Globe size={14} /> The Universe
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    General Relativity describes our universe as a 4-dimensional Lorentzian manifold. Gravity is simply the curvature of this manifold.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}