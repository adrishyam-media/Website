import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Adrishyam Media",
  description: "Photography, video production, editing, event coverage, and creative direction — all under one roof.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
