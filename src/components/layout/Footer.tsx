import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-dark-light border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-3xl text-cream mb-4">Adrishyam Media</h3>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Photography and film studio. Commercial campaigns, wedding films, and brand imagery — crafted with care.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-cream uppercase tracking-widest text-sm mb-6">Navigation</h4>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted text-sm hover:text-accent transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cream uppercase tracking-widest text-sm mb-6">Get in Touch</h4>
            <div className="flex flex-col gap-3 text-muted text-sm">
              <p>hello@adrishyam.media</p>
              <p>+91 — add your number</p>
              <p>Bengaluru, India</p>
              <div className="flex gap-4 mt-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors duration-300 text-sm"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            &copy; {new Date().getFullYear()} Adrishyam Media. All rights reserved.
          </p>
          <p className="text-muted text-xs">
            10 years. 500+ projects. Zero shortcuts.
          </p>
        </div>
      </div>
    </footer>
  );
}
