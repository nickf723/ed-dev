"use client";
import PageHeader from "@/components/PageHeader";
import StardustBackground from "@/components/StardustBackground"; // Assuming you have this or similar
import ChronicleTimeline from "@/components/ChronicleTimeline";

export default function ChroniclePage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] lg:px-12 pb-20">
      
      {/* Background: Deep Time */}
      <StardustBackground />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col py-10">
        
        <PageHeader
          eyebrow="The Nexus"
          title="The Chronicle"
          subtitle="A unified timeline of reality. From the first milliseconds of the cosmos to the digital age, trace the chain of events that led to this moment."
        />

        {/* The Timeline */}
        <ChronicleTimeline />

      </div>
    </main>
  );
}