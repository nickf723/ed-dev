import "./globals.css";
import "./themes.css"
import "./components.css"
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Knowledge Netowrk",
  description: "A hub for learning anything, powered by interconnected concepts and clear explanations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <div className="ml-[var(--sidebar-width)] flex-1">{children}</div>
      </body>
    </html>
  );
}
