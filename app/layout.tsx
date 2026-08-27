import "./globals.css";
import "./culinary-ui.css";
import "katex/dist/katex.min.css";

import { Analytics } from "@vercel/analytics/next";
import AppShell from "@/app/_components/AppShell";
import { NAVIGATION_DATA } from "@/lib/navigation";
import { buildPagePolicyRouteSnapshot } from "@/lib/page-policy-snapshot";

export const metadata = {
  title: "Education Station 64",
  description:
    "An evolving collection of interactive explanations, visualizations, and notes organized as a connected map of knowledge.",
};

const PAGE_POLICY_ROUTES = buildPagePolicyRouteSnapshot();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <Analytics />
        <AppShell
          navigationData={NAVIGATION_DATA}
          pagePolicyRoutes={PAGE_POLICY_ROUTES}
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
