"use client";
import PageHeader from "@/components/PageHeader";
import FloatingSymbols from "@/components/FloatingSymbols";
import WikiPortal from "@/components/WIkiPortal";

export default function PortalPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] lg:px-12 pb-20">
      <FloatingSymbols symbols={["HTTP", "JSON", "API", "GET", "404", "{ }", "Fetch", "www"]} />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col py-10">
        <PageHeader
          eyebrow="The Nexus"
          title="External Portal"
          subtitle="A gateway to the open web. Import data, images, and definitions from the global commons into the Knowledge Network."
        />
        <div className="mt-8">
            <WikiPortal />
        </div>
      </div>
    </main>
  );
}