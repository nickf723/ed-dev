import "./globals.css";
import Sidebar from "@/app/_components/Sidebar";
import MainContent from "@/app/_components/MainContent";

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