import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Adrishyam Media",
  description: "Book a shoot or get in touch with Adrishyam Media. We reply within 24 hours.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
