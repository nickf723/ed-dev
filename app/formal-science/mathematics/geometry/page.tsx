"use client";
import PageHeader from "@/components/PageHeader";
import TopicCard from "@/components/TopicCard";
import GeometryBackground from "@/app/formal-science/mathematics/geometry/GeometryBackground";
import { motion } from "framer-motion";
import {
  Square, Network, Tangent, GitMerge, 
} from "@/components/icons"; 
import { 
  BoxIcon,
  BoxSelect, 
  Globe as GlobeIcon,
  Move as MoveIcon
} from "lucide-react";


const sectors = [
  {
    name: "Euclidean Geometry",
    desc: "The study of flat space. Points, lines, and shapes on a plane.",
    color: "text-blue-400",
    icon: Square,
    items: [
      { 
        title: "Plane Geometry", 
        desc: "2D shapes: Triangles, Circles, Polygons and their properties.", 
        href: "/formal-science/mathematics/geometry/euclidean", 
        Icon: Square, 
        className: "theme-geometry",
        subtitle: "2D Shapes" 
      },
      { 
        title: "Solid Geometry", 
        desc: "3D shapes: Prisms, Cylinders, Spheres, and Polyhedra.", 
        href: "/formal-science/mathematics/geometry/solid", 
        Icon: BoxIcon, 
        className: "theme-geometry",
        subtitle: "3D Objects" 
      }
    ]
  },
  {
    name: "Analytic & Transformational",
    desc: "Using algebra to describe geometry and moving shapes in space.",
    color: "text-cyan-400",
    icon: Network,
    items: [
      { 
        title: "Coordinate Geometry", 
        desc: "Describing geometric figures using the Cartesian coordinate system.", 
        href: "/formal-science/mathematics/geometry/coordinate", 
        Icon: Network, 
        className: "theme-geometry",
        subtitle: "Cartesian" 
      },
      { 
        title: "Trigonometry", 
        desc: "The study of triangles and the relationships between their sides and angles.", 
        href: "/formal-science/mathematics/geometry/trigonometry", 
        Icon: Tangent, 
        className: "theme-geometry",
        subtitle: "Triangles" 
      },
       { 
        title: "Transformations", 
        desc: "Translations, Rotations, Reflections, and Dilations.", 
        href: "/formal-science/mathematics/geometry/transformations", 
        Icon: MoveIcon, 
        className: "theme-geometry",
        subtitle: "Motion" 
      }
    ]
  },
  {
    name: "Advanced & Non-Euclidean",
    desc: "Bending the rules. Curved space and abstract properties.",
    color: "text-violet-400",
    icon: GlobeIcon,
    items: [
      { 
        title: "Topology", 
        desc: "Properties that are preserved under continuous deformations (stretching, bending).", 
        href: "/formal-science/mathematics/geometry/topology", 
        Icon: GitMerge, 
        className: "theme-geometry",
        subtitle: "Rubber Sheet" 
      },
       { 
        title: "Non-Euclidean", 
        desc: "Geometry on curved surfaces (Spherical, Hyperbolic) where parallel lines meet.", 
        href: "/formal-science/mathematics/geometry/non-euclidean", 
        Icon: GlobeIcon, 
        className: "theme-geometry",
        subtitle: "Curved Space" 
      }
    ]
  }
];

export default function GeometryPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 lg:px-12">
      
      <GeometryBackground />
      
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        
        <PageHeader
          eyebrow="Mathematics"
          title="Geometry"
          subtitle="The study of shape, size, relative position, and the properties of space. From the rigid logic of Euclid to the curved spacetime of Einstein, geometry describes the stage upon which the universe plays out."
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
            
            {/* Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
            </motion.div>

            {/* Quote Box */}
            <div className="p-5 rounded-xl border border-dashed border-neutral-700 bg-neutral-900/40">
                <h4 className="text-xs font-bold uppercase text-blue-400 mb-2 flex items-center gap-2">
                    <Square size={14} /> The 5th Postulate
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Euclid's parallel postulate (parallel lines never meet) held for 2000 years. When mathematicians finally dared to break it, they discovered Non-Euclidean geometry.
                </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}