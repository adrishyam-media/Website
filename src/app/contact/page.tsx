"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "@/components/ui/AnimatedText";
import { SOCIAL_LINKS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        infoRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-dark">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">Say Hello</p>
          <AnimatedText
            text="Get in Touch"
            as="h1"
            className="font-display text-5xl md:text-7xl text-cream"
            splitBy="chars"
          />
          <p className="text-cream/50 mt-6 max-w-xl mx-auto">
            Have a project in mind? We&apos;d love to hear from you. Fill out the form below or reach out directly.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-dark">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            {submitted ? (
              <div className="text-center py-20">
                <div className="font-display text-5xl text-accent mb-4">Thank You</div>
                <p className="text-cream/60">
                  We&apos;ve received your message and will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="peer w-full bg-transparent border-b border-white/10 py-3 text-cream outline-none focus:border-accent transition-colors duration-300 placeholder-transparent"
                    placeholder="Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3 text-xs text-accent uppercase tracking-widest transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-cream/30 peer-placeholder-shown:uppercase peer-placeholder-shown:tracking-widest peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent"
                  >
                    Your Name
                  </label>
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="peer w-full bg-transparent border-b border-white/10 py-3 text-cream outline-none focus:border-accent transition-colors duration-300 placeholder-transparent"
                    placeholder="Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3 text-xs text-accent uppercase tracking-widest transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-cream/30 peer-placeholder-shown:uppercase peer-placeholder-shown:tracking-widest peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent"
                  >
                    Email Address
                  </label>
                </div>

                {/* Phone */}
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="peer w-full bg-transparent border-b border-white/10 py-3 text-cream outline-none focus:border-accent transition-colors duration-300 placeholder-transparent"
                    placeholder="Phone"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-0 -top-3 text-xs text-accent uppercase tracking-widest transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-cream/30 peer-placeholder-shown:uppercase peer-placeholder-shown:tracking-widest peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent"
                  >
                    Phone (Optional)
                  </label>
                </div>

                {/* Project Type */}
                <div className="relative">
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-white/10 py-3 text-cream outline-none focus:border-accent transition-colors duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-dark">Select Project Type</option>
                    <option value="wedding" className="bg-dark">Wedding Photography</option>
                    <option value="commercial" className="bg-dark">Commercial / Brand</option>
                    <option value="portrait" className="bg-dark">Portrait Session</option>
                    <option value="event" className="bg-dark">Event Coverage</option>
                    <option value="video" className="bg-dark">Video Production</option>
                    <option value="other" className="bg-dark">Other</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 text-cream/30 pointer-events-none">
                    &#9662;
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="peer w-full bg-transparent border-b border-white/10 py-3 text-cream outline-none focus:border-accent transition-colors duration-300 resize-none placeholder-transparent"
                    placeholder="Message"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-0 -top-3 text-xs text-accent uppercase tracking-widest transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-cream/30 peer-placeholder-shown:uppercase peer-placeholder-shown:tracking-widest peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent"
                  >
                    Your Message
                  </label>
                </div>

                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 border border-accent text-accent uppercase tracking-widest text-sm hover:bg-accent hover:text-dark transition-colors duration-500"
                >
                  Send Message
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </button>
              </>
            )}
          </form>

          {/* Info */}
          <div ref={infoRef} className="space-y-12 lg:pl-12">
            <div>
              <h3 className="font-display text-2xl text-cream mb-4">Studio Location</h3>
              <div className="space-y-2 text-cream/50">
                <p>123 Creative Avenue, Suite 400</p>
                <p>Los Angeles, CA 90028</p>
                <p>United States</p>
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl text-cream mb-4">Contact Details</h3>
              <div className="space-y-2 text-cream/50">
                <p>hello@lensandlight.studio</p>
                <p>+1 (555) 234-5678</p>
                <p>Mon — Fri: 9:00 AM — 6:00 PM</p>
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl text-cream mb-4">Follow Us</h3>
              <div className="flex gap-6">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/50 hover:text-accent transition-colors duration-300 text-sm uppercase tracking-widest"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video bg-dark-card border border-white/5 flex items-center justify-center">
              <p className="text-cream/20 text-sm uppercase tracking-widest">Map Integration</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
