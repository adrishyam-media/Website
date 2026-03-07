import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Adrishyam Media",
  description: "Meet the team behind Adrishyam Media — photographers, cinematographers, and creative directors based in Bengaluru.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
