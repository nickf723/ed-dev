import "./globals.css";
// import { Inter } from "next/font/google"; // If you use fonts
import Sidebar from "../components/Sidebar";
import { SidebarProvider } from "../components/SidebarContext";
import MainContent from "../components/MainContent";
import { CommandMenu } from "@/components/CommandMenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* 1. Provider wraps everything */}
        <SidebarProvider>
          <CommandMenu />
          {/* 2. Sidebar is INSIDE Provider */}
          <Sidebar />

          {/* 3. Content is INSIDE Provider */}
          <MainContent>
            {children}
          </MainContent>

        </SidebarProvider>
      </body>
    </html>
  );
}