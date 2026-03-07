import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Adrishyam Media",
  description: "Ten years of commercial campaigns, wedding films, portraits, and editorial work — selected from 500+ projects.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
