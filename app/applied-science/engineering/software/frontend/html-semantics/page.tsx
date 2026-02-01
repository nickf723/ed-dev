"use client";
import Link from "next/link";
import WireframeBackground from "./WireframeBackground";
import SemanticScanner from "./SemanticScanner";
import { 
  Layout, FileCode, Search, Braces, 
  ArrowRight, FolderTree, Anchor, Table 
} from "lucide-react";

export default function HtmlPage() {
  // Placeholder links for future pages
  const childPages = [
    { title: "Forms & Inputs", href: "html-semantics/forms", icon: Layout, desc: "Data collection, validation, and accessibility." },
    { title: "Tables & Data", href: "html-semantics/tables", icon: Table, desc: "Structuring complex datasets effectively." },
    { title: "Accessibility (ARIA)", href: "html-semantics/accessibility", icon: Search, desc: "Making the web usable for everyone." },
    { title: "SEO & Metadata", href: "html-semantics/seo", icon: FileCode, desc: "How search engines understand your content." },
  ];

  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-orange-500/30">
      <WireframeBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* HERO */}
        <header className="mb-16 border-b border-orange-500/20 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/applied-science/engineering/software/frontend" className="p-2 bg-orange-500/10 border border-orange-500/30 rounded hover:bg-orange-500/20 transition-colors">
              <Braces className="text-orange-400" size={20} />
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-400">
              Frontend // Structure
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            HTML <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">&</span><br/>
            <span className="text-slate-500">SEMANTICS</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-orange-500/50 pl-6">
            HyperText Markup Language is the skeleton of the web. Semantics is the practice of using the <em>correct</em> bone for the job, ensuring that content has meaning to machines (browsers, screen readers) as well as humans.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: THEORY & LINKS */}
          <div className="lg:col-span-6 space-y-12">
            
            {/* The Pitch */}
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FolderTree size={20} className="text-orange-400" /> The DOM Tree
              </h3>
              
              <p className="text-sm text-slate-400 leading-relaxed">
                The browser doesn't see "text"; it sees a tree of objects. Every tag you write creates a node in the <strong>Document Object Model</strong>. Writing clean HTML means building a stable, predictable tree.
              </p>
            </div>

            {/* CHILD PAGES GRID */}
            <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Anchor size={12} /> Sub-Modules
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {childPages.map((page) => (
                    <Link key={page.title} href={page.href} className="group relative p-5 bg-black/40 border border-white/5 hover:border-orange-500/50 rounded-xl transition-all hover:-translate-y-1">
                        <page.icon className="text-slate-600 group-hover:text-orange-400 transition-colors mb-3" size={24} />
                        <h4 className="text-sm font-bold text-white mb-1 group-hover:text-orange-200 transition-colors">{page.title}</h4>
                        <p className="text-[10px] text-slate-500 leading-snug">{page.desc}</p>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight size={14} className="text-orange-400" />
                        </div>
                    </Link>
                ))}
                </div>
            </div>

            {/* Code Snippet */}
            <div className="bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-xs overflow-hidden">
                <div className="flex gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-slate-500">// Bad</div>
                <div className="text-white mb-4 opacity-50">
                    &lt;div class="nav"&gt;Menu&lt;/div&gt;
                </div>
                <div className="text-emerald-500">// Good (Semantic)</div>
                <div className="text-orange-300">
                    &lt;nav aria-label="Main"&gt;<br/>
                    &nbsp;&nbsp;&lt;ul&gt;...&lt;/ul&gt;<br/>
                    &lt;/nav&gt;
                </div>
            </div>

          </div>

          {/* RIGHT: THE SCANNER LAB */}
          <div className="lg:col-span-6 space-y-6">
            <SemanticScanner />
            
            <div className="p-6 bg-orange-950/10 border border-orange-500/20 rounded-2xl">
              <h4 className="text-sm font-bold text-white uppercase mb-2">Why Semantics Matter?</h4>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3 text-xs text-slate-400">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_orange]" />
                  <span><strong>Accessibility:</strong> Screen readers rely on tags like &lt;nav&gt; and &lt;main&gt; to navigate.</span>
                </li>
                <li className="flex items-start gap-3 text-xs text-slate-400">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_orange]" />
                  <span><strong>SEO:</strong> Search engines weigh content inside &lt;h1&gt; or &lt;article&gt; heavier than generic divs.</span>
                </li>
                <li className="flex items-start gap-3 text-xs text-slate-400">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_orange]" />
                  <span><strong>Maintainability:</strong> It is easier to read code that describes <em>what it is</em>.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}