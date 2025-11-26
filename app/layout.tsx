import "./globals.css";
import "./themes.css"
import "./components.css"
import Sidebar from "@/components/Sidebar";
import "katex/dist/katex.min.css";
import MemexDock from "@/components/MemexDock";

export const metadata = {
  title: "Knowledge Netowrk",
  description: "A hub for learning anything, powered by interconnected concepts and clear explanations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex bg-neutral-950">
        <Sidebar />
        <div className="ml-[var(--sidebar-width)] flex-1 min-h-screen relative">
            {children}
            <MemexDock /> {/* THE DOCK LIVES HERE, GLOBALLY */}
        </div>
      </body>
    </html>
  );
}
