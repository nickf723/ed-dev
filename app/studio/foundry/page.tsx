import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import FoundryBoard from "./FoundryBoard";
import { readPageFoundryQueue } from "@/lib/page-foundry/server";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Page Foundry · Knowledge Studio",
  robots: { index: false, follow: false },
};

export default async function PageFoundryPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  const queue = await readPageFoundryQueue();
  return (
    <>
      <Link
        href="/studio"
        className="fixed bottom-4 left-4 z-50 inline-flex h-10 items-center gap-2 rounded-[11px] border border-white/[0.09] bg-[#0b0e14]/90 px-3 text-[9px] text-slate-400 shadow-xl backdrop-blur-xl hover:text-white"
      >
        <ArrowLeft size={12} /> Back to Studio
      </Link>
      <FoundryBoard initialQueue={queue} />
    </>
  );
}
