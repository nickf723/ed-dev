import "./globals.css";
// import { Inter } from "next/font/google"; // If you use fonts
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* 1. Provider wraps everything */}
          <Sidebar />
          {/* 3. Content is INSIDE Provider */}
          <MainContent>
            {children}
          </MainContent>

      </body>
    </html>
  );
}