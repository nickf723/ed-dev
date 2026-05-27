import type { Metadata } from "next";
import { Urbanist, Fira_Code } from "next/font/google";
import "./globals.css";
import 'katex/dist/katex.min.css';

import Sidebar from "@/app/_components/Sidebar";
import MainContent from "@/app/_components/MainContent";
import { Analytics } from "@vercel/analytics/next"

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
        <div className="flex min-h-screen">
          <Sidebar />
          <MainContent>
            {children}
          </MainContent>
        </div>
      </body>
    </html>
  );
}