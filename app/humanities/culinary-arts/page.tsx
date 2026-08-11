"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ChefHat,
  Droplets,
  Flame,
  FlaskConical,
  Snowflake,
  Sparkles,
  ShoppingCart,
  UtensilsCrossed,
  Wind,
  type LucideIcon,
} from "lucide-react";
import DomainPageHeader from "@/app/_components/DomainPageHeader";
import CulinaryBackground from "./CulinaryBackground";

type Technique = {
  id: string;
  label: string;
  icon: LucideIcon;
  rgb: string;
  medium: string;
  energy: string;
  change: string;
  result: string;
  detail: string;
};

type Flavor = {
  id: string;
  label: string;
  rgb: string;
  role: string;
  counterpoint: string;
};

const TECHNIQUES: readonly Technique[] = [
  {
    id: "sear",
    label: "Sear",
    icon: Flame,
    rgb: "251, 113, 133",
    medium: "Dry surface",
    energy: "Very high heat",
    change: "Maillard browning",
    result: "Crust + aroma",
    detail: "Fast surface heating creates hundreds of new aromatic compounds while keeping the interior comparatively protected.",
  },
  {
    id: "roast",
    label: "Roast",
    icon: Flame,
    rgb: "251, 146, 60",
    medium: "Hot air",
    energy: "Steady dry heat",
    change: "Browning + moisture loss",
    result: "Concentrated flavor",
    detail: "Longer dry heating gradually removes water, browns exposed surfaces, and concentrates sweetness and savory aromas.",
  },
  {
    id: "braise",
    label: "Braise",
    icon: Droplets,
    rgb: "96, 165, 250",
    medium: "Liquid + steam",
    energy: "Gentle heat",
    change: "Collagen conversion",
    result: "Tender + rich",
    detail: "Time, moisture, and moderate heat soften connective tissue and let flavor move between the cooking liquid and the food.",
  },
  {
    id: "steam",
    label: "Steam",
    icon: Wind,
    rgb: "34, 211, 238",
    medium: "Water vapor",
    energy: "Condensing heat",
    change: "Rapid moist cooking",
    result: "Clean + delicate",
    detail: "Condensing steam transfers heat efficiently without submerging food, preserving moisture and many delicate aromas.",
  },
  {
    id: "chill",
    label: "Chill",
    icon: Snowflake,
    rgb: "129, 140, 248",
    medium: "Cold",
    energy: "Heat removal",
    change: "Setting + crystallization",
    result: "Structure + contrast",
    detail: "Cooling can set fats, gels, custards, and frozen mixtures while changing texture, aroma release, and perceived sweetness.",
  },
  {
    id: "ferment",
    label: "Ferment",
    icon: FlaskConical,
    rgb: "163, 230, 53",
    medium: "Microbial culture",
    energy: "Time",
    change: "Biochemical conversion",
    result: "Acid + complexity",
    detail: "Microorganisms transform sugars and other compounds into acids, gases, alcohols, and a much larger flavor vocabulary.",
  },
];

const FLAVORS: readonly Flavor[] = [
  { id: "salt", label: "Salt", rgb: "125, 211, 252", role: "Amplifies flavor and changes how bitterness, sweetness, and aroma are perceived.", counterpoint: "Use carefully against bitterness, blandness, and watery foods." },
  { id: "acid", label: "Acid", rgb: "190, 242, 100", role: "Adds brightness and contrast, especially when a dish feels heavy, flat, or overly rich.", counterpoint: "Often balances fat, sweetness, starch, and slow-cooked richness." },
  { id: "fat", label: "Fat", rgb: "253, 224, 71", role: "Carries aroma, softens harsh edges, and creates richness, lubrication, and body.", counterpoint: "Often benefits from acid, bitterness, heat, or fresh aromatic ingredients." },
  { id: "sweet", label: "Sweet", rgb: "244, 114, 182", role: "Provides pleasure and roundness while tempering acidity, bitterness, salt, and aggressive spice.", counterpoint: "Useful as a balancing note even in dishes that are not desserts." },
  { id: "bitter", label: "Bitter", rgb: "167, 139, 250", role: "Adds depth, dryness, and contrast through greens, char, coffee, cocoa, hops, and many spices.", counterpoint: "Can be rounded by salt, sweetness, fat, or careful dilution." },
  { id: "umami", label: "Umami", rgb: "251, 146, 60", role: "Builds savory depth through glutamates and nucleotides found in aged, fermented, roasted, and protein-rich foods.", counterpoint: "Layers especially well with salt, browning, fermentation, mushrooms, tomatoes, and stocks." },
];

export default function CulinaryHub() {
  const [activeTechniqueId, setActiveTechniqueId] = useState("sear");
  const [activeFlavorId, setActiveFlavorId] = useState("acid");
  const activeTechnique = TECHNIQUES.find((item) => item.id === activeTechniqueId) ?? TECHNIQUES[0];
  const activeFlavor = FLAVORS.find((item) => item.id === activeFlavorId) ?? FLAVORS[0];
  const ActiveTechniqueIcon = activeTechnique.icon;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#140d08] text-stone-100 selection:bg-orange-400/25 xl:h-screen xl:overflow-hidden">
      <CulinaryBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_80%_18%,rgba(251,146,60,0.13),transparent_28%),radial-gradient(circle_at_18%_84%,rgba(163,230,53,0.06),transparent_28%),linear-gradient(to_bottom,rgba(20,13,8,0.15),rgba(12,8,6,0.64))]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-30 [background-image:linear-gradient(rgba(251,146,60,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.025)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-4 sm:px-6 xl:h-screen xl:min-h-0 xl:px-8 xl:py-5">
        <DomainPageHeader
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Humanities", href: "/humanities" }, { label: "Culinary Arts" }]}
          eyebrow="Ingredient · Technique · Transformation · Taste"
          icon={ChefHat}
          title={<span>Culinary Arts</span>}
          subtitle="Cook by understanding what heat, time, water, microbes, ingredients, and seasoning actually do to food."
          accentRgb="251, 146, 60"
          titleClassName="font-serif text-[clamp(3.2rem,5.8vw,5.8rem)] font-semibold leading-[0.84] tracking-[-0.055em] text-[#fff8ef]"
          iconClassName="rounded-[18px]"
          headerClassName="border-orange-300/16"
        />

        <section className="mt-4 grid min-h-0 flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid min-h-0 gap-4 xl:grid-rows-[minmax(0,1fr)_190px]">
            <section className="relative min-h-0 overflow-hidden rounded-[26px] border border-orange-200/16 bg-black/[0.25] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-5">
              <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.035)_1px,transparent_1.4px)] [background-size:24px_24px]" />
              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full blur-3xl" style={{ background: `rgba(${activeTechnique.rgb},0.09)` }} />

              <div className="relative flex h-full min-h-0 flex-col">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-orange-300/65">Heat & transformation</div>
                    <p className="mt-1 text-[11px] text-stone-600">The same ingredient becomes different food when the energy pathway changes.</p>
                  </div>
                  <Sparkles size={16} className="text-orange-300/35" />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {TECHNIQUES.map((technique) => {
                    const Icon = technique.icon;
                    const selected = technique.id === activeTechnique.id;
                    return (
                      <button key={technique.id} type="button" onClick={() => setActiveTechniqueId(technique.id)} onMouseEnter={() => setActiveTechniqueId(technique.id)} className="group flex min-w-0 flex-col items-center gap-2 rounded-2xl border px-2 py-3 transition-all" style={{ color: selected ? `rgb(${technique.rgb})` : "rgb(120 113 108)", borderColor: selected ? `rgba(${technique.rgb},0.40)` : "rgba(255,255,255,0.055)", background: selected ? `rgba(${technique.rgb},0.085)` : "rgba(0,0,0,0.18)" }}>
                        <Icon size={17} strokeWidth={1.55} />
                        <span className="truncate font-mono text-[8px] uppercase tracking-[0.1em]">{technique.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 grid min-h-0 flex-1 gap-4 lg:grid-cols-[190px_minmax(0,1fr)]">
                  <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden rounded-[22px] border" style={{ borderColor: `rgba(${activeTechnique.rgb},0.22)`, background: `radial-gradient(circle at center, rgba(${activeTechnique.rgb},0.12), rgba(10,7,5,0.78) 58%, rgba(7,5,4,0.86))` }}>
                    {[32, 24, 16].map((size, index) => <div key={size} className={`absolute h-${size} w-${size} rounded-full border`} style={{ borderColor: `rgba(${activeTechnique.rgb},${0.12 + index * 0.06})` }} />)}
                    <ActiveTechniqueIcon size={36} strokeWidth={1.25} style={{ color: `rgb(${activeTechnique.rgb})` }} />
                    <div className="absolute bottom-4 font-mono text-[8px] uppercase tracking-[0.18em]" style={{ color: `rgba(${activeTechnique.rgb},0.72)` }}>{activeTechnique.label}</div>
                  </div>

                  <div className="flex min-h-0 flex-col">
                    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                      {[["Medium", activeTechnique.medium], ["Energy", activeTechnique.energy], ["Change", activeTechnique.change], ["Result", activeTechnique.result]].map(([label, value]) => (
                        <div key={label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3">
                          <div className="font-mono text-[7px] uppercase tracking-[0.14em] text-stone-600">{label}</div>
                          <div className="mt-1 text-[11px] font-semibold text-stone-200">{value}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex-1 rounded-2xl border border-white/[0.06] bg-black/20 p-4">
                      <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">{activeTechnique.label}</h2>
                      <p className="mt-2 max-w-2xl text-[12px] leading-5 text-stone-400">{activeTechnique.detail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/[0.26] p-4 backdrop-blur-xl">
              <div className="relative grid h-full gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
                <div className="min-w-0">
                  <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-orange-300/65">Flavor balance</div>
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {FLAVORS.map((flavor) => {
                      const selected = flavor.id === activeFlavor.id;
                      return <button key={flavor.id} type="button" onClick={() => setActiveFlavorId(flavor.id)} onMouseEnter={() => setActiveFlavorId(flavor.id)} className="rounded-xl border px-2 py-3 text-center transition-all" style={{ color: selected ? `rgb(${flavor.rgb})` : "rgb(120 113 108)", borderColor: selected ? `rgba(${flavor.rgb},0.36)` : "rgba(255,255,255,0.055)", background: selected ? `rgba(${flavor.rgb},0.075)` : "rgba(0,0,0,0.16)" }}><span className="font-mono text-[8px] uppercase tracking-[0.1em]">{flavor.label}</span></button>;
                    })}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/[0.065] bg-white/[0.02] p-3.5">
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: `rgb(${activeFlavor.rgb})` }} /><h2 className="text-sm font-semibold text-white">{activeFlavor.label}</h2></div>
                  <p className="mt-2 text-[10px] leading-4 text-stone-400">{activeFlavor.role}</p>
                  <p className="mt-2 text-[9px] leading-4 text-stone-600">{activeFlavor.counterpoint}</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="grid min-h-0 gap-4 xl:grid-rows-[1fr_1fr_auto]">
            <ResourceCard href="/humanities/culinary-arts/recipes" icon={UtensilsCrossed} rgb="251, 146, 60" title="Recipe Library" subtitle="The Kitchen" description="Browse dishes by station or cuisine, search by name, inspect ingredients, and pull a random chef's special." />
            <ResourceCard href="/humanities/culinary-arts/market" icon={ShoppingCart} rgb="52, 211, 153" title="Ingredient Index" subtitle="The Market" description="Explore raw ingredients and packaged foods as a searchable pantry of things cooks actually work with." />
            <div className="rounded-[22px] border border-orange-200/12 bg-[#0c0806]/78 p-4 backdrop-blur-xl">
              <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-orange-300/55">A dish is a system</div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-semibold text-stone-400"><span>ingredient</span><span className="text-orange-400/45">+</span><span>technique</span><span className="text-orange-400/45">+</span><span>time</span><span className="text-orange-400/45">+</span><span>seasoning</span></div>
              <div className="mt-3 border-t border-white/[0.06] pt-3 text-[10px] leading-4 text-stone-600">Texture, aroma, temperature, flavor, presentation, and culture all emerge from how those variables interact.</div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function ResourceCard({ href, icon: Icon, rgb, title, subtitle, description }: { href: string; icon: LucideIcon; rgb: string; title: string; subtitle: string; description: string }) {
  return (
    <Link href={href} className="group relative flex min-h-[210px] flex-col overflow-hidden rounded-[24px] border p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5" style={{ borderColor: `rgba(${rgb},0.22)`, background: `linear-gradient(145deg, rgba(${rgb},0.11), rgba(10,7,5,0.78) 48%, rgba(7,5,4,0.68))` }}>
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl" style={{ background: `rgba(${rgb},0.10)` }} />
      <div className="relative flex h-full flex-col">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border" style={{ color: `rgb(${rgb})`, borderColor: `rgba(${rgb},0.32)`, background: `rgba(${rgb},0.07)` }}><Icon size={20} strokeWidth={1.55} /></span>
        <div className="mt-5"><div className="font-mono text-[8px] uppercase tracking-[0.14em]" style={{ color: `rgba(${rgb},0.78)` }}>{subtitle}</div><h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-white">{title}</h2><p className="mt-3 text-[11px] leading-5 text-stone-500">{description}</p></div>
        <div className="mt-auto flex justify-end pt-4"><ArrowRight size={15} style={{ color: `rgb(${rgb})` }} className="transition-transform group-hover:translate-x-1" /></div>
      </div>
    </Link>
  );
}
