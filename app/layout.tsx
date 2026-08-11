import "./globals.css";
import "./culinary-ui.css";
import "katex/dist/katex.min.css";

import { Analytics } from "@vercel/analytics/next";
import AppShell from "@/app/_components/AppShell";

export const metadata = {
  title: "The Knowledge Web",
  description: "Educational ontological structures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <Analytics />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
