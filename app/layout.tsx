import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Ed Dev Protocol",
  description: "Working smarter, not harder.",
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
